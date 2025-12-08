'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import SectionHeader from '../SectionHeader';

const stages = [
  {
    id: 'llms',
    period: '2017-2020',
    title: 'Language Models',
    subtitle: 'Machines that talk',
    color: '#9ca3af',
    characteristics: ['Statistical prediction', 'Single-turn responses'],
    icon: '💬',
    description: 'Given "Dogs are …," they predict the next token. Through trillions of examples, they gain fluency but not understanding.',
  },
  {
    id: 'assistants',
    period: '2020-2022',
    title: 'Assistants',
    subtitle: 'Machines that remember',
    color: '#3b82f6',
    characteristics: ['Reactive helpers', 'Multi-turn conversations', 'Context management'],
    icon: '🤖',
    description: 'They draft emails, refactor code, summarize documents. They maintain context but remain reactive.',
  },
  {
    id: 'reasoning',
    period: '2022-2023',
    title: 'Reasoning',
    subtitle: 'Machines that think',
    color: '#10b981',
    characteristics: ['Chain-of-thought', 'Self-reflection', 'Step-by-step logic'],
    icon: '🧠',
    description: 'Prompting models to "think step by step" unlocks reasoning. Self-reflection enables planning and verification.',
  },
  {
    id: 'agents',
    period: '2023-Present',
    title: 'Agents',
    subtitle: 'Machines that act',
    color: '#f59e0b',
    characteristics: ['Memory + Tools + Goals', 'Autonomous action', 'Goal pursuit'],
    icon: '⚡',
    description: 'Three capabilities converge: Memory, Tools, and Goals. They don\'t wait for instructions—they pursue outcomes.',
  },
];

export default function EvolutionSlide() {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="w-full max-w-7xl mb-4 flex-shrink-0">
        <SectionHeader section="How We Got Here" subtitle="The evolution of AI" />
      </div>

      {/* Timeline - All stages together */}
      <div className="w-full max-w-7xl flex-1 flex flex-col justify-center min-h-0">
        {/* Timeline Line */}
        <div className="relative h-1 bg-gray-800 mb-8">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-600 via-blue-500 via-green-500 to-yellow-500"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </div>

        {/* Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.15 }}
              className="relative"
            >
              {/* Stage Card */}
              <motion.div
              className={`bg-gray-800/50 rounded-lg p-4 border-2 cursor-pointer transition-all ${
                hoveredStage === stage.id || selectedStage === stage.id
                  ? 'border-opacity-100 scale-105'
                  : 'border-opacity-30'
              }`}
                style={{
                  borderColor: stage.color,
                  backgroundColor: hoveredStage === stage.id ? `${stage.color}20` : undefined,
                }}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredStage(stage.id)}
                onHoverEnd={() => setHoveredStage(null)}
                onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
              >
              {/* Period */}
              <div className="text-xs text-gray-400 mb-1.5 font-mono">
                {stage.period}
              </div>

              {/* Icon */}
              <div className="text-3xl mb-2">{stage.icon}</div>

              {/* Title */}
              <h3
                className="text-xl font-bold mb-1.5"
                style={{ color: stage.color }}
              >
                {stage.title}
              </h3>

              {/* Subtitle */}
              <p className="text-xs text-gray-400 italic mb-3">
                {stage.subtitle}
              </p>

              {/* Characteristics */}
              <ul className="space-y-1 mb-3">
                {stage.characteristics.map((char, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.15 + i * 0.1 }}
                    className="text-xs text-gray-300"
                  >
                    • {char}
                  </motion.li>
                ))}
              </ul>

                {/* Expandable Description */}
                {selectedStage === stage.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-700"
                  >
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {stage.description}
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Connection Arrow (except last) */}
              {index < stages.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.15 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 18L15 12L9 6"
                      stroke={stage.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Journey Statement */}
        <motion.div
          className="text-center mt-4 pt-4 border-t border-gray-700 flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-lg md:text-xl text-gray-300">
            <span className="font-semibold text-white">The Journey:</span> From answering questions to achieving goals.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

