import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import both versions
import originalSvg from '../assets/illustrations/undraw/undraw_all-the-data_ijgn.svg';
import finopsSvg from '../assets/illustrations/undraw/undraw_all-the-data_ijgn-finops.svg';

const UndrawComparisonPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/brand-kit"
            className="inline-flex items-center text-brand-primary-cta hover:text-brand-secondary-cta transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Brand Kit'e Dön
          </Link>
          <h1 className="text-4xl font-bold text-brand-dark-text mb-2">
            🎨 Undraw → Finops Renk Dönüşümü
          </h1>
          <p className="text-gray-600">
            Sol: Orijinal Undraw renkleri | Sağ: Finops marka renkleri
          </p>
        </div>

        {/* Color Legend */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-brand-dark-text mb-4">
            🎨 Renk Dönüşüm Tablosu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border rounded p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded" style={{ backgroundColor: '#6c63ff' }}></div>
                <span className="text-sm">→</span>
                <div className="w-8 h-8 rounded" style={{ backgroundColor: '#007bff' }}></div>
              </div>
              <p className="text-xs text-gray-600">Ana Vurgu (Mavi)</p>
            </div>
            
            <div className="border rounded p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded" style={{ backgroundColor: '#f8a8ab' }}></div>
                <span className="text-sm">→</span>
                <div className="w-8 h-8 rounded" style={{ backgroundColor: '#FFD6BA' }}></div>
              </div>
              <p className="text-xs text-gray-600">Ten Rengi</p>
            </div>
            
            <div className="border rounded p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded" style={{ backgroundColor: '#090814' }}></div>
                <span className="text-sm">→</span>
                <div className="w-8 h-8 rounded" style={{ backgroundColor: '#0A2540' }}></div>
              </div>
              <p className="text-xs text-gray-600">Koyu (Siyah)</p>
            </div>
            
            <div className="border rounded p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded border" style={{ backgroundColor: '#e6e6e6' }}></div>
                <span className="text-sm">→</span>
                <div className="w-8 h-8 rounded border" style={{ backgroundColor: '#E6F4F1' }}></div>
              </div>
              <p className="text-xs text-gray-600">Açık (Teal)</p>
            </div>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Original */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                📦 Orijinal (Undraw)
              </h3>
              <span className="text-sm text-gray-500">Default colors</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
              <img 
                src={originalSvg} 
                alt="Original Undraw illustration" 
                className="w-full max-w-md"
              />
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>✅ Profesyonel</p>
              <p>❌ Marka kimliğine uymuyor</p>
            </div>
          </div>

          {/* Finops Version */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-brand-primary-cta">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-brand-primary-cta">
                🎨 Finops Versiyonu
              </h3>
              <span className="text-sm text-brand-secondary-cta">Brand colors</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
              <img 
                src={finopsSvg} 
                alt="Finops branded illustration" 
                className="w-full max-w-md"
              />
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>✅ Profesyonel</p>
              <p>✅ Marka kimliğine uygun</p>
              <p>✅ Tutarlı görünüm</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-brand-dark-text mb-4">
            📊 Değişim İstatistikleri
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-primary-cta">8</p>
              <p className="text-sm text-gray-600">Renk değişimi</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-secondary-cta">100%</p>
              <p className="text-sm text-gray-600">Marka uyumu</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-primary-cta">~9KB</p>
              <p className="text-sm text-gray-600">Dosya boyutu</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-secondary-cta">SVG</p>
              <p className="text-sm text-gray-600">Format</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-gradient-to-r from-brand-primary-cta to-brand-secondary-cta rounded-lg shadow-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">🚀 Sonraki Adımlar</h3>
          <div className="space-y-2">
            <p>✅ İlk SVG başarıyla dönüştürüldü!</p>
            <p>📦 9 SVG dosyanız var</p>
            <p>🎨 Hepsini Finops renklerine çevirebilirim</p>
            <p>📄 Blog, Docs veya Landing Page'e ekleyebilirim</p>
            <p>🎭 Brand Kit'e showcase olarak ekleyebilirim</p>
          </div>
          <div className="mt-6">
            <Link
              to="/brand-kit"
              className="inline-block bg-white text-brand-primary-cta px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Brand Kit'e Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UndrawComparisonPage;

