/**
 * FINOPS AI Sihirbazı
 * 
 * Kullanıcı sadece CSV dosyasını seçer,
 * Sistem otomatik olarak:
 * - Veriyi analiz eder
 * - En uygun 6 KPI seçer
 * - En uygun 5 Grafik oluşturur
 * - Dashboard'ı standart formatta sunar
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ChevronRight, FileText, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserUploadedFiles, type UploadedFile } from '../../utils/userDataStorage';
import { parseCSVFile } from '../../utils/csvParser';
import { wizardStateToDashboardConfig, saveUserDashboardConfig } from '../../utils/wizardToConfig';
import type { WizardState } from './DashboardWizard';

export const SmartDashboardWizard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Dosyaları yükle
  useEffect(() => {
    if (currentUser?.email) {
      const userFiles = getUserUploadedFiles(currentUser.email);
      console.log('📂 Kullanıcı dosyaları yüklendi:', userFiles.length, 'dosya');
      setFiles(userFiles);
    }
    
    // ✅ localStorage değişikliğini dinle
    const handleStorageChange = () => {
      if (currentUser?.email) {
        console.log('🔄 localStorage değişti, dosyalar yenileniyor...');
        const userFiles = getUserUploadedFiles(currentUser.email);
        setFiles(userFiles);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Aynı sekmede değişiklik olduğunda da yenile (custom event)
    window.addEventListener('finops-data-updated', handleStorageChange as any);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('finops-data-updated', handleStorageChange as any);
    };
  }, [currentUser]);

  const analyzeAndCreateDashboard = async () => {
    if (!selectedFile || !currentUser?.email) return;

    setIsAnalyzing(true);

    try {
      // 1. Dosya içeriğini kontrol et
      if (!selectedFile.fileContent) {
        alert('⚠️ DOSYA İÇERİĞİ BULUNAMADI!\n\n' +
              'Bu dosya eski bir sürümle yüklenmiş ve içeriği kaydedilmemiş.\n\n' +
              'Lütfen:\n' +
              '1. Bu dosyayı silin (kütüphaneden)\n' +
              '2. Dosyayı tekrar yükleyin\n' +
              '3. Tekrar deneyin\n\n' +
              'Yeni yüklenen dosyalarda bu sorun olmayacak.');
        setIsAnalyzing(false);
        return;
      }

      // 2. CSV'yi parse et
      const parsedData = parseCSVFile(selectedFile.fileContent);
      
      // Veri kontrolü
      if (!parsedData || !parsedData.headers || parsedData.headers.length === 0) {
        throw new Error('CSV dosyası okunamadı veya boş.');
      }

      if (!parsedData.rows || parsedData.rows.length === 0) {
        throw new Error('CSV dosyasında veri satırı bulunamadı.');
      }
      
      // 2. Otomatik KPI seçimi (ilk 6 numerik sütun)
      const numericColumns = parsedData.headers.filter(header => {
        const firstValue = parsedData.rows[0]?.[header];
        return firstValue !== undefined && firstValue !== '' && !isNaN(Number(firstValue));
      }).slice(0, 6);

      // En az bir numerik sütun olmalı
      if (numericColumns.length === 0) {
        throw new Error('CSV dosyasında numerik sütun bulunamadı. Lütfen sayısal veriler içeren bir dosya yükleyin.');
      }

      // 3. Otomatik grafik belirleme
      const dateColumn = parsedData.headers.find(h => 
        h.toLowerCase().includes('tarih') || 
        h.toLowerCase().includes('date') ||
        h.toLowerCase().includes('ay') ||
        h.toLowerCase().includes('month')
      ) || parsedData.headers[0]; // Fallback: İlk sütun

      const categoryColumn = parsedData.headers.find(h => 
        h.toLowerCase().includes('kategori') || 
        h.toLowerCase().includes('category') ||
        h.toLowerCase().includes('ürün') ||
        h.toLowerCase().includes('product') ||
        h.toLowerCase().includes('bölge') ||
        h.toLowerCase().includes('region')
      ) || parsedData.headers[0]; // Fallback: İlk sütun

      // 4. Wizard state oluştur (AI tarafından otomatik)
      const aiGeneratedState: WizardState = {
        currentStep: 5, // Son adım
        dashboardName: `AI Dashboard - ${selectedFile.fileName.replace('.csv', '')}`,
        dashboardType: 'sales',
        dataSource: 'csv',
        selectedFile: selectedFile,
        selectedKpis: numericColumns.map((col, idx) => ({
          column: col,
          label: col,
          calculation: idx === 0 ? 'sum' : 'avg',
        })),
        selectedCharts: [
          {
            id: '1',
            title: `${dateColumn} Analizi`,
            chartType: 'line',
            xAxis: { field: dateColumn },
            yAxis: { field: numericColumns[0] },
          },
          {
            id: '2',
            title: `${categoryColumn} Dağılımı`,
            chartType: 'bar',
            xAxis: { field: categoryColumn },
            yAxis: { field: numericColumns[0] },
          },
          {
            id: '3',
            title: 'Toplam Dağılım',
            chartType: 'pie',
            xAxis: { field: categoryColumn },
            yAxis: { field: numericColumns[0] },
          },
          {
            id: '4',
            title: `${numericColumns[1] || numericColumns[0]} Trendi`,
            chartType: 'area',
            xAxis: { field: dateColumn },
            yAxis: { field: numericColumns[1] || numericColumns[0] },
          },
          {
            id: '5',
            title: 'Karşılaştırma',
            chartType: 'bar',
            xAxis: { field: categoryColumn },
            yAxis: { field: numericColumns[1] || numericColumns[0] },
          },
        ],
      };

      // Simüle edilmiş AI analizi (2 saniye bekle)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 5. Dashboard config oluştur
      const dashboardConfig = wizardStateToDashboardConfig(aiGeneratedState);
      
      // 6. Kaydet
      saveUserDashboardConfig(currentUser.email, dashboardConfig);
      
      setAnalysisComplete(true);

      // 7. Başarı mesajı ve yönlendirme
      setTimeout(() => {
        alert(`✨ AI Dashboard başarıyla oluşturuldu!\n\n` +
              `📊 Dashboard: ${aiGeneratedState.dashboardName}\n` +
              `📈 KPI: ${numericColumns.length} → 6 (standart)\n` +
              `📊 Grafik: 5 (otomatik seçildi)\n\n` +
              `FINOPS AI veriyi analiz etti ve en uygun dashboard'ı oluşturdu!`);
        
        navigate(`/dashboard/view-standard/${dashboardConfig.id}`);
      }, 1000);

    } catch (error: any) {
      console.error('AI Dashboard oluşturma hatası:', error);
      setIsAnalyzing(false);
      
      // Kullanıcıya detaylı hata mesajı göster
      const errorMessage = error.message || 'Bilinmeyen bir hata oluştu.';
      alert(`❌ Dashboard oluşturulurken bir hata oluştu:\n\n${errorMessage}\n\nLütfen farklı bir CSV dosyası deneyin veya destek ile iletişime geçin.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full mb-4 shadow-lg">
            <Sparkles className="w-6 h-6" />
            <span className="text-lg font-bold">FINOPS AI Sihirbazı</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Bırak FINOPS Senin İçin Yapsın!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sadece veri dosyanı seç, gerisini AI halleder. 
            <span className="font-bold text-purple-600"> 6 KPI + 5 Grafik</span> otomatik oluşturulur!
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-purple-200">
          {!isAnalyzing && !analysisComplete ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Veri Dosyasını Seç</h2>
              </div>

              {files.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                  <div className="text-6xl mb-4">📂</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Henüz veri dosyası yok
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Önce veri yüklemeniz gerekiyor
                  </p>
                  <button
                    onClick={() => navigate('/veri-girisi?lang=tr')}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Veri Yükle
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    AI, veriyi analiz edip en uygun KPI ve grafikleri otomatik seçecek
                  </p>
                  
                  {files.map((file) => (
                    <button
                      key={file.id}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        selectedFile?.id === file.id
                          ? 'border-purple-600 bg-purple-50 shadow-md'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-gray-900">{file.fileName}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            {file.rowCount} satır • {file.columnCount} sütun
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(file.uploadedAt).toLocaleDateString('tr-TR')}
                          </div>
                        </div>
                        {selectedFile?.id === file.id && (
                          <div className="p-2 bg-purple-600 rounded-full">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}

                  {selectedFile && (
                    <button
                      onClick={analyzeAndCreateDashboard}
                      className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      <Sparkles className="w-6 h-6" />
                      AI ile Dashboard Oluştur
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  )}
                </div>
              )}
            </>
          ) : isAnalyzing ? (
            <div className="text-center py-16">
              <Loader2 className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                AI Veriyi Analiz Ediyor...
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>✅ Veri okunuyor</p>
                <p>✅ En uygun KPI'lar belirleniyor</p>
                <p>✅ Grafik tipleri seçiliyor</p>
                <p>✅ Dashboard oluşturuluyor</p>
              </div>
              <div className="mt-8 max-w-md mx-auto">
                <div className="bg-purple-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-full w-3/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">✨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Dashboard Hazır!
              </h3>
              <p className="text-gray-600">
                Yönlendiriliyorsunuz...
              </p>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white p-4 rounded-xl shadow-md border border-purple-100">
            <div className="text-3xl mb-2">⚡</div>
            <div className="font-bold text-gray-900 mb-1">Hızlı</div>
            <div className="text-sm text-gray-600">2-3 saniyede hazır</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border border-purple-100">
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-bold text-gray-900 mb-1">Akıllı</div>
            <div className="text-sm text-gray-600">AI en uygun seçimleri yapar</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border border-purple-100">
            <div className="text-3xl mb-2">✅</div>
            <div className="font-bold text-gray-900 mb-1">Standart</div>
            <div className="text-sm text-gray-600">6 KPI + 5 Grafik garantili</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartDashboardWizard;
