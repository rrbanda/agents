'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const pillars = [
  {
    icon: '🧠',
    title: 'Algorithms',
    subtitle: 'Transformer Architecture (2017)',
    description: 'Process text in parallel, understand relationships between words across long passages',
    color: '#3b82f6',
  },
  {
    icon: '📊',
    title: 'Data',
    subtitle: 'The Digital Explosion',
    description: 'Billions of documents, code repositories, and conversations to learn from',
    color: '#10b981',
  },
  {
    icon: '⚡',
    title: 'Computing',
    subtitle: 'GPU Revolution',
    description: 'Massive parallel processing power to train models on all this data',
    color: '#f59e0b',
  },
];

const howItWorks = [
  {
    step: '1',
    title: 'Pre-training',
    description: 'Learn patterns from billions of text examples',
    icon: '📚',
  },
  {
    step: '2',
    title: 'Fine-tuning',
    description: 'Refine to be helpful, harmless, and honest',
    icon: '🎯',
  },
  {
    step: '3',
    title: 'Deployment',
    description: 'You prompt, it generates based on learned patterns',
    icon: '🚀',
  },
];

const capabilities = [
  { text: 'Understands context', icon: '✓', color: '#10b981' },
  { text: 'Generates new content', icon: '✓', color: '#10b981' },
  { text: 'Follows instructions', icon: '✓', color: '#10b981' },
  { text: 'Adapts to examples in prompt', icon: '✓', color: '#10b981' },
];

const limitations = [
  { text: 'Knowledge cutoff date', icon: '!', color: '#f59e0b' },
  { text: 'Can hallucinate facts', icon: '!', color: '#f59e0b' },
  { text: 'Context window limits', icon: '!', color: '#f59e0b' },
  { text: 'Reasoning can fail', icon: '!', color: '#f59e0b' },
];

export default function GenerativeAISlide() {
  const [activeTab, setActiveTab] = useState<'pillars' | 'how' | 'limits'>('pillars');

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          What is <span className="text-blue-400">Generative AI</span>?
        </h2>
        <p className="text-gray-400 text-base">
          AI that creates new content — not just analyzes existing data
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 mb-6"
      >
        {[
          { id: 'pillars', label: '🏛️ Three Pillars' },
          { id: 'how', label: '⚙️ How It Works' },
          { id: 'limits', label: '⚖️ Can & Cannot' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Content Area */}
      <div className="w-full max-w-5xl flex-1 flex items-center justify-center">
        {/* Tab 1: Three Pillars */}
        {activeTab === 'pillars' && (
          <motion.div
            key="pillars"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all"
                >
                  <div className="text-4xl mb-3">{pillar.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{pillar.title}</h3>
                  <p className="text-sm text-blue-400 mb-3">{pillar.subtitle}</p>
                  <p className="text-gray-400 text-sm">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-gray-500 text-sm mt-6"
            >
              All three needed together — algorithms to process, data to learn from, computing to train
            </motion.p>
          </motion.div>
        )}

        {/* Tab 2: How It Works */}
        {activeTab === 'how' && (
          <motion.div
            key="how"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl"
          >
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-4">
              {howItWorks.map((step, index) => (
                <div key={step.step} className="flex items-center gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-gray-800/80 rounded-xl p-6 border border-gray-700/50 text-center flex-1 min-w-[200px]"
                  >
                    <div className="text-4xl mb-3">{step.icon}</div>
                    <div className="text-xs text-blue-400 font-medium mb-1">STEP {step.step}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </motion.div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:flex items-center text-2xl text-gray-600">→</div>
                  )}
                </div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 border border-blue-500/20"
            >
              <p className="text-center text-gray-300 text-sm">
                <span className="text-blue-400 font-semibold">Key insight:</span> GenAI predicts the most likely next token based on patterns learned from training — it doesn&apos;t &quot;understand&quot; like humans do
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Tab 3: Can & Cannot */}
        {activeTab === 'limits' && (
          <motion.div
            key="limits"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Can Do */}
              <div className="bg-gray-800/40 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                  <span className="text-2xl">✓</span> What It CAN Do
                </h3>
                <div className="space-y-3">
                  {capabilities.map((cap, index) => (
                    <motion.div
                      key={cap.text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-sm">
                        {cap.icon}
                      </span>
                      <span className="text-gray-300">{cap.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Cannot Do */}
              <div className="bg-gray-800/40 rounded-xl p-6 border border-amber-500/30">
                <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span> Current Limitations
                </h3>
                <div className="space-y-3">
                  {limitations.map((lim, index) => (
                    <motion.div
                      key={lim.text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-sm font-bold">
                        {lim.icon}
                      </span>
                      <span className="text-gray-300">{lim.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-gray-500 text-sm mt-6"
            >
              Understanding both capabilities and limitations is key to using AI effectively
            </motion.p>
          </motion.div>
        )}
      </div>

      {/* Bottom tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-center"
      >
        <p className="text-gray-500 text-sm">
          This foundation enables everything that follows — from assistants to agents
        </p>
      </motion.div>
    </div>
  );
}


