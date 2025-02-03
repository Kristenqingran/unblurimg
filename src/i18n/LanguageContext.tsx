"use client";

import { createContext, useContext, useState } from 'react';
import en from './locales/en';
import zh from './locales/zh';

type LocaleType = {
  [key: string]: any;
};

const locales: { [key: string]: LocaleType } = { en, zh };
type Locale = keyof typeof locales;

const LanguageContext = createContext({
  locale: 'en' as Locale,
  setLocale: (locale: Locale) => {},
  t: (key: string) => ''
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  const t = (key: string) => {
    try {
      const keys = key.split('.');
      let value: any = locales[locale];
      for (const k of keys) {
        value = value[k];
      }
      return value || key;
    } catch (error) {
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext); 