'use client';

import { motion } from 'framer-motion';

export default function TitleSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 overflow-hidden relative">
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
        className="flex flex-wrap justify-center gap-4 mb-12"
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

      {/* Navigation Hint - Animated Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-500/30 backdrop-blur-sm"
        >
          <span className="text-gray-300 text-sm font-medium">Press</span>
          <kbd className="px-2 py-1 bg-gray-800 rounded text-blue-400 font-mono text-sm border border-gray-700">→</kbd>
          <span className="text-gray-300 text-sm font-medium">to begin</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-blue-400 text-xl"
          >
            →
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Keyboard hints */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 text-xs text-gray-500"
      >
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-gray-800/50 rounded text-[10px] border border-gray-700/50">←</kbd>
          <kbd className="px-1.5 py-0.5 bg-gray-800/50 rounded text-[10px] border border-gray-700/50">→</kbd>
          Navigate
        </span>
        <span className="text-gray-700">|</span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-gray-800/50 rounded text-[10px] border border-gray-700/50">P</kbd>
          Presenter
        </span>
      </motion.div>

      {/* Right edge arrow indicator */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute right-6 top-1/2 transform -translate-y-1/2"
      >
        <motion.div
          animate={{ x: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
