'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';
import AgentAnatomy from '../../diagrams/AgentAnatomy';

export default function AnatomySlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center overflow-hidden p-3">
      <div className="w-full max-w-5xl h-full flex flex-col items-center justify-center">
        {/* Section Header - Only "The 7 Components" */}
        <div className="mb-2 flex-shrink-0">
          <LineReveal delay={0.1}>
            <h2 className="text-xl md:text-2xl font-bold text-white text-center">
              The 7 Components
            </h2>
          </LineReveal>
        </div>

        {/* Diagram - Takes most of the space */}
        <div className="flex-1 flex items-center justify-center w-full min-h-0 overflow-hidden">
          <AgentAnatomy />
        </div>

        {/* Living Loop - Compact at bottom */}
        <div className="mt-2 flex-shrink-0 text-center">
          <LineReveal delay={0.3}>
            <p className="text-xs md:text-sm text-gray-300">
              <strong className="text-white font-semibold">The Living Loop:</strong>{' '}
              <span className="text-green-400">Perceive → Reason → Act → Reflect → Learn</span>
            </p>
          </LineReveal>
        </div>
      </div>
    </div>
  );
}
