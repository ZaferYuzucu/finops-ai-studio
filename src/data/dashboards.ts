
// Finops SVG İllüstrasyonları (Eski PNG'ler değiştirildi!)
import ceoDashboardImg from "@/assets/illustrations/undraw/visual-data-bro-finops.svg";
import profitAndLossImg from "@/assets/illustrations/undraw/undraw_financial-data_lbci-finops.svg";
import cashFlowImg from "@/assets/illustrations/undraw/undraw_finance_m6vw-finops.svg";
import salesPerformanceImg from "@/assets/illustrations/undraw/undraw_business-analytics_y8m6-finops.svg";
import salesFunnelImg from "@/assets/illustrations/undraw/design-stats-bro-finops.svg";
import marketingCampaignImg from "@/assets/illustrations/undraw/social-dashboard-bro-finops.svg";
import hrMetricsImg from "@/assets/illustrations/undraw/undraw_performance-overview_1b4y-finops.svg";
import inventoryManagementImg from "@/assets/illustrations/undraw/undraw_logistics_8vri-finops.svg";
import restaurantOperationsImg from "@/assets/illustrations/undraw/undraw_online-stats_d57c-finops.svg";
import restaurantFinancialImg from "@/assets/illustrations/undraw/undraw_inflation_ht0o-finops.svg";
import ecommerceKpiImg from "@/assets/illustrations/undraw/undraw_online-payments_d5ef-finops.svg";
import hotelImg from "@/assets/illustrations/undraw/undraw_certificate_cqps-finops.svg";
import automotiveImg from "@/assets/illustrations/undraw/setup-analytics-pana-finops.svg";
import agricultureImg from "@/assets/illustrations/undraw/visual-data-pana-finops.svg";
// Türkçe Dashboard İllüstrasyonları (Finops SVG)
import butceGerceklesenImg from "@/assets/illustrations/undraw/undraw_wallet_diag-finops.svg";
import cfoKontrolImg from "@/assets/illustrations/undraw/site-stats-bro-finops.svg";
import genelRestoranImg from "@/assets/illustrations/undraw/undraw_all-the-data_ijgn-finops.svg";
import hotelManagementImg from "@/assets/illustrations/undraw/undraw_visual-data_1eya-finops.svg";
import kaliteKontrolImg from "@/assets/illustrations/undraw/undraw_analytics-setup_ptrz-finops.svg";
import karZararImg from "@/assets/illustrations/undraw/undraw_financial-data_lbci-finops.svg";
import nakitAkisiImg from "@/assets/illustrations/undraw/undraw_finance_m6vw-finops.svg";
import otomotivDashboardImg from "@/assets/illustrations/undraw/setup-analytics-pana-finops.svg";
import restoranEnvanterImg from "@/assets/illustrations/undraw/undraw_database-tables_yft5-finops.svg";
import restoranIsgucuImg from "@/assets/illustrations/undraw/undraw_performance-overview_1b4y-finops.svg";
import restoranSatisImg from "@/assets/illustrations/undraw/design-stats-bro-finops.svg";
import uretimKontrolImg from "@/assets/illustrations/undraw/visual-data-pana-finops.svg";


export interface Dashboard {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  keyQuestions: string[];
  keyMetrics: string[];
}

export const dashboardCategories = [
  "Restoran & Kafe",
  "Üretim & Operasyon",
  "Finans & Muhasebe",
  "Otel & Konaklama",
  "E-Ticaret & Retail",
  "İnsan Kaynakları",
  "Otomotiv",
  "Satış & Pazarlama",
  "Tarım"
];

export const dashboards: Dashboard[] = [
    // Finans
    {
        id: "cfo-kontrol-paneli",
        name: "CFO Kontrol Paneli",
        category: "Finans & Muhasebe",
        description: "Finans Direktörleri için kritik finansal metrikler ve genel bakış.",
        longDescription: "CFO Kontrol Paneli, bir Finans Direktörünün ihtiyaç duyduğu tüm kritik bilgileri tek bir ekranda birleştirir. Karlılık oranları, likidite durumu, borçluluk seviyesi ve yatırım getirileri gibi üst düzey metrikleri sunarak şirketin finansal stratejilerine yön verir.",
        imageUrl: cfoKontrolImg,
        keyQuestions: [
            "Şirketin finansal sağlığı genel olarak nasıl?",
            "Karlılık oranları hedeflerimize uygun mu?",
            "Nakit akışı pozitif mi, likidite yeterli mi?",
            "Borçluluk seviyesi kabul edilebilir aralıkta mı?",
            "Yatırım getirilerimiz sektör ortalamasının üzerinde mi?"
        ],
        keyMetrics: [
            "Brüt Kar Marjı: (Brüt Kar / Net Satışlar) * 100",
            "Net Kar Marjı: (Net Gelir / Net Satışlar) * 100",
            "Yatırım Getirisi (ROI): (Net Kar / Yatırım Maliyeti) * 100",
            "Cari Oran: Cari Varlıklar / Cari Yükümlülükler",
            "Hızlı Oran: (Cari Varlıklar – Stoklar) / Cari Yükümlülükler",
            "Borç/Özkaynak Oranı: Toplam Yükümlülükler / Toplam Özkaynak",
            "EBITDA (Faiz, Vergi, Amortisman Öncesi Kar)"
        ]
    },
    {
        id: "kar-zarar-tablosu",
        name: "Kar Zarar Tablosu",
        category: "Finans & Muhasebe",
        description: "Detaylı gelir ve gider kalemleriyle şirketinizin net karını analiz edin.",
        longDescription: "Kar Zarar Tablosu, şirketin finansal performansının temelini oluşturur. Bu dinamik panel, gelir kaynaklarını, satılan malın maliyetini ve tüm operasyonel giderleri detaylı bir şekilde listeler. Farklı dönemleri karşılaştırarak karlılık trendlerini ve gider yapısındaki değişiklikleri kolayca analiz etmenizi sağlar.",
        imageUrl: karZararImg,
        keyQuestions: [
            "Şirketin net karı beklentilere uygun mu?",
            "Gelir artışı hangi ürün veya hizmetlerden kaynaklanıyor?",
            "En yüksek gider kalemleri hangileri ve optimize edilebilir mi?",
            "Brüt kar marjı sektör ortalamasına göre nasıl?",
            "Operasyonel verimlilik nasıl iyileştirilebilir?"
        ],
        keyMetrics: [
            "Toplam Gelir: Satışlardan elde edilen toplam gelir",
            "Satılan Malın Maliyeti (COGS): Ürünlerin üretimi veya satışı ile ilgili doğrudan maliyetler",
            "Brüt Kar: Gelir eksi Satılan Malın Maliyeti",
            "İşletme Giderleri: İşletmenin yürütülmesiyle ilgili dolaylı maliyetler",
            "Faaliyet Karı: Brüt kar eksi faaliyet giderleri",
            "Net Kar: Tüm gelir ve giderler sonrası kalan kar"
        ]
    },
    {
        id: "nakit-akisi-gosterge-paneli",
        name: "Nakit Akışı Gösterge Paneli",
        category: "Finans & Muhasebe",
        description: "Şirketinizin nakit giriş ve çıkışlarını izleyerek likiditeyi yönetin.",
        longDescription: "Nakit Akışı Gösterge Paneli, bir işletmenin can damarı olan nakit hareketlerini görselleştirir. Operasyon, yatırım ve finansman faaliyetlerinden gelen ve giden nakit akışlarını net bir şekilde göstererek, şirketin kısa vadeli finansal sağlığı hakkında kritik bilgiler sunar.",
        imageUrl: nakitAkisiImg,
        keyQuestions: [
            "Mevcut nakit bakiyesi yeterli mi?",
            "Nakit girişleri hangi kaynaklardan geliyor?",
            "En büyük nakit çıkışları hangi alanlarda?",
            "Operasyonel nakit akışı pozitif mi?",
            "Nakit sıkıntısı riski var mı ve ne zaman olabilir?"
        ],
        keyMetrics: [
            "Nakit Bakiyesi: Mevcut nakit miktarı",
            "Nakit Girişleri: Satışlar, yatırımlar ve krediler",
            "Nakit Çıkışları: Maaşlar, kira, satın alımlar",
            "Net Nakit Akışı: Nakit girişleri - Nakit çıkışları",
            "Alacakların Tahsil Süresi (DSO): (Alacaklar / Net Kredili Satışlar) * 365",
            "Nakit Akışı Oranı: Faaliyetlerden Elde Edilen Nakit Akışı / Kısa Vadeli Yükümlülükler"
        ]
    },
    {
        id: "butce-karsilastirma",
        name: "Bütçe & Gerçekleşen Karşılaştırma",
        category: "Finans & Muhasebe",
        description: "Bütçelenen değerler ile gerçekleşen finansal sonuçları karşılaştırın.",
        longDescription: "Bütçe ve Gerçekleşen Karşılaştırma Paneli, finansal hedefler ile fiili sonuçlar arasındaki farkları net bir şekilde ortaya koyar. Departman, proje veya gider kalemi bazında sapmaları analiz ederek bütçe disiplinini artırır ve gelecekteki planlamalar için değerli içgörüler sunar.",
        imageUrl: butceGerceklesenImg,
        keyQuestions: [
            "Bütçelenen hedefler gerçekleşti mi?",
            "Hangi departmanlarda bütçe aşımı var?",
            "Önemli sapmalar neden kaynaklanıyor?",
            "Gelir tahminleri ne kadar doğru?",
            "Gelecek dönem bütçe planlaması için neler öğrenebiliriz?"
        ],
        keyMetrics: [
            "Bütçelenen Gelir vs Gerçekleşen Gelir",
            "Bütçelenen Gider vs Gerçekleşen Gider",
            "Varyans (Sapma): Gerçekleşen - Bütçelenen",
            "Varyans Yüzdesi: (Varyans / Bütçelenen) * 100",
            "Bütçe Uygulama Oranı: Gerçekleşen / Bütçelenen",
            "Kümülatif Varyans: Yıl başından itibaren toplam sapma"
        ]
    },
    {
        id: "profit-and-loss-dashboard",
        name: "Kar ve Zarar Analizi Paneli",
        category: "Finans & Muhasebe",
        description: "Gelir tablolarınızı dinamik olarak analiz ederek karlılığınızı artırın.",
        longDescription: "Bu pano, şirketin belirli bir dönemdeki finansal performansını detaylı bir şekilde analiz eder. Gelirleri, satılan malın maliyetini (COGS) ve operasyonel giderleri karşılaştırarak net karın nereden geldiğini veya nerede kaybedildiğini net bir şekilde ortaya koyar. Ürün, hizmet veya departman bazında karlılık analizi yapmanızı sağlar.",
        imageUrl: karZararImg,
        keyQuestions: [
            "Ürün veya hizmet bazında karlılık nasıl?",
            "Hangi departmanlar en karlı ve hangilerinde iyileştirme gerekli?",
            "Gelir trendleri nasıl, büyüme sürdürülebilir mi?",
            "Maliyet yapısı optimize edilebilir mi?",
            "Kar marjları geçmiş dönemlere göre nasıl değişti?"
        ],
        keyMetrics: [
            "Toplam Gelir: Tüm satış işlemlerinin toplamı",
            "Ürün/Hizmet Bazında Gelir Dağılımı",
            "Brüt Kar ve Brüt Kar Marjı",
            "Faaliyet Giderleri: SG&A (Satış, Genel ve İdari Giderler)",
            "EBITDA: Faiz, Vergi, Amortisman Öncesi Kar",
            "Net Kar Marjı: (Net Kar / Toplam Gelir) * 100"
        ]
    },
    {
        id: "ceo-dashboard",
        name: "CEO Bütünsel Bakış Paneli",
        category: "Finans & Muhasebe",
        description: "Şirketin genel finansal ve operasyonel sağlığını tek bir ekranda izleyin.",
        longDescription: "CEO Bütünsel Bakış Paneli, yöneticilere şirketin nabzını 360 derece tutma imkanı sunar. Finansal tablolardan satış performansına, operasyonel verimlilikten pazar trendlerine kadar tüm kritik verileri bir araya getirerek stratejik karar alma süreçlerini destekler. Bu merkezi kontrol paneli, departmanlar arası korelasyonları ve işin genel gidişatını bir bakışta sunar.",
        imageUrl: ceoDashboardImg,
        keyQuestions: [
            "Şirketin genel performansı stratejik hedeflerle uyumlu mu?",
            "En yüksek öncelikli risk alanları nelerdir?",
            "Hangi departmanlar hedeflerini aşıyor, hangileri geride?",
            "Pazar payımız rakiplere göre nasıl değişiyor?",
            "Büyüme stratejimiz sürdürülebilir mi?"
        ],
        keyMetrics: [
            "Toplam Gelir ve Yıllık Büyüme Oranı",
            "Net Kar ve Karlılık Oranları",
            "Nakit Pozisyonu ve Likidite",
            "Müşteri Edinme Maliyeti (CAC) ve Yaşam Boyu Değer (LTV)",
            "Çalışan Başına Gelir ve Verimlilik",
            "Pazar Payı ve Marka Değeri"
        ]
    },
    {
        id: "cash-flow-statement-dashboard",
        name: "Nakit Akışı Yönetim Paneli",
        category: "Finans & Muhasebe",
        description: "İşletmenizin nakit pozisyonunu ve likiditesini proaktif olarak yönetin.",
        longDescription: "Nakit Akışı Paneli, işletmenin belirli bir dönemdeki nakit giriş ve çıkışlarını özetler. Operasyonel, yatırım ve finansman faaliyetlerinden kaynaklanan nakit hareketlerini analiz ederek şirketin likidite sağlığını, borç ödeme kapasitesini ve finansal esnekliğini gösterir. Geleceğe yönelik nakit akışı projeksiyonları oluşturmanıza yardımcı olur.",
        imageUrl: nakitAkisiImg,
        keyQuestions: [
            "Faaliyetlerden nakit akışı pozitif mi?",
            "Yatırım harcamaları planlanan bütçe dahilinde mi?",
            "Finansman ihtiyacı var mı, ne zaman ortaya çıkabilir?",
            "Nakit dönüşüm döngüsü nasıl iyileştirilebilir?",
            "Gelecek 3-6 aylık nakit projeksiyonu nasıl?"
        ],
        keyMetrics: [
            "Operasyonel Nakit Akışı: Ana iş faaliyetlerinden kaynaklanan nakit",
            "Yatırım Nakit Akışı: Varlık alım-satımlarından kaynaklanan nakit",
            "Finansman Nakit Akışı: Borçlanma ve öz sermaye işlemlerinden nakit",
            "Serbest Nakit Akışı: Operasyonel Nakit - Sermaye Harcamaları",
            "Nakit Dönüşüm Döngüsü: DSO + DIO - DPO",
            "Yanma Oranı: Aylık toplam nakit çıkışı"
        ]
    },
    // Satış
    {
        id: "sales-team-performance-dashboard",
        name: "Satış Ekibi Performans Paneli",
        category: "Satış & Pazarlama",
        description: "Satış temsilcilerinizin performansını ve hedeflerini gerçek zamanlı izleyin.",
        longDescription: "Satış ekibinizin bireysel ve takım bazındaki performansını ölçün. Bu pano, satış hedeflerine ulaşma oranlarını, kazanılan anlaşma sayılarını, satış döngüsü uzunluğunu ve aktivite metriklerini analiz ederek koçluk ve motivasyon için değerli içgörüler sunar. Liderlik panoları ile rekabeti teşvik eder.",
        imageUrl: karZararImg,
        keyQuestions: [
            "Satış ekibi hedeflerini karşılıyor mu?",
            "En yüksek performans gösteren temsilciler kimler?",
            "Ortalama satış döngüsü ne kadar ve nasıl kısaltılabilir?",
            "Hangi ürünlerde dönüşüm oranları daha yüksek?",
            "Satış aktivitesi (görüşme, teklif) ile sonuç arasında korelasyon var mı?"
        ],
        keyMetrics: [
            "Temsilci Bazında Satış Hedefi ve Gerçekleşme",
            "Kazanılan Anlaşma Sayısı ve Toplam Değeri",
            "Ortalama Anlaşma Büyüklüğü",
            "Satış Döngüsü Uzunluğu (İlk Temasdan Kapanışa)",
            "Kazanma Oranı: Kazanılan / (Kazanılan + Kaybedilen)",
            "Aktivite Metrikleri: Arama, Toplantı, Demo Sayıları"
        ]
    },
    {
        id: "sales-funnel-dashboard",
        name: "Satış Hunisi (Funnel) Paneli",
        category: "Satış & Pazarlama",
        description: "Müşteri yolculuğunu analiz ederek satış dönüşüm oranlarınızı optimize edin.",
        longDescription: "Satış Hunisi Paneli, potansiyel müşterinin ilk temastan kapanışa kadar olan yolculuğunu görselleştirir. Farkındalık, ilgi, değerlendirme ve karar aşamalarındaki dönüşüm oranlarını analiz ederek darboğazları ve iyileştirme alanlarını ortaya çıkarır. Pazarlama ve satış ekiplerinin uyum içinde çalışmasını sağlar.",
        imageUrl: salesFunnelImg,
        keyQuestions: [
            "Satış hunisinin her aşamasında dönüşüm oranları nasıl?",
            "Hangi aşamada en fazla kayıp yaşanıyor?",
            "Lead kalitesi satış sonuçlarını nasıl etkiliyor?",
            "Farklı kaynaklar (pazarlama kampanyaları) arasında dönüşüm farkı var mı?",
            "Huni optimizasyonu için hangi aksiyonlar alınmalı?"
        ],
        keyMetrics: [
            "Lead Sayısı: Toplam potansiyel müşteri",
            "MQL (Marketing Qualified Lead): Pazarlama nitelikli lead",
            "SQL (Sales Qualified Lead): Satış nitelikli lead",
            "Fırsat (Opportunity): Aktif satış görüşmesi",
            "Kazanılan Müşteri: Kapanmış anlaşma",
            "Aşama Bazında Dönüşüm Oranları",
            "Ortalama Huni Kalış Süresi"
        ]
    },
    // Pazarlama
    {
        id: "marketing-campaign-performance-dashboard",
        name: "Pazarlama Kampanya Paneli",
        category: "Satış & Pazarlama",
        description: "Pazarlama kampanyalarınızın yatırım getirisini (ROI) ölçün ve optimize edin.",
        longDescription: "Dijital pazarlama kampanyalarınızın etkinliğini ölçün. Bu pano, Google Ads, sosyal medya, e-posta pazarlaması gibi farklı kanallardan gelen trafiği, potansiyel müşterileri, dönüşüm oranlarını ve kampanya başına maliyeti analiz ederek pazarlama bütçenizi en verimli şekilde kullanmanıza yardımcı olur.",
        imageUrl: salesFunnelImg,
        keyQuestions: [
            "Hangi pazarlama kanalları en yüksek ROI sağlıyor?",
            "Kampanya bazında müşteri edinme maliyeti (CAC) nedir?",
            "Dönüşüm oranları hedeflere uygun mu?",
            "Organik ve ücretli kanallar arasındaki performans farkı nedir?",
            "Pazarlama bütçesi hangi kanallara yeniden tahsis edilmeli?"
        ],
        keyMetrics: [
            "Kampanya Bazında Harcama ve Gelir",
            "Pazarlama ROI: (Gelir - Maliyet) / Maliyet * 100",
            "Müşteri Edinme Maliyeti (CAC): Toplam Pazarlama Harcaması / Yeni Müşteri",
            "Trafik Kaynakları: Organik, Ücretli, Sosyal, Referans",
            "Dönüşüm Oranı: Müşteri / Ziyaretçi * 100",
            "Lead Başına Maliyet (CPL)",
            "E-posta Açılma ve Tıklama Oranları"
        ]
    },
    // İnsan Kaynakları
    {
        id: "hr-dashboard",
        name: "İK Metrikleri ve Yetenek Yönetimi",
        category: "İnsan Kaynakları",
        description: "İşe alım, çalışan bağlılığı ve personel devir oranı gibi metrikleri izleyin.",
        longDescription: "İnsan kaynakları departmanınızın stratejik bir ortağa dönüşmesini sağlayın. Bu pano, işe alım sürelerinden personel devir oranına (turnover), çalışan bağlılığından eğitim etkinliğine ve çeşitlilik metriklerine kadar birçok kritik İK verisini analiz ederek yetenek yönetimi stratejilerinizi destekler.",
        imageUrl: hrMetricsImg,
        keyQuestions: [
            "Personel devir oranı sektör ortalamasının altında mı?",
            "İşe alım süreci ne kadar sürede tamamlanıyor?",
            "Çalışan memnuniyeti ve bağlılığı nasıl?",
            "Eğitim ve gelişim programlarının etkinliği ölçülebiliyor mu?",
            "Yetenek boşlukları nerede ve nasıl kapatılabilir?"
        ],
        keyMetrics: [
            "Personel Devir Oranı (Turnover): (Ayrılanlar / Ortalama Çalışan) * 100",
            "İşe Alım Süresi: Pozisyon açılışından işe başlamaya kadar geçen süre",
            "Çalışan Memnuniyet Skoru (eNPS)",
            "İşe Alım Maliyeti: Toplam işe alım gideri / İşe alınan kişi",
            "Eğitim Saati Başına Çalışan",
            "Devamsızlık Oranı",
            "Çeşitlilik Metrikleri: Cinsiyet, yaş, departman dağılımı"
        ]
    },
    // Operasyon
    {
        id: "uretim-kontrol-paneli",
        name: "Üretim Kontrol Paneli",
        category: "Üretim & Operasyon",
        description: "Üretim hattı verimliliğini, duruşları ve kalite metriklerini izleyin.",
        longDescription: "Üretim Kontrol Paneli, fabrika ve atölyeler için gerçek zamanlı bir performans göstergesidir. Üretim hacmi, makine duruş süreleri, OEE (Genel Ekipman Etkinliği) ve hurda oranları gibi kritik verileri izleyerek operasyonel verimliliği en üst düzeye çıkarmayı hedefler.",
        imageUrl: uretimKontrolImg,
        keyQuestions: [
            "Üretim hedefleri zamanında karşılanıyor mu?",
            "Hangi makinelerde en fazla duruş yaşanıyor?",
            "OEE (Genel Ekipman Etkinliği) puanı nasıl artırılabilir?",
            "Hurda oranı neden kaynaklanıyor ve nasıl azaltılabilir?",
            "Üretim döngü süresi optimize edilebilir mi?"
        ],
        keyMetrics: [
            "Üretim Çıktısı: Belirli sürede üretilen toplam birim",
            "OEE (Overall Equipment Effectiveness): Kullanılabilirlik * Performans * Kalite",
            "Makine Duruş Süresi: Plansız arıza ve bakım süreleri",
            "İlk Geçiş Verimi (FPY): Yeniden işleme olmadan geçen ürün yüzdesi",
            "Hurda Oranı: İsraf edilen malzeme / Toplam malzeme * 100",
            "Çevrim Süresi: Bir birimin üretimi için gereken süre",
            "Zamanında Teslimat Oranı (OTD)"
        ]
    },
    {
        id: "kalite-kontrol-paneli",
        name: "Kalite Kontrol Paneli",
        category: "Üretim & Operasyon",
        description: "Üretim veya hizmet kalitesini kritik metriklerle takip edin.",
        longDescription: "Kalite Kontrol Paneli, üretim süreçlerindeki veya hizmet sunumundaki kalite seviyesini izlemek için tasarlanmıştır. Hata oranları, müşteri şikayetleri, yeniden işleme maliyetleri ve standartlara uygunluk gibi metrikleri analiz ederek kaliteyi sürekli iyileştirme fırsatları sunar.",
        imageUrl: kaliteKontrolImg,
        keyQuestions: [
            "Ürün veya hizmet kalitesi standartları karşılıyor mu?",
            "Hata oranları kabul edilebilir seviyede mi?",
            "Müşteri şikayetlerinin ana nedenleri nelerdir?",
            "Kalite kontrol maliyetleri nasıl optimize edilebilir?",
            "Düzeltici ve önleyici faaliyetler etkili mi?"
        ],
        keyMetrics: [
            "Hata Oranı: Kusurlu ürün / Toplam ürün * 100",
            "İlk Geçiş Verimi (FPY): Tek seferde kalite kontrolünden geçen yüzde",
            "Müşteri Şikayet Sayısı ve Kategorileri",
            "Yeniden İşleme Maliyeti ve Oranı",
            "Düşük Kalitenin Maliyeti (COPQ): Kalite sorunlarıyla ilgili toplam maliyet",
            "Uygunluk Oranı: Standartları karşılayan ürün yüzdesi",
            "Ortalama Düzeltme Süresi"
        ]
    },
    {
        id: "inventory-management-dashboard",
        name: "Stok ve Tedarik Zinciri Paneli",
        category: "Üretim & Operasyon",
        description: "Stok seviyelerinizi, envanter devir hızını ve tedarik zinciri verimliliğini optimize edin.",
        longDescription: "Stok yönetiminizi optimize ederek maliyetleri düşürün ve müşteri memnuniyetini artırın. Bu pano, stok seviyelerini, envanter devir hızını, stokta kalma sürelerini, talep tahmin doğruluğunu ve tedarik zinciri performansını izler. Atıl stokları ve stoksuz kalma risklerini proaktif olarak belirlemenizi sağlar.",
        imageUrl: karZararImg,
        keyQuestions: [
            "Stok seviyeleri optimal mi, fazla veya eksik stok var mı?",
            "Envanter devir hızı sektör ortalamalarına uygun mu?",
            "Hangi ürünlerde stok tükenmesi riski var?",
            "Tedarikçi performansı beklentileri karşılıyor mu?",
            "Taşıma maliyetleri nasıl azaltılabilir?"
        ],
        keyMetrics: [
            "Stok Devir Hızı: Satılan Malın Maliyeti / Ortalama Stok",
            "Stok Günleri (DIO): (Ortalama Stok / COGS) * 365",
            "Stok Doğruluğu: Fiziksel sayım / Sistem kaydı",
            "Stoksuz Kalma Oranı: Stok tükenmesi / Toplam sipariş",
            "ABC Analizi: A (Yüksek Değer), B (Orta), C (Düşük) ürün dağılımı",
            "Tedarikçi Zamanında Teslimat Oranı",
            "Güvenlik Stoku ve Yeniden Sipariş Noktası"
        ]
    },
    // Restoran
    {
        id: "genel-restoran-kontrol-paneli",
        name: "Genel Restoran Kontrol Paneli",
        category: "Restoran & Kafe",
        description: "Restoranınızın genel performansını tek bir ekrandan yönetin.",
        longDescription: "Genel Restoran Kontrol Paneli, satışlar, maliyetler, müşteri memnuniyeti ve operasyonel verimlilik gibi tüm temel metrikleri bir araya getirir. Yöneticilere restoranın genel sağlığı hakkında hızlı ve kapsamlı bir bakış sunar.",
        imageUrl: genelRestoranImg,
        keyQuestions: [
            "Restoranın genel finansal sağlığı nasıl?",
            "Operasyonel verimlilikte iyileştirme alanları nereler?",
            "Karar alma süreçlerini hızlandıracak temel göstergeler nelerdir?",
            "Müşteri memnuniyetini ve sadakatini etkileyen faktörler nelerdir?"
        ],
        keyMetrics: [
            "Gelir: Toplam satışlar, iadeler ve indirimler",
            "Giderler: Satılan malların maliyeti, işçilik ve işletme giderleri",
            "Kar Marjı",
            "Müşteri Trafiği",
            "Ortalama Hesap Tutarı",
            "Masa Devir Oranı"
        ]
    },
    {
        id: "restoran-satis-gosterge-paneli",
        name: "Restoran Satış Gösterge Paneli",
        category: "Restoran & Kafe",
        description: "Satış trendlerini, ürün performansını ve gelir kanallarını detaylı izleyin.",
        longDescription: "Restoran Satış Gösterge Paneli, cironun nereden geldiğini detaylı bir şekilde ortaya koyar. Saatlik satışlar, menü öğesi popülerliği, online siparişler ve masa başına harcama gibi verilerle satış ve pazarlama stratejilerinizi şekillendirmenize yardımcı olur.",
        imageUrl: restoranSatisImg,
        keyQuestions: [
            "Satış performansı genel olarak nasıl gidiyor?",
            "En çok ve en az satan menü kalemleri hangileri?",
            "Hangi saatler veya günler satışların en yoğun olduğu zamanlar?",
            "Pazarlama ve promosyon stratejilerini optimize etmek için hangi veriler kullanılabilir?",
            "Müşteri kazanım ve elde tutma oranları ne durumda?"
        ],
        keyMetrics: [
            "Toplam Satışlar",
            "Ürün Kategorisine Göre Satışlar",
            "Lokasyona Göre Satışlar",
            "Zaman İçindeki Satış Trendleri",
            "Müşteri Kazanım Oranı",
            "Müşteri Bağlılık Oranı",
            "Ortalama Fiş Tutarı",
            "En Yoğun Satış Dönemleri"
        ]
    },
    {
        id: "restoran-envanter-kontrol-paneli",
        name: "Restoran Envanter Kontrol Paneli",
        category: "Restoran & Kafe",
        description: "Stok seviyelerini, tedarikçi performansını ve fire oranlarını izleyin.",
        longDescription: "Restoran Envanter Kontrol Paneli, mutfak operasyonlarının temel taşı olan stok yönetimini optimize eder. Malzeme seviyeleri, sipariş sıklığı, tedarikçi performansı ve fire oranları gibi metriklerle gıda maliyetlerini (food cost) doğrudan kontrol etmenizi sağlar.",
        imageUrl: restoranEnvanterImg,
        keyQuestions: [
            "Mevcut stok seviyeleri kritik bir düzeyde mi?",
            "Gıda maliyeti (food cost) hedeflenen bütçe dahilinde mi?",
            "Hangi ürünlerin stok devir hızı yavaş ve atıl stok oluşturuyor?",
            "Gıda israfı (fire) oranı ne kadar ve nasıl azaltılabilir?",
            "Stok tükenmesi riski taşıyan en kritik ürünler hangileri?"
        ],
        keyMetrics: [
            "Ürün Bazında Stok Seviyeleri",
            "Stok Maliyetleri",
            "Gıda Maliyeti Yüzdesi",
            "Stok Devir Oranı",
            "Stokta Olmayan Ürün Sayısı",
            "Gıda İsrafı Oranı"
        ]
    },
    {
        id: "restoran-isgucu-gosterge-paneli",
        name: "Restoran İşgücü Gösterge Paneli",
        category: "Restoran & Kafe",
        description: "Personel maliyetlerini, verimliliği ve vardiya planlamasını analiz edin.",
        longDescription: "Restoran İşgücü Gösterge Paneli, işçilik maliyetlerinin ciroya oranını, personel devir hızını ve çalışan başına düşen geliri analiz eder. Vardiya planlamasını optimize ederek ve personel verimliliğini artırarak karlılığı doğrudan etkileyen içgörüler sunar.",
        imageUrl: restoranIsgucuImg,
        keyQuestions: [
            "İşçilik maliyetleri bütçeyi aşıyor mu?",
            "Personel devir (turnover) oranı sektör ortalamasına göre ne durumda?",
            "Vardiya planlaması ne kadar verimli? Yoğun saatlerde yeterli personel var mı?",
            "Çalışan başına düşen gelir nedir ve nasıl artırılabilir?",
"Fazla mesai saatleri kontrol altında mı ve maliyetleri nasıl etkiliyor?"
        ],
        keyMetrics: [
            "İşçilik Maliyetleri",
            "Çalışan Devir Oranı",
            "Çalışan Planlaması ve Vardiya Uyumu",
            "İşgücü Verimliliği (Toplam Satış / Toplam İş Saati)",
            "Fazla Mesai Saatleri"
        ]
    },
    {
        id: "restaurant-operations-dashboard",
        name: "Restoran Operasyon Paneli",
        category: "Restoran & Kafe",
        description: "Günlük satışları, masa devir hızını ve müşteri memnuniyetini anlık takip edin.",
        longDescription: "Restoranınızın günlük nabzını tutun. Bu pano, anlık satışları, masa ve müşteri başına ortalama harcamayı, masa devir hızını ve en popüler menü öğelerini gösterir. Yoğun saatleri belirleyerek personel planlamanızı optimize etmenize ve müşteri geri bildirimlerini takip ederek hizmet kalitesini artırmanıza yardımcı olur.",
        imageUrl: genelRestoranImg,
        keyQuestions: [
            "Günlük satış performansı hedeflere uygun mu?",
            "Masa devir hızı optimal seviyede mi?",
            "En popüler ve karlı menü öğeleri hangileri?",
            "Yoğun saatler ne zaman ve personel planlaması yeterli mi?",
            "Müşteri memnuniyeti nasıl ölçülüyor ve iyileştirilebilir?"
        ],
        keyMetrics: [
            "Günlük Toplam Satış ve Karşılaştırmalı Analiz",
            "Masa Devir Oranı: Devrilen masa / Toplam masa",
            "Ortalama Hesap Tutarı: Toplam satış / Müşteri sayısı",
            "Müşteri Trafiği: Hizmet verilen toplam müşteri",
            "En Çok Satan Menü Öğeleri",
            "Sipariş Hazırlama Süresi (Mutfak Performansı)"
        ]
    },
    {
        id: "restaurant-financial-dashboard",
        name: "Restoran Finansal ve Maliyet Paneli",
        category: "Restoran & Kafe",
        description: "Gıda maliyeti (food cost), işçilik maliyeti ve karlılık oranlarınızı analiz edin.",
        longDescription: "Restoranınızın finansal sağlığını derinlemesine analiz edin. Bu pano, en büyük gider kalemleri olan gıda ve işçilik maliyetlerini kontrol altında tutmanıza yardımcı olur. Menü öğesi bazında karlılık analizi yaparak fiyatlandırma stratejilerinizi optimize etmenizi ve genel karlılığı artırmanızı sağlar.",
        imageUrl: restoranSatisImg,
        keyQuestions: [
            "Gıda maliyeti yüzdesi (food cost) hedef aralıkta mı?",
            "İşçilik maliyetleri ciroya oranı nedir ve kontrol altında mı?",
            "Menü öğeleri bazında karlılık analizi yapılıyor mu?",
            "Prime cost (gıda + işçilik) sürdürülebilir seviyelerde mi?",
            "Fiyatlandırma stratejisi optimize edilebilir mi?"
        ],
        keyMetrics: [
            "Gıda Maliyeti Yüzdesi: (Gıda Maliyeti / Gıda Satışı) * 100",
            "İşçilik Maliyeti Yüzdesi: (İşçilik Maliyeti / Toplam Satış) * 100",
            "Prime Cost: Gıda Maliyeti + İşçilik Maliyeti",
            "Menü Öğesi Bazında Katkı Marjı",
            "Kar Marjı: (Net Kar / Toplam Satış) * 100",
            "İşletme Giderleri Yüzdesi"
        ]
    },
    // Otel
    {
        id: "hotel-management-paneli",
        name: "Otel Yönetim Paneli",
        category: "Otel & Konaklama",
        description: "Doluluk, gelir ve operasyonel metriklerle otelinizi bütünsel yönetin.",
        longDescription: "Otel Yönetim Paneli, doluluk oranları ve gelir metriklerinin (RevPAR, ADR) yanı sıra, personel yönetimi, temizlik operasyonları ve müşteri geri bildirimleri gibi operasyonel detayları da içerir. Bu bütünsel bakış, otel yöneticilerinin daha verimli ve etkili kararlar almasını sağlar.",
        imageUrl: hotelManagementImg,
        keyQuestions: [
            "Doluluk oranları beklentilere uygun mu ve nasıl artırılabilir?",
            "RevPAR (Oda Başına Gelir) performansı rakiplere göre nasıl?",
            "Operasyonel maliyetler kontrol altında mı?",
            "Müşteri memnuniyeti ve tekrar ziyaret oranları nasıl?",
            "Personel verimliliği ve hizmet kalitesi optimize edilebilir mi?"
        ],
        keyMetrics: [
            "Doluluk Oranı: Dolu Oda / Toplam Oda * 100",
            "ADR (Average Daily Rate): Toplam Oda Geliri / Satılan Oda",
            "RevPAR (Revenue Per Available Room): Oda Geliri / Toplam Oda",
            "Ortalama Konaklama Süresi",
            "Online Değerlendirme Puanı (TripAdvisor, Booking.com vb.)",
            "Doğrudan Rezervasyon vs OTA Oranı",
            "Oda Temizlik ve Hazırlama Süresi"
        ]
    },
    {
        id: "hotel-dashboard",
        name: "Otel Doluluk ve Gelir Paneli",
        category: "Otel & Konaklama",
        description: "Oda doluluk oranlarını (ADR, RevPAR) ve gelir kanallarını anlık izleyin.",
        longDescription: "Otelinizin performansını kritik metriklerle yönetin. Bu pano, ortalama günlük oda fiyatı (ADR), oda başına düşen gelir (RevPAR), doluluk oranı ve gelir kaynaklarını (oda, restoran, etkinlikler) analiz eder. Rezervasyon kanallarını ve müşteri segmentasyonunu izleyerek gelir yönetimi stratejilerinizi optimize etmenizi sağlar.",
        imageUrl: hotelManagementImg,
        keyQuestions: [
            "Gelir yönetimi stratejisi optimal fiyatlandırmayı sağlıyor mu?",
            "Hangi rezervasyon kanalları en karlı?",
            "Sezonluk trendlere göre kapasite yönetimi nasıl yapılmalı?",
            "Ek gelir kaynakları (F&B, spa, etkinlikler) yeterince kullanılıyor mu?",
            "Müşteri segmentasyonuna göre fiyatlandırma optimize edilebilir mi?"
        ],
        keyMetrics: [
            "Toplam Gelir ve Gelir Dağılımı (Oda, F&B, Diğer)",
            "ADR Trendi: Günlük, haftalık, aylık",
            "RevPAR Benchmark: Rakip oteller ve pazar ortalaması",
            "Rezervasyon Kaynakları: Direkt, OTA, Kurumsal",
            "İptal Oranı ve No-Show Oranı",
            "Müşteri Segmenti Bazında Harcama Analizi"
        ]
    },
    // Otomotiv
    {
        id: "otomotiv-dashboard-paneli",
        name: "Otomotiv Dashboard Paneli",
        category: "Otomotiv",
        description: "Satış, servis ve envanter verilerini bir araya getiren kapsamlı panel.",
        longDescription: "Otomotiv Dashboard Paneli, satış adetleri, servis gelirleri ve envanterdeki araçların durumu gibi farklı veri noktalarını birleştirir. Bayi yöneticilerine, işletmenin tüm yönlerini kapsayan stratejik bir bakış açısı sunar.",
        imageUrl: otomotivDashboardImg,
        keyQuestions: [
            "Araç satışları hedeflere uygun mu ve hangi modeller öne çıkıyor?",
            "Servis departmanı ne kadar karlı ve müşteri sadakati nasıl?",
            "Envanter devir hızı optimal mi, stokta bekleyen araçlar var mı?",
            "Yedek parça satışları ve karlılığı nasıl?",
            "Müşteri yaşam boyu değeri (LTV) nasıl artırılabilir?"
        ],
        keyMetrics: [
            "Yeni ve İkinci El Araç Satış Adetleri",
            "Satış Kanalı Bazında Performans (Showroom, Online, Kurumsal)",
            "Servis Departmanı Geliri ve Kar Marjı",
            "Envanter Yaşı ve Devir Hızı",
            "Müşteri Memnuniyeti (CSI) ve Servis Memnuniyeti (SSI)",
            "Test Sürüşü Dönüşüm Oranı",
            "Finansman ve Sigorta Penetrasyonu (F&I)"
        ]
    },
    {
        id: "automotive-dashboard",
        name: "Otomotiv Satış ve Servis Paneli",
        category: "Otomotiv",
        description: "Araç satışlarını, servis randevularını ve müşteri yaşam boyu değerini yönetin.",
        longDescription: "Otomotiv bayinizin satış ve servis operasyonlarını tek bir merkezden yönetin. Bu pano, yeni ve ikinci el araç satışlarını, envanter devir hızını, servis departmanı verimliliğini ve müşteri başına düşen geliri izler. Satış sonrası hizmetlerin ve müşteri sadakatinin karlılığa etkisini analiz etmenize olanak tanır.",
        imageUrl: automotiveImg,
        keyQuestions: [
            "Satış ve servis departmanları arasındaki sinerji yeterli mi?",
            "Servis randevu doluluk oranı ve verimlilik nasıl?",
            "Tekrar eden müşteri oranı nasıl artırılabilir?",
            "Garanti dışı işler hangi oranda ve ne kadar karlı?",
            "Dijital kanallardan gelen satış ve servis talepleri nasıl yönetiliyor?"
        ],
        keyMetrics: [
            "Satış Funnel: Test Sürüşü → Teklif → Kapanış",
            "Servis Randevu Doluluk Oranı",
            "Teknisyen Verimliliği: Faturalanabilir Saat / Toplam Saat",
            "Müşteri Elde Tutma Oranı (Retention)",
            "Ortalama Servis İşi Değeri",
            "Kampanya ROI'si",
            "Müşteri Yaşam Boyu Değeri (LTV)"
        ]
    },
    // Tarım
    {
        id: "agriculture-dashboard",
        name: "Tarım Operasyonları ve Verimlilik Paneli",
        category: "Tarım",
        description: "Mahsul verimliliğini, ekipman kullanımını ve operasyonel maliyetleri izleyin.",
        longDescription: "Tarımsal işletmenizin verimliliğini ve karlılığını artırın. Bu pano, dönüm başına mahsul verimini, gübre ve su gibi kaynakların kullanım oranlarını, ekipmanların çalışma sürelerini ve bakım maliyetlerini analiz eder. Hava durumu ve pazar fiyatları gibi dış faktörleri entegre ederek hasat ve satış stratejilerinizi optimize etmenize yardımcı olur.",
        imageUrl: agricultureImg,
        keyQuestions: [
            "Dönüm başına mahsul verimi geçmiş sezonlara göre nasıl?",
            "Girdi maliyetleri (gübre, tohum, su) optimize edilebilir mi?",
            "Ekipman kullanımı ve bakım maliyetleri nasıl yönetiliyor?",
            "Hasat zamanlaması ve pazar fiyatları göz önüne alındığında satış stratejisi nedir?",
            "İklim ve hava koşullarının üretim üzerindeki etkisi nasıl?",
        ],
        keyMetrics: [
            "Dönüm Başına Verim: Kg veya Ton / Dönüm",
            "Toplam Üretim Maliyeti: Tohum + Gübre + İşçilik + Ekipman",
            "Birim Başına Maliyet: Toplam Maliyet / Toplam Üretim",
            "Ekipman Kullanım Oranı ve Arıza Süresi",
            "Su ve Gübre Kullanım Verimliliği",
            "Hasat Kaybı Yüzdesi",
            "Pazar Fiyatı Trendleri ve Satış Karlılığı"
        ]
    },
    // E-Ticaret
    {
        id: "ecommerce-kpi-dashboard",
        name: "E-Ticaret KPI Paneli",
        category: "E-Ticaret & Retail",
        description: "Dönüşüm oranı, ortalama sepet tutarı ve müşteri yaşam boyu değerini izleyin.",
        longDescription: "E-ticaret sitenizin performansını A'dan Z'ye analiz edin. Bu pano, ziyaretçi trafiğinden terk edilmiş sepetlere, dönüşüm oranlarından müşteri yaşam boyu değerine kadar tüm kritik metrikleri bir araya getirir. Pazarlama kampanyalarınızın etkinliğini ölçmenize ve kullanıcı deneyimini iyileştirmenize olanak tanır.",
        imageUrl: ecommerceKpiImg,
        keyQuestions: [
            "Dönüşüm oranı sektör ortalamasına göre nasıl?",
            "Sepet terk edilme oranı neden yüksek ve nasıl azaltılabilir?",
            "Müşteri edinme maliyeti (CAC) ile yaşam boyu değer (LTV) oranı sağlıklı mı?",
            "En çok hangi ürünler satılıyor ve marj analizi nasıl?",
            "Mobil ve desktop dönüşüm oranları arasındaki fark nedir?"
        ],
        keyMetrics: [
            "Toplam Ziyaretçi ve Trafik Kaynakları",
            "Dönüşüm Oranı: Sipariş / Ziyaretçi * 100",
            "Ortalama Sipariş Değeri (AOV): Toplam Gelir / Sipariş Sayısı",
            "Sepet Terk Edilme Oranı: Terk Edilen / Başlatılan Sepet * 100",
            "Müşteri Yaşam Boyu Değeri (LTV)",
            "Müşteri Edinme Maliyeti (CAC)",
            "Tekrar Satın Alma Oranı",
            "Net Promoter Score (NPS)"
        ]
    },
    // Yeni Profesyonel Dashboard'lar
    {
        id: "oee-operations-dashboard",
        name: "OEE (Ekipman Etkinliği) Paneli",
        category: "Üretim & Operasyon",
        description: "Genel ekipman etkinliğini (OEE) izleyerek üretim verimliliğini artırın.",
        longDescription: "OEE Dashboard, üretim hatlarınızın genel etkinliğini ölçer. Kullanılabilirlik, performans ve kalite metriklerini birleştirerek ekipman verimliliğini optimize etmenize yardımcı olur. Planlı ve plansız duruşları, hız kayıplarını ve kalite sorunlarını detaylı analiz ederek sürekli iyileştirme fırsatları sunar.",
        imageUrl: uretimKontrolImg,
        keyQuestions: [
            "OEE puanımız dünya standartlarında mı?",
            "Hangi ekipmanlarda en fazla kayıp yaşanıyor?",
            "Kullanılabilirlik, performans ve kalite faktörlerinden hangisi en çok etkileniyor?",
            "Planlı duruşlar optimize edilebilir mi?",
            "Ekipman bakım stratejisi nasıl iyileştirilebilir?"
        ],
        keyMetrics: [
            "OEE (Overall Equipment Effectiveness): Kullanılabilirlik × Performans × Kalite",
            "Kullanılabilirlik: (Çalışma Süresi / Planlı Üretim Süresi) × 100",
            "Performans: (Fiili Üretim / Teorik Üretim) × 100",
            "Kalite: (İyi Ürün / Toplam Ürün) × 100",
            "MTBF (Mean Time Between Failures): Arızalar arası ortalama süre",
            "MTTR (Mean Time To Repair): Ortalama onarım süresi"
        ]
    },
    {
        id: "hotel-revenue-management",
        name: "Otel Gelir Yönetimi ve RevPAR",
        category: "Otel & Konaklama",
        description: "RevPAR, ADR ve doluluk oranlarını optimize ederek gelir maksimizasyonu sağlayın.",
        longDescription: "Otel Gelir Yönetimi Paneli, dinamik fiyatlandırma stratejileri için kritik metrikleri sunar. RevPAR (Revenue Per Available Room) ve ADR (Average Daily Rate) trendlerini analiz ederek, sezonluk talep değişimlerine göre optimal fiyatlandırma yapmanızı sağlar. Rezervasyon kanalları, müşteri segmentleri ve rakip analizi ile gelir optimizasyonu için stratejik içgörüler sunar.",
        imageUrl: hotelManagementImg,
        keyQuestions: [
            "RevPAR performansımız pazar ortalamasına göre nasıl?",
            "Dinamik fiyatlandırma stratejisi doğru çalışıyor mu?",
            "Hangi rezervasyon kanalları en yüksek karlılığı sağlıyor?",
            "Sezonluk trendlere göre kapasite planlaması nasıl yapılmalı?",
            "Müşteri segmentlerine göre fiyatlama optimize edilebilir mi?"
        ],
        keyMetrics: [
            "RevPAR: Toplam Oda Geliri / Toplam Oda Sayısı",
            "ADR: Toplam Oda Geliri / Satılan Oda Sayısı",
            "Doluluk Oranı: (Satılan Oda / Toplam Oda) × 100",
            "RevPOR: Revenue Per Occupied Room",
            "Rezervasyon Kaynağı Analizi: Direct, OTA, Kurumsal",
            "Ortalama Konaklama Süresi (LOS)"
        ]
    },
    {
        id: "hotel-guest-experience",
        name: "Otel Misafir Deneyimi Paneli",
        category: "Otel & Konaklama",
        description: "Misafir memnuniyeti, geri bildirimler ve hizmet kalitesini ölçün.",
        longDescription: "Misafir Deneyimi Paneli, otel operasyonlarının kalitesini müşteri gözüyle değerlendirir. Online değerlendirmeler, anket sonuçları, şikayet analizi ve tekrar ziyaret oranları gibi metriklerle hizmet kalitesini sürekli iyileştirmenize yardımcı olur. Misafir geri bildirimlerini departman bazında analiz ederek sorunları hızla tespit etmenizi sağlar.",
        imageUrl: hotelImg,
        keyQuestions: [
            "Misafir memnuniyet skoru hedeflerimize uygun mu?",
            "Online değerlendirme puanlarımız rakiplere göre nasıl?",
            "En çok hangi konularda şikayet alınıyor?",
            "Tekrar ziyaret oranı nasıl artırılabilir?",
            "Hangi departmanlar hizmet kalitesinde öne çıkıyor veya geride kalıyor?"
        ],
        keyMetrics: [
            "Net Promoter Score (NPS)",
            "Ortalama Online Değerlendirme Puanı",
            "Misafir Memnuniyet Skoru (CSAT)",
            "Şikayet Sayısı ve Kategorileri",
            "Tekrar Ziyaret Oranı",
            "Check-in/Check-out Süresi",
            "Oda Temizlik Puanı"
        ]
    },
    {
        id: "ecommerce-order-analysis",
        name: "E-Ticaret Sipariş Analizi",
        category: "E-Ticaret & Retail",
        description: "Sipariş hacmi, teslimat performansı ve iade oranlarını detaylı analiz edin.",
        longDescription: "Sipariş Analizi Paneli, e-ticaret operasyonlarınızın kalitesini ölçer. Sipariş hacmi trendleri, teslimat süreleri, kargo performansı ve iade oranları gibi kritik metrikleri izleyerek müşteri deneyimini iyileştirmenize yardımcı olur. Bölge bazında performans analizi ve sipariş durumu takibi ile operasyonel verimliliği artırır.",
        imageUrl: ecommerceKpiImg,
        keyQuestions: [
            "Sipariş hacmi trendleri nasıl?",
            "Teslimat süreleri hedeflenen SLA'lara uygun mu?",
            "İade oranı neden kaynaklanıyor ve nasıl azaltılabilir?",
            "Hangi kargo firmaları en iyi performansı gösteriyor?",
            "Sipariş iptal oranı nasıl düşürülebilir?"
        ],
        keyMetrics: [
            "Günlük/Haftalık/Aylık Sipariş Hacmi",
            "Ortalama Teslimat Süresi",
            "Zamanında Teslimat Oranı (OTD)",
            "İade Oranı: İade Edilen / Toplam Sipariş × 100",
            "İptal Oranı",
            "Bölge Bazında Sipariş Dağılımı",
            "Kargo Performans Analizi"
        ]
    },
    {
        id: "ecommerce-product-performance",
        name: "E-Ticaret Ürün Performansı",
        category: "E-Ticaret & Retail",
        description: "En çok satan ürünler, stok durumu ve ürün karlılığını analiz edin.",
        longDescription: "Ürün Performans Paneli, e-ticaret kataloğunuzdaki her ürünün başarısını ölçer. Satış hacmi, görüntülenme/satış dönüşümü, stok devir hızı ve ürün bazında karlılık analizi ile envanter yönetimini optimize ederek pazarlama stratejilerinizi şekillendirmenize yardımcı olur. ABC analizi ile en değerli ürünleri belirlemenizi sağlar.",
        imageUrl: inventoryManagementImg,
        keyQuestions: [
            "En çok satan ve en karlı ürünler hangileri?",
            "Hangi ürünlerde stok tükenmesi riski var?",
            "Düşük performanslı ürünler için aksiyon alınmalı mı?",
            "Ürün görüntülenme/satış dönüşüm oranları nasıl?",
            "Kategori bazında performans nasıl?"
        ],
        keyMetrics: [
            "Ürün Bazında Satış Hacmi ve Gelir",
            "Ürün Görüntülenme/Satış Dönüşümü",
            "Stok Devir Hızı",
            "Ürün Karlılık Analizi",
            "ABC Analizi (Yüksek, Orta, Düşük Değer)",
            "Ortalama Ürün Değerlendirme Puanı",
            "Stok Durumu ve Tükenmek Üzere Olan Ürünler"
        ]
    },
    {
        id: "hr-performance-management",
        name: "İK Performans Yönetimi",
        category: "İnsan Kaynakları",
        description: "Çalışan performansını, hedef gerçekleşmesini ve kariyer gelişimini takip edin.",
        longDescription: "Performans Yönetimi Paneli, çalışanların bireysel ve takım bazındaki başarısını ölçer. Hedef belirleme, düzenli geri bildirim, performans değerlendirme döngüleri ve kariyer gelişim planları gibi İK süreçlerini destekler. Yüksek performanslı çalışanları tanımlayarak yetenek yönetimi stratejilerinizi güçlendirir.",
        imageUrl: hrMetricsImg,
        keyQuestions: [
            "Çalışanların hedef gerçekleşme oranları nasıl?",
            "Performans değerlendirme süreçleri düzenli yürütülüyor mu?",
            "Yüksek performanslı çalışanlar kimler ve nasıl elde tutuluyor?",
            "Düşük performans alanları nerede ve nasıl desteklenebilir?",
            "Kariyer gelişim planları etkin kullanılıyor mu?"
        ],
        keyMetrics: [
            "Ortalama Performans Puanı",
            "Hedef Gerçekleşme Oranı",
            "360 Derece Geri Bildirim Skorları",
            "Performans Dağılımı (Yüksek, Orta, Düşük)",
            "Terfi Oranı",
            "Eğitim ve Gelişim Katılım Oranı",
            "Performans Değerlendirme Tamamlanma Oranı"
        ]
    },
    {
        id: "automotive-sales-dashboard",
        name: "Otomotiv Satış Performansı",
        category: "Otomotiv",
        description: "Araç satışları, test sürüşü dönüşümü ve finansman penetrasyonunu analiz edin.",
        longDescription: "Otomotiv Satış Dashboard'u, bayi satış operasyonlarının tüm yönlerini kapsar. Yeni ve ikinci el araç satışları, test sürüşü dönüşüm oranları, finansman ve sigorta penetrasyonu, envanter yaşlandırma ve satış ekibi performansı gibi kritik metrikleri izleyerek satış verimliliğini artırmanıza yardımcı olur.",
        imageUrl: automotiveImg,
        keyQuestions: [
            "Satış hedefleri karşılanıyor mu?",
            "Test sürüşü dönüşüm oranı nasıl artırılabilir?",
            "Finansman ve sigorta penetrasyonu yeterli mi?",
            "Envanter yaşlanması kontrol altında mı?",
            "Hangi satış danışmanları en yüksek performansı gösteriyor?"
        ],
        keyMetrics: [
            "Aylık Satış Adedi (Yeni + İkinci El)",
            "Test Sürüşü Dönüşüm Oranı",
            "Ortalama Satış Döngüsü Süresi",
            "Finansman Penetrasyon Oranı",
            "Sigorta Penetrasyon Oranı (F&I)",
            "Envanter Yaşı ve Devir Hızı",
            "Satış Danışmanı Performansı"
        ]
    },
    {
        id: "automotive-service-performance",
        name: "Otomotiv Servis Performansı",
        category: "Otomotiv",
        description: "Servis randevuları, teknisyen verimliliği ve müşteri memnuniyetini yönetin.",
        longDescription: "Servis Performans Paneli, yetkili servis operasyonlarınızın kalitesini ve karlılığını ölçer. Randevu doluluk oranı, teknisyen verimliliği, ortalama iş değeri, parça satışları ve müşteri memnuniyeti gibi metriklerle servis departmanınızı optimize ederek hem müşteri sadakatini hem de karlılığı artırmanıza yardımcı olur.",
        imageUrl: otomotivDashboardImg,
        keyQuestions: [
            "Servis randevu doluluk oranı optimal mi?",
            "Teknisyen verimliliği hedeflere uygun mu?",
            "Garanti dışı işlerin oranı nasıl?",
            "Müşteri elde tutma oranı nasıl artırılabilir?",
            "Parça satış karlılığı yeterli mi?"
        ],
        keyMetrics: [
            "Randevu Doluluk Oranı",
            "Teknisyen Verimliliği: Faturalanabilir Saat / Toplam Saat",
            "Ortalama Servis İşi Değeri",
            "Garanti / Garanti Dışı İş Oranı",
            "Müşteri Elde Tutma Oranı",
            "Servis Memnuniyet Skoru (SSI)",
            "Parça Satış Geliri ve Karlılığı"
        ]
    },
    {
        id: "sales-team-dashboard",
        name: "Satış Ekibi Performans Takibi",
        category: "Satış & Pazarlama",
        description: "Satış temsilcilerinin hedeflerini, aktivitelerini ve başarı oranlarını izleyin.",
        longDescription: "Satış Ekibi Dashboard'u, her temsilcinin bireysel performansını detaylı olarak analiz eder. Hedef gerçekleşme, aktivite metrikleri (arama, toplantı, demo), kazanma oranı ve ortalama anlaşma büyüklüğü gibi verilerle satış yöneticilerinin koçluk yapmasını ve motivasyonu artırmasını sağlar. Leaderboard ile rekabetçi ortam yaratır.",
        imageUrl: salesPerformanceImg,
        keyQuestions: [
            "Her temsilcinin hedef gerçekleşme durumu nasıl?",
            "Hangi temsilciler en yüksek kazanma oranına sahip?",
            "Aktivite sayısı ile başarı arasında korelasyon var mı?",
            "Ortalama anlaşma büyüklüğü nasıl artırılabilir?",
            "Satış döngüsü süreleri temsilciler arasında nasıl değişiyor?"
        ],
        keyMetrics: [
            "Temsilci Bazında Hedef ve Gerçekleşme",
            "Kazanma Oranı (Win Rate)",
            "Ortalama Anlaşma Büyüklüğü",
            "Satış Döngüsü Uzunluğu",
            "Aktivite Metrikleri: Arama, E-posta, Toplantı",
            "Pipeline Değeri",
            "Aylık/Yıllık Satış Büyümesi"
        ]
    },
    {
        id: "marketing-campaign-analytics",
        name: "Pazarlama Kampanya Analitikleri",
        category: "Satış & Pazarlama",
        description: "Dijital pazarlama kampanyalarının ROI'sini, dönüşümünü ve maliyetini ölçün.",
        longDescription: "Kampanya Analitikleri Paneli, pazarlama yatırımlarınızın getirisini ölçer. Google Ads, Meta Ads, e-posta pazarlaması ve diğer dijital kanallardan gelen performansı analiz ederek hangi kampanyaların en yüksek ROI sağladığını gösterir. Müşteri edinme maliyeti, dönüşüm oranı ve kanal performansı ile bütçe optimizasyonu yapmanızı sağlar.",
        imageUrl: marketingCampaignImg,
        keyQuestions: [
            "Hangi pazarlama kanalları en yüksek ROI sağlıyor?",
            "Kampanya bazında müşteri edinme maliyeti (CAC) nedir?",
            "Dönüşüm hunisinde darboğazlar nerede?",
            "Organik ve ücretli kanalların performans farkı nedir?",
            "Pazarlama bütçesi nasıl yeniden tahsis edilmeli?"
        ],
        keyMetrics: [
            "Kampanya ROI: (Gelir - Maliyet) / Maliyet × 100",
            "Müşteri Edinme Maliyeti (CAC)",
            "Kanal Bazında Dönüşüm Oranı",
            "Tıklama Başına Maliyet (CPC)",
            "Lead Başına Maliyet (CPL)",
            "E-posta Açılma ve Tıklama Oranları",
            "Sosyal Medya Engagement Oranı"
        ]
    },
    {
        id: "sales-funnel-analytics",
        name: "Satış Hunisi Analitikleri",
        category: "Satış & Pazarlama",
        description: "Lead'den müşteriye dönüşüm sürecini aşama aşama analiz edin.",
        longDescription: "Satış Hunisi Analitikleri, potansiyel müşterinin ilk temasından kapanışa kadar olan yolculuğunu detaylı görselleştirir. Her aşamadaki dönüşüm oranlarını, darboğazları ve kayıpları analiz ederek satış ve pazarlama ekiplerinin stratejilerini optimize etmesine yardımcı olur. Lead kalitesi, aşama süreleri ve dönüşüm trendleri ile huni performansını sürekli iyileştirmenizi sağlar.",
        imageUrl: salesFunnelImg,
        keyQuestions: [
            "Satış hunisinin hangi aşamasında en fazla kayıp yaşanıyor?",
            "Lead kalitesi satış sonuçlarını nasıl etkiliyor?",
            "Her aşamadaki ortalama kalış süresi nedir?",
            "Farklı lead kaynakları arasında dönüşüm farkı var mı?",
            "Huni optimizasyonu için hangi aksiyonlar alınmalı?"
        ],
        keyMetrics: [
            "Aşama Bazında Lead Sayısı",
            "Aşama Dönüşüm Oranları",
            "Ortalama Huni Kalış Süresi",
            "Lead Kaynağı Bazında Performans",
            "Huni Kayıp Analizi",
            "Genel Dönüşüm Oranı (Lead → Müşteri)",
            "Ortalama Anlaşma Değeri"
        ]
    },
    {
        id: "agriculture-harvest-management",
        name: "Tarım Hasat Yönetimi",
        category: "Tarım",
        description: "Hasat planlaması, verim tahminleri ve kalite kontrolünü yönetin.",
        longDescription: "Hasat Yönetimi Paneli, tarımsal üretimin en kritik aşamasını optimize eder. Hasat zamanlaması, tahmini verim, ekipman planlaması, işçilik ihtiyacı ve kalite kontrol metrikleri ile hasadın verimli ve zamanında tamamlanmasını sağlar. Hava durumu entegrasyonu ve pazar fiyat trendleri ile en optimal hasat stratejisini belirlemenize yardımcı olur.",
        imageUrl: agricultureImg,
        keyQuestions: [
            "Hasat zamanlaması optimal mi?",
            "Tahmini verim gerçekleşmelerle tutarlı mı?",
            "Ekipman ve işçilik kapasitesi yeterli mi?",
            "Hasat kaybı oranı nasıl azaltılabilir?",
            "Pazar fiyatları göz önüne alındığında en iyi satış zamanı ne zaman?"
        ],
        keyMetrics: [
            "Tahmini vs Gerçekleşen Verim",
            "Hasat İlerleme Yüzdesi",
            "Ekipman Kullanım ve Verimlilik",
            "İşçilik Maliyeti ve Verimlilik",
            "Hasat Kaybı Oranı",
            "Ürün Kalite Dağılımı",
            "Pazar Fiyat Trendleri ve Karlılık Projeksiyonu"
        ]
    },
    {
        id: "manufacturing-profitability",
        name: "Üretim Kârlılığı Analizi",
        category: "Üretim & Operasyon",
        description: "Ürün hattı, vardiya ve dönem bazında kârlılık takibi ve karar kartları.",
        longDescription: "Üretim Kârlılığı Dashboard'u, üretim yapan KOBİ'lerin ürün, hat ve vardiya bazında kârlılığını görselleştirir. Hangi ürünlerin kârlı, hangi hatların zarar ettiğini net bir şekilde gösterir. Karar kartları ile 'Hat C zararda: -₺8K/ay' gibi aksiyon gerektiren durumları vurgular. A4 boyutunda yazdırılabilir rapor formatındadır.",
        imageUrl: uretimKontrolImg,
        keyQuestions: [
            "Hangi üretim hattı en kârlı?",
            "Vardiya bazında kârlılık farkı nedir?",
            "Zararda olan ürünler tespit edilebiliyor mu?",
            "Kâr marjı hedefin üstünde mi?",
            "Hangi hatta kapasite artışı yapılmalı?"
        ],
        keyMetrics: [
            "Aylık Net Kâr (₺)",
            "Kâr Marjı (%)",
            "Üretim Hattı Bazında Kâr",
            "Vardiya Dağılımı",
            "Ciro ve Kâr Trendi",
            "En Kârlı / Zararlı Hat",
            "Karar Kartları (Action Items)"
        ]
    },
    {
        id: "manufacturing-scrap-analysis",
        name: "Fire & Verimsizlik Analizi",
        category: "Üretim & Operasyon",
        description: "Fire oranları, TL etkisi ve trend analizi ile verimsizliği görünür kılın.",
        longDescription: "Fire & Verimsizlik Dashboard'u, üretimde oluşan fire oranlarını % ve TL bazında görselleştirir. 'Fire oranı ↑: Bu ay -₺19,800 kayıp' gibi karar kartları ile fire'nin gerçek maliyetini gösterir. Ürün bazında fire analizi, trend takibi ve yıllık maliyet projeksiyonları ile fire'yi azaltma aksiyonlarını destekler.",
        imageUrl: kaliteKontrolImg,
        keyQuestions: [
            "Fire oranı hedefin üstünde mi?",
            "Hangi ürünlerde fire en yüksek?",
            "Fire maliyeti ne kadar?",
            "Fire trendi artış gösteriyor mu?",
            "Fire %1 düşürülürse yıllık tasarruf ne olur?"
        ],
        keyMetrics: [
            "Fire Oranı (%)",
            "Aylık Fire Maliyeti (₺)",
            "Ürün Bazında Fire",
            "Fire Trend Analizi",
            "Yıllık Fire Tahmin",
            "En Yüksek Fire'li Ürün",
            "Karar Kartları"
        ]
    },
    {
        id: "manufacturing-capacity-utilization",
        name: "Kapasite Kullanımı & Maliyet",
        category: "Üretim & Operasyon",
        description: "Kapasite kullanımı, boş kapasite maliyeti ve kâr fırsatları.",
        longDescription: "Kapasite Dashboard'u, makine ve hat bazında kapasite kullanımını gösterir. Boş kalan kapasitenin TL maliyetini hesaplar: 'Boş kapasite ↑: Aylık fırsat maliyeti ₺32K'. Kapasite %80'e çıkarılırsa potansiyel kâr artışını simüle eder. Makine bazında kullanım analizi ile atıl varlıkları tespit edebilirsiniz.",
        imageUrl: uretimKontrolImg,
        keyQuestions: [
            "Kapasite kullanımı hedefin altında mı?",
            "Boş kapasitenin maliyeti ne kadar?",
            "Hangi makine atıl durumdadır?",
            "Kapasite artışı kâr etkisi nedir?",
            "Yeni sipariş alınabilir mi?"
        ],
        keyMetrics: [
            "Kapasite Kullanım Oranı (%)",
            "Boş Kapasite Maliyeti (₺)",
            "Makine Bazında Kullanım",
            "Potansiyel Kâr (Hedef Kullanımda)",
            "Kullanım Trend Analizi",
            "En Düşük Kullanımlı Makine",
            "Karar Kartları"
        ]
    },
    {
        id: "manufacturing-inventory-working-capital",
        name: "Stok & Çalışma Sermayesi",
        category: "Üretim & Operasyon",
        description: "Stok devir hızı, bağlı nakit ve sipariş noktaları yönetimi.",
        longDescription: "Stok Dashboard'u, üretim KOBİ'lerinin en büyük sorunlarından biri olan 'stokta nakit' problemini görünür kılar. 'Stok gün sayısı ↑: Nakit bağlama +₺75K' gibi karar kartları ile stok optimizasyonunu destekler. Depo bazında stok analizi, devir hızı, sipariş noktaları ve yavaş hareket eden ürünleri gösterir.",
        imageUrl: inventoryManagementImg,
        keyQuestions: [
            "Stok gün sayısı hedefin üstünde mi?",
            "Stokta ne kadar nakit bağlı?",
            "Hangi depoda aşırı stok var?",
            "Stok devir hızı sektör ortalamasıyla nasıl?",
            "Stok azaltılırsa ne kadar nakit serbest kalır?"
        ],
        keyMetrics: [
            "Stok Gün Sayısı",
            "Bağlı Nakit (₺)",
            "Stok Devir Hızı (x/yıl)",
            "Depo Bazında Stok",
            "Potansiyel Serbest Nakit",
            "Yavaş Hareket Eden Ürünler",
            "Karar Kartları"
        ]
    }
]
