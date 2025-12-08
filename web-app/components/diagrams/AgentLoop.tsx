'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const phases = [
  { id: 'gather', label: 'Gather Context', color: '#3b82f6', icon: '🔍' },
  { id: 'act', label: 'Take Action', color: '#10b981', icon: '⚡' },
  { id: 'verify', label: 'Verify Work', color: '#f59e0b', icon: '✓' },
];

const personaExamples = [
  {
    persona: 'SysAdmin',
    gather: 'Logs from 50 servers',
    act: 'Analyze, suggest fixes',
    verify: 'Check if fixes work',
  },
  {
    persona: 'DevOps',
    gather: 'Pipeline logs, metrics',
    act: 'Debug, deploy',
    verify: 'Verify deployment',
  },
  {
    persona: 'Developer',
    gather: 'Codebase structure',
    act: 'Explain, write code',
    verify: 'Run tests',
  },
  {
    persona: 'Platform Engineer',
    gather: 'Infrastructure state',
    act: 'Provision, configure',
    verify: 'Validate compliance',
  },
];

interface AgentLoopProps {
  selectedPersona?: string;
}

// Simple Arrow Component
const Arrow = ({ color = '#6b7280' }: { color?: string }) => (
  <div className="flex items-center justify-center px-2">
    <div
      className="w-8 h-1 rounded-full"
      style={{ backgroundColor: color }}
    />
    <div
      className="w-0 h-0 -ml-1"
      style={{
        borderTop: '6px solid transparent',
        borderBottom: '6px solid transparent',
        borderLeft: `10px solid ${color}`,
      }}
    />
  </div>
);

export default function AgentLoop({ selectedPersona }: AgentLoopProps) {
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);

  const getPersonaExample = () => {
    if (selectedPersona === 'sysadmin') return personaExamples[0];
    if (selectedPersona === 'devops') return personaExamples[1];
    if (selectedPersona === 'developer') return personaExamples[2];
    if (selectedPersona === 'platform') return personaExamples[3];
    return null;
  };

  const example = getPersonaExample();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      {/* Flow Diagram - Horizontal Layout */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.id}
            className="flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.2 }}
          >
            {/* Phase Box */}
            <motion.div
              className="flex flex-col items-center gap-2 px-6 py-4 rounded-xl cursor-pointer transition-all duration-300"
              style={{
                backgroundColor: hoveredPhase === phase.id ? `${phase.color}20` : 'rgba(75, 85, 99, 0.3)',
                border: `2px solid ${hoveredPhase === phase.id ? phase.color : 'rgba(75, 85, 99, 0.5)'}`,
                boxShadow: hoveredPhase === phase.id ? `0 0 20px ${phase.color}40` : 'none',
              }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredPhase(phase.id)}
              onHoverEnd={() => setHoveredPhase(null)}
            >
              <div className="text-2xl">{phase.icon}</div>
              <div
                className="text-sm md:text-base font-semibold text-center whitespace-nowrap"
                style={{ color: hoveredPhase === phase.id ? phase.color : '#e5e7eb' }}
              >
                {phase.label}
              </div>
            </motion.div>

            {/* Arrow to next phase */}
            {index < phases.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.2 }}
              >
                <Arrow color={phase.color} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Repeat Loop Indicator */}
      <motion.div
        className="flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-3xl">↻</span>
          <span className="text-red-400 font-bold text-xl">Repeat</span>
        </div>
        <p className="text-gray-500 text-sm">Verify → Gather Context (loop)</p>
      </motion.div>

      {/* Persona Examples */}
      {example && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="w-full max-w-2xl bg-gray-800/50 p-6 rounded-lg border border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-4 text-blue-400">
            {example.persona} Example
          </h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-400 mb-1 flex items-center gap-2">
                <span>🔍</span> Gather
              </div>
              <div className="text-white">{example.gather}</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1 flex items-center gap-2">
                <span>⚡</span> Act
              </div>
              <div className="text-white">{example.act}</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1 flex items-center gap-2">
                <span>✓</span> Verify
              </div>
              <div className="text-white">{example.verify}</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
