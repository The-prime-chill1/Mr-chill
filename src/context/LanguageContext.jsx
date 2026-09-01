// Safe fallback for multi-language context
export function useLanguage() {
  return {
    lang: 'en',
    setLang: () => {},
    t: (key, fallback = '') => fallback || key,
    languages: [],
    currentLanguage: { code: 'en', label: 'English', flag: '🇬🇧', dir: 'ltr' },
  };
}

export function LanguageProvider({ children }) {
  return children;
}
