import { Search, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface DashboardFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  totalCount: number;
  filteredCount: number;
}

export default function DashboardFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  totalCount,
  filteredCount,
}: DashboardFiltersProps) {
  const { t } = useTranslation();
  
  const categoryColors: Record<string, string> = {
    "Finans": "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-300",
    "Satış": "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-300",
    "Pazarlama": "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-300",
    "Operasyon": "bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-300",
    "İnsan Kaynakları": "bg-pink-100 text-pink-700 hover:bg-pink-200 border-pink-300",
    "Restoran": "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-300",
    "Otel": "bg-cyan-100 text-cyan-700 hover:bg-cyan-200 border-cyan-300",
    "Otomotiv": "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300",
    "Tarım": "bg-lime-100 text-lime-700 hover:bg-lime-200 border-lime-300",
    "E-Ticaret": "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-300",
  };

  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'Tümü';

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Tümü');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-4 sm:p-6 mb-8 sm:mb-10">
      {/* Başlık ve Sonuç Sayacı */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <Filter className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">{t('dashboardFilters.title')}</h2>
            <p className="text-xs sm:text-sm text-gray-500">
              <span className="font-semibold text-indigo-600">{filteredCount}</span> / {totalCount} {t('dashboardFilters.showing')}
            </p>
          </div>
        </div>
        
        {/* Filtreleri Temizle */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearFilters}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t('dashboardFilters.clear')}</span>
              <span className="sm:hidden">×</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Arama Çubuğu */}
      <div className="relative mb-6">
        <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('dashboardFilters.searchPlaceholder')}
          className="w-full pl-10 sm:pl-12 pr-10 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder-gray-400 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>

      {/* Kategori Filtreleri */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-3">
          {t('dashboardFilters.filterByCategory')}
        </label>
        <div className="flex flex-wrap gap-2">
          {/* Tümü Butonu */}
          <button
            onClick={() => setSelectedCategory('Tümü')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border-2 transition-all touch-manipulation ${
              selectedCategory === 'Tümü'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
            }`}
          >
            {t('dashboardFilters.all')}
          </button>

          {/* Kategori Butonları */}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border-2 transition-all touch-manipulation whitespace-nowrap ${
                selectedCategory === category
                  ? categoryColors[category] || 'bg-gray-200 text-gray-800 border-gray-400'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              {t(`dashboardCategories.${category}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Filtreleme Sonucu Mesajı */}
      <AnimatePresence>
        {filteredCount === 0 && hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg"
          >
            <p className="text-sm text-amber-800">
              <span className="font-semibold">{t('dashboardFilters.noResults')}</span> {t('dashboardFilters.tryDifferent')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

