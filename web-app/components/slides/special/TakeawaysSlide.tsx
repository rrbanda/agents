'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import LineReveal from '../../animations/LineReveal';

const takeaways = [
  {
    id: 1,
    title: 'Agents = LLMs + Memory + Tools + Goals',
    icon: '🤖',
    color: '#3b82f6',
    points: [
      'They can act autonomously',
      'They remember past work',
      'They use tools to accomplish tasks',
    ],
  },
  {
    id: 2,
    title: 'The Agent Loop: Gather → Act → Verify',
    icon: '🔄',
    color: '#10b981',
    points: [
      'This pattern applies to all technical work',
      'Same principles, different tools',
      'Repeat until done',
    ],
  },
  {
    id: 3,
    title: 'Start Simple, Learn by Doing',
    icon: '🌱',
    color: '#f59e0b',
    points: [
      "Don't try to solve everything at once",
      'Build up complexity gradually',
      'Measure and iterate',
    ],
  },
  {
    id: 4,
    title: 'Agents Augment, Not Replace',
    icon: '🤝',
    color: '#8b5cf6',
    points: [
      'They enhance human capability',
      'They require good design',
      'They have limitations',
    ],
  },
];

export default function TakeawaysSlide() {
  const [hoveredTakeaway, setHoveredTakeaway] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <LineReveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Key Takeaways
        </h2>
        <p className="text-gray-400 text-center mb-8">
          What to remember from today
        </p>
      </LineReveal>

      {/* Four Takeaways - 2x2 Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-5">
        {takeaways.map((takeaway, index) => (
          <motion.div
            key={takeaway.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            onHoverStart={() => setHoveredTakeaway(takeaway.id)}
            onHoverEnd={() => setHoveredTakeaway(null)}
            className="rounded-xl overflow-hidden transition-all duration-300"
            style={{
              background: hoveredTakeaway === takeaway.id 
                ? `linear-gradient(135deg, ${takeaway.color}15 0%, rgba(31, 41, 55, 0.9) 100%)`
                : 'rgba(31, 41, 55, 0.5)',
              border: `2px solid ${hoveredTakeaway === takeaway.id ? takeaway.color : 'rgba(75, 85, 99, 0.4)'}`,
              boxShadow: hoveredTakeaway === takeaway.id 
                ? `0 10px 40px ${takeaway.color}20` 
                : '0 4px 20px rgba(0, 0, 0, 0.2)',
              transform: hoveredTakeaway === takeaway.id ? 'translateY(-4px)' : 'translateY(0)',
            }}
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold"
                  style={{ 
                    backgroundColor: `${takeaway.color}20`,
                    border: `1px solid ${takeaway.color}40`,
                    color: takeaway.color,
                  }}
                >
                  {takeaway.id}
                </div>
                <div className="flex-1">
                  <span className="text-2xl mr-2">{takeaway.icon}</span>
                  <h3 
                    className="font-bold text-base inline"
                    style={{ color: takeaway.color }}
                  >
                    {takeaway.title}
                  </h3>
                </div>
              </div>

              {/* Points */}
              <div className="space-y-2 pl-2">
                {takeaway.points.map((point, pointIndex) => (
                  <motion.div
                    key={pointIndex}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 + pointIndex * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <div 
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: takeaway.color }}
                    />
                    <span className="text-gray-300 text-sm">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center"
      >
        <p className="text-blue-400 font-semibold text-lg">
          Remember these four principles and you&apos;re ready to start.
        </p>
      </motion.div>
    </div>
  );
}

