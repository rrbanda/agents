'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const levels = [
  {
    level: 1,
    name: 'Startup',
    icon: '📋',
    color: '#f59e0b',
    description: 'Skill metadata loaded into system prompt',
    content: 'Name + Description only',
    tokens: '~50 tokens',
  },
  {
    level: 2,
    name: 'Skill Trigger',
    icon: '📖',
    color: '#8b5cf6',
    description: 'Agent reads SKILL.md when relevant',
    content: 'Full instructions loaded',
    tokens: '~500 tokens',
  },
  {
    level: 3,
    name: 'Deep Dive',
    icon: '🔬',
    color: '#10b981',
    description: 'Additional files loaded on-demand',
    content: 'Reference docs, scripts',
    tokens: 'As needed',
  },
];

const benefits = [
  { icon: '⚡', title: 'Context Efficient', desc: 'Load only what\'s needed' },
  { icon: '📦', title: 'Composable', desc: 'Mix and match skills' },
  { icon: '🔄', title: 'Scalable', desc: 'Unbounded skill size' },
  { icon: '🌐', title: 'Portable', desc: 'Share across agents' },
];

export default function AgentSkillsSlide() {
  const [activeLevel, setActiveLevel] = useState(1);

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
          Expertise Packaging
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Agent Skills Pattern
        </h2>
        <p className="text-gray-400">
          Organized folders of instructions for dynamic discovery and loading
        </p>
      </motion.div>

      {/* Main content */}
      <div className="w-full max-w-5xl grid grid-cols-2 gap-6">
        {/* Left: Skill structure */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/50"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="text-cyan-400">📁</span> Skill Structure
          </h3>
          
          {/* File tree */}
          <div className="font-mono text-sm bg-gray-900/60 rounded-lg p-4 border border-gray-700/30">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-1"
            >
              <div className="text-cyan-400">skill-directory/</div>
              <motion.div
                animate={{
                  backgroundColor: activeLevel >= 1 ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                }}
                className="pl-4 rounded px-2 py-0.5"
              >
                <span className="text-amber-400">├── SKILL.md</span>
                <span className="text-gray-500 ml-2 text-xs">← Metadata + Instructions</span>
              </motion.div>
              <motion.div
                animate={{
                  backgroundColor: activeLevel >= 3 ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                }}
                className="pl-4 rounded px-2 py-0.5"
              >
                <span className={activeLevel >= 3 ? 'text-emerald-400' : 'text-gray-500'}>├── reference.md</span>
                <span className="text-gray-600 ml-2 text-xs">← Deep dive docs</span>
              </motion.div>
              <motion.div
                animate={{
                  backgroundColor: activeLevel >= 3 ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                }}
                className="pl-4 rounded px-2 py-0.5"
              >
                <span className={activeLevel >= 3 ? 'text-emerald-400' : 'text-gray-500'}>└── scripts/</span>
                <span className="text-gray-600 ml-2 text-xs">← Executable tools</span>
              </motion.div>
            </motion.div>
          </div>

          {/* YAML example */}
          <div className="mt-4">
            <span className="text-xs text-gray-500 uppercase tracking-wider">SKILL.md Frontmatter</span>
            <div className="mt-2 font-mono text-xs bg-gray-900/60 rounded-lg p-3 border border-gray-700/30">
              <div className="text-gray-500">---</div>
              <div><span className="text-purple-400">name</span>: <span className="text-amber-300">"form-filler"</span></div>
              <div><span className="text-purple-400">description</span>: <span className="text-amber-300">"Fills PDF forms"</span></div>
              <div className="text-gray-500">---</div>
            </div>
          </div>
        </motion.div>

        {/* Right: Progressive Disclosure */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="text-cyan-400">📊</span> Progressive Disclosure
          </h3>

          {/* Level cards */}
          <div className="space-y-3">
            {levels.map((level) => (
              <motion.button
                key={level.level}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + level.level * 0.1 }}
                onClick={() => setActiveLevel(level.level)}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-300 ${
                  activeLevel >= level.level
                    ? 'scale-[1.01]'
                    : 'border-gray-700/50 opacity-60'
                }`}
                style={{
                  backgroundColor: activeLevel >= level.level ? `${level.color}10` : 'transparent',
                  borderColor: activeLevel >= level.level ? `${level.color}60` : undefined,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                      style={{ backgroundColor: `${level.color}20` }}
                    >
                      {level.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-bold"
                          style={{ color: level.color }}
                        >
                          LEVEL {level.level}
                        </span>
                        <span className="text-white font-medium text-sm">{level.name}</span>
                      </div>
                      <p className="text-gray-500 text-xs">{level.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400">{level.tokens}</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Animated indicator */}
          <div className="mt-4 flex justify-center gap-2">
            {[1, 2, 3].map((l) => (
              <button
                key={l}
                onClick={() => setActiveLevel(l)}
                className="w-3 h-3 rounded-full transition-all"
                style={{
                  backgroundColor: activeLevel >= l ? levels[l - 1].color : '#374151',
                  transform: activeLevel === l ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Benefits footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 flex gap-4"
      >
        {benefits.map((benefit, i) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="px-4 py-2 rounded-lg bg-gray-800/30 border border-gray-700/50 text-center"
          >
            <span className="text-xl block">{benefit.icon}</span>
            <span className="text-white text-sm font-medium">{benefit.title}</span>
            <span className="text-gray-500 text-xs block">{benefit.desc}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

