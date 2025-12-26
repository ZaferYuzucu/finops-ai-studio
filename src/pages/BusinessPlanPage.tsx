
import React, { useState } from 'react';
import { 
  FileText, 
  Wrench, 
  Layers, 
  Tags, 
  TrendingUp, 
  ClipboardList, 
  LayoutGrid,
  PieChart,
  Target,
  Users,
  AlertTriangle,
  Lightbulb,
  Check,
  Lock,
  DollarSign,
  Calendar,
  Shield
} from 'lucide-react';
import PricingSection from '../components/PricingSection'; // YENİ FİYATLANDIRMA BİLEŞENİ

// --- Yardımcı Bileşenler (Değişiklik yok) ---

const SectionTitle: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <div className="flex items-center mt-20 mb-10">
    <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mr-5 shadow-lg">
      <Icon className="h-7 w-7 text-white" />
    </div>
    <h2 className="text-4xl font-bold tracking-tight text-gray-900">{children}</h2>
  </div>
);

const SectionParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-600 leading-relaxed mb-6 text-lg">{children}</p>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start mb-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
      <span className="text-indigo-600 text-xs font-bold">✓</span>
    </div>
    <span className="text-gray-700 leading-relaxed">{children}</span>
  </li>
);

const SwotBox: React.FC<{ title: string; items: string[]; color: string; icon: React.ElementType }> = ({ title, items, color, icon: Icon }) => (
  <div className={`bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border-l-4 ${color} shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}>
    <div className="flex items-center mb-6">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
        color.includes('green') ? 'bg-green-100' :
        color.includes('yellow') ? 'bg-yellow-100' :
        color.includes('blue') ? 'bg-blue-100' : 'bg-red-100'
      }`}>
        <Icon className={`w-6 h-6 ${
          color.includes('green') ? 'text-green-600' :
          color.includes('yellow') ? 'text-yellow-600' :
          color.includes('blue') ? 'text-blue-600' : 'text-red-600'
        }`} />
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="text-gray-700 flex items-start text-sm leading-relaxed">
          <span className="text-indigo-500 mr-3 mt-1 font-bold">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const HighlightNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <blockquote className="mt-8 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-600 rounded-r-2xl shadow-xl">
        <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div className="prose prose-p:text-gray-700 prose-strong:text-gray-900">
                {children}
            </div>
        </div>
    </blockquote>
);

// --- Ana Sayfa Bileşeni ---

const BusinessPlanPage: React.FC = () => {
  const [frequency, setFrequency] = useState('monthly');

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 text-gray-900 min-h-screen">
      {/* Hero Bölümü */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6">
              <FileText className="w-4 h-4" />
              <span>Stratejik İş Planı Dokümantasyonu</span>
            </div>
            <h1 className="mt-4 text-5xl lg:text-7xl font-extrabold tracking-tight">
              FINOPS.ist İş Planı
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-indigo-100">
              2026-2028 vizyonu, stratejik hedefleri, pazar analizi, operasyonel planı ve finansal projeksiyonları.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-sm font-semibold">📈 3 Yıllık Projeksiyon</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-sm font-semibold">🎯 Hedef: 12K Abone</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-sm font-semibold">💰 ₺322M Net Kazanç</span>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

        <div id="business-plan-content">
          <section id="executive-summary" className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
            <SectionTitle icon={FileText}>1. Yönetici Açıklaması</SectionTitle>
            <SectionParagraph>
              FINOPS AI Studio, Türkiye'deki KOBİ'lerin finansal okuryazarlığını artırmak ve yapay zeka destekli operasyonel mükemmelliğe ulaşmalarını sağlamak amacıyla kurulmuş yeni nesil bir SaaS platformudur. Yüksek enflasyon ortamında işletmelere "Nakit Akışı", "Stok Maliyeti" ve "Kârlılık" konularında anlık içgörü sunar. Yerli ERP entegrasyonları (Logo, Netsis) ile global rakiplerinden ayrışır.
            </SectionParagraph>
            <SectionParagraph>
              FINOPS AI Studio'nun temel işlevi, kullanıcıların doğal dil kullanarak (yani düz İngilizce veya Türkçe cümlelerle) karmaşık elektronik tablo görevlerini saniyeler içinde yerine getirmesini sağlamaktır. Platform, iş akışı otomasyonu ve veri analizi üzerine odaklanır.
            </SectionParagraph>
          </section>

          <section id="tools-features" className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200 mt-8">
            <SectionTitle icon={Wrench}>2. Temel Araçlar ve Özellikler</SectionTitle>
             <ul className="list-none p-0 space-y-4">
                <ListItem><strong>Formül Üretici (AI Formula Generator):</strong> Kullanıcı, yapmak istediği işlemi doğal dilde yazar. Ajelix, bu isteği anında doğru Excel veya Google Sheets formülüne dönüştürür.</ListItem>
                <ListItem><strong>VBA/Komut Dosyası Üretici:</strong> Daha karmaşık otomasyon görevleri için gerekli olan Visual Basic for Applications (VBA) veya Google Apps Script kodlarını otomatik olarak oluşturur.</ListItem>                
                <ListItem><strong>Veri Analizi:</strong> Veri setlerini analiz eder, eğilimleri tespit eder ve bu eğilimler hakkında özetler çıkarır.</ListItem>
                <ListItem><strong>Veri Görselleştirme (BI):</strong> Veri setlerinden otomatik olarak iş zekası (Business Intelligence) panoları ve görselleştirmeler oluşturmaya yardımcı olur.</ListItem>
            </ul>
            <SectionParagraph>
              Özetle, FINOPS AI Studio, Otel/Turizm, Restoran/Cafe, Sağlık Kurumları, Otomotiv/Servis, Perakende Zincirleri gibi sektörlerin Finans, Muhasebe, Pazarlama, Operasyon gibi alanlarda çalışan daha çok CEO, CFO, Yönetim Kurulu ve Üst Yöneticilerin, işletmelerinin faaliyet sonuçlarını net görebilmek ve kararlar alabilmek beklentilerini karşılamak ve gününün büyük bir bölümünü Excel/Sheets'te geçiren kişilerin üretkenliğini artırmayı hedefler.
           </SectionParagraph>
          </section>

          <section id="tech-stack" className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200 mt-8">
            <SectionTitle icon={Layers}>3. Arka Planda Çalışan Yazılım Grupları ve Teknolojiler</SectionTitle>
              <ul className="list-none p-0 mt-4 space-y-4">
                  <ListItem><strong>Doğal Dil İşleme (NLP):</strong> Kullanıcının doğal dilde yazdığı istekleri anlamak ve amacını çözümlemek için gelişmiş NLP modelleri kullanılır.</ListItem>
                  <ListItem><strong>Büyük Dil Modelleri (LLM'ler):</strong> Formül veya kod çıktısını üretmek için GPT gibi büyük dil modellerinin optimize edilmiş versiyonları kullanılır.</ListItem>                
                  <ListItem><strong>Bulut Altyapısı:</strong> Platform, tahminen AWS, Azure veya Google Cloud gibi büyük bir bulut sağlayıcısının altyapısında çalışmaktadır.</ListItem>
                  <ListItem><strong>API Entegrasyonları:</strong> Excel ve Google Sheets gibi üçüncü taraf uygulamalarla sorunsuz çalışabilmek için API'ler ve eklentiler kullanılır.</ListItem>
                  <ListItem><strong>Domain/Alan Adı ve E-Posta:</strong> Web tabanlı yapı için www.finops.ist alan adı ve info@finops.ist e-posta adresi tescillenmiştir.</ListItem>
                  <ListItem><strong>Sosyal Medya Platformları:</strong> Bilinirliği güçlendirmek için YouTube, Linkedin, Facebook (@finopsai) ve Instagram (@finops.ist) hesapları oluşturulmuştur.</ListItem>
              </ul>
              <HighlightNote>
                  <p><strong>FinOpsist Nedir?</strong> FinOpsist terimi, FinOps (Finansal Operasyonlar) disiplininde çalışan uzmanları tanımlar. Bu rol, bir şirketin bulut bilişim harcamalarını yönetir, optimize eder ve finans, mühendislik ve iş birimleri arasında bir köprü görevi görür. FinOpsist, kontrolsüz harcamaları durdurarak ve her harcamanın iş değeriyle hizalanmasını sağlayarak şirketin kâr marjını doğrudan artırır. FinOps disiplini, "Herkesin bulut harcamaları konusunda hesap verebilir olduğu bir kültürel uygulama" olarak tanımlanır.</p>
              </HighlightNote>
          </section>


          {/* ----- YENİLENMİŞ FİYATLANDIRMA BÖLÜMÜ ----- */}
          <section id="pricing" className="my-20">
            <SectionTitle icon={Tags}>4. Fiyatlandırma Modeli ve Stratejisi</SectionTitle>
            
            {/* Fiyatlandırma Stratejisi */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200 shadow-lg">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Esnek Fiyatlandırma</h3>
                <p className="text-gray-600">
                  İşletmelerin büyüklüğüne göre ölçeklenen 5 farklı paket seçeneği. 
                  Girişimci'den Kurumsal'a kadar her ihtiyaca uygun çözüm.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 shadow-lg">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Yıllık İndirim</h3>
                <p className="text-gray-600">
                  Yıllık ödemelerde %20 indirim avantajı. 
                  Uzun vadeli kullanıcılara özel fiyat garantisi ve avantajlar.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200 shadow-lg">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Beta Partner Programı</h3>
                <p className="text-gray-600">
                  İlk 20 işletmeye 1 yıl ücretsiz kullanım. 
                  1 yıl sonunda %75 indirimli sabit fiyat garantisi.
                </p>
              </div>
            </div>

            <SectionParagraph>
                İşletmelerin ihtiyaçlarına göre ölçeklenen, ücretsiz bir başlangıç katmanı ve yıllık ödemelerde %20 indirim avantajı sağlayan beş temel abonelik katmanı sunulmaktadır. 
                Fiyatlandırma stratejimiz, KOBİ'lerin bütçelerine uygun, şeffaf ve rekabetçi bir yapı sunmaktadır.
            </SectionParagraph>
            
            {/* Fiyatlandırma Özellikleri */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 Fiyatlandırma Özellikleri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Taahhütsüz Abonelik</h4>
                    <p className="text-sm text-gray-600">İstediğiniz zaman paketinizi değiştirebilir veya iptal edebilirsiniz.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">14 Gün Para İade Garantisi</h4>
                    <p className="text-sm text-gray-600">İlk 14 gün içinde memnun kalmazsanız tam iade.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Yıllık Ödemede %20 İndirim</h4>
                    <p className="text-sm text-gray-600">Peşin ödeme yaparak yıllık %20 tasarruf edin.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Güvenli Ödeme Altyapısı</h4>
                    <p className="text-sm text-gray-600">Iyzico ve Stripe ile SSL sertifikalı güvenli ödeme.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Merkezi Fiyatlandırma Bileşeni */}
            <div className="-mx-4 sm:-mx-6 lg:-mx-8">
              <PricingSection />
            </div>

            {/* Fiyatlandırma Karşılaştırma Tablosu */}
            <div className="mt-16 bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">📊 Plan Karşılaştırması</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Özellik</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Girişimci</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">İşletme Dostu</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Premium</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Kurumsal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-gray-700 font-medium">Kullanıcı Sayısı</td>
                      <td className="px-4 py-3 text-center text-gray-600">1</td>
                      <td className="px-4 py-3 text-center text-gray-600">3</td>
                      <td className="px-4 py-3 text-center text-gray-600">10</td>
                      <td className="px-4 py-3 text-center text-green-600 font-semibold">Sınırsız</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-700 font-medium">İşletme Sayısı</td>
                      <td className="px-4 py-3 text-center text-gray-600">1</td>
                      <td className="px-4 py-3 text-center text-gray-600">3</td>
                      <td className="px-4 py-3 text-center text-gray-600">10</td>
                      <td className="px-4 py-3 text-center text-green-600 font-semibold">Sınırsız</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-700 font-medium">Dashboard Sayısı</td>
                      <td className="px-4 py-3 text-center text-gray-600">5</td>
                      <td className="px-4 py-3 text-center text-gray-600">15</td>
                      <td className="px-4 py-3 text-center text-green-600 font-semibold">Sınırsız</td>
                      <td className="px-4 py-3 text-center text-green-600 font-semibold">Sınırsız</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-700 font-medium">AI Danışmanlık</td>
                      <td className="px-4 py-3 text-center text-red-500">❌</td>
                      <td className="px-4 py-3 text-center text-red-500">❌</td>
                      <td className="px-4 py-3 text-center text-yellow-500">Standart</td>
                      <td className="px-4 py-3 text-center text-green-600 font-semibold">Özel</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-700 font-medium">Destek</td>
                      <td className="px-4 py-3 text-center text-gray-600">Email</td>
                      <td className="px-4 py-3 text-center text-gray-600">Email + Chat</td>
                      <td className="px-4 py-3 text-center text-gray-600">7/24 VIP</td>
                      <td className="px-4 py-3 text-center text-green-600 font-semibold">7/24 Öncelikli</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          {/* ----- BİTİŞ ----- */}

          <section id="financials" className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200 mt-8">
            <SectionTitle icon={TrendingUp}>5. Finansal Fizibilite (Kötümser Senaryo)</SectionTitle>
            <SectionParagraph>
              Bu projeksiyon, şirketin 3 yıllık (2026-2028) finansal performansını kötümser bir senaryo altında modellemektedir. Model, Türkiye'deki potansiyel kullanıcı tabanının sadece küçük bir yüzdesine ulaşılacağı ve rekabetin yoğun olacağı varsayımına dayanmaktadır. Gelirler, kullanıcı başına ortalama abonelik ücretine göre hesaplanmış, masraflar ise cironun %20'si olarak öngörülmüştür.
            </SectionParagraph>
             <div className="overflow-x-auto mt-6 shadow-lg rounded-lg bg-white ring-1 ring-gray-200">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-4 py-3">Yıl</th>
                            <th className="px-4 py-3">Kur (Tahmini)</th>
                            <th className="px-4 py-3">TR Hedef (K)</th>
                            <th className="px-4 py-3">Hedef %</th>
                            <th className="px-4 py-3">Hedef Abone</th>
                            <th className="px-4 py-3">Aylık Fiyat ($)</th>
                            <th className="px-4 py-3">Yıllık Ciro ($ Mio)</th>
                            <th className="px-4 py-3">Ciro (Mio TL)</th>
                            <th className="px-4 py-3">Masraf (Mio TL)</th>
                            <th className="px-4 py-3">Net Kazanç (Mio TL)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <td className="px-4 py-4 font-semibold text-gray-900">2026</td>
                            <td className="px-4 py-4">48.0</td>
                            <td className="px-4 py-4">300</td>
                            <td className="px-4 py-4">0.83%</td>
                            <td className="px-4 py-4">2,500</td>
                            <td className="px-4 py-4">$40</td>
                            <td className="px-4 py-4">$1.20</td>
                            <td className="px-4 py-4">₺57.6</td>
                            <td className="px-4 py-4 text-red-500">-₺11.5</td>
                            <td className="px-4 py-4 font-bold text-green-500">₺46.1</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="px-4 py-4 font-semibold text-gray-900">2027</td>
                            <td className="px-4 py-4">58.0</td>
                            <td className="px-4 py-4">300</td>
                            <td className="px-4 py-4">2.00%</td>
                            <td className="px-4 py-4">6,000</td>
                            <td className="px-4 py-4">$40</td>
                            <td className="px-4 py-4">$2.88</td>
                            <td className="px-4 py-4">₺167.0</td>
                            <td className="px-4 py-4 text-red-500">-₺33.4</td>
                            <td className="px-4 py-4 font-bold text-green-500">₺133.6</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-4 font-semibold text-gray-900">2028</td>
                            <td className="px-4 py-4">70.0</td>
                            <td className="px-4 py-4">300</td>
                            <td className="px-4 py-4">4.00%</td>
                            <td className="px-4 py-4">12,000</td>
                            <td className="px-4 py-4">$40</td>
                            <td className="px-4 py-4">$5.76</td>
                            <td className="px-4 py-4">₺403.2</td>
                            <td className="px-4 py-4 text-red-500">-₺80.6</td>
                            <td className="px-4 py-4 font-bold text-green-500">₺322.6</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </section>
          
          <section id="competitor-analysis" className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200 mt-8">
            <SectionTitle icon={ClipboardList}>6. Türkiye'de Rakip Analizi</SectionTitle>
            <SectionParagraph>
                FINOPS AI Studio’nun "doğal dilden anında Excel formülü ve kodu üretme" işlevi, günümüzde genellikle global teknoloji devlerinin (Microsoft, Google, OpenAI) veya bazı küresel niş firmaların sunduğu bir hizmettir. Türkiye'de bu işlevi tam anlamıyla bağımsız olarak yerine getiren ve öne çıkan bir işletme şu an için bulunmamaktadır; ancak Türk kullanıcılar bu ihtiyacı global YZ araçları veya yerel RPA çözümleri aracılığıyla giderebilmektedir.
            </SectionParagraph>
          </section>

          <section id="swot" className="mt-8">
            <SectionTitle icon={LayoutGrid}>7. SWOT Analizi</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <SwotBox 
                    title="Güçlü Yönler"
                    color="border-green-500"
                    icon={Lightbulb}
                    items={[
                        "Yerli ERP'ler (Logo, Netsis) ile tam entegrasyon.",
                        "Türk vergi mevzuatı ve finansal dinamiklere hakimiyet.",
                        "Esnek, modüler ve ölçeklenebilir SaaS mimarisi.",
                        "Finans ve teknoloji alanında deneyimli, çevik kurucu ekip."
                    ]}
                />
                <SwotBox 
                    title="Zayıf Yönler"
                    color="border-yellow-500"
                    icon={AlertTriangle}
                    items={[
                        "Pazarda yeni olmanın getirdiği düşük marka bilinirliği.",
                        "Sınırlı başlangıç pazarlama ve satış bütçesi.",
                        "Nitelikli yapay zeka yeteneğini ekibe katma ve elde tutma zorluğu.",
                        "Geniş entegrasyon yelpazesi sunmanın getireceği teknik karmaşıklık."
                    ]}
                />
                <SwotBox 
                    title="Fırsatlar"
                    color="border-blue-500"
                    icon={Target}
                    items={[
                        "Türkiye'deki KOBİ'lerin artan dijitalleşme ve verimlilik arayışı.",
                        "Enflasyonist ortamın, maliyet kontrolü ve nakit akışı yönetimi ihtiyacını artırması.",
                        "E-fatura ve e-arşiv gibi dijital araçların veri erişimini kolaylaştırması.",
                        "MENA ve Türki Cumhuriyetler gibi yeni pazarlara açılma potansiyeli."
                    ]}
                />
                <SwotBox 
                    title="Tehditler"
                    color="border-red-500"
                    icon={Users}
                    items={[
                        "Global teknoloji devlerinin (Microsoft, Google) benzer özellikleri kendi platformlarına entegre etmesi.",
                        "Büyük ERP oyuncularının KOBİ'ler için rekabetçi modüller geliştirmesi.",
                        "Veri güvenliği ve KVKK uyumluluğu ile ilgili artan düzenleyici riskler.",
                        "Ekonomik dalgalanmaların KOBİ'lerin teknoloji yatırım bütçelerini olumsuz etkilemesi."
                    ]}
                />
            </div>
          </section>

          <section id="market-share" className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200 mt-8">
            <SectionTitle icon={PieChart}>8. Türkiye ERP ve Muhasebe Yazılımı Pazar Payı Dağılımı</SectionTitle>
            <SectionParagraph>
               Türkiye'deki muhasebe ve finansal veri yazılımı pazarı, Kurumsal Kaynak Planlaması (ERP) ve ön/genel muhasebe yazılımları olarak ele alınır. Pazar liderleri ve tahmini pazar payı dağılımı şöyledir. Yerel oyuncular, mevzuat uyumu ve yerel destek ağı avantajlarıyla pazarda baskın konumdadır.
            </SectionParagraph>
             <div className="overflow-x-auto mt-6 shadow-lg rounded-lg bg-white ring-1 ring-gray-200">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Oyuncu Grubu</th>
                            <th scope="col" className="px-6 py-3">Tahmini Pazar Payı Aralığı</th>
                            <th scope="col" className="px-6 py-3">Örnek Firmalar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900">Yerel Büyük/Orta Ölçekli Oyuncular</th>
                            <td className="px-6 py-4 font-bold text-blue-600">%50 - %60</td>
                            <td className="px-6 py-4">Logo Yazılım (Netsis dahil), Mikro Yazılım, Uyumsoft</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900">Niş ve Diğer Küçük Oyuncular</th>
                            <td className="px-6 py-4 font-bold text-blue-600">%30 - %45</td>
                            <td className="px-6 py-4">Paraşüt, Akınsoft, Zirve</td>
                        </tr>
                        <tr>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900">Küresel Çözüm Tedarikçileri</th>
                            <td className="px-6 py-4 font-bold text-blue-600">%5 - %10</td>
                            <td className="px-6 py-4">SAP, Oracle, Microsoft Dynamics</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default BusinessPlanPage;
