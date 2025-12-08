// Client-side slide data loader
// This fetches slides from the API instead of reading files directly

import { Slide, SlideMetadata } from './types';

export async function getAllSlidesClient(): Promise<Slide[]> {
  try {
    const response = await fetch('/api/slides');
    const data = await response.json();
    return data.slides || [];
  } catch (error) {
    console.error('Error loading slides:', error);
    return [];
  }
}

export async function getSlideMetadataClient(): Promise<SlideMetadata | null> {
  try {
    const response = await fetch('/api/slides');
    const data = await response.json();
    return data.metadata || null;
  } catch (error) {
    console.error('Error loading metadata:', error);
    return null;
  }
}

