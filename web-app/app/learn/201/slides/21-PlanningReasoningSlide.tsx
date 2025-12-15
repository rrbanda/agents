'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const patterns = [
  {
    id: 'cot',
    name: 'Chain-of-Thought',
    icon: '🔗',
    color: '#f59e0b',
    tier: 'Foundation',
    description: 'Step-by-step reasoning before answering',
    prompt: '"Think through this step by step..."',
    benefits: ['Improved accuracy', 'Transparent reasoning', 'Error detection'],
    example: 'Agent breaks down complex math problem into sequential steps',
    visual: 'chain',
  },
  {
    id: 'react',
    name: 'ReAct',
    icon: '🔄',
    color: '#8b5cf6',
    tier: 'Foundation',
    description: 'Interleave reasoning with actions',
    prompt: 'Thought → Action → Observation → Repeat',
    benefits: ['Grounded in reality', 'Adaptive behavior', 'Self-correcting'],
    example: 'Agent thinks, searches, evaluates results, then refines search',
    visual: 'loop',
  },
  {
    id: 'tot',
    name: 'Tree of Thoughts',
    icon: '🌳',
    color: '#10b981',
    tier: 'Advanced',
    description: 'Explore multiple reasoning paths in parallel',
    prompt: 'Generate N approaches → Evaluate each → Expand best → Backtrack if stuck',
    benefits: ['Better exploration', 'Avoids local optima', 'Handles ambiguity'],
    example: 'Agent explores 3 different solution strategies, picks the most promising',
    visual: 'tree',
  },
  {
    id: 'got',
    name: 'Graph of Thoughts',
    icon: '🕸️',
    color: '#3b82f6',
    tier: 'Advanced',
    description: 'Non-linear reasoning with merging & refinement',
    prompt: 'Branch ideas → Merge complementary insights → Refine combined solution',
    benefits: ['Combines insights', 'Handles complex dependencies', 'Flexible structure'],
    example: 'Agent combines insights from multiple research threads into unified analysis',
    visual: 'graph',
  },
  {
    id: 'reflection',
    name: 'Self-Reflection',
    icon: '🪞',
    color: '#ec4899',
    tier: 'Meta',
    description: 'Review and improve own outputs',
    prompt: '"Review your answer for errors and improve it..."',
    benefits: ['Quality assurance', 'Iterative refinement', 'Catch mistakes'],
    example: 'Agent generates code, reviews for bugs, then fixes issues',
    visual: 'mirror',
  },
  {
    id: 'mcts',
    name: 'MCTS Planning',
    icon: '🎲',
    color: '#06b6d4',
    tier: 'Advanced',
    description: 'Monte Carlo Tree Search for strategic decisions',
    prompt: 'Simulate outcomes → Select best path → Expand → Update values',
    benefits: ['Strategic planning', 'Uncertainty handling', 'Long-horizon'],
    example: 'Agent simulates multiple task sequences to find optimal order',
    visual: 'mcts',
  },
];

export default function PlanningReasoningSlide() {
  const [activePattern, setActivePattern] = useState<string>('cot');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const active = patterns.find(p => p.id === activePattern);

  const foundationPatterns = patterns.filter(p => p.tier === 'Foundation');
  const advancedPatterns = patterns.filter(p => p.tier === 'Advanced' || p.tier === 'Meta');

  return (
    <div className="h-full flex flex-col items-center justify-start pt-6 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wide uppercase rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
          How Agents Think
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
          Planning & Reasoning
        </h2>
        <p className="text-gray-400 text-sm">
          From linear chains to complex reasoning graphs
        </p>
      </motion.div>

      {/* Tier toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 p-1 rounded-xl bg-gray-800/50 border border-gray-700/50 mb-4"
      >
        <button
          onClick={() => setShowAdvanced(false)}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            !showAdvanced
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          🔗 Foundation
        </button>
        <button
          onClick={() => setShowAdvanced(true)}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            showAdvanced
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          🌳 Advanced
        </button>
      </motion.div>

      {/* Pattern selector */}
      <AnimatePresence mode="wait">
        <motion.div
          key={showAdvanced ? 'advanced' : 'foundation'}
          initial={{ opacity: 0, x: showAdvanced ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: showAdvanced ? -20 : 20 }}
          className="flex gap-2 mb-4 flex-wrap justify-center"
        >
          {(showAdvanced ? advancedPatterns : foundationPatterns).map((pattern, index) => (
            <motion.button
              key={pattern.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => setActivePattern(pattern.id)}
              className={`px-3 py-2 rounded-xl border-2 transition-all duration-300 ${
                activePattern === pattern.id
                  ? 'scale-105'
                  : 'border-gray-700/50 hover:border-gray-600'
              }`}
              style={{
                backgroundColor: activePattern === pattern.id ? `${pattern.color}15` : 'transparent',
                borderColor: activePattern === pattern.id ? pattern.color : undefined,
                boxShadow: activePattern === pattern.id ? `0 4px 20px ${pattern.color}25` : undefined,
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
      </AnimatePresence>

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
                <div className="flex-1 bg-gray-900/50 rounded-xl p-4 border border-gray-800 flex items-center justify-center">
                  {/* Chain-of-Thought: Linear chain */}
                  {active.visual === 'chain' && (
                    <div className="flex flex-col gap-2 w-full">
                      {['Understand', 'Reason', 'Execute', 'Verify'].map((step, i) => (
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
                          <div
                            className="flex-1 px-3 py-1.5 rounded-lg text-sm"
                            style={{ backgroundColor: `${active.color}15`, color: active.color }}
                          >
                            {step}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* ReAct: Loop */}
                  {active.visual === 'loop' && (
                    <div className="flex flex-col items-center gap-1">
                      {['💭 Thought', '⚡ Action', '👁️ Observe'].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.15 * i }}
                          className="w-full"
                        >
                          <div
                            className="px-4 py-1.5 rounded-lg text-center text-sm font-medium"
                            style={{ backgroundColor: `${active.color}20`, color: active.color }}
                          >
                            {item}
                          </div>
                          {i < 2 && (
                            <motion.div
                              animate={{ y: [0, 2, 0] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                              className="text-center text-gray-500 py-0.5 text-sm"
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
                        ↻ Repeat
                      </motion.div>
                    </div>
                  )}

                  {/* Tree of Thoughts: Branching tree */}
                  {active.visual === 'tree' && (
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium mb-2"
                        style={{ backgroundColor: `${active.color}20`, color: active.color }}
                      >
                        🌱 Start
                      </motion.div>
                      <div className="text-gray-500 text-sm mb-1">↙ ↓ ↘</div>
                      <div className="flex gap-2 mb-2">
                        {[1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1,
                              boxShadow: i === 2 ? `0 0 12px ${active.color}` : 'none',
                            }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="px-2 py-1 rounded text-xs border"
                            style={{ 
                              borderColor: i === 2 ? active.color : `${active.color}40`,
                              color: i === 2 ? active.color : '#9ca3af',
                              backgroundColor: i === 2 ? `${active.color}20` : 'transparent',
                            }}
                          >
                            Path {i}
                          </motion.div>
                        ))}
                      </div>
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-sm"
                        style={{ color: active.color }}
                      >
                        ↓ Expand best
                      </motion.div>
                    </div>
                  )}

                  {/* Graph of Thoughts: Network */}
                  {active.visual === 'graph' && (
                    <div className="relative w-full h-32">
                      <svg className="w-full h-full" viewBox="0 0 200 100">
                        {/* Connections */}
                        <motion.line x1="100" y1="15" x2="50" y2="45" stroke={active.color} strokeOpacity="0.3" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 }} />
                        <motion.line x1="100" y1="15" x2="150" y2="45" stroke={active.color} strokeOpacity="0.3" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4 }} />
                        <motion.line x1="50" y1="45" x2="100" y2="75" stroke={active.color} strokeOpacity="0.5" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
                        <motion.line x1="150" y1="45" x2="100" y2="75" stroke={active.color} strokeOpacity="0.5" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 }} />
                        {/* Nodes */}
                        <motion.circle cx="100" cy="15" r="10" fill={`${active.color}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} />
                        <motion.circle cx="50" cy="45" r="8" fill={`${active.color}80`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} />
                        <motion.circle cx="150" cy="45" r="8" fill={`${active.color}80`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} />
                        <motion.circle cx="100" cy="75" r="12" fill={active.color} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }} />
                        {/* Labels */}
                        <text x="100" y="95" textAnchor="middle" fill="#9ca3af" fontSize="10">Merged Insight</text>
                      </svg>
                    </div>
                  )}

                  {/* Self-Reflection: Mirror */}
                  {active.visual === 'mirror' && (
                    <div className="flex flex-col items-center gap-2 w-full">
                      <div className="px-4 py-1.5 rounded-lg text-sm border w-full text-center"
                        style={{ borderColor: `${active.color}40`, color: active.color }}>
                        📝 Generate
                      </div>
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-xl"
                      >🔍</motion.div>
                      <div className="text-gray-500 text-xs">Critique</div>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-lg"
                      >✨</motion.div>
                      <div className="px-4 py-1.5 rounded-lg text-sm font-medium w-full text-center"
                        style={{ backgroundColor: `${active.color}20`, color: active.color }}>
                        Improved
                      </div>
                    </div>
                  )}

                  {/* MCTS: Simulation tree */}
                  {active.visual === 'mcts' && (
                    <div className="flex flex-col items-center text-center">
                      <div className="flex gap-3 mb-2">
                        {['🎯 Select', '📈 Expand', '🎲 Simulate', '⬆️ Backup'].map((step, i) => (
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.1 }}
                            className="text-xs px-2 py-1 rounded"
                            style={{ backgroundColor: `${active.color}15`, color: active.color }}
                          >
                            {step}
                          </motion.div>
                        ))}
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        className="text-2xl my-2"
                      >🎲</motion.div>
                      <span className="text-gray-500 text-xs">Simulate many paths, pick best</span>
                    </div>
                  )}
                </div>

                {/* Example */}
                <div className="mt-2 text-xs text-gray-500 italic">
                  <span className="text-gray-600">Example:</span> {active.example}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-3 text-gray-500 text-xs text-center max-w-xl"
      >
        <span className="text-gray-400">Pro tip:</span> Start with Chain-of-Thought. Add Tree/Graph patterns only when facing complex multi-path decisions.
      </motion.p>
    </div>
  );
}

