'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const practices = [
  {
    id: 'simplicity',
    icon: '🎯',
    title: 'Start Simple',
    principle: 'Agentic systems trade latency and cost for performance. Use them only when necessary.',
    details: [
      'Don\'t default to agents — try simpler solutions first',
      'Add complexity incrementally',
      'Measure before and after',
    ],
    color: '#3b82f6',
  },
  {
    id: 'frameworks',
    icon: '🛠️',
    title: 'Be Framework-Agnostic',
    principle: 'The core patterns matter more than any specific framework.',
    details: [
      'Same patterns work across all agent frameworks',
      'Focus on concepts, not library APIs',
      'Build what you understand, compose what you don\'t',
    ],
    color: '#8b5cf6',
  },
  {
    id: 'testing',
    icon: '🧪',
    title: 'Test-Driven Development',
    principle: 'Systematic testing beats trial-and-error. Define evals before building.',
    details: [
      'Create test cases for core use cases and failure modes',
      'Use automatic scoring with clear metrics',
      'Iterate based on structured evaluation results',
    ],
    color: '#10b981',
  },
  {
    id: 'iteration',
    icon: '🔄',
    title: 'Enable Self-Correction',
    principle: 'The best agents verify their work and can recover from mistakes.',
    details: [
      'Build in verification loops with clear pass/fail signals',
      'Let agents see and evaluate their own output',
      'Design graceful error recovery paths',
    ],
    color: '#14b8a6',
  },
  {
    id: 'guardrails',
    icon: '🛡️',
    title: 'Implement Guardrails',
    principle: 'Autonomy without constraints is dangerous.',
    details: [
      'Set clear boundaries on actions',
      'Require confirmation for risky operations',
      'Monitor and log everything',
    ],
    color: '#f59e0b',
  },
  {
    id: 'tools',
    icon: '🔧',
    title: 'Invest in Tool Quality',
    principle: 'Agents are only as good as the tools they have access to.',
    details: [
      'Design tools for agent ergonomics',
      'Return meaningful, actionable information',
      'Test tools with real agent scenarios',
    ],
    color: '#ec4899',
  },
  {
    id: 'human',
    icon: '👤',
    title: 'Keep Humans in the Loop',
    principle: 'The most effective systems combine AI capability with human judgment.',
    details: [
      'Design for human oversight',
      'Make it easy to intervene',
      'Learn from human corrections',
    ],
    color: '#06b6d4',
  },
  {
    id: 'observe',
    icon: '📊',
    title: 'Build Observability',
    principle: 'You can\'t improve what you can\'t measure. Instrument everything.',
    details: [
      'Log all agent decisions and actions',
      'Track success rates and failure modes',
      'Create feedback loops from production data',
    ],
    color: '#a855f7',
  },
];

export default function BestPracticesSlide() {
  const [expandedPractice, setExpandedPractice] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          Guidelines
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Best Practices
        </h2>
        <p className="text-gray-400">
          Lessons learned from building effective agents
        </p>
      </motion.div>

      {/* Practices grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-6xl w-full auto-rows-fr"
      >
        {practices.map((practice, index) => {
          const isExpanded = expandedPractice === practice.id;
          
          return (
            <motion.div
              key={practice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="relative h-full"
            >
              <motion.button
                onClick={() => setExpandedPractice(isExpanded ? null : practice.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full h-full text-left rounded-xl p-4 border transition-all duration-300 flex flex-col ${
                  isExpanded
                    ? ''
                    : 'border-gray-700/50 hover:border-gray-600'
                }`}
                style={{
                  backgroundColor: isExpanded ? `${practice.color}15` : 'rgba(255,255,255,0.02)',
                  borderColor: isExpanded ? practice.color : undefined,
                  boxShadow: isExpanded ? `0 8px 30px ${practice.color}15` : undefined,
                  minHeight: '140px',
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ 
                      backgroundColor: `${practice.color}20`,
                      border: `1px solid ${practice.color}40`,
                    }}
                  >
                    <span className="text-xl">{practice.icon}</span>
                  </div>
                  <h3
                    className="font-bold text-sm transition-colors"
                    style={{ color: isExpanded ? practice.color : 'white' }}
                  >
                    {practice.title}
                  </h3>
                </div>

                {/* Principle */}
                <p className="text-gray-400 text-xs leading-relaxed mb-2 line-clamp-2 flex-1">
                  {practice.principle}
                </p>

                {/* Expandable details */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 border-t border-gray-700/50">
                    <ul className="space-y-1.5">
                      {practice.details.map((detail, i) => (
                        <li
                          key={i}
                          className="text-xs text-gray-300 flex items-start gap-2"
                        >
                          <span style={{ color: practice.color }} className="mt-0.5">→</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Expand indicator */}
                <div className="absolute top-3 right-3">
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="text-gray-500 text-sm"
                  >
                    ▼
                  </motion.span>
                </div>
              </motion.button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 max-w-2xl text-center"
      >
        <p className="text-gray-400 text-sm">
          <span className="text-white font-medium">Remember:</span> The goal isn't to build the most autonomous agent.
          <br />
          <span className="text-gray-500">It's to solve problems effectively with the right level of automation.</span>
        </p>
      </motion.div>
    </div>
  );
}

