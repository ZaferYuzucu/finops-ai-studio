import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Trash2, Pencil, LayoutDashboard, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { deleteUserDashboard, listUserDashboards } from '../utils/userDashboards';

export default function MyDashboardsPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  const userId = currentUser?.uid ?? '';

  const dashboards = useMemo(() => {
    if (!userId) return [];
    // refreshKey forces recalculation after delete
    void refreshKey;
    return listUserDashboards(userId);
  }, [userId, refreshKey]);

  const handleDelete = (id: string) => {
    if (!userId) return;
    const ok = confirm('Bu dashboard silinsin mi?');
    if (!ok) return;
    deleteUserDashboard(userId, id);
    setRefreshKey((x) => x + 1);
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

        {dashboards.length === 0 ? (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboards.map((d) => (
              <div key={d.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
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
                    onClick={() => handleDelete(d.id)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-800 hover:border-rose-300 hover:text-rose-700"
                  >
                    <Trash2 className="w-4 h-4" />
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

