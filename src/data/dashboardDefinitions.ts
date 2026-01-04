// FinOps AI Studio - Dashboard Definitions
// Central dashboard type definitions for recommendation engine

import type { DashboardDefinition, DashboardType } from '@/types/recommendationEngine';

// ==========================================
// DASHBOARD TANIMLARI
// ==========================================

export const DASHBOARD_DEFINITIONS: Record<DashboardType, DashboardDefinition> = {
  CEO_OVERVIEW: {
    type: 'CEO_OVERVIEW',
    id: 'ceo-overview',
    name: 'CEO Genel Bakış',
    description: 'Şirketinizin finansal durumunu tek ekranda görün',
    kpis: [
      'Toplam Gelir',
      'Net Kâr Marjı',
      'Nakit Pozisyonu',
      'Aylık Büyüme Oranı',
      'Operasyonel Verimlilik'
    ],
    icon: '👔',
    category: 'Genel'
  },

  CASH_FLOW: {
    type: 'CASH_FLOW',
    id: 'cash-flow',
    name: 'Nakit Akışı',
    description: 'Nakit giriş-çıkışlarını anlık takip edin',
    kpis: [
      'Nakit Giriş',
      'Nakit Çıkış',
      'Net Nakit Akışı',
      'Likidite Oranı',
      'İşletme Sermayesi'
    ],
    icon: '💰',
    category: 'Finans'
  },

  PROFIT_LOSS: {
    type: 'PROFIT_LOSS',
    id: 'profit-loss',
    name: 'Kâr-Zarar Analizi',
    description: 'Gelir-gider dengenizi optimize edin',
    kpis: [
      'Brüt Kâr',
      'Net Kâr',
      'EBITDA',
      'Gider Dağılımı',
      'Kâr Marjı Trendi'
    ],
    icon: '📈',
    category: 'Finans'
  },

  COST_CONTROL: {
    type: 'COST_CONTROL',
    id: 'cost-control',
    name: 'Maliyet Kontrolü',
    description: 'Maliyetleri detaylı analiz edin ve tasarruf fırsatlarını keşfedin',
    kpis: [
      'Toplam Maliyet',
      'Birim Maliyet',
      'Maliyet Dağılımı',
      'Bütçe vs Gerçekleşen',
      'Tasarruf Fırsatları'
    ],
    icon: '🎯',
    category: 'Operasyon'
  },

  OPERATIONAL_KPI: {
    type: 'OPERATIONAL_KPI',
    id: 'operational-kpi',
    name: 'Operasyonel KPI\'lar',
    description: 'Günlük operasyonlarınızı ölçün ve iyileştirin',
    kpis: [
      'Üretim Verimliliği',
      'Kaynak Kullanımı',
      'Stok Devir Hızı',
      'Teslimat Performansı',
      'Müşteri Memnuniyeti'
    ],
    icon: '⚙️',
    category: 'Operasyon'
  },

  SECTOR_SPECIFIC: {
    type: 'SECTOR_SPECIFIC',
    id: 'sector-specific',
    name: 'Sektörel Dashboard',
    description: 'Sektörünüze özel KPI\'lar ve metrikler',
    kpis: [], // Dinamik olarak doldurulacak
    icon: '🏭',
    category: 'Sektörel'
  }
};

// ==========================================
// SEKTÖREL DASHBOARD DETAYLARI
// ==========================================

export const SECTOR_DASHBOARDS = {
  restaurant_cafe: {
    id: 'restaurant-performance',
    name: 'Restoran Performans Paneli',
    description: 'Restoran ve cafe işletmeniz için özel KPI\'lar',
    kpis: [
      'Food Cost % (Gıda Maliyet Oranı)',
      'Labor Cost % (Personel Maliyet Oranı)',
      'Daily Revenue (Günlük Ciro)',
      'Average Check (Ortalama Hesap)',
      'Table Turnover (Masa Devir Hızı)',
      'Prime Cost (Ana Maliyet)'
    ],
    icon: '🍽️'
  },

  hotel_tourism: {
    id: 'hospitality-performance',
    name: 'Otel Performans Paneli',
    description: 'Otel ve turizm işletmeniz için özel KPI\'lar',
    kpis: [
      'ADR (Average Daily Rate - Ortalama Oda Fiyatı)',
      'RevPAR (Revenue per Available Room)',
      'Occupancy Rate (Doluluk Oranı)',
      'GOPPAR (Gross Operating Profit per Available Room)',
      'Length of Stay (Ortalama Konaklama Süresi)'
    ],
    icon: '🏨'
  },

  agriculture: {
    id: 'agriculture-production',
    name: 'Tarım Üretim Paneli',
    description: 'Tarım ve hayvancılık işletmeniz için özel KPI\'lar',
    kpis: [
      'Yield per Area (Alan Başına Verim)',
      'Input Cost per Unit (Birim Girdi Maliyeti)',
      'Seasonal Profitability (Sezonluk Kârlılık)',
      'Harvest Efficiency (Hasat Verimliliği)',
      'Weather Impact Analysis (Hava Durumu Etki Analizi)'
    ],
    icon: '🌾'
  },

  manufacturing: {
    id: 'manufacturing-efficiency',
    name: 'Üretim Verimlilik Paneli',
    description: 'İmalat ve üretim işletmeniz için özel KPI\'lar',
    kpis: [
      'OEE (Overall Equipment Effectiveness)',
      'Production Output (Üretim Miktarı)',
      'Scrap Rate (Fire Oranı)',
      'Cycle Time (Çevrim Süresi)',
      'Quality Rate (Kalite Oranı)'
    ],
    icon: '🏭'
  },

  healthcare: {
    id: 'healthcare-performance',
    name: 'Sağlık Hizmetleri Paneli',
    description: 'Sağlık hizmetleri işletmeniz için özel KPI\'lar',
    kpis: [
      'Patient Volume (Hasta Sayısı)',
      'Average Treatment Cost (Ortalama Tedavi Maliyeti)',
      'Bed Occupancy Rate (Yatak Doluluk Oranı)',
      'Revenue per Patient (Hasta Başına Gelir)',
      'Insurance Claim Rate (Sigorta Talep Oranı)'
    ],
    icon: '🏥'
  },

  retail: {
    id: 'retail-performance',
    name: 'Perakende Performans Paneli',
    description: 'Perakende işletmeniz için özel KPI\'lar',
    kpis: [
      'Sales per Square Meter (m² Başına Satış)',
      'Inventory Turnover (Stok Devir Hızı)',
      'Basket Size (Sepet Büyüklüğü)',
      'Conversion Rate (Dönüşüm Oranı)',
      'Customer Footfall (Müşteri Trafiği)'
    ],
    icon: '🛒'
  },

  automotive: {
    id: 'automotive-performance',
    name: 'Otomotiv Performans Paneli',
    description: 'Otomotiv işletmeniz için özel KPI\'lar',
    kpis: [
      'Units Sold (Satılan Araç Sayısı)',
      'Service Revenue (Servis Geliri)',
      'Parts Margin (Yedek Parça Marjı)',
      'Customer Satisfaction Score',
      'Inventory Days (Stok Gün Sayısı)'
    ],
    icon: '🚗'
  },

  education: {
    id: 'education-performance',
    name: 'Eğitim Performans Paneli',
    description: 'Eğitim kurumu için özel KPI\'lar',
    kpis: [
      'Student Enrollment (Öğrenci Kayıt)',
      'Revenue per Student (Öğrenci Başına Gelir)',
      'Faculty Workload (Öğretim Üyesi İş Yükü)',
      'Course Completion Rate (Kurs Tamamlama Oranı)',
      'Student Satisfaction (Öğrenci Memnuniyeti)'
    ],
    icon: '🎓'
  },

  other: {
    id: 'general-business',
    name: 'Genel İşletme Paneli',
    description: 'Genel işletme metrikleri',
    kpis: [
      'Revenue Growth (Gelir Büyümesi)',
      'Profit Margin (Kâr Marjı)',
      'Operating Expenses (İşletme Giderleri)',
      'Customer Acquisition Cost',
      'Return on Investment (ROI)'
    ],
    icon: '💼'
  }
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

export const getDashboardDefinition = (type: DashboardType): DashboardDefinition => {
  return DASHBOARD_DEFINITIONS[type];
};

export const getSectorDashboard = (sector: string) => {
  return SECTOR_DASHBOARDS[sector as keyof typeof SECTOR_DASHBOARDS] || SECTOR_DASHBOARDS.other;
};

export const getAllDashboardDefinitions = (): DashboardDefinition[] => {
  return Object.values(DASHBOARD_DEFINITIONS);
};

