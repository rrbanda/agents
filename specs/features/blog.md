# Feature Spec: Blog

## Overview

Add a blog section to AI Hub for publishing in-depth articles, tutorials, and insights about AI and agentic systems.

## User Stories

### As a visitor, I want to:
- Browse a list of blog posts
- Read articles with rich formatting
- Filter by category and tags
- Share articles on social media

### As a content creator, I want to:
- Write posts in Markdown
- Add images and code snippets
- Preview before publishing
- Track reading time estimates

## Technical Requirements

### Content Structure
```
content/blog/
├── _template.md
└── posts/
    ├── 2024-01-01-article-title.md
    └── ...
```

### Front Matter Schema
```yaml
---
title: "Article Title"
subtitle: "Optional subtitle"
date: "YYYY-MM-DD"
author: "Author Name"
status: "draft|published"
tags: ["tag1", "tag2"]
category: "fundamentals|tutorials|news"
featured: false
estimated_reading_time: "X min"
cover_image: "./images/cover.jpg"
---
```

### Website Components
- `BlogListPage` - Grid of article cards
- `ArticleCard` - Preview with image, title, excerpt
- `ArticlePage` - Full article view
- `TableOfContents` - Auto-generated from headings
- `AuthorCard` - Author info and social links
- `RelatedPosts` - Suggested articles

### Data Schema
```typescript
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  author: string;
  status: 'draft' | 'published';
  tags: string[];
  category: string;
  featured: boolean;
  readingTime: string;
  coverImage?: string;
  excerpt: string;
  content: string;
}
```

### Build Process
1. Read posts from `content/blog/posts/`
2. Parse front matter and markdown content
3. Generate excerpts automatically
4. Calculate reading time
5. Generate `blog.json` at build time

## UI/UX Design

### Blog List View
- Featured post hero at top
- Card grid with cover images
- Category filter tabs
- Tag cloud sidebar
- Pagination or infinite scroll

### Article View
- Full-width cover image
- Sticky table of contents (desktop)
- Syntax-highlighted code blocks
- Copy code button
- Social share buttons
- Author bio footer
- Related articles

## Acceptance Criteria

- [ ] Articles render from content/blog/posts/
- [ ] Markdown fully supported (tables, code, images)
- [ ] Code blocks have syntax highlighting
- [ ] Images are optimized
- [ ] SEO meta tags generated
- [ ] RSS feed available at /blog/rss.xml
- [ ] Mobile responsive

## Dependencies

- Markdown parser (remark/rehype)
- Syntax highlighting (Shiki or Prism)
- Reading time calculation

## Timeline

| Milestone | Target |
|-----------|--------|
| Spec approval | Week 1 |
| Article page component | Week 2 |
| Blog list page | Week 2 |
| Content pipeline | Week 3 |
| Testing & SEO | Week 3 |
| Launch | Week 4 |

