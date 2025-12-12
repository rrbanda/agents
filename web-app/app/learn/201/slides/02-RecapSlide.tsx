'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const recapItems = [
  {
    id: 'llm',
    icon: '💬',
    title: 'LLM',
    description: 'Language Model',
    detail: 'The brain that understands and generates text',
    color: '#3b82f6',
  },
  {
    id: 'memory',
    icon: '🧠',
    title: 'Memory',
    description: 'Context Retention',
    detail: 'Remembers past interactions and information',
    color: '#10b981',
  },
  {
    id: 'tools',
    icon: '🔧',
    title: 'Tools',
    description: 'External Actions',
    detail: 'Abilities to interact with the world',
    color: '#f59e0b',
  },
  {
    id: 'goals',
    icon: '🎯',
    title: 'Goals',
    description: 'Autonomous Direction',
    detail: 'Pursues outcomes, not just responses',
    color: '#ef4444',
  },
];

export default function RecapSlide() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-8 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
          Quick Recap from 101
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          What Makes an Agent?
        </h2>
        <p className="text-gray-400">
          An LLM enhanced with these four capabilities
        </p>
      </motion.div>

      {/* Agent equation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl w-full mb-8"
      >
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {recapItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-4"
            >
              <motion.div
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                whileHover={{ scale: 1.05, y: -4 }}
                className="relative"
              >
                {/* Card */}
                <div
                  className="relative px-6 py-4 rounded-xl cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: hoveredItem === item.id 
                      ? `${item.color}15` 
                      : 'rgba(255,255,255,0.03)',
                    border: `2px solid ${hoveredItem === item.id ? item.color : 'rgba(255,255,255,0.06)'}`,
                    boxShadow: hoveredItem === item.id 
                      ? `0 8px 30px ${item.color}20` 
                      : 'none',
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-3xl mb-2">{item.icon}</span>
                    <h3 
                      className="font-bold text-lg transition-colors"
                      style={{ color: hoveredItem === item.id ? item.color : 'white' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-xs">{item.description}</p>
                  </div>

                  {/* Tooltip on hover */}
                  {hoveredItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    >
                      <div 
                        className="px-3 py-1.5 rounded-lg text-xs"
                        style={{ 
                          backgroundColor: `${item.color}20`,
                          color: item.color,
                          border: `1px solid ${item.color}40`,
                        }}
                      >
                        {item.detail}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Plus sign between items */}
              {index < recapItems.length - 1 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-2xl text-gray-600 font-light"
                >
                  +
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Equals Agent */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex items-center gap-4"
      >
        <span className="text-3xl text-gray-500">=</span>
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl blur-xl" />
          <div className="relative px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🤖</span>
              <div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  Agent
                </h3>
                <p className="text-gray-400 text-sm">Autonomous AI System</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* The key insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-10 max-w-2xl text-center"
      >
        <p className="text-gray-300 text-lg leading-relaxed">
          In 101, we learned <span className="text-blue-400 font-medium">what</span> agents are.
          <br />
          Now we'll learn <span className="text-purple-400 font-medium">how</span> to build them effectively.
        </p>
      </motion.div>

      {/* Visual separator */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-8 w-32 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
      />
    </div>
  );
}

