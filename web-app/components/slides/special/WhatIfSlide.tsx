'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const personaBenefits = [
  {
    persona: 'System Administrator',
    color: '#3b82f6',
    colorLight: '#3b82f6',
    colorDark: '#1e40af',
    benefits: [
      'Analyze logs across all servers automatically',
      'Document incidents as they happen',
      'Remember what worked last time',
      'Proactively monitor system health',
      'Generate incident reports instantly',
      'Learn from past resolutions',
    ],
  },
  {
    persona: 'DevOps Engineer',
    color: '#10b981',
    colorLight: '#10b981',
    colorDark: '#047857',
    benefits: [
      'Trace failures across microservices instantly',
      'Deploy with confidence and rollback automatically',
      'Learn from every deployment',
      'Monitor pipeline health continuously',
      'Optimize infrastructure costs dynamically',
      'Predict failures before they happen',
    ],
  },
  {
    persona: 'Software Developer',
    color: '#f59e0b',
    colorLight: '#f59e0b',
    colorDark: '#d97706',
    benefits: [
      'Navigate any codebase instantly',
      'Write code that matches your style',
      'Remember your architecture decisions',
      'Suggest improvements based on patterns',
      'Answer questions about legacy code',
      'Generate tests automatically',
    ],
  },
  {
    persona: 'Platform Engineer',
    color: '#8b5cf6',
    colorLight: '#8b5cf6',
    colorDark: '#6d28d9',
    benefits: [
      'Manage infrastructure as code automatically',
      'Ensure compliance across all environments',
      'Learn from infrastructure patterns',
      'Detect configuration drift instantly',
      'Enforce security policies consistently',
      'Optimize resource allocation',
    ],
  },
];

export default function WhatIfSlide() {
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
          What if you had a teammate that could...
        </h2>
      </motion.div>

      {/* Cards Grid - Perfectly centered */}
      <div className="w-full flex-1 flex items-center justify-center min-h-0 overflow-hidden px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1400px] w-full justify-items-center">
          {personaBenefits.map((persona, index) => (
            <motion.div
              key={persona.persona}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.2 + index * 0.15,
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative rounded-xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 w-full max-w-[320px]"
              style={{
                background: `linear-gradient(135deg, rgba(31, 41, 55, 0.95) 0%, rgba(17, 24, 39, 0.98) 100%)`,
                borderLeft: `6px solid ${persona.color}`,
                transform: hoveredIndex === index ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: hoveredIndex === index 
                  ? `0 20px 40px -10px ${persona.color}40, 0 0 0 1px ${persona.color}20`
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
                  background: `linear-gradient(135deg, ${persona.color}20 0%, transparent 100%)`,
                }}
              />
              
              {/* Content - Left aligned within card */}
              <div className="relative z-10 p-5 flex flex-col h-full">
                <motion.h3
                  className="text-base md:text-lg font-bold mb-3 flex-shrink-0 tracking-tight text-left"
                  style={{ color: persona.color }}
                  animate={{
                    scale: hoveredIndex === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {persona.persona}
                </motion.h3>
                
                <ul className="space-y-2.5 flex-1 overflow-hidden text-left">
                  {persona.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.4 + index * 0.15 + i * 0.08,
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className="text-xs md:text-sm text-gray-200 flex items-start gap-2.5 leading-relaxed group"
                    >
                      <motion.span
                        className="mt-0.5 flex-shrink-0 text-lg font-bold"
                        style={{ color: persona.color }}
                        animate={{
                          scale: hoveredIndex === index ? [1, 1.3, 1] : 1,
                        }}
                        transition={{ 
                          delay: hoveredIndex === index ? 0 : 0,
                          duration: 0.3
                        }}
                      >
                        •
                      </motion.span>
                      <span className="group-hover:text-white transition-colors duration-200 flex-1">
                        {benefit}
                      </span>
                    </motion.li>
                  ))}
                </ul>
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
                  background: `linear-gradient(90deg, transparent 0%, ${persona.color}20 50%, transparent 100%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
