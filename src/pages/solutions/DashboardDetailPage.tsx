import { useParams, Link } from "react-router-dom";
import { dashboards } from "../../data/dashboards";
import { ArrowLeft } from 'lucide-react';

export default function DashboardDetailPage() {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const dashboard = dashboards.find((d) => d.id === dashboardId);

  if (!dashboard) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Pano Bulunamadı</h2>
        <p className="mt-4 text-gray-600">Aradığınız dashboard mevcut değil veya kaldırılmış olabilir.</p>
        <Link to="/solutions/dashboard-examples" className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          Geri Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Geri Dön Linki */}
        <div className="mb-8">
            <Link 
                to="/solutions/dashboard-examples" 
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tüm Dashboard'lara Geri Dön
            </Link>
        </div>

        {/* Başlık */}
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          {dashboard.name}
        </h1>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-8">
            {dashboard.category}
        </span>

        {/* Ana İçerik Alanı */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Sol Taraf: Görsel */}
          <div className="lg:col-span-2 rounded-lg border border-gray-200 shadow-lg overflow-hidden">
            <img
              src={dashboard.imageUrl}
              alt={dashboard.name}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Sağ Taraf: Açıklama ve Eylem */}
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-800">Dashboard Açıklaması</h2>
            <p className="mt-4 text-base text-gray-600 flex-grow">
              {dashboard.longDescription}
            </p>
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900">Bu Şablonu Kullanın</h3>
                <p className="mt-2 text-sm text-gray-600">Kendi verilerinizi yükleyerek bu dashboard'u canlı hale getirin veya bir demo ile başlayın.</p>
                <button className="mt-4 w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                    Veri Girişini Başlat
                </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
