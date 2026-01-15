# AI Snake Game Tutorial - Agent Guidelines

## Project Overview

### Purpose
This is a **tutorial project** designed to teach the AI Agent Ecosystem (AGENTS.md, Ruler, Agent Skills) through building a classic Snake game. The focus is on:
- Understanding how to write effective AGENTS.md files
- Learning pure functional programming patterns
- Building testable, maintainable code
- Working with Canvas API for game graphics

### Tech Stack
- **Language:** Vanilla JavaScript (ES6+)
- **Graphics:** Canvas API
- **Testing:** Jest
- **Build:** None (pure static HTML/JS)

### Why This Stack?
- **Vanilla JS:** No framework overhead; focus on core JavaScript concepts and functional programming
- **Canvas API:** Direct pixel manipulation for smooth 60 FPS rendering; perfect for game graphics
- **Jest:** Industry-standard testing framework with excellent assertion library and coverage tools
- **No Build Step:** Simplicity for learning; just open `index.html` in a browser

---

## Architecture Decisions

### 1. Game Loop Architecture

The game uses a **fixed timestep with variable rendering** pattern:

```
┌─────────────────────────────────────┐
│  requestAnimationFrame (60 FPS)     │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Accumulate Delta Time      │   │
│  └─────────────────────────────┘   │
│              │                      │
│              ▼                      │
│  ┌─────────────────────────────┐   │
│  │  Update State (10 FPS)      │   │
│  │  - Move snake               │   │
│  │  - Check collisions         │   │
│  │  - Update score             │   │
│  └─────────────────────────────┘   │
│              │                      │
│              ▼                      │
│  ┌─────────────────────────────┐   │
│  │  Render Frame (60 FPS)      │   │
│  │  - Clear canvas             │   │
│  │  - Draw grid                │   │
│  │  - Draw snake               │   │
│  │  - Draw food                │   │
│  └─────────────────────────────┘   │
│              │                      │
│              ▼                      │
│  ┌─────────────────────────────┐   │
│  │  Loop Continuously          │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Key Constants:**
- `INITIAL_SPEED = 10` (game updates per second)
- Rendering at 60 FPS for smooth visuals
- Update interval: `1000 / INITIAL_SPEED = 100ms`

### 2. State Management

**Immutable State Pattern:**
- Single state object contains entire game state
- Pure functions transform state → new state
- No side effects in game logic
- Predictable, testable transformations

**State Structure:**
```javascript
const gameState = {
  snake: [
    { x: 10, y: 10 },  // Head
    { x: 9, y: 10 },   // Body segment
    { x: 8, y: 10 }    // Tail
  ],
  direction: 'RIGHT',  // 'UP', 'DOWN', 'LEFT', 'RIGHT'
  food: { x: 15, y: 15 },
  score: 0,
  gameOver: false
};
```

**State Transformation Example:**
```javascript
// ✅ GOOD: Pure function, returns new state
const moveSnake = (state) => {
  const newHead = calculateNewHead(state.snake[0], state.direction);
  const newSnake = [newHead, ...state.snake.slice(0, -1)];
  
  return {
    ...state,
    snake: newSnake
  };
};

// ❌ BAD: Mutates original state
const moveSnake = (state) => {
  state.snake.push(newHead);  // NEVER DO THIS
  state.snake.shift();
  return state;
};
```

### 3. Coordinate System

**Grid Configuration:**
- **Grid:** 20 × 20 cells
- **Cell Size:** 20px × 20px
- **Canvas Size:** 400px × 400px (20 cells × 20px)
- **Origin:** Top-left corner (0, 0)

```
(0,0) ────────────────────► X (19,0)
  │
  │    Grid: 20x20
  │    Each cell: 20px × 20px
  │    Total: 400px × 400px
  │
  ▼
  Y
(0,19)                    (19,19)
```

**Coordinate Validation:**
```javascript
const GRID_SIZE = 20;

// Valid coordinates: 0 <= x < 20, 0 <= y < 20
const isValidPosition = (x, y) => {
  return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE;
};
```

### 4. Collision Detection

**Three Types of Collisions:**

**A. Wall Collision:**
```javascript
const isWallCollision = (head) => {
  return head.x < 0 || 
         head.x >= GRID_SIZE || 
         head.y < 0 || 
         head.y >= GRID_SIZE;
};
```

**B. Self Collision:**
```javascript
const isSelfCollision = (head, body) => {
  // body is snake.slice(1) - everything except head
  return body.some(segment => 
    segment.x === head.x && segment.y === head.y
  );
};
```

**C. Food Collision:**
```javascript
const isFoodCollision = (head, food) => {
  return head.x === food.x && head.y === food.y;
};
```

---

## Coding Standards

### 1. Language Features

**ES6+ Syntax Only:**

```javascript
// ✅ GOOD: ES6+ features
const GRID_SIZE = 20;
let gameState = createInitialState();

const moveSnake = (state) => {
  const { snake, direction } = state;
  const [head, ...body] = snake;
  
  return {
    ...state,
    snake: [...newSnake]
  };
};

// Arrow functions
const add = (a, b) => a + b;

// Template literals
const message = `Score: ${state.score}`;

// Destructuring
const { x, y } = position;

// Spread operator
const newArray = [...oldArray, newItem];
```

```javascript
// ❌ BAD: Never use var
var score = 0;  // NEVER DO THIS

// ❌ BAD: Old function syntax for simple functions
function add(a, b) {  // Use arrow functions
  return a + b;
}

// ❌ BAD: String concatenation
var message = 'Score: ' + score;  // Use template literals
```

### 2. Function Design Principles

**A. Pure Functions:**
```javascript
// ✅ GOOD: Pure function
const calculateNewHead = (head, direction) => {
  const moves = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
  };
  
  const move = moves[direction];
  return {
    x: head.x + move.x,
    y: head.y + move.y
  };
};

// ❌ BAD: Side effects
let globalDirection = 'RIGHT';
const calculateNewHead = (head) => {
  // Reading global state = side effect
  if (globalDirection === 'UP') {
    return { x: head.x, y: head.y - 1 };
  }
  // ...
};
```

**B. Single Responsibility:**
```javascript
// ✅ GOOD: One function, one job
const isWallCollision = (head) => {
  return head.x < 0 || head.x >= GRID_SIZE || 
         head.y < 0 || head.y >= GRID_SIZE;
};

const isSelfCollision = (head, body) => {
  return body.some(segment => 
    segment.x === head.x && segment.y === head.y
  );
};

const checkGameOver = (state) => {
  const head = state.snake[0];
  const body = state.snake.slice(1);
  
  return isWallCollision(head) || isSelfCollision(head, body);
};

// ❌ BAD: Doing too much in one function
const checkGameOver = (state) => {
  // Wall collision check
  if (state.snake[0].x < 0 || state.snake[0].x >= 20) return true;
  if (state.snake[0].y < 0 || state.snake[0].y >= 20) return true;
  
  // Self collision check
  for (let i = 1; i < state.snake.length; i++) {
    if (state.snake[0].x === state.snake[i].x && 
        state.snake[0].y === state.snake[i].y) {
      return true;
    }
  }
  
  // Food collision check (wrong place!)
  if (state.snake[0].x === state.food.x) {
    // ...
  }
  
  return false;
};
```

**C. Max 50 Lines Per Function:**
- If function exceeds 50 lines, extract helper functions
- Improves readability and testability
- Makes code easier to understand and maintain

**D. Early Returns:**
```javascript
// ✅ GOOD: Early returns for clarity
const updateGameState = (state) => {
  if (state.gameOver) {
    return state;  // Early return
  }
  
  const newHead = calculateNewHead(state.snake[0], state.direction);
  
  if (isWallCollision(newHead)) {
    return { ...state, gameOver: true };  // Early return
  }
  
  if (isSelfCollision(newHead, state.snake.slice(1))) {
    return { ...state, gameOver: true };  // Early return
  }
  
  // Main logic continues...
  return processMovement(state, newHead);
};

// ❌ BAD: Nested conditionals
const updateGameState = (state) => {
  if (!state.gameOver) {
    const newHead = calculateNewHead(state.snake[0], state.direction);
    
    if (!isWallCollision(newHead)) {
      if (!isSelfCollision(newHead, state.snake.slice(1))) {
        // Main logic nested 3 levels deep
        return processMovement(state, newHead);
      } else {
        return { ...state, gameOver: true };
      }
    } else {
      return { ...state, gameOver: true };
    }
  } else {
    return state;
  }
};
```

**E. No Nested Ternaries:**
```javascript
// ✅ GOOD: Clear if-else or switch
const getDirectionMove = (direction) => {
  switch (direction) {
    case 'UP':
      return { x: 0, y: -1 };
    case 'DOWN':
      return { x: 0, y: 1 };
    case 'LEFT':
      return { x: -1, y: 0 };
    case 'RIGHT':
      return { x: 1, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

// ❌ BAD: Nested ternary (hard to read)
const getDirectionMove = (direction) => {
  return direction === 'UP' ? { x: 0, y: -1 } :
         direction === 'DOWN' ? { x: 0, y: 1 } :
         direction === 'LEFT' ? { x: -1, y: 0 } :
         direction === 'RIGHT' ? { x: 1, y: 0 } :
         { x: 0, y: 0 };
};
```

### 3. Naming Conventions

**Functions - camelCase:**
```javascript
const moveSnake = (state) => { /* ... */ };
const checkCollision = (head, body) => { /* ... */ };
const generateFood = (snake) => { /* ... */ };
const updateGameState = (state) => { /* ... */ };
const renderSnake = (ctx, snake) => { /* ... */ };
```

**Constants - UPPER_SNAKE_CASE:**
```javascript
const GRID_SIZE = 20;
const CELL_SIZE = 20;
const CANVAS_SIZE = 400;
const INITIAL_SPEED = 10;
const POINTS_PER_FOOD = 10;
const INITIAL_SNAKE_LENGTH = 3;
```

**Variables - camelCase:**
```javascript
const gameState = createInitialState();
const currentDirection = 'RIGHT';
const newHead = calculateNewHead(head, direction);
const isColliding = checkCollision(head, body);
```

**Files - kebab-case:**
```
src/
  game-logic.js      # Pure game logic
  renderer.js        # Canvas rendering
  input-handler.js   # Event handling
  main.js            # Initialization & game loop
  constants.js       # Shared constants
```

### 4. File Organization

**Separation of Concerns:**

**src/game-logic.js** - Pure game logic only:
```javascript
// Only pure functions, no side effects
export const createInitialState = () => { /* ... */ };
export const moveSnake = (state) => { /* ... */ };
export const checkCollision = (head, body) => { /* ... */ };
export const updateGameState = (state) => { /* ... */ };
```

**src/renderer.js** - Canvas rendering only:
```javascript
// Only drawing functions, no game logic
export const clearCanvas = (ctx) => { /* ... */ };
export const drawGrid = (ctx) => { /* ... */ };
export const drawSnake = (ctx, snake) => { /* ... */ };
export const drawFood = (ctx, food) => { /* ... */ };
export const drawScore = (ctx, score) => { /* ... */ };
```

**src/input-handler.js** - Event handling only:
```javascript
// Only input/event listeners, no game logic
export const setupKeyboardControls = (callback) => { /* ... */ };
export const isOppositeDirection = (current, next) => { /* ... */ };
```

**src/main.js** - Initialization & game loop:
```javascript
// Orchestrates everything, contains game loop
import { createInitialState, updateGameState } from './game-logic.js';
import { clearCanvas, drawSnake, drawFood } from './renderer.js';
import { setupKeyboardControls } from './input-handler.js';

// Game loop implementation here
```

---

## Testing Requirements

### 1. Coverage Targets

**Overall Coverage: 90%+ Required**

```bash
npm run test:coverage

# Expected output:
# ----------------------|---------|----------|---------|---------|
# File                  | % Stmts | % Branch | % Funcs | % Lines |
# ----------------------|---------|----------|---------|---------|
# All files             |   92.5  |   90.2   |   95.0  |   93.1  |
#  game-logic.js        |   95.0  |   92.0   |  100.0  |   96.0  | ✅
#  renderer.js          |   80.0  |   75.0   |   85.0  |   82.0  | (mocked)
#  input-handler.js     |   90.0  |   88.0   |   90.0  |   91.0  |
# ----------------------|---------|----------|---------|---------|
```

**Critical Path Coverage: 100%**
- `moveSnake()` - Must be 100%
- `checkCollision()` - Must be 100%
- `updateGameState()` - Must be 100%
- `generateFood()` - Must be 100%

**Rendering: Can Be Mocked**
- Canvas drawing functions can have lower coverage
- Use Jest mocks for Canvas API
- Integration tests verify visual output

**Main Game Loop: Integration Tested**
- Test loop initialization
- Test state updates over multiple frames
- Mock `requestAnimationFrame`

### 2. Test Structure

**Use describe/it Blocks:**
```javascript
describe('moveSnake', () => {
  it('should move snake right by one cell', () => {
    // Arrange
    const state = {
      snake: [{ x: 5, y: 5 }, { x: 4, y: 5 }],
      direction: 'RIGHT'
    };
    
    // Act
    const newState = moveSnake(state);
    
    // Assert
    expect(newState.snake[0]).toEqual({ x: 6, y: 5 });
  });
  
  it('should move snake up by one cell', () => {
    // ...
  });
  
  it('should remove tail segment when moving', () => {
    // ...
  });
});
```

**Arrange/Act/Assert Pattern:**
```javascript
it('should detect wall collision at top edge', () => {
  // Arrange - Set up test data
  const head = { x: 5, y: 0 };
  const direction = 'UP';
  const newHead = { x: 5, y: -1 };
  
  // Act - Execute the function
  const result = isWallCollision(newHead);
  
  // Assert - Verify the result
  expect(result).toBe(true);
});
```

### 3. What to Test

**✅ DO TEST:**

**All Pure Functions:**
```javascript
describe('calculateNewHead', () => {
  it('should calculate head position for RIGHT direction', () => {
    const head = { x: 5, y: 5 };
    const result = calculateNewHead(head, 'RIGHT');
    expect(result).toEqual({ x: 6, y: 5 });
  });
  
  it('should calculate head position for UP direction', () => {
    const head = { x: 5, y: 5 };
    const result = calculateNewHead(head, 'UP');
    expect(result).toEqual({ x: 5, y: 4 });
  });
  
  // Test all 4 directions
});
```

**State Transformations:**
```javascript
describe('growSnake', () => {
  it('should add new head without removing tail', () => {
    const state = {
      snake: [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }],
      direction: 'RIGHT'
    };
    
    const newState = growSnake(state);
    
    expect(newState.snake.length).toBe(4);
    expect(newState.snake[0]).toEqual({ x: 6, y: 5 });
    expect(newState.snake[3]).toEqual({ x: 3, y: 5 });
  });
  
  it('should not mutate original state', () => {
    const state = { snake: [{ x: 5, y: 5 }] };
    const originalLength = state.snake.length;
    
    growSnake(state);
    
    expect(state.snake.length).toBe(originalLength);
  });
});
```

**Collision Detection Logic:**
```javascript
describe('Collision Detection', () => {
  describe('isWallCollision', () => {
    it('should detect collision at left wall', () => {
      expect(isWallCollision({ x: -1, y: 5 })).toBe(true);
    });
    
    it('should detect collision at right wall', () => {
      expect(isWallCollision({ x: 20, y: 5 })).toBe(true);
    });
    
    it('should detect collision at top wall', () => {
      expect(isWallCollision({ x: 5, y: -1 })).toBe(true);
    });
    
    it('should detect collision at bottom wall', () => {
      expect(isWallCollision({ x: 5, y: 20 })).toBe(true);
    });
    
    it('should not detect collision for valid position', () => {
      expect(isWallCollision({ x: 10, y: 10 })).toBe(false);
    });
  });
  
  describe('isSelfCollision', () => {
    it('should detect head colliding with body', () => {
      const head = { x: 5, y: 5 };
      const body = [{ x: 6, y: 5 }, { x: 5, y: 5 }];
      expect(isSelfCollision(head, body)).toBe(true);
    });
    
    it('should not detect collision when head is clear', () => {
      const head = { x: 5, y: 5 };
      const body = [{ x: 6, y: 5 }, { x: 7, y: 5 }];
      expect(isSelfCollision(head, body)).toBe(false);
    });
  });
});
```

**Edge Cases:**
```javascript
describe('Edge Cases', () => {
  it('should handle snake of length 1', () => {
    const state = {
      snake: [{ x: 10, y: 10 }],
      direction: 'RIGHT'
    };
    
    const newState = moveSnake(state);
    expect(newState.snake.length).toBe(1);
    expect(newState.snake[0]).toEqual({ x: 11, y: 10 });
  });
  
  it('should handle food at corner position', () => {
    const snake = [{ x: 10, y: 10 }];
    const food = generateFood(snake);
    
    expect(food.x).toBeGreaterThanOrEqual(0);
    expect(food.x).toBeLessThan(20);
    expect(food.y).toBeGreaterThanOrEqual(0);
    expect(food.y).toBeLessThan(20);
  });
  
  it('should prevent 180-degree turn', () => {
    const current = 'RIGHT';
    const requested = 'LEFT';
    
    expect(isOppositeDirection(current, requested)).toBe(true);
  });
});
```

**❌ DON'T TEST:**

**Canvas Drawing (Mock Instead):**
```javascript
// ❌ BAD: Testing actual canvas drawing
it('should draw snake on canvas', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  drawSnake(ctx, snake);
  // How do you verify pixels? Don't do this.
});

// ✅ GOOD: Mock canvas and verify calls
it('should call fillRect for each snake segment', () => {
  const ctx = {
    fillRect: jest.fn(),
    fillStyle: ''
  };
  const snake = [{ x: 5, y: 5 }, { x: 4, y: 5 }];
  
  drawSnake(ctx, snake);
  
  expect(ctx.fillRect).toHaveBeenCalledTimes(2);
  expect(ctx.fillRect).toHaveBeenCalledWith(100, 100, 20, 20);
});
```

**Browser APIs (Integration Test Instead):**
```javascript
// Test logic separately from browser APIs
// Mock requestAnimationFrame, setTimeout, etc.
```

---

## Common Commands

```bash
# Testing
npm test                    # Run all tests once
npm run test:watch          # Run tests in watch mode (auto-rerun on changes)
npm run test:coverage       # Generate coverage report in coverage/

# Development
open index.html             # macOS: Open game in default browser
xdg-open index.html         # Linux: Open game in default browser
start index.html            # Windows: Open game in default browser

# Or use a simple HTTP server
npx http-server .           # Serve on http://localhost:8080
python -m http.server 8000  # Serve on http://localhost:8000

# Debugging
npm test -- --verbose       # Verbose test output
npm test -- --watch         # Watch mode for specific test
npm test -- game-logic      # Run specific test file
```

---

## Game Logic Rules

### 1. Movement Rules

**Snake Moves One Cell Per Update:**
```javascript
// Every update (10 times per second):
// 1. Calculate new head position based on direction
// 2. Add new head to front of snake array
// 3. Remove tail from back of snake array (unless eating food)

const moveSnake = (state) => {
  const newHead = calculateNewHead(state.snake[0], state.direction);
  const newSnake = [newHead, ...state.snake.slice(0, -1)];
  
  return {
    ...state,
    snake: newSnake
  };
};
```

**Direction Changes Limited to 90°:**
```javascript
// ✅ Valid: UP → RIGHT (90° turn)
// ✅ Valid: RIGHT → DOWN (90° turn)
// ❌ Invalid: RIGHT → LEFT (180° turn)
// ❌ Invalid: UP → DOWN (180° turn)

const isOppositeDirection = (current, next) => {
  const opposites = {
    UP: 'DOWN',
    DOWN: 'UP',
    LEFT: 'RIGHT',
    RIGHT: 'LEFT'
  };
  
  return opposites[current] === next;
};

// In input handler:
if (!isOppositeDirection(currentDirection, newDirection)) {
  currentDirection = newDirection;  // Allow the change
}
```

**Head Added to Front, Tail Removed:**
```javascript
// Visual representation:
// Before move (RIGHT direction):
// [HEAD][BODY][BODY][TAIL]
//  (5,5) (4,5) (3,5) (2,5)

// After move:
// [HEAD][BODY][BODY][BODY]
//  (6,5) (5,5) (4,5) (3,5)
//        ↑ old head becomes body
//                         ↑ old tail removed
```

### 2. Food Mechanics

**Spawns at Random Empty Cell:**
```javascript
const generateFood = (snake) => {
  let food;
  let attempts = 0;
  const MAX_ATTEMPTS = 1000;
  
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    attempts++;
  } while (isPositionOccupied(food, snake) && attempts < MAX_ATTEMPTS);
  
  return food;
};

const isPositionOccupied = (position, snake) => {
  return snake.some(segment => 
    segment.x === position.x && segment.y === position.y
  );
};
```

**Eating Increases Score:**
```javascript
const POINTS_PER_FOOD = 10;

const eatFood = (state) => {
  return {
    ...state,
    score: state.score + POINTS_PER_FOOD
  };
};
```

**Snake Grows by 1 Segment:**
```javascript
// When eating food, don't remove tail
const growSnake = (state) => {
  const newHead = calculateNewHead(state.snake[0], state.direction);
  const newSnake = [newHead, ...state.snake];  // Keep tail!
  
  return {
    ...state,
    snake: newSnake
  };
};
```

**New Food Spawns Immediately:**
```javascript
const updateGameState = (state) => {
  // ... movement logic ...
  
  if (isFoodCollision(newHead, state.food)) {
    return {
      ...state,
      snake: [...state.snake],  // Grown snake
      score: state.score + POINTS_PER_FOOD,
      food: generateFood(state.snake)  // New food immediately
    };
  }
  
  // ...
};
```

### 3. Game Over Conditions

**Snake Hits Wall:**
```javascript
// Game ends when head position is outside grid
if (head.x < 0 || head.x >= GRID_SIZE || 
    head.y < 0 || head.y >= GRID_SIZE) {
  return { ...state, gameOver: true };
}
```

**Snake Collides With Body:**
```javascript
// Game ends when head position matches any body segment
const body = state.snake.slice(1);
if (body.some(segment => segment.x === head.x && segment.y === head.y)) {
  return { ...state, gameOver: true };
}
```

**State Frozen Until Restart:**
```javascript
const updateGameState = (state) => {
  // First check: if game is over, don't process anything
  if (state.gameOver) {
    return state;  // Return unchanged state
  }
  
  // Rest of game logic...
};

// Restart requires creating new initial state
const restartGame = () => {
  gameState = createInitialState();
};
```

---

## Implementation Priority

### Phase 1: Core Logic (Foundational)

**Step 1: Define Constants and Types**
```javascript
// constants.js
export const GRID_SIZE = 20;
export const CELL_SIZE = 20;
export const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;
export const INITIAL_SPEED = 10;
export const POINTS_PER_FOOD = 10;
export const INITIAL_SNAKE_LENGTH = 3;
```

**Step 2: Implement createInitialState()**
```javascript
export const createInitialState = () => {
  const startX = Math.floor(GRID_SIZE / 2);
  const startY = Math.floor(GRID_SIZE / 2);
  
  const snake = [];
  for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
    snake.push({ x: startX - i, y: startY });
  }
  
  return {
    snake,
    direction: 'RIGHT',
    food: generateFood(snake),
    score: 0,
    gameOver: false
  };
};
```

**Step 3: Implement moveSnake()**
```javascript
export const moveSnake = (state) => {
  const newHead = calculateNewHead(state.snake[0], state.direction);
  const newSnake = [newHead, ...state.snake.slice(0, -1)];
  
  return {
    ...state,
    snake: newSnake
  };
};
```

**Step 4: Write Tests for Movement**
```javascript
describe('moveSnake', () => {
  it('should move right correctly', () => { /* ... */ });
  it('should move up correctly', () => { /* ... */ });
  it('should move down correctly', () => { /* ... */ });
  it('should move left correctly', () => { /* ... */ });
  it('should maintain snake length', () => { /* ... */ });
  it('should not mutate original state', () => { /* ... */ });
});
```

### Phase 2: Collisions (Safety)

**Step 5: Implement isWallCollision()**
**Step 6: Implement isSelfCollision()**
**Step 7: Implement isFoodCollision()**
**Step 8: Write Comprehensive Collision Tests**
- Test all 4 walls
- Test boundary cases (corner positions)
- Test self-collision with various snake lengths
- Test food collision at all positions

### Phase 3: Game Mechanics (Features)

**Step 9: Implement growSnake()**
**Step 10: Implement generateFood()**
**Step 11: Implement updateGameState()**
- Integrate all collision checks
- Handle food eating
- Handle game over
- Update score

**Step 12: Write Integration Tests**
- Test complete game cycle
- Test multiple food consumptions
- Test score progression
- Test game over scenarios

### Phase 4: Rendering (Visuals)

**Step 13: Implement Canvas Rendering**
```javascript
// renderer.js
export const clearCanvas = (ctx) => { /* ... */ };
export const drawGrid = (ctx) => { /* ... */ };
export const drawSnake = (ctx, snake) => { /* ... */ };
export const drawFood = (ctx, food) => { /* ... */ };
export const drawScore = (ctx, score) => { /* ... */ };
```

**Step 14: Implement Input Handling**
```javascript
// input-handler.js
export const setupKeyboardControls = (callback) => {
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    const directionMap = {
      'ArrowUp': 'UP',
      'ArrowDown': 'DOWN',
      'ArrowLeft': 'LEFT',
      'ArrowRight': 'RIGHT'
    };
    
    if (directionMap[key]) {
      callback(directionMap[key]);
    }
  });
};
```

**Step 15: Implement Game Loop**
```javascript
// main.js
let lastUpdateTime = 0;
const UPDATE_INTERVAL = 1000 / INITIAL_SPEED;

const gameLoop = (timestamp) => {
  const deltaTime = timestamp - lastUpdateTime;
  
  if (deltaTime >= UPDATE_INTERVAL) {
    gameState = updateGameState(gameState);
    lastUpdateTime = timestamp;
  }
  
  render(gameState);
  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
```

### Phase 5: Polish (Enhancement)

**Step 16: Add Styling**
- Center canvas on page
- Add background colors
- Style score display

**Step 17: Add Game Over Screen**
- Display "Game Over" message
- Show final score
- Add restart instructions

**Step 18: Add Score Display**
- Real-time score counter
- High score tracking (localStorage)

**Step 19: Test in Multiple Browsers**
- Chrome/Edge (Chromium)
- Firefox
- Safari

---

## Anti-Patterns to Avoid

### ❌ Global Mutable State

**BAD Example:**
```javascript
// ❌ NEVER DO THIS
let gameState = {
  snake: [{ x: 10, y: 10 }],
  direction: 'RIGHT',
  score: 0
};

function moveSnake() {
  // Mutating global state directly
  gameState.snake[0].x += 1;
  gameState.score += 10;
}

function checkCollision() {
  // Reading from global state
  if (gameState.snake[0].x >= 20) {
    gameState.gameOver = true;  // Mutating global
  }
}
```

**Problems:**
- Impossible to test in isolation
- Side effects everywhere
- Hard to debug
- Race conditions
- Can't undo/replay

### ✅ Immutable Updates

**GOOD Example:**
```javascript
// ✅ DO THIS
const moveSnake = (state) => {
  const newHead = {
    x: state.snake[0].x + 1,
    y: state.snake[0].y
  };
  
  return {
    ...state,
    snake: [newHead, ...state.snake.slice(0, -1)]
  };
};

const addPoints = (state, points) => {
  return {
    ...state,
    score: state.score + points
  };
};

// In game loop:
let gameState = createInitialState();
gameState = moveSnake(gameState);
gameState = addPoints(gameState, 10);
```

**Benefits:**
- Easy to test (pure functions)
- No side effects
- Easy to debug
- Can implement undo/replay
- Predictable behavior

---

### ❌ Mixing Concerns

**BAD Example:**
```javascript
// ❌ NEVER DO THIS - Game logic + rendering mixed together
function updateAndDrawSnake() {
  // Game logic
  const newHead = {
    x: snake[0].x + 1,
    y: snake[0].y
  };
  snake.unshift(newHead);
  snake.pop();
  
  // Rendering (should be separate!)
  ctx.fillStyle = 'green';
  ctx.fillRect(newHead.x * 20, newHead.y * 20, 20, 20);
  
  // More game logic
  if (newHead.x === food.x && newHead.y === food.y) {
    score += 10;
    
    // More rendering (should be separate!)
    document.getElementById('score').textContent = score;
  }
}
```

**Problems:**
- Can't test game logic without DOM
- Can't change rendering without touching logic
- Hard to understand what function does
- Violates Single Responsibility Principle

### ✅ Separation of Concerns

**GOOD Example:**
```javascript
// ✅ DO THIS - Separate files, separate responsibilities

// game-logic.js - Pure game logic
export const moveSnake = (state) => {
  const newHead = calculateNewHead(state.snake[0], state.direction);
  return {
    ...state,
    snake: [newHead, ...state.snake.slice(0, -1)]
  };
};

export const eatFood = (state) => {
  return {
    ...state,
    score: state.score + POINTS_PER_FOOD,
    food: generateFood(state.snake)
  };
};

// renderer.js - Only rendering
export const drawSnake = (ctx, snake) => {
  ctx.fillStyle = 'green';
  snake.forEach(segment => {
    ctx.fillRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  });
};

export const drawScore = (ctx, score) => {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
};

// main.js - Orchestration
const gameLoop = () => {
  gameState = updateGameState(gameState);
  clearCanvas(ctx);
  drawSnake(ctx, gameState.snake);
  drawFood(ctx, gameState.food);
  drawScore(ctx, gameState.score);
  requestAnimationFrame(gameLoop);
};
```

**Benefits:**
- Test game logic without DOM
- Change rendering independently
- Clear responsibilities
- Easy to understand
- Follows SOLID principles

---

### ❌ Magic Numbers

**BAD Example:**
```javascript
// ❌ NEVER DO THIS
function initSnake() {
  return [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];
}

function checkWallCollision(head) {
  return head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20;
}

function drawSnake(ctx, snake) {
  snake.forEach(segment => {
    ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
  });
}

const gameLoop = () => {
  if (frameCount % 6 === 0) {  // What does 6 mean?
    updateGame();
  }
};
```

**Problems:**
- What does 20 mean? Grid size? Cell size?
- What does 10 mean? Starting position?
- What does 6 mean? Update frequency?
- Hard to change values consistently
- No single source of truth

### ✅ Named Constants

**GOOD Example:**
```javascript
// ✅ DO THIS - constants.js
export const GRID_SIZE = 20;           // 20x20 grid
export const CELL_SIZE = 20;           // 20px per cell
export const CANVAS_SIZE = 400;        // 400x400 canvas
export const INITIAL_SPEED = 10;       // 10 updates per second
export const POINTS_PER_FOOD = 10;     // 10 points per food
export const INITIAL_SNAKE_LENGTH = 3; // Start with 3 segments

// game-logic.js
import { GRID_SIZE, INITIAL_SNAKE_LENGTH } from './constants.js';

function initSnake() {
  const startX = Math.floor(GRID_SIZE / 2);
  const startY = Math.floor(GRID_SIZE / 2);
  const snake = [];
  
  for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
    snake.push({ x: startX - i, y: startY });
  }
  
  return snake;
}

function checkWallCollision(head) {
  return head.x < 0 || 
         head.x >= GRID_SIZE || 
         head.y < 0 || 
         head.y >= GRID_SIZE;
}

// renderer.js
import { CELL_SIZE } from './constants.js';

function drawSnake(ctx, snake) {
  snake.forEach(segment => {
    ctx.fillRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  });
}
```

**Benefits:**
- Clear meaning and intent
- Easy to change globally
- Self-documenting code
- Single source of truth
- Type safety (can be enforced)

---

## Code Style Examples

### ✅ GOOD: Complete moveSnake Function

```javascript
/**
 * Moves the snake one cell in the current direction.
 * Returns a new state object with updated snake position.
 * Does not mutate the original state.
 */
export const moveSnake = (state) => {
  const { snake, direction } = state;
  const head = snake[0];
  
  // Calculate new head position based on direction
  const newHead = calculateNewHead(head, direction);
  
  // Create new snake: new head + all except last segment (tail)
  const newSnake = [newHead, ...snake.slice(0, -1)];
  
  return {
    ...state,
    snake: newSnake
  };
};

/**
 * Calculates the new head position based on current position and direction.
 */
export const calculateNewHead = (head, direction) => {
  switch (direction) {
    case 'UP':
      return { x: head.x, y: head.y - 1 };
    case 'DOWN':
      return { x: head.x, y: head.y + 1 };
    case 'LEFT':
      return { x: head.x - 1, y: head.y };
    case 'RIGHT':
      return { x: head.x + 1, y: head.y };
    default:
      return head;
  }
};
```

### ✅ GOOD: Constants Defined Properly

```javascript
// constants.js

// Grid configuration
export const GRID_SIZE = 20;        // Number of cells per row/column
export const CELL_SIZE = 20;        // Pixels per cell
export const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;  // Total canvas size

// Game configuration
export const INITIAL_SPEED = 10;    // Game updates per second
export const INITIAL_SNAKE_LENGTH = 3;  // Starting snake length
export const POINTS_PER_FOOD = 10;  // Points awarded per food eaten

// Direction constants
export const DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

// Opposite directions for collision prevention
export const OPPOSITE_DIRECTIONS = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT'
};
```

### ✅ GOOD: Clean Function Structure

```javascript
/**
 * Updates the entire game state for one frame.
 * Handles movement, collisions, food consumption, and game over.
 */
export const updateGameState = (state) => {
  // Early return if game is over
  if (state.gameOver) {
    return state;
  }
  
  // Calculate new head position
  const newHead = calculateNewHead(state.snake[0], state.direction);
  
  // Check for wall collision
  if (isWallCollision(newHead)) {
    return { ...state, gameOver: true };
  }
  
  // Check for self collision
  if (isSelfCollision(newHead, state.snake.slice(1))) {
    return { ...state, gameOver: true };
  }
  
  // Check for food collision
  if (isFoodCollision(newHead, state.food)) {
    return handleFoodCollision(state, newHead);
  }
  
  // Normal movement (no collision, no food)
  return moveSnake(state);
};

/**
 * Handles the state update when snake eats food.
 */
const handleFoodCollision = (state, newHead) => {
  const newSnake = [newHead, ...state.snake];  // Grow snake
  
  return {
    ...state,
    snake: newSnake,
    score: state.score + POINTS_PER_FOOD,
    food: generateFood(newSnake)
  };
};
```

### ❌ BAD: All Anti-Patterns Combined

```javascript
// ❌ NEVER WRITE CODE LIKE THIS

// Using var (outdated)
var snake = [{ x: 10, y: 10 }];
var direction = 'right';
var score = 0;

// Non-descriptive names
function u() {
  var h = snake[0];
  var nh = { x: h.x, y: h.y };
  
  // Magic numbers everywhere
  if (direction === 'right') nh.x += 1;
  if (direction === 'up') nh.y -= 1;
  
  // Mutation!
  snake.unshift(nh);
  snake.pop();
  
  // Checking collision in same function (mixed concerns)
  if (nh.x >= 20 || nh.y >= 20) {
    alert('Game Over!');
  }
  
  // More mutation
  if (nh.x === food.x && nh.y === food.y) {
    score = score + 10;
    snake.push(snake[snake.length - 1]);
  }
}

// Modifying original arrays
function addSegment(arr) {
  arr.push({ x: 0, y: 0 });  // Mutates input!
  return arr;
}
```

---

## Performance Considerations

### Target: 60 FPS (16.67ms per frame)

**Frame Budget Breakdown:**
- **Game Logic:** < 5ms
- **Rendering:** < 10ms
- **Browser Overhead:** ~1-2ms
- **Total:** ~16ms (leaving 0.67ms buffer)

### Optimization Tips

**1. Clear Only Dirty Regions (If Needed):**
```javascript
// Simple approach (fast enough for this game):
const clearCanvas = (ctx) => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
};

// Advanced approach (if performance issues):
const clearDirtyRegions = (ctx, prevSnake, prevFood) => {
  // Clear previous snake positions
  prevSnake.forEach(segment => {
    ctx.clearRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  });
  
  // Clear previous food position
  ctx.clearRect(
    prevFood.x * CELL_SIZE,
    prevFood.y * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE
  );
};
```

**2. Use Integer Coordinates:**
```javascript
// ✅ GOOD: Integer coordinates (fast)
const head = { x: 10, y: 15 };
const newX = head.x + 1;

// ❌ BAD: Float coordinates (slower, unnecessary)
const head = { x: 10.5, y: 15.7 };
const newX = Math.floor(head.x + 1.0);
```

**3. Avoid Allocations in Hot Paths:**
```javascript
// ❌ BAD: Creating objects in tight loop
const render = (state) => {
  state.snake.forEach(segment => {
    const position = { x: segment.x * CELL_SIZE, y: segment.y * CELL_SIZE };
    drawCell(ctx, position);
  });
};

// ✅ GOOD: Reuse coordinates directly
const render = (state) => {
  state.snake.forEach(segment => {
    ctx.fillRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  });
};
```

**4. Profile If Issues Arise:**
```javascript
// Use browser DevTools performance profiler
console.time('updateGameState');
gameState = updateGameState(gameState);
console.timeEnd('updateGameState');

console.time('render');
render(ctx, gameState);
console.timeEnd('render');

// Expected output:
// updateGameState: 0.5ms  (well under 5ms target)
// render: 2.0ms           (well under 10ms target)
```

---

## Summary Checklist

When working on this project, ensure you:

- [ ] Use ES6+ syntax (const/let, arrow functions, destructuring, spread)
- [ ] Write pure functions for all game logic
- [ ] Keep functions under 50 lines
- [ ] Use early returns for clarity
- [ ] Name constants with UPPER_SNAKE_CASE
- [ ] Name functions with camelCase
- [ ] Separate concerns (logic, rendering, input)
- [ ] Maintain 90%+ test coverage
- [ ] Test all pure functions
- [ ] Test all edge cases
- [ ] Mock Canvas API in tests
- [ ] Use immutable state updates
- [ ] Never mutate original state
- [ ] Avoid magic numbers
- [ ] Keep frame time under 16.67ms
- [ ] Profile if performance issues occur

---

## Additional Resources

**Canvas API:**
- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [Canvas API Reference](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

**Jest Testing:**
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Jest Matchers](https://jestjs.io/docs/expect)
- [Jest Mock Functions](https://jestjs.io/docs/mock-functions)

**JavaScript Patterns:**
- [Functional Programming in JavaScript](https://opensource.com/article/17/6/functional-javascript)
- [Immutability in JavaScript](https://developer.mozilla.org/en-US/docs/Glossary/Immutable)

**Game Development:**
- [Game Loop Patterns](https://gameprogrammingpatterns.com/game-loop.html)
- [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

---

**End of AGENTS.md**

This file should be your primary reference for all development decisions on this project. Follow these guidelines strictly to ensure code quality, testability, and maintainability.
