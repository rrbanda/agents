'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export interface SlideNotes {
  /** Slide number */
  slideNumber: number;
  /** Main objective of this slide */
  objective: string;
  /** Suggested duration */
  duration: string;
  /** Key talking points */
  talkingPoints: string[];
  /** Things to emphasize */
  emphasize?: string[];
  /** Transition to next slide */
  transition?: string;
  /** Optional examples or stories */
  examples?: string[];
  /** Questions to ask audience */
  questions?: string[];
}

interface PresenterPanelProps {
  notes: SlideNotes;
  isPresenterMode?: boolean;
}

export default function PresenterPanel({ notes, isPresenterMode = false }: PresenterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  // In presenter mode, always show a compact version
  if (isPresenterMode) {
    return (
      <div className="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-700 shadow-2xl p-4 z-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎤</span>
            <span className="text-white font-semibold">Slide {notes.slideNumber}</span>
          </div>
          <span className="text-blue-400 text-sm font-medium">{notes.duration}</span>
        </div>
        <p className="text-gray-300 text-sm mb-3">{notes.objective}</p>
        <ul className="space-y-1">
          {notes.talkingPoints.slice(0, 3).map((point, i) => (
            <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
              <span className="text-blue-400">•</span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg flex items-center justify-center z-40"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        title="Presenter Notes"
      >
        <span className="text-2xl">🎤</span>
      </motion.button>

      {/* Full Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-gray-900 border-l border-gray-700 shadow-2xl z-50 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎤</span>
                  <div>
                    <h2 className="text-white font-bold text-lg">Presenter Notes</h2>
                    <p className="text-gray-400 text-sm">Slide {notes.slideNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                    {notes.duration}
                  </span>
                  <button
                    className="w-8 h-8 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors flex items-center justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Objective */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20">
                  <p className="text-xs uppercase tracking-wider text-blue-400 mb-2 font-medium">🎯 Objective</p>
                  <p className="text-white text-lg">{notes.objective}</p>
                </div>

                {/* Talking Points */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-medium">💬 Key Talking Points</p>
                  <ul className="space-y-3">
                    {notes.talkingPoints.map((point, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3 bg-gray-800/50 rounded-lg p-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-200">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Emphasize */}
                {notes.emphasize && notes.emphasize.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-medium">⭐ Emphasize</p>
                    <div className="space-y-2">
                      {notes.emphasize.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-yellow-300 bg-yellow-500/10 rounded-lg px-3 py-2 border border-yellow-500/20"
                        >
                          <span>⭐</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Examples */}
                {notes.examples && notes.examples.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-medium">📖 Examples to Share</p>
                    <div className="space-y-2">
                      {notes.examples.map((example, index) => (
                        <div
                          key={index}
                          className="bg-gray-800/50 rounded-lg p-3 border-l-2 border-green-500 text-gray-300 italic"
                        >
                          &ldquo;{example}&rdquo;
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Questions */}
                {notes.questions && notes.questions.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-medium">❓ Ask the Audience</p>
                    <div className="space-y-2">
                      {notes.questions.map((question, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-purple-300 bg-purple-500/10 rounded-lg px-3 py-2 border border-purple-500/20"
                        >
                          <span>❓</span>
                          <span>{question}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transition */}
                {notes.transition && (
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">➡️ Transition to Next</p>
                    <p className="text-gray-300">{notes.transition}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

