import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, Database, FileSpreadsheet, Sparkles, ArrowRight, ArrowLeft, Check, Grid3x3, BarChart3, Settings, Eye, FolderOpen, FileText, Lightbulb, AlertTriangle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { dashboards } from '../data/dashboards';
import type { ChartType, DatasetProfile } from '../utils/chartWizard';
import { ChartSelectionPanel } from '../components/chart-wizard/ChartSelectionPanel';
import { ChartChoiceWizard } from '../components/chart-wizard/ChartChoiceWizard';
import { CHART_META } from '../components/chart-wizard/chartMeta';
import { useAuth } from '../context/AuthContext';
import type { DashboardBuilderWizardData } from '../types/userDashboard';
import { createUserDashboard, getUserDashboard, updateUserDashboard } from '../utils/userDashboards';
import { listTemplateLibrary } from '../utils/templateLibrary';
import { getUserUploadedFiles, DATA_CATEGORIES, type UploadedFile, type DataCategory } from '../utils/userDataStorage';
import { createDashboardFromLibrary, createDashboardWithData } from '../utils/dashboardProcessor';
import { parseCSVFile, detectNumericColumns, detectCategoryColumns, detectDateColumn } from '../utils/csvParser';

// Kategori renk eşleştirmesi (Tailwind için statik)
const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-700' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-700' },
  green: { bg: 'bg-green-100', text: 'text-green-700' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-700' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  gray: { bg: 'bg-gray-100', text: 'text-gray-700' },
};

// Multi-step wizard için step tanımları
type WizardStep = 1 | 2 | 3 | 4 | 5;

interface WizardData {
  dashboardName: string;
  dataSource: 'library' | 'upload' | 'integration' | 'demo' | null;
  selectedLibraryFile: UploadedFile | null;
  dashboardType: 'template' | 'custom' | null;
  selectedTemplate: string | null;
  uploadedFile: File | null;
  selectedIntegration: string | null;
  columnMapping: Record<string, string>;
  customizations: {
    chartTypes: ChartType[];
    selectedMetrics: string[];
    colorScheme: string;
    chartSettings?: {
      dateRange?: '30d' | '90d' | 'ytd' | 'all';
      topN?: number;
      bottomN?: number;
      stacked?: boolean;
      includePdfTable?: boolean;
    };
  };
}

const DashboardCreateWizardPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const editId = id;
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [showChartWizard, setShowChartWizard] = useState(false);
  const [datasetProfile, setDatasetProfile] = useState<DatasetProfile>({
    hasDate: true,
    hasCategory: true,
    isRatio: false,
    hasBridgeSteps: false,
    rowCount: 365,
    categoryCount: 10,
    seriesCount: 3,
  });
  const [wizardData, setWizardData] = useState<WizardData>({
    dashboardName: '',
    dataSource: null,
    dashboardType: null,
    selectedTemplate: null,
    uploadedFile: null,
    selectedLibraryFile: null,
    selectedIntegration: null,
    columnMapping: {},
    customizations: {
      chartTypes: ['line'],
      selectedMetrics: [],
      colorScheme: 'blue',
    },
  });
  
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [userLibraryFiles, setUserLibraryFiles] = useState<UploadedFile[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<DataCategory | 'all'>('all');
  
  // CSV sütunları ve seçimler
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [csvAnalysis, setCsvAnalysis] = useState<{
    numericColumns: string[];
    categoryColumns: string[];
    dateColumn: string | null;
  }>({ numericColumns: [], categoryColumns: [], dateColumn: null });
  
  // CSV preview data (first 10 rows)
  const [csvPreviewData, setCsvPreviewData] = useState<Record<string, any>[]>([]);
  
  // Dashboard Architecture (NEW!)
  const [dashboardArchitecture, setDashboardArchitecture] = useState<{
    kpiCount: 0 | 3 | 4 | 6;
    chartCount: 0 | 2 | 3 | 4 | 5 | 6;
    layoutType: 'auto' | 'custom';
  }>({ kpiCount: 3, chartCount: 3, layoutType: 'auto' });
  
  // KPI Configuration
  const [kpiConfigs, setKpiConfigs] = useState<Array<{
    id: string;
    title: string;
    column: string | null;
    calculation: 'sum' | 'avg' | 'max' | 'min' | 'count';
    showTrend: boolean;
  }>>([]);
  
  // Chart Configuration
  const [chartConfigs, setChartConfigs] = useState<Array<{
    id: string;
    chartType: ChartType;
    xAxis: string | null;
    yAxis: string[];
    title: string;
  }>>([]);
  
  // Step 4 substep (wizard içinde wizard!)
  const [step4SubStep, setStep4SubStep] = useState<1 | 2 | 3>(1);

  const userId = currentUser?.uid ?? '';

  const libraryTemplates = useMemo(() => listTemplateLibrary(), []);

  // Kullanıcının kütüphane dosyalarını yükle
  useEffect(() => {
    if (currentUser?.email) {
      const files = getUserUploadedFiles(currentUser.email);
      setUserLibraryFiles(files);
    }
  }, [currentUser]);

  // Step 4'e gelince CSV'yi parse et
  useEffect(() => {
    if (currentStep === 4) {
      const loadCSVHeaders = async () => {
        let file: File | null = null;
        
        // Kütüphaneden seçilmiş dosya varsa
        if (wizardData.selectedLibraryFile) {
          // Public klasöründen yükle
          try {
            const response = await fetch(`/demo-data/${wizardData.selectedLibraryFile.fileName}`);
            const text = await response.text();
            const blob = new Blob([text], { type: 'text/csv' });
            file = new File([blob], wizardData.selectedLibraryFile.fileName, { type: 'text/csv' });
          } catch (error) {
            console.error('CSV yükleme hatası:', error);
            return;
          }
        } else if (wizardData.uploadedFile) {
          file = wizardData.uploadedFile;
        }

        if (file) {
          try {
            const parsed = await parseCSVFile(file);
            const headers = parsed.headers;
            setCsvHeaders(headers);
            
            // CSV Preview (first 10 rows)
            setCsvPreviewData(parsed.rows.slice(0, 10));
            
            // Otomatik analiz
            const numericCols = detectNumericColumns(parsed);
            const categoryCols = detectCategoryColumns(parsed);
            const dateCol = detectDateColumn(parsed);
            
            setCsvAnalysis({
              numericColumns: numericCols,
              categoryColumns: categoryCols,
              dateColumn: dateCol,
            });

            // Dataset profili güncelle
            setDatasetProfile({
              hasDate: !!dateCol,
              hasCategory: categoryCols.length > 0,
              isRatio: false,
              hasBridgeSteps: false,
              rowCount: parsed.rows.length,
              categoryCount: categoryCols.length,
              seriesCount: numericCols.length,
            });

            // Varsayılan olarak tüm sayısal sütunları seç
            setSelectedColumns(numericCols);
            
            // Auto-initialize KPI configs based on architecture
            const defaultKpis = numericCols.slice(0, dashboardArchitecture.kpiCount || 3).map((col, idx) => ({
              id: `kpi-${idx + 1}`,
              title: col,
              column: col,
              calculation: 'sum' as const,
              showTrend: true,
            }));
            setKpiConfigs(defaultKpis);
            
            // Auto-initialize Chart configs
            const defaultCharts = Array.from({ length: dashboardArchitecture.chartCount || 3 }, (_, idx) => ({
              id: `chart-${idx + 1}`,
              chartType: (idx === 0 ? 'line' : idx === 1 ? 'bar' : 'donut') as ChartType,
              xAxis: dateCol || categoryCols[0] || null,
              yAxis: [numericCols[idx] || numericCols[0]].filter(Boolean),
              title: `Grafik ${idx + 1}`,
            }));
            setChartConfigs(defaultCharts);
          } catch (error) {
            console.error('CSV parsing hatası:', error);
          }
        }
      };
      
      loadCSVHeaders();
    }
  }, [currentStep, wizardData.selectedLibraryFile, wizardData.uploadedFile]);

  // Load existing dashboard for editing
  useEffect(() => {
    if (!editId) return;
    if (!userId) return;
    const existing = getUserDashboard(userId, editId);
    if (!existing) {
      navigate('/dashboard/my');
      return;
    }
    setWizardData((prev) => ({
      ...prev,
      dashboardName: existing.wizardData.dashboardName ?? existing.name ?? '',
      dataSource: existing.wizardData.dataSource,
      dashboardType: existing.wizardData.dashboardType,
      selectedTemplate: existing.wizardData.selectedTemplate,
      uploadedFile: null, // cannot restore persisted File
      selectedIntegration: existing.wizardData.selectedIntegration,
      columnMapping: existing.wizardData.columnMapping ?? {},
      customizations: existing.wizardData.customizations ?? prev.customizations,
    }));
    setCurrentStep(5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId, userId]);

  // Dropzone için callback
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setWizardData({ ...wizardData, uploadedFile: acceptedFiles[0], dataSource: 'upload' });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/json': ['.json'],
    },
    maxFiles: 1,
  });

  // Progress bar hesaplama
  const progress = (currentStep / 5) * 100;

  // Step kontrolü
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        // Kütüphane seçildiyse dosya da seçilmiş olmalı
        if (wizardData.dataSource === 'library') {
          return wizardData.selectedLibraryFile !== null;
        }
        return wizardData.dataSource !== null;
      case 2:
        return wizardData.dashboardType !== null;
      case 3:
        return true; // Mapping opsiyonel
      case 4:
        return true; // Customization opsiyonel
      case 5:
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (canProceed() && currentStep < 5) {
      setCurrentStep((currentStep + 1) as WizardStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as WizardStep);
    }
  };

  const handleFinish = async () => {
    if (!userId) {
      alert('Giriş yapılmadan dashboard kaydedilemez.');
      navigate('/login');
      return;
    }

    const name = wizardData.dashboardName.trim();
    if (!name) {
      alert('Lütfen dashboard için bir isim girin.');
      return;
    }

    const payload: DashboardBuilderWizardData = {
      dashboardName: name,
      datasetProfileSnapshot: datasetProfile,
      dataSource: wizardData.dataSource,
      dashboardType: wizardData.dashboardType,
      selectedTemplate: wizardData.selectedTemplate,
      uploadedFileMeta: wizardData.uploadedFile
        ? {
            name: wizardData.uploadedFile.name,
            size: wizardData.uploadedFile.size,
            type: wizardData.uploadedFile.type,
          }
        : null,
      selectedLibraryFileId: wizardData.selectedLibraryFile?.id,
      selectedLibraryFileName: wizardData.selectedLibraryFile?.fileName,
      selectedIntegration: wizardData.selectedIntegration,
      columnMapping: wizardData.columnMapping ?? {},
      customizations: wizardData.customizations,
    };

    try {
      if (editId) {
        updateUserDashboard(userId, editId, payload);
      } else {
        // Yeni dashboard oluştur ve CSV'yi işle
        if (wizardData.dataSource === 'library' && wizardData.selectedLibraryFile) {
          await createDashboardFromLibrary(userId, payload, wizardData.selectedLibraryFile.fileName);
        } else if (wizardData.uploadedFile) {
          await createDashboardWithData(userId, payload, wizardData.uploadedFile);
        } else {
          // Demo veya diğer kaynaklar için sadece metadata kaydet
          createUserDashboard(userId, payload);
        }
      }

      // Başarılı, yönlendir
      navigate('/dashboard/my');
    } catch (error) {
      console.error('Dashboard oluşturma hatası:', error);
      alert('Dashboard oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const pageTitle = useMemo(() => (editId ? 'Dashboard Düzenle' : 'Dashboard Oluştur'), [editId]);

  // Entegrasyon seçenekleri
  const integrations = [
    { id: 'logo', name: 'Logo Yazılım', icon: '🟢' },
    { id: 'netsis', name: 'Netsis', icon: '🔴' },
    { id: 'parasut', name: 'Paraşüt', icon: '🟠' },
    { id: 'aws', name: 'Amazon AWS', icon: '🟡' },
    { id: 'azure', name: 'Microsoft Azure', icon: '🔵' },
    { id: 'googlecloud', name: 'Google Cloud', icon: '🟣' },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {pageTitle}
          </h1>
          <p className="text-lg text-gray-600">
            Kendi verilerinizle özelleştirilmiş dashboard'lar oluşturun
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Adım {currentStep} / 5</span>
            <span className="text-sm font-medium text-indigo-600">{Math.round(progress)}% Tamamlandı</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {[
              { num: 1, icon: Database, label: 'Veri Kaynağı' },
              { num: 2, icon: Grid3x3, label: 'Dashboard Tipi' },
              { num: 3, icon: FileSpreadsheet, label: 'Eşleştirme' },
              { num: 4, icon: Settings, label: 'Özelleştirme' },
              { num: 5, icon: Eye, label: 'Önizleme' },
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    currentStep >= step.num
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {currentStep > step.num ? (
                    <Check size={20} />
                  ) : (
                    <step.icon size={20} />
                  )}
                </div>
                <span className="text-xs mt-2 text-gray-600 hidden sm:block">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[500px]">
          {/* STEP 1: Veri Kaynağı Seçimi */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Veri Kütüphanenizden Seçin</h2>

              {userLibraryFiles.length === 0 ? (
                <div className="text-center py-12">
                  <FolderOpen className="mx-auto h-20 w-20 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Veri Kütüphaneniz Boş</h3>
                  <p className="text-gray-600 mb-6">Önce veri yüklemeniz gerekiyor</p>
                  <button
                    onClick={() => navigate('/veri-girisi')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Upload size={20} />
                    Veri Yükle
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Kategori Filtresi */}
                  <div className="flex items-center gap-4 mb-4">
                    <label className="text-sm font-semibold text-gray-700">Kategori:</label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value as DataCategory | 'all')}
                      className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">Tümü ({userLibraryFiles.length})</option>
                      {Object.entries(DATA_CATEGORIES).map(([key, cat]) => {
                        const count = userLibraryFiles.filter(f => f.category === key).length;
                        if (count === 0) return null;
                        return (
                          <option key={key} value={key}>
                            {cat.icon} {cat.name} ({count})
                          </option>
                        );
                      })}
                    </select>
                    <div className="flex-1"></div>
                    <button
                      onClick={() => navigate('/veri-girisi')}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md font-medium text-sm"
                    >
                      <Upload size={18} />
                      Yeni Veri Yükle
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userLibraryFiles
                      .filter(file => categoryFilter === 'all' || file.category === categoryFilter)
                      .map((file) => {
                        const category = DATA_CATEGORIES[file.category];
                        return (
                      <div
                        key={file.id}
                        onClick={() => {
                          setWizardData({
                            ...wizardData,
                            dataSource: 'library',
                            selectedLibraryFile: file,
                          });
                        }}
                        className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:scale-105 ${
                          wizardData.selectedLibraryFile?.id === file.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">{category.icon}</div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate mb-1">{file.fileName}</h3>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-2 py-0.5 text-xs rounded-full ${CATEGORY_COLORS[category.color]?.bg || 'bg-gray-100'} ${CATEGORY_COLORS[category.color]?.text || 'text-gray-700'} font-medium`}>
                                {category.name}
                              </span>
                              {file.branchName && (
                                <span className="text-xs text-gray-600">🏢 {file.branchName}</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">
                              {new Date(file.uploadedAt).toLocaleDateString('tr-TR')}
                            </p>
                            {file.description && (
                              <p className="text-xs text-gray-600 mt-1 truncate">{file.description}</p>
                            )}
                          </div>
                          {wizardData.selectedLibraryFile?.id === file.id && (
                            <Check className="text-blue-600 flex-shrink-0" size={24} />
                          )}
                        </div>
                      </div>
                    );
                  })}
                  </div>
                </div>
              )}

              {/* Admin için Örnek Veri */}
              {currentUser?.role === 'admin' && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Admin: B2B Demo Verileri</h3>
                  <div
                    onClick={() => setWizardData({ ...wizardData, dataSource: 'demo', selectedLibraryFile: null })}
                    className={`border-2 rounded-xl p-6 text-center cursor-pointer transition-all hover:scale-105 ${
                      wizardData.dataSource === 'demo'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    <Sparkles className="mx-auto mb-4 text-green-600" size={48} />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Örnek Veri (Demo)</h3>
                    <p className="text-sm text-gray-600">
                      B2B sunumlar için hazır demo veri
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Dashboard Tipi Seçimi */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Tipi Seçin</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hazır Şablon */}
                <div
                  onClick={() => setWizardData({ ...wizardData, dashboardType: 'template' })}
                  className={`border-2 rounded-xl p-8 cursor-pointer transition-all hover:scale-105 ${
                    wizardData.dashboardType === 'template'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-300 hover:border-indigo-400'
                  }`}
                >
                  <Grid3x3 className="mx-auto mb-4 text-indigo-600" size={64} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                    Hazır Şablon
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    26 profesyonel dashboard şablonundan birini seçin
                  </p>
                </div>

                {/* Boş Dashboard */}
                <div
                  onClick={() => setWizardData({ ...wizardData, dashboardType: 'custom' })}
                  className={`border-2 rounded-xl p-8 cursor-pointer transition-all hover:scale-105 ${
                    wizardData.dashboardType === 'custom'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                >
                  <BarChart3 className="mx-auto mb-4 text-purple-600" size={64} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                    Boş Dashboard
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    Sıfırdan kendi özelleştirilmiş dashboard'unuzu oluşturun
                  </p>
                </div>
              </div>

              {/* Şablon seçildiyse şablon listesi */}
              {wizardData.dashboardType === 'template' && (
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Şablon Seçin:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {dashboards.map((dashboard) => (
                      <button
                        key={dashboard.id}
                        onClick={() =>
                          setWizardData({ ...wizardData, selectedTemplate: dashboard.id })
                        }
                        className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-lg ${
                          wizardData.selectedTemplate === dashboard.id
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <img
                            src={dashboard.imageUrl}
                            alt={dashboard.name}
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">
                              {dashboard.name}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {dashboard.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Admin onaylı şablonlar (konfigürasyon tabanlı) */}
                  {libraryTemplates.length > 0 && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <h4 className="text-sm font-extrabold text-gray-900">
                          Admin Onaylı Şablonlar
                        </h4>
                        <span className="text-xs font-bold text-gray-600">
                          {libraryTemplates.length} adet
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {libraryTemplates.slice(0, 20).map((t) => {
                          const id = `lib:${t.id}`;
                          const selected = wizardData.selectedTemplate === id;
                          return (
                            <button
                              key={t.id}
                              onClick={() => {
                                setWizardData((prev) => ({
                                  ...prev,
                                  selectedTemplate: id,
                                  // Apply template customizations (no data)
                                  customizations: t.wizardData.customizations ?? prev.customizations,
                                  // If user hasn't set a name yet, propose one
                                  dashboardName: prev.dashboardName?.trim()
                                    ? prev.dashboardName
                                    : `${t.name} (Kopya)`,
                                }));
                              }}
                              className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                                selected
                                  ? 'border-emerald-500 bg-emerald-50'
                                  : 'border-gray-200 hover:border-emerald-300'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="text-sm font-extrabold text-gray-900 truncate">
                                    {t.name}
                                  </div>
                                  <div className="mt-1 text-[11px] text-gray-600">
                                    {t.sectorLabel ? `${t.sectorLabel} • ` : ''}
                                    Admin onaylı şablon
                                  </div>
                                  <div className="mt-2 text-xs text-gray-600">
                                    Grafik: {t.wizardData.customizations?.chartTypes?.[0] ?? '—'}
                                  </div>
                                </div>
                                <span className="text-xs font-bold px-2 py-1 rounded-full bg-emerald-600 text-white">
                                  Şablon
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <div className="mt-2 text-[11px] text-gray-500">
                        Not: Bu şablonlar “konfigürasyon” kopyalar; veri içermez.
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Veri Eşleştirme */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Veri Eşleştirme</h2>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8 text-center">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
                    <Sparkles size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Otomatik Veri Eşleştirme
                </h3>
                <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                  Sistemimiz verilerinizin sütunlarını otomatik olarak analiz eder ve 
                  dashboard alanlarıyla en uygun şekilde eşleştirir.
                </p>
                <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <Check className="text-green-600" size={20} />
                    Tarih sütunları
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="text-green-600" size={20} />
                    Sayısal veriler
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="text-green-600" size={20} />
                    Kategoriler
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>İpucu:</strong> Veri eşleştirmesi dashboard oluşturulurken otomatik olarak yapılır. 
                  Manuel müdahaleye gerek yoktur.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: Dashboard İnşa Sihirbazı (3 Sub-Step) */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {/* Sub-Step Progress */}
              <div className="flex items-center justify-center gap-4 mb-6">
                {[
                  { num: 1, label: 'Mimari' },
                  { num: 2, label: 'KPI\'lar' },
                  { num: 3, label: 'Grafikler' },
                ].map((step) => (
                  <div key={step.num} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        step4SubStep >= step.num
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {step4SubStep > step.num ? <Check size={16} /> : step.num}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{step.label}</span>
                    {step.num < 3 && <ArrowRight size={16} className="text-gray-400" />}
                  </div>
                ))}
              </div>

              {/* SUB-STEP 1: Dashboard Mimarisi */}
              {step4SubStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">🏗️ Dashboard Mimarinizi Tasarlayın</h2>
                    <p className="text-gray-600">Dashboard'unuzda kaç KPI ve kaç grafik olsun?</p>
                    
                    {/* DASHBOARD HAZIR LAMA REHBERİ BUTONU */}
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => window.open('/dashboard/preparation-guide', '_blank')}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                      >
                        <Lightbulb size={20} className="animate-pulse" />
                        <span className="font-semibold">📊 Dashboard Hazırlama Rehberi</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                    
                    <p className="text-sm text-purple-600 mt-2">
                      💡 <strong>Kapsamlı rehber:</strong> Mimari • KPI • Grafik • Entegrasyon
                    </p>
                  </div>

                  {/* CSV PREVIEW TABLE */}
                  {csvPreviewData.length > 0 && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border-2 border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-900">📊 Veri Önizleme (İlk 10 Satır)</h3>
                        <span className="text-sm text-gray-600">{datasetProfile.rowCount} satır × {csvHeaders.length} sütun</span>
                      </div>
                      <div className="bg-white rounded-lg overflow-auto max-h-64 border border-gray-300">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-100 sticky top-0">
                            <tr>
                              {csvHeaders.map((header) => (
                                <th key={header} className="px-3 py-2 text-left font-semibold text-gray-900 border-b border-gray-300 whitespace-nowrap">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {csvPreviewData.map((row, idx) => (
                              <tr key={idx} className="hover:bg-gray-50 border-b border-gray-200">
                                {csvHeaders.map((header) => (
                                  <td key={header} className="px-3 py-2 text-gray-700 whitespace-nowrap">
                                    {row[header] ?? '—'}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* KPI COUNT SELECTION */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-gray-900">❓ Kaç KPI Kartı İstiyorsunuz? (Üst Bölüm)</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                      <p className="text-xs text-blue-900">
                        <strong>💡 Rehber Önerisi:</strong> Üretim/Finans: 4-6 KPI • Satış: 3-4 KPI • KPI nedir? → Ana metrikler (Toplam, Ortalama, Trend)
                      </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { count: 0, label: 'Yok', icon: '🚫' },
                        { count: 3, label: '3 Kart', icon: '●●●' },
                        { count: 4, label: '4 Kart', icon: '●●●●' },
                        { count: 6, label: '6 Kart', icon: '●●●●●●' },
                      ].map((option) => (
                        <button
                          key={option.count}
                          onClick={() => setDashboardArchitecture({ ...dashboardArchitecture, kpiCount: option.count as any })}
                          className={`p-4 rounded-xl border-2 transition-all text-center ${
                            dashboardArchitecture.kpiCount === option.count
                              ? 'border-indigo-600 bg-indigo-50'
                              : 'border-gray-300 hover:border-indigo-400'
                          }`}
                        >
                          <div className="text-3xl mb-2">{option.icon}</div>
                          <div className="font-bold text-gray-900">{option.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CHART COUNT SELECTION */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-gray-900">❓ Kaç Grafik İstiyorsunuz? (Orta/Alt Bölüm)</h3>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-3">
                      <p className="text-xs text-purple-900">
                        <strong>💡 Rehber Önerisi:</strong> 5 Grafik (3+2 düzen) dengeli ve estetik • 3 Grafik: Basit dashboard'lar için
                      </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {[
                        { count: 2, label: '2 Grafik', layout: 'Yan yana' },
                        { count: 3, label: '3 Grafik', layout: '2+1 düzen' },
                        { count: 4, label: '4 Grafik', layout: '2×2 grid' },
                        { count: 5, label: '5 Grafik', layout: '3+2 düzen' },
                        { count: 6, label: '6 Grafik', layout: '3×2 grid' },
                      ].map((option) => (
                        <button
                          key={option.count}
                          onClick={() => setDashboardArchitecture({ ...dashboardArchitecture, chartCount: option.count as any })}
                          className={`p-4 rounded-xl border-2 transition-all text-center ${
                            dashboardArchitecture.chartCount === option.count
                              ? 'border-purple-600 bg-purple-50'
                              : 'border-gray-300 hover:border-purple-400'
                          }`}
                        >
                          <div className="font-bold text-gray-900 mb-1">{option.label}</div>
                          <div className="text-xs text-gray-600">{option.layout}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ARCHITECTURE PREVIEW */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-300">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">📐 Dashboard Önizleme</h3>
                    <div className="space-y-3">
                      {/* KPI Row */}
                      {dashboardArchitecture.kpiCount > 0 && (
                        <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${dashboardArchitecture.kpiCount}, 1fr)` }}>
                          {Array.from({ length: dashboardArchitecture.kpiCount }).map((_, i) => (
                            <div key={i} className="bg-indigo-100 border border-indigo-300 rounded p-3 text-center">
                              <div className="text-xs font-bold text-indigo-900">KPI {i + 1}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Chart Grid */}
                      {dashboardArchitecture.chartCount === 5 ? (
                        <div className="space-y-2">
                          {/* İlk 3 Grafik */}
                          <div className="grid grid-cols-3 gap-2">
                            {Array.from({ length: 3 }).map((_, i) => (
                              <div key={i} className="bg-purple-100 border border-purple-300 rounded p-4 text-center">
                                <div className="text-xs font-bold text-purple-900">Grafik {i + 1}</div>
                              </div>
                            ))}
                          </div>
                          {/* Son 2 Grafik (Ortalanmış) */}
                          <div className="grid grid-cols-2 gap-2 max-w-2xl mx-auto">
                            {Array.from({ length: 2 }).map((_, i) => (
                              <div key={i + 3} className="bg-purple-100 border border-purple-300 rounded p-4 text-center">
                                <div className="text-xs font-bold text-purple-900">Grafik {i + 4}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className={`grid gap-2`} style={{ gridTemplateColumns: dashboardArchitecture.chartCount === 2 ? 'repeat(2, 1fr)' : dashboardArchitecture.chartCount === 3 ? 'repeat(2, 1fr)' : dashboardArchitecture.chartCount === 4 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)' }}>
                          {Array.from({ length: dashboardArchitecture.chartCount }).map((_, i) => (
                            <div key={i} className={`bg-purple-100 border border-purple-300 rounded p-4 text-center ${dashboardArchitecture.chartCount === 3 && i === 2 ? 'col-span-2' : ''}`}>
                              <div className="text-xs font-bold text-purple-900">Grafik {i + 1}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        // Initialize KPI & Chart configs based on architecture
                        const newKpis = Array.from({ length: dashboardArchitecture.kpiCount }, (_, i) => ({
                          id: `kpi-${i + 1}`,
                          title: csvAnalysis.numericColumns[i] || `KPI ${i + 1}`,
                          column: csvAnalysis.numericColumns[i] || null,
                          calculation: 'sum' as const,
                          showTrend: true,
                        }));
                        setKpiConfigs(newKpis);

                        const newCharts = Array.from({ length: dashboardArchitecture.chartCount }, (_, i) => ({
                          id: `chart-${i + 1}`,
                          chartType: (i === 0 ? 'line' : i === 1 ? 'bar' : 'donut') as ChartType,
                          xAxis: csvAnalysis.dateColumn || csvAnalysis.categoryColumns[0] || null,
                          yAxis: [csvAnalysis.numericColumns[i] || csvAnalysis.numericColumns[0]].filter(Boolean),
                          title: `Grafik ${i + 1}`,
                        }));
                        setChartConfigs(newCharts);
                        
                        setStep4SubStep(2);
                      }}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all"
                    >
                      Devam Et →
                    </button>
                  </div>
                </div>
              )}

              {/* SUB-STEP 2: KPI Configuration */}
              {step4SubStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">📊 KPI Kartlarınızı Yapılandırın</h2>
                    <p className="text-gray-600">Her KPI kartı için 4 bilgi doldur: Başlık • Sütun • Hesaplama • Trend</p>
                    
                    {/* REHBER İPUÇLARI */}
                    <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-4 text-left max-w-4xl mx-auto">
                      <p className="text-sm font-bold text-blue-900 mb-2">💡 Rehberden Hatırlatma:</p>
                      <div className="text-xs text-blue-800 space-y-1">
                        <p>1️⃣ <strong>Başlık:</strong> Anlaşılır isim ver (örn: "Toplam Üretim", "Ortalama Maliyet")</p>
                        <p>2️⃣ <strong>Sütun:</strong> Dropdown'dan sayısal sütun seç (sürükle-bırak YOK)</p>
                        <p>3️⃣ <strong>Hesaplama:</strong> SUM (toplam), AVG (ortalama), MAX (en yüksek), MIN (en düşük)</p>
                        <p>4️⃣ <strong>Trend:</strong> Aylık değişimi göster mi? (MoM trendi)</p>
                      </div>
                    </div>
                  </div>

                  {dashboardArchitecture.kpiCount === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                      <p className="text-gray-600">KPI kartı eklemediniz. Bu adımı atlayabilirsiniz.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {kpiConfigs.map((kpi, index) => (
                        <div key={kpi.id} className="border-2 border-blue-200 rounded-xl p-5 bg-blue-50">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">KPI Kartı #{index + 1}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Title */}
                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">📌 Kart Başlığı</label>
                              <input
                                type="text"
                                value={kpi.title}
                                onChange={(e) => {
                                  const newKpis = [...kpiConfigs];
                                  newKpis[index].title = e.target.value;
                                  setKpiConfigs(newKpis);
                                }}
                                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                                placeholder="Örn: Toplam Satış"
                              />
                            </div>

                            {/* Column Selection */}
                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">🔢 Veri Sütunu</label>
                              <select
                                value={kpi.column || ''}
                                onChange={(e) => {
                                  const newKpis = [...kpiConfigs];
                                  newKpis[index].column = e.target.value;
                                  setKpiConfigs(newKpis);
                                }}
                                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                              >
                                <option value="" className="text-gray-500">Seçiniz...</option>
                                {csvAnalysis.numericColumns.map((col) => (
                                  <option key={col} value={col} className="text-gray-900">{col}</option>
                                ))}
                              </select>
                            </div>

                            {/* Calculation Type */}
                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">⚙️ Hesaplama</label>
                              <div className="flex gap-2">
                                {[
                                  { value: 'sum', label: 'Toplam' },
                                  { value: 'avg', label: 'Ortalama' },
                                  { value: 'max', label: 'Maks' },
                                  { value: 'min', label: 'Min' },
                                ].map((calc) => (
                                  <button
                                    key={calc.value}
                                    onClick={() => {
                                      const newKpis = [...kpiConfigs];
                                      newKpis[index].calculation = calc.value as any;
                                      setKpiConfigs(newKpis);
                                    }}
                                    className={`flex-1 px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                                      kpi.calculation === calc.value
                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
                                    }`}
                                  >
                                    {calc.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Show Trend */}
                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">📈 Trend Göster</label>
                              <button
                                onClick={() => {
                                  const newKpis = [...kpiConfigs];
                                  newKpis[index].showTrend = !newKpis[index].showTrend;
                                  setKpiConfigs(newKpis);
                                }}
                                className={`w-full px-3 py-2 rounded-lg border-2 font-medium transition-all ${
                                  kpi.showTrend
                                    ? 'bg-green-600 text-white border-green-600'
                                    : 'bg-gray-200 text-gray-700 border-gray-300'
                                }`}
                              >
                                {kpi.showTrend ? '✅ Evet' : '❌ Hayır'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between">
                    <button
                      onClick={() => setStep4SubStep(1)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-all"
                    >
                      ← Geri
                    </button>
                    <button
                      onClick={() => setStep4SubStep(3)}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all"
                    >
                      Devam Et →
                    </button>
                  </div>
                </div>
              )}

              {/* SUB-STEP 3: Chart Configuration (Drag & Drop) */}
              {step4SubStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">📈 Grafiklerinizi Yapılandırın</h2>
                    <p className="text-gray-600">Her grafik için: Tip seç • X-Y ekseni belirle • Başlık ver</p>
                    
                    {/* REHBER İPUÇLARI */}
                    <div className="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-4 text-left max-w-4xl mx-auto">
                      <p className="text-sm font-bold text-purple-900 mb-2">💡 Rehberden Hatırlatma:</p>
                      <div className="text-xs text-purple-800 space-y-1">
                        <p>1️⃣ <strong>Grafik Tipi:</strong> Line (trend), Bar (karşılaştırma), Donut (dağılım)</p>
                        <p>2️⃣ <strong>X Ekseni:</strong> Sol panelden Tarih veya Kategori sütunu sürükle-bırak</p>
                        <p>3️⃣ <strong>Y Ekseni:</strong> Sayısal sütun sürükle-bırak (maliyet, adet, gelir...)</p>
                        <p>4️⃣ <strong>Başlık:</strong> Açıklayıcı isim ("Günlük Üretim Trendi", "Ürün Bazlı Satış")</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <a
                        href="/bilgi-merkezi/dashboard-hazirlama-rehberi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-100 text-yellow-800 font-semibold hover:bg-yellow-200 transition-colors border-2 border-yellow-400"
                      >
                        <Lightbulb size={18} />
                        <span>Dashboard Hazırlama Rehberi</span>
                      </a>
                    </div>
                  </div>

                  {/* CSV COLUMN PALETTE (Sticky Sidebar) */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* LEFT: Column Palette */}
                    <div className="lg:col-span-1">
                      <div className="sticky top-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-300">
                        <h3 className="text-sm font-bold text-gray-900 mb-3">📂 Veri Sütunları</h3>
                        
                        {/* Date Columns */}
                        {csvAnalysis.dateColumn && (
                          <div className="mb-3">
                            <div className="text-xs font-bold text-gray-700 mb-1">📅 Tarih:</div>
                            <div
                              draggable
                              onDragStart={(e) => e.dataTransfer.setData('column', csvAnalysis.dateColumn!)}
                              className="px-3 py-2 bg-green-100 border-2 border-green-400 rounded-lg text-sm font-medium text-green-900 cursor-move hover:bg-green-200 transition-all"
                            >
                              {csvAnalysis.dateColumn}
                            </div>
                          </div>
                        )}

                        {/* Numeric Columns */}
                        <div className="mb-3">
                          <div className="text-xs font-bold text-gray-700 mb-1">🔢 Sayısal:</div>
                          <div className="space-y-1">
                            {csvAnalysis.numericColumns.map((col) => (
                              <div
                                key={col}
                                draggable
                                onDragStart={(e) => e.dataTransfer.setData('column', col)}
                                className="px-3 py-2 bg-blue-100 border-2 border-blue-400 rounded-lg text-sm font-medium text-blue-900 cursor-move hover:bg-blue-200 transition-all"
                              >
                                {col}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Category Columns */}
                        {csvAnalysis.categoryColumns.length > 0 && (
                          <div>
                            <div className="text-xs font-bold text-gray-700 mb-1">🏷️ Kategori:</div>
                            <div className="space-y-1">
                              {csvAnalysis.categoryColumns.map((col) => (
                                <div
                                  key={col}
                                  draggable
                                  onDragStart={(e) => e.dataTransfer.setData('column', col)}
                                  className="px-3 py-2 bg-purple-100 border-2 border-purple-400 rounded-lg text-sm font-medium text-purple-900 cursor-move hover:bg-purple-200 transition-all"
                                >
                                  {col}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* RIGHT: Chart Configs */}
                    <div className="lg:col-span-3 space-y-4">
                      {chartConfigs.map((chart, index) => (
                        <div key={chart.id} className="border-2 border-purple-200 rounded-xl p-5 bg-purple-50">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Grafik #{index + 1}</h3>
                          
                          <div className="space-y-4">
                            {/* Chart Type Selection */}
                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">🎨 Grafik Tipi</label>
                              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                {['line', 'bar', 'area', 'donut', 'combo', 'waterfall'].map((type) => {
                                  const meta = CHART_META[type as ChartType];
                                  return (
                                    <button
                                      key={type}
                                      onClick={() => {
                                        const newCharts = [...chartConfigs];
                                        newCharts[index].chartType = type as ChartType;
                                        setChartConfigs(newCharts);
                                      }}
                                      className={`p-3 rounded-lg border-2 transition-all ${
                                        chart.chartType === type
                                          ? 'bg-indigo-600 text-white border-indigo-600'
                                          : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
                                      }`}
                                      title={meta.labelTr}
                                    >
                                      <meta.Icon className="w-5 h-5 mx-auto" />
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* X Axis (Drop Zone) */}
                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">X EKSENİ (Yatay) - ZORUNLU</label>
                              <div
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  const col = e.dataTransfer.getData('column');
                                  const newCharts = [...chartConfigs];
                                  newCharts[index].xAxis = col;
                                  setChartConfigs(newCharts);
                                }}
                                className={`min-h-[80px] p-4 rounded-lg border-2 border-dashed transition-all ${
                                  chart.xAxis
                                    ? 'bg-green-50 border-green-400'
                                    : 'bg-gray-50 border-gray-400 hover:border-blue-400'
                                }`}
                              >
                                {chart.xAxis ? (
                                  <div className="flex items-center justify-between">
                                    <span className="px-3 py-2 bg-green-200 border border-green-400 rounded-lg font-medium text-green-900">
                                      {chart.xAxis}
                                    </span>
                                    <button
                                      onClick={() => {
                                        const newCharts = [...chartConfigs];
                                        newCharts[index].xAxis = null;
                                        setChartConfigs(newCharts);
                                      }}
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      ❌
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-center text-gray-500 text-sm">
                                    👈 Sol panelden sütun sürükle-bırak
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Y Axis (Drop Zone - Multiple) */}
                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">Y EKSENİ (Dikey) - ZORUNLU</label>
                              <div
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  const col = e.dataTransfer.getData('column');
                                  const newCharts = [...chartConfigs];
                                  if (!newCharts[index].yAxis.includes(col)) {
                                    newCharts[index].yAxis.push(col);
                                    setChartConfigs(newCharts);
                                  }
                                }}
                                className={`min-h-[80px] p-4 rounded-lg border-2 border-dashed transition-all ${
                                  chart.yAxis.length > 0
                                    ? 'bg-blue-50 border-blue-400'
                                    : 'bg-gray-50 border-gray-400 hover:border-blue-400'
                                }`}
                              >
                                {chart.yAxis.length > 0 ? (
                                  <div className="flex flex-wrap gap-2">
                                    {chart.yAxis.map((col) => (
                                      <div key={col} className="flex items-center gap-2 px-3 py-2 bg-blue-200 border border-blue-400 rounded-lg font-medium text-blue-900">
                                        <span>{col}</span>
                                        <button
                                          onClick={() => {
                                            const newCharts = [...chartConfigs];
                                            newCharts[index].yAxis = newCharts[index].yAxis.filter(c => c !== col);
                                            setChartConfigs(newCharts);
                                          }}
                                          className="text-red-600 hover:text-red-800"
                                        >
                                          ❌
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-center text-gray-500 text-sm">
                                    👈 Sol panelden sütun sürükle-bırak (Çoklu seçim)
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Smart Compatibility Check */}
                            {chart.xAxis && chart.yAxis.length > 0 && (
                              <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 p-4">
                                {(() => {
                                  const warnings: string[] = [];
                                  
                                  // Line/Area needs date
                                  if ((chart.chartType === 'line' || chart.chartType === 'area') && !csvAnalysis.dateColumn) {
                                    warnings.push('⚠️ Line/Area grafik için tarih sütunu önerilir');
                                  }
                                  
                                  // Donut needs category
                                  if (chart.chartType === 'donut' && chart.xAxis === csvAnalysis.dateColumn) {
                                    warnings.push('⚠️ Donut grafik için X ekseninde kategori sütunu kullanın');
                                  }
                                  
                                  if (warnings.length > 0) {
                                    return (
                                      <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-yellow-800">
                                          <AlertTriangle size={18} />
                                          <span className="font-bold">Uyarılar:</span>
                                        </div>
                                        {warnings.map((w, i) => (
                                          <div key={i} className="text-sm text-gray-800">{w}</div>
                                        ))}
                                      </div>
                                    );
                                  }
                                  
                                  return (
                                    <div className="flex items-center gap-2 text-green-800">
                                      <Check size={18} />
                                      <span className="font-bold">✅ Grafik yapılandırması uyumlu!</span>
                                    </div>
                                  );
                                })()}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setStep4SubStep(2)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-all"
                    >
                      ← Geri
                    </button>
                    <button
                      onClick={() => {
                        // Save configurations and proceed
                        setWizardData({
                          ...wizardData,
                          customizations: {
                            ...wizardData.customizations,
                            chartTypes: chartConfigs.map(c => c.chartType),
                            selectedMetrics: [...new Set(chartConfigs.flatMap(c => c.yAxis))],
                          }
                        });
                        setCurrentStep(5);
                      }}
                      disabled={chartConfigs.some(c => !c.xAxis || c.yAxis.length === 0)}
                      className={`px-6 py-3 rounded-lg font-bold transition-all ${
                        chartConfigs.some(c => !c.xAxis || c.yAxis.length === 0)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                      }`}
                    >
                      Tamamla ✓
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Önizleme */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Önizleme</h2>

              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Dashboard Adı</label>
                <input
                  value={wizardData.dashboardName}
                  onChange={(e) => setWizardData({ ...wizardData, dashboardName: e.target.value })}
                  placeholder="Örn: CFO Haftalık Özet"
                  className="mt-2 w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="mt-2 text-xs text-gray-600">
                  Kaydetmek için isim zorunludur. Sonrasında “Dashboard’larım” sayfasında görünecek.
                </div>
                <div className="mt-3 text-[11px] text-gray-500">
                  Dashboards and reports generated on FinOps AI Studio are proprietary
                  and licensed for use only within this platform.
                </div>
              </div>

              {/* Özet Bilgiler */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Özet:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Veri Kaynağı:</p>
                    <p className="text-base font-semibold text-gray-900">
                      {wizardData.dataSource === 'library' && wizardData.selectedLibraryFile 
                        ? `📁 ${wizardData.selectedLibraryFile.fileName}`
                        : wizardData.dataSource === 'upload' 
                        ? '📤 Manuel Yükleme'
                        : wizardData.dataSource === 'integration'
                        ? '🔗 Entegrasyon'
                        : wizardData.dataSource === 'demo'
                        ? '✨ Örnek Veri'
                        : '❌ Seçilmedi'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Dashboard Tipi:</p>
                    <p className="text-base font-semibold text-gray-900">
                      {wizardData.dashboardType === 'template' && '📋 Hazır Şablon'}
                      {wizardData.dashboardType === 'custom' && '🎨 Özel Dashboard'}
                    </p>
                  </div>
                  {wizardData.uploadedFile && (
                    <div>
                      <p className="text-sm text-gray-600">Yüklenen Dosya:</p>
                      <p className="text-base font-semibold text-gray-900">
                        {wizardData.uploadedFile.name}
                      </p>
                    </div>
                  )}
                  {wizardData.customizations.chartTypes.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600">Grafik Tipleri:</p>
                      <p className="text-base font-semibold text-gray-900">
                        {wizardData.customizations.chartTypes.length} adet seçildi
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Önizleme Alanı */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
                <BarChart3 className="mx-auto mb-4 text-gray-400" size={64} />
                <p className="text-gray-600 mb-2">Dashboard Önizlemesi</p>
                <p className="text-sm text-gray-500">
                  Verileriniz işlenip dashboard oluşturulduktan sonra burada görünecek
                </p>
              </div>

              {/* Uyarı */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  ⚠️ Dashboard'u kaydettikten sonra verileriniz işlenmeye başlayacak. Bu işlem birkaç dakika sürebilir.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
            }`}
          >
            <ArrowLeft size={20} />
            <span>Geri</span>
          </button>

          {currentStep < 5 ? (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                canProceed()
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>İleri</span>
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              <Check size={20} />
              <span>Dashboard'u Kaydet</span>
            </button>
          )}
        </div>

        {/* Chart Wizard Modal */}
        {showChartWizard && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl">
              <ChartChoiceWizard
                profile={datasetProfile}
                onCancel={() => setShowChartWizard(false)}
                onComplete={(result) => {
                  setWizardData({
                    ...wizardData,
                    customizations: {
                      ...wizardData.customizations,
                      chartTypes: [result.selectedChart],
                      chartSettings: {
                        dateRange: result.settings.dateRange,
                        topN: result.settings.topN,
                        bottomN: result.settings.bottomN,
                        stacked: result.settings.stacked,
                        includePdfTable: result.settings.includePdfTable,
                      },
                    },
                  });
                  setShowChartWizard(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCreateWizardPage;
