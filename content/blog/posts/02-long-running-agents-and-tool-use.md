# Long-Running Agents and Advanced Tool Use - Content Draft

**Source**: Anthropic research articles (conceptual content extracted)
**Status**: Draft - awaiting organization
**Note**: Content focuses on concepts, not product-specific features

---

## Article 1: Effective Harnesses for Long-Running Agents

### Core Problem: Multi-Context Window Challenges

**The Challenge**: Agents working on complex tasks spanning hours or days face a fundamental problem: they must work in discrete sessions, and each new session begins with no memory of what came before. This is like software engineers working in shifts where each new engineer arrives with no memory of the previous shift.

**Key Concepts**:
- Context windows are limited
- Complex projects cannot be completed within a single window
- Agents need a way to bridge the gap between coding sessions
- Compaction alone isn't sufficient for long-running tasks

### Failure Modes Observed

1. **One-shotting**: Agent tries to do too much at once, runs out of context mid-implementation, leaving next session with half-implemented features
2. **Premature completion**: After some features are built, later agent instances see progress and declare the job done
3. **Unclear state**: Next session has to guess what happened and spend time recovering

### Solution Architecture: Two-Part Approach

#### 1. Initializer Agent
- Sets up the environment on the first run
- Creates foundational structure for all features
- Establishes clear state management

**Key Components**:
- **Feature List**: Comprehensive file of feature requirements expanding on user's initial prompt
  - All features initially marked as "failing"
  - Provides clear outline of full functionality
  - Structured format (JSON recommended for stability)
  - Strong instructions: "It is unacceptable to remove or edit tests"
  
- **Progress Tracking**: `claude-progress.txt` file that keeps a log of what agents have done
- **Version Control**: Initial git commit showing what files were added
- **Initialization Script**: `init.sh` script that can run the development server

#### 2. Coding Agent
- Makes incremental progress in every session
- Leaves clear artifacts for the next session
- Works on one feature at a time

**Key Practices**:
- **Incremental Progress**: Work on only one feature at a time (critical to prevent one-shotting)
- **Clean State**: Leave environment in merge-ready state after each session
  - No major bugs
  - Code is orderly and well-documented
  - Developer could easily begin work on new feature
  
- **Structured Updates**: 
  - Commit progress to git with descriptive commit messages
  - Write summaries in progress file
  - Use git to revert bad changes and recover working states

### Getting Up to Speed: Session Startup Pattern

Every coding agent session follows these steps:

1. **Orientation**: Run `pwd` to see working directory
2. **Context Loading**: Read git logs and progress files to understand recent work
3. **Feature Selection**: Read features list file and choose highest-priority incomplete feature
4. **Verification**: Run basic end-to-end test before implementing new feature
   - Start development server
   - Test fundamental functionality
   - Identify if app was left in broken state
   - Fix existing bugs before starting new work

### Testing Strategy

**Problem**: Agents tend to mark features as complete without proper testing

**Solution**: Explicit prompting for end-to-end testing
- Use browser automation tools
- Test as a human user would
- Verify features work end-to-end, not just unit tests

**Limitations**: 
- Vision limitations
- Browser automation tool limitations (e.g., can't see native alert modals)

### Key Principles

1. **Autonomy with Accountability**: Design principle for governance
2. **Incremental Progress**: One feature at a time
3. **Clean State**: Always leave environment merge-ready
4. **Clear Artifacts**: Progress files, git commits, feature lists
5. **Verification First**: Test existing functionality before new work

### Future Directions

- **Multi-Agent Architecture**: Specialized agents (testing, QA, code cleanup) vs single general-purpose agent
- **Generalization**: Apply patterns to other fields (scientific research, financial modeling)
- **Domain Adaptation**: Patterns optimized for web apps may need adaptation for other domains

---

## Article 2: Advanced Tool Use Patterns

### Core Challenges

1. **Tool Definition Overload**: Loading all tool definitions upfront consumes massive context
   - Example: 5-server setup with 58 tools = ~55K tokens before conversation starts
   - Can approach 100K+ token overhead with more servers
   
2. **Context Pollution from Intermediate Results**: 
   - Large datasets enter context even when only summaries needed
   - Example: 10MB log file analyzed, entire file enters context
   - Multiple tool calls accumulate all results in context

3. **Inference Overhead**: Each tool call requires full model inference pass
   - Manual synthesis of results through natural language
   - Slow and error-prone for complex workflows

4. **Parameter Ambiguity**: JSON schemas define structure but not usage patterns
   - When to include optional parameters
   - Which combinations make sense
   - What conventions API expects
   - Format ambiguities (date formats, ID conventions)

### Solution 1: Tool Search Tool (Dynamic Discovery)

**Concept**: Instead of loading all tool definitions upfront, discover tools on-demand

**How It Works**:
- Mark tools with `defer_loading: true` to make them discoverable on-demand
- Deferred tools aren't loaded into context initially
- Agent only sees Tool Search Tool plus critical frequently-used tools
- When agent needs capabilities, it searches for relevant tools
- Matching tools get expanded into full definitions

**Benefits**:
- 85% reduction in token usage
- Improved accuracy (Opus 4: 49% → 74%, Opus 4.5: 79.5% → 88.1%)
- Access to full tool library while only paying for tools actually used
- Doesn't break prompt caching

**When to Use**:
- Tool definitions consuming >10K tokens
- Experiencing tool selection accuracy issues
- Building systems with multiple servers
- 10+ tools available

**When Not to Use**:
- Small tool library (<10 tools)
- All tools used frequently in every session
- Tool definitions are compact

### Solution 2: Programmatic Tool Calling

**Concept**: Enable agents to orchestrate tools through code rather than individual API round-trips

**How It Works**:
1. Mark tools as callable from code (`allowed_callers: ["code_execution"]`)
2. Agent writes Python code that calls multiple tools
3. Tools execute without hitting agent's context
4. Code processes outputs, filters, transforms data
5. Only final output enters context

**Benefits**:
- **Token Savings**: 37% reduction (43,588 → 27,297 tokens average)
- **Reduced Latency**: Eliminate 19+ inference passes for 20+ tool calls
- **Improved Accuracy**: Knowledge retrieval 25.6% → 28.5%, benchmarks 46.5% → 51.2%
- **Better Control Flow**: Loops, conditionals, error handling explicit in code
- **Parallel Execution**: Can run independent operations simultaneously

**Example Pattern**:
```python
# Instead of 20 sequential tool calls, write orchestration code
team = await get_team_members("engineering")
budgets = await asyncio.gather(*[get_budget_by_level(l) for l in levels])
expenses = await asyncio.gather(*[get_expenses(m["id"], "Q3") for m in team])
# Process and filter in code
exceeded = [filter logic here]
# Only final result enters context
```

**When to Use**:
- Processing large datasets where only aggregates/summaries needed
- Multi-step workflows with 3+ dependent tool calls
- Filtering, sorting, transforming tool results
- Tasks where intermediate data shouldn't influence reasoning
- Parallel operations across many items

**When Not to Use**:
- Simple single-tool invocations
- Tasks where agent should see all intermediate results
- Quick lookups with small responses

### Solution 3: Tool Use Examples

**Concept**: Provide sample tool calls directly in tool definitions to show usage patterns, not just structure

**How It Works**:
- Add `input_examples` array to tool definitions
- Show concrete usage patterns with realistic data
- Demonstrate format conventions, nested structures, optional parameter correlations

**Benefits**:
- Improved accuracy: 72% → 90% on complex parameter handling
- Clarifies format conventions (date formats, ID patterns)
- Shows nested structure patterns
- Demonstrates optional parameter correlations

**Example**:
```json
{
  "name": "create_ticket",
  "input_examples": [
    {
      "title": "Login page returns 500 error",
      "priority": "critical",
      "reporter": {"id": "USR-12345", "name": "Jane Smith"},
      "due_date": "2024-11-06"
    }
  ]
}
```

**When to Use**:
- Complex nested structures
- Tools with many optional parameters
- APIs with domain-specific conventions
- Similar tools where examples clarify which to use

**When Not to Use**:
- Simple single-parameter tools
- Standard formats Claude already understands
- Validation concerns better handled by schema

### Best Practices: Layering Features

**Strategic Approach**:
1. Start with biggest bottleneck:
   - Context bloat → Tool Search Tool
   - Large intermediate results → Programmatic Tool Calling
   - Parameter errors → Tool Use Examples

2. Layer additional features as needed
3. They're complementary: discovery → execution → invocation

**Tool Search Setup**:
- Clear, descriptive tool names and descriptions
- Keep 3-5 most-used tools always loaded
- Defer the rest

**Programmatic Tool Calling Setup**:
- Document return formats clearly
- Opt-in tools that benefit from orchestration
- Tools safe to retry (idempotent)
- Tools that can run in parallel

**Tool Use Examples Setup**:
- Use realistic data
- Show variety (minimal, partial, full specification)
- Keep concise: 1-5 examples per tool
- Focus on ambiguity

---

## Article 3: Code Execution with MCP

### Core Problem: Token Consumption at Scale

**Two Patterns**:
1. **Tool Definitions Overload**: Loading all tool definitions upfront
   - Thousands of tools across dozens of MCP servers
   - Can consume 50,000+ tokens before agent reads request
   - Example: 150,000 tokens → 2,000 tokens (98.7% reduction)

2. **Intermediate Results**: Every tool result passes through context
   - Large documents flow through multiple times
   - 2-hour meeting transcript = 50,000 tokens
   - May exceed context window limits

### Solution: Code Execution with MCP

**Concept**: Present MCP servers as code APIs rather than direct tool calls

**Architecture**:
- Generate file tree of all available tools from connected MCP servers
- Each tool corresponds to a file/module
- Agent discovers tools by exploring filesystem
- Agent loads only definitions it needs for current task

**Benefits**:

1. **Progressive Disclosure**: 
   - Models navigate filesystems well
   - Read tool definitions on-demand
   - Alternative: `search_tools` tool with detail level parameter

2. **Context Efficient Tool Results**:
   - Filter and transform results in code before returning
   - Example: 10,000-row spreadsheet → filter to 5 rows
   - Aggregations, joins, field extraction without bloating context

3. **More Powerful Control Flow**:
   - Loops, conditionals, error handling in code
   - Single-step execution vs chaining tool calls
   - Saves "time to first token" latency

4. **Privacy-Preserving Operations**:
   - Intermediate results stay in execution environment
   - Agent only sees what you explicitly log/return
   - Tokenization of sensitive data possible
   - Deterministic security rules

5. **State Persistence and Skills**:
   - Write intermediate results to files
   - Resume work and track progress
   - Persist code as reusable functions
   - Build toolbox of higher-level capabilities over time

### Implementation Pattern

**File Structure**:
```
servers/
├── google-drive/
│   ├── getDocument.ts
│   └── index.ts
├── salesforce/
│   ├── updateRecord.ts
│   └── index.ts
```

**Tool File Example**:
```typescript
export async function getDocument(input: GetDocumentInput): Promise<GetDocumentResponse> {
  return callMCPTool<GetDocumentResponse>('google_drive__get_document', input);
}
```

**Agent Code**:
```typescript
import * as gdrive from './servers/google-drive';
import * as salesforce from './servers/salesforce';

const transcript = (await gdrive.getDocument({ documentId: 'abc123' })).content;
await salesforce.updateRecord({
  objectType: 'SalesMeeting',
  recordId: '00Q5f000001abcXYZ',
  data: { Notes: transcript }
});
```

### Trade-offs

**Benefits**:
- Reduced token costs
- Lower latency
- Improved tool composition

**Costs**:
- Requires secure execution environment
- Sandboxing and resource limits needed
- Monitoring and operational overhead
- Security considerations

### Key Insight

Many problems feel novel but have known solutions from software engineering. Code execution applies established patterns to agents, letting them use familiar programming constructs to interact with tools more efficiently.

---

## Cross-Cutting Concepts

### Context Management Strategies
1. **Progressive Loading**: Load only what's needed, when needed
2. **Filtering/Transformation**: Process data before it enters context
3. **Artifact-Based State**: Use files, git, progress logs instead of context
4. **Code Execution**: Keep intermediate results in execution environment

### Agent Architecture Patterns
1. **Initializer + Worker**: Separate setup from execution
2. **Incremental Progress**: One feature/task at a time
3. **Clean State**: Always leave environment merge-ready
4. **Verification First**: Test before new work

### Tool Use Patterns
1. **Dynamic Discovery**: Search for tools on-demand
2. **Programmatic Orchestration**: Code-based tool calling
3. **Example-Driven Learning**: Show usage patterns, not just schemas
4. **Layered Approach**: Combine strategies based on bottlenecks

### State Management
1. **File-Based State**: Persist to filesystem
2. **Version Control**: Use git for history and recovery
3. **Progress Tracking**: Structured logs of agent actions
4. **Skill Building**: Reusable functions and patterns

