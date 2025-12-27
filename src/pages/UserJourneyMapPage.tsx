
import React from 'react';
import { FileDown } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { useTranslation } from 'react-i18next';

// Bu bileşen, PDF'e dönüştürülecek olan ana içeriktir.
const RoadmapContent = () => {
  const { t } = useTranslation();
  
  return (
  <div id="user-journey-map-content" className="bg-white p-8 sm:p-12 shadow-lg rounded-2xl border border-gray-200">
    
    <div className="text-center mb-12">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{t('userJourneyMap.title')}</h1>
      <p className="mt-4 text-xl text-gray-600">{t('userJourneyMap.subtitle')}</p>
    </div>

    <div className="space-y-16">
      {/* FAZ 1: Keşif ve Karar */}
      <Phase
        phaseNumber="1"
        title={t('userJourneyMap.phases.phase1.title')}
        description={t('userJourneyMap.phases.phase1.description')}
        steps={[
          { title: t('userJourneyMap.phases.phase1.steps.step1.title'), description: t('userJourneyMap.phases.phase1.steps.step1.description') },
          { title: t('userJourneyMap.phases.phase1.steps.step2.title'), description: t('userJourneyMap.phases.phase1.steps.step2.description') },
          { title: t('userJourneyMap.phases.phase1.steps.step3.title'), description: t('userJourneyMap.phases.phase1.steps.step3.description') },
          { title: t('userJourneyMap.phases.phase1.steps.step4.title'), description: t('userJourneyMap.phases.phase1.steps.step4.description') }
        ]}
      />

      {/* FAZ 2: Kayıt ve Kimlik Doğrulama */}
      <Phase
        phaseNumber="2"
        title={t('userJourneyMap.phases.phase2.title')}
        description={t('userJourneyMap.phases.phase2.description')}
        steps={[
          { title: t('userJourneyMap.phases.phase2.steps.step1.title'), description: t('userJourneyMap.phases.phase2.steps.step1.description') },
          { title: t('userJourneyMap.phases.phase2.steps.step2.title'), description: t('userJourneyMap.phases.phase2.steps.step2.description') },
          { title: t('userJourneyMap.phases.phase2.steps.step3.title'), description: t('userJourneyMap.phases.phase2.steps.step3.description') },
          { title: t('userJourneyMap.phases.phase2.steps.step4.title'), description: t('userJourneyMap.phases.phase2.steps.step4.description') }
        ]}
      />

      {/* FAZ 3: Plan Seçimi ve Ödeme */}
      <Phase
        phaseNumber="3"
        title={t('userJourneyMap.phases.phase3.title')}
        description={t('userJourneyMap.phases.phase3.description')}
        steps={[
          { title: t('userJourneyMap.phases.phase3.steps.step1.title'), description: t('userJourneyMap.phases.phase3.steps.step1.description') },
          { title: t('userJourneyMap.phases.phase3.steps.step2.title'), description: t('userJourneyMap.phases.phase3.steps.step2.description') },
          { title: t('userJourneyMap.phases.phase3.steps.step3.title'), description: t('userJourneyMap.phases.phase3.steps.step3.description') },
          { title: t('userJourneyMap.phases.phase3.steps.step4.title'), description: t('userJourneyMap.phases.phase3.steps.step4.description') }
        ]}
      />

      {/* FAZ 4: Aktivasyon ve Entegrasyon */}
      <Phase
        phaseNumber="4"
        title={t('userJourneyMap.phases.phase4.title')}
        description={t('userJourneyMap.phases.phase4.description')}
        steps={[
          { title: t('userJourneyMap.phases.phase4.steps.step1.title'), description: t('userJourneyMap.phases.phase4.steps.step1.description') },
          { title: t('userJourneyMap.phases.phase4.steps.step2.title'), description: t('userJourneyMap.phases.phase4.steps.step2.description') },
          { title: t('userJourneyMap.phases.phase4.steps.step3.title'), description: t('userJourneyMap.phases.phase4.steps.step3.description') },
          { title: t('userJourneyMap.phases.phase4.steps.step4.title'), description: t('userJourneyMap.phases.phase4.steps.step4.description') }
        ]}
      />

        {/* FAZ 5: Değer Üretimi ve Genişleme */}
      <Phase
        phaseNumber="5"
        title={t('userJourneyMap.phases.phase5.title')}
        description={t('userJourneyMap.phases.phase5.description')}
        steps={[
          { title: t('userJourneyMap.phases.phase5.steps.step1.title'), description: t('userJourneyMap.phases.phase5.steps.step1.description') },
          { title: t('userJourneyMap.phases.phase5.steps.step2.title'), description: t('userJourneyMap.phases.phase5.steps.step2.description') },
          { title: t('userJourneyMap.phases.phase5.steps.step3.title'), description: t('userJourneyMap.phases.phase5.steps.step3.description') },
          { title: t('userJourneyMap.phases.phase5.steps.step4.title'), description: t('userJourneyMap.phases.phase5.steps.step4.description') }
        ]}
      />
    </div>
  </div>
);
};

// Faz Bileşeni
const Phase: React.FC<{ phaseNumber: string; title: string; description: string; steps: { title: string; description: string }[] }> = ({ phaseNumber, title, description, steps }) => (
  <section className="relative">
    {/* Dikey Çizgi */}
    <div className="absolute left-4 sm:left-6 top-6 h-full border-l-2 border-dashed border-gray-300"></div>
    
    <div className="relative pl-12 sm:pl-16">
      <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 bg-blue-600 text-white font-bold text-lg rounded-full ring-8 ring-white">
        {phaseNumber}
      </div>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <p className="mt-2 text-lg text-gray-500">{description}</p>
      
      <div className="mt-8 space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
             <div className="absolute left-[-42px] sm:left-[-58px] top-2.5 h-0.5 w-6 bg-gray-300"></div>
            <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
            <p className="mt-1 text-base text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);


const UserJourneyMapPage: React.FC = () => {
  const { t } = useTranslation();
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <PageLayout title={t('userJourneyMap.pageTitle')}>
        <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-8">
            <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            >
            <FileDown size={18} />
            {t('userJourneyMap.downloadButton')}
            </button>
        </div>

        <RoadmapContent />
        </div>
    </PageLayout>
  );
};

export default UserJourneyMapPage;
