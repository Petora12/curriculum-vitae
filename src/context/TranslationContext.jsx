import React, { createContext, useState, useEffect } from 'react';
import enUS from '../i18n/translations/en-US.json';
import ptPT from '../i18n/translations/pt-PT.json';

// eslint-disable-next-line react-refresh/only-export-components
export const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [language, setLanguageState] = useState('en-US');

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en-US', 'pt-PT'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const translationMap = {
    'en-US': enUS,
    'pt-PT': ptPT,
  };

  const translations = translationMap[language];

  return (
    <TranslationContext.Provider
      value={{
        language,
        setLanguage,
        translations,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}
