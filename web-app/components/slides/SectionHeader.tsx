'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  section: string;
  subtitle: string;
}

export default function SectionHeader({ section, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 pb-3 border-b border-gray-700/50"
    >
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
        {section}
      </div>
      <div className="text-lg md:text-xl text-gray-300 font-light">
        {subtitle}
      </div>
    </motion.div>
  );
}

