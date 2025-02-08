"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import en from './locales/en';
import zh from './locales/zh';

type Locale = 'en' | 'zh';
type Translations = typeof en;

// 添加递归类型来支持嵌套的键
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)];

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: <T = string>(key: NestedKeyOf<Translations>) => T;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<Locale>('en');

  const translations = {
    en,
    zh,
  };

  const t = <T = string>(key: NestedKeyOf<Translations>): T => {
    try {
      return getNestedValue(translations[currentLocale], key) as T;
    } catch {
      return key as unknown as T;
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

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((current: unknown, key: string) => {
    if (current && typeof current === 'object') {
      return (current as Record<string, unknown>)[key];
    }
    return key;
  }, obj);
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 