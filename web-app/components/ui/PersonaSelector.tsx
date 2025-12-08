'use client';

import { motion } from 'framer-motion';
import { Persona } from '@/lib/types';

interface PersonaSelectorProps {
  selectedPersona: Persona;
  onSelect: (persona: Persona) => void;
}

const personas: { id: Persona; label: string; description: string }[] = [
  {
    id: 'sysadmin',
    label: 'System Administrator',
    description: 'Managing servers, logs, and infrastructure',
  },
  {
    id: 'devops',
    label: 'DevOps Engineer',
    description: 'CI/CD, containers, and deployments',
  },
  {
    id: 'developer',
    label: 'Software Developer',
    description: 'Code, debugging, and architecture',
  },
  {
    id: 'platform',
    label: 'Platform Engineer',
    description: 'Infrastructure, automation, and platforms',
  },
  {
    id: 'all',
    label: 'All Personas',
    description: 'See content for all roles',
  },
];

export default function PersonaSelector({ selectedPersona, onSelect }: PersonaSelectorProps) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 p-4">
        <div className="text-xs text-gray-400 mb-2">View as:</div>
        <div className="flex flex-col gap-2">
          {personas.map((persona) => (
            <motion.button
              key={persona.id}
              onClick={() => onSelect(persona.id)}
              className={`px-3 py-2 rounded text-sm text-left transition-colors ${
                selectedPersona === persona.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="font-semibold">{persona.label}</div>
              <div className="text-xs opacity-75">{persona.description}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

