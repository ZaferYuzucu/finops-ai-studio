
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, BarChart3, TrendingUp, LogOut } from 'lucide-react';
import UsageLimitsPanel from '../components/UsageLimitsPanel';

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Çıkış sırasında hata oluştu:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-4xl font-bold mb-2">👋 Hoş Geldiniz!</h1>
            {currentUser && (
              <p className="text-blue-100 text-lg">{currentUser.email}</p>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Quick Actions & Activity (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Veri Yükle */}
          <button
            onClick={() => navigate('/veri-girisi')}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-500 text-left group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-600 transition-colors">
                <UploadCloud className="text-blue-600 group-hover:text-white transition-colors" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Veri Yükle</h3>
            </div>
            <p className="text-gray-600 text-sm">
              CSV/Excel yükleyin veya URL ile bağlanın
            </p>
          </button>

          {/* Dashboard'larım */}
          <button
            onClick={() => navigate('/dashboard/demo-preview')}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500 text-left group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-600 transition-colors">
                <BarChart3 className="text-green-600 group-hover:text-white transition-colors" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Dashboard'larım</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Oluşturduğunuz dashboard'ları görüntüleyin
            </p>
          </button>
        </div>

        {/* Profesyonel Dashboard Örnekleri - Büyük Banner */}
        <button
          onClick={() => navigate('/professional-dashboards')}
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-green-400 text-left group mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl">📊</div>
                <h3 className="text-2xl font-black text-white">Profesyonel Dashboard Örnekleri</h3>
                <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">YENİ!</span>
              </div>
              <p className="text-green-100 text-lg mb-2">
                <strong>29 adet</strong> profesyonel dashboard, <strong>9 sektör</strong> kategorisinde
              </p>
              <p className="text-green-50 text-sm">
                🍽️ Restoran • 🏭 Üretim • 💰 Finans • 🏨 Otel • 🛒 E-ticaret • 👥 İK • 🚗 Otomotiv • 📊 Satış • 🌾 Tarım
              </p>
            </div>
            <div className="text-white group-hover:translate-x-2 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>

        {/* Diğer Özellikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Analizler */}
          <button
            onClick={() => alert('Yakında: Gelişmiş analiz araçları!')}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-500 text-left group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-600 transition-colors">
                <TrendingUp className="text-purple-600 group-hover:text-white transition-colors" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">AI Analizleri</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Akıllı içgörüler ve öneriler
            </p>
          </button>
        </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Son Aktiviteler</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-gray-700">Hesap oluşturuldu</p>
                  <span className="ml-auto text-sm text-gray-500">Az önce</span>
                </div>
                <div className="text-center py-8 text-gray-500">
                  <p>Henüz veri yüklemediniz. Başlamak için yukarıdaki "Veri Yükle" butonuna tıklayın!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Usage Limits (1 column) */}
          <div className="lg:col-span-1">
            <UsageLimitsPanel />
          </div>
        </div>

        {/* Logout */}
        <div className="max-w-7xl mx-auto mt-8 text-center">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors shadow-md"
          >
            <LogOut size={20} />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
