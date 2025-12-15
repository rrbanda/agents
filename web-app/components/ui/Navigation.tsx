'use client';

import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  progress: number;
  showControls?: boolean; // For screenshare mode
}

export default function Navigation({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  progress,
  showControls = true,
}: NavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 z-50">
      {/* Progress Bar - Always visible */}
      <div className="h-1 bg-gray-800 w-full">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Navigation Controls - Only show if presenterMode or always show minimal */}
      {showControls ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between">
          {/* Previous Button - Icon only on mobile, with text on desktop */}
          <button
            onClick={onPrevious}
            disabled={currentSlide === 1}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Slide Counter */}
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-300">{currentSlide}</span>
            <span className="mx-1">/</span>
            <span>{totalSlides}</span>
          </div>

          {/* Next Button - Icon only on mobile, with text on desktop */}
          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next slide"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      ) : (
        // Minimal navigation for audience view - just slide number and tap zones
        <div className="flex items-center justify-between px-4 py-2">
          {/* Invisible tap zone for previous */}
          <button
            onClick={onPrevious}
            disabled={currentSlide === 1}
            className="w-12 h-8 flex items-center justify-center text-gray-600 hover:text-gray-400 disabled:opacity-30 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          
          <div className="text-xs text-gray-500">
            {currentSlide} / {totalSlides}
          </div>
          
          {/* Invisible tap zone for next */}
          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides}
            className="w-12 h-8 flex items-center justify-center text-gray-600 hover:text-gray-400 disabled:opacity-30 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
