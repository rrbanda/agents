'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const patterns = [
  {
    id: 'checkpoint',
    name: 'Checkpointing',
    icon: '💾',
    color: '#10b981',
    description: 'Save state at key milestones to enable recovery',
    how: 'Persist progress to files, git commits, or databases at regular intervals',
    benefit: 'Resume from last checkpoint instead of starting over',
  },
  {
    id: 'retry',
    name: 'Smart Retry',
    icon: '🔄',
    color: '#3b82f6',
    description: 'Retry failed operations with different approaches',
    how: 'Exponential backoff, alternative tools, or rephrased queries',
    benefit: 'Overcome transient failures without human intervention',
  },
  {
    id: 'graceful',
    name: 'Graceful Degradation',
    icon: '📉',
    color: '#f59e0b',
    description: 'Continue with reduced functionality when components fail',
    how: 'Fallback to simpler methods or skip non-critical steps',
    benefit: 'Partial success is better than complete failure',
  },
  {
    id: 'self-correct',
    name: 'Self-Correction',
    icon: '🔧',
    color: '#8b5cf6',
    description: 'Agent detects and fixes its own errors',
    how: 'Verify outputs, detect failures, and iterate until success',
    benefit: 'Autonomous error resolution without escalation',
  },
];

const failureModes = [
  { name: 'Tool Timeout', solution: 'Retry with backoff' },
  { name: 'Invalid Output', solution: 'Self-verify & correct' },
  { name: 'Context Overflow', solution: 'Compact & checkpoint' },
  { name: 'API Rate Limit', solution: 'Queue & throttle' },
];

export default function ErrorHandlingSlide() {
  const [activePattern, setActivePattern] = useState('checkpoint');
  const active = patterns.find(p => p.id === activePattern);

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-5"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
          Production Resilience
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Error Handling & Recovery
        </h2>
        <p className="text-gray-400">
          Building agents that fail gracefully and recover autonomously
        </p>
      </motion.div>

      {/* Pattern selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-3 mb-5"
      >
        {patterns.map((pattern, index) => (
          <motion.button
            key={pattern.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => setActivePattern(pattern.id)}
            className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 min-w-[120px] ${
              activePattern === pattern.id
                ? 'scale-105 shadow-lg'
                : 'border-gray-700/50 hover:border-gray-600'
            }`}
            style={{
              backgroundColor: activePattern === pattern.id ? `${pattern.color}15` : 'transparent',
              borderColor: activePattern === pattern.id ? pattern.color : undefined,
              boxShadow: activePattern === pattern.id ? `0 4px 20px ${pattern.color}25` : undefined,
            }}
          >
            <span className="text-2xl block mb-1">{pattern.icon}</span>
            <span
              className="text-sm font-medium"
              style={{ color: activePattern === pattern.id ? pattern.color : '#9ca3af' }}
            >
              {pattern.name}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Active pattern detail */}
      {active && (
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl mb-5"
        >
          <div
            className="rounded-2xl p-5 border"
            style={{
              backgroundColor: `${active.color}08`,
              borderColor: `${active.color}30`,
            }}
          >
            <div className="grid grid-cols-3 gap-6">
              {/* What */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{active.icon}</span>
                  <h3 className="font-bold text-lg text-white">{active.name}</h3>
                </div>
                <p className="text-gray-300 text-sm">{active.description}</p>
              </div>

              {/* How */}
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">How It Works</span>
                <p className="mt-2 text-sm text-gray-300">{active.how}</p>
              </div>

              {/* Benefit */}
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Benefit</span>
                <div
                  className="mt-2 px-3 py-2 rounded-lg text-sm font-medium"
                  style={{ backgroundColor: `${active.color}15`, color: active.color }}
                >
                  ✓ {active.benefit}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recovery Flow Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-4xl grid grid-cols-2 gap-4"
      >
        {/* Flow diagram */}
        <div className="rounded-xl p-4 border border-gray-700/50 bg-gray-800/30">
          <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
            Recovery Loop
          </h4>
          <div className="flex items-center justify-center gap-2">
            {['Execute', 'Verify', 'Handle Error', 'Retry/Resume'].map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <div
                  className="px-3 py-2 rounded-lg text-xs font-medium text-center"
                  style={{
                    backgroundColor: i === 2 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.15)',
                    color: i === 2 ? '#ef4444' : '#10b981',
                    border: `1px solid ${i === 2 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
                  }}
                >
                  {step}
                </div>
                {i < 3 && (
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="text-gray-500"
                  >
                    →
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
          <div className="mt-3 text-center">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs text-gray-500"
            >
              ↻ Until success or max retries
            </motion.span>
          </div>
        </div>

        {/* Common failures */}
        <div className="rounded-xl p-4 border border-gray-700/50 bg-gray-800/30">
          <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
            Common Failures & Solutions
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {failureModes.map((failure, i) => (
              <motion.div
                key={failure.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-900/50 text-xs"
              >
                <span className="text-red-400">{failure.name}</span>
                <span className="text-emerald-400">→ {failure.solution}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Key principle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-center"
      >
        <p className="text-gray-500 text-sm italic">
          "Errors in agentic systems compound — one step failing can derail entire trajectories"
        </p>
      </motion.div>
    </div>
  );
}

