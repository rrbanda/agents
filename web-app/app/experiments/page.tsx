'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SiteNav from '@/components/ui/SiteNav';

const experiments = [
  {
    id: 'linux-mcp',
    title: 'RHEL MCP Server',
    description: 'Talk to your Linux system using natural language. Query processes, logs, and system info through Claude.',
    icon: '🐧',
    status: 'live',
    href: '/presentation?slide=22',
    gradient: 'from-red-500 to-orange-500',
  },
  {
    id: 'agent-loop',
    title: 'Agent Loop Visualizer',
    description: 'Interactive visualization of the Gather → Act → Verify → Repeat cycle in real-time.',
    icon: '🔄',
    status: 'building',
    href: '#',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'tool-builder',
    title: 'MCP Tool Designer',
    description: 'Design and test your own agent tools with instant feedback and validation.',
    icon: '🛠️',
    status: 'building',
    href: '#',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'prompt-lab',
    title: 'Prompt Engineering Lab',
    description: 'Experiment with prompt patterns and see how they affect agent behavior.',
    icon: '🧪',
    status: 'idea',
    href: '#',
    gradient: 'from-green-500 to-emerald-500',
  },
];

const statusConfig = {
  live: { label: 'Live', color: 'bg-green-500/20 text-green-400' },
  building: { label: 'Building', color: 'bg-yellow-500/20 text-yellow-400' },
  idea: { label: 'Idea', color: 'bg-gray-700 text-gray-400' },
};

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
            top: '20%',
            right: '-10%',
          }}
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
            bottom: '10%',
            left: '-10%',
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Navigation */}
      <SiteNav />

      {/* Main Content */}
      <main className="relative z-10 px-6 md:px-12 pb-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Experiments
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Prototypes, demos, and explorations in agentic AI
          </p>
        </motion.div>

        {/* Experiment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiments.map((exp, index) => {
            const status = statusConfig[exp.status as keyof typeof statusConfig];
            const isClickable = exp.status === 'live';
            
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
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
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 text-sm">
            Have an idea? <span className="text-gray-400">Reach out to collaborate</span>
          </p>
        </motion.div>
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
      whileHover={isClickable ? { scale: 1.02, y: -4 } : {}}
      whileTap={isClickable ? { scale: 0.98 } : {}}
      className={`group relative rounded-2xl overflow-hidden h-full ${
        !isClickable && 'opacity-70'
      }`}
    >
      {/* Card Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-white/[0.02]" />
      <div className={`absolute inset-0 rounded-2xl border transition-colors ${
        isClickable 
          ? 'border-white/[0.08] group-hover:border-white/[0.15]' 
          : 'border-white/[0.05]'
      }`} />
      
      {/* Top Gradient Accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${exp.gradient}`} />
      
      {/* Hover Glow */}
      {isClickable && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 60%)`,
          }}
        />
      )}
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${exp.gradient} flex items-center justify-center`}>
            <span className="text-3xl">{exp.icon}</span>
          </div>
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>

        <h3 className={`text-xl font-bold mb-2 transition-colors ${
          isClickable ? 'text-white group-hover:text-blue-300' : 'text-gray-400'
        }`}>
          {exp.title}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {exp.description}
        </p>

        {isClickable && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Try it →</span>
            <motion.span 
              className="text-gray-500 group-hover:text-white transition-colors text-lg"
            >
              →
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

