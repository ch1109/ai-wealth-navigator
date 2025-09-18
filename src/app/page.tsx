'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { HeroSection } from '@/components/HeroSection';
import { CoreCapabilities } from '@/components/CoreCapabilities';
import { SalesAI } from '@/components/SalesAI';
import { InteractiveDemo } from '@/components/InteractiveDemo';
import { ScrollProgress } from '@/components/ScrollProgress';
import { useSmoothScroll } from '@/hooks/useScrollAnimation';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { Menu, X } from 'lucide-react';

function HomeContent() {
  const { currentLanguage, content, changeLanguage } = useLanguage();
  const { scrollToElement } = useSmoothScroll();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 处理URL参数导航
  const navigateToSection = (sectionId: string) => {
    // 关闭移动端菜单
    setIsMobileMenuOpen(false);

    // 更新URL参数，保持语言参数
    const params = new URLSearchParams(searchParams.toString());
    params.set('section', sectionId);
    // 确保语言参数存在
    if (!params.has('lang')) {
      params.set('lang', currentLanguage);
    }
    router.push(`/?${params.toString()}`, { scroll: false });

    // 滚动到对应区域
    setTimeout(() => {
      const offset = window.innerWidth < 768 ? 80 : 104;
      scrollToElement(sectionId, offset);
    }, 100);
  };

  // 页面加载时根据URL参数自动滚动
  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      setTimeout(() => {
        const offset = window.innerWidth < 768 ? 80 : 104;
        scrollToElement(section, offset);
      }, 500); // 等待页面完全加载
    }
  }, [searchParams, scrollToElement]);

  return (
    <div className="min-h-screen bg-background">
      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-secondary">
        <div className="max-w-7xl mx-auto px-6 py-3 md:py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-slate-900 tracking-tight" style={{ fontWeight: 700 }}>
            {currentLanguage === 'zh' ? 'AI 财富领航员' : 'AI ウェルス・ナビゲーター'}
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigateToSection('core-capabilities')}
              className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors duration-200"
              data-translatable
            >
              {content.hero_cta_capabilities}
            </button>
            <button
              onClick={() => navigateToSection('sales-ai')}
              className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors duration-200"
              data-translatable
            >
              {content.hero_cta_sales_ai}
            </button>
            <button
              onClick={() => navigateToSection('interactive-demo')}
              className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors duration-200"
              data-translatable
            >
              {content.hero_cta_demo}
            </button>
          </div>

          {/* Right side - Language switcher and mobile menu */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              onLanguageChange={changeLanguage}
              switcherText={content.lang_switcher}
            />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-brand-primary transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-secondary">
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
              <button
                onClick={() => navigateToSection('core-capabilities')}
                className="block w-full text-left text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors duration-200 py-2"
                data-translatable
              >
                {content.hero_cta_capabilities}
              </button>
              <button
                onClick={() => navigateToSection('sales-ai')}
                className="block w-full text-left text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors duration-200 py-2"
                data-translatable
              >
                {content.hero_cta_sales_ai}
              </button>
              <button
                onClick={() => navigateToSection('interactive-demo')}
                className="block w-full text-left text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors duration-200 py-2"
                data-translatable
              >
                {content.hero_cta_demo}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <HeroSection content={content} onNavigate={navigateToSection} />

        {/* Core Capabilities */}
        <CoreCapabilities content={content} />

        {/* Sales AI */}
        <SalesAI content={content} />

        {/* Interactive Demo */}
        <InteractiveDemo content={content} />
      </main>


    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-lg text-slate-600">加载中...</div>
    </div>}>
      <HomeContent />
    </Suspense>
  );
}
