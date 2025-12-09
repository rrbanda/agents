'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import LineReveal from '../../animations/LineReveal';

const limitations = [
  {
    id: 1,
    icon: '📅',
    limitation: 'Knowledge Cutoff',
    description: "Models don't know recent events",
    solution: 'Use tools to access current information',
    color: '#3b82f6',
  },
  {
    id: 2,
    icon: '🎭',
    limitation: 'Potential Inaccuracies',
    description: 'Models can "hallucinate" (make up facts)',
    solution: 'Verify important claims with tools',
    color: '#f59e0b',
  },
  {
    id: 3,
    icon: '📏',
    limitation: 'Context Constraints',
    description: 'Limited by context window size',
    solution: 'Use context management techniques',
    color: '#10b981',
  },
  {
    id: 4,
    icon: '🧩',
    limitation: 'Complex Reasoning',
    description: 'Can struggle with very complex logic',
    solution: 'Break into smaller steps',
    color: '#8b5cf6',
  },
];

export default function LimitationsSlide() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-start pt-4 p-6 overflow-hidden">
      {/* Title */}
      <LineReveal delay={0.1}>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 text-center">
          Current Limitations
        </h2>
        <p className="text-gray-400 text-center text-sm mb-4">
          An honest assessment — every limitation has a solution
        </p>
      </LineReveal>

      {/* Four Limitation Cards - 2x2 Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 flex-1 min-h-0">
        {limitations.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            onHoverStart={() => setHoveredItem(item.id)}
            onHoverEnd={() => setHoveredItem(null)}
            className="rounded-xl overflow-hidden transition-all duration-300"
            style={{
              background: hoveredItem === item.id 
                ? `linear-gradient(135deg, ${item.color}15 0%, rgba(31, 41, 55, 0.9) 100%)`
                : 'rgba(31, 41, 55, 0.5)',
              border: `2px solid ${hoveredItem === item.id ? item.color : 'rgba(75, 85, 99, 0.4)'}`,
              boxShadow: hoveredItem === item.id 
                ? `0 10px 40px ${item.color}20` 
                : '0 4px 20px rgba(0, 0, 0, 0.2)',
              transform: hoveredItem === item.id ? 'translateY(-4px)' : 'translateY(0)',
            }}
          >
            <div className="p-3">
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                  style={{ 
                    backgroundColor: `${item.color}20`,
                    border: `1px solid ${item.color}40`,
                  }}
                >
                  {item.icon}
                </div>
                <h3 
                  className="font-bold text-sm"
                  style={{ color: item.color }}
                >
                  {item.limitation}
                </h3>
              </div>

              {/* Limitation */}
              <div className="mb-2">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-red-400 text-xs">⚠️ Limitation:</span>
                </div>
                <p className="text-gray-300 text-xs pl-4">{item.description}</p>
              </div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-green-500/10 rounded-lg p-2 border border-green-500/20"
              >
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-green-400 text-xs">✓ Solution:</span>
                </div>
                <p className="text-gray-300 text-xs pl-4">{item.solution}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-xl p-3 border border-amber-500/30 max-w-xl"
      >
        <div className="text-center">
          <p className="text-amber-400 text-base font-bold">
            Agents are powerful, but not magic.
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Understanding limitations helps you use them effectively.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

