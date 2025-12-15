// Client-side slide data loader
// Fetches from static slides.json for GitHub Pages compatibility

import { Slide, SlideMetadata } from './types';

interface SlidesData {
  slides: Slide[];
  metadata: SlideMetadata;
}

let cachedData: SlidesData | null = null;

async function fetchSlidesData(): Promise<SlidesData | null> {
  // Return cached data if available
  if (cachedData) {
    return cachedData;
  }

  try {
    // Fetch from static JSON file (works on GitHub Pages)
    const response = await fetch('/slides.json');
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
