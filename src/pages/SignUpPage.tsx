import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../components/FormValidation';
import FinopsDataFlowAnimation from '../components/FinopsDataFlowAnimation';
import { useTranslation } from 'react-i18next';

const SignUpPage: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const navigate = useNavigate();
  const { signup, signInWithGoogle } = useAuth();
  
  // Google reCAPTCHA Site Key
  const recaptchaSiteKey = '6LfE4jUsAAAAAOKH1f0ich9FAHIyr81efhTq5XyD';
  const isRecaptchaEnabled = true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // reCAPTCHA kontrolü (sadece aktifse)
    if (isRecaptchaEnabled && !recaptchaValue) {
      setError(t('signup.recaptchaError'));
      return;
    }
    
    if (!isRecaptchaEnabled) {
      console.log('⚠️ reCAPTCHA test modu - güvenlik kontrolü atlandı');
    }
    
    // Email validasyonu
    if (!validateEmail(email)) {
      setError(t('signup.emailError'));
      return;
    }
    
    // Şifre uzunluk validasyonu
    if (!validatePassword(password)) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return;
    }
    
    // Şifre eşleşme kontrolü
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor! Lütfen aynı şifreyi iki kez girin.');
      return;
    }
    
    setError('');
    try {
      await signup(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      // Firebase hata mesajlarını daha anlaşılır hale getir
      const errorMessage = err.message || err.toString();
      if (errorMessage.includes('email-already-in-use')) {
        setError('Bu e-posta adresi zaten kullanımda. Lütfen giriş yapın veya başka bir e-posta deneyin.');
      } else if (errorMessage.includes('weak-password')) {
        setError('Şifre çok zayıf. Lütfen daha güçlü bir şifre seçin.');
      } else if (errorMessage.includes('invalid-email')) {
        setError('Geçersiz e-posta adresi formatı.');
      } else {
        setError('Kayıt başarısız. Lütfen tekrar deneyin: ' + errorMessage);
      }
      console.error('Signup error:', err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      setError(t('signup.googleError'));
      console.error(err);
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
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{t('signup.title')}</h2>
                <p className="mt-2 text-sm text-gray-600">
                    {t('signup.subtitle')}{' '}
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    {t('signup.signIn')}
                    </Link>
                </p>
            </div>
            {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
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
                        placeholder={t('signup.emailPlaceholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        className={`appearance-none relative block w-full px-3 py-3 pr-10 border ${
                          password && password.length < 6
                            ? 'border-yellow-500'
                            : password && password.length >= 6
                            ? 'border-green-500'
                            : 'border-gray-300'
                        } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder={t('signup.passwordPlaceholder')}
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
                    {password && password.length < 6 && (
                      <p className="text-xs text-yellow-600 mt-1">⚠️ En az 6 karakter gerekli ({password.length}/6)</p>
                    )}
                    {password && password.length >= 6 && (
                      <p className="text-xs text-green-600 mt-1">✓ Şifre uzunluğu yeterli</p>
                    )}
                    </div>
                    <div className="relative">
                    <input
                        id="confirm-password"
                        name="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        className={`appearance-none rounded-b-md relative block w-full px-3 py-3 pr-10 border ${
                          confirmPassword && password && password !== confirmPassword 
                            ? 'border-red-500' 
                            : confirmPassword && password && password === confirmPassword
                            ? 'border-green-500'
                            : 'border-gray-300'
                        } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder={t('signup.confirmPasswordPlaceholder')}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    {confirmPassword && password && password !== confirmPassword && (
                      <p className="text-xs text-red-600 mt-1">❌ Şifreler eşleşmiyor</p>
                    )}
                    {confirmPassword && password && password === confirmPassword && (
                      <p className="text-xs text-green-600 mt-1">✓ Şifreler eşleşiyor</p>
                    )}
                    </div>
                </div>
                <p className="text-xs text-gray-500">
                    {t('signup.termsAgreement')}{' '}
                    <Link to="/legal/terms-of-service" className="font-medium text-indigo-600 hover:text-indigo-500">{t('signup.termsOfService')}</Link>{' '}{t('signup.and')}{' '}
                    <Link to="/legal/privacy-policy" className="font-medium text-indigo-600 hover:text-indigo-500">{t('signup.privacyPolicy')}</Link>.
                </p>
                
                {/* Google reCAPTCHA */}
                {isRecaptchaEnabled && (
                  <div className="flex justify-center">
                      <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={recaptchaSiteKey}
                          onChange={(value) => setRecaptchaValue(value)}
                      />
                  </div>
                )}
                
                <div>
                    <button
                    type="submit"
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    {t('signup.signUpButton')}
                    </button>
                </div>
            </form>
            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">{t('signup.or')}</span>
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        {t('signup.googleButton')}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
