'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [fontScale, setFontScale] = useState('normal');
  const { t } = useTranslation('common');
  const language = i18n.resolvedLanguage || i18n.language || 'en';
  const setLanguage = (nextLanguage) => i18n.changeLanguage(nextLanguage);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  useEffect(() => {
    const savedFontScale = window.localStorage.getItem('govconnect-font-scale');
    if (['small', 'normal', 'large'].includes(savedFontScale)) setFontScale(savedFontScale);
  }, []);
  useEffect(() => {
    window.localStorage.setItem('govconnect-font-scale', fontScale);
    document.documentElement.dataset.fontScale = fontScale;
  }, [fontScale]);
  return <LanguageContext.Provider value={{ language, setLanguage, fontScale, setFontScale, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
