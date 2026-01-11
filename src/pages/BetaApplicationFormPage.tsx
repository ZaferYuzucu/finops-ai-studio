import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReCAPTCHA from 'react-google-recaptcha';
import { 
  Sparkles, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Users, 
  Target,
  CheckCircle,
  ArrowRight,
  Shield,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  SECTOR_OPTIONS, 
  COMPANY_SIZE_OPTIONS, 
  MAIN_CHALLENGE_OPTIONS 
} from '../types/betaApplication';
import { validateEmail } from '../components/FormValidation';
import { isLocalBetaQuotaFull, getLocalRemainingBetaQuota } from '../utils/betaQuota';

const BetaApplicationFormPage: React.FC = () => {
  const navigate = useNavigate();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { signup } = useAuth();
  const { i18n } = useTranslation();
  
  // Form states
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    sector: '',
    companySize: '',
    mainChallenges: [] as string[] // Çoklu seçim için array
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [recaptchaErrored, setRecaptchaErrored] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // reCAPTCHA Site Key
  // NOTE: reCAPTCHA yanlış domain/site-key eşleşmesinde formu kilitlememeli.
  // Default: disabled. Enable explicitly via env: VITE_RECAPTCHA_ENABLED="true" and VITE_RECAPTCHA_SITE_KEY.
  const recaptchaSiteKey = (import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined) || '';
  const isRecaptchaEnabled = import.meta.env.VITE_RECAPTCHA_ENABLED === 'true' && !!recaptchaSiteKey && !recaptchaErrored;

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Firma adı zorunludur';
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Yetkili kişi adı zorunludur';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-posta adresi zorunludur';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon numarası zorunludur';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Şifre zorunludur';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Şifre tekrarı zorunludur';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    if (!formData.sector) {
      newErrors.sector = 'Sektör seçimi zorunludur';
    }

    if (!formData.companySize) {
      newErrors.companySize = 'İşletme büyüklüğü seçimi zorunludur';
    }

    if (!formData.mainChallenges || formData.mainChallenges.length === 0) {
      newErrors.mainChallenges = 'Lütfen en az bir zorluk seçin';
    }

    if (isRecaptchaEnabled && !recaptchaValue) {
      newErrors.recaptcha = 'Lütfen robot olmadığınızı doğrulayın';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Quota guard (demo-safe, client-side)
      if (isLocalBetaQuotaFull()) {
        alert(`❌ Üzgünüz, Lansman Partneri kontenjanı dolmuştur.\nKalan Kontenjan: ${getLocalRemainingBetaQuota()}/20`);
        return;
      }

      // 1. Create user account (localStorage)
      await signup(formData.email, formData.password);
      console.log('✅ Kullanıcı hesabı oluşturuldu');

      // 2. Save beta application data to localStorage (instead of Firestore to avoid permission issues)
      const applicationData = {
        id: `beta_${Date.now()}`,
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        sector: formData.sector,
        status: 'approved', // Auto-approved for beta partners
        source: 'beta_form',
        appliedAt: new Date().toISOString(),
        surveyAnswers: {
          companySize: formData.companySize,
          mainChallenges: formData.mainChallenges.join(', ')
        }
      };

      // Save to localStorage
      const existingApplications = JSON.parse(localStorage.getItem('finops_beta_applications') || '[]');
      existingApplications.push(applicationData);
      localStorage.setItem('finops_beta_applications', JSON.stringify(existingApplications));
      console.log('✅ Beta başvuru verisi kaydedildi (localStorage)');
      // Best-effort notify other tabs/pages
      try {
        window.dispatchEvent(new Event('finops-beta-applications-updated'));
      } catch {
        // ignore
      }
      
      // Show success message
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        sector: '',
        companySize: '',
        mainChallenges: []
      });
      
      // Reset reCAPTCHA
      recaptchaRef.current?.reset();
      setRecaptchaValue(null);

      // Redirect to Turkish data entry page after 2 seconds
      setTimeout(() => {
        // Force Turkish language IMMEDIATELY
        i18n.changeLanguage('tr').then(() => {
          // Navigate using React Router (soft navigation, keeps cache)
          navigate('/veri-girisi?lang=tr');
        });
      }, 2000);

      // Also submit to server-side pool (for admin review)
      try {
        const response = await fetch('/api/beta-apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyName: formData.companyName,
            contactName: formData.contactName,
            email: formData.email,
            phone: formData.phone,
            sector: formData.sector,
            employeeCount: formData.companySize === 'micro' ? '1-10' : formData.companySize === 'small' ? '11-50' : '50+',
            description: 'Beta Başvuru Formu',
            source: 'beta_form',
          }),
        });
        // don't block UX; best-effort only
        await response.text();
      } catch {
        // ignore in demo/offline
      }
      
    } catch (error: any) {
      console.error('❌ KAYIT HATASI:', error);
      console.error('Hata mesajı:', error.message || error);
      
      // Friendly error messages
      let errorMessage = 'Kayıt sırasında bir hata oluştu.';
      let errorDetails = '';
      
      // Check for localStorage auth errors (string-based)
      if (error.message && error.message.includes('User already exists')) {
        errorMessage = 'Bu e-posta adresi zaten kullanımda!';
        errorDetails = '\n\nBu e-posta ile zaten bir hesap var. Lütfen başka bir e-posta adresi kullanın veya giriş yapın.';
      } 
      // Firebase auth errors (code-based)
      else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Bu e-posta adresi zaten kullanımda.';
        errorDetails = '\n\nBu e-posta ile zaten bir hesap var. Lütfen giriş yapın veya başka bir e-posta kullanın.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Geçersiz e-posta adresi.';
        errorDetails = '\n\nLütfen geçerli bir e-posta adresi girin.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Şifre çok zayıf.';
        errorDetails = '\n\nDaha güçlü bir şifre seçin (en az 6 karakter).';
      } else if (error.message) {
        errorDetails = '\n\nDetay: ' + error.message;
      }
      
      alert(errorMessage + errorDetails + '\n\n💡 Farklı bir e-posta adresi deneyin.');
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-16 h-16 text-green-600" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Hoş Geldiniz! 🎉
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Harika! Hesabınız oluşturuldu. 
            Şimdi verilerinizi yüklemeye hazırsınız!
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>Artık sisteminizdesiniz!</strong><br />
              Veri girişi sayfasına yönlendiriliyorsunuz...
            </p>
          </div>
          
          <p className="text-sm text-gray-500">
            Veri Girişi sayfasına yönlendiriliyorsunuz...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-purple-200 text-purple-700 px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Sparkles size={18} className="text-purple-500" />
            <span>Beta Partner Programı</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
              Beta Partner Kayıt
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Hesabınızı oluşturun ve <strong>1 yıl ücretsiz</strong> kullanmaya hemen başlayın!
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            <span>Anında Aktif</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-purple-600" />
            <span>1 Yıl Ücretsiz</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-blue-600" />
            <span>Güvenli & Gizli</span>
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Firma Adı */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Building2 className="inline w-4 h-4 mr-1" />
                Firma Adı *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 bg-white ${
                  errors.companyName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Örn: Acme Restaurant"
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
              )}
            </div>

            {/* Yetkili Kişi */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-1" />
                Yetkili Kişi *
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 bg-white ${
                  errors.contactName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Örn: Ahmet Yılmaz"
              />
              {errors.contactName && (
                <p className="mt-1 text-sm text-red-600">{errors.contactName}</p>
              )}
            </div>

            {/* E-posta & Telefon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-1" />
                  E-posta *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 bg-white ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ornek@firma.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  Telefon *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 bg-white ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0555 555 55 55"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Şifre & Şifre Tekrarı */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Lock className="inline w-4 h-4 mr-1" />
                  Şifre *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 bg-white ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="En az 6 karakter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Lock className="inline w-4 h-4 mr-1" />
                  Şifre Tekrarı *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 bg-white ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Şifrenizi tekrar girin"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Sektör */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Briefcase className="inline w-4 h-4 mr-1" />
                Sektörünüz *
              </label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white text-gray-900 ${
                  errors.sector ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="" className="text-gray-500">Sektör seçin...</option>
                {SECTOR_OPTIONS.map(option => (
                  <option key={option.value} value={option.value} className="text-gray-900">
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.sector && (
                <p className="mt-1 text-sm text-red-600">{errors.sector}</p>
              )}
            </div>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-600 font-semibold">
                  Anket Soruları (2 kısa soru)
                </span>
              </div>
            </div>

            {/* İşletme Büyüklüğü */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Users className="inline w-4 h-4 mr-1" />
                İşletme Büyüklüğünüz *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {COMPANY_SIZE_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, companySize: option.value }));
                      if (errors.companySize) {
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.companySize;
                          return newErrors;
                        });
                      }
                    }}
                    className={`p-4 border-2 rounded-xl text-left transition-all ${
                      formData.companySize === option.value
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.icon}</div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {option.label}
                    </div>
                  </button>
                ))}
              </div>
              {errors.companySize && (
                <p className="mt-2 text-sm text-red-600">{errors.companySize}</p>
              )}
            </div>

            {/* Ana Zorluklar (Çoklu Seçim) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Target className="inline w-4 h-4 mr-1" />
                En Çok Zorlandığınız Konular * <span className="text-xs text-gray-500">(Birden fazla seçebilirsiniz)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MAIN_CHALLENGE_OPTIONS.map(option => {
                  const isSelected = formData.mainChallenges.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setFormData(prev => {
                          const currentChallenges = [...prev.mainChallenges];
                          if (isSelected) {
                            // Seçimi kaldır
                            return {
                              ...prev,
                              mainChallenges: currentChallenges.filter(c => c !== option.value)
                            };
                          } else {
                            // Seçimi ekle
                            return {
                              ...prev,
                              mainChallenges: [...currentChallenges, option.value]
                            };
                          }
                        });
                        if (errors.mainChallenges) {
                          setErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors.mainChallenges;
                            return newErrors;
                          });
                        }
                      }}
                      className={`p-4 border-2 rounded-xl text-left transition-all relative ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-300 hover:border-purple-400'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="w-5 h-5 text-purple-600" />
                        </div>
                      )}
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {option.label}
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.mainChallenges && (
                <p className="mt-2 text-sm text-red-600">{errors.mainChallenges}</p>
              )}
              {formData.mainChallenges.length > 0 && (
                <p className="mt-2 text-sm text-green-600">
                  ✓ {formData.mainChallenges.length} zorluk seçildi
                </p>
              )}
            </div>

            {/* reCAPTCHA */}
            {isRecaptchaEnabled ? (
              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={recaptchaSiteKey}
                  onChange={(value) => setRecaptchaValue(value)}
                  onErrored={() => {
                    setRecaptchaErrored(true);
                    setRecaptchaValue(null);
                  }}
                  onExpired={() => setRecaptchaValue(null)}
                />
              </div>
            ) : (
              <p className="text-xs text-gray-500 text-center">
                reCAPTCHA şu an devre dışı (alan doğrulaması yapılmadı).
              </p>
            )}
            {errors.recaptcha && (
              <p className="text-sm text-red-600 text-center">{errors.recaptcha}</p>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Gönderiliyor...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    <span>Hadi Başlayalım!</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>

            {/* Privacy note */}
            <p className="text-xs text-gray-500 text-center">
              Kaydolarak, <a href="/legal/terms-of-service" className="text-purple-600 hover:underline">Kullanım Koşulları</a> ve <a href="/legal/privacy-policy" className="text-purple-600 hover:underline">Gizlilik Politikamızı</a> kabul etmiş olursunuz.
            </p>
          </form>
        </motion.div>

        {/* Back to home link */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
          >
            ← Ana Sayfaya Dön
          </a>
        </div>
      </div>
    </div>
  );
};

export default BetaApplicationFormPage;
