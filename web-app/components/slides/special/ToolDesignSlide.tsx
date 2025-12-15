'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import LineReveal from '../../animations/LineReveal';

const personas = [
  {
    id: 'sysadmin',
    title: 'System Admin',
    icon: '🖥️',
    color: '#3b82f6',
    tools: ['System Commands', 'Log Aggregation', 'Monitoring APIs', 'Config Management'],
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: '🔧',
    color: '#10b981',
    tools: ['CI/CD Pipelines', 'Kubernetes', 'Infrastructure as Code', 'Service Mesh'],
  },
  {
    id: 'developer',
    title: 'Developer',
    icon: '👨‍💻',
    color: '#f59e0b',
    tools: ['Git Operations', 'Code Analysis', 'Test Runners', 'Documentation'],
  },
];

const mcpServers = [
  { name: 'GitHub', icon: '🐙' },
  { name: 'Slack', icon: '💬' },
  { name: 'Database', icon: '🗄️' },
  { name: 'Files', icon: '📁' },
  { name: 'Browser', icon: '🌐' },
  { name: 'Terminal', icon: '⌨️' },
];

export default function ToolDesignSlide() {
  const [activeTab, setActiveTab] = useState<'tools' | 'mcp'>('tools');

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <LineReveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Tools & Connections
        </h2>
        <p className="text-gray-400 text-center mb-4">
          How agents interact with the world
        </p>
      </LineReveal>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 mb-6 p-1 bg-gray-800/50 rounded-xl"
      >
        <button
          onClick={() => setActiveTab('tools')}
          className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
            activeTab === 'tools'
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
          }`}
        >
          Tools by Role
        </button>
        <button
          onClick={() => setActiveTab('mcp')}
          className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
            activeTab === 'mcp'
              ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
          }`}
        >
          MCP Protocol
        </button>
      </motion.div>

      {/* Content */}
      <div className="w-full max-w-5xl flex-1 flex items-center justify-center">
        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {personas.map((persona, index) => (
                <motion.div
                  key={persona.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600 transition-all"
                  style={{ borderLeftColor: persona.color, borderLeftWidth: '4px' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{persona.icon}</span>
                    <span className="font-bold" style={{ color: persona.color }}>{persona.title}</span>
                  </div>
                  <div className="space-y-2">
                    {persona.tools.map((tool) => (
                      <div key={tool} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: persona.color }} />
                        {tool}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <p className="text-gray-400 text-sm mb-2">But how do agents connect to all these tools?</p>
              <button
                onClick={() => setActiveTab('mcp')}
                className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
              >
                → Learn about MCP Protocol
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* MCP Tab */}
        {activeTab === 'mcp' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            {/* MCP Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-3">
                <span className="text-xl">🔌</span>
                <span className="text-purple-400 font-bold">Model Context Protocol</span>
                <span className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded">by Anthropic</span>
              </div>
              <p className="text-gray-300">The universal standard for connecting agents to tools</p>
            </div>

            {/* WHY / WHAT / HOW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* WHY */}
              <div className="bg-red-900/20 rounded-xl p-4 border border-red-500/30">
                <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                  <span>❓</span> WHY
                </h4>
                <p className="text-gray-300 text-sm">
                  Without a standard, every tool needs custom integration code. Fragmented, duplicated effort.
                </p>
              </div>

              {/* WHAT */}
              <div className="bg-purple-900/20 rounded-xl p-4 border border-purple-500/30">
                <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                  <span>📋</span> WHAT
                </h4>
                <p className="text-gray-300 text-sm">
                  An open protocol that defines how agents communicate with external tools. Like <strong className="text-purple-400">USB for AI</strong>.
                </p>
              </div>

              {/* HOW */}
              <div className="bg-green-900/20 rounded-xl p-4 border border-green-500/30">
                <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                  <span>⚙️</span> HOW
                </h4>
                <p className="text-gray-300 text-sm">
                  Agent connects to MCP servers. Servers handle auth, APIs, errors. Clean, standardized interface.
                </p>
              </div>
            </div>

            {/* Architecture */}
            <div className="flex items-center justify-center gap-6">
              <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-500/30 text-center">
                <div className="text-3xl mb-1">🤖</div>
                <div className="text-blue-400 font-bold text-sm">Agent</div>
                <div className="text-gray-500 text-xs">(MCP Client)</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-purple-400 text-xl">⟷</div>
                <div className="text-purple-400 text-xs">MCP</div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-3 border border-purple-500/30">
                <div className="text-purple-400 text-xs font-bold mb-2 text-center">MCP Servers</div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {mcpServers.map((server) => (
                    <div
                      key={server.name}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-900/50 rounded text-xs"
                    >
                      <span>{server.icon}</span>
                      <span className="text-gray-300">{server.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-blue-400 font-semibold text-lg mt-4 text-center"
      >
        {activeTab === 'tools' 
          ? 'Tools should match your workflow, not the other way around.'
          : 'MCP = One protocol to connect agents to any tool.'}
      </motion.p>
    </div>
  );
}
