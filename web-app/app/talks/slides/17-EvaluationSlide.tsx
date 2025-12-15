'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const evalDimensions = [
  {
    id: 'task',
    name: 'Task Success',
    icon: '🎯',
    color: '#10b981',
    description: 'Did the agent achieve the goal?',
    metrics: ['Completion rate', 'Correctness', 'Goal satisfaction'],
    howToMeasure: 'Binary pass/fail or rubric scoring on held-out test cases',
  },
  {
    id: 'efficiency',
    name: 'Efficiency',
    icon: '⚡',
    color: '#f59e0b',
    description: 'How well did it use resources?',
    metrics: ['Steps taken', 'Tokens used', 'API calls', 'Time to complete'],
    howToMeasure: 'Count operations, compare against optimal baselines',
  },
  {
    id: 'reliability',
    name: 'Reliability',
    icon: '🔄',
    color: '#3b82f6',
    description: 'Does it work consistently?',
    metrics: ['Success variance', 'Error rate', 'Recovery rate'],
    howToMeasure: 'Run same task N times, measure consistency',
  },
  {
    id: 'safety',
    name: 'Safety',
    icon: '🛡️',
    color: '#ef4444',
    description: 'Does it avoid harmful actions?',
    metrics: ['Guardrail violations', 'Scope creep', 'Data leakage'],
    howToMeasure: 'Red team testing, adversarial inputs, boundary probes',
  },
];

const evalMethods = [
  {
    name: 'Unit Evals',
    icon: '🧪',
    description: 'Test individual tools and components',
    example: 'Does search_docs return relevant results?',
  },
  {
    name: 'Trajectory Evals',
    icon: '📍',
    description: 'Evaluate the full action sequence',
    example: 'Did the agent take an efficient path?',
  },
  {
    name: 'End-to-End Evals',
    icon: '🏁',
    description: 'Judge final output quality',
    example: 'Is the generated report accurate?',
  },
  {
    name: 'LLM-as-Judge',
    icon: '⚖️',
    description: 'Use another LLM to score outputs',
    example: 'GPT-4 grades response quality 1-5',
  },
];

const bestPractices = [
  { icon: '📊', text: 'Create eval sets before building' },
  { icon: '🎲', text: 'Include edge cases & adversarial inputs' },
  { icon: '📈', text: 'Track metrics over time (regression detection)' },
  { icon: '🔁', text: 'Automate evals in CI/CD pipeline' },
];

export default function EvaluationSlide() {
  const [activeDimension, setActiveDimension] = useState<string>('task');
  const [activeMethod, setActiveMethod] = useState<string | null>(null);

  const currentDimension = evalDimensions.find(d => d.id === activeDimension);

  return (
    <div className="h-full flex flex-col items-center justify-start pt-8 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-5"
      >
        <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wide uppercase rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30">
          Measurement
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
          Agent Evaluation
        </h2>
        <p className="text-gray-400 text-sm">
          You can't improve what you can't measure
        </p>
      </motion.div>

      {/* Key insight banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-5 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/20 max-w-3xl"
      >
        <p className="text-gray-300 text-sm text-center">
          <span className="text-teal-400 font-semibold">Critical 201 concept:</span> Agents require evaluation at
          multiple levels — not just final output, but the entire trajectory.
        </p>
      </motion.div>

      {/* Main content */}
      <div className="w-full max-w-5xl grid grid-cols-2 gap-5">
        {/* Left: Evaluation Dimensions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>📐</span> Evaluation Dimensions
          </h3>

          {/* Dimension cards */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {evalDimensions.map((dim, index) => (
              <motion.button
                key={dim.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={() => setActiveDimension(dim.id)}
                className={`p-3 rounded-xl border-2 text-left transition-all duration-300 ${
                  activeDimension === dim.id
                    ? 'scale-[1.02]'
                    : 'border-gray-700/50 hover:border-gray-600'
                }`}
                style={{
                  backgroundColor: activeDimension === dim.id ? `${dim.color}12` : 'transparent',
                  borderColor: activeDimension === dim.id ? dim.color : undefined,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{dim.icon}</span>
                  <span
                    className="font-semibold text-sm"
                    style={{ color: activeDimension === dim.id ? dim.color : 'white' }}
                  >
                    {dim.name}
                  </span>
                </div>
                <p className="text-gray-500 text-xs">{dim.description}</p>
              </motion.button>
            ))}
          </div>

          {/* Active dimension detail */}
          <AnimatePresence mode="wait">
            {currentDimension && (
              <motion.div
                key={currentDimension.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: `${currentDimension.color}08`,
                  borderColor: `${currentDimension.color}30`,
                }}
              >
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Metrics</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {currentDimension.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="px-2 py-1 rounded-md text-xs font-medium"
                      style={{
                        backgroundColor: `${currentDimension.color}15`,
                        color: currentDimension.color,
                      }}
                    >
                      {metric}
                    </span>
                  ))}
                </div>
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-1">How to Measure</h4>
                <p className="text-gray-300 text-sm">{currentDimension.howToMeasure}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right: Evaluation Methods + Best Practices */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>🔬</span> Evaluation Methods
          </h3>

          {/* Method cards */}
          <div className="space-y-2 mb-4">
            {evalMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.08 }}
                onMouseEnter={() => setActiveMethod(method.name)}
                onMouseLeave={() => setActiveMethod(null)}
                className={`p-3 rounded-xl border transition-all duration-300 cursor-default ${
                  activeMethod === method.name
                    ? 'bg-purple-500/10 border-purple-500/40'
                    : 'bg-gray-800/30 border-gray-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{method.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm">{method.name}</h4>
                    <p className="text-gray-500 text-xs">{method.description}</p>
                  </div>
                </div>
                <AnimatePresence>
                  {activeMethod === method.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 pl-9"
                    >
                      <span className="text-xs text-purple-400 italic">"{method.example}"</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Best Practices */}
          <div className="rounded-xl p-4 bg-gray-800/30 border border-gray-700/50">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              ✨ Best Practices
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {bestPractices.map((practice, i) => (
                <motion.div
                  key={practice.text}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-center gap-2 text-xs"
                >
                  <span>{practice.icon}</span>
                  <span className="text-gray-300">{practice.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Visual: Eval pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-5 flex items-center gap-3"
      >
        {['Define Evals', 'Build Agent', 'Run Tests', 'Analyze', 'Iterate'].map((step, i) => (
          <div key={step} className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                backgroundColor: i === 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(107, 114, 128, 0.15)',
                color: i === 0 ? '#10b981' : '#9ca3af',
                border: `1px solid ${i === 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(107, 114, 128, 0.2)'}`,
              }}
            >
              {step}
            </motion.div>
            {i < 4 && (
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="text-gray-600"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

