import { NextResponse } from 'next/server';
import { getAllSlides, getSlideMetadata } from '@/lib/slides';

export async function GET() {
  try {
    const slides = getAllSlides();
    const metadata = getSlideMetadata();
    
    return NextResponse.json({
      slides,
      metadata,
    });
  } catch (error) {
    console.error('Error loading slides:', error);
    return NextResponse.json(
      { error: 'Failed to load slides' },
      { status: 500 }
    );
  }
}

