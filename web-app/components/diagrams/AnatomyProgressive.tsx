'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const steps = [
  {
    id: 1,
    title: 'Step 1: Basic Flow',
    description: 'User prompt flows through LLM to generate response',
    components: ['userPrompt', 'llm', 'response'],
  },
  {
    id: 2,
    title: 'Step 2: Add Knowledge & Tools',
    description: 'LLM can access external knowledge and use tools',
    components: ['userPrompt', 'llm', 'response', 'knowledge', 'tools'],
  },
  {
    id: 3,
    title: 'Step 3: Add MCP Architecture',
    description: 'Tools connect via Model Context Protocol (Anthropic standard)',
    components: ['userPrompt', 'llm', 'response', 'knowledge', 'tools', 'mcp'],
  },
  {
    id: 4,
    title: 'Step 4: Complete Architecture',
    description: 'Full agent with memory, goals, and guardrails',
    components: ['userPrompt', 'llm', 'response', 'knowledge', 'tools', 'mcp', 'memory', 'goals', 'guardrails'],
  },
];

// Simple Arrow Component using CSS
const Arrow = ({ 
  direction = 'down', 
  color = '#6b7280',
  size = 'md'
}: { 
  direction: 'down' | 'up' | 'left' | 'right';
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const sizes = {
    sm: { shaft: 20, width: 6, head: 10 },
    md: { shaft: 28, width: 8, head: 12 },
    lg: { shaft: 36, width: 10, head: 16 },
  };
  const s = sizes[size];
  const isVertical = direction === 'down' || direction === 'up';
  
  return (
    <div 
      className="flex items-center justify-center"
      style={{
        flexDirection: direction === 'down' ? 'column' : direction === 'up' ? 'column-reverse' : direction === 'right' ? 'row' : 'row-reverse',
      }}
    >
      {/* Shaft */}
      <div
        style={{
          width: isVertical ? s.width : s.shaft,
          height: isVertical ? s.shaft : s.width,
          backgroundColor: color,
          borderRadius: s.width / 2,
        }}
      />
      {/* Arrowhead */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: isVertical ? `${s.head / 2}px solid transparent` : direction === 'right' ? `${s.head}px solid ${color}` : 'none',
          borderRight: isVertical ? `${s.head / 2}px solid transparent` : direction === 'left' ? `${s.head}px solid ${color}` : 'none',
          borderTop: direction === 'down' ? `${s.head}px solid ${color}` : direction === 'up' ? 'none' : `${s.head / 2}px solid transparent`,
          borderBottom: direction === 'up' ? `${s.head}px solid ${color}` : direction === 'down' ? 'none' : `${s.head / 2}px solid transparent`,
          marginLeft: direction === 'right' ? -2 : 0,
          marginRight: direction === 'left' ? -2 : 0,
          marginTop: direction === 'down' ? -2 : 0,
          marginBottom: direction === 'up' ? -2 : 0,
        }}
      />
    </div>
  );
};

// Bidirectional Arrow Component - Single line with arrowheads on both ends <——>
const BidirectionalArrow = ({ 
  color = '#ef4444',
}: { 
  color?: string;
}) => {
  return (
    <div className="flex items-center justify-center">
      {/* Left arrowhead */}
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: '7px solid transparent',
          borderBottom: '7px solid transparent',
          borderRight: `12px solid ${color}`,
        }}
      />
      {/* Shaft */}
      <div
        style={{
          width: 28,
          height: 8,
          backgroundColor: color,
          borderRadius: 4,
          marginLeft: -3,
          marginRight: -3,
        }}
      />
      {/* Right arrowhead */}
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: '7px solid transparent',
          borderBottom: '7px solid transparent',
          borderLeft: `12px solid ${color}`,
        }}
      />
    </div>
  );
};

export default function AnatomyProgressive() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const activeStep = steps.find(s => s.id === currentStep)!;
  const isActive = (component: string) => activeStep.components.includes(component);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950">
      {/* Step Indicator */}
      <div className="mb-6 flex items-center justify-center gap-6 flex-shrink-0">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-6 py-2.5 bg-gray-800/90 hover:bg-gray-700 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-sm font-semibold shadow-lg border border-gray-700/50 hover:border-gray-600"
        >
          ← Prev
        </button>
        <div className="text-center min-w-[360px]">
          <div className="text-base font-bold text-white mb-1">{activeStep.title}</div>
          <div className="text-sm text-gray-400 mb-3">{activeStep.description}</div>
          <div className="flex gap-2 justify-center">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`rounded-full transition-all duration-300 ${
                  step.id === currentStep
                    ? 'bg-blue-500 w-8 h-2 shadow-lg shadow-blue-500/50'
                    : step.id < currentStep
                    ? 'bg-gray-500 w-2 h-2'
                    : 'bg-gray-700 w-2 h-2'
                }`}
              />
            ))}
          </div>
        </div>
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length}
          className="px-6 py-2.5 bg-gray-800/90 hover:bg-gray-700 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-sm font-semibold shadow-lg border border-gray-700/50 hover:border-gray-600"
        >
          Next →
        </button>
      </div>

      {/* Diagram Container */}
      <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center min-h-0">
        <div className="relative w-full h-full max-h-[75vh]">
          {/* Guardrails Border (Step 4) */}
          <AnimatePresence>
            {isActive('guardrails') && (
              <motion.div
                className="absolute inset-0 border-2 border-orange-500/60 rounded-2xl z-40"
                style={{
                  borderStyle: 'dashed',
                  boxShadow: '0 0 20px rgba(249, 115, 22, 0.3)',
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute top-2 right-4 text-orange-400 text-xs font-bold">
                  Guardrails
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Diagram - Grid Layout */}
          <div className="relative w-full h-full grid grid-cols-12 gap-4 p-8 z-10">
            {/* Left Column - Goals & Memory */}
            <div className="col-span-3 flex flex-col justify-center gap-6">
              {/* Goals & Guidelines */}
              <AnimatePresence>
                {isActive('goals') && (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <div className="bg-white rounded-lg p-4 shadow-xl flex-1">
                      <div className="text-gray-800 font-bold text-sm mb-1">Goals and guidelines</div>
                      <div className="text-gray-500 text-xs">System prompt</div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Arrow direction="right" color="#ef4444" size="md" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Memory */}
              <AnimatePresence>
                {isActive('memory') && (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <div className="bg-white rounded-lg p-4 shadow-xl flex-1">
                      <div className="text-gray-800 font-bold text-sm mb-1">Memory</div>
                      <div className="text-gray-500 text-xs">Short term and longer term</div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <BidirectionalArrow color="#ef4444" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Center Column - Main Flow */}
            <div className="col-span-6 flex flex-col items-center justify-center gap-4">
              {/* User Prompt */}
              <AnimatePresence>
                {isActive('userPrompt') && (
                  <motion.div
                    initial={{ opacity: 0, y: -30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="w-full max-w-xs"
                  >
                    <div
                      className="px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-xl text-center"
                      style={{
                        background: 'linear-gradient(135deg, #5eead4 0%, #2dd4bf 100%)',
                        boxShadow: '0 10px 30px rgba(94, 234, 212, 0.4)',
                      }}
                    >
                      User prompt
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Arrow Down - Between User Prompt and LLM */}
              {isActive('userPrompt') && isActive('llm') && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Arrow direction="down" color="#6b7280" size="md" />
                </motion.div>
              )}

              {/* LLM Core */}
              <AnimatePresence>
                {isActive('llm') && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                    className="relative w-full max-w-xs"
                  >
                    {/* Dashed Container */}
                    <div
                      className="absolute inset-0 border-2 border-gray-600 rounded-xl -m-2"
                      style={{ borderStyle: 'dashed' }}
                    />
                    
                    {/* LLM Card */}
                    <div
                      className="px-10 py-8 rounded-lg relative overflow-visible"
                      style={{
                        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-700/20 to-transparent" />
                      
                      {/* Brain Icon */}
                      <div className="text-center mb-3">
                        <div className="text-4xl mb-2">🧠</div>
                        <div className="text-white font-bold text-xl tracking-wide">LLM</div>
                      </div>
                      
                      {/* Reasoning Label */}
                      {isActive('goals') && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-center text-xs text-gray-500 mt-2"
                        >
                          Reasoning / Orchestration
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Arrow Down - Between LLM and Response */}
              {isActive('llm') && isActive('response') && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Arrow direction="down" color="#6b7280" size="md" />
                </motion.div>
              )}

              {/* Response */}
              <AnimatePresence>
                {isActive('response') && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="w-full max-w-xs"
                  >
                    <div
                      className="px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-xl text-center"
                      style={{
                        background: 'linear-gradient(135deg, #5eead4 0%, #2dd4bf 100%)',
                        boxShadow: '0 10px 30px rgba(94, 234, 212, 0.4)',
                      }}
                    >
                      Response
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column - Knowledge & Tools */}
            <div className="col-span-3 flex flex-col justify-center gap-4">
              {/* Knowledge */}
              <AnimatePresence>
                {isActive('knowledge') && (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <BidirectionalArrow color="#ef4444" />
                    </motion.div>
                    <div className="bg-white rounded-lg p-4 shadow-xl flex-1">
                      <div className="text-gray-800 font-bold text-sm mb-1">Knowledge</div>
                      <div className="text-gray-500 text-xs">RAG/ vector DB</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tools */}
              <AnimatePresence>
                {isActive('tools') && (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <BidirectionalArrow color="#ef4444" />
                    </motion.div>
                    <div className="bg-white rounded-lg p-4 shadow-xl flex-1">
                      <div className="text-gray-800 font-bold text-sm mb-4">Tools</div>

                      {/* MCP Architecture */}
                      {isActive('mcp') && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 }}
                          className="mt-4 pt-4 border-t border-gray-300"
                        >
                          <div className="text-xs text-purple-600 font-bold mb-2 text-center">
                            🔌 MCP Protocol
                          </div>
                          <div className="space-y-1.5">
                            <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded text-center">
                              Agent (Client)
                            </div>
                            <div className="flex items-center justify-center">
                              <div className="text-purple-500 text-xs">↕</div>
                            </div>
                            <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded text-center">
                              MCP Servers
                            </div>
                            <div className="flex gap-1 justify-center pt-1">
                              <div className="text-xs" title="GitHub">🐙</div>
                              <div className="text-xs" title="Slack">💬</div>
                              <div className="text-xs" title="Database">🗄️</div>
                            </div>
                            <div className="text-center text-gray-500 text-xs mt-1">
                              Anthropic Standard
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
