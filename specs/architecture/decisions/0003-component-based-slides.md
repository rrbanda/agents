# ADR 0003: Component-Based Slides (Not Template-Based)

**Status**: Accepted
**Date**: 2024 (Implemented)
**Decision Makers**: Project Team

## Context

The presentation system needs to display 34 slides for the 101 course, with:
- Rich animations (Framer Motion)
- Interactive diagrams (agent loops, anatomy progressions)
- Persona-specific content
- Responsive layouts
- Complex visualizations

### Problem
How should we render slide content: generic template or custom components?

### Options Considered

1. **Generic Template Renderer**
   - Single `<Slide>` component renders from JSON/markdown
   - Pros: DRY, easy to add slides, consistent styling
   - Cons: Limited interactivity, hard to customize, animations generic

2. **MDX-Based Slides**
   - Use MDX for markdown + JSX components
   - Pros: Flexible, component support
   - Cons: Complex build, harder to maintain, type safety issues

3. **Component Per Slide**
   - Dedicated React component for each unique slide
   - Pros: Full control, rich interactions, easy animations
   - Cons: More files, potential duplication

4. **Hybrid Approach**
   - Generic template for simple slides
   - Custom components for complex slides
   - Pros: Balanced, flexible
   - Cons: Two patterns to maintain

## Decision

Use **Component-Based Slides** with a router pattern.

### Implementation

**Slide Router** (`components/slides/Slide.tsx`):
```typescript
export default function Slide({ slide, persona }: SlideProps) {
  const renderSlideContent = () => {
    switch (slide.number) {
      case 1: return <TitleSlide />;
      case 2: return <FrustrationSlide />;
      case 3: return <RealWorldProblemSlide />;
      // ... 31 more cases
      case 12: return <AgentLoopSlide persona={persona} />;
      case 14: return <AnatomyProgressiveSlide />;
      default: return <SlideContent content={slide.content.content} />;
    }
  };

  return (
    <motion.div
      key={slide.number}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      {renderSlideContent()}
    </motion.div>
  );
}
```

**Individual Slide** (`components/slides/special/AgentLoopSlide.tsx`):
```typescript
'use client';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';
import AgentLoop from '@/components/diagrams/AgentLoop';
import type { Persona } from '@/lib/types';

interface AgentLoopSlideProps {
  persona?: Persona;
}

export default function AgentLoopSlide({ persona = 'all' }: AgentLoopSlideProps) {
  return (
    <div className="h-full flex flex-col justify-center items-center px-6 md:px-12">
      <TextReveal delay={0}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          The Agent Loop
        </h2>
      </TextReveal>

      <TextReveal delay={0.2}>
        <AgentLoop persona={persona} />
      </TextReveal>

      <TextReveal delay={0.4}>
        <p className="text-gray-300 text-lg mt-6 text-center max-w-2xl">
          Every agent follows this continuous cycle
        </p>
      </TextReveal>
    </div>
  );
}
```

### Component Organization
```
components/slides/
├── Slide.tsx              # Router (switch statement)
├── SlideContent.tsx       # Generic markdown renderer (fallback)
├── SectionHeader.tsx      # Section divider
└── special/               # 38 custom slide components
    ├── TitleSlide.tsx
    ├── AgentLoopSlide.tsx
    ├── AnatomyProgressiveSlide.tsx
    └── ...35 more
```

## Consequences

### Positive
- ✅ Full control over animations and timing
- ✅ Rich interactivity (diagrams, persona switching, state)
- ✅ Type safety for props
- ✅ Easy to customize individual slides
- ✅ Component reusability (diagrams, animations)
- ✅ Better code splitting potential
- ✅ Easier debugging (component name in stack traces)

### Negative
- ❌ 38 component files to maintain
- ❌ No automatic slide generation from markdown
- ❌ Duplication of layout patterns
- ❌ Hard-coded switch statement (must update for new slides)
- ❌ More LOC overall

### Mitigations
- Shared animation wrappers (`TextReveal`, `LineReveal`) reduce duplication
- Reusable diagram components (`AgentLoop`, `AnatomyProgressive`)
- Generic `SlideContent` fallback for simple markdown slides
- Consistent patterns documented in skills (`add-slide.md`)

## Trade-offs Accepted

**Maintenance vs Flexibility**: Accepted higher maintenance cost for:
- Pixel-perfect control over animations
- Complex interactive diagrams
- Persona-based content variations
- Progressive disclosure patterns

**DRY vs Clarity**: Accepted some duplication for:
- Clear, explicit component structure
- Easy to understand what each slide does
- Simple debugging and modification

## Related Decisions
- ADR 0005: Framer Motion for Animations
- ADR 0002: Dual Data Loading Pattern

## Future Considerations

If we add 50+ more slides, consider:
- **Dynamic imports**: Lazy load slide components
- **Slide templates**: Abstract common patterns (title + bullets, diagram + text)
- **MDX**: For simpler content slides
- **Config-driven**: JSON config for simple slides, components for complex

For now, 38 components is manageable and provides needed flexibility.

## References
- React component patterns: https://react.dev/learn/passing-props-to-a-component
- Next.js dynamic imports: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
