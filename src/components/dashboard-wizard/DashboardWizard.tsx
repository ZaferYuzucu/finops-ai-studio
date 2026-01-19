import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataSourceSelection } from './steps/DataSourceSelection';
import { KpiSelection } from './steps/KpiSelection';
import { ChartTypeSelection } from './steps/ChartTypeSelection';
import { AxisMapping } from './steps/AxisMapping';
import { Preview } from './steps/Preview';
import { SaveTemplate } from './steps/SaveTemplate';
import { useAuth } from '../../context/AuthContext';
import { getUserUploadedFiles, type UploadedFile } from '../../utils/userDataStorage';
import { parseCSVFile } from '../../utils/csvParser';
import { wizardStateToDashboardConfig, saveUserDashboardConfig } from '../../utils/wizardToConfig';
import { runtimeFileStore } from '../../store/runtimeFileStore';

export interface WizardState {
  // Veri Kaynağı
  selectedFile: UploadedFile | null;
  parsedData: {
    headers: string[];
    rows: any[];
    numericColumns: string[];
    categoryColumns: string[];
    dateColumn: string | null;
  } | null;
  
  // KPI'lar (6 ADET)
  selectedKpis: Array<{
    column: string;
    label: string;
    calculation: 'sum' | 'avg' | 'count' | 'max' | 'min' | 'formula';
    numerator?: string;  // Formul için pay
    denominator?: string;  // Formul için payda
  }>;
  
  // GRAFİKLER (5 ADET)
  selectedCharts: Array<{
    id: string;
    chartType: string;
    xAxis: { field: string; type: string } | null;
    yAxis: { field: string; type: string } | null;
    title: string;
  }>;
  
  // Kaydetme
  dashboardName: string;

  // Phase 2: Multi-dataset dashboard support (OPT-IN)
  multiDatasetMode?: boolean;
  referencedDatasets?: string[];
  semanticMappings?: Array<{ datasetId: string; column: string; semanticId: string }>;
  joinConfigs?: Array<{ leftDataset: string; rightDataset: string; joinType: 'inner' | 'left'; leftKey: string; rightKey: string }>;
  grain?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  aiSuggestionsEnabled?: boolean; // Disabled by default
}

const STEPS = ['Veri Seçimi', 'KPI Tanımlama (6)', 'Grafik Tanımlama (5)', 'Önizleme', 'Kaydet'];

export const DashboardWizard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<WizardState>({
    selectedFile: null,
    parsedData: null,
    selectedKpis: [],
    selectedCharts: [],
    dashboardName: ''
  });

  const [userFiles, setUserFiles] = useState<UploadedFile[]>([]);

  // GİRİŞ KONTROLÜ - Kullanıcı yoksa login'e yönlendir
  useEffect(() => {
    if (!currentUser) {
      alert('Dashboard olusturmak icin once giris yapmalisiniz.');
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // Kullanıcı dosyalarını yükle
  useEffect(() => {
    const loadFiles = () => {
      if (currentUser?.email) {
        const files = getUserUploadedFiles(currentUser.email);
        setUserFiles(files);
        
        // EĞER VERİ YOKSA UYARI GÖSTER
        if (files.length === 0) {
          // Kullanıcıya bilgi ver ama yönlendirme, kendi seçsin
          console.log('Kullanicinin veri dosyasi yok');
        }
      }
    };
    
    loadFiles();
    
    // Listen for file updates from other components
    const handleDataUpdate = () => {
      console.log('[DashboardWizard] File list updated, refreshing...');
      loadFiles();
    };
    
    window.addEventListener('finops-data-updated', handleDataUpdate);
    
    return () => {
      window.removeEventListener('finops-data-updated', handleDataUpdate);
    };
  }, [currentUser]);

  const updateState = (updates: Partial<WizardState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Dosya seçildiğinde parse et
  const handleFileSelect = async (file: UploadedFile) => {
    try {
      console.log('Dosya secildi:', file.fileName, 'ID:', file.id);
      
      // Fetch content from runtime store
      let text = runtimeFileStore.get(file.id);
      
      // If not in runtime store, try fallback sources
      if (!text) {
        console.warn('[DashboardWizard] Content not in runtime store, trying fallback sources...');
        
        // Fallback 1: demo-data folder
        try {
          const response = await fetch(`/demo-data/${file.fileName}`);
          if (response.ok) {
            text = await response.text();
            console.log('[DashboardWizard] Loaded from demo-data folder');
          }
        } catch (e) {
          console.log('[DashboardWizard] Not found in demo-data');
        }
        
        // Fallback 2: sample-data folder
        if (!text) {
          try {
            const response = await fetch(`/sample-data/${file.fileName}`);
            if (response.ok) {
              text = await response.text();
              console.log('[DashboardWizard] Loaded from sample-data folder');
            }
          } catch (e) {
            console.log('[DashboardWizard] Not found in sample-data');
          }
        }
      }
      
      // If still no content, show clear error
      if (!text) {
        throw new Error(
          '❌ Veri oturumu süresi doldu\n\n' +
          'Dosya içeriği bellekte bulunamadı.\n' +
          'Lütfen dosyayı tekrar yükleyin.\n\n' +
          'Not: Sayfa yenilendiğinde dosyaların içeriği silinir.'
        );
      }
      
      const blob = new Blob([text], { type: 'text/csv' });
      const fileObj = new File([blob], file.fileName, { type: 'text/csv' });
      
      const parsed = await parseCSVFile(fileObj);
      console.log('CSV Parse Edildi:', parsed.headers);
      console.log('Ilk 3 satir:', parsed.rows.slice(0, 3));
      
      // GÜÇLENDİRİLMİŞ Sütun tiplerini analiz et
      const numericColumns: string[] = [];
      const categoryColumns: string[] = [];
      let dateColumn: string | null = null;
      
      parsed.headers.forEach(header => {
        const values = parsed.rows.map(row => row[header]).filter(v => v != null && v !== '');
        
        if (values.length === 0) {
          console.log(`Sutun "${header}" bos`);
          return;
        }
        
        // Sayısal değer kontrolü - GÜÇLENDİRİLMİŞ
        const numericValues = values.filter(v => {
          // String ise temizle
          const cleanValue = String(v)
            .replace(/[₺$€£]/g, '') // Para birimi sembolleri
            .replace(/\./g, '')      // Binlik ayırıcı nokta
            .replace(/,/g, '.')      // Virgül ondalık ayırıcı
            .trim();
          
          const num = Number(cleanValue);
          return !isNaN(num) && isFinite(num);
        });
        
        const numericRatio = numericValues.length / values.length;
        const uniqueCount = new Set(values).size;
        
        console.log(`Sutun "${header}":`, {
          totalValues: values.length,
          numericValues: numericValues.length,
          numericRatio: numericRatio.toFixed(2),
          uniqueCount
        });
        
        // Tarih kontrolü
        if (header.toLowerCase().includes('tarih') || 
            header.toLowerCase().includes('date') ||
            header.toLowerCase().includes('ay') ||
            header.toLowerCase().includes('yil')) {
          dateColumn = header;
          console.log(`Tarih sutunu bulundu: ${header}`);
        }
        // Sayısal sütun (eşik %50'ye düşürüldü)
        else if (numericRatio > 0.5) {
          numericColumns.push(header);
          console.log(`Sayisal sutun: ${header}`);
        }
        // Kategori sütunu
        else if (uniqueCount < values.length * 0.5) {
          categoryColumns.push(header);
          console.log(`Kategori sutunu: ${header}`);
        }
      });

      console.log('SONUC:', { numericColumns, categoryColumns, dateColumn });

      updateState({
        selectedFile: file,
        parsedData: {
          headers: parsed.headers,
          rows: parsed.rows,
          numericColumns,
          categoryColumns,
          dateColumn
        }
      });
    } catch (error) {
      console.error('Dosya parse hatasi:', error);
      alert(`Dosya yuklenirken hata olustu:\n${error}\n\nLutfen dosyanin dogru formatta oldugundan emin olun.`);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0: return state.selectedFile !== null && state.parsedData !== null;
      case 1: return state.selectedKpis.length >= 1 && state.selectedKpis.length <= 6;
      case 2: return state.selectedCharts.length >= 1 && state.selectedCharts.length <= 5;
      case 3: return true;
      case 4: return state.dashboardName.trim().length > 0;
      default: return false;
    }
  };

  // Kullanıcı yoksa hiçbir şey gösterme
  if (!currentUser) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Kullanıcı Bilgisi */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
            {currentUser.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{currentUser.email}</p>
            <p className="text-xs text-gray-500">Dashboard Oluşturuluyor</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          ← Dashboard'a Dön
        </button>
      </div>

      {/* İlerleme Çubuğu */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Oluşturma Sihirbazı</h1>
          <span className="text-sm font-medium text-indigo-600">Adım {step + 1} / {STEPS.length}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                  i === step ? 'bg-indigo-600 text-white shadow-lg scale-110' : 
                  i < step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`mt-2 text-xs font-medium text-center ${
                  i === step ? 'text-indigo-600' : i < step ? 'text-green-600' : 'text-gray-500'
                }`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                  i < step ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Adım İçerikleri */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 min-h-[600px] border border-gray-100">
        {step === 0 && (
          <DataSourceSelection 
            userFiles={userFiles} 
            selectedFile={state.selectedFile}
            onFileSelect={handleFileSelect}
          />
        )}
        {step === 1 && state.parsedData && (
          <KpiSelection 
            state={state} 
            updateState={updateState}
            availableColumns={state.parsedData.numericColumns}
          />
        )}
        {step === 2 && state.parsedData && (
          <ChartTypeSelection 
            state={state} 
            updateState={updateState}
            parsedData={state.parsedData}
          />
        )}
        {step === 3 && <Preview state={state} />}
        {step === 4 && <SaveTemplate state={state} updateState={updateState} />}
      </div>

      {/* Navigasyon Butonları */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-all"
        >
          ← Geri
        </button>
        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={!canProceed()}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
          >
            İleri →
          </button>
        ) : (
          <button 
            onClick={() => {
              if (!currentUser?.email) {
                alert('Kullanıcı bilgisi bulunamadı. Lütfen tekrar giriş yapın.');
                return;
              }
              
              // ✅ PHASE 2: Dashboard Standardizasyonu
              // Wizard state'ini DashboardFactory config formatına çevir
              const dashboardConfig = wizardStateToDashboardConfig(state);
              
              // Config'i kaydet (localStorage)
              saveUserDashboardConfig(currentUser.email, dashboardConfig);
              
              alert(`✅ Dashboard "${state.dashboardName}" başarıyla kaydedildi!\n\n` +
                    `📊 Standart Format: DashboardFactory\n` +
                    `📁 Dosya: ${state.selectedFile?.fileName}\n` +
                    `📈 KPI: ${state.selectedKpis.length} → 6 (standart)\n` +
                    `📊 Grafik: ${state.selectedCharts.length} → 3 (standart)\n\n` +
                    `Dashboard'ınız profesyonel örneklerle aynı standartta oluşturuldu.`);
              
              // Kullanıcıyı dashboard sayfasına yönlendir
              navigate('/dashboard/my');
            }}
            disabled={!canProceed()}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
          >
            ✓ Tamamla ve Kaydet
          </button>
        )}
      </div>
    </div>
  );
};
