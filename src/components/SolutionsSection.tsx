import React from 'react';
import DashboardPreview from './DashboardPreview'; // Dashboard bileşeni import edildi

const solutions = [
  {
    name: 'Finansal Veri Analizi',
    description: 'Tüm finansal verilerinizi tek bir platformda birleştirin. Kapsamlı analiz araçlarımızla verilerinizi anlamlı, eyleme geçirilebilir içgörülere dönüştürün ve stratejik kararlarınızı bu temel üzerine inşa edin.',
    imageUrl: '/images/solutions/financial-data-analysis.png',
  },
  {
    name: 'Maliyet ve Stok Yönetimi',
    description: 'Operasyonel maliyetlerinizi ve envanter seviyelerinizi hassas bir şekilde takip edin. Yapay zeka destekli algoritmalarımız, maliyetleri düşürmek ve stok verimliliğini en üst düzeye çıkarmak için size özel öneriler sunar.',
    imageUrl: '/images/solutions/cost-inventory-management.png',
  },
  {
    name: 'Nakit Akışı Tahminleme',
    description: 'Geleceğe yönelik nakit akışınızı yüksek doğrulukla tahmin ederek finansal istikrarınızı güvence altına alın. Olası darboğazları önceden tespit edin ve proaktif önlemlerle finansal sağlığınızı koruyun.',
    imageUrl: '/images/solutions/cash-flow-forecasting.png',
  },
  {
    name: 'İK ve Performans Yönetimi',
    description: 'İnsan kaynakları verilerinizi ve personel performansını analiz ederek organizasyonel verimliliği artırın. Ekip performansını objektif metriklerle ölçün ve yetenek yönetimi stratejilerinizi veriye dayalı olarak şekillendirin.',
    imageUrl: '/images/solutions/hr-performance-management.png',
  },
  {
    name: 'Bütçe ve Finansal Planlama',
    description: 'Bütçe ve fiili harcamalarınızı kolayca karşılaştırın, sapmaları anında tespit edin. Dinamik planlama araçlarımızla daha esnek ve gerçekçi finansal hedefler belirleyin ve bu hedeflere ulaşma yolunda ilerlemenizi sürekli izleyin.',
    imageUrl: '/images/solutions/budget-financial-planning.png',
  },
];

// Her bir çözüm kutusu için modern ve soft renk paleti
const softColorPalette = [
  'bg-sky-50',
  'bg-teal-50',
  'bg-fuchsia-50',
  'bg-orange-50',
  'bg-lime-50',
];

const SolutionsSection = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Üst bölüm, metin ve dashboard için iki sütunlu yapıya dönüştürüldü */}
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
          {/* Sol sütun: Başlık ve metin sola yaslandı */}
          <div>
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Çözümlerimizle Tanışın</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              İşletmeniz İçin Değer Yaratın
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              FINOPS AI Studio, finansal operasyonlarınızı basitleştirmek ve kârlılığınızı artırmak için tasarlanmış, birbiriyle entegre çalışan güçlü modüller sunar.
            </p>
          </div>
          {/* Sağ sütun: KPI Dashboard bileşeni eklendi */}
          <div className="mt-10 lg:mt-0">
            <DashboardPreview />
          </div>
        </div>

        {/* Çözüm kutuları bölümü */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="space-y-16">
            {solutions.map((solution, index) => {
              const bgColor = softColorPalette[index % softColorPalette.length];
              
              return (
                <div
                  key={solution.name}
                  className={`${bgColor} p-10 lg:p-16 rounded-3xl flex flex-col-reverse gap-y-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-16 transition-transform duration-300 hover:scale-105`}
                >
                  <div className={index % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-2'}>
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">{solution.name}</h3>
                    <p className="mt-4 text-lg text-gray-700">{solution.description}</p>
                  </div>
                  <div className={index % 2 === 0 ? 'lg:col-start-2 lg:row-start-1' : 'lg:row-start-1'}>
                      <div className="rounded-2xl overflow-hidden shadow-2xl">
                          <img 
                              src={solution.imageUrl} 
                              alt={solution.name} 
                              className="w-full h-full object-cover" 
                          />
                      </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsSection;
