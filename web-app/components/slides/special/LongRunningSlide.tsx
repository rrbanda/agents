'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import LineReveal from '../../animations/LineReveal';

const challenges = [
  { icon: '⏱️', text: 'Tasks that take hours or days' },
  { icon: '📏', text: 'Context windows are limited' },
  { icon: '💾', text: 'Need to maintain state across sessions' },
];

const solutions = [
  {
    id: 'compaction',
    name: 'Compaction',
    icon: '📦',
    description: 'Summarize past work into concise notes',
    detail: 'Reduce context size while preserving key information',
    color: '#3b82f6',
  },
  {
    id: 'memory',
    name: 'Memory',
    icon: '🧠',
    description: 'Store important information externally',
    detail: 'Retrieve relevant context when needed',
    color: '#10b981',
  },
  {
    id: 'checkpoints',
    name: 'Checkpoints',
    icon: '💾',
    description: 'Resume from saved state',
    detail: 'Continue work exactly where you left off',
    color: '#8b5cf6',
  },
];

export default function LongRunningSlide() {
  const [hoveredSolution, setHoveredSolution] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <LineReveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Long-Running Agents
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Working over hours, days, or weeks
        </p>
      </LineReveal>

      {/* Main Content */}
      <div className="w-full max-w-5xl space-y-6">
        {/* Challenge Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-500/10 rounded-xl p-5 border border-red-500/30"
        >
          <h3 className="text-red-400 font-bold text-lg mb-4 flex items-center gap-2">
            <span className="text-xl">⚠️</span> The Challenge
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3"
              >
                <span className="text-xl">{challenge.icon}</span>
                <span className="text-gray-300 text-sm">{challenge.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Solutions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-green-500/10 rounded-xl p-5 border border-green-500/30"
        >
          <h3 className="text-green-400 font-bold text-lg mb-4 flex items-center gap-2">
            <span className="text-xl">✓</span> Solutions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                onHoverStart={() => setHoveredSolution(solution.id)}
                onHoverEnd={() => setHoveredSolution(null)}
                className="rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: hoveredSolution === solution.id 
                    ? `linear-gradient(135deg, ${solution.color}20 0%, rgba(31, 41, 55, 0.9) 100%)`
                    : 'rgba(31, 41, 55, 0.5)',
                  border: `2px solid ${hoveredSolution === solution.id ? solution.color : 'rgba(75, 85, 99, 0.4)'}`,
                  boxShadow: hoveredSolution === solution.id 
                    ? `0 8px 30px ${solution.color}25` 
                    : '0 4px 15px rgba(0, 0, 0, 0.2)',
                  transform: hoveredSolution === solution.id ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                      style={{ 
                        backgroundColor: `${solution.color}20`,
                        border: `1px solid ${solution.color}40`,
                      }}
                    >
                      {solution.icon}
                    </div>
                    <h4 
                      className="font-bold text-lg"
                      style={{ color: solution.color }}
                    >
                      {solution.name}
                    </h4>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{solution.description}</p>
                  <p className="text-gray-500 text-xs">{solution.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/50"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏁</span>
              <span className="text-gray-400 text-sm">Start</span>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 1.5, ease: 'easeInOut' }}
                  className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <span className="text-gray-400 text-sm">Complete</span>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Hours</span>
            <span>Days</span>
            <span>Weeks</span>
          </div>
        </motion.div>
      </div>

      {/* Key Insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-blue-400 font-semibold text-lg mt-6 text-center"
      >
        Result: Agents can work on long-term projects, just like human teammates.
      </motion.p>
    </div>
  );
}

