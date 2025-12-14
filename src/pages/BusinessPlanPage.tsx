import React from 'react';

// Helper component for section titles
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-bold text-gray-50 mt-10 mb-4">{children}</h2>
);

// Helper component for paragraphs
const SectionParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
);

// Helper component for list items
const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="text-gray-300 mb-2">{children}</li>
);

// SWOT Analysis Box Component
const SwotBox: React.FC<{ title: string; items: string[]; color: string }> = ({ title, items, color }) => (
  <div className={`bg-gray-800 p-6 rounded-lg border-l-4 ${color}`}>
    <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-gray-300 flex items-start">
          <span className="text-blue-400 mr-2">&#10148;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const BusinessPlanPage: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        <div className="text-left mb-16">
          <p className="text-base font-semibold text-blue-400">Stratejik Doküman</p>
          <h1 className="mt-2 text-4xl lg:text-5xl font-bold tracking-tight">Finops AI İş Planı</h1>
          <p className="mt-6 max-w-3xl text-lg text-gray-300">
            Bu doküman, Finops AI'ın vizyonunu, stratejik hedeflerini, pazar analizini, operasyonel planını ve finansal projeksiyonlarını detaylandırmaktadır.
          </p>
        </div>

        <section>
          <SectionTitle>1. Yönetici Özeti</SectionTitle>
          <SectionParagraph>
            Finops AI, Türkiye ve MENA bölgesindeki KOBİ'ler için özel olarak geliştirilmiş, yapay zeka destekli bir finansal operasyon (FinOps) platformudur. KOBİ'lerin karmaşık finansal verileri anlama, operasyonel maliyetleri düşürme ve kârlılığı sürdürülebilir bir şekilde artırma zorluklarına teknoloji odaklı bir çözüm sunuyoruz. Temel değer önerimiz, pahalı kurumsal yazılımlar ile yetersiz kalan genel e-tablo çözümleri arasındaki boşluğu doldurarak, her ölçekteki işletmeye birinci sınıf veri analizi ve karar destek mekanizmaları sunmaktır.
          </SectionParagraph>
        </section>

        <section>
          <SectionTitle>2. Pazar Analizi ve Fırsatlar</SectionTitle>
          <SectionParagraph>
            Türkiye'de KOBİ'ler, ekonominin %99'unu oluşturmasına rağmen, dijitalleşme ve finansal teknoloji adaptasyonunda geride kalmaktadır. Artan rekabet, döviz kuru dalgalanmaları ve operasyonel maliyetler, bu işletmeleri verimliliği artırmaya zorlamaktadır. Finops AI, bu noktada kritik bir pazar ihtiyacını karşılamaktadır: uygun maliyetli, kolay entegre edilebilir ve sonuç odaklı bir finansal yönetim aracı.
          </SectionParagraph>
        </section>

        {/* SWOT Analysis Section */}
        <section>
          <SectionTitle>3. SWOT Analizi</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SwotBox 
              title="Güçlü Yönler (Strengths)"
              color="border-green-400"
              items={[
                "KOBİ pazarına odaklanmış niş bir ürün.",
                "Yapay zeka ve makine öğrenmesi tabanlı gelişmiş analiz yeteneği.",
                "Esnek, modüler ve ölçeklenebilir SaaS mimarisi.",
                "Finans ve teknoloji alanında deneyimli kurucu ekip."
              ]}
            />
            <SwotBox 
              title="Zayıf Yönler (Weaknesses)"
              color="border-yellow-400"
              items={[
                "Pazarda yeni bir marka olmanın getirdiği düşük bilinirlik.",
                "Sınırlı başlangıç pazarlama ve satış bütçesi.",
                "Mevcut ERP ve muhasebe yazılımları ile entegrasyon ihtiyacı.",
                "Nitelikli yapay zeka ve veri bilimi yeteneğini ekibe katma zorluğu."
              ]}
            />
            <SwotBox 
              title="Fırsatlar (Opportunities)"
              color="border-blue-400"
              items={[
                "Türkiye'deki KOBİ'lerin artan dijitalleşme eğilimi.",
                "E-fatura ve diğer dijital finansal araçların yaygınlaşması.",
                "Sektörel (turizm, üretim, perakende) iş birlikleri ve dikey çözümler geliştirme potansiyeli.",
                "MENA ve Türki Cumhuriyetler gibi yeni pazarlara açılma imkanı."
              ]}
            />
            <SwotBox 
              title="Tehditler (Threats)"
              color="border-red-400"
              items={[
                "Büyük ERP oyuncularının KOBİ'ler için benzer modüller geliştirmesi.",
                "Veri güvenliği ve KVKK uyumluluğu ile ilgili düzenleyici riskler.",
                "Ekonomik dalgalanmaların KOBİ'lerin teknoloji yatırım bütçelerini etkilemesi.",
                "Pazarda ortaya çıkabilecek yeni ve agresif rakipler."
              ]}
            />
          </div>
        </section>

        <section>
          <SectionTitle>4. Operasyonel Plan ve Ürün Yol Haritası</SectionTitle>
          <SectionParagraph>Operasyonlarımız çevik (agile) metodoloji üzerine kuruludur. Ürün geliştirme, iki haftalık sprintlerle yönetilmekte ve müşteri geri bildirimleri sürekli olarak yol haritasına entegre edilmektedir.</SectionParagraph>
          <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Yol Haritası Öncelikleri:</h3>
          <ul className="list-disc pl-5 space-y-3">
            <ListItem><span className="font-semibold">Q3 2024:</span> Gelişmiş nakit akışı tahminleme ve senaryo analizi modülünün devreye alınması.</ListItem>
            <ListItem><span className="font-semibold">Q4 2024:</span> Popüler e-ticaret platformları (Shopify, WooCommerce) ve yerel ERP'ler için entegrasyon marketpleksi beta sürümünün açılması.</ListItem>
            <ListItem><span className="font-semibold">Q1 2025:</span> Mobil uyumlu dashboard ve raporlama arayüzünün yayınlanması.</ListItem>
            <ListItem><span className="font-semibold">Q2 2025:</span> Üretim sektörü için özelleştirilmiş maliyet ve stok yönetimi modülünün geliştirilmesi.</ListItem>
          </ul>
        </section>

        <section>
          <SectionTitle>5. Finansal Projeksiyonlar</SectionTitle>
          <SectionParagraph>
            Gelir modelimiz, kullanıcı başına aylık abonelik ücretlerine dayanmaktadır (Bkz: Fiyatlandırma Sayfası). İlk üç yıl için hedefimiz, yıllık %150-200 arasında bir büyüme oranı yakalayarak Türkiye pazarında 2,000 aktif KOBİ abonesine ulaşmaktır. Başlangıç yatırımı, ürün geliştirme, sunucu altyapısı ve ilk yılın pazarlama faaliyetlerini karşılamak için kullanılacaktır. Yatırımın geri dönüş süresinin (ROI) 36 ay olması hedeflenmektedir.
          </SectionParagraph>
        </section>

      </div>
    </div>
  );
};

export default BusinessPlanPage;
