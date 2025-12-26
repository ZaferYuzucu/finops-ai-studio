import { PlayCircle, Shield, BrainCircuit, PiggyBank, Search, ArrowRight, Database, LayoutDashboard, Zap, LifeBuoy, BookOpen, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Başlarken',
    description: 'Platformu kullanmaya yönelik ilk adımlar, temel kurulum ve konfigürasyon bilgileri.',
    icon: PlayCircle,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e28f81?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    articles: [
        { title: '10 dakikada hızlı kurulum nasıl yapılır?', href: '/docs/get-started' },
        { title: 'İlk projenizi oluşturma rehberi', href: '#' },
        { title: 'Platform arayüzüne genel bakış', href: '#' }
    ]
  },
  {
    name: 'Hesap ve Güvenlik',
    description: 'Kullanıcı yönetimi, rol bazlı erişim kontrolü ve en iyi güvenlik uygulamaları.',
    icon: Shield,
    imageUrl: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    articles: [
        { title: 'Verilerimiz güvende mi? Güvenlik politikamız.', href: '#' },
        { title: 'Rol Bazlı Erişim Kontrolü (RBAC) nedir?', href: '#' },
        { title: 'İki Faktörlü Kimlik Doğrulamayı (2FA) etkinleştirin', href: '#' }
    ]
  },
  {
    name: 'Veri Kaynakları',
    description: 'Bulut sağlayıcıları, veritabanları ve diğer servislerden veri entegrasyonu.',
    icon: Database,
    imageUrl: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    articles: [
        { title: 'AWS ve Azure hesaplarını bağlama', href: '#' },
        { title: 'SQL veritabanı entegrasyonu', href: '#' },
        { title: "100'den fazla desteklenen veri kaynağı", href: '#' }
    ]
  },
  {
    name: 'Dashboardlar ve Raporlar',
    description: 'Sınırsız BI panelleri oluşturun, yönetin ve verilerinizi görselleştirin.',
    icon: LayoutDashboard,
    imageUrl: 'https://images.unsplash.com/photo-1642582888795-a241e3a47b1c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    articles: [
        { title: "Sürükle-bırak ile ilk dashboard'unu oluştur", href: '#' },
        { title: 'Filtreler ve segmentasyon kullanımı', href: '#' },
        { title: 'Raporları otomatik olarak e-postala', href: '#' }
    ]
  },
  {
    name: 'FinOps İlkeleri',
    description: 'Bilgilendirme, Optimize Etme ve Çalıştırma. FinOps kültürünü benimseyin.',
    icon: BrainCircuit,
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    articles: [
        { title: "FinOps'un Temel Adımları Nelerdir?", href: '/blog/what-is-finops' }, // HATA DÜZELTİLDİ
        { title: 'Bulut maliyetlerinizi nasıl düşürürsünüz?', href: '#' },
        { title: 'Paylaşılan Sorumluluk Modeli nasıl çalışır?', href: '#' }
    ]
  },
   {
    name: 'Maliyet Yönetimi',
    description: 'Bütçeleme, tahminleme, maliyet optimizasyonu ve anomali tespiti gibi finansal araçlar.',
    icon: PiggyBank,
    imageUrl: 'https://images.unsplash.com/photo-1642582888699-923c71a396e9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    articles: [
        { title: 'Bütçe tahminleme ve kapasite planlaması', href: '#' },
        { title: 'Maliyet anomali tespiti nasıl çalışır?', href: '#' },
        { title: 'Otomatik optimizasyon önerilerini anlama', href: '#' }
    ]
  },
  {
    name: 'AI Araçları',
    description: 'Yapay zeka asistanı, araç istekleri ve sohbet özellikleri ile verimliliği artırın.',
    icon: Zap,
    imageUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    articles: [
        { title: 'Sınırsız AI Mesajı ile içgörüler elde edin', href: '#' },
        { title: 'Doğal dilde sorgulama nasıl yapılır?', href: '#' },
        { title: 'AI ile dosya analizi (200MB limit)', href: '#' }
    ]
  },
  {
    name: 'Destek ve Yardım',
    description: 'Öncelikli e-posta desteği ve diğer yardım kanallarına buradan ulaşın.',
    icon: LifeBuoy,
    imageUrl: 'https://images.unsplash.com/photo-1559526324-c1f275fbfa32?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    articles: [
        { title: 'Öncelikli destek talebi nasıl oluşturulur?', href: '/solutions/support' },
        { title: 'Sıkça Sorulan Sorular (SSS)', href: '#' },
        { title: 'Topluluk forumuna katılın', href: '#' }
    ]
  },
  {
    name: 'API Referansı',
    description: 'Platformumuzu kendi uygulamalarınızla entegre etmek için API belgeleri.',
    icon: FileText,
    imageUrl: 'https://images.unsplash.com/photo-1610986603199-3ca4a8483582?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    articles: [
        { title: 'Authentication (Kimlik Doğrulama)', href: '#' },
        { title: 'Temel API endpointleri', href: '#' },
        { title: 'Rate Limit (Kullanım Limitleri)', href: '#' }
    ]
  },
  {
    name: 'Bilgi Merkezi ve Blog',
    description: 'FinOps, veri analizi ve iş zekası üzerine en son makaleler, rehberler ve blog yazılarımız.',
    icon: BookOpen,
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    articles: [
        { title: 'FinOps Nedir? Bulut Finansal Yönetimine Giriş', href: '/blog/what-is-finops' },
        { title: "Ekipleri Bir Araya Getirmek: FinOps Kültürü", href: '/blog/bringing-teams-together' },
        { title: "İşletmelerde Veri Odaklı Karar Almanın Önemi", href: '/blog/data-driven-decisions' },
        { title: 'Tüm makaleleri gör...', href: '/blog' }
    ]
  }
];

const DocsPage = () => {
  return (
    <div className="bg-white">
      {/* Header ve Arama */}
      <div className="bg-gray-50 py-20 sm:py-28">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">Dökümantasyon ve Bilgi Merkezi</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            Platformumuzdan en iyi şekilde nasıl yararlanacağınızı keşfedin. Aradığınız her şey burada.
          </p>
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Makalelerde ve dökümanlarda ara..."
                className="block w-full rounded-full border-gray-300 shadow-sm py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Kategori Kartları */}
      <div className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-12 sm:grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-2">
            {categories.map((category) => (
              <div key={category.name} className="flex flex-col rounded-2xl bg-white shadow-2xl ring-1 ring-gray-900/5 transition-all duration-300 hover:ring-gray-900/10">
                  <div className="relative h-56 flex-shrink-0 overflow-hidden rounded-t-2xl">
                      <img src={category.imageUrl} alt={`Image for ${category.name}`} className="absolute inset-0 h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                        <div className="absolute inset-0 flex items-end p-6">
                            <div className="rounded-lg bg-white/10 p-3 ring-1 ring-white/20 backdrop-blur-sm">
                                <category.icon className="h-10 w-10 text-white" />
                            </div>
                        </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                        <p className="mt-2 text-sm text-gray-600">{category.description}</p>
                        <ul className="mt-6 space-y-3">
                            {category.articles.map(article => (
                                <li key={article.title}>
                                    <Link to={article.href} className="group flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600">
                                        <ArrowRight className="h-4 w-4 mr-3 text-gray-400 group-hover:text-indigo-500 flex-shrink-0" />
                                        <span>{article.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                      </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
