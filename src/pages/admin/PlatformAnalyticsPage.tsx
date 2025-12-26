import React, { useState, useEffect } from 'react';
import { 
  Users, TrendingUp, DollarSign, AlertCircle, 
  ArrowUpRight, ArrowDownRight, Download, RefreshCw,
  Upload, Mail, Settings, BarChart3, PieChart, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  mockUsers, mockRevenue, mockDashboardUsage, mockSessionData, 
  summaryStats, PlatformUser 
} from '../../data/platformAnalyticsMockData';
import { getCombinedAnalytics } from '../../utils/platformAnalytics';
import { useNavigate } from 'react-router-dom';

const PlatformAnalyticsPage = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [loading, setLoading] = useState(true);
  const [realData, setRealData] = useState<any>(null);
  
  // Gerçek Firebase verilerini yükle
  useEffect(() => {
    const loadRealData = async () => {
      setLoading(true);
      try {
        const data = await getCombinedAnalytics();
        setRealData(data);
        console.log('✅ Gerçek Firebase verileri yüklendi:', data);
      } catch (error) {
        console.error('❌ Veri yükleme hatası:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadRealData();
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Sort users by various criteria
  const getRecentSignups = () => {
    if (realData && realData.recentSignups && realData.recentSignups.length > 0) {
      // Gerçek Firebase verisi varsa onu göster
      return realData.recentSignups.slice(0, 10).map((user: any) => ({
        id: user.id,
        email: user.email,
        plan: user.plan,
        registrationDate: user.createdAt.toISOString ? user.createdAt.toISOString().split('T')[0] : new Date(user.createdAt).toISOString().split('T')[0],
        lastLogin: user.lastLoginAt ? (user.lastLoginAt.toISOString ? user.lastLoginAt.toISOString().split('T')[0] : new Date(user.lastLoginAt).toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
        sessionCount: 0,
        totalUsageMinutes: 0,
        status: user.subscriptionStatus || 'active',
      }));
    }
    // Gerçek veri yoksa mock göster
    return [...mockUsers]
      .sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime())
      .slice(0, 10);
  };

  const getMostActiveUsers = () => {
    if (realData && realData.realUsers && realData.realUsers.length > 0) {
      // Gerçek Firebase verisi varsa onu göster
      return realData.realUsers.slice(0, 10).map((user: any) => ({
        id: user.id,
        email: user.email,
        plan: user.plan,
        registrationDate: user.createdAt.toISOString ? user.createdAt.toISOString().split('T')[0] : new Date(user.createdAt).toISOString().split('T')[0],
        lastLogin: user.lastLoginAt ? (user.lastLoginAt.toISOString ? user.lastLoginAt.toISOString().split('T')[0] : new Date(user.lastLoginAt).toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
        sessionCount: 0,
        totalUsageMinutes: 0,
        status: user.subscriptionStatus || 'active',
      }));
    }
    // Gerçek veri yoksa mock göster
    return [...mockUsers]
      .filter(u => u.status === 'active')
      .sort((a, b) => b.sessionCount - a.sessionCount)
      .slice(0, 10);
  };

  // Calculate growth
  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const mrrGrowth = calculateGrowth(
    mockRevenue[mockRevenue.length - 1].mrr,
    mockRevenue[mockRevenue.length - 2].mrr
  );

  // Gerçek veya mock veriyi kullan
  const stats = realData || {
    totalUsers: summaryStats.totalUsers,
    activeUsers: summaryStats.activeUsers,
    mrr: summaryStats.currentMRR,
    arr: summaryStats.currentARR,
    churnRate: parseFloat(summaryStats.churnRate),
    planDistribution: summaryStats.planDistribution,
    realUsers: [],
    recentSignups: [],
    newsletterCount: 0,
  };
  
  const userGrowth = 12; // Mock data - bu ay yeni kullanıcı artışı %
  const activeUserGrowth = 8; // Mock data
  const churnImprovement = -0.5; // Negative = improvement

  // Loading state
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4 text-indigo-600" size={48} />
          <p className="text-lg text-gray-600">Firebase'den gerçek veriler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                🏨 Platform Analytics
                <span className="ml-3 text-sm font-normal px-3 py-1 bg-violet-100 text-violet-700 rounded-full">
                  Backstage
                </span>
              </h1>
              <p className="text-gray-600">Sistemin arka tarafına hoş geldiniz. Tüm operasyonları buradan yönetin.</p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {/* Time Range Selector */}
              <div className="flex bg-white border border-gray-300 rounded-lg p-1">
                {(['7d', '30d', '90d'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      timeRange === range
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {range === '7d' && 'Son 7 Gün'}
                    {range === '30d' && 'Son 30 Gün'}
                    {range === '90d' && 'Son 90 Gün'}
                  </button>
                ))}
              </div>

              <button className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw size={20} className="text-gray-600" />
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Download size={20} />
                <span className="hidden sm:inline">Rapor İndir</span>
              </button>
            </div>
          </div>
        </div>

        {/* Overview KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
              <span className={`flex items-center text-sm font-semibold ${
                userGrowth > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {userGrowth > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {Math.abs(userGrowth)}%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Toplam Kullanıcı</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">
              {realData ? '🔥 Gerçek Firebase Verisi' : '+12% bu ay (Mock)'}
            </p>
          </motion.div>

          {/* Active Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity className="text-green-600" size={24} />
              </div>
              <span className={`flex items-center text-sm font-semibold ${
                activeUserGrowth > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {activeUserGrowth > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {Math.abs(activeUserGrowth)}%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Aktif Kullanıcı</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">
              {realData ? '🔥 Son 30 gün (Gerçek)' : '+8% bu hafta (Mock)'}
            </p>
          </motion.div>

          {/* Monthly Revenue (MRR) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <DollarSign className="text-emerald-600" size={24} />
              </div>
              <span className={`flex items-center text-sm font-semibold ${
                mrrGrowth > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {mrrGrowth > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {Math.abs(mrrGrowth).toFixed(1)}%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Aylık Gelir (MRR)</h3>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.mrr)}</p>
            <p className="text-xs text-gray-500 mt-2">
              ARR: {formatCurrency(stats.arr)} {realData && '🔥'}
            </p>
          </motion.div>

          {/* Churn Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <span className={`flex items-center text-sm font-semibold ${
                churnImprovement < 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {churnImprovement < 0 ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                {Math.abs(churnImprovement)}%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Churn Rate</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.churnRate.toFixed(1)}%</p>
            <p className="text-xs text-gray-500 mt-2">
              {realData ? '🔥 Gerçek Hesaplama' : 'Mock Data'}
            </p>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Revenue Growth Chart Placeholder */}
          <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Gelir Büyümesi</h2>
              <BarChart3 className="text-gray-400" size={20} />
            </div>
            <div className="h-64 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="mx-auto mb-2 text-indigo-400" size={48} />
                <p className="text-sm text-gray-600">Line Chart: Son 12 Ay MRR/ARR</p>
                <p className="text-xs text-gray-500 mt-1">(Recharts ile entegre edilecek)</p>
              </div>
            </div>
          </div>

          {/* Plan Distribution Chart Placeholder */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Plan Dağılımı</h2>
              <PieChart className="text-gray-400" size={20} />
            </div>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="mx-auto mb-2 text-blue-400" size={48} />
                <p className="text-sm text-gray-600">Donut Chart</p>
                <div className="mt-4 space-y-2">
                  {Object.entries(stats.planDistribution).map(([plan, count]) => (
                    <div key={plan} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{plan}:</span>
                      <span className="font-semibold">{count} ({stats.totalUsers > 0 ? ((count / stats.totalUsers) * 100).toFixed(0) : 0}%)</span>
                    </div>
                  ))}
                  {realData && (
                    <p className="text-xs text-green-600 font-semibold pt-2 border-t">🔥 Gerçek Firebase Verisi</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* Recent Signups Table */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Son Kayıt Olanlar</h2>
              {realData && realData.recentSignups && realData.recentSignups.length > 0 && (
                <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  🔥 Gerçek Veri
                </span>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Email</th>
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Plan</th>
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Tarih</th>
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {getRecentSignups().map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 text-sm text-gray-900">{user.email}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.plan === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
                          user.plan === 'Business' ? 'bg-blue-100 text-blue-800' :
                          user.plan === 'Pro' ? 'bg-green-100 text-green-800' :
                          user.plan === 'BetaPartner' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.plan}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600">{formatDate(user.registrationDate)}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' :
                          user.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {user.status === 'active' ? 'Aktif' : user.status === 'inactive' ? 'Pasif' : 'Ayrıldı'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Most Active Users Table */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">En Aktif Kullanıcılar</h2>
              {realData && realData.realUsers && realData.realUsers.length > 0 && (
                <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  🔥 Gerçek Veri
                </span>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Email</th>
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Session</th>
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Son Giriş</th>
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Toplam Süre</th>
                  </tr>
                </thead>
                <tbody>
                  {getMostActiveUsers().map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 text-sm text-gray-900">{user.email}</td>
                      <td className="py-3 text-sm font-semibold text-indigo-600">{user.sessionCount}</td>
                      <td className="py-3 text-sm text-gray-600">{formatDate(user.lastLogin)}</td>
                      <td className="py-3 text-sm text-gray-600">{Math.floor(user.totalUsageMinutes / 60)}h {user.totalUsageMinutes % 60}m</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Dashboard Usage Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">En Popüler Dashboard'lar</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Dashboard Adı</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Kategori</th>
                  <th className="text-right text-xs font-semibold text-gray-600 pb-3">Görüntülenme</th>
                  <th className="text-right text-xs font-semibold text-gray-600 pb-3">Kullanıcı</th>
                  <th className="text-right text-xs font-semibold text-gray-600 pb-3">Ort. Süre</th>
                </tr>
              </thead>
              <tbody>
                {mockDashboardUsage.map((dashboard, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 text-sm font-medium text-gray-900">{dashboard.dashboardName}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {dashboard.category}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-900 text-right">{dashboard.viewCount.toLocaleString()}</td>
                    <td className="py-3 text-sm text-gray-600 text-right">{dashboard.uniqueUsers}</td>
                    <td className="py-3 text-sm text-gray-600 text-right">{dashboard.avgTimeMinutes} dk</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <button
            onClick={() => navigate('/admin-login?redirect=/veri-girisi')}
            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all group"
          >
            <div className="p-4 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
              <Upload className="text-blue-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Veri Yükle</h3>
            <p className="text-sm text-gray-600 text-center">CSV/Excel verilerini sisteme aktar</p>
          </button>

          <button
            onClick={() => navigate('/admin-login?redirect=/admin/newsletter')}
            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-green-200 rounded-xl hover:border-green-400 hover:shadow-lg transition-all group"
          >
            <div className="p-4 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
              <Mail className="text-green-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Newsletter Gönder</h3>
            <p className="text-sm text-gray-600 text-center">Kullanıcılara toplu bildirim</p>
          </button>

          <button
            onClick={() => navigate('/admin-login?redirect=/admin/panel')}
            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:shadow-lg transition-all group"
          >
            <div className="p-4 bg-purple-100 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
              <Settings className="text-purple-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Sistem Ayarları</h3>
            <p className="text-sm text-gray-600 text-center">Platform konfigürasyonu</p>
          </button>

          <button
            onClick={() => navigate('/dashboard/create')}
            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-orange-200 rounded-xl hover:border-orange-400 hover:shadow-lg transition-all group"
          >
            <div className="p-4 bg-orange-100 rounded-full mb-4 group-hover:bg-orange-200 transition-colors">
              <BarChart3 className="text-orange-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Dashboard Oluştur</h3>
            <p className="text-sm text-gray-600 text-center">Kendi KPI dashboard'unuzu hazırlayın</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlatformAnalyticsPage;

