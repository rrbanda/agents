'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function WorkflowsVsAgentsSlide() {
  const [activeTab, setActiveTab] = useState<'workflows' | 'agents'>('workflows');
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const workflowSteps = [
    { label: 'Input', icon: '📥' },
    { label: 'LLM 1', icon: '🤖' },
    { label: 'LLM 2', icon: '🤖' },
    { label: 'LLM 3', icon: '🤖' },
    { label: 'Output', icon: '📤' },
  ];

  const agentLoop = [
    { label: 'Goal', icon: '🎯', color: '#8b5cf6' },
    { label: 'Think', icon: '💭', color: '#3b82f6' },
    { label: 'Act', icon: '⚡', color: '#10b981' },
    { label: 'Observe', icon: '👁️', color: '#f59e0b' },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-8 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
          Foundations
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          The Key Distinction
        </h2>
        <p className="text-gray-400">
          Understanding when to use each approach
        </p>
      </motion.div>

      {/* Toggle tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 p-1 rounded-xl bg-gray-800/50 border border-gray-700/50 mb-5"
      >
        <button
          onClick={() => setActiveTab('workflows')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'workflows'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Workflows
        </button>
        <button
          onClick={() => setActiveTab('agents')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'agents'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Agents
        </button>
      </motion.div>

      {/* Main content area */}
      <div className="max-w-5xl w-full">
        {activeTab === 'workflows' ? (
          <motion.div
            key="workflows"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            {/* Workflow visualization */}
            <div className="bg-gray-800/30 rounded-2xl p-5 border border-blue-500/20">
              <div className="flex items-center justify-center gap-2 mb-4">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                        <span className="text-2xl">{step.icon}</span>
                      </div>
                      <span className="text-xs text-gray-400 mt-1">{step.label}</span>
                    </div>
                    {index < workflowSteps.length - 1 && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="w-8 h-0.5 bg-blue-500/50"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
              <p className="text-center text-gray-400 text-sm">
                Predefined path • Each step determined in advance
              </p>
            </div>

            {/* Characteristics - compact inline */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800/30 rounded-xl p-3 border border-gray-700/50">
                <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2 text-sm">
                  <span>✅</span> Best For
                </h4>
                <p className="text-gray-300 text-sm">
                  Well-defined, predictable tasks with fixed steps
                </p>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-3 border border-gray-700/50">
                <h4 className="text-gray-400 font-semibold mb-2 flex items-center gap-2 text-sm">
                  <span>💡</span> Key Trait
                </h4>
                <p className="text-gray-300 text-sm">
                  <span className="text-blue-400 font-medium">Code controls the process</span> — LLMs follow predefined paths
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="agents"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Agent loop visualization */}
            <div className="bg-gray-800/30 rounded-2xl p-4 border border-purple-500/20">
              <div className="relative flex items-center justify-center">
                {/* Center goal */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="absolute w-20 h-20 rounded-full bg-purple-500/20 border-2 border-purple-500/50 flex items-center justify-center"
                >
                  <span className="text-3xl">🎯</span>
                </motion.div>

                {/* Orbiting elements */}
                <div className="w-56 h-56 relative">
                  {agentLoop.slice(1).map((item, index) => {
                    const angle = (index * 120 - 90) * (Math.PI / 180);
                    const radius = 85;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.15 }}
                        className="absolute"
                        style={{
                          left: `calc(50% + ${x}px - 28px)`,
                          top: `calc(50% + ${y}px - 28px)`,
                        }}
                        onMouseEnter={() => setHoveredStep(index)}
                        onMouseLeave={() => setHoveredStep(null)}
                      >
                        <motion.div
                          animate={hoveredStep === index ? { scale: 1.1 } : { scale: 1 }}
                          className="w-14 h-14 rounded-xl flex items-center justify-center cursor-pointer transition-colors"
                          style={{
                            backgroundColor: `${item.color}20`,
                            border: `2px solid ${item.color}60`,
                            boxShadow: hoveredStep === index ? `0 0 20px ${item.color}40` : 'none',
                          }}
                        >
                          <span className="text-2xl">{item.icon}</span>
                        </motion.div>
                        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                          {item.label}
                        </span>
                      </motion.div>
                    );
                  })}

                  {/* Rotating arrow */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <svg width="170" height="170" className="opacity-20">
                        <circle
                          cx="85"
                          cy="85"
                          r="75"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="2"
                          strokeDasharray="10 5"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </motion.div>
                </div>
              </div>
              <p className="text-center text-gray-400 text-sm mt-4">
                Dynamic decisions • LLM determines what to do next
              </p>
            </div>

            {/* Characteristics - compact inline */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800/30 rounded-xl p-3 border border-gray-700/50">
                <h4 className="text-purple-400 font-semibold mb-2 flex items-center gap-2 text-sm">
                  <span>✅</span> Best For
                </h4>
                <p className="text-gray-300 text-sm">
                  Open-ended, unpredictable tasks with unknown steps
                </p>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-3 border border-gray-700/50">
                <h4 className="text-gray-400 font-semibold mb-2 flex items-center gap-2 text-sm">
                  <span>💡</span> Key Trait
                </h4>
                <p className="text-gray-300 text-sm">
                  <span className="text-purple-400 font-medium">LLM controls the process</span> — dynamically directs actions
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

