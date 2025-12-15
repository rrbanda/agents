'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SiteNav from '@/components/ui/SiteNav';

const podcasts = [
  {
    id: 'agents-unpacked',
    title: 'Agents Unpacked: The Basics',
    description: 'Breaking down what makes AI agents different from traditional automation.',
    category: 'Fundamentals',
    duration: '25 min',
    episode: 1,
    available: false,
  },
  {
    id: 'mcp-deep-dive',
    title: 'MCP Deep Dive',
    description: 'Understanding the Model Context Protocol and how it enables tool use.',
    category: 'Technical',
    duration: '35 min',
    episode: 2,
    available: false,
  },
  {
    id: 'building-in-production',
    title: 'Building Agents in Production',
    description: 'War stories and lessons learned from deploying agents at scale.',
    category: 'Production',
    duration: '40 min',
    episode: 3,
    available: false,
  },
  {
    id: 'future-of-agents',
    title: 'The Future of Agentic AI',
    description: 'Where are we headed? Predictions and possibilities for agent systems.',
    category: 'Vision',
    duration: '30 min',
    episode: 4,
    available: false,
  },
];

const categories = ['All', 'Fundamentals', 'Technical', 'Production', 'Vision'];

export default function PodcastsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPodcasts = useMemo(() => {
    return podcasts.filter(podcast => {
      return selectedCategory === 'All' || podcast.category === selectedCategory;
    });
  }, [selectedCategory]);

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0f] overflow-hidden">
      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .podcasts-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .podcasts-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .podcasts-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .podcasts-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Navigation */}
      <SiteNav />

      {/* Main Layout - Fixed height container */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 md:px-8 gap-6 pb-6 min-h-0">
        
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-64 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="p-5 flex-1 overflow-y-auto podcasts-scroll">
              {/* Category Section */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Topic
                </h3>
                <div className="space-y-1">
                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat;
                    const count = cat === 'All' 
                      ? podcasts.length 
                      : podcasts.filter(p => p.category === cat).length;
                    
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
                        <span className={`text-xs ${isActive ? 'text-pink-400' : 'text-gray-600'}`}>
                          {count}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Status - Fixed at bottom */}
            <div className="p-4 border-t border-white/5 bg-black/20">
              <div className="flex items-center gap-2 text-xs text-pink-400">
                <span>🎙️</span>
                <span>Coming Soon</span>
              </div>
            </div>
          </motion.div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 flex flex-col min-h-0">
          {/* Header - Fixed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-shrink-0 mb-4"
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              <span className="text-pink-400">Podcasts</span>
              <span className="text-white"> & Audio</span>
            </h1>
            <p className="text-gray-500 text-sm">
              Conversations and deep dives on agentic AI
            </p>
          </motion.div>

          {/* Mobile Filters - Fixed */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:hidden flex-shrink-0 mb-4 overflow-x-auto podcasts-scroll pb-2"
          >
            <div className="flex gap-2 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-pink-500/20 text-pink-400 font-medium'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Coming Soon Banner - Fixed */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex-shrink-0 mb-4 p-4 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-2xl">
                🎙️
              </div>
              <div>
                <div className="text-pink-400 text-sm font-medium">Podcast Series Coming Soon</div>
                <p className="text-gray-500 text-xs mt-0.5">
                  Audio content on agentic AI patterns, interviews, and deep dives.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Scrollable Podcasts List */}
          <div className="flex-1 overflow-y-auto podcasts-scroll pr-2 min-h-0">
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredPodcasts.map((podcast, index) => (
                  <motion.div
                    key={podcast.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <PodcastCard podcast={podcast} />
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredPodcasts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-gray-500">No podcasts match your filters</p>
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="mt-3 text-pink-400 hover:text-pink-300 text-sm"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function PodcastCard({ podcast }: { podcast: typeof podcasts[0] }) {
  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden opacity-50 cursor-not-allowed"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
      }}
    >
      {/* Border */}
      <div className="absolute inset-0 rounded-xl border border-white/[0.04]" />

      {/* Content */}
      <div className="relative p-4 flex items-center gap-4">
        {/* Episode Badge */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
          <span className="text-pink-400 font-bold text-sm">EP{podcast.episode}</span>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">
              {podcast.category}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-500 text-[9px] font-medium">
              Coming Soon
            </span>
          </div>
          
          <h3 className="text-sm font-semibold text-gray-400 mb-0.5 truncate">
            {podcast.title}
          </h3>
          
          <p className="text-gray-500 text-xs line-clamp-1">
            {podcast.description}
          </p>
        </div>

        {/* Duration */}
        <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {podcast.duration}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

