'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrollProgress, useSmoothScroll } from '@/hooks/useScrollAnimation';

export const BackToTop = () => {
  const scrollProgress = useScrollProgress();
  const { scrollToTop } = useSmoothScroll();
  const isVisible = scrollProgress > 20;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="
            fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40
            w-11 h-11 sm:w-12 sm:h-12 bg-brand-primary text-white rounded-full
            shadow-lg hover:shadow-xl
            flex items-center justify-center
            hover:bg-brand-primary/90 hover:scale-110
            transition-all duration-200 ease-out
            focus:outline-none focus:ring-2 focus:ring-brand-primary/50
          "
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="回到顶部"
        >
          <ArrowUp size={18} className="sm:w-5 sm:h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
