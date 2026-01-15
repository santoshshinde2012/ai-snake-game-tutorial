# Project Development Guide

## Overview
A JavaScript game project with testing and linting.

## File Structure
```
project/
├── src/        # Source code
├── tests/      # Test files
└── docs/       # Documentation
```

## Conventions

### Code Style
- Use ES6+ features
- Prefer const over let
- Never use var
- Use meaningful names

### State Management
- Immutable state updates
- Pure functions for logic
- No side effects

### Testing
- TDD approach
- 90%+ coverage
- Jest framework
- Mock browser APIs

## Commands

```bash
npm test              # Run tests
npm run lint          # Check style
npm run lint:fix      # Fix style issues
```

## Making Changes

1. Write tests first
2. Implement feature
3. Run tests
4. Check coverage
5. Fix linting

## Code Examples

### Good Practice
```javascript
function updateScore(state, points) {
  return { ...state, score: state.score + points };
}
```

### Avoid
```javascript
function updateScore(state, points) {
  state.score += points;  // ❌ Mutation
  return state;
}
```

## Quality Requirements

- ✅ All tests pass
- ✅ 90%+ coverage
- ✅ No lint errors
- ✅ Documentation updated
