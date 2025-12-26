
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const GetStartedDocPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">{t('getStarted.badge')}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('getStarted.title')}</h1>
        <p className="mt-6 text-xl leading-8">
            {t('getStarted.intro')}
        </p>
        <div className="mt-10 max-w-2xl">
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">{t('getStarted.step1.title')}</h2>
            <p className="mt-6">
                {t('getStarted.step1.content')}
            </p>
            <figure className="mt-10 border-l border-indigo-600 pl-9">
                <blockquote className="font-semibold text-gray-900">
                <p>"{t('getStarted.step1.quote')}"</p>
                </blockquote>
            </figure>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">{t('getStarted.step2.title')}</h2>
            <p className="mt-8">
                {t('getStarted.step2.content')}
            </p>
            <figure className="mt-10">
                <img 
                    className="aspect-video rounded-xl bg-gray-50 object-cover shadow-lg"
                    src="https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={t('getStarted.step2.imageAlt')}
                />
                <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
                    {t('getStarted.step2.caption')}
                </figcaption>
            </figure>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">{t('getStarted.step3.title')}</h2>
            <p className="mt-6">
                {t('getStarted.step3.content')}
            </p>
             <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                    <span>
                    <strong className="font-semibold text-gray-900">{t('getStarted.step3.benefit1.title')}:</strong> {t('getStarted.step3.benefit1.description')}
                    </span>
                </li>
                <li className="flex gap-x-3">
                    <span>
                    <strong className="font-semibold text-gray-900">{t('getStarted.step3.benefit2.title')}:</strong> {t('getStarted.step3.benefit2.description')}
                    </span>
                </li>
                 <li className="flex gap-x-3">
                    <span>
                    <strong className="font-semibold text-gray-900">{t('getStarted.step3.benefit3.title')}:</strong> {t('getStarted.step3.benefit3.description')}
                    </span>
                </li>
            </ul>
            <p className="mt-8">
                {t('getStarted.conclusion')} <Link to="/solutions/dashboard-examples" className="text-indigo-600 font-semibold hover:text-indigo-500">{t('getStarted.dashboardLink')}</Link> {t('getStarted.conclusionEnd')}
            </p>
        </div>
      </div>
    </div>
  );
};

export default GetStartedDocPage;
