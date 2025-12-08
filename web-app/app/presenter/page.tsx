'use client';

import { useState, useEffect } from 'react';
import { getAllSlidesClient } from '@/lib/slides-client';
import { Slide } from '@/lib/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function PresenterPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideNumber, setCurrentSlideNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load slides
    const loadSlides = async () => {
      try {
        const loadedSlides = await getAllSlidesClient();
        setSlides(loadedSlides);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading slides:', error);
        setIsLoading(false);
      }
    };
    
    loadSlides();
  }, []);

  useEffect(() => {
    // Sync with main presentation via localStorage
    const syncSlide = () => {
      const slideNumber = localStorage.getItem('currentSlide');
      if (slideNumber) {
        setCurrentSlideNumber(parseInt(slideNumber));
      }
    };

    // Check immediately
    syncSlide();

    // Listen for changes
    const interval = setInterval(syncSlide, 100); // Check every 100ms

    // Also listen to storage events (for cross-tab sync)
    window.addEventListener('storage', syncSlide);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', syncSlide);
    };
  }, []);

  const currentSlide = slides.find(s => s.number === currentSlideNumber);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading presenter notes...</div>
      </div>
    );
  }

  if (!currentSlide) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Waiting for slide {currentSlideNumber}...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 pb-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-yellow-400">Presenter Notes</h1>
              <p className="text-sm text-gray-400 mt-1">
                Slide {currentSlide.number} of {slides.length}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {currentSlide.content.title || currentSlide.title}
            </div>
          </div>
        </div>

        {/* Speaker Notes */}
        {currentSlide.content.speakerNotes ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">Speaker Notes</h2>
            <div className="prose prose-invert prose-lg max-w-none bg-gray-900 p-6 rounded-lg border-l-4 border-yellow-500">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {currentSlide.content.speakerNotes}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="mb-8 p-6 bg-gray-900 rounded-lg border-l-4 border-gray-700">
            <p className="text-gray-400 italic">No speaker notes available for this slide.</p>
          </div>
        )}

        {/* References */}
        {currentSlide.content.references && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">References</h2>
            <div className="prose prose-invert prose-sm max-w-none bg-gray-900 p-6 rounded-lg border-l-4 border-blue-500">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {currentSlide.content.references}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Visual Description */}
        {currentSlide.content.visualDescription && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-green-400">Visual Description</h2>
            <div className="prose prose-invert prose-sm max-w-none bg-gray-900 p-6 rounded-lg border-l-4 border-green-500">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {currentSlide.content.visualDescription}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Sync Status */}
        <div className="mt-8 pt-4 border-t border-gray-800">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <div className={`w-2 h-2 rounded-full ${currentSlide ? 'bg-green-500' : 'bg-gray-500'} animate-pulse`}></div>
            <span>Synced with main presentation • Auto-updates every 100ms</span>
          </div>
          <div className="text-xs text-gray-600 text-center mt-2">
            Keep this tab open on your screen • Don't share this tab
          </div>
        </div>
      </div>
    </div>
  );
}

