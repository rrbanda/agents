# Screenshare Guide

## Presenter Mode vs Audience Mode

The presentation has two modes optimized for different scenarios:

### 🎤 Presenter Mode (Default: OFF)

**When to Use**: When you're presenting and need to see controls

**Features**:
- ✅ Persona selector visible
- ✅ Notes toggle button visible
- ✅ References toggle button visible
- ✅ Full navigation controls visible
- ✅ Speaker notes can be toggled (hidden from audience)

**How to Enable**: Press `P` key or click the 👤 icon (top-right)

### 👥 Audience Mode (Default: ON)

**When to Use**: When screensharing - clean view for audience

**Features**:
- ✅ No control buttons visible
- ✅ No persona selector visible
- ✅ Minimal navigation (just slide number)
- ✅ Clean, professional appearance
- ✅ Notes and references hidden (even if toggled on)

**Perfect for**: Screensharing, recording, public presentations

---

## Keyboard Shortcuts

**Navigation**:
- `←` or `→` - Previous/Next slide
- `P` - Toggle Presenter Mode

**Presenter Mode Only**:
- `N` - Toggle Speaker Notes
- `R` - Toggle References

---

## Best Practices for Screensharing

### Before Starting

1. **Start in Audience Mode** (default)
   - Controls are hidden
   - Clean view for audience

2. **Enable Presenter Mode** (press `P`)
   - See your notes
   - Access controls
   - Audience still sees clean view

3. **Toggle Notes** (press `N` in presenter mode)
   - Notes appear only for you
   - Audience sees clean slide

### During Presentation

**For Presenter**:
- Use `P` to toggle presenter mode
- Use `N` to show/hide notes
- Use `R` to show/hide references
- Use arrow keys to navigate

**For Audience**:
- Sees clean slides
- No control buttons
- No notes or references
- Just the content

### After Presentation

- Stay in Audience Mode for Q&A
- Or switch to Presenter Mode if needed

---

## UI Elements Visibility

### Audience Mode (Default)
```
┌─────────────────────────┐
│                         │
│                         │
│    Slide Content        │
│    (Clean View)         │
│                         │
│                         │
└─────────────────────────┘
     [Progress Bar]
     [Slide Number]
```

### Presenter Mode
```
┌─────────────────────────┐
│ [👤] [Notes] [Refs]    │
│                         │
│    Slide Content        │
│                         │
│ [Speaker Notes]         │
│ [References]            │
└─────────────────────────┘
[Persona] [Prev] [Next]
```

---

## Technical Details

**Presenter Mode State**:
- Stored in component state
- Persists during session
- Resets on page reload

**Notes/References**:
- Only visible when:
  1. Presenter Mode is ON
  2. Respective toggle is ON
- Hidden from audience view

**Navigation**:
- Always functional (keyboard works)
- Controls visible only in presenter mode
- Progress bar always visible

---

## Tips

1. **Test Before Presenting**
   - Check both modes
   - Verify notes work
   - Test keyboard shortcuts

2. **Use Presenter Mode**
   - See your notes
   - Access controls
   - Audience sees clean view

3. **Keyboard Shortcuts**
   - Faster than clicking
   - Less distracting
   - Professional

4. **Progress Bar**
   - Always visible
   - Shows presentation progress
   - Helps with timing

---

## Troubleshooting

**Notes not showing?**
- Check Presenter Mode is ON (press `P`)
- Check Notes toggle is ON (press `N`)

**Controls visible to audience?**
- Make sure Presenter Mode is OFF
- Press `P` to toggle

**Navigation not working?**
- Check keyboard focus
- Try clicking buttons
- Refresh page if needed

---

## Summary

✅ **Audience Mode** = Clean view for screensharing
✅ **Presenter Mode** = Full controls for presenter
✅ **Notes** = Hidden from audience, visible to presenter
✅ **Navigation** = Always works, controls hidden in audience mode

**Perfect for professional presentations!**

