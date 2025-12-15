'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

// Import 201 slides
import { slides201, Slide201 } from './slides';

export default function Learn201Page() {
  const router = useRouter();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Brief loading state for smooth transition
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = useCallback(() => {
    if (currentSlideIndex < slides201.length - 1) {
      setDirection(1);
      setCurrentSlideIndex(prev => prev + 1);
    }
  }, [currentSlideIndex]);

  const handlePrevious = useCallback(() => {
    if (currentSlideIndex > 0) {
      setDirection(-1);
      setCurrentSlideIndex(prev => prev - 1);
    }
  }, [currentSlideIndex]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrevious();
    } else if (e.key === 'Escape') {
      router.push('/learn');
    }
  }, [handleNext, handlePrevious, router]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const currentSlide = slides201[currentSlideIndex];
  const progress = ((currentSlideIndex + 1) / slides201.length) * 100;

  // Slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-gray-400">Loading 201 Course...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0a0a0f] overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
            top: '-20%',
            right: '-20%',
          }}
          animate={{ 
            x: [0, -50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)',
            bottom: '-10%',
            left: '-15%',
          }}
          animate={{ 
            x: [0, 40, 0], 
            y: [0, -40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Header - hidden on title slide */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: currentSlideIndex === 0 ? 0 : 1,
          y: currentSlideIndex === 0 ? -20 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 z-50 px-6 py-4"
        style={{ pointerEvents: currentSlideIndex === 0 ? 'none' : 'auto' }}
      >
        {/* Back button */}
        <Link 
          href="/learn"
          className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
        >
          <motion.div
            whileHover={{ x: -3 }}
            className="flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Back
            </span>
          </motion.div>
        </Link>
      </motion.header>

      {/* Slide counter - bottom left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: currentSlideIndex === 0 ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-20 left-6 z-50 px-3 py-1.5 rounded-lg bg-gray-900/80 border border-gray-700/50"
      >
        <div className="flex items-center gap-1.5 text-sm">
          <span className="font-mono text-white">{currentSlideIndex + 1}</span>
          <span className="text-gray-500">/</span>
          <span className="font-mono text-gray-400">{slides201.length}</span>
        </div>
      </motion.div>

      {/* Main slide area */}
      <main className="h-full pt-4 pb-20 relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlideIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="h-full"
          >
            {currentSlide && <currentSlide.component />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Progress bar */}
      <div className="fixed bottom-16 left-0 right-0 z-40 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-4 py-4 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent">
        {/* Previous button */}
        <motion.button
          onClick={handlePrevious}
          disabled={currentSlideIndex === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            currentSlideIndex === 0
              ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm hidden md:block">Previous</span>
        </motion.button>

        {/* Next button */}
        <motion.button
          onClick={handleNext}
          disabled={currentSlideIndex === slides201.length - 1}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            currentSlideIndex === slides201.length - 1
              ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/20'
          }`}
        >
          <span className="text-sm hidden md:block">Next</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </nav>

      {/* Keyboard hints */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
        className="fixed bottom-4 right-6 z-50 flex items-center gap-3 text-xs text-gray-600"
      >
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-gray-800/50 rounded text-[10px] border border-gray-700/50">←</kbd>
          <kbd className="px-1.5 py-0.5 bg-gray-800/50 rounded text-[10px] border border-gray-700/50">→</kbd>
          Navigate
        </span>
        <span className="text-gray-700">|</span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-gray-800/50 rounded text-[10px] border border-gray-700/50">Esc</kbd>
          Exit
        </span>
      </motion.div>
    </div>
  );
}

