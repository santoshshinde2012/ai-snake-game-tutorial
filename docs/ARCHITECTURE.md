# Architecture Guide

This document provides a comprehensive overview of the AI Snake Game architecture, including system design, data flow, algorithms, and design patterns.

## Table of Contents

1. [High-Level Overview](#high-level-overview)
2. [Module Breakdown](#module-breakdown)
3. [Data Flow](#data-flow)
4. [State Management](#state-management)
5. [Game Loop Architecture](#game-loop-architecture)
6. [Coordinate System](#coordinate-system)
7. [Collision Detection](#collision-detection)
8. [Rendering Pipeline](#rendering-pipeline)
9. [Input System](#input-system)
10. [Design Patterns](#design-patterns)
11. [Performance Considerations](#performance-considerations)
12. [Future Extensibility](#future-extensibility)

## High-Level Overview

The AI Snake Game follows a classic **game loop architecture** with clear separation of concerns across four main modules:

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    index.html                         │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐  │  │
│  │  │   Canvas    │  │  Start Btn   │  │  Score      │  │  │
│  │  │   Element   │  │              │  │  Display    │  │  │
│  │  └─────────────┘  └──────────────┘  └─────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                           ▲                                 │
│                           │                                 │
│  ┌────────────────────────┴────────────────────────────┐   │
│  │                     main.js                         │   │
│  │              (Application Entry Point)              │   │
│  │  • Initializes all components                       │   │
│  │  • Wires up event listeners                         │   │
│  │  • Starts game loop                                 │   │
│  └────┬──────────────┬──────────────┬─────────────────┘   │
│       │              │              │                      │
│  ┌────▼─────┐  ┌────▼─────┐  ┌─────▼──────┐              │
│  │ game.js  │  │input.js  │  │renderer.js │              │
│  │  (Core   │  │ (Input   │  │ (Visual    │              │
│  │  Logic)  │  │ Handler) │  │ Rendering) │              │
│  └──────────┘  └──────────┘  └────────────┘              │
└─────────────────────────────────────────────────────────────┘
```

### Architectural Principles

1. **Separation of Concerns**: Each module has a single, well-defined responsibility
2. **Unidirectional Data Flow**: Data flows from game state → renderer
3. **Event-Driven Input**: User input triggers state changes through events
4. **Testability**: Pure functions and dependency injection enable easy testing
5. **Modularity**: Components can be developed and tested independently

## Module Breakdown

### 1. game.js - Core Game Logic

**Responsibility**: Manages all game state and rules.

**Key Components**:

```javascript
class Game {
  constructor(width, height)
  reset()
  update()
  changeDirection(direction)
  getState()
  isGameOver()
  getScore()
}
```

**State Management**:
```javascript
{
  snake: [
    { x: 10, y: 10 },  // Head
    { x: 9, y: 10 },   // Body segment
    { x: 8, y: 10 }    // Tail
  ],
  food: { x: 15, y: 15 },
  direction: { x: 1, y: 0 },  // Moving right
  nextDirection: { x: 1, y: 0 },
  gameOver: false,
  score: 0,
  width: 20,   // Grid width
  height: 20   // Grid height
}
```

**Key Algorithms**:

1. **Snake Movement** (O(n) where n = snake length):
```javascript
update() {
  // Calculate new head position
  const head = this.snake[0];
  const newHead = {
    x: head.x + this.direction.x,
    y: head.y + this.direction.y
  };
  
  // Add new head
  this.snake.unshift(newHead);
  
  // Remove tail (unless food eaten)
  if (!this.checkFoodCollision(newHead)) {
    this.snake.pop();
  } else {
    this.spawnFood();
    this.score++;
  }
  
  // Check collisions
  if (this.checkCollision(newHead)) {
    this.gameOver = true;
  }
}
```

2. **Direction Validation**:
```javascript
changeDirection(direction) {
  // Prevent 180-degree turns (snake can't reverse)
  const opposite = 
    (direction.x === -this.direction.x && direction.y === 0) ||
    (direction.y === -this.direction.y && direction.x === 0);
  
  if (!opposite) {
    this.nextDirection = direction;
  }
}
```

**Design Decisions**:

- **Double-buffered direction**: `direction` and `nextDirection` prevent multiple direction changes within a single frame
- **Grid-based coordinates**: Simplifies collision detection and rendering
- **Immutable state access**: `getState()` returns a snapshot to prevent external mutations

### 2. renderer.js - Visual Rendering

**Responsibility**: Translates game state into visual output on canvas.

**Key Components**:

```javascript
class Renderer {
  constructor(canvas, cellSize)
  render(gameState)
  clear()
  drawSnake(snake)
  drawFood(food)
  drawGrid()  // Optional
}
```

**Rendering Pipeline**:

```
Game State → Renderer → Canvas API → Browser Display

  getState()
     │
     ▼
  render(state)
     │
     ├─→ clear()          : Fill background
     ├─→ drawGrid()       : Draw grid lines (optional)
     ├─→ drawFood()       : Draw red square
     └─→ drawSnake()      : Draw green segments
            │
            └─→ drawSegment() for each segment
```

**Coordinate Transformation**:

```javascript
// Grid coordinates → Screen coordinates
function gridToScreen(gridX, gridY, cellSize) {
  return {
    screenX: gridX * cellSize,
    screenY: gridY * cellSize
  };
}

// Example: Grid (5, 3) with cellSize 20px
// Screen: (100, 60) in pixels
```

**Drawing Implementation**:

```javascript
drawSnake(snake) {
  snake.forEach((segment, index) => {
    // Head is lighter green
    this.ctx.fillStyle = index === 0 ? '#00ff00' : '#00cc00';
    
    this.ctx.fillRect(
      segment.x * this.cellSize,
      segment.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
    
    // Add border for visual clarity
    this.ctx.strokeStyle = '#006600';
    this.ctx.strokeRect(
      segment.x * this.cellSize,
      segment.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  });
}
```

**Performance Optimizations**:

1. **Double Buffering**: Canvas automatically double-buffers
2. **Dirty Region Tracking**: Could be added for very large grids
3. **RequestAnimationFrame Sync**: Rendering tied to browser refresh rate

### 3. input.js - Input Handling

**Responsibility**: Captures user input and translates to game commands.

**Key Components**:

```javascript
class InputHandler {
  constructor()
  onKeyPress(callback)
  onStartGame(callback)
  cleanup()
  
  // Private
  handleKeyPress(event)
  mapKeyToDirection(key)
}
```

**Input Flow**:

```
Keyboard Event
     │
     ▼
Browser Event Listener
     │
     ▼
InputHandler.handleKeyPress()
     │
     ├─→ Validate key (is arrow key?)
     ├─→ Prevent default (stop page scroll)
     └─→ Map to direction vector
            │
            ▼
     Invoke callback with direction
            │
            ▼
     Game.changeDirection(direction)
```

**Key Mapping**:

```javascript
const KEY_MAPPINGS = {
  'ArrowUp':    { x: 0,  y: -1 },
  'ArrowDown':  { x: 0,  y: 1  },
  'ArrowLeft':  { x: -1, y: 0  },
  'ArrowRight': { x: 1,  y: 0  }
};
```

**Event Handling Pattern**:

```javascript
// Setup
this.keyPressCallback = null;
this.boundHandleKeyPress = this.handleKeyPress.bind(this);
document.addEventListener('keydown', this.boundHandleKeyPress);

// Cleanup (important for memory leaks)
cleanup() {
  document.removeEventListener('keydown', this.boundHandleKeyPress);
}
```

**Edge Cases Handled**:

1. Multiple rapid key presses (only one per frame counts)
2. Invalid keys (ignored)
3. Page scrolling with arrow keys (prevented)
4. Game not started yet (input ignored until game starts)

### 4. main.js - Application Entry Point

**Responsibility**: Initialize and coordinate all components.

**Key Components**:

```javascript
// Module initialization
let game;
let renderer;
let inputHandler;
let gameLoop;

// Lifecycle
function init()
function startGame()
function gameLoop()
function stopGame()
function updateScore()
```

**Initialization Flow**:

```
Page Load
    │
    ▼
DOMContentLoaded Event
    │
    ▼
init()
    │
    ├─→ Get canvas element
    ├─→ Create Game instance
    ├─→ Create Renderer instance
    ├─→ Create InputHandler instance
    ├─→ Wire up event listeners
    └─→ Render initial state
```

**Game Loop Implementation**:

```javascript
function gameLoop() {
  // 1. Update game state
  game.update();
  
  // 2. Check game over
  if (game.isGameOver()) {
    stopGame();
    return;
  }
  
  // 3. Render new state
  renderer.render(game.getState());
  
  // 4. Update UI
  updateScore();
  
  // 5. Schedule next frame
  // (handled by setInterval in startGame)
}
```

**Component Wiring**:

```javascript
// Input → Game
inputHandler.onKeyPress((direction) => {
  game.changeDirection(direction);
});

// Button → Game
inputHandler.onStartGame(() => {
  startGame();
});

// Game → Renderer (in loop)
renderer.render(game.getState());
```

## Data Flow

### Unidirectional Data Flow

```
┌─────────────────────────────────────────────────────┐
│                   User Input                        │
│             (Keyboard / Button Click)               │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│                 InputHandler                        │
│         Translates input to commands                │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│                    Game                             │
│           Processes command → Updates state         │
│  ┌────────────────────────────────────────────┐    │
│  │  State: snake, food, direction, score      │    │
│  └────────────────────────────────────────────┘    │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│                  Renderer                           │
│         Reads state → Draws to canvas               │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│                    Display                          │
│              User sees updated game                 │
└─────────────────────────────────────────────────────┘
```

### State Update Sequence Diagram

```
User        InputHandler     Game           Renderer      Canvas
 │               │            │                │            │
 │─ Press Key ──>│            │                │            │
 │               │            │                │            │
 │               │─ callback ─>│                │            │
 │               │            │                │            │
 │               │            │─ validate      │            │
 │               │            │  direction     │            │
 │               │            │                │            │
 │               │            │─ update        │            │
 │               │            │  nextDirection │            │
 │               │            │                │            │
 │               │<────────────│                │            │
 │               │            │                │            │
 │         [ Game Loop Tick ]                  │            │
 │               │            │                │            │
 │               │            │─ update()      │            │
 │               │            │  - move snake  │            │
 │               │            │  - check food  │            │
 │               │            │  - check collision          │
 │               │            │                │            │
 │               │            │─ getState() ───>│            │
 │               │            │                │            │
 │               │            │                │─ clear ───>│
 │               │            │                │            │
 │               │            │                │─ draw ────>│
 │               │            │                │   snake    │
 │               │            │                │            │
 │               │            │                │─ draw ────>│
 │               │            │                │   food     │
 │               │            │                │            │
 │<───────────────────────────────────────────────── render ──│
```

## State Management

### State Structure

```javascript
// Complete game state
const gameState = {
  // Snake representation (array of coordinates)
  snake: [
    { x: 10, y: 10 },  // Index 0: Head
    { x: 9, y: 10 },   // Index 1: Body
    { x: 8, y: 10 }    // Index 2: Tail
  ],
  
  // Food position
  food: { x: 15, y: 15 },
  
  // Current movement direction (applied this frame)
  direction: { x: 1, y: 0 },
  
  // Next direction (applied next frame)
  nextDirection: { x: 1, y: 0 },
  
  // Game status
  gameOver: false,
  
  // Score
  score: 0,
  
  // Grid dimensions
  width: 20,
  height: 20
};
```

### State Transitions

```
Initial State
     │
     ▼
[Waiting for Start]
     │
     │ User clicks "Start"
     ▼
[Game Running]
     │
     ├─→ User presses arrow key
     │   └─→ Update nextDirection
     │
     ├─→ Game loop tick
     │   ├─→ direction = nextDirection
     │   ├─→ Move snake head
     │   ├─→ Check food collision
     │   │   ├─→ Yes: Grow snake, spawn food, increment score
     │   │   └─→ No: Remove tail
     │   └─→ Check wall/self collision
     │       ├─→ Yes: Set gameOver = true
     │       └─→ No: Continue
     │
     └─→ gameOver becomes true
         └─→ [Game Over]
              │
              │ User clicks "Start"
              ▼
         [Game Running]
```

### State Immutability

The game uses **partial immutability**:

```javascript
// External access: Immutable (returns copy)
getState() {
  return {
    snake: [...this.snake],      // Shallow copy
    food: { ...this.food },
    direction: { ...this.direction },
    gameOver: this.gameOver,
    score: this.score
  };
}

// Internal updates: Mutable (for performance)
update() {
  // Direct mutation of internal state
  this.snake.unshift(newHead);
  this.snake.pop();
  this.score++;
}
```

**Rationale**: Internal mutations avoid array copying overhead in the hot path (game loop). External immutability prevents bugs from state corruption.

## Game Loop Architecture

### Loop Structure

```
     ┌──────────────────┐
     │  Start Game      │
     └────────┬─────────┘
              │
              ▼
     ┌──────────────────┐
     │ setInterval()    │────┐ Every 100ms (10 FPS)
     │  gameLoop        │    │
     └────────┬─────────┘    │
              │              │
              ▼              │
     ┌──────────────────┐    │
     │  game.update()   │    │
     └────────┬─────────┘    │
              │              │
              ▼              │
     ┌──────────────────┐    │
     │ Check Game Over? │    │
     └────────┬─────────┘    │
              │              │
         Yes  │  No          │
      ┌───────┴────────┐     │
      ▼                ▼     │
  [Stop Loop]   [Continue]   │
                      │      │
                      ▼      │
              ┌──────────────────┐
              │ renderer.render()│
              └────────┬─────────┘
                       │         │
                       ▼         │
              ┌──────────────────┐
              │  updateScore()   │
              └────────┬─────────┘
                       │         │
                       └─────────┘
```

### Timing Details

```javascript
// Game loop configuration
const FRAME_RATE = 10;  // 10 updates per second
const FRAME_TIME = 1000 / FRAME_RATE;  // 100ms per frame

function startGame() {
  game.reset();
  
  // Fixed timestep game loop
  gameLoop = setInterval(() => {
    // 1. Update game logic
    game.update();
    
    // 2. Check termination condition
    if (game.isGameOver()) {
      stopGame();
      return;
    }
    
    // 3. Render
    renderer.render(game.getState());
    
    // 4. Update UI
    updateScore();
  }, FRAME_TIME);
}
```

### Fixed vs Variable Timestep

This game uses a **fixed timestep**:

```
Fixed Timestep (Current Implementation):
━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━┯━━━━━━
      100ms  100ms  100ms  100ms  ...
      Update Update Update Update

Pros:
✓ Predictable behavior
✓ Deterministic simulation
✓ Simple implementation
✓ Easy to test

Cons:
✗ No frame rate independence
✗ May stutter on slow devices
```

Alternative: **Variable timestep with interpolation**:

```javascript
let lastTime = Date.now();

function gameLoop() {
  const now = Date.now();
  const deltaTime = now - lastTime;
  lastTime = now;
  
  game.update(deltaTime);  // Pass time delta
  renderer.render(game.getState());
  
  requestAnimationFrame(gameLoop);
}
```

### Loop Performance

```
Performance Metrics per Frame (typical):

┌─────────────────────┬──────────┬──────────┐
│ Operation           │ Time     │ % of 100ms│
├─────────────────────┼──────────┼──────────┤
│ game.update()       │ ~0.1ms   │ 0.1%      │
│ collision checks    │ ~0.05ms  │ 0.05%     │
│ renderer.render()   │ ~2-5ms   │ 2-5%      │
│ Canvas drawing      │ ~1-3ms   │ 1-3%      │
│ updateScore()       │ ~0.01ms  │ 0.01%     │
├─────────────────────┼──────────┼──────────┤
│ Total               │ ~5-10ms  │ 5-10%     │
└─────────────────────┴──────────┴──────────┘

Remaining time: ~90-95ms (idle)
```

The game is **highly performant** with significant headroom.

## Coordinate System

### Grid-Based Coordinates

The game uses a **discrete grid system**:

```
Grid Dimensions: 20 × 20
Cell Size: 20 pixels

Grid Coordinate Space:
  (0,0)              (19,0)
    ┌─────────────────┐
    │ ░░▓▓▓           │  y = 0
    │ ░░▓▓▓           │  y = 1
    │                 │
    │                 │
    │                 │
    │                 │
    │                 │
    │                 │
    │                 │
    │            ●    │  ● = food
    │                 │
    └─────────────────┘
  (0,19)           (19,19)

  x →
  
░ = Snake segment
▓ = Snake head
● = Food
```

### Coordinate Properties

1. **Origin**: Top-left corner (0, 0)
2. **X-axis**: Left to right (0 to width-1)
3. **Y-axis**: Top to bottom (0 to height-1)
4. **Positive X**: Right direction
5. **Positive Y**: Down direction

### Direction Vectors

```javascript
const DIRECTIONS = {
  UP:    { x: 0,  y: -1 },  // Decrease Y
  DOWN:  { x: 0,  y: 1  },  // Increase Y
  LEFT:  { x: -1, y: 0  },  // Decrease X
  RIGHT: { x: 1,  y: 0  }   // Increase X
};
```

### Boundary Checking

```javascript
function isOutOfBounds(pos, width, height) {
  return pos.x < 0 ||        // Left wall
         pos.x >= width ||   // Right wall
         pos.y < 0 ||        // Top wall
         pos.y >= height;    // Bottom wall
}

// Example: width=20, height=20
// Valid X: [0, 19]
// Valid Y: [0, 19]
```

### Grid-to-Screen Transformation

```javascript
// Grid coordinates to pixel coordinates
function gridToPixel(gridPos, cellSize) {
  return {
    x: gridPos.x * cellSize,
    y: gridPos.y * cellSize
  };
}

// Example:
// Grid (5, 10) with cellSize=20
// → Screen (100, 200) pixels

// Drawing a cell:
ctx.fillRect(
  gridPos.x * cellSize,      // X position
  gridPos.y * cellSize,      // Y position
  cellSize,                  // Width
  cellSize                   // Height
);
```

### Wrapping (Not Implemented)

Alternative design: **Toroidal topology** (wrapping):

```javascript
function wrap(pos, width, height) {
  return {
    x: (pos.x + width) % width,    // Wrap X
    y: (pos.y + height) % height   // Wrap Y
  };
}

// Snake at (20, 10) wraps to (0, 10)
// Snake at (-1, 10) wraps to (19, 10)
```

Current implementation uses **bounded grid** (walls kill snake).

## Collision Detection

### Types of Collisions

1. **Wall Collision**: Snake hits grid boundary
2. **Self Collision**: Snake hits its own body
3. **Food Collision**: Snake head touches food

### Wall Collision Algorithm

```javascript
function checkWallCollision(head) {
  return head.x < 0 ||              // Left wall
         head.x >= this.width ||    // Right wall
         head.y < 0 ||              // Top wall
         head.y >= this.height;     // Bottom wall
}

// Time Complexity: O(1)
// Space Complexity: O(1)
```

**Visualization**:

```
Walls:
  x < 0          x >= width
    │              │
────┼──────────────┼────  y < 0
    │              │
    │   Valid      │
    │   Area       │
    │              │
────┼──────────────┼────  y >= height
    │              │
```

### Self Collision Algorithm

```javascript
function checkSelfCollision(head) {
  // Check if head position matches any body segment
  // Skip index 0 (head itself)
  for (let i = 1; i < this.snake.length; i++) {
    if (this.snake[i].x === head.x && 
        this.snake[i].y === head.y) {
      return true;
    }
  }
  return false;
}

// Time Complexity: O(n) where n = snake length
// Space Complexity: O(1)
```

**Optimization**: Use spatial hashing for O(1) collision:

```javascript
class SpatialHash {
  constructor() {
    this.grid = new Map();
  }
  
  insert(pos) {
    const key = `${pos.x},${pos.y}`;
    this.grid.set(key, true);
  }
  
  contains(pos) {
    const key = `${pos.x},${pos.y}`;
    return this.grid.has(key);
  }
  
  clear() {
    this.grid.clear();
  }
}

// Usage:
const hash = new SpatialHash();
this.snake.forEach(segment => hash.insert(segment));
const collision = hash.contains(newHead);

// Time Complexity: O(1) average case
// Space Complexity: O(n) where n = snake length
```

### Food Collision Algorithm

```javascript
function checkFoodCollision(head) {
  return head.x === this.food.x && 
         head.y === this.food.y;
}

// Time Complexity: O(1)
// Space Complexity: O(1)
```

**Collision Tolerance**: Exact coordinate match (no partial overlaps due to grid system).

### Food Spawning Algorithm

```javascript
function spawnFood() {
  let newFood;
  
  // Keep trying until we find an empty cell
  do {
    newFood = {
      x: Math.floor(Math.random() * this.width),
      y: Math.floor(Math.random() * this.height)
    };
  } while (this.isOccupied(newFood));
  
  this.food = newFood;
}

function isOccupied(pos) {
  // Check if position overlaps with snake
  return this.snake.some(segment => 
    segment.x === pos.x && segment.y === pos.y
  );
}

// Worst case: O(n * m) where m = number of attempts
// Average case: O(1) for typical game state
```

**Edge Case**: What if the snake fills the entire grid?

```javascript
function spawnFood() {
  const maxAttempts = 1000;
  let attempts = 0;
  
  do {
    newFood = {
      x: Math.floor(Math.random() * this.width),
      y: Math.floor(Math.random() * this.height)
    };
    attempts++;
    
    if (attempts >= maxAttempts) {
      // Game is won! Snake fills entire grid.
      this.gameWon = true;
      return;
    }
  } while (this.isOccupied(newFood));
  
  this.food = newFood;
}
```

### Collision Detection Flow

```
New Head Position Calculated
         │
         ▼
    ┌─────────────────┐
    │ Check Wall      │───> Collision? ──Yes──> Game Over
    └────────┬────────┘
             │ No
             ▼
    ┌─────────────────┐
    │ Check Self      │───> Collision? ──Yes──> Game Over
    └────────┬────────┘
             │ No
             ▼
    ┌─────────────────┐
    │ Check Food      │───> Collision? ──Yes──> Grow + Spawn Food
    └────────┬────────┘
             │ No
             ▼
    Continue Normal Movement
```

## Rendering Pipeline

### Rendering Order

```
1. Clear Canvas
   ↓
2. Draw Background
   ↓
3. Draw Grid (Optional)
   ↓
4. Draw Food
   ↓
5. Draw Snake
   ├─→ Draw Head (lighter color)
   └─→ Draw Body (darker color)
```

### Canvas Layers

```
Z-Index (Back to Front):

Layer 0: Background (solid color)
   ┌────────────────────────┐
   │  #1a1a1a (dark gray)   │
   └────────────────────────┘

Layer 1: Grid Lines (optional)
   ┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐
   ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
   │ │ │ │ │ │ │ │ │ │ │ │ │
   └─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘

Layer 2: Food
   ┌────────────────────────┐
   │            ●           │  Red square
   └────────────────────────┘

Layer 3: Snake
   ┌────────────────────────┐
   │  ▓▓▓░░░░               │  Green segments
   └────────────────────────┘
```

### Rendering Implementation

```javascript
class Renderer {
  render(gameState) {
    // 1. Clear previous frame
    this.clear();
    
    // 2. Draw food
    this.drawFood(gameState.food);
    
    // 3. Draw snake
    this.drawSnake(gameState.snake);
  }
  
  clear() {
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  drawFood(food) {
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillRect(
      food.x * this.cellSize,
      food.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }
  
  drawSnake(snake) {
    snake.forEach((segment, index) => {
      // Head is brighter
      this.ctx.fillStyle = index === 0 ? '#00ff00' : '#00cc00';
      
      this.ctx.fillRect(
        segment.x * this.cellSize,
        segment.y * this.cellSize,
        this.cellSize,
        this.cellSize
      );
    });
  }
}
```

### Double Buffering

Canvas API automatically provides double buffering:

```
Front Buffer (Visible)    Back Buffer (Drawing)
      │                          │
      │                          │
      ▼                          ▼
  ┌────────┐                ┌────────┐
  │ Frame  │                │ Frame  │
  │   N    │                │  N+1   │
  │        │                │ (WIP)  │
  └────────┘                └────────┘
      │                          │
      │    VSync (Swap Buffers)  │
      └──────────────────────────┘
```

No manual double buffering needed!

### Visual Enhancements (Optional)

```javascript
// Add shadows
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
ctx.shadowBlur = 5;
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;

// Add gradients
const gradient = ctx.createLinearGradient(0, 0, cellSize, cellSize);
gradient.addColorStop(0, '#00ff00');
gradient.addColorStop(1, '#00aa00');
ctx.fillStyle = gradient;

// Add rounded corners
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}
```

## Input System

### Event Flow

```
User Action (Keyboard)
    │
    ▼
Browser KeyboardEvent
    │
    ▼
Document Event Listener
    │
    ▼
InputHandler.handleKeyPress()
    │
    ├─→ Validate key
    ├─→ Prevent default behavior
    └─→ Map to direction
         │
         ▼
    Invoke registered callback
         │
         ▼
    Game.changeDirection()
```

### Input Buffering

```javascript
// Problem: Multiple inputs per frame
Frame N: ← ↑ (user presses left then up quickly)
         Only ↑ is processed!

// Solution: Input queue
class InputHandler {
  constructor() {
    this.inputQueue = [];
  }
  
  handleKeyPress(event) {
    const direction = this.mapKeyToDirection(event.key);
    if (direction) {
      this.inputQueue.push(direction);
    }
  }
  
  getNextInput() {
    return this.inputQueue.shift();  // FIFO
  }
}

// Game loop processes queue
update() {
  while (inputHandler.inputQueue.length > 0) {
    const direction = inputHandler.getNextInput();
    this.changeDirection(direction);
  }
  // ... rest of update
}
```

### Debouncing

Prevent input spam:

```javascript
class InputHandler {
  constructor() {
    this.lastInputTime = 0;
    this.inputDelay = 50;  // 50ms between inputs
  }
  
  handleKeyPress(event) {
    const now = Date.now();
    if (now - this.lastInputTime < this.inputDelay) {
      return;  // Ignore rapid inputs
    }
    
    this.lastInputTime = now;
    // Process input...
  }
}
```

### Cleanup Pattern

Important for single-page applications:

```javascript
class InputHandler {
  constructor() {
    // Store bound function reference
    this.boundHandleKeyPress = this.handleKeyPress.bind(this);
    document.addEventListener('keydown', this.boundHandleKeyPress);
  }
  
  cleanup() {
    // Remove listener to prevent memory leaks
    document.removeEventListener('keydown', this.boundHandleKeyPress);
  }
}

// Usage:
window.addEventListener('beforeunload', () => {
  inputHandler.cleanup();
});
```

## Design Patterns

### 1. Module Pattern

Each file exports a class/functions:

```javascript
// game.js
export class Game { /* ... */ }

// main.js
import { Game } from './game.js';
```

### 2. Observer Pattern (Callbacks)

```javascript
// Input notifies game via callback
inputHandler.onKeyPress((direction) => {
  game.changeDirection(direction);
});

// Implementation:
class InputHandler {
  onKeyPress(callback) {
    this.keyPressCallback = callback;
  }
  
  handleKeyPress(event) {
    if (this.keyPressCallback) {
      this.keyPressCallback(direction);
    }
  }
}
```

### 3. State Pattern

Game states:

```javascript
const GameState = {
  INITIAL: 'initial',
  RUNNING: 'running',
  PAUSED: 'paused',
  GAME_OVER: 'game_over'
};

class Game {
  constructor() {
    this.state = GameState.INITIAL;
  }
  
  update() {
    if (this.state !== GameState.RUNNING) return;
    // ... update logic
  }
}
```

### 4. Facade Pattern

`main.js` provides simple API:

```javascript
// Complex subsystems
const game = new Game(20, 20);
const renderer = new Renderer(canvas, 20);
const inputHandler = new InputHandler();

// Simple facade
function startGame() { /* orchestrates everything */ }
function stopGame() { /* cleans up everything */ }
```

### 5. Singleton Pattern (Implicit)

Only one instance of each component:

```javascript
let game;        // Single game instance
let renderer;    // Single renderer instance
let inputHandler; // Single input handler instance
```

### 6. Strategy Pattern (Potential)

Different AI strategies:

```javascript
class RandomAI {
  getDirection(gameState) {
    const dirs = [UP, DOWN, LEFT, RIGHT];
    return dirs[Math.floor(Math.random() * dirs.length)];
  }
}

class SmartAI {
  getDirection(gameState) {
    // Pathfinding to food
    return this.findPathToFood(gameState);
  }
}

// Usage:
game.setAI(new SmartAI());
```

## Performance Considerations

### Current Performance Profile

```
Game Loop (10 Hz):
├─ Game Update: ~0.1-0.2ms
├─ Collision Checks: ~0.05ms (O(n) for self-collision)
├─ Rendering: ~2-5ms
│  ├─ Clear canvas: ~0.5ms
│  ├─ Draw food: ~0.1ms
│  └─ Draw snake: ~1-4ms (depends on length)
└─ UI Update: ~0.01ms

Total per frame: ~5-10ms (out of 100ms budget)
CPU utilization: ~5-10%
```

### Optimization Strategies

#### 1. Spatial Hashing for Collision

```javascript
// Current: O(n) collision check
function checkSelfCollision(head) {
  for (let i = 1; i < this.snake.length; i++) {
    if (this.snake[i].x === head.x && this.snake[i].y === head.y) {
      return true;
    }
  }
  return false;
}

// Optimized: O(1) average case
class Game {
  constructor() {
    this.occupiedCells = new Set();
  }
  
  update() {
    // Rebuild hash each frame
    this.occupiedCells.clear();
    this.snake.forEach(segment => {
      this.occupiedCells.add(`${segment.x},${segment.y}`);
    });
    
    // O(1) collision check
    const key = `${newHead.x},${newHead.y}`;
    if (this.occupiedCells.has(key)) {
      this.gameOver = true;
    }
  }
}
```

#### 2. Dirty Rectangle Rendering

Only redraw changed regions:

```javascript
class Renderer {
  render(gameState, previousState) {
    // Only redraw cells that changed
    const changedCells = this.findDifferences(gameState, previousState);
    
    changedCells.forEach(cell => {
      this.clearCell(cell);
      this.drawCell(cell);
    });
  }
}
```

#### 3. Object Pooling

Reuse objects instead of creating new ones:

```javascript
class PositionPool {
  constructor(size) {
    this.pool = [];
    for (let i = 0; i < size; i++) {
      this.pool.push({ x: 0, y: 0 });
    }
    this.index = 0;
  }
  
  get() {
    const pos = this.pool[this.index];
    this.index = (this.index + 1) % this.pool.length;
    return pos;
  }
}

// Usage:
const pool = new PositionPool(1000);
const newHead = pool.get();
newHead.x = head.x + direction.x;
newHead.y = head.y + direction.y;
```

#### 4. Canvas Layering

Separate static and dynamic content:

```html
<canvas id="background"></canvas>  <!-- Static grid -->
<canvas id="game"></canvas>        <!-- Dynamic game elements -->
```

```javascript
// Draw grid once
backgroundCtx.drawGrid();

// Only redraw game layer each frame
gameCtx.clear();
gameCtx.drawSnake();
gameCtx.drawFood();
```

### Memory Usage

```
Estimated Memory Footprint:

Game State:
├─ Snake array: ~8 bytes × length × 2 (x,y)
│  Example: 100 segments = 1.6 KB
├─ Food: 16 bytes (1 object)
├─ Direction: 16 bytes (1 object)
└─ Other state: ~100 bytes

Canvas:
└─ Pixel buffer: width × height × 4 bytes
   Example: 400×400 = 640 KB

Total: ~650 KB (minimal)
```

## Future Extensibility

### Planned Extensions

#### 1. Difficulty Levels

```javascript
const DIFFICULTY = {
  EASY: { speed: 150, initialLength: 3 },
  MEDIUM: { speed: 100, initialLength: 3 },
  HARD: { speed: 50, initialLength: 5 }
};

class Game {
  constructor(width, height, difficulty = DIFFICULTY.MEDIUM) {
    this.difficulty = difficulty;
    this.speed = difficulty.speed;
    // ...
  }
}
```

#### 2. Power-ups

```javascript
class Game {
  constructor() {
    this.powerUps = [];
  }
  
  spawnPowerUp() {
    this.powerUps.push({
      position: this.randomEmptyCell(),
      type: 'speed_boost',  // or 'slow', 'invincible', etc.
      duration: 5000  // ms
    });
  }
  
  checkPowerUpCollision(head) {
    this.powerUps = this.powerUps.filter(powerUp => {
      if (this.collides(head, powerUp.position)) {
        this.applyPowerUp(powerUp);
        return false;  // Remove collected power-up
      }
      return true;
    });
  }
}
```

#### 3. Obstacles

```javascript
class Game {
  constructor() {
    this.obstacles = [];
    this.generateObstacles();
  }
  
  generateObstacles() {
    const count = 5;
    for (let i = 0; i < count; i++) {
      this.obstacles.push(this.randomEmptyCell());
    }
  }
  
  checkObstacleCollision(head) {
    return this.obstacles.some(obstacle =>
      obstacle.x === head.x && obstacle.y === head.y
    );
  }
}
```

#### 4. Multiplayer

```javascript
class Game {
  constructor() {
    this.players = [
      new Snake({ x: 5, y: 10 }, 'green'),
      new Snake({ x: 15, y: 10 }, 'blue')
    ];
  }
  
  update() {
    this.players.forEach(player => {
      player.update();
      if (this.checkCollision(player)) {
        player.gameOver = true;
      }
    });
  }
}

class Snake {
  constructor(startPos, color) {
    this.body = [startPos];
    this.color = color;
    this.gameOver = false;
  }
}
```

#### 5. High Score Persistence

```javascript
class ScoreManager {
  saveScore(score) {
    const scores = this.getHighScores();
    scores.push({ score, date: Date.now() });
    scores.sort((a, b) => b.score - a.score);
    scores.splice(10);  // Keep top 10
    
    localStorage.setItem('highScores', JSON.stringify(scores));
  }
  
  getHighScores() {
    const data = localStorage.getItem('highScores');
    return data ? JSON.parse(data) : [];
  }
}
```

#### 6. AI Player

```javascript
class PathfindingAI {
  constructor(game) {
    this.game = game;
  }
  
  getNextMove() {
    const head = this.game.snake[0];
    const food = this.game.food;
    
    // A* pathfinding
    const path = this.findPath(head, food);
    if (path.length > 1) {
      return this.calculateDirection(head, path[1]);
    }
    
    // Fallback: avoid collision
    return this.avoidCollision(head);
  }
  
  findPath(start, goal) {
    // A* implementation
    // ...
  }
}
```

### Architecture for Extensions

```
Current Architecture:

┌──────────┐  ┌──────────┐  ┌──────────┐
│   Game   │  │ Renderer │  │  Input   │
└──────────┘  └──────────┘  └──────────┘

Extensible Architecture:

┌─────────────────────────────────────────┐
│              Game Engine                │
├─────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │  Entity  │  │  System  │  │Physics ││
│  │  Manager │  │  Manager │  │ Engine ││
│  └──────────┘  └──────────┘  └────────┘│
└─────────────────────────────────────────┘
         ▲
         │
    ┌────┴────┐
    │  Game   │
    └─────────┘
```

Entity-Component-System (ECS) pattern for better extensibility.

### Plugin System

```javascript
class PluginManager {
  constructor(game) {
    this.game = game;
    this.plugins = [];
  }
  
  register(plugin) {
    plugin.init(this.game);
    this.plugins.push(plugin);
  }
  
  update() {
    this.plugins.forEach(plugin => plugin.update());
  }
}

// Example plugin
class ParticleEffectPlugin {
  init(game) {
    this.game = game;
    this.particles = [];
  }
  
  update() {
    // Update and render particles
  }
  
  onFoodEaten(position) {
    // Spawn particles at food location
  }
}
```

---

## Summary

The AI Snake Game uses a **modular, event-driven architecture** with:

- **Clear separation of concerns** across four main modules
- **Unidirectional data flow** from input → state → rendering
- **Fixed timestep game loop** running at 10 Hz
- **Grid-based coordinate system** for simplicity
- **Efficient collision detection** with opportunities for optimization
- **Canvas-based rendering** with potential for enhancement
- **Event-driven input handling** with cleanup patterns
- **Extensible design** supporting future features

The architecture prioritizes **simplicity, testability, and maintainability** while leaving room for growth and optimization as needed.
