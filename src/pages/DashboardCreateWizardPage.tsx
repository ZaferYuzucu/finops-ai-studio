import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Database, FileSpreadsheet, Sparkles, ArrowRight, ArrowLeft, Check, Grid3x3, BarChart3, Settings, Eye } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { dashboards } from '../data/dashboards';

// Multi-step wizard için step tanımları
type WizardStep = 1 | 2 | 3 | 4 | 5;

interface WizardData {
  dataSource: 'upload' | 'integration' | 'demo' | null;
  dashboardType: 'template' | 'custom' | null;
  selectedTemplate: string | null;
  uploadedFile: File | null;
  selectedIntegration: string | null;
  columnMapping: Record<string, string>;
  customizations: {
    chartTypes: string[];
    selectedMetrics: string[];
    colorScheme: string;
  };
}

const DashboardCreateWizardPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [wizardData, setWizardData] = useState<WizardData>({
    dataSource: null,
    dashboardType: null,
    selectedTemplate: null,
    uploadedFile: null,
    selectedIntegration: null,
    columnMapping: {},
    customizations: {
      chartTypes: [],
      selectedMetrics: [],
      colorScheme: 'blue',
    },
  });

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

  const handleFinish = () => {
    // Dashboard'u kaydet ve yönlendir
    console.log('Dashboard oluşturuldu:', wizardData);
    navigate('/dashboard');
  };

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
            Dashboard Oluştur
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Veri Kaynağınızı Seçin</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Manuel Yükleme */}
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all hover:scale-105 ${
                    wizardData.dataSource === 'upload'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-300 hover:border-indigo-400'
                  } ${isDragActive ? 'border-indigo-500 bg-indigo-50' : ''}`}
                >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto mb-4 text-indigo-600" size={48} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Manuel Yükleme</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Excel, CSV veya JSON dosyası yükleyin
                  </p>
                  {wizardData.uploadedFile && (
                    <div className="bg-green-50 text-green-700 text-xs p-2 rounded">
                      ✓ {wizardData.uploadedFile.name}
                    </div>
                  )}
                </div>

                {/* Entegrasyon */}
                <div
                  onClick={() => setWizardData({ ...wizardData, dataSource: 'integration' })}
                  className={`border-2 rounded-xl p-6 text-center cursor-pointer transition-all hover:scale-105 ${
                    wizardData.dataSource === 'integration'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                >
                  <Database className="mx-auto mb-4 text-purple-600" size={48} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Entegrasyon</h3>
                  <p className="text-sm text-gray-600">
                    ERP veya bulut sistemlerinize bağlanın
                  </p>
                </div>

                {/* Örnek Veri */}
                <div
                  onClick={() => setWizardData({ ...wizardData, dataSource: 'demo' })}
                  className={`border-2 rounded-xl p-6 text-center cursor-pointer transition-all hover:scale-105 ${
                    wizardData.dataSource === 'demo'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-green-400'
                  }`}
                >
                  <Sparkles className="mx-auto mb-4 text-green-600" size={48} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Örnek Veri</h3>
                  <p className="text-sm text-gray-600">
                    Hızlı başlamak için demo veri kullanın
                  </p>
                </div>
              </div>

              {/* Entegrasyon seçildiyse alt seçenekler */}
              {wizardData.dataSource === 'integration' && (
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Entegrasyon Seçin:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {integrations.map((integration) => (
                      <button
                        key={integration.id}
                        onClick={() =>
                          setWizardData({ ...wizardData, selectedIntegration: integration.id })
                        }
                        className={`p-4 rounded-lg border-2 transition-all ${
                          wizardData.selectedIntegration === integration.id
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        <span className="text-3xl mb-2 block">{integration.icon}</span>
                        <span className="text-sm font-medium">{integration.name}</span>
                      </button>
                    ))}
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
                    {dashboards.slice(0, 12).map((dashboard) => (
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

              {/* Grafik Tipleri */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Grafik Tipleri:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'bar', name: 'Bar Chart', icon: '📊' },
                    { id: 'line', name: 'Line Chart', icon: '📈' },
                    { id: 'pie', name: 'Pie Chart', icon: '🥧' },
                    { id: 'area', name: 'Area Chart', icon: '📉' },
                  ].map((chart) => (
                    <button
                      key={chart.id}
                      onClick={() => {
                        const selected = wizardData.customizations.chartTypes.includes(chart.id)
                          ? wizardData.customizations.chartTypes.filter((id) => id !== chart.id)
                          : [...wizardData.customizations.chartTypes, chart.id];
                        setWizardData({
                          ...wizardData,
                          customizations: { ...wizardData.customizations, chartTypes: selected },
                        });
                      }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        wizardData.customizations.chartTypes.includes(chart.id)
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <span className="text-3xl mb-2 block">{chart.icon}</span>
                      <span className="text-sm font-medium">{chart.name}</span>
                    </button>
                  ))}
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

              {/* Özet Bilgiler */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Özet:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Veri Kaynağı:</p>
                    <p className="text-base font-semibold text-gray-900">
                      {wizardData.dataSource === 'upload' && '📤 Manuel Yükleme'}
                      {wizardData.dataSource === 'integration' && '🔗 Entegrasyon'}
                      {wizardData.dataSource === 'demo' && '✨ Örnek Veri'}
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
      </div>
    </div>
  );
};

export default DashboardCreateWizardPage;
