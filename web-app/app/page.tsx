'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { getAllSlidesClient } from '@/lib/slides-client';
import { Slide, Persona } from '@/lib/types';
import SlideComponent from '@/components/slides/Slide';
import Navigation from '@/components/ui/Navigation';
import PersonaSelector from '@/components/ui/PersonaSelector';

export default function PresentationPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [persona, setPersona] = useState<Persona>('all');
  const [showNotes, setShowNotes] = useState(false);
  const [showReferences, setShowReferences] = useState(false);
  const [presenterMode, setPresenterMode] = useState(false); // Controls visibility of controls
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load slides from API
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
    // Keyboard navigation
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        // Toggle presenter mode (hide/show controls)
        setPresenterMode(!presenterMode);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlideIndex, presenterMode, slides.length]);

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      const newIndex = currentSlideIndex + 1;
      setCurrentSlideIndex(newIndex);
    }
  };

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      const newIndex = currentSlideIndex - 1;
      setCurrentSlideIndex(newIndex);
    }
  };

  // Sync slide number to localStorage for presenter page
  useEffect(() => {
    if (slides.length > 0 && currentSlideIndex >= 0) {
      const slideNumber = (currentSlideIndex + 1).toString();
      localStorage.setItem('currentSlide', slideNumber);
      // Trigger custom event for same-tab sync (storage event only fires cross-tab)
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
      {/* Presenter Mode Controls - Only visible when presenterMode is true */}
      {presenterMode && (
        <>
          <PersonaSelector selectedPersona={persona} onSelect={setPersona} />
          
          {/* Toggle Buttons - Presenter Only */}
          <div className="fixed top-4 left-4 z-50 flex gap-2">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                showNotes
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              title="Toggle Speaker Notes (N)"
            >
              Notes {showNotes ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => setShowReferences(!showReferences)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                showReferences
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              title="Toggle References (R)"
            >
              Refs {showReferences ? 'ON' : 'OFF'}
            </button>
          </div>
        </>
      )}

      {/* Presenter Mode Toggle - Small, unobtrusive */}
      <div className="fixed top-2 right-2 z-50 flex gap-2">
        <a
          href="/presenter"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors font-semibold"
          title="Open Presenter Notes in New Tab (Not Shared)"
        >
          📝 Notes
        </a>
        <button
          onClick={() => setPresenterMode(!presenterMode)}
          className="px-2 py-1 text-xs bg-gray-900/80 text-gray-400 hover:text-white rounded opacity-50 hover:opacity-100 transition-opacity"
          title="Toggle Presenter Mode (P) - Shows/hides controls"
        >
          {presenterMode ? '👁️' : '👤'}
        </button>
      </div>

      <div className="h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <SlideComponent
            key={currentSlide.id}
            slide={currentSlide}
            persona={persona}
            showNotes={false} // Never show notes on main slide (use presenter page)
            showReferences={false} // Never show references on main slide
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
