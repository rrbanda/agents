'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const patterns = [
  {
    id: 'cot',
    name: 'Chain-of-Thought',
    icon: '🔗',
    color: '#f59e0b',
    description: 'Step-by-step reasoning before answering',
    prompt: '"Think through this step by step..."',
    benefits: ['Improved accuracy', 'Transparent reasoning', 'Error detection'],
    example: 'Agent breaks down complex math problem into sequential steps',
  },
  {
    id: 'react',
    name: 'ReAct',
    icon: '🔄',
    color: '#8b5cf6',
    description: 'Interleave reasoning with actions',
    prompt: 'Thought → Action → Observation → Repeat',
    benefits: ['Grounded in reality', 'Adaptive behavior', 'Self-correcting'],
    example: 'Agent thinks, searches, evaluates results, then refines search',
  },
  {
    id: 'reflection',
    name: 'Self-Reflection',
    icon: '🪞',
    color: '#10b981',
    description: 'Review and improve own outputs',
    prompt: '"Review your answer and improve it..."',
    benefits: ['Quality assurance', 'Iterative refinement', 'Catch mistakes'],
    example: 'Agent generates code, reviews for bugs, then fixes issues',
  },
  {
    id: 'decomposition',
    name: 'Task Decomposition',
    icon: '📋',
    color: '#3b82f6',
    description: 'Break complex tasks into subtasks',
    prompt: 'Plan approach → Define subtasks → Execute',
    benefits: ['Manageable complexity', 'Parallel execution', 'Clear progress'],
    example: 'Research task split into: gather sources, analyze, synthesize',
  },
];

export default function PlanningReasoningSlide() {
  const [activePattern, setActivePattern] = useState<string>('cot');
  const active = patterns.find(p => p.id === activePattern);

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
          How Agents Think
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Planning & Reasoning
        </h2>
        <p className="text-gray-400">
          The cognitive patterns that enable intelligent behavior
        </p>
      </motion.div>

      {/* Pattern selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-3 mb-6"
      >
        {patterns.map((pattern, index) => (
          <motion.button
            key={pattern.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => setActivePattern(pattern.id)}
            className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
              activePattern === pattern.id
                ? 'scale-105 shadow-lg'
                : 'border-gray-700/50 hover:border-gray-600'
            }`}
            style={{
              backgroundColor: activePattern === pattern.id ? `${pattern.color}20` : 'transparent',
              borderColor: activePattern === pattern.id ? pattern.color : undefined,
              boxShadow: activePattern === pattern.id ? `0 4px 20px ${pattern.color}30` : undefined,
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

      {/* Pattern detail */}
      {active && (
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl"
        >
          <div
            className="rounded-2xl p-6 border"
            style={{
              backgroundColor: `${active.color}08`,
              borderColor: `${active.color}30`,
            }}
          >
            <div className="grid grid-cols-2 gap-6">
              {/* Left: Description & Prompt */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${active.color}20` }}
                  >
                    <span className="text-2xl">{active.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{active.name}</h3>
                    <p className="text-gray-400 text-sm">{active.description}</p>
                  </div>
                </div>

                {/* Prompt pattern */}
                <div className="mb-4">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Pattern</span>
                  <div
                    className="mt-2 px-4 py-3 rounded-lg font-mono text-sm border"
                    style={{
                      backgroundColor: `${active.color}10`,
                      borderColor: `${active.color}20`,
                      color: active.color,
                    }}
                  >
                    {active.prompt}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Benefits</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {active.benefits.map((benefit, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="px-3 py-1 rounded-full text-xs border"
                        style={{
                          backgroundColor: `${active.color}15`,
                          borderColor: `${active.color}30`,
                          color: active.color,
                        }}
                      >
                        {benefit}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Visual representation */}
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider mb-2">How It Works</span>
                <div className="flex-1 bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  {active.id === 'cot' && (
                    <div className="flex flex-col gap-2">
                      {['Step 1: Understand problem', 'Step 2: Identify approach', 'Step 3: Execute steps', 'Step 4: Verify result'].map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-center gap-2"
                        >
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ backgroundColor: active.color, color: 'white' }}
                          >
                            {i + 1}
                          </div>
                          <span className="text-gray-300 text-sm">{step.split(': ')[1]}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  {active.id === 'react' && (
                    <div className="flex flex-col items-center gap-2">
                      {['💭 Thought', '⚡ Action', '👁️ Observation'].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 * i }}
                          className="w-full"
                        >
                          <div
                            className="px-4 py-2 rounded-lg text-center text-sm font-medium"
                            style={{ backgroundColor: `${active.color}20`, color: active.color }}
                          >
                            {item}
                          </div>
                          {i < 2 && (
                            <motion.div
                              animate={{ y: [0, 3, 0] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                              className="text-center text-gray-500 py-1"
                            >
                              ↓
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-xs text-gray-500 mt-1"
                      >
                        ↻ Repeat until goal achieved
                      </motion.div>
                    </div>
                  )}
                  {active.id === 'reflection' && (
                    <div className="flex flex-col items-center gap-3">
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="w-full px-4 py-2 rounded-lg text-center border"
                        style={{ borderColor: `${active.color}40`, color: active.color }}
                      >
                        📝 Generate Output
                      </motion.div>
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-2xl"
                      >
                        🔍
                      </motion.div>
                      <div className="text-center text-gray-400 text-sm">
                        Critique & Identify Issues
                      </div>
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-xl"
                      >
                        ✨
                      </motion.div>
                      <div
                        className="w-full px-4 py-2 rounded-lg text-center font-medium"
                        style={{ backgroundColor: `${active.color}20`, color: active.color }}
                      >
                        Improved Output
                      </div>
                    </div>
                  )}
                  {active.id === 'decomposition' && (
                    <div className="flex flex-col items-center">
                      <div
                        className="px-4 py-2 rounded-lg text-sm font-medium mb-3"
                        style={{ backgroundColor: `${active.color}20`, color: active.color }}
                      >
                        🎯 Complex Task
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 mb-3">
                        <span>↙</span>
                        <span>↓</span>
                        <span>↘</span>
                      </div>
                      <div className="flex gap-2">
                        {['📦 Sub-1', '📦 Sub-2', '📦 Sub-3'].map((sub, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="px-3 py-1.5 rounded-lg text-xs border"
                            style={{ borderColor: `${active.color}40`, color: active.color }}
                          >
                            {sub}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Example */}
                <div className="mt-3 text-xs text-gray-500 italic">
                  <span className="text-gray-600">Example:</span> {active.example}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

