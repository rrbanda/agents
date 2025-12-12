'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const patterns = [
  {
    id: 'chaining',
    name: 'Prompt Chaining',
    icon: '🔗',
    category: 'workflow',
    description: 'Decompose task into sequential steps, each processing previous output.',
    diagram: ['Input', '→', 'LLM₁', '→', 'LLM₂', '→', 'LLM₃', '→', 'Output'],
    whenToUse: 'Task cleanly decomposes into fixed subtasks',
    example: 'Generate outline → Write content → Translate',
    color: '#3b82f6',
  },
  {
    id: 'routing',
    name: 'Routing',
    icon: '🔀',
    category: 'workflow',
    description: 'Classify input and direct to specialized handlers.',
    diagram: ['Input', '→', 'Classifier', '⤵', 'Handler A | Handler B | Handler C'],
    whenToUse: 'Distinct categories better handled separately',
    example: 'Route support tickets to billing, technical, or general',
    color: '#10b981',
  },
  {
    id: 'parallel',
    name: 'Parallelization',
    icon: '⚡',
    category: 'workflow',
    description: 'Run multiple LLMs simultaneously, aggregate results.',
    diagram: ['Input', '⟹', 'LLM₁ ∥ LLM₂ ∥ LLM₃', '⟹', 'Aggregate'],
    whenToUse: 'Independent subtasks can run concurrently',
    example: 'Multiple reviewers check code for different issues',
    color: '#f59e0b',
  },
  {
    id: 'orchestrator',
    name: 'Orchestrator-Workers',
    icon: '👔',
    category: 'workflow',
    description: 'Central LLM dynamically delegates to specialized workers.',
    diagram: ['Goal', '→', 'Orchestrator', '⤵', 'Worker₁ | Worker₂ | ...', '→', 'Synthesis'],
    whenToUse: "Can't predict subtasks in advance",
    example: 'Research agent spawning topic-specific searchers',
    color: '#8b5cf6',
  },
  {
    id: 'evaluator',
    name: 'Evaluator-Optimizer',
    icon: '🔄',
    category: 'workflow',
    description: 'Generator and evaluator in iterative improvement loop.',
    diagram: ['Input', '→', 'Generator', '⇄', 'Evaluator', '→', 'Refined Output'],
    whenToUse: 'Clear evaluation criteria, iteration provides value',
    example: 'Write code → Test → Fix errors → Repeat',
    color: '#ec4899',
  },
  {
    id: 'react',
    name: 'ReAct Agent',
    icon: '🤖',
    category: 'agent',
    description: 'Reason and Act in a loop. Think → Act → Observe → Repeat.',
    diagram: ['Goal', '→', 'Think', '→', 'Act', '→', 'Observe', '↩'],
    whenToUse: 'Open-ended tasks requiring tool use',
    example: 'Answer question by searching, reading, synthesizing',
    color: '#06b6d4',
  },
];

export default function ArchitecturePatternsSlide() {
  const [selectedPattern, setSelectedPattern] = useState<string>('chaining');
  const [hoveredPattern, setHoveredPattern] = useState<string | null>(null);

  const currentPattern = patterns.find(p => p.id === selectedPattern) || patterns[0];
  const workflowPatterns = patterns.filter(p => p.category === 'workflow');
  const agentPatterns = patterns.filter(p => p.category === 'agent');

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
          Design Patterns
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Architecture Patterns
        </h2>
        <p className="text-gray-400">
          Common patterns for building agentic systems
        </p>
      </motion.div>

      {/* Pattern selector - two rows */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-5xl mb-6"
      >
        {/* Workflow patterns */}
        <div className="mb-3">
          <span className="text-xs text-gray-500 uppercase tracking-wider mb-2 block text-center">
            Workflow Patterns
          </span>
          <div className="flex justify-center gap-2 flex-wrap">
            {workflowPatterns.map((pattern, index) => (
              <PatternButton
                key={pattern.id}
                pattern={pattern}
                isSelected={selectedPattern === pattern.id}
                isHovered={hoveredPattern === pattern.id}
                onClick={() => setSelectedPattern(pattern.id)}
                onHover={() => setHoveredPattern(pattern.id)}
                onLeave={() => setHoveredPattern(null)}
                delay={0.1 + index * 0.05}
              />
            ))}
          </div>
        </div>

        {/* Agent patterns */}
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-wider mb-2 block text-center">
            Agent Patterns
          </span>
          <div className="flex justify-center gap-2">
            {agentPatterns.map((pattern, index) => (
              <PatternButton
                key={pattern.id}
                pattern={pattern}
                isSelected={selectedPattern === pattern.id}
                isHovered={hoveredPattern === pattern.id}
                onClick={() => setSelectedPattern(pattern.id)}
                onHover={() => setHoveredPattern(pattern.id)}
                onLeave={() => setHoveredPattern(null)}
                delay={0.3 + index * 0.05}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Pattern detail */}
      <motion.div
        key={selectedPattern}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div
          className="rounded-2xl p-6 border"
          style={{
            backgroundColor: `${currentPattern.color}08`,
            borderColor: `${currentPattern.color}25`,
          }}
        >
          {/* Title row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${currentPattern.color}20`,
                  border: `1px solid ${currentPattern.color}40`,
                }}
              >
                <span className="text-2xl">{currentPattern.icon}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{currentPattern.name}</h3>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${currentPattern.color}20`,
                    color: currentPattern.color,
                  }}
                >
                  {currentPattern.category}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-6">{currentPattern.description}</p>

          {/* Diagram */}
          <div className="bg-gray-900/50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 flex-wrap font-mono text-sm">
              {currentPattern.diagram.map((part, i) => {
                const isArrow = ['→', '⟹', '⤵', '⇄', '↩', '∥', '|'].includes(part);
                const isMultiple = part.includes('|') || part.includes('∥');

                if (isArrow && !isMultiple) {
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="text-gray-500"
                    >
                      {part}
                    </motion.span>
                  );
                }

                if (isMultiple) {
                  const parts = part.split(/[|∥]/).map(p => p.trim());
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex gap-1"
                    >
                      {parts.map((p, j) => (
                        <span
                          key={j}
                          className="px-2 py-1 rounded"
                          style={{
                            backgroundColor: `${currentPattern.color}20`,
                            color: currentPattern.color,
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </motion.div>
                  );
                }

                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="px-3 py-1 rounded-lg"
                    style={{
                      backgroundColor: `${currentPattern.color}15`,
                      color: 'white',
                      border: `1px solid ${currentPattern.color}30`,
                    }}
                  >
                    {part}
                  </motion.span>
                );
              })}
            </div>
          </div>

          {/* When to use and Example */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/30 rounded-xl p-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="text-green-400">✓</span> When to Use
              </h4>
              <p className="text-sm text-gray-300">{currentPattern.whenToUse}</p>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span>💡</span> Example
              </h4>
              <p className="text-sm text-gray-300">{currentPattern.example}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-gray-400 text-sm text-center"
      >
        Start with simple patterns. Add complexity only when simpler solutions fall short.
      </motion.p>
    </div>
  );
}

interface PatternButtonProps {
  pattern: typeof patterns[0];
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
  delay: number;
}

function PatternButton({ 
  pattern, 
  isSelected, 
  isHovered, 
  onClick, 
  onHover, 
  onLeave,
  delay 
}: PatternButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`px-4 py-2 rounded-xl border transition-all duration-200 ${
        isSelected
          ? ''
          : isHovered
            ? 'border-gray-600'
            : 'border-gray-700/50 hover:border-gray-600'
      }`}
      style={{
        backgroundColor: isSelected ? `${pattern.color}15` : 'rgba(255,255,255,0.02)',
        borderColor: isSelected ? pattern.color : undefined,
        boxShadow: isSelected ? `0 4px 15px ${pattern.color}20` : undefined,
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{pattern.icon}</span>
        <span
          className="text-sm font-medium"
          style={{ color: isSelected ? pattern.color : '#9ca3af' }}
        >
          {pattern.name}
        </span>
      </div>
    </motion.button>
  );
}

