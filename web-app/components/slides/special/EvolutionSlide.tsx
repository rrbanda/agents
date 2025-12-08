'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';

const stages = [
  {
    id: 'llms',
    period: 'Since 2018',
    title: 'LLMs',
    tagline: 'Large Language Models',
    color: '#6b7280',
    icon: '💬',
    could: 'Generate human-like text',
    couldnt: 'Remember or understand',
  },
  {
    id: 'assistants',
    period: 'Since 2020',
    title: 'Assistants',
    tagline: 'Machines that remember',
    color: '#3b82f6',
    icon: '🤖',
    could: 'Have conversations, help with tasks',
    couldnt: 'Take initiative',
  },
  {
    id: 'reasoning',
    period: 'Since 2022',
    title: 'Reasoning',
    tagline: 'Machines that think',
    color: '#10b981',
    icon: '🧠',
    could: 'Break down problems, self-correct',
    couldnt: 'Act on its own',
  },
  {
    id: 'agents',
    period: 'Since 2024',
    title: 'Agents',
    tagline: 'Machines that act',
    color: '#f59e0b',
    icon: '⚡',
    could: 'Work toward goals autonomously',
    couldnt: '(This is where we are!)',
  },
];

export default function EvolutionSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title */}
      <div className="text-center mb-6">
        <LineReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            The Complete Picture
          </h2>
          <p className="text-gray-400">
            How we got from chatbots to agents
          </p>
        </LineReveal>
      </div>

      {/* Timeline */}
      <div className="w-full max-w-6xl">
        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-800 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              background: 'linear-gradient(to right, #6b7280, #3b82f6, #10b981, #f59e0b)',
            }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </div>

        {/* Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.15 }}
              className="relative"
            >
              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-gray-800/50 rounded-xl p-4 border-2 h-full transition-all cursor-pointer"
                style={{ borderColor: stage.color }}
              >
                {/* Period */}
                <div 
                  className="text-xs font-mono mb-2 px-2 py-1 rounded inline-block"
                  style={{ backgroundColor: `${stage.color}20`, color: stage.color }}
                >
                  {stage.period}
                </div>

                {/* Icon + Title */}
                <div className="text-3xl mb-2">{stage.icon}</div>
                <h3 className="text-lg font-bold mb-1" style={{ color: stage.color }}>
                  {stage.title}
                </h3>
                <p className="text-sm text-gray-400 italic mb-3">{stage.tagline}</p>

                {/* Could / Couldn't */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">{stage.could}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className={stage.id === 'agents' ? 'text-yellow-400' : 'text-red-400'}>
                      {stage.id === 'agents' ? '★' : '✗'}
                    </span>
                    <span className="text-gray-400">{stage.couldnt}</span>
                  </div>
                </div>
              </motion.div>

              {/* Arrow to next */}
              {index < stages.length - 1 && (
                <motion.div
                  className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke={stage.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-8 text-center"
      >
        <div className="bg-gradient-to-r from-gray-800/50 via-blue-900/30 to-yellow-900/30 rounded-xl px-8 py-4 border border-gray-700/50 inline-block">
          <p className="text-lg text-gray-300">
            <span className="text-white font-semibold">The Journey:</span> From 
            <span className="text-gray-400"> answering questions </span>
            → <span className="text-yellow-400 font-semibold">achieving goals</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
