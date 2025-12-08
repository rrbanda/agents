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
    description: 'Building features, fixing bugs, understanding code',
    painPoints: [
      { pain: 'Understanding unfamiliar codebase', detail: 'Hours reading code to understand how things connect' },
      { pain: 'Debugging across services', detail: 'Tracing issues through microservices, logs scattered everywhere' },
      { pain: 'Writing tests & docs', detail: 'Tedious but necessary work that slows feature delivery' },
      { pain: 'Context switching', detail: 'Interrupted by questions, losing flow state repeatedly' },
    ],
    challenge: 'Spend 60% of time reading/understanding code, only 40% writing it',
    timeWasted: '15+ hours/week on code comprehension',
    realPain: 'Tribal knowledge locked in senior devs\' heads',
  },
  {
    id: 'platform',
    name: 'Platform Engineer',
    icon: '☁️',
    color: '#8b5cf6',
    description: 'Managing infrastructure, Kubernetes, cloud resources',
    painPoints: [
      { pain: 'Capacity planning', detail: 'Predicting resource needs across dozens of services' },
      { pain: 'Configuration drift', detail: 'Keeping environments in sync, catching misconfigurations' },
      { pain: 'Cost optimization', detail: 'Finding unused resources, rightsizing instances' },
      { pain: 'Self-service requests', detail: 'Fielding tickets for namespace creation, access, quotas' },
    ],
    challenge: 'Reactive firefighting instead of proactive platform improvement',
    timeWasted: '20+ hours/week on repetitive requests',
    realPain: 'Platform team becomes a bottleneck for all teams',
  },
  {
    id: 'operations',
    name: 'Operations / SRE',
    icon: '🖥️',
    color: '#ef4444',
    description: 'Monitoring systems, responding to incidents, maintaining uptime',
    painPoints: [
      { pain: 'Alert fatigue', detail: '100s of alerts daily, most are noise, real issues get buried' },
      { pain: 'Incident investigation', detail: 'Correlating logs, metrics, traces across systems manually' },
      { pain: 'Root cause analysis', detail: 'Post-mortems take days to piece together what happened' },
      { pain: 'On-call burden', detail: '2am pages, context switching, sleep deprivation' },
    ],
    challenge: 'Too much time reacting, not enough preventing',
    timeWasted: '4-8 hours per incident on investigation',
    realPain: 'Each person sees one piece, no one sees the whole picture',
  },
  {
    id: 'devops',
    name: 'DevOps Engineer',
    icon: '🔧',
    color: '#10b981',
    description: 'CI/CD pipelines, automation, deployment processes',
    painPoints: [
      { pain: 'Pipeline failures', detail: 'Debugging why builds fail, flaky tests, environment issues' },
      { pain: 'Release coordination', detail: 'Syncing deployments across services, managing dependencies' },
      { pain: 'Security compliance', detail: 'Scanning for vulnerabilities, enforcing policies, audit trails' },
      { pain: 'Documentation', detail: 'Keeping runbooks updated, onboarding new team members' },
    ],
    challenge: 'Maintaining automation while everything keeps changing',
    timeWasted: '10+ hours/week on pipeline maintenance',
    realPain: 'One person becomes the "deployment expert" bottleneck',
  },
];

export default function RealWorldProblemSlide() {
  const [activePersona, setActivePersona] = useState(personas[0]);

  return (
    <div className="h-full flex flex-col items-center p-4 overflow-hidden">
      {/* Title */}
      <div className="flex-shrink-0 text-center mb-3">
        <LineReveal delay={0.1}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
            Challenges <span className="text-red-400">By Role</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Every persona has unique pain points — agents can help
          </p>
        </LineReveal>
      </div>

      {/* Persona Tabs */}
      <motion.div 
        className="flex gap-2 mb-4 p-1 bg-gray-800/50 rounded-xl flex-shrink-0"
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
        className="w-full max-w-5xl flex-1"
      >
        {/* Persona Header */}
        <div 
          className="rounded-t-xl p-4"
          style={{ 
            background: `linear-gradient(135deg, ${activePersona.color}20 0%, transparent 100%)`,
            borderBottom: `1px solid ${activePersona.color}30`,
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
              style={{ 
                backgroundColor: `${activePersona.color}30`,
                border: `2px solid ${activePersona.color}50`,
              }}
            >
              {activePersona.icon}
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">{activePersona.name}</h3>
              <p className="text-gray-400 text-sm">{activePersona.description}</p>
            </div>
          </div>
        </div>

        {/* Pain Points Grid */}
        <div className="bg-gray-800/50 p-4 border-x border-gray-700/50">
          <p className="text-gray-500 text-xs mb-3 uppercase tracking-wide">Daily Frustrations:</p>
          <div className="grid grid-cols-2 gap-3">
            {activePersona.painPoints.map((point, index) => (
              <motion.div
                key={point.pain}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="p-3 rounded-lg bg-gray-900/50 border border-gray-700/50 hover:border-gray-600 transition-all"
              >
                <div className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">{point.pain}</div>
                    <div className="text-xs text-gray-400">{point.detail}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Challenge */}
        <div className="bg-gray-800/30 p-4 border-x border-gray-700/50">
          <div className="flex items-start gap-3">
            <span className="text-xl">😤</span>
            <div>
              <p className="text-gray-500 text-xs mb-1 uppercase tracking-wide">The Core Challenge</p>
              <p className="text-gray-200 text-sm font-medium">{activePersona.challenge}</p>
            </div>
          </div>
        </div>

        {/* Cost & Pain */}
        <div className="bg-gray-800/50 p-4 rounded-b-xl border border-gray-700/50 border-t-0">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">⏱️</span>
                <span className="text-red-400 font-bold text-xs uppercase">Time Lost</span>
              </div>
              <p className="text-white font-bold text-sm">{activePersona.timeWasted}</p>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">🎯</span>
                <span className="text-amber-400 font-bold text-xs uppercase">Root Cause</span>
              </div>
              <p className="text-white font-bold text-sm">{activePersona.realPain}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hook Question */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-3 text-center flex-shrink-0"
      >
        <p className="text-blue-400 font-semibold text-base">
          What if you had an AI teammate that understood your specific challenges?
        </p>
      </motion.div>
    </div>
  );
}
