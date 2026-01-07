import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ManufacturingProfitabilityDashboard from '../components/dashboards/manufacturing/ManufacturingProfitabilityDashboard';
import ManufacturingScrapDashboard from '../components/dashboards/manufacturing/ManufacturingScrapDashboard';
import ManufacturingCapacityDashboard from '../components/dashboards/manufacturing/ManufacturingCapacityDashboard';
import ManufacturingInventoryDashboard from '../components/dashboards/manufacturing/ManufacturingInventoryDashboard';

export default function ManufacturingDashboardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link 
          to="/sektorler/uretim"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          Üretim Sektörüne Dön
        </Link>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Üretim Dashboard Örnekleri
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Üretim yapan KOBİ'ler için özel geliştirilmiş 4 profesyonel dashboard. 
            Her dashboard A4 boyutunda yazdırılabilir ve karar kartları içerir.
          </p>
        </div>

        {/* Dashboards */}
        <div className="space-y-12">
          
          {/* 1. Kârlılık */}
          <div id="karlilik">
            <ManufacturingProfitabilityDashboard />
          </div>

          {/* 2. Fire */}
          <div id="fire" className="pt-12">
            <ManufacturingScrapDashboard />
          </div>

          {/* 3. Kapasite */}
          <div id="kapasite" className="pt-12">
            <ManufacturingCapacityDashboard />
          </div>

          {/* 4. Stok */}
          <div id="stok" className="pt-12">
            <ManufacturingInventoryDashboard />
          </div>

        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bu Dashboard'ları Kendi Verilerinizle Kullanmak İster misiniz?
          </h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Beta Partner programımıza katılın. İlk 10 üretim KOBİ'sine ücretsiz kurulum!
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
          >
            Hemen Başvur
          </Link>
        </div>

      </div>
    </div>
  );
}










