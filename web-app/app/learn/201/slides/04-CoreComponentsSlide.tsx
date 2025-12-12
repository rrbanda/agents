'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const components = [
  {
    id: 'perception',
    icon: '👁️',
    title: 'Perception',
    subtitle: 'Gathering Information',
    description: 'How agents interpret inputs from their environment',
    examples: ['User messages', 'Tool results', 'File contents', 'API responses'],
    color: '#3b82f6',
    position: { row: 0, col: 0 },
  },
  {
    id: 'reasoning',
    icon: '🧠',
    title: 'Reasoning',
    subtitle: 'Decision Making',
    description: 'Processing information to make informed choices',
    examples: ['Planning steps', 'Evaluating options', 'Chain-of-thought', 'Self-reflection'],
    color: '#8b5cf6',
    position: { row: 0, col: 1 },
  },
  {
    id: 'action',
    icon: '⚡',
    title: 'Action',
    subtitle: 'Execution',
    description: 'Performing tasks through tools and interactions',
    examples: ['Tool calls', 'Code execution', 'API requests', 'File operations'],
    color: '#10b981',
    position: { row: 1, col: 0 },
  },
  {
    id: 'memory',
    icon: '💾',
    title: 'Memory',
    subtitle: 'State Persistence',
    description: 'Maintaining context across interactions',
    examples: ['Conversation history', 'Working memory', 'Long-term storage', 'Learned patterns'],
    color: '#f59e0b',
    position: { row: 1, col: 1 },
  },
  {
    id: 'learning',
    icon: '📈',
    title: 'Learning',
    subtitle: 'Adaptation',
    description: 'Improving performance over time through feedback',
    examples: ['Error correction', 'Strategy refinement', 'Pattern recognition', 'Self-improvement'],
    color: '#ec4899',
    position: { row: 2, col: 0.5 },
  },
];

export default function CoreComponentsSlide() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30">
          Building Blocks
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Core Agent Components
        </h2>
        <p className="text-gray-400">
          The five capabilities that enable autonomous behavior
        </p>
      </motion.div>

      {/* Components grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative max-w-4xl w-full"
      >
        {/* Top row */}
        <div className="flex justify-center gap-6 mb-4">
          {components.slice(0, 2).map((comp, index) => (
            <ComponentCard
              key={comp.id}
              component={comp}
              index={index}
              isActive={activeComponent === comp.id}
              onHover={() => setActiveComponent(comp.id)}
              onLeave={() => setActiveComponent(null)}
            />
          ))}
        </div>

        {/* Middle row */}
        <div className="flex justify-center gap-6 mb-4">
          {components.slice(2, 4).map((comp, index) => (
            <ComponentCard
              key={comp.id}
              component={comp}
              index={index + 2}
              isActive={activeComponent === comp.id}
              onHover={() => setActiveComponent(comp.id)}
              onLeave={() => setActiveComponent(null)}
            />
          ))}
        </div>

        {/* Bottom row - single centered */}
        <div className="flex justify-center">
          <ComponentCard
            component={components[4]}
            index={4}
            isActive={activeComponent === components[4].id}
            onHover={() => setActiveComponent(components[4].id)}
            onLeave={() => setActiveComponent(null)}
          />
        </div>

        {/* Connection lines SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: -1 }}
        >
          {/* These would be connecting lines between components */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(139,92,246,0.3)" />
              <stop offset="100%" stopColor="rgba(236,72,153,0.3)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Detail panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 max-w-2xl w-full"
      >
        {activeComponent ? (
          <motion.div
            key={activeComponent}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50"
          >
            {(() => {
              const comp = components.find(c => c.id === activeComponent);
              if (!comp) return null;
              return (
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${comp.color}20`, border: `1px solid ${comp.color}40` }}
                  >
                    <span className="text-2xl">{comp.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-1">{comp.title}</h4>
                    <p className="text-gray-400 text-sm mb-2">{comp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {comp.examples.map((example) => (
                        <span
                          key={example}
                          className="px-2 py-1 rounded-md text-xs"
                          style={{ 
                            backgroundColor: `${comp.color}15`,
                            color: comp.color,
                          }}
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        ) : (
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 text-center">
            <p className="text-gray-500 text-sm">
              Hover over a component to see details
            </p>
          </div>
        )}
      </motion.div>

      {/* Key insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-gray-400 text-sm text-center max-w-xl"
      >
        These components work together in a continuous loop. 
        Understanding each helps you build more effective agents.
      </motion.p>
    </div>
  );
}

interface ComponentCardProps {
  component: typeof components[0];
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ComponentCard({ component, index, isActive, onHover, onLeave }: ComponentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.05, y: -4 }}
      className="relative cursor-pointer"
    >
      <div
        className="w-36 h-28 rounded-xl flex flex-col items-center justify-center p-3 transition-all duration-300"
        style={{
          backgroundColor: isActive ? `${component.color}15` : 'rgba(255,255,255,0.03)',
          border: `2px solid ${isActive ? component.color : 'rgba(255,255,255,0.08)'}`,
          boxShadow: isActive ? `0 8px 30px ${component.color}25` : 'none',
        }}
      >
        {/* Icon */}
        <motion.span
          animate={isActive ? { scale: 1.1 } : { scale: 1 }}
          className="text-3xl mb-2"
        >
          {component.icon}
        </motion.span>

        {/* Title */}
        <h3
          className="font-bold text-sm transition-colors"
          style={{ color: isActive ? component.color : 'white' }}
        >
          {component.title}
        </h3>

        {/* Subtitle */}
        <p className="text-gray-500 text-xs text-center">{component.subtitle}</p>
      </div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
          style={{ backgroundColor: component.color }}
        />
      )}
    </motion.div>
  );
}

