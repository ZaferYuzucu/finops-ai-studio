import { CheckCircle, ArrowRight, BarChart, TrendingUp, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    name: 'Kârlılık Analizi',
    description: 'Ürün, hizmet veya müşteri segmenti bazında kârlılık oranlarınızı net bir şekilde görün. Hangi alanların büyümeyi desteklediğini, hangilerinin kaynak tükettiğini belirleyin.',
    icon: TrendingUp,
  },
  {
    name: 'Gider Yönetimi ve Optimizasyonu',
    description: 'Tüm gider kalemlerinizi kategorize edin, beklenmedik artışları anında tespit edin ve yapay zeka destekli tasarruf önerileriyle maliyetlerinizi düşürün.',
    icon: Filter,
  },
  {
    name: 'Anahtar Performans Göstergeleri (KPI) Takibi',
    description: 'EBITDA, Net Kâr Marjı, Müşteri Edinme Maliyeti (CAC) gibi kritik finansal KPI\'ları anlık ve dinamik panellerde takip edin.',
    icon: BarChart,
  },
];

const FinansalVeriAnaliziPage = () => {
  return (
    <div className="bg-slate-50">
      {/* Header */}
      <div className="relative isolate pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="text-base font-semibold leading-7 text-blue-600">Çözüm Detayı</h1>
            <p className="mt-2 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 sm:text-5xl">
              Finansal Veri Analizi
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Ham finansal verilerinizi, stratejik kararlar almanızı sağlayan anlamlı ve eyleme geçirilebilir içgörülere dönüştürün. Finops AI ile şirketinizin finansal nabzını anlık olarak tutun.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link to="/signup" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                Analizi Başlat
              </Link>
              <Link to="/contact" className="text-sm font-semibold leading-6 text-gray-900">
                Uzmanla Konuş <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="Finansal Veri Analizi Paneli" className="rounded-2xl shadow-xl w-full"/>
          </div>
        </div>
      </div>

      {/* Features Section */}
       <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Veri Analizinin Temel Taşları</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Platformumuz, finansal verilerinizin her bir katmanını aydınlatmak için tasarlanmış güçlü yetenekler sunar.
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.name} className="flex flex-col p-8 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-200">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                <feature.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
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
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Bu Çözüm Kimler İçin İdeal?</h2>
                        <p className="mt-6 text-lg text-gray-600">
                            Finansal Veri Analizi çözümümüz, organizasyonun farklı seviyelerindeki kilit rollerin daha akıllı ve daha hızlı kararlar almasını sağlar.
                        </p>
                        <ul className="mt-8 space-y-4 text-gray-600">
                            <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>Finans Yöneticileri (CFO, VP of Finance):</strong> Stratejik planlama, bütçeleme ve yatırımcı ilişkileri için gereken derinlemesine içgörülere sahip olun.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>CEO ve Yönetim Kurulu:</strong> Şirketin genel finansal performansını ve sağlığını tek bir bakışta görün, veriye dayalı liderlik yapın.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>Operasyon ve Departman Liderleri:</strong> Kendi birimlerinin finansal etkisini anlayın ve bütçe hedeflerine ulaşmak için verimliliği artırın.</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="Ekip çalışması" className="rounded-xl shadow-xl w-full"/>
            </div>
        </div>
    </div>

    </div>
  );
};

export default FinansalVeriAnaliziPage;
