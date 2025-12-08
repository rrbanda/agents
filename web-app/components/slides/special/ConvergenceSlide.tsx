'use client';

import { motion } from 'framer-motion';
import SectionHeader from '../SectionHeader';

const capabilities = [
  {
    id: 'memory',
    title: 'Memory',
    description: 'Remembers past interactions',
    icon: '🧠',
    color: '#3b82f6',
    examples: ['Context across sessions', 'Long-term knowledge', 'Learning from experience'],
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'Can take actions in the world',
    icon: '🔧',
    color: '#10b981',
    examples: ['API calls', 'Code execution', 'System interactions'],
  },
  {
    id: 'goals',
    title: 'Goals',
    description: 'Pursues outcomes, not just answers',
    icon: '🎯',
    color: '#f59e0b',
    examples: ['Autonomous pursuit', 'Multi-step planning', 'Outcome-focused'],
  },
];

export default function ConvergenceSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-6xl mb-6">
        <SectionHeader section="How We Got Here" subtitle="The evolution of AI" />
      </div>

      <div className="w-full max-w-6xl">
        {/* Three Capabilities */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.2, type: 'spring', stiffness: 200 }}
              className="bg-gray-800/50 rounded-lg p-4 border-2"
              style={{ borderColor: cap.color }}
            >
              <div className="text-3xl mb-2 text-center">{cap.icon}</div>
              <h3
                className="text-lg font-bold mb-1.5 text-center"
                style={{ color: cap.color }}
              >
                {cap.title}
              </h3>
              <p className="text-gray-300 text-center mb-2 text-xs">
                {cap.description}
              </p>
              <ul className="space-y-1">
                {cap.examples.map((example, i) => (
                  <li key={i} className="text-xs text-gray-400 text-center">
                    • {example}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Convergence Visual */}
        <motion.div
          className="relative mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {/* Arrows converging */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, x: index === 0 ? -50 : index === 2 ? 50 : 0, y: -50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg mb-1.5"
                  style={{ backgroundColor: `${cap.color}30`, border: `2px solid ${cap.color}` }}
                >
                  {cap.icon}
                </div>
                {index < 2 && (
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                  >
                    <svg width="60" height="20" className="mt-2">
                      <path
                        d="M 0 10 L 60 10"
                        stroke={cap.color}
                        strokeWidth="2"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                      />
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="10"
                          refX="9"
                          refY="3"
                          orient="auto"
                        >
                          <polygon points="0 0, 10 3, 0 6" fill={cap.color} />
                        </marker>
                      </defs>
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Center: Agent */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8, type: 'spring', stiffness: 200 }}
            className="text-center"
          >
            <div className="inline-block bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 p-1 rounded-full">
              <div className="bg-gray-900 rounded-full p-4">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-lg font-bold text-white">AGENT</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* What This Means */}
        <motion.div
          className="text-center space-y-2 flex-shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <h3 className="text-lg md:text-xl font-bold text-white mb-3">
            What This Means
          </h3>
          <div className="space-y-1.5">
            <p className="text-base md:text-lg text-gray-200">
              They don't wait for instructions.
            </p>
            <p className="text-base md:text-lg text-gray-200">
              They pursue outcomes.
            </p>
            <p className="text-base md:text-lg text-gray-200">
              They act autonomously.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-700">
            <p className="text-lg md:text-xl font-bold text-yellow-400">
              The Age of Agents has begun.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

