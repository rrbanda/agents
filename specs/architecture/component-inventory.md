# Component Inventory & Patterns

**Status**: As-Built (Extracted from current implementation)
**Last Updated**: 2024-12-15
**Location**: `web-app/components/`

---

## Overview

This document catalogs all React components in the codebase, organized by category with usage patterns and examples.

---

## Component Categories

1. [Animation Wrappers](#animation-wrappers) (3 components)
2. [Diagram Components](#diagram-components) (6 components)
3. [Slide System](#slide-system) (40 components)
4. [UI Components](#ui-components) (5 components)

---

## Animation Wrappers

### TextReveal
**File**: `components/animations/TextReveal.tsx`

**Purpose**: Standard fade-in + slide-up animation for text content.

**Props**:
```typescript
interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;        // Default: 0
  duration?: number;     // Default: 0.4
  className?: string;
}
```

**Usage**:
```tsx
<TextReveal delay={0.2}>
  <h1 className="text-4xl">Animated Heading</h1>
</TextReveal>
```

**Animation**:
- Initial: `opacity: 0, y: 20`
- Animate: `opacity: 1, y: 0`
- Easing: `easeOut`

**Used In**: 50+ components across slides

---

### LineReveal
**File**: `components/animations/LineReveal.tsx`

**Purpose**: Similar to TextReveal but optimized for line-by-line reveals in markdown content.

**Props**:
```typescript
interface LineRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}
```

**Usage**:
```tsx
<LineReveal delay={0}>
  <p>First line</p>
</LineReveal>
<LineReveal delay={0.1}>
  <p>Second line</p>
</LineReveal>
```

**Used In**: `SlideContent.tsx` markdown renderer

---

### StaggerChildren
**File**: `components/animations/StaggerChildren.tsx`

**Purpose**: Container that staggers animation of child elements.

**Props**:
```typescript
interface StaggerChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;  // Default: 0.1
  className?: string;
}
```

**Usage**:
```tsx
<StaggerChildren staggerDelay={0.1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggerChildren>
```

**Used In**: Home page, navigation, list-heavy slides

---

## Diagram Components

### AnatomyProgressive
**File**: `components/diagrams/AnatomyProgressive.tsx`
**Size**: 19KB (largest diagram component)

**Purpose**: 4-step progressive disclosure diagram showing agent anatomy layers.

**Features**:
- 4 steps: Overview → Persona → Tools → Memory
- Interactive step buttons
- Hover effects on each phase
- Animated transitions between steps
- Arrows showing flow

**State**:
```typescript
const [currentStep, setCurrentStep] = useState(1); // 1-4
const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);
```

**Usage**:
```tsx
<AnatomyProgressive />
```

**Used In**: Slide 14 (AnatomyProgressiveSlide)

**Pattern**: Click steps 1-4 to reveal progressive detail

---

### AgentLoop
**File**: `components/diagrams/AgentLoop.tsx`
**Size**: 5.6KB

**Purpose**: Interactive 3-phase agent loop diagram with persona-specific examples.

**Phases**:
1. Gather Context (green)
2. Take Action (blue)
3. Verify Work (purple)

**Props**:
```typescript
interface AgentLoopProps {
  persona?: Persona; // Affects example text
}
```

**State**:
```typescript
const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
```

**Usage**:
```tsx
<AgentLoop persona="devops" />
```

**Persona Examples**:
- `sysadmin`: "Check disk space", "Free up space", "Confirm services"
- `devops`: "Check CI status", "Trigger deployment", "Verify health checks"
- `developer`: "Understand requirements", "Write code", "Tests pass"
- `platform`: "Analyze metrics", "Build feature", "Usage metrics"

**Used In**: Slide 12 (AgentLoopSlide)

---

### AgentAnatomy
**File**: `components/diagrams/AgentAnatomy.tsx`
**Size**: 9.6KB

**Purpose**: Shows 7 components of an agent system.

**Components Displayed**:
1. Persona (purple)
2. Objectives (blue)
3. Context (green)
4. Tools (orange)
5. Examples (yellow)
6. Memory (pink)
7. Coordination (teal)

**Layout**: Grid with connecting lines

**Usage**:
```tsx
<AgentAnatomy />
```

**Pattern**: Static display with entrance animations

---

### EvolutionTimeline
**File**: `components/diagrams/EvolutionTimeline.tsx`
**Size**: 4.2KB

**Purpose**: Horizontal timeline showing AI evolution milestones.

**Milestones**:
- 1950s: Early AI research
- 1997: Deep Blue
- 2011: Watson
- 2016: AlphaGo
- 2018: GPT-1
- 2023: ChatGPT
- 2024: AI Agents

**Layout**: Horizontal timeline with dots and labels

**Usage**:
```tsx
<EvolutionTimeline />
```

**Used In**: Slide 4 (Evolution slide)

---

### SolarScoutWorkflow
**File**: `components/diagrams/SolarScoutWorkflow.tsx`
**Size**: 3.6KB

**Purpose**: Example workflow diagram for Solar Scout agent.

**Steps**:
1. User Input: "Find best solar panels"
2. Gather Data: Research models, prices
3. Analyze: Compare options
4. Present: Recommendation with links

**Layout**: Vertical flow with arrows

**Usage**:
```tsx
<SolarScoutWorkflow />
```

**Used In**: Slide 26 (Real-world example)

---

### ProgressiveDisclosure
**File**: `components/diagrams/ProgressiveDisclosure.tsx`
**Size**: 3.2KB

**Purpose**: Generic progressive disclosure pattern template.

**Pattern**: Show/hide content layers on interaction

**Usage**:
```tsx
<ProgressiveDisclosure />
```

---

## Slide System

### Slide (Router)
**File**: `components/slides/Slide.tsx`
**Size**: 6.7KB

**Purpose**: Routes to correct slide component based on slide number.

**Props**:
```typescript
interface SlideProps {
  slide: Slide;          // Slide data
  persona?: Persona;     // Current persona selection
}
```

**Pattern**: Switch statement routing
```typescript
const renderSlideContent = () => {
  switch (slide.number) {
    case 1: return <TitleSlide />;
    case 2: return <FrustrationSlide />;
    // ... 32 more cases
    case 12: return <AgentLoopSlide persona={persona} />;
    default: return <SlideContent content={slide.content.content} />;
  }
};
```

**Animation**: Page transition (slide left/right)

**Used In**: Presentation page

---

### SlideContent
**File**: `components/slides/SlideContent.tsx`
**Size**: 3.5KB

**Purpose**: Generic markdown renderer for simple slides (fallback).

**Props**:
```typescript
interface SlideContentProps {
  content: string;       // Markdown string
}
```

**Features**:
- Parses markdown with `react-markdown`
- Uses `remark-gfm` for tables, strikethrough
- Removes H1 from content (shown separately)
- Custom component styling for all markdown elements
- Wraps headings/paragraphs in `LineReveal` animations

**Custom Components**:
```typescript
components={{
  h1: ({ children }) => <LineReveal><h1 className="...">{children}</h1></LineReveal>,
  h2: ({ children }) => <LineReveal><h2 className="...">{children}</h2></LineReveal>,
  p: ({ children }) => <LineReveal><p className="...">{children}</p></LineReveal>,
  ul: ({ children }) => <ul className="list-disc list-inside...">{children}</ul>,
  code: ({ children }) => <code className="bg-gray-800 px-2 py-1...">{children}</code>,
  // ... 10+ more
}}
```

**Usage**:
```tsx
<SlideContent content={slide.content.content} />
```

**Used In**: Default case in Slide.tsx router, 9 slides without custom components

---

### SectionHeader
**File**: `components/slides/SectionHeader.tsx`
**Size**: 647B (smallest component)

**Purpose**: Section divider slide with gradient background.

**Props**:
```typescript
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}
```

**Layout**: Full-screen centered with gradient

**Usage**:
```tsx
<SectionHeader
  title="Part 2: Building Agents"
  subtitle="Architecture and patterns"
/>
```

**Used In**: Slides 6, 11, 18, 25, 31 (section dividers)

---

### Special Slide Components (38 total)

**Location**: `components/slides/special/`

#### Representative Examples:

**TitleSlide.tsx**:
- Large animated title
- Subtitle
- Navigation hints (keyboard shortcuts)
- Floating gradient background elements

**WhatIsAgentSlide.tsx**:
- Section header
- 5 key capabilities (line-by-line reveal)
- Definition with emphasis

**RealWorldProblemSlide.tsx**:
- Problem statement
- Before/after comparison
- Visual emphasis with gradients

**AgentLoopSlide.tsx**:
- Uses AgentLoop diagram
- Accepts persona prop
- Contextual description

**AnatomyProgressiveSlide.tsx**:
- Uses AnatomyProgressive diagram
- Interactive step-through
- Explanatory text

**PromptEngineeringSlide.tsx**:
- 6 techniques (grid layout)
- Click to select technique
- Shows before/after examples
- Animated transitions

**PersonaExamplesSlide.tsx**:
- Shows agent loop per persona
- Persona selector
- Different examples for each role

#### Naming Pattern:
- Descriptive name + "Slide" suffix
- PascalCase
- Located in `special/` folder
- **Note**: Some slides are used in the 101 course, others in 201 course

#### Common Patterns:
1. **Container**: Full height flex centering
2. **TextReveal wrappers**: Staggered delays (0, 0.2, 0.4, ...)
3. **Max-width constraint**: `max-w-4xl` for text
4. **Responsive padding**: `px-6 md:px-12`
5. **Framer Motion**: `motion.div` for animations

**Full List** (37 files):
1. AIFluencySlide.tsx
2. AgentLoopPracticeSlide.tsx
3. AgentLoopSlide.tsx
4. AnatomyProgressiveSlide.tsx
5. AnatomySlide.tsx
6. ApplicationsSlide.tsx
7. AssistantsSlide.tsx
8. ColdOpenSlide.tsx
9. CommonPatternsSlide.tsx
10. ContextEngineeringSlide.tsx
11. ConvergenceSlide.tsx
12. EvolutionSlide.tsx
13. FrustrationSlide.tsx
14. GenerativeAISlide.tsx
15. JourneyBeginsSlide.tsx
16. LanguageModelsSlide.tsx
17. LimitationsSlide.tsx
18. LinuxMCPSlide.tsx
19. LongRunningSlide.tsx
20. MultiAgentSlide.tsx
21. PersonaExamplesSlide.tsx
22. ProgressiveDisclosureSlide.tsx
23. PromptEngineeringSlide.tsx
24. QuestionsSlide.tsx
25. RealWorldProblemSlide.tsx
26. RealWorldSolutionSlide.tsx
27. ReasoningSlide.tsx
28. SolarScoutImpactSlide.tsx
29. SolarScoutProblemSlide.tsx
30. TakeawaysSlide.tsx
31. ThankYouSlide.tsx
32. TitleSlide.tsx
33. ToolDesignSlide.tsx
34. WhatIfSlide.tsx
35. WhatIsAgentSlide.tsx
36. WhatWellCoverSlide.tsx
37. WhenToUseSlide.tsx

---

## UI Components

### Navigation
**File**: `components/ui/Navigation.tsx`
**Size**: 3.6KB

**Purpose**: Slide navigation controls (fixed bottom bar).

**Props**:
```typescript
interface NavigationProps {
  currentSlideIndex: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  progress: number;      // 0-100
}
```

**Features**:
- Previous/Next buttons (disabled at boundaries)
- Slide counter "15 / 34"
- Progress bar (blue animated)
- Keyboard event listeners (arrow keys, space)
- Touch gesture support

**Layout**: Fixed bottom, full width, semi-transparent background with blur

**Usage**:
```tsx
<Navigation
  currentSlideIndex={14}
  totalSlides={34}
  onPrevious={() => setSlide(prev => prev - 1)}
  onNext={() => setSlide(prev => prev + 1)}
  progress={42}
/>
```

**Used In**: Presentation page (fixed to bottom)

---

### SiteNav
**File**: `components/ui/SiteNav.tsx`
**Size**: 7.1KB

**Purpose**: Top navigation bar with logo and menu.

**Features**:
- Logo/brand link to home
- Desktop: Full menu with links
- Mobile: Hamburger menu
- Responsive layout
- Sticky positioning
- Dark theme with blur backdrop

**Menu Items**:
```typescript
const menuItems = [
  { label: 'Learn', href: '/learn' },
  { label: 'Blog', href: '/blog', badge: 'Soon' },
  { label: 'Podcasts', href: '/podcasts', badge: 'Soon' },
  { label: 'Events', href: '/events', badge: 'Soon' },
  { label: 'Newsletter', href: '/newsletter', badge: 'Soon' },
];
```

**Mobile Pattern**:
- Hamburger icon (3 lines)
- Slide-out menu
- Overlay background

**Usage**:
```tsx
<SiteNav />
```

**Used In**: Root layout (all pages)

---

### PersonaSelector
**File**: `components/ui/PersonaSelector.tsx`
**Size**: 2KB

**Purpose**: Persona switcher (fixed top-right).

**Props**:
```typescript
interface PersonaSelectorProps {
  persona: Persona;
  onChange: (persona: Persona) => void;
}
```

**Personas**:
- All
- Sysadmin
- DevOps
- Developer
- Platform Engineer

**Layout**: Dropdown select, fixed position top-right

**Usage**:
```tsx
<PersonaSelector
  persona={persona}
  onChange={setPersona}
/>
```

**Used In**: Presentation page (slides with persona-specific content)

---

### PresenterPanel
**File**: `components/ui/PresenterPanel.tsx`
**Size**: 8.7KB

**Purpose**: Speaker notes panel for presenter mode.

**Props**:
```typescript
interface PresenterPanelProps {
  slide: Slide;
  isOpen: boolean;
  onToggle: () => void;
  mode?: 'compact' | 'full'; // Default: 'full'
}
```

**Features**:
- Toggle button (floating or inline)
- Drawer/panel with speaker notes
- Displays: Objective, duration, talking points, emphasis, examples, questions
- Keyboard shortcut: `P` to toggle
- Two modes:
  - **Compact**: Fixed bottom panel
  - **Full**: Side drawer

**Layout**:
- Closed: Floating button (bottom-right)
- Open: Fixed bottom panel with scrollable content

**Usage**:
```tsx
const [showNotes, setShowNotes] = useState(false);

<PresenterPanel
  slide={currentSlide}
  isOpen={showNotes}
  onToggle={() => setShowNotes(!showNotes)}
  mode="compact"
/>
```

**Used In**: Presentation page, Presenter page

---

### InfoPoint
**File**: `components/ui/InfoPoint.tsx`
**Size**: 5.2KB

**Purpose**: Information callout/tooltip component.

**Props**:
```typescript
interface InfoPointProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  variant?: 'info' | 'warning' | 'success';
}
```

**Variants**:
- `info`: Blue gradient
- `warning`: Orange/yellow
- `success`: Green

**Layout**: Card with icon, title, description

**Usage**:
```tsx
<InfoPoint
  title="Pro Tip"
  description="Use keyboard shortcuts for faster navigation"
  icon={<SparklesIcon />}
  variant="info"
/>
```

**Used In**: Various slides for callouts and tips

---

## Component Patterns Summary

### Naming Conventions
- **Components**: PascalCase (`TitleSlide`, `Navigation`)
- **Animation wrappers**: Descriptive action (`TextReveal`, `LineReveal`)
- **Diagrams**: Concept name (`AgentLoop`, `AnatomyProgressive`)
- **Slides**: `<Concept>Slide` pattern

### File Organization
```
components/
├── animations/        # Reusable motion wrappers
├── diagrams/          # Visual system diagrams
├── slides/
│   ├── Slide.tsx      # Router
│   ├── SlideContent.tsx # Generic renderer
│   └── special/       # Custom slide implementations
└── ui/                # Shared UI elements
```

### Props Patterns
- Always define TypeScript interface: `<ComponentName>Props`
- Optional props use `?` suffix
- Default values in destructuring
- Children typed as `React.ReactNode`

### Animation Patterns
- Use `motion.div` from Framer Motion
- Standard entrance: `opacity: 0, y: 20` → `opacity: 1, y: 0`
- Stagger with delays: 0, 0.2, 0.4, 0.6, ...
- Hover effects: `whileHover`, `whileTap`

### Styling Patterns
- Tailwind CSS classes inline
- No CSS modules or styled-components
- Dark theme default: `bg-gray-900`, `text-white`
- Responsive: `text-lg md:text-xl`

### State Management
- Local `useState` for component state
- No global state (Redux, Context)
- Props drilling for persona (max 2 levels)
- URL params for slide navigation

---

## Related Files

| File | Purpose |
|------|---------|
| `lib/types.ts` | Type definitions for all props |
| `ADR 0003` | Component-Based Slides decision |
| `ADR 0005` | Framer Motion decision |
| `ui-ux-design-system.md` | Styling and design patterns |

---

This inventory captures **all components** in the current web-app codebase. Future development should follow these established patterns.
