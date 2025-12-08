# Context Engineering for AI Agents - Content Draft

**Source**: Anthropic article on Effective Context Engineering (conceptual content extracted)
**Status**: Draft - awaiting organization
**Note**: Content focuses on concepts and patterns, not product-specific features

---

## Context Engineering: The Evolution from Prompt Engineering

### The Shift

**Prompt Engineering** (past focus):
- Methods for writing and organizing LLM instructions for optimal outcomes
- Primary focus: how to write effective prompts, particularly system prompts
- Suited for one-shot classification or text generation tasks

**Context Engineering** (current focus):
- Strategies for curating and maintaining the optimal set of tokens during LLM inference
- Includes all information that may land in context (system instructions, tools, MCP, external data, message history, etc.)
- Suited for agents operating over multiple turns and longer time horizons

### Key Difference

**Prompt Engineering**: Discrete task of writing a prompt

**Context Engineering**: Iterative curation that happens each time we decide what to pass to the model

**Core Question**: "What configuration of context is most likely to generate our model's desired behavior?"

### The Mental Model

**Context Engineering**: Thinking in context—considering the holistic state available to the LLM at any given time and what potential behaviors that state might yield.

---

## Why Context Engineering Matters

### The Fundamental Constraint: Attention Budget

**The Problem**: LLMs, like humans, lose focus or experience confusion at a certain point.

**Context Rot**: As the number of tokens in the context window increases, the model's ability to accurately recall information from that context decreases.

**Key Characteristics**:
- Some models exhibit more gentle degradation than others
- This characteristic emerges across all models
- Context must be treated as a finite resource with diminishing marginal returns

**Human Analogy**: Like humans with limited working memory capacity, LLMs have an "attention budget" that they draw on when parsing large volumes of context. Every new token introduced depletes this budget by some amount.

### Architectural Constraints

**Transformer Architecture**:
- Enables every token to attend to every other token across entire context
- Results in n² pairwise relationships for n tokens
- As context length increases, ability to capture these relationships gets stretched thin

**Training Data Distribution**:
- Models develop attention patterns from training data
- Shorter sequences are typically more common than longer ones
- Models have less experience with, and fewer specialized parameters for, context-wide dependencies

**Position Encoding Interpolation**:
- Allows models to handle longer sequences
- Adapts them to originally trained smaller context
- Results in some degradation in token position understanding

**Result**: Performance gradient rather than hard cliff—models remain highly capable at longer contexts but may show reduced precision for information retrieval and long-range reasoning compared to shorter contexts.

### The Implication

**Thoughtful context engineering is essential for building capable agents.**

---

## The Anatomy of Effective Context

### Guiding Principle

**Find the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome.**

### Component 1: System Prompts

**Principle**: Extremely clear, simple, direct language that presents ideas at the right altitude for the agent.

**The Goldilocks Zone**: Balance between two failure modes:

1. **Too Specific (Brittle)**:
   - Hardcoding complex, brittle logic in prompts
   - Elicits exact agentic behavior
   - Creates fragility
   - Increases maintenance complexity over time

2. **Too Vague (Unclear)**:
   - Vague, high-level guidance
   - Fails to give LLM concrete signals for desired outputs
   - Falsely assumes shared context

**Optimal Altitude**: 
- Specific enough to guide behavior effectively
- Flexible enough to provide model with strong heuristics
- Balance between precision and flexibility

**Organization**:
- Organize prompts into distinct sections
- Use XML tagging or Markdown headers to delineate sections
- Examples: `<background_information>`, `<instructions>`, `## Tool guidance`, `## Output description`
- Note: Exact formatting likely becoming less important as models become more capable

**Minimal Set Principle**:
- Strive for minimal set of information that fully outlines expected behavior
- Note: Minimal does not necessarily mean short
- Still need to give agent sufficient information up front to ensure desired behavior

**Development Process**:
1. Start with minimal prompt
2. Test with best model available
3. Add clear instructions and examples based on failure modes
4. Iterate based on initial testing

### Component 2: Tools

**Role**: Allow agents to operate with their environment and pull in new, additional context as they work.

**Importance**: Tools define the contract between agents and their information/action space.

**Design Principles**:

1. **Promote Efficiency**:
   - Return information that is token-efficient
   - Encourage efficient agent behaviors

2. **Well Understood by LLMs**:
   - Minimal overlap in functionality
   - Self-contained
   - Robust to error
   - Extremely clear with respect to intended use

3. **Clear Parameters**:
   - Input parameters should be descriptive
   - Unambiguous
   - Play to inherent strengths of the model

**Common Failure Mode**: Bloated tool sets
- Cover too much functionality
- Lead to ambiguous decision points about which tool to use
- If human engineer can't definitively say which tool to use, AI agent can't be expected to do better

**Benefit**: Curating minimal viable set of tools leads to more reliable maintenance and pruning of context over long interactions.

### Component 3: Examples (Few-Shot Prompting)

**Principle**: Providing examples is a well-known best practice.

**Common Mistake**: Stuffing a laundry list of edge cases into a prompt
- Attempts to articulate every possible rule
- Not recommended

**Recommended Approach**: Curate a set of diverse, canonical examples
- Effectively portray expected behavior of the agent
- Examples are the "pictures" worth a thousand words for LLMs

**Key**: Quality over quantity—diverse, canonical examples beat exhaustive edge cases.

### Overall Guidance

**Across all components** (system prompts, tools, examples, message history, etc.):
- Be thoughtful
- Keep context informative, yet tight
- Find smallest set of high-signal tokens

---

## Context Retrieval and Agentic Search

### The Agent Definition

**Simple Definition**: LLMs autonomously using tools in a loop.

**Evolution**: As underlying models become more capable, level of autonomy scales—smarter models allow agents to independently navigate nuanced problem spaces and recover from errors.

### The Shift: From Pre-Inference to Just-In-Time

**Traditional Approach**: Embedding-based pre-inference time retrieval
- Pre-process all relevant data up front
- Surface important context for agent to reason over

**Agentic Approach**: "Just in time" context strategies
- Maintain lightweight identifiers (file paths, stored queries, web links, etc.)
- Use these references to dynamically load data into context at runtime using tools
- Agent navigates and retrieves data autonomously

### How Just-In-Time Works

**Process**:
1. Agent maintains lightweight identifiers
2. Agent uses tools to dynamically load data at runtime
3. Agent writes targeted queries
4. Agent stores results
5. Agent leverages commands like `head` and `tail` to analyze large volumes without loading full data objects into context

**Example**: Complex data analysis over large databases
- Model writes targeted queries
- Stores results
- Uses Bash commands to analyze without loading full data

**Human Analogy**: We don't memorize entire corpuses of information, but rather introduce external organization and indexing systems like file systems, inboxes, and bookmarks to retrieve relevant information on demand.

### Metadata as Signal

**Beyond Storage Efficiency**: Metadata of references provides mechanism to efficiently refine behavior

**Signals**:
- **File names**: `test_utils.py` in `tests/` folder implies different purpose than same name in `src/core_logic/`
- **Folder hierarchies**: Organization provides purpose signals
- **Naming conventions**: Hint at purpose
- **Timestamps**: Can be proxy for relevance

**Benefit**: Helps both humans and agents understand how and when to utilize information.

### Progressive Disclosure

**Concept**: Letting agents navigate and retrieve data autonomously enables progressive disclosure—agents incrementally discover relevant context through exploration.

**How It Works**:
- Each interaction yields context that informs next decision
- File sizes suggest complexity
- Naming conventions hint at purpose
- Timestamps indicate relevance
- Agents assemble understanding layer by layer
- Maintain only what's necessary in working memory
- Leverage note-taking strategies for additional persistence

**Benefit**: Self-managed context window keeps agent focused on relevant subsets rather than drowning in exhaustive but potentially irrelevant information.

### Trade-offs

**Advantages**:
- Storage efficiency
- Focus on relevant information
- Avoids stale indexing
- Handles dynamic content

**Disadvantages**:
- Runtime exploration is slower than retrieving pre-computed data
- Requires opinionated and thoughtful engineering
- Needs right tools and heuristics for effective navigation
- Without proper guidance, agent can waste context by:
  - Misusing tools
  - Chasing dead-ends
  - Failing to identify key information

### Hybrid Strategy

**Concept**: Most effective agents might employ hybrid strategy—retrieving some data up front for speed, and pursuing further autonomous exploration at its discretion.

**Decision Boundary**: Depends on the task

**Example**: Some files dropped into context up front (like `CLAUDE.md` files), while primitives like `glob` and `grep` allow navigation and retrieval just-in-time

**Benefits**:
- Speed where needed (pre-loaded critical context)
- Flexibility where needed (just-in-time exploration)
- Bypasses issues of stale indexing
- Avoids complex syntax trees

**When to Use**:
- Better suited for contexts with less dynamic content (legal, finance work)
- As model capabilities improve, agentic design will trend towards letting intelligent models act intelligently
- Progressively less human curation needed

**Guidance**: "Do the simplest thing that works" will likely remain best advice for teams building agents.

---

## Context Engineering for Long-Horizon Tasks

### The Challenge

**Long-Horizon Tasks**: Require agents to maintain coherence, context, and goal-directed behavior over sequences of actions where token count exceeds LLM's context window.

**Examples**:
- Large codebase migrations
- Comprehensive research projects
- Tasks spanning tens of minutes to multiple hours of continuous work

**Requirement**: Specialized techniques to work around context window size limitation.

### Why Not Just Wait for Larger Context Windows?

**Reality**: For foreseeable future, context windows of all sizes will be subject to:
- Context pollution
- Information relevance concerns
- At least for situations where strongest agent performance is desired

**Solution**: Address context pollution constraints directly with specialized techniques.

### Technique 1: Compaction

**Concept**: Practice of taking a conversation nearing the context window limit, summarizing its contents, and reinitiating a new context window with the summary.

**Role**: Typically serves as first lever in context engineering to drive better long-term coherence.

**Core Function**: Distills contents of context window in high-fidelity manner, enabling agent to continue with minimal performance degradation.

**Implementation Example**:
- Pass message history to model to summarize and compress most critical details
- Model preserves:
  - Architectural decisions
  - Unresolved bugs
  - Implementation details
- Model discards:
  - Redundant tool outputs
  - Redundant messages
- Agent continues with compressed context plus most recently accessed files

**Benefit**: Users get continuity without worrying about context window limitations.

### The Art of Compaction

**Challenge**: Selection of what to keep versus what to discard

**Risk**: Overly aggressive compaction can result in loss of subtle but critical context whose importance only becomes apparent later.

**Recommendation for Engineers**:
1. Carefully tune your prompt on complex agent traces
2. Start by maximizing recall—ensure compaction prompt captures every relevant piece of information from trace
3. Iterate to improve precision by eliminating superfluous content

**Low-Hanging Fruit**: Tool result clearing
- Once a tool has been called deep in message history, why would agent need to see raw result again?
- One of safest, lightest touch forms of compaction
- Clear tool calls and results that are no longer needed

### Technique 2: Structured Note-Taking (Agentic Memory)

**Concept**: Technique where agent regularly writes notes persisted to memory outside of the context window. These notes get pulled back into context window at later times.

**Benefits**:
- Provides persistent memory with minimal overhead
- Allows agent to track progress across complex tasks
- Maintains critical context and dependencies that would otherwise be lost across dozens of tool calls

**Simple Pattern**: Agent maintains a `NOTES.md` file or similar
- Tracks progress
- Maintains critical context
- Records dependencies

**Example**: Agent playing complex game
- Maintains precise tallies across thousands of game steps
- Tracks objectives: "for the last 1,234 steps I've been training my Pokémon in Route 1, Pikachu has gained 8 levels toward the target of 10"
- Develops maps of explored regions
- Remembers which key achievements unlocked
- Maintains strategic notes of combat strategies
- Learns which attacks work best against different opponents

**After Context Resets**: Agent reads its own notes and continues multi-hour training sequences or explorations

**Result**: Coherence across summarization steps enables long-horizon strategies that would be impossible when keeping all information in LLM's context window alone.

**Implementation**: File-based system
- Store and consult information outside context window
- Build up knowledge bases over time
- Maintain project state across sessions
- Reference previous work without keeping everything in context

### Technique 3: Sub-Agent Architectures

**Concept**: Rather than one agent attempting to maintain state across entire project, specialized sub-agents handle focused tasks with clean context windows.

**How It Works**:
- Main agent coordinates with high-level plan
- Subagents perform deep technical work or use tools to find relevant information
- Each subagent might explore extensively (tens of thousands of tokens or more)
- Returns only condensed, distilled summary of its work (often 1,000-2,000 tokens)

**Benefits**:
- Clear separation of concerns
- Detailed search context remains isolated within sub-agents
- Lead agent focuses on synthesizing and analyzing results
- Substantial improvement over single-agent systems on complex research tasks

**Pattern**: Main agent → Subagents → Summarized results → Main agent synthesis

### Choosing the Right Technique

**Decision Factors**: Depends on task characteristics

**Compaction**:
- Maintains conversational flow
- Best for tasks requiring extensive back-and-forth

**Note-Taking**:
- Excels for iterative development
- Best for tasks with clear milestones

**Multi-Agent Architectures**:
- Handle complex research and analysis
- Best when parallel exploration pays dividends

**Future**: Even as models continue to improve, challenge of maintaining coherence across extended interactions will remain central to building more effective agents.

---

## Key Principles Summary

### 1. Context as Finite Resource

**Principle**: Context must be treated as a finite resource with diminishing marginal returns.

**Implication**: Every token matters—find smallest set of high-signal tokens.

### 2. Attention Budget

**Principle**: LLMs have limited "attention budget" that depletes with each new token.

**Implication**: Thoughtful curation is essential for capable agents.

### 3. Right Altitude for System Prompts

**Principle**: Balance between too specific (brittle) and too vague (unclear).

**Implication**: Specific enough to guide, flexible enough to adapt.

### 4. Minimal Viable Tool Sets

**Principle**: Tools should be well-understood, self-contained, and clear.

**Implication**: Avoid bloated tool sets—curate minimal viable set.

### 5. Quality Examples Over Quantity

**Principle**: Diverse, canonical examples beat exhaustive edge cases.

**Implication**: Examples are "pictures worth a thousand words."

### 6. Just-In-Time Context Retrieval

**Principle**: Let agents navigate and retrieve data autonomously at runtime.

**Implication**: Progressive disclosure enables focused context management.

### 7. Hybrid Strategies

**Principle**: Combine pre-loaded critical context with just-in-time exploration.

**Implication**: Balance speed and flexibility based on task needs.

### 8. Long-Horizon Techniques

**Principle**: Use compaction, note-taking, or sub-agents for extended tasks.

**Implication**: Choose technique based on task characteristics.

---

## Best Practices Summary

### System Prompts
- Extremely clear, simple, direct language
- Right altitude: specific enough to guide, flexible enough to adapt
- Organize into distinct sections
- Start minimal, add based on failure modes

### Tools
- Promote efficiency (token-efficient, encourage efficient behaviors)
- Well-understood by LLMs (minimal overlap, self-contained, clear)
- Descriptive, unambiguous parameters
- Curate minimal viable set

### Examples
- Diverse, canonical examples
- Quality over quantity
- Avoid exhaustive edge cases

### Context Retrieval
- Enable just-in-time loading
- Use metadata as signal
- Support progressive disclosure
- Consider hybrid strategies

### Long-Horizon Tasks
- Use compaction for conversational flow
- Use note-taking for iterative development
- Use sub-agents for parallel exploration
- Choose technique based on task characteristics

---

## Conclusion

**Context Engineering** represents a fundamental shift in how we build with LLMs.

**Core Challenge**: As models become more capable, the challenge isn't just crafting the perfect prompt—it's thoughtfully curating what information enters the model's limited attention budget at each step.

**Guiding Principle**: Find the smallest set of high-signal tokens that maximize the likelihood of your desired outcome.

**Techniques Evolve**: The techniques outlined will continue evolving as models improve. Smarter models require less prescriptive engineering, allowing agents to operate with more autonomy.

**Constant**: Even as capabilities scale, treating context as a precious, finite resource will remain central to building reliable, effective agents.

---

## Conceptual Patterns

### Pattern 1: Progressive Context Loading

**Structure**: Lightweight identifiers → Runtime loading → Progressive disclosure

**Application**: Context retrieval and agentic search

**Benefit**: Focused context management

### Pattern 2: Compaction Cycle

**Structure**: Context approaches limit → Summarize → Reinitiate with summary

**Application**: Long-horizon tasks requiring conversational flow

**Benefit**: Continuity without context overflow

### Pattern 3: Structured Memory

**Structure**: Agent writes notes → Persists outside context → Pulls back when needed

**Application**: Long-horizon tasks with clear milestones

**Benefit**: Persistent memory with minimal overhead

### Pattern 4: Sub-Agent Isolation

**Structure**: Main agent → Subagents (isolated context) → Summarized results → Synthesis

**Application**: Complex research and analysis

**Benefit**: Separation of concerns, parallel exploration

### Pattern 5: Hybrid Retrieval

**Structure**: Pre-load critical context + Just-in-time exploration

**Application**: Tasks needing both speed and flexibility

**Benefit**: Balance of efficiency and adaptability

---

## Summary

Context engineering is the art and science of curating what will go into the limited context window from a constantly evolving universe of possible information.

**Key Concepts**:
1. **Context as finite resource** with attention budget constraints
2. **Minimal high-signal tokens** maximize desired outcomes
3. **Just-in-time retrieval** enables progressive disclosure
4. **Long-horizon techniques** maintain coherence across extended interactions
5. **Iterative curation** happens each time we decide what to pass to the model

**The Shift**: From writing perfect prompts to thoughtfully curating context state at each step.

**The Future**: Techniques will evolve, but treating context as precious, finite resource remains central to building reliable, effective agents.

