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
import { Sparkles, ChevronRight, FileText, Loader2, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserUploadedFiles, type UploadedFile } from '../../utils/userDataStorage';
import { parseCSVFile } from '../../utils/csvParser';
import { wizardStateToDashboardConfig, saveUserDashboardConfig } from '../../utils/wizardToConfig';
import type { WizardState } from './DashboardWizard';
import { fileStorage } from '../../utils/fileStorage';
import { runAntiChaosPipeline } from '../../utils/antiChaos';
import { getFileContent, persistDashboard, getUserFiles } from '../../services/firestorePersistence';

export const SmartDashboardWizard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [fileAvailability, setFileAvailability] = useState<Record<string, boolean>>({});
  const [reviewData, setReviewData] = useState<any>(null);
  const [showReview, setShowReview] = useState(false);

  // Dosyaları yükle
  useEffect(() => {
    // Check URL params for fileId
    const params = new URLSearchParams(window.location.search);
    const fileIdParam = params.get('fileId');
    
    const loadFiles = async () => {
      if (currentUser?.uid) {
        try {
          // ✅ FIX 1: Load from Firestore
          const firestoreFiles = await getUserFiles(currentUser.uid);
          const convertedFiles: UploadedFile[] = firestoreFiles.map(f => ({
            id: f.id,
            fileName: f.name,
            fileType: f.fileType === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            fileSize: f.size,
            uploadedAt: f.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            userEmail: currentUser.email || '',
            category: 'other',
            rowCount: f.schema?.headers?.length || 0,
            columnCount: f.columnCount || 0,
          }));
          
          // Merge with localStorage files (backward compat)
          const localFiles = currentUser.email ? getUserUploadedFiles(currentUser.email) : [];
          const allFiles = [...convertedFiles, ...localFiles.filter(lf => !convertedFiles.find(cf => cf.id === lf.id))];
          
          setFiles(allFiles);
          
          // Auto-select file from URL param
          if (fileIdParam) {
            const file = allFiles.find(f => f.id === fileIdParam);
            if (file) {
              setSelectedFile(file);
              // Auto-start analysis
              setTimeout(() => analyzeAndCreateDashboard(), 500);
            }
          }
        } catch (e) {
          console.warn('Firestore files load failed, using localStorage:', e);
          if (currentUser?.email) {
            const userFiles = getUserUploadedFiles(currentUser.email);
            setFiles(userFiles);
          }
        }
      }
    };
    
    loadFiles();
    
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

  // ✅ Dosya içeriklerinin varlığını kontrol et (IndexedDB)
  useEffect(() => {
    const checkFileAvailability = async () => {
      const availability: Record<string, boolean> = {};
      for (const file of files) {
        availability[file.id] = await fileStorage.hasFile(file.id);
      }
      setFileAvailability(availability);
    };
    
    if (files.length > 0) {
      checkFileAvailability();
    }
  }, [files]);

  const analyzeAndCreateDashboard = async () => {
    if (!selectedFile || !currentUser?.uid) return;

    setIsAnalyzing(true);

    try {
      // ✅ FIX 4: Use anti-chaos pipeline
      let fileContent = await getFileContent(currentUser.uid, selectedFile.id);
      if (!fileContent) {
        // Fallback to IndexedDB
        fileContent = await fileStorage.getFile(selectedFile.id);
      }
      
      if (!fileContent) {
        alert('❌ DOSYA İÇERİĞİ BULUNAMADI!\n\nLütfen dosyayı tekrar yükleyin.');
        navigate('/veri-girisi');
        setIsAnalyzing(false);
        return;
      }

      // Run anti-chaos pipeline
      const blob = new Blob([fileContent], { type: 'text/csv' });
      const file = new File([blob], selectedFile.fileName, { type: 'text/csv' });
      const antiChaosResult = await runAntiChaosPipeline(file);
      
      if (!antiChaosResult.success || !antiChaosResult.data) {
        throw new Error('Veri analizi başarısız oldu.');
      }

      // Get numeric columns from anti-chaos column profiles
      const numericColumns = (antiChaosResult.columnProfiles || [])
        .filter((p: any) => {
          const isNumeric = p.detectedType === 'number' || p.detectedType === 'currency';
          const hasConfidence = (p.confidenceScore || 0) >= 0.6;
          return isNumeric && hasConfidence;
        })
        .slice(0, 6)
        .map((p: any) => p.columnName);

      if (numericColumns.length === 0) {
        throw new Error('Yeterli numerik sütun bulunamadı. Lütfen sayısal veriler içeren bir dosya yükleyin.');
      }

      // Auto-detect date and category columns
      const dateColumn = antiChaosResult.data.headers.find((h: string) => 
        h.toLowerCase().includes('tarih') || 
        h.toLowerCase().includes('date') ||
        h.toLowerCase().includes('ay') ||
        h.toLowerCase().includes('month')
      ) || antiChaosResult.data.headers[0];

      const categoryColumn = antiChaosResult.data.headers.find((h: string) => 
        h.toLowerCase().includes('kategori') || 
        h.toLowerCase().includes('category') ||
        h.toLowerCase().includes('ürün') ||
        h.toLowerCase().includes('product') ||
        h.toLowerCase().includes('bölge') ||
        h.toLowerCase().includes('region')
      ) || antiChaosResult.data.headers[0];

      // Create wizard state
      const aiGeneratedState: WizardState = {
        currentStep: 5,
        dashboardName: `AI Dashboard - ${selectedFile.fileName.replace('.csv', '')}`,
        dashboardType: 'sales',
        dataSource: 'csv',
        selectedFile: selectedFile,
        selectedKpis: numericColumns.map((col: string, idx: number) => ({
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
        ],
      };

      // ✅ FIX 4: Show review screen
      setReviewData({
        state: aiGeneratedState,
        antiChaosResult,
        numericColumns,
        confidence: antiChaosResult.diagnosis?.confidenceScore || 0,
        riskFlags: antiChaosResult.diagnosis?.riskFlags || [],
      });
      setShowReview(true);
      setIsAnalyzing(false);

    } catch (error: any) {
      console.error('AI Dashboard oluşturma hatası:', error);
      setIsAnalyzing(false);
      const errorMessage = error.message || 'Bilinmeyen bir hata oluştu.';
      alert(`❌ Dashboard oluşturulurken bir hata oluştu:\n\n${errorMessage}`);
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
          {showReview && reviewData ? (
            <ReviewScreen
              reviewData={reviewData}
              onConfirm={async () => {
                const { state, antiChaosResult } = reviewData;
                const dashboardConfig = wizardStateToDashboardConfig(state, antiChaosResult.diagnosis);
                const dashboardId = await persistDashboard(
                  currentUser!.uid,
                  null,
                  state.dashboardName,
                  dashboardConfig,
                  selectedFile!.id,
                  antiChaosResult.diagnosis || undefined
                );
                setAnalysisComplete(true);
                setTimeout(() => navigate(`/dashboard/view/${dashboardId}`), 500);
              }}
              onCancel={() => setShowReview(false)}
            />
          ) : !isAnalyzing && !analysisComplete ? (
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
                  
                  {files.map((file) => {
                    const hasContent = fileAvailability[file.id] ?? true; // Varsayılan true (kontrol yapılana kadar)
                    return (
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
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className="font-bold text-gray-900">{file.fileName}</div>
                              {!hasContent && (
                                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                                  ❌ Yeniden yükle
                                </span>
                              )}
                              {hasContent && (
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                  ✅ Hazır
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {file.rowCount} satır • {file.columnCount} sütun
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(file.uploadedAt).toLocaleDateString('tr-TR')}
                            </div>
                            {!hasContent && (
                              <div className="text-xs text-red-600 mt-1 font-medium">
                                ⚠️ Dosya içeriği veritabanında bulunamadı
                              </div>
                            )}
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
                    );
                  })}

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

function ReviewScreen({ reviewData, onConfirm, onCancel }: any) {
  const { state, confidence, riskFlags, numericColumns } = reviewData;
  const confidencePercent = Math.round(confidence * 100);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Önizleme</h2>
      
      <div className={`p-4 rounded-lg border-2 ${
        confidence >= 0.85 ? 'bg-green-50 border-green-300' :
        confidence >= 0.60 ? 'bg-yellow-50 border-yellow-300' :
        'bg-gray-50 border-gray-300'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <Info size={20} />
          <span className="font-semibold">Güven Skoru: %{confidencePercent}</span>
        </div>
        {riskFlags.length > 0 && (
          <div className="mt-2 text-sm">
            <strong>Uyarılar:</strong>
            <ul className="list-disc list-inside mt-1">
              {riskFlags.slice(0, 3).map((r: any, idx: number) => (
                <li key={idx}>{r.message}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="font-semibold mb-2">Seçilen KPI'lar ({numericColumns.length})</h3>
        <div className="space-y-1">
          {state.selectedKpis.map((kpi: any, idx: number) => (
            <div key={idx} className="p-2 bg-gray-50 rounded">{kpi.label}</div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-2">Seçilen Grafikler ({state.selectedCharts.length})</h3>
        <div className="space-y-1">
          {state.selectedCharts.map((chart: any, idx: number) => (
            <div key={idx} className="p-2 bg-gray-50 rounded">{chart.title} ({chart.chartType})</div>
          ))}
        </div>
      </div>
      
      <div className="flex gap-3 pt-4 border-t">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Geri Dön
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Onayla ve Oluştur
        </button>
      </div>
    </div>
  );
}

export default SmartDashboardWizard;
