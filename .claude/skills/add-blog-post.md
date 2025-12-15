# Skill: Add Blog Post

## Description
Add a new blog post to the content repository.

## When to Use
- User wants to create a new blog article
- User provides a topic for a blog post
- User wants to convert notes/content into a blog post

## Prerequisites
- Topic or content for the blog post
- Author name (default to repo owner if not specified)

## Steps

### 1. Create the Blog Post File

Create markdown file in `content/blog/posts/`:

**Naming Convention**: `YYYY-MM-DD-kebab-case-title.md`

```markdown
---
title: "Your Article Title"
subtitle: "Optional subtitle or hook"
date: "YYYY-MM-DD"
author: "Author Name"
status: "draft"
tags: ["tag1", "tag2", "tag3"]
category: "fundamentals"
featured: false
estimated_reading_time: "X min"
---

## Introduction

Hook the reader. What problem are you solving? Why should they care?

## Section 1: Background

Provide context and foundational information.

## Section 2: Main Content

Deep dive into the topic. Use:
- Code examples with syntax highlighting
- Bullet points for clarity
- Real-world scenarios

```python
# Code example
def example():
    return "Hello, AI Hub!"
```

## Section 3: Practical Application

How can readers apply this knowledge?

## Conclusion

Summarize key points and provide next steps.

## References

- [Reference 1](https://example.com)
```

### 2. Categories

Valid categories:
- `fundamentals` - Basic concepts
- `tutorials` - Step-by-step guides
- `advanced` - Deep technical content
- `news` - Industry updates

### 3. Tags

Use existing tags when possible:
- `agents`, `ai`, `llm`, `prompting`
- `tools`, `mcp`, `context`
- `architecture`, `patterns`

### 4. Status

- `draft` - Not visible on site
- `published` - Visible on site

## Future Integration

When blog feature is implemented:
1. Build script will read from `content/blog/posts/`
2. Generate `blog.json` at build time
3. Blog pages will render from this data

## Checklist
- [ ] File named correctly (YYYY-MM-DD-title.md)
- [ ] Front matter complete
- [ ] Content structured with headers
- [ ] Code examples formatted
- [ ] Status set to `draft` initially

## Example

**User Request**: "Write a blog post about prompt engineering basics"

**File**: `content/blog/posts/2024-12-14-prompt-engineering-basics.md`

