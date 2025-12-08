'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';

const sections = [
  {
    title: 'How We Got Here',
    subtitle: 'The evolution of AI',
    icon: '📈',
  },
  {
    title: 'What Agents Are',
    subtitle: 'Understanding the breakthrough',
    icon: '🤖',
  },
  {
    title: 'How They Work',
    subtitle: 'The patterns and principles',
    icon: '⚙️',
  },
  {
    title: 'How to Use Them',
    subtitle: 'Practical applications',
    icon: '🛠️',
  },
  {
    title: 'Where We\'re Heading',
    subtitle: 'The future',
    icon: '🚀',
  },
];

export default function WhatWellCoverSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4 flex-shrink-0"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
          What We'll Cover
        </h2>
      </motion.div>

      <div className="w-full max-w-5xl flex-1 flex flex-col justify-center min-h-0 overflow-hidden">
        <div className="space-y-2">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-blue-500 flex items-center gap-4"
            >
              <div className="text-2xl flex-shrink-0">{section.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-white mb-0.5">
                  {section.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400">
                  {section.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-4 pt-3 border-t border-gray-700 text-center max-w-3xl flex-shrink-0"
      >
        <p className="text-base md:text-lg text-gray-300">
          <strong className="text-white font-semibold">Goal:</strong> By the end, you'll understand what agents are and how they can help in your work.
        </p>
      </motion.div>
    </div>
  );
}

