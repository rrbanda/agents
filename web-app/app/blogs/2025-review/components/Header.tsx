'use client';

import { motion } from 'framer-motion';
import { PageConfig } from '../types';

interface HeaderProps {
  config: PageConfig;
}

export function Header({ config }: HeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-4"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="text-xl md:text-2xl block"
      >
        {config.headerIcon}
      </motion.span>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-black">
        <span className="bg-gradient-to-r from-rose-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          {config.year}
        </span>
        {' '}{config.title}
      </h1>
      <p className="text-gray-500 text-[10px] md:text-xs">{config.tagline}</p>
    </motion.div>
  );
}

