# Agent Architecture Patterns and Best Practices - Content Draft

**Source**: Anthropic article on Building Agents with Claude Agent SDK (conceptual content extracted)
**Status**: Draft - awaiting organization
**Note**: Content focuses on concepts and patterns, not product-specific features

---

## Core Design Principle: Giving Agents a Computer

### The Key Insight

**Principle**: Agents need the same tools that programmers use every day.

**Capabilities Required**:
- Find appropriate files in a codebase
- Write and edit files
- Lint code
- Run code
- Debug
- Edit iteratively until code succeeds

**Extension**: By giving agents access to a computer (via terminal/filesystem), they can:
- Write code like programmers do
- Read CSV files
- Search the web
- Build visualizations
- Interpret metrics
- Do all sorts of digital work
- Create general-purpose agents

**Core Principle**: Give your agents a computer, allowing them to work like humans do.

---

## The Agent Loop Pattern

### The Fundamental Feedback Loop

Agents operate in a specific feedback loop:

**Gather Context → Take Action → Verify Work → Repeat**

This loop offers a useful way to think about:
- How agents should be structured
- What capabilities they should be given
- How to design agent workflows

### Why This Pattern Works

1. **Context Gathering**: Agent needs information to make decisions
2. **Action Taking**: Agent executes based on gathered context
3. **Verification**: Agent checks if action succeeded
4. **Iteration**: Agent repeats until goal achieved

This pattern mirrors how humans work: we gather information, take action, check results, and iterate.

---

## Phase 1: Gather Context

### The Challenge

When developing an agent, you want to give it more than just a prompt: it needs to be able to fetch and update its own context.

### Strategy 1: Agentic Search and the File System

**Concept**: The file system represents information that could be pulled into the model's context.

**How It Works**:
- When agent encounters large files (logs, user-uploaded files), it decides how to load them
- Uses bash scripts like `grep` and `tail` to selectively load content
- Folder and file structure becomes a form of context engineering

**Example**: Email agent stores previous conversations in 'Conversations' folder, allowing it to search previous conversations for context when asked about them.

**Benefits**:
- Agent controls what context it loads
- Efficient handling of large files
- File structure guides context discovery

**Key Insight**: The folder and file structure of an agent becomes a form of context engineering.

### Strategy 2: Semantic Search

**Concept**: Semantic search involves 'chunking' relevant context, embedding chunks as vectors, and querying those vectors for concepts.

**Characteristics**:
- Usually faster than agentic search
- Less accurate
- More difficult to maintain
- Less transparent

**When to Use**:
- Need faster results
- Need more variations in search
- Have well-structured, embeddable content

**Recommendation**: Start with agentic search, only add semantic search if you need faster results or more variations.

**Trade-offs**:
- Speed vs. accuracy
- Ease of maintenance vs. performance
- Transparency vs. efficiency

### Strategy 3: Subagents

**Concept**: Subagents are agents spawned by a main orchestrator agent to handle specific tasks.

**Two Main Benefits**:

1. **Parallelization**: 
   - Spin up multiple subagents to work on different tasks simultaneously
   - Enables concurrent processing

2. **Context Management**:
   - Subagents use their own isolated context windows
   - Only send relevant information back to orchestrator
   - Don't send full context
   - Ideal for tasks requiring sifting through large amounts of information where most won't be useful

**Example**: Email agent with 'search subagent' capability
- Email agent spins off multiple search subagents in parallel
- Each runs different queries against email history
- Return only relevant excerpts rather than full email threads

**Use Cases**:
- Parallel processing of independent tasks
- Filtering large information sets
- Isolating context to prevent bloat

### Strategy 4: Compaction

**Concept**: When agents run for long periods, context maintenance becomes critical.

**How It Works**:
- Automatically summarizes previous messages when context limit approaches
- Prevents agent from running out of context
- Maintains conversation history in condensed form

**When Needed**:
- Long-running agent sessions
- Extended conversations
- Complex multi-step workflows

**Benefit**: Enables agents to work indefinitely without context overflow

---

## Phase 2: Take Action

### Overview

Once you've gathered context, you'll want to give your agent flexible ways of taking action.

### Action Mechanism 1: Tools

**Concept**: Tools are the primary building blocks of execution for your agent.

**Design Considerations**:
- Tools are prominent in agent's context window
- They are the primary actions agent will consider when deciding how to complete a task
- Should be conscious about tool design to maximize context efficiency

**Best Practices**:
- Tools should be primary actions you want your agent to take
- Design tools to be context-efficient
- Make tools composable and reusable

**Example**: Email agent might define tools like:
- `fetchInbox`
- `searchEmails`

These represent the agent's primary, most frequent actions.

**Key Principle**: Tools should represent the core capabilities you want your agent to have.

### Action Mechanism 2: Bash & Scripts

**Concept**: Bash is useful as a general-purpose tool to allow the agent to do flexible work using a computer.

**Use Cases**:
- Downloading files
- Converting formats
- Searching across files
- Running system commands
- File manipulation

**Example**: Email agent with attachments
- Agent writes code to download PDF
- Converts it to text
- Searches across it to find useful information
- All via bash commands

**Benefit**: Provides flexibility for tasks that don't fit into predefined tools

### Action Mechanism 3: Code Generation

**Concept**: Code is precise, composable, and infinitely reusable, making it an ideal output for agents that need to perform complex operations reliably.

**Why Code Generation Excels**:
- **Precision**: Code executes exactly as written
- **Composability**: Code can combine multiple operations
- **Reusability**: Code can be saved and reused
- **Reliability**: Code provides deterministic behavior

**When to Use Code Generation**:
- Tasks requiring consistent formatting
- Complex functionality difficult to achieve otherwise
- Operations that benefit from being expressed as code

**Example Applications**:
- Creating Excel spreadsheets with complex formatting
- Generating PowerPoint presentations
- Producing Word documents
- Running event-driven code (e.g., email rules)

**Key Question**: Which tasks would benefit from being expressed as code?

**Insight**: Often, the answer unlocks significant capabilities.

**Example**: Email agent allowing users to create rules for inbound emails
- Agent writes code to run on email events
- Code handles rule logic
- Provides reliable, reusable functionality

### Action Mechanism 4: Model Context Protocol (MCP)

**Concept**: MCP provides standardized integrations to external services, handling authentication and API calls automatically.

**Benefits**:
- Connect to tools like Slack, GitHub, Google Drive, Asana without custom integration code
- No need to manage OAuth flows yourself
- Pre-built integrations work out of the box

**How It Works**:
- Agent simply calls tools like `search_slack_messages` or `get_asana_tasks`
- MCP handles the rest (authentication, API calls, error handling)

**Example**: Email agent might:
- Search Slack messages to understand team context
- Check Asana tasks to see if someone has already been assigned to handle a customer request
- All via MCP servers without custom code

**Ecosystem Benefit**: Growing MCP ecosystem means you can quickly add new capabilities to your agents as pre-built integrations become available.

**Focus Shift**: Lets you focus on agent behavior rather than integration code.

---

## Phase 3: Verify Your Work

### The Importance of Verification

**Principle**: Agents that can check and improve their own output are fundamentally more reliable.

**Benefits**:
- Catch mistakes before they compound
- Self-correct when they drift
- Get better as they iterate

**Key Requirement**: Give agent concrete ways to evaluate its work.

### Verification Strategy 1: Defining Rules

**Concept**: The best form of feedback is providing clearly defined rules for an output, then explaining which rules failed and why.

**Characteristics**:
- Explicit, testable criteria
- Clear pass/fail conditions
- Actionable feedback

**Example: Code Linting**
- Code linting is an excellent form of rules-based feedback
- More in-depth feedback is better
- Example: Generate TypeScript and lint it (better than pure JavaScript)
  - Provides multiple additional layers of feedback
  - Type checking
  - Linting rules
  - Compilation errors

**Example: Email Validation**
- Check that email address is valid (if not, throw error)
- Check that user has sent email to them before (if so, throw warning)
- Clear rules with clear consequences

**Best Practices**:
- Define rules clearly
- Make rules testable
- Provide actionable feedback
- Use multiple layers of validation when possible

### Verification Strategy 2: Visual Feedback

**Concept**: When using an agent to complete visual tasks (UI generation, testing), visual feedback in the form of screenshots or renders can be helpful.

**How It Works**:
1. Agent generates visual output (e.g., HTML email)
2. System captures screenshot or render
3. Screenshot provided back to agent
4. Agent checks visual output against requirements
5. Iterative refinement based on visual feedback

**What to Check**:
- **Layout**: Are elements positioned correctly? Is spacing appropriate?
- **Styling**: Do colors, fonts, and formatting appear as intended?
- **Content hierarchy**: Is information presented in the right order with proper emphasis?
- **Responsiveness**: Does it look broken or cramped? (though single screenshot has limited viewport info)

**Automation**: Using MCP servers like Playwright, you can automate this visual feedback loop:
- Taking screenshots of rendered HTML
- Capturing different viewport sizes
- Testing interactive elements
- All within your agent's workflow

**Example**: Email agent generates HTML email
- System screenshots the rendered email
- Agent reviews screenshot
- Checks if visual output matches what was requested
- Refines if needed

**Benefit**: Catches visual issues that code-based validation might miss

### Verification Strategy 3: LLM as a Judge

**Concept**: Have another language model "judge" the output of your agent based on fuzzy rules.

**Characteristics**:
- Generally not very robust method
- Can have heavy latency tradeoffs
- Useful when any boost in performance is worth the cost

**When to Use**:
- Applications where performance boost is worth the cost
- Fuzzy criteria difficult to encode as rules
- Subjective evaluation needed

**Example**: Email agent might have separate subagent judge the tone of its drafts
- Check if tone fits well with user's previous messages
- Subjective evaluation
- Worth the latency for quality improvement

**Trade-offs**:
- Less robust than rules-based verification
- Higher latency
- Can provide nuanced feedback on fuzzy criteria

---

## Testing and Improving Your Agent

### The Iterative Process

After going through the agent loop a few times, test your agent and ensure it's well-equipped for its tasks.

**Best Approach**: Look carefully at agent's output, especially cases where it fails, and put yourself in its shoes: does it have the right tools for the job?

### Key Questions to Ask

#### 1. Missing Information

**Problem**: Agent misunderstands the task

**Question**: Can you alter the structure of your search APIs to make it easier to find what it needs to know?

**Solutions**:
- Improve context gathering mechanisms
- Restructure file organization
- Enhance search capabilities
- Add better indexing

#### 2. Repeated Failures

**Problem**: Agent fails at a task repeatedly

**Question**: Can you add a formal rule in your tool calls to identify and fix the failure?

**Solutions**:
- Add validation rules
- Implement error detection
- Create self-correction mechanisms
- Build retry logic with different approaches

#### 3. Error Recovery

**Problem**: Agent can't fix its errors

**Question**: Can you give it more useful or creative tools to approach the problem differently?

**Solutions**:
- Add alternative approaches
- Provide debugging tools
- Enable code generation for custom solutions
- Give access to different problem-solving methods

#### 4. Performance Variability

**Problem**: Agent's performance varies as you add features

**Question**: Build a representative test set for programmatic evaluations (or evals) based on customer usage.

**Solutions**:
- Create test suites
- Build evaluation frameworks
- Track performance metrics
- Use customer usage patterns to guide testing

### Improvement Cycle

1. **Observe**: Watch agent in action, especially failures
2. **Diagnose**: Identify root cause (missing info, wrong tools, etc.)
3. **Hypothesize**: What capability would fix this?
4. **Implement**: Add the capability (tool, rule, context source)
5. **Test**: Verify improvement
6. **Iterate**: Repeat cycle

---

## Agent Types Enabled by This Architecture

### Finance Agents

**Capabilities**:
- Understand portfolio and goals
- Evaluate investments
- Access external APIs
- Store data
- Run code to make calculations

**Use Cases**:
- Portfolio analysis
- Investment evaluation
- Financial planning
- Risk assessment

### Personal Assistant Agents

**Capabilities**:
- Book travel
- Manage calendar
- Schedule appointments
- Put together briefs
- Connect to internal data sources
- Track context across applications

**Use Cases**:
- Travel planning
- Calendar management
- Meeting preparation
- Information synthesis

### Customer Support Agents

**Capabilities**:
- Handle high ambiguity user requests
- Collect and review user data
- Connect to external APIs
- Message users back
- Escalate to humans when needed

**Use Cases**:
- Ticket triage
- Customer inquiries
- Issue resolution
- Escalation management

### Deep Research Agents

**Capabilities**:
- Conduct comprehensive research
- Search through file systems
- Analyze and synthesize information from multiple sources
- Cross-reference data across files
- Generate detailed reports

**Use Cases**:
- Literature reviews
- Competitive analysis
- Due diligence
- Research synthesis

### Core Principle

At its core, the architecture gives you the primitives to build agents for whatever workflow you're trying to automate.

---

## Design Patterns Summary

### Pattern 1: The Agent Loop

**Structure**: Gather Context → Take Action → Verify Work → Repeat

**Application**: Use this pattern to structure any agent workflow

**Benefits**: 
- Mirrors human work patterns
- Ensures completeness
- Enables iteration

### Pattern 2: Progressive Context Loading

**Structure**: 
- Start with file system structure
- Load files on-demand
- Use agentic search for large files
- Use semantic search for speed when needed

**Application**: Context gathering phase

**Benefits**:
- Context efficiency
- Scalability
- Flexibility

### Pattern 3: Subagent Parallelization

**Structure**:
- Main orchestrator agent
- Multiple subagents for parallel tasks
- Isolated context windows
- Return only relevant results

**Application**: When you need parallel processing or context isolation

**Benefits**:
- Performance (parallelization)
- Context efficiency (isolation)

### Pattern 4: Multi-Layer Verification

**Structure**:
- Rules-based (most robust)
- Visual feedback (for visual tasks)
- LLM judge (for fuzzy criteria)

**Application**: Verification phase

**Benefits**:
- Reliability
- Catches different types of errors
- Enables self-correction

### Pattern 5: Tool-Code Hybrid

**Structure**:
- Tools for primary actions
- Code generation for complex operations
- Bash for flexibility
- MCP for integrations

**Application**: Action-taking phase

**Benefits**:
- Flexibility
- Precision (code)
- Reusability
- Integration ease

---

## Key Principles

### 1. Give Agents a Computer

**Principle**: Agents need the same tools programmers use

**Enables**: General-purpose agents that can work like humans

### 2. Structure Around the Loop

**Principle**: Gather Context → Take Action → Verify Work → Repeat

**Enables**: Reliable, iterative agent workflows

### 3. Progressive Context Loading

**Principle**: Load context only as needed

**Enables**: Scalability and efficiency

### 4. Multiple Action Mechanisms

**Principle**: Provide tools, code generation, bash, and integrations

**Enables**: Flexibility and precision

### 5. Self-Verification

**Principle**: Agents should check and improve their own output

**Enables**: Reliability and self-correction

### 6. Iterative Improvement

**Principle**: Observe failures, diagnose, add capabilities, test, repeat

**Enables**: Continuous agent improvement

---

## Best Practices Summary

### Context Gathering
- Start with agentic search (file system)
- Add semantic search only if needed for speed
- Use subagents for parallel processing and context isolation
- Implement compaction for long-running agents

### Action Taking
- Design tools as primary actions
- Use code generation for complex, reusable operations
- Provide bash access for flexibility
- Leverage MCP for standardized integrations

### Verification
- Define clear rules with actionable feedback
- Use visual feedback for visual tasks
- Consider LLM judge for fuzzy criteria
- Layer multiple verification methods

### Testing and Improvement
- Observe agent failures carefully
- Diagnose root causes
- Add missing capabilities
- Build test suites based on real usage
- Iterate continuously

---

## Summary

Building effective agents requires:

1. **Architecture**: Structure around the agent loop (gather → act → verify → repeat)

2. **Context Management**: 
   - Progressive loading
   - Multiple search strategies
   - Subagents for isolation
   - Compaction for long sessions

3. **Action Capabilities**:
   - Well-designed tools
   - Code generation
   - Bash access
   - Standardized integrations

4. **Verification**:
   - Rules-based validation
   - Visual feedback
   - Self-judgment when needed

5. **Iteration**:
   - Observe failures
   - Diagnose problems
   - Add capabilities
   - Test improvements

The core principle: **Give your agents a computer, allowing them to work like humans do.** This unlocks the ability to build agents that are more effective than before, capable of handling complex, real-world workflows across diverse domains.

