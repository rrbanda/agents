# Contributing to AI Hub

Thank you for your interest in contributing to AI Hub! This document provides guidelines for contributing content and code.

## 📋 Table of Contents

- [Types of Contributions](#types-of-contributions)
- [Content Contributions](#content-contributions)
- [Code Contributions](#code-contributions)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)

---

## Types of Contributions

| Type | Description | Where |
|------|-------------|-------|
| 📝 Blog Posts | Articles about AI topics | `content/blog/posts/` |
| 🎙️ Podcast Episodes | Audio content metadata | `content/podcasts/episodes/` |
| 🎬 Slide Decks | Presentation content | `content/slides/` |
| 💻 Code | Website features and fixes | `web-app/` |
| 📖 Documentation | Guides and references | `docs/` |
| 📋 Specs | Feature specifications | `specs/` |

---

## Content Contributions

### Adding a Blog Post

1. Create a new file in `content/blog/posts/`:
   ```
   YYYY-MM-DD-your-title.md
   ```

2. Use the template from `content/blog/_template.md`

3. Include required front matter:
   ```yaml
   ---
   title: "Your Title"
   date: "YYYY-MM-DD"
   author: "Your Name"
   status: "draft"
   tags: ["tag1", "tag2"]
   ---
   ```

4. Submit a pull request

### Adding a Podcast Episode

1. Create a folder in `content/podcasts/episodes/`:
   ```
   XXX-episode-title/
   ```

2. Include required files:
   - `metadata.json`
   - `show-notes.md`
   - `transcript.md` (optional)

3. Follow the template in `content/podcasts/_template.md`

### Adding Slides

1. Navigate to the appropriate course folder:
   ```
   content/slides/XXX-course-name/slides/
   ```

2. Add markdown files following the naming convention:
   ```
   XX-slide-title.md
   ```

3. Follow the template in `content/slides/_template.md`

---

## Code Contributions

### Prerequisites

- Node.js 20+
- npm 9+

### Development Setup

```bash
# Clone the repository
git clone https://github.com/rrbanda/ai-hub.git
cd ai-hub

# Install dependencies
cd web-app
npm install

# Start development server
npm run dev
```

### Code Style

- TypeScript for all new code
- Follow existing patterns in the codebase
- Use Tailwind CSS for styling
- Components go in `web-app/components/`

### Testing

```bash
# Run linter
npm run lint

# Build for production
npm run build
```

---

## Pull Request Process

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following the guidelines above
4. **Test locally** to ensure everything works
5. **Commit** with a clear message:
   ```bash
   git commit -m "Add: description of your change"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** against `main`

### Commit Message Format

```
Type: Brief description

Longer description if needed.

- Bullet points for multiple changes
- Keep lines under 72 characters
```

Types: `Add`, `Fix`, `Update`, `Remove`, `Refactor`, `Docs`

---

## Questions?

Open an issue or reach out to the maintainers.

Thank you for contributing! 🙏

