import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles, TrendingUp, Zap, BarChart3, Database, Shield } from 'lucide-react';
import FlowAnimation from '../components/FlowAnimation';
import SolutionsSection from '../components/SolutionsSection';
import IntegrationsSection from '../components/IntegrationsSection';
import ceoDashboardImg from '@/assets/illustrations/undraw/site-stats-bro-finops.svg';

const HeroPage = () => {
  const { t } = useTranslation();
  
  return (
    <>
      {/* Hero Section - Aydınlık, Umut Dolu, Modern! */}
      <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-purple-200 text-purple-700 px-5 py-2 rounded-full text-sm font-semibold mb-8 shadow-lg">
              <Sparkles size={18} className="text-purple-500" />
              <span>{t('heroPage.hero.badge')}</span>
            </div>

            {/* Main Title - Gradient */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                {t('heroPage.hero.title')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              {t('heroPage.hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="/signup"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 font-semibold text-lg"
              >
                <Zap size={20} />
                <span>{t('heroPage.hero.cta1')}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200 text-purple-700 rounded-xl hover:bg-white hover:border-purple-400 transition-all shadow-lg font-semibold text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <span>{t('heroPage.hero.cta2')}</span>
                <TrendingUp size={20} />
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-green-600" />
                <span>{t('heroPage.trust.secure')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-purple-600" />
                <span>{t('heroPage.trust.aiPowered')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-orange-600" />
                <span>{t('heroPage.trust.quickSetup')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Preview - Beyaz arka plan */}
      <div className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('heroPage.dashboard.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('heroPage.dashboard.subtitle')}
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-2xl p-8 max-w-5xl w-full border-2 border-white">
                <img 
                  src={ceoDashboardImg} 
                  alt={t('heroPage.dashboard.alt')}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - 4 Kartlı */}
      <div id="features" className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 sm:py-20 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles size={16} />
              <span>{t('features.badge')}</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('heroPage.features.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('heroPage.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('heroPage.features.feature1.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('heroPage.features.feature1.description')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-purple-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('heroPage.features.feature2.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('heroPage.features.feature2.description')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-green-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Database className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('heroPage.features.feature3.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('heroPage.features.feature3.description')}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-orange-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('heroPage.features.feature4.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('heroPage.features.feature4.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Flow Animation Section */}
      <div id="automation-flow" className="bg-white py-16 sm:py-20 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles size={16} />
              <span>{t('heroPage.automation.badge')}</span>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text mb-4">
              {t('heroPage.automation.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('heroPage.automation.description')}
            </p>
          </div>
          <div className="mt-12">
            <FlowAnimation />
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <SolutionsSection />

      {/* Integrations Section */}
      <IntegrationsSection />

      {/* Final CTA - Gradient */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('heroPage.finalCta.title')}
          </h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            {t('heroPage.finalCta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/signup"
              className="group inline-flex items-center gap-2 px-10 py-5 bg-white text-purple-600 rounded-xl hover:bg-gray-50 transition-all shadow-2xl font-bold text-lg"
            >
              <span>{t('heroPage.finalCta.cta1')}</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 px-10 py-5 border-2 border-white/30 backdrop-blur-sm text-white rounded-xl hover:bg-white/10 transition-all font-bold text-lg"
            >
              <span>{t('heroPage.finalCta.cta2')}</span>
            </a>
          </div>
          <p className="text-sm text-purple-100 mt-6">
            ✓ {t('heroPage.finalCta.trust1')}  ✓ {t('heroPage.finalCta.trust2')}  ✓ {t('heroPage.finalCta.trust3')}
          </p>
        </div>
      </div>

      {/* CSS for blob animation */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
};

export default HeroPage;
