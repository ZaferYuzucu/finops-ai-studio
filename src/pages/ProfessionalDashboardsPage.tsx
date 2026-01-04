import React, { useState, useEffect } from 'react';
import { BarChart3, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DeepSurveyPanel from '@/components/surveys/DeepSurveyPanel';
import { useSurvey } from '@/hooks/useSurvey';
import type { SectorType } from '@/types/survey';
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
} from '../components/dashboards';

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
  },
  education: {
    icon: '🎓',
    name: 'Eğitim & Akademik',
    color: 'cyan',
    dashboards: [
      { id: 'education-performance', name: 'Eğitim Performans Paneli', component: 'EducationDashboard' },
    ]
  }
};

const ProfessionalDashboardsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('restaurant');
  const [selectedDashboard, setSelectedDashboard] = useState<string>('restaurant-general');
  const [showDeepSurvey, setShowDeepSurvey] = useState(false);
  
  const { 
    profile, 
    trackDashboardView, 
    shouldShowDeepSurvey, 
    completeDeepSurvey,
    dismissDeepSurvey,
    markDeepSurveyOffered 
  } = useSurvey();

  // Track dashboard view and check if deep survey should be shown
  useEffect(() => {
    // Track dashboard view
    trackDashboardView();

    // Check if deep survey should be shown
    if (shouldShowDeepSurvey()) {
      setTimeout(() => {
        setShowDeepSurvey(true);
        markDeepSurveyOffered();
      }, 3000); // Show after 3 seconds of viewing
    }
  }, []);

  const handleDeepSurveyComplete = (answers: Record<string, string | string[]>) => {
    completeDeepSurvey(answers);
    setShowDeepSurvey(false);
  };

  const handleDeepSurveyDismiss = () => {
    dismissDeepSurvey();
    setShowDeepSurvey(false);
  };

  return (
    <>
      {/* Deep Survey Panel - shown after dashboard view */}
      <DeepSurveyPanel
        isVisible={showDeepSurvey}
        sector={(profile.sector || 'other') as SectorType}
        onComplete={handleDeepSurveyComplete}
        onDismiss={handleDeepSurveyDismiss}
      />

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
            Profesyonel Dashboard Örnekleri
          </h1>
          <p className="text-gray-600">
            30 adet profesyonel dashboard, 10 sektör kategorisinde. Zengin CSV verileri ile beslenen, print-ready görseller.
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
              <strong>30 adet</strong> profesyonel dashboard, <strong>10 sektör</strong> kategorisinde gruplandırılmış. 
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
                  else if (category.color === 'cyan') activeClass = 'bg-cyan-600 text-white shadow-lg';
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
            {selectedDashboard === 'education-performance' && <EducationDashboard />}
            
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
      </div>
    </div>
    </>
  );
};

export default ProfessionalDashboardsPage;

