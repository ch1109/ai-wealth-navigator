// Language types
export type Language = 'zh' | 'ja';

// Content structure types
export interface TextContent {
  zh: ContentData;
  ja: ContentData;
}

export interface ContentData {
  // Language switcher
  lang_switcher: string;

  // Hero section
  hero_title: string;
  hero_subtitle: string;
  hero_cta_capabilities: string;
  hero_cta_sales_ai: string;
  hero_cta_demo: string;

  // Demo section general
  demo_title: string;
  demo_section_description: string;
  demo_device_title: string;
  demo_step_counter_label: string;
  demo_step_switching_label: string;
  demo_step_title1: string;
  demo_step_title2: string;
  demo_step_title3: string;
  demo_step_title4: string;
  demo_step_title5: string;
  demo_step_subtitle1: string;
  demo_step_subtitle2: string;
  demo_step_subtitle3: string;
  demo_step_subtitle4: string;
  demo_step_subtitle5: string;

  // Demo step 1
  demo_step1_title: string;
  demo_step1_dialogue1: string;
  demo_step1_option1: string;
  demo_step1_option2: string;
  demo_step1_option3: string;
  demo_step1_dialogue2: string;
  demo_step1_preview_label: string;
  demo_step1_preview_desc: string;

  // Demo step 2
  demo_step2_title: string;
  demo_step2_text1: string;
  demo_step2_text2: string;
  demo_step2_text3: string;
  demo_step2_progress_label: string;
  demo_step2_progress_status: string;
  demo_step2_stage1: string;
  demo_step2_stage2: string;
  demo_step2_stage3: string;
  demo_step2_context_badge: string;
  demo_step2_context_title: string;
  demo_step2_context_desc: string;

  // Demo step 3
  demo_step3_report_title: string;
  demo_step3_report_subtitle: string;
  demo_step3_report_status: string;
  demo_step3_success_label: string;
  demo_step3_success_caption: string;
  demo_step3_success_note: string;
  demo_step3_insight_heading: string;
  demo_step3_insight_badge: string;
  demo_step3_insight: string;
  demo_step3_insight_note: string;
  demo_step3_reasoning: string;
  demo_step3_risk_title: string;
  demo_step3_risk_desc: string;
  demo_step3_risk_badge: string;
  demo_step3_risk_score_suffix: string;
  demo_step3_risk_summary: string;
  demo_step3_risk_note: string;
  demo_step3_alloc_title: string;
  demo_step3_alloc_desc: string;
  demo_step3_alloc_badge: string;
  demo_step3_alloc_item1: string;
  demo_step3_alloc_item2: string;
  demo_step3_alloc_item3: string;
  demo_step3_alloc_return_label: string;
  demo_step3_next_title: string;
  demo_step3_next_primary: string;
  demo_step3_next_secondary: string;

  // Demo step 4
  demo_step4_title: string;
  demo_step4_subtitle: string;
  demo_step4_question2: string;
  demo_step4_message_time: string;
  demo_step4_typing_status: string;
  demo_step4_answer2: string;
  demo_step4_role_label: string;
  demo_step4_verified_badge: string;
  demo_step4_online_label: string;
  demo_step4_metrics_title: string;
  demo_step4_metric1: string;
  demo_step4_metric2: string;
  demo_step4_metric3: string;
  demo_step4_metric4: string;
  demo_step4_timestamp: string;
  demo_step4_feedback_positive: string;
  demo_step4_feedback_details: string;
  demo_step4_suggestions_title: string;
  demo_step4_suggestion1: string;
  demo_step4_suggestion2: string;
  demo_step4_suggestion3: string;

  // Demo step 5
  demo_step5_title: string;
  demo_step5_summary: string;
  demo_step5_summary_title: string;
  demo_step5_summary_amount_label: string;
  demo_step5_summary_return_label: string;
  demo_step5_risk_label: string;
  demo_step5_risk_value: string;
  demo_step5_safety_note: string;
  demo_step5_cta1: string;
  demo_step5_cta2: string;

  // Core capabilities
  core_capabilities_title: string;
  feature_1_title: string;
  feature_1_desc: string;
  feature_2_title: string;
  feature_2_desc: string;
  feature_3_title: string;
  feature_3_desc: string;
  feature_4_title: string;
  feature_4_desc: string;
  feature_5_title: string;
  feature_5_desc: string;

  // Sales AI
  sales_ai_title: string;
  sales_feature_1_title: string;
  sales_feature_1_desc: string;
  sales_feature_2_title: string;
  sales_feature_2_desc: string;
  sales_feature_3_title: string;
  sales_feature_3_desc: string;
  sales_feature_4_title: string;
  sales_feature_4_desc: string;
  sales_feature_5_title: string;
  sales_feature_5_desc: string;
  sales_feature_6_title: string;
  sales_feature_6_desc: string;
  sales_feature_7_title: string;
  sales_feature_7_desc: string;
  sales_feature_8_title: string;
  sales_feature_8_desc: string;
  sales_feature_9_title: string;
  sales_feature_9_desc: string;
  sales_feature_10_title: string;
  sales_feature_10_desc: string;
}

// Component props types
export interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export interface HeroSectionProps {
  content: ContentData;
  onNavigate?: (sectionId: string) => void;
}

export interface CoreCapabilitiesProps {
  content: ContentData;
}

export interface SalesAIProps {
  content: ContentData;
}

export interface InteractiveDemoProps {
  content: ContentData;
}

export interface FooterProps {
  content: ContentData;
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

// Demo animation types
export interface DemoStep {
  id: number;
  duration: number;
  content: React.ReactNode;
}

export interface DemoState {
  currentStep: number;
  isPlaying: boolean;
  progress: number;
}

// Feature item types
export interface FeatureItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface SalesFeatureItem extends FeatureItem {
  imagePosition: 'left' | 'right';
}
