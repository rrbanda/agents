'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';

export default function ReasoningSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Era Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <span className="text-xs font-mono text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
          STAGE 3 • Since 2022
        </span>
      </motion.div>

      {/* Title */}
      <LineReveal delay={0.1}>
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🧠</div>
          <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
            Reasoning
          </h2>
          <p className="text-gray-400 italic">
            The breakthrough: AI learned to think step-by-step
          </p>
        </div>
      </LineReveal>

      {/* The Discovery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-4xl bg-green-500/10 rounded-xl p-5 border border-green-500/30 mb-6"
      >
        <h3 className="text-green-400 font-bold mb-3 flex items-center gap-2">
          <span>💡</span> The Discovery
        </h3>
        <p className="text-gray-300 mb-3">
          Researchers found something surprising: if you just ask AI to <span className="text-green-400 font-semibold">"think step by step"</span>, 
          it actually does better at complex problems.
        </p>
        <p className="text-gray-400 text-sm">
          Instead of jumping to an answer, it breaks down the problem and works through it logically.
        </p>
      </motion.div>

      {/* Before vs After Example */}
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-4 mb-6">
        {/* Before */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50"
        >
          <h4 className="text-gray-400 text-xs uppercase tracking-wide mb-3">❌ Before (just guessing)</h4>
          <div className="bg-gray-900 rounded-lg p-3">
            <p className="text-gray-400 text-sm mb-2"><strong>Question:</strong> "A bat and ball cost $1.10. The bat costs $1 more than the ball. How much is the ball?"</p>
            <p className="text-red-400 text-sm"><strong>AI:</strong> "$0.10" <span className="text-gray-500">(wrong! common trap)</span></p>
          </div>
        </motion.div>

        {/* After */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/50 rounded-xl p-4 border border-green-500/30"
        >
          <h4 className="text-green-400 text-xs uppercase tracking-wide mb-3">✓ After (thinking step-by-step)</h4>
          <div className="bg-gray-900 rounded-lg p-3">
            <p className="text-gray-400 text-sm mb-2"><strong>AI:</strong> "Let me think..."</p>
            <p className="text-gray-300 text-xs">• Let ball = x, bat = x + $1</p>
            <p className="text-gray-300 text-xs">• x + (x + 1) = 1.10</p>
            <p className="text-gray-300 text-xs">• 2x = 0.10, so x = <span className="text-green-400">$0.05</span></p>
            <p className="text-green-400 text-sm mt-2"><strong>Answer:</strong> "$0.05" <span className="text-gray-500">(correct!)</span></p>
          </div>
        </motion.div>
      </div>

      {/* What This Enabled */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-4xl"
      >
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: '🔍', title: 'Planning', desc: 'Break complex tasks into steps' },
            { icon: '✓', title: 'Verification', desc: 'Check its own work' },
            { icon: '🔄', title: 'Self-correction', desc: 'Fix mistakes when found' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="bg-gray-800/30 rounded-lg p-3 text-center"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-white font-semibold text-sm">{item.title}</div>
              <div className="text-gray-400 text-xs">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Takeaway */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-center"
      >
        <p className="text-lg text-gray-300">
          This was the spark: <span className="text-green-400 font-semibold">AI could now reason, not just predict.</span>
        </p>
      </motion.div>
    </div>
  );
}
