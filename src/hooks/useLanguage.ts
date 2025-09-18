'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Language, ContentData } from '@/types';
import { TEXT_CONTENT } from '@/data/content';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('zh');
  const [content, setContent] = useState<ContentData>(TEXT_CONTENT.zh);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Update URL with language parameter
  const updateUrlLanguage = useCallback((language: Language) => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(searchParams.toString());
      params.set('lang', language);

      // 保持其他参数（如section）不变
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, router]);

  // Load language preference from URL params or localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 首先检查URL参数
      const urlLang = searchParams.get('lang') as Language;
      if (urlLang && (urlLang === 'zh' || urlLang === 'ja')) {
        setCurrentLanguage(urlLang);
        setContent(TEXT_CONTENT[urlLang]);
        // 同时保存到localStorage
        localStorage.setItem('preferred-language', urlLang);
        return;
      }

      // 如果URL没有语言参数，则从localStorage读取
      const savedLanguage = localStorage.getItem('preferred-language') as Language;
      if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'ja')) {
        setCurrentLanguage(savedLanguage);
        setContent(TEXT_CONTENT[savedLanguage]);
        // 更新URL参数以反映当前语言
        updateUrlLanguage(savedLanguage);
      }
    }
  }, [searchParams, updateUrlLanguage]);

  // Save language preference to localStorage and URL
  const saveLanguagePreference = useCallback((language: Language) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', language);
      updateUrlLanguage(language);
    }
  }, [updateUrlLanguage]);

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
