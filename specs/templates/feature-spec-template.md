# Feature Spec: [Feature Name]

**Status**: [Draft | In Review | Approved | Implemented]
**Priority**: [P0 - Critical | P1 - High | P2 - Medium | P3 - Low]
**Owner**: [Name or Team]
**Target Release**: [Version or Date]

---

## Overview

[1-2 sentence description of what this feature does and why it's valuable]

---

## User Stories

### As a [user type], I want to:
- [ ] [Action] so that [benefit]
- [ ] [Action] so that [benefit]
- [ ] [Action] so that [benefit]

### As a [another user type], I want to:
- [ ] [Action] so that [benefit]

---

## Problem Statement

### Current State
[Describe the current situation, pain points, or limitations]

### Desired State
[Describe the ideal outcome after implementing this feature]

### Success Metrics
- [Metric 1]: [Target value]
- [Metric 2]: [Target value]

---

## Technical Requirements

### Data Model

**New Types** (add to `lib/types.ts`):
```typescript
interface NewType {
  id: string;
  // ... fields
}
```

**Existing Types to Modify**:
- `ExistingType` - Add field `newField: string`

### Content Structure

```
content/[feature-name]/
├── _template.md           # Template for new content
└── items/
    ├── item-01.md
    └── item-02.md
```

**Front Matter Schema**:
```yaml
---
title: "Title"
date: "YYYY-MM-DD"
status: "draft|published"
tags: ["tag1", "tag2"]
---
```

### Components

**New Components to Create**:
- `[ComponentName]` - [Purpose]
  - File: `web-app/components/[category]/[ComponentName].tsx`
  - Props: [List props]

**Existing Components to Modify**:
- `ExistingComponent` - [What to modify]

### Pages

**New Pages**:
- `/[route]` - [Purpose]
  - File: `app/[route]/page.tsx`

**Existing Pages to Modify**:
- `/existing` - [What to modify]

### Data Loading Pattern

**Build Time** (if using markdown):
1. Read files from `content/[feature]/`
2. Parse with gray-matter
3. Generate `[feature].json` in `public/`

**Runtime**:
1. Fetch `[feature].json` from public
2. Cache in memory
3. Render in components

### API/External Dependencies
- [Dependency 1]: [Purpose, version]
- [Dependency 2]: [Purpose, version]

---

## UI/UX Design

### Wireframes
[Link to Figma/images or describe layout]

### Design Patterns to Use
- **Layout**: [Grid, flex, single column, etc.]
- **Colors**: Use design system (blue-500 primary, etc.)
- **Typography**: [H1, H2, body sizes per design system]
- **Animations**: [Which animation patterns to use]
- **Responsive**: [Mobile, tablet, desktop behaviors]

### User Flow
1. User lands on [page]
2. User [action]
3. System [response]
4. User sees [result]

---

## Implementation Plan

### Files to Create
```
web-app/
├── app/[route]/page.tsx               # New page
├── components/[category]/
│   ├── [Component1].tsx               # New component
│   └── [Component2].tsx               # New component
├── lib/[feature]-client.ts            # Client data loader
└── data/[feature]/
    └── item-01.md                     # Sample content

scripts/
└── generate-[feature].mjs             # Build script

content/[feature]/
└── ...                                # Content source
```

### Files to Modify
- `web-app/components/ui/SiteNav.tsx:XX` - Add nav link
- `web-app/lib/types.ts` - Add new interfaces
- `web-app/package.json` - Add dependencies (if needed)
- `web-app/next.config.mjs` - Update config (if needed)

### Build Process Changes
```json
{
  "scripts": {
    "generate-[feature]": "node scripts/generate-[feature].mjs",
    "build": "npm run generate-slides && npm run generate-[feature] && next build"
  }
}
```

---

## Related Skills

**Existing Skills to Use**:
- `.claude/skills/add-component.md` - For creating UI components
- `.claude/skills/add-page.md` - For creating new pages

**New Skills to Create**:
- `.claude/skills/add-[feature]-item.md` - For adding content items

---

## Testing Strategy

### Unit Tests
- [ ] Test [Component] rendering
- [ ] Test [function] logic
- [ ] Test data loading

### Integration Tests
- [ ] Test [page] loads correctly
- [ ] Test [interaction] works end-to-end

### Manual Testing Checklist
- [ ] Feature works on desktop
- [ ] Feature works on mobile
- [ ] Navigation is correct
- [ ] Data loads properly
- [ ] Animations are smooth
- [ ] Accessible (keyboard nav, screen reader)
- [ ] Build succeeds
- [ ] Deploys correctly

---

## Acceptance Criteria

- [ ] [Criterion 1]: [How to verify]
- [ ] [Criterion 2]: [How to verify]
- [ ] [Criterion 3]: [How to verify]
- [ ] All tests pass
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] Deployed to production

---

## Dependencies

### Blocks
- [Feature X must be completed first]

### Blocked By
- [This feature blocks Feature Y]

### Related Features
- [Feature A] - [Relationship]
- [Feature B] - [Relationship]

---

## Rollback Plan

If deployment fails or critical bugs found:
1. Revert commits [X-Y]
2. Restore previous [files/data]
3. Redeploy previous version
4. Notify users (if needed)

---

## Timeline

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Spec approved | YYYY-MM-DD | ⏳ Pending |
| Implementation started | YYYY-MM-DD | ⏳ Pending |
| Testing complete | YYYY-MM-DD | ⏳ Pending |
| Deployed to production | YYYY-MM-DD | ⏳ Pending |

---

## Open Questions

- [ ] Question 1?
- [ ] Question 2?

---

## Related Documentation

- [ADR XXXX]: [Related architecture decision]
- [Component Inventory]: List of available components
- [UI/UX Design System]: Design patterns to follow
- [Data Flow]: Data loading patterns

---

## Notes

[Any additional context, considerations, or decisions made during planning]
