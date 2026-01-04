// FinOps AI Studio - Recommendation Engine Service v2.0
// Config-driven, extensible, AI-ready rule system

import type {
  UserSurveyProfile,
  DashboardRecommendation,
  RecommendationResult,
  RecommendationContext,
  RuleResult,
  DashboardType
} from '@/types/recommendationEngine';

import {
  DASHBOARD_DEFINITIONS,
  SECTOR_DASHBOARDS,
  getDashboardDefinition,
  getSectorDashboard
} from '@/data/dashboardDefinitions';

import {
  SECTOR_DASHBOARD_RULES,
  COMPANY_SIZE_RULES,
  PRIMARY_GOAL_RULES,
  FINANCIAL_MATURITY_RULES,
  KPI_LEVELS,
  RULE_PRIORITIES,
  type KPILevel
} from '@/config/recommendationRules';

// ==========================================
// KURAL-1: SEKTÖR → SEKTÖREL DASHBOARD (CONFIG-DRIVEN)
// ==========================================

/**
 * Kullanıcının sektörüne göre sektörel dashboard önerir
 * Priority: 100 (En yüksek)
 * Config: SECTOR_DASHBOARD_RULES
 */
const rule1_SectorMatch = (
  profile: UserSurveyProfile,
  context: RecommendationContext
): RuleResult => {
  if (!profile.sector) {
    return { matched: false };
  }

  // Config'den sektör kuralını al
  const sectorRule = SECTOR_DASHBOARD_RULES.find(r => r.sector === profile.sector);
  if (!sectorRule) {
    return { matched: false };
  }

  const sectorDashboard = getSectorDashboard(profile.sector);
  
  return {
    matched: true,
    dashboards: [sectorRule.dashboardId],
    kpis: sectorDashboard.kpis,
    score: RULE_PRIORITIES.SECTOR_MATCH * sectorRule.weight,
    reason: `${sectorDashboard.name} sektörünüze özel olarak hazırlandı`
  };
};

// ==========================================
// KURAL-2: ŞİRKET BÜYÜKLÜĞÜ → DASHBOARD SAYISI (CONFIG-DRIVEN)
// ==========================================

/**
 * Şirket büyüklüğüne göre gösterilecek dashboard sayısını belirler
 * Priority: 90
 * Config: COMPANY_SIZE_RULES
 */
const rule2_CompanySizeLimit = (
  profile: UserSurveyProfile,
  context: RecommendationContext
): RuleResult => {
  if (!profile.company_size) {
    return { matched: false };
  }

  // Config'den kural al
  const sizeRule = COMPANY_SIZE_RULES[profile.company_size];
  if (!sizeRule) {
    return { matched: false };
  }

  return {
    matched: true,
    dashboards: sizeRule.requiredDashboards,
    score: RULE_PRIORITIES.COMPANY_SIZE_LIMIT,
    reason: sizeRule.reason
  };
};

// ==========================================
// KURAL-3: ANA HEDEF → ÖNCELİKLİ DASHBOARD (CONFIG-DRIVEN)
// ==========================================

/**
 * Kullanıcının ana hedefine göre varsayılan (öncelikli) dashboard'u belirler
 * Priority: 95
 * Config: PRIMARY_GOAL_RULES
 */
const rule3_PrimaryGoalDefault = (
  profile: UserSurveyProfile,
  context: RecommendationContext
): RuleResult => {
  if (!profile.primary_goal) {
    return { matched: false };
  }

  // Config'den kural al
  const goalRule = PRIMARY_GOAL_RULES[profile.primary_goal];
  if (!goalRule) {
    return { matched: false };
  }

  return {
    matched: true,
    defaultDashboard: goalRule.defaultDashboard,
    score: RULE_PRIORITIES.PRIMARY_GOAL_DEFAULT * goalRule.weight,
    reason: goalRule.reason
  };
};

// ==========================================
// KURAL-4: FİNANSAL OLGUNLUK → KPI DETAY SEVİYESİ (CONFIG-DRIVEN) ✅ YENİ
// ==========================================

/**
 * Finansal olgunluk seviyesine göre KPI detay seviyesini belirler
 * Priority: 85
 * Config: FINANCIAL_MATURITY_RULES
 * 
 * Başlangıç → BASIC (sadece aylık trendler)
 * Orta → STANDARD (aylık + kategori breakdown)
 * İleri → ADVANCED (trendler + benchmarks + alerts)
 */
const rule4_FinancialMaturityKPI = (
  profile: UserSurveyProfile,
  context: RecommendationContext
): RuleResult => {
  if (!profile.financial_maturity) {
    return { matched: false };
  }

  // Config'den kural al
  const maturityRule = FINANCIAL_MATURITY_RULES[profile.financial_maturity];
  if (!maturityRule) {
    return { matched: false };
  }

  const kpiLevelDef = KPI_LEVELS[maturityRule.kpiLevel];

  return {
    matched: true,
    kpiLevel: maturityRule.kpiLevel,
    score: RULE_PRIORITIES.FINANCIAL_MATURITY_KPI,
    reason: maturityRule.reason,
    features: maturityRule.recommendations
  };
};

// ==========================================
// PLACEHOLDER KURALLAR (İLERİDE EKLENECEk)
// ==========================================

/**
 * KURAL-5: Gelir Aralığı → Dashboard Karmaşıklığı
 * TODO: Implement when user provides Rule-5
 */
const rule5_RevenueComplexity = (
  profile: UserSurveyProfile,
  context: RecommendationContext
): RuleResult => {
  // Placeholder - will be implemented later
  return { matched: false };
};

/**
 * KURAL-5: Finansal Olgunluk → Özellik Seti
 * TODO: Implement when user provides Rule-5
 */
const rule5_MaturityFeatures = (
  profile: UserSurveyProfile,
  context: RecommendationContext
): RuleResult => {
  // Placeholder - will be implemented later
  return { matched: false };
};

/**
 * KURAL-6: Veri Kaynağı → Entegrasyon Önerileri
 * TODO: Implement when user provides Rule-6
 */
const rule6_DataSourceIntegration = (
  profile: UserSurveyProfile,
  context: RecommendationContext
): RuleResult => {
  // Placeholder - will be implemented later
  return { matched: false };
};

/**
 * KURAL-7: Karar Sıklığı → Refresh Rate
 * TODO: Implement when user provides Rule-7
 */
const rule7_DecisionFrequency = (
  profile: UserSurveyProfile,
  context: RecommendationContext
): RuleResult => {
  // Placeholder - will be implemented later
  return { matched: false };
};

// ==========================================
// ANA ÖNERİ MOTORU
// ==========================================

/**
 * Ana öneri motoru v2.0 - Config-driven, extensible, AI-ready
 * Tüm kuralları sırayla çalıştırır ve önerileri birleştirir
 */
export const generateRecommendations = (
  profile: UserSurveyProfile
): RecommendationResult => {
  const context: RecommendationContext = {
    availableDashboards: Object.values(DASHBOARD_DEFINITIONS),
    maxDashboards: 5
  };

  const appliedRules: string[] = [];
  const recommendations: DashboardRecommendation[] = [];
  let defaultDashboardId = 'ceo-overview'; // Fallback
  let kpiLevel: KPILevel = 'STANDARD'; // Fallback
  let sectorTemplate = 'general'; // Fallback
  
  // KURAL-4: Finansal Olgunluk → KPI Detay Seviyesi ✅ YENİ
  const rule4Result = rule4_FinancialMaturityKPI(profile, context);
  if (rule4Result.matched && rule4Result.kpiLevel) {
    kpiLevel = rule4Result.kpiLevel;
    appliedRules.push('RULE-4: FINANCIAL_MATURITY_KPI');
  }

  // KURAL-3: Ana Hedef → Öncelikli Dashboard
  const rule3Result = rule3_PrimaryGoalDefault(profile, context);
  if (rule3Result.matched && rule3Result.defaultDashboard) {
    defaultDashboardId = rule3Result.defaultDashboard;
    appliedRules.push('RULE-3: PRIMARY_GOAL_DEFAULT');
  }

  // KURAL-2: Şirket Büyüklüğü → Dashboard Sayısı
  const rule2Result = rule2_CompanySizeLimit(profile, context);
  if (rule2Result.matched && rule2Result.dashboards) {
    appliedRules.push('RULE-2: COMPANY_SIZE_LIMIT');
    
    rule2Result.dashboards.forEach((dashboardId, index) => {
      const dashboardType = dashboardIdToType(dashboardId);
      if (dashboardType) {
        const dashboard = getDashboardDefinition(dashboardType);
        recommendations.push({
          dashboard,
          relevanceScore: 90 - (index * 5), // İlk dashboard en yüksek skor
          matchReason: rule2Result.reason || '',
          isPrimary: dashboardId === defaultDashboardId,
          ruleMatches: ['RULE-2']
        });
      }
    });
  }

  // KURAL-1: Sektör → Sektörel Dashboard
  const rule1Result = rule1_SectorMatch(profile, context);
  if (rule1Result.matched && rule1Result.dashboards) {
    appliedRules.push('RULE-1: SECTOR_MATCH');
    
    const sectorDashboard = getSectorDashboard(profile.sector!);
    sectorTemplate = sectorDashboard.id; // Sector template ID
    
    const sectorSpecificDef = {
      ...DASHBOARD_DEFINITIONS.SECTOR_SPECIFIC,
      id: sectorDashboard.id,
      name: sectorDashboard.name,
      description: sectorDashboard.description,
      kpis: sectorDashboard.kpis,
      icon: sectorDashboard.icon
    };

    recommendations.push({
      dashboard: sectorSpecificDef,
      relevanceScore: 100, // En yüksek skor
      matchReason: rule1Result.reason || '',
      isPrimary: false, // Sektörel dashboard ikincil
      ruleMatches: ['RULE-1']
    });
  }

  // Eğer hiç öneri yoksa, fallback olarak CEO Overview ver
  if (recommendations.length === 0) {
    recommendations.push({
      dashboard: DASHBOARD_DEFINITIONS.CEO_OVERVIEW,
      relevanceScore: 50,
      matchReason: 'Genel bakış paneli (varsayılan)',
      isPrimary: true,
      ruleMatches: ['FALLBACK']
    });
  }

  // Önerileri relevance score'a göre sırala
  recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore);

  // Limit check
  const maxDashboards = context.maxDashboards || 5;
  const limitedRecommendations = recommendations.slice(0, maxDashboards);

  // YENİ OUTPUT FORMAT (API-friendly)
  return {
    // Yeni format (camelCase yerine snake_case)
    recommended_dashboards: limitedRecommendations,
    default_dashboard: defaultDashboardId,
    kpi_level: kpiLevel,  // ← YENİ (KURAL-4)
    sector_template: sectorTemplate,  // ← YENİ
    
    // Metadata
    totalRecommended: limitedRecommendations.length,
    appliedRules,
    profile,
    
    // Backward compatibility (eski frontend kodları için)
    recommendations: limitedRecommendations,
    defaultDashboardId
  };
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Dashboard ID'sini Dashboard Type'a çevirir
 */
const dashboardIdToType = (id: string): DashboardType | null => {
  const mapping: Record<string, DashboardType> = {
    'ceo-overview': 'CEO_OVERVIEW',
    'cash-flow': 'CASH_FLOW',
    'profit-loss': 'PROFIT_LOSS',
    'cost-control': 'COST_CONTROL',
    'operational-kpi': 'OPERATIONAL_KPI',
    'sector-specific': 'SECTOR_SPECIFIC'
  };

  return mapping[id] || null;
};

/**
 * Öneri sonucunu debug için yazdır
 */
export const printRecommendations = (result: RecommendationResult): void => {
  console.group('🎯 Recommendation Engine Results');
  console.log('📋 Profile:', result.profile);
  console.log('✅ Applied Rules:', result.appliedRules);
  console.log('🎯 Default Dashboard:', result.defaultDashboardId);
  console.log('📊 Total Recommended:', result.totalRecommended);
  console.group('📈 Recommendations:');
  result.recommendations.forEach((rec, index) => {
    console.log(`\n${index + 1}. ${rec.dashboard.name} (${rec.dashboard.icon})`);
    console.log(`   Score: ${rec.relevanceScore}`);
    console.log(`   Reason: ${rec.matchReason}`);
    console.log(`   Primary: ${rec.isPrimary ? 'YES' : 'NO'}`);
    console.log(`   Rules: ${rec.ruleMatches.join(', ')}`);
    console.log(`   KPIs: ${rec.dashboard.kpis.slice(0, 3).join(', ')}...`);
  });
  console.groupEnd();
  console.groupEnd();
};

/**
 * Kullanıcının mevcut survey profile'ına göre önerileri al
 */
export const getRecommendationsForUser = (
  surveyProfile: any
): RecommendationResult => {
  // Survey profile'ı recommendation engine formatına çevir
  const profile: UserSurveyProfile = {
    sector: surveyProfile.sector,
    company_size: mapCompanySize(surveyProfile.companySize),
    primary_goal: mapPrimaryGoal(surveyProfile.mainChallenge)
  };

  const result = generateRecommendations(profile);
  
  // Development modunda console'a yazdır
  if (process.env.NODE_ENV === 'development') {
    printRecommendations(result);
  }

  return result;
};

// ==========================================
// MAPPING HELPERS (Mevcut survey format → Engine format)
// ==========================================

const mapCompanySize = (size: string | undefined): '1-10' | '11-50' | '50+' | undefined => {
  if (!size) return undefined;
  
  const mapping: Record<string, '1-10' | '11-50' | '50+'> = {
    'micro': '1-10',
    'small': '11-50',
    'medium': '50+'
  };

  return mapping[size];
};

const mapPrimaryGoal = (challenge: string | undefined): 'cash_flow' | 'profitability' | 'cost_control' | 'reporting' | 'all' | undefined => {
  if (!challenge) return undefined;

  return challenge as any; // Already in correct format
};

