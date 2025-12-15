'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const trustLevels = [
  {
    level: 1,
    name: 'Supervised',
    icon: '👁️',
    color: '#ef4444',
    description: 'Tight oversight during learning phase',
    humanRole: 'Approves every action',
    agentRole: 'Proposes, waits for approval',
    useCase: 'New agents, high-risk tasks',
  },
  {
    level: 2,
    name: 'Trusted',
    icon: '✅',
    color: '#f59e0b',
    description: 'Routine tasks delegated with monitoring',
    humanRole: 'Reviews outcomes, spot checks',
    agentRole: 'Executes, reports results',
    useCase: 'Proven patterns, medium risk',
  },
  {
    level: 3,
    name: 'Collaborative',
    icon: '🤝',
    color: '#10b981',
    description: 'Shared decision-making on complex tasks',
    humanRole: 'Provides judgment on edge cases',
    agentRole: 'Handles routine, escalates when uncertain',
    useCase: 'Complex workflows, nuanced decisions',
  },
  {
    level: 4,
    name: 'Advisory',
    icon: '💡',
    color: '#8b5cf6',
    description: 'Agent provides proactive insights',
    humanRole: 'Receives recommendations',
    agentRole: 'Analyzes, suggests, predicts',
    useCase: 'Strategic support, forecasting',
  },
];

const mechanisms = [
  { icon: '🔐', name: 'Permissions', desc: 'Scope tools' },
  { icon: '📋', name: 'Audit Log', desc: 'Track actions' },
  { icon: '🚦', name: 'Approval Gates', desc: 'Sign-off' },
  { icon: '🔔', name: 'Escalation', desc: 'Auto-flag' },
];

const inboxItems = [
  { status: 'pending', action: 'Delete 50 records', risk: 'high', time: '2m ago' },
  { status: 'pending', action: 'Send bulk email', risk: 'medium', time: '5m ago' },
  { status: 'approved', action: 'Update config', risk: 'low', time: '12m ago' },
];

export default function HumanInTheLoopSlide() {
  const [activeLevel, setActiveLevel] = useState(2);
  const active = trustLevels.find(t => t.level === activeLevel);

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-5"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
          Trust & Oversight
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Human-in-the-Loop
        </h2>
        <p className="text-gray-400">
          Calibrating autonomy with accountability
        </p>
      </motion.div>

      {/* Trust Level Slider */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-4xl mb-5"
      >
        <div className="relative">
          {/* Progress bar */}
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${(activeLevel / 4) * 100}%`,
                backgroundColor: active?.color,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Level markers */}
          <div className="flex justify-between mt-2">
            {trustLevels.map((level) => (
              <button
                key={level.level}
                onClick={() => setActiveLevel(level.level)}
                className={`flex flex-col items-center transition-all ${
                  activeLevel === level.level ? 'scale-110' : 'opacity-60 hover:opacity-80'
                }`}
              >
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg mb-1 border-2"
                  style={{
                    backgroundColor: activeLevel >= level.level ? `${level.color}20` : 'transparent',
                    borderColor: activeLevel >= level.level ? level.color : '#374151',
                  }}
                  animate={{
                    scale: activeLevel === level.level ? 1.1 : 1,
                  }}
                >
                  {level.icon}
                </motion.div>
                <span
                  className="text-xs font-medium"
                  style={{ color: activeLevel === level.level ? level.color : '#6b7280' }}
                >
                  {level.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Active level detail */}
      {active && (
        <motion.div
          key={active.level}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl grid grid-cols-3 gap-4 mb-5"
        >
          {/* Description */}
          <div
            className="rounded-xl p-4 border"
            style={{
              backgroundColor: `${active.color}08`,
              borderColor: `${active.color}30`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{active.icon}</span>
              <h3 className="font-bold text-lg" style={{ color: active.color }}>
                {active.name}
              </h3>
            </div>
            <p className="text-gray-300 text-sm">{active.description}</p>
            <div className="mt-3 pt-3 border-t border-gray-700/50">
              <span className="text-xs text-gray-500">Best for:</span>
              <p className="text-sm text-gray-400">{active.useCase}</p>
            </div>
          </div>

          {/* Human Role */}
          <div className="rounded-xl p-4 border border-gray-700/50 bg-gray-800/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">👤</span>
              <h4 className="font-semibold text-white">Human Role</h4>
            </div>
            <p className="text-gray-300 text-sm">{active.humanRole}</p>
            <div className="mt-3 pt-3 border-t border-gray-700/50">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Involvement:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: i <= (5 - active.level) ? active.color : '#374151',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Agent Role */}
          <div className="rounded-xl p-4 border border-gray-700/50 bg-gray-800/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🤖</span>
              <h4 className="font-semibold text-white">Agent Role</h4>
            </div>
            <p className="text-gray-300 text-sm">{active.agentRole}</p>
            <div className="mt-3 pt-3 border-t border-gray-700/50">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Autonomy:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: i <= active.level ? active.color : '#374151',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Bottom section: Mechanisms + Agent Inbox */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-4xl grid grid-cols-2 gap-4"
      >
        {/* Oversight Mechanisms */}
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
            Mechanisms
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {mechanisms.map((mech, i) => (
              <motion.div
                key={mech.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="p-2 rounded-lg bg-gray-800/30 border border-gray-700/50 flex items-center gap-2"
              >
                <span className="text-lg">{mech.icon}</span>
                <div>
                  <span className="text-white text-xs font-medium block">{mech.name}</span>
                  <span className="text-gray-500 text-[10px]">{mech.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Agent Inbox */}
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-2">
            <span>📥</span> Agent Inbox
            <span className="text-[10px] text-gray-600 font-normal">(async collaboration)</span>
          </h4>
          <div className="rounded-lg border border-gray-700/50 bg-gray-900/50 overflow-hidden">
            {inboxItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className={`flex items-center justify-between px-3 py-2 text-xs ${
                  i < inboxItems.length - 1 ? 'border-b border-gray-800' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.status === 'pending' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
                    }`}
                  />
                  <span className="text-gray-300">{item.action}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] ${
                      item.risk === 'high'
                        ? 'bg-red-500/20 text-red-400'
                        : item.risk === 'medium'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    {item.risk}
                  </span>
                  <span className="text-gray-600">{item.time}</span>
                </div>
              </motion.div>
            ))}
            <div className="px-3 py-1.5 bg-gray-800/50 text-center">
              <span className="text-[10px] text-gray-500">
                Humans review when available • Agents continue other work
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

