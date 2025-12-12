'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import SiteNav from '@/components/ui/SiteNav';

const formats = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'slides', label: 'Slides', icon: '🎬' },
  { id: 'podcast', label: 'Podcasts', icon: '🎙️' },
  { id: 'article', label: 'Articles', icon: '📄' },
  { id: 'video', label: 'Videos', icon: '🎥' },
];

const content = [
  {
    id: 'ai-foundations',
    title: 'AI Foundations',
    description: 'What is AI? How did we get here? Start your journey with the fundamentals.',
    format: 'slides',
    level: '101',
    duration: '45 min',
    items: 34,
    available: true,
    href: '/learn/101',
    gradient: 'from-blue-500 to-cyan-500',
    featured: true,
  },
  {
    id: 'agent-patterns',
    title: 'Building Effective Agents',
    description: 'How to design agents? What tools do they need? Best practices for building.',
    format: 'slides',
    level: '201',
    duration: '50 min',
    items: 19,
    available: true,
    href: '/learn/201',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'production-systems',
    title: 'Production AI Systems',
    description: 'Multi-agent orchestration, long-running agents, production reliability.',
    format: 'slides',
    level: '301',
    duration: '45 min',
    items: 30,
    available: false,
    href: '/learn/301',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'ai-explained-podcast',
    title: 'AI Explained',
    description: 'Weekly conversations about AI trends, tools, and transformations.',
    format: 'podcast',
    level: '101',
    duration: '30 min/ep',
    items: 12,
    available: false,
    href: '#',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'deep-dive-articles',
    title: 'Deep Dive Articles',
    description: 'In-depth explorations of AI concepts, patterns, and implementation guides.',
    format: 'article',
    level: '201',
    duration: '10 min read',
    items: 14,
    available: false,
    href: '#',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'video-tutorials',
    title: 'Video Tutorials',
    description: 'Step-by-step video guides for hands-on learning and implementation.',
    format: 'video',
    level: '201',
    duration: '15 min/ep',
    items: 8,
    available: false,
    href: '#',
    gradient: 'from-rose-500 to-pink-500',
  },
];

const levelColors: Record<string, string> = {
  '101': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  '201': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  '301': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

const formatIcons: Record<string, string> = {
  slides: '🎬',
  podcast: '🎙️',
  article: '📄',
  video: '🎥',
};

export default function LearnPage() {
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredContent = selectedFormat === 'all' 
    ? content 
    : content.filter(item => item.format === selectedFormat);

  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
            top: '-10%',
            left: '-10%',
          }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
            bottom: '10%',
            right: '-5%',
          }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Navigation */}
      <SiteNav />

      {/* Main Content */}
      <main className="relative z-10 px-6 md:px-12 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Learn
          </h1>
          <p className="text-gray-400 text-lg">
            Choose how you want to learn
          </p>
        </motion.div>

        {/* Format Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            {formats.map((format) => (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  selectedFormat === format.id
                    ? 'bg-white/10 text-white'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
                }`}
              >
                <span className="text-base">{format.icon}</span>
                <span className="text-sm font-medium">{format.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFormat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative rounded-2xl overflow-hidden ${!item.available && 'opacity-60'}`}
                >
                  {/* Card Background - pointer-events-none so clicks pass through */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-white/[0.02] pointer-events-none" />
                  <div className="absolute inset-0 rounded-2xl border border-white/[0.08] pointer-events-none" />
                  
                  {/* Top Gradient Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} pointer-events-none`} />
                  
                  {/* Hover Glow */}
                  {item.available && (
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${
                          item.level === '101' ? 'rgba(59,130,246,0.12)' :
                          item.level === '201' ? 'rgba(139,92,246,0.12)' :
                          'rgba(249,115,22,0.12)'
                        } 0%, transparent 70%)`,
                      }}
                    />
                  )}

                  {/* Content - Link covers entire card */}
                  <Link href={item.available ? item.href : '#'} className={`block ${!item.available ? 'pointer-events-none' : ''}`}>
                    <div className="relative p-6">
                      {/* Header Row */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{formatIcons[item.format]}</span>
                          <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${levelColors[item.level]}`}>
                            {item.level}
                          </span>
                        </div>
                        {!item.available && (
                          <span className="px-2 py-1 rounded-lg bg-gray-800/80 text-gray-500 text-xs">
                            Soon
                          </span>
                        )}
                        {item.featured && item.available && (
                          <span className="px-2 py-1 rounded-lg bg-green-500/20 text-green-400 text-xs font-medium">
                            Start Here
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <span>⏱️</span> {item.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>📑</span> {item.items} {item.format === 'slides' ? 'slides' : item.format === 'podcast' ? 'episodes' : 'items'}
                        </span>
                      </div>

                      {/* Arrow */}
                      {item.available && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ 
                            opacity: hoveredCard === item.id ? 1 : 0,
                            x: hoveredCard === item.id ? 0 : -10
                          }}
                          className="absolute bottom-6 right-6 text-white"
                        >
                          →
                        </motion.div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredContent.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-500">No content in this format yet. Check back soon!</p>
            </motion.div>
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 text-sm">
            More content coming soon • Podcasts • Videos • Articles
          </p>
        </motion.div>
      </main>
    </div>
  );
}
