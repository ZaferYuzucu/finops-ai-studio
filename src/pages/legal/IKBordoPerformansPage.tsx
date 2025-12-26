import { CheckCircle, Users, PieChart, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    name: 'Otomatik Bordrolama ve Maaş Hesaplama',
    description: 'Tüm yasal kesintileri, primleri, avansları ve yan hakları otomatik olarak hesaplayarak bordro sürecini hatasız ve hızlı hale getirin.',
    icon: Briefcase,
  },
  {
    name: 'Performans Değerlendirme ve Geri Bildirim',
    description: 'Çalışan hedeflerini, yetkinliklerini ve performans metriklerini tek bir yerden takip edin. 360 derece geri bildirim süreçleri oluşturun.',
    icon: Users,
  },
  {
    name: 'İnsan Kaynakları Analitiği',
    description: 'İşe alım, işten ayrılma (turnover) oranları, çalışan memnuniyeti ve demografik dağılım gibi kritik İK metriklerini görsel panellerle analiz edin.',
    icon: PieChart,
  },
];

const IKBordoPerformansPage = () => {
  return (
    <div className="bg-slate-50">
      {/* Header */}
      <div className="relative isolate pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="text-base font-semibold leading-7 text-cyan-600">Çözüm Detayı</h1>
            <p className="mt-2 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-sky-400 sm:text-5xl">
              İK - Bordro ve Performans Yönetimi
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              En değerli varlığınız olan insan kaynağınızı verimli bir şekilde yönetin. Bordro süreçlerini otomatikleştirin ve performans kültürü oluşturarak çalışan bağlılığını artırın.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link to="/signup" className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500">
                İK Analizi Başlat
              </Link>
              <Link to="/contact" className="text-sm font-semibold leading-6 text-gray-900">
                İK Danışmanlığı <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
             {/* GÖRSEL GÜNCELLENDİ (ODA TEMİZLİK GÖREVLİSİ) */}
            <img src="https://images.unsplash.com/photo-1629144492196-543163533898?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Otel odası temizlik görevlisi" className="rounded-2xl shadow-xl w-full"/>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Modern İK Yönetiminin Temelleri</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Operasyonel yükü azaltan ve stratejik insan kaynakları yönetimine odaklanmanızı sağlayan araçlar.
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
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Farklı Sektörler, Tek Çözüm</h2>
                        <p className="mt-6 text-lg text-gray-600">
                           İK ve Bordro Yönetimi çözümümüz, mavi yaka ve beyaz yaka çalışanların yoğun olduğu farklı sektörlerin ihtiyaçlarına göre esneklik gösterir.
                        </p>
                        <ul className="mt-8 space-y-4 text-gray-600">
                            <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>Turizm ve Otelcilik:</strong> Sezonluk ve değişken saatli çalışanların puantaj ve bordrolarını kolayca yönetin.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>Üretim ve Sanayi:</strong> Fabrika çalışanlarının vardiyalarını, mesailerini ve performans primlerini hatasız hesaplayın.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>Perakende ve Mağazacılık:</strong> Mağaza bazında personel performansını ve hedef primlerini merkezi olarak takip edin.</span>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* GÖRSEL GÜNCELLENDİ (OTOMOTİV SERVİS ÇALIŞANI) */}
                <img src="https://images.unsplash.com/photo-1579639785832-3fb8c82ef598?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="Otomotiv servisinde çalışan mekaniker" className="rounded-xl shadow-xl w-full"/>
            </div>
        </div>
    </div>

    </div>
  );
};

export default IKBordoPerformansPage;
