'use client';

import { motion } from 'framer-motion';
import { HeroSectionProps } from '@/types';

export const HeroSection = ({ content, onNavigate }: HeroSectionProps) => {
  const handleNavigate = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  return (
    <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
      {/* Background with gradient and subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          {/* Floating geometric shapes */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-primary/10 rounded-full blur-xl"
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-24 h-24 bg-brand-secondary/10 rounded-full blur-xl"
            animate={{
              y: [20, -20, 20],
              x: [10, -10, 10],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-16 h-16 bg-brand-primary/15 rounded-full blur-lg"
            animate={{
              y: [-15, 15, -15],
              x: [-5, 5, -5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(29, 29, 31, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(29, 29, 31, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-4 md:pt-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 md:mb-6 leading-tight px-4 sm:px-0 tracking-tight"
            style={{ fontWeight: 800 }}
            data-translatable
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {content.hero_title}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8 px-4 sm:px-0 font-medium"
            data-translatable
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {content.hero_subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="flex justify-center px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.button
              type="button"
              onClick={() => handleNavigate('core-capabilities')}
              className="
                w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-white
                bg-gradient-to-r from-brand-primary to-brand-secondary shadow-lg
                hover:from-brand-secondary hover:to-brand-primary hover:shadow-xl hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-brand-primary/50
                transition-all duration-200 ease-out
                min-w-[220px] text-base sm:text-lg tracking-tight
              "
              style={{ fontWeight: 700 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {content.hero_cta_capabilities}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-8 md:mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1 h-3 bg-slate-400 rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>


      </div>
    </section>
  );
};
