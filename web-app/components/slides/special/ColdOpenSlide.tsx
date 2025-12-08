'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';

export default function ColdOpenSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4 p-6 overflow-hidden">
      <LineReveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center flex-shrink-0">
          The Story So Far
        </h2>
      </LineReveal>

      <div className="space-y-4 max-w-4xl flex-1 flex flex-col justify-center min-h-0 overflow-y-auto">
        <LineReveal delay={0.3}>
          <p className="text-xl md:text-2xl text-gray-200 text-center leading-relaxed">
            <strong className="font-semibold text-white">Ten years ago</strong>, machines learned to see.
          </p>
        </LineReveal>

        <LineReveal delay={0.5}>
          <p className="text-xl md:text-2xl text-gray-200 text-center leading-relaxed">
            <strong className="font-semibold text-white">Five years ago</strong>, they learned to speak.
          </p>
        </LineReveal>

        <LineReveal delay={0.7}>
          <p className="text-xl md:text-2xl text-gray-200 text-center leading-relaxed">
            <strong className="font-semibold text-white">In the past two years</strong> — they learned to <em className="text-blue-400">reason in language</em>.
          </p>
        </LineReveal>

        <LineReveal delay={0.9}>
          <p className="text-lg md:text-xl text-gray-300 text-center mt-4 leading-relaxed">
            We used them to finish our sentences, refactor our code, and summarize the internet.
          </p>
        </LineReveal>

        <LineReveal delay={1.1}>
          <p className="text-lg md:text-xl text-gray-200 font-semibold text-center mt-4 leading-relaxed">
            But so far, they've only ever <em className="text-yellow-400">reacted</em>.
          </p>
        </LineReveal>

        <LineReveal delay={1.3}>
          <p className="text-lg md:text-xl text-gray-300 text-center leading-relaxed">
            They wait for a prompt — and then respond.
          </p>
        </LineReveal>

        <div className="mt-6 pt-4 border-t border-gray-700 space-y-4">
          <LineReveal delay={1.5}>
            <p className="text-xl md:text-2xl text-white font-bold text-center leading-relaxed">
              What happens when a model doesn't just <em className="text-blue-400">answer</em>, but <em className="text-green-400">acts</em>?
            </p>
          </LineReveal>

          <LineReveal delay={1.7}>
            <p className="text-xl md:text-2xl text-white font-bold text-center leading-relaxed">
              When software stops being a tool and starts behaving like a teammate?
            </p>
          </LineReveal>
        </div>
      </div>
    </div>
  );
}

