import { CheckCircle, Users, PieChart, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import performanceImg from '../../assets/illustrations/undraw/undraw_performance-overview_1b4y-finops.svg';
import certificateImg from '../../assets/illustrations/undraw/undraw_certificate_cqps-finops.svg';

const getFeatures = (t: any) => [
  {
    name: t('solutionPages.hrPayroll.features.autoPayroll.name'),
    description: t('solutionPages.hrPayroll.features.autoPayroll.description'),
    icon: Briefcase,
  },
  {
    name: t('solutionPages.hrPayroll.features.performanceEval.name'),
    description: t('solutionPages.hrPayroll.features.performanceEval.description'),
    icon: Users,
  },
  {
    name: t('solutionPages.hrPayroll.features.hrAnalytics.name'),
    description: t('solutionPages.hrPayroll.features.hrAnalytics.description'),
    icon: PieChart,
  },
];

const IKBordoPerformansPage = () => {
  const { t } = useTranslation();
  const features = getFeatures(t);
  return (
    <div className="bg-slate-50">
      {/* Header */}
      <div className="relative isolate pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="text-base font-semibold leading-7 text-cyan-600">{t('solutionPages.hrPayroll.badge')}</h1>
            <p className="mt-2 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-sky-400 sm:text-5xl">
              {t('solutionPages.hrPayroll.title')}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('solutionPages.hrPayroll.subtitle')}
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link to="/signup" className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500">
                {t('solutionPages.hrPayroll.startAnalysis')}
              </Link>
              <Link to="/contact" className="text-sm font-semibold leading-6 text-gray-900">
                {t('solutionPages.hrPayroll.talkToExpert')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-2xl shadow-xl p-8 flex items-center justify-center">
              <img src={performanceImg} alt="İK ve Performans Yönetimi" className="w-full h-auto max-w-lg"/>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('solutionPages.hrPayroll.featuresTitle')}</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    {t('solutionPages.hrPayroll.featuresSubtitle')}
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.name} className="flex flex-col p-8 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-200">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                <feature.icon className="h-5 w-5 flex-none text-cyan-600" aria-hidden="true" />
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
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">{t('solutionPages.hrPayroll.whoIsItFor.title')}</h2>
                        <p className="mt-6 text-lg text-gray-600">
                           {t('solutionPages.hrPayroll.whoIsItFor.subtitle')}
                        </p>
                        <ul className="mt-8 space-y-4 text-gray-600">
                            <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>{t('solutionPages.hrPayroll.whoIsItFor.role1.title')}:</strong> {t('solutionPages.hrPayroll.whoIsItFor.role1.description')}</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>{t('solutionPages.hrPayroll.whoIsItFor.role2.title')}:</strong> {t('solutionPages.hrPayroll.whoIsItFor.role2.description')}</span>
                            </li>
                             <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>{t('solutionPages.hrPayroll.whoIsItFor.role3.title')}:</strong> {t('solutionPages.hrPayroll.whoIsItFor.role3.description')}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl shadow-xl p-8 flex items-center justify-center">
                  <img src={certificateImg} alt={t('solutionPages.hrPayroll.whoIsItFor.imageAlt')} className="w-full h-auto"/>
                </div>
            </div>
        </div>
    </div>

    </div>
  );
};

export default IKBordoPerformansPage;
