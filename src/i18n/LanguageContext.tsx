"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import en from './locales/en';
import zh from './locales/zh';

type Locale = 'en' | 'zh';
type Translations = typeof en;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<Locale>('en');

  const translations = {
    en,
    zh,
  };

  const t = (key: keyof Translations): string => {
    try {
      return getNestedValue(translations[currentLocale], key);
    } catch {
      return key;
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        locale: currentLocale,
        setLocale: setCurrentLocale,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  return path.split('.').reduce((current: unknown, key: string) => {
    if (current && typeof current === 'object') {
      return (current as Record<string, unknown>)[key];
    }
    return key;
  }, obj) as string;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 