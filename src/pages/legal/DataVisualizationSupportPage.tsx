import { BookOpen, Youtube, Users, LifeBuoy } from 'lucide-react';

const supportLinks = [
  {
    name: 'Bilgi Bankası',
    href: '#',
    description: 'Platformun tüm özelliklerini detaylı anlatan makaleler, kılavuzlar ve sıkça sorulan sorular.',
    icon: BookOpen,
  },
  {
    name: 'Eğitim Videoları',
    href: '#',
    description: 'Adım adım video eğitimleri ile veri görselleştirmenin temellerinden ileri düzey tekniklere kadar her şeyi öğrenin.',
    icon: Youtube,
  },
  {
    name: 'Topluluk Forumu',
    href: '#',
    description: 'Diğer kullanıcılarla bağlantı kurun, sorularınızı sorun ve en iyi uygulama ipuçlarını paylaşın.',
    icon: Users,
  },
  {
    name: 'Özel Destek Talebi',
    href: '#',
    description: 'Teknik bir sorunla mı karşılaştınız? Destek ekibimiz bir tık uzağınızda, size yardımcı olmaya hazır.',
    icon: LifeBuoy,
  },
];

const DataVisualizationSupportPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Nasıl Yardımcı Olabiliriz?</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Başarınıza giden yolda ihtiyacınız olan tüm destek burada. Aklınıza takılan bir soru mu var veya sadece bir merhaba mı demek istiyorsunuz? Doğru yerdesiniz.
            </p>
          </div>
        </div>
      </div>

      {/* Support Links Section */}
      <div className="mx-auto mt-16 max-w-7xl px-6 pb-20 sm:mt-20 sm:pb-24 lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {supportLinks.map((link) => (
            <div key={link.name} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <link.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold leading-6 text-gray-900">{link.name}</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">{link.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Get Started Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Platformu Keşfetmeye Hazır Mısınız?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              İlk dashboard'unuzu dakikalar içinde oluşturun. Ücretsiz deneme sürümümüzle platformun tüm gücünü deneyimleyin.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/signup"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Ücretsiz Başla
              </a>
              <a href="/docs" className="text-sm font-semibold leading-6 text-white">
                Dökümanları İncele <span aria-hidden="true">→</span>
              </a>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualizationSupportPage;
