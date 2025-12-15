# ADR 0004: Tailwind CSS v4 with CSS-First Configuration

**Status**: Accepted
**Date**: 2024 (Implemented)
**Decision Makers**: Project Team

## Context

The application needs a styling solution that:
- Supports responsive design (mobile-first)
- Enables rapid UI development
- Works with Next.js App Router
- Provides dark theme by default
- Minimizes configuration overhead

### Options Considered

1. **CSS Modules**
   - Pros: Scoped styles, no class name conflicts
   - Cons: Verbose, hard to maintain responsive, theming complex

2. **Styled Components / Emotion**
   - Pros: CSS-in-JS, dynamic styles
   - Cons: Runtime overhead, larger bundle, SSR complexity

3. **Tailwind CSS v3 (config file)**
   - Pros: Utility-first, fast development
   - Cons: Requires `tailwind.config.js`, extra configuration

4. **Tailwind CSS v4 (CSS-based)**
   - Pros: No config file, simpler setup, modern approach
   - Cons: Newer, less documentation, different from v3

## Decision

Use **Tailwind CSS v4** with CSS-first configuration.

### Implementation

**globals.css**:
```css
@import "tailwindcss";

@theme inline {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
}

/* Custom scrollbar hiding */
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

/* Dark theme as default */
body {
  @apply bg-gray-900 text-white;
}
```

**No `tailwind.config.js` file** - configuration inline in CSS.

**PostCSS** (`postcss.config.mjs`):
```javascript
export default {
  plugins: {
    tailwindcss: {},
  },
};
```

### Usage Pattern
```tsx
<div className="px-6 md:px-12 bg-gray-900 text-white">
  <h1 className="text-4xl md:text-5xl font-bold mb-4">
    Title
  </h1>
</div>
```

## Consequences

### Positive
- ✅ Simpler setup (no config file)
- ✅ Modern CSS-based approach
- ✅ Faster build times
- ✅ Better CSS editor support
- ✅ Inline theme customization
- ✅ Native CSS cascade behavior
- ✅ Smaller configuration surface

### Negative
- ❌ Less familiar to Tailwind v3 users
- ❌ Cannot use JavaScript for dynamic config
- ❌ Limited plugin ecosystem compatibility
- ❌ Newer, less Stack Overflow answers

### Mitigations
- Document custom theme values in CLAUDE.md
- Use standard Tailwind classes (portable to v3 if needed)
- Keep custom CSS minimal

## Design System Decisions

**Color Palette**:
- Primary: `blue-500` (#3b82f6)
- Secondary: `purple-500` (#8b5cf6)
- Background: `gray-900` (#111827)
- Surface: `gray-800` (#1f2937)
- Text: `white`, `gray-300`, `gray-400`

**Spacing Scale**:
- Page padding: `px-6 md:px-12` (24px mobile, 48px desktop)
- Section gaps: `gap-4` to `gap-8`
- Component padding: `p-4` to `p-6`

**Typography Scale**:
- H1: `text-4xl md:text-5xl` (36-48px mobile, 48-64px desktop)
- H2: `text-3xl md:text-4xl`
- H3: `text-2xl md:text-3xl`
- Body: `text-lg md:text-xl`

**Breakpoints** (Tailwind defaults):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## Related Decisions
- ADR 0003: Component-Based Slides (uses Tailwind classes)
- ADR 0005: Framer Motion (works alongside Tailwind)

## Future Considerations
- If plugin ecosystem becomes critical, can migrate to v3-style config
- Consider design tokens system if expanding to mobile apps
- May add CSS variables for runtime theming (light mode)

## References
- Tailwind CSS v4 Beta: https://tailwindcss.com/blog/tailwindcss-v4-beta
- Next.js + Tailwind: https://nextjs.org/docs/app/building-your-application/styling/tailwind-css
