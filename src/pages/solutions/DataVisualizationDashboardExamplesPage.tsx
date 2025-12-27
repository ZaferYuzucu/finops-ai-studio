import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { dashboards, dashboardCategories, type Dashboard } from '../../data/dashboards';
import DashboardCard from '../../components/DashboardCard';
import DashboardFilters from '../../components/DashboardFilters';
import DashboardDrawer from '../../components/DashboardDrawer';
import AIChatModal from '../../components/AIChatModal';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const DataVisualizationDashboardExamplesPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [aiChatQuestion, setAiChatQuestion] = useState('');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Filtrelenmiş dashboard'ları hesapla
  const filteredDashboards = useMemo(() => {
    let filtered = dashboards;

    // Kategori filtresi
    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(d => d.category === selectedCategory);
    }

    // Arama filtresi
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(searchLower) ||
        d.description.toLowerCase().includes(searchLower) ||
        d.category.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  // Kategorilere göre grupla (sadece filtrelenmiş dashboard'lar)
  const groupedDashboards = dashboardCategories.map(category => ({
    category,
    dashboards: filteredDashboards.filter(d => d.category === category)
  })).filter(group => group.dashboards.length > 0);

  // Dashboard kartına tıklama
  const handleDashboardClick = (dashboard: Dashboard) => {
    setSelectedDashboard(dashboard);
    setIsDrawerOpen(true);
  };

  // AI Chat başlatma
  const handleAskAI = (question: string) => {
    setAiChatQuestion(question);
    setIsAIChatOpen(true);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        
        {/* Sayfa Başlığı */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>{t('dashboardExamples.badge')}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            {t('dashboardExamples.title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              {t('dashboardExamples.titleHighlight')}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto">
            {t('dashboardExamples.subtitle')}
          </p>
        </motion.div>

        {/* Filtreler */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <DashboardFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={dashboardCategories}
            totalCount={dashboards.length}
            filteredCount={filteredDashboards.length}
          />
        </motion.div>

        {/* Dashboard Galerisi */}
        <div className="space-y-16">
          {groupedDashboards.length > 0 ? (
            groupedDashboards.map(({ category, dashboards: categoryDashboards }) => (
              <motion.div
                key={category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {/* Kategori Başlığı */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
                    {category} {t('dashboardExamples.categoryPanels')}
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                </div>

                {/* Dashboard Kartları */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {categoryDashboards.map((dashboard, index) => (
                    <DashboardCard 
                      key={dashboard.id} 
                      dashboard={dashboard} 
                      index={index}
                      onClick={() => handleDashboardClick(dashboard)}
                    />
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            // Sonuç Bulunamadı Mesajı
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('dashboardExamples.noResults')}</h3>
              <p className="text-gray-600 mb-6">
                {t('dashboardExamples.noResultsDesc')}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Tümü');
                }}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                {t('dashboardExamples.clearFilters')}
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Dashboard Detay Drawer */}
      <DashboardDrawer
        dashboard={selectedDashboard}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onAskAI={handleAskAI}
      />

      {/* AI Chat Modal */}
      <AIChatModal
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        initialQuestion={aiChatQuestion}
        dashboardName={selectedDashboard?.name || ''}
      />
    </div>
  );
};

export default DataVisualizationDashboardExamplesPage;
