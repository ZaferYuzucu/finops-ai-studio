import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Settings, Info } from 'lucide-react';
import type { RecommendationResult } from '@/types/recommendationEngine';
import { KPI_LEVELS } from '@/config/recommendationRules';

interface RecommendationDisplayProps {
  result: RecommendationResult;
  onSelectDashboard?: (dashboardId: string) => void;
}

/**
 * EKRAN: Dashboard Önerisi Gösterimi
 * Kullanıcı anketi tamamladıktan sonra önerilen dashboardları gösterir
 */
const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({ 
  result, 
  onSelectDashboard 
}) => {
  const kpiLevelInfo = KPI_LEVELS[result.kpi_level];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* ÖNERİ BAŞLIĞI (UI TEXT - KURAL-5) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
          <Sparkles size={18} />
          <span className="text-sm font-semibold">Size Özel Hazırlandı</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Yanıtlarınıza göre sizin için en uygun dashboard'ları hazırladık
        </h1>
        
        <p className="text-gray-600 text-lg">
          Dilerseniz bunları şimdi inceleyebilir veya daha sonra değiştirebilirsiniz.
        </p>
      </motion.div>

      {/* KPI SEVIYE BİLGİSİ (KURAL-4 Sonucu) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-6"
      >
        <div className="flex items-start gap-4">
          <div className="bg-blue-500 p-3 rounded-lg">
            <Settings className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {kpiLevelInfo.name} - {result.kpi_level}
            </h3>
            <p className="text-gray-700 mb-3">
              {kpiLevelInfo.description}
            </p>
            <div className="space-y-1">
              {kpiLevelInfo.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-600">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ÖNERİLEN DASHBOARD'LAR */}
      <div className="space-y-4 mb-6">
        {result.recommended_dashboards.map((recommendation, index) => (
          <motion.div
            key={recommendation.dashboard.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + (index * 0.1) }}
            className={`
              relative bg-white rounded-xl border-2 p-5 transition-all cursor-pointer
              ${recommendation.isPrimary 
                ? 'border-purple-500 shadow-lg' 
                : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
              }
            `}
            onClick={() => onSelectDashboard?.(recommendation.dashboard.id)}
          >
            {/* Primary Badge */}
            {recommendation.isPrimary && (
              <div className="absolute -top-3 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Sparkles size={12} />
                <span>Öncelikli</span>
              </div>
            )}

            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="text-4xl flex-shrink-0">
                {recommendation.dashboard.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {recommendation.dashboard.name}
                </h3>
                <p className="text-gray-600 mb-3">
                  {recommendation.dashboard.description}
                </p>

                {/* Match Reason */}
                <div className="flex items-start gap-2 mb-3">
                  <Info size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-purple-700 font-medium">
                    {recommendation.matchReason}
                  </p>
                </div>

                {/* KPIs Preview */}
                <div className="flex flex-wrap gap-2">
                  {recommendation.dashboard.kpis.slice(0, 3).map((kpi, kpiIndex) => (
                    <span 
                      key={kpiIndex}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {kpi}
                    </span>
                  ))}
                  {recommendation.dashboard.kpis.length > 3 && (
                    <span className="text-xs text-gray-500 px-2 py-1">
                      +{recommendation.dashboard.kpis.length - 3} daha
                    </span>
                  )}
                </div>
              </div>

              {/* Score Badge */}
              <div className="flex-shrink-0 text-center">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-lg px-3 py-2">
                  <div className="text-2xl font-bold">
                    {recommendation.relevanceScore}
                  </div>
                  <div className="text-xs opacity-90">
                    Eşleşme
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* UYGULANAN KURALLAR (Debug/Transparency) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
      >
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <TrendingUp size={16} />
          Uygulanan Öneri Kuralları
        </h4>
        <div className="flex flex-wrap gap-2">
          {result.appliedRules.map((rule, index) => (
            <span 
              key={index}
              className="text-xs bg-white border border-gray-300 text-gray-600 px-2 py-1 rounded"
            >
              {rule}
            </span>
          ))}
        </div>
      </motion.div>

      {/* CTA BUTON */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center"
      >
        <button
          onClick={() => onSelectDashboard?.(result.default_dashboard)}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
        >
          <span className="flex items-center gap-2">
            <span>Dashboard'larımı Görüntüle</span>
            <Sparkles size={20} />
          </span>
        </button>
        
        <p className="text-sm text-gray-600 mt-3">
          {result.totalRecommended} panel önerildi • {result.kpi_level} seviye KPI'lar
        </p>
      </motion.div>
    </div>
  );
};

export default RecommendationDisplay;





