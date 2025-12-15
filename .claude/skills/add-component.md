# Skill: Add UI Component

## Description
Create a new reusable UI component for the web application.

## When to Use
- User needs a new UI element (button, card, modal, etc.)
- User wants to refactor repeated UI patterns
- User needs an interactive component

## Prerequisites
- Component purpose
- Props/configuration needed
- Where it will be used

## Steps

### 1. Determine Component Location

```
web-app/components/
├── ui/           # General UI (buttons, modals, nav)
├── animations/   # Animation wrappers
├── diagrams/     # Visual/data diagrams
└── slides/       # Slide-specific components
```

### 2. Create Component File

```typescript
// web-app/components/ui/NewComponent.tsx
'use client';

import { motion } from 'framer-motion';

interface NewComponentProps {
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function NewComponent({
  title,
  description,
  variant = 'primary',
  onClick,
  children,
}: NewComponentProps) {
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600',
    secondary: 'bg-gray-700 hover:bg-gray-600',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`rounded-xl p-4 cursor-pointer transition-colors ${variants[variant]}`}
    >
      <h3 className="text-white font-semibold">{title}</h3>
      {description && (
        <p className="text-gray-300 text-sm mt-1">{description}</p>
      )}
      {children}
    </motion.div>
  );
}
```

### 3. TypeScript Props

Always define props interface:
- Required props: `title: string`
- Optional props: `description?: string`
- Event handlers: `onClick?: () => void`
- Children: `children?: React.ReactNode`

### 4. Styling Patterns

```typescript
// Conditional classes
className={`base-classes ${condition ? 'true-class' : 'false-class'}`}

// Responsive
className="text-sm md:text-base lg:text-lg"

// Dark theme colors
className="bg-gray-800 text-white border-gray-700"

// Gradients
className="bg-gradient-to-r from-blue-500 to-purple-500"
```

### 5. Animation Patterns

```typescript
// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>

// Slide up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>

// Hover effects
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>

// Staggered children
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
```

### 6. Export and Usage

```typescript
// In component file
export default function NewComponent() { ... }

// In consuming file
import NewComponent from '@/components/ui/NewComponent';

<NewComponent 
  title="Hello"
  variant="primary"
  onClick={() => console.log('clicked')}
/>
```

## Component Types

### Presentational
- No state
- Props only
- Pure rendering

### Interactive
- Uses useState/useEffect
- Handles events
- May call APIs

### Wrapper/HOC
- Wraps children
- Provides context or styling
- Example: animation wrappers

## Checklist
- [ ] Props interface defined
- [ ] Default props where appropriate
- [ ] Responsive styling
- [ ] Animations smooth
- [ ] Accessible (aria labels, keyboard nav)
- [ ] Works on mobile

## Example

**User Request**: "Create a feature card component with icon, title, and description"

**File**: `web-app/components/ui/FeatureCard.tsx`

