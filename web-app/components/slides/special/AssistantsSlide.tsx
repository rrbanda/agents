'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';

export default function AssistantsSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Era Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <span className="text-xs font-mono text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
          STAGE 2 • Since 2022
        </span>
      </motion.div>

      {/* Title */}
      <LineReveal delay={0.1}>
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🤖</div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
            AI Assistants
          </h2>
          <p className="text-gray-400 italic">
            Now they could remember your conversation
          </p>
        </div>
      </LineReveal>

      {/* Main Content */}
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6 mb-6">
        {/* What Changed */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-500/10 rounded-xl p-5 border border-blue-500/30"
        >
          <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
            <span>🆕</span> What Changed
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span><strong>Context:</strong> They remembered your conversation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span><strong>Tasks:</strong> Write emails, summarize docs, answer questions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span><strong>Useful:</strong> Actually helpful for real work</span>
            </li>
          </ul>
        </motion.div>

        {/* Examples */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50"
        >
          <h3 className="text-gray-300 font-bold mb-3 flex items-center gap-2">
            <span>💡</span> You've Used These
          </h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-gray-500 mt-1">•</span>
              <span>ChatGPT, Claude, Gemini</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-500 mt-1">•</span>
              <span>GitHub Copilot for code</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-500 mt-1">•</span>
              <span>Notion AI, Jasper for writing</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Conversation Example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-4xl bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 mb-6"
      >
        <h4 className="text-gray-400 text-xs uppercase tracking-wide mb-3">Example: A real conversation</h4>
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-blue-400 text-sm font-bold w-12">You:</span>
            <span className="text-gray-300 text-sm">"Help me write an email to my boss about the project delay."</span>
          </div>
          <div className="flex gap-3">
            <span className="text-green-400 text-sm font-bold w-12">AI:</span>
            <span className="text-gray-300 text-sm">"Here's a draft... [writes email]"</span>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-400 text-sm font-bold w-12">You:</span>
            <span className="text-gray-300 text-sm">"Make it more apologetic."</span>
          </div>
          <div className="flex gap-3">
            <span className="text-green-400 text-sm font-bold w-12">AI:</span>
            <span className="text-gray-300 text-sm">"Sure, here's a revised version..." <span className="text-gray-500">(Remembers the context!)</span></span>
          </div>
        </div>
      </motion.div>

      {/* The Limitation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-4xl"
      >
        <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
          <p className="text-amber-400 text-center">
            <span className="font-bold">⚠️ But still:</span> They only respond when you ask. They wait for your prompts.
            <br />
            <span className="text-gray-400 text-sm">Helpful? Yes. Independent? No.</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
