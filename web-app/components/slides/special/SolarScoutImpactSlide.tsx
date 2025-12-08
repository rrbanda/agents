'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';

export default function SolarScoutImpactSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-12">
      <LineReveal delay={0.1}>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          The Transformation
        </h2>
      </LineReveal>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
        {/* Before */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 p-8 rounded-lg border-l-4 border-red-500"
        >
          <h3 className="text-3xl font-bold text-red-400 mb-6">Before</h3>
          <div className="space-y-4 text-gray-300">
            <p className="text-xl md:text-2xl leading-relaxed">Hours of manual research.</p>
            <p className="text-xl md:text-2xl leading-relaxed">Inconsistent updates.</p>
            <p className="text-xl md:text-2xl leading-relaxed">Delayed information.</p>
          </div>
        </motion.div>

        {/* After */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/50 p-8 rounded-lg border-l-4 border-green-500"
        >
          <h3 className="text-3xl font-bold text-green-400 mb-6">After</h3>
          <div className="space-y-4 text-gray-300">
            <p className="text-xl md:text-2xl leading-relaxed">Consistent, daily updates.</p>
            <p className="text-xl md:text-2xl leading-relaxed">Tailored to each team.</p>
            <p className="text-xl md:text-2xl leading-relaxed">Always on time.</p>
            <p className="text-xl md:text-2xl leading-relaxed">Frees humans for strategic work.</p>
          </div>
        </motion.div>
      </div>

      <div className="max-w-4xl text-center space-y-4 mt-8">
        <LineReveal delay={0.8}>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            <strong className="text-white">What Changed:</strong> From reactive to proactive.
          </p>
        </LineReveal>

        <LineReveal delay={1.0}>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            <strong className="text-white">What Stayed:</strong> The quality, the insight, the value.
          </p>
        </LineReveal>

        <LineReveal delay={1.2}>
          <p className="text-xl md:text-2xl text-blue-400 font-semibold leading-relaxed">
            <strong>What Freed:</strong> Human time for what matters most.
          </p>
        </LineReveal>
      </div>
    </div>
  );
}

