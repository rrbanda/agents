'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// Local imports
import { yearInReviewData } from './data';
import { Header, TimelineNode, Celebration } from './components';

export default function YearInReviewPage() {
  const [revealedQuarters, setRevealedQuarters] = useState<Set<string>>(new Set());
  const [currentQuarter, setCurrentQuarter] = useState<string | null>(null);
  const [fillProgress, setFillProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [autoPlayComplete, setAutoPlayComplete] = useState(false);

  const { config, quarters, stats } = yearInReviewData;

  // Dismiss celebration callback - reset to clean state
  const handleDismissCelebration = useCallback(() => {
    setShowCelebration(false);
    setRevealedQuarters(new Set()); // Hide all cards
    setCurrentQuarter(null);
  }, []);

  // Auto-play animation on mount - progressively reveals cards
  useEffect(() => {
    const quarterIds = quarters.map(q => q.id);
    let currentIndex = 0;

    // Start mercury fill
    const fillTimer = setTimeout(() => {
      setFillProgress(100);
    }, 300);

    // Cycle through quarters - each one stays revealed
    const interval = setInterval(() => {
      if (currentIndex < quarterIds.length) {
        const qId = quarterIds[currentIndex];
        setCurrentQuarter(qId);
        setRevealedQuarters(prev => new Set([...prev, qId]));
        currentIndex++;
      } else {
        // Animation complete
        clearInterval(interval);
        setCurrentQuarter(null);
        setAutoPlayComplete(true);
        
        // Show celebration after a brief pause
        setTimeout(() => {
          setShowCelebration(true);
        }, 300);
      }
    }, 1000); // 1s per quarter

    return () => {
      clearTimeout(fillTimer);
      clearInterval(interval);
    };
  }, [quarters]);

  // Handle hover/click to show card (after auto-play)
  const handleQuarterHover = (id: string | null) => {
    if (autoPlayComplete) {
      setCurrentQuarter(id);
    }
  };

  // Check if a quarter's card should be visible
  const isQuarterRevealed = (id: string) => revealedQuarters.has(id) || currentQuarter === id;

  return (
    <div className="min-h-screen bg-[#08080c] text-white overflow-hidden">
      {/* Back navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50"
      >
        <Link
          href="/blogs"
          className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors text-sm"
        >
          <span>←</span>
          <span className="hidden sm:inline">Back</span>
        </Link>
      </motion.div>

      {/* Main content - fits in viewport */}
      <div className="h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 pb-8">
        {/* Header */}
        <Header config={config} />

        {/* Thermometer Timeline - takes remaining space */}
        <div className="relative w-full max-w-6xl xl:max-w-7xl flex-1 flex items-center my-4">
          {/* Center thermometer track */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[28px] bottom-[28px] w-2 md:w-3 bg-gray-800/60 rounded-full" />

          {/* Mercury fill - animated */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `calc(${fillProgress}% - 56px)` }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
            className="absolute left-1/2 -translate-x-1/2 top-[28px] w-2 md:w-3 rounded-full"
            style={{
              background: 'linear-gradient(to bottom, #f43f5e, #22c55e, #3b82f6, #a855f7)',
            }}
          />

          {/* Quarter nodes - evenly distributed */}
          <div className="relative w-full h-full flex flex-col justify-between">
            {quarters.map((quarter, index) => (
              <TimelineNode
                key={quarter.id}
                quarter={quarter}
                index={index}
                isRevealed={isQuarterRevealed(quarter.id)}
                isActive={currentQuarter === quarter.id}
                onHover={handleQuarterHover}
                animationDelay={0.3 + index * 0.15}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Celebration modal - centered overlay */}
      <Celebration 
        stats={stats} 
        isVisible={showCelebration} 
        onDismiss={handleDismissCelebration}
      />

      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-rose-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>
    </div>
  );
}
