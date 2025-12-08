# Slide 16: The Agent Loop Pattern

## Slide Content

### How Agents Work

**The Fundamental Pattern:**

**Gather Context**

↓

**Take Action**

↓

**Verify Work**

↓

**Repeat**

---

**This applies to ALL technical work:**

SysAdmins: Gather logs → Analyze → Verify fixes

DevOps: Gather metrics → Deploy → Verify deployment

Developers: Gather code → Write → Verify tests

---

**Same pattern. Different tools. Universal principle.**

---

## Speaker Notes

### Detailed Explanation

**Opening**: "Here's the fundamental pattern that all agents follow. It's simple, but powerful."

**The Pattern** (point to each phase):

1. **Gather Context**
   - "First, the agent needs information"
   - "What's the current state? What do I need to know?"
   - "This is the foundation for everything else"

2. **Take Action**
   - "Based on what it gathered, it takes action"
   - "Makes a change, calls a tool, writes code"
   - "This is where it actually does something"

3. **Verify Work**
   - "Did it work? Did it succeed?"
   - "Checks the result, tests the output"
   - "This is how it knows if it's on track"

4. **Repeat**
   - "And it does it again"
   - "Gathers more context, takes next action, verifies"
   - "This is how it makes progress"

**The Universal Application** (point to examples):
- "This isn't just for agents - this is how ALL technical work happens"
- "SysAdmins: Gather logs, analyze, verify fixes"
- "DevOps: Gather metrics, deploy, verify deployment"
- "Developers: Gather code context, write code, verify tests"
- "Same pattern. Different tools. Universal principle."

**Key Insight**: 
- "This is how humans work too"
- "We gather info, take action, verify results"
- "Agents just do it faster and more consistently"

**Real-World Connection**:
- "Think about debugging a problem"
- "You gather logs (Gather Context)"
- "You try a fix (Take Action)"
- "You check if it worked (Verify Work)"
- "And you repeat until it's fixed"
- "Agents do the same thing"

**Transition**: "Now let's see how this applies to your specific work."

**Timing**: 3-4 minutes

**References**: See Content 4, Section "The Agent Loop Pattern"

---

## Visual Description

### Agent Loop Diagram

**Layout**: Circular flow with persona examples

```
                    ┌─────────────────┐
                    │  Gather Context │
                    └────────┬────────┘
                             │
                             ↓
                    ┌─────────────────┐
                    │   Take Action   │
                    └────────┬────────┘
                             │
                             ↓
                    ┌─────────────────┐
                    │   Verify Work   │
                    └────────┬────────┘
                             │
                             ↓
                         [Repeat]
                             │
                             ↑
                             │
                    ┌────────┴────────┐
                    │   (Loop Back)   │
                    └─────────────────┘

    ┌─────────────────────────────────────────────┐
    │         Persona-Specific Examples           │
    ├─────────────────────────────────────────────┤
    │ SysAdmin: Logs → Analyze → Verify fixes    │
    │ DevOps:   Metrics → Deploy → Verify deploy  │
    │ Developer: Code → Write → Verify tests      │
    └─────────────────────────────────────────────┘
```

**Visual Elements**:
- Three main phases in circular flow
- "Repeat" creates the loop
- Persona examples shown below
- Arrows show direction of flow
- Visual emphasis on "Repeat" to show continuity

**Design Specifications**:
- **Size**: Main loop ~60% of slide, examples ~30%
- **Colors**: 
  - Gather Context (blue)
  - Take Action (green)
  - Verify Work (orange)
  - Repeat (red, emphasized)
- **Shape**: Circular/rounded rectangles for phases
- **Arrows**: Clear directional flow
- **Persona Examples**: Boxed, easy to read

**Alternative View**: Can show as linear with loop-back:
```
[Gather] → [Act] → [Verify] → [Repeat] → [Gather]...
```

**Cinematic Reveal**: 
- Start with pattern only
- Then reveal persona examples
- Finally emphasize "Universal principle"

---

## References

**Source**: Content 4 - Agent Architecture Patterns
- Section: "The Agent Loop Pattern"
- Concept: "Gather Context → Take Action → Verify Work → Repeat"
- Explanation: "This loop offers a useful way to think about how agents should be structured"

**Additional Context**: Content 9 - Building Effective Agents
- Section: "Common Workflows"
- Concept: Pattern applies to all technical work

