import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { deleteUserDashboard, getUserDashboard } from '../utils/userDashboards';
import { DashboardRenderer } from '../components/DashboardRenderer';
import { ArrowLeft, Loader, AlertCircle, Pencil, Download, Printer } from 'lucide-react';

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

  // Dashboard hata verdiyse: "işleniyor" ekranında sıkışmasın
  if (dashboard.status === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-200">
            <div className="flex items-start gap-4">
              <AlertCircle className="text-red-600 flex-shrink-0" size={44} />
              <div className="flex-1">
                <h1 className="text-2xl font-extrabold text-gray-900">Dashboard oluşturulamadı</h1>
                <p className="mt-2 text-sm text-gray-700">
                  Bu dashboard’un verisi işlenirken bir hata oluştu. Bu genelde veri dosyasının bulunamaması
                  veya beklenen formatta olmaması nedeniyle olur.
                </p>

                <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-900">
                  <div className="font-semibold mb-1">Teknik özet</div>
                  <div className="text-xs text-red-800 space-y-1">
                    <div><span className="font-semibold">Kaynak:</span> {dashboard.wizardData?.dataSource ?? '—'}</div>
                    <div><span className="font-semibold">Dosya:</span> {dashboard.wizardData?.selectedLibraryFileName ?? '—'}</div>
                    <div><span className="font-semibold">Durum:</span> error</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/dashboard/my"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 font-semibold"
                  >
                    <ArrowLeft size={18} />
                    Dashboard’larıma Dön
                  </Link>

                  <button
                    onClick={() => navigate(`/dashboard/edit/${id}`)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
                  >
                    <Pencil size={18} />
                    Düzenle
                  </button>

                  <button
                    onClick={() => {
                      if (!currentUser?.uid || !id) return;
                      const ok = confirm('Bu dashboard silinsin mi?');
                      if (!ok) return;
                      deleteUserDashboard(currentUser.uid, id);
                      navigate('/dashboard/my');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                  >
                    <span>Sil</span>
                  </button>
                </div>

                <div className="mt-4 text-[11px] text-gray-500">
                  Not: Bu ekran, kullanıcıların “sonsuz işleniyor” hissi yaşamaması için özellikle eklenmiştir.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard işleniyor mu?
  if (!dashboard.renderedLayout || dashboard.status === 'pending' || dashboard.status === 'processing') {
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

  // PDF Export fonksiyonu
  const handlePrintPDF = () => {
    window.print();
  };

  // Dashboard hazır, render et
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 print:bg-white print:py-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link
            to="/dashboard/my"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Dashboard'larıma Dön</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintPDF}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              title="PDF olarak indir"
            >
              <Printer size={16} />
              <span>PDF İndir</span>
            </button>
            
            <button
              onClick={() => navigate(`/dashboard/edit/${id}`)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Pencil size={16} />
              Düzenle
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <DashboardRenderer layout={dashboard.renderedLayout} />
      </div>
    </div>
  );
}
