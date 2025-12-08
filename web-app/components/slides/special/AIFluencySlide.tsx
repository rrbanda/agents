'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const fourDs = [
  {
    id: 'delegation',
    letter: 'D',
    title: 'Delegation',
    color: '#3b82f6',
    description: 'Deciding what work should be done by humans vs AI',
    aspects: [
      { name: 'Problem Awareness', desc: 'Understand your goals before involving AI' },
      { name: 'Platform Awareness', desc: 'Know capabilities and limitations of AI systems' },
      { name: 'Task Delegation', desc: 'Distribute work to leverage strengths of each' },
    ],
  },
  {
    id: 'description',
    letter: 'D',
    title: 'Description',
    color: '#10b981',
    description: 'Effectively communicating with AI systems',
    aspects: [
      { name: 'Product', desc: 'Define outputs, format, audience, style' },
      { name: 'Process', desc: 'Provide step-by-step instructions' },
      { name: 'Performance', desc: 'Specify behavior (concise vs detailed, etc.)' },
    ],
  },
  {
    id: 'discernment',
    letter: 'D',
    title: 'Discernment',
    color: '#f59e0b',
    description: 'Critically evaluating AI outputs and processes',
    aspects: [
      { name: 'Product', desc: 'Evaluate accuracy, relevance, coherence' },
      { name: 'Process', desc: 'Check for logical errors or reasoning lapses' },
      { name: 'Performance', desc: 'Assess if communication style is effective' },
    ],
  },
  {
    id: 'diligence',
    letter: 'D',
    title: 'Diligence',
    color: '#8b5cf6',
    description: 'Using AI responsibly and ethically',
    aspects: [
      { name: 'Creation', desc: 'Be thoughtful about which AI systems you use' },
      { name: 'Transparency', desc: 'Be honest about AI\'s role in your work' },
      { name: 'Deployment', desc: 'Verify and take responsibility for outputs' },
    ],
  },
];

const interactionModes = [
  {
    mode: 'Automation',
    icon: '⚙️',
    description: 'AI performs specific tasks based on specific instructions',
    example: 'You define what → AI executes it',
    color: '#3b82f6',
  },
  {
    mode: 'Augmentation',
    icon: '🤝',
    description: 'Humans and AI collaborate as thinking partners',
    example: 'Iterative back-and-forth, both contribute',
    color: '#10b981',
  },
  {
    mode: 'Agency',
    icon: '🚀',
    description: 'AI works independently based on configured patterns',
    example: 'You set goals → AI figures out how',
    color: '#8b5cf6',
  },
];

export default function AIFluencySlide() {
  const [activeD, setActiveD] = useState<string | null>(null);
  const [showModes, setShowModes] = useState(false);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          AI Fluency: <span className="text-blue-400">The 4Ds</span>
        </h2>
        <p className="text-gray-400 text-sm">
          A framework for working with AI effectively, efficiently, and responsibly
        </p>
      </motion.div>

      {/* 4Ds Display */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-5xl mb-4"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {fourDs.map((d, index) => (
            <motion.button
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => setActiveD(activeD === d.id ? null : d.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                activeD === d.id
                  ? 'bg-gray-800 shadow-lg'
                  : 'bg-gray-800/40 border-gray-700/50 hover:border-gray-600'
              }`}
              style={{
                borderColor: activeD === d.id ? d.color : undefined,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-2xl font-black"
                  style={{ color: d.color }}
                >
                  {d.letter}
                </span>
                <h3 className="text-base font-bold text-white">{d.title}</h3>
              </div>
              <p className="text-xs text-gray-400 line-clamp-2">{d.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Detail Panel */}
      <AnimatePresence mode="wait">
        {activeD && (
          <motion.div
            key={activeD}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full max-w-5xl bg-gray-800/60 rounded-xl border border-gray-700/50 p-4 mb-4"
          >
            {(() => {
              const d = fourDs.find((item) => item.id === activeD);
              if (!d) return null;
              return (
                <div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: d.color }}>
                    {d.title}: {d.description}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {d.aspects.map((aspect, i) => (
                      <motion.div
                        key={aspect.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="bg-gray-900/50 rounded-lg p-3"
                      >
                        <h4 className="text-sm font-semibold text-white mb-1">{aspect.name}</h4>
                        <p className="text-xs text-gray-400">{aspect.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instruction when no D selected */}
      {!activeD && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-5xl bg-gray-800/40 rounded-xl border border-gray-700/50 p-4 mb-4 text-center"
        >
          <p className="text-gray-400 text-sm">
            👆 Click any D to explore its components
          </p>
        </motion.div>
      )}

      {/* Interaction Modes Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-5xl"
      >
        <button
          onClick={() => setShowModes(!showModes)}
          className="w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 border border-blue-500/20 hover:border-blue-500/40 transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔄</span>
              <div>
                <h3 className="text-sm font-bold text-blue-300">Human-AI Interaction Modes</h3>
                <p className="text-xs text-gray-400">Three ways humans and AI can work together</p>
              </div>
            </div>
            <span className="text-gray-500">{showModes ? '▲' : '▼'}</span>
          </div>
          <AnimatePresence>
            {showModes && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-blue-500/20 grid grid-cols-1 md:grid-cols-3 gap-3">
                  {interactionModes.map((mode, i) => (
                    <motion.div
                      key={mode.mode}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="bg-gray-900/50 rounded-lg p-3 text-center"
                    >
                      <div className="text-2xl mb-2">{mode.icon}</div>
                      <h4 className="text-sm font-bold mb-1" style={{ color: mode.color }}>
                        {mode.mode}
                      </h4>
                      <p className="text-xs text-gray-400 mb-2">{mode.description}</p>
                      <p className="text-xs text-gray-500 italic">{mode.example}</p>
                    </motion.div>
                  ))}
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
        AI Fluency = effective, efficient, ethical, and safe AI use
      </motion.p>
    </div>
  );
}


