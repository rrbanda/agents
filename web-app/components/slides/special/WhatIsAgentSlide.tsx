'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';
import SectionHeader from '../SectionHeader';

export default function WhatIsAgentSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4 p-6 overflow-hidden">
      <div className="w-full max-w-5xl mb-4 flex-shrink-0">
        <SectionHeader section="What Agents Are" subtitle="Understanding the breakthrough" />
      </div>
      
      <LineReveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center flex-shrink-0">
          The Definition
        </h2>
      </LineReveal>

      <div className="max-w-5xl space-y-4 flex-1 flex flex-col justify-center min-h-0 overflow-y-auto">
        <LineReveal delay={0.2}>
          <p className="text-lg md:text-xl text-gray-200 font-semibold text-center mb-4 leading-relaxed">
            An AI agent is a system that can:
          </p>
        </LineReveal>

        <div className="space-y-2">
          <LineReveal delay={0.4}>
            <p className="text-lg md:text-xl text-gray-200 text-center leading-relaxed">
              Understand natural-language objectives.
            </p>
          </LineReveal>

          <LineReveal delay={0.5}>
            <p className="text-lg md:text-xl text-gray-200 text-center leading-relaxed">
              Plan multi-step actions toward a goal.
            </p>
          </LineReveal>

          <LineReveal delay={0.6}>
            <p className="text-lg md:text-xl text-gray-200 text-center leading-relaxed">
              Interact with external tools and data.
            </p>
          </LineReveal>

          <LineReveal delay={0.7}>
            <p className="text-lg md:text-xl text-gray-200 text-center leading-relaxed">
              Monitor progress and self-evaluate.
            </p>
          </LineReveal>

          <LineReveal delay={0.8}>
            <p className="text-lg md:text-xl text-gray-200 text-center leading-relaxed">
              Adapt to feedback and changing conditions.
            </p>
          </LineReveal>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700 space-y-3 flex-shrink-0">
          <LineReveal delay={1.0}>
            <p className="text-lg md:text-xl text-gray-300 font-semibold text-center leading-relaxed">
              In Simple Terms:
            </p>
          </LineReveal>

          <LineReveal delay={1.2}>
            <p className="text-lg md:text-xl text-gray-200 text-center leading-relaxed">
              An LLM that can remember, use tools, and work toward goals.
            </p>
          </LineReveal>

          <LineReveal delay={1.4}>
            <p className="text-lg md:text-xl text-blue-400 font-semibold text-center mt-2 leading-relaxed">
              Not just a chatbot. Not just automation. Something new.
            </p>
          </LineReveal>
        </div>
      </div>
    </div>
  );
}

