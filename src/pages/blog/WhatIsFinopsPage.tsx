import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import financialDataImg from '../../assets/illustrations/undraw/undraw_financial-data_lbci-finops.svg';

const WhatIsFinopsPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:mx-0">
            <Link to="/blog" className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors mb-8">
                <ArrowLeft className="h-4 w-4" />
                {t('blogDetail.backToBlog')}
            </Link>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{t('blogDetail.whatIsFinops.title')}</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('blogDetail.whatIsFinops.intro')}
          </p>
          
          {/* Domain Vurgusu */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 via-teal-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌐</span>
              </div>
              <div>
                <a 
                  href="https://www.finops.ist" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  www.finops.ist
                </a>
                <p className="text-sm text-gray-600 mt-1">Finansal Operasyonların Dijital Merkezi</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t('blogDetail.whatIsFinops.domainStatement')}
            </p>
          </div>
        </div>
        
        {/* Featured Illustration */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 lg:p-12">
            <img 
              src={financialDataImg} 
              alt="Finansal Veri Analizi İllüstrasyonu" 
              className="w-full h-auto max-h-[400px] object-contain"
            />
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-3xl lg:max-w-7xl grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
            <div className="space-y-8 text-gray-600 leading-7">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{t('blogDetail.whatIsFinops.step1.title')}</h2>
                <p>{t('blogDetail.whatIsFinops.step1.content')}</p>
                
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{t('blogDetail.whatIsFinops.step2.title')}</h2>
                <p>{t('blogDetail.whatIsFinops.step2.content')}</p>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{t('blogDetail.whatIsFinops.step3.title')}</h2>
                <p>{t('blogDetail.whatIsFinops.step3.content')}</p>
                 <p className="font-semibold text-gray-800">{t('blogDetail.whatIsFinops.conclusion')}</p>
            </div>
            <div className="flex items-center justify-center">
                <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e28f81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt={t('blogDetail.whatIsFinops.imageAlt')}
                    className="rounded-2xl shadow-xl w-full h-auto object-cover"
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIsFinopsPage;
