# ADR 0005: Framer Motion for All Animations

**Status**: Accepted
**Date**: 2024 (Implemented)
**Decision Makers**: Project Team

## Context

The presentation platform requires:
- Smooth entrance animations for slides
- Interactive hover/tap effects
- Progressive reveal of content
- Responsive, performant animations
- Declarative, maintainable animation code

### Options Considered

1. **CSS Animations/Transitions**
   - Pros: Native, no bundle size, performant
   - Cons: Verbose, hard to orchestrate, limited interactivity

2. **React Spring**
   - Pros: Physics-based, smooth
   - Cons: Imperative API, steeper learning curve

3. **GSAP**
   - Pros: Powerful, timeline support
   - Cons: Imperative, larger bundle, commercial license for some uses

4. **Framer Motion**
   - Pros: Declarative, React-first, gesture support, small API
   - Cons: Bundle size, React-only

## Decision

Use **Framer Motion** as the single animation library across all components.

### Implementation

**Installation**:
```json
{
  "dependencies": {
    "framer-motion": "^11.x"
  }
}
```

**Standard Patterns**:

**1. Entrance Animation** (slide transitions):
```tsx
const slideVariants = {
  enter: { opacity: 0, x: 100 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

<motion.div
  variants={slideVariants}
  initial="enter"
  animate="center"
  exit="exit"
  transition={{ duration: 0.5 }}
>
```

**2. Text Reveal** (staggered content):
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.4 }}
>
  {children}
</motion.div>
```

**3. Hover Effects** (interactive elements):
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

**4. Continuous Animation** (floating elements):
```tsx
<motion.div
  animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
  transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
>
```

**5. Staggered Children**:
```tsx
<motion.ul
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  }}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.li>
  ))}
</motion.ul>
```

### Reusable Animation Components

Created wrapper components for common patterns:

**TextReveal.tsx**:
```tsx
interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function TextReveal({
  children,
  delay = 0,
  duration = 0.4,
  className = ''
}: TextRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

Used in 50+ components:
```tsx
<TextReveal delay={0}>
  <h1>Title</h1>
</TextReveal>
<TextReveal delay={0.2}>
  <p>Content</p>
</TextReveal>
```

## Consequences

### Positive
- ✅ Consistent animation feel across platform
- ✅ Declarative, easy to read and maintain
- ✅ Built-in gesture support (drag, hover, tap)
- ✅ Performant (uses CSS transforms, GPU acceleration)
- ✅ Layout animations handled automatically
- ✅ Variant system for complex orchestrations
- ✅ TypeScript support
- ✅ React 18 concurrent rendering compatible

### Negative
- ❌ Bundle size: ~50KB gzipped
- ❌ React dependency (cannot use in vanilla JS)
- ❌ Learning curve for complex animations
- ❌ Potential performance issues with many animated elements

### Mitigations
- Code splitting via dynamic imports for heavy animation pages
- Use `useReducedMotion` hook for accessibility
- Limit number of simultaneous animations
- Reuse animation wrappers to reduce component complexity

## Animation Standards

**Timing**:
- Fast interactions: 0.15-0.3s
- Content reveals: 0.3-0.5s
- Slide transitions: 0.5-0.6s
- Continuous/ambient: 15-25s

**Easing**:
- Default: `ease: [0.4, 0, 0.2, 1]` (cubic bezier)
- Bouncy: `type: "spring", stiffness: 300`
- Linear: `ease: "linear"` (for continuous)

**Stagger Delays**:
- List items: 0.05-0.1s between items
- Sections: 0.2-0.3s between sections

## Accessibility

**Reduced Motion**:
```tsx
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

<motion.div
  animate={{ opacity: shouldReduceMotion ? 1 : [0, 1] }}
>
```

Currently not implemented, but should be added for WCAG compliance.

## Related Decisions
- ADR 0003: Component-Based Slides (enables rich animations per slide)
- ADR 0004: Tailwind CSS (works alongside Motion for layout)

## Future Considerations
- Add reduced motion support for accessibility
- Consider View Transitions API (native browser) for simple transitions
- Explore scroll-triggered animations for blog content
- Performance profiling for mobile devices

## References
- Framer Motion Docs: https://www.framer.com/motion/
- Animation best practices: https://web.dev/animations/
- Reduced motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
