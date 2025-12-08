'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const demos = [
  {
    id: 'linux-mcp',
    title: 'Linux MCP Server',
    description: 'Talk to your Linux system using natural language. Query processes, logs, and system info.',
    icon: '🐧',
    status: 'preview',
    href: '/presentation?slide=22',
  },
  {
    id: 'agent-loop',
    title: 'Agent Loop Playground',
    description: 'Interactive visualization of the Gather → Act → Verify → Repeat cycle.',
    icon: '🔄',
    status: 'coming',
    href: '#',
  },
  {
    id: 'tool-builder',
    title: 'Tool Designer',
    description: 'Design and test your own agent tools with instant feedback.',
    icon: '🛠️',
    status: 'coming',
    href: '#',
  },
];

export default function DemosPage() {
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
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
            RB
          </div>
          <span className="text-white font-semibold text-lg tracking-tight group-hover:text-blue-400 transition-colors">
            ← Back
          </span>
        </Link>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Interactive <span className="text-purple-400">Demos</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Experience agentic AI in action
          </p>
        </motion.div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`relative rounded-3xl overflow-hidden ${demo.status === 'coming' && 'opacity-60'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl" />
              <div className="absolute inset-0 rounded-3xl border border-white/10" />
              
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl">{demo.icon}</span>
                  {demo.status === 'preview' && (
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">
                      Preview
                    </span>
                  )}
                  {demo.status === 'coming' && (
                    <span className="px-3 py-1 rounded-full bg-gray-800 text-gray-400 text-xs font-medium">
                      Coming Soon
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{demo.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{demo.description}</p>

                {demo.status === 'preview' ? (
                  <Link href={demo.href}>
                    <button className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity">
                      Try Demo →
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 rounded-xl font-semibold text-gray-500 bg-gray-800/50 cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

