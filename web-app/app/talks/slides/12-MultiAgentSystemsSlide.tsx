'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function MultiAgentSystemsSlide() {
  const [activeRole, setActiveRole] = useState<'lead' | 'worker' | 'specialist' | null>('lead');
  const [activeBenefit, setActiveBenefit] = useState<string | null>(null);

  const benefits = [
    {
      id: 'compression',
      icon: '🗜️',
      title: 'Compression',
      desc: 'Distill vast information',
      detail: 'Multiple agents can explore massive datasets in parallel, then compress findings into concise summaries for the lead agent.',
      color: '#f59e0b',
    },
    {
      id: 'separation',
      icon: '🔀',
      title: 'Separation',
      desc: 'Isolated contexts',
      detail: 'Each agent operates with its own focused context window, preventing cross-contamination and enabling specialized expertise.',
      color: '#06b6d4',
    },
    {
      id: 'collective',
      icon: '🧠',
      title: 'Collective',
      desc: 'Greater than sum',
      detail: 'Agents with different specializations collaborate to solve problems no single agent could handle alone.',
      color: '#a855f7',
    },
  ];

  const roles = {
    lead: {
      name: 'Lead Agent (Orchestrator)',
      icon: '👔',
      color: '#8b5cf6',
      responsibilities: [
        'Analyzes incoming queries',
        'Develops research strategy',
        'Spawns and coordinates subagents',
        'Synthesizes final results',
      ],
    },
    worker: {
      name: 'Subagents (Workers)',
      icon: '👷',
      color: '#3b82f6',
      responsibilities: [
        'Execute specific assigned tasks',
        'Operate with isolated context',
        'Return condensed summaries',
        'Run in parallel for speed',
      ],
    },
    specialist: {
      name: 'Specialist Agents',
      icon: '🔬',
      color: '#10b981',
      responsibilities: [
        'Handle domain-specific tasks',
        'Citation and source verification',
        'Quality assessment',
        'Format conversion',
      ],
    },
  };

  return (
    <div className="h-full flex flex-col items-center justify-start pt-8 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wide uppercase rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
          Scaling Up
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
          Multi-Agent Systems
        </h2>
        <p className="text-gray-400 text-sm">
          When one agent isn't enough
        </p>
      </motion.div>

      {/* Why multi-agent - clickable benefits */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-4 flex flex-col items-center max-w-4xl w-full"
      >
        <div className="flex gap-4 w-full">
          {benefits.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => setActiveBenefit(activeBenefit === item.id ? null : item.id)}
              className={`rounded-lg px-4 py-3 border text-center flex-1 transition-all duration-300 cursor-pointer ${
                activeBenefit === item.id
                  ? 'scale-105 shadow-lg'
                  : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600'
              }`}
              style={{
                backgroundColor: activeBenefit === item.id ? `${item.color}15` : undefined,
                borderColor: activeBenefit === item.id ? item.color : undefined,
                boxShadow: activeBenefit === item.id ? `0 4px 20px ${item.color}20` : undefined,
              }}
            >
              <span className="text-2xl block mb-1">{item.icon}</span>
              <span
                className="font-medium text-sm block"
                style={{ color: activeBenefit === item.id ? item.color : 'white' }}
              >
                {item.title}
              </span>
              <span className="text-gray-500 text-xs">{item.desc}</span>
            </motion.button>
          ))}
        </div>

        {/* Expanded benefit detail */}
        {activeBenefit && (
          <motion.div
            key={activeBenefit}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 w-full"
          >
            <div
              className="rounded-lg px-4 py-2 text-center text-sm border"
              style={{
                backgroundColor: `${benefits.find(b => b.id === activeBenefit)?.color}10`,
                borderColor: `${benefits.find(b => b.id === activeBenefit)?.color}30`,
                color: benefits.find(b => b.id === activeBenefit)?.color,
              }}
            >
              {benefits.find(b => b.id === activeBenefit)?.detail}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Main content - side by side */}
      <div className="flex gap-6 w-full max-w-5xl">
        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex-1"
        >
          <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/50">
            <div className="flex flex-col items-center gap-3">
              {/* Lead agent */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setActiveRole('lead')}
                className={`px-6 py-3 rounded-xl border-2 transition-all duration-300 ${
                  activeRole === 'lead' ? 'border-purple-500 shadow-lg shadow-purple-500/30 scale-105' : 'border-purple-500/40'
                }`}
                style={{ backgroundColor: activeRole === 'lead' ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.1)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👔</span>
                  <span className="text-white font-medium">Lead Agent</span>
                </div>
              </motion.button>

              {/* Branching arrows */}
              <div className="flex items-center gap-8 text-gray-500">
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>↙</motion.span>
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}>↓</motion.span>
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}>↘</motion.span>
              </div>

              {/* Worker agents */}
              <div className="flex gap-3">
                {[1, 2, 3].map((i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    onClick={() => setActiveRole('worker')}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                      activeRole === 'worker' ? 'border-blue-500 shadow-lg shadow-blue-500/30 scale-105' : 'border-blue-500/40'
                    }`}
                    style={{ backgroundColor: activeRole === 'worker' ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.1)' }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg">👷</span>
                      <span className="text-white text-sm">Worker {i}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Converging arrows */}
              <div className="flex items-center gap-8 text-gray-500">
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>↘</motion.span>
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}>↓</motion.span>
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>↙</motion.span>
              </div>

              {/* Specialist agent */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => setActiveRole('specialist')}
                className={`px-6 py-3 rounded-xl border-2 transition-all duration-300 ${
                  activeRole === 'specialist' ? 'border-green-500 shadow-lg shadow-green-500/30 scale-105' : 'border-green-500/40'
                }`}
                style={{ backgroundColor: activeRole === 'specialist' ? 'rgba(16,185,129,0.25)' : 'rgba(16,185,129,0.1)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔬</span>
                  <span className="text-white font-medium">Specialist</span>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Detail panel - always visible */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="w-80"
        >
          {activeRole && (
            <motion.div
              key={activeRole}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl p-5 border h-full"
              style={{
                backgroundColor: `${roles[activeRole].color}10`,
                borderColor: `${roles[activeRole].color}40`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${roles[activeRole].color}25` }}
                >
                  <span className="text-2xl">{roles[activeRole].icon}</span>
                </div>
                <h3
                  className="font-bold text-lg"
                  style={{ color: roles[activeRole].color }}
                >
                  {roles[activeRole].name}
                </h3>
              </div>

              <div className="space-y-2">
                {roles[activeRole].responsibilities.map((resp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span
                      className="mt-1"
                      style={{ color: roles[activeRole].color }}
                    >
                      →
                    </span>
                    <span className="text-gray-300">{resp}</span>
                  </motion.div>
                ))}
              </div>

              {/* Role navigation */}
              <div className="mt-6 pt-4 border-t border-gray-700/50 flex justify-center gap-2">
                {(['lead', 'worker', 'specialist'] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => setActiveRole(role)}
                    className="w-3 h-3 rounded-full transition-all"
                    style={{
                      backgroundColor: activeRole === role ? roles[role].color : '#374151',
                      transform: activeRole === role ? 'scale(1.3)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
