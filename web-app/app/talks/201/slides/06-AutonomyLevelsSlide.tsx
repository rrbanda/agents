'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const autonomyLevels = [
  {
    id: 'reactive',
    title: 'Reactive',
    subtitle: 'Stimulus → Response',
    description: 'Responds directly to inputs without maintaining internal state or planning ahead.',
    icon: '⚡',
    color: '#3b82f6',
    characteristics: [
      'No internal state',
      'Immediate responses',
      'Simple, fast execution',
      'Predictable behavior',
    ],
    useCases: [
      'Basic chatbots',
      'Simple Q&A systems',
      'Rule-based triggers',
      'Quick lookups',
    ],
    diagram: 'input → output',
    pros: ['Fast', 'Predictable', 'Easy to debug'],
    cons: ['No memory', 'No planning', 'Limited capability'],
  },
  {
    id: 'deliberative',
    title: 'Deliberative',
    subtitle: 'Plan → Execute',
    description: 'Maintains internal models, plans actions, and reasons about goals before acting.',
    icon: '🧠',
    color: '#8b5cf6',
    characteristics: [
      'Internal world model',
      'Goal-oriented planning',
      'Multi-step reasoning',
      'Self-reflection capability',
    ],
    useCases: [
      'Complex research tasks',
      'Strategic decision making',
      'Multi-step problem solving',
      'Code generation',
    ],
    diagram: 'goal → plan → execute → evaluate',
    pros: ['Complex reasoning', 'Adaptive', 'Goal-directed'],
    cons: ['Slower', 'More expensive', 'Harder to debug'],
  },
  {
    id: 'hybrid',
    title: 'Hybrid',
    subtitle: 'Best of Both Worlds',
    description: 'Combines reactive responses with deliberative planning for flexible, robust behavior.',
    icon: '🔄',
    color: '#10b981',
    characteristics: [
      'Fast reactive layer',
      'Slow deliberative layer',
      'Context-aware switching',
      'Fallback mechanisms',
    ],
    useCases: [
      'Production AI assistants',
      'Coding agents',
      'Customer support',
      'Research systems',
    ],
    diagram: 'simple? → react : plan → execute',
    pros: ['Flexible', 'Robust', 'Efficient'],
    cons: ['Complex to build', 'Requires tuning'],
  },
];

export default function AutonomyLevelsSlide() {
  const [selectedLevel, setSelectedLevel] = useState<string>('reactive');

  const currentLevel = autonomyLevels.find(l => l.id === selectedLevel) || autonomyLevels[0];

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30">
          Agent Classification
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Autonomy Levels
        </h2>
        <p className="text-gray-400">
          How much independence does your agent need?
        </p>
      </motion.div>

      {/* Spectrum visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-4xl mb-8"
      >
        <div className="relative">
          {/* Background bar */}
          <div className="h-2 rounded-full bg-gray-800 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.4 }}
            />
          </div>

          {/* Level buttons */}
          <div className="flex justify-between mt-4">
            {autonomyLevels.map((level, index) => (
              <motion.button
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => setSelectedLevel(level.id)}
                className="relative group"
              >
                {/* Indicator dot */}
                <motion.div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2"
                  style={{
                    backgroundColor: selectedLevel === level.id ? level.color : 'transparent',
                    borderColor: level.color,
                  }}
                  animate={selectedLevel === level.id ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                />

                {/* Button */}
                <div
                  className={`px-6 py-3 rounded-xl border transition-all duration-300 ${
                    selectedLevel === level.id
                      ? 'border-opacity-50 shadow-lg'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  style={{
                    backgroundColor: selectedLevel === level.id ? `${level.color}15` : 'transparent',
                    borderColor: selectedLevel === level.id ? level.color : undefined,
                    boxShadow: selectedLevel === level.id ? `0 8px 30px ${level.color}20` : undefined,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{level.icon}</span>
                    <div className="text-left">
                      <h3
                        className="font-bold text-sm transition-colors"
                        style={{ color: selectedLevel === level.id ? level.color : 'white' }}
                      >
                        {level.title}
                      </h3>
                      <p className="text-gray-500 text-xs">{level.subtitle}</p>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Labels */}
          <div className="flex justify-between mt-2 px-8">
            <span className="text-xs text-gray-600">Less Autonomy</span>
            <span className="text-xs text-gray-600">More Autonomy</span>
          </div>
        </div>
      </motion.div>

      {/* Detail panel */}
      <motion.div
        key={selectedLevel}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div
          className="rounded-2xl p-6 border"
          style={{
            backgroundColor: `${currentLevel.color}08`,
            borderColor: `${currentLevel.color}25`,
          }}
        >
          {/* Top section */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {currentLevel.title} Agents
              </h3>
              <p className="text-gray-400">{currentLevel.description}</p>
            </div>
            <div
              className="px-3 py-1 rounded-lg text-sm font-mono"
              style={{ 
                backgroundColor: `${currentLevel.color}15`,
                color: currentLevel.color,
              }}
            >
              {currentLevel.diagram}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Characteristics */}
            <div className="bg-gray-800/30 rounded-xl p-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Characteristics
              </h4>
              <ul className="space-y-2">
                {currentLevel.characteristics.map((item) => (
                  <li key={item} className="text-sm text-gray-300 flex items-center gap-2">
                    <span style={{ color: currentLevel.color }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Use Cases */}
            <div className="bg-gray-800/30 rounded-xl p-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Use Cases
              </h4>
              <ul className="space-y-2">
                {currentLevel.useCases.map((item) => (
                  <li key={item} className="text-sm text-gray-300 flex items-center gap-2">
                    <span style={{ color: currentLevel.color }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pros */}
            <div className="bg-gray-800/30 rounded-xl p-4">
              <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-3">
                ✓ Pros
              </h4>
              <ul className="space-y-2">
                {currentLevel.pros.map((item) => (
                  <li key={item} className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="text-green-400">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="bg-gray-800/30 rounded-xl p-4">
              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3">
                ✗ Cons
              </h4>
              <ul className="space-y-2">
                {currentLevel.cons.map((item) => (
                  <li key={item} className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="text-red-400">−</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-gray-400 text-sm text-center"
      >
        Most production agents are <span className="text-green-400 font-medium">hybrid</span> —
        reactive for simple queries, deliberative when needed.
      </motion.p>
    </div>
  );
}

