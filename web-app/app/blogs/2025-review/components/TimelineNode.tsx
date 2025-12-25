'use client';

import { motion } from 'framer-motion';
import { Quarter } from '../types';

interface TimelineNodeProps {
  quarter: Quarter;
  index: number;
  isRevealed: boolean;
  isActive: boolean;
  onHover: (id: string | null) => void;
  animationDelay: number;
}

export function TimelineNode({ 
  quarter, 
  index, 
  isRevealed,
  isActive,
  onHover,
  animationDelay 
}: TimelineNodeProps) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: animationDelay, duration: 0.4 }}
      className="relative flex items-center w-full"
      onMouseEnter={() => onHover(quarter.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Left side content */}
      <div className={`w-[47%] ${isLeft ? 'pr-4 md:pr-6' : ''}`}>
        {isLeft && isRevealed && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <QuarterCard 
              quarter={quarter} 
              isActive={isActive} 
              align="right" 
            />
          </motion.div>
        )}
      </div>

      {/* Center node */}
      <div className="w-[6%] flex justify-center relative z-10">
        <motion.div
          animate={{
            scale: isActive ? 1.15 : 1,
            boxShadow: isActive
              ? `0 0 35px ${quarter.color}`
              : `0 0 0px ${quarter.color}`,
          }}
          whileHover={{ scale: 1.1 }}
          className={`w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br ${quarter.gradient} flex items-center justify-center cursor-pointer border-3 border-[#08080c] transition-all`}
        >
          <span className="text-[10px] md:text-xs font-black text-white">{quarter.id}</span>
        </motion.div>
      </div>

      {/* Right side content */}
      <div className={`w-[47%] ${!isLeft ? 'pl-4 md:pl-6' : ''}`}>
        {!isLeft && isRevealed && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <QuarterCard 
              quarter={quarter} 
              isActive={isActive} 
              align="left" 
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Quarter card sub-component - compact & centered
function QuarterCard({ 
  quarter, 
  isActive, 
}: { 
  quarter: Quarter; 
  isActive: boolean; 
  align: 'left' | 'right';
}) {
  return (
    <motion.div
      animate={{ scale: isActive ? 1.01 : 1 }}
      transition={{ duration: 0.2 }}
      className={`p-3 rounded-xl border transition-all text-center ${
        isActive
          ? 'bg-white/5 border-white/20 shadow-lg'
          : 'bg-white/[0.02] border-white/10'
      }`}
    >
      {/* Header row - centered */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <span
          className="text-[10px] font-black px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${quarter.color}20`, color: quarter.color }}
        >
          {quarter.id}
        </span>
        <span className="text-sm font-bold text-white">{quarter.summary}</span>
        <span className="text-gray-500 text-[10px]">{quarter.period}</span>
      </div>

      {/* Highlights - centered pills with initials */}
      <div className="flex gap-1.5 flex-wrap justify-center">
        {quarter.highlights.map((h) => (
          <div
            key={h.title}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px]"
            style={{ backgroundColor: `${quarter.color}10` }}
          >
            <span>{h.icon}</span>
            <span className="text-gray-400">{h.title}</span>
            {h.by && (
              <span className="text-gray-600 text-[8px] ml-0.5">
                ({h.by})
              </span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

