// UNIFIED DASHBOARD WIZARD
// Complete step-by-step dashboard creation using DashboardTemplateRegistry

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { dashboardTemplateRegistry, DashboardTemplate } from '../registry/DashboardTemplateRegistry';
import { useAuth } from '../context/AuthContext';
import { getUserUploadedFiles } from '../utils/userDataStorage';
import { runtimeFileStore } from '../store/runtimeFileStore';
import { CSVDataBinder } from '../services/csvDataBinder';
import Papa from 'papaparse';
import { Card } from '@tremor/react';

interface WizardState {
  step: number;
  selectedTemplate: DashboardTemplate | null;
  selectedFileId: string | null;
  csvData: any[] | null;
  bindingResult: any | null;
  dashboardName: string;
}

export const UnifiedDashboardWizardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [state, setState] = useState<WizardState>({
    step: 1,
    selectedTemplate: null,
    selectedFileId: null,
    csvData: null,
    bindingResult: null,
    dashboardName: ''
  });
  const [userFiles, setUserFiles] = useState<any[]>([]);
  const [templates, setTemplates] = useState<DashboardTemplate[]>([]);

  useEffect(() => {
    // Load templates
    const allTemplates = dashboardTemplateRegistry.getTemplates();
    setTemplates(allTemplates);

    // Load user files if logged in
    if (currentUser?.email) {
      const files = getUserUploadedFiles(currentUser.email);
      setUserFiles(files);
    }
  }, [currentUser]);

  const updateState = (updates: Partial<WizardState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (state.step < 5) {
      updateState({ step: state.step + 1 });
    }
  };

  const prevStep = () => {
    if (state.step > 1) {
      updateState({ step: state.step - 1 });
    }
  };

  const handleFileSelect = (fileId: string) => {
    updateState({ selectedFileId: fileId });

    // Get CSV content from runtime store
    const content = runtimeFileStore.get(fileId);
    if (!content) {
      console.warn('CSV not found in runtime store');
      updateState({ csvData: null, bindingResult: null });
      return;
    }

    // Parse CSV
    Papa.parse(content, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const data = result.data as any[];
        updateState({ csvData: data });

        // Bind to template if selected
        if (state.selectedTemplate) {
          const binding = CSVDataBinder.bind(state.selectedTemplate, data);
          updateState({ bindingResult: binding });
        }
      },
      error: (error) => {
        console.error('CSV parse error:', error);
        updateState({ csvData: null, bindingResult: null });
      }
    });
  };

  const handleComplete = () => {
    if (!currentUser?.email || !state.selectedTemplate) {
      alert('Please login and select a template');
      return;
    }

    // Clone template to user's dashboard collection
    const cloned = dashboardTemplateRegistry.cloneTemplate(
      state.selectedTemplate.id,
      currentUser.email
    );

    if (cloned) {
      alert(`✓ Dashboard "${state.dashboardName || state.selectedTemplate.name}" created!`);
      navigate('/dashboard/my');
    } else {
      alert('Failed to create dashboard');
    }
  };

  const canProceed = () => {
    switch (state.step) {
      case 1: return state.selectedTemplate !== null;
      case 2: return true; // Allow skip CSV
      case 3: return true; // Allow proceed with warnings
      case 4: return true; // Preview is informational
      case 5: return state.dashboardName.trim().length > 0;
      default: return false;
    }
  };

  const groupedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.sector]) {
      acc[template.sector] = [];
    }
    acc[template.sector].push(template);
    return acc;
  }, {} as Record<string, DashboardTemplate[]>);

  const sectorNames: Record<string, string> = {
    restaurant: 'Restoran & Kafe',
    hotel: 'Otel & Konaklama',
    automotive: 'Otomotiv',
    finance: 'Finans & Muhasebe',
    hr: 'İnsan Kaynakları',
    manufacturing: 'Üretim & Operasyon',
    sales: 'Satış & Pazarlama',
    agriculture: 'Tarım',
    ecommerce: 'E-Ticaret',
    education: 'Eğitim',
    other: 'Diğer'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Oluştur
          </h1>
          <p className="text-gray-600">
            Hazır şablonlardan birini seçin ve özelleştirin
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center mb-8 gap-2">
          {[1, 2, 3, 4, 5].map(num => (
            <div
              key={num}
              className={`h-2 rounded-full transition-all ${
                num === state.step ? 'w-12 bg-blue-600' :
                num < state.step ? 'w-8 bg-green-500' :
                'w-8 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Step Labels */}
        <div className="flex justify-between mb-6 text-xs text-gray-600 max-w-4xl mx-auto px-4">
          <span className={state.step === 1 ? 'font-bold text-blue-600' : ''}>Şablon Seç</span>
          <span className={state.step === 2 ? 'font-bold text-blue-600' : ''}>Veri Yükle</span>
          <span className={state.step === 3 ? 'font-bold text-blue-600' : ''}>Sütun Eşleştir</span>
          <span className={state.step === 4 ? 'font-bold text-blue-600' : ''}>Önizleme</span>
          <span className={state.step === 5 ? 'font-bold text-blue-600' : ''}>Onayla</span>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 min-h-[500px]">
          {/* STEP 1: Select Template */}
          {state.step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Bir Dashboard Şablonu Seçin
              </h2>
              <p className="text-gray-600 mb-6">
                Sektörünüze uygun hazır dashboard şablonlarından birini seçin
              </p>

              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                {Object.entries(groupedTemplates).map(([sector, sectorTemplates]) => (
                  <div key={sector}>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span>{sectorTemplates[0]?.icon || '📊'}</span>
                      <span>{sectorNames[sector] || sector}</span>
                      <span className="text-sm font-normal text-gray-500">({sectorTemplates.length})</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {sectorTemplates.map(template => (
                        <button
                          key={template.id}
                          onClick={() => updateState({ selectedTemplate: template })}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            state.selectedTemplate?.id === template.id
                              ? 'border-blue-600 bg-blue-50 shadow-lg'
                              : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                          }`}
                        >
                          <div className="text-3xl mb-2">{template.icon}</div>
                          <div className="font-bold text-sm text-gray-900 mb-1">{template.name}</div>
                          <div className="text-xs text-gray-600 line-clamp-2">{template.description}</div>
                          <div className="mt-2 text-xs text-gray-500">
                            {template.defaultLayout.kpiCount} KPI · {template.defaultLayout.chartCount} Chart
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Upload/Select CSV */}
          {state.step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Veri Kaynağı Seçin (Opsiyonel)
              </h2>
              <p className="text-gray-600 mb-6">
                CSV dosyanızı seçin veya örnek verilerle devam edin
              </p>

              {currentUser && userFiles.length > 0 ? (
                <div className="space-y-3">
                  <div
                    onClick={() => updateState({ selectedFileId: null, csvData: null, bindingResult: null })}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      !state.selectedFileId
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">📊</div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900">Örnek Verilerle Devam Et</div>
                        <div className="text-sm text-gray-600">Dashboard şablonu örnek verilerle gösterilecek</div>
                      </div>
                    </div>
                  </div>

                  {userFiles.map(file => (
                    <div
                      key={file.id}
                      onClick={() => handleFileSelect(file.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        state.selectedFileId === file.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Upload className="text-blue-600" size={24} />
                        <div className="flex-1">
                          <div className="font-bold text-gray-900">{file.fileName}</div>
                          <div className="text-sm text-gray-600">
                            {file.rowCount ? `${file.rowCount} satır` : 'CSV dosyası'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600 mb-4">Henüz yüklenmiş dosyanız yok</p>
                  <button
                    onClick={() => navigate('/veri-girisi')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Veri Yükle
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Column Mapping */}
          {state.step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Sütun Eşleştirme
              </h2>
              
              {state.bindingResult ? (
                <div className="space-y-4">
                  {/* Success/Warning Banner */}
                  <div className={`p-4 rounded-lg border-2 ${
                    state.bindingResult.success
                      ? 'bg-green-50 border-green-200'
                      : 'bg-yellow-50 border-yellow-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      {state.bindingResult.success ? (
                        <>
                          <CheckCircle className="text-green-600" size={24} />
                          <div>
                            <div className="font-bold text-green-900">Tüm Sütunlar Eşleşti</div>
                            <div className="text-sm text-green-700">CSV verileriniz başarıyla bağlandı</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="text-yellow-600" size={24} />
                          <div>
                            <div className="font-bold text-yellow-900">Kısmi Eşleşme</div>
                            <div className="text-sm text-yellow-700">
                              Bazı sütunlar eşleşmedi, örnek verilerle tamamlanacak
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Mapped Columns */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Eşleşen Sütunlar:</h3>
                    <div className="space-y-2">
                      {Object.entries(state.bindingResult.mappedColumns).map(([templateCol, csvCol]) => (
                        <div key={templateCol} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="text-green-600" size={16} />
                          <span className="text-sm font-semibold text-gray-900">{templateCol}</span>
                          <span className="text-sm text-gray-500">→</span>
                          <span className="text-sm text-gray-600">{csvCol}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Missing Columns */}
                  {state.bindingResult.missingColumns.length > 0 && (
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Eksik Sütunlar:</h3>
                      <div className="space-y-2">
                        {state.bindingResult.missingColumns.map((col: string) => (
                          <div key={col} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <AlertCircle className="text-gray-400" size={16} />
                            <span className="text-sm text-gray-600">{col}</span>
                            <span className="text-xs text-gray-500">(örnek veriyle doldurulacak)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="mx-auto text-blue-600 mb-4" size={48} />
                  <p className="text-gray-600 mb-2">Veri seçilmedi</p>
                  <p className="text-sm text-gray-500">Dashboard örnek verilerle oluşturulacak</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Preview */}
          {state.step === 4 && state.selectedTemplate && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Dashboard Önizlemesi
              </h2>
              <p className="text-gray-600 mb-6">
                Dashboard'unuzun yapısını kontrol edin
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{state.selectedTemplate.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {state.selectedTemplate.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{state.selectedTemplate.description}</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">Sektör:</span>
                        <span className="text-gray-600">{sectorNames[state.selectedTemplate.sector]}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">Veri Kaynağı:</span>
                        <span className="text-gray-600">
                          {state.selectedFileId ? userFiles.find(f => f.id === state.selectedFileId)?.fileName : 'Örnek Veri'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">KPI Sayısı:</span>
                        <span className="text-gray-600">{state.selectedTemplate.defaultLayout.kpiCount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">Grafik Sayısı:</span>
                        <span className="text-gray-600">{state.selectedTemplate.defaultLayout.chartCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview KPIs */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">KPI'lar:</h4>
                <div className="grid grid-cols-3 gap-3">
                  {state.selectedTemplate.defaultWidgets
                    .filter(w => w.type === 'kpi')
                    .map(widget => (
                      <div key={widget.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-xs font-semibold text-gray-600 uppercase mb-1">
                          {widget.title}
                        </div>
                        <div className="text-lg font-bold text-gray-400">-</div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Preview Charts */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Grafikler:</h4>
                <div className="grid grid-cols-3 gap-3">
                  {state.selectedTemplate.defaultWidgets
                    .filter(w => w.type === 'chart')
                    .map(widget => (
                      <div key={widget.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-center">
                        <div className="text-xs font-semibold text-gray-600">
                          {widget.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          ({widget.config.chartType})
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Confirm */}
          {state.step === 5 && state.selectedTemplate && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Dashboard'u Kaydet
              </h2>
              <p className="text-gray-600 mb-6">
                Dashboard'unuza bir isim verin
              </p>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dashboard Adı
                </label>
                <input
                  type="text"
                  value={state.dashboardName}
                  onChange={(e) => updateState({ dashboardName: e.target.value })}
                  placeholder={state.selectedTemplate.name}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{state.selectedTemplate.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {state.dashboardName || state.selectedTemplate.name}
                    </h3>
                    <div className="text-sm text-gray-600">
                      Dashboard'unuz kayıtlı dashboard'larınıza eklenecek ve istediğiniz zaman erişebilirsiniz.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={state.step === 1}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft size={20} />
            Geri
          </button>

          {state.step < 5 ? (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              İleri
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              <Check size={20} />
              Dashboard Oluştur
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnifiedDashboardWizardPage;
