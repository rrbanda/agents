'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const patterns = [
  {
    id: 'orchestrator',
    name: 'Orchestrator',
    icon: '🎭',
    description: 'Central coordinator delegates to specialized agents',
    useCase: 'Complex tasks requiring different expertise',
    pros: ['Clear control flow', 'Easy to debug', 'Centralized decisions'],
    cons: ['Single point of failure', 'Orchestrator bottleneck'],
  },
  {
    id: 'pipeline',
    name: 'Pipeline',
    icon: '➡️',
    description: 'Agents pass work sequentially, each transforming output',
    useCase: 'Multi-stage processing (research → analyze → write → review)',
    pros: ['Clear data flow', 'Each agent focused', 'Easy to extend'],
    cons: ['Sequential = slower', 'Error propagation'],
  },
  {
    id: 'collaborative',
    name: 'Collaborative',
    icon: '🤝',
    description: 'Agents work in parallel on shared context, then merge',
    useCase: 'Tasks that can be parallelized (research multiple sources)',
    pros: ['Faster execution', 'True parallelism', 'Redundancy'],
    cons: ['Merge conflicts', 'Coordination complexity'],
  },
];

const orchestratorAgents = [
  { id: 'research', name: 'Research', icon: '🔍', color: '#3b82f6', angle: -45 },
  { id: 'analysis', name: 'Analysis', icon: '📊', color: '#10b981', angle: 45 },
  { id: 'writing', name: 'Writing', icon: '✍️', color: '#f59e0b', angle: 135 },
  { id: 'review', name: 'Review', icon: '✓', color: '#8b5cf6', angle: 225 },
];

const pipelineSteps = [
  { id: 'gather', name: 'Gather', icon: '🔍', color: '#3b82f6', task: 'Collect data from sources' },
  { id: 'process', name: 'Process', icon: '⚙️', color: '#10b981', task: 'Clean and structure data' },
  { id: 'analyze', name: 'Analyze', icon: '📊', color: '#f59e0b', task: 'Extract insights' },
  { id: 'output', name: 'Output', icon: '📝', color: '#8b5cf6', task: 'Generate final result' },
];

const collaborativeAgents = [
  { id: 'agent1', name: 'Agent A', icon: '🔵', color: '#3b82f6' },
  { id: 'agent2', name: 'Agent B', icon: '🟢', color: '#10b981' },
  { id: 'agent3', name: 'Agent C', icon: '🟡', color: '#f59e0b' },
];

export default function MultiAgentSlide() {
  const [activePattern, setActivePattern] = useState('orchestrator');
  const [animationStep, setAnimationStep] = useState(0);

  const currentPattern = patterns.find(p => p.id === activePattern)!;

  // Animate pipeline flow
  useEffect(() => {
    if (activePattern === 'pipeline') {
      setAnimationStep(0);
      const interval = setInterval(() => {
        setAnimationStep(prev => (prev + 1) % (pipelineSteps.length + 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activePattern]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
          Multi-Agent <span className="text-purple-400">Systems</span>
        </h2>
        <p className="text-gray-400 text-sm">
          When one agent isn't enough — coordination patterns for complex tasks
        </p>
      </motion.div>

      {/* Pattern Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 mb-4"
      >
        {patterns.map((pattern) => (
          <button
            key={pattern.id}
            onClick={() => setActivePattern(pattern.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activePattern === pattern.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <span>{pattern.icon}</span>
            <span>{pattern.name}</span>
          </button>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="w-full max-w-6xl flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Left: Pattern Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-3"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activePattern}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{currentPattern.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{currentPattern.name} Pattern</h3>
                  <p className="text-xs text-gray-400">{currentPattern.description}</p>
                </div>
              </div>
              
              <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-500/20 mb-3">
                <span className="text-xs text-purple-400 font-medium">Best for:</span>
                <p className="text-sm text-gray-300 mt-1">{currentPattern.useCase}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-900/20 rounded-lg p-2 border border-green-500/20">
                  <span className="text-xs text-green-400 font-medium">✓ Pros</span>
                  <ul className="mt-1 space-y-1">
                    {currentPattern.pros.map(pro => (
                      <li key={pro} className="text-xs text-gray-400">• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-900/20 rounded-lg p-2 border border-red-500/20">
                  <span className="text-xs text-red-400 font-medium">✗ Cons</span>
                  <ul className="mt-1 space-y-1">
                    {currentPattern.cons.map(con => (
                      <li key={con} className="text-xs text-gray-400">• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* When to Use Multi-Agent */}
          <div className="bg-gray-800/40 rounded-xl p-3 border border-gray-700/50">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span>🤔</span> When to Use Multi-Agent?
            </h4>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• Task requires different expertise domains</li>
              <li>• Work can be parallelized for speed</li>
              <li>• Need checks and balances (review agents)</li>
              <li>• Single context window isn't enough</li>
            </ul>
          </div>
        </motion.div>

        {/* Right: Visualization */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 bg-gray-800/40 rounded-xl border border-gray-700/50 p-4 flex items-center justify-center min-h-[280px]"
        >
          <AnimatePresence mode="wait">
            {/* Orchestrator Pattern Visualization */}
            {activePattern === 'orchestrator' && (
              <motion.div
                key="orchestrator"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full h-full flex flex-col items-center justify-center"
              >
                {/* SVG for connection lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
                    </marker>
                    <marker id="arrowhead-back" markerWidth="10" markerHeight="7" refX="1" refY="3.5" orient="auto">
                      <polygon points="10 0, 0 3.5, 10 7" fill="#8b5cf6" />
                    </marker>
                  </defs>
                  {orchestratorAgents.map((agent, index) => {
                    const centerX = 200;
                    const centerY = 120;
                    const radius = 90;
                    const angleRad = (agent.angle * Math.PI) / 180;
                    const endX = centerX + Math.cos(angleRad) * radius;
                    const endY = centerY + Math.sin(angleRad) * radius;
                    
                    return (
                      <motion.g key={agent.id}>
                        <motion.line
                          x1={centerX}
                          y1={centerY}
                          x2={endX}
                          y2={endY}
                          stroke={agent.color}
                          strokeWidth="2"
                          strokeDasharray="6 3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                          markerEnd="url(#arrowhead)"
                          markerStart="url(#arrowhead-back)"
                        />
                        {/* Animated pulse along line */}
                        <motion.circle
                          r="4"
                          fill={agent.color}
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            cx: [centerX, endX],
                            cy: [centerY, endY],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.5,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.g>
                    );
                  })}
                </svg>

                {/* Center Orchestrator */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 flex flex-col items-center justify-center"
                  style={{ 
                    boxShadow: '0 0 40px rgba(139, 92, 246, 0.5), inset 0 0 20px rgba(255,255,255,0.1)',
                  }}
                >
                  <motion.span 
                    className="text-2xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🎭
                  </motion.span>
                  <span className="text-white text-xs font-bold mt-1">Orchestrator</span>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-purple-400/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Surrounding Agents - Positioned absolutely around center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {orchestratorAgents.map((agent, index) => {
                    const radius = 110;
                    const angleRad = (agent.angle * Math.PI) / 180;
                    const x = Math.cos(angleRad) * radius;
                    const y = Math.sin(angleRad) * radius;

                    return (
                      <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1, type: 'spring', stiffness: 200 }}
                        className="absolute"
                        style={{ 
                          transform: `translate(${x}px, ${y}px)`,
                        }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          className="w-16 h-16 rounded-xl flex flex-col items-center justify-center cursor-pointer relative"
                          style={{
                            backgroundColor: `${agent.color}15`,
                            border: `2px solid ${agent.color}`,
                            boxShadow: `0 0 20px ${agent.color}30`,
                          }}
                        >
                          <span className="text-xl">{agent.icon}</span>
                          <span className="text-[10px] text-gray-200 font-medium">{agent.name}</span>
                          {/* Status indicator */}
                          <motion.div
                            className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                            style={{ backgroundColor: agent.color }}
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                          />
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Legend */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -bottom-2 flex items-center gap-4 text-xs text-gray-400"
                >
                  <span className="flex items-center gap-1">
                    <span className="text-purple-400">↔</span> Bidirectional
                  </span>
                  <span className="flex items-center gap-1">
                    <motion.span 
                      className="w-2 h-2 rounded-full bg-purple-400"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    Active flow
                  </span>
                </motion.div>
              </motion.div>
            )}

            {/* Pipeline Pattern Visualization */}
            {activePattern === 'pipeline' && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 w-full justify-center"
              >
                {pipelineSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex flex-col items-center"
                    >
                      <div
                        className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center transition-all ${
                          animationStep > index ? 'scale-105' : ''
                        }`}
                        style={{
                          backgroundColor: animationStep > index ? `${step.color}30` : `${step.color}15`,
                          border: `2px solid ${animationStep > index ? step.color : `${step.color}50`}`,
                          boxShadow: animationStep > index ? `0 0 20px ${step.color}40` : 'none',
                        }}
                      >
                        <span className="text-xl">{step.icon}</span>
                        <span className="text-[9px] text-gray-300">{step.name}</span>
                      </div>
                      <span className="text-[8px] text-gray-500 mt-1 text-center max-w-[60px]">
                        {step.task}
                      </span>
                    </motion.div>
                    
                    {index < pipelineSteps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + 0.1 * index }}
                        className={`mx-1 text-lg transition-colors ${
                          animationStep > index ? 'text-green-400' : 'text-gray-600'
                        }`}
                      >
                        →
                      </motion.div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {/* Collaborative Pattern Visualization */}
            {activePattern === 'collaborative' && (
              <motion.div
                key="collaborative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 w-full"
              >
                {/* Parallel Agents */}
                <div className="flex items-center gap-6">
                  {collaborativeAgents.map((agent, index) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex flex-col items-center"
                    >
                      <div
                        className="w-14 h-14 rounded-xl flex flex-col items-center justify-center"
                        style={{
                          backgroundColor: `${agent.color}20`,
                          border: `2px solid ${agent.color}`,
                        }}
                      >
                        <span className="text-xl">{agent.icon}</span>
                        <span className="text-[9px] text-gray-300">{agent.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Parallel arrows down */}
                <div className="flex items-center gap-6">
                  {collaborativeAgents.map((agent, index) => (
                    <motion.div
                      key={`arrow-${agent.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + 0.1 * index }}
                      className="text-lg"
                      style={{ color: agent.color }}
                    >
                      ↓
                    </motion.div>
                  ))}
                </div>

                {/* Shared Context */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-r from-blue-900/30 via-green-900/30 to-yellow-900/30 rounded-xl px-8 py-3 border border-purple-500/30"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📦</span>
                    <div>
                      <span className="text-white text-sm font-bold">Shared Context</span>
                      <span className="text-gray-400 text-xs ml-2">(merge results)</span>
                    </div>
                  </div>
                </motion.div>

                {/* Arrow down to output */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-lg text-purple-400"
                >
                  ↓
                </motion.div>

                {/* Final Output */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-purple-600/20 rounded-xl px-6 py-2 border border-purple-500/50"
                >
                  <span className="text-purple-300 text-sm font-medium">✨ Combined Output</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-3 text-center"
      >
        <p className="text-purple-400 font-semibold text-sm">
          Multi-agent = Divide and conquer. Choose the pattern that fits your task.
        </p>
      </motion.div>
    </div>
  );
}
