'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const frustrations = [
  {
    persona: 'System Administrator',
    color: '#3b82f6',
    colorLight: '#60a5fa',
    items: [
      'Every morning. 2 hours analyzing logs across 50 servers.',
      '1 hour documenting incidents.',
      'Repetitive troubleshooting tasks.',
      'No time for proactive improvements.',
      'Context switching between multiple tools.',
      'Manual correlation of events.',
    ],
    quote: '"There has to be a better way..."',
  },
  {
    persona: 'DevOps Engineer',
    color: '#10b981',
    colorLight: '#34d399',
    items: [
      '2am page. Deployment failed.',
      '15 microservices to trace.',
      'Logs scattered across 3 systems.',
      'No single source of truth.',
      'Rollback decisions under pressure.',
      'Post-mortems reveal same issues.',
    ],
    quote: '"Too many moving parts..."',
  },
  {
    persona: 'Software Developer',
    color: '#f59e0b',
    colorLight: '#fbbf24',
    items: [
      'New codebase. 200K lines.',
      '"Where do I start?"',
      'Days to understand architecture.',
      'Documentation is outdated.',
      'No one knows the full picture.',
      'Fear of breaking things.',
    ],
    quote: '"I need a guide..."',
  },
  {
    persona: 'Platform Engineer',
    color: '#8b5cf6',
    colorLight: '#a78bfa',
    items: [
      'Infrastructure as code sprawl.',
      'Multiple cloud providers to manage.',
      'Compliance and security audits.',
      'Configuration drift everywhere.',
      'Manual policy enforcement.',
      'Cost optimization is reactive.',
    ],
    quote: '"Need better automation..."',
  },
];

export default function FrustrationSlide() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950">
      {/* Title - Perfectly centered */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="w-full text-center mb-8 flex-shrink-0"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
          The Daily Reality
        </h2>
      </motion.div>

      {/* Cards Grid - Perfectly centered */}
      <div className="w-full flex-1 flex items-center justify-center min-h-0 overflow-hidden px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1400px] w-full justify-items-center">
          {frustrations.map((frustration, index) => (
            <motion.div
              key={frustration.persona}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.2 + index * 0.15,
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative rounded-xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 border border-gray-700/50 w-full max-w-[320px]"
              style={{
                background: `linear-gradient(135deg, rgba(31, 41, 55, 0.95) 0%, rgba(17, 24, 39, 0.98) 100%)`,
                borderLeft: `6px solid ${frustration.color}`,
                transform: hoveredIndex === index ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: hoveredIndex === index 
                  ? `0 20px 40px -10px ${frustration.color}40, 0 0 0 1px ${frustration.color}20`
                  : `0 10px 30px -5px rgba(0, 0, 0, 0.5)`,
                aspectRatio: '1',
                minHeight: '0',
              }}
            >
              {/* Animated gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 opacity-0"
                animate={{
                  opacity: hoveredIndex === index ? 0.1 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  background: `linear-gradient(135deg, ${frustration.color}20 0%, transparent 100%)`,
                }}
              />
              
              {/* Content - Left aligned within card */}
              <div className="relative z-10 p-5 flex flex-col h-full">
                <motion.h3
                  className="text-base md:text-lg font-bold mb-3 flex-shrink-0 tracking-tight text-left"
                  style={{ color: frustration.color }}
                  animate={{
                    scale: hoveredIndex === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {frustration.persona}
                </motion.h3>
                
                <div className="space-y-2.5 flex-1 mb-3 overflow-y-auto text-left">
                  {frustration.items.map((item, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.4 + index * 0.15 + i * 0.08,
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className="text-xs md:text-sm text-gray-300 leading-relaxed group"
                    >
                      <span className="group-hover:text-white transition-colors duration-200">
                        {item}
                      </span>
                    </motion.p>
                  ))}
                </div>

                {/* Quote with special styling - Left aligned */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.7 + index * 0.15,
                    duration: 0.5
                  }}
                  className="mt-auto pt-3 border-t border-gray-700/50 flex-shrink-0 text-left"
                >
                  <motion.p
                    className="text-sm md:text-base text-yellow-400 italic font-medium leading-relaxed"
                    animate={{
                      color: hoveredIndex === index ? '#fbbf24' : '#facc15',
                      scale: hoveredIndex === index ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {frustration.quote}
                  </motion.p>
                </motion.div>
              </div>

              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ x: '-100%' }}
                animate={{
                  x: hoveredIndex === index ? '100%' : '-100%',
                }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${frustration.color}20 50%, transparent 100%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
