// Types for Year in Review 2025

export interface Person {
  id: string;
  name: string;
  image: string;
}

export interface Highlight {
  month: string;
  title: string;
  icon: string;
  by?: string; // initials: 'H', 'R', or 'H+R' for joint
}

export interface Quarter {
  id: string;
  period: string;
  color: string;
  gradient: string;
  summary: string;
  highlights: Highlight[];
  description: string;
}

export interface Stat {
  value: string;
  label: string;
  icon: string;
}

export interface PageConfig {
  title: string;
  year: string;
  tagline: string;
  headerIcon: string;
}

export interface YearInReviewData {
  config: PageConfig;
  people: Person[];
  quarters: Quarter[];
  stats: Stat[];
}

