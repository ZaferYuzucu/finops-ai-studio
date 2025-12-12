import { CheckCircle, ArrowRight, Package, TrendingDown, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    name: 'Stok Devir Hızı Optimizasyonu',
    description: 'Hangi ürünlerin hızlı, hangilerinin yavaş hareket ettiğini analiz edin. Atıl stok maliyetini düşürün ve sermayenizi doğru envantere bağlayın.',
    icon: Package,
  },
  {
    name: 'Satılan Malın Maliyeti (COGS) Analizi',
    description: 'Üretim, depolama ve lojistik maliyetlerinizi ürün bazında detaylı olarak analiz ederek net kâr marjınızı doğru bir şekilde hesaplayın.',
    icon: TrendingDown,
  },
  {
    name: 'Tedarik Zinciri Verimliliği',
    description: 'Tedarikçi performansını, teslimat sürelerini ve satın alma maliyetlerini izleyerek tedarik zincirinizdeki verimsizlikleri ve darboğazları ortadan kaldırın.',
    icon: Factory,
  },
];

const MaliyetVeStokYonetimiPage = () => {
  return (
    <div className="bg-slate-50">
      {/* Header */}
      <div className="relative isolate pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="text-base font-semibold leading-7 text-green-600">Çözüm Detayı</h1>
            <p className="mt-2 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-400 sm:text-5xl">
              Maliyet ve Stok Yönetimi
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Envanterinizi kâra dönüştürün. Stok maliyetlerinizi minimize ederken, müşteri talebini her zaman karşılayabilecek optimum envanter seviyelerini koruyun.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link to="/signup" className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500">
                Stok Analizi Başlat
              </Link>
              <Link to="/contact" className="text-sm font-semibold leading-6 text-gray-900">
                Operasyon Danışmanlığı <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <img src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Depoda çalışanlar ve envanter yönetimi" className="rounded-2xl shadow-xl w-full"/>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Envanter Kontrolünün Temel Taşları</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Stok fazlasından veya eksiğinden kaynaklanan kayıpları önlemek için tasarlanmış entegre çözümlerimizle tanışın.
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
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Bu Çözüm Kimler İçin Stratejik?</h2>
                        <p className="mt-6 text-lg text-gray-600">
                           Maliyet ve Stok Yönetimi çözümümüz, operasyonel verimliliği ve finansal sağlığı doğrudan etkileyen roller için kritik öneme sahiptir.
                        </p>
                        <ul className="mt-8 space-y-4 text-gray-600">
                            <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>Satın Alma ve Tedarik Zinciri Yöneticileri:</strong> Tedarikçi performansını optimize edin, doğru zamanda doğru miktarda sipariş verin ve taşıma maliyetlerini düşürün.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>Finans Kontrolörleri ve Analistleri:</strong> Envanter değerlemesini ve COGS hesaplamalarını otomatikleştirin, finansal raporlamanın doğruluğunu artırın.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>Operasyon Direktörleri:</strong> Depo verimliliğini, sipariş karşılama oranlarını ve genel operasyonel performansı en üst düzeye çıkarın.</span>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* GÖRSEL GÜNCELLENDİ (YENİ VE ÇALIŞAN) */}
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" alt="Operasyonel verimlilik ve ekip çalışması" className="rounded-xl shadow-xl w-full"/>
            </div>
        </div>
    </div>

    </div>
  );
};

export default MaliyetVeStokYonetimiPage;
