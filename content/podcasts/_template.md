# Podcast Episode Template

Use this template when creating a new podcast episode.

## Episode Structure

Create a folder: `episodes/XXX-episode-title/` with these files:

### 1. metadata.json

```json
{
  "id": "XXX",
  "title": "Episode Title",
  "subtitle": "Brief subtitle or hook",
  "date": "YYYY-MM-DD",
  "duration": "MM:SS",
  "status": "draft|published",
  "season": 1,
  "episode": 1,
  "authors": ["Author Name"],
  "guests": ["Guest Name"],
  "tags": ["tag1", "tag2"],
  "audio_url": "https://...",
  "video_url": "https://...",
  "thumbnail": "./thumbnail.jpg"
}
```

### 2. show-notes.md

```markdown
# Episode Title

## Summary
Brief 2-3 sentence summary of the episode.

## Topics Covered
- Topic 1 (timestamp: 00:00)
- Topic 2 (timestamp: 05:30)
- Topic 3 (timestamp: 12:45)

## Key Takeaways
1. Takeaway one
2. Takeaway two
3. Takeaway three

## Resources Mentioned
- [Resource Name](https://link)

## Connect
- Host: [LinkedIn](https://...)
- Guest: [Twitter](https://...)
```

### 3. transcript.md

```markdown
# Transcript: Episode Title

**[00:00] Host:**
Opening remarks...

**[00:45] Guest:**
Response...

(Continue with timestamped transcript)
```

## Naming Convention

- Folder: `XXX-kebab-case-title/`
- Episode numbers: 001, 002, 003...
- Use descriptive, SEO-friendly titles

