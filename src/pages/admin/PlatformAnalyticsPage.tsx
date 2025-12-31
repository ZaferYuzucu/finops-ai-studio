import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DemoDashboardFromCSV from '../../components/DemoDashboardFromCSV';
import {
  RestaurantDashboard,
  RestaurantOperationsDashboard,
  RestaurantSalesDashboard,
  RestaurantFinanceDashboard,
  RestaurantLaborDashboard,
  ManufacturingDashboard,
  QualityControlDashboard,
  InventoryDashboard,
  OEEDashboard,
  HotelOperationsDashboard,
  EcommerceDashboard,
  FinanceDashboard,
  CashFlowDashboard,
  HealthcareDashboard,
  AgricultureDashboard,
  LogisticsDashboard,
  EducationDashboard,
  EnergyDashboard,
  RetailDashboard,
  CallCenterDashboard,
  MarketingDashboard,
  HRDashboard,
  SupplyChainDashboard,
  ProjectManagementDashboard,
  CustomerServiceDashboard,
  SalesDashboard,
  ITOperationsDashboard,
  WebAnalyticsDashboard,
  FleetManagementDashboard,
  RealEstateDashboard,
  InsuranceDashboard,
  ConstructionDashboard
} from '../../components/dashboards';

// Sektörel kategoriler ve dashboard'lar
const DASHBOARD_CATEGORIES = {
  restaurant: {
    icon: '🍽️',
    name: 'Restoran & Kafe',
    color: 'green',
    dashboards: [
      { id: 'restaurant-general', name: 'Genel Kontrol Paneli', component: 'RestaurantDashboard' },
      { id: 'restaurant-operations', name: 'Operasyon Paneli', component: 'RestaurantOperationsDashboard' },
      { id: 'restaurant-sales', name: 'Satış Göstergeleri', component: 'RestaurantSalesDashboard' },
      { id: 'restaurant-finance', name: 'Finansal Performans', component: 'RestaurantFinanceDashboard' },
      { id: 'restaurant-labor', name: 'İşgücü Yönetimi', component: 'RestaurantLaborDashboard' },
    ]
  },
  manufacturing: {
    icon: '🏭',
    name: 'Üretim & Operasyon',
    color: 'blue',
    dashboards: [
      { id: 'manufacturing-control', name: 'Üretim Kontrol', component: 'ManufacturingDashboard' },
      { id: 'quality-control', name: 'Kalite Kontrol', component: 'QualityControlDashboard' },
      { id: 'inventory-management', name: 'Stok Yönetimi', component: 'InventoryDashboard' },
      { id: 'oee-dashboard', name: 'OEE Dashboard', component: 'OEEDashboard' },
    ]
  },
  finance: {
    icon: '💰',
    name: 'Finans & Muhasebe',
    color: 'purple',
    dashboards: [
      { id: 'finance-cfo', name: 'CFO Kontrol Paneli', component: 'FinanceDashboard' },
      { id: 'cash-flow', name: 'Nakit Akışı', component: 'CashFlowDashboard' },
      { id: 'profit-loss', name: 'Kâr-Zarar Analizi', component: 'HealthcareDashboard' },
      { id: 'budget-actual', name: 'Bütçe & Gerçekleşen', component: 'LogisticsDashboard' },
      { id: 'ceo-dashboard', name: 'CEO Dashboard', component: 'EducationDashboard' },
    ]
  },
  hotel: {
    icon: '🏨',
    name: 'Otel & Konaklama',
    color: 'amber',
    dashboards: [
      { id: 'hotel-management', name: 'Otel Yönetim Paneli', component: 'HotelOperationsDashboard' },
      { id: 'hotel-occupancy', name: 'Doluluk & Gelir', component: 'EnergyDashboard' },
      { id: 'hotel-guest', name: 'Misafir Deneyimi', component: 'RetailDashboard' },
    ]
  },
  ecommerce: {
    icon: '🛒',
    name: 'E-Ticaret & Retail',
    color: 'orange',
    dashboards: [
      { id: 'ecommerce-kpi', name: 'E-ticaret KPI', component: 'EcommerceDashboard' },
      { id: 'ecommerce-orders', name: 'Sipariş Analizi', component: 'CallCenterDashboard' },
      { id: 'ecommerce-products', name: 'Ürün Performansı', component: 'MarketingDashboard' },
    ]
  },
  hr: {
    icon: '👥',
    name: 'İnsan Kaynakları',
    color: 'teal',
    dashboards: [
      { id: 'hr-metrics', name: 'İK Metrikleri', component: 'HRDashboard' },
      { id: 'hr-performance', name: 'Performans Yönetimi', component: 'SupplyChainDashboard' },
    ]
  },
  automotive: {
    icon: '🚗',
    name: 'Otomotiv',
    color: 'red',
    dashboards: [
      { id: 'automotive-sales', name: 'Satış Dashboard', component: 'ProjectManagementDashboard' },
      { id: 'automotive-service', name: 'Servis Performansı', component: 'CustomerServiceDashboard' },
    ]
  },
  sales: {
    icon: '📊',
    name: 'Satış & Pazarlama',
    color: 'indigo',
    dashboards: [
      { id: 'sales-team', name: 'Satış Ekibi Performansı', component: 'SalesDashboard' },
      { id: 'marketing-campaign', name: 'Kampanya Analizi', component: 'ITOperationsDashboard' },
      { id: 'sales-funnel', name: 'Satış Hunisi', component: 'WebAnalyticsDashboard' },
    ]
  },
  agriculture: {
    icon: '🌾',
    name: 'Tarım',
    color: 'lime',
    dashboards: [
      { id: 'agriculture-operations', name: 'Tarım Operasyonları', component: 'AgricultureDashboard' },
      { id: 'agriculture-harvest', name: 'Hasat Yönetimi', component: 'FleetManagementDashboard' },
    ]
  }
};

const PlatformAnalyticsPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'admin' | 'demo' | 'dashboards' | 'test'>('dashboards');
  const [selectedCategory, setSelectedCategory] = useState<string>('restaurant');
  const [selectedDashboard, setSelectedDashboard] = useState<string>('restaurant-general');
  const [selectedCSVDataset, setSelectedCSVDataset] = useState<string | null>(null);

  // CSV Library'den seçili dataset'i oku
  useEffect(() => {
    const datasetId = localStorage.getItem('selected_csv_dataset');
    if (datasetId) {
      setSelectedCSVDataset(datasetId);
    }
  }, [activeTab]);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏨 Platform Analitikleri (Admin)
          </h1>
          <p className="text-gray-600">
            Sistemin arka tarafına hoş geldiniz. Tüm operasyonları buradan yönetin.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'admin'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('platformAnalytics.tabs.admin')}
          </button>
          <button
            onClick={() => setActiveTab('demo')}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'demo'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('platformAnalytics.tabs.demo')}
          </button>
          <button
            onClick={() => setActiveTab('dashboards')}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'dashboards'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('platformAnalytics.tabs.dashboards')}
          </button>
          <button
            onClick={() => setActiveTab('test')}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'test'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('platformAnalytics.tabs.testTools')}
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'admin' && (
            <div className="space-y-6">
              {/* İstatistikler */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Users className="text-indigo-600" size={28} />
                  Admin İstatistikleri
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 border border-indigo-200">
                    <p className="text-sm text-indigo-700 font-semibold mb-2">Toplam Kullanıcı</p>
                    <p className="text-4xl font-black text-indigo-900">247</p>
                    <p className="text-xs text-indigo-600 mt-2">↗ +12% (bu ay)</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                    <p className="text-sm text-green-700 font-semibold mb-2">Aktif Abonelik</p>
                    <p className="text-4xl font-black text-green-900">189</p>
                    <p className="text-xs text-green-600 mt-2">↗ +8% (bu ay)</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                    <p className="text-sm text-purple-700 font-semibold mb-2">Aylık Gelir (MRR)</p>
                    <p className="text-4xl font-black text-purple-900">₺52K</p>
                    <p className="text-xs text-purple-600 mt-2">↗ +15% (bu ay)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-6">
              {/* Demo Header */}
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 rounded-xl p-8 border-2 border-purple-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  🎯 B2B Demo - Müşteri Sunumu
                </h2>
                <p className="text-gray-700 text-lg mb-4">
                  Potansiyel müşterilere FinOps.ist'in gücünü gösterin. 
                  İki farklı demo modundan birini seçin:
                </p>
              </div>

              {/* Demo Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Option 1: Interactive Data Upload Demo */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200 hover:border-blue-400 transition-all">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-3xl">📥</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Interaktif Veri Yükleme Demo
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Müşterinin kendi Excel/CSV dosyasını yükleyip anında dashboard görmesini sağlayın.
                    </p>
                  </div>
                  
                  {/* Excel/CSV Sürükle Bırak Sekmesi Özellikleri */}
                  <div className="mb-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="text-sm font-bold text-blue-900 mb-3">
                      📂 "Excel/CSV Sürükle Bırak" Sekmesi:
                    </h4>
                    <div className="space-y-2 text-xs text-blue-900">
                      <div className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">✓</span>
                        <span><strong>Başlık:</strong> "Verini 2 dakikada bağla"</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">✓</span>
                        <span>4 bullet point (sürükle-bırak, sheet seçimi, otomatik öneri, kaydet-önizle)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">✓</span>
                        <span>Küçük not kutusu: "Birleştirilmiş hücreler / formüller olabilir"</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">✓</span>
                        <span>"Örnek CSV'leri indir" linki</span>
                      </div>
                    </div>
                  </div>

                  {/* Entegre Et Sekmesi Özellikleri */}
                  <div className="mb-4 bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="text-sm font-bold text-green-900 mb-3 flex items-center gap-2">
                      🔗 "Entegre Et" Sekmesi:
                      <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full font-semibold">
                        Faz-2
                      </span>
                    </h4>
                    <div className="space-y-2 text-xs text-green-900">
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span><strong>Faz-2 Badge:</strong> Mor renkli, "Faz-2" etiketi</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>2 bullet point (ERP/CRM entegrasyonu, şimdilik dosya yükle)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span><strong>Planlanan Entegrasyonlar:</strong> Google Sheets, Airtable, Logo, Netsis</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Yönlendirme metni: "Excel/CSV Sürükle Bırak sekmesine geç"</span>
                      </div>
                    </div>
                  </div>

                  <a 
                    href="/admin-login?redirect=/data-ingestion"
                    target="_blank"
                    className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    🚀 Veri Yükleme Demo'yu Aç
                  </a>
                  
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    ⏱️ Süre: ~3-5 dakika | 🎯 Etki: Yüksek
                  </p>
                </div>

                {/* Option 2: Pre-Built Dashboard Demo */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200 hover:border-green-400 transition-all">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-3xl">📊</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Hazır Dashboard Demo
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Önceden hazırlanmış, profesyonel restoran dashboard'u ile hızlı sunum yapın.
                    </p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-600">✓</span>
                      <span>Animasyonlu KPI kartları</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-600">✓</span>
                      <span>Gerçekçi veri setleri</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-600">✓</span>
                      <span>PDF/Excel export</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-600">✓</span>
                      <span>AI önerileri</span>
                    </div>
                  </div>

                  <a 
                    href="/dashboard/demo-preview"
                    target="_blank"
                    className="block w-full text-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    🎬 Hazır Demo'yu Aç
                  </a>
                  
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    ⏱️ Süre: ~2 dakika | 🎯 Etki: Orta-Yüksek
                  </p>
                </div>
              </div>

              {/* Demo Scenario Guide */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  📋 Demo Sunum Senaryosu (Önerilen Akış)
                </h3>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Problemi Tanımla (30 sn)</h4>
                      <p className="text-sm text-gray-600">
                        "Excel dosyalarında boğulan, güncel verilere erişemeyen işletmelerin problemi..."
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-700">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Çözümü Göster (1 dk)</h4>
                      <p className="text-sm text-gray-600">
                        "FinOps.ist ile verilerinizi yükleyin, saniyeler içinde dashboard'lar oluşsun..."
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Demo Yap (2-3 dk)</h4>
                      <p className="text-sm text-gray-600">
                        <strong>Seçenek A:</strong> Müşterinin dosyasını yükleyin → Excel Intelligence Layer<br/>
                        <strong>Seçenek B:</strong> Hazır dashboard'u gösterin → Animasyonlar + AI insights
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-700">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Değer Önerisini Vurgula (30 sn)</h4>
                      <p className="text-sm text-gray-600">
                        "Günler süren raporlamayı dakikalara indirin. AI ile aksiyon alabileceğiniz içgörüler edinin."
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-700">
                      5
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Call-to-Action (30 sn)</h4>
                      <p className="text-sm text-gray-600">
                        "Beta programımıza katılın, ilk 3 ay %50 indirim. Hemen demo talep edin!"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Data Files */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  📁 Demo İçin Örnek Veri Dosyaları
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Müşteri kendi dosyasını getirmezse bu hazır veri setlerini kullanın:
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <a 
                    href="/sample-data/sample_sales_data.csv"
                    download
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all text-sm"
                  >
                    <span>📄</span>
                    <span className="font-medium">Satış Verileri</span>
                  </a>
                  
                  <a 
                    href="/demo-data/restaurant/daily_sales.csv"
                    download
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all text-sm"
                  >
                    <span>🍽️</span>
                    <span className="font-medium">Restoran Verileri</span>
                  </a>
                  
                  <a 
                    href="/demo-data/manufacturing/production.csv"
                    download
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all text-sm"
                  >
                    <span>🏭</span>
                    <span className="font-medium">Üretim Verileri</span>
                  </a>
                </div>
              </div>

              {/* Tips & Best Practices */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Demo İpuçları</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Hazırlık:</strong> Demo öncesi sayfaları yeni sekmede açın, browser cache'i temizleyin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Timing:</strong> Animasyonların oynaması için sayfa yüklendikten 3-4 saniye bekleyin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Interaksiyon:</strong> Müşteriye klavyeyi verin, kendisi dosya yüklesin (güven artar)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Hikaye:</strong> "Şu anda Excel'de 3 saatte yaptığınız işi 3 dakikada yaptık" anlatısı kurun</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Follow-up:</strong> Demo sonrası hemen "Ne zaman başlamak istersiniz?" sorusunu sorun</span>
                  </li>
                </ul>
              </div>

              {/* CSV Library Dataset Demo */}
              {selectedCSVDataset && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    📊 Seçili Dataset Demo
                  </h3>
                  <DemoDashboardFromCSV 
                    datasetId={selectedCSVDataset} 
                    onClose={() => {
                      setSelectedCSVDataset(null);
                      localStorage.removeItem('selected_csv_dataset');
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === 'test' && (
            <div className="space-y-6">
              {/* Test & İnceleme Araçları Header */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl shadow-lg p-8 border-2 border-orange-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <TrendingUp className="text-orange-600" size={28} />
                  {t('testTools.title')}
                </h2>
                <p className="text-gray-700 mb-6">
                  {t('testTools.subtitle')}
                </p>

                {/* 3 Kartlı Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Kart 1: Kullanıcı Veri Giriş Sayfası */}
                  <div className="bg-white rounded-lg shadow p-6 border border-orange-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                      {t('testTools.cards.dataEntry.icon')} {t('testTools.cards.dataEntry.title')}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {t('testTools.cards.dataEntry.description')}
                    </p>
                    
                    <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-200">
                      <p className="text-xs text-blue-900 mb-1">
                        <strong>🔒 {t('testTools.cards.dataEntry.mode')}</strong>
                      </p>
                      <ul className="text-xs text-blue-800 space-y-1">
                        <li>✓ {t('testTools.cards.dataEntry.features.simple')}</li>
                        <li>✓ {t('testTools.cards.dataEntry.features.dragDrop')}</li>
                        <li>✓ {t('testTools.cards.dataEntry.features.preview')}</li>
                      </ul>
                    </div>

                    <a 
                      href="/veri-girisi"
                      target="_blank"
                      className="block w-full text-center px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold shadow-md"
                    >
                      {t('testTools.cards.dataEntry.buttonIcon')} {t('testTools.cards.dataEntry.button')}
                    </a>
                  </div>

                  {/* Kart 2: Excel Akıllı Veri Katmanı */}
                  <div className="bg-white rounded-lg shadow p-6 border border-blue-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                      {t('testTools.cards.excelLayer.icon')} {t('testTools.cards.excelLayer.title')}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {t('testTools.cards.excelLayer.description')}
                    </p>
                    
                    <div className="bg-green-50 rounded-lg p-3 mb-4 border border-green-200">
                      <p className="text-xs text-green-900 mb-1">
                        <strong>✨ {t('testTools.cards.excelLayer.featuresTitle')}</strong>
                      </p>
                      <ul className="text-xs text-green-800 space-y-1">
                        <li>✓ {t('testTools.cards.excelLayer.features.wizard')}</li>
                        <li>✓ {t('testTools.cards.excelLayer.features.columnMapping')}</li>
                        <li>✓ {t('testTools.cards.excelLayer.features.validation')}</li>
                        <li>✓ {t('testTools.cards.excelLayer.features.smartSuggestions')}</li>
                      </ul>
                    </div>

                    <a 
                      href="/data-ingestion"
                      target="_blank"
                      className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
                    >
                      {t('testTools.cards.excelLayer.buttonIcon')} {t('testTools.cards.excelLayer.button')}
                    </a>
                  </div>

                  {/* Kart 3: CSV Kütüphanesi */}
                  <div className="bg-white rounded-lg shadow p-6 border border-purple-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                      {t('testTools.cards.csvLibrary.icon')} {t('testTools.cards.csvLibrary.title')}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {t('testTools.cards.csvLibrary.description')}
                    </p>
                    
                    <div className="bg-purple-50 rounded-lg p-3 mb-4 border border-purple-200">
                      <p className="text-xs text-purple-900 mb-1">
                        <strong>📚 {t('testTools.cards.csvLibrary.contentTitle')}</strong>
                      </p>
                      <ul className="text-xs text-purple-800 space-y-1">
                        <li>✓ {t('testTools.cards.csvLibrary.features.datasets')}</li>
                        <li>✓ {t('testTools.cards.csvLibrary.features.sectorFilter')}</li>
                        <li>✓ {t('testTools.cards.csvLibrary.features.chartPreview')}</li>
                        <li>✓ {t('testTools.cards.csvLibrary.features.csvUpload')}</li>
                      </ul>
                    </div>

                    <a 
                      href="/admin/csv-library"
                      target="_blank"
                      className="block w-full text-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold shadow-md"
                    >
                      {t('testTools.cards.csvLibrary.buttonIcon')} {t('testTools.cards.csvLibrary.button')}
                    </a>
                  </div>
                </div>

                {/* Bilgilendirme Kutusu */}
                <div className="bg-yellow-50 rounded-lg p-4 mt-6 border border-yellow-200">
                  <p className="text-sm text-yellow-900">
                    <strong>⚠️ {t('testTools.warning.title')}</strong> {t('testTools.warning.message')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dashboards' && (
            <div>
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 mb-6 border-2 border-green-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <BarChart3 className="text-green-600" size={28} />
                  {t('platformAnalytics.tabs.dashboards')}
                </h2>
                <p className="text-gray-700 mb-4">
                  <strong>29 adet</strong> profesyonel dashboard, <strong>9 sektör</strong> kategorisinde gruplandırılmış. 
                  Zengin CSV verileri ile beslenen, A4 print-ready, Recharts + Tailwind ile kodlanmış.
                </p>
                
                {/* Kategori Seçimi */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {Object.entries(DASHBOARD_CATEGORIES).map(([key, category]) => {
                    const isActive = selectedCategory === key;
                    let activeClass = 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50';
                    
                    if (isActive) {
                      if (category.color === 'green') activeClass = 'bg-green-600 text-white shadow-lg';
                      else if (category.color === 'blue') activeClass = 'bg-blue-600 text-white shadow-lg';
                      else if (category.color === 'purple') activeClass = 'bg-purple-600 text-white shadow-lg';
                      else if (category.color === 'amber') activeClass = 'bg-amber-600 text-white shadow-lg';
                      else if (category.color === 'orange') activeClass = 'bg-orange-600 text-white shadow-lg';
                      else if (category.color === 'teal') activeClass = 'bg-teal-600 text-white shadow-lg';
                      else if (category.color === 'red') activeClass = 'bg-red-600 text-white shadow-lg';
                      else if (category.color === 'indigo') activeClass = 'bg-indigo-600 text-white shadow-lg';
                      else if (category.color === 'lime') activeClass = 'bg-lime-600 text-white shadow-lg';
                    }
                    
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedCategory(key);
                          setSelectedDashboard(category.dashboards[0].id);
                        }}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeClass}`}
                      >
                        {category.icon} {category.name}
                      </button>
                    );
                  })}
                </div>

                {/* Seçili Kategorinin Dashboard'ları */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-bold text-gray-700 mb-3">
                    {DASHBOARD_CATEGORIES[selectedCategory].icon} {DASHBOARD_CATEGORIES[selectedCategory].name} - Dashboard Seçimi:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {DASHBOARD_CATEGORIES[selectedCategory].dashboards.map((dashboard) => (
                      <button
                        key={dashboard.id}
                        onClick={() => setSelectedDashboard(dashboard.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                          selectedDashboard === dashboard.id
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {dashboard.name}
                        {!dashboard.component && <span className="ml-2 text-xs">(Yakında)</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dashboard Display */}
              <div className="bg-white rounded-xl shadow-2xl overflow-auto" style={{ maxHeight: '85vh' }}>
                {/* Restoran Dashboards */}
                {selectedDashboard === 'restaurant-general' && <RestaurantDashboard />}
                {selectedDashboard === 'restaurant-operations' && <RestaurantOperationsDashboard />}
                {selectedDashboard === 'restaurant-sales' && <RestaurantSalesDashboard />}
                {selectedDashboard === 'restaurant-finance' && <RestaurantFinanceDashboard />}
                {selectedDashboard === 'restaurant-labor' && <RestaurantLaborDashboard />}
                
                {/* Manufacturing Dashboards */}
                {selectedDashboard === 'manufacturing-control' && <ManufacturingDashboard />}
                {selectedDashboard === 'quality-control' && <QualityControlDashboard />}
                {selectedDashboard === 'inventory-management' && <InventoryDashboard />}
                {selectedDashboard === 'oee-dashboard' && <OEEDashboard />}
                
                {/* Finance Dashboards */}
                {selectedDashboard === 'finance-cfo' && <FinanceDashboard />}
                {selectedDashboard === 'cash-flow' && <CashFlowDashboard />}
                
                {/* Hotel & E-commerce */}
                {selectedDashboard === 'hotel-management' && <HotelOperationsDashboard />}
                {selectedDashboard === 'ecommerce-kpi' && <EcommerceDashboard />}
                
                {/* Healthcare & Agriculture */}
                {selectedDashboard === 'healthcare-kpi' && <HealthcareDashboard />}
                {selectedDashboard === 'agriculture-kpi' && <AgricultureDashboard />}
                
                {/* Logistics & Education */}
                {selectedDashboard === 'logistics-kpi' && <LogisticsDashboard />}
                {selectedDashboard === 'education-kpi' && <EducationDashboard />}
                
                {/* Energy & Retail */}
                {selectedDashboard === 'energy-kpi' && <EnergyDashboard />}
                {selectedDashboard === 'retail-kpi' && <RetailDashboard />}
                
                {/* Call Center & Marketing */}
                {selectedDashboard === 'callcenter-kpi' && <CallCenterDashboard />}
                {selectedDashboard === 'marketing-kpi' && <MarketingDashboard />}
                
                {/* HR & Supply Chain */}
                {selectedDashboard === 'hr-metrics' && <HRDashboard />}
                {selectedDashboard === 'supplychain-kpi' && <SupplyChainDashboard />}
                
                {/* Project Management & Customer Service */}
                {selectedDashboard === 'project-kpi' && <ProjectManagementDashboard />}
                {selectedDashboard === 'customerservice-kpi' && <CustomerServiceDashboard />}
                
                {/* Sales & IT */}
                {selectedDashboard === 'sales-kpi' && <SalesDashboard />}
                {selectedDashboard === 'it-ops' && <ITOperationsDashboard />}
                
                {/* Web Analytics & Fleet */}
                {selectedDashboard === 'web-analytics' && <WebAnalyticsDashboard />}
                {selectedDashboard === 'fleet-kpi' && <FleetManagementDashboard />}
                
                {/* Real Estate & Insurance */}
                {selectedDashboard === 'realestate-kpi' && <RealEstateDashboard />}
                {selectedDashboard === 'insurance-kpi' && <InsuranceDashboard />}
                
                {/* Construction */}
                {selectedDashboard === 'construction-kpi' && <ConstructionDashboard />}
              </div>

              {/* Info Box */}
              <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>ℹ️ Bilgi:</strong> Toplam <strong>29 dashboard</strong> | 
                  <strong> 9 sektör kategorisi</strong> | 
                  <strong> 20+ zengin CSV dosyası</strong> | 
                  Standart boyut: %98 genişlik, 1800px max | 
                  Detaylar: <code className="bg-blue-100 px-2 py-1 rounded">DASHBOARD_STANDARDS.md</code>
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <div>🍽️ Restoran: 5 | 🏭 Üretim: 4 | 💰 Finans: 5</div>
                  <div>🏨 Otel: 3 | 🛒 E-ticaret: 3 | 👥 İK: 2</div>
                  <div>🚗 Otomotiv: 2 | 📊 Satış: 3 | 🌾 Tarım: 2</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatformAnalyticsPage;
