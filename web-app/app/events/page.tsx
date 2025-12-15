'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SiteNav from '@/components/ui/SiteNav';

const events = [
  {
    id: 'ai-agents-workshop',
    title: 'Building AI Agents Workshop',
    description: 'Hands-on workshop on building production-ready AI agents with MCP.',
    type: 'Workshop',
    date: 'TBA',
    location: 'Virtual',
    available: false,
  },
  {
    id: 'agentic-ai-summit',
    title: 'Agentic AI Summit 2025',
    description: 'Annual gathering of AI practitioners and researchers exploring agent systems.',
    type: 'Conference',
    date: 'TBA',
    location: 'TBA',
    available: false,
  },
  {
    id: 'office-hours',
    title: 'AI Office Hours',
    description: 'Monthly Q&A sessions on agentic AI, tool design, and production patterns.',
    type: 'Meetup',
    date: 'Monthly',
    location: 'Virtual',
    available: false,
  },
  {
    id: 'tech-talk',
    title: 'Enterprise AI Tech Talk',
    description: 'Deep dive into enterprise patterns for deploying AI agents at scale.',
    type: 'Talk',
    date: 'TBA',
    location: 'Virtual',
    available: false,
  },
];

const types = ['All', 'Workshop', 'Conference', 'Meetup', 'Talk'];

const typeColors: Record<string, string> = {
  'Workshop': 'bg-blue-500/20 text-blue-400',
  'Conference': 'bg-purple-500/20 text-purple-400',
  'Meetup': 'bg-green-500/20 text-green-400',
  'Talk': 'bg-orange-500/20 text-orange-400',
};

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState('All');

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      return selectedType === 'All' || event.type === selectedType;
    });
  }, [selectedType]);

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0f] overflow-hidden">
      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .events-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .events-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .events-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .events-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Navigation */}
      <SiteNav />

      {/* Main Layout */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 md:px-8 gap-6 pb-6 min-h-0">
        
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-64 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="p-5 flex-1 overflow-y-auto events-scroll">
              {/* Type Section */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Event Type
                </h3>
                <div className="space-y-1">
                  {types.map((type) => {
                    const isActive = selectedType === type;
                    const count = type === 'All' 
                      ? events.length 
                      : events.filter(e => e.type === type).length;
                    
                    return (
                      <motion.button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                          isActive
                            ? 'bg-white/10 text-white font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{type}</span>
                        <span className={`text-xs ${isActive ? 'text-teal-400' : 'text-gray-600'}`}>
                          {count}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="p-4 border-t border-white/5 bg-black/20">
              <div className="flex items-center gap-2 text-xs text-teal-400">
                <span>📅</span>
                <span>Events Coming Soon</span>
              </div>
            </div>
          </motion.div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 flex flex-col min-h-0">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-shrink-0 mb-4"
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              <span className="text-teal-400">Events</span>
              <span className="text-white"> & Meetups</span>
            </h1>
            <p className="text-gray-500 text-sm">
              Workshops, talks, and community gatherings
            </p>
          </motion.div>

          {/* Mobile Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:hidden flex-shrink-0 mb-4 overflow-x-auto events-scroll pb-2"
          >
            <div className="flex gap-2 min-w-max">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                    selectedType === type
                      ? 'bg-teal-500/20 text-teal-400 font-medium'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Coming Soon Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex-shrink-0 mb-4 p-4 rounded-xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-2xl">
                📅
              </div>
              <div>
                <div className="text-teal-400 text-sm font-medium">Events Calendar Coming Soon</div>
                <p className="text-gray-500 text-xs mt-0.5">
                  Workshops, conferences, and community meetups on agentic AI.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Scrollable Events List */}
          <div className="flex-1 overflow-y-auto events-scroll pr-2 min-h-0">
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: typeof events[0] }) {
  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden opacity-50 cursor-not-allowed"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
      }}
    >
      <div className="absolute inset-0 rounded-xl border border-white/[0.04]" />

      <div className="relative p-4 flex items-center gap-4">
        {/* Type Badge */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${typeColors[event.type]}`}>
          <span className="text-lg">
            {event.type === 'Workshop' && '🛠️'}
            {event.type === 'Conference' && '🎪'}
            {event.type === 'Meetup' && '👥'}
            {event.type === 'Talk' && '🎤'}
          </span>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-[10px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded ${typeColors[event.type]}`}>
              {event.type}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-500 text-[9px] font-medium">
              {event.date}
            </span>
          </div>
          
          <h3 className="text-sm font-semibold text-gray-400 mb-0.5 truncate">
            {event.title}
          </h3>
          
          <p className="text-gray-500 text-xs line-clamp-1">
            {event.description}
          </p>
        </div>

        {/* Location */}
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-gray-600 flex-shrink-0">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {event.location}
        </div>
      </div>
    </motion.div>
  );
}

