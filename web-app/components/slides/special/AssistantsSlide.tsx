'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';
import SectionHeader from '../SectionHeader';

export default function AssistantsSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="w-full max-w-5xl mb-4 flex-shrink-0">
        <SectionHeader section="How We Got Here" subtitle="The evolution of AI" />
      </div>

      <div className="w-full max-w-5xl flex-1 flex flex-col justify-center min-h-0">
        {/* Stage Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800/50 rounded-lg p-6 border-2 border-blue-500 mb-4"
        >
          {/* Period */}
          <div className="text-xs text-gray-400 font-mono mb-3">2020-2022</div>

          {/* Icon */}
          <div className="text-5xl mb-3 text-center">🤖</div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2" style={{ color: '#3b82f6' }}>
            Assistants
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 italic mb-4 text-center">
            Machines that remember
          </p>

          {/* Characteristics */}
          <div className="space-y-2 mb-4">
            <LineReveal delay={0.2}>
              <div className="flex items-center gap-2 text-base md:text-lg text-gray-300">
                <span className="text-blue-400">•</span>
                <span>Reactive helpers</span>
              </div>
            </LineReveal>
            <LineReveal delay={0.3}>
              <div className="flex items-center gap-2 text-base md:text-lg text-gray-300">
                <span className="text-blue-400">•</span>
                <span>Multi-turn conversations</span>
              </div>
            </LineReveal>
            <LineReveal delay={0.4}>
              <div className="flex items-center gap-2 text-base md:text-lg text-gray-300">
                <span className="text-blue-400">•</span>
                <span>Context management</span>
              </div>
            </LineReveal>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-4 border-t border-gray-700"
          >
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              They draft emails, refactor code, summarize documents. They maintain context but remain <em className="text-yellow-400">reactive</em>.
            </p>
          </motion.div>
        </motion.div>

        {/* Key Insight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center flex-shrink-0"
        >
          <p className="text-lg md:text-xl text-gray-400 italic">
            The Truth: Always <em className="text-yellow-400">reactive</em>.
          </p>
          <p className="text-lg md:text-xl text-white font-semibold mt-1">
            Convenient, yes. Autonomous, no.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

