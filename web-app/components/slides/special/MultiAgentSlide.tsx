'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const patterns = [
  {
    id: 'supervisor',
    name: 'Supervisor',
    icon: '🎯',
    description: 'Central supervisor routes tasks to specialized agents based on requirements',
    useCase: 'Complex tasks requiring different expertise domains',
    pros: ['Clear control flow', 'Easy to debug', 'Centralized decisions'],
    cons: ['Single point of failure', 'Supervisor bottleneck'],
  },
  {
    id: 'sequential',
    name: 'Sequential',
    icon: '➡️',
    description: 'Agents process in a predefined linear order, each transforming output',
    useCase: 'Multi-stage processing (draft → review → polish)',
    pros: ['Clear data flow', 'Each agent focused', 'Predictable'],
    cons: ['Sequential = slower', 'Error propagation'],
  },
  {
    id: 'concurrent',
    name: 'Concurrent',
    icon: '⚡',
    description: 'Multiple agents work in parallel, results aggregated by collector',
    useCase: 'Tasks that can be parallelized (research multiple sources)',
    pros: ['Faster execution', 'True parallelism', 'Diverse perspectives'],
    cons: ['Merge conflicts', 'Coordination complexity'],
  },
];

// Supervisor pattern agents
const supervisorAgents = [
  { id: 'researcher', name: 'Researcher', icon: '🔍', color: '#3b82f6', task: 'Search & gather' },
  { id: 'analyst', name: 'Analyst', icon: '📊', color: '#10b981', task: 'Analyze data' },
  { id: 'writer', name: 'Writer', icon: '✍️', color: '#f59e0b', task: 'Generate content' },
  { id: 'reviewer', name: 'Reviewer', icon: '✓', color: '#8b5cf6', task: 'Quality check' },
];

// Sequential pipeline steps
const pipelineSteps = [
  { id: 'gather', name: 'Gather', icon: '🔍', color: '#3b82f6', task: 'Collect data' },
  { id: 'process', name: 'Process', icon: '⚙️', color: '#10b981', task: 'Transform' },
  { id: 'analyze', name: 'Analyze', icon: '📊', color: '#f59e0b', task: 'Extract insights' },
  { id: 'output', name: 'Output', icon: '📝', color: '#8b5cf6', task: 'Generate result' },
];

// Concurrent agents
const concurrentAgents = [
  { id: 'agent1', name: 'Agent A', icon: '🔵', color: '#3b82f6', task: 'Perspective 1' },
  { id: 'agent2', name: 'Agent B', icon: '🟢', color: '#10b981', task: 'Perspective 2' },
  { id: 'agent3', name: 'Agent C', icon: '🟡', color: '#f59e0b', task: 'Perspective 3' },
];

export default function MultiAgentSlide() {
  const [activePattern, setActivePattern] = useState('supervisor');
  const [animationStep, setAnimationStep] = useState(0);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);

  const currentPattern = patterns.find(p => p.id === activePattern)!;

  // Animate sequential flow
  useEffect(() => {
    if (activePattern === 'sequential') {
      setAnimationStep(0);
      const interval = setInterval(() => {
        setAnimationStep(prev => (prev + 1) % (pipelineSteps.length + 1));
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [activePattern]);

  // Animate supervisor routing
  useEffect(() => {
    if (activePattern === 'supervisor') {
      const agents = ['researcher', 'analyst', 'writer', 'reviewer'];
      let idx = 0;
      const interval = setInterval(() => {
        setActiveAgent(agents[idx]);
        idx = (idx + 1) % agents.length;
      }, 1500);
      return () => clearInterval(interval);
    } else {
      setActiveAgent(null);
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
          Multi-Agent <span className="text-purple-400">Orchestration</span>
        </h2>
        <p className="text-gray-400 text-sm">
          Coordination patterns for complex, collaborative AI tasks
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
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 backdrop-blur-sm ${
              activePattern === pattern.id
                ? 'bg-purple-500/30 text-white border border-purple-400/50 shadow-lg shadow-purple-500/20'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
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
              className="relative rounded-2xl p-4 border border-white/10 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Glass reflection */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <span className="text-2xl">{currentPattern.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{currentPattern.name} Pattern</h3>
                  <p className="text-xs text-gray-400">{currentPattern.description}</p>
                </div>
              </div>
              
              <div className="bg-purple-900/20 rounded-xl p-3 border border-purple-500/20 mb-3 backdrop-blur-sm">
                <span className="text-xs text-purple-400 font-medium">Best for:</span>
                <p className="text-sm text-gray-300 mt-1">{currentPattern.useCase}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-900/20 rounded-xl p-2 border border-green-500/20 backdrop-blur-sm">
                  <span className="text-xs text-green-400 font-medium">✓ Pros</span>
                  <ul className="mt-1 space-y-1">
                    {currentPattern.pros.map(pro => (
                      <li key={pro} className="text-xs text-gray-400">• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-900/20 rounded-xl p-2 border border-red-500/20 backdrop-blur-sm">
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
          <div 
            className="rounded-2xl p-3 border border-white/10"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
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
          className="lg:col-span-3 rounded-2xl border border-white/10 p-6 flex items-center justify-center min-h-[300px] relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Glass effect */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <AnimatePresence mode="wait">
            {/* SUPERVISOR PATTERN */}
            {activePattern === 'supervisor' && (
              <motion.div
                key="supervisor"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center gap-2 w-full"
              >
                {/* User Input at Top */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="px-5 py-2.5 rounded-xl bg-gray-700/50 border border-gray-600/50 backdrop-blur-sm">
                    <span className="text-sm text-gray-300">👤 User Request</span>
                  </div>
                </motion.div>

                {/* Arrow from User to Supervisor */}
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-0.5 h-8 bg-gradient-to-b from-gray-500 to-purple-500" />
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-purple-500" />
                </motion.div>

                {/* Center Supervisor */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                  className="relative z-10"
                >
                  <div 
                    className="w-44 h-24 rounded-2xl flex flex-col items-center justify-center relative"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.3) 100%)',
                      border: '2px solid rgba(139,92,246,0.5)',
                      boxShadow: '0 0 40px rgba(139,92,246,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                    }}
                  >
                    <span className="text-2xl">🎯</span>
                    <span className="text-white text-sm font-bold">Supervisor</span>
                    <span className="text-[10px] text-purple-300">routes tasks</span>
                    
                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-purple-400/30"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.div>

                {/* Route lines - simple CSS version */}
                <div className="flex items-start justify-center gap-1 -mt-1">
                  {supervisorAgents.map((agent, index) => {
                    const isActive = activeAgent === agent.id;
                    // Calculate angle for each line - spread wider
                    const angles = [-40, -14, 14, 40];
                    const angle = angles[index];
                    
                    return (
                      <motion.div
                        key={`line-${agent.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex flex-col items-center"
                        style={{ width: '85px' }}
                      >
                        {/* Angled line */}
                        <div 
                          className="h-10 w-0.5 origin-top transition-all duration-300"
                          style={{ 
                            background: isActive 
                              ? `linear-gradient(to bottom, ${agent.color}, ${agent.color})` 
                              : 'linear-gradient(to bottom, #4b5563, #374151)',
                            transform: `rotate(${angle}deg)`,
                            boxShadow: isActive ? `0 0 8px ${agent.color}` : 'none',
                          }}
                        />
                        {/* Route label */}
                        <span className="text-[9px] text-gray-500 mt-0">route</span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Agent boxes */}
                <div className="flex justify-center gap-3 -mt-2">
                  {supervisorAgents.map((agent, index) => {
                    const isActive = activeAgent === agent.id;
                    return (
                      <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className={`flex flex-col items-center transition-all duration-300 ${isActive ? 'scale-110' : ''}`}
                      >
                        <div
                          className="w-16 h-16 rounded-xl flex flex-col items-center justify-center backdrop-blur-sm transition-all duration-300"
                          style={{
                            background: isActive 
                              ? `linear-gradient(135deg, ${agent.color}30 0%, ${agent.color}10 100%)`
                              : 'rgba(255,255,255,0.05)',
                            border: `2px solid ${isActive ? agent.color : 'rgba(255,255,255,0.1)'}`,
                            boxShadow: isActive ? `0 0 20px ${agent.color}40` : 'none',
                          }}
                        >
                          <span className="text-lg">{agent.icon}</span>
                          <span className="text-[9px] text-gray-200 font-medium">{agent.name}</span>
                        </div>
                        <span className="text-[8px] text-gray-500 mt-1">{agent.task}</span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Legend */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex items-center gap-4 text-[10px] text-gray-500 mt-2"
                >
                  <span>↔ Bidirectional</span>
                  <span className="flex items-center gap-1">
                    <motion.span 
                      className="w-2 h-2 rounded-full bg-purple-400"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    Active routing
                  </span>
                </motion.div>
              </motion.div>
            )}

            {/* SEQUENTIAL PATTERN */}
            {activePattern === 'sequential' && (
              <motion.div
                key="sequential"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center w-full"
              >
                {/* Common State bar */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.8 }}
                  className="w-full max-w-md mb-4 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-center"
                >
                  <span className="text-xs text-amber-400">📦 Common State (shared across pipeline)</span>
                </motion.div>

                {/* Pipeline */}
                <div className="flex items-center gap-1 w-full justify-center">
                  {/* Input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-3 py-2 rounded-lg bg-gray-700/50 border border-gray-600/50"
                  >
                    <span className="text-xs text-gray-300">Input</span>
                  </motion.div>

                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-600"
                  >→</motion.span>

                  {pipelineSteps.map((step, index) => {
                    const isProcessed = animationStep > index;
                    const isActive = animationStep === index + 1;
                    
                    return (
                      <div key={step.id} className="flex items-center">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex flex-col items-center"
                        >
                          <div
                            className={`w-16 h-20 rounded-xl flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                              isActive ? 'scale-110' : ''
                            }`}
                            style={{
                              background: isProcessed 
                                ? `linear-gradient(135deg, ${step.color}25 0%, ${step.color}10 100%)`
                                : 'rgba(255,255,255,0.03)',
                              border: `2px solid ${isProcessed ? step.color : 'rgba(255,255,255,0.1)'}`,
                              boxShadow: isActive ? `0 0 25px ${step.color}40` : 'none',
                            }}
                          >
                            <span className="text-xl">{step.icon}</span>
                            <span className="text-[9px] text-gray-200 font-medium">{step.name}</span>
                            <span className="text-[8px] text-gray-500">{step.task}</span>
                          </div>
                          {/* Model/tools indicator */}
                          <div className="mt-1 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                            <span className="text-[7px] text-blue-400">Model + Tools</span>
                          </div>
                        </motion.div>
                        
                        {index < pipelineSteps.length - 1 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 + 0.1 * index }}
                            className={`mx-1 text-lg transition-colors duration-300 ${
                              isProcessed ? 'text-green-400' : 'text-gray-600'
                            }`}
                          >
                            →
                          </motion.div>
                        )}
                      </div>
                    );
                  })}

                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`transition-colors ${animationStep > pipelineSteps.length - 1 ? 'text-green-400' : 'text-gray-600'}`}
                  >→</motion.span>

                  {/* Output */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`px-3 py-2 rounded-lg transition-all ${
                      animationStep > pipelineSteps.length - 1 
                        ? 'bg-green-500/20 border border-green-500/50' 
                        : 'bg-gray-700/50 border border-gray-600/50'
                    }`}
                  >
                    <span className={`text-xs ${animationStep > pipelineSteps.length - 1 ? 'text-green-300' : 'text-gray-300'}`}>
                      Result
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* CONCURRENT PATTERN */}
            {activePattern === 'concurrent' && (
              <motion.div
                key="concurrent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 w-full"
              >
                {/* Initiator */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-6 py-3 rounded-xl backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(59,130,246,0.2) 100%)',
                    border: '2px solid rgba(139,92,246,0.4)',
                  }}
                >
                  <span className="text-sm text-white font-medium">🎯 Initiator & Collector</span>
                </motion.div>

                {/* Fan-out arrows */}
                <div className="flex items-center justify-center gap-8 relative">
                  <svg className="absolute -top-2 w-full h-8" style={{ overflow: 'visible' }}>
                    {concurrentAgents.map((agent, index) => {
                      const xOffset = (index - 1) * 100;
                      return (
                        <motion.path
                          key={agent.id}
                          d={`M150 0 Q150 15 ${150 + xOffset} 30`}
                          stroke={agent.color}
                          strokeWidth="2"
                          strokeDasharray="4 2"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        />
                      );
                    })}
                  </svg>
                </div>

                {/* Parallel Agents */}
                <div className="flex items-start gap-6 mt-4">
                  {concurrentAgents.map((agent, index) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        animate={{ 
                          boxShadow: [
                            `0 0 10px ${agent.color}20`,
                            `0 0 25px ${agent.color}40`,
                            `0 0 10px ${agent.color}20`,
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className="w-18 h-18 rounded-xl flex flex-col items-center justify-center p-3 backdrop-blur-sm"
                        style={{
                          background: `linear-gradient(135deg, ${agent.color}20 0%, ${agent.color}05 100%)`,
                          border: `2px solid ${agent.color}`,
                        }}
                      >
                        <span className="text-2xl">{agent.icon}</span>
                        <span className="text-xs text-gray-200 font-medium">{agent.name}</span>
                        <span className="text-[8px] text-gray-400">{agent.task}</span>
                      </motion.div>
                      
                      {/* Processing indicator */}
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                        className="mt-2 text-[9px] text-gray-500"
                      >
                        ⚡ Processing...
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Fan-in arrows */}
                <div className="flex items-center justify-center relative h-8">
                  <svg className="w-full h-full" style={{ overflow: 'visible' }}>
                    {concurrentAgents.map((agent, index) => {
                      const xOffset = (index - 1) * 100;
                      return (
                        <motion.path
                          key={agent.id}
                          d={`M${150 + xOffset} 0 Q${150 + xOffset} 15 150 30`}
                          stroke={agent.color}
                          strokeWidth="2"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        />
                      );
                    })}
                  </svg>
                </div>

                {/* Aggregated Results */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="px-6 py-3 rounded-xl backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(5,150,105,0.2) 100%)',
                    border: '2px solid rgba(16,185,129,0.5)',
                    boxShadow: '0 0 30px rgba(16,185,129,0.2)',
                  }}
                >
                  <span className="text-sm text-green-300 font-medium">✨ Aggregated Results</span>
                  <p className="text-[9px] text-green-400/70 mt-1">Combined • Compared • Selected</p>
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
          Choose the pattern that fits your task's coordination requirements
        </p>
      </motion.div>
    </div>
  );
}
