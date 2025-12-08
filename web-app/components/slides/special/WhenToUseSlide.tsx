'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import LineReveal from '../../animations/LineReveal';

const useAgents = [
  { text: 'Task requires multiple steps', detail: 'Complex workflows with dependencies' },
  { text: 'Need to adapt to new information', detail: 'Dynamic environments, changing data' },
  { text: "Can't predict exact path", detail: 'Exploratory tasks, unknown territory' },
  { text: 'Value justifies cost', detail: 'High-impact work, time savings' },
];

const dontUseAgents = [
  { text: 'Simple, single-step task', detail: 'Just use a script or command' },
  { text: 'Fully predictable workflow', detail: 'Traditional automation works fine' },
  { text: 'Cost exceeds value', detail: 'Token costs outweigh benefits' },
  { text: 'Need deterministic results', detail: 'Exact same output every time' },
];

export default function WhenToUseSlide() {
  const [hoveredSide, setHoveredSide] = useState<'use' | 'dont' | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <LineReveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          When to Use Agents
        </h2>
        <p className="text-gray-400 text-center mb-8">
          A practical decision framework
        </p>
      </LineReveal>

      {/* Two Column Comparison */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Use Agents */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onHoverStart={() => setHoveredSide('use')}
          onHoverEnd={() => setHoveredSide(null)}
          className="rounded-xl overflow-hidden transition-all duration-300"
          style={{
            background: hoveredSide === 'use' 
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(31, 41, 55, 0.8) 100%)'
              : 'rgba(31, 41, 55, 0.5)',
            border: `2px solid ${hoveredSide === 'use' ? '#10b981' : 'rgba(75, 85, 99, 0.4)'}`,
            boxShadow: hoveredSide === 'use' 
              ? '0 10px 40px rgba(16, 185, 129, 0.2)' 
              : '0 4px 20px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Header */}
          <div className="p-4 bg-green-500/10 border-b border-green-500/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <h3 className="text-green-400 font-bold text-xl">Use Agents When</h3>
            </div>
          </div>

          {/* Items */}
          <div className="p-4 space-y-3">
            {useAgents.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10"
              >
                <span className="text-green-400 mt-0.5">✓</span>
                <div>
                  <div className="text-white font-medium text-sm">{item.text}</div>
                  <div className="text-gray-400 text-xs mt-1">{item.detail}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Don't Use Agents */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onHoverStart={() => setHoveredSide('dont')}
          onHoverEnd={() => setHoveredSide(null)}
          className="rounded-xl overflow-hidden transition-all duration-300"
          style={{
            background: hoveredSide === 'dont' 
              ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(31, 41, 55, 0.8) 100%)'
              : 'rgba(31, 41, 55, 0.5)',
            border: `2px solid ${hoveredSide === 'dont' ? '#ef4444' : 'rgba(75, 85, 99, 0.4)'}`,
            boxShadow: hoveredSide === 'dont' 
              ? '0 10px 40px rgba(239, 68, 68, 0.2)' 
              : '0 4px 20px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Header */}
          <div className="p-4 bg-red-500/10 border-b border-red-500/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">❌</span>
              <h3 className="text-red-400 font-bold text-xl">Don&apos;t Use Agents When</h3>
            </div>
          </div>

          {/* Items */}
          <div className="p-4 space-y-3">
            {dontUseAgents.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10"
              >
                <span className="text-red-400 mt-0.5">✗</span>
                <div>
                  <div className="text-white font-medium text-sm">{item.text}</div>
                  <div className="text-gray-400 text-xs mt-1">{item.detail}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Key Question */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/30 max-w-2xl"
      >
        <div className="text-center">
          <span className="text-2xl mb-2 block">🤔</span>
          <h4 className="text-blue-400 font-bold text-lg mb-2">The Key Question</h4>
          <p className="text-white text-xl font-semibold">
            Does this task need flexibility and adaptation?
          </p>
          <p className="text-gray-400 text-sm mt-2">
            If yes → Agent. If no → Traditional automation.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

