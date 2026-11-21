'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import uz, { type Dict } from './uz';
import ru from './ru';
import en from './en';
import { storage } from '@/services/storage';

export type Locale = 'uz' | 'ru' | 'en';
export const LOCALES: Locale[] = ['uz', 'ru', 'en'];
const DICTS: Record<Locale, Dict> = { uz, ru, en };

interface Ctx {
  locale: Locale;
  t: Dict;
  setLocale: (l: Locale) => void;
}

const I18nContext = createContext<Ctx>({ locale: 'uz', t: uz, setLocale: () => {} });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // O‘zbek (lotin) — standart til
  const [locale, setLocaleState] = useState<Locale>('uz');

  useEffect(() => {
    const saved = storage.get<Locale | null>('locale', null);
    if (saved && LOCALES.includes(saved)) setLocaleState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    storage.set('locale', l);
  }, []);

  return <I18nContext.Provider value={{ locale, t: DICTS[locale], setLocale }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
export const useT = () => useContext(I18nContext).t;
export const dictFor = (l: Locale) => DICTS[l];
