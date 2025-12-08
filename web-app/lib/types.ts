// Type definitions for the presentation

export type Persona = 'sysadmin' | 'devops' | 'developer' | 'platform' | 'all';

export interface SlideContent {
  title: string;
  content: string;
  speakerNotes?: string;
  visualDescription?: string;
  references?: string;
}

export interface Slide {
  id: string;
  number: number;
  title: string;
  content: SlideContent;
  part?: string;
  persona?: Persona[];
}

export interface SlideMetadata {
  totalSlides: number;
  parts: {
    name: string;
    start: number;
    end: number;
  }[];
}

export interface PresentationState {
  currentSlide: number;
  persona: Persona;
  showNotes: boolean;
  showReferences: boolean;
  progress: number;
}

