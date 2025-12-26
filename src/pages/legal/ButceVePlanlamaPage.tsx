import { CheckCircle, ArrowRight, ClipboardList, GitCompareArrows, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    name: 'Dinamik Bütçeleme',
    description: 'Departman, proje veya lokasyon bazında esnek bütçeler oluşturun. Statik e-tablolar yerine, tüm paydaşların katılabildiği canlı bir planlama ortamı yaratın.',
    icon: ClipboardList,
  },
  {
    name: 'Gerçekleşen vs. Bütçe Analizi',
    description: 'Bütçelenen rakamlarla gerçekleşen harcamaları anlık olarak karşılaştırın. Sapmaları anında tespit edin ve nedenlerini kök analiz ile anlayın.',
    icon: GitCompareArrows,
  },
  {
    name: 'Tahmine Dayalı Planlama (Forecasting)',
    description: 'Yapay zeka motorumuzu kullanarak yıl sonu finansal hedeflerinize ulaşıp ulaşamayacağınızı tahminleyin. Proaktif olarak revizyonlar yapın.',
    icon: BrainCircuit,
  },
];

const ButceVePlanlamaPage = () => {
  return (
    <div className="bg-slate-50">
      {/* Header */}
      <div className="relative isolate pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="text-base font-semibold leading-7 text-purple-600">Çözüm Detayı</h1>
            <p className="mt-2 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-400 sm:text-5xl">
              Bütçe ve Planlama
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Statik e-tablolardan kurtulun. Finops AI ile tüm organizasyonunuzun katıldığı, dinamik, akıllı ve iş birliğine dayalı bir bütçe ve planlama sürecine geçin.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link to="/signup" className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500">
                Planlamaya Başlayın
              </Link>
              <Link to="/contact" className="text-sm font-semibold leading-6 text-gray-900">
                Strateji Danışmanlığı <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            {/* GÖRSEL GÜNCELLENDİ (YENİ VE ÇALIŞAN) */}
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e28f81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Bütçe ve Planlama Dashboard Paneli" className="rounded-2xl shadow-xl w-full"/>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Stratejik Planlamanın Yapı Taşları</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Hedeflerinize ulaşmanızı sağlayan, veriye dayalı ve esnek bir planlama altyapısı sunuyoruz.
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.name} className="flex flex-col p-8 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-200">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                <feature.icon className="h-5 w-5 flex-none text-purple-600" aria-hidden="true" />
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
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Bu Çözüm Kimlerin İşini Kolaylaştırır?</h2>
                        <p className="mt-6 text-lg text-gray-600">
                           Bütçe ve Planlama çözümümüz, finansal hedeflerin belirlenmesi ve bu hedeflere ulaşılmasından sorumlu ekipler için tasarlanmıştır.
                        </p>
                        <ul className="mt-8 space-y-4 text-gray-600">
                            <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>Finansal Planlama ve Analiz (FP&A) Ekipleri:</strong> Manuel veri toplama ve birleştirme işlerini ortadan kaldırın, zamanınızı senaryo analizi ve stratejik danışmanlık için kullanın.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>Departman Yöneticileri:</strong> Kendi bütçelerini kolayca oluşturun ve takip edin. Harcama sorumluluğunu ve finansal farkındalığı artırın.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>Üst Yönetim (CEO, CFO):</strong> Şirketin genel bütçe performansını ve hedeflere uygunluğunu tek bir yerden izleyin, stratejik revizyonları hızla yapın.</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="Finans ekibi bütçe toplantısı yapıyor" className="rounded-xl shadow-xl w-full"/>
            </div>
        </div>
    </div>

    </div>
  );
};

export default ButceVePlanlamaPage;
