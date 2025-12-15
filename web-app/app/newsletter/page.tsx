'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SiteNav from '@/components/ui/SiteNav';

const pastIssues = [
  {
    id: 'issue-1',
    title: 'The Rise of Agentic AI',
    description: 'Understanding the shift from automation to autonomy in AI systems.',
    date: 'Coming Soon',
    issue: 1,
  },
  {
    id: 'issue-2',
    title: 'MCP & The Tool Revolution',
    description: 'How Model Context Protocol is changing agent-tool interactions.',
    date: 'Coming Soon',
    issue: 2,
  },
  {
    id: 'issue-3',
    title: 'Context Engineering 101',
    description: 'Mastering the art of managing what agents see and when.',
    date: 'Coming Soon',
    issue: 3,
  },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - would connect to email service
    setSubscribed(true);
  };

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0f] overflow-hidden">
      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .newsletter-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .newsletter-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .newsletter-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .newsletter-scroll::-webkit-scrollbar-thumb:hover {
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
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="p-5">
              {/* Subscribe CTA */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Subscribe
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Get weekly insights on agentic AI delivered to your inbox.
                </p>
                <div className="flex items-center gap-2 text-xs text-indigo-400">
                  <span>📬</span>
                  <span>Free, no spam</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

              {/* Stats */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Coming Soon
                </h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex justify-between">
                    <span>Issues</span>
                    <span className="text-white">{pastIssues.length}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frequency</span>
                    <span className="text-white">Weekly</span>
                  </div>
                </div>
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
              <span className="text-indigo-400">Newsletter</span>
              <span className="text-white"> & Updates</span>
            </h1>
            <p className="text-gray-500 text-sm">
              Weekly insights on agentic AI patterns and practices
            </p>
          </motion.div>

          {/* Subscribe Form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex-shrink-0 mb-6 p-6 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl flex-shrink-0">
                  📬
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Subscribe to the Newsletter</div>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Get weekly insights on building AI agents, delivered free.
                  </p>
                </div>
              </div>

              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/20 text-green-400 text-sm"
                >
                  <span>✓</span>
                  <span>Thanks! We&apos;ll be in touch.</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2 flex-shrink-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-indigo-500/50 w-48"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Past Issues */}
          <div className="flex-shrink-0 mb-3">
            <h2 className="text-sm font-medium text-gray-400">Upcoming Issues</h2>
          </div>

          {/* Scrollable Issues List */}
          <div className="flex-1 overflow-y-auto newsletter-scroll pr-2 min-h-0">
            <div className="space-y-3">
              {pastIssues.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <IssueCard issue={issue} />
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-8 pb-4"
            >
              <p className="text-gray-600 text-xs">
                More issues coming soon. Subscribe to stay updated.
              </p>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

function IssueCard({ issue }: { issue: typeof pastIssues[0] }) {
  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden opacity-50 cursor-not-allowed"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
      }}
    >
      <div className="absolute inset-0 rounded-xl border border-white/[0.04]" />

      <div className="relative p-4 flex items-center gap-4">
        {/* Issue Number */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
          <span className="text-indigo-400 font-bold text-sm">#{issue.issue}</span>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-500 text-[9px] font-medium">
              {issue.date}
            </span>
          </div>
          
          <h3 className="text-sm font-semibold text-gray-400 mb-0.5 truncate">
            {issue.title}
          </h3>
          
          <p className="text-gray-500 text-xs line-clamp-1">
            {issue.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

