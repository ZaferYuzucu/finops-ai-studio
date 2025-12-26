import { CheckCircle, ArrowRight, Package, TrendingDown, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logisticsImg from '../../assets/illustrations/undraw/undraw_logistics_8vri-finops.svg';
import inflationImg from '../../assets/illustrations/undraw/undraw_inflation_ht0o-finops.svg';

const getFeatures = (t: any) => [
  {
    name: t('solutionPages.costInventory.features.inventoryTurnover.name'),
    description: t('solutionPages.costInventory.features.inventoryTurnover.description'),
    icon: Package,
  },
  {
    name: t('solutionPages.costInventory.features.cogsAnalysis.name'),
    description: t('solutionPages.costInventory.features.cogsAnalysis.description'),
    icon: TrendingDown,
  },
  {
    name: t('solutionPages.costInventory.features.supplyChain.name'),
    description: t('solutionPages.costInventory.features.supplyChain.description'),
    icon: Factory,
  },
];

const MaliyetVeStokYonetimiPage = () => {
  const { t } = useTranslation();
  const features = getFeatures(t);
  return (
    <div className="bg-slate-50">
      {/* Header */}
      <div className="relative isolate pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="text-base font-semibold leading-7 text-green-600">{t('solutionPages.costInventory.badge')}</h1>
            <p className="mt-2 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-400 sm:text-5xl">
              {t('solutionPages.costInventory.title')}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('solutionPages.costInventory.subtitle')}
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link to="/signup" className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500">
                {t('solutionPages.costInventory.startAnalysis')}
              </Link>
              <Link to="/contact" className="text-sm font-semibold leading-6 text-gray-900">
                {t('solutionPages.costInventory.talkToExpert')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-xl p-8 flex items-center justify-center">
              <img src={logisticsImg} alt={t('solutionPages.costInventory.imageAlt')} className="w-full h-auto max-w-lg"/>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('solutionPages.costInventory.featuresTitle')}</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    {t('solutionPages.costInventory.featuresSubtitle')}
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.name} className="flex flex-col p-8 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-200">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                <feature.icon className="h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                                {feature.name}
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                <p className="flex-auto">{feature.description}</p>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    </div>

    {/* Who is it for? Section */}
    <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className="lg:pr-4">
                    <div className="lg:max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">{t('solutionPages.costInventory.whoIsItFor.title')}</h2>
                        <p className="mt-6 text-lg text-gray-600">
                           {t('solutionPages.costInventory.whoIsItFor.subtitle')}
                        </p>
                        <ul className="mt-8 space-y-4 text-gray-600">
                            <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>{t('solutionPages.costInventory.whoIsItFor.role1.title')}:</strong> {t('solutionPages.costInventory.whoIsItFor.role1.description')}</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>{t('solutionPages.costInventory.whoIsItFor.role2.title')}:</strong> {t('solutionPages.costInventory.whoIsItFor.role2.description')}</span>
                            </li>
                             <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>{t('solutionPages.costInventory.whoIsItFor.role3.title')}:</strong> {t('solutionPages.costInventory.whoIsItFor.role3.description')}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-xl p-8 flex items-center justify-center">
                  <img src={inflationImg} alt={t('solutionPages.costInventory.whoIsItFor.imageAlt')} className="w-full h-auto"/>
                </div>
            </div>
        </div>
    </div>

    </div>
  );
};

export default MaliyetVeStokYonetimiPage;
