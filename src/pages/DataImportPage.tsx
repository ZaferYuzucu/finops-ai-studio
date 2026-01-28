
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File as FileIcon, X, Loader, Download, CheckCircle, Zap, Link as LinkIcon, Globe, Database, Sparkles, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { markDataImportCompleted } from '../utils/dataImportGate';
import { BETA_LIMIT, getLocalRemainingBetaQuota } from '../utils/betaQuota';
import { saveUploadedFile, DATA_CATEGORIES, type DataCategory } from '../utils/userDataStorage';
import { useAuth } from '../context/AuthContext';
import { fileStorage } from '../utils/fileStorage';
// 🛡️ Anti-Chaos: CSV güvenli parse için
import { runAntiChaosPipeline } from '../utils/antiChaos';
import { translateError } from '../utils/antiChaos/userDignityGuard';
import { logCSVParseWarning, logAssumptionBlocked } from '../utils/diagnostics/eventLogger';
import { persistFile, migrateIndexedDBToFirestore } from '../services/firestorePersistence';

const DataImportPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importMethod, setImportMethod] = useState<'file' | 'url'>('file'); // Yeni: Yükleme metodu
  const [dataUrl, setDataUrl] = useState(''); // Yeni: URL verisi
  const [isConnecting, setIsConnecting] = useState(false); // Yeni: Bağlanma durumu
  const [betaQuota, setBetaQuota] = useState<{ remaining: number; total: number } | null>(null);
  const [dropError, setDropError] = useState<string | null>(null);
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  
  // 📚 Kütüphane özellikleri
  const [selectedCategory, setSelectedCategory] = useState<DataCategory>('other');
  const [dataDescription, setDataDescription] = useState('');
  const [branchName, setBranchName] = useState('');

  useEffect(() => {
    const refresh = () => {
      setBetaQuota({ remaining: getLocalRemainingBetaQuota(), total: BETA_LIMIT });
    };
    refresh();
    window.addEventListener('storage', refresh);
    window.addEventListener('finops-beta-applications-updated', refresh as any);
    
    // ✅ FIX 1: Migrate IndexedDB to Firestore on mount
    if (currentUser?.uid) {
      migrateIndexedDBToFirestore(currentUser.uid).catch(() => {});
    }
    
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('finops-beta-applications-updated', refresh as any);
    };
  }, [currentUser]);

  const isAllowedFile = (f: File) => /\.(csv|xlsx)$/i.test(f.name);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('🎯 onDrop çağrıldı, gelen dosyalar:', acceptedFiles.length);
    setDropError(null);
    const allowed = acceptedFiles.filter(isAllowedFile);
    console.log('✅ İzin verilen dosyalar:', allowed.length, allowed.map(f => f.name));
    if (allowed.length === 0) {
      setDropError(
        `❌ DOSYA REDDEDİLDİ!\n\n` +
          `Desteklenen formatlar: .csv, .xlsx\n` +
          `Lütfen geçerli bir CSV veya Excel dosyası sürükleyin.`
      );
      return;
    }
    console.log('📁 setFiles çağrılıyor:', allowed[0]?.name);
    setFiles(allowed);
    
    // ✅ OTOMATIK KAYDET VE YÖNLENDİR
    console.log('👤 currentUser:', currentUser?.email || 'YOK!');
    if (!currentUser) {
      console.warn('⚠️ currentUser YOK - kaydetme atlanıyor!');
      setDropError('⚠️ GİRİŞ YAPILMAMIŞ!\n\nLütfen önce giriş yapın.');
      return;
    }
    
    if (currentUser && allowed.length > 0) {
      console.log('🚀 ASYNC İŞLEM BAŞLIYOR!!!');
      (async () => {
        try {
          console.log('🔥 STATUS UPLOADING\'E ÇEKİLİYOR...');
          setStatus('uploading');
          setIsProcessing(true);
          setProgress(0);
          console.log('⏳ PROGRESS BAR BAŞLATILDI!');
          
          // Progress animasyonu
          const interval = setInterval(() => {
            setProgress(prev => {
              const newVal = Math.min(prev + 15, 95);
              console.log('📊 Progress:', newVal);
              return newVal;
            });
          }, 200);
          
          console.log('📂 DOSYA OKUMA BAŞLIYOR...');
          for (const file of allowed) {
            console.log('📄 Dosya okunuyor:', file.name);
            
            let cleanContent: string;
            
            // 🛡️ Anti-Chaos: Önce güvenli parse dene
            try {
              const antiChaosResult = await runAntiChaosPipeline(file);
              
              if (antiChaosResult.success && antiChaosResult.data) {
                // Anti-Chaos başarılı, güvenli içeriği kullan
                // CSV içeriğini tekrar oluştur (header + rows)
                const headers = antiChaosResult.data.headers.join(',');
                const rows = antiChaosResult.data.rows.map(row => 
                  antiChaosResult.data.headers.map(h => row[h] || '').join(',')
                );
                cleanContent = [headers, ...rows].join('\n');
                
                // Uyarıları göster
                if (antiChaosResult.warnings.length > 0) {
                  console.warn('⚠️ Anti-Chaos Uyarıları:', antiChaosResult.warnings);
                  const friendlyWarnings = antiChaosResult.warnings.slice(0, 3).join('\n');
                  setDropError(`⚠️ Dosya yüklendi ancak bazı uyarılar var:\n\n${friendlyWarnings}`);
                  
                  // 🛡️ Diagnostics: CSV parse warning log (sessiz)
                  logCSVParseWarning(
                    currentUser?.uid,
                    currentUser?.email || undefined,
                    savedFile.id,
                    antiChaosResult.warnings,
                    antiChaosResult.diagnosis?.confidenceScore
                  ).catch(() => {}); // Sessizce atla, UI etkilenmez
                }
                
                // 🛡️ Diagnostics: Blocked assumptions log
                if (antiChaosResult.assumptionResult?.blockedAssumptions.length > 0) {
                  logAssumptionBlocked(
                    currentUser?.uid,
                    currentUser?.email || undefined,
                    savedFile.id,
                    antiChaosResult.assumptionResult.blockedAssumptions
                  ).catch(() => {}); // Sessizce atla
                }
                
                console.log('✅ Anti-Chaos parse başarılı, güven skoru:', antiChaosResult.diagnosis?.confidenceScore);
              } else {
                // Anti-Chaos başarısız, eski yönteme dön (fallback)
                console.warn('⚠️ Anti-Chaos başarısız, eski parse yöntemine dönülüyor');
                
                // 🛡️ Diagnostics: Fallback kullanıldı log (sessiz)
                logCSVParseWarning(
                  currentUser?.uid,
                  currentUser?.email || undefined,
                  undefined,
                  ['Anti-Chaos parse başarısız, fallback yöntem kullanıldı'],
                  0.5 // Düşük confidence (fallback)
                ).catch(() => {}); // Sessizce atla
                
                throw new Error('Anti-Chaos parse başarısız');
              }
            } catch (antiChaosError) {
              // 🛡️ Fallback: Eski güvenilir yöntem
              console.log('📋 Eski parse yöntemi kullanılıyor (fallback)');
              
              // 🛡️ Diagnostics: Fallback kullanıldı log (sessiz)
              logCSVParseWarning(
                currentUser?.uid,
                currentUser?.email || undefined,
                undefined,
                ['Anti-Chaos parse hatası, eski yöntem kullanıldı'],
                0.5
              ).catch(() => {}); // Sessizce atla
              
              // ✅ UTF-8 ile oku (Türkçe karakter desteği)
              const fileContent = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target?.result as string);
                reader.onerror = reject;
                reader.readAsText(file, 'UTF-8'); // ✅ UTF-8 encoding belirtildi
              });
              
              // Trim BOM if present
              cleanContent = fileContent.replace(/^\uFEFF/, '');
              
              // Validate content
              if (cleanContent.length < 10) {
                // 🛡️ Kullanıcı dostu hata mesajı
                const friendlyError = translateError(new Error(`Dosya içeriği çok kısa veya boş: ${file.name}`));
                throw new Error(friendlyError.message);
              }
            }
            
            console.log('💾 KAYDETME BAŞLIYOR, içerik uzunluğu:', cleanContent.length);
            
            // ✅ FIX 1: TRUE PERSISTENCE - Firestore+Storage
            const fileId = await persistFile(
              currentUser.uid,
              file,
              cleanContent
            );
            
            // Save metadata to localStorage (backward compat)
            const savedFile = await saveUploadedFile(
              file,
              currentUser.email || 'unknown',
              undefined,
              undefined,
              undefined,
              {
                category: selectedCategory || 'other',
                fileContent: undefined,
              }
            );
            
            // Update savedFile.id to match Firestore fileId
            savedFile.id = fileId;
            
            console.log('✅ DOSYA KAYDEDİLDİ! ID:', fileId, '(Firestore)');
            
            // ✅ Diğer sayfaları bilgilendir (aynı sekmede)
            window.dispatchEvent(new Event('finops-data-updated'));
            
            // ✅ FIX 2: Redirect to preview instead of dashboard
            setTimeout(() => {
              navigate(`/data-preview/${fileId}`);
            }, 1000);
            return; // Exit early
          }
          
          console.log('🛑 INTERVAL TEMİZLENİYOR...');
          clearInterval(interval);
          setProgress(100);
          console.log('✅ Dosya otomatik kaydedildi (sürükle-bırak):', allowed[0].name);
          
          // Başarı durumunu göster
          console.log('🎉 STATUS SUCCESS\'E ÇEKİLİYOR...');
          setStatus('success');
          setIsProcessing(false);
          markDataImportCompleted();
          console.log('✅ SUCCESS STATE AYARLANDI!');
          
          // Sayfa başına scroll et ki kullanıcı mesajı görsün
          window.scrollTo({ top: 0, behavior: 'smooth' });
          
          // Alert ile de bildir (kesin görsün diye!)
          alert(`✅ BAŞARILI!\n\nDosya kütüphanenize kaydedildi: ${allowed[0].name}\n\nDashboard hazırlama sayfasına yönlendiriliyorsunuz...`);
          
          // Redirect handled above in file loop
          
        } catch (error) {
          console.error('❌ Otomatik kaydetme hatası (sürükle-bırak):', error);
          
          // 🛡️ Anti-Chaos: Kullanıcı dostu hata mesajı
          const friendlyError = translateError(error instanceof Error ? error : new Error(String(error)));
          setDropError(`❌ ${friendlyError.title}\n\n${friendlyError.message}\n\n💡 ${friendlyError.suggestion}`);
          
          setStatus('error');
          setIsProcessing(false);
          // 🛡️ UI render etmeye devam et - sistem çökmesin
        }
      })();
    }
  }, [currentUser, selectedCategory, navigate]);

  // Dropzone for drag&drop AND click
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    noClick: false,  // DUZELTME: Tiklama aktif
    noKeyboard: true,
    multiple: false,
  });

  const handlePickFile = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Dropzone event'ini durdur
    e?.preventDefault();
    setDropError(null);
    // Prefer native input click (most reliable across browsers)
    filePickerRef.current?.click();
  };

  const handleFilePicked: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    setDropError(null);
    const picked = Array.from(e.target.files ?? []);
    const allowed = picked.filter(isAllowedFile);
    if (picked.length > 0 && allowed.length === 0) {
      setDropError(
        `Dosya yüklenemedi. (${picked[0]?.name || 'dosya'})\n` +
          `Desteklenen formatlar: .csv, .xlsx`
      );
    } else if (allowed.length > 0) {
      setFiles(allowed);
      
      // ✅ OTOMATIK KAYDET: Dosya seçilir seçilmez hemen kaydet!
      if (currentUser && allowed.length > 0) {
        try {
          for (const file of allowed) {
            let cleanContent: string;
            
            // 🛡️ Anti-Chaos: Önce güvenli parse dene
            try {
              const antiChaosResult = await runAntiChaosPipeline(file);
              
              if (antiChaosResult.success && antiChaosResult.data) {
                // Anti-Chaos başarılı
                const headers = antiChaosResult.data.headers.join(',');
                const rows = antiChaosResult.data.rows.map(row => 
                  antiChaosResult.data.headers.map(h => row[h] || '').join(',')
                );
                cleanContent = [headers, ...rows].join('\n');
                console.log('✅ Anti-Chaos parse başarılı (file picker)');
              } else {
                throw new Error('Anti-Chaos parse başarısız');
              }
            } catch (antiChaosError) {
              // 🛡️ Fallback: Eski yöntem
              console.log('📋 Eski parse yöntemi kullanılıyor (file picker fallback)');
              
              // 🛡️ Diagnostics: Fallback kullanıldı log (sessiz)
              logCSVParseWarning(
                currentUser?.uid,
                currentUser?.email || undefined,
                undefined,
                ['Anti-Chaos parse hatası (file picker), eski yöntem kullanıldı'],
                0.5
              ).catch(() => {}); // Sessizce atla
              
              // ✅ UTF-8 ile oku
              const fileContent = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target?.result as string);
                reader.onerror = reject;
                reader.readAsText(file, 'UTF-8');
              });
              
              // Trim BOM
              cleanContent = fileContent.replace(/^\uFEFF/, '');
              
              // Validate
              if (cleanContent.length < 10) {
                const friendlyError = translateError(new Error(`Dosya içeriği çok kısa: ${file.name}`));
                throw new Error(friendlyError.message);
              }
            }
            
            // Save metadata only
            const savedFile = await saveUploadedFile(
              file,
              currentUser.email || 'unknown',
              undefined,
              undefined,
              undefined,
              {
                category: selectedCategory || 'other',
                fileContent: undefined,  // NO content in localStorage
              }
            );
            
            // ✅ FIX 1: TRUE PERSISTENCE - Firestore+Storage
            const fileId = await persistFile(
              currentUser.uid,
              file,
              cleanContent
            );
            savedFile.id = fileId;
            
            setTimeout(() => {
              navigate(`/data-preview/${fileId}`);
            }, 1000);
          }
          console.log('✅ Dosya otomatik kaydedildi:', allowed[0].name);
        } catch (error) {
          console.error('❌ Otomatik kaydetme hatası:', error);
          // 🛡️ Kullanıcı dostu hata mesajı
          const friendlyError = translateError(error instanceof Error ? error : new Error(String(error)));
          setDropError(`⚠️ ${friendlyError.title}\n\n${friendlyError.message}`);
          // 🛡️ UI render etmeye devam et
        }
      }
    }
    // allow re-picking same file
    e.target.value = '';
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    // VERIYI HEMEN KAYDET! (setTimeout'tan once)
    if (currentUser && files.length > 0) {
      try {
        // Her dosya icin icerigi oku ve kaydet
        for (const file of files) {
          let cleanContent: string;
          
          // 🛡️ Anti-Chaos: Önce güvenli parse dene
          try {
            const antiChaosResult = await runAntiChaosPipeline(file);
            
            if (antiChaosResult.success && antiChaosResult.data) {
              // Anti-Chaos başarılı
              const headers = antiChaosResult.data.headers.join(',');
              const rows = antiChaosResult.data.rows.map(row => 
                antiChaosResult.data.headers.map(h => row[h] || '').join(',')
              );
              cleanContent = [headers, ...rows].join('\n');
              console.log('✅ Anti-Chaos parse başarılı (handleUpload)');
            } else {
              throw new Error('Anti-Chaos parse başarısız');
            }
          } catch (antiChaosError) {
            // 🛡️ Fallback: Eski yöntem
            console.log('📋 Eski parse yöntemi kullanılıyor (handleUpload fallback)');
            
            // 🛡️ Diagnostics: Fallback kullanıldı log (sessiz)
            logCSVParseWarning(
              currentUser?.uid,
              currentUser?.email || undefined,
              undefined,
              ['Anti-Chaos parse hatası (handleUpload), eski yöntem kullanıldı'],
              0.5
            ).catch(() => {}); // Sessizce atla
            
            // ✅ UTF-8 ile oku
            const fileContent = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.onerror = reject;
              reader.readAsText(file, 'UTF-8');
            });
            
            // Trim BOM
            cleanContent = fileContent.replace(/^\uFEFF/, '');
            
            // Validate
            if (cleanContent.length < 10) {
              const friendlyError = translateError(new Error(`Dosya içeriği çok kısa: ${file.name}`));
              throw new Error(friendlyError.message);
            }
          }
          
          // Save metadata only
          const savedFile = await saveUploadedFile(
            file, 
            currentUser.email || 'unknown', 
            undefined, 
            undefined, 
            undefined,
            {
              category: selectedCategory,
              branchName: branchName || undefined,
              branchId: branchName ? `branch_${Date.now()}` : undefined,
              description: dataDescription || undefined,
              fileContent: undefined,  // NO content in localStorage
            }
          );
          
          // ✅ FIX 1: TRUE PERSISTENCE - Firestore+Storage
          const fileId = await persistFile(
            currentUser.uid,
            file,
            cleanContent
          );
          savedFile.id = fileId;
        }
        console.log('Dosyalar kaydedildi:', files.map(f => f.name), `[${selectedCategory}]`);
      } catch (error) {
        console.error('Dosya kaydedilemedi:', error);
        // 🛡️ Anti-Chaos: Kullanıcı dostu hata mesajı
        const friendlyError = translateError(error instanceof Error ? error : new Error(String(error)));
        alert(`${friendlyError.title}\n\n${friendlyError.message}\n\n💡 ${friendlyError.suggestion}`);
        // 🛡️ UI render etmeye devam et - return etme, sadece uyar
        setDropError(`${friendlyError.title}\n\n${friendlyError.message}`);
      }
    }
    
    setStatus('uploading');
    setIsProcessing(true);
    setProgress(0);
    
    // Progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // Simulated upload animation
    setTimeout(() => {
      setStatus('success');
      markDataImportCompleted();
      setIsProcessing(false);
      clearInterval(interval);
      setProgress(100);
    }, 2500);
  };

  // 🚀 DEMO MODU - Tek tıkla örnek veri yükle
  const handleDemoMode = async () => {
    // CSV verisi oluştur
    const csvContent = `Tarih,Ürün Adı,Kategori,Sipariş Sayısı,Birim Fiyat (TL),Toplam Gelir (TL),Masraf (TL),Net Kar (TL)
2024-01-01,Margherita Pizza,Ana Yemek,120,65,7800,2340,5460
2024-01-01,Biftek Patates,Ana Yemek,90,95,8550,3420,5130
2024-01-02,Margherita Pizza,Ana Yemek,135,65,8775,2633,6143`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const file = new File([blob], 'demo-restoran-verileri.csv', { type: 'text/csv' });
    setFiles([file]);
    
    // VERİYİ HEMEN KAYDET!
    if (currentUser) {
      try {
        let cleanContent: string;
        
        // 🛡️ Anti-Chaos: Demo dosyası için de güvenli parse
        try {
          const antiChaosResult = await runAntiChaosPipeline(file);
          
          if (antiChaosResult.success && antiChaosResult.data) {
            // Anti-Chaos başarılı
            const headers = antiChaosResult.data.headers.join(',');
            const rows = antiChaosResult.data.rows.map(row => 
              antiChaosResult.data.headers.map(h => row[h] || '').join(',')
            );
            cleanContent = [headers, ...rows].join('\n');
            console.log('✅ Anti-Chaos parse başarılı (demo mode)');
          } else {
            throw new Error('Anti-Chaos parse başarısız');
          }
        } catch (antiChaosError) {
          // 🛡️ Fallback: Eski yöntem
          console.log('📋 Eski parse yöntemi kullanılıyor (demo mode fallback)');
          
          // 🛡️ Diagnostics: Fallback kullanıldı log (sessiz)
          logCSVParseWarning(
            currentUser?.uid,
            currentUser?.email || undefined,
            undefined,
            ['Anti-Chaos parse hatası (demo mode), eski yöntem kullanıldı'],
            0.5
          ).catch(() => {}); // Sessizce atla
          
          // ✅ UTF-8 ile oku
          const fileContent = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = reject;
            reader.readAsText(file, 'UTF-8');
          });
          
          // Trim BOM
          cleanContent = fileContent.replace(/^\uFEFF/, '');
        }
        
        // Save metadata only
        const savedFile = await saveUploadedFile(file, currentUser.email || 'unknown', 3, 8, undefined, {
          category: 'financial',
          description: 'Demo restoran verileri',
          fileContent: undefined,  // NO content in localStorage
        });
        
        // ✅ FIX 1: TRUE PERSISTENCE - Firestore+Storage
        const fileId = await persistFile(
          currentUser.uid,
          file,
          cleanContent
        );
        savedFile.id = fileId;
        
        console.log('✅ Demo dosyası kaydedildi:', file.name);
        
        setTimeout(() => {
          navigate(`/data-preview/${fileId}`);
        }, 1000);
      } catch (error) {
        console.error('❌ Demo dosyası kaydedilemedi:', error);
        // 🛡️ UI render etmeye devam et
        const friendlyError = translateError(error instanceof Error ? error : new Error(String(error)));
        setDropError(`⚠️ ${friendlyError.message}`);
      }
    }
    
    setStatus('uploading');
    setIsProcessing(true);
    setProgress(0);
    
    // Progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
    
    setTimeout(() => {
      setStatus('success');
      markDataImportCompleted();
      setIsProcessing(false);
      clearInterval(interval);
      setProgress(100);
    }, 1500);
  };

  const removeFile = (file: File) => {
    setFiles(files.filter(f => f !== file));
  };

  // 🌐 URL İLE VERİ BAĞLANTISI
  const handleUrlConnect = async () => {
    if (!dataUrl.trim()) {
      alert('Lutfen gecerli bir URL girin!');
      return;
    }

    // Simulated file olustur (gercek URL fetch icin)
    const fileName = dataUrl.split('/').pop() || 'url-data.csv';
    const blob = new Blob(['URL veri baglantisi kuruldu'], { type: 'text/csv' });
    const file = new File([blob], fileName, { type: 'text/csv' });
    
    // VERIYI HEMEN KAYDET!
    if (currentUser) {
      try {
        const savedFile = await saveUploadedFile(file, currentUser.email || 'unknown', undefined, undefined, undefined, {
          category: selectedCategory,
          description: `URL: ${dataUrl}`,
          fileContent: undefined,  // NO content in localStorage
        });
        // Note: URL data source not fully implemented - no content stored
        console.log('URL baglantisi kaydedildi:', fileName);
      } catch (error) {
        console.error('URL baglantisi kaydedilemedi:', error);
        alert('URL baglantisi kaydedilirken hata olustu.');
        return;
      }
    }

    setIsConnecting(true);
    setIsProcessing(true);
    setProgress(0);
    setStatus('uploading');

    // Progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 12;
      });
    }, 180);

    // Simulated connection
    setTimeout(() => {
      setStatus('success');
      markDataImportCompleted();
      setIsProcessing(false);
      setIsConnecting(false);
      clearInterval(interval);
      setProgress(100);
    }, 2000);
  };

  // 📚 ORNEK VERİ YÜKLEME (RestFinops Dashboard icin)
  const handleLoadSampleData = async () => {
    if (!currentUser?.email) {
      alert('Once giris yapmaniz gerekiyor!');
      return;
    }

    setIsConnecting(true);
    setIsProcessing(true);
    
    try {
      // Restoran Operasyon CSV'sini fetch et
      const operasyonRes = await fetch('/mockup-data/restoran/restoran-operasyon.csv');
      const operasyonText = await operasyonRes.text();
      const operasyonFile = new File([operasyonText], 'restoran-operasyon.csv', { type: 'text/csv' });
      
      // Restoran Finansal CSV'sini fetch et
      const finansalRes = await fetch('/mockup-data/restoran/restoran-finansal.csv');
      const finansalText = await finansalRes.text();
      const finansalFile = new File([finansalText], 'restoran-finansal.csv', { type: 'text/csv' });
      
      // Trim BOM
      const cleanOperasyonText = operasyonText.replace(/^\uFEFF/, '');
      const cleanFinansalText = finansalText.replace(/^\uFEFF/, '');
      
      // Her ikisini de yukle
      const savedOperasyon = await saveUploadedFile(operasyonFile, currentUser.email, undefined, undefined, undefined, {
        category: 'operational',
        description: 'Restoran Operasyonel Performans (Ornek Veri - RestFinops)',
        branchName: 'Tum Lokasyonlar',
        fileContent: undefined,
      });
      
      const savedFinansal = await saveUploadedFile(finansalFile, currentUser.email, undefined, undefined, undefined, {
        category: 'financial',
        description: 'Restoran Finansal Performans (Ornek Veri - RestFinops)',
        branchName: 'Tum Lokasyonlar',
        fileContent: undefined,
      });
      
      // ✅ FIX 1: TRUE PERSISTENCE - Firestore+Storage
      const operasyonBlob = new File([cleanOperasyonText], 'restoran-operasyon.csv', { type: 'text/csv' });
      const finansalBlob = new File([cleanFinansalText], 'restoran-finansal.csv', { type: 'text/csv' });
      
      const operasyonFileId = await persistFile(currentUser.uid, operasyonBlob, cleanOperasyonText);
      const finansalFileId = await persistFile(currentUser.uid, finansalBlob, cleanFinansalText);
      
      savedOperasyon.id = operasyonFileId;
      savedFinansal.id = finansalFileId;
      
      setStatus('success');
      markDataImportCompleted();
      
      alert('✓ RestFinops ornek verileri basariyla yuklendi!\n\n2 dosya kutuphanenize eklendi.\nDashboard sayfasina yonlendiriliyorsunuz...');
      
      // 2 saniye sonra dashboard'a yonlendir
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Sample data load error:', error);
      alert('Ornek veri yuklenirken hata olustu: ' + error);
    } finally {
      setIsConnecting(false);
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
        
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">{t('dataImport.title')}</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('dataImport.subtitle')}
          </p>

          {/* Beta Partner kontenjan (demo-safe indicator) */}
          {betaQuota && betaQuota.remaining < betaQuota.total && (
            <div className="mt-3 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900">
                <span>🎯 Lansman Partneri Kontenjanı:</span>
                <span className="font-extrabold">{betaQuota.remaining}/{betaQuota.total}</span>
                <span className="text-xs font-medium text-amber-700">(bu tarayıcı)</span>
              </div>
            </div>
          )}
          
          {/* Detaylı Rehber Linki */}
          <div className="mt-4 text-center">
            <a 
              href="/veri-hazirlama" 
              target="_blank"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              <Database size={16} />
              <span>{t('dataImport.detailedGuideLink')}</span>
            </a>
          </div>

        </div>

        {/* 📁 VERİ YÜKLEME - YAN YANA 2 YÖNTEM */}
        <div className="mt-8">
          {/* Üstte Bilgilendirme */}
          <p className="text-center text-sm text-gray-600 bg-blue-50 rounded-lg p-3 border border-blue-200 mb-6">
            💡 Dosyanızı <strong>bilgisayarınızdan seçin</strong>, <strong>URL ile bağlanın</strong> veya <strong>aşağıya sürükleyip bırakın</strong>
          </p>

          {/* YAN YANA BUTONLAR */}
          <div className="flex justify-center gap-4 mb-4">
            <input
              ref={filePickerRef}
              type="file"
              accept=".csv,.xlsx"
              style={{ display: 'none' }}
              onChange={handleFilePicked}
            />
            <button
              type="button"
              onClick={handlePickFile}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              <UploadCloud size={24} />
              Dosya Seç
            </button>
            <button
              type="button"
              onClick={() => setImportMethod('url')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              <Globe size={24} />
              URL Bağlantısı
            </button>
          </div>

          {/* YEŞİL TİK - DAHA BELİRGİN */}
          {files.length > 0 && (
            <div className="mb-6 bg-emerald-50 border-2 border-emerald-300 rounded-xl p-4">
              <p className="text-center text-base font-bold text-emerald-700 flex items-center justify-center gap-2">
                <CheckCircle size={20} className="text-emerald-600" />
                <span>Seçilen Dosya: {files[0]?.name}</span>
              </p>
              <p className="text-center text-xs text-emerald-600 mt-1">
                Dosya otomatik olarak kütüphanenize kaydedildi
              </p>
            </div>
          )}

          {/* VEYA - Sürükle Bırak İçin */}
          <div className="my-6 text-center text-sm text-gray-500 font-semibold">
            - VEYA -
          </div>

          {/* SURUKLE-BIRAK ALANI */}
            <div
              {...getRootProps()}
              className={`rounded-xl border-4 border-dashed px-8 py-16 transition-all cursor-pointer ${
                isDragActive 
                  ? 'border-green-500 bg-green-100 scale-105 shadow-2xl' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-center">
                <div className={`text-8xl mb-6 ${isDragActive ? 'animate-bounce' : ''}`}>
                  {isDragActive ? '📂' : '📁'}
                </div>
                <p className={`text-2xl font-extrabold mb-3 ${
                  isDragActive ? 'text-green-800' : 'text-gray-900'
                }`}>
                  {isDragActive ? '✅ DOSYAYI ŞİMDİ BIRAK!' : '📤 Dosyayı Buraya Sürükleyin'}
                </p>
                <p className={`text-base ${isDragActive ? 'text-green-700 font-bold' : 'text-gray-600'}`}>
                  CSV veya XLSX formatında
                </p>
                {!isDragActive && (
                  <p className="text-xs text-gray-500 mt-3">
                    veya buraya tıklayarak dosya seçin
                  </p>
                )}
              </div>
            </div>

            {dropError && (
              <div className="mt-4 rounded-xl border-2 border-red-400 bg-red-100 p-6 shadow-lg animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">⚠️</div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-red-900 whitespace-pre-line">
                      {dropError}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 📖 VERİ GİRİŞ REHBERİ - YENİ */}
            <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <FileIcon className="text-blue-600" size={20} />
                {t('dataImport.fileUpload.quickGuide.title')}
              </h3>
              <div className="space-y-3 text-sm text-blue-900">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                  <p dangerouslySetInnerHTML={{ __html: t('dataImport.fileUpload.quickGuide.step1') }} />
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                  <p dangerouslySetInnerHTML={{ __html: t('dataImport.fileUpload.quickGuide.step2') }} />
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                  <p dangerouslySetInnerHTML={{ __html: t('dataImport.fileUpload.quickGuide.step3') }} />
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                  <p dangerouslySetInnerHTML={{ __html: t('dataImport.fileUpload.quickGuide.step4') }} />
                </div>
                
                {/* Küçük Not */}
                <div className="mt-4 bg-white border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800 italic" dangerouslySetInnerHTML={{ __html: t('dataImport.fileUpload.quickGuide.note') }} />
                </div>

                {/* Örnek CSV İndir */}
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <a 
                    href="/sample-data/sample_sales_data.csv"
                    download
                    className="inline-flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 font-semibold hover:underline"
                  >
                    <Download size={16} />
                    {t('dataImport.fileUpload.quickGuide.downloadSample')}
                  </a>
                </div>
              </div>
            </div>
        </div>

        {/* 🌐 URL BAĞLANTISI ALANI */}
        {importMethod === 'url' && (
          <div className="mt-8 space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <Globe className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{t('dataImport.urlConnection.title')}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t('dataImport.urlConnection.subtitle')}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label htmlFor="data-url" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('dataImport.urlConnection.label')}
                  </label>
                  <input
                    type="url"
                    id="data-url"
                    value={dataUrl}
                    onChange={(e) => setDataUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    disabled={isConnecting}
                  />
                </div>

                {/* Örnek URL'ler */}
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 mb-2">{t('dataImport.urlConnection.examplesTitle')}</p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <button 
                      onClick={() => setDataUrl('https://docs.google.com/spreadsheets/d/1234/export?format=csv')}
                      className="block hover:text-green-600 transition-colors text-left"
                    >
                      • {t('dataImport.urlConnection.example1')}
                    </button>
                    <button 
                      onClick={() => setDataUrl('https://api.airtable.com/v0/appXXX/Table')}
                      className="block hover:text-green-600 transition-colors text-left"
                    >
                      • {t('dataImport.urlConnection.example2')}
                    </button>
                    <button 
                      onClick={() => setDataUrl('https://example.com/data/sales.csv')}
                      className="block hover:text-green-600 transition-colors text-left"
                    >
                      • {t('dataImport.urlConnection.example3')}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleUrlConnect}
                  disabled={!dataUrl.trim() || isConnecting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  {isConnecting ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      <span>{t('dataImport.urlConnection.connecting')}</span>
                    </>
                  ) : (
                    <>
                      <LinkIcon size={20} />
                      <span>{t('dataImport.urlConnection.button')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 📖 ENTEGRE ET REHBERİ - YENİ */}
            <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                <Globe className="text-green-600" size={20} />
                {t('dataImport.urlConnection.integration.title')}
                <span className="ml-2 px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full font-semibold">
                  {t('dataImport.urlConnection.integration.phase')}
                </span>
              </h3>
              <div className="space-y-3 text-sm text-green-900">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold flex-shrink-0">•</span>
                  <p dangerouslySetInnerHTML={{ __html: t('dataImport.urlConnection.integration.description1') }} />
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold flex-shrink-0">•</span>
                  <p dangerouslySetInnerHTML={{ __html: t('dataImport.urlConnection.integration.description2') }} />
                </div>
                
                {/* İpucu Kutusu */}
                <div className="mt-4 bg-white border border-green-200 rounded-lg p-4">
                  <p className="text-xs text-green-800 mb-2">
                    <strong>{t('dataImport.urlConnection.integration.plannedTitle')}</strong>
                  </p>
                  <ul className="text-xs text-green-700 space-y-1 ml-4">
                    <li>• {t('dataImport.urlConnection.integration.planned1')}</li>
                    <li>• {t('dataImport.urlConnection.integration.planned2')}</li>
                    <li>• {t('dataImport.urlConnection.integration.planned3')}</li>
                    <li>• {t('dataImport.urlConnection.integration.planned4')}</li>
                  </ul>
                </div>

                {/* Geçici Çözüm */}
                <div className="mt-4 pt-4 border-t border-green-200">
                  <p className="text-sm text-green-900">
                    <strong>{t('dataImport.urlConnection.integration.whatToDoTitle')}</strong>
                  </p>
                  <p className="text-xs text-green-800 mt-2" dangerouslySetInnerHTML={{ __html: t('dataImport.urlConnection.integration.whatToDoDesc') }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800">{t('dataImport.selectedFiles')}</h3>
            <ul className="mt-2 divide-y divide-gray-200 border border-gray-200 rounded-md">
              {files.map(file => (
                <li key={file.name} className="flex items-center justify-between py-3 pl-4 pr-5 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                    <FileIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <span className="ml-2 w-0 flex-1 truncate font-medium">{file.name}</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button onClick={() => removeFile(file)} className="text-gray-500 hover:text-red-600">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6">
                <button
                    onClick={handleUpload}
                    disabled={status === 'uploading'}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
                >
                    {status === 'uploading' && <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />}
                    {status === 'uploading' ? t('dataImport.uploading') : t('dataImport.uploadButton')}
                </button>
            </div>
          </div>
        )}

        {/* 📊 PROGRESS BAR - SAYFANIN EN ÜSTÜNDE SABİT! */}
        {isProcessing && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl">
            <div className="max-w-7xl mx-auto p-6 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-white">⏳ DOSYA KAYDEDİLİYOR...</span>
                <span className="text-2xl font-extrabold text-yellow-300">{progress}%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-6 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-6 rounded-full transition-all duration-300 ease-out flex items-center justify-center"
                  style={{ width: `${progress}%` }}
                >
                  <span className="text-white font-bold text-sm">{progress > 10 ? `${progress}%` : ''}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* ALT KISIM - Detaylı Progress */}
        {isProcessing && (
          <div className="mt-6 space-y-3 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-400 shadow-xl">
            <div className="text-center mb-4">
              <p className="text-xl font-bold text-blue-900 animate-pulse">⏳ İŞLEM DEVAM EDİYOR...</p>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p className="flex items-center gap-2">
                {progress > 20 && <CheckCircle size={14} className="text-green-500" />}
                <span className={progress > 20 ? "text-green-600 font-medium" : ""}>{t('dataImport.processing.step1')}</span>
              </p>
              <p className="flex items-center gap-2">
                {progress > 50 && <CheckCircle size={14} className="text-green-500" />}
                <span className={progress > 50 ? "text-green-600 font-medium" : ""}>{t('dataImport.processing.step2')}</span>
              </p>
              <p className="flex items-center gap-2">
                {progress > 80 && <CheckCircle size={14} className="text-green-500" />}
                <span className={progress > 80 ? "text-green-600 font-medium" : ""}>{t('dataImport.processing.step3')}</span>
              </p>
            </div>
          </div>
        )}

        {status === 'success' && (
             <div className="mt-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 p-6 shadow-xl">
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-green-500 p-3">
                            <CheckCircle size={48} className="text-white" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-green-900">✅ DOSYA BAŞARIYLA KAYDEDİLDİ!</h3>
                        <p className="mt-2 text-lg text-green-700">
                          Dosyanız kütüphanenize eklendi ve dashboard hazırlama arayüzüne yönlendiriliyorsunuz...
                        </p>
                        <p className="mt-1 text-sm text-green-600 font-medium">
                          📁 {files[0]?.name}
                        </p>
                    </div>
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Sparkles size={24} className="animate-pulse" />
                    <span>Dashboard Sayfasına Git!</span>
                    <ArrowRight size={24} />
                  </button>
                  <p className="mt-3 text-sm text-green-700 font-medium">
                    ✨ Verileriniz kütüphanenizde saklandı, istediğiniz zaman kullanabilirsiniz
                  </p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default DataImportPage;
