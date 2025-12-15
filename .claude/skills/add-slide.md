# Skill: Add New Slide

## Description
Add a new slide to an existing presentation course.

## When to Use
- User asks to add a new slide to 101, 201, or 301 course
- User wants to insert a slide at a specific position
- User provides content for a new slide

## Prerequisites
- Know which course (101, 201, 301)
- Know the slide position/number
- Have the slide content or topic

## Steps

### 1. Create the Slide Component

Create a new file in `web-app/components/slides/special/`:

```typescript
// web-app/components/slides/special/NewSlideNameSlide.tsx
'use client';

import { motion } from 'framer-motion';

export default function NewSlideNameSlide() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-white mb-6 text-center"
      >
        Slide Title
      </motion.h2>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-4xl"
      >
        {/* Add slide content here */}
      </motion.div>
    </div>
  );
}
```

### 2. Import in Slide.tsx

Add import at top of `web-app/components/slides/Slide.tsx`:

```typescript
import NewSlideNameSlide from './special/NewSlideNameSlide';
```

### 3. Add Case in Switch Statement

In the `renderSlideContent()` function, add the case:

```typescript
case XX:
  return <NewSlideNameSlide />;
```

### 4. Update Slide Definitions

In `web-app/lib/slides.ts`, add to `slideDefinitions` array:

```typescript
{ number: XX, id: 'slide-XX-new-name', title: 'Slide Title' },
```

### 5. Regenerate slides.json

If the slide definition changed in `lib/slides.ts`, also update:
- `web-app/scripts/generate-slides.mjs` (if needed)
- Run `npm run build` to regenerate `slides.json`

## Checklist
- [ ] Component created with proper animations
- [ ] Mobile responsive (use `md:` breakpoints)
- [ ] Imported in Slide.tsx
- [ ] Case added in switch statement
- [ ] Slide definition added
- [ ] Build succeeds

## Example

**User Request**: "Add a slide about RAG (Retrieval Augmented Generation) after slide 20"

**Actions**:
1. Create `RAGSlide.tsx` in `special/`
2. Import in `Slide.tsx`
3. Add `case 21: return <RAGSlide />;`
4. Renumber subsequent slides
5. Update `slideDefinitions`

