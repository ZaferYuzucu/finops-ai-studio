/**
 * Admin Panel - Kullanıcı Yönetimi
 * Tüm kullanıcıları görüntüle, düzenle, plan değiştir
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Shield, 
  Crown, 
  Rocket, 
  Search, 
  Filter, 
  Edit, 
  Ban, 
  CheckCircle,
  Calendar,
  Mail,
  Building,
  AlertCircle
} from 'lucide-react';
interface UserData {
  id: string;
  email: string;
  displayName?: string;
  createdAt: string;
  role: 'user' | 'admin';
  plan: 'free' | 'beta_partner' | 'startup' | 'growth' | 'enterprise';
  isActive: boolean;
  lastLogin?: string;
  companyName?: string;
}

// localStorage helpers
const USERS_STORAGE_KEY = 'finops_users_management';

function getStoredUsers(): UserData[] {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveUsers(users: UserData[]): void {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('all');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Kullanıcıları yükle
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      
      // localStorage'dan kullanıcıları yükle
      const usersData = getStoredUsers();
      
      // Eğer hiç kullanıcı yoksa, mock data ekle
      if (usersData.length === 0) {
        const mockUsers: UserData[] = [
          {
            id: 'admin_001',
            email: 'admin@finops.ai',
            displayName: 'Admin',
            createdAt: new Date().toISOString(),
            role: 'admin',
            plan: 'enterprise',
            isActive: true,
            companyName: 'FinOps AI Studio'
          }
        ];
        saveUsers(mockUsers);
        setUsers(mockUsers);
      } else {
        setUsers(usersData.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      }
    } catch (error: any) {
      console.error('Kullanıcılar yüklenirken hata:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Filtreleme
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.companyName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlan = filterPlan === 'all' || user.plan === filterPlan;
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesPlan && matchesRole;
  });

  // İstatistikler
  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    betaPartners: users.filter(u => u.plan === 'beta_partner').length,
    activeUsers: users.filter(u => u.isActive).length,
  };

  // Plan değiştir
  const handleChangePlan = async (userId: string, newPlan: string) => {
    try {
      const usersData = getStoredUsers();
      const index = usersData.findIndex(u => u.id === userId);
      if (index !== -1) {
        usersData[index].plan = newPlan as any;
        saveUsers(usersData);
        alert(`✅ Plan ${newPlan} olarak güncellendi!`);
        loadUsers();
      }
    } catch (error) {
      console.error('Plan değiştirme hatası:', error);
      alert('❌ Plan değiştirilemedi!');
    }
  };

  // Kullanıcı aktif/pasif
  const handleToggleActive = async (userId: string, currentStatus: boolean) => {
    try {
      const usersData = getStoredUsers();
      const index = usersData.findIndex(u => u.id === userId);
      if (index !== -1) {
        usersData[index].isActive = !currentStatus;
        saveUsers(usersData);
        alert(`✅ Kullanıcı ${!currentStatus ? 'aktif' : 'pasif'} edildi!`);
        loadUsers();
      }
    } catch (error) {
      console.error('Durum değiştirme hatası:', error);
      alert('❌ Durum değiştirilemedi!');
    }
  };

  // Plan badge
  const getPlanBadge = (plan: string) => {
    const plans = {
      free: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Ücretsiz', icon: Users },
      beta_partner: { bg: 'bg-gradient-to-r from-purple-500 to-pink-500', text: 'text-white', label: 'Beta Partner', icon: Rocket },
      startup: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Girişimci', icon: Building },
      growth: { bg: 'bg-green-100', text: 'text-green-700', label: 'İşletme Dostu', icon: Crown },
      enterprise: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Kurumsal', icon: Shield },
    };
    
    const planData = plans[plan as keyof typeof plans] || plans.free;
    const Icon = planData.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${planData.bg} ${planData.text}`}>
        <Icon className="w-3 h-3" />
        {planData.label}
      </span>
    );
  };

  // Role badge
  const getRoleBadge = (role: string) => {
    return role === 'admin' ? (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
        <Shield className="w-3 h-3" />
        Yönetici
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
        <Users className="w-3 h-3" />
        Kullanıcı
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Kullanıcılar yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Users className="w-10 h-10 text-indigo-600" />
            Kullanıcı Yönetimi
          </h1>
          <p className="text-gray-600 mb-4">
            Sisteme kayıt olmuş kullanıcıları yönetin, planları düzenleyin ve erişim kontrolü yapın.
          </p>
          
          {/* Bilgilendirme Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 mb-1">Bu Sayfa Ne İçin?</h3>
                <p className="text-sm text-blue-800 mb-2">
                  ✅ Zaten <strong>sisteme kayıt olmuş</strong> kullanıcıların planlarını değiştirmek<br />
                  ✅ Kullanıcıları aktif/pasif yapmak<br />
                  ✅ Kullanıcı istatistiklerini görüntülemek
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-blue-700">📧 <strong>Yeni firmalara teklif göndermek için:</strong></span>
                  <Link 
                    to="/admin/beta-applications" 
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                  >
                    🚀 Beta Başvuruları Sayfası
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Kullanıcı</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          
          <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-800">Admin</p>
                <p className="text-3xl font-bold text-red-900">{stats.admins}</p>
              </div>
              <Shield className="w-12 h-12 text-red-400" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-sm border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-800">Beta Partner</p>
                <p className="text-3xl font-bold text-purple-900">{stats.betaPartners}</p>
              </div>
              <Rocket className="w-12 h-12 text-purple-400" />
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-800">Aktif Kullanıcı</p>
                <p className="text-3xl font-bold text-green-900">{stats.activeUsers}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
          </div>
        </div>

        {/* Filtreler ve Arama */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Arama */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="E-posta, isim veya firma ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Plan Filtresi */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none bg-white min-w-[200px]"
              >
                <option value="all">📊 Tüm Planlar</option>
                <option value="free">🆓 Ücretsiz</option>
                <option value="beta_partner">🚀 Beta Partner</option>
                <option value="startup">💼 Girişimci</option>
                <option value="growth">📈 İşletme Dostu</option>
                <option value="enterprise">🏢 Kurumsal</option>
              </select>
            </div>

            {/* Role Filtresi */}
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none bg-white min-w-[180px]"
              >
                <option value="all">👥 Tüm Roller</option>
                <option value="user">👤 Kullanıcı</option>
                <option value="admin">🛡️ Yönetici</option>
              </select>
            </div>
          </div>
        </div>

        {/* Kullanıcılar Tablosu */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Kullanıcı</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Firma</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Plan</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Role</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Durum</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Kayıt Tarihi</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center text-gray-500">
                      <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                      <p className="text-xl font-bold text-gray-700 mb-2">
                        {users.length === 0 ? 'Henüz Kayıtlı Kullanıcı Yok' : 'Kullanıcı Bulunamadı'}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        {users.length === 0 
                          ? 'İlk kullanıcı kaydı yapıldığında burada görünecek.' 
                          : 'Filtrelerinizi değiştirin veya arama yapın.'}
                      </p>
                      {users.length === 0 && (
                        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg text-blue-700 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>Yeni firmalar için <strong>Beta Başvuruları</strong> sayfasını kullanın</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{user.displayName || 'Adsız Kullanıcı'}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700">{user.companyName || '-'}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {getPlanBadge(user.plan)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {user.isActive ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3" />
                            Aktif
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
                            <Ban className="w-3 h-3" />
                            Pasif
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowEditModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Düzenle"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleToggleActive(user.id, user.isActive)}
                            className={`p-2 ${user.isActive ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'} rounded-lg transition-colors`}
                            title={user.isActive ? 'Pasif Et' : 'Aktif Et'}
                          >
                            {user.isActive ? <Ban className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Düzenleme Modal */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-8">
              <h2 className="text-2xl font-bold mb-6">Kullanıcı Düzenle</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">E-posta</p>
                  <p className="text-gray-900">{selectedUser.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plan Değiştir
                  </label>
                  <select
                    defaultValue={selectedUser.plan}
                    onChange={(e) => handleChangePlan(selectedUser.id, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="free">🆓 Ücretsiz</option>
                    <option value="beta_partner">🚀 Beta Partner</option>
                    <option value="startup">💼 Girişimci</option>
                    <option value="growth">📈 İşletme Dostu</option>
                    <option value="enterprise">🏢 Kurumsal</option>
                  </select>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                }}
                className="w-full px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
              >
                Kapat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementPage;

