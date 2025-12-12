'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type RAGType = 'traditional' | 'agentic' | 'graph';

const ragTypes: Record<RAGType, {
  name: string;
  icon: string;
  color: string;
  tagline: string;
  description: string;
  process: string[];
  strengths: string[];
  limitations: string[];
  useCase: string;
}> = {
  traditional: {
    name: 'Traditional RAG',
    icon: '📚',
    color: '#3b82f6',
    tagline: 'Static retrieval, one-shot augmentation',
    description: 'Retrieves relevant chunks from a vector database and appends them to the prompt for generation.',
    process: [
      'Chunk documents into pieces',
      'Create embeddings for each chunk',
      'Store in vector database',
      'Query → Retrieve top-K chunks',
      'Augment prompt with chunks',
      'Generate response',
    ],
    strengths: [
      'Simple to implement',
      'Low latency per query',
      'Works well for factual lookup',
      'Scalable to large corpora',
    ],
    limitations: [
      'Loses context when chunking',
      'Static, single-pass retrieval',
      'Can\'t adapt based on findings',
      'No reasoning over retrieved data',
    ],
    useCase: 'FAQ bots, documentation search, simple Q&A',
  },
  agentic: {
    name: 'Agentic RAG',
    icon: '🤖',
    color: '#8b5cf6',
    tagline: 'Dynamic, multi-step retrieval with reasoning',
    description: 'Agent dynamically decides what to search, evaluates results, and iteratively refines its search strategy.',
    process: [
      'Agent analyzes the query',
      'Decides what to search for',
      'Retrieves and evaluates results',
      'Refines search if needed',
      'May search multiple sources',
      'Synthesizes final answer',
    ],
    strengths: [
      'Adapts search based on findings',
      'Can explore multiple paths',
      'Self-corrects poor retrievals',
      'Handles complex multi-hop queries',
    ],
    limitations: [
      'Higher latency (multiple LLM calls)',
      'More expensive (tokens)',
      'Requires good tool design',
      'Can get stuck in loops',
    ],
    useCase: 'Research tasks, complex analysis, open-ended exploration',
  },
  graph: {
    name: 'Graph RAG',
    icon: '🕸️',
    color: '#10b981',
    tagline: 'Knowledge graph enhanced retrieval',
    description: 'Combines vector search with knowledge graph traversal to capture relationships between entities.',
    process: [
      'Extract entities & relationships',
      'Build knowledge graph',
      'Query identifies relevant entities',
      'Traverse graph for context',
      'Combine with vector retrieval',
      'Generate with rich context',
    ],
    strengths: [
      'Captures entity relationships',
      'Better for connected knowledge',
      'Handles "who/what/when" queries',
      'Provides structured context',
    ],
    limitations: [
      'Complex to build and maintain',
      'Requires entity extraction',
      'Graph construction overhead',
      'May miss unstructured insights',
    ],
    useCase: 'Enterprise knowledge, legal research, scientific literature',
  },
};

export default function RAGEvolutionSlide() {
  const [activeType, setActiveType] = useState<RAGType>('traditional');
  const [showComparison, setShowComparison] = useState(false);

  const current = ragTypes[activeType];

  return (
    <div className="h-full flex flex-col items-center justify-start pt-10 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
          Retrieval Patterns
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          RAG Evolution
        </h2>
        <p className="text-gray-400">
          From static retrieval to intelligent knowledge access
        </p>
      </motion.div>

      {/* Evolution timeline selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="relative flex items-center gap-4">
          {/* Timeline bar */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-800 rounded-full -translate-y-1/2 -z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ 
                width: activeType === 'traditional' ? '16%' : activeType === 'agentic' ? '50%' : '84%' 
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Type buttons */}
          {(Object.keys(ragTypes) as RAGType[]).map((type, index) => {
            const isActive = activeType === type;
            const data = ragTypes[type];

            return (
              <motion.button
                key={type}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => setActiveType(type)}
                className={`relative px-5 py-3 rounded-xl border-2 transition-all duration-200 ${
                  isActive ? '' : 'border-gray-700/50 hover:border-gray-600'
                }`}
                style={{
                  backgroundColor: isActive ? `${data.color}15` : 'rgba(15, 15, 20, 0.9)',
                  borderColor: isActive ? data.color : undefined,
                  boxShadow: isActive ? `0 4px 20px ${data.color}25` : undefined,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{data.icon}</span>
                  <div className="text-left">
                    <span
                      className="font-bold text-sm block"
                      style={{ color: isActive ? data.color : '#9ca3af' }}
                    >
                      {data.name}
                    </span>
                    <span className="text-gray-500 text-xs hidden md:block">
                      {data.tagline.split(',')[0]}
                    </span>
                  </div>
                </div>

                {/* Active dot */}
                {isActive && (
                  <div
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                    style={{ backgroundColor: data.color }}
                  />
                )}
              </motion.button>
            );
          })}

          {/* Arrow indicator */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 text-sm hidden md:block"
          >
            →
          </motion.span>
        </div>
      </motion.div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-5xl"
        >
          <div
            className="rounded-2xl p-6 border"
            style={{
              backgroundColor: `${current.color}06`,
              borderColor: `${current.color}20`,
            }}
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${current.color}20` }}
                >
                  <span className="text-3xl">{current.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{current.name}</h3>
                  <p className="text-gray-400 text-sm">{current.description}</p>
                </div>
              </div>
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
              >
                {showComparison ? 'Hide' : 'Compare'}
              </button>
            </div>

            {/* Process flow */}
            <div className="mb-5">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                How It Works
              </h4>
              <div className="flex items-center gap-2 flex-wrap">
                {current.process.map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <div
                      className="px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{
                        backgroundColor: `${current.color}15`,
                        color: current.color,
                      }}
                    >
                      {step}
                    </div>
                    {index < current.process.length - 1 && (
                      <span className="text-gray-600">→</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Strengths and Limitations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Strengths */}
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <span>✓</span> Strengths
                </h4>
                <ul className="space-y-1">
                  {current.strengths.map((item) => (
                    <li key={item} className="text-sm text-gray-300 flex items-center gap-2">
                      <span className="text-green-400">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <span>✗</span> Limitations
                </h4>
                <ul className="space-y-1">
                  {current.limitations.map((item) => (
                    <li key={item} className="text-sm text-gray-300 flex items-center gap-2">
                      <span className="text-red-400">−</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best For */}
              <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  💡 Best For
                </h4>
                <p className="text-sm text-gray-300">{current.useCase}</p>
                
                {/* Quick comparison when toggled */}
                {showComparison && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-gray-700/50"
                  >
                    <span className="text-xs text-gray-500">Latency:</span>
                    <div className="flex items-center gap-1 mt-1">
                      {['traditional', 'agentic', 'graph'].map((t) => (
                        <div
                          key={t}
                          className="h-2 rounded"
                          style={{
                            width: t === 'traditional' ? '20%' : t === 'agentic' ? '50%' : '35%',
                            backgroundColor: ragTypes[t as RAGType].color,
                            opacity: t === activeType ? 1 : 0.3,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Key insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-gray-400 text-sm text-center max-w-2xl"
      >
        <span className="text-white font-medium">Choose based on your needs:</span> Traditional RAG for speed, 
        Agentic RAG for complex queries, Graph RAG for connected knowledge.
      </motion.p>
    </div>
  );
}

