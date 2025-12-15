'use client';

import { motion } from 'framer-motion';

const takeaways = [
  {
    number: '1',
    title: 'Planning & Reasoning',
    summary: 'Chain-of-thought → Tree of Thoughts → Graph reasoning for complex decisions.',
    icon: '🧠',
    color: '#f59e0b',
  },
  {
    number: '2',
    title: 'Architecture Patterns',
    summary: 'Chaining, routing, parallelization, orchestrator-workers, evaluators.',
    icon: '🏗️',
    color: '#8b5cf6',
  },
  {
    number: '3',
    title: 'Tools & MCP',
    summary: 'Design for agents (not just APIs). MCP for universal integrations.',
    icon: '🔧',
    color: '#3b82f6',
  },
  {
    number: '4',
    title: 'Context & Memory',
    summary: 'Progressive disclosure, compaction, short/long-term memory systems.',
    icon: '💾',
    color: '#ec4899',
  },
  {
    number: '5',
    title: 'Evaluation',
    summary: 'Task success, efficiency, reliability, safety — measure everything.',
    icon: '📊',
    color: '#10b981',
  },
  {
    number: '6',
    title: 'Error Handling',
    summary: 'Circuit breakers, saga patterns, checkpointing for production resilience.',
    icon: '🔄',
    color: '#06b6d4',
  },
  {
    number: '7',
    title: 'Human-in-the-Loop',
    summary: 'Calibrate autonomy levels: supervised → trusted → collaborative → advisory.',
    icon: '👤',
    color: '#f97316',
  },
  {
    number: '8',
    title: 'Security & Safety',
    summary: 'Defense in depth: guardrails, permissions, red teaming, sandboxing.',
    icon: '🛡️',
    color: '#ef4444',
  },
];

export default function TakeawaysSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
          Summary
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Key Takeaways
        </h2>
        <p className="text-gray-400">
          What you've learned in 201
        </p>
      </motion.div>

      {/* Takeaways grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl w-full"
      >
        {takeaways.map((takeaway, index) => (
          <motion.div
            key={takeaway.number}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative"
          >
            {/* Card glow on hover */}
            <div 
              className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
              style={{ backgroundColor: `${takeaway.color}30` }}
            />

            {/* Card */}
            <div
              className="relative rounded-xl p-5 border transition-all duration-300 h-full"
              style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              {/* Number badge */}
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                  style={{ 
                    backgroundColor: `${takeaway.color}20`,
                    color: takeaway.color,
                  }}
                >
                  {takeaway.number}
                </div>
                <span className="text-2xl">{takeaway.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-300 transition-colors">
                {takeaway.title}
              </h3>

              {/* Summary */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {takeaway.summary}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8"
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl blur-xl" />
          <div className="relative px-8 py-4 rounded-xl bg-gray-900/80 border border-purple-500/30">
            <p className="text-gray-300 text-center">
              <span className="text-2xl mr-2">🚀</span>
              <span className="text-white font-medium">Next:</span>{' '}
              Start building! Apply these patterns to your own problems.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Progression hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 text-gray-500 text-sm"
      >
        Ready for more? Check out 301: Production AI Systems
      </motion.p>
    </div>
  );
}

