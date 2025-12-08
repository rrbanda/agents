'use client';

import { motion } from 'framer-motion';

const steps = [
  { time: '7:00 AM', action: 'Agent wakes up' },
  { time: '7:05 AM', action: 'Researches industry news' },
  { time: '7:15 AM', action: 'Creates summaries for each team' },
  { time: '7:20 AM', action: 'Drafts tailored emails' },
  { time: '7:25 AM', action: 'Posts updates to Slack' },
  { time: '7:30 AM', action: 'Reports completion' },
];

export default function SolarScoutWorkflow() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-5xl px-8">
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">Solar Scout</h2>
          <p className="text-gray-400 italic">An agent that works while you sleep</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700"></div>

          {/* Steps */}
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative pl-16 pb-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.15 }}
            >
              {/* Timeline Dot */}
              <motion.div
                className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-900 z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.3 + index * 0.15,
                  type: 'spring',
                  stiffness: 200,
                }}
              />

              {/* Step Content */}
              <motion.div
                className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500"
                whileHover={{ scale: 1.02, borderColor: '#60a5fa' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-sm font-semibold text-blue-400 mb-1">
                  {step.time}
                </div>
                <div className="text-white">{step.action}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Comparison */}
        <motion.div
          className="mt-8 grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-red-500">
            <div className="text-sm font-semibold text-red-400 mb-2">Before</div>
            <div className="text-white">Hours of manual work</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-green-500">
            <div className="text-sm font-semibold text-green-400 mb-2">After</div>
            <div className="text-white">30 minutes, fully automated</div>
          </div>
        </motion.div>

        {/* Result Statement */}
        <motion.div
          className="mt-6 text-center text-lg text-yellow-400 font-semibold italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          Language turned into autonomous labor.
        </motion.div>
      </div>
    </div>
  );
}

