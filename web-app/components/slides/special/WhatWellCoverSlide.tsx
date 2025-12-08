'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';

const sections = [
  {
    number: 1,
    title: 'How We Got Here',
    description: 'The journey from chatbots to intelligent assistants',
    icon: '📜',
    color: '#6b7280',
    duration: '~15 min',
  },
  {
    number: 2,
    title: 'What Agents Are',
    description: 'Understanding the breakthrough and how it works',
    icon: '🤖',
    color: '#3b82f6',
    duration: '~15 min',
  },
  {
    number: 3,
    title: 'How They Help',
    description: 'Real-world examples and practical applications',
    icon: '💼',
    color: '#10b981',
    duration: '~15 min',
  },
  {
    number: 4,
    title: 'Getting Started',
    description: 'Patterns, best practices, and next steps',
    icon: '🚀',
    color: '#f59e0b',
    duration: '~15 min',
  },
];

export default function WhatWellCoverSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Title */}
      <div className="text-center mb-8">
        <LineReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            What We'll Cover Today
          </h2>
          <p className="text-gray-400">
            A practical journey through AI agents
          </p>
        </LineReveal>
      </div>

      {/* Roadmap */}
      <div className="w-full max-w-4xl">
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-600 via-blue-500 via-green-500 to-yellow-500 hidden md:block" />

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((section, index) => (
              <motion.div
                key={section.number}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
                className="relative flex items-start gap-6"
              >
                {/* Number Circle */}
                <div 
                  className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold z-10"
                  style={{ 
                    backgroundColor: `${section.color}20`,
                    border: `3px solid ${section.color}`,
                    color: section.color,
                  }}
                >
                  {section.number}
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex-1 bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-gray-600 transition-all cursor-pointer"
                  style={{
                    borderLeftColor: section.color,
                    borderLeftWidth: '4px',
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{section.icon}</span>
                      <div>
                        <h3 
                          className="text-xl font-bold"
                          style={{ color: section.color }}
                        >
                          {section.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                      {section.duration}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Goal Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center"
      >
        <div className="bg-blue-500/10 rounded-xl px-6 py-4 border border-blue-500/30 inline-block">
          <p className="text-blue-400 font-semibold">
            🎯 Goal: Understand what agents are and how they can help in your work
          </p>
        </div>
      </motion.div>
    </div>
  );
}
