'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const memoryTypes = [
  {
    id: 'short',
    name: 'Short-Term',
    icon: '⚡',
    color: '#f59e0b',
    aka: 'Working Memory',
    description: 'Current conversation context',
    storage: 'Context Window',
    duration: 'Single session',
    examples: ['Recent messages', 'Current task state', 'Active file contents'],
  },
  {
    id: 'long',
    name: 'Long-Term',
    icon: '💾',
    color: '#8b5cf6',
    aka: 'Persistent Memory',
    description: 'Information that survives sessions',
    storage: 'External storage',
    duration: 'Across sessions',
    examples: ['User preferences', 'Project history', 'Learned patterns'],
  },
  {
    id: 'episodic',
    name: 'Episodic',
    icon: '📖',
    color: '#10b981',
    aka: 'Experience Memory',
    description: 'Records of past interactions',
    storage: 'Vector DB / Files',
    duration: 'Persistent',
    examples: ['Past conversations', 'Completed tasks', 'Error resolutions'],
  },
];

const techniques = [
  {
    name: 'Compaction',
    icon: '🗜️',
    description: 'Summarize history to preserve key details',
  },
  {
    name: 'Note-Taking',
    icon: '📝',
    description: 'Agent writes notes to external files',
  },
  {
    name: 'Embeddings',
    icon: '🔢',
    description: 'Vector representations for retrieval',
  },
  {
    name: 'Checkpointing',
    icon: '💿',
    description: 'Save state at key milestones',
  },
];

export default function MemoryArchitectureSlide() {
  const [activeType, setActiveType] = useState<string>('short');
  const active = memoryTypes.find(m => m.id === activeType);

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
          Persistence
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Memory Architecture
        </h2>
        <p className="text-gray-400">
          How agents remember and learn across interactions
        </p>
      </motion.div>

      {/* Main content */}
      <div className="w-full max-w-5xl grid grid-cols-3 gap-4 mb-6">
        {/* Memory type cards */}
        {memoryTypes.map((type, index) => (
          <motion.button
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            onClick={() => setActiveType(type.id)}
            className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 ${
              activeType === type.id
                ? 'scale-[1.02] shadow-lg'
                : 'border-gray-700/50 hover:border-gray-600'
            }`}
            style={{
              backgroundColor: activeType === type.id ? `${type.color}10` : 'rgba(255,255,255,0.02)',
              borderColor: activeType === type.id ? type.color : undefined,
              boxShadow: activeType === type.id ? `0 8px 30px ${type.color}20` : undefined,
            }}
          >
            {/* Icon and title */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${type.color}20` }}
              >
                <span className="text-xl">{type.icon}</span>
              </div>
              <div>
                <h3
                  className="font-bold"
                  style={{ color: activeType === type.id ? type.color : 'white' }}
                >
                  {type.name}
                </h3>
                <span className="text-xs text-gray-500">{type.aka}</span>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-3">{type.description}</p>

            {/* Details */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Storage:</span>
                <span style={{ color: type.color }}>{type.storage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Duration:</span>
                <span className="text-gray-300">{type.duration}</span>
              </div>
            </div>

            {/* Selection indicator */}
            {activeType === type.id && (
              <motion.div
                layoutId="memory-indicator"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                style={{ backgroundColor: type.color }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Detail section */}
      <div className="w-full max-w-5xl grid grid-cols-2 gap-4">
        {/* Examples */}
        {active && (
          <motion.div
            key={active.id + '-examples'}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-xl p-4 border"
            style={{
              backgroundColor: `${active.color}08`,
              borderColor: `${active.color}30`,
            }}
          >
            <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
              {active.name} Memory Examples
            </h4>
            <div className="space-y-2">
              {active.examples.map((example, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-2"
                >
                  <span style={{ color: active.color }}>→</span>
                  <span className="text-gray-300 text-sm">{example}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Techniques */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl p-4 border border-gray-700/50 bg-gray-800/30"
        >
          <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
            Memory Management Techniques
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {techniques.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="p-3 rounded-lg bg-gray-900/50 border border-gray-700/30"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{tech.icon}</span>
                  <span className="text-white font-medium text-sm">{tech.name}</span>
                </div>
                <p className="text-gray-500 text-xs">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Visual diagram */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 flex items-center gap-4 text-sm"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <span>⚡</span>
          <span className="text-amber-400">Fast</span>
        </div>
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-500"
        >
          →
        </motion.span>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30">
          <span>💾</span>
          <span className="text-purple-400">Persist</span>
        </div>
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          className="text-gray-500"
        >
          →
        </motion.span>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <span>📖</span>
          <span className="text-emerald-400">Learn</span>
        </div>
      </motion.div>
    </div>
  );
}

