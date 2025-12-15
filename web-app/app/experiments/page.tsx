'use client';

import { motion } from 'framer-motion';
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

const statusConfig: Record<string, { label: string; color: string }> = {
  live: { label: 'Live', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  building: { label: 'Building', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  idea: { label: 'Idea', color: 'bg-gray-700 text-gray-400 border-gray-600' },
};

export default function ExperimentsPage() {
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
            <span className="text-purple-400">Experiments</span>
            <span className="text-white"> & Demos</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Prototypes and interactive explorations in agentic AI
          </p>
        </motion.div>

        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
        >
          <div className="flex items-center justify-center gap-2 text-purple-400 mb-2">
            <span>⚡</span>
            <span className="font-medium">Lab Status</span>
          </div>
          <p className="text-gray-400 text-center text-sm">
            Active experiments in progress. Try the live demos or check back for updates.
          </p>
        </motion.div>

        {/* Experiments Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {experiments.map((exp, index) => {
            const status = statusConfig[exp.status];
            const isClickable = exp.status === 'live';
            
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                {isClickable ? (
                  <Link href={exp.href} className="block h-full">
                    <ExperimentCard exp={exp} status={status} isClickable={true} />
                  </Link>
                ) : (
                  <ExperimentCard exp={exp} status={status} isClickable={false} />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-600 text-sm mt-12"
        >
          Have an idea? Reach out to collaborate
        </motion.p>
      </main>
    </div>
  );
}

function ExperimentCard({ 
  exp, 
  status, 
  isClickable 
}: { 
  exp: typeof experiments[0]; 
  status: { label: string; color: string }; 
  isClickable: boolean;
}) {
  return (
    <motion.div
      whileHover={isClickable ? { y: -4 } : {}}
      className={`group relative h-full rounded-xl overflow-hidden transition-all duration-300 ${
        isClickable 
          ? 'cursor-pointer' 
          : 'opacity-60 cursor-default'
      }`}
    >
      {/* Card Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent" />
      <div className={`absolute inset-0 rounded-xl border transition-colors ${
        isClickable
          ? 'border-white/[0.08] group-hover:border-purple-500/30'
          : 'border-white/[0.05]'
      }`} />
      
      {/* Live indicator */}
      {isClickable && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500" />
      )}

      {/* Content */}
      <div className="relative p-5 h-full flex flex-col">
        {/* Header: Category + Status */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-800 text-gray-300">
            {exp.category}
          </span>
          <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${status.color}`}>
            {status.label}
          </span>
        </div>

        {/* Title */}
        <h3 className={`text-lg font-semibold mb-2 transition-colors ${
          isClickable 
            ? 'text-white group-hover:text-purple-300' 
            : 'text-gray-400'
        }`}>
          {exp.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
          {exp.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-white/[0.05]">
          <span>
            {isClickable ? 'Try demo' : 'In progress'}
          </span>
          {isClickable && (
            <span className="text-purple-500 group-hover:text-purple-400 transition-colors">
              →
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
