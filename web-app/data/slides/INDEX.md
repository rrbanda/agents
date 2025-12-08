# Presentation Slides Index

## Overview

This directory contains slide definitions for the Agentic AI 101 presentation.

**Total Slides**: 34  
**Duration**: ~60 minutes  
**Format**: Rich interactive React components

---

## Slide List

### Part 1: Opening (Slides 1-4)

1. **Title Slide** - Agentic AI 101: From Automation to Autonomy
2. **The Frustration** - Persona-Specific Opening (pain points)
3. **What If You Had Superpowers?** - The Promise (vision)
4. **Today's Journey** - Roadmap of the presentation

### Part 2: Foundation & Evolution (Slides 5-11)

5. **What is Generative AI?** - 🆕 Three pillars, how it works, capabilities vs limitations
6. **The Cold Open** - Historical context (machines learned to see, speak, reason)
7. **Large Language Models** - Stage 1: The Age of Words (Since 2018)
8. **AI Assistants** - Stage 2: The Rise of Assistants (Since 2020)
9. **Reasoning & Self-Correction** - Stage 3: The Awakening (Since 2022)
10. **Enter the Agents** - Stage 4: Memory + Tools + Goals (Since 2023)
11. **The Evolution** - Timeline summary of all stages

### Part 3: Understanding Agents (Slides 12-18)

12. **What is an Agent?** - Clear definition with comparison
13. **Anatomy of an Agent** - Progressive step-by-step build-up
14. **Challenges We All Share** - Real-world organizational challenges
15. **The AI-Powered Solution** - How agents help the whole team
16. **The Impact** - Before/after metrics
17. **The Agent Loop** - Gather → Act → Verify → Repeat
18. **Agent Loop by Role** - Persona-specific examples with time savings

### Part 4: Building Effectively (Slides 19-26)

19. **Prompt Engineering Basics** - 🆕 6 techniques for effective prompting (foundational)
20. **Context Engineering** - Progressive disclosure pattern (builds on prompting)
21. **Tool Design & MCP** - Tool patterns and Model Context Protocol
22. **Using RHEL MCP** - 🆕 Talk to Your Linux System (live demo)
23. **Agent Loop in Practice** - Interactive persona-based demos
24. **Best Practices** - Common patterns and guidelines
25. **When to Use Agents** - Decision framework
26. **Current Limitations** - Honest assessment with mitigations

### Part 5: Advanced Topics (Slides 27-29)

27. **Multi-Agent Systems** - Orchestrator, Pipeline, Collaborative patterns
28. **Long-Running Agents** - Challenges and solutions for persistence
29. **Real-World Applications** - Applications by persona

### Part 6: Closing (Slides 30-34)

30. **AI Fluency: The 4Ds** - 🆕 Delegation, Description, Discernment, Diligence
31. **Your Journey Begins** - Actionable next steps
32. **Key Takeaways** - Core principles summary
33. **Questions?** - Q&A slide
34. **Thank You** - Closing slide with resources

---

## New Slides Added (101 Completion)

### Slide 5: What is Generative AI?
- **Content Source**: `_content-draft/13-understanding-generative-ai.md`
- **Topics**: Three pillars (Algorithms, Data, Computing), Pre-training → Fine-tuning → Deployment, Capabilities vs Limitations
- **Why Added**: Foundational knowledge before diving into evolution

### Slide 19: Prompt Engineering Basics  
- **Content Source**: `_content-draft/14-effective-prompt-engineering-techniques.md`
- **Topics**: 6 techniques (Context, Examples, Constraints, Steps, Think-First, Role), Before/after examples
- **Why Added**: Foundational skill needed for working with any AI, especially agents

### Slide 22: Using RHEL MCP - Talk to Your Linux System
- **Content Source**: Fedora Magazine blog post on linux-mcp-server
- **Topics**: Three use cases (System Slow, Disk Full, Upgrade Ready), MCP tools, Architecture diagram
- **Why Added**: Real-world MCP demo for RHEL sysadmin persona

### Slide 30: AI Fluency (The 4Ds)
- **Content Source**: `_content-draft/11-ai-fluency-framework.md`
- **Topics**: Delegation, Description, Discernment, Diligence framework, Human-AI interaction modes
- **Why Added**: Mental model for responsible and effective AI use

---

## Quick Reference

### By Topic

**Foundation**: Slide 5
**Evolution Story**: Slides 6-11
**Agent Definition**: Slides 12-13
**Real Examples**: Slides 14-16, 18, 22
**Patterns**: Slides 17, 19-24
**Decision Making**: Slides 25-26
**Advanced**: Slides 27-29
**Fluency & Responsibility**: Slide 30
**Closing**: Slides 31-34

### By Learning Level

**101 (Fundamentals)**: Slides 1-18, 30-34
**201 (Intermediate)**: Slides 19-26
**301 (Advanced)**: Slides 27-29

---

## Content Sources

All content is sourced from verified materials:

| Slide | Primary Source |
|-------|----------------|
| 5 | `13-understanding-generative-ai.md` |
| 6-11 | `01-agentic-ai-introduction.md` |
| 12-18 | `01-agentic-ai-introduction.md`, `04-agent-architecture-patterns.md` |
| 19 | `14-effective-prompt-engineering-techniques.md` |
| 20 | `05-context-engineering.md` |
| 21 | `06-writing-effective-tools.md` |
| 22 | Fedora Magazine: linux-mcp-server blog post |
| 23-26 | `09-building-effective-agents.md` |
| 27-29 | `02-long-running-agents-and-tool-use.md`, `07-multi-agent-research-systems.md` |
| 30 | `11-ai-fluency-framework.md` |

---

## Technical Implementation

All 34 slides use custom React components with:
- Framer Motion animations
- Interactive tabs and expandable sections
- Responsive design
- Consistent visual language

Component files: `web-app/components/slides/special/`

---

## Notes

- Each slide has a dedicated React component for rich interactivity
- Slide data (metadata) is loaded from `lib/slides.ts`
- Navigation supports keyboard (← →) and click
- Total duration estimate: ~60 minutes at normal pace
