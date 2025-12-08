# Multi-Agent Research Systems - Content Draft

**Source**: Anthropic article on Building Multi-Agent Research System (conceptual content extracted)
**Status**: Draft - awaiting organization
**Note**: Content focuses on concepts and patterns, not product-specific features

---

## Benefits of Multi-Agent Systems

### The Research Challenge

**Open-Ended Problems**: Research work involves open-ended problems where it's very difficult to predict required steps in advance.

**Why Hardcoding Fails**: Can't hardcode a fixed path for exploring complex topics, as the process is inherently dynamic and path-dependent.

**Human Research Pattern**: People continuously update their approach based on discoveries, following leads that emerge during investigation.

### Why Agents Are Well-Suited

**Flexibility**: Research demands flexibility to pivot or explore tangential connections as investigation unfolds.

**Autonomy**: Model must operate autonomously for many turns, making decisions about which directions to pursue based on intermediate findings.

**Limitation of Linear Pipelines**: Linear, one-shot pipeline cannot handle these tasks.

### How Multi-Agent Systems Help

**Compression Through Parallelism**: 
- Essence of search is compression: distilling insights from vast corpus
- Subagents facilitate compression by operating in parallel with their own context windows
- Explore different aspects of question simultaneously
- Condense most important tokens for lead research agent

**Separation of Concerns**:
- Each subagent provides distinct tools, prompts, and exploration trajectories
- Reduces path dependency
- Enables thorough, independent investigations

**Collective Intelligence**:
- Once intelligence reaches threshold, multi-agent systems become vital way to scale performance
- Analogy: Human societies have become exponentially more capable in information age because of collective intelligence and ability to coordinate
- Even generally-intelligent agents face limits when operating as individuals
- Groups of agents can accomplish far more

### Performance Evidence

**Internal Evaluations**: Multi-agent research systems excel especially for breadth-first queries that involve pursuing multiple independent directions simultaneously

**Results**: Multi-agent system with Opus 4 as lead agent and Sonnet 4 subagents outperformed single-agent Opus 4 by 90.2% on internal research eval

**Example**: When asked to identify all board members of companies in Information Technology S&P 500:
- Multi-agent system: Found correct answers by decomposing into tasks for subagents
- Single agent system: Failed to find answer with slow, sequential searches

### Why Multi-Agent Systems Work

**Token Usage**: Multi-agent systems work mainly because they help spend enough tokens to solve the problem

**Analysis Findings**: Three factors explained 95% of performance variance in evaluation:
1. **Token usage**: Explains 80% of variance by itself
2. **Number of tool calls**: Additional explanatory factor
3. **Model choice**: Additional explanatory factor

**Architecture Validation**: Finding validates architecture that distributes work across agents with separate context windows to add more capacity for parallel reasoning

**Model Upgrades**: Latest models act as large efficiency multipliers on token use—upgrading to newer model is larger performance gain than doubling token budget on older model

**Scaling**: Multi-agent architectures effectively scale token usage for tasks that exceed limits of single agents

### Trade-offs

**Token Cost**: 
- Agents typically use about 4× more tokens than chat interactions
- Multi-agent systems use about 15× more tokens than chats
- For economic viability, multi-agent systems require tasks where value is high enough to pay for increased performance

**Not Suitable For**:
- Domains requiring all agents to share same context
- Tasks involving many dependencies between agents
- Most coding tasks (fewer truly parallelizable tasks than research)
- Real-time coordination and delegation (LLM agents not yet great at this)

**Best Fit**: Multi-agent systems excel at valuable tasks that involve:
- Heavy parallelization
- Information that exceeds single context windows
- Interfacing with numerous complex tools

---

## Architecture Overview: Orchestrator-Worker Pattern

### Pattern Description

**Architecture**: Multi-agent architecture with orchestrator-worker pattern
- Lead agent coordinates the process
- Delegates to specialized subagents that operate in parallel

### Workflow

**User Query** → **Lead Agent**:
- Analyzes query
- Develops strategy
- Spawns subagents to explore different aspects simultaneously

**Subagents**:
- Act as intelligent filters
- Iteratively use search tools to gather information
- Return condensed results to lead agent

**Lead Agent**:
- Compiles final answer from subagent results

### Comparison to Traditional RAG

**Traditional RAG**: 
- Uses static retrieval
- Fetches set of chunks most similar to input query
- Uses these chunks to generate response

**Multi-Agent Architecture**:
- Uses multi-step search
- Dynamically finds relevant information
- Adapts to new findings
- Analyzes results to formulate high-quality answers

### Complete Workflow

1. **User Query**: User submits query

2. **LeadResearcher Agent Created**: 
   - Enters iterative research process
   - Begins by thinking through approach
   - Saves plan to Memory to persist context (important if context window exceeds limit and gets truncated)

3. **Subagents Created**: 
   - LeadResearcher creates specialized Subagents with specific research tasks
   - Can be any number of subagents (two shown in example, but flexible)

4. **Subagent Work**:
   - Each Subagent independently performs web searches
   - Evaluates tool results using interleaved thinking
   - Returns findings to LeadResearcher

5. **Synthesis**:
   - LeadResearcher synthesizes results
   - Decides whether more research needed
   - If so, can create additional subagents or refine strategy

6. **Citation Agent**:
   - Once sufficient information gathered, system exits research loop
   - Passes all findings to CitationAgent
   - CitationAgent processes documents and research report
   - Identifies specific locations for citations
   - Ensures all claims properly attributed to sources

7. **Final Results**: 
   - Research results complete with citations returned to user

---

## Prompt Engineering Principles for Multi-Agent Systems

### Key Differences from Single-Agent Systems

**Coordination Complexity**: Multi-agent systems have rapid growth in coordination complexity

**Early Failure Modes**:
- Spawning 50 subagents for simple queries
- Scouring web endlessly for nonexistent sources
- Distracting each other with excessive updates

**Primary Lever**: Since each agent is steered by a prompt, prompt engineering was primary lever for improving behaviors

### Principle 1: Think Like Your Agents

**To Iterate on Prompts**: Must understand their effects

**Approach**: Build simulations using exact prompts and tools from system, then watch agents work step-by-step

**Reveals Failure Modes**:
- Agents continuing when they already had sufficient results
- Using overly verbose search queries
- Selecting incorrect tools

**Key**: Effective prompting relies on developing accurate mental model of the agent, which can make most impactful changes obvious

### Principle 2: Teach the Orchestrator How to Delegate

**Challenge**: Lead agent decomposes queries into subtasks and describes them to subagents

**What Each Subagent Needs**:
- Objective
- Output format
- Guidance on tools and sources to use
- Clear task boundaries

**Without Detailed Task Descriptions**:
- Agents duplicate work
- Leave gaps
- Fail to find necessary information

**Early Approach**: Allowed lead agent to give simple, short instructions like "research the semiconductor shortage"

**Problem**: Instructions often vague enough that subagents:
- Misinterpreted the task
- Performed exact same searches as other agents

**Example Failure**: 
- One subagent explored 2021 automotive chip crisis
- Two others duplicated work investigating current 2025 supply chains
- No effective division of labor

**Solution**: Provide detailed task descriptions with clear boundaries and objectives

### Principle 3: Scale Effort to Query Complexity

**Problem**: Agents struggle to judge appropriate effort for different tasks

**Solution**: Embed scaling rules in prompts

**Guidelines**:
- **Simple fact-finding**: 1 agent with 3-10 tool calls
- **Direct comparisons**: 2-4 subagents with 10-15 calls each
- **Complex research**: More than 10 subagents with clearly divided responsibilities

**Benefit**: Explicit guidelines help lead agent allocate resources efficiently and prevent overinvestment in simple queries (common failure mode in early versions)

### Principle 4: Tool Design and Selection Are Critical

**Principle**: Agent-tool interfaces are as critical as human-computer interfaces

**Why Critical**: Using right tool is efficient—often, it's strictly necessary

**Example**: Agent searching web for context that only exists in Slack is doomed from start

**Challenge with MCP**: With MCP servers giving model access to external tools, problem compounds:
- Agents encounter unseen tools
- Tool descriptions of wildly varying quality

**Solution**: Give agents explicit heuristics:
- Examine all available tools first
- Match tool usage to user intent
- Search web for broad external exploration
- Prefer specialized tools over generic ones

**Critical**: Bad tool descriptions can send agents down completely wrong paths
- Each tool needs distinct purpose
- Each tool needs clear description

### Principle 5: Let Agents Improve Themselves

**Finding**: Claude 4 models can be excellent prompt engineers

**Process**: When given prompt and failure mode, they can:
- Diagnose why agent is failing
- Suggest improvements

**Tool-Testing Agent**: Created agent that:
- Given flawed MCP tool, attempts to use it
- Rewrites tool description to avoid failures
- Tests tool dozens of times
- Finds key nuances and bugs

**Result**: Process for improving tool ergonomics resulted in 40% decrease in task completion time for future agents using new description, because they were able to avoid most mistakes

### Principle 6: Start Wide, Then Narrow Down

**Problem**: Agents often default to overly long, specific queries that return few results

**Solution**: Counteract tendency by prompting agents to:
- Start with short, broad queries
- Evaluate what's available
- Progressively narrow focus

**Strategy**: Search strategy should mirror expert human research—explore landscape before drilling into specifics

### Principle 7: Guide the Thinking Process

**Extended Thinking Mode**: Leads agent to output additional tokens in visible thinking process, serving as controllable scratchpad

**Lead Agent Uses Thinking To**:
- Plan approach
- Assess which tools fit the task
- Determine query complexity and subagent count
- Define each subagent's role

**Testing Results**: Extended thinking improved:
- Instruction-following
- Reasoning
- Efficiency

**Subagents Also Use Thinking**:
- Plan first
- Use interleaved thinking after tool results
- Evaluate quality
- Identify gaps
- Refine next query

**Benefit**: Makes subagents more effective in adapting to any task

### Principle 8: Parallel Tool Calling Transforms Performance

**Challenge**: Complex research tasks naturally involve exploring many sources

**Early Approach**: Agents executed sequential searches—painfully slow

**Solution**: Introduced two kinds of parallelization:
1. Lead agent spins up 3-5 subagents in parallel rather than serially
2. Subagents use 3+ tools in parallel

**Result**: Cut research time by up to 90% for complex queries
- Allows Research to do more work in minutes instead of hours
- Covers more information than other systems

### Overall Prompting Strategy

**Focus**: Instilling good heuristics rather than rigid rules

**Approach**: Studied how skilled humans approach research tasks and encoded these strategies in prompts:
- Decomposing difficult questions into smaller tasks
- Carefully evaluating quality of sources
- Adjusting search approaches based on new information
- Recognizing when to focus on depth (investigating one topic in detail) vs. breadth (exploring many topics in parallel)

**Guardrails**: Proactively mitigated unintended side effects by setting explicit guardrails to prevent agents from spiraling out of control

**Iteration**: Focused on fast iteration loop with observability and test cases

---

## Effective Evaluation of Multi-Agent Systems

### Unique Challenges

**Traditional Evaluations**: Assume AI follows same steps each time
- Given input X, system should follow path Y to produce output Z

**Multi-Agent Systems**: Don't work this way
- Even with identical starting points, agents might take completely different valid paths to reach goal
- One agent might search three sources while another searches ten
- They might use different tools to find same answer

**Challenge**: Because we don't always know what right steps are, we usually can't just check if agents followed "correct" steps we prescribed in advance

**Solution**: Need flexible evaluation methods that judge whether agents achieved right outcomes while also following reasonable process

### Strategy 1: Start Evaluating Immediately with Small Samples

**Early Development**: Changes tend to have dramatic impacts because there is abundant low-hanging fruit
- Prompt tweak might boost success rates from 30% to 80%

**With Large Effect Sizes**: Can spot changes with just few test cases

**Approach**: Started with set of about 20 queries representing real usage patterns
- Testing these queries often allowed clearly seeing impact of changes

**Common Mistake**: AI developer teams delay creating evals because they believe only large evals with hundreds of test cases are useful

**Recommendation**: Best to start with small-scale testing right away with few examples, rather than delaying until you can build more thorough evals

### Strategy 2: LLM-as-Judge Evaluation Scales When Done Well

**Challenge**: Research outputs are difficult to evaluate programmatically
- Free-form text
- Rarely have single correct answer

**Solution**: LLMs are natural fit for grading outputs

**Implementation**: Used LLM judge that evaluated each output against criteria in rubric:
- **Factual accuracy**: Do claims match sources?
- **Citation accuracy**: Do cited sources match the claims?
- **Completeness**: Are all requested aspects covered?
- **Source quality**: Did it use primary sources over lower-quality secondary sources?
- **Tool efficiency**: Did it use right tools reasonable number of times?

**Experimentation**: Tried multiple judges to evaluate each component

**Finding**: Single LLM call with single prompt outputting scores from 0.0-1.0 and pass-fail grade was most consistent and aligned with human judgements

**Especially Effective**: When eval test cases did have clear answer, could use LLM judge to simply check if answer was correct (e.g., did it accurately list pharma companies with top 3 largest R&D budgets?)

**Benefit**: Using LLM as judge allowed scalably evaluating hundreds of outputs

### Strategy 3: Human Evaluation Catches What Automation Misses

**Value**: People testing agents find edge cases that evals miss

**Examples**:
- Hallucinated answers on unusual queries
- System failures
- Subtle source selection biases

**Case Study**: Human testers noticed early agents consistently chose SEO-optimized content farms over authoritative but less highly-ranked sources like academic PDFs or personal blogs

**Solution**: Adding source quality heuristics to prompts helped resolve issue

**Principle**: Even in world of automated evaluations, manual testing remains essential

### Multi-Agent System Emergent Behaviors

**Challenge**: Multi-agent systems have emergent behaviors, which arise without specific programming

**Example**: Small changes to lead agent can unpredictably change how subagents behave

**Implication**: Success requires understanding interaction patterns, not just individual agent behavior

**Solution**: Best prompts for these agents are not just strict instructions, but frameworks for collaboration that define:
- Division of labor
- Problem-solving approaches
- Effort budgets

**Requirements**: Getting this right relies on:
- Careful prompting and tool design
- Solid heuristics
- Observability
- Tight feedback loops

---

## Production Reliability and Engineering Challenges

### The Challenge: Cascading Behavioral Changes

**Traditional Software**: Bug might break feature, degrade performance, or cause outages

**Agentic Systems**: Minor changes cascade into large behavioral changes
- Makes it remarkably difficult to write code for complex agents
- Must maintain state in long-running process

### Challenge 1: Agents Are Stateful and Errors Compound

**Problem**: Agents can run for long periods of time, maintaining state across many tool calls

**Requirements**:
- Need to durably execute code
- Handle errors along the way

**Without Effective Mitigations**: Minor system failures can be catastrophic for agents

**Restart Problem**: When errors occur, can't just restart from beginning
- Restarts are expensive
- Frustrating for users

**Solution**: Built systems that can resume from where agent was when errors occurred

**Combined Approach**: Combine adaptability of AI agents with deterministic safeguards:
- Retry logic
- Regular checkpoints
- Let agent know when tool is failing and let it adapt (works surprisingly well)

### Challenge 2: Debugging Benefits from New Approaches

**Problem**: Agents make dynamic decisions and are non-deterministic between runs, even with identical prompts

**Makes Debugging Harder**: 
- Users would report agents "not finding obvious information"
- But couldn't see why
- Were agents using bad search queries?
- Choosing poor sources?
- Hitting tool failures?

**Solution**: Adding full production tracing let us:
- Diagnose why agents failed
- Fix issues systematically

**Beyond Standard Observability**: Monitor agent decision patterns and interaction structures
- All without monitoring contents of individual conversations (maintains user privacy)
- High-level observability helped diagnose root causes
- Discover unexpected behaviors
- Fix common failures

### Challenge 3: Deployment Needs Careful Coordination

**Problem**: Agent systems are highly stateful webs of prompts, tools, and execution logic that run almost continuously

**Implication**: Whenever we deploy updates, agents might be anywhere in their process

**Requirement**: Need to prevent well-meaning code changes from breaking existing agents

**Can't Update All at Once**: Can't update every agent to new version at same time

**Solution**: Use rainbow deployments to avoid disrupting running agents
- Gradually shift traffic from old to new versions
- Keep both running simultaneously

### Challenge 4: Synchronous Execution Creates Bottlenecks

**Current Approach**: Lead agents execute subagents synchronously
- Wait for each set of subagents to complete before proceeding

**Benefit**: Simplifies coordination

**Drawbacks**:
- Creates bottlenecks in information flow between agents
- Lead agent can't steer subagents
- Subagents can't coordinate
- Entire system can be blocked while waiting for single subagent to finish searching

**Future**: Asynchronous execution would enable additional parallelism:
- Agents working concurrently
- Creating new subagents when needed

**Trade-off**: Asynchronicity adds challenges in:
- Result coordination
- State consistency
- Error propagation across subagents

**Expectation**: As models can handle longer and more complex research tasks, expect performance gains will justify complexity

---

## Additional Tips (Appendix)

### Tip 1: End-State Evaluation for State-Mutating Agents

**Challenge**: Evaluating agents that modify persistent state across multi-turn conversations presents unique challenges

**Difference from Read-Only**: Unlike read-only research tasks, each action can change environment for subsequent steps, creating dependencies that traditional evaluation methods struggle to handle

**Solution**: Focus on end-state evaluation rather than turn-by-turn analysis

**Approach**:
- Instead of judging whether agent followed specific process, evaluate whether it achieved correct final state
- Acknowledges agents may find alternative paths to same goal
- Still ensures they deliver intended outcome

**For Complex Workflows**: Break evaluation into discrete checkpoints where specific state changes should have occurred, rather than attempting to validate every intermediate step

### Tip 2: Long-Horizon Conversation Management

**Challenge**: Production agents often engage in conversations spanning hundreds of turns, requiring careful context management strategies

**Problem**: As conversations extend, standard context windows become insufficient

**Solution**: Intelligent compression and memory mechanisms

**Patterns Implemented**:
- Agents summarize completed work phases
- Store essential information in external memory before proceeding to new tasks
- When context limits approach, agents can spawn fresh subagents with clean contexts
- Maintain continuity through careful handoffs
- Retrieve stored context like research plan from memory rather than losing previous work when reaching context limit

**Benefit**: Distributed approach prevents context overflow while preserving conversation coherence across extended interactions

### Tip 3: Subagent Output to Filesystem to Minimize 'Game of Telephone'

**Problem**: Direct subagent outputs can lose fidelity through multi-stage processing

**Solution**: Implement artifact systems where specialized agents can create outputs that persist independently

**How It Works**:
- Subagents call tools to store their work in external systems
- Pass lightweight references back to coordinator
- Rather than requiring subagents to communicate everything through lead agent

**Benefits**:
- Prevents information loss during multi-stage processing
- Reduces token overhead from copying large outputs through conversation history
- Pattern works particularly well for structured outputs like:
  - Code
  - Reports
  - Data visualizations
- Subagent's specialized prompt produces better results than filtering through general coordinator

---

## Key Principles Summary

### Architecture Principles

1. **Orchestrator-Worker Pattern**: Lead agent coordinates, subagents work in parallel
2. **Dynamic Search**: Multi-step search that adapts to findings vs. static retrieval
3. **Separation of Concerns**: Each subagent has distinct tools, prompts, exploration trajectories
4. **Compression Through Parallelism**: Subagents explore simultaneously, condense important tokens

### Prompt Engineering Principles

1. **Think Like Your Agents**: Understand effects through simulation
2. **Teach Delegation**: Detailed task descriptions with clear boundaries
3. **Scale Effort**: Explicit guidelines for resource allocation
4. **Tool Design Critical**: Clear descriptions, explicit heuristics
5. **Self-Improvement**: Let agents improve their own prompts and tool descriptions
6. **Start Wide, Narrow Down**: Broad queries first, then focus
7. **Guide Thinking**: Use extended thinking mode for planning
8. **Parallel Execution**: Parallelize both subagent creation and tool calls

### Evaluation Principles

1. **Start Small**: Begin with 20 queries, don't wait for large evals
2. **LLM-as-Judge**: Single judge with rubric for scalable evaluation
3. **Human Testing**: Essential for catching edge cases
4. **End-State Focus**: Evaluate outcomes, not specific paths
5. **Flexible Methods**: Judge outcomes and reasonable process, not prescribed steps

### Production Principles

1. **Stateful Error Handling**: Resume from checkpoints, don't restart
2. **Full Tracing**: Monitor decision patterns and interaction structures
3. **Rainbow Deployments**: Gradual traffic shifting to avoid disruption
4. **Context Management**: Summarize, store in memory, spawn fresh subagents
5. **Artifact Systems**: Store outputs externally, pass lightweight references

---

## Conclusion

### The Last Mile Challenge

**Principle**: When building AI agents, the last mile often becomes most of the journey

**Reality**: Codebases that work on developer machines require significant engineering to become reliable production systems

**Compound Nature**: Errors in agentic systems mean minor issues for traditional software can derail agents entirely
- One step failing can cause agents to explore entirely different trajectories
- Leads to unpredictable outcomes

**Gap**: Gap between prototype and production is often wider than anticipated

### Despite Challenges, Value Proven

**Multi-Agent Systems**: Have proven valuable for open-ended research tasks

**User Benefits**:
- Find business opportunities they hadn't considered
- Navigate complex healthcare options
- Resolve thorny technical bugs
- Save up to days of work by uncovering research connections they wouldn't have found alone

### Requirements for Success

**Multi-agent research systems can operate reliably at scale with**:
- Careful engineering
- Comprehensive testing
- Detail-oriented prompt and tool design
- Robust operational practices
- Tight collaboration between research, product, and engineering teams
- Strong understanding of current agent capabilities

**Outcome**: Already seeing these systems transform how people solve complex problems

---

## Summary

Multi-agent research systems represent a powerful approach to handling open-ended, complex research tasks:

**Why They Work**:
- Enable parallel exploration with separate context windows
- Facilitate compression through distributed work
- Scale token usage effectively
- Provide separation of concerns

**Architecture**:
- Orchestrator-worker pattern
- Dynamic multi-step search
- Parallel subagent execution
- Citation and synthesis

**Key Principles**:
- Think like your agents
- Teach effective delegation
- Scale effort appropriately
- Design tools carefully
- Let agents improve themselves
- Guide thinking process
- Parallelize execution

**Evaluation**:
- Start small, scale up
- Use LLM judges with rubrics
- Include human testing
- Focus on outcomes, not paths

**Production**:
- Handle stateful errors gracefully
- Full observability
- Careful deployment coordination
- Context management strategies
- Artifact systems for outputs

**Result**: Reliable, scalable systems that transform how people solve complex problems

