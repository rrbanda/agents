# Presenter Mode Guide

## Overview

The presentation now has **two separate pages** that sync automatically:

1. **Main Presentation** (`/`) - For screensharing/audience
2. **Presenter Notes** (`/presenter`) - For presenter only (separate tab)

---

## How It Works

### Main Presentation Page (`/`)

**Features**:
- ✅ Full-screen slides (no scrolling)
- ✅ Clean view for audience
- ✅ Minimal controls
- ✅ Progress bar
- ✅ Keyboard navigation (← →)

**For Screensharing**:
- Perfect for sharing with audience
- No notes visible
- Clean, professional appearance

### Presenter Notes Page (`/presenter`)

**Features**:
- ✅ Separate tab/page (don't share this!)
- ✅ Auto-syncs with main presentation
- ✅ Shows current slide's notes
- ✅ Shows references
- ✅ Shows visual descriptions
- ✅ Updates automatically (every 100ms)

**For Presenter**:
- Open in separate tab
- Keep on your screen (don't share)
- See notes while presenting
- Auto-updates as you navigate

---

## Setup Instructions

### Step 1: Open Main Presentation

1. Navigate to `/` (main page)
2. This is what you'll screenshare

### Step 2: Open Presenter Notes

1. Click the **"📝 Notes"** button (top-right)
2. OR navigate to `/presenter` in a new tab
3. Keep this tab open on your screen
4. **Don't share this tab** - it's for you only

### Step 3: Start Presenting

1. Share your main presentation tab
2. Use arrow keys to navigate
3. Presenter notes page auto-updates
4. See your notes without audience seeing them

---

## Synchronization

**How Sync Works**:
- Main page saves current slide number to `localStorage`
- Presenter page reads from `localStorage` every 100ms
- Both pages stay in sync automatically

**Cross-Tab Sync**:
- Works across browser tabs
- Works across browser windows
- Real-time synchronization

---

## Keyboard Shortcuts

### Main Presentation (`/`)

- `←` / `→` - Navigate slides
- `P` - Toggle presenter mode (show/hide controls)

### Presenter Notes (`/presenter`)

- Auto-updates (no navigation needed)
- Shows notes for current slide

---

## Best Practices

### Before Presentation

1. **Open Main Page** (`/`)
   - This is what you'll share

2. **Open Presenter Notes** (`/presenter`)
   - In separate tab
   - Keep on your screen
   - Don't share this tab

3. **Test Sync**
   - Navigate slides on main page
   - Verify presenter page updates
   - Check notes appear correctly

### During Presentation

1. **Share Main Page**
   - Share the `/` tab
   - Audience sees clean slides

2. **Keep Presenter Page Open**
   - On your screen (not shared)
   - See notes as you present
   - Auto-updates with slides

3. **Navigate**
   - Use arrow keys on main page
   - Presenter page follows automatically

### After Presentation

- Close presenter page if needed
- Main page stays ready for Q&A

---

## UI Elements

### Main Page (`/`)

**Visible**:
- Slide content (full-screen)
- Progress bar (bottom)
- Slide number (bottom, minimal)
- "📝 Notes" button (top-right, small)

**Hidden** (by default):
- Persona selector
- Control buttons
- Notes/references

### Presenter Page (`/presenter`)

**Visible**:
- Current slide number
- Slide title
- Speaker notes (if available)
- References (if available)
- Visual descriptions (if available)
- Sync status indicator

**Layout**:
- Scrollable page (for long notes)
- Dark theme (easy on eyes)
- Color-coded sections
- Clear hierarchy

---

## Technical Details

### Sync Mechanism

**localStorage Key**: `currentSlide`
**Value**: Slide number (1-30)
**Update Frequency**: Every navigation
**Read Frequency**: Every 100ms (presenter page)

### Full-Screen Implementation

**Main Page**:
- `h-screen` - Full viewport height
- `overflow-hidden` - No scrolling
- Slide content fits viewport
- Content scrolls within slide if needed

**Presenter Page**:
- Scrollable page
- Can see all notes
- Auto-updates with current slide

---

## Troubleshooting

**Notes not updating?**
- Check both pages are open
- Refresh presenter page
- Check browser console for errors

**Sync not working?**
- Make sure both pages are in same browser
- Check localStorage is enabled
- Try refreshing both pages

**Full-screen not working?**
- Check browser zoom level
- Try F11 for full-screen mode
- Check browser console for errors

---

## Summary

✅ **Main Page** = Clean slides for audience (screenshare this)
✅ **Presenter Page** = Notes for you (don't share this)
✅ **Auto-Sync** = Both pages stay in sync
✅ **Full-Screen** = No scrolling, professional appearance
✅ **Separate Tab** = Notes visible only to presenter

**Perfect for professional presentations!**

