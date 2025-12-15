'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SiteNav from '@/components/ui/SiteNav';

// Talks/presentations as thought leadership, not courses
const talks = [
  {
    id: 'agentic-ai-intro',
    title: 'Agentic AI: An Introduction',
    subtitle: 'Understanding the next evolution of AI systems',
    description: 'From automation to autonomy — explore what makes agents different and why they matter for technical professionals.',
    duration: '~40 min',
    slides: 34,
    href: '/presentation',
    gradient: 'from-blue-500 to-cyan-500',
    available: true,
    featured: true,
    tags: ['Fundamentals', 'Agents', 'AI Evolution'],
  },
  {
    id: 'building-agents',
    title: 'Building Effective Agents',
    subtitle: 'Patterns for production-ready AI systems',
    description: 'Architecture patterns, tool design, evaluation strategies, and best practices for building agents that work.',
    duration: '~60 min',
    slides: 27,
    href: '/talks/201',
    gradient: 'from-purple-500 to-pink-500',
    available: true,
    tags: ['Architecture', 'Tools', 'Best Practices'],
  },
  {
    id: 'production-systems',
    title: 'Production AI Systems',
    subtitle: 'Scaling agents in the real world',
    description: 'Multi-agent orchestration, long-running agents, reliability patterns, and production considerations.',
    duration: '~45 min',
    slides: 30,
    href: '#',
    gradient: 'from-orange-500 to-red-500',
    available: false,
    tags: ['Multi-Agent', 'Production', 'Scale'],
  },
];

export default function TalksPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
            top: '-10%',
            right: '-10%',
          }}
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
            bottom: '10%',
            left: '-5%',
          }}
          animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Navigation */}
      <SiteNav />

      {/* Main Content */}
      <main className="relative z-10 px-6 md:px-12 pb-20 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Talks & Presentations
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Interactive presentations on AI, agents, and building intelligent systems
          </p>
        </motion.div>

        {/* Talks Grid */}
        <div className="space-y-6">
          {talks.map((talk, index) => (
            <motion.div
              key={talk.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                href={talk.available ? talk.href : '#'}
                className={!talk.available ? 'pointer-events-none' : 'block'}
              >
                <motion.div
                  whileHover={talk.available ? { scale: 1.01, y: -2 } : {}}
                  whileTap={talk.available ? { scale: 0.99 } : {}}
                  className={`group relative rounded-2xl overflow-hidden ${
                    !talk.available && 'opacity-60'
                  }`}
                >
                  {/* Card Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-white/[0.02]" />
                  <div className={`absolute inset-0 rounded-2xl border transition-colors ${
                    talk.available 
                      ? 'border-white/[0.08] group-hover:border-white/[0.15]' 
                      : 'border-white/[0.05]'
                  }`} />
                  
                  {/* Left Gradient Accent */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${talk.gradient}`} />
                  
                  {/* Hover Glow */}
                  {talk.available && (
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at 0% 50%, rgba(255,255,255,0.04) 0%, transparent 50%)`,
                      }}
                    />
                  )}

                  {/* Content */}
                  <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
                    {/* Left: Icon/Visual */}
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br ${talk.gradient} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-3xl md:text-4xl">🎤</span>
                    </div>

                    {/* Center: Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {talk.featured && talk.available && (
                          <span className="px-2 py-0.5 rounded-md bg-green-500/20 text-green-400 text-xs font-medium">
                            Featured
                          </span>
                        )}
                        {!talk.available && (
                          <span className="px-2 py-0.5 rounded-md bg-gray-800 text-gray-500 text-xs">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      
                      <h2 className={`text-xl md:text-2xl font-bold mb-1 transition-colors ${
                        talk.available 
                          ? 'text-white group-hover:text-blue-300' 
                          : 'text-gray-400'
                      }`}>
                        {talk.title}
                      </h2>
                      
                      <p className="text-gray-400 text-sm mb-3">
                        {talk.subtitle}
                      </p>
                      
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                        {talk.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {talk.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 rounded-lg bg-gray-800/50 text-gray-400 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Meta + Arrow */}
                    <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2 flex-shrink-0">
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <span>📑</span> {talk.slides}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>⏱️</span> {talk.duration}
                        </span>
                      </div>
                      {talk.available && (
                        <motion.span 
                          className="text-gray-500 group-hover:text-white transition-colors text-2xl"
                        >
                          →
                        </motion.span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 text-sm">
            Use arrow keys or swipe to navigate within presentations
          </p>
        </motion.div>
      </main>
    </div>
  );
}
