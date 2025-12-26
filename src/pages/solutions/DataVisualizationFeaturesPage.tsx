import { BarChart, Database, Zap, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import dragDropImg from '../../assets/illustrations/undraw/undraw_database-tables_yft5-finops.svg';
import dataModelImg from '../../assets/illustrations/undraw/visual-data-pana-finops.svg';

const getFeatures = (t: any) => [
  {
    name: t('features.features.connectDataSources.name'),
    description: t('features.features.connectDataSources.description'),
    icon: Database,
  },
  {
    name: t('features.features.aiDataTransformation.name'),
    description: t('features.features.aiDataTransformation.description'),
    icon: Zap,
  },
  {
    name: t('features.features.visualDataModeling.name'),
    description: t('features.features.visualDataModeling.description'),
    icon: BarChart,
  },
  {
    name: t('features.features.readyTemplates.name'),
    description: t('features.features.readyTemplates.description'),
    icon: Settings,
  },
];

const DataVisualizationFeaturesPage = () => {
  const { t } = useTranslation();
  const features = getFeatures(t);
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden opacity-20">
            <img src={dragDropImg} alt="" className="h-full w-full object-cover object-center"/>
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-70" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center lg:px-0">
            <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">{t('features.hero.title')}</h1>
            <p className="mt-4 text-xl text-white">{t('features.hero.subtitle')}</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="text-base font-semibold leading-7 text-indigo-600">{t('features.section1.badge')}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('features.section1.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('features.section1.subtitle')}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
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

      {/* Image-Text Section 1 */}
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className="lg:pr-8 lg:pt-4">
                    <div className="lg:max-w-lg">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">{t('features.section2.badge')}</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('features.section2.title')}</p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        {t('features.section2.subtitle')}
                    </p>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-xl ring-1 ring-gray-400/10 p-8 flex items-center justify-center">
                  <img
                      src={dataModelImg}
                      alt="Ürün ekran görüntüsü"
                      className="w-full h-auto max-w-2xl"
                  />
                </div>
                </div>
            </div>
        </div>

    </div>
  );
};

export default DataVisualizationFeaturesPage;
