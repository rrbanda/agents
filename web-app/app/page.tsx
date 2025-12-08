'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { id: 'learn', label: 'Learn', icon: '📚', href: '/learn', desc: 'Structured learning paths' },
  { id: 'demos', label: 'Demos', icon: '⚡', href: '/demos', desc: 'Interactive experiences' },
  { id: 'insights', label: 'Insights', icon: '💡', href: '/insights', desc: 'Articles & guides' },
];

const stats = [
  { value: '14+', label: 'Deep Dives' },
  { value: '3', label: 'Learning Paths' },
  { value: '34', label: 'Interactive Slides' },
];

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden relative">
      {/* Animated Background Gradient Mesh */}
      <div className="fixed inset-0 z-0">
        {/* Primary gradient orbs */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
            top: '-20%',
            left: '-10%',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
            top: '40%',
            right: '-5%',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
            bottom: '-10%',
            left: '30%',
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 flex items-center justify-between px-8 py-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
            RB
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">Raghuram Banda</span>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://linkedin.com/in/rb2021" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-white/5 transition-colors group"
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a 
            href="https://github.com/rrbanda" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-white/5 transition-colors group"
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-8 pt-8 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-300">AI Specialist Architect</span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            One Stop Shop for
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              All Things Agentic
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Navigate the shift from automation to autonomy. 
            Learn how AI agents think, act, and transform the way we work.
          </p>

          {/* CTA Button */}
          <Link href="/learn">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden"
            >
              {/* Glass background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-b from-white/20 to-transparent opacity-50" />
              
              <span className="relative flex items-center gap-2">
                Start Your Journey
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-8 md:gap-16 mb-20"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Navigation Cards - Liquid Glass Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
        >
          {navItems.map((item, index) => (
            <Link key={item.id} href={item.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative h-[280px] rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Glass Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl" />
                
                {/* Border gradient */}
                <div className="absolute inset-0 rounded-3xl border border-white/10" />
                
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: item.id === 'learn' 
                      ? 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 70%)'
                      : item.id === 'demos'
                      ? 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)'
                      : 'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.15) 0%, transparent 70%)',
                  }}
                />

                {/* Inner shine */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Content */}
                <div className="relative h-full p-8 flex flex-col">
                  {/* Icon */}
                  <motion.div
                    animate={{ 
                      scale: hoveredCard === item.id ? 1.1 : 1,
                      y: hoveredCard === item.id ? -5 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="text-5xl mb-6"
                  >
                    {item.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {item.label}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-auto">
                    {item.desc}
                  </p>

                  {/* Arrow indicator */}
                  <motion.div
                    animate={{ x: hoveredCard === item.id ? 5 : 0 }}
                    className="flex items-center gap-2 text-gray-500 group-hover:text-white transition-colors"
                  >
                    <span className="text-sm">Explore</span>
                    <span>→</span>
                  </motion.div>
                </div>

                {/* Reflection effect */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 text-gray-600 text-sm text-center"
        >
          Built with ❤️ for the AI-native developer community
        </motion.p>
      </main>
    </div>
  );
}
