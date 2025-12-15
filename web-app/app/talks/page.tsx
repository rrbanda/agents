'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SiteNav from '@/components/ui/SiteNav';

const talks = [
  {
    id: 'agentic-ai-intro',
    title: 'Agentic AI: An Introduction',
    description: 'From automation to autonomy — what makes agents different and why they matter.',
    category: 'Foundations',
    level: '101',
    duration: '~40 min',
    slides: 34,
    href: '/presentation',
    available: true,
    featured: true,
  },
  {
    id: 'building-agents',
    title: 'Building Effective Agents',
    description: 'Architecture patterns, tool design, and best practices for production agents.',
    category: 'Patterns',
    level: '201',
    duration: '~60 min',
    slides: 27,
    href: '/talks/201',
    available: true,
  },
  {
    id: 'context-engineering',
    title: 'Context Engineering Deep Dive',
    description: 'Managing what information agents see and when for optimal performance.',
    category: 'Architecture',
    level: '201',
    duration: '~30 min',
    slides: 18,
    href: '#',
    available: false,
  },
  {
    id: 'mcp-tools',
    title: 'MCP & Tool Integration',
    description: 'Model Context Protocol patterns and designing effective tool interfaces.',
    category: 'Integration',
    level: '201',
    duration: '~35 min',
    slides: 22,
    href: '#',
    available: false,
  },
  {
    id: 'multi-agent',
    title: 'Multi-Agent Systems',
    description: 'Orchestration, parallel execution, and collective intelligence patterns.',
    category: 'Advanced',
    level: '301',
    duration: '~45 min',
    slides: 30,
    href: '#',
    available: false,
  },
  {
    id: 'production-agents',
    title: 'Production AI Systems',
    description: 'Reliability patterns, monitoring, and scaling agents in production.',
    category: 'Advanced',
    level: '301',
    duration: '~50 min',
    slides: 28,
    href: '#',
    available: false,
  },
];

const levelColors: Record<string, string> = {
  '101': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  '201': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  '301': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

const categoryColors: Record<string, string> = {
  'Foundations': 'bg-gray-800 text-gray-300',
  'Patterns': 'bg-gray-800 text-gray-300',
  'Architecture': 'bg-gray-800 text-gray-300',
  'Integration': 'bg-gray-800 text-gray-300',
  'Advanced': 'bg-gray-800 text-gray-300',
};

export default function TalksPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Navigation */}
      <SiteNav />

      {/* Main Content */}
      <main className="px-6 md:px-12 pb-20 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-400">Talks</span>
            <span className="text-white"> & Presentations</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Interactive presentations on agentic AI patterns and practices
          </p>
        </motion.div>

        {/* Featured Banner */}
        {talks.some(t => t.featured && t.available) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
          >
            <div className="flex items-center justify-center gap-2 text-cyan-400 mb-2">
              <span>🎤</span>
              <span className="font-medium">Featured Talk</span>
            </div>
            <p className="text-gray-400 text-center text-sm">
              Start with &ldquo;Agentic AI: An Introduction&rdquo; for the foundational concepts.
            </p>
          </motion.div>
        )}

        {/* Talks Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {talks.map((talk, index) => (
            <motion.div
              key={talk.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              {talk.available ? (
                <Link href={talk.href} className="block h-full">
                  <TalkCard talk={talk} />
                </Link>
              ) : (
                <TalkCard talk={talk} />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-600 text-sm mt-12"
        >
          Use arrow keys or swipe to navigate within presentations
        </motion.p>
      </main>
    </div>
  );
}

function TalkCard({ talk }: { talk: typeof talks[0] }) {
  const isAvailable = talk.available;
  
  return (
    <motion.div
      whileHover={isAvailable ? { y: -4 } : {}}
      className={`group relative h-full rounded-xl overflow-hidden transition-all duration-300 ${
        isAvailable 
          ? 'cursor-pointer' 
          : 'opacity-60 cursor-default'
      }`}
    >
      {/* Card Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent" />
      <div className={`absolute inset-0 rounded-xl border transition-colors ${
        isAvailable
          ? 'border-white/[0.08] group-hover:border-cyan-500/30'
          : 'border-white/[0.05]'
      }`} />
      
      {/* Featured indicator */}
      {talk.featured && isAvailable && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500" />
      )}

      {/* Content */}
      <div className="relative p-5 h-full flex flex-col">
        {/* Header: Category + Level */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${categoryColors[talk.category] || 'bg-gray-800 text-gray-300'}`}>
            {talk.category}
          </span>
          <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${levelColors[talk.level]}`}>
            {talk.level}
          </span>
        </div>

        {/* Title */}
        <h3 className={`text-lg font-semibold mb-2 transition-colors line-clamp-2 ${
          isAvailable 
            ? 'text-white group-hover:text-cyan-300' 
            : 'text-gray-400'
        }`}>
          {talk.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {talk.description}
        </p>

        {/* Footer: Meta */}
        <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-white/[0.05]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span>📑</span> {talk.slides} slides
            </span>
            <span className="flex items-center gap-1">
              <span>⏱️</span> {talk.duration}
            </span>
          </div>
          {isAvailable ? (
            <span className="text-cyan-500 group-hover:text-cyan-400 transition-colors">
              →
            </span>
          ) : (
            <span className="text-gray-600 text-[10px] uppercase tracking-wide">
              Soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
