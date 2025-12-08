// Section mapping for slides

export interface SectionInfo {
  title: string;
  subtitle: string;
  startSlide: number;
  endSlide: number;
}

export const sections: SectionInfo[] = [
  {
    title: 'How We Got Here',
    subtitle: 'The evolution of AI',
    startSlide: 5,
    endSlide: 10,
  },
  {
    title: 'What Agents Are',
    subtitle: 'Understanding the breakthrough',
    startSlide: 11,
    endSlide: 17,
  },
  {
    title: 'How They Work',
    subtitle: 'The patterns and principles',
    startSlide: 18,
    endSlide: 22,
  },
  {
    title: 'How to Use Them',
    subtitle: 'Practical applications',
    startSlide: 23,
    endSlide: 23,
  },
  {
    title: 'Where We\'re Heading',
    subtitle: 'The future',
    startSlide: 24,
    endSlide: 30,
  },
];

export function getSectionForSlide(slideNumber: number): SectionInfo | null {
  return sections.find(
    section => slideNumber >= section.startSlide && slideNumber <= section.endSlide
  ) || null;
}

