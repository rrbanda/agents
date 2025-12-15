'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const mcpBenefits = [
  {
    id: 'standard',
    icon: '🔌',
    title: 'Universal Standard',
    description: 'Open protocol for connecting AI agents to external systems',
    color: '#3b82f6',
  },
  {
    id: 'auth',
    icon: '🔐',
    title: 'Built-in Auth',
    description: 'Handles OAuth flows, API keys, and authentication automatically',
    color: '#10b981',
  },
  {
    id: 'prebuilt',
    icon: '📦',
    title: 'Pre-built Integrations',
    description: 'Connect to Slack, GitHub, Google Drive, Asana and more',
    color: '#8b5cf6',
  },
  {
    id: 'focus',
    icon: '🎯',
    title: 'Focus on Behavior',
    description: 'Spend time on agent logic, not integration code',
    color: '#f59e0b',
  },
];

const designPrinciples = [
  {
    id: 'annotations',
    title: 'Tool Annotations',
    description: 'Disclose which tools require network access or make destructive changes',
    good: 'Mark tools that modify state vs read-only',
    icon: '📝',
  },
  {
    id: 'descriptions',
    title: 'Clear Descriptions',
    description: 'Write as if explaining to a new team member',
    good: '"Searches active users by email. Returns max 10 results."',
    icon: '💬',
  },
  {
    id: 'errors',
    title: 'Helpful Errors',
    description: 'Return actionable error messages, not stack traces',
    good: '"Invalid date format. Use YYYY-MM-DD. Example: 2024-03-15"',
    icon: '⚠️',
  },
  {
    id: 'testing',
    title: 'Agent Testing',
    description: 'Test tools with real agent scenarios, not just unit tests',
    good: 'Tool-testing agents that improve descriptions through iteration',
    icon: '🧪',
  },
];

export default function MCPToolsSlide() {
  const [activeTab, setActiveTab] = useState<'what' | 'design'>('what');
  const [hoveredPrinciple, setHoveredPrinciple] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
          Integration Framework
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Model Context Protocol
        </h2>
        <p className="text-gray-400">
          The universal standard for connecting agents to external systems
        </p>
      </motion.div>

      {/* Tab selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 p-1 rounded-xl bg-gray-800/50 border border-gray-700/50 mb-6"
      >
        <button
          onClick={() => setActiveTab('what')}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'what'
              ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          What is MCP?
        </button>
        <button
          onClick={() => setActiveTab('design')}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'design'
              ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Designing MCP Tools
        </button>
      </motion.div>

      {/* Content area */}
      <div className="w-full max-w-5xl">
        {activeTab === 'what' ? (
          <motion.div
            key="what"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Architecture diagram */}
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50 mb-6">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {/* Agent */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="px-6 py-4 rounded-xl bg-purple-500/15 border border-purple-500/40"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🤖</span>
                    <span className="text-purple-400 font-bold">Agent</span>
                  </div>
                </motion.div>

                {/* Arrow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-gray-500 text-xs mb-1">calls</span>
                  <span className="text-green-400 text-xl">→</span>
                </motion.div>

                {/* MCP Server */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="px-6 py-4 rounded-xl bg-green-500/15 border border-green-500/40"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🔌</span>
                    <div>
                      <span className="text-green-400 font-bold block">MCP Server</span>
                      <span className="text-gray-500 text-xs">Handles auth, API calls</span>
                    </div>
                  </div>
                </motion.div>

                {/* Arrow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-gray-500 text-xs mb-1">connects</span>
                  <span className="text-green-400 text-xl">→</span>
                </motion.div>

                {/* External services */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col gap-2"
                >
                  {['Slack', 'GitHub', 'Drive', 'Asana'].map((service, i) => (
                    <div
                      key={service}
                      className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-medium"
                    >
                      {service}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Benefits grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {mcpBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-gray-600 transition-all"
                >
                  <span className="text-2xl block mb-2">{benefit.icon}</span>
                  <h4
                    className="font-bold text-sm mb-1"
                    style={{ color: benefit.color }}
                  >
                    {benefit.title}
                  </h4>
                  <p className="text-gray-500 text-xs">{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Code example */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-4 bg-gray-900/50 rounded-xl p-4 border border-gray-700/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500">Example: Agent calls tool</span>
              </div>
              <code className="text-sm text-green-300 font-mono">
                <span className="text-gray-500">// Agent simply calls the tool</span>
                <br />
                <span className="text-purple-400">search_slack_messages</span>
                <span className="text-gray-400">(</span>
                <span className="text-blue-400">query</span>
                <span className="text-gray-400">: </span>
                <span className="text-yellow-300">"project update"</span>
                <span className="text-gray-400">)</span>
                <br />
                <span className="text-gray-500">// MCP handles OAuth, API calls, pagination</span>
              </code>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="design"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Design principles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {designPrinciples.map((principle, index) => (
                <motion.div
                  key={principle.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onMouseEnter={() => setHoveredPrinciple(principle.id)}
                  onMouseLeave={() => setHoveredPrinciple(null)}
                  className={`p-5 rounded-xl border transition-all duration-300 ${
                    hoveredPrinciple === principle.id
                      ? 'bg-green-500/10 border-green-500/40'
                      : 'bg-gray-800/30 border-gray-700/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{principle.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-1">{principle.title}</h4>
                      <p className="text-gray-400 text-sm mb-3">{principle.description}</p>
                      <div className="bg-green-500/10 rounded-lg px-3 py-2 border border-green-500/20">
                        <span className="text-green-400 text-xs font-mono">{principle.good}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Key insight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 px-5 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20"
            >
              <p className="text-gray-300 text-sm">
                <span className="text-yellow-400 font-medium">📈 40% Improvement:</span> Tool-testing agents that rewrite descriptions 
                based on failure modes achieved 40% decrease in task completion time.
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Bottom insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-gray-400 text-sm text-center max-w-xl"
      >
        The growing MCP ecosystem means you can add new capabilities quickly.
        <br />
        <span className="text-gray-500">Focus on agent behavior, not integration code.</span>
      </motion.p>
    </div>
  );
}

