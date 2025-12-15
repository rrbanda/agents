'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SiteNav from '@/components/ui/SiteNav';

const experiments = [
  {
    id: 'linux-mcp',
    title: 'RHEL MCP Server',
    description: 'Talk to your Linux system using natural language through Claude.',
    category: 'MCP',
    status: 'live',
    href: '/presentation?slide=22',
  },
  {
    id: 'agent-loop',
    title: 'Agent Loop Visualizer',
    description: 'Interactive visualization of the Gather → Act → Verify cycle.',
    category: 'Visualization',
    status: 'building',
    href: '#',
  },
  {
    id: 'tool-builder',
    title: 'MCP Tool Designer',
    description: 'Design and test your own agent tools with instant feedback.',
    category: 'Tools',
    status: 'building',
    href: '#',
  },
  {
    id: 'prompt-lab',
    title: 'Prompt Engineering Lab',
    description: 'Experiment with prompt patterns and agent behavior.',
    category: 'Prompts',
    status: 'idea',
    href: '#',
  },
];

const categories = ['All', 'MCP', 'Visualization', 'Tools', 'Prompts'];
const statuses = ['All', 'live', 'building', 'idea'];

const statusConfig: Record<string, { label: string; color: string; dotColor: string }> = {
  live: { label: 'Live', color: 'bg-green-500/20 text-green-400', dotColor: 'bg-green-400' },
  building: { label: 'Building', color: 'bg-yellow-500/20 text-yellow-400', dotColor: 'bg-yellow-400' },
  idea: { label: 'Idea', color: 'bg-gray-700 text-gray-400', dotColor: 'bg-gray-400' },
};

export default function ExperimentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredExperiments = useMemo(() => {
    return experiments.filter(exp => {
      const categoryMatch = selectedCategory === 'All' || exp.category === selectedCategory;
      const statusMatch = selectedStatus === 'All' || exp.status === selectedStatus;
      return categoryMatch && statusMatch;
    });
  }, [selectedCategory, selectedStatus]);

  const liveCount = experiments.filter(e => e.status === 'live').length;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .experiments-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .experiments-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .experiments-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .experiments-scroll::-webkit-scrollbar-thumb:hover {
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
                        ? experiments.length 
                        : experiments.filter(e => e.category === cat).length;
                      
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
                          <span className={`text-xs ${isActive ? 'text-purple-400' : 'text-gray-600'}`}>
                            {count}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                {/* Status Section */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Status
                  </h3>
                  <div className="space-y-1">
                    {statuses.map((status) => {
                      const isActive = selectedStatus === status;
                      const config = statusConfig[status];
                      const count = status === 'All'
                        ? experiments.length
                        : experiments.filter(e => e.status === status).length;
                      
                      return (
                        <motion.button
                          key={status}
                          onClick={() => setSelectedStatus(status)}
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                            isActive
                              ? 'bg-white/10 text-white font-medium'
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {config && (
                              <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
                            )}
                            {status === 'All' ? 'All' : config?.label}
                          </span>
                          <span className={`text-xs ${isActive ? 'text-purple-400' : 'text-gray-600'}`}>
                            {count}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-gray-400">{liveCount} live experiment{liveCount !== 1 ? 's' : ''}</span>
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
              <span className="text-purple-400">Experiments</span>
              <span className="text-white"> & Demos</span>
            </h1>
            <p className="text-gray-500">
              Prototypes and interactive explorations in agentic AI
            </p>
          </motion.div>

          {/* Mobile Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:hidden mb-6 overflow-x-auto experiments-scroll pb-2"
          >
            <div className="flex gap-2 min-w-max">
              {statuses.map((status) => {
                const config = statusConfig[status];
                return (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                      selectedStatus === status
                        ? 'bg-purple-500/20 text-purple-400 font-medium'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {config && (
                      <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
                    )}
                    {status === 'All' ? 'All' : config?.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Experiments List */}
          <div className="space-y-4 experiments-scroll">
            <AnimatePresence mode="popLayout">
              {filteredExperiments.map((exp, index) => {
                const status = statusConfig[exp.status];
                const isClickable = exp.status === 'live';
                
                return (
                  <motion.div
                    key={exp.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {isClickable ? (
                      <Link href={exp.href} className="block">
                        <ExperimentCard exp={exp} status={status} isClickable={true} />
                      </Link>
                    ) : (
                      <ExperimentCard exp={exp} status={status} isClickable={false} />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredExperiments.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-gray-500">No experiments match your filters</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedStatus('All');
                  }}
                  className="mt-4 text-purple-400 hover:text-purple-300 text-sm"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 text-sm">
              Have an idea? Reach out to collaborate
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function ExperimentCard({ 
  exp, 
  status, 
  isClickable 
}: { 
  exp: typeof experiments[0]; 
  status: { label: string; color: string; dotColor: string }; 
  isClickable: boolean;
}) {
  return (
    <motion.div
      whileHover={isClickable ? { scale: 1.01, x: 4 } : {}}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
        isClickable ? 'cursor-pointer' : 'opacity-50'
      }`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Border with gradient on hover */}
      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
        isClickable
          ? 'border border-white/[0.06] group-hover:border-purple-500/30'
          : 'border border-white/[0.04]'
      }`} />

      {/* Live accent */}
      {isClickable && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-emerald-500" />
      )}

      {/* Content */}
      <div className="relative p-5 flex items-center gap-5">
        {/* Status Badge */}
        <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${status.color}`}>
          <span className={`w-3 h-3 rounded-full ${status.dotColor} ${isClickable ? 'animate-pulse' : ''}`} />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              {exp.category}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${status.color}`}>
              {status.label}
            </span>
          </div>
          
          <h3 className={`text-lg font-semibold mb-1 transition-colors truncate ${
            isClickable 
              ? 'text-white group-hover:text-purple-300' 
              : 'text-gray-400'
          }`}>
            {exp.title}
          </h3>
          
          <p className="text-gray-500 text-sm line-clamp-1">
            {exp.description}
          </p>
        </div>

        {/* Arrow */}
        {isClickable && (
          <div className="hidden sm:flex flex-shrink-0">
            <motion.div
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
