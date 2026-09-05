'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { languages, translate } from '@/lib/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('govconnect-language');
    if (languages.includes(savedLanguage)) setLanguage(savedLanguage);
  }, []);
  useEffect(() => {
    window.localStorage.setItem('govconnect-language', language);
    document.documentElement.lang = language;
  }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage, t: (key) => translate(language, key) }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
