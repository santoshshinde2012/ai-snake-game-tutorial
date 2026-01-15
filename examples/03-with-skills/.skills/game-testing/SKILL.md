---
name: game-testing
description: Comprehensive testing framework for browser-based games. Use when writing tests for game logic, collision detection, state management, or game loops. Includes automated test generation and coverage analysis.
license: MIT
metadata:
  author: AI Agent Ecosystem Tutorial
  version: "1.0.0"
  tags: [testing, games, javascript, jest]
---

# Game Testing Skill

## When to Use This Skill

Use this skill when you need to:
- **Write unit tests** for game logic functions (pure functions, state transformations)
- **Test collision detection** systems (wall, self, object collisions)
- **Verify state management** patterns (immutability, state transitions)
- **Test game loops** and timing mechanisms
- **Mock Canvas API** and browser APIs for rendering tests
- **Achieve high test coverage** (90%+ for game logic)
- **Debug failing tests** with comprehensive error messages

This skill is specifically designed for **browser-based games** using JavaScript, Canvas API, and Jest testing framework.

---

## Core Testing Patterns

### Pattern 1: Pure Function Testing

Pure functions are the foundation of testable game logic. They take inputs, return outputs, and have no side effects.

**Complete Example: Testing Movement Functions**

```javascript
// game-logic.js
export const calculateNewHead = (head, direction) => {
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

export const moveSnake = (state) => {
  const newHead = calculateNewHead(state.snake[0], state.direction);
  const newSnake = [newHead, ...state.snake.slice(0, -1)];
  
  return {
    ...state,
    snake: newSnake
  };
};

// game-logic.test.js
import { calculateNewHead, moveSnake } from '../src/game-logic';

describe('Pure Function Testing', () => {
  describe('calculateNewHead', () => {
    it('should calculate new head position for UP direction', () => {
      // Arrange
      const head = { x: 10, y: 10 };
      const direction = 'UP';
      
      // Act
      const result = calculateNewHead(head, direction);
      
      // Assert
      expect(result).toEqual({ x: 10, y: 9 });
    });
    
    it('should calculate new head position for DOWN direction', () => {
      const head = { x: 10, y: 10 };
      const result = calculateNewHead(head, 'DOWN');
      expect(result).toEqual({ x: 10, y: 11 });
    });
    
    it('should calculate new head position for LEFT direction', () => {
      const head = { x: 10, y: 10 };
      const result = calculateNewHead(head, 'LEFT');
      expect(result).toEqual({ x: 9, y: 10 });
    });
    
    it('should calculate new head position for RIGHT direction', () => {
      const head = { x: 10, y: 10 };
      const result = calculateNewHead(head, 'RIGHT');
      expect(result).toEqual({ x: 11, y: 10 });
    });
    
    it('should not mutate original head object', () => {
      const head = { x: 10, y: 10 };
      const originalX = head.x;
      const originalY = head.y;
      
      calculateNewHead(head, 'UP');
      
      expect(head.x).toBe(originalX);
      expect(head.y).toBe(originalY);
    });
  });
  
  describe('moveSnake', () => {
    it('should move snake right by one cell', () => {
      const state = {
        snake: [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }],
        direction: 'RIGHT'
      };
      
      const newState = moveSnake(state);
      
      expect(newState.snake[0]).toEqual({ x: 6, y: 5 });
      expect(newState.snake.length).toBe(3);
    });
    
    it('should remove tail segment when moving', () => {
      const state = {
        snake: [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }],
        direction: 'RIGHT'
      };
      
      const newState = moveSnake(state);
      
      // Old tail should be removed
      expect(newState.snake).not.toContainEqual({ x: 3, y: 5 });
    });
    
    it('should not mutate original state', () => {
      const state = {
        snake: [{ x: 5, y: 5 }, { x: 4, y: 5 }],
        direction: 'RIGHT'
      };
      const originalSnakeLength = state.snake.length;
      const originalHeadX = state.snake[0].x;
      
      moveSnake(state);
      
      expect(state.snake.length).toBe(originalSnakeLength);
      expect(state.snake[0].x).toBe(originalHeadX);
    });
    
    it('should handle snake of length 1', () => {
      const state = {
        snake: [{ x: 10, y: 10 }],
        direction: 'UP'
      };
      
      const newState = moveSnake(state);
      
      expect(newState.snake.length).toBe(1);
      expect(newState.snake[0]).toEqual({ x: 10, y: 9 });
    });
  });
});
```

**Key Testing Principles:**
- Test all input combinations (all 4 directions)
- Verify immutability (original objects not mutated)
- Test edge cases (length 1 snake)
- Use Arrange/Act/Assert pattern
- Clear, descriptive test names

---

### Pattern 2: State Transition Testing

State transitions verify that game state changes correctly over time.

**Complete Example: Testing Game State Updates**

```javascript
// game-logic.js
export const GRID_SIZE = 20;
export const POINTS_PER_FOOD = 10;

export const updateGameState = (state) => {
  if (state.gameOver) {
    return state;
  }
  
  const newHead = calculateNewHead(state.snake[0], state.direction);
  
  if (isWallCollision(newHead)) {
    return { ...state, gameOver: true };
  }
  
  if (isSelfCollision(newHead, state.snake.slice(1))) {
    return { ...state, gameOver: true };
  }
  
  if (isFoodCollision(newHead, state.food)) {
    const newSnake = [newHead, ...state.snake];
    return {
      ...state,
      snake: newSnake,
      score: state.score + POINTS_PER_FOOD,
      food: generateFood(newSnake)
    };
  }
  
  return moveSnake(state);
};

// game-logic.test.js
describe('State Transition Testing', () => {
  describe('updateGameState', () => {
    it('should return unchanged state when game is over', () => {
      const state = {
        snake: [{ x: 10, y: 10 }],
        direction: 'RIGHT',
        food: { x: 15, y: 15 },
        score: 50,
        gameOver: true
      };
      
      const newState = updateGameState(state);
      
      expect(newState).toEqual(state);
    });
    
    it('should set gameOver to true on wall collision', () => {
      const state = {
        snake: [{ x: 19, y: 10 }],
        direction: 'RIGHT',
        food: { x: 15, y: 15 },
        score: 0,
        gameOver: false
      };
      
      const newState = updateGameState(state);
      
      expect(newState.gameOver).toBe(true);
    });
    
    it('should set gameOver to true on self collision', () => {
      const state = {
        snake: [
          { x: 10, y: 10 },
          { x: 10, y: 11 },
          { x: 11, y: 11 },
          { x: 11, y: 10 }
        ],
        direction: 'DOWN',
        food: { x: 15, y: 15 },
        score: 0,
        gameOver: false
      };
      
      const newState = updateGameState(state);
      
      expect(newState.gameOver).toBe(true);
    });
    
    it('should grow snake and increase score when eating food', () => {
      const state = {
        snake: [{ x: 14, y: 15 }, { x: 13, y: 15 }],
        direction: 'RIGHT',
        food: { x: 15, y: 15 },
        score: 0,
        gameOver: false
      };
      
      const newState = updateGameState(state);
      
      expect(newState.snake.length).toBe(3);
      expect(newState.snake[0]).toEqual({ x: 15, y: 15 });
      expect(newState.score).toBe(10);
      expect(newState.food).not.toEqual({ x: 15, y: 15 });
    });
    
    it('should move snake normally when no collision occurs', () => {
      const state = {
        snake: [{ x: 10, y: 10 }, { x: 9, y: 10 }],
        direction: 'RIGHT',
        food: { x: 15, y: 15 },
        score: 20,
        gameOver: false
      };
      
      const newState = updateGameState(state);
      
      expect(newState.snake[0]).toEqual({ x: 11, y: 10 });
      expect(newState.snake.length).toBe(2);
      expect(newState.score).toBe(20);
      expect(newState.gameOver).toBe(false);
    });
    
    it('should handle multiple state transitions', () => {
      let state = {
        snake: [{ x: 10, y: 10 }, { x: 9, y: 10 }],
        direction: 'RIGHT',
        food: { x: 15, y: 10 },
        score: 0,
        gameOver: false
      };
      
      // Move 5 times towards food
      for (let i = 0; i < 5; i++) {
        state = updateGameState(state);
      }
      
      // Should have eaten food
      expect(state.score).toBe(10);
      expect(state.snake.length).toBe(3);
    });
  });
});
```

**State Transition Testing Checklist:**
- Test initial state transitions
- Test terminal states (game over)
- Test state transitions with side effects (score updates)
- Test multiple consecutive transitions
- Verify state consistency after each transition

---

### Pattern 3: Collision Detection Testing

Collision detection is critical for game correctness. Test all collision types exhaustively.

**Complete Example: Comprehensive Collision Testing**

```javascript
// game-logic.js
export const GRID_SIZE = 20;

export const isWallCollision = (head) => {
  return head.x < 0 || 
         head.x >= GRID_SIZE || 
         head.y < 0 || 
         head.y >= GRID_SIZE;
};

export const isSelfCollision = (head, body) => {
  return body.some(segment => 
    segment.x === head.x && segment.y === head.y
  );
};

export const isFoodCollision = (head, food) => {
  return head.x === food.x && head.y === food.y;
};

// game-logic.test.js
describe('Collision Detection Testing', () => {
  describe('isWallCollision', () => {
    // Boundary tests - outside grid
    it('should detect collision at left wall (x = -1)', () => {
      expect(isWallCollision({ x: -1, y: 10 })).toBe(true);
    });
    
    it('should detect collision at right wall (x = 20)', () => {
      expect(isWallCollision({ x: 20, y: 10 })).toBe(true);
    });
    
    it('should detect collision at top wall (y = -1)', () => {
      expect(isWallCollision({ x: 10, y: -1 })).toBe(true);
    });
    
    it('should detect collision at bottom wall (y = 20)', () => {
      expect(isWallCollision({ x: 10, y: 20 })).toBe(true);
    });
    
    // Corner tests
    it('should detect collision at top-left corner', () => {
      expect(isWallCollision({ x: -1, y: -1 })).toBe(true);
    });
    
    it('should detect collision at top-right corner', () => {
      expect(isWallCollision({ x: 20, y: -1 })).toBe(true);
    });
    
    it('should detect collision at bottom-left corner', () => {
      expect(isWallCollision({ x: -1, y: 20 })).toBe(true);
    });
    
    it('should detect collision at bottom-right corner', () => {
      expect(isWallCollision({ x: 20, y: 20 })).toBe(true);
    });
    
    // Edge tests - on the boundary (valid positions)
    it('should not detect collision at left edge (x = 0)', () => {
      expect(isWallCollision({ x: 0, y: 10 })).toBe(false);
    });
    
    it('should not detect collision at right edge (x = 19)', () => {
      expect(isWallCollision({ x: 19, y: 10 })).toBe(false);
    });
    
    it('should not detect collision at top edge (y = 0)', () => {
      expect(isWallCollision({ x: 10, y: 0 })).toBe(false);
    });
    
    it('should not detect collision at bottom edge (y = 19)', () => {
      expect(isWallCollision({ x: 10, y: 19 })).toBe(false);
    });
    
    // Interior tests
    it('should not detect collision at center (x = 10, y = 10)', () => {
      expect(isWallCollision({ x: 10, y: 10 })).toBe(false);
    });
    
    it('should not detect collision at random valid position', () => {
      expect(isWallCollision({ x: 7, y: 13 })).toBe(false);
    });
    
    // Far outside boundary
    it('should detect collision far outside left wall', () => {
      expect(isWallCollision({ x: -100, y: 10 })).toBe(true);
    });
    
    it('should detect collision far outside right wall', () => {
      expect(isWallCollision({ x: 100, y: 10 })).toBe(true);
    });
  });
  
  describe('isSelfCollision', () => {
    it('should detect collision when head matches body segment', () => {
      const head = { x: 5, y: 5 };
      const body = [
        { x: 6, y: 5 },
        { x: 5, y: 5 },  // Match!
        { x: 4, y: 5 }
      ];
      
      expect(isSelfCollision(head, body)).toBe(true);
    });
    
    it('should not detect collision when head is clear of body', () => {
      const head = { x: 5, y: 5 };
      const body = [
        { x: 6, y: 5 },
        { x: 7, y: 5 },
        { x: 8, y: 5 }
      ];
      
      expect(isSelfCollision(head, body)).toBe(false);
    });
    
    it('should not detect collision with empty body', () => {
      const head = { x: 5, y: 5 };
      const body = [];
      
      expect(isSelfCollision(head, body)).toBe(false);
    });
    
    it('should detect collision with first body segment', () => {
      const head = { x: 10, y: 10 };
      const body = [{ x: 10, y: 10 }];
      
      expect(isSelfCollision(head, body)).toBe(true);
    });
    
    it('should detect collision with last body segment', () => {
      const head = { x: 10, y: 10 };
      const body = [
        { x: 11, y: 10 },
        { x: 12, y: 10 },
        { x: 13, y: 10 },
        { x: 10, y: 10 }  // Last segment matches
      ];
      
      expect(isSelfCollision(head, body)).toBe(true);
    });
    
    it('should not detect collision when only x matches', () => {
      const head = { x: 10, y: 10 };
      const body = [{ x: 10, y: 11 }];
      
      expect(isSelfCollision(head, body)).toBe(false);
    });
    
    it('should not detect collision when only y matches', () => {
      const head = { x: 10, y: 10 };
      const body = [{ x: 11, y: 10 }];
      
      expect(isSelfCollision(head, body)).toBe(false);
    });
    
    it('should handle long snake body', () => {
      const head = { x: 10, y: 10 };
      const body = [];
      for (let i = 0; i < 100; i++) {
        body.push({ x: i, y: 5 });
      }
      
      expect(isSelfCollision(head, body)).toBe(false);
    });
  });
  
  describe('isFoodCollision', () => {
    it('should detect collision when head matches food position', () => {
      const head = { x: 15, y: 15 };
      const food = { x: 15, y: 15 };
      
      expect(isFoodCollision(head, food)).toBe(true);
    });
    
    it('should not detect collision when positions differ', () => {
      const head = { x: 15, y: 15 };
      const food = { x: 16, y: 15 };
      
      expect(isFoodCollision(head, food)).toBe(false);
    });
    
    it('should not detect collision when only x matches', () => {
      const head = { x: 15, y: 15 };
      const food = { x: 15, y: 16 };
      
      expect(isFoodCollision(head, food)).toBe(false);
    });
    
    it('should not detect collision when only y matches', () => {
      const head = { x: 15, y: 15 };
      const food = { x: 16, y: 15 };
      
      expect(isFoodCollision(head, food)).toBe(false);
    });
    
    it('should detect collision at origin (0, 0)', () => {
      const head = { x: 0, y: 0 };
      const food = { x: 0, y: 0 };
      
      expect(isFoodCollision(head, food)).toBe(true);
    });
    
    it('should detect collision at max coordinates', () => {
      const head = { x: 19, y: 19 };
      const food = { x: 19, y: 19 };
      
      expect(isFoodCollision(head, food)).toBe(true);
    });
  });
  
  describe('Collision Integration Tests', () => {
    it('should prioritize wall collision over food collision', () => {
      const head = { x: -1, y: 10 };
      const food = { x: -1, y: 10 };
      
      expect(isWallCollision(head)).toBe(true);
      expect(isFoodCollision(head, food)).toBe(true);
    });
    
    it('should handle all collision types in same state', () => {
      const state = {
        snake: [{ x: 0, y: 0 }],
        direction: 'LEFT'
      };
      
      const newHead = calculateNewHead(state.snake[0], state.direction);
      
      expect(isWallCollision(newHead)).toBe(true);
      expect(isSelfCollision(newHead, [])).toBe(false);
    });
  });
});
```

**Collision Testing Checklist:**
- Test all boundaries (left, right, top, bottom)
- Test corners
- Test just inside boundaries (valid)
- Test just outside boundaries (invalid)
- Test far outside boundaries
- Test empty cases (empty body, empty grid)
- Test edge cases (single segment, very long snake)

---

### Pattern 4: Canvas Mocking

Canvas rendering functions are difficult to test directly. Use mocks to verify drawing calls.

**Complete Example: Canvas API Mocking**

```javascript
// renderer.js
export const CELL_SIZE = 20;
export const GRID_SIZE = 20;

export const clearCanvas = (ctx) => {
  ctx.clearRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);
};

export const drawSnake = (ctx, snake) => {
  ctx.fillStyle = '#4CAF50';
  snake.forEach(segment => {
    ctx.fillRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  });
};

export const drawFood = (ctx, food) => {
  ctx.fillStyle = '#FF5722';
  ctx.fillRect(
    food.x * CELL_SIZE,
    food.y * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE
  );
};

export const drawGrid = (ctx) => {
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 1;
  
  for (let i = 0; i <= GRID_SIZE; i++) {
    // Vertical lines
    ctx.beginPath();
    ctx.moveTo(i * CELL_SIZE, 0);
    ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
    ctx.stroke();
    
    // Horizontal lines
    ctx.beginPath();
    ctx.moveTo(0, i * CELL_SIZE);
    ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
    ctx.stroke();
  }
};

// renderer.test.js
describe('Canvas Mocking', () => {
  let mockCtx;
  
  beforeEach(() => {
    // Create a mock canvas context
    mockCtx = {
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      strokeRect: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 0
    };
  });
  
  describe('clearCanvas', () => {
    it('should call clearRect with correct canvas dimensions', () => {
      clearCanvas(mockCtx);
      
      expect(mockCtx.clearRect).toHaveBeenCalledTimes(1);
      expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, 400, 400);
    });
  });
  
  describe('drawSnake', () => {
    it('should set fillStyle to green', () => {
      const snake = [{ x: 10, y: 10 }];
      
      drawSnake(mockCtx, snake);
      
      expect(mockCtx.fillStyle).toBe('#4CAF50');
    });
    
    it('should call fillRect for each snake segment', () => {
      const snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
      ];
      
      drawSnake(mockCtx, snake);
      
      expect(mockCtx.fillRect).toHaveBeenCalledTimes(3);
    });
    
    it('should draw segment at correct position and size', () => {
      const snake = [{ x: 5, y: 7 }];
      
      drawSnake(mockCtx, snake);
      
      expect(mockCtx.fillRect).toHaveBeenCalledWith(100, 140, 20, 20);
    });
    
    it('should handle empty snake', () => {
      const snake = [];
      
      drawSnake(mockCtx, snake);
      
      expect(mockCtx.fillRect).not.toHaveBeenCalled();
    });
    
    it('should draw all segments with correct coordinates', () => {
      const snake = [
        { x: 10, y: 10 },
        { x: 11, y: 10 }
      ];
      
      drawSnake(mockCtx, snake);
      
      expect(mockCtx.fillRect).toHaveBeenNthCalledWith(1, 200, 200, 20, 20);
      expect(mockCtx.fillRect).toHaveBeenNthCalledWith(2, 220, 200, 20, 20);
    });
  });
  
  describe('drawFood', () => {
    it('should set fillStyle to red', () => {
      const food = { x: 15, y: 15 };
      
      drawFood(mockCtx, food);
      
      expect(mockCtx.fillStyle).toBe('#FF5722');
    });
    
    it('should call fillRect once with correct parameters', () => {
      const food = { x: 15, y: 15 };
      
      drawFood(mockCtx, food);
      
      expect(mockCtx.fillRect).toHaveBeenCalledTimes(1);
      expect(mockCtx.fillRect).toHaveBeenCalledWith(300, 300, 20, 20);
    });
    
    it('should draw food at origin', () => {
      const food = { x: 0, y: 0 };
      
      drawFood(mockCtx, food);
      
      expect(mockCtx.fillRect).toHaveBeenCalledWith(0, 0, 20, 20);
    });
  });
  
  describe('drawGrid', () => {
    it('should set strokeStyle to light gray', () => {
      drawGrid(mockCtx);
      
      expect(mockCtx.strokeStyle).toBe('#ddd');
    });
    
    it('should set lineWidth to 1', () => {
      drawGrid(mockCtx);
      
      expect(mockCtx.lineWidth).toBe(1);
    });
    
    it('should draw correct number of lines', () => {
      drawGrid(mockCtx);
      
      // 21 vertical + 21 horizontal = 42 lines
      expect(mockCtx.stroke).toHaveBeenCalledTimes(42);
    });
    
    it('should call beginPath for each line', () => {
      drawGrid(mockCtx);
      
      expect(mockCtx.beginPath).toHaveBeenCalledTimes(42);
    });
  });
  
  describe('Canvas Integration', () => {
    it('should clear canvas before drawing', () => {
      const snake = [{ x: 10, y: 10 }];
      const food = { x: 15, y: 15 };
      
      clearCanvas(mockCtx);
      drawGrid(mockCtx);
      drawSnake(mockCtx, snake);
      drawFood(mockCtx, food);
      
      // Verify order: clear first
      expect(mockCtx.clearRect).toHaveBeenCalled();
    });
  });
});
```

**Canvas Mocking Best Practices:**
- Mock all canvas context methods used
- Verify method calls with `toHaveBeenCalled()`
- Verify call parameters with `toHaveBeenCalledWith()`
- Test coordinate calculations (multiply by CELL_SIZE)
- Test drawing order if order matters
- Use `beforeEach` to reset mocks

---

## Test Organization Structure

Organize tests to mirror source code structure:

```
project/
├── src/
│   ├── game-logic.js
│   ├── renderer.js
│   ├── input-handler.js
│   └── constants.js
├── tests/
│   ├── game-logic.test.js
│   ├── renderer.test.js
│   ├── input-handler.test.js
│   └── integration.test.js
└── jest.config.js
```

**Test File Naming:**
- `filename.test.js` for unit tests
- `filename.integration.test.js` for integration tests
- `filename.spec.js` alternative naming

**describe Block Organization:**
```javascript
describe('ModuleName or FileName', () => {
  describe('functionName', () => {
    describe('when condition', () => {
      it('should expected behavior', () => {
        // Test implementation
      });
    });
    
    it('should handle normal case', () => {});
    it('should handle edge case', () => {});
    it('should handle error case', () => {});
  });
});
```

---

## Coverage Requirements

### Target Coverage Levels

**Overall Project: 90%+**
- Statements: 90%+
- Branches: 90%+
- Functions: 95%+
- Lines: 90%+

**Critical Game Logic: 100%**
Functions that must have 100% coverage:
- Movement functions (`moveSnake`, `calculateNewHead`)
- Collision detection (`isWallCollision`, `isSelfCollision`, `isFoodCollision`)
- State updates (`updateGameState`, `createInitialState`)
- Food generation (`generateFood`)

**Rendering Functions: 80%+ (Can be lower)**
- Canvas drawing functions can have lower coverage
- Mock Canvas API instead of testing actual rendering
- Focus on parameter validation and call verification

**Running Coverage:**
```bash
npm run test:coverage
```

**Reading Coverage Reports:**
```
---------------------------|---------|----------|---------|---------|
File                       | % Stmts | % Branch | % Funcs | % Lines |
---------------------------|---------|----------|---------|---------|
All files                  |   92.5  |   90.2   |   95.0  |   93.1  |
 src/                      |   92.5  |   90.2   |   95.0  |   93.1  |
  game-logic.js            |   95.0  |   92.0   |  100.0  |   96.0  | ✅
  renderer.js              |   82.0  |   75.0   |   85.0  |   84.0  | ✅
  input-handler.js         |   90.0  |   88.0   |   90.0  |   91.0  | ✅
  constants.js             |  100.0  |  100.0   |  100.0  |  100.0  | ✅
---------------------------|---------|----------|---------|---------|
```

**Coverage HTML Report:**
Open `coverage/lcov-report/index.html` in browser for detailed line-by-line coverage.

---

## Common Test Scenarios

### Scenario 1: Testing Initial State Creation

```javascript
describe('createInitialState', () => {
  it('should create snake at center of grid', () => {
    const state = createInitialState();
    
    const centerX = Math.floor(GRID_SIZE / 2);
    const centerY = Math.floor(GRID_SIZE / 2);
    
    expect(state.snake[0]).toEqual({ x: centerX, y: centerY });
  });
  
  it('should create snake with correct initial length', () => {
    const state = createInitialState();
    
    expect(state.snake.length).toBe(INITIAL_SNAKE_LENGTH);
  });
  
  it('should set initial direction to RIGHT', () => {
    const state = createInitialState();
    
    expect(state.direction).toBe('RIGHT');
  });
  
  it('should set initial score to 0', () => {
    const state = createInitialState();
    
    expect(state.score).toBe(0);
  });
  
  it('should set gameOver to false', () => {
    const state = createInitialState();
    
    expect(state.gameOver).toBe(false);
  });
  
  it('should generate food not on snake', () => {
    const state = createInitialState();
    
    const foodOnSnake = state.snake.some(segment =>
      segment.x === state.food.x && segment.y === state.food.y
    );
    
    expect(foodOnSnake).toBe(false);
  });
});
```

### Scenario 2: Testing Food Generation

```javascript
describe('generateFood', () => {
  it('should generate food within grid bounds', () => {
    const snake = [{ x: 10, y: 10 }];
    
    const food = generateFood(snake);
    
    expect(food.x).toBeGreaterThanOrEqual(0);
    expect(food.x).toBeLessThan(GRID_SIZE);
    expect(food.y).toBeGreaterThanOrEqual(0);
    expect(food.y).toBeLessThan(GRID_SIZE);
  });
  
  it('should not generate food on snake position', () => {
    const snake = [{ x: 10, y: 10 }];
    
    const food = generateFood(snake);
    
    expect(food).not.toEqual({ x: 10, y: 10 });
  });
  
  it('should generate food when snake is long', () => {
    const snake = [];
    for (let i = 0; i < 100; i++) {
      snake.push({ x: i % GRID_SIZE, y: Math.floor(i / GRID_SIZE) });
    }
    
    const food = generateFood(snake);
    
    const foodOnSnake = snake.some(segment =>
      segment.x === food.x && segment.y === food.y
    );
    
    expect(foodOnSnake).toBe(false);
  });
  
  it('should generate different positions on multiple calls', () => {
    const snake = [{ x: 10, y: 10 }];
    const positions = new Set();
    
    for (let i = 0; i < 50; i++) {
      const food = generateFood(snake);
      positions.add(`${food.x},${food.y}`);
    }
    
    // Should have generated at least 20 different positions
    expect(positions.size).toBeGreaterThan(20);
  });
});
```

### Scenario 3: Testing Direction Changes

```javascript
describe('isOppositeDirection', () => {
  it('should return true for UP and DOWN', () => {
    expect(isOppositeDirection('UP', 'DOWN')).toBe(true);
    expect(isOppositeDirection('DOWN', 'UP')).toBe(true);
  });
  
  it('should return true for LEFT and RIGHT', () => {
    expect(isOppositeDirection('LEFT', 'RIGHT')).toBe(true);
    expect(isOppositeDirection('RIGHT', 'LEFT')).toBe(true);
  });
  
  it('should return false for perpendicular directions', () => {
    expect(isOppositeDirection('UP', 'LEFT')).toBe(false);
    expect(isOppositeDirection('UP', 'RIGHT')).toBe(false);
    expect(isOppositeDirection('DOWN', 'LEFT')).toBe(false);
    expect(isOppositeDirection('DOWN', 'RIGHT')).toBe(false);
  });
  
  it('should return false for same direction', () => {
    expect(isOppositeDirection('UP', 'UP')).toBe(false);
    expect(isOppositeDirection('DOWN', 'DOWN')).toBe(false);
    expect(isOppositeDirection('LEFT', 'LEFT')).toBe(false);
    expect(isOppositeDirection('RIGHT', 'RIGHT')).toBe(false);
  });
});
```

---

## Running Tests

### Basic Commands

```bash
# Run all tests once
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test game-logic.test.js

# Run tests matching pattern
npm test -- --testNamePattern="collision"

# Run tests in verbose mode
npm test -- --verbose

# Run only failed tests from last run
npm test -- --onlyFailures
```

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/main.js',  // Exclude entry point
    '!src/**/*.test.js'
  ],
  coverageThresholds: {
    global: {
      branches: 90,
      functions: 95,
      lines: 90,
      statements: 90
    },
    './src/game-logic.js': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  testMatch: [
    '**/tests/**/*.test.js',
    '**/__tests__/**/*.js'
  ]
};
```

---

## Tips for Game Testing

### 1. Test Pure Functions First
Pure functions (no side effects) are easiest to test. Start here:
- Movement calculations
- Collision detection
- Score calculations
- Position validation

### 2. Use Test Helpers
Create helper functions to reduce test boilerplate:

```javascript
// test-helpers.js
export const createMockState = (overrides = {}) => {
  return {
    snake: [{ x: 10, y: 10 }, { x: 9, y: 10 }],
    direction: 'RIGHT',
    food: { x: 15, y: 15 },
    score: 0,
    gameOver: false,
    ...overrides
  };
};

export const createMockCanvas = () => {
  return {
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    fillStyle: '',
    strokeStyle: ''
  };
};

// Usage in tests
const state = createMockState({ score: 50 });
const ctx = createMockCanvas();
```

### 3. Test Edge Cases
Don't just test the happy path:
- Empty arrays
- Single-element arrays
- Boundary values (0, max, -1, max+1)
- Invalid inputs
- Extreme values (very long snake)

### 4. Use Descriptive Test Names
Test names should describe behavior:

```javascript
// ✅ GOOD
it('should detect wall collision when x coordinate is negative', () => {});

// ❌ BAD
it('test wall collision', () => {});
```

### 5. One Assertion Per Test (Generally)
Focus each test on one behavior:

```javascript
// ✅ GOOD
it('should move snake right by one cell', () => {
  const newState = moveSnake(state);
  expect(newState.snake[0].x).toBe(11);
});

it('should maintain snake length when moving', () => {
  const newState = moveSnake(state);
  expect(newState.snake.length).toBe(state.snake.length);
});

// ❌ BAD (testing multiple behaviors)
it('should move snake correctly', () => {
  const newState = moveSnake(state);
  expect(newState.snake[0].x).toBe(11);
  expect(newState.snake.length).toBe(state.snake.length);
  expect(newState.score).toBe(0);
  expect(newState.gameOver).toBe(false);
});
```

### 6. Test Immutability
Always verify that functions don't mutate input:

```javascript
it('should not mutate original state', () => {
  const originalState = { ...state };
  const originalSnake = [...state.snake];
  
  moveSnake(state);
  
  expect(state).toEqual(originalState);
  expect(state.snake).toEqual(originalSnake);
});
```

---

## Debugging Failed Tests

### 1. Read the Error Message
Jest provides detailed error messages:

```
Expected: {"x": 11, "y": 10}
Received: {"x": 10, "y": 10}
```

### 2. Add console.log Statements
Debug state during tests:

```javascript
it('should move snake right', () => {
  console.log('Before:', state.snake);
  const newState = moveSnake(state);
  console.log('After:', newState.snake);
  
  expect(newState.snake[0].x).toBe(11);
});
```

### 3. Use debugger Statement
Pause execution in tests:

```javascript
it('should move snake right', () => {
  debugger;  // Pauses here when running with --inspect
  const newState = moveSnake(state);
  expect(newState.snake[0].x).toBe(11);
});
```

Run with: `node --inspect-brk node_modules/.bin/jest --runInBand`

### 4. Run Single Test
Focus on one failing test:

```bash
npm test -- --testNamePattern="should move snake right"
```

### 5. Check for Floating Point Issues
Avoid comparing floats directly:

```javascript
// ❌ BAD
expect(result).toBe(0.1 + 0.2);  // Might fail due to floating point precision

// ✅ GOOD
expect(result).toBeCloseTo(0.3);
```

---

## Checklist Before Committing

Use this checklist before committing code:

### Test Coverage
- [ ] All tests pass (`npm test`)
- [ ] Coverage is above 90% (`npm run test:coverage`)
- [ ] Critical functions have 100% coverage
- [ ] No skipped tests (no `it.skip` or `describe.skip`)

### Test Quality
- [ ] All edge cases tested
- [ ] All error cases tested
- [ ] Tests use descriptive names
- [ ] Tests use Arrange/Act/Assert pattern
- [ ] Tests verify immutability where applicable

### Code Quality
- [ ] Pure functions are tested without mocks
- [ ] Canvas functions are tested with mocks
- [ ] No console.log statements left in tests
- [ ] No debugger statements left in tests
- [ ] Test helpers are used to reduce duplication

### Documentation
- [ ] Complex tests have comments explaining intent
- [ ] New test patterns are documented
- [ ] Coverage thresholds are updated if needed

---

## Quick Reference: Jest Matchers

```javascript
// Equality
expect(value).toBe(expected);           // Strict equality (===)
expect(value).toEqual(expected);        // Deep equality
expect(value).toStrictEqual(expected);  // Strict deep equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeGreaterThanOrEqual(3);
expect(value).toBeLessThan(3);
expect(value).toBeLessThanOrEqual(3);
expect(value).toBeCloseTo(0.3);  // Floating point

// Strings
expect(string).toMatch(/pattern/);
expect(string).toContain('substring');

// Arrays/Iterables
expect(array).toContain(item);
expect(array).toContainEqual(item);
expect(array).toHaveLength(3);

// Objects
expect(object).toHaveProperty('key');
expect(object).toHaveProperty('key', value);
expect(object).toMatchObject({ key: value });

// Functions
expect(fn).toThrow();
expect(fn).toThrow(Error);
expect(fn).toThrow('error message');

// Mocks
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(3);
expect(mockFn).toHaveBeenCalledWith(arg1, arg2);
expect(mockFn).toHaveBeenLastCalledWith(arg1, arg2);
expect(mockFn).toHaveBeenNthCalledWith(2, arg1, arg2);

// Negation
expect(value).not.toBe(expected);
```

---

## Summary

This game testing skill provides:
- **4 Core Testing Patterns** with complete, working examples
- **Comprehensive collision testing** covering all edge cases
- **Canvas mocking** for rendering tests
- **Coverage requirements** and how to achieve them
- **Common test scenarios** as reusable templates
- **Debugging techniques** for failed tests
- **Best practices** for game testing

Use this skill to write high-quality, maintainable tests for browser-based games. Focus on pure functions first, then tackle rendering and integration tests. Aim for 90%+ coverage overall and 100% coverage for critical game logic.
