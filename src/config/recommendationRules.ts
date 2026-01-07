// FinOps AI Studio - Recommendation Rules Configuration
// Config-driven, extensible, AI-ready rule system

import type { SectorType, CompanySizeType, PrimaryGoalType, FinancialMaturityType } from '@/types/recommendationEngine';

// ==========================================
// KPI SEVIYE TANIMLARI
// ==========================================

export type KPILevel = 'BASIC' | 'STANDARD' | 'ADVANCED';

export interface KPILevelDefinition {
  level: KPILevel;
  name: string;
  description: string;
  features: string[];
  includes: {
    trends: boolean;
    categoryBreakdown: boolean;
    benchmarks: boolean;
    alerts: boolean;
    predictions: boolean;
    comparisons: boolean;
  };
}

export const KPI_LEVELS: Record<KPILevel, KPILevelDefinition> = {
  BASIC: {
    level: 'BASIC',
    name: 'Temel Göstergeler',
    description: 'Başlangıç seviyesi - Ana metriklere odaklanın',
    features: [
      'Aylık trendler',
      'Temel KPI\'lar',
      'Basit grafikler'
    ],
    includes: {
      trends: true,          // Sadece aylık
      categoryBreakdown: false,
      benchmarks: false,
      alerts: false,
      predictions: false,
      comparisons: false
    }
  },

  STANDARD: {
    level: 'STANDARD',
    name: 'Standart Analiz',
    description: 'Orta seviye - Detaylı kategori analizi',
    features: [
      'Aylık trendler',
      'Kategori bazlı dağılım',
      'Karşılaştırmalı grafikler',
      'Temel filtreleme'
    ],
    includes: {
      trends: true,          // Aylık + haftalık
      categoryBreakdown: true,
      benchmarks: false,
      alerts: false,
      predictions: false,
      comparisons: true      // Dönemsel karşılaştırma
    }
  },

  ADVANCED: {
    level: 'ADVANCED',
    name: 'Gelişmiş Analiz',
    description: 'İleri seviye - Tahminleme ve uyarılar',
    features: [
      'Trendler + tahminleme',
      'Sektör benchmark\'ları',
      'Akıllı uyarılar',
      'Özel raporlar',
      'AI destekli içgörüler'
    ],
    includes: {
      trends: true,          // Tüm periyotlar
      categoryBreakdown: true,
      benchmarks: true,       // Sektör ortalamaları
      alerts: true,           // Akıllı uyarılar
      predictions: true,      // AI tahminleme
      comparisons: true       // Çoklu karşılaştırma
    }
  }
};

// ==========================================
// KURAL-1: SEKTÖR → SEKTÖREL DASHBOARD (CONFIG)
// ==========================================

export interface SectorDashboardMapping {
  sector: SectorType;
  dashboardId: string;
  weight: number;  // AI için ağırlık
}

export const SECTOR_DASHBOARD_RULES: SectorDashboardMapping[] = [
  { sector: 'restaurant_cafe', dashboardId: 'restaurant-performance', weight: 1.0 },
  { sector: 'hotel_tourism', dashboardId: 'hospitality-performance', weight: 1.0 },
  { sector: 'agriculture', dashboardId: 'agriculture-production', weight: 1.0 },
  { sector: 'manufacturing', dashboardId: 'manufacturing-efficiency', weight: 1.0 },
  { sector: 'healthcare', dashboardId: 'healthcare-performance', weight: 1.0 },
  { sector: 'retail', dashboardId: 'retail-performance', weight: 1.0 },
  { sector: 'automotive', dashboardId: 'automotive-performance', weight: 1.0 },
  { sector: 'education', dashboardId: 'education-performance', weight: 1.0 },
  { sector: 'other', dashboardId: 'general-business', weight: 0.5 }
];

// ==========================================
// KURAL-2: ŞİRKET BÜYÜKLÜĞÜ → DASHBOARD SAYISI (CONFIG)
// ==========================================

export interface CompanySizeDashboardRule {
  size: CompanySizeType;
  maxDashboards: number;
  requiredDashboards: string[];
  reason: string;
}

export const COMPANY_SIZE_RULES: Record<CompanySizeType, CompanySizeDashboardRule> = {
  '1-10': {
    size: '1-10',
    maxDashboards: 2,
    requiredDashboards: ['ceo-overview', 'cash-flow'],
    reason: 'Mikro işletmeniz için odaklanmanız gereken 2 temel panel'
  },
  '11-50': {
    size: '11-50',
    maxDashboards: 3,
    requiredDashboards: ['ceo-overview', 'profit-loss', 'cash-flow'],
    reason: 'Küçük işletmeniz için dengeli 3 panel seti'
  },
  '50+': {
    size: '50+',
    maxDashboards: 4,
    requiredDashboards: ['ceo-overview', 'profit-loss', 'cash-flow', 'operational-kpi'],
    reason: 'Orta+ büyüklükte işletmeniz için kapsamlı 4 panel seti'
  }
};

// ==========================================
// KURAL-3: ANA HEDEF → ÖNCELİKLİ DASHBOARD (CONFIG)
// ==========================================

export interface PrimaryGoalDashboardRule {
  goal: PrimaryGoalType;
  defaultDashboard: string;
  reason: string;
  weight: number;  // AI için ağırlık
}

export const PRIMARY_GOAL_RULES: Record<PrimaryGoalType, PrimaryGoalDashboardRule> = {
  cash_flow: {
    goal: 'cash_flow',
    defaultDashboard: 'cash-flow',
    reason: 'Nakit akışınızı anlık takip edin',
    weight: 1.0
  },
  profitability: {
    goal: 'profitability',
    defaultDashboard: 'profit-loss',
    reason: 'Kârlılığınızı optimize edin',
    weight: 1.0
  },
  cost_control: {
    goal: 'cost_control',
    defaultDashboard: 'cost-control',
    reason: 'Maliyetlerinizi kontrol altına alın',
    weight: 1.0
  },
  reporting: {
    goal: 'reporting',
    defaultDashboard: 'ceo-overview',
    reason: 'Genel bakışla başlayın',
    weight: 0.8
  },
  all: {
    goal: 'all',
    defaultDashboard: 'ceo-overview',
    reason: 'Tüm metriklere CEO panelinden ulaşın',
    weight: 0.9
  }
};

// ==========================================
// KURAL-4: FİNANSAL OLGUNLUK → KPI DETAY SEVİYESİ (CONFIG)
// ==========================================

export interface FinancialMaturityKPIRule {
  maturity: FinancialMaturityType;
  kpiLevel: KPILevel;
  reason: string;
  recommendations: string[];
}

export const FINANCIAL_MATURITY_RULES: Record<FinancialMaturityType, FinancialMaturityKPIRule> = {
  beginner: {
    maturity: 'beginner',
    kpiLevel: 'BASIC',
    reason: 'Başlangıç seviyesi - Temel metriklere odaklanın',
    recommendations: [
      'Basit, anlaşılır göstergeler',
      'Sadece aylık trendler',
      'Grafikler yerine sayılar',
      'Adım adım rehberler'
    ]
  },
  intermediate: {
    maturity: 'intermediate',
    kpiLevel: 'STANDARD',
    reason: 'Orta seviye - Detaylı analiz yapabilirsiniz',
    recommendations: [
      'Kategori bazlı dağılım',
      'Aylık + haftalık trendler',
      'Karşılaştırmalı grafikler',
      'Filtreler ve raporlar'
    ]
  },
  advanced: {
    maturity: 'advanced',
    kpiLevel: 'ADVANCED',
    reason: 'İleri seviye - Tüm özelliklere erişin',
    recommendations: [
      'Sektör benchmark\'ları',
      'AI destekli tahminleme',
      'Akıllı uyarı sistemi',
      'Özel rapor oluşturma',
      'API entegrasyonları'
    ]
  }
};

// ==========================================
// KURAL PRİORİTY MAPPING (AI için)
// ==========================================

export const RULE_PRIORITIES = {
  SECTOR_MATCH: 100,
  PRIMARY_GOAL_DEFAULT: 95,
  COMPANY_SIZE_LIMIT: 90,
  FINANCIAL_MATURITY_KPI: 85,
  // Gelecek kurallar için reserved
  REVENUE_COMPLEXITY: 80,
  DATA_SOURCE_INTEGRATION: 75,
  DECISION_FREQUENCY: 70
};

// ==========================================
// YENI SEKTÖR EKLEME HELPER
// ==========================================

/**
 * Yeni sektör eklemek için bu fonksiyonu kullanın
 * 
 * Örnek:
 * addSectorRule({
 *   sector: 'construction',
 *   dashboardId: 'construction-performance',
 *   weight: 1.0
 * });
 */
export const addSectorRule = (rule: SectorDashboardMapping) => {
  SECTOR_DASHBOARD_RULES.push(rule);
};

/**
 * Config değişikliklerini validate et
 */
export const validateRuleConfig = (): boolean => {
  // Tüm sektörler tanımlı mı?
  const definedSectors = SECTOR_DASHBOARD_RULES.map(r => r.sector);
  
  // Tüm company size'lar tanımlı mı?
  const definedSizes = Object.keys(COMPANY_SIZE_RULES);
  
  // Tüm goal'lar tanımlı mı?
  const definedGoals = Object.keys(PRIMARY_GOAL_RULES);
  
  // Tüm maturity level'lar tanımlı mı?
  const definedMaturities = Object.keys(FINANCIAL_MATURITY_RULES);
  
  return (
    definedSectors.length > 0 &&
    definedSizes.length === 3 &&
    definedGoals.length === 5 &&
    definedMaturities.length === 3
  );
};





