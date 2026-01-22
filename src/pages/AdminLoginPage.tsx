/**
 * SECURITY-CRITICAL: Admin Login Page
 * 
 * ⚠️ DO NOT MODIFY WITHOUT SECURITY TEAM APPROVAL
 * 
 * Admin authentication uses server-side HMAC session cookies.
 * NO localStorage/sessionStorage flags allowed.
 * 
 * @stability LOCKED
 * @security CRITICAL
 */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdminLoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // SECURITY-CRITICAL: Server-side password verification
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include httpOnly cookie
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Yanlış şifre. Lütfen tekrar deneyin.');
        } else {
          const data = await response.json().catch(() => ({}));
          setError(data.error || 'Giriş başarısız. Lütfen tekrar deneyin.');
        }
        setLoading(false);
        return;
      }

      console.log('✅ Admin girişi başarılı!');

      // Redirect to intended page or office
      const queryParams = new URLSearchParams(location.search);
      const redirectPath = queryParams.get('redirect') || '/office';
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      console.error('❌ Admin login error:', err);
      setError('Bağlantı hatası. Lütfen tekrar deneyin.');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">{t('platformAnalytics.adminLogin.title')}</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">{t('platformAnalytics.adminLogin.password')}</label>
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
              disabled={loading}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Giriş yapılıyor...' : t('platformAnalytics.adminLogin.loginButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
