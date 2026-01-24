import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Upload, FileSpreadsheet } from 'lucide-react';
import { INTENT_TO_DASHBOARD, IntentKey } from '../../config/intentToDashboard';
import { DASHBOARD_CONFIGS } from '../../config/dashboardConfigs';
import { useAuth } from '../../context/AuthContext';
import { saveUserDashboardConfig } from '../../utils/wizardToConfig';

interface WizardState {
  step: number;
  intent: IntentKey | null;
  dataSource: 'upload' | 'existing' | null;
  uploadedFile: File | null;
  period: 'daily' | 'weekly' | 'monthly' | null;
  scope: 'single' | 'all' | null;
  viewLevel: 'executive' | 'detailed' | null;
}

export const DashboardWizard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [state, setState] = useState<WizardState>({
    step: 1,
    intent: null,
    dataSource: null,
    uploadedFile: null,
    period: null,
    scope: null,
    viewLevel: null,
  });

  const updateState = (updates: Partial<WizardState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (state.step < 5) {
      updateState({ step: state.step + 1 });
    }
  };

  const prevStep = () => {
    if (state.step > 1) {
      updateState({ step: state.step - 1 });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateState({ uploadedFile: file, dataSource: 'upload' });
    }
  };

  const handleComplete = () => {
    if (!state.intent || !currentUser?.email) return;

    const intentConfig = INTENT_TO_DASHBOARD[state.intent];
    const dashboardConfig = DASHBOARD_CONFIGS[intentConfig.dashboardId];

    if (!dashboardConfig) return;

    const customConfig = {
      ...dashboardConfig,
      id: `${dashboardConfig.id}-${Date.now()}`,
      title: `${intentConfig.label} Dashboard`,
      subtitle: `${state.viewLevel === 'executive' ? 'Executive' : 'Detailed'} | ${state.period || 'Monthly'} | ${state.scope === 'all' ? 'All Branches' : 'Single Branch'}`,
    };

    saveUserDashboardConfig(currentUser.email, customConfig);
    navigate('/dashboard/my');
  };

  const canProceed = () => {
    switch (state.step) {
      case 1: return state.intent !== null;
      case 2: return state.dataSource !== null;
      case 3: return state.period !== null && state.scope !== null;
      case 4: return state.viewLevel !== null;
      case 5: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Dashboard
          </h1>
          <p className="text-gray-600">
            Answer a few simple questions and we'll build it for you
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center mb-8 gap-2">
          {[1, 2, 3, 4, 5].map(num => (
            <div
              key={num}
              className={`h-2 rounded-full transition-all ${
                num === state.step ? 'w-12 bg-blue-600' :
                num < state.step ? 'w-8 bg-green-500' :
                'w-8 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Step 1: Intent */}
          {state.step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What do you want to understand?
              </h2>
              <p className="text-gray-600 mb-6">
                Choose the business question you want to answer
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(Object.keys(INTENT_TO_DASHBOARD) as IntentKey[]).map(key => {
                  const intent = INTENT_TO_DASHBOARD[key];
                  return (
                    <button
                      key={key}
                      onClick={() => updateState({ intent: key })}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        state.intent === key
                          ? 'border-blue-600 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div className="text-4xl mb-3">{intent.icon}</div>
                      <div className="font-bold text-lg text-gray-900 mb-2">
                        {intent.label}
                      </div>
                      <div className="text-sm text-gray-600">
                        {intent.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Data Source */}
          {state.step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Where is your data?
              </h2>
              <p className="text-gray-600 mb-6">
                Upload your data or use existing datasets
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label
                  className={`p-8 rounded-xl border-2 cursor-pointer transition-all ${
                    state.dataSource === 'upload'
                      ? 'border-blue-600 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Upload className="w-12 h-12 text-blue-600 mb-4" />
                  <div className="font-bold text-lg text-gray-900 mb-2">
                    Upload File
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    CSV or Excel file
                  </div>
                  {state.uploadedFile && (
                    <div className="text-xs text-green-600 font-semibold">
                      ✓ {state.uploadedFile.name}
                    </div>
                  )}
                </label>

                <button
                  onClick={() => updateState({ dataSource: 'existing' })}
                  className={`p-8 rounded-xl border-2 transition-all text-left ${
                    state.dataSource === 'existing'
                      ? 'border-blue-600 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <FileSpreadsheet className="w-12 h-12 text-blue-600 mb-4" />
                  <div className="font-bold text-lg text-gray-900 mb-2">
                    Use Demo Data
                  </div>
                  <div className="text-sm text-gray-600">
                    Start with sample data
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Time & Scope */}
          {state.step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Set your view
              </h2>
              
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Time Period
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['daily', 'weekly', 'monthly'] as const).map(period => (
                    <button
                      key={period}
                      onClick={() => updateState({ period })}
                      className={`py-4 px-6 rounded-xl border-2 font-semibold capitalize transition-all ${
                        state.period === period
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-200 text-gray-700 hover:border-blue-300'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Scope
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => updateState({ scope: 'single' })}
                    className={`py-4 px-6 rounded-xl border-2 font-semibold transition-all ${
                      state.scope === 'single'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    Single Branch
                  </button>
                  <button
                    onClick={() => updateState({ scope: 'all' })}
                    className={`py-4 px-6 rounded-xl border-2 font-semibold transition-all ${
                      state.scope === 'all'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    All Branches
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: View Level */}
          {state.step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Choose your view level
              </h2>
              <p className="text-gray-600 mb-6">
                Select the level of detail you need
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => updateState({ viewLevel: 'executive' })}
                  className={`p-8 rounded-xl border-2 transition-all text-left ${
                    state.viewLevel === 'executive'
                      ? 'border-blue-600 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-4xl mb-3">👔</div>
                  <div className="font-bold text-lg text-gray-900 mb-2">
                    Executive Summary
                  </div>
                  <div className="text-sm text-gray-600">
                    High-level overview for quick decisions
                  </div>
                </button>

                <button
                  onClick={() => updateState({ viewLevel: 'detailed' })}
                  className={`p-8 rounded-xl border-2 transition-all text-left ${
                    state.viewLevel === 'detailed'
                      ? 'border-blue-600 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-4xl mb-3">📊</div>
                  <div className="font-bold text-lg text-gray-900 mb-2">
                    Detailed Analysis
                  </div>
                  <div className="text-sm text-gray-600">
                    In-depth metrics and breakdowns
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Preview */}
          {state.step === 5 && state.intent && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your dashboard is ready!
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{INTENT_TO_DASHBOARD[state.intent].icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {INTENT_TO_DASHBOARD[state.intent].label}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>📊 Data: {state.dataSource === 'upload' ? state.uploadedFile?.name : 'Demo data'}</div>
                      <div>📅 Period: {state.period}</div>
                      <div>📍 Scope: {state.scope === 'all' ? 'All branches' : 'Single branch'}</div>
                      <div>👁️ View: {state.viewLevel === 'executive' ? 'Executive' : 'Detailed'}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600">
                Click "Create Dashboard" to finish
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={state.step === 1}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          {state.step < 5 ? (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              Next
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-all shadow-lg"
            >
              <Check size={20} />
              Create Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardWizard;
