import React from 'react';
import { Target, Search, BarChart2, DollarSign, BrainCircuit, Users, FileText, TrendingUp, Presentation, Lightbulb } from 'lucide-react';

const Section: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
    <section className="mb-16">
        <div className="flex items-center mb-6">
            <Icon className="h-8 w-8 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{title}</h2>
        </div>
        <div className="prose prose-lg max-w-none text-gray-600">
            {children}
        </div>
    </section>
);

const InfoCard: React.FC<{ title: string; text: string; icon: React.ElementType }> = ({ title, text, icon: Icon }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-start">
      <Icon className="h-6 w-6 text-indigo-500 mr-4 mt-1 flex-shrink-0" />
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{text}</p>
      </div>
    </div>
  </div>
);


const MarketingPlanPage: React.FC = () => {
    const budgetData = [
        { item: 'İçerik Üretimi (Blog & Video)', monthly: '$1,800', quarterly: '$5,400', description: 'Haftalık 2 blog yazısı, 1 YouTube video prodüksiyonu ve editörlüğü.' },
        { item: 'Sosyal Medya Reklamları (LinkedIn & Instagram)', monthly: '$2,500', quarterly: '$7,500', description: 'Hedef kitleye yönelik marka bilinirliği ve potansiyel müşteri yaratma kampanyaları.' },
        { item: 'Google Ads', monthly: '$1,500', quarterly: '$4,500', description: '"Excel formül yapay zeka" gibi spesifik arama terimlerine odaklı kampanyalar.' },
        { item: 'Webinar & Dijital Etkinlikler', monthly: '$700', quarterly: '$2,100', description: 'Aylık bir webinar için platform lisansı ve tanıtım maliyetleri.' },
        { item: 'SEO Danışmanlığı ve Araçlar', monthly: '$1,000', quarterly: '$3,000', description: 'Teknik SEO, içerik optimizasyonu ve anahtar kelime takip araçları.' },
    ];

    const totalMonthly = budgetData.reduce((sum, item) => sum + parseFloat(item.monthly.replace(/[^0-9.-]+/g,"")), 0);
    const totalQuarterly = budgetData.reduce((sum, item) => sum + parseFloat(item.quarterly.replace(/[^0-9.-]+/g,"")), 0);

    return (
        <div className="bg-gray-50 text-gray-800">
            <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                
                <header className="text-center mb-20">
                    <p className="text-base font-semibold text-blue-600 tracking-widest uppercase">Büyüme Stratejisi</p>
                    <h1 className="mt-4 text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
                        FINOPS.ist Pazarlama Planı 2026
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-500">
                        Türkiye ve komşu pazarlarda sürdürülebilir büyüme ve pazar liderliği için yol haritası.
                    </p>
                </header>

                <Section title="1. Stratejik Özet ve Amaç" icon={Target}>
                    <p>Bu pazarlama planının temel amacı, FINOPS.ist'i 2026 sonuna kadar Türkiye'deki KOBİ'ler ve finans profesyonelleri için birincil yapay zeka destekli finansal analiz ve üretkenlik aracı olarak konumlandırmaktır. Plan, marka bilinirliğini artırma, nitelikli kullanıcı tabanı oluşturma ve gelirleri sürdürülebilir bir şekilde büyütme üzerine odaklanmıştır.</p>
                </Section>

                <Section title="2. Rakip Analizi ve Stratejik Çıkarımlar" icon={Search}>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Global Rakipler (Örn: Ajelix.com, Julius.ai)</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                       <InfoCard 
                          icon={Lightbulb}
                          title="Stratejileri"
                          text="Ürün Odaklı Büyüme (Product-Led Growth), eğitici içerik pazarlaması (blog, 'nasıl yapılır' videoları), organik arama (SEO) ve sosyal kanıt (kullanıcı yorumları) üzerine kurulu bir model izliyorlar."
                       />
                       <InfoCard 
                          icon={BrainCircuit}
                          title="Öğrenimler"
                          text="Kullanıcıların ürünü ücretsiz deneyerek 'Aha!' anını yaşaması ve organik olarak keşfettikleri değerli içerikler sayesinde platforma bağlanması, en etkili büyüme motoru olarak öne çıkıyor."
                       />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Türkiye'deki Yeni Nesil SaaS ve YZ Girişimleri</h3>
                     <div className="grid md:grid-cols-2 gap-6">
                       <InfoCard 
                          icon={Presentation}
                          title="Stratejileri"
                          text="LinkedIn'de aktif profesyonel ağ kurma, yerel iş ortaklıkları (ticaret odaları, teknoparklar), Türkçe SEO ve Google Ads, ve hedef kitleye yönelik niş webinarlar düzenleme gibi taktikler kullanıyorlar."
                       />
                       <InfoCard 
                          icon={Users}
                          title="Öğrenimler"
                          text="Türkiye pazarında güven oluşturmak, yerel sorunlara çözüm sunmak ve yerel dilde, anlaşılır içerik üretmek, global rakiplerden ayrışmak için kritik önem taşıyor."
                       />
                    </div>
                </Section>

                <Section title="3. FINOPS.ist Pazarlama Stratejisi" icon={BarChart2}>
                    <p>Stratejimiz, global rakiplerin başarılı "ürün ve içerik odaklı" modelini, Türkiye pazarının "yerel ve güven odaklı" dinamikleriyle birleştiren hibrit bir yaklaşımdır.</p>
                    <ul>
                        <li><strong>İçerik Pazarlaması (Stratejinin Kalbi):</strong> Finans profesyonellerinin ve KOBİ yöneticilerinin günlük sorunlarına çözüm sunan yüksek kaliteli, eğitici ve Türkçe içerikler (Blog yazıları, YouTube videoları, vaka çalışmaları) üretmek.</li>
                        <li><strong>Organik Büyüme (SEO):</strong> "KOBİ bütçe planlama", "enflasyon muhasebesi excel", "ciro analizi nasıl yapılır" gibi uzun kuyruklu anahtar kelimelerde arama motorlarında lider olmak.</li>
                        <li><strong>Dijital Reklamcılık:</strong> LinkedIn ve Instagram üzerinden, hedef demografiye (CFO'lar, Finans Müdürleri, Şirket Sahipleri) yönelik mikro-hedefli kampanyalar yürütmek. Google Ads ile aktif çözüm arayan kullanıcıları yakalamak.</li>
                        <li><strong>İş Ortaklıkları ve Topluluk:</strong> Mali Müşavirler odaları, üniversitelerin işletme kulüpleri ve sektörel dernekler ile işbirlikleri kurarak güvenilirliğimizi artırmak ve yeni kitlelere ulaşmak.</li>
                    </ul>
                </Section>

                <Section title="4. 2026 İlk Çeyrek Pazarlama Bütçesi" icon={DollarSign}>
                    <p>Bu bütçe, pazarlama faaliyetlerini başlatmak ve ilk çekirdeği oluşturmak için tasarlanmış, mütevazı ama etkili bir başlangıç bütçesidir.</p>
                    <div className="overflow-x-auto mt-6 shadow-md rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3">Pazarlama Kalemi</th>
                                    <th className="px-6 py-3">Açıklama</th>
                                    <th className="px-6 py-3 text-right">Aylık Maliyet (USD)</th>
                                    <th className="px-6 py-3 text-right">3 Aylık Toplam (USD)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {budgetData.map((row, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{row.item}</th>
                                        <td className="px-6 py-4">{row.description}</td>
                                        <td className="px-6 py-4 text-right">{row.monthly}</td>
                                        <td className="px-6 py-4 text-right">{row.quarterly}</td>
                                    </tr>
                                ))}
                            </tbody>
                             <tfoot>
                                <tr className="font-semibold text-gray-900 bg-gray-100">
                                    <th colSpan={2} className="px-6 py-3 text-base text-right">TOPLAM</th>
                                    <td className="px-6 py-3 text-right">${totalMonthly.toLocaleString()}</td>
                                    <td className="px-6 py-3 text-right">${totalQuarterly.toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </Section>
                
                <Section title="5. Başarı Metrikleri ve KPI'lar" icon={TrendingUp}>
                    <p>Pazarlama faaliyetlerimizin başarısını ölçmek ve stratejimizi sürekli olarak iyileştirmek için aşağıdaki temel performans göstergelerini (KPI) takip edeceğiz:</p>
                     <ul>
                        <li><strong>Web Sitesi Trafiği:</strong> Aylık tekil ziyaretçi sayısı.</li>
                        <li><strong>Kullanıcı Kayıt Oranı (Conversion Rate):</strong> Web sitesi ziyaretçilerinin ne kadarının ücretsiz deneme hesabına kaydolduğu.</li>
                        <li><strong>Müşteri Edinme Maliyeti (CAC):</strong> Yeni bir müşteri kazanmak için harcanan ortalama pazarlama maliyeti.</li>
                        <li><strong>Aktif Kullanıcı Sayısı:</strong> Platformu düzenli olarak kullanan kullanıcıların sayısı.</li>
                        <li><strong>Sosyal Medya Etkileşim Oranı:</strong> LinkedIn ve Instagram paylaşımlarımızın aldığı beğeni, yorum ve paylaşım sayısı.</li>
                    </ul>
                </Section>
            </div>
        </div>
    );
};

export default MarketingPlanPage;
