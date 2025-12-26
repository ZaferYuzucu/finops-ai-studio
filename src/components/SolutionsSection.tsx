import React from 'react';
import { useTranslation } from 'react-i18next';
import DashboardPreview from './DashboardPreview';
// Finops SVG İllüstrasyonları (PNG'ler değiştirildi!)
import cfoKontrolImg from "@/assets/illustrations/undraw/undraw_financial-data_lbci-finops.svg";
import karZararImg from "@/assets/illustrations/undraw/undraw_inflation_ht0o-finops.svg";
import nakitAkisiImg from "@/assets/illustrations/undraw/undraw_finance_m6vw-finops.svg";
import salesKpiImg from "@/assets/illustrations/undraw/undraw_performance-overview_1b4y-finops.svg";
import butceGerceklesenImg from "@/assets/illustrations/undraw/undraw_wallet_diag-finops.svg";

const getSolutions = (t: any) => [
  {
    name: t('solutions.financialDataAnalysis.name'),
    description: t('solutions.financialDataAnalysis.description'),
    imageUrl: cfoKontrolImg,
  },
  {
    name: t('solutions.costInventoryManagement.name'),
    description: t('solutions.costInventoryManagement.description'),
    imageUrl: karZararImg,
  },
  {
    name: t('solutions.cashFlowForecasting.name'),
    description: t('solutions.cashFlowForecasting.description'),
    imageUrl: nakitAkisiImg,
  },
  {
    name: t('solutions.hrPerformanceManagement.name'),
    description: t('solutions.hrPerformanceManagement.description'),
    imageUrl: salesKpiImg,
  },
  {
    name: t('solutions.budgetFinancialPlanning.name'),
    description: t('solutions.budgetFinancialPlanning.description'),
    imageUrl: butceGerceklesenImg,
  },
];

// Her bir çözüm kutusu için modern ve soft renk paleti
const softColorPalette = [
  'bg-sky-50',
  'bg-teal-50',
  'bg-fuchsia-50',
  'bg-orange-50',
  'bg-lime-50',
];

const SolutionsSection = () => {
  const { t } = useTranslation();
  const solutions = getSolutions(t);
  
  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Üst bölüm, metin ve dashboard için iki sütunlu yapıya dönüştürüldü */}
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
          {/* Sol sütun: Başlık ve metin sola yaslandı */}
          <div>
            <h2 className="text-base font-semibold leading-7 text-indigo-600">{t('solutions.title')}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('solutions.subtitle')}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('solutions.description')}
            </p>
          </div>
          {/* Sağ sütun: KPI Dashboard bileşeni eklendi */}
          <div className="mt-10 lg:mt-0">
            <DashboardPreview />
          </div>
        </div>

        {/* Çözüm kutuları bölümü */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="space-y-16">
            {solutions.map((solution, index) => {
              const bgColor = softColorPalette[index % softColorPalette.length];
              
              return (
                <div
                  key={solution.name}
                  className={`${bgColor} p-10 lg:p-16 rounded-3xl flex flex-col-reverse gap-y-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-16 transition-transform duration-300 hover:scale-105`}
                >
                  <div className={index % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-2'}>
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">{solution.name}</h3>
                    <p className="mt-4 text-lg text-gray-700">{solution.description}</p>
                  </div>
                  <div className={index % 2 === 0 ? 'lg:col-start-2 lg:row-start-1' : 'lg:row-start-1'}>
                      <div className="rounded-2xl overflow-hidden shadow-2xl">
                          <img 
                              src={solution.imageUrl} 
                              alt={solution.name} 
                              className="w-full h-full object-cover" 
                          />
                      </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsSection;
