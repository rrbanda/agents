'use client';

import { motion } from 'framer-motion';

export default function AgentTypesOverviewSlide() {
  const classificationAxes = [
    {
      icon: '📊',
      title: 'By Autonomy Level',
      description: 'How much control does the agent have?',
      examples: ['Reactive', 'Deliberative', 'Hybrid'],
      color: '#8b5cf6',
    },
    {
      icon: '🎯',
      title: 'By Application Domain',
      description: 'What problem space does it solve?',
      examples: ['Coding', 'Research', 'Support'],
      color: '#3b82f6',
    },
    {
      icon: '🏗️',
      title: 'By Architecture Pattern',
      description: 'How is it structured internally?',
      examples: ['Single', 'Multi-Agent', 'Hierarchical'],
      color: '#10b981',
    },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-8 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
          Taxonomy
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Types of Agents
        </h2>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-400 text-lg text-center mb-10 max-w-2xl"
      >
        Not all agents are built the same. Understanding the different types
        helps you choose the right approach for your problem.
      </motion.p>

      {/* Classification axes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full"
      >
        {classificationAxes.map((axis, index) => (
          <motion.div
            key={axis.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.15 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative"
          >
            {/* Card glow */}
            <div 
              className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
              style={{ backgroundColor: `${axis.color}30` }}
            />
            
            {/* Card */}
            <div
              className="relative h-full rounded-2xl p-6 border transition-all duration-300"
              style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              {/* Top accent */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ backgroundColor: axis.color }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{ 
                  backgroundColor: `${axis.color}15`,
                  border: `1px solid ${axis.color}30`,
                }}
              >
                <span className="text-3xl">{axis.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2">
                {axis.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4">
                {axis.description}
              </p>

              {/* Examples */}
              <div className="flex flex-wrap gap-2">
                {axis.examples.map((example) => (
                  <span
                    key={example}
                    className="px-2 py-1 rounded-md text-xs font-medium"
                    style={{
                      backgroundColor: `${axis.color}10`,
                      color: axis.color,
                      border: `1px solid ${axis.color}25`,
                    }}
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Visual connector */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 1 }}
        className="mt-10 flex items-center gap-4"
      >
        <div className="w-20 h-px bg-gradient-to-r from-transparent to-gray-700" />
        <span className="text-gray-500 text-sm">Let's explore each dimension</span>
        <div className="w-20 h-px bg-gradient-to-l from-transparent to-gray-700" />
      </motion.div>

      {/* Navigation hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 flex items-center gap-2 text-gray-500 text-sm"
      >
        <span>Next: Autonomy Levels</span>
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          →
        </motion.span>
      </motion.div>
    </div>
  );
}

