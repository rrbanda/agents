// Client-side slide data loader
// Fetches from static slides.json for GitHub Pages compatibility

import { Slide, SlideMetadata } from './types';

interface SlidesData {
  slides: Slide[];
  metadata: SlideMetadata;
}

let cachedData: SlidesData | null = null;

// Get the base path from Next.js config (works at runtime)
function getBasePath(): string {
  // In browser, we can detect the base path from the current URL
  if (typeof window !== 'undefined') {
    // Check if we're on GitHub Pages with /agents/ prefix
    const pathname = window.location.pathname;
    if (pathname.startsWith('/agents')) {
      return '/agents';
    }
  }
  return '';
}

async function fetchSlidesData(): Promise<SlidesData | null> {
  // Return cached data if available
  if (cachedData) {
    return cachedData;
  }

  try {
    const basePath = getBasePath();
    // Fetch from static JSON file (works on GitHub Pages)
    const response = await fetch(`${basePath}/slides.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch slides: ${response.status}`);
    }
    const data = await response.json();
    cachedData = data;
    return data;
  } catch (error) {
    console.error('Error loading slides:', error);
    return null;
  }
}

export async function getAllSlidesClient(): Promise<Slide[]> {
  const data = await fetchSlidesData();
  return data?.slides || [];
}

export async function getSlideMetadataClient(): Promise<SlideMetadata | null> {
  const data = await fetchSlidesData();
  return data?.metadata || null;
}
