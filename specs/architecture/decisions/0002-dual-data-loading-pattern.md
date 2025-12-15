# ADR 0002: Dual Data Loading Pattern (Server + Client)

**Status**: Accepted
**Date**: 2024 (Implemented)
**Decision Makers**: Project Team

## Context

With Next.js static export (ADR 0001), we need to:
1. Parse markdown files at build time
2. Generate static JSON for client-side consumption
3. Maintain type safety and DRY principles
4. Support both build-time and runtime data access

### Problem
How do we structure data loading for markdown-based slides in a static export environment?

### Options Considered

1. **Single Client-Side Loading**
   - All markdown parsing in browser
   - Pros: Simple, one code path
   - Cons: Slow initial load, large bundle, parsing overhead

2. **Build-Time Only (Hardcoded Data)**
   - Parse at build, inline into JavaScript
   - Pros: Fast, no fetch needed
   - Cons: Large bundle, no separation of data/code

3. **Dual Pattern (Server + Client)**
   - Build-time: Parse markdown, generate JSON
   - Runtime: Fetch static JSON
   - Pros: Fast, small bundle, clean separation
   - Cons: Two code paths to maintain

## Decision

Implement **Dual Data Loading Pattern** with:
- `lib/slides.ts` for server-side/build-time use
- `lib/slides-client.ts` for client-side runtime use
- Build script bridges the two

### Implementation

**Server-Side** (`lib/slides.ts`):
```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getAllSlides(): Promise<Slide[]> {
  // Read markdown files from /data/slides/
  // Parse with gray-matter
  // Return Slide[] objects
}
```

**Client-Side** (`lib/slides-client.ts`):
```typescript
let cachedData: Slide[] | null = null;

export async function getAllSlidesClient(): Promise<Slide[]> {
  if (cachedData) return cachedData;

  const basePath = window.location.hostname === 'localhost' ? '' : '/ai-hub';
  const response = await fetch(`${basePath}/slides.json`);
  cachedData = await response.json();
  return cachedData;
}
```

**Build Script** (`scripts/generate-slides.mjs`):
```javascript
import { getAllSlides } from '../web-app/lib/slides.ts';
import fs from 'fs';

const slides = await getAllSlides();
fs.writeFileSync('public/slides.json', JSON.stringify(slides, null, 2));
```

**Package.json**:
```json
{
  "scripts": {
    "build": "npm run generate-slides && next build",
    "generate-slides": "node scripts/generate-slides.mjs"
  }
}
```

## Consequences

### Positive
- ✅ Fast client-side loading (pre-parsed JSON)
- ✅ Small JavaScript bundle (no markdown parser in browser)
- ✅ Build-time validation of markdown format
- ✅ Type safety across both patterns
- ✅ Easy to test server-side parsing
- ✅ Caching support on client side

### Negative
- ❌ Two files to maintain (slides.ts + slides-client.ts)
- ❌ Potential for inconsistency if types diverge
- ❌ Build step dependency (must run generate-slides)
- ❌ Data duplication (markdown + JSON in repo)

### Mitigations
- Shared types in `lib/types.ts` ensure consistency
- Build script automated via npm scripts
- Git ignores `/public/slides.json` to avoid duplication
- Tests validate both paths return same data

## Alternatives Considered

**Single Universal Module**:
- Could use conditional imports: `if (typeof window === 'undefined')`
- Rejected: More complex, harder to tree-shake

**GraphQL/CMS**:
- Use headless CMS for content
- Rejected: Overkill for current needs, adds complexity

## Related Decisions
- ADR 0001: Static Export for GitHub Pages
- ADR 0003: Component-Based Slides

## Future Considerations
- May extend pattern for blog posts and podcasts
- Could add incremental static regeneration if moving off GitHub Pages
- Could add MDX support for richer markdown

## References
- gray-matter: https://github.com/jonschlinkert/gray-matter
- Next.js Data Fetching: https://nextjs.org/docs/app/building-your-application/data-fetching
