import { CheckCircle, ArrowRight, Factory, TrendingUp, AlertTriangle, Package, Gauge, DollarSign, BarChart3, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const problems = [
  {
    icon: AlertTriangle,
    title: 'Fire & Verimsizlik',
    description: 'Fire oranları takip edilmiyor, maliyetini bilmiyorsunuz. %2 fire = ayda kaç TL?'
  },
  {
    icon: Gauge,
    title: 'Kapasite Kullanımı',
    description: 'Makineler %60 çalışıyor ama kâr yok. Boş kapasitenin maliyeti ne?'
  },
  {
    icon: Package,
    title: 'Stokta Nakit',
    description: '45 günlük stok = bağlı nakit. Çalışma sermayeniz stokta duruyor.'
  },
  {
    icon: DollarSign,
    title: 'Maliyet Sapmaları',
    description: 'Planlanan ile gerçekleşen maliyet arasında %15 fark. Neden?'
  }
];

const solutions = [
  {
    icon: BarChart3,
    title: 'Ürün/Hat/Vardiya Kârlılığı',
    description: 'Hangi ürün kârlı, hangi hat zarar ediyor? Gerçek zamanlı görebilirsiniz.'
  },
  {
    icon: AlertTriangle,
    title: 'Fire Etkisi (TL)',
    description: 'Fire oranı % → TL etkisi otomatik hesaplanır. Karar almak kolay.'
  },
  {
    icon: Gauge,
    title: 'Kapasite → Kâr İlişkisi',
    description: 'Kapasite kullanımı artınca kâr nasıl değişir? Simüle edin, görün.'
  },
  {
    icon: Package,
    title: 'Stok & Nakit Yönetimi',
    description: 'Stok gün sayısı, bağlı nakit, sipariş noktaları tek panelde.'
  }
];

const outputs = [
  {
    metric: 'Kârlılık',
    description: 'Ürün, hat, vardiya bazında net kâr marjı'
  },
  {
    metric: 'Fire Maliyeti',
    description: 'Fire % → TL etkisi, trend analizi'
  },
  {
    metric: 'Stok/Nakit',
    description: 'Stok gün sayısı, bağlı nakit tutarı'
  },
  {
    metric: 'Kapasite Maliyeti',
    description: 'Boş kapasite fırsat maliyeti (TL/ay)'
  }
];

export default function ManufacturingPage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      
      {/* Hero Section */}
      <div className="relative isolate pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex justify-center">
              <Factory className="h-16 w-16 text-indigo-600" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Üretim Yapan KOBİ'ler İçin
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                Finansal Karar Platformu
              </span>
            </h1>
            <p className="mt-8 text-2xl text-gray-700 font-medium">
              Üretimi değil, <span className="text-indigo-600 font-bold">üretimin kârını</span> yönet.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Fire, kapasite, stok maliyetlerini TL'ye çeviren, kâr kıran noktaları gösteren dashboard'lar.
              Excel raporu değil, karar kartları.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:from-indigo-700 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                <span>Demo İste</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 transition-all transform hover:scale-105"
              >
                <span>Beta Partner Ol</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            
            {/* Trust Badge */}
            <div className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>KOBİ'ler için özel geliştirilen</span>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Üretim Yaptınız, Ama <span className="text-red-600">Kâr Kaldı mı?</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Çoğu üretim KOBİ'si bu sorunların maliyetini bilmez:
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((problem, index) => (
              <div 
                key={index}
                className="relative group bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200 hover:border-red-400 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-red-100">
                  <problem.icon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{problem.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-100 border-2 border-red-300 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-800 font-semibold">
                Bu sorunların her biri ayda onlarca bin TL maliyete dönüşüyor
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="py-24 sm:py-32 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              FinOps.ist <span className="text-indigo-600">Çözümü</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Üretim verilerinizi dashboard'a çeviriyoruz. Excel değil, <strong>karar kartları</strong>.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution, index) => (
              <div 
                key={index}
                className="relative group bg-white rounded-xl p-6 border-2 border-indigo-200 hover:border-indigo-400 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-100">
                  <solution.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{solution.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{solution.description}</p>
              </div>
            ))}
          </div>
          
          {/* Dashboard Preview Link */}
          <div className="mt-16 text-center">
            <Link 
              to="/sektorler/uretim/dashboards"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white rounded-xl border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-lg"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Dashboard Örneklerini Gör</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Outputs Section */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Hangi <span className="text-green-600">Çıktıları</span> Alırsınız?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Verileriniz bu metriklere dönüşür:
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {outputs.map((output, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200"
              >
                <div className="text-3xl font-bold text-green-600 mb-2">{output.metric}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{output.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-700 font-medium max-w-3xl mx-auto">
              Her metrik <span className="text-indigo-600 font-bold">karar kartı</span> ile birlikte gelir:
              <br/>
              <span className="text-gray-600">"Fire oranı ↑: Bu ay tahmini kâr etkisi -X TL"</span>
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 sm:py-32 bg-gradient-to-br from-indigo-600 to-blue-600">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Üretiminizi Kârlı Hale Getirin
          </h2>
          <p className="mt-6 text-lg leading-8 text-indigo-100">
            İlk 10 üretim KOBİ'sine <strong>Beta Partner</strong> fırsatı: 
            Dashboard + veri entegrasyonu ücretsiz kurulum.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-indigo-600 hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              <span>Hemen Başvur</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/sektorler/uretim/dashboards" 
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-8 py-4 text-lg font-semibold text-white hover:bg-indigo-800 transition-all transform hover:scale-105"
            >
              <span>Dashboard Örnekleri</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          
          <p className="mt-8 text-sm text-indigo-200">
            ✓ Veri güvenliği garantisi  •  ✓ Excel entegrasyonu  •  ✓ Türkçe destek
          </p>
        </div>
      </div>
    </div>
  );
}

