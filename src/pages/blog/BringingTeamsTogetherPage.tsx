import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import businessAnalyticsImg from '../../assets/illustrations/undraw/undraw_business-analytics_y8m6-finops.svg';

const BringingTeamsTogetherPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:mx-0">
            <Link to="/blog" className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors mb-8">
                <ArrowLeft className="h-4 w-4" />
                {t('blogDetail.backToBlog')}
            </Link>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{t('blogDetail.bringingTeams.title')}</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('blogDetail.bringingTeams.intro')}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-3xl lg:max-w-7xl grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
             <div className="flex items-center justify-center">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
                  <img 
                      src={businessAnalyticsImg}
                      alt={t('blogDetail.bringingTeams.imageAlt')}
                      className="w-full h-auto max-h-[400px] object-contain"
                  />
                </div>
            </div>
            <div className="space-y-8 text-gray-600 leading-7">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{t('blogDetail.bringingTeams.section1.title')}</h2>
                <p>{t('blogDetail.bringingTeams.section1.content')}</p>
                
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{t('blogDetail.bringingTeams.section2.title')}</h2>
                <p>{t('blogDetail.bringingTeams.section2.content')}</p>
                
                <p className="font-semibold text-gray-800">{t('blogDetail.bringingTeams.conclusion')}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BringingTeamsTogetherPage;
