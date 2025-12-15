# ADR 0006: Persona-Based Content Customization

**Status**: Accepted
**Date**: 2024 (Implemented)
**Decision Makers**: Project Team

## Context

AI Hub targets multiple technical personas:
- **Sysadmin**: System administration, infrastructure management
- **DevOps**: CI/CD, automation, deployment
- **Developer**: Application development, coding
- **Platform Engineer**: Platform building, tooling
- **All**: General content for all roles

Different examples resonate with different personas. For instance:
- Sysadmin: "Check disk space on all servers"
- DevOps: "Deploy app to staging environment"
- Developer: "Generate unit tests for this function"

### Problem
How do we tailor content to different personas without duplicating slides?

### Options Considered

1. **Separate Slide Decks Per Persona**
   - Pros: Fully customized experience
   - Cons: 5x maintenance burden, content drift

2. **Conditional Rendering in Markdown**
   - Pros: Single source of truth
   - Cons: Markdown doesn't support conditionals

3. **Dynamic Content Substitution**
   - Pros: One slide, multiple examples
   - Cons: Complex parsing, hard to maintain

4. **Persona Prop + Component Logic**
   - Pass persona as prop, components choose examples
   - Pros: Explicit, type-safe, flexible
   - Cons: Logic in components, not persisted

5. **URL-Based Persona Selection**
   - `/presentation?persona=devops`
   - Pros: Shareable, bookmarkable
   - Cons: More complex routing

## Decision

Use **Persona Prop with Component Logic** for targeted slides.

### Implementation

**Type Definition** (`lib/types.ts`):
```typescript
export type Persona = 'sysadmin' | 'devops' | 'developer' | 'platform' | 'all';
```

**Persona Selector** (`components/ui/PersonaSelector.tsx`):
```tsx
export default function PersonaSelector({
  persona,
  onChange
}: PersonaSelectorProps) {
  const personas: Persona[] = ['all', 'sysadmin', 'devops', 'developer', 'platform'];

  return (
    <div className="fixed top-4 right-4 z-50">
      <select
        value={persona}
        onChange={(e) => onChange(e.target.value as Persona)}
        className="..."
      >
        {personas.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
    </div>
  );
}
```

**Persona-Aware Slide** (`AgentLoopSlide.tsx`):
```tsx
interface AgentLoopSlideProps {
  persona?: Persona;
}

export default function AgentLoopSlide({ persona = 'all' }: AgentLoopSlideProps) {
  const examples = {
    sysadmin: {
      gather: "Read server logs, check disk usage",
      action: "Free up space, restart services",
      verify: "Confirm services running, disk below 80%"
    },
    devops: {
      gather: "Read deployment config, check CI status",
      action: "Trigger deployment pipeline",
      verify: "Verify app running, health checks pass"
    },
    developer: {
      gather: "Read codebase, understand requirements",
      action: "Write code, run tests",
      verify: "All tests pass, code reviewed"
    },
    platform: {
      gather: "Analyze platform metrics, user feedback",
      action: "Build new platform feature",
      verify: "Feature deployed, usage metrics positive"
    },
    all: {
      gather: "Context gathering...",
      action: "Take action...",
      verify: "Verify outcome..."
    }
  };

  const example = examples[persona];

  return (
    <div>
      <AgentLoop persona={persona} example={example} />
    </div>
  );
}
```

**State Management** (presentation page):
```tsx
const [persona, setPersona] = useState<Persona>('all');

<PersonaSelector persona={persona} onChange={setPersona} />
<Slide slide={currentSlide} persona={persona} />
```

### Scope
Persona system used in **4 slides**:
- Slide 12: Agent Loop (different examples per persona)
- Slide 18: Real-world scenarios
- Slide 24: Persona-specific use cases
- Slide 30: Career path suggestions

Most slides show same content regardless of persona.

## Consequences

### Positive
- ✅ Targeted, relevant examples for each role
- ✅ Single slide source (no duplication)
- ✅ Type-safe persona handling
- ✅ Easy to add new personas
- ✅ Flexible component-level logic
- ✅ Simple implementation (just a prop)

### Negative
- ❌ Persona state not persisted (lost on page reload)
- ❌ Not bookmarkable or shareable
- ❌ Logic scattered across components
- ❌ Cannot pre-filter content for a persona
- ❌ Limited to specific slides (not system-wide)

### Current Limitations
- **No URL persistence**: `/presentation?persona=devops` not implemented
- **No localStorage**: Preference not saved
- **No deep analytics**: Cannot track persona engagement
- **Component-specific**: Each slide implements own logic

## Future Enhancements

### High Priority
1. **URL Parameter Support**:
   ```tsx
   const searchParams = useSearchParams();
   const urlPersona = searchParams.get('persona') as Persona | null;
   const [persona, setPersona] = useState<Persona>(urlPersona || 'all');
   ```

2. **localStorage Persistence**:
   ```tsx
   useEffect(() => {
     localStorage.setItem('ai-hub-persona', persona);
   }, [persona]);
   ```

### Medium Priority
3. **Persona Landing Pages**:
   - `/presentation/devops` → Auto-selects DevOps persona
   - `/presentation/sysadmin` → Auto-selects Sysadmin

4. **Persona Analytics**:
   - Track which personas view which slides
   - Optimize content based on persona engagement

### Low Priority
5. **Persona-Specific Slide Filtering**:
   - Show/hide slides based on persona
   - "Skip slide if not relevant to persona"

6. **Multi-Persona Selection**:
   - Allow "DevOps + Developer" persona
   - Show examples for multiple roles

## Related Decisions
- ADR 0003: Component-Based Slides (enables persona prop pattern)

## References
- Persona-based UX: https://www.nngroup.com/articles/persona/
- React state management: https://react.dev/learn/managing-state
