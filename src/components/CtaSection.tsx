import React from 'react';
import { useTranslation } from 'react-i18next';

const CtaSection = () => {
  const { t } = useTranslation('cta');

  return (
    <div className="bg-indigo-700">
      <div className="mx-auto max-w-7xl py-12 px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-200">
            {t('description')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t('buttonText')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
