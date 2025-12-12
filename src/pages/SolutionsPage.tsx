import { ArrowRight, PieChart, Warehouse, ArrowLeftRight, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const solutions = [
  {
    name: 'Finansal Veri Analizi',
    description: 'Şirketinizin finansal sağlığını derinlemesine analiz edin, kârlılık oranlarını, gelir-gider dengesini ve nakit akışını anlık olarak izleyin.',
    icon: PieChart,
    href: '/solutions/financial-data-analysis',
    bgColor: 'bg-blue-500',
  },
  {
    name: 'Maliyet ve Stok Yönetimi',
    description: 'Stok devir hızından satılan malın maliyetine kadar tüm envanter süreçlerinizi optimize edin, maliyet kaçaklarını önleyin ve kârlılığınızı artırın.',
    icon: Warehouse,
    href: '/solutions/cost-inventory-management',
    bgColor: 'bg-green-500',
  },
  {
    name: 'Nakit Akışı - Cash Flow',
    description: 'Tahsilat ve ödeme döngülerinizi yönetin, gelecekteki nakit pozisyonunuzu tahminleyin ve işletmenizin finansal dayanıklılığını güvence altına alın.',
    icon: ArrowLeftRight,
    href: '/solutions/cash-flow',
    bgColor: 'bg-yellow-500',
  },
  {
    name: 'Bütçe ve Planlama',
    description: 'Departman veya proje bazında dinamik bütçeler oluşturun, gerçekleşen harcamalarla karşılaştırın ve stratejik hedeflerinize ulaşmak için proaktif planlama yapın.',
    icon: Target,
    href: '/solutions/budget-planning',
    bgColor: 'bg-purple-500',
  },
  {
    name: 'İK - Bordro / Performans',
    description: 'Personel maliyetlerini, maaş dağılımını ve performans metriklerini tek bir yerden yönetin. İnsan kaynakları verilerinizi finansal stratejinizle birleştirin.',
    icon: Users,
    href: '/solutions/hr-payroll-performance',
    bgColor: 'bg-red-500',
  },
];

const SolutionsPage = () => {
  return (
    <div className="bg-slate-50">
      {/* Header */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-base font-semibold leading-7 text-blue-600">Finansal Zeka Çözümleri</h1>
            <p className="mt-2 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600 sm:text-6xl">
              İşletmeniz İçin Stratejik Avantajlar
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Finops AI, finansal operasyonlarınızı otomatize etmek, maliyetleri optimize etmek ve veriye dayalı kararlar almanızı sağlamak için tasarlanmış 5 temel çözüm sunar.
            </p>
          </div>
        </div>
      </div>

      {/* Solutions Cards */}
      <div className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <div key={solution.name} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200 flex flex-col">
                <div className="flex-shrink-0">
                   <div className={`inline-flex items-center justify-center h-12 w-12 rounded-lg text-white ${solution.bgColor}`}>
                        <solution.icon className="h-6 w-6" />
                    </div>
                </div>
                <div className="flex-grow mt-6">
                    <h3 className="text-xl font-bold text-gray-900">{solution.name}</h3>
                    <p className="mt-4 text-gray-600">{solution.description}</p>
                </div>
                <div className="mt-6">
                    <Link to={solution.href} className="font-semibold text-blue-600 hover:text-blue-500 flex items-center">
                        Detayları İncele <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;
