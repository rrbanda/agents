'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { getAllSlidesClient } from '@/lib/slides-client';
import { Slide, Persona } from '@/lib/types';
import SlideComponent from '@/components/slides/Slide';
import Navigation from '@/components/ui/Navigation';
import PersonaSelector from '@/components/ui/PersonaSelector';
import Link from 'next/link';

export default function PresentationPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [persona, setPersona] = useState<Persona>('all');
  const [presenterMode, setPresenterMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setPresenterMode(!presenterMode);
      } else if (e.key === 'Escape') {
        // Could add exit functionality
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlideIndex, presenterMode, slides.length]);

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  useEffect(() => {
    if (slides.length > 0 && currentSlideIndex >= 0) {
      const slideNumber = (currentSlideIndex + 1).toString();
      localStorage.setItem('currentSlide', slideNumber);
      window.dispatchEvent(new CustomEvent('localStorageChange', { detail: { key: 'currentSlide', value: slideNumber } }));
    }
  }, [currentSlideIndex, slides.length]);

  const currentSlide = slides[currentSlideIndex];
  const progress = slides.length > 0 ? ((currentSlideIndex + 1) / slides.length) * 100 : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading presentation...</div>
      </div>
    );
  }

  if (!currentSlide) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">No slides found</div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Back to Home - Small, unobtrusive */}
      <Link 
        href="/home"
        className="fixed top-2 left-2 z-50 px-3 py-1.5 text-xs bg-gray-900/80 text-gray-400 hover:text-white rounded-lg opacity-50 hover:opacity-100 transition-all flex items-center gap-1"
      >
        ← Exit
      </Link>

      {/* Level Badge */}
      <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
        101 • Discover
      </div>

      {/* Presenter Controls - Only visible when presenterMode is true */}
      {presenterMode && (
        <PersonaSelector selectedPersona={persona} onSelect={setPersona} />
      )}

      {/* Presenter Mode Toggle - Small, unobtrusive */}
      <button
        onClick={() => setPresenterMode(!presenterMode)}
        className="fixed top-2 right-2 z-50 px-2 py-1 text-xs bg-gray-900/80 text-gray-400 hover:text-white rounded opacity-50 hover:opacity-100 transition-opacity"
        title="Toggle Presenter Mode (P)"
      >
        {presenterMode ? '👁️' : '👤'}
      </button>

      <div className="h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <SlideComponent
            key={currentSlide.id}
            slide={currentSlide}
            persona={persona}
            showNotes={false}
            showReferences={false}
          />
        </AnimatePresence>
      </div>

      <Navigation
        currentSlide={currentSlideIndex + 1}
        totalSlides={slides.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        progress={progress}
        showControls={presenterMode}
      />
    </div>
  );
}

