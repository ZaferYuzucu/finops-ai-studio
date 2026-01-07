// FinOps AI Studio - Survey Hook
// React hook for survey state management

import { useState, useEffect } from 'react';
import type { UserSurveyProfile, MiniSurveyData } from '@/types/survey';
import * as surveyService from '@/services/surveyService';

export const useSurvey = () => {
  const [profile, setProfile] = useState<UserSurveyProfile>(
    surveyService.getSurveyProfile()
  );

  // Refresh profile from localStorage
  const refreshProfile = () => {
    const updated = surveyService.getSurveyProfile();
    setProfile(updated);
  };

  // Save mini survey
  const completeMiniSurvey = (data: MiniSurveyData) => {
    const updated = surveyService.saveMiniSurvey(data);
    setProfile(updated);
    return updated;
  };

  // Skip mini survey
  const skipMiniSurvey = () => {
    const updated = surveyService.skipMiniSurvey();
    setProfile(updated);
    return updated;
  };

  // Save deep survey
  const completeDeepSurvey = (answers: Record<string, string | string[]>) => {
    const updated = surveyService.saveDeepSurvey(answers);
    setProfile(updated);
    return updated;
  };

  // Dismiss deep survey
  const dismissDeepSurvey = () => {
    const updated = surveyService.dismissDeepSurvey();
    setProfile(updated);
    return updated;
  };

  // Track dashboard view
  const trackDashboardView = () => {
    const updated = surveyService.incrementDashboardsViewed();
    setProfile(updated);
    return updated;
  };

  // Check if should show mini survey
  const shouldShowMiniSurvey = () => {
    return !profile.miniSurveyCompleted && !profile.miniSurveySkipped;
  };

  // Check if should show deep survey
  const shouldShowDeepSurvey = () => {
    return (
      surveyService.shouldShowDeepSurvey() &&
      !surveyService.wasDeepSurveyOfferedToday()
    );
  };

  // Mark deep survey as offered
  const markDeepSurveyOffered = () => {
    const updated = surveyService.markDeepSurveyOffered();
    setProfile(updated);
  };

  return {
    profile,
    refreshProfile,
    completeMiniSurvey,
    skipMiniSurvey,
    completeDeepSurvey,
    dismissDeepSurvey,
    trackDashboardView,
    shouldShowMiniSurvey,
    shouldShowDeepSurvey,
    markDeepSurveyOffered,
  };
};





