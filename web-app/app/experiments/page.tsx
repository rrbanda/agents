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
    <div className="h-screen flex flex-col bg-[#0a0a0f] overflow-hidden">
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
            <div className="p-5 flex-1 overflow-y-auto experiments-scroll">
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
            </div>

            {/* Stats - Fixed at bottom */}
            <div className="p-4 border-t border-white/5 bg-black/20">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-gray-400">{liveCount} live experiment{liveCount !== 1 ? 's' : ''}</span>
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
              <span className="text-purple-400">Experiments</span>
              <span className="text-white"> & Demos</span>
            </h1>
            <p className="text-gray-500 text-sm">
              Prototypes and interactive explorations in agentic AI
            </p>
          </motion.div>

          {/* Mobile Filters - Fixed */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:hidden flex-shrink-0 mb-4 overflow-x-auto experiments-scroll pb-2"
          >
            <div className="flex gap-2 min-w-max">
              {statuses.map((status) => {
                const config = statusConfig[status];
                return (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
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

          {/* Scrollable Experiments List */}
          <div className="flex-1 overflow-y-auto experiments-scroll pr-2 min-h-0">
            <div className="space-y-3">
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
                      transition={{ delay: index * 0.03 }}
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
                  className="text-center py-12"
                >
                  <p className="text-gray-500">No experiments match your filters</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedStatus('All');
                    }}
                    className="mt-3 text-purple-400 hover:text-purple-300 text-sm"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center mt-8 pb-4">
              <p className="text-gray-600 text-xs">
                Have an idea? Reach out to collaborate
              </p>
            </div>
          </div>
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
      whileHover={isClickable ? { scale: 1.005, x: 2 } : {}}
      className={`group relative rounded-xl overflow-hidden transition-all duration-200 ${
        isClickable ? 'cursor-pointer' : 'opacity-50'
      }`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
      }}
    >
      {/* Border */}
      <div className={`absolute inset-0 rounded-xl transition-all duration-200 ${
        isClickable
          ? 'border border-white/[0.06] group-hover:border-purple-500/30'
          : 'border border-white/[0.04]'
      }`} />

      {/* Live accent */}
      {isClickable && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 to-emerald-500" />
      )}

      {/* Content */}
      <div className="relative p-4 flex items-center gap-4">
        {/* Status Badge */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${status.color}`}>
          <span className={`w-3 h-3 rounded-full ${status.dotColor} ${isClickable ? 'animate-pulse' : ''}`} />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">
              {exp.category}
            </span>
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${status.color}`}>
              {status.label}
            </span>
          </div>
          
          <h3 className={`text-sm font-semibold mb-0.5 transition-colors truncate ${
            isClickable 
              ? 'text-white group-hover:text-purple-300' 
              : 'text-gray-400'
          }`}>
            {exp.title}
          </h3>
          
          <p className="text-gray-500 text-xs line-clamp-1">
            {exp.description}
          </p>
        </div>

        {/* Arrow */}
        {isClickable && (
          <div className="hidden sm:flex flex-shrink-0">
            <motion.div
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
