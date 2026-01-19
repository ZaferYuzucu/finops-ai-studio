// ✅ FINOPS Dashboard Categories - Tek Merkezi Kaynak
// Tüm sayfalar bu dosyadan import eder
export const DASHBOARD_CATEGORIES = {
  restaurant: {
    icon: '🍽️',
    name: 'Restoran & Kafe',
    color: 'green',
    dashboards: [
      { id: 'restaurant-finops', name: 'Restoran FinOps', component: 'RestaurantDashboardFinops' },
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
      { id: 'automotive-termostat', name: 'Otomotiv Termostat', component: 'AutomotivTermostatDashboard' },
      { id: 'manufacturing', name: 'Üretim Kontrol', component: 'ManufacturingDashboard' },
      { id: 'quality-control', name: 'Kalite Kontrol', component: 'QualityControlDashboard' },
      { id: 'oee', name: 'OEE Dashboard', component: 'OEEDashboard' },
    ]
  },
  finance: {
    icon: '💰',
    name: 'Finans & Muhasebe',
    color: 'purple',
    dashboards: [
      { id: 'finance', name: 'CFO Kontrol Paneli', component: 'FinanceDashboard' },
      { id: 'cashflow', name: 'Nakit Akışı', component: 'CashFlowDashboard' },
    ]
  },
  hotel: {
    icon: '🏨',
    name: 'Otel & Konaklama',
    color: 'amber',
    dashboards: [
      { id: 'hotel-management', name: 'Otel Yönetim Paneli', component: 'HotelOperationsDashboard' },
      { id: 'retail', name: 'Konaklama & Retail Analizi', component: 'RetailDashboard' },
      { id: 'energy', name: 'Enerji Yönetimi', component: 'EnergyDashboard' },
    ]
  },
  ecommerce: {
    icon: '🛒',
    name: 'E-Ticaret & Retail',
    color: 'orange',
    dashboards: [
      { id: 'ecommerce', name: 'E-ticaret KPI', component: 'EcommerceDashboard' },
      { id: 'inventory', name: 'Envanter Yönetimi', component: 'InventoryDashboard' },
    ]
  },
  hr: {
    icon: '👥',
    name: 'İnsan Kaynakları',
    color: 'teal',
    dashboards: [
      { id: 'hr', name: 'İK Metrikleri', component: 'HRDashboard' },
      { id: 'supply-chain', name: 'Tedarik Zinciri', component: 'SupplyChainDashboard' },
    ]
  },
  automotive: {
    icon: '🚗',
    name: 'Automotive',
    color: 'red',
    dashboards: [
      { id: 'automotive-executive', name: 'Automotive – Executive Summary', component: 'AutomotiveExecutiveDashboard' },
      { id: 'automotive-sales', name: 'Satış Performansı', component: 'AutomotiveSalesDashboard' },
      { id: 'automotive-service', name: 'Servis & After-Sales', component: 'AutomotiveServiceDashboard' },
    ]
  },
  sales: {
    icon: '📊',
    name: 'Satış & Pazarlama',
    color: 'indigo',
    dashboards: [
      { id: 'sales', name: 'Satış Ekibi Performansı', component: 'SalesDashboard' },
      { id: 'marketing', name: 'Kampanya Analizi', component: 'MarketingDashboard' },
      { id: 'web-analytics', name: 'Web Analitiği', component: 'WebAnalyticsDashboard' },
    ]
  },
  agriculture: {
    icon: '🌾',
    name: 'Tarım',
    color: 'lime',
    dashboards: [
      { id: 'agriculture', name: 'Tarım Operasyonları', component: 'AgricultureDashboard' },
    ]
  },
  education: {
    icon: '🎓',
    name: 'Eğitim & Akademik',
    color: 'cyan',
    dashboards: [
      { id: 'education', name: 'Eğitim Performans Paneli', component: 'EducationDashboard' },
      { id: 'healthcare', name: 'Sağlık Hizmetleri', component: 'HealthcareDashboard' },
    ]
  },
  logistics: {
    icon: '🚛',
    name: 'Lojistik & Tedarik',
    color: 'emerald',
    dashboards: [
      { id: 'logistics', name: 'Lojistik Operasyon', component: 'LogisticsDashboard' },
      { id: 'fleet-management', name: 'Filo Yönetimi', component: 'FleetManagementDashboard' },
    ]
  },
  services: {
    icon: '🏥',
    name: 'Hizmet Sektörü',
    color: 'rose',
    dashboards: [
      { id: 'call-center', name: 'Çağrı Merkezi', component: 'CallCenterDashboard' },
      { id: 'customer-service', name: 'Müşteri Hizmetleri', component: 'CustomerServiceDashboard' },
      { id: 'it-operations', name: 'IT Operasyon', component: 'ITOperationsDashboard' },
    ]
  },
  construction: {
    icon: '🏗️',
    name: 'İnşaat & Enerji',
    color: 'yellow',
    dashboards: [
      { id: 'construction', name: 'İnşaat Projeleri', component: 'ConstructionDashboard' },
      { id: 'real-estate', name: 'Gayrimenkul', component: 'RealEstateDashboard' },
    ]
  },
  insurance: {
    icon: '🛡️',
    name: 'Sigorta & Finans',
    color: 'slate',
    dashboards: [
      { id: 'insurance', name: 'Sigorta Operasyon', component: 'InsuranceDashboard' },
      { id: 'project-management', name: 'Proje Yönetimi', component: 'ProjectManagementDashboard' },
    ]
  }
};

// Dashboard istatistikleri - otomatik hesaplanır
export const DASHBOARD_STATS = {
  totalCategories: Object.keys(DASHBOARD_CATEGORIES).length,
  totalDashboards: Object.values(DASHBOARD_CATEGORIES).reduce((sum, cat) => sum + cat.dashboards.length, 0),
  categoryCounts: Object.entries(DASHBOARD_CATEGORIES).reduce((acc, [key, cat]) => {
    acc[key] = cat.dashboards.length;
    return acc;
  }, {} as Record<string, number>)
};
