'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveDemoProps, ContentData } from '@/types';

export const InteractiveDemo = ({ content }: InteractiveDemoProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 优化的时间分配：总计20秒 + 2秒间隔 = 22秒循环
  const stepDurationsRef = useRef([2000, 3000, 6000, 4000, 3000]); // 2s, 3s, 6s, 4s, 3s
  const transitionDurationRef = useRef(2000); // 2秒间隔
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const stepTitles = [
    content.demo_step_title1,
    content.demo_step_title2,
    content.demo_step_title3,
    content.demo_step_title4,
    content.demo_step_title5,
  ];

  const stepSubtitles = [
    content.demo_step_subtitle1,
    content.demo_step_subtitle2,
    content.demo_step_subtitle3,
    content.demo_step_subtitle4,
    content.demo_step_subtitle5,
  ];
  const totalSteps = stepTitles.length;

  // 增强的自动播放逻辑，包含循环和间隔
  const clearTimers = () => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  };

  useEffect(() => {
    clearTimers();

    if (!isPlaying) {
      return;
    }

    const duration = stepDurationsRef.current[currentStep];
    const interval = 50; // 更新频率50ms
    let elapsed = 0;

    setProgress(0);

    const progressTimer = setInterval(() => {
      elapsed += interval;
      const nextProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(nextProgress);

      if (elapsed >= duration) {
        clearInterval(progressTimer);
        progressTimerRef.current = null;
        setIsTransitioning(true);
        setProgress(100);

        transitionTimerRef.current = setTimeout(() => {
          setCurrentStep((prev) => {
            const nextStep = (prev + 1) % 5;
            setProgress(0);
            setIsTransitioning(false);
            return nextStep;
          });
        }, transitionDurationRef.current);
      }
    }, interval);

    progressTimerRef.current = progressTimer;

    return clearTimers;
  }, [currentStep, isPlaying]);

  const togglePlayback = () => {
    setIsPlaying((prev) => {
      const nextState = !prev;
      if (!nextState) {
        clearTimers();
        setProgress(0);
        setIsTransitioning(false);
      }
      return nextState;
    });
  };

  const goToStep = (step: number) => {
    clearTimers();
    setCurrentStep(step);
    setProgress(0);
    setIsPlaying(false);
    setIsTransitioning(false);
  };

  const stepCounterLabel = content.demo_step_counter_label
    .replace('{current}', String(currentStep + 1))
    .replace('{total}', String(totalSteps));

  return (
    <section id="interactive-demo" className="scroll-mt-24 pt-12 pb-20 bg-gradient-to-b from-background to-secondary/10">
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
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            data-translatable
          >
            {content.demo_title}
          </h2>
          <p className="text-xl text-tertiary max-w-3xl mx-auto" data-translatable>
            {content.demo_section_description}
          </p>
        </motion.div>

        {/* Demo Container */}
        <motion.div 
          className="max-w-[1220px] mx-auto w-full px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Device Frame */}
          <div className="relative">
            {/* Device Shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 rounded-3xl transform translate-y-8 blur-2xl" />
            
            {/* Device Container */}
            <div className="relative bg-white rounded-[32px] shadow-2xl border border-gray-100/80 overflow-hidden">
              {/* Device Header */}
              <div className="bg-gray-50 px-8 py-5 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                  </div>
                  <div className="text-sm text-gray-600 font-medium" data-translatable>
                    {content.demo_device_title}
                  </div>
                </div>
                
                {/* 增强的播放控制器 */}
                <div className="flex items-center gap-7">
                  <motion.button
                    onClick={togglePlayback}
                    className="w-11 h-11 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      initial={false}
                      animate={{ rotate: isPlaying ? 0 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isPlaying ? '⏸' : '▶'}
                    </motion.div>
                  </motion.button>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="text-sm sm:text-base font-semibold text-gray-800" data-translatable>
                        {stepCounterLabel}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full" data-translatable>
                        {isTransitioning ? content.demo_step_switching_label : stepTitles[currentStep]}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-40 sm:w-48 h-2.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                          className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                          style={{ width: `${progress}%` }}
                          transition={{ duration: 0.1, ease: "easeOut" }}
                        />
                      </div>
                      <div className="text-xs text-gray-400 font-mono">
                        {Math.round(progress)}%
                      </div>
                    </div>

                    <div className="text-xs sm:text-sm text-gray-400">
                      {stepSubtitles[currentStep]}
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo Content Area */}
              <div className="bg-gradient-to-br from-gray-50 to-white relative overflow-hidden min-h-[520px] sm:min-h-[580px] md:min-h-[640px] lg:min-h-[700px] xl:min-h-[760px]">
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      className="p-8 sm:p-10 md:p-14 pb-12"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      {/* Step Content */}
                      {currentStep === 0 && <Step1Content content={content} />}
                      {currentStep === 1 && <Step2Content content={content} />}
                      {currentStep === 2 && <Step3Content content={content} />}
                      {currentStep === 3 && <Step4Content content={content} />}
                      {currentStep === 4 && <Step5Content content={content} />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                  <motion.div
                    className="h-full bg-brand-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((currentStep + 1) / 5) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 增强的步骤指示器 */}
          <div className="flex justify-center mt-6 gap-4 md:gap-8 overflow-x-auto pb-4">
            {stepTitles.map((title, step) => (
              <motion.button
                key={step}
                onClick={() => goToStep(step)}
                className={`flex flex-col items-center gap-3 transition-all duration-300 min-w-0 flex-shrink-0 group ${
                  step === currentStep
                    ? 'text-brand-primary'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <motion.div
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      step === currentStep
                        ? 'bg-gradient-to-r from-brand-primary to-brand-secondary shadow-lg scale-125'
                        : step < currentStep
                        ? 'bg-gradient-to-r from-green-400 to-green-500 shadow-md'
                        : 'bg-gray-300 group-hover:bg-gray-400'
                    }`}
                    animate={step === currentStep ? {
                      boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0.4)", "0 0 0 8px rgba(59, 130, 246, 0)", "0 0 0 0 rgba(59, 130, 246, 0.4)"]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {step === currentStep && (
                    <motion.div
                      className="absolute inset-0 w-4 h-4 rounded-full bg-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 0.6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>

                <div className="text-center">
                  <div className="text-xs font-semibold whitespace-nowrap" data-translatable>{title}</div>
                  <div className="text-xs text-gray-400 mt-1 whitespace-nowrap" data-translatable>{stepSubtitles[step]}</div>
                </div>

                {step < stepTitles.length - 1 && (
                  <div className={`absolute top-2 left-6 w-8 h-0.5 transition-all duration-300 ${
                    step < currentStep ? 'bg-green-400' : 'bg-gray-200'
                  }`} />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// 专业化的步骤组件
const Step1Content = ({ content }: { content: ContentData }) => (
  <div className="h-full flex flex-col justify-center p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
    {/* AI 助手头像和欢迎 */}
    <div className="text-center space-y-6">
      <motion.div
        className="relative mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl"
        animate={{
          boxShadow: ["0 0 20px rgba(59, 130, 246, 0.3)", "0 0 30px rgba(147, 51, 234, 0.4)", "0 0 20px rgba(59, 130, 246, 0.3)"]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="text-3xl">🤖</div>
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      <div className="space-y-3">
        <motion.h3
          className="text-2xl font-bold text-slate-900 tracking-tight"
          style={{ fontWeight: 700 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          data-translatable
        >
          {content.demo_step1_title}
        </motion.h3>
        <motion.p
          className="text-lg text-slate-600 leading-relaxed max-w-md mx-auto font-medium"
          data-translatable
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {content.demo_step1_dialogue1}
        </motion.p>
      </div>

      {/* 专业化的选项卡片 */}
      <motion.div
        className="grid grid-cols-1 gap-3 max-w-sm mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          className="group relative px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-semibold text-base">{content.demo_step1_option1}</span>
            <span className="text-blue-200 text-lg">👨‍💼</span>
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <motion.button
          className="group relative px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-green-400"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-semibold text-base">{content.demo_step1_option2}</span>
            <span className="text-green-200 text-lg">👩‍💼</span>
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <motion.button
          className="group relative px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-semibold text-base">{content.demo_step1_option3}</span>
            <span className="text-purple-200 text-lg">🏢</span>
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>
    </div>

    <motion.div
      className="mt-10 md:mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <div className="max-w-xl mx-auto px-5 py-4 sm:px-6 sm:py-5 rounded-2xl bg-gradient-to-r from-blue-100/80 via-white to-purple-100/70 border border-blue-100/60 shadow-[0_20px_45px_-30px_rgba(37,99,235,0.45)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-center sm:text-left">
          <div className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-blue-700">
            <span className="text-lg">🛰️</span>
            <span data-translatable>{content.demo_step1_preview_label}</span>
          </div>
          <p className="mt-2 sm:mt-0 text-sm text-slate-600 leading-relaxed" data-translatable>
            {content.demo_step1_preview_desc}
          </p>
        </div>
      </div>
    </motion.div>
  </div>
);

const Step2Content = ({ content }: { content: ContentData }) => (
  <div className="h-full flex flex-col justify-center p-6 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
    <div className="text-center space-y-8">
      <motion.div
        className="max-w-md mx-auto -mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="rounded-2xl border border-indigo-100/70 bg-white/85 backdrop-blur-sm px-5 py-4 text-left shadow-[0_18px_50px_-35px_rgba(99,102,241,0.45)]">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-500" data-translatable>
            {content.demo_step2_context_badge}
          </div>
          <div className="mt-2 text-base font-semibold text-slate-900" data-translatable>
            {content.demo_step2_context_title}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600" data-translatable>
            {content.demo_step2_context_desc}
          </p>
        </div>
      </motion.div>

      {/* AI 分析中心 */}
      <motion.div
        className="relative mx-auto w-24 h-24 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: { duration: 4, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity }
        }}
      >
        <div className="text-4xl">🧠</div>
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-dashed border-indigo-300"
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <div className="space-y-4">
        <motion.h3
          className="text-2xl font-bold text-slate-900 tracking-tight"
          style={{ fontWeight: 700 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          data-translatable
        >
          {content.demo_step2_title}
        </motion.h3>

        {/* 分析项目列表 */}
        <div className="space-y-3 max-w-md mx-auto">
          {[
            { text: content.demo_step2_text1, icon: "📊", delay: 0.4 },
            { text: content.demo_step2_text2, icon: "🎯", delay: 0.6 },
            { text: content.demo_step2_text3, icon: "⚡", delay: 0.8 }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: item.delay }}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-base text-slate-700 font-semibold" data-translatable>
                {item.text}
              </span>
              <motion.div
                className="ml-auto w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: item.delay }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 增强的进度条 */}
      <div className="space-y-3">
        <div className="flex justify-between text-xs text-gray-500">
          <span data-translatable>{content.demo_step2_progress_label}</span>
          <span data-translatable>{content.demo_step2_progress_status}</span>
        </div>
        <div className="w-80 h-3 bg-gray-200 rounded-full mx-auto overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full relative"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.8, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-white/30 rounded-full"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span data-translatable>{content.demo_step2_stage1}</span>
          <span data-translatable>{content.demo_step2_stage2}</span>
          <span data-translatable>{content.demo_step2_stage3}</span>
        </div>
      </div>
    </div>
  </div>
);

const Step3Content = ({ content }: { content: ContentData }) => {
  const allocationItems = [
    { name: content.demo_step3_alloc_item1, percent: 42, amount: '¥126,000', gradient: 'from-[#1d4ed8] to-[#38bdf8]' },
    { name: content.demo_step3_alloc_item2, percent: 33, amount: '¥99,000', gradient: 'from-[#0f766e] to-[#34d399]' },
    { name: content.demo_step3_alloc_item3, percent: 25, amount: '¥75,000', gradient: 'from-[#f59e0b] to-[#fbbf24]' },
  ];

  return (
    <div className="p-6 sm:p-8 md:p-10 space-y-6 md:space-y-7 bg-gradient-to-br from-slate-50 via-white to-blue-50">
    {/* 顶部报告卡 */}
    <motion.div
      className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#0f172a] via-[#1d4ed8] to-[#38bdf8] text-white shadow-[0_30px_80px_-30px_rgba(29,78,216,0.45)]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, ease: "easeOut" }}
    >
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/10 to-transparent" />
      <div className="absolute -top-24 -right-12 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between px-8 py-7 sm:px-9 sm:py-8">
        <div className="flex items-start gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-xl shadow-lg text-3xl">
            📊
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ fontWeight: 800 }} data-translatable>
              {content.demo_step3_report_title}
            </h3>
            <p className="text-sm sm:text-base text-blue-100/90 font-medium" data-translatable>
              {content.demo_step3_report_subtitle}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm font-medium" data-translatable>
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300" />
              {content.demo_step3_report_status}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="rounded-2xl bg-white/15 px-5 py-3 backdrop-blur-sm shadow-inner">
            <div className="text-xs uppercase tracking-[0.3em] text-blue-100/80" data-translatable>{content.demo_step3_success_label}</div>
            <div className="flex items-baseline gap-2">
              <div className="text-5xl font-black leading-none" style={{ fontWeight: 900 }}>
                98.7%
              </div>
              <div className="text-sm text-blue-100/80" data-translatable>{content.demo_step3_success_caption}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-blue-100/80" data-translatable>
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
            {content.demo_step3_success_note}
          </div>
        </div>
      </div>
    </motion.div>

    {/* 核心洞察 + 数据布局 */}
    <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] xl:gap-7">
      <div className="space-y-4 sm:space-y-5">
        <motion.div
          className="rounded-3xl border border-amber-200/70 bg-gradient-to-r from-amber-50 via-white to-orange-50/60 p-5 shadow-[0_20px_50px_-30px_rgba(251,191,36,0.6)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white text-lg font-bold shadow-lg"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                AI
              </motion.div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h4 className="text-lg font-semibold text-amber-800 tracking-tight" data-translatable>
                    {content.demo_step3_insight_heading}
                  </h4>
                  <span className="rounded-full bg-amber-200/70 px-3 py-1 text-xs font-semibold text-amber-700" data-translatable>
                    {content.demo_step3_insight_badge}
                  </span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-amber-800/90" data-translatable>
                  {content.demo_step3_insight}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs text-amber-600 shadow-inner" data-translatable>
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              {content.demo_step3_insight_note}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="rounded-3xl bg-white/90 p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] border border-slate-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h4 className="text-lg font-semibold text-slate-900 tracking-tight" data-translatable>
                {content.demo_step3_risk_title}
              </h4>
              <p className="text-sm text-slate-500" data-translatable>
                {content.demo_step3_risk_desc}
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600" data-translatable>
              {content.demo_step3_risk_badge}
            </span>
          </div>
          <div className="mt-6 flex flex-col items-center gap-5">
            <div className="relative h-36 w-36">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="3.5"
                />
                <motion.path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="url(#riskGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="82, 100"
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: "82, 100" }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center" data-translatable>
                <span className="text-3xl font-bold text-slate-900" style={{ fontWeight: 800 }}>
                  82
                </span>
                <span className="text-sm text-slate-500">{content.demo_step3_risk_score_suffix}</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 text-sm text-slate-500">
              <span data-translatable>{content.demo_step3_risk_summary}</span>
              <span className="text-xs text-slate-400" data-translatable>{content.demo_step3_risk_note}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-5 lg:h-full">
        <motion.div
          className="rounded-3xl bg-white/90 p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] border border-slate-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h4 className="text-lg font-semibold text-slate-900 tracking-tight" data-translatable>
                {content.demo_step3_alloc_title}
              </h4>
              <p className="text-sm text-slate-500" data-translatable>
                {content.demo_step3_alloc_desc}
              </p>
            </div>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600" data-translatable>
              {content.demo_step3_alloc_badge}
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {allocationItems.map((item, index) => (
              <motion.div
                key={item.name}
                className="space-y-2 rounded-2xl border border-slate-100/80 bg-slate-50/50 p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${item.gradient}`} />
                    <span data-translatable>{item.name}</span>
                  </div>
                  <span>{item.percent}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${item.gradient}`}
                    initial={{ width: '0%' }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500" data-translatable>
                  <span>{content.demo_step3_alloc_return_label}</span>
                  <span>{item.amount}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-auto rounded-3xl border border-slate-100 bg-white/90 p-5 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.4)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, ease: "easeOut" }}
        >
          <h5 className="text-sm font-semibold text-slate-900 mb-3" data-translatable>
            {content.demo_step3_next_title}
          </h5>
          <div className="flex flex-col gap-2">
            <motion.button
              className="w-full rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              data-translatable
            >
              {content.demo_step3_next_primary}
            </motion.button>
            <motion.button
              className="w-full rounded-xl bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.35)] border border-slate-100"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              data-translatable
            >
              {content.demo_step3_next_secondary}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
  );
};

const Step4Content = ({ content }: { content: ContentData }) => (
  <div className="h-full p-6 space-y-6 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
    {/* 智能问答头部 */}
    <motion.div
      className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div
        className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xl">🤖</span>
      </motion.div>
      <div>
        <h3 className="font-bold text-lg" data-translatable>{content.demo_step4_title}</h3>
        <p className="text-emerald-100 text-sm" data-translatable>{content.demo_step4_subtitle}</p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <motion.div
          className="w-2 h-2 bg-green-400 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-xs text-emerald-100" data-translatable>{content.demo_step4_online_label}</span>
      </div>
    </motion.div>

    {/* 对话界面 */}
    <div className="space-y-6">
      {/* 用户问题 */}
      <motion.div
        className="flex justify-end"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="max-w-xs bg-blue-500 text-white rounded-2xl rounded-tr-md p-3 shadow-md">
          <div className="text-sm leading-relaxed" data-translatable>
            {content.demo_step4_question2}
          </div>
          <div className="text-xs text-blue-100 mt-2 text-right" data-translatable>
            {content.demo_step4_message_time}
          </div>
        </div>
      </motion.div>

      {/* AI 正在输入指示器 */}
      <motion.div
        className="flex items-center gap-2 text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
          <span className="text-xs">🤖</span>
        </div>
        <span data-translatable>{content.demo_step4_typing_status}</span>
        <motion.div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-emerald-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* AI 回答 */}
      <motion.div
        className="flex justify-start"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="max-w-sm bg-white border border-gray-200 rounded-2xl rounded-tl-md p-4 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">AI</span>
            </div>
            <span className="text-xs text-gray-500 font-medium" data-translatable>{content.demo_step4_role_label}</span>
            <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full" data-translatable>{content.demo_step4_verified_badge}</span>
          </div>
          <div className="text-sm text-gray-700 leading-relaxed mb-3" data-translatable>
            {content.demo_step4_answer2}
          </div>

          {/* 专业数据支撑 */}
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <div className="text-xs text-gray-600 mb-2 font-medium" data-translatable>{content.demo_step4_metrics_title}</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500" data-translatable>{content.demo_step4_metric1}</span>
                <span className="font-semibold text-green-600">8.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500" data-translatable>{content.demo_step4_metric2}</span>
                <span className="font-semibold text-red-500">-12.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500" data-translatable>{content.demo_step4_metric3}</span>
                <span className="font-semibold text-blue-600">1.34</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500" data-translatable>{content.demo_step4_metric4}</span>
                <span className="font-semibold text-purple-600">73%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-400" data-translatable>{content.demo_step4_timestamp}</div>
            <div className="flex gap-2">
              <motion.button
                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-translatable
              >
                {content.demo_step4_feedback_positive}
              </motion.button>
              <motion.button
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-translatable
              >
                {content.demo_step4_feedback_details}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    {/* 快速问题建议 */}
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      <div className="text-xs text-gray-500 font-medium" data-translatable>{content.demo_step4_suggestions_title}</div>
      <div className="flex flex-wrap gap-2">
        {[content.demo_step4_suggestion1, content.demo_step4_suggestion2, content.demo_step4_suggestion3].map((topic, index) => (
          <motion.button
            key={index}
            className="text-xs bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-700 px-3 py-1.5 rounded-full transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-translatable
          >
            {topic}
          </motion.button>
        ))}
      </div>
    </motion.div>
  </div>
);

const Step5Content = ({ content }: { content: ContentData }) => (
  <div className="h-full flex flex-col justify-center p-6 bg-gradient-to-br from-violet-50 via-white to-indigo-50">
    <div className="text-center space-y-6">
      {/* 成功图标动画 */}
      <motion.div
        className="relative mx-auto w-24 h-24 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="text-4xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🚀
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-dashed border-violet-300"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-gray-800" data-translatable>{content.demo_step5_title}</h3>
        <p className="text-gray-600 max-w-md mx-auto leading-relaxed" data-translatable>
          {content.demo_step5_summary}
        </p>
      </motion.div>

      {/* 投资摘要卡片 */}
      <motion.div
        className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 max-w-sm mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-sm text-gray-600 mb-2" data-translatable>{content.demo_step5_summary_title}</div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">¥300,000</div>
            <div className="text-xs text-gray-500" data-translatable>{content.demo_step5_summary_amount_label}</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">8.2%</div>
            <div className="text-xs text-gray-500" data-translatable>{content.demo_step5_summary_return_label}</div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-xs text-gray-600">
            <span data-translatable>{content.demo_step5_risk_label}</span>
            <span className="text-orange-600 font-medium" data-translatable>{content.demo_step5_risk_value}</span>
          </div>
        </div>
      </motion.div>

      {/* 行动按钮组 */}
      <motion.div
        className="flex flex-col gap-3 max-w-sm mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <motion.button
          className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          data-translatable
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            <span>{content.demo_step5_cta1}</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🚀
            </motion.span>
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-violet-700 to-indigo-700"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <motion.button
          className="group px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-all duration-300"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          data-translatable
        >
          <div className="flex items-center justify-center gap-2">
            <span>{content.demo_step5_cta2}</span>
            <span>📋</span>
          </div>
        </motion.button>
      </motion.div>

      {/* 安全保障提示 */}
      <motion.div
        className="flex items-center justify-center gap-2 text-xs text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span>🔒</span>
        <span data-translatable>{content.demo_step5_safety_note}</span>
      </motion.div>
    </div>
  </div>
);
