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
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <button
            onClick={onPrevious}
            disabled={currentSlide === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            <span>Previous</span>
          </button>

        <div className="text-sm text-gray-500">
          {currentSlide} / {totalSlides}
        </div>

          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      ) : (
        // Minimal navigation for audience view - just slide number
        <div className="max-w-6xl mx-auto px-8 py-2 flex justify-center">
          <div className="text-xs text-gray-500">
            {currentSlide} / {totalSlides}
          </div>
        </div>
      )}
    </div>
  );
}

