# Building Effective AI Agents - Content Draft

**Source**: Anthropic article on Building Effective Agents (conceptual content extracted)
**Status**: Draft - awaiting organization
**Note**: Content focuses on concepts and patterns, not product-specific features

---

## Core Principle: Simplicity Over Complexity

### Key Insight

**Observation**: Most successful implementations weren't using complex frameworks or specialized libraries

**Approach**: Building with simple, composable patterns

**Principle**: Find the simplest solution possible, and only increase complexity when needed

**Implication**: This might mean not building agentic systems at all

---

## What Are Agents?

### Definition Variations

**Broad Definition**: "Agent" can be defined in several ways

**Two Common Interpretations**:
1. **Fully autonomous systems**: Operate independently over extended periods, using various tools to accomplish complex tasks
2. **Prescriptive implementations**: Follow predefined workflows

**Unified Category**: All these variations categorized as agentic systems

### Architectural Distinction

**Workflows**: Systems where LLMs and tools are orchestrated through predefined code paths

**Agents**: Systems where LLMs dynamically direct their own processes and tool usage, maintaining control over how they accomplish tasks

**Key Difference**: Who controls the process—predefined code (workflows) vs. LLM-driven decisions (agents)

---

## When (and When Not) to Use Agents

### General Principle

**Recommendation**: Find the simplest solution possible, and only increase complexity when needed

**Trade-off**: Agentic systems often trade latency and cost for better task performance

**Consideration**: Should consider when this tradeoff makes sense

### Decision Framework

**When More Complexity is Warranted**:
- **Workflows**: Offer predictability and consistency for well-defined tasks
- **Agents**: Better option when flexibility and model-driven decision-making are needed at scale

**For Many Applications**: Optimizing single LLM calls with retrieval and in-context examples is usually enough

**Key Question**: Does the task require the flexibility and autonomy of agents, or can it be solved with simpler approaches?

---

## When and How to Use Frameworks

### Available Frameworks

Many frameworks make agentic systems easier to implement, including:
- Agent SDKs
- Cloud platform AI Agent frameworks
- GUI workflow builders
- GUI tools for building and testing complex workflows

### Benefits

**Make It Easy to Get Started**: Simplify standard low-level tasks like:
- Calling LLMs
- Defining and parsing tools
- Chaining calls together

### Drawbacks

**Extra Layers of Abstraction**: Can obscure:
- Underlying prompts
- Responses
- Making them harder to debug

**Temptation**: Can make it tempting to add complexity when simpler setup would suffice

### Recommendation

**Start Direct**: Developers should start by using LLM APIs directly
- Many patterns can be implemented in few lines of code

**If Using Framework**: Ensure you understand the underlying code
- Incorrect assumptions about what's under the hood are common source of customer error

**Key Principle**: Don't hesitate to reduce abstraction layers and build with basic components as you move to production

---

## Building Blocks, Workflows, and Agents

### Progressive Complexity

We'll explore common patterns for agentic systems seen in production, starting with foundational building block and progressively increasing complexity:
- Simple compositional workflows
- Autonomous agents

---

## Building Block: The Augmented LLM

### Concept

**Basic Building Block**: LLM enhanced with augmentations such as:
- Retrieval
- Tools
- Memory

**Current Capabilities**: Models can actively use these capabilities:
- Generating their own search queries
- Selecting appropriate tools
- Determining what information to retain

### Implementation Focus

**Two Key Aspects**:
1. **Tailoring**: Tailor these capabilities to your specific use case
2. **Interface**: Ensure they provide easy, well-documented interface for your LLM

### Implementation Approach

**Many Ways**: There are many ways to implement these augmentations

**One Approach**: Through protocols that allow developers to integrate with growing ecosystem of third-party tools with simple client implementation

**Assumption**: For remainder, we'll assume each LLM call has access to these augmented capabilities

---

## Workflow 1: Prompt Chaining

### Concept

**Decomposition**: Decomposes task into sequence of steps
- Each LLM call processes output of previous one

**Programmatic Checks**: Can add programmatic checks (gates) on any intermediate steps
- Ensure process is still on track

### When to Use

**Ideal For**: Situations where task can be easily and cleanly decomposed into fixed subtasks

**Goal**: Trade off latency for higher accuracy
- By making each LLM call an easier task

### Examples

1. **Marketing Copy**: Generating marketing copy, then translating it into different language

2. **Document Writing**: 
   - Writing outline of document
   - Checking that outline meets certain criteria
   - Writing document based on outline

---

## Workflow 2: Routing

### Concept

**Classification**: Classifies an input and directs it to specialized followup task

**Benefits**:
- Allows for separation of concerns
- Building more specialized prompts

**Without Routing**: Optimizing for one kind of input can hurt performance on other inputs

### When to Use

**Works Well For**: Complex tasks where:
- There are distinct categories that are better handled separately
- Classification can be handled accurately (by LLM or traditional classification model/algorithm)

### Examples

1. **Customer Service**: Directing different types of queries (general questions, refund requests, technical support) into different downstream processes, prompts, and tools

2. **Model Selection**: Routing easy/common questions to smaller, cost-efficient models and hard/unusual questions to more capable models to optimize for best performance

---

## Workflow 3: Parallelization

### Concept

**Simultaneous Work**: LLMs can sometimes work simultaneously on task and have their outputs aggregated programmatically

**Two Key Variations**:

1. **Sectioning**: Breaking task into independent subtasks run in parallel

2. **Voting**: Running same task multiple times to get diverse outputs

### When to Use

**Effective When**:
- Divided subtasks can be parallelized for speed
- Multiple perspectives or attempts are needed for higher confidence results

**Key Insight**: For complex tasks with multiple considerations, LLMs generally perform better when each consideration is handled by separate LLM call, allowing focused attention on each specific aspect

### Examples

**Sectioning**:
1. **Guardrails**: One model instance processes user queries while another screens them for inappropriate content or requests
   - Tends to perform better than having same LLM call handle both guardrails and core response

2. **Automated Evals**: Each LLM call evaluates different aspect of model's performance on given prompt

**Voting**:
1. **Code Review**: Reviewing piece of code for vulnerabilities, where several different prompts review and flag code if they find problem

2. **Content Moderation**: Evaluating whether given piece of content is inappropriate, with multiple prompts evaluating different aspects or requiring different vote thresholds to balance false positives and negatives

---

## Workflow 4: Orchestrator-Workers

### Concept

**Central LLM**: Dynamically breaks down tasks, delegates them to worker LLMs, and synthesizes their results

### When to Use

**Well-Suited For**: Complex tasks where you can't predict subtasks needed

**Example**: In coding, number of files that need to be changed and nature of change in each file likely depend on task

**Key Difference from Parallelization**: Topographically similar, but key difference is flexibility
- Subtasks aren't pre-defined
- Determined by orchestrator based on specific input

### Examples

1. **Coding Products**: Make complex changes to multiple files each time

2. **Search Tasks**: Involve gathering and analyzing information from multiple sources for possible relevant information

---

## Workflow 5: Evaluator-Optimizer

### Concept

**Two LLM Calls**: One generates response while another provides evaluation and feedback in a loop

### When to Use

**Particularly Effective When**:
- We have clear evaluation criteria
- Iterative refinement provides measurable value

**Two Signs of Good Fit**:
1. LLM responses can be demonstrably improved when human articulates their feedback
2. LLM can provide such feedback

**Analogy**: Iterative writing process human writer might go through when producing polished document

### Examples

1. **Literary Translation**: Nuances that translator LLM might not capture initially, but where evaluator LLM can provide useful critiques

2. **Complex Search Tasks**: Require multiple rounds of searching and analysis to gather comprehensive information, where evaluator decides whether further searches are warranted

---

## Agents: Autonomous Systems

### Concept

**Emergence**: Agents are emerging in production as LLMs mature in key capabilities:
- Understanding complex inputs
- Engaging in reasoning and planning
- Using tools reliably
- Recovering from errors

### How Agents Work

**Starting Point**: Begin work with either:
- Command from human user
- Interactive discussion with human user

**Once Task Clear**: Agents plan and operate independently
- Potentially returning to human for further information or judgement

**During Execution**: Crucial for agents to gain "ground truth" from environment at each step
- Tool call results
- Code execution
- To assess progress

**Pausing**: Agents can pause for human feedback at:
- Checkpoints
- When encountering blockers

**Termination**: Task often terminates upon completion, but also common to include stopping conditions (such as maximum number of iterations) to maintain control

### Implementation Simplicity

**Sophisticated Tasks**: Agents can handle sophisticated tasks

**Straightforward Implementation**: Their implementation is often straightforward
- Typically just LLMs using tools based on environmental feedback in a loop

**Critical Design**: Therefore crucial to design toolsets and their documentation clearly and thoughtfully

### When to Use Agents

**Open-Ended Problems**: Can be used for open-ended problems where:
- It's difficult or impossible to predict required number of steps
- You can't hardcode a fixed path

**LLM Operation**: LLM will potentially operate for many turns

**Trust Requirement**: Must have some level of trust in its decision-making

**Ideal For**: Scaling tasks in trusted environments

### Trade-offs

**Autonomy Benefits**: Agents' autonomy makes them ideal for scaling tasks

**Costs**:
- Higher costs
- Potential for compounding errors

**Recommendations**:
- Extensive testing in sandboxed environments
- Appropriate guardrails

### Examples

1. **Coding Agent**: Resolve tasks which involve edits to many files based on task description

2. **Computer Use**: Reference implementation where agent uses computer to accomplish tasks

---

## Combining and Customizing Patterns

### Flexibility

**Not Prescriptive**: These building blocks aren't prescriptive

**Common Patterns**: They're common patterns that developers can shape and combine to fit different use cases

### Key to Success

**Measurement**: As with any LLM features, key to success is measuring performance and iterating on implementations

**Principle**: Should consider adding complexity only when it demonstrably improves outcomes

---

## Summary: Core Principles

### Success Principle

**Not About Sophistication**: Success in LLM space isn't about building most sophisticated system

**About Right Fit**: It's about building right system for your needs

**Progressive Approach**:
1. Start with simple prompts
2. Optimize them with comprehensive evaluation
3. Add multi-step agentic systems only when simpler solutions fall short

### Three Core Principles

When implementing agents, follow three core principles:

1. **Maintain Simplicity**: In your agent's design

2. **Prioritize Transparency**: By explicitly showing agent's planning steps

3. **Carefully Craft ACI**: Agent-computer interface through thorough tool documentation and testing

### Framework Guidance

**Can Help Get Started**: Frameworks can help you get started quickly

**Don't Hesitate to Reduce**: Don't hesitate to reduce abstraction layers and build with basic components as you move to production

**Result**: By following these principles, can create agents that are not only powerful but also reliable, maintainable, and trusted by their users

---

## Appendix 1: Agents in Practice

### Two Promising Applications

Our work with customers has revealed two particularly promising applications for AI agents that demonstrate practical value of patterns discussed above. Both applications illustrate how agents add most value for tasks that require:
- Both conversation and action
- Clear success criteria
- Enable feedback loops
- Integrate meaningful human oversight

### Application A: Customer Support

**Combination**: Customer support combines familiar chatbot interfaces with enhanced capabilities through tool integration

**Natural Fit**: Natural fit for more open-ended agents because:

1. **Conversation Flow**: Support interactions naturally follow conversation flow while requiring access to external information and actions

2. **Tool Integration**: Tools can be integrated to pull:
   - Customer data
   - Order history
   - Knowledge base articles

3. **Programmatic Actions**: Actions such as issuing refunds or updating tickets can be handled programmatically

4. **Clear Success**: Success can be clearly measured through user-defined resolutions

**Evidence**: Several companies have demonstrated viability of this approach through usage-based pricing models that charge only for successful resolutions, showing confidence in their agents' effectiveness

### Application B: Coding Agents

**Evolution**: Software development space has shown remarkable potential for LLM features, with capabilities evolving from code completion to autonomous problem-solving

**Particularly Effective**: Agents are particularly effective because:

1. **Verifiable**: Code solutions are verifiable through automated tests

2. **Iterative**: Agents can iterate on solutions using test results as feedback

3. **Well-Defined**: Problem space is well-defined and structured

4. **Measurable**: Output quality can be measured objectively

**Capability**: In our own implementation, agents can now solve real GitHub issues in benchmark based on pull request description alone

**Important Note**: However, whereas automated testing helps verify functionality, human review remains crucial for ensuring solutions align with broader system requirements

---

## Appendix 2: Prompt Engineering Your Tools

### Importance

**Critical Component**: No matter which agentic system you're building, tools will likely be important part of your agent

**Function**: Tools enable agent to interact with external services and APIs by specifying their exact structure and definition

**Response Format**: When agent responds, it will include tool use block in API response if it plans to invoke tool

**Equal Attention**: Tool definitions and specifications should be given just as much prompt engineering attention as your overall prompts

### Format Considerations

**Multiple Ways**: There are often several ways to specify same action

**Examples**:
- File edit: Writing diff vs. rewriting entire file
- Structured output: Code inside markdown vs. inside JSON

**Software Engineering Perspective**: In software engineering, differences like these are cosmetic and can be converted losslessly from one to the other

**LLM Perspective**: However, some formats are much more difficult for LLM to write than others

**Examples of Difficulty**:
- Writing diff requires knowing how many lines are changing in chunk header before new code is written
- Writing code inside JSON (compared to markdown) requires extra escaping of newlines and quotes

### Suggestions for Tool Formats

1. **Give Model Tokens to Think**: Give model enough tokens to "think" before it writes itself into corner

2. **Natural Formats**: Keep format close to what model has seen naturally occurring in text on internet

3. **No Formatting Overhead**: Make sure there's no formatting "overhead" such as:
   - Having to keep accurate count of thousands of lines of code
   - String-escaping any code it writes

### Agent-Computer Interface (ACI)

**Rule of Thumb**: Think about how much effort goes into human-computer interfaces (HCI), and plan to invest just as much effort in creating good agent-computer interfaces (ACI)

### How to Create Good ACI

1. **Put Yourself in Model's Shoes**: 
   - Is it obvious how to use this tool, based on description and parameters?
   - Or would you need to think carefully about it?
   - If so, then it's probably also true for model
   - Good tool definition often includes:
     - Example usage
     - Edge cases
     - Input format requirements
     - Clear boundaries from other tools

2. **Improve Parameter Names/Descriptions**: 
   - How can you change parameter names or descriptions to make things more obvious?
   - Think of this as writing great docstring for junior developer on your team
   - Especially important when using many similar tools

3. **Test Tool Usage**: 
   - Run many example inputs to see what mistakes model makes
   - Iterate

4. **Poka-Yoke Your Tools**: 
   - Change arguments so that it is harder to make mistakes

### Example: SWE-bench Agent

**Time Investment**: While building agent for SWE-bench, actually spent more time optimizing tools than overall prompt

**Problem Found**: Model would make mistakes with tools using relative filepaths after agent had moved out of root directory

**Solution**: Changed tool to always require absolute filepaths

**Result**: Found that model used this method flawlessly

---

## Key Patterns Summary

### Building Blocks

1. **Augmented LLM**: LLM enhanced with retrieval, tools, and memory

### Workflows

1. **Prompt Chaining**: Sequence of steps, each processing previous output
2. **Routing**: Classify input and direct to specialized task
3. **Parallelization**: Sectioning (independent subtasks) or Voting (same task multiple times)
4. **Orchestrator-Workers**: Central LLM delegates to workers and synthesizes
5. **Evaluator-Optimizer**: One generates, another evaluates in loop

### Agents

1. **Autonomous Agents**: LLMs dynamically direct own processes and tool usage

---

## Principles Summary

### Design Principles

1. **Simplicity Over Complexity**: Find simplest solution, add complexity only when needed
2. **Start Simple**: Start with simple prompts, optimize with evaluation
3. **Measure and Iterate**: Key to success is measuring performance and iterating

### Implementation Principles

1. **Maintain Simplicity**: In agent's design
2. **Prioritize Transparency**: Show agent's planning steps explicitly
3. **Carefully Craft ACI**: Thorough tool documentation and testing

### Tool Design Principles

1. **Give Model Tokens to Think**: Before writing
2. **Use Natural Formats**: Close to what model has seen
3. **Avoid Formatting Overhead**: No complex counting or escaping
4. **Put Yourself in Model's Shoes**: Make usage obvious
5. **Test and Iterate**: See what mistakes model makes
6. **Poka-Yoke**: Make mistakes harder to make

---

## Summary

Building effective agents requires:

1. **Understanding the Spectrum**: From simple augmented LLMs to autonomous agents
2. **Choosing Right Pattern**: Workflows for predictable tasks, agents for flexible ones
3. **Starting Simple**: Don't add complexity until needed
4. **Designing Tools Carefully**: Agent-computer interface is as important as human-computer interface
5. **Measuring and Iterating**: Key to success

**Core Principle**: Success isn't about building most sophisticated system—it's about building right system for your needs.

