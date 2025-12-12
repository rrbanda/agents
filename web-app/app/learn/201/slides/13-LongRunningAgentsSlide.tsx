'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function LongRunningAgentsSlide() {
  const [activePhase, setActivePhase] = useState<'init' | 'coding' | 'artifacts'>('init');

  const phases = {
    init: {
      title: 'Initializer Agent',
      icon: '🚀',
      color: '#3b82f6',
      description: 'Sets up the workspace and leaves context for the coding agent',
      tasks: [
        'Spawned by git event (PR, issue, etc.)',
        'Clones repo, reads environment',
        'Writes initial progress log',
        'Spawns coding agent with context',
      ],
    },
    coding: {
      title: 'Coding Agent',
      icon: '💻',
      color: '#8b5cf6',
      description: 'Works incrementally, leaving artifacts for future sessions',
      tasks: [
        'Reads PROGRESS.md for context',
        'Makes incremental changes',
        'Updates progress after each step',
        'Commits changes, updates log',
      ],
    },
    artifacts: {
      title: 'Artifact-Based State',
      icon: '📁',
      color: '#10b981',
      description: 'Files provide continuity across sessions and context windows',
      tasks: [
        'PROGRESS.md tracks completed work',
        'Git history shows changes',
        'Environment files persist config',
        'Notes capture decisions',
      ],
    },
  };

  const current = phases[activePhase];

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
          Deep Agents
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Long-Running & Deep Agents
        </h2>
        <p className="text-gray-400">
          Autonomous operation over extended tasks without continuous prompts
        </p>
      </motion.div>

      {/* Challenge banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 max-w-3xl"
      >
        <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <span className="text-yellow-400 font-medium">The Challenge</span>
              <p className="text-gray-400 text-sm mt-1">
                Context windows reset. How does an agent maintain progress on multi-hour tasks?
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Phase selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-3 mb-6"
      >
        {(Object.keys(phases) as Array<keyof typeof phases>).map((phase, index) => (
          <motion.button
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => setActivePhase(phase)}
            className={`px-5 py-3 rounded-xl border-2 transition-all duration-300 ${
              activePhase === phase
                ? ''
                : 'border-gray-700/50 hover:border-gray-600'
            }`}
            style={{
              backgroundColor: activePhase === phase ? `${phases[phase].color}15` : 'transparent',
              borderColor: activePhase === phase ? phases[phase].color : undefined,
              boxShadow: activePhase === phase ? `0 8px 30px ${phases[phase].color}20` : undefined,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{phases[phase].icon}</span>
              <span
                className="font-medium"
                style={{ color: activePhase === phase ? phases[phase].color : '#9ca3af' }}
              >
                {phases[phase].title}
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Timeline visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-4xl mb-6"
      >
        <div className="relative h-16">
          {/* Progress line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-800 -translate-y-1/2 rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ 
                width: activePhase === 'init' ? '33%' : activePhase === 'coding' ? '66%' : '100%' 
              }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Phase markers */}
          <div className="absolute inset-0 flex items-center justify-between px-12">
            {(Object.keys(phases) as Array<keyof typeof phases>).map((phase, index) => (
              <motion.div
                key={phase}
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    (activePhase === 'init' && index === 0) ||
                    (activePhase === 'coding' && index <= 1) ||
                    (activePhase === 'artifacts' && index <= 2)
                      ? ''
                      : 'bg-gray-700'
                  }`}
                  style={{
                    backgroundColor: 
                      (activePhase === 'init' && index === 0) ||
                      (activePhase === 'coding' && index <= 1) ||
                      (activePhase === 'artifacts' && index <= 2)
                        ? phases[phase].color
                        : undefined,
                    boxShadow:
                      (activePhase === 'init' && index === 0) ||
                      (activePhase === 'coding' && index <= 1) ||
                      (activePhase === 'artifacts' && index <= 2)
                        ? `0 0 10px ${phases[phase].color}`
                        : undefined,
                  }}
                />
                <span className="text-xs text-gray-500 mt-2 hidden md:block">
                  {phase === 'init' ? 'Initialize' : phase === 'coding' ? 'Work' : 'Persist'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Detail panel */}
      <motion.div
        key={activePhase}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div
          className="rounded-2xl p-6 border"
          style={{
            backgroundColor: `${current.color}08`,
            borderColor: `${current.color}25`,
          }}
        >
          {/* Title */}
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${current.color}20` }}
            >
              <span className="text-3xl">{current.icon}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{current.title}</h3>
              <p className="text-gray-400 text-sm">{current.description}</p>
            </div>
          </div>

          {/* Tasks */}
          <div className="grid grid-cols-2 gap-3">
            {current.tasks.map((task, index) => (
              <motion.div
                key={task}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="flex items-center gap-3 bg-gray-800/40 rounded-lg p-3"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: `${current.color}30`, color: current.color }}
                >
                  {index + 1}
                </div>
                <span className="text-gray-300 text-sm">{task}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Key insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 px-6 py-3 rounded-xl bg-gray-800/30 border border-gray-700/50"
      >
        <p className="text-gray-300 text-sm text-center">
          <span className="text-white font-medium">The key:</span> Treat the file system as persistent memory.
          <br />
          <span className="text-gray-500">Every context window should end with artifacts for the next.</span>
        </p>
      </motion.div>
    </div>
  );
}

