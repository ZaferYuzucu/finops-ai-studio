// Studio Creator Types

export type SectorType = 
  | 'teknoloji'
  | 'finans'
  | 'saglik'
  | 'egitim'
  | 'eticaret'
  | 'hizmet'
  | 'uretim'
  | 'medya';

export type GoalType =
  | 'marka-farkindaligi'
  | 'urun-tanitimi'
  | 'musteri-kazanimi'
  | 'egitim-icerik'
  | 'sosyal-kanit';

export type ToneType =
  | 'profesyonel'
  | 'samimi'
  | 'enerjik'
  | 'mizahi'
  | 'duygusal';

export type LanguageType = 'tr' | 'en';

export type DurationType = 20 | 30;

export interface StudioGenerationInput {
  sector: SectorType;
  goal: GoalType;
  tone: ToneType;
  duration: DurationType;
  language: LanguageType;
  keywords?: string;
}

export interface StoryboardScene {
  t_start: number;
  t_end: number;
  on_screen_text: string;
  broll_suggestion: string;
}

export interface StudioGenerationOutput {
  title: string;
  cta: string;
  voiceover_script: string;
  subtitle_srt: string;
  storyboard: StoryboardScene[];
}

export interface StudioGeneration {
  id: string;
  created_at: string;
  input: StudioGenerationInput;
  output: StudioGenerationOutput;
}

export interface StudioHistory {
  generations: StudioGeneration[];
}

// Template System
export interface VideoTemplate {
  id: string;
  slot_number: number; // 1-10
  title: string;
  scenario_text: string;
  created_at: string;
  updated_at: string;
}

export interface TemplateLibrary {
  templates: VideoTemplate[];
}

