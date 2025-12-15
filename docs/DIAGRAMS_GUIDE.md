# Diagrams and Visuals Guide

## Overview

This document provides detailed specifications for all diagrams, architecture visuals, and visual elements needed for the presentation.

---

## Key Diagrams Required

### 1. Agent Anatomy Diagram (Slide 12)

**Type**: Hub-and-spoke architecture diagram

**Components**:
- Central "Agent Core" (circle/hexagon)
- 7 components arranged around core:
  1. Goal & Constraints (top-left)
  2. LLM Brain (center-top)
  3. Memory (top-right)
  4. Tools/APIs (right)
  5. Planner/Scheduler (bottom-right)
  6. Reflection Loop (bottom)
  7. Human Oversight (top, separate)
- Living Loop: Circular flow at bottom
- Arrows showing data flow

**Specifications**:
- Size: Central core ~30% of slide, components ~15% each
- Colors: Core (blue), Components (gray), Loop (green), Human Oversight (orange)
- Arrows: Bidirectional where applicable
- Labels: Clear, readable (minimum 18pt)
- Format: Vector graphics (SVG recommended)

**Tools**: Draw.io, Lucidchart, Figma, PowerPoint SmartArt

---

### 2. Agent Loop Pattern Diagram (Slide 16)

**Type**: Circular flow diagram

**Components**:
- Three main phases in circular flow:
  1. Gather Context
  2. Take Action
  3. Verify Work
- "Repeat" creates the loop
- Persona examples shown below

**Specifications**:
- Size: Main loop ~60% of slide, examples ~30%
- Colors: Gather (blue), Act (green), Verify (orange), Repeat (red)
- Shape: Circular/rounded rectangles
- Arrows: Clear directional flow
- Format: Vector graphics

**Tools**: Draw.io, Lucidchart, Figma

---

### 3. Evolution Timeline Diagram (Slide 10)

**Type**: Horizontal timeline

**Components**:
- Four stages: LLMs → Assistants → Reasoning → Agents
- Years: 2017-2020, 2020-2022, 2022-2023, 2023-Present
- Key characteristics under each stage
- Summary statements (italicized)
- Connecting arrows

**Specifications**:
- Size: Timeline spans ~90% of slide width
- Colors: LLMs (gray), Assistants (blue), Reasoning (green), Agents (gold)
- Typography: Stage names (24pt+), characteristics (16pt), summaries (18pt italic)
- Format: Vector graphics or timeline template

**Tools**: PowerPoint timeline, Draw.io, Timeline.js

---

### 4. Progressive Disclosure Diagram (Slide 18)

**Type**: Pyramid/Triangle diagram

**Components**:
- Three levels:
  1. Level 1: Metadata (top, smallest)
  2. Level 2: Content (middle)
  3. Level 3: Deep Dive (bottom, largest)
- Down arrows showing progression
- Token usage indicator
- Detail level indicator

**Specifications**:
- Size: Pyramid ~70% of slide
- Colors: Level 1 (light blue), Level 2 (medium blue), Level 3 (dark blue)
- Shape: Inverted pyramid
- Format: Vector graphics

**Tools**: PowerPoint SmartArt, Draw.io, Figma

---

### 5. Solar Scout Workflow Diagram (Slide 14)

**Type**: Timeline flowchart

**Components**:
- Timeline: 7:00 AM to 7:30 AM
- Six workflow steps:
  1. Wake Up
  2. Research News
  3. Summarize Teams
  4. Draft Emails
  5. Post Slack
  6. Report Complete
- Arrows showing progression
- Before/After comparison

**Specifications**:
- Size: Timeline ~70% of slide, comparison ~20%
- Colors: Steps (blue gradient), arrows (green), comparison (yellow)
- Shape: Horizontal timeline with boxes
- Typography: Time stamps (24pt+), steps (18pt+)
- Format: Flowchart or timeline

**Tools**: PowerPoint SmartArt, Draw.io, Lucidchart

---

## Visual Style Guide

### Color Palette

**Primary Colors**:
- Blue: #2563EB (trust, technology)
- Green: #10B981 (success, progress)
- Orange: #F59E0B (attention, action)
- Red: #EF4444 (important, repeat)
- Gold: #F59E0B (current state, value)

**Neutral Colors**:
- Dark Background: #1F2937 (slides)
- Light Text: #F9FAFB (on dark)
- Gray: #6B7280 (secondary text)

**Gradients**: Use sparingly for emphasis

### Typography

**Headings**:
- Font: Sans-serif (Arial, Helvetica, or similar)
- Size: 32-48pt (titles), 24-32pt (section headers)
- Weight: Bold

**Body Text**:
- Font: Sans-serif
- Size: 18-24pt (main content), 14-18pt (supporting)
- Weight: Regular

**Emphasis**:
- Italic: For summaries and quotes
- Bold: For key concepts
- Color: For highlights

### Layout Principles

**Spacing**:
- Generous whitespace
- Clear visual hierarchy
- Consistent margins (10% of slide)

**Alignment**:
- Left-align text (except titles)
- Center-align diagrams
- Consistent alignment throughout

**Contrast**:
- High contrast for readability
- Dark backgrounds with light text
- Color contrast for emphasis

---

## Diagram Creation Tools

### Recommended Tools

1. **Draw.io (diagrams.net)**
   - Free, web-based
   - Good for flowcharts and architecture diagrams
   - Export to SVG/PNG

2. **Lucidchart**
   - Professional diagrams
   - Good templates
   - Collaboration features

3. **Figma**
   - Design-focused
   - Good for custom visuals
   - Vector graphics

4. **PowerPoint SmartArt**
   - Built-in templates
   - Easy to customize
   - Integrated with slides

5. **Miro/Mural**
   - Collaborative whiteboarding
   - Good for brainstorming
   - Export capabilities

### Export Formats

**Preferred**:
- SVG (vector, scalable)
- PNG (raster, high resolution, 300 DPI)

**For Presentations**:
- Embedded in PowerPoint/Google Slides
- Maintain aspect ratios
- Ensure readability at presentation size

---

## Implementation Checklist

### For Each Diagram

- [ ] Create diagram using specified tool
- [ ] Follow color palette
- [ ] Use correct typography
- [ ] Ensure readability at presentation size
- [ ] Add labels and annotations
- [ ] Export in appropriate format
- [ ] Test in presentation software
- [ ] Verify colors work in presentation environment
- [ ] Check contrast and readability
- [ ] Add to slide with proper positioning

### Quality Checks

- [ ] All diagrams follow style guide
- [ ] Consistent visual language
- [ ] Professional appearance
- [ ] Appropriate for business audience
- [ ] Clear and understandable
- [ ] Supports speaker notes
- [ ] Enhances understanding

---

## Additional Visual Elements

### Icons

**Use for**:
- Persona identification
- Tool categories
- Process steps

**Style**: 
- Simple, line-based
- Consistent style
- Professional appearance

**Sources**: 
- Flaticon
- Icons8
- Font Awesome

### Charts/Graphs

**If needed for**:
- Token usage comparisons
- Time savings
- Cost comparisons

**Style**:
- Clean, minimal
- Clear labels
- Professional colors

---

## References

All diagrams should support the content from:
- Content 1: Agentic AI Introduction
- Content 4: Agent Architecture Patterns
- Content 5: Context Engineering
- Other relevant content drafts

See `CONTENT_VERIFICATION.md` for source mapping.

