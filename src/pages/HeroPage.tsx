import React from 'react';
import { useTranslation } from 'react-i18next';
import FlowAnimation from '../components/FlowAnimation';
import SolutionsSection from '../components/SolutionsSection';
import IntegrationsSection from '../components/IntegrationsSection';
import ceoDashboardImg from '@/assets/illustrations/undraw/site-stats-bro-finops.svg';

const HeroPage = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero Section: Text content with a rich, dark background */}
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {/* Fluorescent gradient for the title */}
            <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-sky-400 to-amber-400 text-transparent bg-clip-text">
              {t('heroPage.hero.title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              {t('heroPage.hero.subtitle')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#automation-flow"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('automation-flow')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {t('heroPage.hero.explorePlatform')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Image Section: Finops SVG İllüstrasyon */}
      <div className="bg-gray-800 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-2xl ring-1 ring-white/10 p-12 max-w-5xl w-full">
              <img 
                src={ceoDashboardImg} 
                alt={t('heroPage.dashboard.alt')}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Powered Automation Flow Section */}
      <div id="automation-flow" className="bg-gray-800 py-16 sm:py-20 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="text-base font-semibold leading-7 text-indigo-400">{t('heroPage.automation.badge')}</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-sky-400 via-purple-400 to-orange-400 text-transparent bg-clip-text">{t('heroPage.automation.title')}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {t('heroPage.automation.description')}
            </p>
          </div>
          <div className="mt-16">
            <FlowAnimation />
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <SolutionsSection />

      {/* Integrations Section */}
      <IntegrationsSection />
    </>
  );
};

export default HeroPage;
