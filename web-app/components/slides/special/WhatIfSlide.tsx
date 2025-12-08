'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const transformations = [
  {
    before: { icon: '😵‍💫', text: 'Drowning in tabs' },
    after: { icon: '🎯', text: 'You focus, AI fetches' },
  },
  {
    before: { icon: '🔄', text: 'Copy-paste between systems' },
    after: { icon: '⚡', text: 'You decide, AI executes' },
  },
  {
    before: { icon: '📚', text: 'Hours reading docs' },
    after: { icon: '💬', text: 'You ask, AI summarizes' },
  },
  {
    before: { icon: '⏰', text: 'Repetitive grunt work' },
    after: { icon: '🚀', text: 'You strategize, AI handles details' },
  },
];

const capabilities = [
  { icon: '🧠', text: 'Extending your memory', color: '#3b82f6' },
  { icon: '🔧', text: 'Amplifying your reach', color: '#10b981' },
  { icon: '⚡', text: 'Accelerating your execution', color: '#f59e0b' },
  { icon: '👤', text: 'While you stay in control', color: '#8b5cf6' },
];

export default function WhatIfSlide() {
  const [activeTransform, setActiveTransform] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    // Cycle through transformations
    const cycleInterval = setInterval(() => {
      setShowAfter(false);
      setTimeout(() => {
        setActiveTransform((prev) => (prev + 1) % transformations.length);
        setTimeout(() => setShowAfter(true), 500);
      }, 300);
    }, 3500);

    // Initial show
    const initialTimer = setTimeout(() => setShowAfter(true), 800);

    return () => {
      clearInterval(cycleInterval);
      clearTimeout(initialTimer);
    };
  }, []);

  const current = transformations[activeTransform];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 overflow-hidden relative">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
          What If <span className="text-blue-400">You</span> Had Superpowers?
        </h2>
        <p className="text-gray-400 text-lg">
          AI that augments your capabilities — so you can do more of what matters
        </p>
      </motion.div>

      {/* Central Transformation Showcase */}
      <div className="w-full max-w-4xl flex items-center justify-center gap-8 md:gap-16 mb-12 z-10">
        {/* Before State */}
        <motion.div
          className="flex-1 max-w-[280px]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">Today</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`before-${activeTransform}`}
                className="bg-gray-800/80 rounded-2xl p-8 border border-gray-600/50"
                style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.1)' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-6xl mb-4">{current.before.icon}</div>
                <p className="text-gray-300 text-lg font-medium">{current.before.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-1"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-12 h-1 bg-gradient-to-r from-gray-600 to-blue-500 rounded-full" />
            <div 
              className="w-0 h-0" 
              style={{
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderLeft: '12px solid #3b82f6',
              }}
            />
          </motion.div>
          <span className="text-blue-400 text-sm font-semibold">AI Augmented</span>
        </motion.div>

        {/* After State */}
        <motion.div
          className="flex-1 max-w-[280px]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">Tomorrow</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`after-${activeTransform}`}
                className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-blue-500/30"
                style={{ boxShadow: showAfter ? '0 0 40px rgba(59, 130, 246, 0.3)' : 'none' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: showAfter ? 1 : 0.5, 
                  scale: showAfter ? 1 : 0.95,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-6xl mb-4">{current.after.icon}</div>
                <p className="text-white text-lg font-medium">{current.after.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Progress dots */}
      <motion.div 
        className="flex gap-2 mb-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {transformations.map((_, index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: index === activeTransform ? '#3b82f6' : '#4b5563',
            }}
            animate={{
              scale: index === activeTransform ? 1.3 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </motion.div>

      {/* Capabilities Row */}
      <motion.div
        className="w-full max-w-4xl z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-center mb-6">
          <p className="text-gray-400 text-sm uppercase tracking-wider">AI that augments you by</p>
        </div>
        <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/60 border border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                borderColor: cap.color,
                boxShadow: `0 0 20px ${cap.color}30`,
              }}
            >
              <span className="text-xl">{cap.icon}</span>
              <span className="text-gray-200 text-sm font-medium">{cap.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Teaser */}
      <motion.div
        className="mt-8 text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <p className="text-green-400 text-xl md:text-2xl font-medium">
          <span className="font-bold">Agentic AI</span> — augmenting YOU to be 10x more effective
        </p>
      </motion.div>
    </div>
  );
}
