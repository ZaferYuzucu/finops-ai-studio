// FinOps AI Studio - Survey System Types
// Multi-stage intelligent survey for post-signup user onboarding

export type SectorType = 
  | 'hotel_tourism'
  | 'restaurant_cafe'
  | 'automotive'
  | 'agriculture'
  | 'manufacturing'
  | 'healthcare'
  | 'retail'
  | 'other';

export type CompanySizeType = 
  | 'micro'    // 1-9
  | 'small'    // 10-49
  | 'medium';  // 50-249

export type MainChallengeType = 
  | 'cash_flow'
  | 'profitability'
  | 'cost_control'
  | 'reporting'
  | 'all';

export type QuestionType = 
  | 'single_choice'
  | 'multiple_choice'
  | 'rating'
  | 'text';

// Single question definition
export interface SurveyQuestion {
  id: string;
  type: QuestionType;
  question: string;
  description?: string;
  options?: SurveyOption[];
  required?: boolean;
  dependsOn?: {
    questionId: string;
    value: string | string[];
  };
}

// Option for single/multiple choice questions
export interface SurveyOption {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

// User's answer to a question
export interface SurveyAnswer {
  questionId: string;
  value: string | string[] | number;
  answeredAt: string;
}

// Complete survey response
export interface SurveyResponse {
  userId?: string;
  surveyType: 'mini' | 'deep';
  sector?: SectorType;
  companySize?: CompanySizeType;
  mainChallenge?: MainChallengeType;
  answers: SurveyAnswer[];
  completedAt?: string;
  skipped?: boolean;
}

// Mini survey (Stage 1) - 3 questions, ~30 seconds
export interface MiniSurveyData {
  sector: SectorType;
  companySize: CompanySizeType;
  mainChallenge: MainChallengeType;
}

// Deep survey (Stage 2) - Sector-specific, 8-10 questions
export interface DeepSurveyConfig {
  sector: SectorType;
  questions: SurveyQuestion[];
}

// User profile updated from survey
export interface UserSurveyProfile {
  miniSurveyCompleted: boolean;
  miniSurveyCompletedAt?: string;
  miniSurveySkipped?: boolean;
  
  deepSurveyCompleted: boolean;
  deepSurveyCompletedAt?: string;
  deepSurveySkipped?: boolean;
  deepSurveyOfferedAt?: string;
  
  sector?: SectorType;
  companySize?: CompanySizeType;
  mainChallenge?: MainChallengeType;
  
  dashboardsViewed: number;
  recommendedDashboards?: string[];
}

// Analytics event for survey tracking
export interface SurveyAnalyticsEvent {
  event: 'survey_started' | 'survey_completed' | 'survey_skipped' | 'question_answered';
  surveyType: 'mini' | 'deep';
  questionId?: string;
  answer?: any;
  timestamp: string;
}





