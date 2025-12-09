'use client';

import { useState, useEffect, Suspense } from 'react';
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
        router.push('/learn/101');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlideIndex, presenterMode, slides.length, router]);

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
      {/* Logo - Links back to slides catalog */}
      <Link 
        href="/learn/101"
        className="fixed top-3 left-3 z-50 group"
        title="Back to Slides (Esc)"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity"
        >
          <span className="text-white font-bold text-xs">AI</span>
        </motion.div>
      </Link>

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
