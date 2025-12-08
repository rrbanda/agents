'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';

const commonQuestions = [
  { question: 'How do I get started?', icon: '🚀' },
  { question: 'What tools do I need?', icon: '🛠️' },
  { question: 'How much does it cost?', icon: '💰' },
  { question: 'What are the risks?', icon: '⚠️' },
];

export default function QuestionsSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Big Question Mark Animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="mb-8"
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl"
          style={{ boxShadow: '0 0 60px rgba(139, 92, 246, 0.4)' }}
        >
          <span className="text-7xl text-white font-bold">?</span>
        </div>
      </motion.div>

      {/* Title */}
      <LineReveal delay={0.4}>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          Questions?
        </h2>
        <p className="text-gray-400 text-xl text-center mb-10">
          Let&apos;s discuss what&apos;s on your mind
        </p>
      </LineReveal>

      {/* Common Questions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-2xl"
      >
        <p className="text-gray-500 text-sm text-center mb-4">Common questions we can explore:</p>
        <div className="grid grid-cols-2 gap-4">
          {commonQuestions.map((item, index) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-blue-500/50 transition-colors duration-300"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-gray-300">{item.question}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Invitation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-10 text-center"
      >
        <p className="text-blue-400 font-semibold text-xl">
          We&apos;re here to help — ask anything!
        </p>
      </motion.div>
    </div>
  );
}

