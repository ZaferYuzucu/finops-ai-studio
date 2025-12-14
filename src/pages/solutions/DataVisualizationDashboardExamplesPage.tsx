
// VERİ SABOTAJI TEMİZLENDİ
// Bileşen artık merkezi ve doğru veri kaynağını kullanıyor.
import { dashboards, dashboardCategories } from '../../data/dashboards';

const DataVisualizationDashboardExamplesPage = () => {
  // Hard-coded (sahte) 'dashboards' ve 'categories' dizileri kaldırıldı.

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
            {/* Kategori listesi artık merkezi kaynaktan (dashboards.ts) geliyor. */}
            {dashboardCategories.map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">{category} Panelleri</h2>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {/* Dashboard listesi artık merkezi kaynaktan (dashboards.ts) geliyor. */}
                  {dashboards
                    .filter((dashboard) => dashboard.category === category)
                    .map((dashboard) => (
                      <div key={dashboard.id} className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
                           {/* Açıklama alanı da merkezi veriden besleniyor. */}
                           <p className="mt-1 text-sm text-gray-500">{dashboard.description}</p>
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
