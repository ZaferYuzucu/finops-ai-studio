import { BarChart, Database, Zap, Settings } from 'lucide-react';

const features = [
  {
    name: 'Tüm Veri Kaynaklarınızı Bağlayın',
    description: 'Excel, SQL veritabanları, bulut servisleri... Nerede olursa olsun, verilerinize anında bağlanın ve merkezi bir görünüm elde edin.',
    icon: Database,
  },
  {
    name: 'Yapay Zeka ile Veri Dönüşümü',
    description: 'Karmaşık veri setlerini, yapay zeka destekli araçlarımızla saniyeler içinde temizleyin, şekillendirin ve analize hazır hale getirin.',
    icon: Zap,
  },
  {
    name: 'Görsel Veri Modelleme',
    description: 'Kod yazmadan, sürükle-bırak arayüzü ile veri tablolarınız arasında ilişkiler kurun ve güçlü veri modelleri oluşturun.',
    icon: BarChart,
  },
  {
    name: 'Hazır Dashboard Şablonları',
    description: 'Sektörünüze özel olarak tasarlanmış onlarca hazır şablon ile veri görselleştirmeye anında başlayın ve zaman kazanın.',
    icon: Settings,
  },
];

const DataVisualizationFeaturesPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" className="h-full w-full object-cover object-center"/>
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center lg:px-0">
            <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">Verilerinizi Sanata Dönüştürün</h1>
            <p className="mt-4 text-xl text-white">Platformumuz, en karmaşık verileri bile kolayca anlamanıza, analiz etmenize ve etkileyici görsellerle sunmanıza olanak tanır.</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="text-base font-semibold leading-7 text-indigo-600">Her Şey Kontrol Altında</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Veri Hazırlamanın En Kolay Yolu
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Veri analizi sürecinin en zorlu kısmı olan veri hazırlama ve temizleme adımlarını, sizin için otomatize ettik.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Image-Text Section 1 */}
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className="lg:pr-8 lg:pt-4">
                    <div className="lg:max-w-lg">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Akıllı Çözümler</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Sürükle-Bırak Kolaylığı</p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Tek bir satır kod yazmadan, verilerinizi görsel arayüzümüzle yönetin. Tabloları birleştirin, yeni hesaplanmış alanlar oluşturun ve karmaşık veri modellerini kolayca inşa edin.
                    </p>
                    </div>
                </div>
                <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e28f81?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Ürün ekran görüntüsü"
                    className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                    width={2432}
                    height={1442}
                />
                </div>
            </div>
        </div>

    </div>
  );
};

export default DataVisualizationFeaturesPage;
