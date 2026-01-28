
import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import FinopsDataFlowAnimation from '../components/FinopsDataFlowAnimation';
import { useTranslation } from 'react-i18next';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const LoginPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const navigate = useNavigate();
  const { login, signInWithGoogle } = useAuth();

  // reCAPTCHA - Sadece environment variable tanımlıysa aktif
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';
  const isRecaptchaEnabled = false; // Beta aşamasında devre dışı

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ReCAPTCHA sadece aktifse kontrol et
    if (isRecaptchaEnabled && !recaptchaValue) {
      setError(t('login.recaptchaError'));
      return;
    }
    
    if (!isRecaptchaEnabled) {
      console.log('⚠️ reCAPTCHA devre dışı (DEV modu)');
    }
    
    setError('');
    try {
      await login(email, password);
      
      // ✅ Pricing'den gelen kullanıcıyı geri yönlendir
      const selectedPlan = sessionStorage.getItem('selectedPlan');
      if (selectedPlan) {
        sessionStorage.removeItem('selectedPlan');
        navigate('/pricing', { state: { autoSelectPlan: selectedPlan } });
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(t('login.loginError'));
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      
      const selectedPlan = sessionStorage.getItem('selectedPlan');
      if (selectedPlan) {
        sessionStorage.removeItem('selectedPlan');
        navigate('/pricing', { state: { autoSelectPlan: selectedPlan } });
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(t('login.googleError'));
      console.error(err);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError(t('login.emailRequired') || 'Lütfen önce email adresinizi girin.');
      return;
    }

    setError('');
    setSuccess('');
    setResetLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(t('login.resetEmailSent') || 'Şifre sıfırlama linki email adresinize gönderildi.');
    } catch (err: any) {
      console.error('Password reset error:', err);
      if (err.code === 'auth/user-not-found') {
        setError(t('login.userNotFound') || 'Bu email adresi ile kayıtlı kullanıcı bulunamadı.');
      } else {
        setError(t('login.resetError') || 'Şifre sıfırlama linki gönderilemedi.');
      }
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden lg:flex flex-col w-1/2 bg-gray-50 items-center justify-center p-12 text-center">
        <div className="max-w-xl w-full">
          <h1 className="text-4xl font-bold text-gray-800">FINOPS AI Data Platform</h1>
          <p className="mt-4 text-lg text-gray-600 mb-8">Everything you need to move from data to action—effortlessly.</p>
          <FinopsDataFlowAnimation />
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{t('login.title')}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {t('login.noAccount')}{' '}
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                {t('login.signUp')}
              </Link>
            </p>
          </div>

          {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
          {success && <p className="bg-green-100 text-green-700 p-3 rounded-md mb-4 text-sm">{success}</p>}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={t('login.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-b-md relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={t('login.passwordPlaceholder')}
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

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={resetLoading}
                  className="font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
                >
                  {resetLoading ? 'Gönderiliyor...' : (t('login.forgotPassword') || 'Şifremi Unuttum')}
                </button>
              </div>
            </div>

            {/* Google reCAPTCHA */}
            <div className="flex justify-center">
              {isRecaptchaEnabled && (
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={recaptchaSiteKey}
                  onChange={(value) => setRecaptchaValue(value)}
                  hl={i18n.language}
                />
              )}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('login.loginButton')}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t('login.or')}</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                   <path d="M20 10.021C20 9.22 19.928 8.447 19.79 7.695H10.204V12.33h5.456c-.246 1.66-1.397 3.28-3.053 4.31v2.79h3.58c2.094-1.928 3.32-4.78 3.32-8.414z" />
                   <path d="M10.204 20c2.83 0 5.204-.934 6.938-2.532l-3.58-2.79c-.938.63-2.14.998-3.358.998-2.58 0-4.76-1.74-5.535-4.08H1.03v2.87C2.79 17.05 6.22 20 10.204 20z" />
                   <path fillRule="evenodd" d="M4.665 11.933a6.002 6.002 0 01-.001-3.866V5.19H1.03C.38 6.43.01 7.82.01 9.299c0 1.48.37 2.87 1.02 4.11l3.635-2.476z" clipRule="evenodd" />
                   <path d="M10.204 3.98c1.55 0 2.92.532 4.02 1.58l3.16-3.16C15.405.933 12.93 0 10.204 0 6.22 0 2.79 2.95 1.03 6.81l3.634 2.87c.775-2.34 2.955-4.08 5.54-4.08z" />
                </svg>
                {t('login.googleButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
