'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SiteNav from '@/components/ui/SiteNav';

const articles = [
  {
    id: 'agent-skills',
    title: 'Agent Skills Pattern',
    description: 'How to package expertise into reusable, scalable resources for agents.',
    category: 'Patterns',
    readTime: '8 min',
    level: '201',
    available: false,
  },
  {
    id: 'context-engineering',
    title: 'Context Engineering',
    description: 'Beyond prompts: managing what information agents see and when.',
    category: 'Architecture',
    readTime: '10 min',
    level: '201',
    available: false,
  },
  {
    id: 'writing-tools',
    title: 'Writing Effective Tools',
    description: 'The contract between deterministic systems and non-deterministic agents.',
    category: 'Patterns',
    readTime: '7 min',
    level: '201',
    available: false,
  },
  {
    id: 'multi-agent',
    title: 'Multi-Agent Research Systems',
    description: 'Orchestration, parallel execution, and collective intelligence.',
    category: 'Advanced',
    readTime: '12 min',
    level: '301',
    available: false,
  },
  {
    id: 'contextual-retrieval',
    title: 'Contextual Retrieval',
    description: 'Solving the context loss problem in RAG systems.',
    category: 'Architecture',
    readTime: '9 min',
    level: '201',
    available: false,
  },
  {
    id: 'long-running',
    title: 'Long-Running Agents',
    description: 'Challenges and solutions for persistent agent workflows.',
    category: 'Advanced',
    readTime: '11 min',
    level: '301',
    available: false,
  },
];

const categories = ['All', 'Patterns', 'Architecture', 'Advanced'];
const levels = ['All', '201', '301'];

const levelColors: Record<string, string> = {
  '201': 'bg-purple-500/20 text-purple-400',
  '301': 'bg-orange-500/20 text-orange-400',
};

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const categoryMatch = selectedCategory === 'All' || article.category === selectedCategory;
      const levelMatch = selectedLevel === 'All' || article.level === selectedLevel;
      return categoryMatch && levelMatch;
    });
  }, [selectedCategory, selectedLevel]);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .insights-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .insights-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .insights-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .insights-scroll::-webkit-scrollbar-thumb:hover {
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
                    Topic
                  </h3>
                  <div className="space-y-1">
                    {categories.map((cat) => {
                      const isActive = selectedCategory === cat;
                      const count = cat === 'All' 
                        ? articles.length 
                        : articles.filter(a => a.category === cat).length;
                      
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
                          <span className={`text-xs ${isActive ? 'text-yellow-400' : 'text-gray-600'}`}>
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
                    Depth
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

                {/* Status */}
                <div className="mt-6 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-yellow-500">
                    <span>🚧</span>
                    <span>Content in preparation</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
            >
              <p className="text-gray-400 text-xs mb-2">Want to dive in now?</p>
              <Link href="/talks" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
                Explore presentations →
              </Link>
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
              <span className="text-yellow-400">Insights</span>
              <span className="text-white"> & Guides</span>
            </h1>
            <p className="text-gray-500">
              Deep dives into agentic AI patterns and practices
            </p>
          </motion.div>

          {/* Mobile Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:hidden mb-6 overflow-x-auto insights-scroll pb-2"
          >
            <div className="flex gap-2 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-yellow-500/20 text-yellow-400 font-medium'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Coming Soon Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6 p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20"
          >
            <div className="flex items-center gap-2 text-yellow-400 text-sm">
              <span>🚧</span>
              <span className="font-medium">Content Hub Coming Soon</span>
            </div>
            <p className="text-gray-500 text-xs mt-1">
              14 deep-dive articles in preparation. Preview the topics below.
            </p>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 insights-scroll">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredArticles.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-2 text-center py-16"
              >
                <p className="text-gray-500">No articles match your filters</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedLevel('All');
                  }}
                  className="mt-4 text-yellow-400 hover:text-yellow-300 text-sm"
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

function ArticleCard({ article }: { article: typeof articles[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="group relative rounded-2xl overflow-hidden opacity-60 cursor-not-allowed"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.06]" />

      {/* Content */}
      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-800 text-gray-400">
            {article.category}
          </span>
          <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${levelColors[article.level]}`}>
            {article.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-300 mb-2">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {article.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-600 pt-3 border-t border-white/[0.05]">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {article.readTime} read
          </span>
          <span className="text-gray-700 text-[10px] uppercase tracking-wide">
            Coming Soon
          </span>
        </div>
      </div>
    </motion.div>
  );
}
