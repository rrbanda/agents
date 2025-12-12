'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const techniques = [
  {
    id: 'progressive',
    name: 'Progressive Disclosure',
    icon: '📊',
    description: 'Load information only as needed',
    color: '#3b82f6',
    levels: [
      { name: 'Metadata', tokens: '~100', when: 'Always loaded', width: 30 },
      { name: 'Content', tokens: '~1K', when: 'When relevant', width: 60 },
      { name: 'Deep Dive', tokens: '~10K+', when: 'When needed', width: 90 },
    ],
  },
  {
    id: 'compaction',
    name: 'Compaction',
    icon: '🗜️',
    description: 'Summarize and compress when approaching limits',
    color: '#8b5cf6',
    flow: ['Full History', '→', 'Summarize', '→', 'Fresh Context + Summary'],
    benefit: 'Enables indefinite conversations',
    risk: 'May lose subtle but critical context',
  },
  {
    id: 'notetaking',
    name: 'Structured Note-Taking',
    icon: '📝',
    description: 'Agent writes notes to external files for later retrieval',
    color: '#10b981',
    pattern: 'Agent maintains NOTES.md with progress, decisions, and next steps',
    benefit: 'Persistent memory across sessions',
    useCase: 'Long-running development tasks',
  },
  {
    id: 'subagent',
    name: 'Sub-Agent Architectures',
    icon: '👥',
    description: 'Specialized sub-agents with isolated contexts',
    color: '#f59e0b',
    pattern: 'Main agent → Subagents (explore) → Condensed summaries back',
    benefit: 'Parallel exploration without context pollution',
    useCase: 'Complex research and analysis',
  },
];

export default function ContextEngineeringAdvancedSlide() {
  const [activeTechnique, setActiveTechnique] = useState<string>('progressive');
  
  const current = techniques.find(t => t.id === activeTechnique) || techniques[0];

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
          Managing Context
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Context Engineering
        </h2>
        <p className="text-gray-400">
          Curating the right information at the right time
        </p>
      </motion.div>

      {/* Core concept banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 max-w-3xl"
      >
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <span className="text-blue-400 text-sm font-medium">Prompt Engineering</span>
              <p className="text-gray-500 text-xs mt-1">Writing effective prompts</p>
            </div>
            <div>
              <span className="text-purple-400 text-sm font-medium">Context Engineering</span>
              <p className="text-gray-500 text-xs mt-1">Curating optimal tokens at each step</p>
            </div>
          </div>
          <div className="text-center mt-3 pt-3 border-t border-gray-700/50">
            <span className="text-gray-400 text-xs">
              <span className="text-white font-medium">The attention budget:</span> LLMs lose focus as context grows. Treat context as finite.
            </span>
          </div>
        </div>
      </motion.div>

      {/* Technique selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-2 mb-6 flex-wrap justify-center"
      >
        {techniques.map((technique, index) => (
          <motion.button
            key={technique.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            onClick={() => setActiveTechnique(technique.id)}
            whileHover={{ scale: 1.02 }}
            className={`px-4 py-2 rounded-xl border transition-all duration-200 ${
              activeTechnique === technique.id
                ? ''
                : 'border-gray-700/50 hover:border-gray-600'
            }`}
            style={{
              backgroundColor: activeTechnique === technique.id ? `${technique.color}15` : 'transparent',
              borderColor: activeTechnique === technique.id ? technique.color : undefined,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{technique.icon}</span>
              <span
                className="text-sm font-medium"
                style={{ color: activeTechnique === technique.id ? technique.color : '#9ca3af' }}
              >
                {technique.name}
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Detail panel */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div
          className="rounded-2xl p-6 border"
          style={{
            backgroundColor: `${current.color}08`,
            borderColor: `${current.color}25`,
          }}
        >
          {/* Title */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${current.color}20` }}
            >
              <span className="text-2xl">{current.icon}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{current.name}</h3>
              <p className="text-gray-400 text-sm">{current.description}</p>
            </div>
          </div>

          {/* Content based on technique type */}
          {current.id === 'progressive' && 'levels' in current && current.levels && (
            <div className="space-y-3">
              {current.levels.map((level, index) => (
                <motion.div
                  key={level.name}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4"
                  style={{ width: `${level.width}%` }}
                >
                  <div
                    className="flex-1 px-4 py-3 rounded-lg flex items-center justify-between"
                    style={{
                      backgroundColor: `${current.color}${20 + index * 10}`,
                      border: `1px solid ${current.color}40`,
                    }}
                  >
                    <div>
                      <span className="text-white font-medium text-sm">{level.name}</span>
                      <span className="text-gray-400 text-xs ml-2">({level.tokens})</span>
                    </div>
                    <span className="text-gray-400 text-xs">{level.when}</span>
                  </div>
                </motion.div>
              ))}
              <p className="text-gray-500 text-xs text-center mt-2">
                ↓ Load more only when needed ↓
              </p>
            </div>
          )}

          {current.id === 'compaction' && 'flow' in current && current.flow && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 flex-wrap font-mono text-sm">
                {current.flow.map((part, i) => {
                  const isArrow = part === '→';
                  return isArrow ? (
                    <span key={i} className="text-gray-500">{part}</span>
                  ) : (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="px-3 py-2 rounded-lg"
                      style={{
                        backgroundColor: `${current.color}20`,
                        color: 'white',
                        border: `1px solid ${current.color}30`,
                      }}
                    >
                      {part}
                    </motion.span>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                  <span className="text-green-400 text-xs font-bold">✓ Benefit</span>
                  <p className="text-gray-300 text-sm mt-1">{current.benefit}</p>
                </div>
                <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                  <span className="text-yellow-400 text-xs font-bold">⚠ Risk</span>
                  <p className="text-gray-300 text-sm mt-1">{current.risk}</p>
                </div>
              </div>
            </div>
          )}

          {(current.id === 'notetaking' || current.id === 'subagent') && 'pattern' in current && (
            <div className="space-y-4">
              <div
                className="px-4 py-3 rounded-lg font-mono text-sm"
                style={{ backgroundColor: `${current.color}15` }}
              >
                <span className="text-gray-400">Pattern: </span>
                <span className="text-white">{current.pattern}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/40 rounded-lg p-3">
                  <span className="text-gray-400 text-xs font-bold">Benefit</span>
                  <p className="text-gray-300 text-sm mt-1">{current.benefit}</p>
                </div>
                <div className="bg-gray-800/40 rounded-lg p-3">
                  <span className="text-gray-400 text-xs font-bold">Best For</span>
                  <p className="text-gray-300 text-sm mt-1">{current.useCase}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Key insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-gray-400 text-sm text-center max-w-xl"
      >
        Find the smallest set of high-signal tokens that maximize the likelihood of success.
      </motion.p>
    </div>
  );
}

