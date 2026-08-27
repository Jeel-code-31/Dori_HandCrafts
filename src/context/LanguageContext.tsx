'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, SUPPORTED_LANGUAGES, translations } from '@/lib/i18n/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (keyPath: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  // Helper to sync Google Translate cookie & trigger dynamic DOM translation
  const applyGoogleTranslate = (targetLang: Language) => {
    try {
      const domain = typeof window !== 'undefined' ? window.location.hostname : '';
      if (targetLang === 'en') {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        if (domain) {
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=/;`;
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${domain}; path=/;`;
        }
      } else {
        const cookieVal = `/en/${targetLang}`;
        document.cookie = `googtrans=${cookieVal}; path=/;`;
        if (domain) {
          document.cookie = `googtrans=${cookieVal}; domain=${domain}; path=/;`;
          document.cookie = `googtrans=${cookieVal}; domain=.${domain}; path=/;`;
        }
      }

      // Trigger change event if Google Translate combo is mounted in DOM
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (combo) {
        combo.value = targetLang === 'en' ? 'en' : targetLang;
        combo.dispatchEvent(new Event('change'));
      }
    } catch (e) {
      console.error('Google Translate sync error:', e);
    }
  };

  useEffect(() => {
    // 1. Load saved language preference
    const saved = localStorage.getItem('dori_lang') as Language;
    const initialLang = saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved) ? saved : 'en';
    setLangState(initialLang);

    // 2. Load Google Translate script dynamically if not present
    if (typeof window !== 'undefined' && !document.getElementById('google-translate-script')) {
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,ja,fr,de,es,hi,it,zh',
              autoDisplay: false,
            },
            'google_translate_element'
          );

          // Sync saved language after Google Translate is ready
          setTimeout(() => {
            applyGoogleTranslate(initialLang);
          }, 300);
        }
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else {
      applyGoogleTranslate(initialLang);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('dori_lang', newLang);
    applyGoogleTranslate(newLang);
  };

  const t = (keyPath: string, params?: Record<string, string | number>): string => {
    const keys = keyPath.split('.');
    let obj: any = translations[lang] || translations['en'];

    for (const key of keys) {
      if (obj && obj[key] !== undefined) {
        obj = obj[key];
      } else {
        // Fallback to English if translation key is missing in target language
        let fallbackObj: any = translations['en'];
        for (const fk of keys) {
          if (fallbackObj && fallbackObj[fk] !== undefined) {
            fallbackObj = fallbackObj[fk];
          } else {
            return keyPath;
          }
        }
        obj = fallbackObj;
      }
    }

    let text = typeof obj === 'string' ? obj : keyPath;
    if (params) {
      Object.entries(params).forEach(([pKey, pVal]) => {
        text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), String(pVal));
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
      {/* Container for Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }} aria-hidden="true" />
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
