'use client';

import { useState, useEffect, Suspense, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { getAllSlidesClient } from '@/lib/slides-client';
import { Slide, Persona } from '@/lib/types';
import SlideComponent from '@/components/slides/Slide';
import Navigation from '@/components/ui/Navigation';
import PersonaSelector from '@/components/ui/PersonaSelector';
import Link from 'next/link';

function PresentationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [persona, setPersona] = useState<Persona>('all');
  const [presenterMode, setPresenterMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialSlideSet, setInitialSlideSet] = useState(false);
  
  // Touch/swipe gesture tracking
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const minSwipeDistance = 50;

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

  // Handle initial slide from URL query parameter
  useEffect(() => {
    if (slides.length > 0 && !initialSlideSet) {
      const slideParam = searchParams.get('slide');
      if (slideParam) {
        const slideNumber = parseInt(slideParam, 10);
        if (!isNaN(slideNumber) && slideNumber >= 1 && slideNumber <= slides.length) {
          setCurrentSlideIndex(slideNumber - 1);
        }
      }
      setInitialSlideSet(true);
    }
  }, [slides.length, searchParams, initialSlideSet]);

  const handleNext = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  }, [currentSlideIndex, slides.length]);

  const handlePrevious = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  }, [currentSlideIndex]);

  // Keyboard navigation
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
        router.push('/talks');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleNext, handlePrevious, presenterMode, router]);

  // Touch/swipe gesture handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;
    
    // Only register horizontal swipes (ignore vertical scrolling)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe right → previous slide
        handlePrevious();
      } else {
        // Swipe left → next slide
        handleNext();
      }
    }
    
    touchStartX.current = null;
    touchStartY.current = null;
  }, [handleNext, handlePrevious]);

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
    <div 
      className="relative h-screen overflow-hidden touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Persistent Back Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Back button + Breadcrumb */}
          <Link 
            href="/talks"
            className="pointer-events-auto group flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <motion.div
              whileHover={{ x: -2 }}
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-gray-500 text-sm hidden sm:inline">Talks</span>
              <span className="text-gray-600 hidden sm:inline">/</span>
              <span className="text-gray-300 text-sm font-medium">Agentic AI: An Introduction</span>
            </motion.div>
          </Link>

          {/* Keyboard hint */}
          <div 
            className="pointer-events-none hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-500"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <kbd className="px-1.5 py-0.5 rounded bg-gray-800/50 text-gray-400 text-[10px]">←→</kbd>
            <span>navigate</span>
            <span className="text-gray-700 mx-1">·</span>
            <kbd className="px-1.5 py-0.5 rounded bg-gray-800/50 text-gray-400 text-[10px]">Esc</kbd>
            <span>exit</span>
          </div>
        </div>
      </motion.div>

      {/* Presenter Controls - Only visible when presenterMode is true */}
      {presenterMode && (
        <PersonaSelector selectedPersona={persona} onSelect={setPersona} />
      )}

      {/* Presenter Mode Toggle - Small, unobtrusive */}
      <button
        onClick={() => setPresenterMode(!presenterMode)}
        className="fixed top-3 right-3 z-50 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-900/80 opacity-40 hover:opacity-100 transition-all"
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

      {/* Swipe hint for mobile - shows briefly on first load */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 md:hidden pointer-events-none"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/80 text-gray-400 text-sm">
          <span>←</span>
          <span>Swipe to navigate</span>
          <span>→</span>
        </div>
      </motion.div>

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

export default function PresentationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading presentation...</div>
      </div>
    }>
      <PresentationContent />
    </Suspense>
  );
}
