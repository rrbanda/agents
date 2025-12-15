'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const principles = [
  {
    id: 'choose',
    number: '01',
    title: 'Choose the Right Tools',
    icon: '🎯',
    insight: 'More tools don\'t always lead to better outcomes.',
    color: '#3b82f6',
    good: 'schedule_event (handles availability + creation)',
    bad: 'list_users + list_events + create_event separately',
    tip: 'Few thoughtful tools > many overlapping tools',
  },
  {
    id: 'namespace',
    number: '02',
    title: 'Namespace Clearly',
    icon: '📁',
    insight: 'Group related tools to help agents select correctly.',
    color: '#10b981',
    good: 'asana_search, jira_search, github_search',
    bad: 'search (which system?), query (ambiguous)',
    tip: 'Namespace by service and/or resource type',
  },
  {
    id: 'context',
    number: '03',
    title: 'Return Meaningful Context',
    icon: '💬',
    insight: 'Natural language > cryptic identifiers.',
    color: '#8b5cf6',
    good: '"John Smith" (id: 12345)',
    bad: 'uuid: a7b3c9d1-e2f4-...',
    tip: 'Include human-readable names alongside IDs',
  },
  {
    id: 'tokens',
    number: '04',
    title: 'Optimize for Tokens',
    icon: '📊',
    insight: 'Context is expensive. Return only what\'s needed.',
    color: '#f59e0b',
    good: 'Pagination, filtering, sensible defaults',
    bad: 'Return all 10,000 rows at once',
    tip: 'Implement search over list when possible',
  },
  {
    id: 'describe',
    number: '05',
    title: 'Prompt-Engineer Descriptions',
    icon: '✍️',
    insight: 'Tool descriptions steer agent behavior.',
    color: '#ec4899',
    good: '"Searches active users by name or email. Returns max 10 results."',
    bad: '"Gets users"',
    tip: 'Write as if explaining to a new team member',
  },
];

export default function ToolDesignSlide() {
  const [activePrinciple, setActivePrinciple] = useState<string>('choose');
  
  const current = principles.find(p => p.id === activePrinciple) || principles[0];

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
          Building Capabilities
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Tool Design Principles
        </h2>
        <p className="text-gray-400">
          Tools are the contract between agents and their environment
        </p>
      </motion.div>

      {/* Key insight banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
      >
        <p className="text-gray-300 text-sm text-center">
          <span className="text-purple-400 font-semibold">The paradigm shift:</span> Design tools for agents, not just wrap existing APIs.
        </p>
      </motion.div>

      {/* Principles selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-2 mb-6 flex-wrap justify-center"
      >
        {principles.map((principle, index) => (
          <motion.button
            key={principle.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            onClick={() => setActivePrinciple(principle.id)}
            whileHover={{ scale: 1.02 }}
            className={`px-4 py-2 rounded-xl border transition-all duration-200 ${
              activePrinciple === principle.id
                ? ''
                : 'border-gray-700/50 hover:border-gray-600'
            }`}
            style={{
              backgroundColor: activePrinciple === principle.id ? `${principle.color}15` : 'transparent',
              borderColor: activePrinciple === principle.id ? principle.color : undefined,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{principle.icon}</span>
              <span
                className="text-sm font-medium"
                style={{ color: activePrinciple === principle.id ? principle.color : '#9ca3af' }}
              >
                {principle.title.split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Detail panel */}
      <motion.div
        key={current.id}
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
          {/* Title row */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: `${current.color}20`,
                border: `1px solid ${current.color}40`,
              }}
            >
              <span className="text-3xl">{current.icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{ backgroundColor: `${current.color}20`, color: current.color }}
                >
                  {current.number}
                </span>
                <h3 className="text-xl font-bold text-white">{current.title}</h3>
              </div>
              <p className="text-gray-400">{current.insight}</p>
            </div>
          </div>

          {/* Good vs Bad comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Good */}
            <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
              <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span>✓</span> Good Practice
              </h4>
              <code className="text-sm text-green-300 bg-green-900/30 px-3 py-2 rounded-lg block font-mono">
                {current.good}
              </code>
            </div>

            {/* Bad */}
            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span>✗</span> Avoid
              </h4>
              <code className="text-sm text-red-300 bg-red-900/30 px-3 py-2 rounded-lg block font-mono">
                {current.bad}
              </code>
            </div>
          </div>

          {/* Pro tip */}
          <div
            className="px-4 py-3 rounded-lg"
            style={{
              backgroundColor: `${current.color}15`,
              borderLeft: `3px solid ${current.color}`,
            }}
          >
            <span className="text-gray-400 text-sm">💡 Pro tip: </span>
            <span className="text-white text-sm">{current.tip}</span>
          </div>
        </div>
      </motion.div>

      {/* ACI insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 max-w-2xl text-center"
      >
        <p className="text-gray-400 text-sm">
          <span className="text-white font-medium">Agent-Computer Interface (ACI):</span>{' '}
          Invest as much effort in ACI as you would in HCI (human-computer interfaces).
        </p>
      </motion.div>
    </div>
  );
}

