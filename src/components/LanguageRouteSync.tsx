import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * Keeps i18n language in sync with `?lang=tr|en` on SPA navigations.
 * This is important because i18next language detection does not re-run on route changes.
 */
export default function LanguageRouteSync() {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lang = params.get('lang');

    if (lang === 'tr' || lang === 'en') {
      if (i18n.resolvedLanguage !== lang) {
        void i18n.changeLanguage(lang);
      }
    }
  }, [location.search, i18n]);

  return null;
}

