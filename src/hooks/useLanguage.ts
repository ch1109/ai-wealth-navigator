'use client';

import { useState, useCallback, useEffect } from 'react';
import { Language, ContentData } from '@/types';
import { TEXT_CONTENT } from '@/data/content';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('zh');
  const [content, setContent] = useState<ContentData>(TEXT_CONTENT.zh);

  // Load language preference from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred-language') as Language;
      if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'ja')) {
        setCurrentLanguage(savedLanguage);
        setContent(TEXT_CONTENT[savedLanguage]);
      }
    }
  }, []);

  // Save language preference to localStorage
  const saveLanguagePreference = useCallback((language: Language) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', language);
    }
  }, []);

  // Change language with smooth transition
  const changeLanguage = useCallback((newLanguage: Language) => {
    if (newLanguage === currentLanguage) return;

    // Add fade-out class to trigger transition
    const elements = document.querySelectorAll('[data-translatable]');
    elements.forEach(el => {
      el.classList.add('opacity-0');
    });

    // Change content after a short delay
    setTimeout(() => {
      setCurrentLanguage(newLanguage);
      setContent(TEXT_CONTENT[newLanguage]);
      saveLanguagePreference(newLanguage);

      // Add fade-in class after content change
      setTimeout(() => {
        elements.forEach(el => {
          el.classList.remove('opacity-0');
          el.classList.add('opacity-100');
        });
      }, 50);
    }, 150);
  }, [currentLanguage, saveLanguagePreference]);

  // Get text by key with fallback
  const getText = useCallback((key: keyof ContentData): string => {
    return content[key] || TEXT_CONTENT.zh[key] || '';
  }, [content]);

  // Check if current language is specific language
  const isLanguage = useCallback((language: Language): boolean => {
    return currentLanguage === language;
  }, [currentLanguage]);

  return {
    currentLanguage,
    content,
    changeLanguage,
    getText,
    isLanguage,
    availableLanguages: ['zh', 'ja'] as Language[]
  };
};
