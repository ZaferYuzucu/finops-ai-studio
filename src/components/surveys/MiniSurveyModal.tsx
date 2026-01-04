import React, { useState } from 'react';
import { X, Clock, CheckCircle, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SurveyQuestion, SurveyAnswer, MiniSurveyData, SectorType, CompanySizeType, MainChallengeType } from '@/types/survey';
import miniSurveyConfig from '@/data/surveys/miniSurvey.json';

interface MiniSurveyModalProps {
  isOpen: boolean;
  onComplete: (data: MiniSurveyData) => void;
  onSkip: () => void;
}

const MiniSurveyModal: React.FC<MiniSurveyModalProps> = ({ isOpen, onComplete, onSkip }) => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const questions = miniSurveyConfig.questions as SurveyQuestion[];
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const isLastStep = currentStep === questions.length - 1;

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Auto-advance after selection
    setTimeout(() => {
      if (isLastStep) {
        // Show completion screen
        setShowCompleted(true);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }, 300);
  };

  const handleCompleteFromWelcome = () => {
    setShowWelcome(false);
  };

  const handleSkipQuestion = () => {
    if (isLastStep) {
      onSkip();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFinish = () => {
    onComplete({
      sector: answers.sector as SectorType,
      companySize: answers.company_size as CompanySizeType,
      mainChallenge: answers.main_challenge as MainChallengeType,
    });
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  // ========================================
  // EKRAN-1: HOŞ GELDİN / AMAÇ AÇIKLAMASI
  // ========================================
  if (showWelcome) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden"
        >
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-8 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block mb-4"
              >
                <Sparkles size={48} className="text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold mb-2">
                Sizi daha iyi tanımak isteriz
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <p className="text-lg text-gray-700 text-center mb-6 leading-relaxed">
              FinOps AI Studio'yu <strong>sektörünüze</strong> ve <strong>ihtiyaçlarınıza</strong> göre<br />
              daha verimli hale getirebilmemiz için<br />
              size birkaç kısa soru sormak istiyoruz.
            </p>

            {/* Trust note */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-center">
              <p className="text-sm text-gray-600">
                <Shield className="inline mr-1 text-blue-600" size={16} />
                Bu anket <strong>isteğe bağlıdır</strong>.<br />
                Dilerseniz şimdi veya daha sonra yanıtlayabilirsiniz.
              </p>
            </div>

            {/* Info badges */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center">
                <div className="text-2xl mb-1">⏱️</div>
                <p className="text-xs text-gray-600">30 saniye</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🎯</div>
                <p className="text-xs text-gray-600">3 soru</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🔒</div>
                <p className="text-xs text-gray-600">Gizli & Güvenli</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCompleteFromWelcome}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={20} />
                <span>Ankete Başla</span>
                <ArrowRight size={20} />
              </motion.button>

              <button
                onClick={onSkip}
                className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Şimdilik Geç
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ========================================
  // EKRAN-5: TAMAMLANDI EKRANI
  // ========================================
  if (showCompleted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden"
        >
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-8 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-block mb-4"
              >
                <CheckCircle size={64} className="text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold mb-2">
                Teşekkür ederiz 🙏
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <p className="text-lg text-gray-700 text-center mb-6 leading-relaxed">
              Paylaştığınız bilgiler sayesinde<br />
              size <strong>daha doğru dashboard'lar</strong> ve <strong>içgörüler</strong> sunabileceğiz.
            </p>

            {/* Info note */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6 text-center">
              <p className="text-sm text-gray-700">
                💡 İsterseniz bu bilgileri daha sonra<br />
                <strong>profilinizden güncelleyebilirsiniz.</strong>
              </p>
            </div>

            {/* What's next */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
              <p className="text-sm font-semibold text-gray-900 mb-2 text-center">
                ✨ Sizin için hazırladıklarımız:
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span>Sektörünüze özel dashboard önerileri</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span>İhtiyacınıza uygun KPI'lar</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span>Kişiselleştirilmiş içgörüler</span>
                </div>
              </div>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFinish}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Dashboard'uma Git</span>
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ========================================
  // EKRAN-2, 3, 4: SORULAR
  // ========================================
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-8 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          
          <button
            onClick={onSkip}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Kapat"
          >
            <X size={24} />
          </button>
          
          <div className="relative z-10">
            {/* Welcome Badge */}
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4"
              >
                <Sparkles size={18} />
                <span className="text-sm font-semibold">{miniSurveyConfig.estimatedTime}</span>
              </motion.div>
            )}
            
            <h2 className="text-3xl font-bold mb-3">
              {(miniSurveyConfig as any).title}
            </h2>
            
            {currentStep === 0 && (
              <div className="space-y-2 mb-4">
                <p className="text-lg text-white/95">
                  {(miniSurveyConfig as any).subtitle}
                </p>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Shield size={16} />
                  <span>{(miniSurveyConfig as any).description}</span>
                </div>
              </div>
            )}
            
            {/* Progress bar */}
            <div className="w-full bg-white/20 rounded-full h-2 mt-4 backdrop-blur-sm">
              <motion.div
                className="bg-white h-full rounded-full shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-white/90 font-medium">
                {currentStep + 1}. soru / {questions.length}
              </p>
              <p className="text-xs text-white/70">
                {Math.round(progress)}% tamamlandı
              </p>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-8">
          {/* EKRAN-2: Genel Bilgilendirme (Sabit) */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              <Shield className="inline text-blue-600 mr-1" size={16} />
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
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {currentQuestion.question}
                </h3>
                
                {/* EKRAN-3: Mikro Açıklama (Her Sorunun Altında) */}
                <div className="flex items-start gap-2 mb-4">
                  <span className="text-purple-500 mt-0.5">💡</span>
                  <p className="text-sm text-gray-600 italic">
                    {currentStep === 0 && "Bu bilgi, sektörünüze uygun KPI'ları seçmemize yardımcı olur."}
                    {currentStep === 1 && "İşletme büyüklüğünüze göre raporları optimize ederiz."}
                    {currentStep === 2 && "Ana zorluğunuza odaklı çözümler önerebiliriz."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion.options?.map((option, index) => {
                  const isSelected = answers[currentQuestion.id] === option.value;
                  
                  return (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleAnswer(currentQuestion.id, option.value)}
                      className={`
                        group relative p-5 rounded-xl border-2 transition-all text-left
                        ${isSelected 
                          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl scale-105 ring-4 ring-blue-100' 
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg hover:scale-102'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`text-4xl transition-transform ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <p className={`font-bold ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                            {option.label}
                          </p>
                          {option.description && (
                            <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                          )}
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex-shrink-0"
                          >
                            <CheckCircle className="text-blue-600" size={28} />
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Hover effect */}
                      {!isSelected && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5 transition-all pointer-events-none"></div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-5 border-t border-gray-200">
          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mb-4">
            {/* Left: Back or Exit */}
            <button
              onClick={currentStep > 0 ? handleBack : onSkip}
              className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-all"
            >
              {currentStep > 0 ? (
                <>
                  <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  <span>Geri</span>
                </>
              ) : (
                <>
                  <X size={18} />
                  <span className="text-sm">Anketi Daha Sonra Yanıtla</span>
                </>
              )}
            </button>
            
            {/* Right: Progress indicator */}
            <div className="flex items-center gap-3">
              {currentStep === questions.length - 1 ? (
                <div className="flex items-center gap-2 text-sm text-green-700 font-medium">
                  <CheckCircle size={18} />
                  <span>Son soru! 🎉</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-blue-700 font-medium">
                  <span>Cevabını seç</span>
                  <ArrowRight size={16} className="animate-pulse" />
                </div>
              )}
            </div>
          </div>

          {/* EKRAN-4: Bu Soruyu Geç Butonu */}
          <div className="flex justify-center">
            <button
              onClick={handleSkipQuestion}
              className="text-sm text-gray-500 hover:text-gray-700 underline decoration-dotted transition-colors"
            >
              Bu soruyu geç →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MiniSurveyModal;

