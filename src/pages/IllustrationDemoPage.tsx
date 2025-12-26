import React from 'react';
import IllustratedCard from '../components/IllustratedCard';
import dashboardIllustration from '../assets/illustrations/dashboard-analytics-v8-final.svg';

const IllustrationDemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            İllüstrasyon Demo
          </h1>
          <p className="text-lg text-gray-600">
            İlk örnek illüstrasyonumuz: Finansal Dashboard Analytics
          </p>
        </div>
        
        {/* Single Card Demo */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">📊 Tek Kart Örneği</h2>
          <div className="max-w-md mx-auto">
            <IllustratedCard
              illustration={dashboardIllustration}
              title="Finansal Dashboard ile Verilerinizi Görselleştirin"
              description="KPI takibi, trend analizi ve gerçek zamanlı finansal raporlama özellikleriyle işletmenizin finansal performansını tek bir ekrandan yönetin."
              date="Aralık 25, 2025"
              link="/blog/financial-dashboard"
              badge="Yeni"
              colorScheme="blue"
            />
          </div>
        </div>
        
        {/* 3-Column Grid Demo */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">📱 3-Sütun Grid Örneği (Blog/Docs Düzeni)</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <IllustratedCard
              illustration={dashboardIllustration}
              title="Finansal Dashboard"
              description="KPI takibi, trend analizi ve gerçek zamanlı finansal raporlama özellikleri."
              date="Aralık 25, 2025"
              link="/blog/financial-dashboard"
              badge="Popüler"
              colorScheme="blue"
            />
            
            <IllustratedCard
              illustration={dashboardIllustration}
              title="Bütçe Yönetimi"
              description="Akıllı bütçe planlama araçlarıyla maliyetlerinizi optimize edin."
              date="Aralık 20, 2025"
              link="/blog/budget-management"
              colorScheme="green"
            />
            
            <IllustratedCard
              illustration={dashboardIllustration}
              title="AI Finans Danışmanı"
              description="Yapay zeka destekli önerilerle daha iyi finansal kararlar alın."
              date="Aralık 18, 2025"
              link="/blog/ai-consultant"
              badge="Yeni"
              colorScheme="purple"
            />
          </div>
        </div>
        
        {/* Color Scheme Variants */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">🎨 Renk Şeması Varyantları</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {(['blue', 'purple', 'green', 'orange', 'teal'] as const).map((color) => (
              <IllustratedCard
                key={color}
                illustration={dashboardIllustration}
                title={`${color.charAt(0).toUpperCase() + color.slice(1)} Tema`}
                description="Kısa açıklama metni..."
                link={`/demo/${color}`}
                colorScheme={color}
              />
            ))}
          </div>
        </div>
        
        {/* Technical Details */}
        <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Teknik Özellikler</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✅ <strong>Format:</strong> SVG (Scalable Vector Graphics)</li>
            <li>✅ <strong>Boyut:</strong> 400x300px (responsive)</li>
            <li>✅ <strong>Dosya:</strong> ~5KB (optimize edilmiş)</li>
            <li>✅ <strong>Animasyon:</strong> Hover scale + fade</li>
            <li>✅ <strong>Renk Şemaları:</strong> 5 farklı varyant</li>
            <li>✅ <strong>Component:</strong> Reusable + TypeScript</li>
            <li>✅ <strong>Kullanım:</strong> Blog, Docs, Ana Sayfa</li>
            <li>✅ <strong>Telif:</strong> %100 Özgün - Telif sorunu yok!</li>
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default IllustrationDemoPage;

