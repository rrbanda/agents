'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Use case scenarios from the blog post
const useCases = [
  {
    id: 'performance',
    title: 'System Slow?',
    subtitle: 'Performance Diagnosis',
    icon: '🐌',
    color: '#ef4444',
    gradient: 'from-red-900/40 to-orange-900/30',
    prompt: 'My WiFi doesn\'t work very well. It cuts out after a few minutes. Help me fix it.',
    toolCalls: [
      { tool: 'get_system_info', icon: '💻' },
      { tool: 'get_network_interfaces', icon: '🌐' },
      { tool: 'get_journal_logs', icon: '📋' },
      { tool: 'get_hardware_info', icon: '🔧' },
      { tool: 'get_service_status', icon: '⚙️' },
    ],
    diagnosis: {
      problem: 'ath12k_pci driver RX buffer allocation failure (-ENOMEM)',
      cause: 'Driver bug or firmware mismatch with Qualcomm 802.11ax card',
      fix: 'Update kernel/firmware or set ath12k_pci_disable_fast_rx=1',
    },
  },
  {
    id: 'disk',
    title: 'Disk Full?',
    subtitle: 'Storage Analysis',
    icon: '💾',
    color: '#f59e0b',
    gradient: 'from-amber-900/40 to-yellow-900/30',
    prompt: 'I need help analyzing disk usage. Show me the largest directories and potential cleanup opportunities.',
    toolCalls: [
      { tool: 'get_disk_usage', icon: '📊' },
      { tool: 'list_directories_by_size', icon: '📁' },
      { tool: 'get_journal_logs', icon: '📋' },
      { tool: 'list_processes', icon: '⚡' },
    ],
    diagnosis: {
      problem: '238 GB in ~/.local/share/containers',
      cause: 'Podman/Docker container images and layers accumulated',
      fix: 'podman system prune -a + empty Trash (7GB)',
    },
  },
  {
    id: 'upgrade',
    title: 'Upgrade Ready?',
    subtitle: 'System Assessment',
    icon: '⬆️',
    color: '#10b981',
    gradient: 'from-emerald-900/40 to-teal-900/30',
    prompt: 'Analyze this Fedora 42 system for upgrade readiness to Fedora 43.',
    toolCalls: [
      { tool: 'get_system_info', icon: '💻' },
      { tool: 'list_services', icon: '⚙️' },
      { tool: 'get_disk_usage', icon: '📊' },
      { tool: 'get_hardware_info', icon: '🔧' },
    ],
    diagnosis: {
      problem: 'Third-party repos may lack F43 packages',
      cause: 'google-cloud-cli, rpm-fusion repos need verification',
      fix: 'Disable problematic repos, run dnf system-upgrade',
    },
  },
];

const mcpTools = [
  { name: 'get_system_info', desc: 'System details & kernel' },
  { name: 'get_network_interfaces', desc: 'Network configuration' },
  { name: 'get_journal_logs', desc: 'Journald log entries' },
  { name: 'get_disk_usage', desc: 'Filesystem usage' },
  { name: 'list_processes', desc: 'Running processes' },
  { name: 'get_service_status', desc: 'Systemd services' },
  { name: 'list_directories_by_size', desc: 'Disk space analysis' },
  { name: 'get_hardware_info', desc: 'Hardware details' },
];

export default function LinuxMCPSlide() {
  const [activeCase, setActiveCase] = useState<string>('performance');
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentCase = useCases.find(c => c.id === activeCase)!;

  // Auto-animate tool calls when case changes
  useEffect(() => {
    setAnimationStep(0);
    setIsAnimating(true);
    
    const timer = setInterval(() => {
      setAnimationStep(prev => {
        if (prev >= currentCase.toolCalls.length) {
          setIsAnimating(false);
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(timer);
  }, [activeCase, currentCase.toolCalls.length]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-3xl">🐧</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            <span className="text-red-500">linux</span>-mcp-server
          </h2>
          <span className="px-2 py-0.5 bg-red-600/20 text-red-400 text-xs rounded-full border border-red-500/30">
            RHEL Engineering
          </span>
        </div>
        <p className="text-gray-400 text-sm">
          Talk to your Linux system through AI — no more copy-pasting terminal output
        </p>
      </motion.div>

      {/* Main Content - Two Column Layout */}
      <div className="w-full max-w-6xl flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Left: Use Case Selector + Conversation */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {/* Use Case Tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2"
          >
            {useCases.map((useCase) => (
              <button
                key={useCase.id}
                onClick={() => setActiveCase(useCase.id)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  activeCase === useCase.id
                    ? 'text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700/50'
                }`}
                style={{
                  backgroundColor: activeCase === useCase.id ? `${useCase.color}30` : undefined,
                  borderColor: activeCase === useCase.id ? useCase.color : undefined,
                  border: activeCase === useCase.id ? `1px solid ${useCase.color}` : undefined,
                }}
              >
                <span>{useCase.icon}</span>
                <span className="hidden sm:inline">{useCase.title}</span>
              </button>
            ))}
          </motion.div>

          {/* Conversation Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex-1 bg-gradient-to-br ${currentCase.gradient} rounded-xl border border-gray-700/50 overflow-hidden flex flex-col`}
            >
              {/* Terminal Header */}
              <div className="bg-gray-900/80 px-4 py-2 flex items-center gap-2 border-b border-gray-700/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-gray-500 text-xs ml-2 font-mono">goose + gpt-oss:20b + linux-mcp-server</span>
              </div>

              {/* Conversation Content */}
              <div className="flex-1 p-4 space-y-3 overflow-auto">
                {/* User Prompt */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm shrink-0">
                    👤
                  </div>
                  <div className="bg-gray-800/60 rounded-lg p-3 text-gray-200 text-sm max-w-[90%]">
                    {currentCase.prompt}
                  </div>
                </motion.div>

                {/* AI Response with Tool Calls */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-sm shrink-0">
                    🤖
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="text-gray-400 text-xs">Analyzing your system...</div>
                    
                    {/* Animated Tool Calls */}
                    <div className="flex flex-wrap gap-2">
                      {currentCase.toolCalls.map((tool, index) => (
                        <motion.div
                          key={tool.tool}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ 
                            opacity: index < animationStep ? 1 : 0.3,
                            scale: index < animationStep ? 1 : 0.9,
                          }}
                          className="px-2 py-1 rounded-md bg-gray-800/80 border border-gray-600/50 flex items-center gap-1.5"
                        >
                          <span className="text-sm">{tool.icon}</span>
                          <span className="text-xs font-mono text-gray-300">{tool.tool}</span>
                          {index < animationStep && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-green-400 text-xs"
                            >
                              ✓
                            </motion.span>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Diagnosis Result */}
                    {animationStep >= currentCase.toolCalls.length && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 bg-gray-900/60 rounded-lg p-3 border-l-2"
                        style={{ borderColor: currentCase.color }}
                      >
                        <div className="text-xs text-gray-500 mb-2">⚡ DIAGNOSIS</div>
                        <div className="space-y-1.5">
                          <div className="flex gap-2 text-xs">
                            <span className="text-red-400 shrink-0">Problem:</span>
                            <span className="text-gray-300">{currentCase.diagnosis.problem}</span>
                          </div>
                          <div className="flex gap-2 text-xs">
                            <span className="text-amber-400 shrink-0">Cause:</span>
                            <span className="text-gray-300">{currentCase.diagnosis.cause}</span>
                          </div>
                          <div className="flex gap-2 text-xs">
                            <span className="text-green-400 shrink-0">Fix:</span>
                            <span className="text-gray-300 font-mono">{currentCase.diagnosis.fix}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: MCP Tools Overview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 flex flex-col gap-3"
        >
          {/* Tools Panel */}
          <div className="bg-gray-800/40 rounded-xl border border-gray-700/50 p-4 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🔧</span>
              <h3 className="text-white font-semibold text-sm">MCP Tools</h3>
              <span className="text-gray-500 text-xs">(read-only)</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {mcpTools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-center gap-2 p-1.5 rounded bg-gray-900/40 hover:bg-gray-900/60 transition-colors"
                >
                  <code className="text-[10px] text-blue-400 font-mono truncate flex-1">{tool.name}</code>
                  <span className="text-[10px] text-gray-500 truncate">{tool.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Architecture Diagram */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 p-4"
          >
            <div className="text-xs text-gray-500 mb-3 text-center">Architecture</div>
            <div className="flex items-center justify-between gap-2">
              {/* User */}
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-lg mx-auto mb-1">
                  👤
                </div>
                <span className="text-[10px] text-gray-400">You</span>
              </div>
              
              {/* Arrow */}
              <div className="text-gray-600 text-sm">→</div>
              
              {/* Goose */}
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-lg mx-auto mb-1">
                  🪿
                </div>
                <span className="text-[10px] text-gray-400">Goose</span>
              </div>
              
              {/* Arrow */}
              <div className="text-gray-600 text-sm">→</div>
              
              {/* MCP Server */}
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-lg mx-auto mb-1">
                  🐧
                </div>
                <span className="text-[10px] text-gray-400">MCP</span>
              </div>
              
              {/* Arrow */}
              <div className="text-gray-600 text-sm">→</div>
              
              {/* Linux */}
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-lg mx-auto mb-1">
                  🖥️
                </div>
                <span className="text-[10px] text-gray-400">RHEL</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500"
      >
        <a 
          href="https://github.com/rhel-lightspeed/linux-mcp-server" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-gray-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          rhel-lightspeed/linux-mcp-server
        </a>
        <span className="text-gray-700">•</span>
        <span>Open Source • Read-only by default • Works with any MCP client</span>
      </motion.div>
    </div>
  );
}

