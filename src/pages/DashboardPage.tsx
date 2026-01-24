
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, BarChart3, TrendingUp, LogOut, PlusSquare, FileText, Trash2, Eye } from 'lucide-react';
import UsageLimitsPanel from '../components/UsageLimitsPanel';
import { getUserUploadedFiles, deleteUploadedFile, type UploadedFile } from '../utils/userDataStorage';
import { getUserDashboardConfigs, deleteUserDashboardConfig } from '../utils/wizardToConfig';

const DashboardPage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Yüklenen dosyaları getir
  useEffect(() => {
    if (currentUser?.email) {
      const files = getUserUploadedFiles(currentUser.email);
      setUploadedFiles(files);
    }
  }, [currentUser, refreshKey]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Çıkış sırasında hata oluştu:", error);
    }
  };

  const handleDeleteFile = (fileId: string) => {
    if (confirm('Bu dosyayı silmek istediğinizden emin misiniz?')) {
      deleteUploadedFile(fileId);
      if (currentUser?.email) {
        setUploadedFiles(getUserUploadedFiles(currentUser.email));
      }
    }
  };

  const handleDeleteDashboard = (dashboardId: string) => {
    if (!currentUser?.email) return;
    if (confirm('Bu dashboard\'u silmek istediğinizden emin misiniz?')) {
      deleteUserDashboardConfig(currentUser.email, dashboardId);
      setRefreshKey(prev => prev + 1);
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

        {/* Main Content - Full Width */}
        <div className="max-w-7xl mx-auto space-y-6 mb-8">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Veri Yükle */}
          <button
            onClick={() => navigate('/veri-girisi?lang=tr')}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-blue-200 hover:border-blue-400 text-left group"
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

          {/* Dashboard Oluştur */}
          <button
            onClick={() => navigate('/dashboard/create-wizard')}
            className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-indigo-200 hover:border-indigo-400 text-left group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-indigo-100 rounded-lg group-hover:bg-indigo-600 transition-colors">
                <PlusSquare className="text-indigo-600 group-hover:text-white transition-colors" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Dashboard Oluştur</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Kendi dashboard’unu oluştur ve kaydet
            </p>
          </button>

          {/* FINOPS AI Sihirbazı */}
          <button
            onClick={() => navigate('/dashboard/smart-create')}
            className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-purple-300 hover:border-purple-500 text-left group relative"
          >
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-purple-600 text-white text-[10px] font-bold rounded-md shadow-sm">
              AI
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                <svg className="w-7 h-7 text-purple-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                FINOPS Senin İçin Yapsın
              </h3>
            </div>
            <p className="text-gray-700 text-sm font-medium">
              AI otomatik dashboard oluşturur
            </p>
          </button>
        </div>

        {/* Kullanıcı Dashboard'ları */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">📊 Kayıtlı Dashboard'larım</h2>
                <button
                  onClick={() => navigate('/dashboard/my')}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
                >
                  Tümünü Gör
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {(() => {
                const userDashboards = currentUser?.email ? getUserDashboardConfigs(currentUser.email) : [];
                void refreshKey; // Trigger re-render on delete
                
                return userDashboards.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <BarChart3 className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-lg font-medium mb-2">Henüz dashboard oluşturmadınız</p>
                    <p className="text-sm">Manuel veya AI ile dashboard oluşturabilirsiniz!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userDashboards.map((dashboard: any) => (
                      <div
                        key={dashboard.id}
                        className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200 hover:border-indigo-400 transition-all group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="text-2xl">{dashboard.icon}</div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => navigate(`/dashboard/view-standard/${dashboard.id}`)}
                              className="p-1.5 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                              title="Görüntüle"
                            >
                              <Eye className="w-4 h-4 text-green-600" />
                            </button>
                            <button
                              onClick={() => handleDeleteDashboard(dashboard.id)}
                              className="p-1.5 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                              title="Sil"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1 truncate">{dashboard.title}</h3>
                        <p className="text-sm text-gray-600 truncate">{dashboard.subtitle}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            {dashboard.kpis.length} KPI • {dashboard.charts.length} Grafik
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(dashboard.createdAt).toLocaleDateString('tr-TR')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Yüklenen Veriler */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">📁 Yüklenen Verilerim</h2>
                <span className="text-sm text-gray-500">{uploadedFiles.length} dosya</span>
              </div>
              
              {uploadedFiles.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-lg font-medium mb-2">Henüz veri yüklemediniz</p>
                  <p className="text-sm">Başlamak için yukarıdaki "Veri Yükle" butonuna tıklayın!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <FileText className="text-blue-600 flex-shrink-0" size={24} />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-medium truncate">{file.fileName}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(file.uploadedAt).toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                          {file.fileSize && ` • ${(file.fileSize / 1024).toFixed(1)} KB`}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteFile(file.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                        title="Sil"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
