import { X, HelpCircle, Zap, TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Dashboard } from '../data/dashboards';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DashboardDrawerProps {
  dashboard: Dashboard | null;
  isOpen: boolean;
  onClose: () => void;
  onAskAI: (question: string) => void;
}

// Metrik simülasyonu için random değerler
const getMetricTrend = (t: any) => {
  const trends = [
    { icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', label: t('dashboardDrawer.trending.up'), percent: '+12%' },
    { icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-50', label: t('dashboardDrawer.trending.down'), percent: '-8%' },
    { icon: Minus, color: 'text-gray-600', bg: 'bg-gray-50', label: t('dashboardDrawer.trending.stable'), percent: '0%' },
  ];
  return trends[Math.floor(Math.random() * trends.length)];
};

export default function DashboardDrawer({ dashboard, isOpen, onClose, onAskAI }: DashboardDrawerProps) {
  const { t } = useTranslation();
  const [hoveredQuestion, setHoveredQuestion] = useState<number | null>(null);

  if (!dashboard) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay (Arka Plan Karartma) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Drawer (Sağdan Açılan Panel) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 shadow-lg z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm mb-3">
                    <TrendingUp className="w-3 h-3" />
                    {t(`dashboardCategories.${dashboard.category}`)}
                  </span>
                  <h2 className="text-2xl font-bold leading-tight">
                    {t(`dashboards.${dashboard.id}.name`, { defaultValue: dashboard.name })}
                  </h2>
                  <p className="mt-2 text-sm text-indigo-100 leading-relaxed">
                    {t(`dashboards.${dashboard.id}.description`, { defaultValue: dashboard.description })}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="ml-4 p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* İçerik */}
            <div className="p-6 space-y-8">
              
              {/* Anahtar Sorular */}
              {dashboard.keyQuestions.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {t('dashboardDrawer.keyQuestions')}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {dashboard.keyQuestions.map((question, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onMouseEnter={() => setHoveredQuestion(index)}
                        onMouseLeave={() => setHoveredQuestion(null)}
                        className="group relative bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 transition-all hover:shadow-md"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-gray-800 text-sm leading-relaxed flex-1">
                            {question}
                          </p>
                          
                          {/* AI Butonu */}
                          <motion.button
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ 
                              scale: hoveredQuestion === index ? 1 : 0.8,
                              opacity: hoveredQuestion === index ? 1 : 0
                            }}
                            onClick={() => onAskAI(question)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-xs font-semibold hover:shadow-lg transition-all whitespace-nowrap"
                          >
                            <Sparkles className="w-3 h-3" />
                            {t('dashboardDrawer.askAI')}
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Temel Metrikler */}
              {dashboard.keyMetrics.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {t('dashboardDrawer.keyMetrics')}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {dashboard.keyMetrics.map((metric, index) => {
                      const trend = getMetricTrend(t);
                      const TrendIcon = trend.icon;
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="group bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-md"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <p className="text-gray-800 text-sm leading-relaxed font-medium">
                                {metric}
                              </p>
                            </div>
                            
                            {/* Trend Göstergesi */}
                            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${trend.bg} flex-shrink-0`}>
                              <TrendIcon className={`w-4 h-4 ${trend.color}`} />
                              <span className={`text-xs font-bold ${trend.color}`}>
                                {trend.percent}
                              </span>
                            </div>
                          </div>
                          
                          {/* Mini Progress Bar */}
                          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.random() * 60 + 40}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className={`h-full rounded-full ${
                                trend.icon === TrendingUp ? 'bg-green-500' :
                                trend.icon === TrendingDown ? 'bg-red-500' : 'bg-gray-400'
                              }`}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Footer CTA */}
              <div className="mt-8 p-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl text-white text-center">
                <h4 className="text-lg font-bold mb-2">{t('dashboardDrawer.cta.title')}</h4>
                <p className="text-sm text-indigo-100 mb-4">
                  {t('dashboardDrawer.cta.description')}
                </p>
                <button className="px-6 py-2.5 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                  {t('dashboardDrawer.cta.button')}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

