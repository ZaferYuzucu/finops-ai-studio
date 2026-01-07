// FinOps AI Studio - Survey Service
// Handles survey state persistence and analytics

import type { 
  UserSurveyProfile, 
  MiniSurveyData, 
  SurveyResponse,
  SectorType 
} from '@/types/survey';

const STORAGE_KEY = 'finops_survey_profile';
const ANALYTICS_KEY = 'finops_survey_analytics';

// Get user survey profile from localStorage
export const getSurveyProfile = (): UserSurveyProfile => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading survey profile:', error);
  }

  // Default profile
  return {
    miniSurveyCompleted: false,
    miniSurveySkipped: false,
    deepSurveyCompleted: false,
    deepSurveySkipped: false,
    dashboardsViewed: 0,
  };
};

// Save user survey profile to localStorage
export const saveSurveyProfile = (profile: Partial<UserSurveyProfile>) => {
  try {
    const current = getSurveyProfile();
    const updated = { ...current, ...profile };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error saving survey profile:', error);
    return getSurveyProfile();
  }
};

// Save mini survey response
export const saveMiniSurvey = (data: MiniSurveyData) => {
  const profile = saveSurveyProfile({
    miniSurveyCompleted: true,
    miniSurveyCompletedAt: new Date().toISOString(),
    miniSurveySkipped: false,
    sector: data.sector,
    companySize: data.companySize,
    mainChallenge: data.mainChallenge,
  });

  // Log analytics event
  logSurveyEvent({
    event: 'survey_completed',
    surveyType: 'mini',
    answer: data,
    timestamp: new Date().toISOString(),
  });

  return profile;
};

// Skip mini survey
export const skipMiniSurvey = () => {
  const profile = saveSurveyProfile({
    miniSurveySkipped: true,
    miniSurveyCompletedAt: new Date().toISOString(),
  });

  logSurveyEvent({
    event: 'survey_skipped',
    surveyType: 'mini',
    timestamp: new Date().toISOString(),
  });

  return profile;
};

// Save deep survey response
export const saveDeepSurvey = (answers: Record<string, string | string[]>) => {
  const profile = saveSurveyProfile({
    deepSurveyCompleted: true,
    deepSurveyCompletedAt: new Date().toISOString(),
    deepSurveySkipped: false,
  });

  // Log analytics event
  logSurveyEvent({
    event: 'survey_completed',
    surveyType: 'deep',
    answer: answers,
    timestamp: new Date().toISOString(),
  });

  return profile;
};

// Skip/dismiss deep survey
export const dismissDeepSurvey = () => {
  const profile = saveSurveyProfile({
    deepSurveySkipped: true,
  });

  logSurveyEvent({
    event: 'survey_skipped',
    surveyType: 'deep',
    timestamp: new Date().toISOString(),
  });

  return profile;
};

// Increment dashboards viewed count
export const incrementDashboardsViewed = () => {
  const current = getSurveyProfile();
  return saveSurveyProfile({
    dashboardsViewed: current.dashboardsViewed + 1,
  });
};

// Check if deep survey should be shown
export const shouldShowDeepSurvey = (): boolean => {
  const profile = getSurveyProfile();
  
  // Don't show if already completed or skipped
  if (profile.deepSurveyCompleted || profile.deepSurveySkipped) {
    return false;
  }

  // Don't show if mini survey was skipped (user doesn't want surveys)
  if (profile.miniSurveySkipped) {
    return false;
  }

  // Show after user has viewed at least 1 dashboard
  return profile.dashboardsViewed >= 1;
};

// Mark deep survey as offered (to avoid showing multiple times in same session)
export const markDeepSurveyOffered = () => {
  return saveSurveyProfile({
    deepSurveyOfferedAt: new Date().toISOString(),
  });
};

// Check if deep survey was offered in current session
export const wasDeepSurveyOfferedToday = (): boolean => {
  const profile = getSurveyProfile();
  if (!profile.deepSurveyOfferedAt) return false;

  const offeredDate = new Date(profile.deepSurveyOfferedAt);
  const now = new Date();
  const hoursSinceOffered = (now.getTime() - offeredDate.getTime()) / (1000 * 60 * 60);

  // Don't show again if offered in last 24 hours
  return hoursSinceOffered < 24;
};

// Analytics/logging helper
export const logSurveyEvent = (event: any) => {
  try {
    const existing = localStorage.getItem(ANALYTICS_KEY);
    const events = existing ? JSON.parse(existing) : [];
    events.push(event);
    
    // Keep only last 100 events
    if (events.length > 100) {
      events.shift();
    }
    
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(events));
    
    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Survey Analytics]', event);
    }
  } catch (error) {
    console.error('Error logging survey event:', error);
  }
};

// Get survey analytics (for admin/debugging)
export const getSurveyAnalytics = () => {
  try {
    const stored = localStorage.getItem(ANALYTICS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading survey analytics:', error);
    return [];
  }
};

// Clear all survey data (for testing/reset)
export const clearSurveyData = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(ANALYTICS_KEY);
};





