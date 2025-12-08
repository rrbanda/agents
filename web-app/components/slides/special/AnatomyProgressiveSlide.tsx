'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';
import AnatomyProgressive from '../../diagrams/AnatomyProgressive';

export default function AnatomyProgressiveSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center overflow-hidden p-4">
      <div className="w-full max-w-6xl h-full flex flex-col items-center justify-center">
        {/* Section Header */}
        <div className="mb-4 flex-shrink-0">
          <LineReveal delay={0.1}>
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-1">
              Anatomy of an Agent
            </h2>
            <p className="text-sm md:text-base text-gray-400 text-center">
              Beyond the language model
            </p>
          </LineReveal>
        </div>

        {/* Progressive Diagram */}
        <div className="flex-1 flex items-center justify-center w-full min-h-0 overflow-hidden">
          <AnatomyProgressive />
        </div>
      </div>
    </div>
  );
}
