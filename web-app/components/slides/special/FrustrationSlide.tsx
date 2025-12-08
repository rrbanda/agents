'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Universal pain points that resonate across all technical roles
const painPoints = [
  { icon: '📊', text: 'Scattered across 5+ dashboards', delay: 0 },
  { icon: '📝', text: '47 browser tabs open', delay: 0.5 },
  { icon: '🔄', text: 'Context switching every 3 minutes', delay: 1 },
  { icon: '📋', text: 'Copy-paste between systems', delay: 1.5 },
  { icon: '🔍', text: 'Searching through old Slack threads', delay: 2 },
  { icon: '⏰', text: 'Meetings about meetings', delay: 2.5 },
];

const stats = [
  { value: '2.5', unit: 'hrs', label: 'Lost daily to context switching', color: '#ef4444' },
  { value: '23', unit: 'min', label: 'To refocus after interruption', color: '#f59e0b' },
  { value: '60%', unit: '', label: 'Time on repetitive tasks', color: '#8b5cf6' },
];

export default function FrustrationSlide() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    // Cycle through pain points
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % painPoints.length);
    }, 2000);

    // Show stats after initial animation
    const statsTimer = setTimeout(() => setShowStats(true), 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(statsTimer);
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 overflow-hidden relative">
      {/* Animated background chaos effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-red-500/10"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              scale: 0 
            }}
            animate={{ 
              x: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
              y: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
              scale: [0.5, 1, 0.5],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
          Sound Familiar?
        </h2>
        <p className="text-gray-400 text-lg">
          The modern technical professional&apos;s daily struggle
        </p>
      </motion.div>

      {/* Central Chaos Visualization */}
      <div className="relative w-full max-w-4xl flex-1 flex items-center justify-center min-h-[300px]">
        {/* Central overwhelmed figure */}
        <motion.div
          className="absolute z-20 flex flex-col items-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          <div className="text-7xl md:text-8xl mb-4">😵‍💫</div>
          <motion.div
            className="px-6 py-3 bg-gray-800/90 rounded-xl border border-gray-600 shadow-2xl"
            animate={{
              boxShadow: [
                '0 0 20px rgba(239, 68, 68, 0.2)',
                '0 0 40px rgba(239, 68, 68, 0.4)',
                '0 0 20px rgba(239, 68, 68, 0.2)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white font-semibold text-lg">You, every day</span>
          </motion.div>
        </motion.div>

        {/* Orbiting pain points */}
        {painPoints.map((point, index) => {
          const angle = (index / painPoints.length) * 2 * Math.PI - Math.PI / 2;
          const radius = 180;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <motion.div
              key={index}
              className="absolute z-10 flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap"
              style={{
                backgroundColor: activeIndex === index ? 'rgba(239, 68, 68, 0.2)' : 'rgba(55, 65, 81, 0.8)',
                border: activeIndex === index ? '2px solid #ef4444' : '1px solid rgba(75, 85, 99, 0.5)',
                boxShadow: activeIndex === index ? '0 0 20px rgba(239, 68, 68, 0.3)' : 'none',
              }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ 
                opacity: 1,
                x,
                y,
                scale: activeIndex === index ? 1.1 : 1,
              }}
              transition={{ 
                delay: point.delay * 0.3,
                duration: 0.5,
                scale: { duration: 0.3 }
              }}
            >
              <span className="text-xl">{point.icon}</span>
              <span className={`text-sm font-medium ${activeIndex === index ? 'text-red-300' : 'text-gray-300'}`}>
                {point.text}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Statistics Row */}
      <motion.div
        className="w-full max-w-4xl flex justify-center gap-8 md:gap-16 mt-8 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: showStats ? 1 : 0, y: showStats ? 0 : 30 }}
        transition={{ duration: 0.6 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showStats ? 1 : 0, y: showStats ? 0 : 20 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <div className="flex items-baseline justify-center gap-1">
              <span 
                className="text-4xl md:text-5xl font-bold"
                style={{ color: stat.color }}
              >
                {stat.value}
              </span>
              <span className="text-xl md:text-2xl text-gray-400">{stat.unit}</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom quote */}
      <motion.div
        className="mt-8 text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p className="text-yellow-400 text-xl md:text-2xl font-medium italic">
          &ldquo;There has to be a better way...&rdquo;
        </p>
      </motion.div>
    </div>
  );
}
