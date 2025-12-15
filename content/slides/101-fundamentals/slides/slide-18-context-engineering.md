# Slide 18: Context Engineering

## Slide Content

### The Challenge

**Problem**: Agents need context, but context is expensive.

**Solution**: Progressive Disclosure

```
Level 1: Metadata (name, description)
    ↓ Loaded at startup
Level 2: Full content (instructions)
    ↓ Loaded when relevant
Level 3: Deep dive (specific files)
    ↓ Loaded only when needed
```

**Key Insight**: Load only what's needed, when it's needed.

---

## Speaker Notes

### Detailed Explanation

**Opening**: "Here's a critical challenge: agents need context, but context is expensive."

**The Problem**:
- "Context windows are limited"
- "Every token costs money and time"
- "Loading everything upfront wastes resources"
- "You might load 100K tokens but only need 5K"

**The Solution - Progressive Disclosure** (point to pyramid):

**Level 1: Metadata** (top)
- "Start with just names and descriptions"
- "Like a table of contents"
- "Loaded at startup, always available"
- "Small, fast, efficient"

**Level 2: Content** (middle)
- "When relevant, load full instructions"
- "Like reading a chapter"
- "Only loaded when needed"
- "Medium size, loaded on demand"

**Level 3: Deep Dive** (bottom)
- "When specific, load detailed files"
- "Like reading the fine print"
- "Only loaded when absolutely necessary"
- "Large, loaded only when needed"

**The Benefits**:
- "Saves tokens - only load what you need"
- "Faster - less to process"
- "More efficient - better use of context window"
- "Scalable - works with thousands of tools"

**Real-World Example**:
- "Imagine you have 1000 tools available"
- "Loading all definitions: 150K tokens"
- "With progressive disclosure: 5K tokens initially"
- "Only load specific tools when needed"
- "Result: 97% token savings"

**Key Insight**: "Load only what's needed, when it's needed. This is context engineering."

**Transition**: "Now let's talk about the tools themselves."

**Timing**: 2-3 minutes

**References**: See Content 5, Section "Effective Context Anatomy"

---

## Visual Description

### Progressive Disclosure Diagram

**Layout**: Pyramid/Triangle showing three levels

```
                    ┌─────────────────────┐
                    │   Level 1: Metadata │
                    │  (Name, Description)│
                    │   Loaded at startup │
                    └──────────┬──────────┘
                               │
                               ↓
                    ┌─────────────────────┐
                    │  Level 2: Content   │
                    │   (Instructions)    │
                    │  Loaded when relevant│
                    └──────────┬──────────┘
                               │
                               ↓
                    ┌─────────────────────┐
                    │ Level 3: Deep Dive   │
                    │  (Specific Files)    │
                    │ Loaded only when needed│
                    └─────────────────────┘

         Token Usage: High → Medium → Low
         Detail Level: Low → Medium → High
```

**Visual Elements**:
- Pyramid shape showing hierarchy
- Three distinct levels
- Arrows showing progression
- Token usage indicator
- Detail level indicator

**Design Specifications**:
- **Size**: Pyramid ~70% of slide
- **Colors**: 
  - Level 1 (top): Light blue (small, loaded first)
  - Level 2 (middle): Medium blue (medium size)
  - Level 3 (bottom): Dark blue (large, loaded last)
- **Shape**: Inverted pyramid (smallest at top)
- **Arrows**: Downward flow
- **Metrics**: Token usage and detail level shown

**Alternative View**: Can show as layers:
```
┌─────────────────────────────────────┐
│  Level 1: Metadata (Always Loaded)  │
├─────────────────────────────────────┤
│  Level 2: Content (When Relevant)   │
├─────────────────────────────────────┤
│  Level 3: Deep Dive (When Needed)  │
└─────────────────────────────────────┘
```

**Visual Metaphor**: Like an iceberg - small visible part (metadata), larger hidden parts (content, deep dive)

---

## References

**Source**: Content 5 - Context Engineering
- Section: "Effective Context Anatomy"
- Concept: "Progressive disclosure - loading information only as needed"
- Principle: "Load only what's needed, when it's needed"

**Additional Context**: Content 4 - Agent Architecture Patterns
- Section: "Phase 1: Gather Context"
- Concept: "Agentic Search and the File System"
- Strategy: "Progressive disclosure allows models to read tool definitions on-demand"

