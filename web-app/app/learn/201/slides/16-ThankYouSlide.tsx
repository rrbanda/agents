'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ThankYouSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-start pt-14 px-8 overflow-hidden relative">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981'][Math.floor(Math.random() * 4)] + '40',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        {/* Completion badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xl"
            >
              ✓
            </motion.span>
            <span className="text-green-400 text-sm font-bold tracking-wide">
              COURSE COMPLETE
            </span>
          </div>
        </motion.div>

        {/* Thank you */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold text-white mb-4"
        >
          Thank You!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl text-gray-400 mb-8"
        >
          You've completed Agentic AI 201
        </motion.p>

        {/* What you learned summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl"
        >
          {[
            { icon: '🏗️', label: 'Architecture' },
            { icon: '🔧', label: 'Tool Design' },
            { icon: '🔌', label: 'MCP' },
            { icon: '📚', label: 'RAG Patterns' },
            { icon: '🧠', label: 'Context' },
            { icon: '👥', label: 'Multi-Agent' },
            { icon: '⏱️', label: 'Long-Running' },
            { icon: '🛡️', label: 'Security' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50"
            >
              <span className="mr-2">{item.icon}</span>
              <span className="text-gray-300 text-sm">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link href="/learn">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-500/20"
            >
              Back to Learn
            </motion.button>
          </Link>
          <Link href="/presentation">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-gray-800/50 text-gray-300 font-medium border border-gray-700/50 hover:border-gray-600"
            >
              Review 101
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 text-sm"
      >
        <span className="flex items-center gap-2">
          <span className="text-purple-400">✦</span>
          Keep building, keep learning
          <span className="text-purple-400">✦</span>
        </span>
      </motion.div>

      {/* Background gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          top: '20%',
          left: '10%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
          bottom: '10%',
          right: '15%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

