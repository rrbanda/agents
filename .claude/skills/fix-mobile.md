# Skill: Fix Mobile Responsiveness

## Description
Identify and fix mobile responsiveness issues in components.

## When to Use
- User reports layout issues on mobile
- User asks to make something mobile-friendly
- Reviewing components for mobile compatibility

## Common Issues & Fixes

### 1. Fixed Widths

**Problem**: `w-[400px]` doesn't scale
**Fix**: Use responsive or max-width

```typescript
// Before
className="w-[400px]"

// After
className="w-full max-w-[400px]"
// Or
className="w-full md:w-[400px]"
```

### 2. Fixed Grids

**Problem**: `grid-cols-3` too cramped on mobile
**Fix**: Stack on mobile, grid on desktop

```typescript
// Before
className="grid grid-cols-3 gap-4"

// After
className="grid grid-cols-1 md:grid-cols-3 gap-4"
```

### 3. Text Sizes

**Problem**: Large text overflows on mobile
**Fix**: Responsive text sizes

```typescript
// Before
className="text-5xl"

// After
className="text-3xl md:text-4xl lg:text-5xl"
```

### 4. Padding/Margins

**Problem**: Too much padding on mobile
**Fix**: Smaller padding on mobile

```typescript
// Before
className="p-12"

// After
className="p-4 md:p-8 lg:p-12"
```

### 5. Flex Direction

**Problem**: Horizontal layout too cramped
**Fix**: Stack vertically on mobile

```typescript
// Before
className="flex gap-4"

// After
className="flex flex-col md:flex-row gap-4"
```

### 6. Hidden Elements

**Problem**: Element not needed on mobile
**Fix**: Hide with breakpoints

```typescript
// Hide on mobile, show on desktop
className="hidden md:block"

// Show on mobile, hide on desktop
className="block md:hidden"
```

### 7. Touch Targets

**Problem**: Buttons too small to tap
**Fix**: Minimum 44x44px touch targets

```typescript
// Before
className="p-2"

// After
className="p-3 min-h-[44px] min-w-[44px]"
```

## Audit Process

### 1. Find Fixed Values
```bash
# Search for fixed pixel widths
grep -r "w-\[.*px\]" web-app/components/
grep -r "h-\[.*px\]" web-app/components/
```

### 2. Find Non-Responsive Grids
```bash
# Search for grids without breakpoints
grep -r "grid-cols-[3-9]" web-app/components/ | grep -v "md:" | grep -v "lg:"
```

### 3. Test Viewports

Test at these widths:
- 375px (iPhone SE)
- 390px (iPhone 14)
- 768px (iPad)
- 1024px (iPad Pro)
- 1280px+ (Desktop)

## Breakpoints Reference

| Prefix | Min Width | Typical Device |
|--------|-----------|----------------|
| (none) | 0px | Mobile (default) |
| `sm:` | 640px | Large phones |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large screens |

## Checklist
- [ ] No fixed widths without max-width
- [ ] Grids collapse on mobile
- [ ] Text scales appropriately
- [ ] Touch targets ≥ 44px
- [ ] Tested at 375px viewport
- [ ] Horizontal scroll eliminated

## Example

**User Request**: "The persona examples slide looks broken on my phone"

**Actions**:
1. Find the component: `PersonaExamplesSlide.tsx`
2. Check for fixed grids: `grid-cols-3`
3. Change to: `grid-cols-1 md:grid-cols-3`
4. Test at 375px viewport

