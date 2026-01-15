# AI Agent Instructions

This file provides instructions for AI coding agents (like GitHub Copilot, Cursor, or custom AI assistants) working on the AI Snake Game Tutorial project.

## Project Overview

**Name**: AI Snake Game Tutorial  
**Type**: Educational repository with working Snake game  
**Language**: JavaScript (ES6+)  
**Testing**: Jest with 90%+ coverage requirement  
**Purpose**: Demonstrate AI Agent Ecosystem patterns

## Architecture

### File Organization

```
src/
├── game.js       - Pure game logic (state management, collision detection)
├── renderer.js   - Canvas rendering (drawing functions)
├── input.js      - Keyboard input handling
└── main.js       - Game loop controller (coordinates all modules)

tests/
├── game.test.js     - 33+ tests for game logic
├── renderer.test.js - Canvas rendering tests
└── input.test.js    - Input handling tests
```

### Key Principles

1. **Separation of Concerns**: Each module has a single responsibility
2. **Pure Functions**: Game logic uses pure functions (no side effects)
3. **Immutable State**: State updates return new objects, never mutate
4. **Testability**: All logic is testable without browser APIs

## Coding Conventions

### JavaScript Style

```javascript
// ✅ DO: Use ES6+ features
const state = { ...oldState, score: newScore };
const direction = DIRECTIONS.UP;

// ❌ DON'T: Use var or mutations
var state = oldState;
state.score = newScore;
```

### State Management

```javascript
// ✅ DO: Immutable updates
function updateScore(state, points) {
  return { ...state, score: state.score + points };
}

// ❌ DON'T: Direct mutations
function updateScore(state, points) {
  state.score += points;
  return state;
}
```

### Function Naming

- **Functions**: camelCase (`updateGame`, `drawSnake`)
- **Constants**: UPPER_SNAKE_CASE (`GRID_SIZE`, `DIRECTIONS`)
- **Classes**: PascalCase (`SnakeGame`)

### Comments

- Document complex algorithms
- Avoid obvious comments
- Use JSDoc for public APIs

```javascript
// ✅ Good: Explains why
// Use BFS to avoid getting trapped
function findSafePath(state) { ... }

// ❌ Bad: States the obvious
// This increments the score
score++;
```

## Testing Requirements

### Coverage Thresholds

- **Minimum**: 90% across all metrics
- **Lines**: 90%+
- **Branches**: 90%+
- **Functions**: 90%+
- **Statements**: 90%+

### Test Structure

```javascript
describe('Feature Name', () => {
  test('should do expected behavior', () => {
    // Arrange
    const input = createTestData();
    
    // Act
    const result = functionUnderTest(input);
    
    // Assert
    expect(result).toEqual(expected);
  });
});
```

### What to Test

1. **Happy paths**: Normal operation
2. **Edge cases**: Boundary conditions
3. **Error cases**: Invalid inputs
4. **State changes**: Before/after comparisons

### Mocking

```javascript
// Mock browser APIs
const ctx = {
  fillRect: jest.fn(),
  beginPath: jest.fn(),
  // ... other Canvas methods
};
```

## Development Workflow

### Making Changes

1. **Write tests first** (TDD approach)
2. **Implement feature** in appropriate module
3. **Run tests**: `npm test`
4. **Check coverage**: `npm test -- --coverage`
5. **Lint code**: `npm run lint`
6. **Fix linting**: `npm run lint:fix`

### Adding New Features

```markdown
1. Determine which module (game.js, renderer.js, input.js, main.js)
2. Write tests in corresponding test file
3. Implement feature
4. Verify tests pass
5. Check coverage remains >90%
6. Update documentation if needed
```

### Fixing Bugs

```markdown
1. Write failing test that reproduces bug
2. Fix the bug
3. Verify test passes
4. Run full test suite
5. Check for regressions
```

## Module-Specific Guidelines

### src/game.js

- **Pure functions only**
- No browser API calls
- No side effects
- All functions return new objects
- Export all testable functions

Example:
```javascript
function updateGame(state) {
  // Pure function - no mutations
  const newHead = calculateNewHead(state);
  return {
    ...state,
    snake: [newHead, ...state.snake.slice(0, -1)]
  };
}
```

### src/renderer.js

- Canvas API only (no game logic)
- Accept context and state as parameters
- Each draw function handles one visual element
- No state mutations

Example:
```javascript
function drawSnake(ctx, snake) {
  snake.forEach(segment => {
    ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  });
}
```

### src/input.js

- Event handling only
- Use callbacks for communication
- Clean up event listeners
- Map keys to directions

Example:
```javascript
function setupInputHandlers(callbacks) {
  const handleKeyPress = (event) => {
    const direction = mapKeyToDirection(event.key);
    if (direction) callbacks.onDirectionChange(direction);
  };
  
  document.addEventListener('keydown', handleKeyPress);
  return () => document.removeEventListener('keydown', handleKeyPress);
}
```

### src/main.js

- Orchestrates all modules
- Manages game loop
- Coordinates state updates
- Handles lifecycle

## Common Patterns

### State Updates

```javascript
// Always create new objects
const newState = {
  ...state,
  snake: [...newSnake],
  score: state.score + 10
};
```

### Collision Detection

```javascript
// Check boundaries first, then self-collision
if (isOutOfBounds(newHead)) {
  return { ...state, gameOver: true };
}
if (checkSelfCollision(newHead, state.snake)) {
  return { ...state, gameOver: true };
}
```

### Food Generation

```javascript
// Ensure food not on snake
let food;
do {
  food = getRandomPosition();
} while (!isPositionValid(food, snake));
```

## AI Agent Ecosystem

### Ruler Rules

This project follows organization-wide rules in `.ruler/AGENTS.md`:
- Code quality standards
- Testing requirements
- Documentation practices

### Available Skills

**game-testing** (`.skills/game-testing/`)
- Automated test execution
- Coverage reporting
- Usage: "Use game-testing skill to run tests"

## Common Tasks

### Increase Game Speed

Edit `src/main.js`:
```javascript
this.fps = 15; // Default is 10
```

### Add New Direction

1. Add to `DIRECTIONS` in `src/game.js`
2. Add key mapping in `src/input.js`
3. Add tests for new direction

### Change Visual Style

Edit `COLORS` in `src/renderer.js`:
```javascript
const COLORS = {
  SNAKE_HEAD: '#YOUR_COLOR',
  // ...
};
```

## Quality Checks

### Before Committing

```bash
# Run all checks
npm test              # All tests pass
npm run lint          # No linting errors
npm test -- --coverage # Coverage >90%
```

### Pre-PR Checklist

- [ ] All tests pass
- [ ] Coverage ≥ 90%
- [ ] No ESLint errors
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] Code follows conventions

## Troubleshooting

### Tests Failing?

1. Check for mutations in game logic
2. Verify mock setup in tests
3. Clear Jest cache: `npm test -- --clearCache`

### Coverage Too Low?

1. Run `npm test -- --coverage --verbose`
2. Identify uncovered lines
3. Add tests for missing cases

### Linting Errors?

1. Auto-fix: `npm run lint:fix`
2. Review remaining errors
3. Fix manually if needed

## Anti-Patterns

### ❌ Don't Do

```javascript
// Don't mutate state
function updateGame(state) {
  state.score += 10; // ❌ Mutation
  return state;
}

// Don't mix concerns
function drawSnake(ctx, snake) {
  snake.push(newSegment); // ❌ Logic in renderer
  ctx.fillRect(...);
}

// Don't skip tests
function newFeature() {
  // TODO: Add tests later ❌
  return result;
}
```

### ✅ Do This

```javascript
// Immutable updates
function updateGame(state) {
  return { ...state, score: state.score + 10 }; // ✅
}

// Separate concerns
function drawSnake(ctx, snake) {
  snake.forEach(segment => ctx.fillRect(...)); // ✅
}

// Test first
test('newFeature should work', () => {
  expect(newFeature()).toEqual(expected); // ✅
});
```

## Documentation

### When to Update

- New features added
- Architecture changes
- API changes
- Breaking changes

### What to Update

- README.md for user-facing changes
- ARCHITECTURE.md for structural changes
- TUTORIAL.md for learning path changes
- This file (AGENTS.md) for development process changes

## Resources

- [Tutorial](docs/TUTORIAL.md) - Step-by-step guide
- [Architecture](docs/ARCHITECTURE.md) - System design
- [AGENTS.md Guide](docs/AGENTS_MD_GUIDE.md) - Understanding this file
- [Ruler Guide](docs/RULER_GUIDE.md) - Centralized rules
- [Skills Guide](docs/SKILLS_GUIDE.md) - Reusable capabilities

## Questions?

When uncertain:
1. Check existing code for patterns
2. Review tests for examples
3. Consult documentation
4. Ask for clarification in PR

## Version

**AGENTS.md Version**: 1.0.0  
**Last Updated**: 2024-01-15

This file evolves with the project. Keep it current!
