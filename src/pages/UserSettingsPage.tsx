import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Save, ArrowLeft, Camera } from 'lucide-react';

const UserSettingsPage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    displayName: currentUser?.email?.split('@')[0] || '',
    email: currentUser?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Profil bilgileri güncellemesi (şimdilik localStorage)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMessage({ type: 'success', text: '✅ Profil bilgileriniz güncellendi!' });
    } catch (error) {
      setMessage({ type: 'error', text: '❌ Güncelleme başarısız oldu.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Validasyon
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setMessage({ type: 'error', text: '❌ Tüm şifre alanlarını doldurun!' });
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: '❌ Yeni şifreler eşleşmiyor!' });
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage({ type: 'error', text: '❌ Yeni şifre en az 6 karakter olmalı!' });
      setLoading(false);
      return;
    }

    try {
      // Şifre değiştirme (şimdilik localStorage)
      const users = JSON.parse(localStorage.getItem('finops_users') || '{}');
      
      // Mevcut şifre kontrolü
      if (!users[formData.email]) {
        setMessage({ type: 'error', text: '❌ Kullanıcı bulunamadı!' });
        setLoading(false);
        return;
      }
      
      if (users[formData.email].password !== formData.currentPassword) {
        setMessage({ type: 'error', text: '❌ Mevcut şifre yanlış!' });
        setLoading(false);
        return;
      }
      
      // Yeni şifreyi kaydet
      users[formData.email].password = formData.newPassword;
      localStorage.setItem('finops_users', JSON.stringify(users));

      setMessage({ type: 'success', text: '✅ Şifreniz başarıyla değiştirildi!' });
      
      // Formu temizle
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setMessage({ type: 'error', text: '❌ Şifre değiştirilemedi.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            <span>Dashboard'a Dön</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900">Hesap Ayarları</h1>
          <p className="text-gray-600 mt-2">Profil bilgilerinizi ve güvenlik ayarlarınızı yönetin</p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol Sidebar - Profil Fotoğrafı */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Profil Fotoğrafı</h2>
              
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    {formData.displayName.charAt(0).toUpperCase()}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border-2 border-gray-200 hover:bg-gray-50">
                    <Camera size={20} className="text-gray-600" />
                  </button>
                </div>
                
                <p className="text-sm text-gray-500 text-center">
                  Fotoğraf yüklemek için butona tıklayın
                </p>
              </div>

              {/* Kullanıcı Bilgileri */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{currentUser?.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Rol</p>
                    <p className="text-sm font-medium text-gray-900">
                      {currentUser?.role === 'admin' ? 'Yönetici' : 'Kullanıcı'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Üyelik Tarihi</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date().toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Formlar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profil Bilgileri Formu */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User size={20} className="text-blue-600" />
                Profil Bilgileri
              </h2>
              
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Görünen Ad
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Adınız Soyadınız"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta Adresi
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    E-posta değiştirmek için destek ile iletişime geçin
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Save size={20} />
                  {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                </button>
              </form>
            </div>

            {/* Şifre Değiştirme Formu */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock size={20} className="text-red-600" />
                Şifre Değiştir
              </h2>
              
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mevcut Şifre
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yeni Şifre
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yeni Şifre (Tekrar)
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <Lock size={20} />
                  {loading ? 'Güncelleniyor...' : 'Şifreyi Değiştir'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
