# Content Drafts - Organization Queue

This directory contains raw content drafts that will be organized into the 101/201/301 structure once all content is received.

## Content Received

### ✅ Content 1: Agentic AI Introduction
- **File**: `01-agentic-ai-introduction.md`
- **Level**: 101 (Fundamentals)
- **Formats**: Storytelling (Version A) + Professional (Version B)
- **Topics Covered**:
  - Evolution from LLMs to Agents
  - Definition and architecture of agents
  - Technical foundations
  - Memory systems
  - Tool use
  - Example use case (Solar Scout)
  - Multi-agent systems
  - Collaboration patterns
  - Governance and safety
  - Automation vs Augmentation
  - Human-Agent collaboration
  - Ethics and alignment

### ✅ Content 2: Long-Running Agents and Advanced Tool Use
- **File**: `02-long-running-agents-and-tool-use.md`
- **Level**: 201-301 (Intermediate to Advanced)
- **Source**: Conceptual content extracted from Anthropic research articles
- **Topics Covered**:
  - Multi-context window challenges
  - Long-running agent architecture (Initializer + Coding Agent pattern)
  - Context management strategies
  - Tool discovery and dynamic loading
  - Programmatic tool calling patterns
  - Tool use examples and parameter clarity
  - Code execution with tool APIs
  - State persistence and artifact-based workflows
  - Testing strategies for agents
  - Progressive disclosure patterns
  - Privacy-preserving operations
  - Skill building and reusable patterns

### ✅ Content 3: Agent Skills Pattern
- **File**: `03-agent-skills-pattern.md`
- **Level**: 201 (Intermediate)
- **Source**: Anthropic article on Agent Skills (conceptual content extracted)
- **Topics Covered**:
  - Agent Skills as pattern for organizing domain-specific expertise
  - Progressive disclosure principle (metadata → content → deep dive)
  - Skill structure (SKILL.md with YAML frontmatter, additional files)
  - Code execution within skills
  - Context window management with skills
  - Skill development and evaluation practices
  - Security considerations
  - Composable expertise pattern
  - Integration with other agent patterns
  - Application scenarios and design considerations

### ✅ Content 4: Agent Architecture Patterns
- **File**: `04-agent-architecture-patterns.md`
- **Level**: 201 (Intermediate)
- **Source**: Anthropic article on Building Agents (conceptual content extracted)
- **Topics Covered**:
  - Core principle: Giving agents a computer
  - The Agent Loop pattern (Gather Context → Take Action → Verify Work → Repeat)
  - Context gathering strategies (agentic search, semantic search, subagents, compaction)
  - Action-taking mechanisms (tools, bash/scripts, code generation, MCP)
  - Verification strategies (rules-based, visual feedback, LLM as judge)
  - Testing and improvement practices
  - Agent types enabled (finance, personal assistant, customer support, research)
  - Design patterns and best practices
  - Iterative improvement cycle

### ✅ Content 5: Context Engineering
- **File**: `05-context-engineering.md`
- **Level**: 201-301 (Intermediate to Advanced)
- **Source**: Anthropic article on Effective Context Engineering (conceptual content extracted)
- **Topics Covered**:
  - Context engineering vs prompt engineering (evolution of the field)
  - Why context engineering matters (attention budget, context rot, architectural constraints)
  - Anatomy of effective context (system prompts, tools, examples)
  - Context retrieval and agentic search (just-in-time strategies, progressive disclosure)
  - Long-horizon task techniques (compaction, structured note-taking, sub-agent architectures)
  - Hybrid strategies for context management
  - Best practices and design patterns
  - Choosing the right technique for different task types

### ✅ Content 6: Writing Effective Tools
- **File**: `06-writing-effective-tools.md`
- **Level**: 201 (Intermediate)
- **Source**: Anthropic article on Writing Effective Tools (conceptual content extracted)
- **Topics Covered**:
  - What tools are (contract between deterministic systems and non-deterministic agents)
  - How to write tools (prototyping, evaluation, collaboration with agents)
  - Choosing the right tools (consolidation, agent affordances, context constraints)
  - Namespacing tools (organization and selection)
  - Returning meaningful context (natural language vs identifiers, response formats)
  - Optimizing for token efficiency (pagination, filtering, truncation, error messages)
  - Prompt-engineering tool descriptions
  - Evaluation-driven improvement process
  - Key metrics and analysis techniques

### ✅ Content 7: Multi-Agent Research Systems
- **File**: `07-multi-agent-research-systems.md`
- **Level**: 301 (Advanced)
- **Source**: Anthropic article on Building Multi-Agent Research System (conceptual content extracted)
- **Topics Covered**:
  - Benefits of multi-agent systems (compression, separation of concerns, collective intelligence)
  - Architecture overview (orchestrator-worker pattern, dynamic search vs static RAG)
  - Prompt engineering principles (think like agents, teach delegation, scale effort, tool design, self-improvement, parallel execution)
  - Evaluation strategies (start small, LLM-as-judge, human testing, end-state evaluation)
  - Production reliability challenges (stateful errors, debugging, deployment coordination, synchronous bottlenecks)
  - Additional tips (long-horizon conversation management, artifact systems, end-state evaluation)
  - Performance evidence and trade-offs

### ✅ Content 8: Agentic Coding Best Practices
- **File**: `08-agentic-coding-best-practices.md`
- **Level**: 201 (Intermediate)
- **Source**: Anthropic article on Claude Code Best Practices (conceptual content extracted)
- **Topics Covered**:
  - Design philosophy (low-level, unopinionated tools)
  - Customizing setup (context documentation files, tool allowlists, additional tools)
  - Extending agent capabilities (bash tools, MCP, custom slash commands)
  - Common workflows (explore-plan-code-commit, TDD, visual iteration, codebase Q&A, git/GitHub, Jupyter notebooks)
  - Workflow optimization (specificity, images, course correction, context management, checklists)
  - Headless mode for automation (issue triage, linting)
  - Multi-agent workflows (parallel instances, multiple checkouts, git worktrees, custom harnesses)

### ✅ Content 9: Building Effective Agents
- **File**: `09-building-effective-agents.md`
- **Level**: 101 (Fundamentals)
- **Source**: Anthropic article on Building Effective Agents (conceptual content extracted)
- **Topics Covered**:
  - Core principle (simplicity over complexity)
  - What are agents (workflows vs agents distinction)
  - When to use agents (decision framework, trade-offs)
  - Framework guidance (when and how to use)
  - Building blocks (augmented LLM)
  - Common workflows (prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer)
  - Autonomous agents (concept, when to use, trade-offs)
  - Combining patterns (flexibility and customization)
  - Core principles (simplicity, transparency, ACI design)
  - Applications in practice (customer support, coding agents)
  - Tool prompt engineering (format considerations, ACI design principles)

### ✅ Content 10: Contextual Retrieval
- **File**: `10-contextual-retrieval.md`
- **Level**: 201 (Intermediate)
- **Source**: Anthropic article on Contextual Retrieval (conceptual content extracted)
- **Topics Covered**:
  - The problem (knowledge base access, context loss in traditional RAG)
  - Simple solution (longer prompts for small knowledge bases)
  - Traditional RAG primer (chunking, embedding, BM25, combining techniques)
  - Context problem (chunks lack context)
  - Contextual Retrieval solution (Contextual Embeddings, Contextual BM25)
  - Implementation (LLM-generated context, prompt caching for cost)
  - Performance improvements (49% reduction in failures, 67% with reranking)
  - Implementation considerations (chunk boundaries, embedding models, custom prompts, number of chunks)
  - Reranking (process, performance, cost/latency trade-offs)
  - Best practices and principles

### ✅ Content 11: AI Fluency Framework
- **File**: `11-ai-fluency-framework.md`
- **Level**: 101 (Fundamentals)
- **Source**: Anthropic AI Fluency Key Terminology Cheat Sheet (conceptual content extracted)
- **Topics Covered**:
  - AI Fluency definition and purpose
  - The 4Ds framework (Delegation, Description, Discernment, Diligence)
  - Each D's components (Problem/Platform/Task awareness, Product/Process/Performance description/discernment, Creation/Transparency/Deployment diligence)
  - Human-AI interaction modes (Automation, Augmentation, Agency)
  - AI technical concepts (LLMs, parameters, neural networks, transformer architecture, scaling laws, pre-training, fine-tuning, context window, hallucination, knowledge cutoff, reasoning models, temperature, RAG, bias)
  - Prompt engineering concepts (prompt, prompt engineering, chain-of-thought, few-shot learning, role/persona definition, output constraints, think-first approach)
  - Framework principles and interconnections

### ✅ Content 12: Augmented Coding Patterns
- **File**: `12-augmented-coding-patterns.md`
- **Level**: 201 (Intermediate)
- **Source**: Augmented Coding Patterns Masterclass (workshop description, conceptual content extracted)
- **Topics Covered**:
  - Emerging patterns for coding with Generative AI
  - Pattern-based approach (from first experiments to advanced techniques)
  - Understanding underlying dynamics (why things happen, not just what)
  - Limitations and possibilities of Generative AI
  - Adaptability (techniques not tied to specific tools)
  - Mental models for rapidly changing landscape
  - Referenced concepts (Process Files, TDD Refactoring, Semantic Zoom, Iterative Refinement, Pattern Combination)
  - Note: References external resources for detailed patterns

### ✅ Content 13: Understanding Generative AI
- **File**: `13-understanding-generative-ai.md`
- **Level**: 101 (Fundamentals)
- **Source**: Understanding Generative AI educational material (conceptual content extracted)
- **Topics Covered**:
  - Definition of Generative AI (creation vs. analysis)
  - Three pillars (Algorithms/Transformer architecture, Data explosion, Computing power)
  - How it works (Pre-training, Fine-tuning, Deployment)
  - Key capabilities (versatile language skills, general-purpose abilities, learning from examples, connecting to external tools)
  - Current limitations (knowledge cutoff, hallucinations, context constraints, reasoning challenges)
  - Principles and mitigation strategies

### ✅ Content 14: Effective Prompt Engineering Techniques
- **File**: `14-effective-prompt-engineering-techniques.md`
- **Level**: 101 (Fundamentals)
- **Source**: 6 Techniques for Effective Prompt Engineering educational material (conceptual content extracted)
- **Topics Covered**:
  - Six core techniques (Provide Context, Show Examples, Specify Constraints, Break into Steps, Ask to Think First, Define Role)
  - Secret weapon (Ask AI for help with prompting)
  - Before/after examples for each technique
  - Key principles (specificity, examples over descriptions, structure, reasoning, context, iteration)
  - Combining techniques
  - Practical application guidance

## Status

Waiting for additional content from user before organizing into final structure.

