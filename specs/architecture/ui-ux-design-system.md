# UI/UX Design System Specification

**Status**: As-Built (Extracted from current implementation)
**Last Updated**: 2024-12-15
**Applies To**: web-app/ codebase

---

## Overview

This document captures the design system patterns, conventions, and standards currently implemented in the AI Hub web application. This serves as the source of truth for maintaining visual consistency across the platform.

---

## Color Palette

### Primary Colors

| Use Case | Tailwind Class | Hex Value | Usage |
|----------|----------------|-----------|-------|
| Primary | `blue-500` | `#3b82f6` | CTAs, links, primary accents |
| Primary Hover | `blue-600` | `#2563eb` | Hover states for primary elements |
| Secondary | `purple-500` | `#8b5cf6` | Alternative accents, gradients |
| Secondary Hover | `purple-600` | `#7c3aed` | Hover states for secondary elements |

### Status Colors

| Use Case | Tailwind Class | Hex Value | Usage |
|----------|----------------|-----------|-------|
| Success | `green-400` | `#34d399` | Success messages, confirmations |
| Warning | `orange-500` | `#f97316` | Warnings, emphasis |
| Warning Alt | `yellow-500` | `#eab308` | Alternative warnings |
| Danger | `red-500` | `#ef4444` | Errors, destructive actions |
| Danger Alt | `rose-500` | `#f43f5e` | Alternative errors |

### Neutral Colors (Dark Theme)

| Use Case | Tailwind Class | Hex Value | Usage |
|----------|----------------|-----------|-------|
| Background | `gray-900` | `#111827` | Page background, main canvas |
| Surface | `gray-800` | `#1f2937` | Cards, panels, elevated surfaces |
| Surface Light | `gray-700` | `#374151` | Hover states, secondary surfaces |
| Border | `gray-700` | `#374151` | Dividers, borders |
| Border Light | `gray-600` | `#4b5563` | Subtle dividers |

### Text Colors (Dark Theme)

| Use Case | Tailwind Class | Usage |
|----------|----------------|-------|
| Primary Text | `white` | Headings, important text |
| Secondary Text | `gray-200` | Body text, subheadings |
| Tertiary Text | `gray-300` | Supporting text, descriptions |
| Muted Text | `gray-400` | Disabled text, placeholders |
| Subtle Text | `gray-500` | Captions, metadata |

### Gradient Patterns

```tsx
// Primary gradient (blue to purple)
className="bg-gradient-to-r from-blue-500 to-purple-500"

// Vertical gradient
className="bg-gradient-to-b from-blue-500 to-purple-600"

// Diagonal gradient
className="bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600"

// Text gradient
className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
```

**Example Usage** (seen in home page, section headers):
- Feature cards
- Hero sections
- Background decorative elements
- Text highlights

---

## Typography

### Type Scale

| Level | Mobile | Desktop | Weight | Usage |
|-------|--------|---------|--------|-------|
| **H1** | `text-4xl` (36px) | `md:text-5xl` (48px) | `font-bold` | Page titles, hero headings |
| **H2** | `text-3xl` (30px) | `md:text-4xl` (36px) | `font-bold` | Section titles |
| **H3** | `text-2xl` (24px) | `md:text-3xl` (30px) | `font-semibold` | Subsection titles |
| **H4** | `text-xl` (20px) | `md:text-2xl` (24px) | `font-semibold` | Card titles |
| **Body Large** | `text-lg` (18px) | `md:text-xl` (20px) | `font-normal` | Important body text |
| **Body** | `text-base` (16px) | `md:text-lg` (18px) | `font-normal` | Standard body text |
| **Body Small** | `text-sm` (14px) | `md:text-base` (16px) | `font-normal` | Supporting text |
| **Caption** | `text-xs` (12px) | `md:text-sm` (14px) | `font-normal` | Metadata, labels |

### Font Weights

- `font-normal` (400): Body text
- `font-medium` (500): Emphasized text
- `font-semibold` (600): Subheadings
- `font-bold` (700): Headings

### Line Heights

- Headings: `leading-tight` (1.25)
- Body: `leading-normal` (1.5) or `leading-relaxed` (1.625)
- Code: `leading-normal` (1.5)

### Text Patterns

**Heading with Gradient**:
```tsx
<h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
  AI Hub
</h1>
```

**Section Title**:
```tsx
<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
  Section Title
</h2>
```

**Body Text with Max Width**:
```tsx
<p className="text-lg md:text-xl text-gray-300 max-w-2xl">
  Description text that wraps at 2xl width
</p>
```

**Centered Text Block**:
```tsx
<div className="text-center max-w-4xl mx-auto">
  <h2 className="text-3xl font-bold text-white mb-4">Title</h2>
  <p className="text-lg text-gray-300">Description</p>
</div>
```

---

## Spacing & Layout

### Page-Level Spacing

| Element | Mobile | Desktop | Usage |
|---------|--------|---------|-------|
| Page Padding (X) | `px-6` (24px) | `md:px-12` (48px) | Horizontal page margins |
| Page Padding (Y) | `py-12` (48px) | `md:py-20` (80px) | Vertical page spacing |
| Section Gap | `gap-8` (32px) | `md:gap-12` (48px) | Between major sections |

### Component Spacing

| Element | Spacing | Usage |
|---------|---------|-------|
| Card Padding | `p-4` to `p-6` (16-24px) | Internal card spacing |
| Card Gap | `gap-4` (16px) | Between card elements |
| Button Padding | `px-6 py-3` | Standard button |
| Button Padding (Small) | `px-4 py-2` | Compact button |
| List Gap | `gap-2` to `gap-4` (8-16px) | Between list items |

### Margin Patterns

```tsx
// Section spacing
className="mb-8 md:mb-12"  // Between sections

// Element spacing
className="mb-4"  // Between related elements
className="mb-2"  // Tight spacing (headings to subtext)

// Layout spacing
className="mt-auto"  // Push to bottom (flex)
className="space-y-4"  // Vertical stack with gaps
className="space-x-2"  // Horizontal stack with gaps
```

### Max Width Constraints

| Use Case | Class | Width | Usage |
|----------|-------|-------|-------|
| Text Content | `max-w-2xl` | 672px | Readable line length |
| Wide Text | `max-w-4xl` | 896px | Wide content blocks |
| Section Content | `max-w-6xl` | 1152px | Full-width sections |
| Full Width | `max-w-7xl` | 1280px | Maximum container width |

**Pattern**:
```tsx
<div className="max-w-6xl mx-auto px-6 md:px-12">
  {/* Content centered with max width */}
</div>
```

---

## Responsive Design

### Breakpoints (Tailwind Defaults)

| Name | Width | Usage |
|------|-------|-------|
| `sm` | 640px | Small tablets, large phones |
| `md` | 768px | Tablets, small laptops |
| `lg` | 1024px | Laptops, desktops |
| `xl` | 1280px | Large desktops |
| `2xl` | 1536px | Extra large screens |

### Mobile-First Approach

All styles default to mobile, then add responsive overrides:

```tsx
// ✅ Correct: Mobile-first
className="text-2xl md:text-4xl lg:text-5xl"

// ❌ Incorrect: Desktop-first
className="text-5xl md:text-2xl"
```

### Common Responsive Patterns

**Grid Layouts**:
```tsx
// 1 column mobile, 2 tablet, 3 desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// 1 column mobile, 3 desktop
className="grid grid-cols-1 lg:grid-cols-3 gap-4"
```

**Flex Direction**:
```tsx
// Stack mobile, row desktop
className="flex flex-col md:flex-row gap-4"
```

**Visibility**:
```tsx
// Hide on mobile, show on desktop
className="hidden md:block"

// Show on mobile, hide on desktop
className="block md:hidden"
```

**Text Alignment**:
```tsx
// Center mobile, left desktop
className="text-center md:text-left"
```

### Mobile-Specific Considerations

**Target viewport**: 390px (iPhone 14 standard)

**Font size reduction**:
- H1: 4xl mobile → 5xl desktop
- H2: 3xl mobile → 4xl desktop
- Body: base mobile → lg desktop

**Touch targets**: Minimum 44x44px for buttons/links

**Navigation**:
- Full menu on desktop
- Hamburger/compact menu on mobile

---

## Animation System

### Timing Standards

| Animation Type | Duration | Easing | Usage |
|---------------|----------|--------|-------|
| Fast Interaction | 0.15-0.3s | `ease-out` | Hover, tap responses |
| Content Reveal | 0.3-0.5s | `ease-out` | Text, image reveals |
| Slide Transition | 0.5-0.6s | `cubic-bezier(0.4, 0, 0.2, 1)` | Page/slide changes |
| Continuous | 15-25s | `linear` or `ease-in-out` | Floating elements |

### Framer Motion Patterns

**Standard Entrance**:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
```

**Slide Transition** (slide navigation):
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

**Hover/Tap Effects**:
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.15 }}
>
```

**Staggered List**:
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

**Floating Background Elements**:
```tsx
<motion.div
  animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
  transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
  className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
/>
```

### Reusable Animation Components

**TextReveal** (`components/animations/TextReveal.tsx`):
```tsx
<TextReveal delay={0.2} duration={0.4}>
  <h1>Animated Text</h1>
</TextReveal>
```

**LineReveal** (`components/animations/LineReveal.tsx`):
```tsx
<LineReveal delay={0}>
  <p>Each line animates in</p>
</LineReveal>
```

**StaggerChildren**:
```tsx
<StaggerChildren>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggerChildren>
```

---

## Component Patterns

### Card Component

**Standard Card**:
```tsx
<div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
  <h3 className="text-xl font-semibold text-white mb-2">Title</h3>
  <p className="text-gray-300">Description</p>
</div>
```

**Interactive Card** (with hover effect):
```tsx
<motion.div
  whileHover={{ scale: 1.02 }}
  className="bg-gray-800 rounded-xl p-6 border border-gray-700 cursor-pointer"
>
  <h3 className="text-xl font-semibold text-white mb-2">Title</h3>
  <p className="text-gray-300">Description</p>
</motion.div>
```

**Gradient Card**:
```tsx
<div className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
  <h3 className="text-xl font-semibold text-white mb-2">Title</h3>
  <p className="text-gray-300">Description</p>
</div>
```

### Button Component

**Primary Button**:
```tsx
<button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">
  Click Me
</button>
```

**Secondary Button**:
```tsx
<button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors">
  Secondary
</button>
```

**Outline Button**:
```tsx
<button className="px-6 py-3 border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-semibold rounded-lg transition-colors">
  Outline
</button>
```

**Icon Button**:
```tsx
<button className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
  <Icon className="w-6 h-6 text-white" />
</button>
```

**Animated Button** (Framer Motion):
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-3 bg-blue-500 text-white rounded-lg"
>
  Animated
</motion.button>
```

### Section Header

**Pattern** (`components/slides/SectionHeader.tsx`):
```tsx
<div className="h-full flex flex-col justify-center items-center px-6 md:px-12 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
  <motion.h1
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-5xl md:text-6xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
  >
    Section Title
  </motion.h1>
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="text-xl md:text-2xl text-gray-300 text-center"
  >
    Section subtitle
  </motion.p>
</div>
```

### Navigation Component

**Slide Navigation** (fixed bottom):
```tsx
<div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 px-6 py-4">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <button>Previous</button>
    <div>Slide 15 / 34</div>
    <button>Next</button>
  </div>

  {/* Progress bar */}
  <div className="absolute top-0 left-0 h-1 bg-blue-500" style={{ width: `${progress}%` }} />
</div>
```

### Diagram Wrapper

**Interactive Diagram Container**:
```tsx
<div className="w-full max-w-4xl mx-auto">
  <div className="bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm">
    {/* Diagram content */}
  </div>
</div>
```

---

## Icons & Assets

### Icon Library
**Heroicons** (v2): https://heroicons.com/

**Usage**:
```tsx
import { SparklesIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

<SparklesIcon className="w-6 h-6 text-blue-400" />
<RocketLaunchIcon className="w-8 h-8 text-purple-500" />
```

**Size Guidelines**:
- Small: `w-4 h-4` (16px) - Inline icons
- Medium: `w-6 h-6` (24px) - Standard icons
- Large: `w-8 h-8` (32px) - Feature icons
- XL: `w-12 h-12` (48px) - Hero icons

---

## Accessibility

### Current Implementation Status

**✅ Implemented**:
- Semantic HTML (h1, h2, nav, main)
- Keyboard navigation for slides (arrow keys)
- Focus-visible styles on interactive elements
- Sufficient color contrast (dark theme)

**⚠️ Partially Implemented**:
- Alt text on images (some missing)
- ARIA labels on buttons (inconsistent)

**❌ Not Implemented**:
- Reduced motion support (`prefers-reduced-motion`)
- Screen reader announcements for slide changes
- Skip to content link
- Focus trap in modals

### Recommended Patterns

**Reduced Motion**:
```tsx
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

<motion.div
  animate={{ opacity: shouldReduceMotion ? 1 : [0, 1] }}
>
```

**ARIA Labels**:
```tsx
<button aria-label="Go to next slide">
  <ArrowRightIcon />
</button>
```

**Focus Styles**:
```tsx
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
```

---

## Dark Theme (Default)

The application uses **dark theme by default** with no light mode toggle.

**Background Strategy**:
- Base: `bg-gray-900` (#111827)
- Elevated surfaces: `bg-gray-800` (#1f2937)
- Borders: `border-gray-700` (#374151)

**Text Strategy**:
- Primary: `text-white`
- Secondary: `text-gray-300`
- Muted: `text-gray-400`

**Contrast Ratios**:
- White on gray-900: 15.8:1 (AAA)
- Gray-300 on gray-900: 10.4:1 (AAA)
- Blue-500 on gray-900: 4.8:1 (AA)

---

## Performance Considerations

### Animation Performance
- Use `transform` and `opacity` (GPU accelerated)
- Avoid animating `width`, `height`, `top`, `left` (layout thrashing)
- Limit simultaneous animations (max 5-10 on screen)

### CSS Performance
- Tailwind purges unused classes in production
- Use `will-change` sparingly (memory cost)
- Prefer `backdrop-filter` with opacity over full blur

### Code Splitting
- Not currently implemented for slide components
- Future: Dynamic imports for heavy diagrams

---

## Related Files

| File | Purpose |
|------|---------|
| `web-app/app/globals.css` | Global styles, Tailwind config |
| `web-app/components/animations/*` | Reusable animation wrappers |
| `web-app/components/ui/*` | Shared UI components |
| `ADR 0004` | Tailwind v4 CSS-First decision |
| `ADR 0005` | Framer Motion decision |

---

This design system is **as-built** from the current codebase. Future additions (blog, podcasts) should follow these established patterns for consistency.
