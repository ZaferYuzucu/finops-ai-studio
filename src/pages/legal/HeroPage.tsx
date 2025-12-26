import React from 'react';
import FlowAnimation from '../components/FlowAnimation';
import SolutionsSection from '../components/SolutionsSection';
import IntegrationsSection from '../components/IntegrationsSection';

const HeroPage = () => {
  return (
    <>
      {/* Hero Section: Text content with a rich, dark background */}
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {/* Fluorescent gradient for the title */}
            <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-sky-400 to-amber-400 text-transparent bg-clip-text">
              Dağınık Veriden Net Kâra: Finansal Geleceğinizi Şekillendirin
            </h1>
            {/* Brighter paragraph text */}
            <p className="mt-6 text-lg leading-8 text-gray-200">
              FINOPS AI Studio, işletmenizin finansal verilerini anlamlı içgörülere dönüştürerek kârlılığınızı artırmanıza ve geleceğe yönelik sağlam kararlar almanıza yardımcı olur.
            </p>
            {/* "Demo Talep Et" link removed, leaving only the primary call to action */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Platformu Keşfet
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Image Section: Separate background with hover effect on the image */}
      <div className="bg-gray-800 pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <img
              src="/public/hero-dashboard-mockup.png" // CORRECTED PATH
              alt="App screenshot"
              width={2432}
              height={1442}
              className="w-full rounded-md bg-white/5 shadow-xl ring-1 ring-white/10 transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* AI Powered Automation Flow Section */}
      <div className="bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="text-base font-semibold leading-7 text-indigo-400">Verimliliği Artırın</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-sky-400 via-purple-400 to-orange-400 text-transparent bg-clip-text">Yapay Zeka Destekli Otomasyon Akışı</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Platformumuzun, karmaşık görevleri nasıl saniyeler içinde basitleştirdiğini keşfedin. Doğal dil komutlarınız, gelişmiş yapay zeka modellerimiz tarafından anında analiz edilir, işlenir ve size özel çözümlere dönüştürülür.
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
