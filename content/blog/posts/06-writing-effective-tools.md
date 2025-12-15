# Writing Effective Tools for AI Agents - Content Draft

**Source**: Anthropic article on Writing Effective Tools (conceptual content extracted)
**Status**: Draft - awaiting organization
**Note**: Content focuses on concepts and patterns, not product-specific features

---

## What is a Tool?

### The Fundamental Difference

**Traditional Software**: Contract between deterministic systems
- Function call like `getWeather("NYC")` always produces same output given identical inputs
- Predictable, deterministic behavior

**Tools for Agents**: Contract between deterministic systems and non-deterministic agents
- Agent might call weather tool, answer from general knowledge, or ask clarifying question
- Agent might hallucinate or fail to grasp how to use tool
- Varied responses even with same starting conditions

### The Paradigm Shift

**Old Approach**: Write tools and APIs the way we'd write functions for other developers or systems

**New Approach**: Design tools for agents

**Goal**: Increase the surface area over which agents can be effective in solving a wide range of tasks by using tools to pursue a variety of successful strategies

**Insight**: Tools that are most "ergonomic" for agents also end up being surprisingly intuitive to grasp as humans

---

## How to Write Tools: The Process

### Overview

Collaborate with agents both to write and to improve the tools you give them.

**Process**:
1. Stand up quick prototype of your tools
2. Test them locally
3. Run comprehensive evaluation to measure changes
4. Work alongside agents to evaluate and improve
5. Repeat until agents achieve strong performance on real-world tasks

### Step 1: Building a Prototype

**Principle**: It can be difficult to anticipate which tools agents will find ergonomic without getting hands-on yourself.

**Approach**:
- Stand up quick prototype of your tools
- If using agents to write tools, provide documentation for:
  - Software libraries
  - APIs
  - SDKs
  - LLM-friendly documentation (like `llms.txt` files)

**Testing**:
- Wrap tools in local server or extension
- Connect and test tools in agent environment
- Test tools yourself to identify rough edges
- Collect feedback from users
- Build intuition around use-cases and prompts you expect tools to enable

**Key**: Get hands-on experience before optimizing

### Step 2: Running an Evaluation

**Purpose**: Measure how well agents use your tools

**Process**:
1. Generate lots of evaluation tasks grounded in real-world uses
2. Collaborate with agent to help analyze results
3. Determine how to improve your tools

**Goal**: Systematic measurement of tool performance

#### Generating Evaluation Tasks

**Principle**: Generate lots of evaluation tasks, grounded in real-world uses

**Characteristics of Strong Tasks**:
- Inspired by real-world uses
- Based on realistic data sources and services
- Avoid overly simplistic or superficial "sandbox" environments
- Stress-test tools with sufficient complexity
- Require multiple tool calls (potentially dozens)

**Examples of Strong Tasks**:
- "Schedule a meeting with Jane next week to discuss our latest Acme Corp project. Attach the notes from our last project planning meeting and reserve a conference room."
- "Customer ID 9182 reported that they were charged three times for a single purchase attempt. Find all relevant log entries and determine if any other customers were affected by the same issue."
- "Customer Sarah Chen just submitted a cancellation request. Prepare a retention offer. Determine: (1) why they're leaving, (2) what retention offer would be most compelling, and (3) any risk factors we should be aware of before making an offer."

**Examples of Weaker Tasks**:
- "Schedule a meeting with jane@acme.corp next week."
- "Search the payment logs for purchase_complete and customer_id=9182."
- "Find the cancellation request by Customer ID 45892."

**Key**: Tasks should mirror real-world complexity and require multiple steps

**Verification**:
- Each evaluation prompt should be paired with verifiable response or outcome
- Verifier can be as simple as exact string comparison
- Or as advanced as enlisting agent to judge the response
- Avoid overly strict verifiers that reject correct responses due to:
  - Formatting differences
  - Punctuation differences
  - Valid alternative phrasings

**Optional**: Specify tools you expect agent to call
- Measure whether agents successfully grasp each tool's purpose
- However, avoid overspecifying or overfitting to strategies
- There might be multiple valid paths to solving tasks correctly

#### Running the Evaluation

**Approach**: Run evaluation programmatically with direct LLM API calls

**Structure**: Simple agentic loops (while-loops wrapping alternating LLM API and tool calls)
- One loop for each evaluation task
- Each evaluation agent given single task prompt and your tools

**System Prompt Recommendations**:
- Instruct agents to output structured response blocks (for verification)
- Also output reasoning and feedback blocks
- Instructing agents to output reasoning before tool call and response blocks may increase effective intelligence by triggering chain-of-thought (CoT) behaviors

**Metrics to Collect**:
- **Top-level accuracy**: Primary success metric
- **Total runtime**: Individual tool calls and tasks
- **Total number of tool calls**: Reveals workflow patterns
- **Total token consumption**: Efficiency metric
- **Tool errors**: Indicates tool usability issues

**Tracking Tool Calls**: Can help reveal common workflows that agents pursue and offer opportunities for tools to consolidate

#### Analyzing Results

**Principle**: Agents are helpful partners in spotting issues and providing feedback

**What to Look For**:
- Contradictory tool descriptions
- Inefficient tool implementations
- Confusing tool schemas

**Important Caveat**: What agents omit in their feedback and responses can often be more important than what they include. LLMs don't always say what they mean.

**Analysis Process**:
1. **Observe**: Where do agents get stumped or confused?
2. **Read Reasoning**: Review evaluation agents' reasoning and feedback (or CoT)
3. **Review Transcripts**: Read raw transcripts including tool calls and tool responses
4. **Read Between Lines**: Remember evaluation agents don't necessarily know correct answers and strategies

**Tool Calling Metrics Analysis**:
- **Lots of redundant tool calls**: Might suggest rightsizing of pagination or token limit parameters
- **Lots of tool errors for invalid parameters**: Might suggest tools could use clearer descriptions or better examples
- **Pattern Analysis**: Identify common mistakes or inefficiencies

**Example**: When launching web search tool, identified that agent was needlessly appending "2025" to query parameter, biasing search results and degrading performance. Fixed by improving tool description.

### Step 3: Collaborating with Agents

**Process**: Let agents analyze your results and improve your tools for you

**How**:
- Concatenate transcripts from evaluation agents
- Paste into agent environment
- Agent analyzes transcripts and refactors tools all at once
- Ensures tool implementations and descriptions remain self-consistent when new changes are made

**Result**: Most advice comes from repeatedly optimizing tool implementations with agents

**Evaluation Setup**:
- Evaluations created on top of real workspace
- Mirror complexity of real workflows
- Include real projects, documents, and messages

**Validation**:
- Rely on held-out test sets to ensure no overfitting to "training" evaluations
- Test sets revealed additional performance improvements beyond "expert" tool implementations
- Whether tools manually written by researchers or generated by agents themselves

---

## Principles for Writing Effective Tools

### Principle 1: Choosing the Right Tools for Agents

**Key Insight**: More tools don't always lead to better outcomes

**Common Error**: Tools that merely wrap existing software functionality or API endpoints—whether or not the tools are appropriate for agents

**Why It Matters**: Agents have distinct "affordances" to traditional software—different ways of perceiving potential actions they can take with those tools

#### The Context Constraint

**LLM Agents**: Limited "context" (limits to how much information they can process at once)

**Traditional Software**: Computer memory is cheap and abundant

**Example: Address Book Search**

**Traditional Software Approach**:
- Efficiently store and process list of contacts one at a time
- Check each one before moving on

**Bad Agent Tool**:
- Tool returns ALL contacts
- Agent has to read through each one token-by-token
- Wastes limited context space on irrelevant information
- Like searching address book by reading each page from top-to-bottom (brute-force search)

**Better Agent Tool**:
- Skip to relevant page first (perhaps finding it alphabetically)
- More natural approach for agents and humans alike
- Example: `search_contacts` or `message_contact` instead of `list_contacts`

#### Tool Consolidation

**Principle**: Tools can consolidate functionality, handling potentially multiple discrete operations (or API calls) under the hood

**Benefits**:
- Enrich tool responses with related metadata
- Handle frequently chained, multi-step tasks in single tool call
- Reduce context consumed by intermediate outputs

**Examples**:

**Instead of**:
- `list_users`, `list_events`, `create_event` tools

**Consider**:
- `schedule_event` tool which finds availability and schedules an event

**Instead of**:
- `read_logs` tool

**Consider**:
- `search_logs` tool which only returns relevant log lines and some surrounding context

**Instead of**:
- `get_customer_by_id`, `list_transactions`, `list_notes` tools

**Consider**:
- `get_customer_context` tool which compiles all of customer's recent & relevant information all at once

#### Design Guidelines

**Each Tool Should Have**:
- Clear, distinct purpose
- Enable agents to subdivide and solve tasks like humans would
- Reduce context that would have otherwise been consumed by intermediate outputs

**Avoid**:
- Too many tools
- Overlapping tools
- Tools that distract agents from pursuing efficient strategies

**Recommendation**: Build a few thoughtful tools targeting specific high-impact workflows, which match your evaluation tasks, and scale up from there

### Principle 2: Namespacing Your Tools

**Challenge**: AI agents will potentially gain access to dozens of servers and hundreds of different tools—including those by other developers

**Problem**: When tools overlap in function or have vague purpose, agents can get confused about which ones to use

**Solution**: Namespacing (grouping related tools under common prefixes)

**Examples**:
- Namespace by service: `asana_search`, `jira_search`
- Namespace by resource: `asana_projects_search`, `asana_users_search`

**Benefit**: Helps agents select the right tools at the right time

**Naming Scheme Considerations**:
- Selecting between prefix- and suffix-based namespacing can have non-trivial effects on tool-use evaluations
- Effects vary by LLM
- Choose naming scheme according to your own evaluations

**Common Agent Mistakes**:
- Call wrong tools
- Call right tools with wrong parameters
- Call too few tools
- Process tool responses incorrectly

**Solution**: Selectively implement tools whose names reflect natural subdivisions of tasks
- Reduces number of tools and tool descriptions loaded into agent's context
- Offloads agentic computation from agent's context back into tool calls themselves
- Reduces agent's overall risk of making mistakes

### Principle 3: Returning Meaningful Context from Your Tools

**Principle**: Tool implementations should take care to return only high-signal information back to agents

**Priorities**:
1. Prioritize contextual relevance over flexibility
2. Eschew low-level technical identifiers (e.g., `uuid`, `256px_image_url`, `mime_type`)
3. Prefer fields like `name`, `image_url`, `file_type` that directly inform agents' downstream actions and responses

#### Natural Language vs Cryptic Identifiers

**Key Finding**: Agents tend to grapple with natural language names, terms, or identifiers significantly more successfully than they do with cryptic identifiers

**Example**: Merely resolving arbitrary alphanumeric UUIDs to more semantically meaningful and interpretable language (or even 0-indexed ID scheme) significantly improves precision in retrieval tasks by reducing hallucinations

**Trade-off**: In some instances, agents may require flexibility to interact with both natural language and technical identifiers outputs, if only to trigger downstream tool calls

**Example**: `search_user(name='jane')` → `send_message(id=12345)`

**Solution**: Expose simple `response_format` enum parameter in your tool
- Allows agent to control whether tools return "concise" or "detailed" responses
- Can add more formats for even greater flexibility (similar to GraphQL)

**Example ResponseFormat Enum**:
```typescript
enum ResponseFormat {
   DETAILED = "detailed",
   CONCISE = "concise"
}
```

**Benefits**:
- "Concise" responses return only essential content (e.g., thread content, exclude IDs)
- "Detailed" responses include technical identifiers needed for downstream calls (e.g., `thread_ts`, `channel_id`, `user_id`)
- Token efficiency: concise responses can use ~⅓ of tokens

**Response Structure**: Even tool response structure (XML, JSON, Markdown) can have impact on evaluation performance
- No one-size-fits-all solution
- LLMs trained on next-token prediction tend to perform better with formats matching their training data
- Optimal response structure varies widely by task and agent
- Select best response structure based on your own evaluation

### Principle 4: Optimizing Tool Responses for Token Efficiency

**Principle**: Optimizing quality of context is important, but so is optimizing quantity of context returned back to agents in tool responses

**Strategies**: Implement some combination of:
- **Pagination**: Break large responses into pages
- **Range Selection**: Allow selecting specific ranges
- **Filtering**: Filter results before returning
- **Truncation**: Limit response size with sensible default parameter values

**Default Limits**: For any tool responses that could use up lots of context, implement sensible defaults (e.g., restrict to 25,000 tokens by default)

**Future**: Expect effective context length of agents to grow over time, but need for context-efficient tools to remain

#### Truncation Guidance

**If You Truncate**: Be sure to steer agents with helpful instructions

**Strategies**:
- Directly encourage agents to pursue more token-efficient strategies
- Example: Making many small and targeted searches instead of single, broad search for knowledge retrieval task
- Provide clear guidance on how to get more results if needed

#### Error Responses

**Problem**: If tool call raises an error (e.g., during input validation), opaque error codes or tracebacks don't help agents

**Solution**: Prompt-engineer your error responses to clearly communicate:
- Specific improvements needed
- Actionable guidance
- Examples of correctly formatted tool inputs

**Benefit**: Tool truncation and error responses can steer agents towards more token-efficient tool-use behaviors (using filters or pagination) or give examples of correctly formatted tool inputs

**Example Unhelpful Error**: Generic error code or traceback

**Example Helpful Error**: Clear message explaining what went wrong and how to fix it, with example of correct format

### Principle 5: Prompt-Engineering Your Tool Descriptions

**Principle**: One of the most effective methods for improving tools

**Why**: Tool descriptions and specs are loaded into agents' context, so they can collectively steer agents toward effective tool-calling behaviors

#### Writing Effective Descriptions

**Mental Model**: Think of how you would describe your tool to a new hire on your team

**Consider**:
- Context that you might implicitly bring
- Specialized query formats
- Definitions of niche terminology
- Relationships between underlying resources

**Make Explicit**: All implicit context should be made explicit

**Avoid Ambiguity**: 
- Clearly describe (and enforce with strict data models) expected inputs and outputs
- Input parameters should be unambiguously named
- Example: Instead of parameter named `user`, try parameter named `user_id`

#### Measuring Impact

**With Evaluation**: You can measure the impact of your prompt engineering with greater confidence

**Result**: Even small refinements to tool descriptions can yield dramatic improvements

**Example**: Agent achieved state-of-the-art performance on evaluation after precise refinements to tool descriptions, dramatically reducing error rates and improving task completion

#### Best Practices

**Tool Definitions**: Follow best practices for tool definitions

**Dynamic Loading**: Understand how tools are dynamically loaded into agent's system prompt

**Tool Annotations**: If writing tools for MCP server, tool annotations help disclose:
- Which tools require open-world access
- Which tools make destructive changes

---

## Key Principles Summary

### 1. Choose the Right Tools

**Principle**: More tools don't always lead to better outcomes

**Guidelines**:
- Build thoughtful tools targeting specific high-impact workflows
- Consolidate functionality when possible
- Avoid tools that merely wrap existing APIs without considering agent affordances
- Each tool should have clear, distinct purpose

### 2. Namespace Your Tools

**Principle**: Group related tools under common prefixes to help agents select right tools

**Guidelines**:
- Namespace by service and/or resource
- Choose prefix vs suffix based on your evaluations
- Reduce number of tools loaded into context

### 3. Return Meaningful Context

**Principle**: Return only high-signal information back to agents

**Guidelines**:
- Prioritize contextual relevance over flexibility
- Prefer natural language over cryptic identifiers
- Provide response format options (concise vs detailed)
- Choose response structure based on your evaluation

### 4. Optimize for Token Efficiency

**Principle**: Optimize both quality and quantity of context returned

**Guidelines**:
- Implement pagination, filtering, truncation
- Provide sensible defaults
- Steer agents with helpful instructions
- Write clear, actionable error messages

### 5. Prompt-Engineer Descriptions

**Principle**: Tool descriptions are loaded into context and steer agent behavior

**Guidelines**:
- Write as if describing to new team member
- Make implicit context explicit
- Avoid ambiguity
- Measure impact with evaluations

---

## The Evaluation-Driven Process

### Overview

**Process**:
1. Build prototype
2. Generate evaluation tasks (grounded in real-world uses)
3. Run evaluation programmatically
4. Analyze results (observe, read reasoning, review transcripts)
5. Collaborate with agents to improve tools
6. Repeat until strong performance achieved

### Key Metrics

- Top-level accuracy
- Total runtime (tool calls and tasks)
- Total number of tool calls
- Total token consumption
- Tool errors

### Analysis Focus

- Where agents get stumped
- Redundant tool calls
- Tool errors
- Common workflows
- Opportunities for consolidation

---

## The Paradigm Shift

### From Deterministic to Non-Deterministic

**Traditional Software Development**: 
- Predictable, deterministic patterns
- Contract between deterministic systems

**Tools for Agents**:
- Non-deterministic patterns
- Contract between deterministic systems and non-deterministic agents
- Need to re-orient software development practices

### What Makes Tools Successful

**Effective Tools Are**:
- Intentionally and clearly defined
- Use agent context judiciously
- Can be combined together in diverse workflows
- Enable agents to intuitively solve real-world tasks

### Looking Ahead

**Evolution**: Specific mechanisms through which agents interact with the world will evolve
- Updates to protocols
- Upgrades to underlying LLMs

**Approach**: With systematic, evaluation-driven approach to improving tools for agents, we can ensure that as agents become more capable, the tools they use will evolve alongside them

---

## Summary

Writing effective tools for agents requires:

1. **Understanding the Difference**: Tools are contracts between deterministic systems and non-deterministic agents

2. **Iterative Process**: Prototype → Evaluate → Improve → Repeat

3. **Right Tool Selection**: Few thoughtful tools targeting high-impact workflows, not many overlapping tools

4. **Clear Organization**: Namespacing helps agents select right tools

5. **Meaningful Responses**: High-signal, natural language, with format options

6. **Token Efficiency**: Pagination, filtering, truncation, clear errors

7. **Clear Descriptions**: Explicit, unambiguous, measured with evaluations

**Core Principle**: Design tools for agents, not just wrap existing APIs. Tools that are ergonomic for agents are also intuitive for humans.

**Future**: Mechanisms will evolve, but systematic, evaluation-driven approach ensures tools evolve alongside agent capabilities.

