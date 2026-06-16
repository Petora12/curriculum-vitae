import { useContext } from 'react';
import { TranslationContext } from '../context/TranslationContext';

export function useTranslation() {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }

  const { language, setLanguage, translations } = context;

  // Walk the dotted key path: 'a.b.c' -> translations.a.b.c
  const resolve = (key) =>
    key.split('.').reduce((acc, k) => acc?.[k], translations);

  const interpolate = (str, values) =>
    values
      ? str.replace(/\{\{(\w+)\}\}/g, (_, p) => values[p] ?? `{{${p}}}`)
      : str;

  /**
   * Get a translation value by key and optional interpolation
   * @example
   * t('pages.home.title') // "Welcome"
   * t('pages.home.greeting', { name: 'John' }) // "Hello, John"
   */
  const t = (key, values) => {
    const value = resolve(key);
    if (typeof value !== 'string') {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return interpolate(value, values);
  };

  // Returns an array of strings (e.g. the bullet points)
  const tArray = (key, values) => {
    const value = resolve(key);
    if (!Array.isArray(value)) {
      console.warn(`Translation array not found: ${key}`);
      return [];
    }
    return value.map((item) =>
      typeof item === 'string' ? interpolate(item, values) : item,
    );
  };

  return { t, tArray, language, setLanguage };
}
