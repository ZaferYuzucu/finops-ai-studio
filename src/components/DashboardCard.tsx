import type { Dashboard } from "../data/dashboards";
import { motion } from "framer-motion";
import { TrendingUp, Zap } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface DashboardCardProps {
  dashboard: Dashboard;
  index?: number;
  onClick?: () => void;
}

export default function DashboardCard({ dashboard, index = 0, onClick }: DashboardCardProps) {
  const { t } = useTranslation();
  
  // Kategori renklerini tanımla
  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    "Finans": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
    "Satış": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
    "Pazarlama": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
    "Operasyon": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
    "İnsan Kaynakları": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
    "Restoran": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
    "Otel": { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
    "Otomotiv": { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" },
    "Tarım": { bg: "bg-lime-50", text: "text-lime-700", border: "border-lime-200" },
    "E-Ticaret": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  };

  const categoryStyle = categoryColors[dashboard.category] || categoryColors["Finans"];

  // Sayı rozetleri için bilgi
  const hasContent = dashboard.keyQuestions.length > 0 || dashboard.keyMetrics.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <div 
        onClick={onClick}
        className="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 cursor-pointer"
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 z-10 pointer-events-none rounded-2xl" />
        
        {/* İçerik Rozeti */}
        {hasContent && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-md border border-gray-200">
            <Zap className="w-3 h-3 text-amber-500" />
            <span className="text-xs font-semibold text-gray-700">{t('dashboardCard.filled')}</span>
          </div>
        )}

        {/* Görsel */}
        <div className="relative aspect-w-16 aspect-h-9 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img
            src={dashboard.imageUrl}
            alt={`${dashboard.name} - ${t('dashboardCard.preview')}`}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* İçerik */}
        <div className="relative p-6 flex-grow flex flex-col z-10">
          {/* Kategori Rozeti */}
          <div className="mb-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}>
              <TrendingUp className="w-3 h-3" />
              {t(`dashboardCategories.${dashboard.category}`)}
            </span>
          </div>

          {/* Başlık */}
          <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-indigo-600 transition-colors duration-200">
            {t(`dashboards.${dashboard.id}.name`, { defaultValue: dashboard.name })}
          </h3>

          {/* Açıklama */}
          <p className="text-sm text-gray-600 flex-grow line-clamp-2 leading-relaxed">
            {t(`dashboards.${dashboard.id}.description`, { defaultValue: dashboard.description })}
          </p>

          {/* Alt Bilgi - Metrik ve Soru Sayıları */}
          {hasContent && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-500">
              {dashboard.keyQuestions.length > 0 && (
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-indigo-600">{dashboard.keyQuestions.length}</span>
                  <span>{t('dashboardCard.questions')}</span>
                </div>
              )}
              {dashboard.keyMetrics.length > 0 && (
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-purple-600">{dashboard.keyMetrics.length}</span>
                  <span>{t('dashboardCard.metrics')}</span>
                </div>
              )}
            </div>
          )}

          {/* Hover Arrow */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
