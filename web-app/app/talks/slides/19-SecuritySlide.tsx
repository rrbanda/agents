'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const threats = [
  {
    id: 'injection',
    icon: '💉',
    title: 'Prompt Injection',
    description: 'Malicious inputs that manipulate agent behavior',
    severity: 'high',
    examples: ['Hidden instructions in documents', 'Manipulated API responses', 'Adversarial user inputs'],
  },
  {
    id: 'exfiltration',
    icon: '📤',
    title: 'Data Exfiltration',
    description: 'Unauthorized data access or leakage through agent actions',
    severity: 'high',
    examples: ['Sending sensitive data to external services', 'Logging confidential information', 'Unintended file sharing'],
  },
  {
    id: 'privilege',
    icon: '🔓',
    title: 'Privilege Escalation',
    description: 'Agents gaining access beyond intended permissions',
    severity: 'medium',
    examples: ['Accessing restricted files', 'Executing unauthorized commands', 'Bypassing access controls'],
  },
  {
    id: 'malicious',
    icon: '🦠',
    title: 'Malicious Tools/Skills',
    description: 'Third-party extensions that introduce vulnerabilities',
    severity: 'medium',
    examples: ['Compromised MCP servers', 'Untrusted skill packages', 'Supply chain attacks'],
  },
];

const mitigations = [
  {
    id: 'sandbox',
    icon: '📦',
    title: 'Sandboxing',
    description: 'Isolate agent execution in restricted environments',
    implementation: 'Container isolation, network restrictions, filesystem limits',
    color: '#3b82f6',
  },
  {
    id: 'permissions',
    icon: '🔐',
    title: 'Permission Systems',
    description: 'Explicit capability grants for sensitive operations',
    implementation: 'Require confirmation for destructive actions, time-limited tokens',
    color: '#10b981',
  },
  {
    id: 'monitoring',
    icon: '👁️',
    title: 'Continuous Monitoring',
    description: 'Track agent behavior and detect anomalies',
    implementation: 'Full tracing, action logging, anomaly detection',
    color: '#8b5cf6',
  },
  {
    id: 'audit',
    icon: '📋',
    title: 'Tool Auditing',
    description: 'Review and verify third-party tools before use',
    implementation: 'Source trust verification, code review, dependency scanning',
    color: '#f59e0b',
  },
  {
    id: 'human',
    icon: '👤',
    title: 'Human-in-the-Loop',
    description: 'Require human approval for high-risk operations',
    implementation: 'Approval workflows, escalation paths, override capabilities',
    color: '#ec4899',
  },
  {
    id: 'guardrails',
    icon: '🛡️',
    title: 'Guardrails',
    description: 'Real-time input/output filtering and boundaries',
    implementation: 'Action allowlists, jailbreak detection, rate limiting, scope restrictions',
    color: '#06b6d4',
  },
  {
    id: 'redteam',
    icon: '🎯',
    title: 'Red Teaming',
    description: 'Proactively test for vulnerabilities before deployment',
    implementation: 'Automated adversarial testing, prompt injection scanning, vulnerability assessments',
    color: '#ef4444',
  },
];

export default function SecuritySlide() {
  const [activeView, setActiveView] = useState<'threats' | 'mitigations'>('threats');
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);
  const [selectedMitigation, setSelectedMitigation] = useState<string | null>(null);

  const severityColors = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#10b981',
  };

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
          Critical Consideration
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Security for Agents
        </h2>
        <p className="text-gray-400">
          Autonomy without constraints is dangerous
        </p>
      </motion.div>

      {/* Warning banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 max-w-3xl"
      >
        <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <p className="text-gray-300 text-sm">
              Agents can take <span className="text-red-400 font-medium">real actions</span> with <span className="text-red-400 font-medium">real consequences</span>. 
              Security must be built in from the start, not bolted on later.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tab selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-2 p-1 rounded-xl bg-gray-800/50 border border-gray-700/50 mb-6"
      >
        <button
          onClick={() => setActiveView('threats')}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
            activeView === 'threats'
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          🎯 Threat Vectors
        </button>
        <button
          onClick={() => setActiveView('mitigations')}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
            activeView === 'mitigations'
              ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          🛡️ Mitigations
        </button>
      </motion.div>

      {/* Content */}
      <div className="w-full max-w-5xl">
        {activeView === 'threats' ? (
          <motion.div
            key="threats"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {threats.map((threat, index) => (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => setSelectedThreat(selectedThreat === threat.id ? null : threat.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                  selectedThreat === threat.id
                    ? 'bg-red-500/10 border-red-500/40'
                    : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{threat.icon}</span>
                    <h4 className="font-bold text-white">{threat.title}</h4>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded text-xs font-bold uppercase"
                    style={{
                      backgroundColor: `${severityColors[threat.severity as keyof typeof severityColors]}20`,
                      color: severityColors[threat.severity as keyof typeof severityColors],
                    }}
                  >
                    {threat.severity}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{threat.description}</p>
                
                {/* Examples - expand on click */}
                <motion.div
                  initial={false}
                  animate={{
                    height: selectedThreat === threat.id ? 'auto' : 0,
                    opacity: selectedThreat === threat.id ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 border-t border-gray-700/50">
                    <span className="text-xs text-gray-500 mb-1 block">Examples:</span>
                    <ul className="space-y-1">
                      {threat.examples.map((example, i) => (
                        <li key={i} className="text-xs text-gray-400 flex items-center gap-2">
                          <span className="text-red-400">•</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="mitigations"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            {mitigations.map((mitigation, index) => (
              <motion.div
                key={mitigation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.08 }}
                onMouseEnter={() => setSelectedMitigation(mitigation.id)}
                onMouseLeave={() => setSelectedMitigation(null)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  selectedMitigation === mitigation.id
                    ? ''
                    : 'border-gray-700/50 hover:border-gray-600'
                }`}
                style={{
                  backgroundColor: selectedMitigation === mitigation.id ? `${mitigation.color}10` : 'rgba(255,255,255,0.02)',
                  borderColor: selectedMitigation === mitigation.id ? mitigation.color : undefined,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{mitigation.icon}</span>
                  <h4
                    className="font-bold text-sm transition-colors"
                    style={{ color: selectedMitigation === mitigation.id ? mitigation.color : 'white' }}
                  >
                    {mitigation.title}
                  </h4>
                </div>
                <p className="text-gray-400 text-xs mb-2">{mitigation.description}</p>
                
                {/* Implementation on hover */}
                <motion.div
                  initial={false}
                  animate={{
                    height: selectedMitigation === mitigation.id ? 'auto' : 0,
                    opacity: selectedMitigation === mitigation.id ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <div
                    className="mt-2 p-2 rounded-lg text-xs"
                    style={{ backgroundColor: `${mitigation.color}15` }}
                  >
                    <span className="text-gray-400">Implementation: </span>
                    <span style={{ color: mitigation.color }}>{mitigation.implementation}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Best practice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 px-6 py-3 rounded-xl bg-gray-800/30 border border-gray-700/50"
      >
        <p className="text-gray-300 text-sm text-center">
          <span className="text-white font-medium">Defense in Depth:</span> Layer multiple security controls. 
          <br />
          <span className="text-gray-500">No single mitigation is sufficient on its own.</span>
        </p>
      </motion.div>
    </div>
  );
}

