// FinOps AI Studio - Recommendation Engine Types
// Rule-based dashboard & KPI recommendation system

// ==========================================
// VERİ MODELİ (ANKET CEVAPLARI)
// ==========================================

export type SectorType = 
  | 'restaurant_cafe'
  | 'hotel_tourism'
  | 'automotive'
  | 'agriculture'
  | 'manufacturing'
  | 'healthcare'
  | 'retail'
  | 'education'
  | 'other';

export type CompanySizeType = 
  | '1-10'      // Mikro
  | '11-50'     // Küçük
  | '50+';      // Orta+

export type MonthlyRevenueRange = 
  | '0-50k'
  | '50k-250k'
  | '250k-1m'
  | '1m+';

export type PrimaryGoalType = 
  | 'cash_flow'        // Nakit Akışını Görmek
  | 'profitability'    // Kârlılığı Artırmak
  | 'cost_control'     // Maliyetleri Kontrol Etmek
  | 'reporting'        // Raporlama
  | 'all';

export type FinancialMaturityType = 
  | 'beginner'    // Excel kullanıyorum
  | 'intermediate' // Muhasebe yazılımı var
  | 'advanced';   // ERP sistemi var

export type DataSourceType = 
  | 'manual'      // Manuel giriş
  | 'excel'       // Excel dosyaları
  | 'accounting'  // Muhasebe yazılımı
  | 'erp'         // ERP sistemi
  | 'mixed';      // Karma

export type DecisionFrequencyType = 
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly';

// Kullanıcı profili (anket cevapları)
export interface UserSurveyProfile {
  sector?: SectorType;
  company_size?: CompanySizeType;
  monthly_revenue_range?: MonthlyRevenueRange;
  primary_goal?: PrimaryGoalType;
  financial_maturity?: FinancialMaturityType;
  data_source_type?: DataSourceType;
  decision_frequency?: DecisionFrequencyType;
}

// ==========================================
// DASHBOARD TİPLERİ
// ==========================================

export type DashboardType = 
  | 'CEO_OVERVIEW'
  | 'CASH_FLOW'
  | 'PROFIT_LOSS'
  | 'COST_CONTROL'
  | 'OPERATIONAL_KPI'
  | 'SECTOR_SPECIFIC';

export interface DashboardDefinition {
  type: DashboardType;
  id: string;
  name: string;
  description: string;
  kpis: string[];
  icon: string;
  category: string;
}

// ==========================================
// ÖNERİ SONUÇLARI
// ==========================================

export interface DashboardRecommendation {
  dashboard: DashboardDefinition;
  relevanceScore: number;  // 0-100
  matchReason: string;     // Neden önerildi
  isPrimary: boolean;      // Ana dashboard mı?
  ruleMatches: string[];   // Hangi kurallarla eşleşti
}

export interface RecommendationResult {
  recommended_dashboards: DashboardRecommendation[];  // ← Yeni format
  default_dashboard: string;  // ← Yeni format (İlk açılacak dashboard)
  kpi_level: 'BASIC' | 'STANDARD' | 'ADVANCED';  // ← YENİ (KURAL-4)
  sector_template: string;  // ← YENİ (Sektörel template ID)
  totalRecommended: number;
  appliedRules: string[];
  profile: UserSurveyProfile;
  
  // Backward compatibility (eski format)
  recommendations?: DashboardRecommendation[];
  defaultDashboardId?: string;
}

// ==========================================
// KURAL TANIMLARI
// ==========================================

export type RuleType = 
  | 'SECTOR_MATCH'           // Kural-1: Sektör → Dashboard
  | 'COMPANY_SIZE_LIMIT'     // Kural-2: Büyüklük → Sayı
  | 'PRIMARY_GOAL_DEFAULT'   // Kural-3: Hedef → Öncelikli
  | 'REVENUE_COMPLEXITY'     // Kural-4: Gelir → Karmaşıklık (gelecek)
  | 'MATURITY_FEATURES'      // Kural-5: Olgunluk → Özellikler (gelecek)
  | 'DATA_SOURCE_INTEGRATION' // Kural-6: Veri kaynağı → Entegrasyon (gelecek)
  | 'DECISION_FREQUENCY';    // Kural-7: Karar sıklığı → Refresh (gelecek)

export interface Rule {
  id: string;
  type: RuleType;
  name: string;
  description: string;
  priority: number;  // Yüksek = öncelikli
  isActive: boolean;
  execute: (profile: UserSurveyProfile, context: RecommendationContext) => RuleResult;
}

export interface RuleResult {
  matched: boolean;
  dashboards?: string[];  // Dashboard ID'leri
  defaultDashboard?: string;
  kpis?: string[];
  kpiLevel?: 'BASIC' | 'STANDARD' | 'ADVANCED';  // ← YENİ (KURAL-4)
  features?: string[];  // ← YENİ (KURAL-4 için öneriler)
  score?: number;
  reason?: string;
}

export interface RecommendationContext {
  availableDashboards: DashboardDefinition[];
  maxDashboards?: number;
  existingRecommendations?: DashboardRecommendation[];
}

// ==========================================
// SEKTÖREL KPI TANIMLARI
// ==========================================

export interface SectorKPISet {
  sector: SectorType;
  kpis: {
    id: string;
    name: string;
    description: string;
    formula?: string;
    target?: string;
  }[];
}

