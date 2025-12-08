// Slide data and parser

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Slide, SlideMetadata } from './types';

const slidesDirectory = path.join(process.cwd(), 'data/slides');

export function getAllSlideIds(): string[] {
  const fileNames = fs.readdirSync(slidesDirectory);
  return fileNames
    .filter(name => name.startsWith('slide-') && name.endsWith('.md'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/slide-(\d+)/)?.[1] || '0');
      const numB = parseInt(b.match(/slide-(\d+)/)?.[1] || '0');
      return numA - numB;
    });
}

export function getSlideData(id: string): Slide | null {
  try {
    const fullPath = path.join(slidesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Extract slide number from filename
    const match = id.match(/slide-(\d+)/);
    const slideNumber = match ? parseInt(match[1]) : 0;
    
    // Parse content sections
    const sections = parseSlideContent(content);
    
    return {
      id,
      number: slideNumber,
      title: sections.title || data.title || `Slide ${slideNumber}`,
      content: {
        title: sections.title || '',
        content: sections.content || '',
        speakerNotes: sections.speakerNotes,
        visualDescription: sections.visualDescription,
        references: sections.references,
      },
      part: data.part,
      persona: data.persona || ['all'],
    };
  } catch (error) {
    console.error(`Error loading slide ${id}:`, error);
    return null;
  }
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
  const ids = getAllSlideIds();
  return ids
    .map(id => getSlideData(id.replace('.md', '')))
    .filter((slide): slide is Slide => slide !== null);
}

export function getSlideMetadata(): SlideMetadata {
  const slides = getAllSlides();
  
  const parts = [
    { name: 'Opening', start: 1, end: 4 },
    { name: 'Evolution', start: 5, end: 10 },
    { name: 'Understanding', start: 11, end: 17 },
    { name: 'Building', start: 18, end: 23 },
    { name: 'Future', start: 24, end: 30 },
  ];
  
  return {
    totalSlides: slides.length,
    parts,
  };
}

