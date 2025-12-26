
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const AdminLoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // URL bilgilerini almak için

  // Bu şifreyi daha güvenli bir yerden (örneğin, ortam değişkenleri) almak en iyisidir.
  const ADMIN_PASSWORD = 'ATA1923'; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      // Güvenlik anahtarını oturum deposuna kaydet
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      
      // URL'deki 'redirect' parametresini oku
      const queryParams = new URLSearchParams(location.search);
      const redirectPath = queryParams.get('redirect');
      
      // Eğer bir yönlendirme adresi varsa o adrese git.
      // Yoksa, varsayılan olarak ana yönetici paneline yönlendir.
      navigate(redirectPath || '/admin/panel'); 
    } else {
      setError('Yanlış şifre. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Yönetici Girişi</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Yönetici Şifresi</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-3 py-2 pr-10 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Giriş Yap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
