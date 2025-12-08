'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import LineReveal from '../../animations/LineReveal';

const scenarios = [
  {
    id: 'onboarding',
    name: 'New Team Member',
    icon: '👋',
    color: '#10b981',
    agentName: 'Codebase Guide',
    description: 'On-demand architecture knowledge',
    workflow: [
      { actor: 'New Dev', action: '"How does our payment flow work?"', icon: '💬' },
      { actor: 'Agent', action: 'Searches codebase, finds PaymentService + dependencies', icon: '🔍' },
      { actor: 'Agent', action: 'Traces flow: API → PaymentService → Stripe → Webhook', icon: '🧠' },
      { actor: 'Agent', action: 'Finds related design doc and test files', icon: '🔗' },
      { actor: 'Agent', action: 'Explains with code references and diagrams', icon: '📝' },
      { actor: 'New Dev', action: 'Understands, starts contributing faster', icon: '✅' },
    ],
    before: '40+ hours of senior engineer time per new hire',
    after: 'Self-serve answers, escalate only edge cases',
    saved: '30+ hours per new team member',
    keyInsight: 'Agent has infinite patience for repeated questions',
  },
  {
    id: 'release',
    name: 'Release Day',
    icon: '🚀',
    color: '#3b82f6',
    agentName: 'Release Monitor',
    description: 'Intelligent deployment oversight',
    workflow: [
      { actor: 'DevOps', action: 'Triggers deployment to production', icon: '🚀' },
      { actor: 'Agent', action: 'Monitors metrics, logs, error rates in real-time', icon: '🔍' },
      { actor: 'Agent', action: 'Compares against baseline from last 7 days', icon: '🧠' },
      { actor: 'Agent', action: 'Detects: latency up 15%, but within threshold', icon: '📊' },
      { actor: 'Agent', action: 'Posts: "Deploy healthy, minor latency increase noted"', icon: '📝' },
      { actor: 'Team', action: 'Confident release is stable, moves to next task', icon: '✅' },
    ],
    before: '3-4 hours of anxious dashboard watching',
    after: 'Agent alerts only if something is wrong',
    saved: '3-4 person-hours per release',
    keyInsight: 'Agent watches everything, team works on features',
  },
  {
    id: 'incident',
    name: 'Production Incident',
    icon: '🚨',
    color: '#ef4444',
    agentName: 'Incident Investigator',
    description: 'Cross-system root cause analysis',
    workflow: [
      { actor: 'On-call', action: 'Alert fires: "Checkout failures up 300%"', icon: '🚨' },
      { actor: 'Agent', action: 'Pulls logs from app servers, load balancers, database', icon: '🔍' },
      { actor: 'Agent', action: 'Correlates: spike started 10 min after deploy #423', icon: '🧠' },
      { actor: 'Agent', action: 'Finds: new code path hitting unindexed DB query', icon: '🔗' },
      { actor: 'Agent', action: 'Drafts incident report with rollback recommendation', icon: '📝' },
      { actor: 'Team', action: 'Reviews, approves rollback, incident resolved', icon: '✅' },
    ],
    before: '2-4 hours of 4 people investigating',
    after: '30 min with agent doing correlation',
    saved: '8-16 person-hours per incident',
    keyInsight: 'Agent reads all systems, team makes decisions',
  },
  {
    id: 'security',
    name: 'Security Alert',
    icon: '🔒',
    color: '#f59e0b',
    agentName: 'Security Analyst',
    description: 'Rapid threat assessment and response',
    workflow: [
      { actor: 'Alert', action: 'Anomaly detected: unusual API calls from service account', icon: '🔒' },
      { actor: 'Agent', action: 'Pulls access logs: identifies source IP, timing pattern', icon: '🔍' },
      { actor: 'Agent', action: 'Correlates: matches recent config change + new deployment', icon: '🧠' },
      { actor: 'Agent', action: 'Assessment: legitimate - new microservice testing APIs', icon: '🔗' },
      { actor: 'Agent', action: 'Generates report with evidence chain for audit', icon: '📝' },
      { actor: 'Team', action: 'Reviews, confirms false positive, documents for future', icon: '✅' },
    ],
    before: '4-8 hours of high-stress investigation',
    after: '30 min assessment with full context',
    saved: '4-6 person-hours per security alert',
    keyInsight: 'Agent gathers evidence, team makes security decisions',
  },
];

export default function RealWorldSolutionSlide() {
  const [activeScenario, setActiveScenario] = useState(scenarios[0]);

  return (
    <div className="h-full flex flex-col items-center p-6 overflow-hidden">
      {/* Title */}
      <div className="flex-shrink-0 text-center mb-4 pt-2">
        <LineReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            The Solution
          </h2>
          <p className="text-gray-400">
            AI assistants that work across team boundaries
          </p>
        </LineReveal>
      </div>

      {/* Scenario Tabs */}
      <motion.div 
        className="flex gap-2 mb-4 p-1 bg-gray-800/50 rounded-xl flex-shrink-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => setActiveScenario(scenario)}
            className="relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
            style={{
              backgroundColor: activeScenario.id === scenario.id ? `${scenario.color}20` : 'transparent',
              color: activeScenario.id === scenario.id ? scenario.color : '#9ca3af',
              border: activeScenario.id === scenario.id ? `2px solid ${scenario.color}` : '2px solid transparent',
            }}
          >
            <span className="text-lg">{scenario.icon}</span>
            <span className="font-medium text-sm">{scenario.name}</span>
          </button>
        ))}
      </motion.div>

      {/* Content Area */}
      <motion.div
        key={activeScenario.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl flex-1"
      >
        <div className="grid grid-cols-3 gap-4 h-full">
          {/* Left: Agent Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl overflow-hidden flex flex-col"
            style={{
              background: `linear-gradient(135deg, ${activeScenario.color}15 0%, rgba(31, 41, 55, 0.9) 100%)`,
              border: `2px solid ${activeScenario.color}40`,
            }}
          >
            {/* Agent Header */}
            <div 
              className="p-4 text-center"
              style={{ 
                background: `linear-gradient(135deg, ${activeScenario.color}25 0%, ${activeScenario.color}10 100%)`,
              }}
            >
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl"
                style={{ 
                  backgroundColor: `${activeScenario.color}40`,
                  boxShadow: `0 0 20px ${activeScenario.color}30`,
                }}
              >
                🤖
              </div>
              <h3 
                className="font-bold text-lg"
                style={{ color: activeScenario.color }}
              >
                {activeScenario.agentName}
              </h3>
              <p className="text-gray-400 text-xs">{activeScenario.description}</p>
            </div>

            {/* Stats */}
            <div className="p-3 space-y-2 flex-1">
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="text-xs text-red-400 mb-0.5">Before</div>
                <div className="text-white text-xs line-through opacity-60">
                  {activeScenario.before}
                </div>
              </div>
              <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="text-xs text-green-400 mb-0.5">After</div>
                <div className="text-white text-xs">
                  {activeScenario.after}
                </div>
              </div>
              <div 
                className="p-2 rounded-lg"
                style={{ 
                  backgroundColor: `${activeScenario.color}15`,
                  border: `1px solid ${activeScenario.color}30`,
                }}
              >
                <div className="text-xs mb-0.5" style={{ color: activeScenario.color }}>Time Saved</div>
                <div className="text-white font-bold text-xs">
                  {activeScenario.saved}
                </div>
              </div>
            </div>

            {/* Key Insight */}
            <div className="p-3 bg-gray-900/50 border-t border-gray-700/50">
              <p className="text-gray-300 text-xs text-center italic">
                💡 {activeScenario.keyInsight}
              </p>
            </div>
          </motion.div>

          {/* Right: Workflow Timeline */}
          <div className="col-span-2 bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 flex flex-col">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2 flex-shrink-0">
              <span className="text-lg">📋</span>
              How It Works
            </h4>
            
            <div className="space-y-2 flex-1 overflow-auto">
              {activeScenario.workflow.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.06 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-900/50 transition-colors"
                  style={{
                    backgroundColor: step.actor === 'Agent' ? `${activeScenario.color}08` : 'transparent',
                    borderLeft: step.actor === 'Agent' ? `3px solid ${activeScenario.color}` : '3px solid transparent',
                  }}
                >
                  <div className="w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center text-sm flex-shrink-0">
                    {step.icon}
                  </div>
                  <div 
                    className="w-16 text-xs font-bold flex-shrink-0"
                    style={{ 
                      color: step.actor === 'Agent' ? activeScenario.color : '#9ca3af',
                    }}
                  >
                    {step.actor}
                  </div>
                  <div className="flex-1 text-gray-300 text-sm">{step.action}</div>
                </motion.div>
              ))}
            </div>

            {/* Loop indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-3 pt-3 border-t border-gray-700/50 text-center flex-shrink-0"
            >
              <span className="text-gray-500 text-xs">
                Agent handles the correlation • Team makes the decisions
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Key Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-4 text-center flex-shrink-0"
      >
        <p className="text-blue-400 font-semibold text-lg">
          One agent that understands all systems • Serves all teams • Multiplies productivity
        </p>
      </motion.div>
    </div>
  );
}
