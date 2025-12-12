'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const phases = [
  {
    id: 'gather',
    name: 'Gather Context',
    icon: '🔍',
    color: '#3b82f6',
    description: 'Collect information needed to make decisions',
    strategies: ['Agentic Search', 'Semantic Search', 'Subagents', 'Tool Results'],
    keyInsight: 'The file system is a form of context engineering.',
  },
  {
    id: 'act',
    name: 'Take Action',
    icon: '⚡',
    color: '#10b981',
    description: 'Execute operations to achieve the goal',
    strategies: ['Tools', 'Code Execution', 'Bash/Shell', 'API Calls'],
    keyInsight: 'Tools are the contract between agent and environment.',
  },
  {
    id: 'verify',
    name: 'Verify Work',
    icon: '✓',
    color: '#f59e0b',
    description: 'Check if the action succeeded and was correct',
    strategies: ['Rules-Based', 'Visual Feedback', 'LLM as Judge', 'End-State Check'],
    keyInsight: 'Agents that self-verify are fundamentally more reliable.',
  },
  {
    id: 'repeat',
    name: 'Repeat',
    icon: '↻',
    color: '#ec4899',
    description: 'Continue until goal is achieved or limit reached',
    strategies: ['Loop Detection', 'Progress Tracking', 'Exit Conditions', 'Error Recovery'],
    keyInsight: 'The loop is what makes agents autonomous.',
  },
];

export default function AgentLoopDeepDiveSlide() {
  const [activePhase, setActivePhase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true); // Auto-start animation

  useEffect(() => {
    if (isAnimating) {
      const timer = setInterval(() => {
        setActivePhase(prev => (prev + 1) % phases.length);
      }, 1500);
      return () => clearInterval(timer);
    }
  }, [isAnimating]);

  const currentPhase = phases[activePhase];

  // Calculate positions for the 4 phases
  const getPhasePosition = (index: number) => {
    const positions = [
      { x: 0, y: -85 },   // top - Gather
      { x: 85, y: 0 },    // right - Act
      { x: 0, y: 85 },    // bottom - Verify
      { x: -85, y: 0 },   // left - Repeat
    ];
    return positions[index];
  };

  return (
    <div className="h-full flex flex-col items-center justify-start pt-6 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wide uppercase rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
          Core Pattern
        </span>
        <h2 className="text-3xl font-bold text-white mb-1">
          The Agent Loop
        </h2>
        <p className="text-gray-400 text-sm">
          The fundamental pattern all agents follow
        </p>
      </motion.div>

      {/* Main content */}
      <div className="flex gap-8 w-full max-w-5xl flex-1 min-h-0 items-center">
        {/* Loop diagram */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="relative w-56 h-56">
            {/* Outer ring - animating */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 224 224">
              {/* Background ring */}
              <circle
                cx="112"
                cy="112"
                r="80"
                fill="none"
                stroke="#1f2937"
                strokeWidth="3"
              />
              {/* Animated progress ring */}
              <motion.circle
                cx="112"
                cy="112"
                r="80"
                fill="none"
                stroke={currentPhase.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="502"
                strokeDashoffset="377"
                initial={{ rotate: -90 }}
                animate={{ 
                  rotate: isAnimating ? [activePhase * 90 - 90, (activePhase + 1) * 90 - 90] : activePhase * 90 - 90,
                }}
                transition={{ 
                  duration: isAnimating ? 1.5 : 0.3,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: '112px 112px' }}
              />
            </svg>

            {/* Center goal */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="w-14 h-14 rounded-full bg-purple-500/20 border-2 border-purple-500/50 flex items-center justify-center"
                animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-xl">🎯</span>
              </motion.div>
            </div>

            {/* Phase nodes */}
            {phases.map((phase, index) => {
              const pos = getPhasePosition(index);
              const isActive = activePhase === index;

              return (
                <motion.button
                  key={phase.id}
                  onClick={() => {
                    setActivePhase(index);
                    setIsAnimating(false);
                  }}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${pos.x}px - 22px)`,
                    top: `calc(50% + ${pos.y}px - 22px)`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <motion.div
                    animate={{ 
                      scale: isActive ? 1.2 : 1,
                      boxShadow: isActive ? `0 0 25px ${phase.color}` : '0 0 0px transparent',
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-11 h-11 rounded-lg flex items-center justify-center cursor-pointer"
                    style={{
                      backgroundColor: isActive ? `${phase.color}40` : `${phase.color}20`,
                      border: `2px solid ${phase.color}`,
                    }}
                  >
                    <span className="text-lg">{phase.icon}</span>
                  </motion.div>
                  <span
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium transition-colors"
                    style={{ color: isActive ? phase.color : '#6b7280' }}
                  >
                    {phase.name.split(' ')[0]}
                  </span>
                </motion.button>
              );
            })}

            {/* Animated flow indicator */}
            <AnimatePresence>
              {isAnimating && (
                <motion.div
                  key={activePhase}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: currentPhase.color,
                    boxShadow: `0 0 15px ${currentPhase.color}`,
                    left: `calc(50% + ${getPhasePosition(activePhase).x * 0.6}px - 6px)`,
                    top: `calc(50% + ${getPhasePosition(activePhase).y * 0.6}px - 6px)`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1.5, 1],
                    opacity: [0, 1, 0.8],
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>

            {/* Arrow indicators between phases */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 224 224">
              {phases.map((phase, index) => {
                const current = getPhasePosition(index);
                const next = getPhasePosition((index + 1) % 4);
                const midX = 112 + (current.x + next.x) / 2 * 0.5;
                const midY = 112 + (current.y + next.y) / 2 * 0.5;
                const isActiveArrow = activePhase === index;
                
                return (
                  <motion.text
                    key={`arrow-${index}`}
                    x={midX}
                    y={midY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[10px]"
                    fill={isActiveArrow && isAnimating ? phase.color : '#4b5563'}
                    animate={{ 
                      opacity: isActiveArrow && isAnimating ? [0.5, 1, 0.5] : 0.5,
                    }}
                    transition={{ duration: 0.75, repeat: Infinity }}
                  >
                    {index === 0 ? '→' : index === 1 ? '↓' : index === 2 ? '←' : '↑'}
                  </motion.text>
                );
              })}
            </svg>
          </div>

          {/* Animate button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => setIsAnimating(!isAnimating)}
            className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isAnimating 
                ? 'bg-pink-500/20 text-pink-400 border border-pink-500/50' 
                : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:text-white'
            }`}
          >
            {isAnimating ? '⏸ Stop' : '▶ Animate Loop'}
          </motion.button>
        </div>

        {/* Detail panel */}
        <motion.div
          key={currentPhase.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 min-w-0"
        >
          <div
            className="rounded-xl p-5 border h-full"
            style={{
              backgroundColor: `${currentPhase.color}08`,
              borderColor: `${currentPhase.color}30`,
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${currentPhase.color}25` }}
              >
                <span className="text-2xl">{currentPhase.icon}</span>
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white">{currentPhase.name}</h3>
                <p className="text-gray-400 text-sm">{currentPhase.description}</p>
              </div>
            </div>

            {/* Strategies */}
            <div className="mb-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Strategies
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentPhase.strategies.map((strategy, index) => (
                  <motion.span
                    key={strategy}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium"
                    style={{
                      backgroundColor: `${currentPhase.color}15`,
                      color: currentPhase.color,
                      border: `1px solid ${currentPhase.color}30`,
                    }}
                  >
                    {strategy}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Key insight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="px-4 py-3 rounded-lg"
              style={{
                backgroundColor: `${currentPhase.color}10`,
                borderLeft: `3px solid ${currentPhase.color}`,
              }}
            >
              <span className="text-sm">💡 </span>
              <span className="text-gray-300 text-sm">{currentPhase.keyInsight}</span>
            </motion.div>

            {/* Phase dots */}
            <div className="mt-4 flex justify-center gap-2">
              {phases.map((phase, index) => (
                <button
                  key={phase.id}
                  onClick={() => {
                    setActivePhase(index);
                    setIsAnimating(false);
                  }}
                  className="w-2.5 h-2.5 rounded-full transition-all"
                  style={{
                    backgroundColor: activePhase === index ? phase.color : '#374151',
                    transform: activePhase === index ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
