'use client';

import { motion } from 'framer-motion';
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
  },
  {
    id: 'context-engineering',
    title: 'Context Engineering',
    description: 'Beyond prompts: managing what information agents see and when.',
    category: 'Architecture',
    readTime: '10 min',
    level: '201',
  },
  {
    id: 'writing-tools',
    title: 'Writing Effective Tools',
    description: 'The contract between deterministic systems and non-deterministic agents.',
    category: 'Patterns',
    readTime: '7 min',
    level: '201',
  },
  {
    id: 'multi-agent',
    title: 'Multi-Agent Research Systems',
    description: 'Orchestration, parallel execution, and collective intelligence.',
    category: 'Advanced',
    readTime: '12 min',
    level: '301',
  },
  {
    id: 'contextual-retrieval',
    title: 'Contextual Retrieval',
    description: 'Solving the context loss problem in RAG systems.',
    category: 'Architecture',
    readTime: '9 min',
    level: '201',
  },
  {
    id: 'long-running',
    title: 'Long-Running Agents',
    description: 'Challenges and solutions for persistent agent workflows.',
    category: 'Advanced',
    readTime: '11 min',
    level: '301',
  },
];

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
            top: '30%',
            left: '-10%',
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Navigation */}
      <SiteNav />

      {/* Main Content */}
      <main className="relative z-10 px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-cyan-400">Insights</span> & Guides
          </h1>
          <p className="text-gray-400 text-lg">
            Deep dives into agentic AI patterns and practices
          </p>
        </motion.div>

        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl" />
            <div className="absolute inset-0 rounded-2xl border border-cyan-500/20" />
            <div className="relative p-6 text-center">
              <span className="text-cyan-400 text-sm font-medium">🚧 Content Hub Coming Soon</span>
              <p className="text-gray-400 text-sm mt-2">
                Full articles from 14 deep-dive documents are being prepared. 
                For now, explore the interactive presentations.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Article Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="relative rounded-2xl overflow-hidden opacity-70 hover:opacity-100 transition-opacity cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl" />
              <div className="absolute inset-0 rounded-2xl border border-white/10" />
              
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-1 rounded-lg bg-white/5 text-gray-400 text-xs">
                    {article.category}
                  </span>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    article.level === '201' 
                      ? 'bg-purple-500/20 text-purple-400' 
                      : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {article.level}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{article.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{article.description}</p>

                <div className="flex items-center text-gray-500 text-xs">
                  <span>📖 {article.readTime} read</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA to Learn */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm mb-4">Want to dive in now?</p>
          <Link href="/learn">
            <button className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              Start with the interactive presentations →
            </button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

