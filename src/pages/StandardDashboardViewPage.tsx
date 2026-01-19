/**
 * Standard Dashboard View Page
 * DashboardFactory standardını kullanan kullanıcı dashboard'larını gösterir
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserDashboardConfigs } from '../utils/wizardToConfig';
import { createFinopsDashboard } from '../components/dashboards/DashboardFactory';

export default function StandardDashboardViewPage() {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser?.email || !id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Bulunamadı</h2>
          <p className="text-gray-600 mb-4">Lütfen giriş yapın veya geçerli bir dashboard seçin.</p>
          <button
            onClick={() => navigate('/dashboard/my')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
          >
            Dashboard'larıma Dön
          </button>
        </div>
      </div>
    );
  }

  // Kullanıcının dashboard config'lerini getir
  const configs = getUserDashboardConfigs(currentUser.email);
  const config = configs.find((c: any) => c.id === id);

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Bulunamadı</h2>
          <p className="text-gray-600 mb-4">Bu dashboard silinmiş olabilir.</p>
          <button
            onClick={() => navigate('/dashboard/my')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
          >
            Dashboard'larıma Dön
          </button>
        </div>
      </div>
    );
  }

  // DashboardFactory ile dashboard oluştur
  const UserDashboard = createFinopsDashboard(config);

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard/my')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Dashboard'larıma Dön
          </button>
          <div className="text-sm text-gray-600">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
              ✅ Standart Format
            </span>
          </div>
        </div>
      </div>

      {/* Dashboard Render */}
      <UserDashboard />
    </div>
  );
}
