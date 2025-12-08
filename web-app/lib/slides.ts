// Slide data and parser
// Updated for 34-slide structure with Linux MCP demo

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Slide, SlideMetadata } from './types';

const slidesDirectory = path.join(process.cwd(), 'data/slides');

// New slide structure with 34 slides (added Linux MCP demo after Tool Design)
const slideDefinitions = [
  // Part 1: Opening (Slides 1-4)
  { number: 1, id: 'slide-01-title', title: 'Agentic AI 101' },
  { number: 2, id: 'slide-02-frustration', title: 'The Frustration' },
  { number: 3, id: 'slide-03-promise', title: 'What If You Had Superpowers?' },
  { number: 4, id: 'slide-04-journey', title: 'Today\'s Journey' },
  
  // Part 2: Foundation & Evolution (Slides 5-11)
  { number: 5, id: 'slide-05-generative-ai', title: 'What is Generative AI?' },
  { number: 6, id: 'slide-06-cold-open', title: 'The Cold Open' },
  { number: 7, id: 'slide-07-language-models', title: 'Large Language Models' },
  { number: 8, id: 'slide-08-assistants', title: 'AI Assistants' },
  { number: 9, id: 'slide-09-reasoning', title: 'Reasoning & Self-Correction' },
  { number: 10, id: 'slide-10-convergence', title: 'Enter the Agents' },
  { number: 11, id: 'slide-11-evolution', title: 'The Evolution' },
  
  // Part 3: Understanding Agents (Slides 12-18)
  { number: 12, id: 'slide-12-what-is-agent', title: 'What is an Agent?' },
  { number: 13, id: 'slide-13-anatomy', title: 'Anatomy of an Agent' },
  { number: 14, id: 'slide-14-problem', title: 'Challenges We All Share' },
  { number: 15, id: 'slide-15-solution', title: 'The AI-Powered Solution' },
  { number: 16, id: 'slide-16-impact', title: 'The Impact' },
  { number: 17, id: 'slide-17-agent-loop', title: 'The Agent Loop' },
  { number: 18, id: 'slide-18-persona-examples', title: 'Agent Loop by Role' },
  
  // Part 4: Building Effectively (Slides 19-26) - Added Linux MCP Demo
  { number: 19, id: 'slide-19-prompt-engineering', title: 'Prompt Engineering Basics' },
  { number: 20, id: 'slide-20-context-engineering', title: 'Context Engineering' },
  { number: 21, id: 'slide-21-tool-design', title: 'Tool Design & MCP' },
  { number: 22, id: 'slide-22-linux-mcp', title: 'Using RHEL MCP: Talk to Your Linux System' },  // Live demo
  { number: 23, id: 'slide-23-agent-loop-practice', title: 'Agent Loop in Practice' },
  { number: 24, id: 'slide-24-common-patterns', title: 'Best Practices' },
  { number: 25, id: 'slide-25-when-to-use', title: 'When to Use Agents' },
  { number: 26, id: 'slide-26-limitations', title: 'Current Limitations' },
  
  // Part 5: Advanced Topics (Slides 27-29)
  { number: 27, id: 'slide-27-multi-agent', title: 'Multi-Agent Systems' },
  { number: 28, id: 'slide-28-long-running', title: 'Long-Running Agents' },
  { number: 29, id: 'slide-29-applications', title: 'Real-World Applications' },
  
  // Part 6: Closing (Slides 30-34)
  { number: 30, id: 'slide-30-ai-fluency', title: 'AI Fluency: The 4Ds' },
  { number: 31, id: 'slide-31-journey-begins', title: 'Your Journey Begins' },
  { number: 32, id: 'slide-32-takeaways', title: 'Key Takeaways' },
  { number: 33, id: 'slide-33-questions', title: 'Questions?' },
  { number: 34, id: 'slide-34-thank-you', title: 'Thank You' },
];

// Mapping from new slide numbers to old file names (for content lookup)
const fileMapping: Record<number, string> = {
  1: 'slide-01-title',
  2: 'slide-02-frustration',
  3: 'slide-03-promise',
  4: 'slide-04-journey',
  // 5 is NEW - no file (Generative AI)
  6: 'slide-05-cold-open',
  7: 'slide-06-age-of-words',
  8: 'slide-07-rise-of-assistants',
  9: 'slide-08-awakening',
  10: 'slide-09-enter-agents',
  11: 'slide-10-evolution-timeline',
  12: 'slide-11-what-is-agent',
  13: 'slide-12-anatomy',
  14: 'slide-13-solar-scout-problem',
  15: 'slide-14-solar-scout-solution',
  16: 'slide-15-solar-scout-impact',
  17: 'slide-16-agent-loop',
  18: 'slide-17-persona-examples',
  19: 'slide-18-context-engineering',
  // 20 is NEW - no file (Prompt Engineering)
  21: 'slide-19-tool-design',
  // 22 is NEW - no file (Linux MCP Demo)
  23: 'slide-20-agent-loop-practice',
  24: 'slide-21-common-patterns',
  25: 'slide-22-when-to-use',
  26: 'slide-23-limitations',
  27: 'slide-24-multi-agent',
  28: 'slide-25-long-running',
  29: 'slide-26-applications',
  // 30 is NEW - no file (AI Fluency)
  31: 'slide-27-journey-begins',
  32: 'slide-28-takeaways',
  33: 'slide-29-questions',
  34: 'slide-30-thank-you',
};

export function getAllSlideIds(): string[] {
  return slideDefinitions.map(s => s.id);
}

export function getSlideData(newSlideNumber: number): Slide | null {
  const slideDef = slideDefinitions.find(s => s.number === newSlideNumber);
  if (!slideDef) return null;
  
  // Try to load content from mapped file
  const mappedFile = fileMapping[newSlideNumber];
  let content = {
    title: slideDef.title,
    content: '',
    speakerNotes: undefined as string | undefined,
    visualDescription: undefined as string | undefined,
    references: undefined as string | undefined,
  };
  
  if (mappedFile) {
    try {
      const fullPath = path.join(slidesDirectory, `${mappedFile}.md`);
      if (fs.existsSync(fullPath)) {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content: rawContent } = matter(fileContents);
        const sections = parseSlideContent(rawContent);
        
        content = {
          title: sections.title || slideDef.title,
          content: sections.content || '',
          speakerNotes: sections.speakerNotes,
          visualDescription: sections.visualDescription,
          references: sections.references,
        };
      }
    } catch (error) {
      // File doesn't exist or error reading - use defaults
      console.log(`Note: No data file for slide ${newSlideNumber}, using defaults`);
    }
  }
  
  return {
    id: slideDef.id,
    number: slideDef.number,
    title: content.title,
    content,
    part: getPartForSlide(slideDef.number),
    persona: ['all'],
  };
}

function getPartForSlide(slideNumber: number): string {
  if (slideNumber <= 4) return 'Opening';
  if (slideNumber <= 11) return 'Foundation & Evolution';
  if (slideNumber <= 18) return 'Understanding Agents';
  if (slideNumber <= 26) return 'Building Effectively';  // Now ends at 26
  if (slideNumber <= 29) return 'Advanced Topics';       // Now ends at 29
  return 'Closing';
}

function parseSlideContent(content: string) {
  const sections: {
    title?: string;
    content?: string;
    speakerNotes?: string;
    visualDescription?: string;
    references?: string;
  } = {};
  
  // Split by markdown headers (##)
  const parts = content.split(/^## /gm);
  
  for (const part of parts) {
    if (part.startsWith('Slide Content')) {
      // Extract title and content from Slide Content section
      const lines = part.split('\n');
      let titleFound = false;
      let contentStart = 0;
      
      // Find the title (usually after ###)
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('### ')) {
          sections.title = lines[i].replace('### ', '').trim();
          titleFound = true;
          contentStart = i + 1;
          break;
        }
      }
      
      // Extract content (everything after title until --- or next ##)
      if (titleFound) {
        const contentLines: string[] = [];
        for (let i = contentStart; i < lines.length; i++) {
          if (lines[i].trim() === '---' || lines[i].startsWith('## ')) {
            break;
          }
          contentLines.push(lines[i]);
        }
        sections.content = contentLines.join('\n').trim();
      } else {
        // Fallback: use everything after "Slide Content" header
        sections.content = part.replace(/^Slide Content\n\n?/m, '').split(/\n---|\n## /)[0].trim();
      }
    } else if (part.startsWith('Speaker Notes')) {
      sections.speakerNotes = part.replace(/^Speaker Notes\n\n?/m, '').split(/\n---|\n## /)[0].trim();
    } else if (part.startsWith('Visual Description')) {
      sections.visualDescription = part.replace(/^Visual Description\n\n?/m, '').split(/\n---|\n## /)[0].trim();
    } else if (part.startsWith('References')) {
      sections.references = part.replace(/^References\n\n?/m, '').split(/\n---|\n## /)[0].trim();
    }
  }
  
  return sections;
}

export function getAllSlides(): Slide[] {
  return slideDefinitions
    .map(def => getSlideData(def.number))
    .filter((slide): slide is Slide => slide !== null);
}

export function getSlideMetadata(): SlideMetadata {
  const slides = getAllSlides();
  
  const parts = [
    { name: 'Opening', start: 1, end: 4 },
    { name: 'Foundation & Evolution', start: 5, end: 11 },
    { name: 'Understanding Agents', start: 12, end: 18 },
    { name: 'Building Effectively', start: 19, end: 26 },  // Now includes Linux MCP (22)
    { name: 'Advanced Topics', start: 27, end: 29 },
    { name: 'Closing', start: 30, end: 34 },
  ];
  
  return {
    totalSlides: slides.length,
    parts,
  };
}
