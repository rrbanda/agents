'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';

const capabilities = [
  {
    id: 'memory',
    title: 'Memory',
    icon: '🧠',
    color: '#3b82f6',
    simple: 'Remembers what happened',
    example: 'Recalls your preferences, past conversations, what worked before',
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: '🔧',
    color: '#10b981',
    simple: 'Can take actions',
    example: 'Read files, search the web, run code, send emails',
  },
  {
    id: 'goals',
    title: 'Goals',
    icon: '🎯',
    color: '#f59e0b',
    simple: 'Works toward outcomes',
    example: 'Not just "answer this" but "solve this problem"',
  },
];

export default function ConvergenceSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Era Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <span className="text-xs font-mono text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
          STAGE 4 • Since 2023
        </span>
      </motion.div>

      {/* Title */}
      <LineReveal delay={0.1}>
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">⚡</div>
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
            Enter the Agents
          </h2>
          <p className="text-gray-400 italic">
            Three capabilities combine into something new
          </p>
        </div>
      </LineReveal>

      {/* Three Capabilities */}
      <div className="w-full max-w-5xl grid md:grid-cols-3 gap-5 mb-6">
        {capabilities.map((cap, index) => (
          <motion.div
            key={cap.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            className="bg-gray-800/50 rounded-xl p-5 border-2 transition-all hover:scale-105"
            style={{ borderColor: cap.color }}
          >
            <div className="text-4xl mb-3 text-center">{cap.icon}</div>
            <h3 
              className="text-xl font-bold mb-2 text-center"
              style={{ color: cap.color }}
            >
              {cap.title}
            </h3>
            <p className="text-white text-center text-sm mb-3">
              {cap.simple}
            </p>
            <div 
              className="text-xs text-gray-400 p-2 rounded-lg text-center"
              style={{ backgroundColor: `${cap.color}10` }}
            >
              {cap.example}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Convergence Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-6"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-lg">🧠</div>
          <span className="text-gray-500 text-xl">+</span>
          <div className="w-10 h-10 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center text-lg">🔧</div>
          <span className="text-gray-500 text-xl">+</span>
          <div className="w-10 h-10 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center text-lg">🎯</div>
          <span className="text-gray-500 text-xl">=</span>
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
            style={{ 
              background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 50%, #f59e0b 100%)',
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
            }}
          >
            🤖
          </div>
        </div>
      </motion.div>

      {/* What This Means */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="w-full max-w-3xl bg-gray-800/50 rounded-xl p-5 border border-gray-700/50"
      >
        <h3 className="text-white font-bold text-center mb-4">What This Means</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-400 text-sm">Before (Assistants)</p>
            <p className="text-red-400 font-semibold">You ask → It answers</p>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-2xl">→</span>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Now (Agents)</p>
            <p className="text-green-400 font-semibold">You set goal → It works</p>
          </div>
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 text-center"
      >
        <p className="text-xl text-yellow-400 font-bold">
          The Age of Agents has begun.
        </p>
      </motion.div>
    </div>
  );
}
