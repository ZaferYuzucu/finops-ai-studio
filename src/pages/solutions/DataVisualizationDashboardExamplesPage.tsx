const dashboards = [
  // Kategori: Finans
  { category: 'Finans', name: 'CEO Bütünsel Bakış Paneli', imageUrl: 'https://images.unsplash.com/photo-1642582888692-f3d68a4d2f02?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { category: 'Finans', name: 'Kar ve Zarar Analizi', imageUrl: 'https://images.unsplash.com/photo-1642582888795-a241e3a47b1c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { category: 'Finans', name: 'Nakit Akışı Performansı', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e28f81?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { category: 'Finans', name: 'Finansal Performans KPIları', imageUrl: 'https://images.unsplash.com/photo-1642582888699-923c71a396e9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  // Kategori: Satış ve Pazarlama
  { category: 'Satış', name: 'Satış Ekibi Performans Paneli', imageUrl: 'https://images.unsplash.com/photo-1630514926197-27110a10c134?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80' },
  { category: 'Satış', name: 'Satış KPI ve Hedef Takibi', imageUrl: 'https://images.unsplash.com/photo-1642582888716-14b512353381?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { category: 'Pazarlama', name: 'Pazarlama Kampanya Paneli', imageUrl: 'https://images.unsplash.com/photo-1604328727785-f1261e47a4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
  { category: 'Pazarlama', name: 'Web Sitesi Trafik Analizi', imageUrl: 'https://images.unsplash.com/photo-1560472354-b3330b6433f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80' },

  // Kategori: İnsan Kaynakları
  { category: 'İK', name: 'İK Metrikleri ve Personel Analizi', imageUrl: 'https://images.unsplash.com/photo-1642582888749-a2046e737c2d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { category: 'İK', name: 'İşe Alım Süreçleri Paneli', imageUrl: 'https://images.unsplash.com/photo-1642582888775-97063c4368b1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  
  // Kategori: Proje ve Operasyon
  { category: 'Proje Yönetimi', name: 'Proje Yönetimi Paneli', imageUrl: 'https://images.unsplash.com/photo-1642582888707-142d2a425fdc?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { category: 'Operasyon', name: 'Envanter Yönetim Paneli', imageUrl: 'https://images.unsplash.com/photo-1578575437136-7242e3a62ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },

  // Kategori: Sektörel
  { category: 'SaaS', name: 'SaaS KPI Paneli (MRR, Churn)', imageUrl: 'https://images.unsplash.com/photo-1642582888686-35a1a3b11e96?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { category: 'E-Ticaret', name: 'E-Ticaret Satış Paneli', imageUrl: 'https://images.unsplash.com/photo-1642582888739-c5c56d7f6c38?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { category: 'Destek', name: 'Müşteri Destek Hizmetleri Paneli', imageUrl: 'https://images.unsplash.com/photo-1642582888756-c357fe22c366?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const DataVisualizationDashboardExamplesPage = () => {
  const categories = [
    'Finans',
    'Satış',
    'Pazarlama',
    'İK',
    'Proje Yönetimi',
    'Operasyon',
    'SaaS',
    'E-Ticaret',
    'Destek'
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Dashboard ve Rapor Örnekleri
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            Gerçek ekipler tarafından kullanılan gösterge tablosu örneklerini keşfedin ve işletmeniz için KPI takibi oluşturun.
          </p>
        </div>

        <div className="mt-20">
          <div className="space-y-16">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">{category} Panelleri</h2>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {dashboards
                    .filter((dashboard) => dashboard.category === category)
                    .map((dashboard) => (
                      <div key={dashboard.name} className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                         <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                          <img
                            src={dashboard.imageUrl}
                            alt={dashboard.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-base font-semibold text-gray-800">
                              {dashboard.name}
                          </h3>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualizationDashboardExamplesPage;
