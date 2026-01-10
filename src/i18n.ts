
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ✅ DOĞRUDAN IMPORT - src/ içinden yükleniyor!
import translationTR from './locales/tr/translation.json';
import translationEN from './locales/en/translation.json';

/**
 * Compatibility aliases:
 * Some pages reference `dataImport.*` while the JSON currently nests this under
 * `platformAnalytics.dataImport.*`. To avoid breaking changes across the app,
 * we alias it here for both languages.
 */
function applyTranslationAliases(translation: any) {
  if (!translation?.dataImport && translation?.platformAnalytics?.dataImport) {
    translation.dataImport = translation.platformAnalytics.dataImport;
  }
}

applyTranslationAliases(translationTR as any);
applyTranslationAliases(translationEN as any);

const resources = {
  tr: {
    translation: translationTR
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources, // ✅ Translation'lar DOĞRUDAN yüklü
    supportedLngs: ['en', 'tr'],
    fallbackLng: 'tr',
    lng: 'tr', // Force Turkish as default
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    detection: {
      // Prefer explicit URL selection for deep links like /veri-girisi?lang=tr
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
    },
  });

export default i18n;
