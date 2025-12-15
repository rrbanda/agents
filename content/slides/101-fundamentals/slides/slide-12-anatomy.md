# Slide 12: Anatomy of an Agent

## Slide Content

### The 7 Components

1. **Goal & Constraints** - Defines mission and boundaries
2. **LLM Brain** - Understands, reasons, plans
3. **Memory** - Short-term context and long-term history
4. **Tools/APIs** - Acts in the real world
5. **Planner/Scheduler** - Sequences steps
6. **Reflection Loop** - Evaluates its own work
7. **Human Oversight** - Ensures alignment and safety

**The Living Loop**: Perceive → Reason → Act → Reflect → Learn

---

## Speaker Notes

### Detailed Explanation

**Opening**: "Let's break down what makes an agent work. There are 7 key components, and they all work together."

**Component-by-Component** (point to each on diagram):

1. **Goal & Constraints** (top-left)
   - "This defines what the agent is trying to achieve"
   - "And what boundaries it must respect"
   - "Without this, the agent has no direction"

2. **LLM Brain** (center-top)
   - "This is the intelligence - the language model"
   - "It understands, reasons, and plans"
   - "This is what makes it 'smart'"

3. **Memory** (top-right)
   - "Two types: short-term and long-term"
   - "Short-term: what's happening right now"
   - "Long-term: what it learned before"
   - "This is what makes it remember"

4. **Tools/APIs** (right)
   - "This is how it acts in the world"
   - "Can call APIs, run commands, interact with systems"
   - "This is what makes it capable"

5. **Planner/Scheduler** (bottom-right)
   - "Breaks goals into steps"
   - "Decides what to do first, second, third"
   - "This is what makes it organized"

6. **Reflection Loop** (bottom)
   - "Evaluates its own work"
   - "Did it succeed? Can it improve?"
   - "This is what makes it learn"

7. **Human Oversight** (top)
   - "Ensures alignment and safety"
   - "Human in the loop when needed"
   - "This is what makes it trustworthy"

**The Living Loop** (point to circular flow):
- "This is how they all work together"
- "Perceive: gather information"
- "Reason: think about it"
- "Act: do something"
- "Reflect: evaluate"
- "Learn: improve"
- "And it repeats"

**Key Insight**: "None of these work alone. They're all connected. That's what makes an agent powerful."

**Transition**: "Now let's see this in action with a real example."

**Timing**: 3-4 minutes

**References**: See Content 1, Section "Core Architecture"

---

## Visual Description

### Architecture Diagram

**Layout**: Central hub-and-spoke design

```
                    [Human Oversight]
                           ↓
                    ┌─────────────┐
                    │    AGENT    │
                    │    CORE     │
                    └─────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   [Goal &        [LLM Brain]        [Memory]
 Constraints]         │              │
        │              │              │
        │         ┌────┴────┐        │
        │         │         │        │
   [Planner/  [Tools/APIs] [Reflection]
  Scheduler]         │         │
        │              │         │
        └──────────────┴─────────┘
                      │
            [Living Loop Flow]
        Perceive → Reason → Act → Reflect → Learn
```

**Visual Elements**:
- Central "Agent Core" circle/hexagon
- 7 components arranged around it
- Arrows showing data flow
- "Living Loop" shown as circular flow at bottom
- Human Oversight at top (different color/style)
- Color coding: Core (center), Components (around), Loop (bottom)

**Design Specifications**:
- **Size**: Central core ~30% of slide, components ~15% each
- **Colors**: Core (blue), Components (gray), Loop (green), Human Oversight (orange)
- **Arrows**: Show bidirectional flow where applicable
- **Labels**: Clear, readable font (minimum 18pt)
- **Spacing**: Even distribution around core

**Alternative View**: Can also show as layered architecture:
- Layer 1: Human Oversight (top)
- Layer 2: Goal & Constraints, Planner/Scheduler
- Layer 3: LLM Brain (center)
- Layer 4: Memory, Tools/APIs
- Layer 5: Reflection Loop (bottom)
- Living Loop: Circular flow connecting all layers

---

## References

**Source**: Content 1 - Agentic AI Introduction (Version B)
- Section: "Core Architecture (Anatomy of an Agent)"
- Table: Component definitions
- Concept: "The control cycle: Perceive → Reason → Act → Reflect → Learn"

**Additional Context**: Content 9 - Building Effective Agents
- Section: "Building Blocks (Augmented LLM)"
- Concept: Components working together

