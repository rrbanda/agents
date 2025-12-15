# Content Architecture

## Overview

This document defines the content schema and data flow for AI Hub.

## Content Types

| Type | Location | Format | Output |
|------|----------|--------|--------|
| Blog Posts | `content/blog/posts/` | Markdown + YAML front matter | `blog.json` |
| Podcasts | `content/podcasts/episodes/` | JSON + Markdown | `podcasts.json` |
| Slides | `content/slides/*/slides/` | Markdown | `slides.json` |
| Resources | `content/resources/` | Markdown | Static files |

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     CONTENT LAYER                           │
│  content/                                                   │
│  ├── blog/posts/*.md                                        │
│  ├── podcasts/episodes/*/                                   │
│  └── slides/*/slides/*.md                                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     BUILD LAYER                             │
│  scripts/                                                   │
│  ├── generate-blog.mjs                                      │
│  ├── generate-podcasts.mjs                                  │
│  └── generate-slides.mjs                                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     OUTPUT LAYER                            │
│  web-app/public/                                            │
│  ├── blog.json                                              │
│  ├── podcasts.json                                          │
│  └── slides.json                                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                         │
│  web-app/                                                   │
│  ├── lib/*-client.ts    (fetch from JSON)                   │
│  └── app/*/page.tsx     (render content)                    │
└─────────────────────────────────────────────────────────────┘
```

## Schema Definitions

### Common Fields

All content types share these fields:

```typescript
interface BaseContent {
  id: string;           // Unique identifier
  title: string;        // Display title
  date: string;         // ISO date string
  status: 'draft' | 'published';
  tags: string[];       // Categorization
  authors: string[];    // Content creators
}
```

### Blog Post Schema

```typescript
interface BlogPost extends BaseContent {
  slug: string;         // URL-friendly identifier
  subtitle?: string;
  category: string;
  featured: boolean;
  readingTime: string;
  coverImage?: string;
  excerpt: string;      // Auto-generated or manual
  content: string;      // Full markdown content
}
```

### Podcast Episode Schema

```typescript
interface PodcastEpisode extends BaseContent {
  season?: number;
  episode?: number;
  duration: string;
  guests?: string[];
  audioUrl: string;
  videoUrl?: string;
  thumbnail?: string;
  showNotes: string;
  transcript?: string;
}
```

### Slide Deck Schema

```typescript
interface SlideDeck extends BaseContent {
  level: '101' | '201' | '301';
  version: string;
  slideCount: number;
  duration: string;
  prerequisites?: string[];
  slides: Slide[];
}

interface Slide {
  number: number;
  id: string;
  title: string;
  type: 'title' | 'content' | 'section' | 'demo';
  content: string;
  speakerNotes?: string;
  visualDescription?: string;
}
```

## Validation

Content is validated at build time:

1. **Required fields** - All required fields must be present
2. **Date format** - Must be valid ISO date
3. **Status** - Must be 'draft' or 'published'
4. **References** - Internal links must resolve

## Versioning

- Content changes tracked via Git
- Major updates increment version in metadata.json
- Breaking schema changes require migration script

## Future Considerations

- [ ] Content preview system
- [ ] Scheduled publishing
- [ ] Multi-language support
- [ ] Content relationships (related posts)

