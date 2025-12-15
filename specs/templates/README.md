# Spec Templates

This directory contains templates for creating consistent, comprehensive specifications across the AI Hub project.

---

## Available Templates

| Template | Purpose | When to Use |
|----------|---------|-------------|
| [feature-spec-template.md](./feature-spec-template.md) | New feature specification | When planning a new feature (blog, podcasts, search, etc.) |
| [adr-template.md](./adr-template.md) | Architecture Decision Record | When making a significant technical decision |

---

## How to Use Templates

### 1. Creating a New Feature Spec

```bash
# Copy the template
cp specs/templates/feature-spec-template.md specs/features/my-new-feature.md

# Edit the file and fill in all sections
# Remove sections that don't apply (mark as N/A if unsure)
```

**Checklist**:
- [ ] Fill in all `[bracketed]` placeholders
- [ ] Define clear user stories
- [ ] List all files to create/modify
- [ ] Define acceptance criteria
- [ ] Link to related skills or ADRs
- [ ] Add to roadmap

### 2. Creating a New ADR

```bash
# Determine the next ADR number (check existing ADRs)
ls specs/architecture/decisions/

# Copy the template with the next number
cp specs/templates/adr-template.md specs/architecture/decisions/0007-my-decision.md

# Edit and fill in all sections
```

**Checklist**:
- [ ] Use sequential numbering (0001, 0002, ...)
- [ ] Clear, specific title
- [ ] Document at least 2-3 alternatives
- [ ] Explain WHY, not just WHAT
- [ ] List concrete consequences
- [ ] Link to related ADRs

**Naming Convention**: `NNNN-descriptive-title.md`
- `0001-static-export-github-pages.md`
- `0002-dual-data-loading-pattern.md`

---

## Template Guidelines

### What Makes a Good Spec?

**✅ Good Spec**:
- Specific and actionable
- Lists exact files to create/modify
- Has clear acceptance criteria
- References established patterns
- Considers edge cases
- Includes testing strategy

**❌ Bad Spec**:
- Vague or high-level
- No file paths or specifics
- Missing acceptance criteria
- Ignores existing patterns
- No testing plan

### Example: Good vs Bad

**❌ Bad**:
> "Add a blog to the website"

**✅ Good**:
> "Add a blog section with markdown-based posts, following the same dual data loading pattern as slides (ADR 0002). Create `lib/blog.ts` and `lib/blog-client.ts`, generate `blog.json` at build time, render with `react-markdown`. Add blog navigation link to `SiteNav.tsx:42`."

---

## Spec Workflow

### 1. Draft
- Use template
- Fill in known sections
- Mark unknowns as `[TBD]`
- Status: `Draft`

### 2. Review
- Share with team or Claude Code
- Answer open questions
- Refine technical approach
- Status: `In Review`

### 3. Approval
- All sections complete
- Consensus on approach
- Ready to implement
- Status: `Approved`

### 4. Implementation
- Follow the spec
- Update if needed (mark as "Updated during implementation")
- Check off acceptance criteria
- Status: `Implementing`

### 5. Complete
- All criteria met
- Documentation updated
- Deployed to production
- Status: `Implemented`

---

## Section-by-Section Guide

### Feature Spec Sections

| Section | Purpose | Required? |
|---------|---------|-----------|
| Overview | High-level description | ✅ Required |
| User Stories | User-facing value | ✅ Required |
| Problem Statement | Context and motivation | ✅ Required |
| Technical Requirements | Implementation details | ✅ Required |
| UI/UX Design | Visual and interaction design | ✅ Required |
| Implementation Plan | Files to create/modify | ✅ Required |
| Testing Strategy | How to verify it works | ✅ Required |
| Acceptance Criteria | Definition of done | ✅ Required |
| Dependencies | Blockers and relationships | ⚠️ If applicable |
| Rollback Plan | How to undo if needed | ⚠️ For critical features |
| Timeline | Milestones and dates | ⚠️ Optional |
| Open Questions | Unresolved issues | ⚠️ During draft |

### ADR Sections

| Section | Purpose | Required? |
|---------|---------|-----------|
| Context | Why we need to decide | ✅ Required |
| Options Considered | All alternatives evaluated | ✅ Required (2+ options) |
| Decision | What we chose and why | ✅ Required |
| Consequences | Impacts of the decision | ✅ Required |
| Trade-offs | What we're accepting | ✅ Required |
| Related Decisions | Links to other ADRs | ⚠️ If applicable |
| Future Considerations | When to revisit | ⚠️ Optional |

---

## Tips for Claude Code

When using these templates with Claude Code:

1. **Reference existing patterns**:
   ```
   "Follow the same component structure as AnatomyProgressiveSlide.tsx"
   "Use the data loading pattern from ADR 0002"
   ```

2. **Be specific about file locations**:
   ```
   "Create web-app/components/blog/ArticleCard.tsx"
   "Modify web-app/components/ui/SiteNav.tsx line 42"
   ```

3. **Link to related documentation**:
   ```
   "See ui-ux-design-system.md for color palette"
   "Follow animation patterns from component-inventory.md"
   ```

4. **Reference skills**:
   ```
   "Use .claude/skills/add-component.md pattern"
   ```

---

## Examples

### Example Feature Specs
- See `specs/features/blog.md` (in progress)
- See `specs/features/podcasts.md` (in progress)
- See `specs/features/slides-system-as-built.md` (as-built)

### Example ADRs
- See `specs/architecture/decisions/0001-static-export-github-pages.md`
- See `specs/architecture/decisions/0003-component-based-slides.md`

---

## Questions?

For questions about using these templates:
1. Check existing specs for examples
2. Refer to `CLAUDE.md` for project context
3. Review `component-inventory.md` for available patterns
4. Consult `ui-ux-design-system.md` for design guidance

---

**Remember**: The goal of specs is to enable Claude Code (or any developer) to implement features consistently with existing patterns. Be specific, reference established conventions, and think through edge cases.
