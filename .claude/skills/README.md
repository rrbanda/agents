# Claude Code Skills

This folder contains skill definitions for common coding tasks in the AI Hub repository.

## Available Skills

| Skill | Description | Trigger |
|-------|-------------|---------|
| [add-slide](./add-slide.md) | Add a new slide to a presentation | "Add a slide about X" |
| [add-blog-post](./add-blog-post.md) | Create a new blog article | "Write a blog post about X" |
| [add-page](./add-page.md) | Add a new page/route | "Create a page for X" |
| [add-component](./add-component.md) | Create a reusable UI component | "Create a component that X" |
| [fix-mobile](./fix-mobile.md) | Fix mobile responsiveness issues | "Fix mobile layout for X" |

## How Skills Work

Skills are reference documents that help Claude Code understand:
1. **When** to apply specific patterns
2. **How** to implement features consistently
3. **What** files to modify
4. **Checklist** items to verify

## Using Skills

Skills are automatically referenced when Claude Code identifies matching patterns in user requests. You can also explicitly reference a skill:

```
Follow the add-slide skill to add a new slide about RAG
```

## Adding New Skills

1. Create a new markdown file in this folder
2. Follow the template structure:
   - Description
   - When to Use
   - Prerequisites
   - Steps
   - Checklist
   - Example

## Skill Template

```markdown
# Skill: Name

## Description
What this skill accomplishes.

## When to Use
- Trigger condition 1
- Trigger condition 2

## Prerequisites
- Required information
- Dependencies

## Steps

### 1. First Step
Details...

### 2. Second Step
Details...

## Checklist
- [ ] Verification item 1
- [ ] Verification item 2

## Example
Concrete example of the skill in action.
```

