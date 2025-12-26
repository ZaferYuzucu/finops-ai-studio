import { PlayCircle, Shield, BrainCircuit, PiggyBank, Search, ArrowRight, Database, LayoutDashboard, Zap, LifeBuoy, BookOpen, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import databaseTablesImg from '../assets/illustrations/undraw/undraw_database-tables_yft5-finops.svg';
import allTheDataImg from '../assets/illustrations/undraw/undraw_all-the-data_ijgn-finops.svg';
import setupAnalyticsImg from '../assets/illustrations/undraw/setup-analytics-pana-finops.svg';
import visualDataBroImg from '../assets/illustrations/undraw/visual-data-bro-finops.svg';
import siteStatsImg from '../assets/illustrations/undraw/site-stats-bro-finops.svg';
import socialDashboardImg from '../assets/illustrations/undraw/social-dashboard-bro-finops.svg';
import designStatsImg from '../assets/illustrations/undraw/design-stats-bro-finops.svg';
import visualDataPanaImg from '../assets/illustrations/undraw/visual-data-pana-finops.svg';

const getCategories = (t: any) => [
  {
    nameKey: 'docs.categories.gettingStarted.name',
    descriptionKey: 'docs.categories.gettingStarted.description',
    icon: PlayCircle,
    imageUrl: setupAnalyticsImg,
    articlesKey: 'docs.categories.gettingStarted.articles'
  },
  {
    nameKey: 'docs.categories.security.name',
    descriptionKey: 'docs.categories.security.description',
    icon: Shield,
    imageUrl: siteStatsImg,
    articlesKey: 'docs.categories.security.articles'
  },
  {
    nameKey: 'docs.categories.dataSources.name',
    descriptionKey: 'docs.categories.dataSources.description',
    icon: Database,
    imageUrl: databaseTablesImg,
    articlesKey: 'docs.categories.dataSources.articles'
  },
  {
    nameKey: 'docs.categories.dashboards.name',
    descriptionKey: 'docs.categories.dashboards.description',
    icon: LayoutDashboard,
    imageUrl: allTheDataImg,
    articlesKey: 'docs.categories.dashboards.articles'
  },
  {
    nameKey: 'docs.categories.finops.name',
    descriptionKey: 'docs.categories.finops.description',
    icon: BrainCircuit,
    imageUrl: visualDataBroImg,
    articlesKey: 'docs.categories.finops.articles'
  },
  {
    nameKey: 'docs.categories.costManagement.name',
    descriptionKey: 'docs.categories.costManagement.description',
    icon: PiggyBank,
    imageUrl: designStatsImg,
    articlesKey: 'docs.categories.costManagement.articles'
  },
  {
    nameKey: 'docs.categories.aiTools.name',
    descriptionKey: 'docs.categories.aiTools.description',
    icon: Zap,
    imageUrl: visualDataPanaImg,
    articlesKey: 'docs.categories.aiTools.articles'
  },
  {
    nameKey: 'docs.categories.support.name',
    descriptionKey: 'docs.categories.support.description',
    icon: LifeBuoy,
    imageUrl: socialDashboardImg,
    articlesKey: 'docs.categories.support.articles'
  },
  {
    nameKey: 'docs.categories.api.name',
    descriptionKey: 'docs.categories.api.description',
    icon: FileText,
    imageUrl: databaseTablesImg,
    articlesKey: 'docs.categories.api.articles'
  },
  {
    nameKey: 'docs.categories.blog.name',
    descriptionKey: 'docs.categories.blog.description',
    icon: BookOpen,
    imageUrl: allTheDataImg,
    articlesKey: 'docs.categories.blog.articles'
  }
];

const getArticleLinks = (categoryKey: string, t: any) => {
  const links: Record<string, Array<{ title: string; href: string }>> = {
    'docs.categories.gettingStarted.articles': [
      { title: t('docs.categories.gettingStarted.articles.0'), href: '/docs/get-started' },
      { title: t('docs.categories.gettingStarted.articles.1'), href: '/docs/get-started' },
      { title: t('docs.categories.gettingStarted.articles.2'), href: '/docs/get-started' }
    ],
    'docs.categories.security.articles': [
      { title: t('docs.categories.security.articles.0'), href: '/about' },
      { title: t('docs.categories.security.articles.1'), href: '/docs/get-started' },
      { title: t('docs.categories.security.articles.2'), href: '/docs/get-started' }
    ],
    'docs.categories.dataSources.articles': [
      { title: t('docs.categories.dataSources.articles.0'), href: '/docs/get-started' },
      { title: t('docs.categories.dataSources.articles.1'), href: '/docs/get-started' },
      { title: t('docs.categories.dataSources.articles.2'), href: '/solutions/features' }
    ],
    'docs.categories.dashboards.articles': [
      { title: t('docs.categories.dashboards.articles.0'), href: '/solutions/dashboard-examples' },
      { title: t('docs.categories.dashboards.articles.1'), href: '/solutions/dashboard-examples' },
      { title: t('docs.categories.dashboards.articles.2'), href: '/solutions/dashboard-examples' }
    ],
    'docs.categories.finops.articles': [
      { title: t('docs.categories.finops.articles.0'), href: '/blog/what-is-finops' },
      { title: t('docs.categories.finops.articles.1'), href: '/blog/data-driven-decisions' },
      { title: t('docs.categories.finops.articles.2'), href: '/blog/bringing-teams-together' }
    ],
    'docs.categories.costManagement.articles': [
      { title: t('docs.categories.costManagement.articles.0'), href: '/blog/data-driven-decisions' },
      { title: t('docs.categories.costManagement.articles.1'), href: '/blog/data-driven-decisions' },
      { title: t('docs.categories.costManagement.articles.2'), href: '/solutions/features' }
    ],
    'docs.categories.aiTools.articles': [
      { title: t('docs.categories.aiTools.articles.0'), href: '/solutions/features' },
      { title: t('docs.categories.aiTools.articles.1'), href: '/solutions/features' },
      { title: t('docs.categories.aiTools.articles.2'), href: '/solutions/features' }
    ],
    'docs.categories.support.articles': [
      { title: t('docs.categories.support.articles.0'), href: '/solutions/support' },
      { title: t('docs.categories.support.articles.1'), href: '/solutions/support' },
      { title: t('docs.categories.support.articles.2'), href: '/contact' }
    ],
    'docs.categories.api.articles': [
      { title: t('docs.categories.api.articles.0'), href: '/docs/get-started' },
      { title: t('docs.categories.api.articles.1'), href: '/docs/get-started' },
      { title: t('docs.categories.api.articles.2'), href: '/docs/get-started' }
    ],
    'docs.categories.blog.articles': [
      { title: t('docs.categories.blog.articles.0'), href: '/blog/what-is-finops' },
      { title: t('docs.categories.blog.articles.1'), href: '/blog/bringing-teams-together' },
      { title: t('docs.categories.blog.articles.2'), href: '/blog/data-driven-decisions' },
      { title: t('docs.categories.blog.articles.3'), href: '/blog' }
    ]
  };
  
  return links[categoryKey] || [];
};

const DocsPage = () => {
  const { t } = useTranslation();
  const categories = getCategories(t);
  
  return (
    <div className="bg-white">
      {/* Header ve Arama */}
      <div className="bg-gray-50 py-20 sm:py-28">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">{t('docs.title')}</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            {t('docs.subtitle')}
          </p>
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder={t('docs.searchPlaceholder')}
                className="block w-full rounded-full border-gray-300 shadow-sm py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Kategori Kartları */}
      <div className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-12 sm:grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-2">
            {categories.map((category, idx) => (
              <div key={idx} className="flex flex-col rounded-2xl bg-white shadow-2xl ring-1 ring-gray-900/5 transition-all duration-300 hover:ring-gray-900/10">
                  <div className="relative h-56 flex-shrink-0 overflow-hidden rounded-t-2xl">
                      <img src={category.imageUrl} alt={`Image for ${t(category.nameKey)}`} className="absolute inset-0 h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                        <div className="absolute inset-0 flex items-end p-6">
                            <div className="rounded-lg bg-white/10 p-3 ring-1 ring-white/20 backdrop-blur-sm">
                                <category.icon className="h-10 w-10 text-white" />
                            </div>
                        </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{t(category.nameKey)}</h3>
                        <p className="mt-2 text-sm text-gray-600">{t(category.descriptionKey)}</p>
                        <ul className="mt-6 space-y-3">
                            {getArticleLinks(category.articlesKey, t).map((article, articleIdx) => (
                                <li key={articleIdx}>
                                    <Link to={article.href} className="group flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600">
                                        <ArrowRight className="h-4 w-4 mr-3 text-gray-400 group-hover:text-indigo-500 flex-shrink-0" />
                                        <span>{article.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                      </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
