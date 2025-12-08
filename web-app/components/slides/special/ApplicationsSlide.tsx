'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import LineReveal from '../../animations/LineReveal';

const applications = [
  {
    id: 'sysadmin',
    title: 'System Administration',
    icon: '🖥️',
    color: '#3b82f6',
    items: [
      { emoji: '📊', text: 'Autonomous log monitoring' },
      { emoji: '🔮', text: 'Predictive incident prevention' },
      { emoji: '📝', text: 'Automated documentation' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: '🔧',
    color: '#10b981',
    items: [
      { emoji: '🔄', text: 'Self-healing deployments' },
      { emoji: '⚡', text: 'Intelligent pipeline optimization' },
      { emoji: '🔍', text: 'Proactive issue detection' },
    ],
  },
  {
    id: 'developer',
    title: 'Software Development',
    icon: '👨‍💻',
    color: '#f59e0b',
    items: [
      { emoji: '🧠', text: 'Codebase understanding assistants' },
      { emoji: '🧪', text: 'Automated testing and debugging' },
      { emoji: '🏗️', text: 'Architecture analysis' },
    ],
  },
];

export default function ApplicationsSlide() {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <LineReveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Real-World Applications
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Where this technology is heading
        </p>
      </LineReveal>

      {/* Three Column Layout */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {applications.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
            onHoverStart={() => setHoveredApp(app.id)}
            onHoverEnd={() => setHoveredApp(null)}
            className="rounded-xl overflow-hidden transition-all duration-300"
            style={{
              background: hoveredApp === app.id 
                ? `linear-gradient(135deg, ${app.color}15 0%, rgba(31, 41, 55, 0.9) 100%)`
                : 'rgba(31, 41, 55, 0.5)',
              border: `2px solid ${hoveredApp === app.id ? app.color : 'rgba(75, 85, 99, 0.4)'}`,
              boxShadow: hoveredApp === app.id 
                ? `0 10px 40px ${app.color}25` 
                : '0 4px 20px rgba(0, 0, 0, 0.2)',
              transform: hoveredApp === app.id ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
            }}
          >
            {/* Header */}
            <div 
              className="p-5 border-b"
              style={{ 
                borderColor: hoveredApp === app.id ? `${app.color}40` : 'rgba(75, 85, 99, 0.3)',
                background: `linear-gradient(135deg, ${app.color}20 0%, transparent 100%)`,
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ 
                    backgroundColor: `${app.color}20`,
                    border: `1px solid ${app.color}40`,
                  }}
                >
                  {app.icon}
                </div>
                <h3 
                  className="font-bold text-lg"
                  style={{ color: app.color }}
                >
                  {app.title}
                </h3>
              </div>
            </div>

            {/* Items */}
            <div className="p-5 space-y-4">
              {app.items.map((item, itemIndex) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 + itemIndex * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-lg transition-colors duration-200"
                  style={{
                    background: hoveredApp === app.id ? `${app.color}10` : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${hoveredApp === app.id ? `${app.color}20` : 'transparent'}`,
                  }}
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span className="text-gray-300 text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Future Vision */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-blue-500/30 max-w-3xl"
      >
        <div className="text-center">
          <span className="text-3xl mb-3 block">🚀</span>
          <h4 className="text-white font-bold text-xl mb-2">The Future</h4>
          <p className="text-blue-400 text-lg font-semibold">
            Agents as reliable teammates who handle the heavy lifting
          </p>
          <p className="text-gray-400 text-sm mt-2">
            So you can focus on what matters most — strategy, creativity, and high-value work.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

