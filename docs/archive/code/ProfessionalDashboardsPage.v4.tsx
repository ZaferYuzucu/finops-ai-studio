import React, { useState } from 'react';
import { BarChart3, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RestaurantDashboard, ManufacturingDashboard, FinanceDashboard } from '../components/dashboards';

// Sektörel kategoriler ve dashboard'lar
const DASHBOARD_CATEGORIES = {
  restaurant: {
    icon: '🍽️',
    name: 'Restoran & Kafe',
    color: 'green',
    dashboards: [
      { id: 'restaurant-general', name: 'Genel Kontrol Paneli', component: 'RestaurantDashboard' },
      { id: 'restaurant-operations', name: 'Operasyon Paneli', component: null },
      { id: 'restaurant-sales', name: 'Satış Göstergeleri', component: null },
      { id: 'restaurant-finance', name: 'Finansal Performans', component: null },
      { id: 'restaurant-labor', name: 'İşgücü Yönetimi', component: null },
    ]
  },
  manufacturing: {
    icon: '🏭',
    name: 'Üretim & Operasyon',
    color: 'blue',
    dashboards: [
      { id: 'manufacturing-control', name: 'Üretim Kontrol', component: 'ManufacturingDashboard' },
      { id: 'quality-control', name: 'Kalite Kontrol', component: null },
      { id: 'inventory-management', name: 'Stok Yönetimi', component: null },
      { id: 'oee-dashboard', name: 'OEE Dashboard', component: null },
    ]
  },
  finance: {
    icon: '💰',
    name: 'Finans & Muhasebe',
    color: 'purple',
    dashboards: [
      { id: 'finance-cfo', name: 'CFO Kontrol Paneli', component: 'FinanceDashboard' },
      { id: 'cash-flow', name: 'Nakit Akışı', component: null },
      { id: 'profit-loss', name: 'Kâr-Zarar Analizi', component: null },
      { id: 'budget-actual', name: 'Bütçe & Gerçekleşen', component: null },
      { id: 'ceo-dashboard', name: 'CEO Dashboard', component: null },
    ]
  },
  hotel: {
    icon: '🏨',
    name: 'Otel & Konaklama',
    color: 'amber',
    dashboards: [
      { id: 'hotel-management', name: 'Otel Yönetim Paneli', component: null },
      { id: 'hotel-occupancy', name: 'Doluluk & Gelir', component: null },
      { id: 'hotel-guest', name: 'Misafir Deneyimi', component: null },
    ]
  },
  ecommerce: {
    icon: '🛒',
    name: 'E-Ticaret & Retail',
    color: 'orange',
    dashboards: [
      { id: 'ecommerce-kpi', name: 'E-ticaret KPI', component: null },
      { id: 'ecommerce-orders', name: 'Sipariş Analizi', component: null },
      { id: 'ecommerce-products', name: 'Ürün Performansı', component: null },
    ]
  },
  hr: {
    icon: '👥',
    name: 'İnsan Kaynakları',
    color: 'teal',
    dashboards: [
      { id: 'hr-metrics', name: 'İK Metrikleri', component: null },
      { id: 'hr-performance', name: 'Performans Yönetimi', component: null },
    ]
  },
  automotive: {
    icon: '🚗',
    name: 'Otomotiv',
    color: 'red',
    dashboards: [
      { id: 'automotive-sales', name: 'Satış Dashboard', component: null },
      { id: 'automotive-service', name: 'Servis Performansı', component: null },
    ]
  },
  sales: {
    icon: '📊',
    name: 'Satış & Pazarlama',
    color: 'indigo',
    dashboards: [
      { id: 'sales-team', name: 'Satış Ekibi Performansı', component: null },
      { id: 'marketing-campaign', name: 'Kampanya Analizi', component: null },
      { id: 'sales-funnel', name: 'Satış Hunisi', component: null },
    ]
  },
  agriculture: {
    icon: '🌾',
    name: 'Tarım',
    color: 'lime',
    dashboards: [
      { id: 'agriculture-operations', name: 'Tarım Operasyonları', component: null },
      { id: 'agriculture-harvest', name: 'Hasat Yönetimi', component: null },
    ]
  }
};

const ProfessionalDashboardsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('restaurant');
  const [selectedDashboard, setSelectedDashboard] = useState<string>('restaurant-general');

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Geri Dön</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📊 Profesyonel Dashboard Örnekleri
          </h1>
          <p className="text-gray-600">
            29 adet profesyonel dashboard, 9 sektör kategorisinde. Zengin CSV verileri ile beslenen, print-ready görseller.
          </p>
        </div>

        {/* Dashboard Content */}
        <div>
          {/* Dashboard Header */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 mb-6 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <BarChart3 className="text-green-600" size={28} />
              Sektör ve Dashboard Seçimi
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
            {selectedDashboard === 'restaurant-general' && <RestaurantDashboard />}
            {selectedDashboard === 'manufacturing-control' && <ManufacturingDashboard />}
            {selectedDashboard === 'finance-cfo' && <FinanceDashboard />}
            {/* Diğer dashboard'lar için placeholder */}
            {!['restaurant-general', 'manufacturing-control', 'finance-cfo'].includes(selectedDashboard) && (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Geliştiriliyor</h3>
                <p className="text-gray-600 mb-4">
                  Bu dashboard şu anda hazırlanıyor. CSV verileri mevcut, dashboard yakında eklenecek.
                </p>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 inline-block">
                  <p className="text-sm text-blue-900">
                    <strong>Seçili Dashboard:</strong> {
                      DASHBOARD_CATEGORIES[selectedCategory].dashboards.find(d => d.id === selectedDashboard)?.name
                    }
                  </p>
                </div>
              </div>
            )}
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
      </div>
    </div>
  );
};

export default ProfessionalDashboardsPage;

