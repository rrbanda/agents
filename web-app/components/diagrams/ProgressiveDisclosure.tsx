'use client';

import { motion } from 'framer-motion';

const levels = [
  {
    level: 1,
    name: 'Metadata',
    description: 'Name, Description',
    when: 'Loaded at startup',
    size: 'small',
    color: '#60a5fa',
  },
  {
    level: 2,
    name: 'Content',
    description: 'Instructions',
    when: 'Loaded when relevant',
    size: 'medium',
    color: '#3b82f6',
  },
  {
    level: 3,
    name: 'Deep Dive',
    description: 'Specific Files',
    when: 'Loaded only when needed',
    size: 'large',
    color: '#1e40af',
  },
];

export default function ProgressiveDisclosure() {
  return (
    <div className="w-full h-full flex items-center justify-center py-8">
      <div className="w-full max-w-4xl px-8">
        {/* Pyramid */}
        <div className="flex flex-col items-center mb-8">
          {levels.map((level, index) => (
            <motion.div
              key={level.level}
              className={`w-full mb-2 rounded-lg border-l-4 p-4`}
              style={{
                borderColor: level.color,
                backgroundColor: `${level.color}20`,
                width: `${100 - index * 25}%`,
              }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.3 + index * 0.2,
                type: 'spring',
                stiffness: 200,
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className="text-lg font-semibold mb-1"
                    style={{ color: level.color }}
                  >
                    Level {level.level}: {level.name}
                  </h3>
                  <p className="text-sm text-gray-300">{level.description}</p>
                </div>
                <div className="text-xs text-gray-400 text-right">
                  {level.when}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Metrics */}
        <motion.div
          className="grid grid-cols-2 gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Token Usage</div>
            <div className="text-lg font-semibold text-white">
              High → Medium → Low
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Detail Level</div>
            <div className="text-lg font-semibold text-white">
              Low → Medium → High
            </div>
          </div>
        </motion.div>

        {/* Key Insight */}
        <motion.div
          className="mt-6 text-center text-lg text-blue-400 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Load only what's needed, when it's needed.
        </motion.div>
      </div>
    </div>
  );
}

