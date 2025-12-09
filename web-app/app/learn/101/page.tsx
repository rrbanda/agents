'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SiteNav from '@/components/ui/SiteNav';

const slideTopics = [
  {
    id: 'ai-foundations',
    title: 'AI Foundations',
    description: 'What is AI? How did we get here? Start your journey with the fundamentals of generative AI and agents.',
    icon: '🧠',
    level: '101',
    slideCount: 29,
    duration: '~40 min',
    href: '/presentation',
    gradient: 'from-blue-500 to-cyan-500',
    available: true,
    featured: true,
  },
  {
    id: 'agent-patterns',
    title: 'Agent Patterns & Tools',
    description: 'How to design agents? What tools do they need? Best practices for building effective agent systems.',
    icon: '⚙️',
    level: '201',
    slideCount: 40,
    duration: '~60 min',
    href: '#',
    gradient: 'from-purple-500 to-pink-500',
    available: false,
  },
  {
    id: 'production-systems',
    title: 'Production AI Systems',
    description: 'Multi-agent orchestration, long-running agents, and production reliability patterns.',
    icon: '🚀',
    level: '301',
    slideCount: 30,
    duration: '~45 min',
    href: '#',
    gradient: 'from-orange-500 to-red-500',
    available: false,
  },
];

const levelColors: Record<string, string> = {
  '101': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  '201': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  '301': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

export default function SlidesCatalogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
            top: '10%',
            right: '-10%',
          }}
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
            bottom: '10%',
            left: '-5%',
          }}
          animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Navigation */}
      <SiteNav />

      {/* Main Content */}
      <main className="relative z-10 px-6 md:px-12 pb-20 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Interactive Slides
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Visual learning experiences · Pick a topic and dive in
          </p>
        </motion.div>

        {/* Topics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {slideTopics.map((topic, index) => (
            <Link 
              key={topic.id} 
              href={topic.available ? topic.href : '#'}
              className={!topic.available ? 'pointer-events-none' : ''}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                whileHover={topic.available ? { scale: 1.02, y: -4 } : {}}
                whileTap={topic.available ? { scale: 0.98 } : {}}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer h-full ${
                  !topic.available && 'opacity-50'
                }`}
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-white/[0.02]" />
                <div className={`absolute inset-0 rounded-2xl border ${
                  topic.available 
                    ? 'border-white/[0.08] group-hover:border-white/[0.15]' 
                    : 'border-white/[0.05]'
                } transition-colors`} />
                
                {/* Top Gradient Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${topic.gradient}`} />
                
                {/* Hover Glow */}
                {topic.available && (
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)`,
                    }}
                  />
                )}

                {/* Content */}
                <div className="relative p-6">
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center text-3xl`}>
                      {topic.icon}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${levelColors[topic.level]}`}>
                        {topic.level}
                      </span>
                      {topic.featured && topic.available && (
                        <span className="px-2 py-0.5 rounded-md bg-green-500/20 text-green-400 text-xs font-medium">
                          Start Here
                        </span>
                      )}
                      {!topic.available && (
                        <span className="px-2 py-0.5 rounded-md bg-gray-800 text-gray-500 text-xs">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-2 transition-colors ${
                    topic.available 
                      ? 'text-white group-hover:text-blue-300' 
                      : 'text-gray-400'
                  }`}>
                    {topic.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    {topic.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <span>📑</span> {topic.slideCount} slides
                      </span>
                      <span className="flex items-center gap-1">
                        <span>⏱️</span> {topic.duration}
                      </span>
                    </div>
                    {topic.available && (
                      <motion.span 
                        className="text-gray-500 group-hover:text-white transition-colors text-lg"
                      >
                        →
                      </motion.span>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-600 text-sm mt-12"
        >
          Use arrow keys to navigate within presentations
        </motion.p>
      </main>
    </div>
  );
}
