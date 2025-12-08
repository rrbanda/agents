# Agentic AI Interactive Presentation

A rich, web-based interactive presentation explaining Agentic AI with Netflix-style storytelling, animations, and interactive elements.

## Features

- 🎬 Netflix-style storytelling with cinematic animations
- 🎨 Rich UI/UX with smooth transitions
- 🎯 Interactive diagrams and visualizations
- 👥 Persona-based content adaptation
- 📱 Fully responsive design
- ♿ Accessibility features
- 📊 Progress tracking

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Content**: Markdown (from presentation slides)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
web-app/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main presentation page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── slides/           # Slide components
│   ├── diagrams/         # Diagram components
│   ├── animations/       # Animation components
│   └── ui/               # UI components
├── lib/                   # Utilities
│   ├── slides.ts         # Slide data and parser
│   └── utils.ts          # Helper functions
├── data/                  # Content data
│   └── slides/           # Slide markdown files
└── public/               # Static assets
```

## Development

The presentation uses content from `../presentation/slides/` directory. Each slide is a markdown file that gets parsed and rendered with animations.

## License

Same as parent repository.
