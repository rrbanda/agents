# ADR 0001: Static Export for GitHub Pages Deployment

**Status**: Accepted
**Date**: 2024 (Implemented)
**Decision Makers**: Project Team

## Context

AI Hub needs to be deployed as a free, publicly accessible website for learning content. The platform features interactive slide presentations, and will eventually include blog posts and podcasts.

### Constraints
- Zero hosting cost requirement
- No backend server available
- Must support deep linking to specific slides
- Content updates through git workflow
- Fast global delivery desired

### Options Considered

1. **Vercel/Netlify with SSR**
   - Pros: Full Next.js features, easy deployment
   - Cons: Costs money at scale, vendor lock-in

2. **Traditional Static Site (HTML/CSS/JS)**
   - Pros: Simple, fast
   - Cons: No React component model, harder to maintain interactivity

3. **Next.js Static Export to GitHub Pages**
   - Pros: Free hosting, React component model, git-based workflow
   - Cons: No API routes, no server components, requires build-time data generation

## Decision

Use **Next.js Static Export** (`output: 'export'`) deployed to **GitHub Pages**.

### Implementation Details

```javascript
// next.config.mjs
export default {
  output: 'export',              // Static HTML/CSS/JS output
  basePath: '/ai-hub',           // GitHub Pages repo path
  assetPrefix: '/ai-hub/',       // Asset URL prefix
  images: { unoptimized: true }, // No server-side image optimization
  trailingSlash: true,           // GitHub Pages routing
};
```

### Data Strategy
- Build-time markdown parsing → static JSON
- Script `generate-slides.mjs` creates `/public/slides.json`
- Client-side data fetching via `lib/slides-client.ts`

## Consequences

### Positive
- ✅ Zero hosting cost (GitHub Pages is free)
- ✅ Git-based deployment workflow
- ✅ Full React component model for interactivity
- ✅ Automatic SSL/HTTPS via GitHub
- ✅ Fast CDN delivery
- ✅ Version control for content and code

### Negative
- ❌ Cannot use Next.js API routes
- ❌ Cannot use server-side rendering (SSR)
- ❌ Cannot use server components fully
- ❌ Requires build-time data generation script
- ❌ Cannot use dynamic routes with getServerSideProps

### Mitigations
- Build-time data generation solves static data needs
- Client-side data fetching from static JSON files
- All interactivity handled via client components
- GitHub Actions automates build and deployment

## Related Decisions
- ADR 0002: Dual Data Loading Pattern
- ADR 0003: Component-Based Slides

## References
- Next.js Static Exports: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- GitHub Pages: https://pages.github.com/
