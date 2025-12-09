'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';

const resources = [
  { name: 'Documentation', icon: '📚', color: '#3b82f6' },
  { name: 'Examples', icon: '💡', color: '#10b981' },
  { name: 'Community', icon: '👥', color: '#f59e0b' },
];

export default function ThankYouSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Animated Check / Success */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="mb-6"
      >
        <div 
          className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
          style={{ boxShadow: '0 0 50px rgba(16, 185, 129, 0.4)' }}
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-5xl text-white"
          >
            ✓
          </motion.span>
        </div>
      </motion.div>

      {/* Title */}
      <LineReveal delay={0.4}>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center">
          Thank You!
        </h2>
        <h3 className="text-xl md:text-2xl text-gray-400 mb-8 text-center">
          
        </h3>
      </LineReveal>

      {/* Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <p className="text-gray-500 text-sm text-center mb-4">Resources to continue your journey:</p>
        <div className="flex gap-6 justify-center">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300"
              style={{
                backgroundColor: `${resource.color}10`,
                border: `1px solid ${resource.color}30`,
              }}
            >
              <span className="text-3xl">{resource.icon}</span>
              <span className="text-sm font-medium" style={{ color: resource.color }}>
                {resource.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Final Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center max-w-2xl"
      >
        <div className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-blue-500/30 mb-6">
          <p className="text-white text-xl font-semibold mb-2">
            Your journey with agents starts now.
          </p>
          <p className="text-gray-400">
            Start simple. Learn by doing. Build something amazing.
          </p>
        </div>

        {/* Animated Sparkles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center gap-2 text-2xl"
        >
          {['✨', '🚀', '🤖', '🚀', '✨'].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                delay: i * 0.2,
                ease: 'easeInOut'
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

