
// Tamamen statik yollar kullanarak asset'leri bağlıyoruz.
// Bu yöntem, asset'lerin Vite tarafından işlenmesini atlar ve doğrudan 'public' klasöründen sunulmasını sağlar.

export interface Dashboard {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  imageUrl: string; 
}

export const dashboardCategories = [
  "Tümü",
  "Finans",
  "Satış",
  "Pazarlama",
  "İK",
  "Operasyon",
  "Proje Yönetimi",
  "Sektörel",
];

export const dashboards: Dashboard[] = [
    // Finans
    {
        id: "ceo-dashboard",
        name: "CEO Bütünsel Bakış Paneli",
        category: "Finans",
        description: "Şirketin genel finansal ve operasyonel sağlığını tek bir ekranda izleyin.",
        longDescription: "CEO Paneli, yöneticilere şirketin nabzını tutma imkanı sunar.",
        // KLONLAMA SALDIRISI: Navbar'da çalışan logo yolu buraya kopyalandı.
        imageUrl: "/finops-logo-dark.png",
    },
    {
        id: "profit-loss",
        name: "Kar ve Zarar Analizi",
        category: "Finans",
        description: "Gelir tablolarınızı dinamik olarak analiz edin.",
        longDescription: "Bu pano, şirketin belirli bir dönemdeki finansal performansını detaylı bir şekilde analiz eder.",
        imageUrl: "/public/finops-ig-Bütçe-light.png",
    },
    {
        id: "cash-flow",
        name: "Nakit Akışı Performansı",
        category: "Finans",
        description: "Nakit giriş ve çıkışlarınızı izleyerek, gelecekteki nakit pozisyonunuzu tahmin edin.",
        longDescription: "İşletmenin can damarı olan nakit akışını yönetin.",
        imageUrl: "/public/finops-ig-Bütçe.png",
    },
    // Satış
    {
        id: "sales-team-performance",
        name: "Satış Ekibi Performans Paneli",
        category: "Satış",
        description: "Satış temsilcilerinizin performansını gerçek zamanlı olarak takip edin.",
        longDescription: "Satış ekibinizin bireysel ve takım bazındaki performansını ölçün.",
        imageUrl: "/public/finops-ig-Haberler-light.png",
    },
    {
        id: "sales-kpi",
        name: "Satış KPI ve Hedef Takibi",
        category: "Satış",
        description: "Temel KPI'ları izleyerek satış stratejinizi optimize edin.",
        longDescription: "Satış huninizin (funnel) her aşamasını analiz edin.",
        imageUrl: "/public/finops-ig-Haberler.png",
    },
    // Pazarlama
    {
        id: "marketing-campaign",
        name: "Pazarlama Kampanya Paneli",
        category: "Pazarlama",
        description: "Pazarlama kampanyalarınızın yatırım getirisini (ROI) analiz edin.",
        longDescription: "Dijital pazarlama kampanyalarınızın etkinliğini ölçün.",
        imageUrl: "/public/finops-kartvizit-dark.png",
    },
    // İK
    {
        id: "hr-metrics",
        name: "İK Metrikleri ve Personel Analizi",
        category: "İK",
        description: "İşe alım ve personel devir oranı gibi metrikleri izleyin.",
        longDescription: "İnsan kaynakları departmanınızın stratejik bir ortağa dönüşmesini sağlayın.",
        imageUrl: "/public/finops-kartvizit-light.png",
    },
    // Operasyon
    {
        id: "inventory-management",
        name: "Envanter Yönetim Paneli",
        category: "Operasyon",
        description: "Stok seviyelerinizi ve envanter devir hızını optimize edin.",
        longDescription: "Envanter yönetiminizi optimize edin.",
        imageUrl: "/public/finops-li-banner-dark.png",
    },
    // Sektörel
    {
        id: "saas-kpi",
        name: "SaaS KPI Paneli (MRR, Churn)",
        category: "Sektörel",
        description: "MRR, Churn ve LTV gibi SaaS metriklerini takip edin.",
        longDescription: "SaaS iş modeliniz için hayati metrikleri izleyin.",
        imageUrl: "/public/finops-li-banner-light.png",
    },
    {
        id: "ecommerce-sales",
        name: "E-Ticaret Satış Paneli",
        category: "Sektörel",
        description: "Ortalama sepet tutarı ve dönüşüm oranları gibi e-ticaret verilerini analiz edin.",
        longDescription: "E-ticaret sitenizin performansını en ince ayrıntısına kadar analiz edin.",
        imageUrl: "/public/finops-logo-light.png",
    },
];
