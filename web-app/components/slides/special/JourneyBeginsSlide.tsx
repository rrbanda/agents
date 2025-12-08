'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import LineReveal from '../../animations/LineReveal';

const steps = [
  {
    id: 1,
    title: 'Start Simple',
    icon: '🌱',
    color: '#10b981',
    points: [
      'Begin with single, well-defined tasks',
      'Learn the patterns gradually',
      'Build confidence with small wins',
    ],
  },
  {
    id: 2,
    title: 'Learn by Doing',
    icon: '🎯',
    color: '#3b82f6',
    points: [
      'Try it on real problems you face',
      'See what works in your context',
      'Iterate and improve your approach',
    ],
  },
  {
    id: 3,
    title: 'Measure & Iterate',
    icon: '📈',
    color: '#f59e0b',
    points: [
      'Track what helps your workflow',
      "Identify what doesn't work",
      'Refine based on results',
    ],
  },
  {
    id: 4,
    title: 'Use Resources',
    icon: '📚',
    color: '#8b5cf6',
    points: [
      'Read documentation and guides',
      'Learn from community examples',
      'Follow established best practices',
    ],
  },
];

export default function JourneyBeginsSlide() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <LineReveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Your Journey Begins
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Practical steps to get started with agents
        </p>
      </LineReveal>

      {/* Four Steps - 2x2 Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            onHoverStart={() => setHoveredStep(step.id)}
            onHoverEnd={() => setHoveredStep(null)}
            className="rounded-xl overflow-hidden transition-all duration-300"
            style={{
              background: hoveredStep === step.id 
                ? `linear-gradient(135deg, ${step.color}15 0%, rgba(31, 41, 55, 0.9) 100%)`
                : 'rgba(31, 41, 55, 0.5)',
              border: `2px solid ${hoveredStep === step.id ? step.color : 'rgba(75, 85, 99, 0.4)'}`,
              boxShadow: hoveredStep === step.id 
                ? `0 10px 40px ${step.color}20` 
                : '0 4px 20px rgba(0, 0, 0, 0.2)',
              transform: hoveredStep === step.id ? 'translateY(-4px)' : 'translateY(0)',
            }}
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ 
                    backgroundColor: `${step.color}20`,
                    border: `1px solid ${step.color}40`,
                  }}
                >
                  {step.icon}
                </div>
                <div>
                  <span 
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ 
                      backgroundColor: `${step.color}30`,
                      color: step.color,
                    }}
                  >
                    Step {step.id}
                  </span>
                  <h3 
                    className="font-bold text-lg mt-1"
                    style={{ color: step.color }}
                  >
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Points */}
              <div className="space-y-2">
                {step.points.map((point, pointIndex) => (
                  <motion.div
                    key={pointIndex}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 + pointIndex * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <div 
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: step.color }}
                    />
                    <span className="text-gray-300 text-sm">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Path */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-3 mb-6"
      >
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
              style={{ 
                backgroundColor: `${step.color}20`,
                color: step.color,
                border: `2px solid ${step.color}40`,
              }}
            >
              {step.id}
            </div>
            {index < steps.length - 1 && (
              <div className="w-8 h-0.5 bg-gray-600" />
            )}
          </div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <p className="text-blue-400 font-semibold text-lg">
          The best way to learn is to start. Pick a task and try it today.
        </p>
      </motion.div>
    </div>
  );
}

