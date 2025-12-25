'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Person } from '../types';

interface PeopleProps {
  people: Person[];
}

export function People({ people }: PeopleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex items-center justify-center gap-6 mb-4"
    >
      {people.map((person, i) => (
        <motion.div
          key={person.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.1 }}
          className="flex items-center gap-2"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
            <Image
              src={person.image}
              alt={person.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm text-gray-400 font-medium">{person.name}</span>
        </motion.div>
      ))}
      
      {/* Subtle connector between people */}
      {people.length === 2 && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.6 }}
          className="absolute text-gray-600 text-xs"
          style={{ marginLeft: '-1.5rem', marginRight: '-1.5rem' }}
        >
        </motion.span>
      )}
    </motion.div>
  );
}

