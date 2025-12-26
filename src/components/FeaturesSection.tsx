import React from 'react';
import { BarChart, FileText, Activity, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation('features');

  const features = [
    {
      name: t('features.naturalLanguageQuery.name'),
      description: t('features.naturalLanguageQuery.description'),
      icon: MessageSquare,
    },
    {
      name: t('features.automatedReporting.name'),
      description: t('features.automatedReporting.description'),
      icon: FileText,
    },
    {
      name: t('features.scenarioAnalysis.name'),
      description: t('features.scenarioAnalysis.description'),
      icon: Activity,
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            <BarChart className="inline-block h-6 w-6 mr-2" />
            {t('title')}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('subtitle')}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('description')}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
