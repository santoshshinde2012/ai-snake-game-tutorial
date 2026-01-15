# AI Snake Game Tutorial

## Step-by-Step Guide to Building a Snake Game with AI Agent Ecosystem

This comprehensive tutorial will guide you through building a complete Snake game from scratch while learning how to structure projects for AI-assisted development.

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Project Setup](#project-setup)
4. [Core Game Development](#core-game-development)
5. [Testing](#testing)
6. [AI Agent Ecosystem](#ai-agent-ecosystem)
7. [Advanced Topics](#advanced-topics)
8. [Deployment](#deployment)

## Introduction

### What You'll Learn

- Building a complete Snake game with vanilla JavaScript
- Test-Driven Development (TDD) approach
- Setting up an AI Agent Ecosystem
- Using AGENTS.md, Ruler, and Skills
- Achieving 90%+ test coverage
- Best practices for maintainable code

### What You'll Build

A fully functional Snake game with:
- Smooth controls (Arrow keys and WASD)
- Score tracking
- Pause/Resume functionality
- Game over handling
- Beautiful UI with Canvas rendering

## Prerequisites

### Required Knowledge
- JavaScript (ES6+)
- Basic HTML/CSS
- Command line basics
- Git fundamentals

### Required Software
- Node.js 14+ 
- npm or yarn
- Code editor (VS Code recommended)
- Git
- Modern web browser

### Optional (for AI assistance)
- GitHub Copilot
- Cursor AI
- ChatGPT Plus

## Project Setup

### Step 1: Initialize Project

```bash
# Create project directory
mkdir ai-snake-game-tutorial
cd ai-snake-game-tutorial

# Initialize Git
git init

# Initialize npm
npm init -y
```

### Step 2: Install Dependencies

```bash
# Install development dependencies
npm install --save-dev jest eslint jest-canvas-mock jest-environment-jsdom
```

### Step 3: Create Directory Structure

```bash
mkdir -p src tests docs .ruler .skills/game-testing/scripts examples
```

Your structure should look like:
```
ai-snake-game-tutorial/
├── src/
├── tests/
├── docs/
├── .ruler/
├── .skills/
├── examples/
├── package.json
└── README.md
```

## Core Game Development

### Step 1: Game Logic (src/game.js)

Let's start with the core game logic using pure functions:

```javascript
// src/game.js
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

const GRID_SIZE = 20;

function createInitialState() {
  return {
    snake: [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ],
    direction: DIRECTIONS.RIGHT,
    food: { x: 15, y: 15 },
    score: 0,
    gameOver: false,
    paused: false
  };
}
```

**Key Concepts**:
- Pure functions (no side effects)
- Immutable state updates
- Separation of concerns

### Step 2: Renderer (src/renderer.js)

Handle all visual representation:

```javascript
// src/renderer.js
function render(ctx, state) {
  clearCanvas(ctx, width, height);
  drawGrid(ctx, width, height);
  drawSnake(ctx, state.snake);
  drawFood(ctx, state.food);
  drawScore(ctx, state.score);
  
  if (state.gameOver) {
    drawGameOver(ctx, width, height, state.score);
  }
}
```

**Key Concepts**:
- Canvas API
- Separation from game logic
- Reusable drawing functions

### Step 3: Input Handler (src/input.js)

Manage user input:

```javascript
// src/input.js
function setupInputHandlers(callbacks) {
  document.addEventListener('keydown', (event) => {
    const direction = mapKeyToDirection(event.key);
    if (direction && callbacks.onDirectionChange) {
      callbacks.onDirectionChange(direction);
    }
  });
}
```

**Key Concepts**:
- Event-driven architecture
- Callback pattern
- Keyboard mapping

### Step 4: Game Loop (src/main.js)

Tie everything together:

```javascript
// src/main.js
class SnakeGame {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.state = createInitialState();
    this.fps = 10;
  }

  start() {
    this.setupInput();
    this.startGameLoop();
  }

  startGameLoop() {
    this.gameLoop = setInterval(() => {
      this.update();
      this.render();
    }, 1000 / this.fps);
  }
}
```

**Key Concepts**:
- Game loop pattern
- FPS control
- Lifecycle management

## Testing

### Step 1: Set Up Jest

Create `jest.config.js`:

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};
```

### Step 2: Write Unit Tests

```javascript
// tests/game.test.js
describe('createInitialState', () => {
  test('should initialize with 3 snake segments', () => {
    const state = createInitialState();
    expect(state.snake).toHaveLength(3);
  });

  test('should start with score 0', () => {
    const state = createInitialState();
    expect(state.score).toBe(0);
  });
});
```

**Testing Strategy**:
1. Write tests first (TDD)
2. Test pure functions
3. Mock browser APIs
4. Achieve high coverage

### Step 3: Run Tests

```bash
npm test -- --coverage
```

Expected output:
```
PASS  tests/game.test.js
✓ should initialize with 3 snake segments
✓ should start with score 0

Coverage: 95%
```

## AI Agent Ecosystem

### Step 1: Create AGENTS.md

```markdown
# AI Snake Game Development Guide

## Architecture
- src/game.js - Pure game logic
- src/renderer.js - Canvas rendering
- src/input.js - Input handling
- src/main.js - Game loop

## Conventions
- Use pure functions for game logic
- Immutable state updates
- 90%+ test coverage required
- ESLint for code quality

## Testing
Run tests: `npm test`
All changes require corresponding tests.
```

**Purpose**: Guides AI agents on how to work with your code.

### Step 2: Set Up Ruler

Create `.ruler/AGENTS.md`:

```markdown
# Organization-Wide Rules

## Code Quality
- All code must have tests
- Minimum 80% coverage
- No linter warnings

## Documentation
- README required
- API docs for public functions
```

Create `.ruler/ruler.toml`:

```toml
[ruler]
version = "1.0.0"
enabled = true

[rules]
apply_to = ["javascript"]

[inheritance]
priority = "local"
```

**Purpose**: Centralized rules across multiple projects.

### Step 3: Create Skills

Create `.skills/game-testing/SKILL.md`:

```markdown
# Game Testing Skill

## Description
Automated testing with coverage reporting.

## Usage
\```
Use game-testing skill to run tests
\```

## Requirements
- Node.js 14+
- Jest installed
```

Create `.skills/game-testing/scripts/run_tests.py`:

```python
#!/usr/bin/env python3
import subprocess
import sys

def run_tests():
    result = subprocess.run(['npm', 'test'], capture_output=True)
    return result.returncode

if __name__ == "__main__":
    sys.exit(run_tests())
```

**Purpose**: Reusable automated testing capability.

## Advanced Topics

### State Management

The game uses an immutable state pattern:

```javascript
// ❌ Bad: Mutation
function updateScore(state) {
  state.score += 10;  // Mutates state
  return state;
}

// ✅ Good: Immutability
function updateScore(state) {
  return { ...state, score: state.score + 10 };
}
```

### Collision Detection

```javascript
function checkSelfCollision(head, body) {
  return body.some(segment => 
    segment.x === head.x && segment.y === head.y
  );
}
```

### Food Generation

```javascript
function generateFood(snake) {
  let food;
  do {
    food = getRandomPosition();
  } while (!isPositionValid(food, snake));
  return food;
}
```

## Deployment

### GitHub Pages

1. Create `gh-pages` branch
2. Push `index.html` and assets
3. Enable GitHub Pages in settings

### Netlify

```bash
# Build command: (none needed)
# Publish directory: .
```

### Vercel

```bash
vercel --prod
```

## Troubleshooting

### Tests Failing?

```bash
# Clear Jest cache
npm test -- --clearCache

# Run tests in watch mode
npm test -- --watch
```

### Canvas Not Rendering?

Check that:
1. Canvas element has ID: `<canvas id="gameCanvas"></canvas>`
2. Scripts loaded in correct order
3. Browser supports Canvas API

### Coverage Too Low?

```bash
# See uncovered lines
npm test -- --coverage --verbose
```

## Best Practices

### 1. Code Organization
- Keep functions small and focused
- One responsibility per function
- Clear naming conventions

### 2. Testing
- Write tests first (TDD)
- Test edge cases
- Mock external dependencies

### 3. Documentation
- Comment complex logic
- Keep README current
- Document API changes

### 4. Version Control
- Commit often
- Write meaningful commit messages
- Use feature branches

## Next Steps

### Enhancements

1. **AI Player**: Implement pathfinding algorithm
2. **Multiplayer**: Add network play
3. **Power-ups**: Special food items
4. **Levels**: Increasing difficulty
5. **Leaderboard**: High score tracking

### Learning Resources

- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Jest Documentation](https://jestjs.io/)
- [JavaScript Game Development](https://developer.mozilla.org/en-US/docs/Games)

## Exercises

### Exercise 1: Add Speed Control
Add buttons to increase/decrease snake speed.

### Exercise 2: Different Modes
Implement "easy" mode with obstacles.

### Exercise 3: Touch Controls
Add mobile touch controls.

### Exercise 4: Sound Effects
Add sound for eating food and game over.

## Conclusion

You've learned:
- ✅ Building a complete game
- ✅ Test-Driven Development
- ✅ AI Agent Ecosystem setup
- ✅ Code organization best practices
- ✅ Achieving high test coverage

Continue experimenting and building on this foundation!

## Support

- [GitHub Issues](https://github.com/santoshshinde2012/ai-snake-game-tutorial/issues)
- [Discussions](https://github.com/santoshshinde2012/ai-snake-game-tutorial/discussions)
- [Contributing Guide](../CONTRIBUTING.md)

## License

MIT License - See [LICENSE](../LICENSE) for details.
