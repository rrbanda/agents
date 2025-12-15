'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const codeExamples = [
  {
    id: 'react-loop',
    name: 'ReAct Loop',
    icon: '🔄',
    color: '#8b5cf6',
    description: 'The fundamental agent loop pattern',
    language: 'python',
    code: `def agent_loop(goal: str, tools: list, max_steps: int = 10):
    context = {"goal": goal, "history": []}
    
    for step in range(max_steps):
        # THINK: Reason about what to do
        thought = llm.complete(
            f"Goal: {goal}\\nHistory: {context['history']}\\n"
            f"What should I do next? Think step by step."
        )
        
        # ACT: Choose and execute a tool
        action = llm.choose_tool(thought, tools)
        result = execute_tool(action)
        
        # OBSERVE: Record the result
        context["history"].append({
            "thought": thought,
            "action": action,
            "result": result
        })
        
        # CHECK: Are we done?
        if is_goal_achieved(context, goal):
            return synthesize_answer(context)
    
    return "Max steps reached"`,
  },
  {
    id: 'tool-calling',
    name: 'Tool Definition',
    icon: '🔧',
    color: '#10b981',
    description: 'How to define tools for function calling',
    language: 'python',
    code: `from typing import Annotated

def search_documents(
    query: Annotated[str, "Search query for the knowledge base"],
    max_results: Annotated[int, "Maximum results to return"] = 5,
    filter_by: Annotated[str | None, "Optional: filter by category"] = None
) -> list[dict]:
    """
    Search the document database for relevant information.
    Returns a list of matching documents with title and snippet.
    Use this when the user asks about company policies or procedures.
    """
    # Implementation
    results = vector_db.search(query, limit=max_results)
    if filter_by:
        results = [r for r in results if r.category == filter_by]
    return [{"title": r.title, "snippet": r.snippet} for r in results]

# Register with the LLM
tools = [search_documents, create_ticket, send_email]
response = llm.chat(messages, tools=tools)`,
  },
  {
    id: 'orchestrator',
    name: 'Orchestrator Pattern',
    icon: '👔',
    color: '#3b82f6',
    description: 'Central coordinator delegating to workers',
    language: 'python',
    code: `class Orchestrator:
    def __init__(self, workers: dict[str, Agent]):
        self.workers = workers
    
    async def solve(self, task: str) -> str:
        # 1. Analyze and plan
        plan = await self.plan(task)
        
        # 2. Delegate to workers
        results = []
        for subtask in plan.subtasks:
            worker = self.workers[subtask.worker_type]
            result = await worker.execute(subtask.description)
            results.append({
                "subtask": subtask.description,
                "result": result.summary  # Condensed!
            })
        
        # 3. Synthesize final answer
        return await self.synthesize(task, results)
    
    async def plan(self, task: str) -> Plan:
        return await llm.structured_output(
            f"Break down this task: {task}",
            schema=Plan  # Pydantic model
        )`,
  },
  {
    id: 'memory',
    name: 'Memory Management',
    icon: '💾',
    color: '#f59e0b',
    description: 'Compaction and context management',
    language: 'python',
    code: `class ConversationMemory:
    def __init__(self, max_tokens: int = 4000):
        self.messages = []
        self.max_tokens = max_tokens
        self.summary = ""
    
    def add(self, role: str, content: str):
        self.messages.append({"role": role, "content": content})
        self._compact_if_needed()
    
    def _compact_if_needed(self):
        total = count_tokens(self.messages)
        if total > self.max_tokens:
            # Summarize older messages
            old = self.messages[:-5]  # Keep last 5
            self.summary = llm.summarize(
                f"Previous summary: {self.summary}\\n"
                f"New messages: {old}"
            )
            self.messages = self.messages[-5:]
    
    def get_context(self) -> list:
        return [
            {"role": "system", "content": f"Summary: {self.summary}"},
            *self.messages
        ]`,
  },
  {
    id: 'eval',
    name: 'Agent Evaluation',
    icon: '📊',
    color: '#ec4899',
    description: 'Testing agent behavior systematically',
    language: 'python',
    code: `import pytest
from agent import ResearchAgent

class TestResearchAgent:
    @pytest.fixture
    def agent(self):
        return ResearchAgent(tools=[search, summarize])
    
    def test_finds_relevant_sources(self, agent):
        result = agent.research("What is quantum computing?")
        assert len(result.sources) >= 3
        assert all(s.relevance_score > 0.7 for s in result.sources)
    
    def test_handles_ambiguous_query(self, agent):
        result = agent.research("Apple")
        # Should ask for clarification or make reasonable assumption
        assert "clarif" in result.response.lower() or \\
               "company" in result.response.lower() or \\
               "fruit" in result.response.lower()
    
    def test_respects_tool_limits(self, agent):
        result = agent.research("Comprehensive market analysis")
        assert result.api_calls <= 10  # Max limit
        assert result.tokens_used <= 50000`,
  },
];

export default function CodeExamplesSlide() {
  const [activeExample, setActiveExample] = useState<string>('react-loop');
  const current = codeExamples.find(e => e.id === activeExample);

  return (
    <div className="h-full flex flex-col items-center justify-start pt-6 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wide uppercase rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
          Practical Implementation
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
          Code Patterns
        </h2>
        <p className="text-gray-400 text-sm">
          Real code examples for common agent patterns
        </p>
      </motion.div>

      {/* Example selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 mb-4 flex-wrap justify-center"
      >
        {codeExamples.map((example, index) => (
          <motion.button
            key={example.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            onClick={() => setActiveExample(example.id)}
            className={`px-3 py-2 rounded-xl border-2 transition-all duration-300 ${
              activeExample === example.id
                ? 'scale-105'
                : 'border-gray-700/50 hover:border-gray-600'
            }`}
            style={{
              backgroundColor: activeExample === example.id ? `${example.color}15` : 'transparent',
              borderColor: activeExample === example.id ? example.color : undefined,
              boxShadow: activeExample === example.id ? `0 4px 20px ${example.color}20` : undefined,
            }}
          >
            <span className="text-lg mr-1">{example.icon}</span>
            <span
              className="text-sm font-medium"
              style={{ color: activeExample === example.id ? example.color : '#9ca3af' }}
            >
              {example.name}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Code display */}
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-5xl flex-1 min-h-0"
          >
            <div
              className="rounded-2xl border overflow-hidden h-full flex flex-col"
              style={{ borderColor: `${current.color}30` }}
            >
              {/* Header bar */}
              <div
                className="px-4 py-2 flex items-center justify-between"
                style={{ backgroundColor: `${current.color}15` }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{current.icon}</span>
                  <span className="text-white font-semibold">{current.name}</span>
                  <span className="text-gray-500 text-sm">— {current.description}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded text-xs font-mono"
                    style={{ backgroundColor: `${current.color}25`, color: current.color }}
                  >
                    {current.language}
                  </span>
                </div>
              </div>

              {/* Code content */}
              <div className="flex-1 overflow-auto bg-[#0d1117] p-4">
                <pre className="text-sm font-mono leading-relaxed">
                  <code>
                    {current.code.split('\n').map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.02 * i }}
                        className="flex"
                      >
                        <span className="text-gray-600 w-8 text-right mr-4 select-none">
                          {i + 1}
                        </span>
                        <span className="text-gray-300">
                          {highlightPython(line, current.color)}
                        </span>
                      </motion.div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tip */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-3 text-gray-500 text-xs text-center"
      >
        💡 These patterns work across frameworks. Adapt to your specific stack.
      </motion.p>
    </div>
  );
}

// Simple syntax highlighting helper
function highlightPython(line: string, accentColor: string): React.ReactNode {
  // Keywords
  const keywords = ['def', 'class', 'async', 'await', 'for', 'if', 'return', 'from', 'import', 'in', 'range', 'self', 'None', 'True', 'False', 'and', 'or', 'not', 'assert', 'all', 'len'];
  const builtins = ['str', 'int', 'list', 'dict', 'tuple', 'Annotated'];
  
  let result = line;
  
  // This is a simplified highlighter - in production you'd use a proper syntax highlighter
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'g');
    result = result.replace(regex, `__KW__${kw}__/KW__`);
  });
  
  builtins.forEach(bi => {
    const regex = new RegExp(`\\b${bi}\\b`, 'g');
    result = result.replace(regex, `__BI__${bi}__/BI__`);
  });

  // Split and render
  const parts = result.split(/(__KW__|__\/KW__|__BI__|__\/BI__|__STR__|__\/STR__)/);
  let inKeyword = false;
  let inBuiltin = false;

  return parts.map((part, i) => {
    if (part === '__KW__') { inKeyword = true; return null; }
    if (part === '__/KW__') { inKeyword = false; return null; }
    if (part === '__BI__') { inBuiltin = true; return null; }
    if (part === '__/BI__') { inBuiltin = false; return null; }
    
    if (inKeyword) {
      return <span key={i} className="text-purple-400">{part}</span>;
    }
    if (inBuiltin) {
      return <span key={i} className="text-blue-400">{part}</span>;
    }
    
    // Highlight strings
    if (part.includes('"') || part.includes("'")) {
      return <span key={i} dangerouslySetInnerHTML={{ 
        __html: part
          .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-amber-300">$&</span>')
          .replace(/(f["'])/g, '<span class="text-amber-400">$1</span>')
      }} />;
    }
    
    // Highlight comments
    if (part.includes('#')) {
      const [code, ...comment] = part.split('#');
      return <span key={i}>{code}<span className="text-gray-500">#{comment.join('#')}</span></span>;
    }
    
    return <span key={i}>{part}</span>;
  });
}

