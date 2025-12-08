'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';

const levels = [
  {
    level: 1,
    name: 'Metadata',
    description: 'Name, Description',
    when: 'Loaded at startup',
    color: '#60a5fa',
    tokens: 'Low',
  },
  {
    level: 2,
    name: 'Content',
    description: 'Instructions',
    when: 'Loaded when relevant',
    color: '#3b82f6',
    tokens: 'Medium',
  },
  {
    level: 3,
    name: 'Deep Dive',
    description: 'Specific Files',
    when: 'Loaded only when needed',
    color: '#1d4ed8',
    tokens: 'High',
  },
];

export default function ProgressiveDisclosureSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Title */}
      <LineReveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Progressive Disclosure
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Load only what's needed, when it's needed
        </p>
      </LineReveal>

      {/* Main Content */}
      <div className="w-full max-w-5xl flex gap-8 items-start">
        {/* Left: Pyramid Diagram */}
        <div className="flex-1">
          <div className="flex flex-col items-start gap-3">
            {levels.map((level, index) => (
              <motion.div
                key={level.level}
                className="rounded-xl border-l-4 p-4 w-full"
                style={{
                  borderColor: level.color,
                  backgroundColor: `${level.color}15`,
                  maxWidth: `${100 - index * 15}%`,
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.3 + index * 0.15,
                  duration: 0.5,
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3
                      className="text-base md:text-lg font-bold"
                      style={{ color: level.color }}
                    >
                      Level {level.level}: {level.name}
                    </h3>
                    <p className="text-sm text-gray-300">{level.description}</p>
                  </div>
                  <div className="text-xs text-gray-500 text-right whitespace-nowrap">
                    {level.when}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Key Points */}
        <motion.div
          className="w-80 space-y-4"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          {/* Problem */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h4 className="text-red-400 font-bold text-sm mb-2">Problem</h4>
            <p className="text-gray-300 text-sm">
              Agents need context, but context is expensive (tokens).
            </p>
          </div>

          {/* Solution */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h4 className="text-green-400 font-bold text-sm mb-2">Solution</h4>
            <p className="text-gray-300 text-sm">
              Load progressively - start small, expand as needed.
            </p>
          </div>

          {/* Trade-off */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500 text-xs mb-1">Token Usage</div>
                <div className="text-white font-semibold">Low → High</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs mb-1">Detail Level</div>
                <div className="text-white font-semibold">Low → High</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Tagline */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-blue-400 font-semibold text-lg">
          Start with metadata → Load content when relevant → Deep dive only when needed
        </p>
      </motion.div>
    </div>
  );
}

