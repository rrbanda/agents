'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const crew = [
  {
    id: 1,
    name: 'Alex Chen',
    role: 'AI Architect',
    focus: 'Agent Systems & MCP',
    color: 'from-blue-500 to-cyan-500',
    emoji: '🧠',
  },
  {
    id: 2,
    name: 'Sam Rivera',
    role: 'Platform Engineer',
    focus: 'Infrastructure & Scaling',
    color: 'from-purple-500 to-pink-500',
    emoji: '☁️',
  },
  {
    id: 3,
    name: 'Jordan Lee',
    role: 'Developer Advocate',
    focus: 'Education & Community',
    color: 'from-green-500 to-emerald-500',
    emoji: '🎯',
  },
  {
    id: 4,
    name: 'Casey Morgan',
    role: 'Research Engineer',
    focus: 'Multi-Agent Systems',
    color: 'from-orange-500 to-yellow-500',
    emoji: '🔬',
  },
  {
    id: 5,
    name: 'Riley Park',
    role: 'UX Engineer',
    focus: 'Agent Interfaces',
    color: 'from-red-500 to-rose-500',
    emoji: '✨',
  },
  {
    id: 6,
    name: 'You?',
    role: 'Join the Crew',
    focus: 'We\'re always looking for contributors',
    color: 'from-gray-500 to-gray-600',
    emoji: '👋',
    isPlaceholder: true,
  },
];

export default function CrewPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
            top: '10%',
            left: '-10%',
          }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
            bottom: '10%',
            right: '-5%',
          }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="text-gray-400 font-medium text-sm group-hover:text-white transition-colors">
            ← Back
          </span>
        </Link>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 px-6 md:px-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Contributors</span>
          </h1>
          <p className="text-gray-400 text-lg">
            The humans behind the AI mission
          </p>
        </motion.div>

        {/* Crew Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {crew.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`relative rounded-2xl overflow-hidden ${member.isPlaceholder ? 'border-dashed' : ''}`}
            >
              {/* Glass Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl" />
              <div className={`absolute inset-0 rounded-2xl border ${member.isPlaceholder ? 'border-dashed border-white/20' : 'border-white/[0.08]'}`} />
              
              {/* Content */}
              <div className="relative p-6">
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center text-2xl`}>
                    {member.emoji}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{member.name}</h3>
                    <p className="text-gray-500 text-sm">{member.role}</p>
                  </div>
                </div>

                {/* Focus Area */}
                <p className="text-gray-400 text-sm">
                  {member.focus}
                </p>

                {/* Join CTA for placeholder */}
                {member.isPlaceholder && (
                  <motion.a
                    href="https://github.com/rrbanda"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="mt-4 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                  >
                    Contribute on GitHub →
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 text-sm">
            Building the future of AI agents, together.
          </p>
        </motion.div>
      </main>
    </div>
  );
}

