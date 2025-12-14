import { CheckCircle, Zap, TrendingUp, Filter, Users, ShoppingCart, BarChart, PieChart, LineChart, Map, Globe, DollarSign, Briefcase, FileText, Heart, Shield } from 'lucide-react';

const dashboardExamples = [
  { title: 'Sales Performance Dashboard', sector: 'E-Ticaret', icon: ShoppingCart },
  { title: 'Financial Health Overview', sector: 'Finans', icon: DollarSign },
  { title: 'Marketing Campaign Analysis', sector: 'Pazarlama', icon: BarChart },
  { title: 'Supply Chain & Logistics', sector: 'Lojistik', icon: Map },
  { title: 'Human Resources Analytics', sector: 'İK', icon: Users },
  { title: 'Website Traffic & SEO Dashboard', sector: 'Teknoloji', icon: Globe },
  { title: 'Healthcare Patient Management', sector: 'Sağlık', icon: Heart },
  { title: 'Manufacturing Operations', sector: 'Üretim', icon: Zap },
  { title: 'Real Estate Market Trends', sector: 'Emlak', icon: Briefcase },
  { title: 'Social Media Engagement', sector: 'Medya', icon: PieChart },
  { title: 'Customer Support Tickets', sector: 'Hizmet', icon: Shield },
  { title: 'Project Management Overview', sector: 'Proje Yönetimi', icon: FileText },
  { title: 'Investment Portfolio Tracker', sector: 'Finans', icon: TrendingUp },
  { title: 'E-commerce Funnel Analysis', sector: 'E-Ticaret', icon: Filter },
  { title: 'SaaS Subscription Analytics', sector: 'Teknoloji', icon: LineChart },
];

export default function DashboardsPage() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Dashboard Galerisi</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Veriye Dayalı Kararlar Alın
          </p>
          <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
            Gerçek ekipler tarafından kullanılan gösterge tablosu örneklerini keşfedin ve işletmeniz için KPI takibi oluşturun.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {dashboardExamples.map((example) => {
            const Icon = example.icon;
            return (
              <div key={example.title} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-full">{example.sector}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-gray-800 tracking-tight">{example.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">Sektöre özel metrikler ve görselleştirmelerle performansı izleyin.</p>
                </div>
                <div className="px-6 pb-4">
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Örneği Görselleştir &rarr;</a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
           <h3 className="text-2xl font-bold text-gray-900 mb-4">Kendi Dashboard'unuzu Oluşturmaya Hazır mısınız?</h3>
           <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Finops AI ile verilerinizi birleştirin, görselleştirin ve saniyeler içinde eyleme geçirilebilir içgörüler elde edin.</p>
           <a href="/contact" className="rounded-md bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105">Demo Talep Edin</a>
        </div>

      </div>
    </div>
  );
}
