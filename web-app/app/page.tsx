'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const exploreOptions = [
  { id: 'talks', label: 'Talks', icon: '🎤', href: '/talks', desc: 'Presentations & keynotes' },
  { id: 'podcasts', label: 'Podcasts', icon: '🎙️', href: '/podcasts', desc: 'Audio & conversations' },
  { id: 'insights', label: 'Insights', icon: '💡', href: '/insights', desc: 'Articles & deep dives' },
  { id: 'experiments', label: 'Experiments', icon: '⚡', href: '/experiments', desc: 'Demos & prototypes' },
  { id: 'events', label: 'Events', icon: '📅', href: '/events', desc: 'Workshops & meetups' },
  { id: 'newsletter', label: 'Newsletter', icon: '📬', href: '/newsletter', desc: 'Weekly updates' },
];

// Animated team avatars
const teamAvatars = [
  { id: 1, color: 'from-blue-500 to-cyan-500', delay: 0 },
  { id: 2, color: 'from-purple-500 to-pink-500', delay: 0.1 },
  { id: 3, color: 'from-green-500 to-emerald-500', delay: 0.2 },
  { id: 4, color: 'from-orange-500 to-yellow-500', delay: 0.3 },
  { id: 5, color: 'from-red-500 to-rose-500', delay: 0.4 },
];

export default function HomePage() {
  const [showExplore, setShowExplore] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden relative">
      {/* Animated Background Gradient Mesh */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
            top: '-20%',
            left: '-10%',
          }}
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
            top: '40%',
            right: '-5%',
          }}
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
            bottom: '-10%',
            left: '30%',
          }}
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 flex items-center justify-between px-6 md:px-12 py-5"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
        </Link>
        
        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a 
            href="https://linkedin.com/in/rb2021" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500 hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a 
            href="https://github.com/rrbanda" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center px-6 md:px-12 pt-12 md:pt-20 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          {/* Animated Team Avatars */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center mb-8"
          >
            <div className="flex -space-x-3">
              {teamAvatars.map((avatar) => (
                <motion.div
                  key={avatar.id}
                  initial={{ opacity: 0, scale: 0, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.4 + avatar.delay, type: 'spring', stiffness: 200 }}
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatar.color} border-2 border-[#0a0a0f] flex items-center justify-center`}
                >
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: avatar.delay }}
                    className="w-3 h-3 rounded-full bg-white/30"
                  />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, type: 'spring' }}
                className="w-10 h-10 rounded-full bg-white/10 border-2 border-dashed border-white/20 flex items-center justify-center text-white/40 text-xs font-medium"
              >
                +
              </motion.div>
            </div>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            All Things
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed px-4">
            The future isn't coming. It's here.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={() => setShowExplore(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-b from-white/20 to-transparent opacity-40" />
              
              <span className="relative flex items-center gap-2">
                Explore
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            <Link href="/crew">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600/90 to-orange-500/90" />
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-b from-white/20 to-transparent opacity-40" />
                
                <span className="relative flex items-center gap-2">
                  Contributors
                </span>
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Explore Modal */}
        <AnimatePresence>
          {showExplore && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowExplore(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
              
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
              >
                <div className="relative rounded-3xl overflow-hidden">
                  {/* Glass background */}
                  <div className="absolute inset-0 bg-[#12121a]/95 backdrop-blur-xl" />
                  <div className="absolute inset-0 rounded-3xl border border-white/10" />
                  
                  {/* Content */}
                  <div className="relative p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-white">Where to?</h2>
                      <button
                        onClick={() => setShowExplore(false)}
                        className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                    
                    {/* Options */}
                    <div className="space-y-2">
                      {exploreOptions.map((option, index) => (
                        <Link key={option.id} href={option.href} onClick={() => setShowExplore(false)}>
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 4 }}
                            className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white/[0.06] transition-all cursor-pointer"
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                              {option.icon}
                            </div>
                            <div className="flex-1">
                              <div className="text-white font-semibold group-hover:text-blue-300 transition-colors">
                                {option.label}
                              </div>
                              <div className="text-gray-500 text-sm">{option.desc}</div>
                            </div>
                            <span className="text-gray-600 group-hover:text-white transition-colors">→</span>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Footer tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 text-gray-700 text-sm text-center"
        >
          Built for the AI-native community
        </motion.p>
      </main>
    </div>
  );
}
