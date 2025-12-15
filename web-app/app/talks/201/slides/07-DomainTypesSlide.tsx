'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const domainTypes = [
  {
    id: 'coding',
    icon: '💻',
    title: 'Coding Agents',
    description: 'Assist with code generation, debugging, and software development tasks.',
    color: '#3b82f6',
    characteristics: [
      'Multi-file editing',
      'Test-driven iteration',
      'Codebase understanding',
      'Verifiable output',
    ],
    examples: ['Code generation', 'Bug fixing', 'Refactoring', 'Code review'],
    whyEffective: 'Code is verifiable through tests, enabling reliable iteration loops.',
  },
  {
    id: 'research',
    icon: '🔬',
    title: 'Deep Research Agents',
    description: 'Conduct comprehensive, multi-step research with subagents exploring in parallel.',
    color: '#8b5cf6',
    characteristics: [
      'Subagent parallelization',
      'Progressive exploration',
      'Citation verification',
      'Multi-source synthesis',
    ],
    examples: ['Literature review', 'Competitive analysis', 'Due diligence', 'Market research'],
    whyEffective: 'Spawns subagents for parallel exploration, then synthesizes findings.',
  },
  {
    id: 'support',
    icon: '💬',
    title: 'Customer Support',
    description: 'Handle customer inquiries, resolve issues, and manage support workflows.',
    color: '#10b981',
    characteristics: [
      'Conversation + action',
      'Knowledge retrieval',
      'Ticket management',
      'Human escalation',
    ],
    examples: ['FAQ handling', 'Issue resolution', 'Account management', 'Refund processing'],
    whyEffective: 'Natural conversational flow combined with tool-based actions.',
  },
  {
    id: 'data',
    icon: '📊',
    title: 'Data Analysis',
    description: 'Process, analyze, and interpret large datasets to extract insights.',
    color: '#f59e0b',
    characteristics: [
      'Query generation',
      'Data transformation',
      'Visualization',
      'Report generation',
    ],
    examples: ['SQL queries', 'Data cleaning', 'Trend analysis', 'Dashboard creation'],
    whyEffective: 'Agents can iteratively refine queries based on intermediate results.',
  },
  {
    id: 'personal',
    icon: '📅',
    title: 'Personal Assistants',
    description: 'Manage schedules, communications, and personal productivity tasks.',
    color: '#ec4899',
    characteristics: [
      'Cross-app coordination',
      'Calendar management',
      'Email handling',
      'Task prioritization',
    ],
    examples: ['Meeting scheduling', 'Travel booking', 'Reminder management', 'Brief preparation'],
    whyEffective: 'Requires orchestrating multiple tools and maintaining personal context.',
  },
  {
    id: 'finance',
    icon: '💰',
    title: 'Finance Agents',
    description: 'Analyze financial data, evaluate investments, and support decision-making.',
    color: '#06b6d4',
    characteristics: [
      'Portfolio analysis',
      'Risk assessment',
      'Market research',
      'Calculation accuracy',
    ],
    examples: ['Investment analysis', 'Financial planning', 'Expense tracking', 'Report generation'],
    whyEffective: 'Combines data processing with domain-specific reasoning.',
  },
];

export default function DomainTypesSlide() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const activeDomain = selectedDomain 
    ? domainTypes.find(d => d.id === selectedDomain)
    : null;

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
          Application Areas
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Agent Domains
        </h2>
        <p className="text-gray-400">
          Agents specialized for different problem spaces
        </p>
      </motion.div>

      {/* Domain grid - no hover animation to prevent shake */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mb-6"
      >
        {domainTypes.map((domain, index) => {
          const isSelected = selectedDomain === domain.id;
          
          return (
            <motion.button
              key={domain.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => setSelectedDomain(isSelected ? null : domain.id)}
              className="relative group"
            >
              <div
                className="p-4 rounded-xl border-2 transition-all duration-200"
                style={{
                  backgroundColor: isSelected ? `${domain.color}15` : 'rgba(255,255,255,0.02)',
                  borderColor: isSelected ? domain.color : 'rgba(107, 114, 128, 0.3)',
                  boxShadow: isSelected ? `0 4px 20px ${domain.color}25` : 'none',
                }}
              >
                <span className="text-3xl block mb-2">{domain.icon}</span>
                <span
                  className="text-xs font-medium block transition-colors"
                  style={{
                    color: isSelected ? domain.color : '#9ca3af',
                  }}
                >
                  {domain.title.split(' ')[0]}
                </span>
              </div>

              {/* Subtle hover indicator - no layout shift */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 2px ${domain.color}40`,
                }}
              />

              {/* Selection dot */}
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: domain.color,
                  opacity: isSelected ? 1 : 0,
                  transform: `translateX(-50%) scale(${isSelected ? 1 : 0})`,
                }}
              />
            </motion.button>
          );
        })}
      </motion.div>

      {/* Detail panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-4xl"
      >
        <AnimatePresence mode="wait">
          {activeDomain ? (
            <motion.div
              key={activeDomain.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl p-6 border"
              style={{
                backgroundColor: `${activeDomain.color}08`,
                borderColor: `${activeDomain.color}25`,
              }}
            >
              <div className="flex items-start gap-6">
                {/* Icon and title */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${activeDomain.color}20`,
                    border: `1px solid ${activeDomain.color}40`,
                  }}
                >
                  <span className="text-4xl">{activeDomain.icon}</span>
                </div>

                <div className="flex-1">
                  {/* Title and description */}
                  <h3 className="text-xl font-bold text-white mb-1">
                    {activeDomain.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {activeDomain.description}
                  </p>

                  {/* Grid of details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Characteristics */}
                    <div className="bg-gray-800/30 rounded-xl p-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Key Capabilities
                      </h4>
                      <ul className="space-y-1">
                        {activeDomain.characteristics.map((item) => (
                          <li key={item} className="text-sm text-gray-300 flex items-center gap-2">
                            <span style={{ color: activeDomain.color }}>•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Examples */}
                    <div className="bg-gray-800/30 rounded-xl p-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Example Tasks
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeDomain.examples.map((example) => (
                          <span
                            key={example}
                            className="px-2 py-1 rounded-md text-xs"
                            style={{
                              backgroundColor: `${activeDomain.color}15`,
                              color: activeDomain.color,
                            }}
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Why effective */}
                    <div className="bg-gray-800/30 rounded-xl p-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Why Agents Excel
                      </h4>
                      <p className="text-sm text-gray-300">
                        {activeDomain.whyEffective}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl p-8 bg-gray-800/30 border border-gray-700/50 text-center"
            >
              <p className="text-gray-500">
                Click on a domain to see details
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Key insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-gray-400 text-sm text-center max-w-xl"
      >
        Each domain has unique characteristics that determine the best agent architecture.
        <br />
        <span className="text-gray-500">Understanding the domain helps you design better agents.</span>
      </motion.p>
    </div>
  );
}
