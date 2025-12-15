# Agent Skills Pattern - Content Draft

**Source**: Anthropic article on Agent Skills (conceptual content extracted)
**Status**: Draft - awaiting organization
**Note**: Content focuses on concepts and patterns, not product-specific features

---

## Core Concept: Equipping Agents with Specialized Expertise

### The Problem

As general-purpose agents become more powerful, they need:
- **Procedural knowledge**: How to perform specific tasks
- **Organizational context**: Domain-specific information and workflows
- **Composable capabilities**: Ways to specialize without building custom agents for each use case

**Challenge**: How to package expertise into reusable, scalable, and portable resources for agents?

### The Solution: Agent Skills Pattern

**Definition**: Organized folders of instructions, scripts, and resources that agents can discover and load dynamically to perform better at specific tasks.

**Analogy**: Building a skill for an agent is like putting together an onboarding guide for a new hire. Instead of building fragmented, custom-designed agents for each use case, anyone can specialize their agents with composable capabilities by capturing and sharing procedural knowledge.

**Key Benefits**:
- **Composable**: Mix and match skills as needed
- **Scalable**: Skills can grow without overwhelming context
- **Portable**: Share skills across agents and organizations
- **Discoverable**: Agents can find and load relevant skills dynamically

---

## Anatomy of a Skill

### Basic Structure

At its simplest, a skill is a **directory that contains a SKILL.md file**.

### SKILL.md File Structure

#### 1. YAML Frontmatter (Required Metadata)

The file must start with YAML frontmatter containing:
- **name**: Skill identifier
- **description**: What the skill does

**Purpose**: First level of progressive disclosure
- Loaded into system prompt at startup
- Provides just enough information for agent to know when skill should be used
- Doesn't load full skill content into context initially

#### 2. Skill Body

The actual body of SKILL.md contains:
- Instructions for the agent
- Context related to specific actions the skill should take
- References to additional files (if needed)

**Purpose**: Second level of detail
- Loaded when agent thinks skill is relevant to current task
- Agent reads full SKILL.md into context when triggered

#### 3. Additional Files (Optional)

As skills grow in complexity:
- May contain too much context for single SKILL.md
- May have context relevant only in specific scenarios

**Solution**: Bundle additional files within skill directory and reference them by name from SKILL.md

**Purpose**: Third level (and beyond) of detail
- Agent navigates and discovers only as needed
- Keeps core skill lean
- Agent reads additional files only when relevant

**Example Structure**:
```
skill-directory/
├── SKILL.md          # Core skill with metadata and main instructions
├── reference.md      # Additional reference material
└── forms.md          # Specific instructions for form-filling scenarios
```

---

## Progressive Disclosure: Core Design Principle

### Concept

Like a well-organized manual:
1. **Table of contents** (skill metadata) → loaded at startup
2. **Specific chapters** (SKILL.md) → loaded when relevant
3. **Detailed appendix** (additional files) → loaded only as needed

### How It Works

**Level 1 - Startup**:
- System prompt includes skill metadata (name, description)
- Agent knows what skills are available
- No full skill content loaded yet

**Level 2 - Skill Trigger**:
- Agent determines skill is relevant to current task
- Agent reads SKILL.md into context
- Full skill instructions now available

**Level 3 - Deep Dive**:
- Agent needs more specific information
- Agent reads additional referenced files
- Only loads what's needed for current subtask

### Benefits

1. **Context Efficiency**: Agent doesn't load everything upfront
2. **Scalability**: Amount of context bundled into skill is effectively unbounded
3. **Flexibility**: Agent loads information only as needed
4. **Performance**: Reduces token usage and improves response times

### Requirements

For progressive disclosure to work, agents need:
- **Filesystem access**: To navigate skill directories
- **Code execution tools**: To run scripts bundled in skills
- **Dynamic loading capability**: To read files on-demand

---

## Skills and Code Execution

### Why Include Code in Skills?

**Efficiency**: Certain operations are better suited for code execution
- Example: Sorting a list via token generation is expensive vs. running sorting algorithm

**Reliability**: Many applications require deterministic behavior that only code can provide

**Context Management**: Code can process data without loading it into agent's context
- Example: Script reads PDF and extracts form fields
- PDF content and script don't enter agent's context
- Only results are returned

### Code as Both Tool and Documentation

Code in skills can serve dual purposes:
1. **Executable tools**: Scripts agent runs directly
2. **Documentation**: Reference code agent reads to understand patterns

**Best Practice**: Make it clear whether Claude should:
- Run scripts directly (executable tools)
- Read scripts into context (reference documentation)

---

## Context Window Management with Skills

### Sequence of Operations

1. **Initial State**:
   - Core system prompt
   - Metadata for each installed skill (name, description)
   - User's initial message

2. **Skill Trigger**:
   - Agent invokes tool to read skill directory
   - Agent reads SKILL.md contents

3. **Deep Dive** (if needed):
   - Agent chooses to read additional bundled files
   - Agent loads specific context for subtask

4. **Task Execution**:
   - Agent proceeds with task using loaded skill instructions
   - May execute code scripts bundled in skill

### Key Insight

Agents with filesystem and code execution tools don't need to read entire skill into context window when working on particular task. This means:
- Skills can be arbitrarily large
- Context window only contains what's needed for current task
- Multiple skills can be available without context bloat

---

## Developing and Evaluating Skills

### 1. Start with Evaluation

**Process**:
1. Identify specific gaps in agents' capabilities
2. Run agents on representative tasks
3. Observe where they struggle or require additional context
4. Build skills incrementally to address shortcomings

**Principle**: Build based on observed needs, not anticipated needs

### 2. Structure for Scale

**When SKILL.md becomes unwieldy**:
- Split content into separate files
- Reference them from SKILL.md
- Keep paths separate if contexts are mutually exclusive or rarely used together

**Benefits**:
- Reduces token usage
- Keeps core skill lean
- Improves discoverability

**Code Organization**:
- Code can serve as both executable tools and documentation
- Make clear whether agent should run scripts or read them as reference

### 3. Think from Agent's Perspective

**Monitor Usage**:
- Watch how agent uses skill in real scenarios
- Iterate based on observations
- Look for:
  - Unexpected trajectories
  - Overreliance on certain contexts
  - Missing information agent needs

**Critical Elements**:
- **Name**: Agent uses this when deciding whether to trigger skill
- **Description**: Must accurately convey when skill is relevant
- **Structure**: Should match how agent thinks about tasks

### 4. Iterate with Agent

**Process**:
1. Work on task with agent
2. Ask agent to capture successful approaches
3. Ask agent to document common mistakes
4. Build reusable context and code within skill
5. If agent goes off track, ask it to self-reflect on what went wrong

**Benefit**: Discovers what context agent actually needs instead of trying to anticipate upfront

---

## Security Considerations

### Risks

Skills provide agents with new capabilities through:
- Instructions (can direct agent behavior)
- Code (can execute in environment)

**Potential Vulnerabilities**:
- Malicious skills may introduce vulnerabilities in environment
- Skills may direct agent to exfiltrate data
- Skills may cause unintended actions

### Best Practices

1. **Source Trust**:
   - Install skills only from trusted sources
   - Audit skills from less-trusted sources before use

2. **Audit Process**:
   - Read contents of all files bundled in skill
   - Understand what skill does
   - Pay particular attention to:
     - Code dependencies
     - Bundled resources (images, scripts)
     - Instructions directing agent to connect to external network sources

3. **Network Security**:
   - Pay attention to instructions or code that connect to potentially untrusted external network sources
   - Verify network endpoints are legitimate

---

## Future Directions

### Current State

Skills pattern can be applied across:
- General-purpose agents
- Specialized agent systems
- Multi-agent architectures

### Potential Extensions

1. **Complement MCP Servers**:
   - Skills can teach agents complex workflows involving external tools
   - Skills provide procedural knowledge, MCP provides tool access
   - Together: complete capability package

2. **Agent Self-Improvement**:
   - Agents create, edit, and evaluate skills on their own
   - Agents codify their own patterns of behavior into reusable capabilities
   - Enables continuous learning and capability building

3. **Organizational Knowledge Sharing**:
   - Organizations share context and workflows
   - Individuals share expertise
   - Build library of reusable skills

---

## Key Principles Summary

### 1. Progressive Disclosure
- Load information only as needed
- Start with metadata, expand to full content, dive into specifics

### 2. Composable Design
- Skills are modular and reusable
- Mix and match as needed
- Don't require custom agents for each use case

### 3. Filesystem-Based Discovery
- Agents navigate skill directories
- Dynamic loading based on task relevance
- No upfront context bloat

### 4. Code as Capability
- Include executable scripts for efficiency
- Use code for deterministic operations
- Code can also serve as documentation

### 5. Iterative Development
- Build based on observed needs
- Monitor agent usage patterns
- Refine based on real-world performance

### 6. Security First
- Audit skills before use
- Understand what code does
- Verify network connections

---

## Conceptual Patterns

### Pattern 1: Metadata → Content → Deep Dive

**Structure**:
1. Lightweight metadata (name, description) at startup
2. Full skill content when triggered
3. Specific files when needed

**Benefit**: Context-efficient loading

### Pattern 2: Skill as Onboarding Guide

**Concept**: Skill packages expertise like onboarding documentation
- New hire gets overview first
- Dives into specific procedures as needed
- References detailed guides for complex tasks

**Application**: Agent gets skill overview, loads full instructions when relevant, references specific files for subtasks

### Pattern 3: Composable Expertise

**Concept**: Build specialized agents by composing skills
- General-purpose agent + PDF skill = PDF specialist
- General-purpose agent + PDF skill + Forms skill = Form-filling specialist
- Same base agent, different capabilities

**Benefit**: Reusability and scalability

### Pattern 4: Self-Documenting Skills

**Concept**: Skills contain both instructions and executable code
- Code demonstrates how to do something
- Instructions explain when and why
- Agent can read code as reference or execute it as tool

**Benefit**: Skills are both documentation and capability

---

## Application Scenarios

### Scenario 1: Domain Expertise
- **Need**: Agent needs to work with specific domain (e.g., legal, medical, financial)
- **Solution**: Create skill with domain-specific procedures, terminology, workflows
- **Result**: General-purpose agent becomes domain specialist

### Scenario 2: Tool Integration
- **Need**: Agent needs to work with specific tools or APIs
- **Solution**: Create skill with tool usage patterns, error handling, best practices
- **Result**: Agent gains tool-specific expertise

### Scenario 3: Workflow Automation
- **Need**: Agent needs to follow specific organizational workflows
- **Solution**: Create skill with step-by-step procedures, decision trees, checkpoints
- **Result**: Agent follows organizational processes

### Scenario 4: Quality Standards
- **Need**: Agent needs to meet specific quality or compliance requirements
- **Solution**: Create skill with quality criteria, validation steps, review processes
- **Result**: Agent produces outputs meeting standards

---

## Design Considerations

### When to Create a Skill

**Create a skill when**:
- Agent repeatedly struggles with specific type of task
- Domain expertise is needed that's not in base model
- Organizational procedures need to be followed
- Tool integration requires specific patterns
- Quality standards must be consistently met

### Skill Granularity

**Considerations**:
- **Too granular**: Many small skills, harder to discover and compose
- **Too broad**: Large skills, may load unnecessary context
- **Sweet spot**: Skills that represent coherent capabilities or domains

### Skill Organization

**Structure options**:
- **Single file**: Simple skills with limited scope
- **Multi-file**: Complex skills with multiple scenarios
- **Nested directories**: Skills with sub-capabilities

**Principle**: Match structure to how agent thinks about tasks

---

## Integration with Other Patterns

### Skills + Long-Running Agents

Skills can help long-running agents:
- Maintain consistent procedures across sessions
- Reference organizational knowledge
- Follow established workflows
- Meet quality standards

### Skills + Tool Use

Skills complement tool use:
- Skills provide procedural knowledge
- Tools provide execution capability
- Together: complete solution

### Skills + Code Execution

Skills can include:
- Executable scripts
- Reference code
- Code patterns and examples

**Benefit**: Skills become both instructions and tools

---

## Summary

Agent Skills represent a pattern for organizing and sharing expertise with agents:

1. **Structure**: Directory with SKILL.md (metadata + instructions) and optional additional files
2. **Loading**: Progressive disclosure from metadata → full content → specific files
3. **Content**: Instructions, code, resources organized for agent consumption
4. **Discovery**: Agent finds and loads skills based on task relevance
5. **Composition**: Mix and match skills to create specialized agents
6. **Development**: Iterative process based on observed needs and agent usage

This pattern enables:
- **Scalability**: Skills can grow without context bloat
- **Portability**: Share skills across agents and organizations
- **Composability**: Build specialized agents from general-purpose base
- **Efficiency**: Load only what's needed for current task

The simplicity of the pattern (just files and folders) makes it accessible while providing powerful capabilities for equipping agents with real-world expertise.

