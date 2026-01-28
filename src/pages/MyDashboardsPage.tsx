import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Trash2, Pencil, LayoutDashboard, Eye, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { deleteUserDashboard, listUserDashboards } from '../utils/userDashboards';
import { getUserDashboardConfigs, deleteUserDashboardConfig } from '../utils/wizardToConfig';
import { getUserDashboards, deleteDashboard } from '../services/firestorePersistence';

export default function MyDashboardsPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [firestoreDashboards, setFirestoreDashboards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = currentUser?.uid ?? '';

  // Firestore'dan dashboard'ları yükle
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    const loadDashboards = async () => {
      try {
        const firestore = await getUserDashboards(userId);
        setFirestoreDashboards(firestore);
      } catch (e) {
        console.warn('Firestore dashboards load failed:', e);
        setFirestoreDashboards([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboards();
  }, [userId, refreshKey]);

  // localStorage'dan eski dashboard'ları getir (backward compatibility)
  const localDashboards = useMemo(() => {
    if (!userId) return [];
    void refreshKey;
    return listUserDashboards(userId);
  }, [userId, refreshKey]);
  
  // ✅ PHASE 2: DashboardFactory config'lerini de getir (localStorage)
  const factoryDashboards = useMemo(() => {
    if (!currentUser?.email) return [];
    void refreshKey;
    return getUserDashboardConfigs(currentUser.email);
  }, [currentUser?.email, refreshKey]);
  
  const handleDeleteFactory = (configId: string) => {
    if (!currentUser?.email) return;
    const ok = confirm('Bu dashboard silinsin mi?');
    if (!ok) return;
    deleteUserDashboardConfig(currentUser.email, configId);
    setRefreshKey((x) => x + 1);
  };

  const handleDelete = async (id: string, isFirestore: boolean) => {
    if (!userId) return;
    const ok = confirm('Bu dashboard silinsin mi?');
    if (!ok) return;
    
    if (isFirestore) {
      const success = await deleteDashboard(userId, id);
      if (success) {
        setRefreshKey((x) => x + 1);
      } else {
        alert('Dashboard silinirken bir hata oluştu');
      }
    } else {
      deleteUserDashboard(userId, id);
      setRefreshKey((x) => x + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-full mb-4">
              <LayoutDashboard className="w-4 h-4 text-indigo-700" />
              <span className="text-sm font-extrabold text-indigo-800">Dashboard’larım</span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">Kayıtlı Dashboard’lar</h1>
            <p className="mt-2 text-gray-600">
              Oluşturduğun dashboard’ları buradan açabilir, düzenleyebilir veya silebilirsin.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/dashboard/create')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Yeni Dashboard
            </button>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-sm text-sm font-semibold text-gray-800"
            >
              Panel
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
            <Loader className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
            <div className="mt-4 text-gray-600">Dashboard'lar yükleniyor...</div>
          </div>
        ) : firestoreDashboards.length === 0 && localDashboards.length === 0 && factoryDashboards.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
            <div className="text-lg font-bold text-gray-900">Henüz kayıtlı dashboard yok</div>
            <div className="mt-2 text-sm text-gray-600">
              “Yeni Dashboard” ile kendi dashboard’unu oluşturabilirsin.
            </div>
            <div className="mt-6">
              <button
                onClick={() => navigate('/dashboard/create')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
              >
                <Plus className="w-5 h-5" />
                Dashboard Oluştur
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* ✅ Firestore Dashboard'lar (Yeni Format) */}
            {firestoreDashboards.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  Dashboard'larım ({firestoreDashboards.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {firestoreDashboards.map((d) => {
                    const updatedAt = d.updatedAt?.toDate?.() || new Date();
                    const confidence = d.diagnosis?.confidenceScore;
                    return (
                      <div key={d.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-5 shadow-md">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="text-lg font-extrabold text-indigo-900 truncate">{d.name}</div>
                            <div className="mt-1 text-xs text-indigo-700">
                              Güncellendi: {updatedAt.toLocaleDateString('tr-TR')}
                            </div>
                            {confidence !== undefined && (
                              <div className="mt-2 text-xs">
                                <span className={`px-2 py-1 rounded ${
                                  confidence >= 0.85 ? 'bg-green-100 text-green-700' :
                                  confidence >= 0.60 ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  Güven: {Math.round(confidence * 100)}%
                                </span>
                              </div>
                            )}
                            {d.diagnosis?.riskFlags?.length > 0 && (
                              <div className="mt-1 text-xs text-orange-600">
                                ⚠ {d.diagnosis.riskFlags.length} risk tespit edildi
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => navigate(`/dashboard/view/${d.id}`)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
                          >
                            <Eye className="w-4 h-4" />
                            Görüntüle
                          </button>
                          <button
                            onClick={() => navigate(`/dashboard/edit/${d.id}`)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700"
                          >
                            <Pencil className="w-4 h-4" />
                            Düzenle
                          </button>
                          <button
                            onClick={() => handleDelete(d.id, true)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-800 hover:border-rose-300 hover:text-rose-700"
                          >
                            <Trash2 className="w-4 h-4" />
                            Sil
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ✅ PHASE 2: Standart Dashboard'lar (DashboardFactory - localStorage) */}
            {factoryDashboards.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📋</span>
                  Standart Dashboard'lar ({factoryDashboards.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {factoryDashboards.map((config: any) => (
                    <div key={config.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-5 shadow-md">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-lg font-extrabold text-indigo-900 truncate">
                            {config.icon} {config.title}
                          </div>
                          <div className="mt-1 text-xs text-indigo-700">{config.subtitle}</div>
                          <div className="mt-2 text-xs text-gray-600">
                            📊 {config.kpis.length} KPI • {config.charts.length} Grafik
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            {new Date(config.createdAt).toLocaleDateString('tr-TR')}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => navigate(`/dashboard/view-standard/${config.id}`)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
                        >
                          <Eye className="w-4 h-4" />
                          Görüntüle
                        </button>
                        <button
                          onClick={() => handleDeleteFactory(config.id)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-800 hover:border-rose-300 hover:text-rose-700"
                        >
                          <Trash2 className="w-4 h-4" />
                          Sil
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Eski Format Dashboard'lar (localStorage) */}
            {localDashboards.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  Eski Format Dashboard'lar ({localDashboards.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {localDashboards.map((d) => (
                    <div key={d.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm relative">
                      <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-100 border border-yellow-300 rounded text-xs font-bold text-yellow-700">
                        Eski Format
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-lg font-extrabold text-gray-900 truncate">{d.name}</div>
                          <div className="mt-1 text-xs text-gray-500">
                            Güncellendi: {new Date(d.updatedAtIso).toLocaleString('tr-TR')}
                          </div>
                          <div className="mt-2 text-xs text-gray-600">
                            Tip: {d.wizardData.dashboardType ?? '—'} • Kaynak: {d.wizardData.dataSource ?? '—'}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => navigate(`/dashboard/view/${d.id}`)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
                        >
                          <Eye className="w-4 h-4" />
                          Görüntüle
                        </button>
                        <button
                          onClick={() => navigate(`/dashboard/edit/${d.id}`)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
                        >
                          <Pencil className="w-4 h-4" />
                          Düzenle
                        </button>
                        <button
                          onClick={() => handleDelete(d.id, false)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-800 hover:border-rose-300 hover:text-rose-700"
                        >
                          <Trash2 className="w-4 h-4" />
                          Sil
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

