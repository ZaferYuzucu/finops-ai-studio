import React from 'react';
import { Building, Target, Eye } from "lucide-react";
import { useTranslation } from 'react-i18next';

// Prop tipleri tanımlandı
interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
    {children}
  </h2>
);

interface SectionParagraphProps {
  children: React.ReactNode;
}

const SectionParagraph: React.FC<SectionParagraphProps> = ({ children }) => (
  <p className="mt-4 text-lg leading-8 text-gray-600">
    {children}
  </p>
);

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="relative pl-16">
    <dt className="text-base font-semibold leading-7 text-gray-900">
      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
        {icon}
      </div>
      {title}
    </dt>
    <dd className="mt-2 text-base leading-7 text-gray-600">{description}</dd>
  </div>
);

export default function AboutPage() {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">{t('about.badge')}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('about.title')}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <Feature
              icon={<Building className="h-6 w-6 text-white" />}
              title={t('about.mission.title')}
              description={t('about.mission.description')}
            />
            <Feature
              icon={<Target className="h-6 w-6 text-white" />}
              title={t('about.vision.title')}
              description={t('about.vision.description')}
            />
            <Feature
              icon={<Eye className="h-6 w-6 text-white" />}
              title={t('about.philosophy.title')}
              description={t('about.philosophy.description')}
            />
          </dl>
        </div>
      </div>
    </div>
  );
}
