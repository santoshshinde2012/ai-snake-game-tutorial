# AGENTS.md Guide

## What is AGENTS.md?

`AGENTS.md` is a special file that provides instructions to AI coding agents (like GitHub Copilot, Cursor, or custom AI assistants) on how to work with your codebase effectively.

## Purpose

The AGENTS.md file serves as:
1. **Project Context** - Explains what the project does
2. **Coding Standards** - Defines conventions and best practices
3. **Architecture Guide** - Describes system structure
4. **Testing Requirements** - Specifies test expectations
5. **Development Workflow** - Outlines how to make changes

## Structure

A well-structured AGENTS.md includes:

### 1. Project Overview
```markdown
# Project: AI Snake Game Tutorial

A JavaScript Snake game demonstrating AI agent ecosystem patterns.
```

### 2. Key Conventions
```markdown
## Conventions

- Use pure functions for game logic
- Immutable state updates
- 90%+ test coverage required
- ESLint for code quality
```

### 3. Architecture
```markdown
## Architecture

- src/game.js - Pure game logic
- src/renderer.js - Canvas rendering
- src/input.js - Keyboard handling
- src/main.js - Game loop controller
```

### 4. Testing
```markdown
## Testing

Run tests: `npm test`
All changes require corresponding tests.
```

### 5. Common Tasks
```markdown
## Common Tasks

### Adding a Feature
1. Write tests first (TDD)
2. Implement in appropriate module
3. Update documentation
4. Run full test suite
```

## Benefits

### For AI Agents
- Understand project quickly
- Make consistent changes
- Follow established patterns
- Avoid common mistakes

### For Developers
- Onboard new team members faster
- Maintain consistency across changes
- Document tribal knowledge
- Reduce review iterations

## Best Practices

### 1. Keep It Current
Update AGENTS.md when:
- Architecture changes
- New conventions are established
- Testing requirements evolve
- Dependencies are updated

### 2. Be Specific
❌ Bad: "Write good tests"
✅ Good: "Every function in src/ requires unit tests with 90%+ coverage"

### 3. Include Examples
```markdown
## Code Style

Prefer:
```javascript
function updateGame(state) {
  return { ...state, score: state.score + 10 };
}
```

Avoid:
```javascript
function updateGame(state) {
  state.score += 10;
  return state;
}
```
\```
```

### 4. Link to Resources
```markdown
See [ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed system design.
```

## Example AGENTS.md

```markdown
# Snake Game Development Guide

## Overview
A modular Snake game with 90%+ test coverage.

## File Structure
- `src/game.js` - Game logic (pure functions)
- `src/renderer.js` - Canvas rendering
- `src/input.js` - Input handling
- `src/main.js` - Game loop

## Conventions

### Code Style
- Use ES6+ features
- Pure functions for game logic
- Immutable state updates
- Destructuring for object access

### Testing
- TDD approach required
- Jest for all tests
- 90%+ code coverage
- Mock browser APIs

### Documentation
- JSDoc for public functions
- Update README for user-facing changes
- Keep ARCHITECTURE.md current

## Making Changes

### Bug Fix
1. Write failing test
2. Fix the bug
3. Verify test passes
4. Run full suite

### New Feature
1. Update tests first
2. Implement feature
3. Update documentation
4. Check coverage

## Commands
- `npm test` - Run tests
- `npm run lint` - Check code style
- `npm run lint:fix` - Auto-fix issues
```

## AGENTS.md vs Documentation

| AGENTS.md | Traditional Docs |
|-----------|------------------|
| For AI agents | For humans |
| Concise & actionable | Comprehensive |
| Implementation-focused | Conceptual |
| Updated frequently | Updated periodically |

## Integration with Ruler

AGENTS.md can reference Ruler for shared rules:

```markdown
## Rules

This project follows centralized rules from `.ruler/AGENTS.md`.

Project-specific rules:
- Game logic must be pure functions
- All state updates must be immutable
```

## Common Patterns

### Pattern 1: Technology Stack
```markdown
## Technology Stack
- Runtime: Vanilla JavaScript (ES6+)
- Testing: Jest 29.x
- Linting: ESLint 8.x
- No build tools required
```

### Pattern 2: Quality Gates
```markdown
## Quality Gates
- ✅ All tests pass
- ✅ 90%+ code coverage
- ✅ No ESLint errors
- ✅ Documentation updated
```

### Pattern 3: Don't Do This
```markdown
## Anti-Patterns

❌ Don't mutate state directly
❌ Don't skip tests
❌ Don't use var (use const/let)
❌ Don't ignore ESLint warnings
```

## Versioning

Consider versioning your AGENTS.md:

```markdown
# AGENTS.md v1.2.0

Last updated: 2024-01-15

## Changelog
- v1.2.0: Added test coverage requirements
- v1.1.0: Added code style guidelines
- v1.0.0: Initial version
```

## Multi-Language Projects

For projects with multiple languages:

```markdown
## Language-Specific Rules

### JavaScript
- Use ES6+ syntax
- Pure functions preferred

### Python
- Follow PEP 8
- Type hints required

### Tests
- Jest for JavaScript
- pytest for Python
```

## Troubleshooting

### Agent Ignoring Rules?
- Make AGENTS.md more explicit
- Add concrete examples
- Check file location (root directory)

### Conflicting Guidelines?
- Prioritize project-specific over general
- Document exceptions clearly
- Use Ruler for organization-wide rules

## Tools & Integration

### GitHub Copilot
Place AGENTS.md in root for best results.

### Cursor
Automatically detects and uses AGENTS.md.

### Custom Agents
Parse AGENTS.md in agent initialization.

## Measuring Effectiveness

Track these metrics:
1. Code review iterations (should decrease)
2. Consistency of AI-generated code
3. Time to onboard new developers
4. Test coverage trends

## Advanced: Dynamic Rules

```markdown
## Context-Aware Rules

When working in `src/game.js`:
- Focus on pure functions
- No browser APIs allowed

When working in `src/renderer.js`:
- Canvas API required
- Visual consistency important
```

## Resources

- [Example Projects with AGENTS.md](../examples/)
- [Ruler Documentation](RULER_GUIDE.md)
- [Skills Documentation](SKILLS_GUIDE.md)

## Summary

AGENTS.md is your codebase's instruction manual for AI agents. Keep it:
- ✅ Current
- ✅ Specific
- ✅ Actionable
- ✅ Example-rich
- ✅ Concise

A good AGENTS.md transforms AI from a code generator into a productive team member that understands your project.
