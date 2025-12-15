# CLAUDE.md - AI Hub Project Context

This file provides context for Claude Code to work effectively on this repository.

## Project Overview

**AI Hub** is a comprehensive learning platform for AI and Agentic systems featuring:
- 🎬 Interactive slide presentations (101, 201, 301 courses)
- 📝 Blog articles (coming soon)
- 🎙️ Podcasts (coming soon)

**Live Site**: https://rrbanda.github.io/ai-hub/

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, Static Export) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Heroicons |
| Markdown | react-markdown + remark-gfm |
| Deployment | GitHub Pages via GitHub Actions |

---

## Repository Structure

```
ai-hub/
├── content/                 # 📚 Content sources (don't modify web-app copies)
│   ├── blog/posts/         # Blog articles (markdown)
│   ├── podcasts/episodes/  # Podcast metadata + transcripts
│   ├── slides/             # Presentation slide sources
│   └── resources/          # Shared resources, glossary
│
├── specs/                   # 📋 Feature specifications
│   ├── features/           # Individual feature specs
│   ├── architecture/       # Technical architecture docs
│   └── roadmap.md          # Product roadmap
│
├── docs/                    # 📖 Project documentation
│   └── CONTRIBUTING.md
│
├── web-app/                 # 🌐 Next.js application
│   ├── app/                # Pages (App Router)
│   ├── components/         # React components
│   │   ├── animations/     # Animation wrappers
│   │   ├── diagrams/       # Visual diagrams
│   │   ├── slides/         # Slide components
│   │   │   └── special/    # Individual slide implementations
│   │   └── ui/             # UI components (Nav, etc.)
│   ├── data/slides/        # Slide markdown (web-app's copy)
│   ├── lib/                # Utilities and types
│   ├── public/             # Static assets + slides.json
│   └── scripts/            # Build scripts
│
├── .github/workflows/       # CI/CD
│   └── deploy-pages.yml    # GitHub Pages deployment
│
└── CLAUDE.md               # This file
```

---

## Key Files

| File | Purpose |
|------|---------|
| `web-app/next.config.mjs` | Next.js config (static export, basePath) |
| `web-app/lib/slides.ts` | Slide data loading (server-side) |
| `web-app/lib/slides-client.ts` | Slide data loading (client-side, fetches slides.json) |
| `web-app/lib/types.ts` | TypeScript type definitions |
| `web-app/scripts/generate-slides.mjs` | Build-time slide JSON generator |
| `specs/INDEX.md` | **📍 Start here: Complete specs index** |
| `specs/roadmap.md` | Product roadmap and priorities |

---

## Comprehensive Documentation

This repository has **complete reverse-engineered specifications** documenting the entire codebase:

### 📋 Specifications & Architecture
- **[specs/INDEX.md](specs/INDEX.md)** - 📍 **Start here**: Complete navigation for all specs
- **Architecture Decisions (6 ADRs)** - Why key technical decisions were made
  - ADR 0001: Static Export for GitHub Pages
  - ADR 0002: Dual Data Loading Pattern
  - ADR 0003: Component-Based Slides
  - ADR 0004: Tailwind CSS v4
  - ADR 0005: Framer Motion Animations
  - ADR 0006: Persona-Based Content
- **[UI/UX Design System](specs/architecture/ui-ux-design-system.md)** - Colors, typography, spacing, animations
- **[Component Inventory](specs/architecture/component-inventory.md)** - All 50+ components with usage patterns
- **[Data Flow](specs/architecture/data-flow.md)** - How data moves through the application
- **[Slides System (As-Built)](specs/features/slides-system-as-built.md)** - Complete feature documentation

### 🎯 For Spec-Driven Development
- **[Spec Templates](specs/templates/)** - Templates for new features and ADRs
- **Feature Specs** - [Blog](specs/features/blog.md), [Podcasts](specs/features/podcasts.md) (planned)
- **Claude Code Skills** - 5 skills in `.claude/skills/` for common tasks

**When building new features**: Follow the spec-driven workflow:
1. Start with [specs/INDEX.md](specs/INDEX.md) to understand existing patterns
2. Use [specs/templates/feature-spec-template.md](specs/templates/feature-spec-template.md) for new features
3. Reference existing ADRs and design system for consistency
4. Use Claude Code skills for implementation

---

## Development Commands

```bash
# Navigate to web-app
cd web-app

# Install dependencies
npm install

# Start development server (localhost:3000)
npm run dev

# Build for production (generates /out folder)
npm run build

# Serve production build locally
npm run serve
```

---

## Code Conventions

### TypeScript
- Strict mode enabled
- Use interfaces over types where possible
- Export types from `lib/types.ts`

### Components
- Use `'use client'` directive for client components
- Server components by default in App Router
- Colocate styles with components (Tailwind classes)

### Styling
- Tailwind CSS v4 (no tailwind.config.js)
- Dark theme by default (`bg-gray-900`, `text-white`)
- Responsive: mobile-first with `sm:`, `md:`, `lg:` breakpoints
- Animations: Framer Motion with consistent easing

### File Naming
- Components: PascalCase (`TitleSlide.tsx`)
- Utils/libs: camelCase (`slides-client.ts`)
- Pages: lowercase with folders (`app/learn/101/page.tsx`)

---

## Important Patterns

### Adding a New Slide
1. Create component in `web-app/components/slides/special/`
2. Import and add case in `web-app/components/slides/Slide.tsx`
3. Update slide definitions in `web-app/lib/slides.ts`
4. Optionally add markdown in `web-app/data/slides/`

### Adding a New Page
1. Create folder in `web-app/app/`
2. Add `page.tsx` with component
3. Update navigation in `web-app/components/ui/SiteNav.tsx`

### Static Export Considerations
- No API routes (removed for GitHub Pages)
- All data fetched from static JSON files
- `slides.json` generated at build time
- Base path is `/ai-hub` for GitHub Pages

---

## Current State

### ✅ Completed
- Interactive slides (101 course - 34 slides)
- 201 course slides (27 slides)
- GitHub Pages deployment
- Mobile/tablet responsiveness
- Swipe gesture navigation
- Enterprise folder structure

### 🚧 In Progress
- Blog integration (specs written)
- Podcast integration (specs written)

### 📋 Planned
- Search functionality
- Newsletter signup
- Progress tracking

---

## Testing Checklist

Before committing changes:
- [ ] `npm run build` succeeds
- [ ] No TypeScript errors
- [ ] No linting errors (`npm run lint`)
- [ ] Test on mobile viewport (390px width)
- [ ] Test slide navigation (keyboard + swipe)

---

## Common Issues

### "No slides found" on GitHub Pages
- Check that `slides.json` exists in `public/`
- Verify `basePath` in `next.config.mjs` matches repo name
- Check browser console for fetch errors

### Build fails with API route error
- Ensure no files in `app/api/` (not compatible with static export)

### Styles not applying
- Tailwind v4 uses CSS-based config, not `tailwind.config.js`
- Check `globals.css` for `@import "tailwindcss"`

---

## Quick Reference

### Color Palette
- Primary: `blue-500` (#3b82f6)
- Secondary: `purple-500` (#8b5cf6)
- Success: `green-400`
- Background: `gray-900` (#111827)
- Surface: `gray-800` (#1f2937)

### Spacing
- Page padding: `px-6 md:px-12`
- Section gaps: `gap-4` to `gap-8`
- Card padding: `p-4` to `p-6`

### Animation Defaults
- Fade in: `initial={{ opacity: 0 }} animate={{ opacity: 1 }}`
- Slide up: `initial={{ y: 20 }} animate={{ y: 0 }}`
- Duration: 0.3s - 0.6s
- Easing: `ease: [0.4, 0, 0.2, 1]`

