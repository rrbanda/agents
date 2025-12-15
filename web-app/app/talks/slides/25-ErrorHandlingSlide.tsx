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
    code: 'save_state(step_id, context)',
  },
  {
    id: 'retry',
    name: 'Smart Retry',
    icon: '🔄',
    color: '#3b82f6',
    description: 'Retry failed operations with different approaches',
    how: 'Exponential backoff, alternative tools, or rephrased queries',
    benefit: 'Overcome transient failures without human intervention',
    code: 'retry(fn, max=3, backoff=exp)',
  },
  {
    id: 'circuit',
    name: 'Circuit Breaker',
    icon: '⚡',
    color: '#ef4444',
    description: 'Stop calling failing services to prevent cascade',
    how: 'Track failures → Open circuit → Skip calls → Gradually retry',
    benefit: 'Prevents wasting resources on known-broken dependencies',
    code: 'if circuit.is_open: skip_tool()',
  },
  {
    id: 'saga',
    name: 'Saga Pattern',
    icon: '📜',
    color: '#8b5cf6',
    description: 'Coordinate multi-step transactions with compensations',
    how: 'Define undo action for each step → Rollback on failure',
    benefit: 'Clean recovery from partial multi-tool operations',
    code: 'steps=[{do, undo}]; on_fail: rollback()',
  },
  {
    id: 'graceful',
    name: 'Graceful Degradation',
    icon: '📉',
    color: '#f59e0b',
    description: 'Continue with reduced functionality when components fail',
    how: 'Fallback to simpler methods or skip non-critical steps',
    benefit: 'Partial success is better than complete failure',
    code: 'try: tool_a() except: fallback_b()',
  },
  {
    id: 'self-correct',
    name: 'Self-Correction',
    icon: '🔧',
    color: '#06b6d4',
    description: 'Agent detects and fixes its own errors',
    how: 'Verify outputs, detect failures, and iterate until success',
    benefit: 'Autonomous error resolution without escalation',
    code: 'while not verify(output): fix()',
  },
];

const failureModes = [
  { name: 'Tool Timeout', solution: 'Circuit breaker + retry', icon: '⏱️' },
  { name: 'Invalid Output', solution: 'Self-verify & correct', icon: '❌' },
  { name: 'Context Overflow', solution: 'Compact & checkpoint', icon: '📚' },
  { name: 'Cascade Failure', solution: 'Circuit breaker', icon: '🔗' },
  { name: 'Partial Complete', solution: 'Saga rollback', icon: '📜' },
  { name: 'Rate Limiting', solution: 'Backoff + queue', icon: '🚦' },
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

      {/* Pattern selector - 2 rows for 6 patterns */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2 mb-4 justify-center max-w-4xl"
      >
        {patterns.map((pattern, index) => (
          <motion.button
            key={pattern.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            onClick={() => setActivePattern(pattern.id)}
            className={`px-3 py-2 rounded-xl border-2 transition-all duration-300 ${
              activePattern === pattern.id
                ? 'scale-105'
                : 'border-gray-700/50 hover:border-gray-600'
            }`}
            style={{
              backgroundColor: activePattern === pattern.id ? `${pattern.color}15` : 'transparent',
              borderColor: activePattern === pattern.id ? pattern.color : undefined,
              boxShadow: activePattern === pattern.id ? `0 4px 20px ${pattern.color}20` : undefined,
            }}
          >
            <span className="text-xl block mb-0.5">{pattern.icon}</span>
            <span
              className="text-xs font-medium"
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
          className="w-full max-w-4xl mb-4"
        >
          <div
            className="rounded-2xl p-5 border"
            style={{
              backgroundColor: `${active.color}08`,
              borderColor: `${active.color}30`,
            }}
          >
            <div className="grid grid-cols-4 gap-4">
              {/* What */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{active.icon}</span>
                  <h3 className="font-bold text-white">{active.name}</h3>
                </div>
                <p className="text-gray-400 text-sm">{active.description}</p>
              </div>

              {/* How */}
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">How It Works</span>
                <p className="mt-1 text-sm text-gray-300">{active.how}</p>
              </div>

              {/* Benefit */}
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Benefit</span>
                <div
                  className="mt-1 px-3 py-1.5 rounded-lg text-sm font-medium"
                  style={{ backgroundColor: `${active.color}15`, color: active.color }}
                >
                  ✓ {active.benefit}
                </div>
              </div>

              {/* Code hint */}
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Pattern</span>
                <div className="mt-1 font-mono text-xs bg-gray-900/60 rounded-lg px-3 py-2 border border-gray-700/50">
                  <span style={{ color: active.color }}>{active.code}</span>
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

        {/* Common failures - 3 columns for 6 items */}
        <div className="rounded-xl p-4 border border-gray-700/50 bg-gray-800/30">
          <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
            Common Failures & Solutions
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {failureModes.map((failure, i) => (
              <motion.div
                key={failure.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900/50 text-xs"
              >
                <span className="text-lg">{failure.icon}</span>
                <div className="flex-1">
                  <span className="text-red-400 block">{failure.name}</span>
                  <span className="text-emerald-400 text-[10px]">{failure.solution}</span>
                </div>
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

