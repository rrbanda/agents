'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import LineReveal from '../../animations/LineReveal';

const personas = [
  {
    id: 'developer',
    name: 'Application Developer',
    icon: '👨‍💻',
    color: '#3b82f6',
    agentName: 'Code Navigator',
    description: 'Your AI pair programmer that knows the entire codebase',
    workflow: [
      { actor: 'You', action: '"How does the authentication flow work?"', icon: '💬' },
      { actor: 'Agent', action: 'Searches codebase, finds AuthService, middleware, JWT handling', icon: '🔍' },
      { actor: 'Agent', action: 'Traces: Login → AuthService → TokenManager → Redis cache', icon: '🧠' },
      { actor: 'Agent', action: 'Shows code snippets with line references', icon: '📝' },
      { actor: 'You', action: 'Understand in minutes, start coding immediately', icon: '✅' },
    ],
    before: '15+ hours/week reading code',
    after: 'Ask questions, get instant answers with code refs',
    saved: '10+ hours/week',
    keyInsight: 'Agent has read every file, remembers all patterns',
    tools: ['Codebase Search', 'Dependency Graph', 'Test Generator', 'Doc Writer'],
  },
  {
    id: 'platform',
    name: 'Platform Engineer',
    icon: '☁️',
    color: '#8b5cf6',
    agentName: 'Infrastructure Assistant',
    description: 'AI that monitors and optimizes your platform',
    workflow: [
      { actor: 'You', action: '"Which pods are over-provisioned?"', icon: '💬' },
      { actor: 'Agent', action: 'Queries Prometheus metrics for last 30 days', icon: '🔍' },
      { actor: 'Agent', action: 'Analyzes CPU/memory utilization vs requests', icon: '🧠' },
      { actor: 'Agent', action: 'Generates report: 12 pods using <20% of requested resources', icon: '📊' },
      { actor: 'You', action: 'Review recommendations, approve changes', icon: '✅' },
    ],
    before: '20+ hours/week on repetitive requests',
    after: 'Self-service platform with AI guidance',
    saved: '15+ hours/week',
    keyInsight: 'Agent handles routine, you handle architecture',
    tools: ['K8s Query', 'Cost Analyzer', 'Config Validator', 'Capacity Planner'],
  },
  {
    id: 'operations',
    name: 'Operations / SRE',
    icon: '🖥️',
    color: '#ef4444',
    agentName: 'Incident Investigator',
    description: 'AI that correlates signals and finds root causes',
    workflow: [
      { actor: 'Alert', action: 'API latency spike detected (p99 > 2s)', icon: '🚨' },
      { actor: 'Agent', action: 'Pulls logs, metrics, traces from affected services', icon: '🔍' },
      { actor: 'Agent', action: 'Correlates: Started 5 min after deploy #847', icon: '🧠' },
      { actor: 'Agent', action: 'Root cause: New code path hitting unindexed query', icon: '🔗' },
      { actor: 'Agent', action: 'Suggests: Rollback or add index (shows SQL)', icon: '📝' },
      { actor: 'You', action: 'Approve rollback, incident resolved in 15 min', icon: '✅' },
    ],
    before: '4-8 hours per incident',
    after: '15-30 min with AI correlation',
    saved: '75% reduction in MTTR',
    keyInsight: 'Agent sees all systems at once, you make decisions',
    tools: ['Log Aggregator', 'Metric Correlator', 'Trace Analyzer', 'Runbook Executor'],
  },
  {
    id: 'devops',
    name: 'DevOps Engineer',
    icon: '🔧',
    color: '#10b981',
    agentName: 'Pipeline Assistant',
    description: 'AI that maintains and optimizes your CI/CD',
    workflow: [
      { actor: 'Alert', action: 'Pipeline failed: test-integration stage', icon: '🔴' },
      { actor: 'Agent', action: 'Analyzes failure logs, identifies flaky test', icon: '🔍' },
      { actor: 'Agent', action: 'Cross-references: Same test failed 3x this week', icon: '🧠' },
      { actor: 'Agent', action: 'Suggests fix: Add retry logic or mock external service', icon: '📝' },
      { actor: 'You', action: 'Apply fix, pipeline passes, deploy continues', icon: '✅' },
    ],
    before: '10+ hours/week on pipeline issues',
    after: 'AI diagnoses, you approve fixes',
    saved: '8+ hours/week',
    keyInsight: 'Agent learns your pipeline patterns over time',
    tools: ['Build Analyzer', 'Security Scanner', 'Release Coordinator', 'Runbook Generator'],
  },
];

export default function RealWorldSolutionSlide() {
  const [activePersona, setActivePersona] = useState(personas[0]);

  return (
    <div className="h-full flex flex-col items-center p-4 overflow-hidden">
      {/* Title */}
      <div className="flex-shrink-0 text-center mb-3">
        <LineReveal delay={0.1}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
            AI Agents <span className="text-green-400">By Role</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Specialized AI teammates for each persona
          </p>
        </LineReveal>
      </div>

      {/* Persona Tabs */}
      <motion.div 
        className="flex gap-2 mb-3 p-1 bg-gray-800/50 rounded-xl flex-shrink-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {personas.map((persona) => (
          <button
            key={persona.id}
            onClick={() => setActivePersona(persona)}
            className="relative px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
            style={{
              backgroundColor: activePersona.id === persona.id ? `${persona.color}20` : 'transparent',
              color: activePersona.id === persona.id ? persona.color : '#9ca3af',
              border: activePersona.id === persona.id ? `2px solid ${persona.color}` : '2px solid transparent',
            }}
          >
            <span className="text-lg">{persona.icon}</span>
            <span className="font-medium text-xs">{persona.name}</span>
          </button>
        ))}
      </motion.div>

      {/* Content Area */}
      <motion.div
        key={activePersona.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl flex-1"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 h-full overflow-y-auto lg:overflow-visible">
          {/* Left: Agent Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 rounded-xl overflow-hidden flex flex-col"
            style={{
              background: `linear-gradient(135deg, ${activePersona.color}15 0%, rgba(31, 41, 55, 0.9) 100%)`,
              border: `2px solid ${activePersona.color}40`,
            }}
          >
            {/* Agent Header */}
            <div 
              className="p-3 text-center"
              style={{ 
                background: `linear-gradient(135deg, ${activePersona.color}25 0%, ${activePersona.color}10 100%)`,
              }}
            >
              <div className="flex items-center justify-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ 
                    backgroundColor: `${activePersona.color}40`,
                    boxShadow: `0 0 20px ${activePersona.color}30`,
                  }}
                >
                  🤖
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-base" style={{ color: activePersona.color }}>
                    {activePersona.agentName}
                  </h3>
                  <p className="text-gray-400 text-[10px]">{activePersona.description}</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-2 space-y-1.5 flex-1">
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="text-[10px] text-red-400">Before</div>
                <div className="text-white text-xs line-through opacity-60">{activePersona.before}</div>
              </div>
              <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="text-[10px] text-green-400">After</div>
                <div className="text-white text-xs">{activePersona.after}</div>
              </div>
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${activePersona.color}15`, border: `1px solid ${activePersona.color}30` }}>
                <div className="text-[10px]" style={{ color: activePersona.color }}>Time Saved</div>
                <div className="text-white font-bold text-xs">{activePersona.saved}</div>
              </div>
            </div>

            {/* Tools */}
            <div className="p-2 bg-gray-900/50 border-t border-gray-700/50">
              <div className="text-[10px] text-gray-500 mb-1">Agent Tools:</div>
              <div className="flex flex-wrap gap-1">
                {activePersona.tools.map(tool => (
                  <span 
                    key={tool} 
                    className="text-[9px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Insight */}
            <div className="p-2 bg-gray-900/70 border-t border-gray-700/50">
              <p className="text-gray-300 text-[10px] text-center italic">
                💡 {activePersona.keyInsight}
              </p>
            </div>
          </motion.div>

          {/* Right: Workflow Timeline */}
          <div className="lg:col-span-3 bg-gray-800/50 rounded-xl p-3 border border-gray-700/50 flex flex-col">
            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2 flex-shrink-0">
              <span className="text-base">📋</span>
              How {activePersona.agentName} Helps
            </h4>
            
            <div className="space-y-1.5 flex-1 overflow-auto">
              {activePersona.workflow.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.06 }}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-900/50 transition-colors"
                  style={{
                    backgroundColor: step.actor === 'Agent' ? `${activePersona.color}08` : 'transparent',
                    borderLeft: step.actor === 'Agent' ? `3px solid ${activePersona.color}` : '3px solid transparent',
                  }}
                >
                  <div className="w-6 h-6 rounded-lg bg-gray-800 flex items-center justify-center text-sm flex-shrink-0">
                    {step.icon}
                  </div>
                  <div 
                    className="w-12 text-[10px] font-bold flex-shrink-0"
                    style={{ color: step.actor === 'Agent' ? activePersona.color : '#9ca3af' }}
                  >
                    {step.actor}
                  </div>
                  <div className="flex-1 text-gray-300 text-xs">{step.action}</div>
                </motion.div>
              ))}
            </div>

            {/* Loop indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-2 pt-2 border-t border-gray-700/50 text-center flex-shrink-0"
            >
              <span className="text-gray-500 text-[10px]">
                Agent handles research & correlation • You make the decisions
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
        className="mt-2 text-center flex-shrink-0"
      >
        <p className="text-green-400 font-semibold text-sm">
          Same AI platform • Different tools per role • Multiplied productivity
        </p>
      </motion.div>
    </div>
  );
}
