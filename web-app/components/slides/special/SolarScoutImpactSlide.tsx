'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import LineReveal from '../../animations/LineReveal';

const metrics = [
  {
    before: '2-4 hrs',
    after: '15 min',
    label: 'Incident Resolution',
    icon: '🚨',
    improvement: '90%',
    color: '#ef4444',
  },
  {
    before: '3 weeks',
    after: '3 days',
    label: 'New Hire Onboarding',
    icon: '👋',
    improvement: '85%',
    color: '#f59e0b',
  },
  {
    before: '4-8 hrs',
    after: '30 min',
    label: 'Security Investigation',
    icon: '🔒',
    improvement: '90%',
    color: '#10b981',
  },
  {
    before: 'Manual',
    after: 'Automated',
    label: 'Release Monitoring',
    icon: '🚀',
    improvement: '95%',
    color: '#3b82f6',
  },
];

const qualitativeGains = [
  { icon: '🧠', text: 'Institutional knowledge preserved & accessible', color: '#8b5cf6' },
  { icon: '🤝', text: 'Cross-team collaboration without friction', color: '#3b82f6' },
  { icon: '⚡', text: 'Proactive instead of reactive', color: '#f59e0b' },
  { icon: '😊', text: 'Reduced burnout, higher job satisfaction', color: '#10b981' },
];

export default function SolarScoutImpactSlide() {
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <LineReveal delay={0.1}>
        <div className="text-center mb-6 flex-shrink-0">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            The Impact
          </h2>
          <p className="text-gray-400">
            What changes when AI augments your team
          </p>
        </div>
      </LineReveal>

      {/* Metrics Grid */}
      <div className="w-full max-w-5xl mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="relative bg-gray-800/60 rounded-xl p-4 border border-gray-700/50 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onHoverStart={() => setHoveredMetric(index)}
              onHoverEnd={() => setHoveredMetric(null)}
              style={{
                boxShadow: hoveredMetric === index ? `0 0 30px ${metric.color}30` : 'none',
                borderColor: hoveredMetric === index ? metric.color : 'rgba(75, 85, 99, 0.5)',
              }}
            >
              {/* Background gradient on hover */}
              <motion.div
                className="absolute inset-0 opacity-0"
                animate={{ opacity: hoveredMetric === index ? 0.1 : 0 }}
                style={{ background: `linear-gradient(135deg, ${metric.color}40 0%, transparent 100%)` }}
              />
              
              <div className="relative z-10">
                <div className="text-2xl mb-2">{metric.icon}</div>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">{metric.label}</p>
                
                {/* Before / After */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Before</p>
                    <p className="text-red-400 font-semibold line-through opacity-70">{metric.before}</p>
                  </div>
                  <div className="text-gray-600">→</div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">After</p>
                    <p className="text-green-400 font-bold">{metric.after}</p>
                  </div>
                </div>

                {/* Improvement badge */}
                <motion.div
                  className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold"
                  style={{ 
                    backgroundColor: `${metric.color}20`,
                    color: metric.color,
                  }}
                  animate={{
                    scale: hoveredMetric === index ? 1.1 : 1,
                  }}
                >
                  ↓{metric.improvement}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Qualitative Gains */}
      <motion.div
        className="w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-gray-500 text-sm uppercase tracking-wider mb-4 text-center">Beyond the numbers</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {qualitativeGains.map((gain, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 px-4 py-3 bg-gray-800/40 rounded-lg border border-gray-700/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ 
                borderColor: gain.color,
                boxShadow: `0 0 15px ${gain.color}20`,
              }}
            >
              <span className="text-xl flex-shrink-0">{gain.icon}</span>
              <span className="text-gray-300 text-sm">{gain.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Message */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <p className="text-xl md:text-2xl font-medium">
          <span className="text-gray-400">You stay in control.</span>{' '}
          <span className="text-blue-400">AI handles the heavy lifting.</span>
        </p>
      </motion.div>
    </div>
  );
}
