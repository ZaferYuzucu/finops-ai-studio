import { CheckCircle, ArrowRight, TrendingUp, TrendingDown, Banknote } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    name: 'Tahsilat ve Ödeme Yönetimi',
    description: 'Müşteri alacaklarınızın vadesini ve tedarikçi ödemelerinizi takip edin. Ortalama tahsilat süresini (DSO) düşürmek için proaktif uyarılar alın.',
    icon: Banknote,
  },
  {
    name: 'Nakit Akışı Tahminlemesi',
    description: 'Geçmiş verilerinizi ve mevcut trendleri kullanarak gelecekteki 30, 60 ve 90 günlük nakit pozisyonunuzu yüksek doğrulukla tahminleyin.',
    icon: TrendingUp,
  },
  {
    name: 'Senaryo Analizi',
    description: 'Farklı gelir veya gider senaryolarının (örn: büyük bir müşteri kaybı veya beklenmedik bir yatırım) nakit akışınıza etkisini simüle edin ve hazırlıklı olun.',
    icon: TrendingDown,
  },
];

const NakitAkisiPage = () => {
  return (
    <div className="bg-slate-50">
      {/* Header */}
      <div className="relative isolate pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="text-base font-semibold leading-7 text-yellow-600">Çözüm Detayı</h1>
            <p className="mt-2 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-400 sm:text-5xl">
              Nakit Akışı (Cash Flow)
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              İşletmenizin finansal dayanıklılığını sağlayın. Finops AI ile nakit giriş ve çıkışlarınızı tam olarak kontrol edin, darboğazları önleyin ve büyüme için gerekli likiditeyi her zaman koruyun.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link to="/signup" className="rounded-md bg-yellow-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500">
                Nakit Akışını Analiz Et
              </Link>
              <Link to="/contact" className="text-sm font-semibold leading-6 text-gray-900">
                Finansal Danışmanlık <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <img src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="Nakit Akışı Paneli" className="rounded-2xl shadow-xl w-full"/>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Likiditenizi Yönetmenin Anahtarları</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Nakit akışınızı öngörülebilir ve yönetilebilir kılmak için geliştirdiğimiz araçlarla finansal belirsizlikleri ortadan kaldırın.
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.name} className="flex flex-col p-8 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-200">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                <feature.icon className="h-5 w-5 flex-none text-yellow-600" aria-hidden="true" />
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
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Bu Çözüm Kimin İçin Hayati?</h2>
                        <p className="mt-6 text-lg text-gray-600">
                           Nakit Akışı Yönetimi çözümümüz, şirketin finansal istikrarını ve operasyonel devamlılığını sağlayan kilit karar vericilere yöneliktir.
                        </p>
                        <ul className="mt-8 space-y-4 text-gray-600">
                            <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>İş Sahipleri ve Girişimciler:</strong> İşletmenizin ne kadar süre daha ayakta kalabileceğini (runway) bilin ve büyüme yatırımlarını güvenle planlayın.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>Finans Departmanları:</strong> Günlük, haftalık ve aylık nakit pozisyonunu yönetin, borç ve alacak takibini otomatikleştirin.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 mr-3 mt-1" />
                                <span><strong>Hazine Yöneticileri:</strong> Şirketin likiditesini en verimli şekilde yönetin, kur riski ve faiz oranı değişikliklerine karşı senaryolar oluşturun.</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="Finansal planlama" className="rounded-xl shadow-xl w-full"/>
            </div>
        </div>
    </div>

    </div>
  );
};

export default NakitAkisiPage;
