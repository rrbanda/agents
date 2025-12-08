'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';

export default function LanguageModelsSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Era Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <span className="text-xs font-mono text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
          STAGE 1 • Since 2018
        </span>
      </motion.div>

      {/* Title */}
      <LineReveal delay={0.1}>
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">💬</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Large Language Models
          </h2>
          <p className="text-gray-400 italic">
            Massive AI systems that could write like humans
          </p>
          <p className="text-gray-500 text-sm mt-1">
            (LLMs — trained on billions of parameters)
          </p>
        </div>
      </LineReveal>

      {/* Main Content */}
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6 mb-6">
        {/* What They Could Do */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-green-500/10 rounded-xl p-5 border border-green-500/30"
        >
          <h3 className="text-green-400 font-bold mb-3 flex items-center gap-2">
            <span>✓</span> What They Could Do
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Complete your sentences (like autocomplete, but smarter)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Generate text that sounds human-written</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Translate between languages</span>
            </li>
          </ul>
        </motion.div>

        {/* What They Couldn't Do */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-red-500/10 rounded-xl p-5 border border-red-500/30"
        >
          <h3 className="text-red-400 font-bold mb-3 flex items-center gap-2">
            <span>✗</span> What They Couldn't Do
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Remember what you said earlier</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Actually understand what they wrote</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Do anything useful beyond generating text</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Real Example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-4xl bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 mb-6"
      >
        <h4 className="text-gray-400 text-xs uppercase tracking-wide mb-3">Example: How it worked</h4>
        <div className="flex items-center gap-4">
          <div className="bg-gray-900 rounded-lg px-4 py-2 text-gray-300">
            You type: <span className="text-white font-mono">"The weather today is"</span>
          </div>
          <div className="text-gray-500">→</div>
          <div className="bg-gray-900 rounded-lg px-4 py-2 text-gray-300">
            AI adds: <span className="text-blue-400 font-mono">"sunny and warm."</span>
          </div>
        </div>
        <p className="text-gray-500 text-xs mt-3">
          It doesn't know the actual weather—it just predicts what word typically comes next.
        </p>
      </motion.div>

      {/* Key Takeaway */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <p className="text-lg text-gray-300">
          Bottom line: <span className="text-white font-semibold">Great at writing, but couldn't think or remember.</span>
        </p>
      </motion.div>
    </div>
  );
}
