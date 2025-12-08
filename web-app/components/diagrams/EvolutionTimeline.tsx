'use client';

import { motion } from 'framer-motion';

const stages = [
  {
    id: 'llms',
    label: 'Language Models',
    years: '2017-2020',
    characteristics: ['Statistical prediction', 'Single-turn responses'],
    summary: 'Machines that talk',
    color: '#9ca3af',
  },
  {
    id: 'assistants',
    label: 'Assistants',
    years: '2020-2022',
    characteristics: ['Reactive helpers', 'Multi-turn conversations'],
    summary: 'Machines that remember',
    color: '#3b82f6',
  },
  {
    id: 'reasoning',
    label: 'Reasoning',
    years: '2022-2023',
    characteristics: ['Chain-of-thought', 'Self-reflection'],
    summary: 'Machines that think',
    color: '#10b981',
  },
  {
    id: 'agents',
    label: 'Agents',
    years: '2023-Present',
    characteristics: ['Memory + Tools + Goals', 'Autonomous action'],
    summary: 'Machines that act',
    color: '#f59e0b',
  },
];

export default function EvolutionTimeline() {
  return (
    <div className="w-full h-full flex items-center justify-center py-8">
      <div className="w-full max-w-6xl px-8">
        {/* Timeline Line */}
        <div className="relative h-2 bg-gray-800 mb-12">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-600 via-blue-500 via-green-500 to-yellow-500"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </div>

        {/* Stages */}
        <div className="grid grid-cols-4 gap-4">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.2 }}
              className="text-center"
            >
              {/* Years */}
              <motion.div
                className="text-xs text-gray-400 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.2 }}
              >
                {stage.years}
              </motion.div>

              {/* Stage Box */}
              <motion.div
                className={`p-4 rounded-lg border-2 mb-3`}
                style={{
                  borderColor: stage.color,
                  backgroundColor: `${stage.color}20`,
                }}
                whileHover={{ scale: 1.05, borderColor: stage.color }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.h3
                  className="text-lg font-bold mb-2"
                  style={{ color: stage.color }}
                >
                  {stage.label}
                </motion.h3>

                {/* Characteristics */}
                <ul className="text-sm text-gray-300 space-y-1 mb-2">
                  {stage.characteristics.map((char, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + index * 0.2 + i * 0.1 }}
                    >
                      • {char}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Summary */}
              <motion.div
                className={`text-sm font-semibold italic`}
                style={{ color: stage.color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 + index * 0.2 }}
              >
                {stage.summary}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Journey Statement */}
        <motion.div
          className="text-center mt-8 text-xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="font-semibold">The Journey:</span> From answering
          questions to achieving goals.
        </motion.div>
      </div>
    </div>
  );
}

