'use client';

import { motion } from 'framer-motion';

export default function TitleSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 overflow-hidden">
      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-4"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight tracking-tight">
          Agentic AI
        </h1>
      </motion.div>
      
      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-light text-gray-300">
          From Automation to Autonomy
        </h2>
      </motion.div>

      {/* Simple Explanation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="max-w-3xl mb-8"
      >
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
            What happens when AI stops just <span className="text-blue-400 font-semibold">answering questions</span> and starts <span className="text-green-400 font-semibold">taking action</span> to help you get work done?
          </p>
        </div>
      </motion.div>

      {/* What You'll Learn */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex flex-wrap justify-center gap-4"
      >
        {[
          { icon: '📖', text: 'The evolution of AI' },
          { icon: '🤖', text: 'What agents are' },
          { icon: '⚙️', text: 'How they work' },
          { icon: '💼', text: 'How they help you' },
        ].map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/30 rounded-lg border border-gray-700/30"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-gray-300 text-sm">{item.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
