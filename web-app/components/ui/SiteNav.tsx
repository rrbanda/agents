'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Personal brand navigation - clean, direct sections
const navItems = [
  { id: 'talks', label: 'Talks', icon: '🎤', href: '/talks' },
  { id: 'podcasts', label: 'Podcasts', icon: '🎙️', href: '/podcasts' },
  { id: 'insights', label: 'Insights', icon: '💡', href: '/insights' },
  { id: 'experiments', label: 'Experiments', icon: '⚡', href: '/experiments' },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Determine current section based on pathname
  const getCurrentSection = () => {
    if (pathname.startsWith('/talks') || pathname.startsWith('/presentation')) return 'talks';
    if (pathname.startsWith('/podcasts')) return 'podcasts';
    if (pathname.startsWith('/insights')) return 'insights';
    if (pathname.startsWith('/experiments') || pathname.startsWith('/demos')) return 'experiments';
    return null;
  };

  const currentSection = getCurrentSection();
  const currentItem = navItems.find(item => item.id === currentSection);

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-5">
      {/* Left: Logo + Back to Home */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-sm">AI</span>
        </div>
        <span className="text-gray-500 font-medium text-sm group-hover:text-white transition-colors hidden sm:inline">
          Home
        </span>
      </Link>

      {/* Center: Navigation Links (Desktop) */}
      <div className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
        {navItems.map((item) => {
          const isActive = item.id === currentSection;
          return (
            <Link key={item.id} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-gray-500 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Mobile: Current Section + Menu Toggle */}
      <div className="md:hidden flex items-center gap-2">
        {currentItem && (
          <span className="text-gray-400 text-sm flex items-center gap-1">
            <span>{currentItem.icon}</span>
            <span>{currentItem.label}</span>
          </span>
        )}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Right: Placeholder for balance (Desktop) */}
      <div className="hidden md:block w-20" />

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute top-full right-6 mt-2 w-56 z-50 md:hidden"
            >
              <div className="rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[#12121a]/95 backdrop-blur-xl" />
                <div className="absolute inset-0 rounded-2xl border border-white/10" />
                
                <div className="relative p-2">
                  {navItems.map((item) => {
                    const isActive = item.id === currentSection;
                    return (
                      <Link 
                        key={item.id} 
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                      >
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                            isActive
                              ? 'bg-white/10 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
                          }`}
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                          {isActive && (
                            <span className="ml-auto text-blue-400">•</span>
                          )}
                        </motion.div>
                      </Link>
                    );
                  })}
                  
                  {/* Divider */}
                  <div className="my-2 border-t border-white/[0.06]" />
                  
                  {/* Home link */}
                  <Link href="/" onClick={() => setMenuOpen(false)}>
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/[0.06] transition-all"
                    >
                      <span className="text-lg">🏠</span>
                      <span className="font-medium">Home</span>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
