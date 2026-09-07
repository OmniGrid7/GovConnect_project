'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { languages, translate } from '@/lib/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [fontScale, setFontScale] = useState('normal');
  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('govconnect-language');
    if (languages.includes(savedLanguage)) setLanguage(savedLanguage);
  }, []);
  useEffect(() => {
    window.localStorage.setItem('govconnect-language', language);
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
  return <LanguageContext.Provider value={{ language, setLanguage, fontScale, setFontScale, t: (key) => translate(language, key) }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
