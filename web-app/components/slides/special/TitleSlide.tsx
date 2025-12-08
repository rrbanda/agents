'use client';

import { motion } from 'framer-motion';
import LineReveal from '../../animations/LineReveal';

export default function TitleSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Agentic AI
        </h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-4xl md:text-5xl font-light text-gray-300 mb-8">
          From Automation to Autonomy
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="space-y-4"
      >
        <p className="text-xl md:text-2xl text-gray-300 font-light">
          When AI stops reacting and starts acting
        </p>
      </motion.div>
    </div>
  );
}

