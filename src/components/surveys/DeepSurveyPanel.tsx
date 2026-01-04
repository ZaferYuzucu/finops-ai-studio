import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SurveyQuestion, SurveyAnswer, SectorType } from '@/types/survey';
import deepSurveyConfig from '@/data/surveys/deepSurvey.json';

interface DeepSurveyPanelProps {
  isVisible: boolean;
  sector: SectorType;
  onComplete: (answers: Record<string, string | string[]>) => void;
  onDismiss: () => void;
}

const DeepSurveyPanel: React.FC<DeepSurveyPanelProps> = ({ 
  isVisible, 
  sector, 
  onComplete, 
  onDismiss 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  // Get sector-specific questions or default
  const sectorKey = sector in deepSurveyConfig ? sector : 'default';
  const surveyData = deepSurveyConfig[sectorKey as keyof typeof deepSurveyConfig];
  const questions = surveyData.questions as SurveyQuestion[];
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete survey
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleMultipleChoice = (questionId: string, value: string) => {
    const currentAnswers = (answers[questionId] as string[]) || [];
    const newAnswers = currentAnswers.includes(value)
      ? currentAnswers.filter(v => v !== value)
      : [...currentAnswers, value];
    handleAnswer(questionId, newAnswers);
  };

  const canProceed = () => {
    const answer = answers[currentQuestion?.id];
    if (!answer) return false;
    if (Array.isArray(answer)) return answer.length > 0;
    return true;
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Collapsed Banner */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white shadow-2xl relative overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-white/5">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 py-5 relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <motion.div 
                    className="bg-white/20 p-3 rounded-xl backdrop-blur-sm flex-shrink-0"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Sparkles size={28} />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xl mb-1">
                      🎯 {surveyData.title}
                    </h3>
                    <p className="text-sm text-white/95">
                      {surveyData.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-white/80">
                      <span className="flex items-center gap-1">
                        ⏱️ {surveyData.estimatedTime}
                      </span>
                      <span className="flex items-center gap-1">
                        🎁 Özel öneriler
                      </span>
                      <span className="flex items-center gap-1">
                        ✨ Zaman kazandırır
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsExpanded(true)}
                    className="px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl flex items-center gap-2"
                  >
                    <span>Başlayalım</span>
                    <ArrowRight size={18} />
                  </motion.button>
                  <button
                    onClick={onDismiss}
                    className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                    title="Şimdi değil"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Survey Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">{surveyData.title}</h2>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                {/* Progress */}
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div
                    className="bg-white h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-sm text-white/80 mt-2">
                  Soru {currentStep + 1} / {questions.length}
                </p>
              </div>

              {/* Question Content */}
              <div className="flex-1 overflow-y-auto p-8">
                {/* Genel Bilgilendirme (Sabit - Üstte) */}
                <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-lg p-4 mb-6">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <Shield className="inline text-purple-600 mr-1" size={16} />
                    Bu sorular, size en uygun dashboard ve önerileri sunabilmemiz içindir.<br />
                    Yanıtlarınız <strong>gizlidir</strong> ve yalnızca ürün deneyiminizi iyileştirmek için kullanılır.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {currentQuestion?.question}
                    </h3>
                    {currentQuestion?.description && (
                      <p className="text-gray-600 mb-4">{currentQuestion.description}</p>
                    )}
                    
                    {/* Mikro Açıklama */}
                    <div className="flex items-start gap-2 mb-6">
                      <span className="text-purple-500 mt-0.5">💡</span>
                      <p className="text-sm text-gray-600 italic">
                        Bu bilgi, size daha uygun öneriler sunmamıza yardımcı olur.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {currentQuestion?.options?.map((option) => {
                        const isMultiple = currentQuestion.type === 'multiple_choice';
                        const isSelected = isMultiple
                          ? ((answers[currentQuestion.id] as string[]) || []).includes(option.value)
                          : answers[currentQuestion.id] === option.value;

                        return (
                          <button
                            key={option.value}
                            onClick={() => 
                              isMultiple 
                                ? toggleMultipleChoice(currentQuestion.id, option.value)
                                : handleAnswer(currentQuestion.id, option.value)
                            }
                            className={`
                              w-full p-4 rounded-xl border-2 transition-all text-left
                              ${isSelected 
                                ? 'border-purple-500 bg-purple-50 shadow-md' 
                                : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-sm'
                              }
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{option.icon}</div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{option.label}</p>
                                {option.description && (
                                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                                )}
                              </div>
                              {isSelected && (
                                <CheckCircle2 className="text-purple-500" size={24} />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer Navigation */}
              <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-purple-50">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={currentStep > 0 ? handleBack : () => setIsExpanded(false)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    <ChevronLeft size={20} />
                    {currentStep > 0 ? 'Geri' : 'Kapat'}
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`
                      flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg
                      ${canProceed()
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl scale-100 hover:scale-105'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                      }
                    `}
                  >
                    {currentStep === questions.length - 1 ? '✓ Tamamla' : 'Devam'}
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Bu soruyu geç butonu */}
                <div className="flex justify-center">
                  <button
                    onClick={handleNext}
                    className="text-sm text-gray-500 hover:text-gray-700 underline decoration-dotted transition-colors"
                  >
                    Bu soruyu geç →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeepSurveyPanel;

