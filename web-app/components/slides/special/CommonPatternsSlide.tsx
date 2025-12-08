'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import LineReveal from '../../animations/LineReveal';

const patterns = [
  {
    id: 1,
    title: 'Incremental Progress',
    icon: '📈',
    color: '#3b82f6',
    points: [
      'Work on one thing at a time',
      'Leave clean state after each step',
      "Don't try to do everything at once",
    ],
    tip: 'Small steps, big results',
  },
  {
    id: 2,
    title: 'Clean State Management',
    icon: '✨',
    color: '#10b981',
    points: [
      'Always leave environment merge-ready',
      'Document what was done',
      'Make it easy for next session',
    ],
    tip: 'Future you will thank you',
  },
  {
    id: 3,
    title: 'Error Handling',
    icon: '🛡️',
    color: '#f59e0b',
    points: [
      'Agents can recover from errors',
      'Use checkpoints to save progress',
      'Learn from failures, adapt approach',
    ],
    tip: 'Failures are feedback',
  },
  {
    id: 4,
    title: 'Verification First',
    icon: '✓',
    color: '#8b5cf6',
    points: [
      'Test existing functionality before new work',
      'Verify fixes before moving on',
      "Don't assume things work",
    ],
    tip: 'Trust but verify',
  },
];

export default function CommonPatternsSlide() {
  const [hoveredPattern, setHoveredPattern] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <LineReveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Best Practices for Agents
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Patterns that make agents more reliable
        </p>
      </LineReveal>

      {/* Four Pattern Cards - 2x2 Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-5">
        {patterns.map((pattern, index) => (
          <motion.div
            key={pattern.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            onHoverStart={() => setHoveredPattern(pattern.id)}
            onHoverEnd={() => setHoveredPattern(null)}
            className="rounded-xl overflow-hidden transition-all duration-300"
            style={{
              background: hoveredPattern === pattern.id 
                ? `linear-gradient(135deg, ${pattern.color}15 0%, rgba(31, 41, 55, 0.8) 100%)`
                : 'rgba(31, 41, 55, 0.5)',
              border: `2px solid ${hoveredPattern === pattern.id ? pattern.color : 'rgba(75, 85, 99, 0.4)'}`,
              boxShadow: hoveredPattern === pattern.id 
                ? `0 10px 40px ${pattern.color}25` 
                : '0 4px 20px rgba(0, 0, 0, 0.2)',
              transform: hoveredPattern === pattern.id ? 'translateY(-4px)' : 'translateY(0)',
            }}
          >
            {/* Header */}
            <div className="p-4 flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ 
                  backgroundColor: `${pattern.color}20`,
                  border: `1px solid ${pattern.color}40`,
                }}
              >
                {pattern.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span 
                    className="text-sm font-bold px-2 py-0.5 rounded"
                    style={{ 
                      backgroundColor: `${pattern.color}30`,
                      color: pattern.color,
                    }}
                  >
                    #{pattern.id}
                  </span>
                </div>
                <h3 
                  className="font-bold text-lg"
                  style={{ color: pattern.color }}
                >
                  {pattern.title}
                </h3>
              </div>
            </div>

            {/* Points */}
            <div className="px-4 pb-4 space-y-2">
              {pattern.points.map((point, pointIndex) => (
                <motion.div
                  key={pointIndex}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 + pointIndex * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div 
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: pattern.color }}
                  />
                  <span className="text-gray-300 text-sm">{point}</span>
                </motion.div>
              ))}
              
              {/* Tip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="mt-3 pt-3 border-t border-gray-700/50"
              >
                <span className="text-xs text-gray-500 italic">💡 {pattern.tip}</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-blue-400 font-semibold text-lg mt-8 text-center"
      >
        These patterns apply to all technical work — agents just make them easier to follow.
      </motion.p>
    </div>
  );
}

