'use client';

import { Language } from '@/types';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  switcherText: string;
}

export const LanguageSwitcher = ({ 
  currentLanguage, 
  onLanguageChange, 
  switcherText 
}: LanguageSwitcherProps) => {
  const handleLanguageToggle = () => {
    const newLanguage: Language = currentLanguage === 'zh' ? 'ja' : 'zh';
    onLanguageChange(newLanguage);
  };

  return (
    <button
      onClick={handleLanguageToggle}
      className="
        flex items-center gap-2 px-4 py-2
        text-sm font-semibold text-slate-600
        hover:text-slate-900 hover:scale-105
        transition-all duration-200 ease-out
        rounded-lg hover:bg-slate-100/70
        focus:outline-none focus:ring-2 focus:ring-blue-500/20
      "
      aria-label={`Switch to ${currentLanguage === 'zh' ? 'Japanese' : 'Chinese'}`}
    >
      <Globe size={16} className="opacity-70" />
      <span data-translatable className="transition-opacity duration-150">
        {switcherText}
      </span>
    </button>
  );
};
