'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import LineReveal from '../../animations/LineReveal';

const phases = [
  {
    id: 'gather',
    name: 'Gather Context',
    icon: '🔍',
    color: '#3b82f6',
    examples: [
      { persona: 'SysAdmin', action: 'Read logs, check metrics' },
      { persona: 'DevOps', action: 'Read pipeline logs, check configs' },
      { persona: 'Developer', action: 'Read code, check documentation' },
    ],
  },
  {
    id: 'act',
    name: 'Take Action',
    icon: '⚡',
    color: '#10b981',
    examples: [
      { persona: 'SysAdmin', action: 'Analyze patterns, suggest fixes' },
      { persona: 'DevOps', action: 'Debug issues, deploy changes' },
      { persona: 'Developer', action: 'Explain logic, write code' },
    ],
  },
  {
    id: 'verify',
    name: 'Verify Work',
    icon: '✓',
    color: '#f59e0b',
    examples: [
      { persona: 'SysAdmin', action: 'Check if fixes resolved issue' },
      { persona: 'DevOps', action: 'Verify deployment succeeded' },
      { persona: 'Developer', action: 'Run tests, validate output' },
    ],
  },
];

const personaColors: Record<string, string> = {
  'SysAdmin': '#3b82f6',
  'DevOps': '#10b981',
  'Developer': '#f59e0b',
};

const personaIcons: Record<string, string> = {
  'SysAdmin': '🖥️',
  'DevOps': '🔧',
  'Developer': '👨‍💻',
};

export default function AgentLoopPracticeSlide() {
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <LineReveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          The Agent Loop in Practice
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Same pattern, different tools
        </p>
      </LineReveal>

      {/* Three Phase Cards */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
            onHoverStart={() => setHoveredPhase(phase.id)}
            onHoverEnd={() => setHoveredPhase(null)}
            className="rounded-xl overflow-hidden transition-all duration-300"
            style={{
              background: hoveredPhase === phase.id 
                ? `linear-gradient(135deg, ${phase.color}20 0%, ${phase.color}05 100%)`
                : 'rgba(31, 41, 55, 0.5)',
              border: `2px solid ${hoveredPhase === phase.id ? phase.color : 'rgba(75, 85, 99, 0.5)'}`,
              boxShadow: hoveredPhase === phase.id 
                ? `0 10px 40px ${phase.color}30` 
                : '0 4px 20px rgba(0, 0, 0, 0.3)',
              transform: hoveredPhase === phase.id ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
            }}
          >
            {/* Phase Header */}
            <div 
              className="p-4 text-center"
              style={{ 
                background: `linear-gradient(135deg, ${phase.color}30 0%, ${phase.color}10 100%)`,
                borderBottom: `1px solid ${phase.color}30`,
              }}
            >
              <span className="text-3xl mb-2 block">{phase.icon}</span>
              <h3 
                className="font-bold text-xl"
                style={{ color: phase.color }}
              >
                {phase.name}
              </h3>
            </div>

            {/* Persona Examples */}
            <div className="p-4 space-y-3">
              {phase.examples.map((example, exIndex) => (
                <motion.div
                  key={example.persona}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 + exIndex * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-lg transition-colors duration-200"
                  style={{
                    background: hoveredPhase === phase.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                  }}
                >
                  <span className="text-lg flex-shrink-0">{personaIcons[example.persona]}</span>
                  <div className="flex-1 min-w-0">
                    <div 
                      className="font-semibold text-sm"
                      style={{ color: personaColors[example.persona] }}
                    >
                      {example.persona}
                    </div>
                    <div className="text-gray-300 text-sm">{example.action}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Flow Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center justify-center gap-4 mb-6"
      >
        {phases.map((phase, index) => (
          <div key={phase.id} className="flex items-center gap-4">
            <div 
              className="px-4 py-2 rounded-lg font-semibold text-sm"
              style={{ 
                backgroundColor: `${phase.color}20`,
                color: phase.color,
                border: `1px solid ${phase.color}40`,
              }}
            >
              {phase.name}
            </div>
            {index < phases.length - 1 && (
              <div className="text-gray-500 text-xl">→</div>
            )}
          </div>
        ))}
        <div className="text-gray-500 text-xl">→</div>
        <div className="text-red-400 font-bold flex items-center gap-2">
          <span className="text-xl">↻</span> Repeat
        </div>
      </motion.div>

      {/* Key Insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-blue-400 font-semibold text-lg text-center"
      >
        The pattern is universal — only the tools and context change.
      </motion.p>
    </div>
  );
}

