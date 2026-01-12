import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, Database, FileSpreadsheet, Sparkles, ArrowRight, ArrowLeft, Check, Grid3x3, BarChart3, Settings, Eye, FolderOpen } from 'lucide-react';
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

  const userId = currentUser?.uid ?? '';

  const libraryTemplates = useMemo(() => listTemplateLibrary(), []);

  // Kullanıcının kütüphane dosyalarını yükle
  useEffect(() => {
    if (currentUser?.email) {
      const files = getUserUploadedFiles(currentUser.email);
      setUserLibraryFiles(files);
    }
  }, [currentUser]);

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
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      + Yeni Veri Yükle
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
              <p className="text-gray-600 mb-6">
                Verilerinizin sütunlarını dashboard alanlarıyla eşleştirin (Otomatik algılama aktif)
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  💡 <strong>İpucu:</strong> Sistemimiz verilerinizi otomatik olarak analiz etti ve en uygun eşleştirmeleri önerdi.
                </p>
              </div>

              {/* Örnek mapping tablosu */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Veri Sütunu
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Dashboard Alanı
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Durum
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { source: 'Tarih', target: 'Zaman Damgası', status: 'auto' },
                      { source: 'Gelir', target: 'Toplam Gelir', status: 'auto' },
                      { source: 'Gider', target: 'Toplam Gider', status: 'auto' },
                      { source: 'Müşteri_ID', target: 'Müşteri Kimliği', status: 'manual' },
                    ].map((mapping, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{mapping.source}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{mapping.target}</td>
                        <td className="px-4 py-3">
                          {mapping.status === 'auto' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              ✓ Otomatik
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              ⚠ Manuel
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* STEP 4: Özelleştirme */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Özelleştirme</h2>

              {/* Grafik Seçimi (Wizard + Manual Panel) */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Grafik Seçimi</h3>
                    <p className="text-sm text-gray-600">
                      Fino, verine göre en doğru grafiği önerir. İstersen manuel değiştirebilirsin.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowChartWizard(true)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Grafik Seçim Sihirbazı
                  </button>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-xs font-bold text-gray-700 mb-2">Veri analizi (özet)</div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-3 py-1 rounded-full bg-white border border-gray-200">
                      {datasetProfile.hasDate ? '✅ Tarih var' : '⚠️ Tarih yok'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white border border-gray-200">
                      {datasetProfile.hasCategory ? '✅ Kategori var' : '⚠️ Kategori yok'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white border border-gray-200">
                      {datasetProfile.isRatio ? '✅ Oran/%' : '— Mutlak'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white border border-gray-200">
                      {datasetProfile.hasBridgeSteps ? '✅ Akış yapısı' : '— Akış değil'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white border border-gray-200">
                      {datasetProfile.rowCount} satır
                    </span>
                  </div>
                </div>

                <ChartSelectionPanel
                  profile={datasetProfile}
                  value={wizardData.customizations.chartTypes[0] || 'line'}
                  onChange={(next) =>
                    setWizardData({
                      ...wizardData,
                      customizations: { ...wizardData.customizations, chartTypes: [next] },
                    })
                  }
                />

                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="text-sm font-semibold text-gray-900">Seçilen Grafik</div>
                  <div className="mt-2 flex items-center gap-2">
                    {(() => {
                      const key = wizardData.customizations.chartTypes[0] || 'line';
                      const meta = CHART_META[key];
                      return (
                        <>
                          <meta.Icon className="w-5 h-5 text-indigo-700" />
                          <span className="font-bold text-gray-900">{meta.labelTr}</span>
                          <span className="text-xs text-gray-500">({key})</span>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Renk Şeması */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Renk Şeması:</h3>
                <div className="flex space-x-4">
                  {[
                    { id: 'blue', name: 'Mavi', color: 'bg-blue-500' },
                    { id: 'purple', name: 'Mor', color: 'bg-purple-500' },
                    { id: 'green', name: 'Yeşil', color: 'bg-green-500' },
                    { id: 'orange', name: 'Turuncu', color: 'bg-orange-500' },
                  ].map((scheme) => (
                    <button
                      key={scheme.id}
                      onClick={() =>
                        setWizardData({
                          ...wizardData,
                          customizations: { ...wizardData.customizations, colorScheme: scheme.id },
                        })
                      }
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                        wizardData.customizations.colorScheme === scheme.id
                          ? 'border-gray-900'
                          : 'border-gray-300'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded ${scheme.color}`}></div>
                      <span className="text-sm font-medium">{scheme.name}</span>
                    </button>
                  ))}
                </div>
              </div>
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
