# Agentic Coding Best Practices - Content Draft

**Source**: Anthropic article on Claude Code Best Practices (conceptual content extracted)
**Status**: Draft - awaiting organization
**Note**: Content focuses on concepts and patterns, not product-specific features

---

## Design Philosophy: Low-Level and Unopinionated

### Core Principle

**Intentional Design**: Agentic coding tools should be low-level and unopinionated, providing close to raw model access without forcing specific workflows.

**Benefits**:
- Flexible
- Customizable
- Scriptable
- Safe power tool

**Trade-off**: Flexibility presents learning curve for engineers new to agentic coding tools—at least until they develop their own best practices.

**Approach**: Consider suggestions as starting points, experiment and find what works best for you.

---

## 1. Customize Your Setup

### Context Gathering Optimization

**Principle**: Agentic coding assistants automatically pull context into prompts. This context gathering consumes time and tokens, but you can optimize it through environment tuning.

### Strategy 1: Create Context Documentation Files

**Concept**: Special files that are automatically pulled into context when starting a conversation

**Purpose**: Ideal place for documenting:
- Common bash commands
- Core files and utility functions
- Code style guidelines
- Testing instructions
- Repository etiquette (branch naming, merge vs. rebase, etc.)
- Developer environment setup (pyenv use, which compilers work)
- Unexpected behaviors or warnings particular to the project
- Any information you want agent to remember

**Format**: No required format, but recommend keeping concise and human-readable

**Example Structure**:
```markdown
# Bash commands
- npm run build: Build the project
- npm run typecheck: Run the typechecker

# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you're done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
```

**Placement Options**:
1. **Root of repo** (most common): Check into git to share across sessions and team, or `.gitignore` for personal use
2. **Parent directories**: Useful for monorepos—both parent and child files pulled automatically
3. **Child directories**: Files pulled on demand when working with files in those directories
4. **Home folder**: Applies to all sessions globally

**Auto-Generation**: Agent can automatically generate this file when initialized

### Strategy 2: Tune Context Documentation Files

**Principle**: Context documentation files become part of agent's prompts, so they should be refined like any frequently used prompt

**Common Mistake**: Adding extensive content without iterating on its effectiveness

**Approach**: 
- Take time to experiment
- Determine what produces best instruction following from model
- Add content manually or use shortcuts to automatically incorporate instructions
- Many engineers document commands, files, and style guidelines while coding
- Include changes in commits so team members benefit

**Refinement Techniques**:
- Run files through prompt improver
- Tune instructions (e.g., adding emphasis with "IMPORTANT" or "YOU MUST")
- Improve adherence through iteration

### Strategy 3: Curate Tool Allowlist

**Principle**: By default, agent requests permission for any action that might modify system

**Design**: Deliberately conservative approach to prioritize safety

**Customization**: Can customize allowlist to permit:
- Additional tools you know are safe
- Potentially unsafe tools that are easy to undo (e.g., file editing, git commit)

**Management Methods**:
1. Select "Always allow" when prompted during session
2. Use permissions command to add or remove tools from allowlist
3. Manually edit settings file (recommend checking into source control to share with team)
4. Use CLI flag for session-specific permissions

**Examples**:
- Add Edit to always allow file edits
- Add Bash(git commit:*) to allow git commits
- Add MCP tools to allow specific integrations

### Strategy 4: Install Additional Tools

**GitHub CLI**: Agent knows how to use `gh` CLI to interact with GitHub for:
- Creating issues
- Opening pull requests
- Reading comments
- And more

**Without gh**: Agent can still use GitHub API or MCP server (if installed), but CLI provides better integration

---

## 2. Give Agent More Tools

### Principle

Agent has access to shell environment, where you can build up sets of convenience scripts and functions just like you would for yourself. It can also leverage more complex tools through MCP and REST APIs.

### Strategy 1: Use Agent with Bash Tools

**Inheritance**: Agent inherits your bash environment, giving it access to all your tools

**Knowledge Gap**: Agent knows common utilities like unix tools and `gh`, but won't know about your custom bash tools without instructions

**Solutions**:
1. Tell agent the tool name with usage examples
2. Tell agent to run `--help` to see tool documentation
3. Document frequently used tools in context documentation file

### Strategy 2: Use Agent with MCP

**Dual Role**: Agent functions as both MCP server and client

**As Client**: Can connect to any number of MCP servers to access their tools in three ways:
1. **Project config**: Available when running agent in that directory
2. **Global config**: Available in all projects
3. **Checked-in config file**: Available to anyone working in your codebase

**Example**: Add Puppeteer and Sentry servers to checked-in config file, so every engineer working on repo can use these out of the box

**Debugging**: Can be helpful to launch agent with debug flag to help identify configuration issues

### Strategy 3: Use Custom Slash Commands

**Concept**: For repeated workflows (debugging loops, log analysis, etc.), store prompt templates in Markdown files

**Location**: Within `.commands` folder—these become available through slash commands menu

**Sharing**: Can check these commands into git to make them available for rest of team

**Parameters**: Custom slash commands can include special keyword `$ARGUMENTS` to pass parameters from command invocation

**Example**: Slash command to automatically pull and fix a GitHub issue:
```markdown
Please analyze and fix the GitHub issue: $ARGUMENTS.

Follow these steps:
1. Use `gh issue view` to get the issue details
2. Understand the problem described in the issue
3. Search the codebase for relevant files
4. Implement the necessary changes to fix the issue
5. Write and run tests to verify the fix
6. Ensure code passes linting and type checking
7. Create a descriptive commit message
8. Push and create a PR

Remember to use the GitHub CLI (`gh`) for all GitHub-related tasks.
```

**Usage**: Putting above content into `.commands/fix-github-issue.md` makes it available as `/project:fix-github-issue` command. Could then use `/project:fix-github-issue 1234` to have agent fix issue #1234

**Personal Commands**: Can add personal commands to home folder for commands you want available in all sessions

---

## 3. Common Workflows

### Workflow 1: Explore, Plan, Code, Commit

**Versatility**: Suits many problems

**Steps**:

1. **Explore**:
   - Ask agent to read relevant files, images, or URLs
   - Provide either general pointers ("read the file that handles logging") or specific filenames ("read logging.py")
   - Explicitly tell it not to write any code just yet
   - **Subagents**: Consider strong use of subagents, especially for complex problems
     - Telling agent to use subagents to verify details or investigate particular questions
     - Especially early on in conversation or task
     - Tends to preserve context availability without much downside in terms of lost efficiency

2. **Plan**:
   - Ask agent to make plan for how to approach specific problem
   - Recommend using word "think" to trigger extended thinking mode
     - Gives agent additional computation time to evaluate alternatives more thoroughly
     - Specific phrases mapped directly to increasing levels of thinking budget:
       - "think" < "think hard" < "think harder" < "ultrathink"
     - Each level allocates progressively more thinking budget
   - If results seem reasonable, have agent create document or GitHub issue with its plan
     - Can reset to this spot if implementation isn't what you want

3. **Code**:
   - Ask agent to implement its solution in code
   - Good place to ask it to explicitly verify reasonableness of solution as it implements pieces

4. **Commit**:
   - Ask agent to commit result and create pull request
   - If relevant, have agent update any READMEs or changelogs with explanation of what it just did

**Key Insight**: Steps #1-#2 are crucial—without them, agent tends to jump straight to coding solution. While sometimes that's what you want, asking agent to research and plan first significantly improves performance for problems requiring deeper thinking upfront.

### Workflow 2: Write Tests, Commit; Code, Iterate, Commit

**Best For**: Changes that are easily verifiable with unit, integration, or end-to-end tests

**Principle**: Test-driven development (TDD) becomes even more powerful with agentic coding

**Steps**:

1. **Write Tests**:
   - Ask agent to write tests based on expected input/output pairs
   - Be explicit about fact that you're doing test-driven development
   - So that it avoids creating mock implementations, even for functionality that doesn't exist yet in codebase

2. **Verify Tests Fail**:
   - Tell agent to run tests and confirm they fail
   - Explicitly telling it not to write any implementation code at this stage is often helpful

3. **Commit Tests**:
   - Ask agent to commit tests when satisfied with them

4. **Write Code**:
   - Ask agent to write code that passes tests
   - Instruct it not to modify the tests
   - Tell agent to keep going until all tests pass
   - Usually takes few iterations for agent to write code, run tests, adjust code, and run tests again

5. **Verify**:
   - At this stage, can help to ask it to verify with independent subagents that implementation isn't overfitting to tests

6. **Commit Code**:
   - Ask agent to commit code once satisfied with changes

**Key Principle**: Agent performs best when it has clear target to iterate against—a visual mock, a test case, or another kind of output. By providing expected outputs like tests, agent can make changes, evaluate results, and incrementally improve until it succeeds.

### Workflow 3: Write Code, Screenshot Result, Iterate

**Similar to Testing Workflow**: Can provide agent with visual targets

**Steps**:

1. **Give Agent Visual Capability**:
   - Give agent way to take browser screenshots (e.g., with Puppeteer MCP server, iOS simulator MCP server, or manually copy/paste screenshots)

2. **Provide Visual Mock**:
   - Copy/paste or drag-drop image
   - Or give agent image file path

3. **Implement and Iterate**:
   - Ask agent to implement design in code
   - Take screenshots of result
   - Iterate until result matches mock

4. **Commit**:
   - Ask agent to commit when satisfied

**Key Insight**: Like humans, agent's outputs tend to improve significantly with iteration. While first version might be good, after 2-3 iterations it will typically look much better. Give agent tools to see its outputs for best results.

### Workflow 4: Safe YOLO Mode

**Concept**: Instead of supervising agent, can bypass all permission checks and let agent work uninterrupted until completion

**Best For**: Workflows like fixing lint errors or generating boilerplate code

**Risk**: Letting agent run arbitrary commands is risky and can result in:
- Data loss
- System corruption
- Data exfiltration (e.g., via prompt injection attacks)

**Mitigation**: To minimize risks, use in container without internet access (reference implementation using Docker Dev Containers)

### Workflow 5: Codebase Q&A

**Use Case**: When onboarding to new codebase, use agent for learning and exploration

**Approach**: Ask agent same sorts of questions you would ask another engineer on project when pair programming

**Agent Capability**: Agent can agentically search codebase to answer general questions like:
- How does logging work?
- How do I make a new API endpoint?
- What does `async move { ... }` do on line 134 of foo.rs?
- What edge cases does CustomerOnboardingFlowImpl handle?
- Why are we calling foo() instead of bar() on line 333?
- What's the equivalent of line 334 of baz.py in Java?

**Benefit**: Using agent in this way has become core onboarding workflow, significantly improving ramp-up time and reducing load on other engineers

**No Special Prompting Required**: Simply ask questions, and agent will explore code to find answers

### Workflow 6: Use Agent to Interact with Git

**Capability**: Agent can effectively handle many git operations

**Usage**: Many engineers use agent for 90%+ of git interactions

**Use Cases**:
1. **Searching git history**: Answer questions like:
   - "What changes made it into v1.2.3?"
   - "Who owns this particular feature?"
   - "Why was this API designed this way?"
   - Helps to explicitly prompt agent to look through git history to answer queries like these

2. **Writing commit messages**: Agent will look at changes and recent history automatically to compose message taking all relevant context into account

3. **Handling complex git operations**: 
   - Reverting files
   - Resolving rebase conflicts
   - Comparing and grafting patches

### Workflow 7: Use Agent to Interact with GitHub

**Capabilities**: Agent can manage many GitHub interactions:

1. **Creating pull requests**: Agent understands shorthand "pr" and will generate appropriate commit messages based on diff and surrounding context

2. **Implementing one-shot resolutions**: For simple code review comments—just tell it to fix comments on PR (optionally, give more specific instructions) and push back to PR branch when done

3. **Fixing failing builds or linter warnings**

4. **Categorizing and triaging**: Open issues by asking agent to loop over open GitHub issues

**Benefit**: Eliminates need to remember `gh` command line syntax while automating routine tasks

### Workflow 8: Use Agent to Work with Jupyter Notebooks

**Use Case**: Researchers and data scientists use agent to read and write Jupyter notebooks

**Capability**: Agent can interpret outputs, including images, providing fast way to explore and interact with data

**Workflow**: No required prompts or workflows, but recommended workflow is to have agent and `.ipynb` file open side-by-side

**Additional Use**: Can ask agent to clean up or make aesthetic improvements to Jupyter notebook before showing to colleagues
- Specifically telling it to make notebook or its data visualizations "aesthetically pleasing" tends to help remind it that it's optimizing for human viewing experience

---

## 4. Optimize Your Workflow

### Strategy 1: Be Specific in Your Instructions

**Principle**: Agent's success rate improves significantly with more specific instructions, especially on first attempts

**Benefit**: Giving clear directions upfront reduces need for course corrections later

**Examples**:

**Poor**:
- "add tests for foo.py"

**Good**:
- "write a new test case for foo.py, covering the edge case where the user is logged out. avoid mocks"

**Poor**:
- "why does ExecutionFactory have such a weird api?"

**Good**:
- "look through ExecutionFactory's git history and summarize how its api came to be"

**Poor**:
- "add a calendar widget"

**Good**:
- "look at how existing widgets are implemented on the home page to understand the patterns and specifically how code and interfaces are separated out. HotDogWidget.php is a good example to start with. then, follow the pattern to implement a new calendar widget that lets the user select a month and paginate forwards/backwards to pick a year. Build from scratch without libraries other than the ones already used in the rest of the codebase."

**Key Principle**: Agent can infer intent, but it can't read minds. Specificity leads to better alignment with expectations.

### Strategy 2: Give Agent Images

**Capability**: Agent excels with images and diagrams through several methods:

1. **Paste screenshots**: Pro tip—use screenshot to clipboard shortcut and paste (note: different from regular paste on some systems)
2. **Drag and drop images** directly into prompt input
3. **Provide file paths** for images

**Use Cases**:
- Particularly useful when working with design mocks as reference points for UI development
- Visual charts for analysis and debugging

**Note**: If not adding visuals to context, can still be helpful to be clear with agent about how important it is for result to be visually appealing

### Strategy 3: Mention Files You Want Agent to Look At or Work On

**Capability**: Use tab-completion to quickly reference files or folders anywhere in repository

**Benefit**: Helps agent find or update the right resources

### Strategy 4: Give Agent URLs

**Capability**: Paste specific URLs alongside prompts for agent to fetch and read

**Optimization**: To avoid permission prompts for same domains (e.g., docs.foo.com), use permissions command to add domains to allowlist

### Strategy 5: Course Correct Early and Often

**Principle**: While auto-accept mode lets agent work autonomously, typically get better results by being active collaborator and guiding agent's approach

**Best Results**: Can get best results by thoroughly explaining task to agent at beginning, but can also course correct agent at any time

**Four Tools for Course Correction**:

1. **Ask agent to make plan before coding**: Explicitly tell it not to code until you've confirmed its plan looks good

2. **Press Escape to interrupt**: During any phase (thinking, tool calls, file edits), preserving context so you can redirect or expand instructions

3. **Double-tap Escape to jump back in history**: Edit previous prompt, and explore different direction. Can edit prompt and repeat until get result you're looking for

4. **Ask agent to undo changes**: Often in conjunction with option #2 to take different approach

**Reality**: Agent occasionally solves problems perfectly on first attempt, but using these correction tools generally produces better solutions faster

### Strategy 6: Use Clear Command to Keep Context Focused

**Problem**: During long sessions, agent's context window can fill with:
- Irrelevant conversation
- File contents
- Commands

**Impact**: Can reduce performance and sometimes distract agent

**Solution**: Use clear command frequently between tasks to reset context window

### Strategy 7: Use Checklists and Scratchpads for Complex Workflows

**Use Case**: For large tasks with multiple steps or requiring exhaustive solutions:
- Code migrations
- Fixing numerous lint errors
- Running complex build scripts

**Approach**: Improve performance by having agent use Markdown file (or even GitHub issue!) as checklist and working scratchpad

**Example**: To fix large number of lint issues:
1. Tell agent to run lint command and write all resulting errors (with filenames and line numbers) to Markdown checklist
2. Instruct agent to address each issue one by one, fixing and verifying before checking it off and moving to next

### Strategy 8: Pass Data Into Agent

**Several Methods**:

1. **Copy and paste** directly into prompt (most common approach)

2. **Pipe into agent** (e.g., `cat foo.txt | agent`), particularly useful for:
   - Logs
   - CSVs
   - Large data

3. **Tell agent to pull data** via:
   - Bash commands
   - MCP tools
   - Custom slash commands

4. **Ask agent to read files or fetch URLs** (works for images too)

**Combination**: Most sessions involve combination of these approaches. For example, can pipe in log file, then tell agent to use tool to pull in additional context to debug logs

---

## 5. Use Headless Mode to Automate Infrastructure

### Concept

**Headless Mode**: Non-interactive contexts like CI, pre-commit hooks, build scripts, and automation

**Usage**: Use `-p` flag with prompt to enable headless mode, and `--output-format stream-json` for streaming JSON output

**Note**: Headless mode does not persist between sessions—have to trigger it each session

### Use Case 1: Issue Triage

**Capability**: Headless mode can power automations triggered by GitHub events, such as when new issue is created in repository

**Example**: Public repository uses agent to inspect new issues as they come in and assign appropriate labels

### Use Case 2: Use Agent as Linter

**Capability**: Agent can provide subjective code reviews beyond what traditional linting tools detect

**Identifies Issues Like**:
- Typos
- Stale comments
- Misleading function or variable names
- And more

---

## 6. Uplevel with Multi-Agent Workflows

### Principle

Beyond standalone usage, some of most powerful applications involve running multiple agent instances in parallel

### Strategy 1: Have One Agent Write Code; Use Another Agent to Verify

**Concept**: Simple but effective approach—have one agent write code while another reviews or tests it

**Analogy**: Similar to working with multiple engineers, sometimes having separate context is beneficial

**Process**:
1. Use agent to write code
2. Run clear command or start second agent in another terminal
3. Have second agent review first agent's work
4. Start another agent (or clear again) to read both code and review feedback
5. Have this agent edit code based on feedback

**Variation**: Can do something similar with tests:
- Have one agent write tests
- Have another agent write code to make tests pass

**Communication**: Can even have agent instances communicate with each other by giving them separate working scratchpads and telling them which one to write to and which one to read from

**Benefit**: This separation often yields better results than having single agent handle everything

### Strategy 2: Have Multiple Checkouts of Your Repo

**Approach**: Rather than waiting for agent to complete each step:

1. Create 3-4 git checkouts in separate folders
2. Open each folder in separate terminal tabs
3. Start agent in each folder with different tasks
4. Cycle through to check progress and approve/deny permission requests

**Use Case**: Something many engineers do for parallel work

### Strategy 3: Use Git Worktrees

**Concept**: Lighter-weight alternative to multiple checkouts

**How It Works**: Git worktrees allow you to check out multiple branches from same repository into separate directories. Each worktree has its own working directory with isolated files, while sharing same Git history and reflog

**Benefit**: Enables running multiple agent sessions simultaneously on different parts of project, each focused on its own independent task

**Example**: Might have one agent refactoring authentication system while another builds completely unrelated data visualization component. Since tasks don't overlap, each agent can work at full speed without waiting for other's changes or dealing with merge conflicts

**Process**:
1. Create worktrees: `git worktree add ../project-feature-a feature-a`
2. Launch agent in each worktree: `cd ../project-feature-a && agent`
3. Create additional worktrees as needed (repeat steps 1-2 in new terminal tabs)

**Tips**:
- Use consistent naming conventions
- Maintain one terminal tab per worktree
- If using iTerm2 on Mac, set up notifications for when agent needs attention
- Use separate IDE windows for different worktrees
- Clean up when finished: `git worktree remove ../project-feature-a`

### Strategy 4: Use Headless Mode with Custom Harness

**Integration**: Headless mode integrates agent programmatically into larger workflows while leveraging its built-in tools and system prompt

**Two Primary Patterns**:

**Pattern 1: Fanning Out**
- Handles large migrations or analyses (e.g., analyzing sentiment in hundreds of logs or analyzing thousands of CSVs)
- Process:
  1. Have agent write script to generate task list (e.g., generate list of 2k files that need to be migrated from framework A to framework B)
  2. Loop through tasks, calling agent programmatically for each and giving it task and set of tools it can use
     - Example: `agent -p "migrate foo.py from React to Vue. When you are done, you MUST return the string OK if you succeeded, or FAIL if the task failed." --allowedTools Edit Bash(git commit:*)`
  3. Run script several times and refine prompt to get desired outcome

**Pattern 2: Pipelining**
- Integrates agent into existing data/processing pipelines
- Process:
  1. Call `agent -p "<your prompt>" --json | your_command`, where `your_command` is next step of processing pipeline
  2. JSON output (optional) can help provide structure for easier automated processing

**Debugging**: For both use cases, can be helpful to use `--verbose` flag for debugging agent invocation. Generally recommend turning verbose mode off in production for cleaner output

---

## Key Principles Summary

### Setup Principles

1. **Context Documentation**: Create and tune files that automatically provide context
2. **Tool Allowlist**: Curate permissions for safety and efficiency
3. **Additional Tools**: Install and document tools agent needs

### Tool Extension Principles

1. **Bash Integration**: Document custom bash tools for agent
2. **MCP Integration**: Connect to MCP servers for extended capabilities
3. **Custom Commands**: Create reusable slash commands for repeated workflows

### Workflow Principles

1. **Explore Before Coding**: Research and plan first, code second
2. **Test-Driven Development**: Write tests first, then code
3. **Visual Iteration**: Use screenshots and visual mocks for UI work
4. **Codebase Q&A**: Use agent for learning and exploration
5. **Git/GitHub Integration**: Leverage agent for version control operations

### Optimization Principles

1. **Specificity**: Be specific in instructions for better results
2. **Visual Input**: Provide images and screenshots when relevant
3. **File References**: Mention specific files you want agent to work with
4. **Course Correction**: Interrupt and redirect when needed
5. **Context Management**: Clear context between tasks
6. **Checklists**: Use structured checklists for complex workflows
7. **Data Passing**: Use multiple methods to provide data to agent

### Automation Principles

1. **Headless Mode**: Use for CI/CD and automation
2. **Multi-Agent Workflows**: Run multiple instances in parallel
3. **Git Worktrees**: Isolate parallel work streams
4. **Custom Harnesses**: Integrate agent into larger workflows

---

## Summary

Agentic coding tools are most effective when:

1. **Properly Configured**: Context documentation, tool allowlists, and additional tools set up correctly

2. **Used with Right Workflows**: 
   - Explore-plan-code-commit for complex problems
   - Test-driven development for verifiable changes
   - Visual iteration for UI work
   - Codebase Q&A for learning

3. **Optimized Through Specificity**: Clear instructions, visual inputs, and active collaboration

4. **Scaled Through Parallelization**: Multiple agent instances, git worktrees, and headless automation

**Core Principle**: Agent performs best when it has clear targets to iterate against—tests, visual mocks, or specific requirements. Give agent tools to see its outputs and verify its work for best results.

**Iteration is Key**: Like humans, agent's outputs improve significantly with iteration. While first version might be good, after 2-3 iterations it will typically look much better.

**Flexibility**: These are starting points—experiment and find what works best for your specific use case.

