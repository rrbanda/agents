'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';
import AgentLoop from '../../diagrams/AgentLoop';
import { Persona } from '@/lib/types';

interface AgentLoopSlideProps {
  persona: Persona;
}

export default function AgentLoopSlide({ persona }: AgentLoopSlideProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title Section */}
      <div className="flex-shrink-0 text-center mb-4">
        <LineReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            How Agents Work
          </h2>
          <p className="text-gray-400">
            The universal pattern behind every AI agent
          </p>
        </LineReveal>
      </div>

      {/* Intro Text */}
      <motion.div
        className="max-w-3xl text-center mb-6 flex-shrink-0"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-gray-300 text-lg">
          Unlike chatbots that wait for input, agents{' '}
          <span className="text-blue-400 font-semibold">actively work</span> through problems
          using a simple but powerful loop:
        </p>
      </motion.div>

      {/* Agent Loop Diagram */}
      <div className="w-full max-w-5xl flex-1 flex items-center justify-center min-h-0">
        <AgentLoop selectedPersona={persona} />
      </div>

      {/* Key Insight */}
      <motion.div
        className="mt-4 flex-shrink-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800/60 rounded-xl border border-gray-700/50">
          <span className="text-2xl">💡</span>
          <p className="text-gray-300">
            <span className="font-semibold text-white">Key insight:</span>{' '}
            Agents don&apos;t just answer — they{' '}
            <span className="text-green-400 font-semibold">verify</span> their own work
          </p>
        </div>
      </motion.div>
    </div>
  );
}
