import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserDashboard } from '../utils/userDashboards';
import { DashboardRenderer } from '../components/DashboardRenderer';
import { ArrowLeft, Loader, AlertCircle, Pencil } from 'lucide-react';

export default function DashboardViewPage() {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.uid || !id) {
      navigate('/login');
      return;
    }

    loadDashboard();

    // Dashboard hazır olduğunda yenile
    const handleDashboardReady = (e: any) => {
      if (e.detail?.dashboardId === id) {
        loadDashboard();
      }
    };

    window.addEventListener('dashboard-ready', handleDashboardReady);
    return () => window.removeEventListener('dashboard-ready', handleDashboardReady);
  }, [currentUser, id]);

  const loadDashboard = () => {
    if (!currentUser?.uid || !id) return;

    const dash = getUserDashboard(currentUser.uid, id);
    setDashboard(dash);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
          <p className="text-gray-600">Dashboard yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 text-red-600" size={48} />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Bulunamadı</h1>
          <p className="text-gray-600 mb-6">İstediğiniz dashboard mevcut değil.</p>
          <Link
            to="/dashboard/my"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft size={20} />
            Dashboard'larıma Dön
          </Link>
        </div>
      </div>
    );
  }

  // Dashboard işleniyor mu?
  if (!dashboard.renderedLayout) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Loader className="animate-spin mx-auto mb-6 text-blue-600" size={64} />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Dashboard İşleniyor
            </h1>
            <p className="text-gray-600 mb-2">
              Verileriniz analiz ediliyor ve grafikler oluşturuluyor...
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Bu işlem birkaç saniye sürebilir. Lütfen bekleyin.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                💡 <strong>İpucu:</strong> Sayfa otomatik olarak yenilenecek.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={loadDashboard}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Yenile
              </button>
              <Link
                to="/dashboard/my"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Geri Dön
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard hazır, render et
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/dashboard/my"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Dashboard'larıma Dön</span>
          </Link>
          
          <button
            onClick={() => navigate(`/dashboard/edit/${id}`)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Pencil size={16} />
            Düzenle
          </button>
        </div>

        {/* Dashboard Content */}
        <DashboardRenderer layout={dashboard.renderedLayout} />
      </div>
    </div>
  );
}
