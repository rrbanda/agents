'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import LineReveal from '../../animations/LineReveal';

const personas = [
  {
    id: 'sysadmin',
    title: 'System Administrators',
    icon: '🖥️',
    color: '#3b82f6',
    tools: [
      { name: 'System Commands', description: 'grep, tail, awk, sed' },
      { name: 'Log Aggregation', description: 'Centralized log APIs' },
      { name: 'Monitoring', description: 'Metrics & alerting APIs' },
      { name: 'Configuration', description: 'Config management tools' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps Engineers',
    icon: '🔧',
    color: '#10b981',
    tools: [
      { name: 'CI/CD', description: 'Pipeline automation APIs' },
      { name: 'Containers', description: 'Kubernetes, Docker APIs' },
      { name: 'Infrastructure', description: 'IaC & cloud APIs' },
      { name: 'Service Mesh', description: 'Networking & routing' },
    ],
  },
  {
    id: 'developer',
    title: 'Software Developers',
    icon: '👨‍💻',
    color: '#f59e0b',
    tools: [
      { name: 'Version Control', description: 'Git operations' },
      { name: 'Code Analysis', description: 'Linting & static analysis' },
      { name: 'Testing', description: 'Test frameworks & runners' },
      { name: 'Documentation', description: 'Doc generation & search' },
    ],
  },
];

export default function ToolDesignSlide() {
  const [hoveredPersona, setHoveredPersona] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <LineReveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Give Agents the Right Tools
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Tools should match your workflow
        </p>
      </LineReveal>

      {/* Three Column Layout */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {personas.map((persona, index) => (
          <motion.div
            key={persona.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
            onHoverStart={() => setHoveredPersona(persona.id)}
            onHoverEnd={() => setHoveredPersona(null)}
            className="relative rounded-xl overflow-hidden transition-all duration-300"
            style={{
              background: hoveredPersona === persona.id 
                ? `linear-gradient(135deg, ${persona.color}15 0%, ${persona.color}05 100%)`
                : 'rgba(31, 41, 55, 0.5)',
              border: `2px solid ${hoveredPersona === persona.id ? persona.color : 'rgba(75, 85, 99, 0.5)'}`,
              boxShadow: hoveredPersona === persona.id 
                ? `0 10px 40px ${persona.color}20` 
                : '0 4px 20px rgba(0, 0, 0, 0.3)',
              transform: hoveredPersona === persona.id ? 'translateY(-4px)' : 'translateY(0)',
            }}
          >
            {/* Header */}
            <div 
              className="p-4 border-b"
              style={{ 
                borderColor: hoveredPersona === persona.id ? `${persona.color}40` : 'rgba(75, 85, 99, 0.3)',
                background: `${persona.color}10`,
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{persona.icon}</span>
                <h3 
                  className="font-bold text-lg"
                  style={{ color: persona.color }}
                >
                  {persona.title}
                </h3>
              </div>
            </div>

            {/* Tools List */}
            <div className="p-4 space-y-3">
              {persona.tools.map((tool, toolIndex) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 + toolIndex * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div 
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: persona.color }}
                  />
                  <div>
                    <div className="text-white font-medium text-sm">{tool.name}</div>
                    <div className="text-gray-400 text-xs">{tool.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* MCP Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="w-full max-w-4xl"
      >
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-500/30">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <span className="text-2xl">🔌</span>
            </div>
            <div>
              <h4 className="text-purple-400 font-bold text-lg">How to Connect Tools?</h4>
              <p className="text-gray-300 text-sm">Use MCP (Model Context Protocol)</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            A universal standard for connecting agents to external systems. One protocol, many tools.
          </p>
        </div>
      </motion.div>

      {/* Principle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-blue-400 font-semibold text-lg mt-6 text-center"
      >
        Principle: Tools should match your workflow, not the other way around.
      </motion.p>
    </div>
  );
}

