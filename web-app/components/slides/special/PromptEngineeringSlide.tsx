'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const techniques = [
  {
    id: 1,
    icon: '🎯',
    title: 'Provide Context',
    description: 'Be specific about scope, domain, timeframe',
    before: 'Tell me about climate change.',
    after: 'Explain 3 impacts of climate change on tropical agriculture in the past decade.',
    color: '#3b82f6',
  },
  {
    id: 2,
    icon: '📋',
    title: 'Show Examples',
    description: 'Demonstrate the pattern you want',
    before: 'Convert this to plain language.',
    after: 'Here are examples of plain language: [example 1], [example 2]. Now convert: ...',
    color: '#10b981',
  },
  {
    id: 3,
    icon: '📐',
    title: 'Specify Constraints',
    description: 'Define structure, format, length',
    before: 'Design me a portfolio website.',
    after: 'Create a single-page portfolio with: Hero, About, Skills, Projects sections. Use dark theme.',
    color: '#8b5cf6',
  },
  {
    id: 4,
    icon: '📝',
    title: 'Break into Steps',
    description: 'Guide the reasoning process',
    before: 'Analyze this sales data.',
    after: '1. Identify top products  2. Compare to last quarter  3. Highlight trends  4. Suggest reasons',
    color: '#f59e0b',
  },
  {
    id: 5,
    icon: '🧠',
    title: 'Ask to Think First',
    description: 'Request reasoning before answering',
    before: '[Direct question]',
    after: 'Before answering, think through the problem. Consider factors, constraints, and approaches.',
    color: '#ef4444',
  },
  {
    id: 6,
    icon: '🎭',
    title: 'Define Role',
    description: 'Set expertise level and tone',
    before: 'Explain how rainbows form.',
    after: 'As an experienced science teacher speaking to a curious 10-year-old, explain rainbows.',
    color: '#06b6d4',
  },
];

export default function PromptEngineeringSlide() {
  const [selectedTechnique, setSelectedTechnique] = useState<number | null>(null);
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          <span className="text-blue-400">Prompt Engineering</span> Basics
        </h2>
        <p className="text-gray-400 text-sm">
          Better prompts → Better results — your primary interface with AI
        </p>
      </motion.div>

      {/* Techniques Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-5xl mb-4"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {techniques.map((tech, index) => (
            <motion.button
              key={tech.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
              onClick={() => setSelectedTechnique(selectedTechnique === tech.id ? null : tech.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                selectedTechnique === tech.id
                  ? 'bg-gray-800 border-blue-500/50 shadow-lg'
                  : 'bg-gray-800/40 border-gray-700/50 hover:border-gray-600'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{tech.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white mb-0.5">{tech.title}</h3>
                  <p className="text-xs text-gray-400 truncate">{tech.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Before/After Example Panel */}
      <AnimatePresence mode="wait">
        {selectedTechnique && (
          <motion.div
            key={selectedTechnique}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full max-w-5xl bg-gray-800/60 rounded-xl border border-gray-700/50 p-4 mb-4"
          >
            {(() => {
              const tech = techniques.find((t) => t.id === selectedTechnique);
              if (!tech) return null;
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Before */}
                  <div className="bg-red-950/30 rounded-lg p-3 border border-red-500/20">
                    <div className="text-xs font-medium text-red-400 mb-2 flex items-center gap-1">
                      <span>✗</span> BEFORE
                    </div>
                    <p className="text-gray-300 text-sm font-mono">{tech.before}</p>
                  </div>
                  {/* After */}
                  <div className="bg-green-950/30 rounded-lg p-3 border border-green-500/20">
                    <div className="text-xs font-medium text-green-400 mb-2 flex items-center gap-1">
                      <span>✓</span> AFTER
                    </div>
                    <p className="text-gray-300 text-sm font-mono">{tech.after}</p>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Default state - show tip */}
      {!selectedTechnique && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-5xl bg-gray-800/40 rounded-xl border border-gray-700/50 p-4 mb-4 text-center"
        >
          <p className="text-gray-400 text-sm">
            👆 Click any technique to see a before/after example
          </p>
        </motion.div>
      )}

      {/* Secret Weapon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-5xl"
      >
        <button
          onClick={() => setShowSecret(!showSecret)}
          className="w-full bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-xl p-4 border border-purple-500/30 hover:border-purple-500/50 transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔮</span>
              <div>
                <h3 className="text-sm font-bold text-purple-300">Secret Weapon</h3>
                <p className="text-xs text-gray-400">The most powerful technique of all</p>
              </div>
            </div>
            <span className="text-gray-500">{showSecret ? '▲' : '▼'}</span>
          </div>
          <AnimatePresence>
            {showSecret && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-purple-500/20">
                  <p className="text-gray-300 text-sm mb-2">
                    <strong className="text-purple-300">Ask the AI to help improve your prompt!</strong>
                  </p>
                  <div className="bg-gray-900/60 rounded-lg p-3 font-mono text-xs text-gray-400">
                    &quot;I&apos;m trying to get you to help me with [goal]. I&apos;m not sure how to phrase my request. Can you help me craft a better prompt?&quot;
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>

      {/* Bottom tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-gray-500 text-xs mt-4 text-center"
      >
        These techniques work with any AI — and become even more powerful when combined
      </motion.p>
    </div>
  );
}


