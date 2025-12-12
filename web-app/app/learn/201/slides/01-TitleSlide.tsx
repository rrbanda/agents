'use client';

import { motion } from 'framer-motion';

export default function TitleSlide201() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-8 overflow-hidden relative">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-purple-500/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-6"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight">
          <span className="block text-gray-400 text-2xl md:text-3xl font-medium mb-2 tracking-wide">
            Deep Dive
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
            Building Effective
          </span>
          <br />
          <span className="text-white">Agents</span>
        </h1>
      </motion.div>

      {/* Core question */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-3xl mb-12"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl" />
          <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              From <span className="text-purple-400 font-semibold">architecture patterns</span> to{' '}
              <span className="text-pink-400 font-semibold">production-ready systems</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Topics grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl"
      >
        {[
          { icon: '🧠', title: 'Reasoning', subtitle: 'Planning & Memory' },
          { icon: '🔧', title: 'Tools', subtitle: 'MCP & Skills' },
          { icon: '🤝', title: 'Multi-Agent', subtitle: 'Orchestration' },
          { icon: '🛡️', title: 'Production', subtitle: 'Safety & Resilience' },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
            className="group relative px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />
            <div className="relative">
              <span className="text-3xl mb-2 block">{item.icon}</span>
              <h3 className="text-white font-semibold">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-gray-500"
        >
          <span className="text-xs">Press → to begin</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
