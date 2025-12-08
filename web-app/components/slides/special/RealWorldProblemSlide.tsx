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
    description: 'Developer joins and needs to understand the codebase',
    teams: [
      { role: '👨‍💻 New Dev', task: 'Read docs, ask questions, feel lost' },
      { role: '👨‍💻 Senior Dev', task: 'Context-switch to explain architecture' },
      { role: '🔧 DevOps', task: 'Walk through CI/CD, environments' },
      { role: '☁️ Platform', task: 'Explain deployment process, access setup' },
    ],
    challenge: 'Senior engineers become documentation machines for weeks',
    timeWasted: '40+ hours of senior engineer time per new hire',
    realPain: 'Tribal knowledge lives in people\'s heads, not systems',
  },
  {
    id: 'release',
    name: 'Release Day',
    icon: '🚀',
    color: '#3b82f6',
    description: 'Deploying a major feature to production',
    teams: [
      { role: '👨‍💻 Developer', task: 'Ready to hotfix if something breaks' },
      { role: '🔧 DevOps', task: 'Monitor pipeline, check for failures' },
      { role: '☁️ Platform', task: 'Ensure infra can handle new load' },
      { role: '🖥️ SysAdmin', task: 'Watch system metrics for anomalies' },
    ],
    challenge: 'Waiting, watching dashboards, hoping nothing goes wrong',
    timeWasted: '3-4 hours of nervous monitoring per release',
    realPain: 'High-stress, manual verification across multiple systems',
  },
  {
    id: 'incident',
    name: 'Production Incident',
    icon: '🚨',
    color: '#ef4444',
    description: 'Something breaks in production at 2am',
    teams: [
      { role: '🖥️ SysAdmin', task: 'SSH into servers, grep through logs' },
      { role: '🔧 DevOps', task: 'Check if recent deployment caused it' },
      { role: '☁️ Platform', task: 'Verify infrastructure health' },
      { role: '👨‍💻 Developer', task: 'Review code changes, identify bug' },
    ],
    challenge: 'Everyone gathers data separately, then Slack threads trying to piece it together',
    timeWasted: '2-4 hours to find root cause',
    realPain: 'Each person has a piece of the puzzle, but no one sees the whole picture',
  },
  {
    id: 'security',
    name: 'Security Alert',
    icon: '🔒',
    color: '#f59e0b',
    description: 'Suspicious activity detected in production systems',
    teams: [
      { role: '🖥️ SysAdmin', task: 'Check access logs, identify anomalies' },
      { role: '🔧 DevOps', task: 'Review recent config changes, secrets access' },
      { role: '☁️ Platform', task: 'Check cloud IAM logs, network traffic' },
      { role: '👨‍💻 Developer', task: 'Audit code for vulnerabilities' },
    ],
    challenge: 'Racing to assess threat while coordinating across all systems',
    timeWasted: '4-8 hours to fully investigate an alert',
    realPain: 'High-stress investigation with incomplete information',
  },
];

export default function RealWorldProblemSlide() {
  const [activeScenario, setActiveScenario] = useState(scenarios[0]);

  return (
    <div className="h-full flex flex-col items-center p-6 overflow-hidden">
      {/* Title */}
      <div className="flex-shrink-0 text-center mb-4 pt-2">
        <LineReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Challenges We All Share
          </h2>
          <p className="text-gray-400">
            Cross-team friction that slows everyone down
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
        className="w-full max-w-5xl flex-1"
      >
        {/* Scenario Header */}
        <div 
          className="rounded-t-xl p-4"
          style={{ 
            background: `linear-gradient(135deg, ${activeScenario.color}20 0%, transparent 100%)`,
            borderBottom: `1px solid ${activeScenario.color}30`,
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ 
                backgroundColor: `${activeScenario.color}30`,
                border: `1px solid ${activeScenario.color}50`,
              }}
            >
              {activeScenario.icon}
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">{activeScenario.name}</h3>
              <p className="text-gray-400 text-sm">{activeScenario.description}</p>
            </div>
          </div>
        </div>

        {/* Team Involvement Grid */}
        <div className="bg-gray-800/50 p-5 border-x border-gray-700/50">
          <p className="text-gray-500 text-xs mb-3 uppercase tracking-wide">Who gets pulled in:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {activeScenario.teams.map((team, index) => (
              <motion.div
                key={team.role}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="p-3 rounded-lg bg-gray-900/50 border border-gray-700/50"
              >
                <div className="text-sm font-bold text-white mb-1">{team.role}</div>
                <div className="text-xs text-gray-400">{team.task}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Challenge */}
        <div className="bg-gray-800/30 p-5 border-x border-gray-700/50">
          <div className="flex items-start gap-3">
            <span className="text-xl">😤</span>
            <div>
              <p className="text-gray-500 text-xs mb-1 uppercase tracking-wide">The Challenge</p>
              <p className="text-gray-200 text-sm">{activeScenario.challenge}</p>
            </div>
          </div>
        </div>

        {/* Cost & Pain */}
        <div className="bg-gray-800/50 p-4 rounded-b-xl border border-gray-700/50 border-t-0">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">⏱️</span>
                <span className="text-red-400 font-bold text-xs uppercase">Time Wasted</span>
              </div>
              <p className="text-white font-bold text-sm">{activeScenario.timeWasted}</p>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">🎯</span>
                <span className="text-amber-400 font-bold text-xs uppercase">Real Pain</span>
              </div>
              <p className="text-white font-bold text-sm">{activeScenario.realPain}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hook Question */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-center flex-shrink-0"
      >
        <p className="text-blue-400 font-semibold text-lg">
          What if teams had an assistant that could gather and correlate across all these systems?
        </p>
      </motion.div>
    </div>
  );
}
