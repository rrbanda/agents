'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import LineReveal from '../../animations/LineReveal';

const levels = [
  {
    level: 1,
    name: 'Metadata',
    description: 'Name & Description',
    when: 'Always loaded',
    example: 'Tool names and brief summaries',
    tokens: '~100',
    color: '#60a5fa',
    width: '40%',
  },
  {
    level: 2,
    name: 'Content',
    description: 'Instructions',
    when: 'When relevant',
    example: 'Full tool documentation',
    tokens: '~1,000',
    color: '#3b82f6',
    width: '65%',
  },
  {
    level: 3,
    name: 'Deep Dive',
    description: 'Specific Files',
    when: 'When needed',
    example: 'Source code, configs',
    tokens: '~10,000+',
    color: '#1e40af',
    width: '90%',
  },
];

export default function ContextEngineeringSlide() {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <LineReveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Context Engineering
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Load only what's needed, when it's needed
        </p>
      </LineReveal>

      {/* Problem/Solution Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-4xl mb-6 grid grid-cols-2 gap-4"
      >
        <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">⚠️</span>
            <span className="text-red-400 font-bold">Problem</span>
          </div>
          <p className="text-gray-300 text-sm">
            Agents need context, but every token costs money and time.
          </p>
        </div>
        <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">✓</span>
            <span className="text-green-400 font-bold">Solution</span>
          </div>
          <p className="text-gray-300 text-sm">
            Progressive Disclosure — start small, expand only when needed.
          </p>
        </div>
      </motion.div>

      {/* Progressive Disclosure Pyramid */}
      <div className="w-full max-w-4xl mb-6">
        <div className="flex flex-col items-center gap-3">
          {levels.map((level, index) => (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.15, duration: 0.4 }}
              onHoverStart={() => setHoveredLevel(level.level)}
              onHoverEnd={() => setHoveredLevel(null)}
              className="rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
              style={{
                width: level.width,
                background: hoveredLevel === level.level 
                  ? `linear-gradient(135deg, ${level.color}30 0%, ${level.color}10 100%)`
                  : `${level.color}15`,
                border: `2px solid ${hoveredLevel === level.level ? level.color : `${level.color}40`}`,
                boxShadow: hoveredLevel === level.level 
                  ? `0 8px 30px ${level.color}30` 
                  : 'none',
                transform: hoveredLevel === level.level ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg"
                    style={{ 
                      backgroundColor: `${level.color}30`,
                      color: level.color,
                    }}
                  >
                    {level.level}
                  </div>
                  <div>
                    <h3 
                      className="font-bold text-base"
                      style={{ color: level.color }}
                    >
                      Level {level.level}: {level.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{level.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{level.when}</div>
                  <div 
                    className="text-sm font-mono"
                    style={{ color: level.color }}
                  >
                    {level.tokens} tokens
                  </div>
                </div>
              </div>
              
              {/* Expanded info on hover */}
              {hoveredLevel === level.level && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="px-4 pb-4"
                >
                  <div 
                    className="text-sm p-2 rounded-lg"
                    style={{ backgroundColor: `${level.color}10` }}
                  >
                    <span className="text-gray-400">Example: </span>
                    <span className="text-gray-300">{level.example}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Arrows between levels */}
        <div className="flex flex-col items-center mt-2 gap-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-gray-500 text-xs"
          >
            ↓ Load more only when needed ↓
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="w-full max-w-3xl bg-gray-800/50 rounded-xl p-5 border border-gray-700/50"
      >
        <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-green-400">97%</div>
            <div className="text-sm text-gray-400">Token Savings</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400">3→1</div>
            <div className="text-sm text-gray-400">Levels Loaded</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400">1000+</div>
            <div className="text-sm text-gray-400">Tools Supported</div>
          </div>
        </div>
      </motion.div>

      {/* Key Insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-blue-400 font-semibold text-lg mt-6 text-center"
      >
        This is context engineering — optimizing what the agent knows and when.
      </motion.p>
    </div>
  );
}

