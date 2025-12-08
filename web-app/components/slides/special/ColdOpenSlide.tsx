'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';

const milestones = [
  {
    time: 'Ten years ago',
    achievement: 'Machines learned to see',
    example: 'Photo apps could recognize faces',
    icon: '👁️',
    color: '#6b7280',
  },
  {
    time: 'Five years ago',
    achievement: 'They learned to speak',
    example: 'Voice assistants could understand us',
    icon: '🗣️',
    color: '#3b82f6',
  },
  {
    time: 'Two years ago',
    achievement: 'They learned to reason',
    example: 'ChatGPT could have real conversations',
    icon: '🧠',
    color: '#10b981',
  },
];

export default function ColdOpenSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <div className="text-center mb-8">
        <LineReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            The Story So Far
          </h2>
          <p className="text-gray-400">
            A quick look at how AI evolved
          </p>
        </LineReveal>
      </div>

      {/* Timeline of Milestones */}
      <div className="w-full max-w-4xl space-y-4 mb-8">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.time}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.2 }}
            className="flex items-center gap-4"
          >
            {/* Icon */}
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
              style={{ 
                backgroundColor: `${milestone.color}20`,
                border: `2px solid ${milestone.color}`,
              }}
            >
              {milestone.icon}
            </div>

            {/* Content */}
            <div 
              className="flex-1 bg-gray-800/50 rounded-xl p-4 border-l-4"
              style={{ borderColor: milestone.color }}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-white font-bold">{milestone.time}</span>
                <span className="text-gray-400">—</span>
                <span style={{ color: milestone.color }} className="font-semibold">
                  {milestone.achievement}
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Example: {milestone.example}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* The Limitation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="w-full max-w-4xl mb-6"
      >
        <div className="bg-amber-500/10 rounded-xl p-5 border border-amber-500/30">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="text-amber-400 font-bold mb-2">But here's the thing...</h3>
              <p className="text-gray-300 mb-2">
                All these AI systems have one thing in common: <span className="text-amber-400 font-semibold">they only react</span>.
              </p>
              <p className="text-gray-400 text-sm">
                You ask a question → they give an answer. You give a command → they respond. 
                <br />They wait for you to tell them what to do. Every. Single. Time.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* The Big Questions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="text-center space-y-3"
      >
        <p className="text-xl md:text-2xl text-white font-bold">
          What if AI could <span className="text-blue-400">take initiative</span>?
        </p>
        <p className="text-xl md:text-2xl text-white font-bold">
          What if it could <span className="text-green-400">work toward a goal</span> on its own?
        </p>
      </motion.div>
    </div>
  );
}
