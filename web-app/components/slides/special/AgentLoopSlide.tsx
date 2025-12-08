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
      <LineReveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center flex-shrink-0">
          The Fundamental Pattern
        </h2>
      </LineReveal>

      <div className="w-full max-w-5xl flex-1 flex items-center justify-center min-h-0">
        <AgentLoop selectedPersona={persona} />
      </div>
    </div>
  );
}
