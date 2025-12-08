// Section mapping for slides
// Updated for 33-slide structure

export interface SectionInfo {
  title: string;
  subtitle: string;
  startSlide: number;
  endSlide: number;
}

export const sections: SectionInfo[] = [
  {
    title: 'Foundation',
    subtitle: 'Understanding Generative AI',
    startSlide: 5,
    endSlide: 5,
  },
  {
    title: 'How We Got Here',
    subtitle: 'The evolution of AI',
    startSlide: 6,
    endSlide: 11,
  },
  {
    title: 'What Agents Are',
    subtitle: 'Understanding the breakthrough',
    startSlide: 12,
    endSlide: 18,
  },
  {
    title: 'How They Work',
    subtitle: 'The patterns and principles',
    startSlide: 19,
    endSlide: 26,  // Now includes Linux MCP demo (22)
  },
  {
    title: 'Advanced Topics',
    subtitle: 'Scaling and coordination',
    startSlide: 27,
    endSlide: 29,
  },
  {
    title: 'Your Journey',
    subtitle: 'Where to go from here',
    startSlide: 30,
    endSlide: 34,
  },
];

export function getSectionForSlide(slideNumber: number): SectionInfo | null {
  return sections.find(
    section => slideNumber >= section.startSlide && slideNumber <= section.endSlide
  ) || null;
}
