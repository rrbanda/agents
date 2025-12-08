'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface LineRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function LineReveal({ 
  children, 
  delay = 0,
  className = '' 
}: LineRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay, 
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

