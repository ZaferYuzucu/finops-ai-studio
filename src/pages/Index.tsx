
import { ArrowRight, CheckCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const getFeatures = (t: any) => [
    { 
        title: t('index.features.financialReporting.title'),
        description: t('index.features.financialReporting.description'),
        icon: TrendingUp
    },
    { 
        title: t('index.features.costProfitabilityAnalysis.title'),
        description: t('index.features.costProfitabilityAnalysis.description'),
        icon: CheckCircle
    },
    { 
        title: t('index.features.budgetScenarioPlanning.title'),
        description: t('index.features.budgetScenarioPlanning.description'),
        icon: TrendingUp
    }
];

export default function Index() {
    const { t } = useTranslation();
    const features = getFeatures(t);
    return (
        <main className="animate-fade-in">
            {/* Hero Section - PageSection yerine div kullanıldı */}
            <div className="relative bg-grid-slate-100/[45%] py-20 md:py-32">
                <div className="container max-w-4xl text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900">
                        {t('index.hero.title')}
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                        {t('index.hero.subtitle')}
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Link to="/signup" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                            {t('index.hero.getStarted')} <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link to="/solutions/dashboard-examples" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
                            {t('index.hero.dashboardExamples')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section - PageSection yerine div kullanıldı */}
            <div className="py-16 md:py-24">
                <div className="container max-w-5xl text-center">
                    <p className="text-blue-600 font-semibold">{t('index.featuresSection.badge')}</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                        {t('index.featuresSection.title')}
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                        {t('index.featuresSection.subtitle')}
                    </p>

                    <div className="mt-12 rounded-2xl border-dashed border-2 border-slate-300 bg-slate-50 p-8 text-slate-400">
                       [DashboardPreview Bileşeni]
                    </div>

                     <div className="grid md:grid-cols-3 gap-8 mt-16">
                        {features.map((feature) => (
                            <div key={feature.title} className="text-left p-6 rounded-lg border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-slate-900">{feature.title}</h3>
                                <p className="mt-1 text-slate-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </main>
    );
}
