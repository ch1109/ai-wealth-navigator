'use client';

import { motion } from 'framer-motion';
import { FooterProps } from '@/types';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Footer = ({ 
  content, 
  currentLanguage, 
  onLanguageChange 
}: FooterProps) => {
  return (
    <footer className="bg-secondary/30 border-t border-secondary/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left side - Logo and copyright */}
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white font-bold text-lg">AI</span>
              </motion.div>
              <span className="text-xl font-semibold text-foreground">
                AI 财富领航员
              </span>
            </div>

            {/* Copyright */}
            <div className="text-sm text-tertiary">
              © 2025 AI Wealth Navigator. All rights reserved.
            </div>
          </motion.div>

          {/* Center - Links (optional) */}
          <motion.div 
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <a 
              href="#features" 
              className="text-sm text-tertiary hover:text-foreground transition-colors duration-200"
            >
              产品特性
            </a>
            <a 
              href="#demo" 
              className="text-sm text-tertiary hover:text-foreground transition-colors duration-200"
            >
              功能演示
            </a>
            <a 
              href="#contact" 
              className="text-sm text-tertiary hover:text-foreground transition-colors duration-200"
            >
              联系我们
            </a>
          </motion.div>

          {/* Right side - Language switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
              switcherText={content.lang_switcher}
            />
          </motion.div>
        </div>

        {/* Bottom section - Additional info */}
        <motion.div 
          className="mt-8 pt-8 border-t border-secondary/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-tertiary">
            <div className="flex flex-wrap items-center gap-4">
              <span>隐私政策</span>
              <span>•</span>
              <span>服务条款</span>
              <span>•</span>
              <span>风险提示</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Powered by</span>
              <motion.span 
                className="text-brand-primary font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Next.js
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
