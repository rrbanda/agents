'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const categories = ['All', 'Foundations', 'Patterns', 'Architecture', 'Integration', 'Advanced'];
const levels = ['All', '101', '201', '301'];

const levelColors: Record<string, string> = {
  '101': 'bg-cyan-500/20 text-cyan-400',
  '201': 'bg-purple-500/20 text-purple-400',
  '301': 'bg-orange-500/20 text-orange-400',
};

export default function TalksPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const filteredTalks = useMemo(() => {
    return talks.filter(talk => {
      const categoryMatch = selectedCategory === 'All' || talk.category === selectedCategory;
      const levelMatch = selectedLevel === 'All' || talk.level === selectedLevel;
      return categoryMatch && levelMatch;
    });
  }, [selectedCategory, selectedLevel]);

  const availableCount = filteredTalks.filter(t => t.available).length;
  const totalCount = filteredTalks.length;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .talks-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .talks-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .talks-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .talks-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Navigation */}
      <SiteNav />

      {/* Main Layout */}
      <div className="flex max-w-7xl mx-auto px-4 md:px-8 gap-8 pb-20">
        
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            {/* Glassmorphism container */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="p-5">
                {/* Category Section */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Category
                  </h3>
                  <div className="space-y-1">
                    {categories.map((cat) => {
                      const isActive = selectedCategory === cat;
                      const count = cat === 'All' 
                        ? talks.length 
                        : talks.filter(t => t.category === cat).length;
                      
                      return (
                        <motion.button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                            isActive
                              ? 'bg-white/10 text-white font-medium'
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span>{cat}</span>
                          <span className={`text-xs ${isActive ? 'text-cyan-400' : 'text-gray-600'}`}>
                            {count}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                {/* Level Section */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Level
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {levels.map((level) => {
                      const isActive = selectedLevel === level;
                      return (
                        <motion.button
                          key={level}
                          onClick={() => setSelectedLevel(level)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                            isActive
                              ? level === 'All'
                                ? 'bg-white/15 text-white'
                                : levelColors[level]
                              : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300'
                          }`}
                        >
                          {level}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Showing</span>
                    <span className="text-white font-medium">
                      {availableCount} available / {totalCount} total
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="text-cyan-400">Talks</span>
              <span className="text-white"> & Presentations</span>
            </h1>
            <p className="text-gray-500">
              Interactive presentations on agentic AI patterns and practices
            </p>
          </motion.div>

          {/* Mobile Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:hidden mb-6 overflow-x-auto talks-scroll pb-2"
          >
            <div className="flex gap-2 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-400 font-medium'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Talks List */}
          <div className="space-y-4 talks-scroll">
            <AnimatePresence mode="popLayout">
              {filteredTalks.map((talk, index) => (
                <motion.div
                  key={talk.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {talk.available ? (
                    <Link href={talk.href} className="block">
                      <TalkCard talk={talk} />
                    </Link>
                  ) : (
                    <TalkCard talk={talk} />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredTalks.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-gray-500">No talks match your filters</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedLevel('All');
                  }}
                  className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function TalkCard({ talk }: { talk: typeof talks[0] }) {
  const isAvailable = talk.available;
  
  return (
    <motion.div
      whileHover={isAvailable ? { scale: 1.01, x: 4 } : {}}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
        isAvailable ? 'cursor-pointer' : 'opacity-50'
      }`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Border with gradient on hover */}
      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
        isAvailable
          ? 'border border-white/[0.06] group-hover:border-cyan-500/30'
          : 'border border-white/[0.04]'
      }`} />

      {/* Featured accent */}
      {talk.featured && isAvailable && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500" />
      )}

      {/* Content */}
      <div className="relative p-5 flex items-center gap-5">
        {/* Level Badge */}
        <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg ${levelColors[talk.level]}`}>
          {talk.level}
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              {talk.category}
            </span>
            {talk.featured && isAvailable && (
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-medium">
                Featured
              </span>
            )}
            {!isAvailable && (
              <span className="px-2 py-0.5 rounded-full bg-gray-800 text-gray-500 text-[10px] font-medium">
                Coming Soon
              </span>
            )}
          </div>
          
          <h3 className={`text-lg font-semibold mb-1 transition-colors truncate ${
            isAvailable 
              ? 'text-white group-hover:text-cyan-300' 
              : 'text-gray-400'
          }`}>
            {talk.title}
          </h3>
          
          <p className="text-gray-500 text-sm line-clamp-1">
            {talk.description}
          </p>
        </div>

        {/* Meta + Arrow */}
        <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {talk.slides}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {talk.duration}
            </span>
          </div>
          
          {isAvailable && (
            <motion.div
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
