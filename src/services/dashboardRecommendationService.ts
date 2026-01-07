// FinOps AI Studio - Dashboard Recommendation Engine
// Recommends dashboards based on survey responses

import type { SectorType, CompanySizeType, MainChallengeType, UserSurveyProfile } from '@/types/survey';
import { dashboards } from '@/data/dashboards';

interface DashboardRecommendation {
  id: string;
  relevanceScore: number;
  reason: string;
}

// Map sectors to dashboard categories
const sectorToDashboardCategory: Record<SectorType, string[]> = {
  hotel_tourism: ['Otel & Konaklama', 'Turizm & Seyahat'],
  restaurant_cafe: ['Restoran & Kafe'],
  automotive: ['Otomotiv'],
  agriculture: ['Tarım & Hayvancılık'],
  manufacturing: ['Üretim & Fabrika'],
  healthcare: ['Sağlık'],
  retail: ['Perakende'],
  education: ['Eğitim & Akademik'],
  other: [], // Will get general dashboards
};

// Get recommended dashboards based on survey profile
export const getRecommendedDashboards = (
  profile: UserSurveyProfile
): DashboardRecommendation[] => {
  const recommendations: DashboardRecommendation[] = [];

  // 1. Sector-based recommendations (highest priority)
  if (profile.sector) {
    const sectorCategories = sectorToDashboardCategory[profile.sector] || [];
    
    dashboards.forEach((dashboard) => {
      if (sectorCategories.includes(dashboard.category)) {
        recommendations.push({
          id: dashboard.id,
          relevanceScore: 100,
          reason: `${dashboard.category} sektörünüze özel panel`,
        });
      }
    });
  }

  // 2. Challenge-based recommendations
  if (profile.mainChallenge) {
    const challengeKeywords = getChallengeKeywords(profile.mainChallenge);
    
    dashboards.forEach((dashboard) => {
      const nameMatch = challengeKeywords.some(keyword => 
        dashboard.name.toLowerCase().includes(keyword)
      );
      
      if (nameMatch && !recommendations.find(r => r.id === dashboard.id)) {
        recommendations.push({
          id: dashboard.id,
          relevanceScore: 80,
          reason: `${getChallengeLabel(profile.mainChallenge)} odaklı`,
        });
      }
    });
  }

  // 3. Company size-based recommendations
  if (profile.companySize) {
    const sizeRecommendations = getCompanySizeRecommendations(profile.companySize);
    
    dashboards.forEach((dashboard) => {
      if (sizeRecommendations.includes(dashboard.id) && 
          !recommendations.find(r => r.id === dashboard.id)) {
        recommendations.push({
          id: dashboard.id,
          relevanceScore: 60,
          reason: `${getCompanySizeLabel(profile.companySize)} işletmeler için`,
        });
      }
    });
  }

  // 4. General popular dashboards (fallback)
  const popularDashboards = [
    'genel-dashboard',
    'finansal-ozet',
    'maliyet-analizi',
    'kar-zarar'
  ];

  popularDashboards.forEach(id => {
    const dashboard = dashboards.find(d => d.id === id);
    if (dashboard && !recommendations.find(r => r.id === id)) {
      recommendations.push({
        id: dashboard.id,
        relevanceScore: 40,
        reason: 'Popüler panel',
      });
    }
  });

  // Sort by relevance score
  return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore);
};

// Get top N recommended dashboard IDs
export const getTopRecommendedDashboardIds = (
  profile: UserSurveyProfile,
  count: number = 5
): string[] => {
  const recommendations = getRecommendedDashboards(profile);
  return recommendations.slice(0, count).map(r => r.id);
};

// Helper: Get keywords for challenges
const getChallengeKeywords = (challenge: MainChallengeType): string[] => {
  const keywordMap: Record<MainChallengeType, string[]> = {
    cash_flow: ['nakit', 'cash', 'akış', 'flow', 'likidite'],
    profitability: ['kar', 'profit', 'kâr', 'zarar', 'gelir'],
    cost_control: ['maliyet', 'cost', 'gider', 'expense'],
    reporting: ['rapor', 'report', 'analiz', 'dashboard'],
    all: ['genel', 'tüm', 'all', 'özet'],
  };

  return keywordMap[challenge] || [];
};

// Helper: Get challenge label
const getChallengeLabel = (challenge: MainChallengeType): string => {
  const labelMap: Record<MainChallengeType, string> = {
    cash_flow: 'Nakit akışı',
    profitability: 'Kârlılık',
    cost_control: 'Maliyet kontrolü',
    reporting: 'Raporlama',
    all: 'Kapsamlı analiz',
  };

  return labelMap[challenge] || challenge;
};

// Helper: Get company size-specific recommendations
const getCompanySizeRecommendations = (size: CompanySizeType): string[] => {
  const sizeMap: Record<CompanySizeType, string[]> = {
    micro: [
      'basit-dashboard',
      'genel-dashboard',
      'kar-zarar',
    ],
    small: [
      'genel-dashboard',
      'maliyet-analizi',
      'finansal-ozet',
    ],
    medium: [
      'kapsamli-finans',
      'departman-analizi',
      'butce-takip',
      'cash-flow',
    ],
  };

  return sizeMap[size] || [];
};

// Helper: Get company size label
const getCompanySizeLabel = (size: CompanySizeType): string => {
  const labelMap: Record<CompanySizeType, string> = {
    micro: 'Mikro',
    small: 'Küçük',
    medium: 'Orta',
  };

  return labelMap[size] || size;
};

// Get personalized welcome message based on survey
export const getPersonalizedWelcomeMessage = (profile: UserSurveyProfile): string => {
  if (!profile.miniSurveyCompleted) {
    return 'FinOps AI Studio\'ya hoş geldiniz! Panelleri keşfetmeye başlayın.';
  }

  const sector = profile.sector ? getSectorLabel(profile.sector) : '';
  const challenge = profile.mainChallenge ? getChallengeLabel(profile.mainChallenge) : '';

  if (sector && challenge) {
    return `${sector} sektörü için ${challenge.toLowerCase()} odaklı panelleriniz hazır!`;
  } else if (sector) {
    return `${sector} sektörü için özel panelleriniz hazır!`;
  } else if (challenge) {
    return `${challenge} için özel panelleriniz hazır!`;
  }

  return 'Size özel panelleriniz hazır!';
};

// Helper: Get sector label
const getSectorLabel = (sector: SectorType): string => {
  const labelMap: Record<SectorType, string> = {
    hotel_tourism: 'Otel & Turizm',
    restaurant_cafe: 'Restoran & Cafe',
    automotive: 'Otomotiv',
    agriculture: 'Tarım',
    manufacturing: 'Üretim',
    healthcare: 'Sağlık',
    retail: 'Perakende',
    education: 'Eğitim',
    other: 'İşletmeniz',
  };

  return labelMap[sector] || sector;
};

// Export helper to check if user has survey data
export const hasCompletedSurvey = (profile: UserSurveyProfile): boolean => {
  return profile.miniSurveyCompleted || false;
};





