# Feature Spec: Slide Presentation System (As-Built)

**Status**: Implemented & Deployed
**Version**: 1.0
**Last Updated**: 2024-12-15

---

## Overview

Interactive slide presentation system for delivering AI/Agentic Systems educational content. Currently supports 101 course (34 slides) and 201 course (27 slides).

**Live URL**: https://rrbanda.github.io/ai-hub/presentation

---

## User Stories

### As a Learner, I can:
- ✅ View interactive slide presentations with animations
- ✅ Navigate slides using keyboard (arrow keys, space)
- ✅ Navigate slides using touch gestures (mobile swipe)
- ✅ See my progress through the presentation
- ✅ Deep link to specific slides via URL
- ✅ Switch persona to see role-specific examples
- ✅ View presentations on mobile, tablet, desktop

### As a Presenter, I can:
- ✅ Toggle speaker notes with 'P' key
- ✅ See slide objectives, talking points, examples
- ✅ Navigate smoothly between slides
- ✅ Share specific slide URLs

---

## Technical Implementation

### Architecture

**Pattern**: Component-based slides with static JSON data

**Tech Stack**:
- Next.js 16 (App Router + Static Export)
- React 18
- TypeScript (strict mode)
- Framer Motion (animations)
- Tailwind CSS v4
- react-markdown + remark-gfm

**Key Decisions**:
- See ADR 0001 (Static Export)
- See ADR 0002 (Dual Data Loading)
- See ADR 0003 (Component-Based Slides)
- See ADR 0005 (Framer Motion)

---

### Data Flow

```
┌──────────────────┐
│ Markdown Files   │ 25 files in /data/slides/
└────────┬─────────┘
         │
         ▼ (Build Time)
┌──────────────────┐
│ Build Script     │ scripts/generate-slides.mjs
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ slides.json      │ Public static file
└────────┬─────────┘
         │
         ▼ (Runtime)
┌──────────────────┐
│ Client Loader    │ lib/slides-client.ts
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Presentation     │ app/presentation/page.tsx
│ Page             │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Slide Router     │ components/slides/Slide.tsx
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Special Slide    │ 38 custom components
│ Components       │
└──────────────────┘
```

---

### File Structure

**Content Files**:
```
/data/slides/
├── slide-01-title.md
├── slide-02-frustration.md
├── slide-03-real-world-problem.md
... (25 markdown files)
```

**Core Libraries**:
```
/lib/
├── types.ts                # Type definitions
├── slides.ts               # Server-side loader
├── slides-client.ts        # Client-side loader
└── sections.ts             # Section metadata
```

**Components**:
```
/components/
├── animations/
│   ├── TextReveal.tsx      # Fade + slide up
│   ├── LineReveal.tsx      # Line-by-line reveal
│   └── StaggerChildren.tsx # Staggered list animation
├── diagrams/
│   ├── AgentLoop.tsx       # 3-phase agent loop
│   ├── AnatomyProgressive.tsx  # 4-step disclosure
│   ├── AgentAnatomy.tsx    # 7-component system
│   └── ... (3 more)
├── slides/
│   ├── Slide.tsx           # Router (switch on slide number)
│   ├── SlideContent.tsx    # Markdown renderer
│   ├── SectionHeader.tsx   # Section divider
│   └── special/            # 38 custom slide components
└── ui/
    ├── Navigation.tsx      # Slide controls
    ├── PersonaSelector.tsx # Persona dropdown
    └── PresenterPanel.tsx  # Speaker notes
```

**Pages**:
```
/app/
├── presentation/page.tsx   # Main presentation viewer
├── learn/101/page.tsx      # 101 course page
├── learn/201/page.tsx      # 201 course page
└── presenter/page.tsx      # Presenter mode
```

---

### Component Patterns

#### 1. Slide Router

**File**: `components/slides/Slide.tsx`

**Pattern**: Switch statement routing based on slide number

```typescript
const renderSlideContent = () => {
  switch (slide.number) {
    case 1: return <TitleSlide />;
    case 2: return <FrustrationSlide />;
    case 12: return <AgentLoopSlide persona={persona} />;
    case 14: return <AnatomyProgressiveSlide />;
    default: return <SlideContent content={slide.content.content} />;
  }
};
```

#### 2. Special Slide Component

**Pattern**: Standard structure for custom slides

```typescript
'use client';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';

export default function ExampleSlide() {
  return (
    <div className="h-full flex flex-col justify-center items-center px-6 md:px-12">
      <TextReveal delay={0}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Slide Title
        </h2>
      </TextReveal>

      <TextReveal delay={0.2}>
        <p className="text-lg text-gray-300 max-w-2xl text-center">
          Content with staggered animation
        </p>
      </TextReveal>
    </div>
  );
}
```

#### 3. Animation Pattern

**Standard entrance**:
```tsx
<TextReveal delay={0}>     // First element
<TextReveal delay={0.2}>   // Second element
<TextReveal delay={0.4}>   // Third element
```

**Page transition**:
```tsx
const slideVariants = {
  enter: { opacity: 0, x: 100 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};
```

---

### State Management

**Page-Level State** (`app/presentation/page.tsx`):

```typescript
const [slides, setSlides] = useState<Slide[]>([]);
const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
const [persona, setPersona] = useState<Persona>('all');
const [showNotes, setShowNotes] = useState(false);
```

**Props Drilling**:
- Presentation Page → Slide → Special Slide Component (max 2 levels)
- No global state (no Redux, Context API)

---

### Navigation System

**Keyboard Shortcuts**:
| Key | Action |
|-----|--------|
| `→` or `Space` | Next slide |
| `←` | Previous slide |
| `P` | Toggle presenter notes |

**Touch Gestures**:
| Gesture | Action |
|---------|--------|
| Swipe Left | Next slide |
| Swipe Right | Previous slide |

**URL Navigation**:
- `/presentation?slide=15` → Jumps to slide 15
- URL parameter parsed on page load
- Not updated during navigation (one-way sync)

---

### Persona System

**Personas**:
- `all` (default)
- `sysadmin`
- `devops`
- `developer`
- `platform`

**Implementation**:
```typescript
interface AgentLoopSlideProps {
  persona?: Persona;
}

export default function AgentLoopSlide({ persona = 'all' }: AgentLoopSlideProps) {
  const examples = {
    sysadmin: { gather: "...", action: "...", verify: "..." },
    devops: { gather: "...", action: "...", verify: "..." },
    // ... etc
  };

  const example = examples[persona];
  return <AgentLoop example={example} />;
}
```

**Used In**: 4 slides with persona-specific content

**Limitation**: Not persisted (resets on reload)

---

## UI/UX Design

### Visual Design

**Theme**: Dark (default, no light mode)

**Colors**:
- Primary: Blue 500 (#3b82f6)
- Secondary: Purple 500 (#8b5cf6)
- Background: Gray 900 (#111827)
- Surface: Gray 800 (#1f2937)

**Typography**:
- H1: 4xl mobile, 5xl desktop
- H2: 3xl mobile, 4xl desktop
- Body: lg mobile, xl desktop

**Animations**:
- Entrance: 0.3-0.5s fade + slide up
- Transitions: 0.5s slide left/right
- Hover: 0.15s scale effects

**Layout**:
- Full-screen slides (100vh)
- Navigation fixed bottom
- Progress bar at top of nav
- Persona selector fixed top-right
- Presenter notes drawer (bottom)

### Responsive Design

**Breakpoints**:
- Mobile: < 768px (390px target)
- Tablet: 768-1024px
- Desktop: > 1024px

**Mobile Optimizations**:
- Smaller font sizes
- Touch-friendly buttons (44x44px minimum)
- Swipe gestures
- Compact navigation
- Single column layouts

---

## Presenter Mode

**Features**:
- Toggle with 'P' key
- Speaker notes panel (fixed bottom or drawer)
- Shows: Objective, duration, talking points, emphasis, examples, questions
- Two modes: compact, full

**Implementation**:
```tsx
<PresenterPanel
  slide={currentSlide}
  isOpen={showNotes}
  onToggle={() => setShowNotes(!showNotes)}
  mode="compact"
/>
```

**Content Source**: `slide.content.speakerNotes` from markdown

---

## Performance

### Build Time
- Markdown parsing: ~500ms
- JSON generation: ~100ms
- Next.js build: ~30s total

### Runtime
- slides.json size: 52KB
- Initial load: < 2s
- Slide transitions: 60fps
- Animation performance: GPU-accelerated (transform, opacity)

### Caching
- In-memory cache for slides.json (session-scoped)
- Browser cache: 10 minutes (GitHub Pages default)

---

## Accessibility

**✅ Implemented**:
- Semantic HTML (h1-h6, nav, main)
- Keyboard navigation
- Focus-visible styles
- High contrast (dark theme)

**⚠️ Partial**:
- Alt text on some images
- Some ARIA labels

**❌ Not Implemented**:
- Screen reader announcements for slide changes
- Reduced motion support
- Skip to content link
- Focus trap in presenter notes

**Future Enhancements**:
- Add `prefers-reduced-motion` support
- ARIA live regions for slide changes
- Full keyboard navigation for all interactions

---

## Testing

**Current State**:
- ❌ No automated tests
- ✅ Manual testing on multiple devices
- ✅ Browser testing (Chrome, Safari, Firefox)
- ✅ Mobile testing (iOS Safari, Chrome Android)

**Test Checklist** (manual):
- [ ] Slide navigation (keyboard)
- [ ] Slide navigation (touch)
- [ ] URL deep linking
- [ ] Persona switching
- [ ] Presenter notes toggle
- [ ] Mobile responsiveness
- [ ] Build succeeds
- [ ] Deploy to GitHub Pages

---

## Known Issues

1. **Persona not persisted** - Lost on page reload
2. **URL not updated** - URL param not synced during navigation
3. **No error UI** - Failed data load shows empty page
4. **Hard-coded switch** - Adding slides requires code change
5. **No reduced motion** - Animations always on

---

## Future Enhancements

### High Priority
- [ ] Persist persona in localStorage or URL
- [ ] Update URL on slide navigation
- [ ] Add error boundary for data loading failures
- [ ] Reduced motion support

### Medium Priority
- [ ] Progress saving (track completed slides)
- [ ] Slide thumbnails sidebar
- [ ] Full-screen mode
- [ ] Print/PDF export
- [ ] Dark/light theme toggle

### Low Priority
- [ ] Slide notes export
- [ ] Video recording mode
- [ ] Multi-language support
- [ ] Slide search

---

## Deployment

**Platform**: GitHub Pages

**URL**: https://rrbanda.github.io/ai-hub/

**CI/CD**: GitHub Actions (`.github/workflows/deploy-pages.yml`)

**Build Process**:
```bash
npm run build
# → npm run generate-slides
# → next build
# → /out directory created
# → Deployed to gh-pages branch
```

**Deployment Triggers**:
- Push to `main` branch
- Manual workflow dispatch

---

## Related Documentation

| Document | Purpose |
|----------|---------|
| `ADR 0001-0006` | Architecture decisions |
| `ui-ux-design-system.md` | Design patterns |
| `component-inventory.md` | Component catalog |
| `data-flow.md` | Data flow patterns |
| `.claude/skills/add-slide.md` | Skill for adding slides |

---

## Metrics

| Metric | Value |
|--------|-------|
| Total slides (101 course) | 34 |
| Total slides (201 course) | 27 |
| Markdown files | 30 |
| Custom slide components | 37 |
| Diagram components | 6 |
| Animation wrappers | 3 |
| Lines of code (slides) | ~15,000 |
| Page load time | < 2s |
| slides.json size | 52KB |

---

This specification captures the **as-built** state of the slide presentation system. Future modifications should maintain compatibility with these established patterns.
