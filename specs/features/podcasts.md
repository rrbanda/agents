# Feature Spec: Podcasts

## Overview

Add podcast functionality to AI Hub, allowing users to discover, listen to, and learn from audio content about AI and agentic systems.

## User Stories

### As a visitor, I want to:
- Browse a list of podcast episodes
- Listen to episodes directly on the website
- Read show notes and transcripts
- Filter episodes by topic/tag

### As a content creator, I want to:
- Add new episodes using a standard template
- Include show notes and transcripts
- Embed from external podcast hosts (Spotify, Apple, etc.)

## Technical Requirements

### Content Structure
```
content/podcasts/
├── _template.md
└── episodes/
    └── XXX-episode-name/
        ├── metadata.json
        ├── show-notes.md
        └── transcript.md
```

### Website Components
- `PodcastListPage` - Grid/list of all episodes
- `EpisodeCard` - Preview card with play button
- `EpisodePage` - Full episode view
- `AudioPlayer` - Embedded player component
- `TranscriptViewer` - Collapsible transcript display

### Data Schema
```typescript
interface PodcastEpisode {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  duration: string;
  status: 'draft' | 'published';
  season?: number;
  episode?: number;
  authors: string[];
  guests?: string[];
  tags: string[];
  audioUrl: string;
  videoUrl?: string;
  thumbnail?: string;
  showNotes: string;
  transcript?: string;
}
```

### Build Process
1. Read episodes from `content/podcasts/episodes/`
2. Parse metadata.json and markdown files
3. Generate `podcasts.json` at build time
4. Fetch from static JSON in client

## UI/UX Design

### Episode List View
- Card-based grid layout
- Thumbnail, title, duration, date
- Play button overlay
- Tag pills for filtering

### Episode Detail View
- Hero section with cover art
- Audio player (sticky on scroll)
- Show notes content
- Expandable transcript
- Related episodes sidebar

## Acceptance Criteria

- [ ] Episodes render from content/podcasts/
- [ ] Audio player works on mobile and desktop
- [ ] Show notes support markdown formatting
- [ ] Transcripts are searchable
- [ ] Page loads in < 2 seconds
- [ ] Accessible (keyboard navigation, screen reader support)

## Dependencies

- Audio hosting (Spotify, SoundCloud, or self-hosted)
- Optional: Video embed support (YouTube)

## Timeline

| Milestone | Target |
|-----------|--------|
| Spec approval | Week 1 |
| Component development | Week 2-3 |
| Content pipeline | Week 3 |
| Testing & polish | Week 4 |
| Launch | Week 5 |

