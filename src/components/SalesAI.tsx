'use client';

import { motion } from 'framer-motion';
import {
  Eye,
  BarChart,
  Target,
  Zap,
  Shield,
  Heart,
  RefreshCw,
  CheckCircle,
  MousePointer,
  Clock
} from 'lucide-react';
import { SalesAIProps, SalesFeatureItem } from '@/types';

const iconMap = {
  1: Eye,
  2: BarChart,
  3: Target,
  4: Zap,
  5: Shield,
  6: Heart,
  7: RefreshCw,
  8: CheckCircle,
  9: MousePointer,
  10: Clock,
};

export const SalesAI = ({ content }: SalesAIProps) => {
  // 8个核心特性，采用3x3布局（去掉一键式成交体验和服务质量一致性）
  const salesFeatures = [
    { title: content.sales_feature_1_title, desc: content.sales_feature_1_desc, icon: 1 },
    { title: content.sales_feature_2_title, desc: content.sales_feature_2_desc, icon: 2 },
    { title: content.sales_feature_3_title, desc: content.sales_feature_3_desc, icon: 3 },
    { title: content.sales_feature_4_title, desc: content.sales_feature_4_desc, icon: 4 },
    { title: content.sales_feature_5_title, desc: content.sales_feature_5_desc, icon: 5 },
    { title: content.sales_feature_6_title, desc: content.sales_feature_6_desc, icon: 6 },
    { title: content.sales_feature_7_title, desc: content.sales_feature_7_desc, icon: 7 },
    { title: content.sales_feature_10_title, desc: content.sales_feature_10_desc, icon: 10 }, // 保留全天候无休服务
  ];



  return (
    <section id="sales-ai" className="scroll-mt-24 pt-12 pb-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight"
            style={{ fontWeight: 800 }}
            data-translatable
          >
            {content.sales_ai_title}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium">
            突破传统销售边界，AI 赋能的全新客户体验
          </p>
        </motion.div>

        {/* Features Grid - 3x3 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {salesFeatures.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.1
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.div
                  className="h-full p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:border-blue-300/50 hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -3 }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconComponent size={24} className="text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3
                      className="text-lg font-bold text-slate-900 tracking-tight leading-tight"
                      style={{ fontWeight: 700 }}
                      data-translatable
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-sm text-slate-600 leading-relaxed font-medium"
                      data-translatable
                    >
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>


      </div>
    </section>
  );
};
