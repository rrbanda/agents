# Specifications Index

**Last Updated**: 2024-12-15

This index provides a comprehensive map of all specifications, architecture decisions, and documentation in the AI Hub repository.

---

## Quick Navigation

| Category | Count | Location |
|----------|-------|----------|
| Architecture Decisions (ADRs) | 6 | [specs/architecture/decisions/](#architecture-decisions) |
| Feature Specs | 3 | [specs/features/](#feature-specifications) |
| Architecture Docs | 4 | [specs/architecture/](#architecture-documentation) |
| Templates | 2 | [specs/templates/](#templates) |
| Skills | 5 | [.claude/skills/](#claude-code-skills) |

---

## Architecture Decisions (ADRs)

**Location**: `specs/architecture/decisions/`

| ADR | Title | Status | Key Impact |
|-----|-------|--------|------------|
| [0001](./architecture/decisions/0001-static-export-github-pages.md) | Static Export for GitHub Pages | ✅ Accepted | Deployment strategy, no server-side features |
| [0002](./architecture/decisions/0002-dual-data-loading-pattern.md) | Dual Data Loading Pattern | ✅ Accepted | Build-time + runtime data loading |
| [0003](./architecture/decisions/0003-component-based-slides.md) | Component-Based Slides | ✅ Accepted | 38 custom slide components vs templates |
| [0004](./architecture/decisions/0004-tailwind-v4-css-first.md) | Tailwind CSS v4 CSS-First | ✅ Accepted | No tailwind.config.js, CSS-based config |
| [0005](./architecture/decisions/0005-framer-motion-animations.md) | Framer Motion for Animations | ✅ Accepted | Single animation library across platform |
| [0006](./architecture/decisions/0006-persona-based-content.md) | Persona-Based Content | ✅ Accepted | Role-specific examples in slides |

**Next ADR Number**: 0007

---

## Architecture Documentation

**Location**: `specs/architecture/`

| Document | Purpose | Audience |
|----------|---------|----------|
| [ui-ux-design-system.md](./architecture/ui-ux-design-system.md) | Color palette, typography, spacing, animation patterns | Designers, Frontend devs, Claude Code |
| [component-inventory.md](./architecture/component-inventory.md) | Complete catalog of all components with usage patterns | Developers, Claude Code |
| [data-flow.md](./architecture/data-flow.md) | Data loading, state management, caching strategies | Backend/fullstack devs, Claude Code |
| [content-schema.md](./architecture/content-schema.md) | Content structure for blog, podcasts, slides | Content creators |

---

## Feature Specifications

**Location**: `specs/features/`

### Implemented Features

| Feature | Status | Spec | Description |
|---------|--------|------|-------------|
| Slide Presentations | ✅ Live | [slides-system-as-built.md](./features/slides-system-as-built.md) | Interactive slide system (101, 201 courses) |

### Planned Features

| Feature | Status | Spec | Priority | Target |
|---------|--------|------|----------|--------|
| Blog | 📋 Planned | [blog.md](./features/blog.md) | P1 - High | Q1 2025 |
| Podcasts | 📋 Planned | [podcasts.md](./features/podcasts.md) | P1 - High | Q1 2025 |

---

## Templates

**Location**: `specs/templates/`

| Template | Purpose | When to Use |
|----------|---------|-------------|
| [feature-spec-template.md](./templates/feature-spec-template.md) | New feature specification | Planning blog, podcasts, search, etc. |
| [adr-template.md](./templates/adr-template.md) | Architecture Decision Record | Making technical decisions |

**Usage Guide**: See [specs/templates/README.md](./templates/README.md)

---

## Claude Code Skills

**Location**: `.claude/skills/`

| Skill | Description | Trigger Keywords | Related Specs |
|-------|-------------|------------------|---------------|
| [add-slide.md](../.claude/skills/add-slide.md) | Add new slide to presentation | "add slide", "create slide" | slides-system-as-built.md |
| [add-component.md](../.claude/skills/add-component.md) | Create reusable UI component | "create component", "new component" | component-inventory.md, ui-ux-design-system.md |
| [add-page.md](../.claude/skills/add-page.md) | Add new page/route | "create page", "new route" | ADR 0001 (static export) |
| [add-blog-post.md](../.claude/skills/add-blog-post.md) | Create new blog article | "write blog post", "new article" | blog.md |
| [fix-mobile.md](../.claude/skills/fix-mobile.md) | Fix mobile responsiveness | "mobile layout", "responsive issue" | ui-ux-design-system.md |

**Usage Guide**: See [.claude/skills/README.md](../.claude/skills/README.md)

---

## Documentation Hierarchy

```
ai-hub/
├── CLAUDE.md                          # 🎯 Main entry point for Claude Code
├── README.md                          # Public-facing overview
├── specs/
│   ├── INDEX.md                       # 📍 You are here
│   ├── roadmap.md                     # Product roadmap
│   ├── architecture/
│   │   ├── decisions/                 # ADRs (6 files)
│   │   ├── ui-ux-design-system.md
│   │   ├── component-inventory.md
│   │   ├── data-flow.md
│   │   └── content-schema.md
│   ├── features/
│   │   ├── slides-system-as-built.md  # As-built spec
│   │   ├── blog.md                    # Planned
│   │   └── podcasts.md                # Planned
│   └── templates/
│       ├── README.md
│       ├── feature-spec-template.md
│       └── adr-template.md
├── .claude/skills/                    # Claude Code skills (5 files)
└── docs/                              # Additional documentation
```

---

## By Topic

### Building New Features

**Start Here**:
1. [specs/templates/feature-spec-template.md](./templates/feature-spec-template.md) - Use this template
2. [CLAUDE.md](../CLAUDE.md) - Understand project context
3. [specs/architecture/component-inventory.md](./architecture/component-inventory.md) - See available components
4. [specs/architecture/ui-ux-design-system.md](./architecture/ui-ux-design-system.md) - Follow design patterns

**Reference Examples**:
- [specs/features/slides-system-as-built.md](./features/slides-system-as-built.md) - Existing feature
- [specs/features/blog.md](./features/blog.md) - Planned feature spec

**Skills to Use**:
- [.claude/skills/add-component.md](../.claude/skills/add-component.md)
- [.claude/skills/add-page.md](../.claude/skills/add-page.md)

---

### Making Technical Decisions

**Start Here**:
1. [specs/templates/adr-template.md](./templates/adr-template.md) - Use this template
2. Review existing ADRs for similar decisions
3. Consider impact on existing features

**Reference Examples**:
- [ADR 0003](./architecture/decisions/0003-component-based-slides.md) - Component architecture decision
- [ADR 0005](./architecture/decisions/0005-framer-motion-animations.md) - Library selection decision

---

### Understanding the Codebase

**Start Here**:
1. [CLAUDE.md](../CLAUDE.md) - Project overview
2. [specs/architecture/component-inventory.md](./architecture/component-inventory.md) - All components
3. [specs/architecture/data-flow.md](./architecture/data-flow.md) - How data moves
4. [specs/features/slides-system-as-built.md](./features/slides-system-as-built.md) - Main feature deep dive

**Design System**:
- [specs/architecture/ui-ux-design-system.md](./architecture/ui-ux-design-system.md)

---

### Working with Claude Code

**Start Here**:
1. [.claude/skills/README.md](../.claude/skills/README.md) - How skills work
2. [CLAUDE.md](../CLAUDE.md) - Project context for Claude

**Available Skills**: 5 skills covering slides, components, pages, blog, mobile

**Spec-Driven Workflow**:
1. Create spec from template
2. Reference existing patterns (ADRs, component inventory, design system)
3. Invoke relevant skills during implementation
4. Update specs as built

---

## Spec Status Legend

| Status | Icon | Meaning |
|--------|------|---------|
| Implemented | ✅ | Feature/decision is live in production |
| In Progress | 🚧 | Actively being worked on |
| Planned | 📋 | Spec written, not yet started |
| Draft | 📝 | Spec being written |
| Deprecated | ⚠️ | No longer valid |
| Superseded | 🔄 | Replaced by newer ADR/spec |

---

## Maintenance

### Adding a New Spec

1. **Choose template**:
   - Feature: `specs/templates/feature-spec-template.md`
   - ADR: `specs/templates/adr-template.md`

2. **Create file**:
   - Feature: `specs/features/[name].md`
   - ADR: `specs/architecture/decisions/NNNN-[name].md` (use next number)

3. **Fill in template** following the guidelines in `specs/templates/README.md`

4. **Update this index** with new entry

5. **Link from related docs** (CLAUDE.md, roadmap.md, etc.)

### Updating a Spec

- Mark updated sections with `**Updated [date]**:`
- If major changes, consider creating a new ADR that supersedes old one
- Update this index if status changes

### Deprecating a Spec

- Change status to `Deprecated` or `Superseded`
- Add note at top: `**This spec has been superseded by [link]**`
- Update this index
- Don't delete (preserve history)

---

## Questions?

**For developers**:
- Start with [CLAUDE.md](../CLAUDE.md) for project overview
- Check [component-inventory.md](./architecture/component-inventory.md) for available components
- Review [ui-ux-design-system.md](./architecture/ui-ux-design-system.md) for styling

**For Claude Code**:
- All specs are designed to be Claude Code-friendly
- Reference file paths and line numbers where applicable
- Link to related skills in `.claude/skills/`

**For product/design**:
- See [roadmap.md](./roadmap.md) for planned features
- Check feature specs in `specs/features/` for detailed requirements

---

**Last Updated**: 2024-12-15 | **Maintained By**: Project team | **Version**: 1.0
