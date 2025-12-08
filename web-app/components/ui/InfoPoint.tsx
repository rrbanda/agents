'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface InfoPointProps {
  /** The main talking point or topic */
  title: string;
  /** Bullet points for the presenter */
  points: string[];
  /** Optional example to mention */
  example?: string;
  /** Optional time guidance (e.g., "~30 sec") */
  duration?: string;
  /** Position of the info icon */
  position?: 'inline' | 'top-right' | 'bottom-right';
  /** Size of the icon */
  size?: 'sm' | 'md';
  /** Color theme */
  color?: string;
}

export default function InfoPoint({
  title,
  points,
  example,
  duration,
  position = 'inline',
  size = 'sm',
  color = '#3b82f6',
}: InfoPointProps) {
  const [isOpen, setIsOpen] = useState(false);

  const iconSize = size === 'sm' ? 'w-5 h-5 text-xs' : 'w-6 h-6 text-sm';
  
  const positionClasses = {
    'inline': 'relative inline-flex',
    'top-right': 'absolute top-2 right-2',
    'bottom-right': 'absolute bottom-2 right-2',
  };

  return (
    <div className={positionClasses[position]}>
      {/* Info Icon Button */}
      <motion.button
        className={`${iconSize} rounded-full flex items-center justify-center cursor-pointer z-20`}
        style={{
          backgroundColor: isOpen ? color : `${color}30`,
          color: isOpen ? 'white' : color,
          border: `1px solid ${color}50`,
        }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Click for presenter notes"
      >
        <span className="font-bold">i</span>
      </motion.button>

      {/* Expandable Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Info Panel */}
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-40 bg-gray-900 rounded-xl border shadow-2xl overflow-hidden"
              style={{ borderColor: `${color}50` }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div 
                className="px-5 py-3 border-b border-gray-700/50 flex items-center justify-between"
                style={{ backgroundColor: `${color}15` }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎤</span>
                  <h3 className="font-bold text-white">{title}</h3>
                </div>
                {duration && (
                  <span 
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ backgroundColor: `${color}30`, color }}
                  >
                    {duration}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                {/* Talking Points */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Key Points</p>
                  <ul className="space-y-2">
                    {points.map((point, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-2 text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <span style={{ color }} className="mt-1">•</span>
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Example */}
                {example && (
                  <div className="bg-gray-800/50 rounded-lg p-3 border-l-2" style={{ borderColor: color }}>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Example to mention</p>
                    <p className="text-gray-200 italic">&ldquo;{example}&rdquo;</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 bg-gray-800/30 border-t border-gray-700/50 flex justify-end">
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{ backgroundColor: `${color}20`, color }}
                  onClick={() => setIsOpen(false)}
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

