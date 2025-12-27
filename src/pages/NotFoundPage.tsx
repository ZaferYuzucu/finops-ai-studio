import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <h1 className="text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t('notFound.title', 'Sayfa Bulunamadı')}
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          {t('notFound.description', 'Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.')}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-200 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('notFound.goBack', 'Geri Dön')}
          </button>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium"
          >
            <Home className="w-5 h-5" />
            {t('notFound.goHome', 'Ana Sayfaya Git')}
          </Link>
        </div>

        {/* Help Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            {t('notFound.helpText', 'Yardıma mı ihtiyacınız var?')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link to="/" className="text-blue-600 hover:text-blue-700 hover:underline">
              {t('notFound.homepage', 'Ana Sayfa')}
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/features" className="text-blue-600 hover:text-blue-700 hover:underline">
              {t('notFound.features', 'Özellikler')}
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/pricing" className="text-blue-600 hover:text-blue-700 hover:underline">
              {t('notFound.pricing', 'Fiyatlandırma')}
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/contact" className="text-blue-600 hover:text-blue-700 hover:underline">
              {t('notFound.contact', 'İletişim')}
            </Link>
          </div>
        </div>

        {/* Search Suggestion (Optional) */}
        <div className="mt-8 p-6 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl">
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-3">
            <Search className="w-5 h-5" />
            <span className="font-medium">
              {t('notFound.searchTitle', 'Aradığınızı Bulamadınız mı?')}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {t('notFound.searchDescription', 'Dashboard\'unuzda arama yapabilir veya destek ekibimizle iletişime geçebilirsiniz.')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;




