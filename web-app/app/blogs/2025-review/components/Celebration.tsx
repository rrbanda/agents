'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Stat } from '../types';

interface CelebrationProps {
  stats: Stat[];
  isVisible: boolean;
  onDismiss: () => void;
}

// Generate random particles
const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: 20 + Math.random() * 60,
  delay: Math.random() * 0.3,
  duration: 1.5 + Math.random() * 1.5,
  emoji: ['✨', '⭐', '🌟', '💫', '🎉', '🎊', '🥳'][Math.floor(Math.random() * 7)],
}));

export function Celebration({ stats, isVisible, onDismiss }: CelebrationProps) {
  // Auto-dismiss after 3 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
            onClick={onDismiss}
          />

          {/* Centered modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ 
              duration: 0.4, 
              type: 'spring', 
              bounce: 0.4
            }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="relative pointer-events-auto">
              {/* Floating particles */}
              <div className="absolute inset-0 -inset-x-32 -inset-y-20 overflow-visible pointer-events-none">
                {particles.map((particle) => (
                  <motion.span
                    key={particle.id}
                    initial={{ 
                      opacity: 0, 
                      y: 0,
                      scale: 0
                    }}
                    animate={{ 
                      opacity: [0, 1, 1, 0], 
                      y: [0, -40, -80, -120],
                      scale: [0, 1.3, 1, 0.6],
                    }}
                    transition={{ 
                      duration: particle.duration,
                      delay: particle.delay,
                      ease: 'easeOut',
                    }}
                    className="absolute text-2xl"
                    style={{ 
                      left: `${particle.x}%`,
                      top: '50%',
                    }}
                  >
                    {particle.emoji}
                  </motion.span>
                ))}
              </div>

              {/* Glow effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -inset-8 bg-gradient-to-r from-rose-500/20 via-purple-500/30 to-cyan-500/20 rounded-3xl blur-2xl"
              />

              {/* Content card */}
              <motion.div 
                className="relative px-8 py-6 rounded-2xl bg-gray-900/90 border border-white/20 backdrop-blur-xl shadow-2xl"
              >
                {/* Party emoji header */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', bounce: 0.6 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl"
                >
                  🎉
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-center text-lg font-bold text-white mb-4 mt-2"
                >
                  What a Year! 
                </motion.h3>

                {/* Stats grid */}
                <div className="flex gap-6 md:gap-8">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20, scale: 0.5 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        delay: 0.25 + i * 0.08,
                        type: 'spring',
                        bounce: 0.4
                      }}
                      className="text-center"
                    >
                      <motion.div 
                        className="flex items-center gap-1.5 justify-center"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                      >
                        <span className="text-xl">{stat.icon}</span>
                        <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-rose-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                          {stat.value}
                        </span>
                      </motion.div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
