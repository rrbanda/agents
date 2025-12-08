'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import LineReveal from '../../animations/LineReveal';

const agents = [
  {
    id: 'research',
    name: 'Research Agent',
    icon: '🔍',
    task: 'Finds information',
    color: '#3b82f6',
    position: { x: -120, y: -80 },
  },
  {
    id: 'analysis',
    name: 'Analysis Agent',
    icon: '📊',
    task: 'Analyzes findings',
    color: '#10b981',
    position: { x: 120, y: -80 },
  },
  {
    id: 'writing',
    name: 'Writing Agent',
    icon: '✍️',
    task: 'Creates report',
    color: '#f59e0b',
    position: { x: -120, y: 80 },
  },
  {
    id: 'review',
    name: 'Review Agent',
    icon: '✓',
    task: 'Quality check',
    color: '#8b5cf6',
    position: { x: 120, y: 80 },
  },
];

const features = [
  { icon: '🤝', text: 'Multiple agents collaborate' },
  { icon: '🎯', text: 'Each specializes in different tasks' },
  { icon: '🎭', text: 'Orchestrator coordinates work' },
  { icon: '⚡', text: 'Parallel processing' },
];

export default function MultiAgentSlide() {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <LineReveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Multi-Agent Systems
        </h2>
        <p className="text-gray-400 text-center mb-6">
          The next level: agents working together
        </p>
      </LineReveal>

      {/* Main Content - Two Columns */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Hub-and-Spoke Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative h-80 flex items-center justify-center"
        >
          {/* Center Orchestrator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="absolute z-10 w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex flex-col items-center justify-center shadow-lg"
            style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.4)' }}
          >
            <span className="text-2xl">🎭</span>
            <span className="text-white text-xs font-bold">Orchestrator</span>
          </motion.div>

          {/* Surrounding Agents */}
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
              onHoverStart={() => setHoveredAgent(agent.id)}
              onHoverEnd={() => setHoveredAgent(null)}
              className="absolute cursor-pointer transition-all duration-300"
              style={{
                transform: `translate(${agent.position.x}px, ${agent.position.y}px) ${hoveredAgent === agent.id ? 'scale(1.1)' : 'scale(1)'}`,
              }}
            >
              {/* Connection Line */}
              <svg
                className="absolute"
                style={{
                  width: Math.abs(agent.position.x) + 50,
                  height: Math.abs(agent.position.y) + 50,
                  top: agent.position.y > 0 ? -agent.position.y : 0,
                  left: agent.position.x > 0 ? -agent.position.x : 0,
                  zIndex: -1,
                }}
              >
                <motion.line
                  x1={agent.position.x > 0 ? 0 : Math.abs(agent.position.x)}
                  y1={agent.position.y > 0 ? 0 : Math.abs(agent.position.y)}
                  x2={agent.position.x > 0 ? agent.position.x : 0}
                  y2={agent.position.y > 0 ? agent.position.y : 0}
                  stroke={hoveredAgent === agent.id ? agent.color : '#4b5563'}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                />
              </svg>

              {/* Agent Card */}
              <div
                className="w-20 h-20 rounded-xl flex flex-col items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: hoveredAgent === agent.id ? `${agent.color}30` : 'rgba(31, 41, 55, 0.8)',
                  border: `2px solid ${hoveredAgent === agent.id ? agent.color : 'rgba(75, 85, 99, 0.5)'}`,
                  boxShadow: hoveredAgent === agent.id ? `0 0 20px ${agent.color}40` : 'none',
                }}
              >
                <span className="text-xl mb-1">{agent.icon}</span>
                <span className="text-xs text-gray-300 text-center px-1 leading-tight">{agent.name.split(' ')[0]}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right: Features and Example */}
        <div className="space-y-6">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50"
          >
            <h3 className="text-white font-bold text-lg mb-4">How It Works</h3>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-lg">{feature.icon}</span>
                  <span className="text-gray-300 text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Example */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-5 border border-blue-500/30"
          >
            <h3 className="text-blue-400 font-bold text-lg mb-3">Example: Report Generation</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-blue-400">1.</span>
                <span className="text-gray-300">🔍 Research finds information</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">2.</span>
                <span className="text-gray-300">📊 Analysis extracts insights</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">3.</span>
                <span className="text-gray-300">✍️ Writer creates report</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-400">4.</span>
                <span className="text-gray-300">✓ Reviewer checks quality</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Key Insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-blue-400 font-semibold text-lg mt-6 text-center"
      >
        Result: More capable than any single agent alone.
      </motion.p>
    </div>
  );
}

