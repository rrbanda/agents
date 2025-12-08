'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const levels = [
  {
    id: '101',
    title: 'Discover',
    subtitle: 'Foundations',
    description: 'What is Agentic AI? How did we get here? What can agents do?',
    topics: ['GenAI Fundamentals', 'AI Evolution', 'Agent Anatomy', 'Prompt Engineering', 'AI Fluency'],
    duration: '~45 min',
    slides: 34,
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    available: true,
    href: '/presentation',
  },
  {
    id: '201',
    title: 'Build',
    subtitle: 'Patterns & Tools',
    description: 'How to design agents? What tools do they need? Best practices.',
    topics: ['Agent Skills Pattern', 'Tool Design', 'Context Engineering', 'Contextual Retrieval', 'Coding Patterns'],
    duration: '~60 min',
    slides: 40,
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500',
    available: false,
    href: '/presentation/201',
  },
  {
    id: '301',
    title: 'Master',
    subtitle: 'Production Systems',
    description: 'Multi-agent orchestration, long-running agents, production reliability.',
    topics: ['Multi-Agent Systems', 'Long-Running Agents', 'Production Patterns', 'Debugging', 'Scaling'],
    duration: '~45 min',
    slides: 30,
    color: 'orange',
    gradient: 'from-orange-500 to-red-500',
    available: false,
    href: '/presentation/301',
  },
];

const personas = [
  { id: 'developer', label: 'Developer', icon: '👨‍💻' },
  { id: 'platform', label: 'Platform', icon: '☁️' },
  { id: 'operations', label: 'Operations', icon: '🖥️' },
  { id: 'devops', label: 'DevOps', icon: '🔧' },
];

export default function LearnPage() {
  const [selectedPersona, setSelectedPersona] = useState('developer');
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden relative">
      {/* Animated Background */}
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
      <nav className="relative z-50 flex items-center justify-between px-8 py-6">
        <Link href="/home" className="flex items-center gap-3 group">
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your <span className="text-blue-400">Path</span>
          </h1>
          <p className="text-gray-400 text-lg">
            From fundamentals to production-ready systems
          </p>
        </motion.div>

        {/* Persona Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="text-gray-500 text-sm px-3">I am a:</span>
            {personas.map((persona) => (
              <button
                key={persona.id}
                onClick={() => setSelectedPersona(persona.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  selectedPersona === persona.id
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{persona.icon}</span>
                <span className="text-sm font-medium">{persona.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Learning Path Visualization */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            {levels.map((level, index) => (
              <div key={level.id} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  level.available 
                    ? `bg-gradient-to-r ${level.gradient} text-white` 
                    : 'bg-gray-800 text-gray-500'
                }`}>
                  {level.id}
                </div>
                {index < levels.length - 1 && (
                  <div className="w-20 h-0.5 bg-gradient-to-r from-gray-700 to-gray-800 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {levels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onMouseEnter={() => setHoveredLevel(level.id)}
              onMouseLeave={() => setHoveredLevel(null)}
              className={`relative rounded-3xl overflow-hidden ${!level.available && 'opacity-60'}`}
            >
              {/* Glass Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl" />
              <div className="absolute inset-0 rounded-3xl border border-white/10" />
              
              {/* Top color accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${level.gradient}`} />

              {/* Hover glow */}
              {level.available && (
                <motion.div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500"
                  style={{
                    opacity: hoveredLevel === level.id ? 1 : 0,
                    background: `radial-gradient(circle at 50% 0%, ${
                      level.color === 'blue' ? 'rgba(59,130,246,0.15)' :
                      level.color === 'purple' ? 'rgba(139,92,246,0.15)' :
                      'rgba(249,115,22,0.15)'
                    } 0%, transparent 70%)`,
                  }}
                />
              )}

              {/* Content */}
              <div className="relative p-8">
                {/* Level Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`text-4xl font-black bg-gradient-to-r ${level.gradient} bg-clip-text text-transparent`}>
                    {level.id}
                  </div>
                  {!level.available && (
                    <span className="px-3 py-1 rounded-full bg-gray-800 text-gray-400 text-xs font-medium">
                      Coming Soon
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-1">{level.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{level.subtitle}</p>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {level.description}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {level.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 rounded-lg bg-white/5 text-gray-400 text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                  {level.topics.length > 3 && (
                    <span className="px-2 py-1 text-gray-500 text-xs">
                      +{level.topics.length - 3} more
                    </span>
                  )}
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
                  <span className="flex items-center gap-1">
                    <span>⏱️</span> {level.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>📑</span> {level.slides} slides
                  </span>
                </div>

                {/* CTA */}
                {level.available ? (
                  <Link href={level.href}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${level.gradient} hover:opacity-90 transition-opacity`}
                    >
                      Start Learning →
                    </motion.button>
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

        {/* Quick Start for 101 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm mb-4">New to Agentic AI?</p>
          <Link href="/presentation">
            <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Jump straight into 101 →
            </button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

