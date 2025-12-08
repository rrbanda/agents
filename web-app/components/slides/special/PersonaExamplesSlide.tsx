'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import LineReveal from '../../animations/LineReveal';

const personas = [
  {
    id: 'sysadmin',
    name: 'System Administrator',
    icon: '🖥️',
    color: '#3b82f6',
    steps: [
      { phase: 'Gather', icon: '🔍', action: 'Logs from 50 servers' },
      { phase: 'Act', icon: '⚡', action: 'Identify anomalies, suggest fixes' },
      { phase: 'Verify', icon: '✓', action: 'Check if suggestions work' },
    ],
    timeBefore: '2 hours',
    timeAfter: '15 minutes',
    savings: '87%',
  },
  {
    id: 'devops',
    name: 'DevOps Engineer',
    icon: '🔧',
    color: '#10b981',
    steps: [
      { phase: 'Gather', icon: '🔍', action: 'Pipeline logs, service metrics' },
      { phase: 'Act', icon: '⚡', action: 'Debug failures, suggest fixes' },
      { phase: 'Verify', icon: '✓', action: 'Test deployment' },
    ],
    timeBefore: '30 minutes',
    timeAfter: '5 minutes',
    savings: '83%',
  },
  {
    id: 'developer',
    name: 'Software Developer',
    icon: '👨‍💻',
    color: '#f59e0b',
    steps: [
      { phase: 'Gather', icon: '🔍', action: 'Codebase structure, docs' },
      { phase: 'Act', icon: '⚡', action: 'Answer questions, explain code' },
      { phase: 'Verify', icon: '✓', action: 'Check understanding' },
    ],
    timeBefore: 'Days',
    timeAfter: 'Hours',
    savings: '90%+',
  },
];

export default function PersonaExamplesSlide() {
  const [hoveredPersona, setHoveredPersona] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <LineReveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          How Agents Help in Your Work
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Same pattern, different contexts, real time savings
        </p>
      </LineReveal>

      {/* Three Persona Cards */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-5">
        {personas.map((persona, index) => (
          <motion.div
            key={persona.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
            onHoverStart={() => setHoveredPersona(persona.id)}
            onHoverEnd={() => setHoveredPersona(null)}
            className="rounded-xl overflow-hidden transition-all duration-300"
            style={{
              background: hoveredPersona === persona.id 
                ? `linear-gradient(135deg, ${persona.color}15 0%, rgba(31, 41, 55, 0.9) 100%)`
                : 'rgba(31, 41, 55, 0.5)',
              border: `2px solid ${hoveredPersona === persona.id ? persona.color : 'rgba(75, 85, 99, 0.4)'}`,
              boxShadow: hoveredPersona === persona.id 
                ? `0 10px 40px ${persona.color}25` 
                : '0 4px 20px rgba(0, 0, 0, 0.2)',
              transform: hoveredPersona === persona.id ? 'translateY(-4px)' : 'translateY(0)',
            }}
          >
            {/* Header */}
            <div 
              className="p-4 border-b"
              style={{ 
                borderColor: `${persona.color}30`,
                background: `linear-gradient(135deg, ${persona.color}20 0%, transparent 100%)`,
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{persona.icon}</span>
                <h3 
                  className="font-bold text-base"
                  style={{ color: persona.color }}
                >
                  {persona.name}
                </h3>
              </div>
            </div>

            {/* Steps */}
            <div className="p-4 space-y-2">
              {persona.steps.map((step, stepIndex) => (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 + stepIndex * 0.08 }}
                  className="flex items-start gap-2 p-2 rounded-lg bg-gray-800/30"
                >
                  <span className="text-sm">{step.icon}</span>
                  <div className="flex-1 min-w-0">
                    <span 
                      className="text-xs font-bold"
                      style={{ color: persona.color }}
                    >
                      {step.phase}:
                    </span>
                    <p className="text-gray-300 text-xs">{step.action}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Time Savings */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="p-4 border-t"
              style={{ 
                borderColor: `${persona.color}20`,
                background: `${persona.color}10`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-xs text-gray-500">Before</div>
                  <div className="text-red-400 font-bold text-sm line-through">{persona.timeBefore}</div>
                </div>
                <div className="text-xl">→</div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">After</div>
                  <div className="text-green-400 font-bold text-sm">{persona.timeAfter}</div>
                </div>
                <div 
                  className="px-2 py-1 rounded-lg font-bold text-sm"
                  style={{ 
                    backgroundColor: `${persona.color}30`,
                    color: persona.color,
                  }}
                >
                  -{persona.savings}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-center"
      >
        <p className="text-blue-400 font-semibold text-lg">
          Gather → Act → Verify — The same pattern applies to all technical work.
        </p>
      </motion.div>
    </div>
  );
}

