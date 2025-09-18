'use client';

import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Brain, 
  Users, 
  Shield, 
  CheckCircle 
} from 'lucide-react';
import { CoreCapabilitiesProps, FeatureItem } from '@/types';

const iconMap = {
  1: BarChart3,
  2: Brain,
  3: Users,
  4: Shield,
  5: CheckCircle,
};

export const CoreCapabilities = ({ content }: CoreCapabilitiesProps) => {
  const features: FeatureItem[] = [
    {
      title: content.feature_1_title,
      description: content.feature_1_desc,
    },
    {
      title: content.feature_2_title,
      description: content.feature_2_desc,
    },
    {
      title: content.feature_3_title,
      description: content.feature_3_desc,
    },
    {
      title: content.feature_4_title,
      description: content.feature_4_desc,
    },
    {
      title: content.feature_5_title,
      description: content.feature_5_desc,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section id="core-capabilities" className="scroll-mt-24 pt-16 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight"
            style={{ fontWeight: 800 }}
            data-translatable
          >
            {content.core_capabilities_title}
          </h2>
          <div className="w-24 h-1 bg-brand-primary mx-auto rounded-full" />
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => {
            const IconComponent = iconMap[(index + 1) as keyof typeof iconMap];
            
            return (
              <motion.div
                key={index}
                className="group relative"
                variants={itemVariants}
              >
                <motion.div
                  className="
                    relative p-8 bg-secondary/30 rounded-2xl border border-secondary/50
                    hover:bg-secondary/50 hover:border-brand-primary/30 hover:shadow-xl
                    transition-all duration-300 ease-out
                    backdrop-blur-sm
                    h-full flex flex-col
                  "
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* Icon */}
                  <motion.div 
                    className="
                      w-16 h-16 bg-brand-primary/10 rounded-xl 
                      flex items-center justify-center mb-6
                      group-hover:bg-brand-primary/20 group-hover:scale-110
                      transition-all duration-300 ease-out
                    "
                    whileHover={{ rotate: 5 }}
                  >
                    <IconComponent 
                      size={32} 
                      className="text-brand-primary group-hover:text-brand-primary/80 transition-colors duration-300" 
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 tracking-tight"
                      style={{ fontWeight: 700 }}
                      data-translatable
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300 font-medium text-base"
                      data-translatable
                    >
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />

                  {/* Decorative corner accent */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-brand-primary/20 rounded-full group-hover:bg-brand-primary/40 transition-colors duration-300" />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>


      </div>
    </section>
  );
};
