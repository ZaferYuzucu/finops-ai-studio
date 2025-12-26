
import { useParams } from 'react-router-dom';
import { dashboards, Dashboard } from '@/data/dashboards';
import { useState, useEffect } from 'react';

// This is a simplified replacement for Next.js's StaticImageData
// For Vite, we can just treat image URLs as strings.
type StaticImageData = string;

const DashboardDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [relatedDashboards, setRelatedDashboards] = useState<Dashboard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentDashboard = dashboards.find((d) => d.id === id) || null;
    
    if (currentDashboard) {
      const related = dashboards.filter(
        (d) => d.category === currentDashboard.category && d.id !== currentDashboard.id
      ).slice(0, 3);
      setDashboard(currentDashboard);
      setRelatedDashboards(related);
    }
    setIsLoading(false);
  }, [id]);

  if (isLoading || !dashboard) {
    return <div>Yükleniyor...</div>;
  }

  // In Vite, imported images are just strings (the URL)
  const getImageUrl = (image: StaticImageData | { src: string }) => {
     // Handle both direct string paths and potential object structures from imports
    return typeof image === 'string' ? image : image.src;
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Üst Kısım: Başlık, Kategori ve Açıklama */}
        <div className="text-center mb-12">
          <p className="text-base font-semibold text-indigo-600 uppercase tracking-wide">{dashboard.category}</p>
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">{dashboard.name}</h1>
          <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-500">{dashboard.description}</p>
        </div>

        {/* Ana İçerik: Görsel ve Detaylar */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Sol Taraf: Panel Görseli */}
          <div className="mb-8 lg:mb-0">
            <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl h-96">
              <img 
                src={getImageUrl(dashboard.imageUrl)}
                alt={dashboard.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Sağ Taraf: Uzun Açıklama */}
          <div className="prose prose-indigo prose-lg text-gray-500 lg:max-w-none">
            <p>{dashboard.longDescription}</p>
          </div>
        </div>

        {/* Alt Kısım: Temel Sorular ve Metrikler */}
        <div className="mt-16 bg-white shadow-xl rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Temel Sorular */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cevap Verilen Temel Sorular</h2>
              <ul className="list-disc list-inside space-y-2">
                {dashboard.keyQuestions.map((question, index) => (
                  <li key={index} className="text-gray-700">{question}</li>
                ))}
              </ul>
            </div>

            {/* Anahtar Metrikler */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">İzlenen Anahtar Metrikler</h2>
              <ul className="list-disc list-inside space-y-2">
                {dashboard.keyMetrics.map((metric, index) => (
                  <li key={index} className="text-gray-700">{metric}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* İlgili Paneller */}
        <div className="mt-20">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">İlgili Diğer Paneller</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedDashboards.map((related) => (
                    <a key={related.id} href={`/solutions/${related.id}`} className="block bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                        <div className="relative h-48 w-full">
                            <img 
                                src={getImageUrl(related.imageUrl)} 
                                alt={related.name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <p className="text-sm font-semibold text-indigo-600 uppercase">{related.category}</p>
                            <h3 className="mt-2 font-bold text-xl text-gray-900">{related.name}</h3>
                            <p className="mt-3 text-base text-gray-500">{related.description}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardDetailPage;
