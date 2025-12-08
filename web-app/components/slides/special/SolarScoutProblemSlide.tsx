'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';

export default function SolarScoutProblemSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8">
      <LineReveal delay={0.1}>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          The Challenge
        </h2>
      </LineReveal>

      <div className="max-w-4xl space-y-6 text-center">
        <LineReveal delay={0.3}>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
            A renewable-energy firm.
          </p>
        </LineReveal>

        <LineReveal delay={0.5}>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Every morning, the same routine.
          </p>
        </LineReveal>

        <div className="space-y-4 mt-8">
          <LineReveal delay={0.7}>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Hours spent reading industry news.
            </p>
          </LineReveal>

          <LineReveal delay={0.8}>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Summarizing for different teams.
            </p>
          </LineReveal>

          <LineReveal delay={0.9}>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Drafting updates.
            </p>
          </LineReveal>

          <LineReveal delay={1.0}>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Posting to Slack.
            </p>
          </LineReveal>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <LineReveal delay={1.2}>
            <p className="text-xl md:text-2xl text-gray-400 mb-4 leading-relaxed">
              The Cost: Valuable time lost to routine information gathering.
            </p>
          </LineReveal>

          <LineReveal delay={1.4}>
            <p className="text-xl md:text-2xl text-blue-400 font-semibold leading-relaxed">
              The Question: What if this could happen automatically?
            </p>
          </LineReveal>
        </div>
      </div>
    </div>
  );
}

