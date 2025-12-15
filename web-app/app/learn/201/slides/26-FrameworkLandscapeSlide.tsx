'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const frameworks = [
  {
    id: 'langgraph',
    name: 'LangGraph',
    icon: '🔗',
    color: '#10b981',
    company: 'LangChain',
    tagline: 'Stateful, cyclical graphs for agents',
    description: 'Build agents as state machines with explicit control flow. Supports persistence, human-in-the-loop, and streaming.',
    strengths: ['Fine-grained control', 'Debugging visibility', 'Production-ready'],
    bestFor: 'Complex workflows with branching logic',
    complexity: 'Medium-High',
    popularity: 5,
  },
  {
    id: 'crewai',
    name: 'CrewAI',
    icon: '👥',
    color: '#8b5cf6',
    company: 'CrewAI',
    tagline: 'Role-playing multi-agent framework',
    description: 'Define agents with roles, goals, and backstories. They collaborate like a team with defined processes.',
    strengths: ['Intuitive mental model', 'Built-in collaboration', 'Quick prototyping'],
    bestFor: 'Multi-agent teams with distinct personas',
    complexity: 'Low-Medium',
    popularity: 4,
  },
  {
    id: 'autogen',
    name: 'AutoGen',
    icon: '💬',
    color: '#3b82f6',
    company: 'Microsoft',
    tagline: 'Conversational multi-agent patterns',
    description: 'Agents communicate via conversation. Supports group chat, tool use, and code execution in sandboxes.',
    strengths: ['Flexible patterns', 'Code execution', 'Research-backed'],
    bestFor: 'Conversational agents & code generation',
    complexity: 'Medium',
    popularity: 4,
  },
  {
    id: 'openai-swarm',
    name: 'OpenAI Swarm',
    icon: '🐝',
    color: '#f59e0b',
    company: 'OpenAI',
    tagline: 'Lightweight handoff orchestration',
    description: 'Educational framework showing agent handoff patterns. Agents can transfer control to other agents dynamically.',
    strengths: ['Simple mental model', 'Clean handoffs', 'OpenAI native'],
    bestFor: 'Learning & simple orchestration',
    complexity: 'Low',
    popularity: 3,
  },
  {
    id: 'smolagents',
    name: 'smolagents',
    icon: '🤗',
    color: '#ec4899',
    company: 'Hugging Face',
    tagline: 'Code-first agent library',
    description: 'Agents write and execute Python code directly. Simple API with tool use and multi-agent support.',
    strengths: ['Minimal abstraction', 'Code execution', 'HF integration'],
    bestFor: 'Code-first agent development',
    complexity: 'Low',
    popularity: 3,
  },
];

const corePatternNote = {
  icon: '💡',
  title: 'Framework-Agnostic Patterns',
  points: [
    'All frameworks implement the same core loop (Think → Act → Observe)',
    'Tool design principles apply universally',
    'Context engineering is critical regardless of framework',
    'Start simple — you can build agents with raw API calls too',
  ],
};

export default function FrameworkLandscapeSlide() {
  const [activeFramework, setActiveFramework] = useState<string>('langgraph');
  const current = frameworks.find(f => f.id === activeFramework);

  return (
    <div className="h-full flex flex-col items-center justify-start pt-8 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wide uppercase rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
          Practical Tooling
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
          Framework Landscape
        </h2>
        <p className="text-gray-400 text-sm">
          Popular tools for building agents in production
        </p>
      </motion.div>

      {/* Framework selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 mb-4 flex-wrap justify-center"
      >
        {frameworks.map((fw, index) => (
          <motion.button
            key={fw.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            onClick={() => setActiveFramework(fw.id)}
            className={`px-4 py-2 rounded-xl border-2 transition-all duration-300 ${
              activeFramework === fw.id
                ? 'scale-105'
                : 'border-gray-700/50 hover:border-gray-600'
            }`}
            style={{
              backgroundColor: activeFramework === fw.id ? `${fw.color}15` : 'transparent',
              borderColor: activeFramework === fw.id ? fw.color : undefined,
              boxShadow: activeFramework === fw.id ? `0 4px 20px ${fw.color}20` : undefined,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{fw.icon}</span>
              <span
                className="font-medium text-sm"
                style={{ color: activeFramework === fw.id ? fw.color : '#9ca3af' }}
              >
                {fw.name}
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Framework detail */}
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-5xl mb-4"
          >
            <div
              className="rounded-2xl p-5 border"
              style={{
                backgroundColor: `${current.color}06`,
                borderColor: `${current.color}25`,
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                    style={{ backgroundColor: `${current.color}20` }}
                  >
                    {current.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">{current.name}</h3>
                      <span className="text-xs text-gray-500 px-2 py-0.5 rounded bg-gray-800">
                        by {current.company}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{current.tagline}</p>
                  </div>
                </div>
                
                {/* Complexity & Popularity */}
                <div className="flex gap-4">
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">Complexity</span>
                    <span className="text-sm text-gray-300">{current.complexity}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">Popularity</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: i <= current.popularity ? current.color : '#374151',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4">{current.description}</p>

              {/* Grid */}
              <div className="grid grid-cols-3 gap-4">
                {/* Strengths */}
                <div className="bg-gray-800/30 rounded-xl p-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    ✨ Strengths
                  </h4>
                  <ul className="space-y-1">
                    {current.strengths.map((s) => (
                      <li key={s} className="text-sm text-gray-300 flex items-center gap-2">
                        <span style={{ color: current.color }}>•</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best For */}
                <div className="bg-gray-800/30 rounded-xl p-3 col-span-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    🎯 Best For
                  </h4>
                  <p className="text-gray-300 text-sm">{current.bestFor}</p>
                  
                  {/* Quick code hint */}
                  <div className="mt-3 font-mono text-xs bg-gray-900/50 rounded-lg px-3 py-2 border border-gray-700/50">
                    <span className="text-gray-500"># Install:</span>
                    <br />
                    <span className="text-emerald-400">pip install </span>
                    <span className="text-white">
                      {current.id === 'langgraph' && 'langgraph'}
                      {current.id === 'crewai' && 'crewai'}
                      {current.id === 'autogen' && 'pyautogen'}
                      {current.id === 'openai-swarm' && 'openai-swarm'}
                      {current.id === 'smolagents' && 'smolagents'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Core pattern note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-5xl"
      >
        <div className="rounded-xl p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{corePatternNote.icon}</span>
            <div>
              <h4 className="text-white font-semibold mb-2">{corePatternNote.title}</h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                {corePatternNote.points.map((point, i) => (
                  <motion.p
                    key={point}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="text-gray-400 text-sm flex items-center gap-2"
                  >
                    <span className="text-indigo-400">→</span>
                    {point}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decision hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 text-gray-500 text-sm text-center"
      >
        <span className="text-gray-400">Pro tip:</span> Start with the simplest tool that meets your needs. Migrate later if needed.
      </motion.p>
    </div>
  );
}

