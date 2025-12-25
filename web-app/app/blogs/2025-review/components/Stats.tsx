'use client';

import { motion } from 'framer-motion';
import { Stat } from '../types';

interface StatsProps {
  stats: Stat[];
  animationDelay?: number;
}

export function Stats({ stats, animationDelay = 1.5 }: StatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay }}
      className="flex flex-wrap justify-center gap-3 md:gap-6 mt-4"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: animationDelay + i * 0.08 }}
          className="text-center px-3 py-2 rounded-lg bg-white/5 border border-white/10"
        >
          <div className="flex items-center gap-1 justify-center">
            <span className="text-sm md:text-base">{stat.icon}</span>
            <span className="text-lg md:text-xl font-black bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
              {stat.value}
            </span>
          </div>
          <div className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-wider">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

