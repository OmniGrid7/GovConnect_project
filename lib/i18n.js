import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en/common.json';
import mr from '@/locales/mr/common.json';
import hi from '@/locales/hi/common.json';

const resources = {
  en: { common: en },
  mr: { common: mr },
  hi: { common: hi }
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      supportedLngs: ['en', 'mr', 'hi'],
      ns: ['common'],
      defaultNS: 'common',
      cleanCode: true,
      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: 'govconnect-language',
        caches: ['localStorage']
      },
      interpolation: { escapeValue: false },
      react: { useSuspense: false }
    });
}

export default i18n;
