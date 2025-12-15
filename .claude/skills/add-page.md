# Skill: Add New Page

## Description
Add a new page/route to the Next.js web application.

## When to Use
- User wants a new section on the website
- User wants to create a landing page
- User needs a new feature page

## Prerequisites
- Page purpose/content
- Where it should appear in navigation (if applicable)

## Steps

### 1. Create Page Directory and File

Create in `web-app/app/`:

```
web-app/app/
└── new-page/
    └── page.tsx
```

### 2. Basic Page Template

```typescript
// web-app/app/new-page/page.tsx
'use client';

import { motion } from 'framer-motion';
import SiteNav from '@/components/ui/SiteNav';

export default function NewPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden relative">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
            top: '10%',
            right: '-10%',
          }}
        />
      </div>

      {/* Navigation */}
      <SiteNav />

      {/* Main Content */}
      <main className="relative z-10 px-6 md:px-12 pb-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Page Title
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Page description
          </p>
        </motion.div>

        {/* Page content here */}
      </main>
    </div>
  );
}
```

### 3. Add to Navigation (if needed)

Update `web-app/components/ui/SiteNav.tsx`:

```typescript
const navItems = [
  { id: 'learn', label: 'Learn', icon: '📚', href: '/learn' },
  { id: 'demos', label: 'Demos', icon: '⚡', href: '/demos' },
  // Add new item
  { id: 'new-page', label: 'New Page', icon: '🆕', href: '/new-page' },
];
```

### 4. For Server Components (optional)

If the page doesn't need client interactivity:

```typescript
// Remove 'use client' directive
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | AI Hub',
  description: 'Page description',
};

export default function NewPage() {
  return (
    // Static content
  );
}
```

## Page Types

### Static Page
- No `'use client'`
- Pre-rendered at build time
- Good for content pages

### Interactive Page
- Add `'use client'`
- Uses React hooks (useState, useEffect)
- Required for animations, forms

### Nested Routes
```
app/
└── learn/
    ├── page.tsx        # /learn
    └── 201/
        └── page.tsx    # /learn/201
```

## Checklist
- [ ] Page created in correct directory
- [ ] Uses consistent styling (dark theme)
- [ ] Includes SiteNav for navigation
- [ ] Mobile responsive
- [ ] Added to navigation if needed
- [ ] Build succeeds

## Example

**User Request**: "Create a resources page with downloadable PDFs"

**Actions**:
1. Create `web-app/app/resources/page.tsx`
2. Add resource cards with download links
3. Add to SiteNav navigation items

