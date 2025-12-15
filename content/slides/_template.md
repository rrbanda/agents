# Slide Deck Template

Use this template when creating a new presentation/course.

## Folder Structure

```
content/slides/
└── XXX-course-name/
    ├── metadata.json
    ├── README.md
    ├── SUMMARY.md
    └── slides/
        ├── 01-title.md
        ├── 02-introduction.md
        ├── 03-topic-one.md
        └── ...
```

## metadata.json

```json
{
  "id": "XXX-course-name",
  "title": "Course Title",
  "subtitle": "Brief description",
  "level": "101|201|301",
  "status": "draft|published",
  "version": "1.0.0",
  "created": "YYYY-MM-DD",
  "updated": "YYYY-MM-DD",
  "authors": ["Author Name"],
  "duration": "~XX min",
  "slide_count": 30,
  "tags": ["tag1", "tag2"],
  "prerequisites": ["101-fundamentals"]
}
```

## Individual Slide Format

```markdown
---
slide: XX
title: "Slide Title"
type: "title|content|section|demo|interactive"
transition: "fade|slide|none"
---

## Slide Content

### Main Title

Content goes here...

---

## Speaker Notes

Notes for the presenter (not shown on slide)

---

## Visual Description

Description of any diagrams or visuals needed

---

## References

- [Source](https://...)
```

## Slide Types

| Type | Use Case |
|------|----------|
| `title` | Opening/closing slides |
| `section` | Section dividers |
| `content` | Main content slides |
| `demo` | Live demonstration |
| `interactive` | Audience participation |

## Best Practices

1. **One idea per slide**
2. **Maximum 6 bullet points**
3. **Use visuals over text**
4. **Include speaker notes**
5. **Keep consistent styling**

