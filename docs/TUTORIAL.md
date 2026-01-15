# AI Snake Game Tutorial

A comprehensive, step-by-step tutorial for building a snake game with AI-assisted development tools and patterns.

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Learning Objectives](#learning-objectives)
4. [Tutorial Structure](#tutorial-structure)
5. [Chapter 1: Project Setup](#chapter-1-project-setup)
6. [Chapter 2: Understanding the Game Loop](#chapter-2-understanding-the-game-loop)
7. [Chapter 3: Implementing Core Game Logic](#chapter-3-implementing-core-game-logic)
8. [Chapter 4: Adding Collision Detection](#chapter-4-adding-collision-detection)
9. [Chapter 5: Rendering with Canvas](#chapter-5-rendering-with-canvas)
10. [Chapter 6: Input Handling](#chapter-6-input-handling)
11. [Chapter 7: Writing Tests](#chapter-7-writing-tests)
12. [Chapter 8: Setting up AGENTS.md](#chapter-8-setting-up-agentsmd)
13. [Chapter 9: Configuring Ruler](#chapter-9-configuring-ruler)
14. [Chapter 10: Creating Agent Skills](#chapter-10-creating-agent-skills)
15. [Next Steps](#next-steps)
16. [FAQ](#faq)

## Introduction

Welcome to the AI Snake Game Tutorial! This comprehensive guide will teach you how to build a classic snake game from scratch while learning modern AI-assisted development patterns.

### What You'll Build

By the end of this tutorial, you'll have created:

```
A browser-based snake game with:
├─ Classic snake gameplay mechanics
├─ Canvas-based rendering
├─ Keyboard controls
├─ Score tracking
├─ Collision detection
├─ Comprehensive test suite
├─ AI-ready documentation (AGENTS.md)
├─ Context synchronization (Ruler)
└─ Reusable agent skills
```

### Why This Tutorial?

This isn't just another "build a snake game" tutorial. It teaches:

1. **Clean Architecture**: Separation of concerns, modularity
2. **Test-Driven Development**: Writing tests first
3. **AI-Assisted Development**: Using AI tools effectively
4. **Documentation Best Practices**: AGENTS.md pattern
5. **Context Management**: Ruler for tool synchronization
6. **Reusable Skills**: Creating agent skill libraries

### Tutorial Philosophy

```
Learn by Building
      ↓
   Understand Why
      ↓
   Apply Patterns
      ↓
  Build with AI
```

Each chapter includes:
- **Concepts**: What you'll learn
- **Code**: What you'll write
- **Exercises**: What you'll practice
- **AI Prompts**: How to use AI assistants
- **Troubleshooting**: Common issues and solutions

## Prerequisites

### Required Knowledge

- **JavaScript Basics**: Variables, functions, classes
- **HTML/CSS Basics**: Basic structure and styling
- **Command Line**: Running commands in terminal
- **Git**: Basic version control (optional but recommended)

### Don't Need to Know

- Advanced JavaScript patterns (we'll teach them)
- Canvas API (we'll explain as we go)
- Testing frameworks (we'll cover Jest)
- AI tool usage (we'll guide you)

### Required Software

```bash
# Node.js 18+
node --version  # Should output v18.0.0 or higher

# npm (comes with Node.js)
npm --version   # Should output 8.0.0 or higher

# Code Editor
# VS Code recommended (but any editor works)

# Web Browser
# Chrome, Firefox, Safari, or Edge
```

### Optional Software

```bash
# Git (for version control)
git --version

# HTTP Server (for local development)
npm install -g http-server
```

### Installation Help

If you don't have Node.js:
1. Visit [nodejs.org](https://nodejs.org/)
2. Download LTS version
3. Follow installation instructions
4. Restart terminal
5. Verify: `node --version`

## Learning Objectives

By completing this tutorial, you will:

### Technical Skills

- [ ] Build a game loop architecture
- [ ] Implement grid-based collision detection
- [ ] Use HTML5 Canvas for rendering
- [ ] Handle keyboard input events
- [ ] Write unit tests with Jest
- [ ] Structure modular JavaScript applications
- [ ] Use ES6 modules effectively

### AI Development Skills

- [ ] Create effective AGENTS.md documentation
- [ ] Use Ruler for context synchronization
- [ ] Build reusable agent skills
- [ ] Collaborate with AI coding assistants
- [ ] Maintain context across AI sessions
- [ ] Design AI-friendly codebases

### Software Engineering Skills

- [ ] Apply separation of concerns principle
- [ ] Practice test-driven development
- [ ] Document code effectively
- [ ] Structure project files logically
- [ ] Handle errors gracefully
- [ ] Debug systematically

## Tutorial Structure

### Chapter Breakdown

```
Chapters 1-7: Building the Game
├─ 1. Project Setup (20 min)
├─ 2. Game Loop (30 min)
├─ 3. Core Logic (45 min)
├─ 4. Collision Detection (30 min)
├─ 5. Rendering (40 min)
├─ 6. Input Handling (25 min)
└─ 7. Testing (50 min)

Chapters 8-10: AI-Assisted Development
├─ 8. AGENTS.md (40 min)
├─ 9. Ruler (35 min)
└─ 10. Agent Skills (45 min)

Total Time: ~6-7 hours
```

### How to Use This Tutorial

**Linear Approach** (Recommended):
- Follow chapters in order
- Complete all exercises
- Build incrementally

**Modular Approach**:
- Jump to specific chapters
- Focus on topics of interest
- Reference as needed

**AI-Assisted Approach**:
- Use AI assistant alongside tutorial
- Ask AI to explain concepts
- Have AI help with exercises

## Chapter 1: Project Setup

### Goals

- Create project structure
- Initialize npm package
- Set up testing framework
- Create basic HTML/CSS

### Step 1.1: Create Project Directory

```bash
# Create and enter project directory
mkdir ai-snake-game-tutorial
cd ai-snake-game-tutorial
```

### Step 1.2: Initialize Git (Optional)

```bash
# Initialize git repository
git init

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
coverage/
.DS_Store
*.log
EOF
```

### Step 1.3: Initialize npm

```bash
# Create package.json
npm init -y
```

Edit `package.json`:

```json
{
  "name": "ai-snake-game-tutorial",
  "version": "1.0.0",
  "description": "A snake game demonstrating AI-assisted development",
  "main": "src/main.js",
  "type": "module",
  "scripts": {
    "test": "NODE_OPTIONS=--experimental-vm-modules jest",
    "test:watch": "NODE_OPTIONS=--experimental-vm-modules jest --watch",
    "test:coverage": "NODE_OPTIONS=--experimental-vm-modules jest --coverage"
  },
  "keywords": ["game", "snake", "ai", "tutorial"],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0"
  }
}
```

### Step 1.4: Install Dependencies

```bash
# Install Jest for testing
npm install --save-dev jest jest-environment-jsdom
```

### Step 1.5: Configure Jest

Create `jest.config.js`:

```javascript
export default {
  testEnvironment: 'jsdom',
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  testMatch: [
    '**/tests/**/*.test.js',
  ],
};
```

### Step 1.6: Create Directory Structure

```bash
# Create directories
mkdir -p src tests docs

# Create files
touch src/game.js
touch src/renderer.js
touch src/input.js
touch src/main.js
touch tests/game.test.js
touch tests/renderer.test.js
touch tests/input.test.js
touch index.html
touch style.css
```

**Project structure now:**

```
ai-snake-game-tutorial/
├── node_modules/          (created by npm)
├── src/
│   ├── game.js           (empty)
│   ├── renderer.js       (empty)
│   ├── input.js          (empty)
│   └── main.js           (empty)
├── tests/
│   ├── game.test.js      (empty)
│   ├── renderer.test.js  (empty)
│   └── input.test.js     (empty)
├── docs/                 (empty)
├── index.html            (empty)
├── style.css             (empty)
├── package.json
├── jest.config.js
└── .gitignore
```

### Step 1.7: Create Basic HTML

Edit `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Snake Game</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>AI Snake Game</h1>
    
    <div class="game-info">
      <div class="score">
        <span>Score: </span>
        <span id="scoreValue">0</span>
      </div>
      <button id="startButton">Start Game</button>
    </div>
    
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    
    <div class="instructions">
      <h3>How to Play</h3>
      <p>Use arrow keys to move the snake</p>
      <p>Eat the red food to grow and score points</p>
      <p>Don't hit the walls or yourself!</p>
    </div>
  </div>
  
  <script type="module" src="src/main.js"></script>
</body>
</html>
```

### Step 1.8: Create Basic CSS

Edit `style.css`:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.container {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 2.5em;
}

.game-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
}

.score {
  font-size: 1.5em;
  font-weight: bold;
  color: #667eea;
}

#startButton {
  padding: 12px 24px;
  font-size: 1em;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

#startButton:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

#startButton:active {
  transform: translateY(0);
}

#gameCanvas {
  display: block;
  width: 100%;
  height: auto;
  border: 3px solid #333;
  border-radius: 10px;
  background: #1a1a1a;
  margin-bottom: 20px;
}

.instructions {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
}

.instructions h3 {
  color: #333;
  margin-bottom: 10px;
}

.instructions p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 5px;
}
```

### Step 1.9: Verify Setup

```bash
# Run tests (should pass with 0 tests)
npm test

# Expected output:
# No tests found
```

Open `index.html` in browser:
- Should see styled page
- Canvas should display
- Button should be present

### Step 1.10: First Commit (Optional)

```bash
git add .
git commit -m "Initial project setup"
```

### Exercise 1.1: Customize Styling

Modify `style.css` to:
1. Change color scheme
2. Adjust canvas size
3. Add your personal touch

### Exercise 1.2: AI Prompt Practice

Try asking an AI assistant:

```
"I'm building a snake game. Suggest improvements 
to this HTML structure for better accessibility."
```

### Checkpoint 1

You should now have:
- ✅ Project directory created
- ✅ npm initialized with dependencies
- ✅ Jest configured for testing
- ✅ HTML and CSS created
- ✅ Basic page displays in browser

**Ready for Chapter 2!**

## Chapter 2: Understanding the Game Loop

### Goals

- Learn game loop architecture
- Understand fixed timestep
- Implement basic game loop
- Test the loop

### Concept: What is a Game Loop?

A game loop is the heartbeat of any game:

```
Game Loop:
    ┌─────────────┐
    │  Update     │ ← Update game state
    │   State     │
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │   Render    │ ← Draw to screen
    │   Frame     │
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │   Process   │ ← Handle input
    │   Input     │
    └──────┬──────┘
           │
           ▼
      [Repeat]
```

### Step 2.1: Game Loop Skeleton

Edit `src/main.js`:

```javascript
// Game loop configuration
const FRAME_RATE = 10; // 10 frames per second
const FRAME_TIME = 1000 / FRAME_RATE; // 100ms per frame

// Game loop reference
let gameLoopInterval = null;

// Game loop function
function gameLoop() {
  // TODO: Update game state
  console.log('Game loop tick');
  
  // TODO: Render frame
  
  // TODO: Check game over
}

// Start game loop
function startGame() {
  console.log('Starting game...');
  
  // Start interval
  gameLoopInterval = setInterval(gameLoop, FRAME_TIME);
}

// Stop game loop
function stopGame() {
  console.log('Stopping game...');
  
  // Clear interval
  if (gameLoopInterval) {
    clearInterval(gameLoopInterval);
    gameLoopInterval = null;
  }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton');
  
  startButton.addEventListener('click', () => {
    startGame();
  });
});
```

### Step 2.2: Test the Loop

Open `index.html` in browser:
1. Open DevTools Console (F12)
2. Click "Start Game"
3. Should see "Starting game..." 
4. Should see "Game loop tick" every 100ms

### Concept: Fixed vs Variable Timestep

**Fixed Timestep (Our Approach)**:
```
Every 100ms, exactly:
├─ Update game state
└─ Render frame

Pros:
✓ Predictable behavior
✓ Easy to debug
✓ Deterministic physics

Cons:
✗ No frame rate independence
```

**Variable Timestep** (Alternative):
```
Every frame:
├─ Calculate delta time
├─ Update based on delta
└─ Render

Pros:
✓ Frame rate independent
✓ Smooth on all devices

Cons:
✗ Complex implementation
✗ Floating-point accumulation
```

For this tutorial, fixed timestep is simpler and sufficient.

### Step 2.3: Add Loop Control

Enhance `src/main.js`:

```javascript
const FRAME_RATE = 10;
const FRAME_TIME = 1000 / FRAME_RATE;

let gameLoopInterval = null;
let isGameRunning = false;

function gameLoop() {
  if (!isGameRunning) {
    return;
  }
  
  console.log('Game loop tick');
  // Game logic will go here
}

function startGame() {
  console.log('Starting game...');
  
  // Prevent multiple loops
  if (isGameRunning) {
    console.log('Game already running');
    return;
  }
  
  isGameRunning = true;
  gameLoopInterval = setInterval(gameLoop, FRAME_TIME);
}

function stopGame() {
  console.log('Stopping game...');
  
  isGameRunning = false;
  
  if (gameLoopInterval) {
    clearInterval(gameLoopInterval);
    gameLoopInterval = null;
  }
}

// Update button text based on state
function updateButton() {
  const startButton = document.getElementById('startButton');
  startButton.textContent = isGameRunning ? 'Stop Game' : 'Start Game';
}

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton');
  
  startButton.addEventListener('click', () => {
    if (isGameRunning) {
      stopGame();
    } else {
      startGame();
    }
    updateButton();
  });
});
```

### Exercise 2.1: Add FPS Counter

Add an FPS counter to visualize the frame rate:

```javascript
let frameCount = 0;
let lastFpsUpdate = Date.now();

function gameLoop() {
  if (!isGameRunning) return;
  
  frameCount++;
  
  // Update FPS every second
  const now = Date.now();
  if (now - lastFpsUpdate >= 1000) {
    console.log(`FPS: ${frameCount}`);
    frameCount = 0;
    lastFpsUpdate = now;
  }
  
  // Game logic here...
}
```

### Exercise 2.2: Variable Frame Rate

Try changing `FRAME_RATE`:
- Set to 60 (smooth, fast)
- Set to 5 (slow, choppy)
- Find your preferred rate

### Exercise 2.3: AI Prompt Practice

Ask AI:

```
"Explain the trade-offs between fixed timestep 
and variable timestep game loops. When would 
you use each?"
```

### Checkpoint 2

You should now understand:
- ✅ Game loop architecture
- ✅ Fixed timestep implementation
- ✅ Loop start/stop control
- ✅ Frame rate concepts

**Ready for Chapter 3!**

## Chapter 3: Implementing Core Game Logic

### Goals

- Create Game class
- Implement snake movement
- Add food spawning
- Handle game state

### Step 3.1: Game Class Structure

Edit `src/game.js`:

```javascript
export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.reset();
  }
  
  reset() {
    // Initialize snake in center
    const centerX = Math.floor(this.width / 2);
    const centerY = Math.floor(this.height / 2);
    
    this.snake = [
      { x: centerX, y: centerY },
      { x: centerX - 1, y: centerY },
      { x: centerX - 2, y: centerY }
    ];
    
    // Initial direction (moving right)
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    
    // Spawn initial food
    this.food = this.spawnFood();
    
    // Game state
    this.gameOver = false;
    this.score = 0;
  }
  
  spawnFood() {
    // Random position
    return {
      x: Math.floor(Math.random() * this.width),
      y: Math.floor(Math.random() * this.height)
    };
  }
  
  update() {
    if (this.gameOver) {
      return;
    }
    
    // Update direction (double-buffered)
    this.direction = { ...this.nextDirection };
    
    // Calculate new head position
    const head = this.snake[0];
    const newHead = {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y
    };
    
    // Add new head
    this.snake.unshift(newHead);
    
    // Check if food eaten
    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      // Grow snake (don't remove tail)
      this.score++;
      this.food = this.spawnFood();
    } else {
      // Remove tail (snake moves)
      this.snake.pop();
    }
    
    // Collision detection (will implement in Chapter 4)
    // this.checkCollisions(newHead);
  }
  
  changeDirection(newDirection) {
    // Prevent 180-degree turns
    const isOpposite = 
      (newDirection.x === -this.direction.x && newDirection.y === 0) ||
      (newDirection.y === -this.direction.y && newDirection.x === 0);
    
    if (!isOpposite) {
      this.nextDirection = newDirection;
    }
  }
  
  getState() {
    return {
      snake: [...this.snake],
      food: { ...this.food },
      score: this.score,
      gameOver: this.gameOver
    };
  }
  
  isGameOver() {
    return this.gameOver;
  }
  
  getScore() {
    return this.score;
  }
}
```

### Concept: Double-Buffered Direction

Why use both `direction` and `nextDirection`?

```
Problem: Multiple inputs in one frame

Frame N:
  User presses: LEFT
  direction changes to LEFT
  
  User presses: UP (before update)
  direction changes to UP
  
  update() executes with UP
  LEFT input is lost!

Solution: Double buffering

Frame N:
  User presses: LEFT
  nextDirection = LEFT
  
  User presses: UP
  nextDirection = UP (overwrites LEFT)
  
  update() executes:
    direction = nextDirection (UP)
    Move with UP
  
  Next frame processes one direction
```

### Step 3.2: Integrate Game into Main

Edit `src/main.js`:

```javascript
import { Game } from './game.js';

const FRAME_RATE = 10;
const FRAME_TIME = 1000 / FRAME_RATE;
const GRID_SIZE = 20;

let game = null;
let gameLoopInterval = null;
let isGameRunning = false;

function gameLoop() {
  if (!isGameRunning) return;
  
  // Update game state
  game.update();
  
  // Check game over
  if (game.isGameOver()) {
    stopGame();
    alert('Game Over! Score: ' + game.getScore());
    return;
  }
  
  // Update score display
  updateScore();
  
  // Rendering will be added in Chapter 5
  console.log('Snake:', game.getState().snake.length, 'segments');
}

function startGame() {
  console.log('Starting game...');
  
  if (isGameRunning) return;
  
  // Create or reset game
  if (!game) {
    game = new Game(GRID_SIZE, GRID_SIZE);
  } else {
    game.reset();
  }
  
  isGameRunning = true;
  gameLoopInterval = setInterval(gameLoop, FRAME_TIME);
  updateButton();
}

function stopGame() {
  console.log('Stopping game...');
  
  isGameRunning = false;
  
  if (gameLoopInterval) {
    clearInterval(gameLoopInterval);
    gameLoopInterval = null;
  }
  
  updateButton();
}

function updateScore() {
  const scoreElement = document.getElementById('scoreValue');
  scoreElement.textContent = game.getScore();
}

function updateButton() {
  const startButton = document.getElementById('startButton');
  startButton.textContent = isGameRunning ? 'Stop Game' : 'Start Game';
}

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton');
  
  startButton.addEventListener('click', () => {
    if (isGameRunning) {
      stopGame();
    } else {
      startGame();
    }
  });
  
  // Initialize game
  game = new Game(GRID_SIZE, GRID_SIZE);
  updateScore();
});
```

### Step 3.3: Test Core Logic

Open browser console:
1. Click "Start Game"
2. Should see snake length in console
3. Should see snake growing (no collision yet)

### Concept: Grid-Based Coordinates

The game uses a discrete grid:

```
Grid: 20×20

  0   1   2   3  ...  19  (x)
0 ┌───┬───┬───┬───...───┐
1 │   │   │   │   ...   │
2 │   │   │ ▓ │   ...   │  ▓ = Snake
3 │   │   │   │   ...   │
. │   │   │   │   ...   │
. │   │   │   │   ...   │
19└───┴───┴───┴───...───┘
(y)

Each cell: One coordinate (x, y)
Snake head: Cell (x, y)
Food: Cell (x, y)
Movement: Add direction vector to position
```

### Exercise 3.1: Improve Food Spawning

Current problem: Food can spawn on snake!

Fix it:

```javascript
spawnFood() {
  let food;
  let attempts = 0;
  const MAX_ATTEMPTS = 100;
  
  do {
    food = {
      x: Math.floor(Math.random() * this.width),
      y: Math.floor(Math.random() * this.height)
    };
    attempts++;
  } while (this.isOccupied(food) && attempts < MAX_ATTEMPTS);
  
  return food;
}

isOccupied(pos) {
  return this.snake.some(segment => 
    segment.x === pos.x && segment.y === pos.y
  );
}
```

### Exercise 3.2: Add Pause Feature

Add pause/resume capability:

```javascript
class Game {
  constructor(width, height) {
    // ...existing code...
    this.paused = false;
  }
  
  togglePause() {
    this.paused = !this.paused;
  }
  
  update() {
    if (this.gameOver || this.paused) {
      return;
    }
    // ...existing update code...
  }
}
```

### Exercise 3.3: AI Prompt Practice

Ask AI:

```
"Review my snake game logic. Are there any 
edge cases I haven't considered?"
```

### Checkpoint 3

You should now have:
- ✅ Game class with state management
- ✅ Snake movement logic
- ✅ Food spawning
- ✅ Score tracking
- ✅ Direction validation

**Ready for Chapter 4!**

## Chapter 4: Adding Collision Detection

### Goals

- Implement wall collision
- Implement self-collision
- Handle game over state
- Test collision logic

### Concept: Collision Types

```
Collision Types in Snake:

1. Wall Collision
   ┌────────────┐
   │            │
   │    ▓→      │  Snake hits boundary
   │            │
   └─────▼──────┘

2. Self Collision
        ▓▓▓
        ▓ ▓
        ▓▓▓→  Snake head hits body

3. Food Collision
        ▓→ ●  Snake head touches food
```

### Step 4.1: Wall Collision

Add to `src/game.js`:

```javascript
class Game {
  // ...existing code...
  
  checkWallCollision(position) {
    return (
      position.x < 0 ||
      position.x >= this.width ||
      position.y < 0 ||
      position.y >= this.height
    );
  }
  
  update() {
    if (this.gameOver) {
      return;
    }
    
    this.direction = { ...this.nextDirection };
    
    const head = this.snake[0];
    const newHead = {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y
    };
    
    // Check wall collision BEFORE adding new head
    if (this.checkWallCollision(newHead)) {
      this.gameOver = true;
      return;
    }
    
    this.snake.unshift(newHead);
    
    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      this.score++;
      this.food = this.spawnFood();
    } else {
      this.snake.pop();
    }
  }
}
```

### Step 4.2: Self Collision

Add to `src/game.js`:

```javascript
class Game {
  // ...existing code...
  
  checkSelfCollision(position) {
    // Check if position collides with any body segment
    // Skip first segment (it's the head itself)
    for (let i = 1; i < this.snake.length; i++) {
      if (this.snake[i].x === position.x && 
          this.snake[i].y === position.y) {
        return true;
      }
    }
    return false;
  }
  
  update() {
    if (this.gameOver) {
      return;
    }
    
    this.direction = { ...this.nextDirection };
    
    const head = this.snake[0];
    const newHead = {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y
    };
    
    // Check collisions
    if (this.checkWallCollision(newHead)) {
      this.gameOver = true;
      return;
    }
    
    this.snake.unshift(newHead);
    
    // Check self collision AFTER adding new head
    if (this.checkSelfCollision(newHead)) {
      this.gameOver = true;
      return;
    }
    
    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      this.score++;
      this.food = this.spawnFood();
    } else {
      this.snake.pop();
    }
  }
}
```

### Concept: Collision Detection Order

Order matters!

```
Correct Order:
1. Calculate new head position
2. Check wall collision
3. Add new head to snake
4. Check self collision
5. Check food collision
6. Remove tail (if no food)

Why?
- Wall collision: Check before modifying snake
- Self collision: Check after adding head (head can hit body)
- Food collision: Check with new head position
```

### Step 4.3: Test Collisions

Open browser:
1. Start game
2. Let snake hit wall → Should see "Game Over"
3. Restart, grow snake, make it hit itself → Should see "Game Over"

### Exercise 4.1: Optimize Self Collision

Current: O(n) where n = snake length
Better: O(1) using a Set

```javascript
class Game {
  constructor(width, height) {
    // ...existing code...
    this.occupiedCells = new Set();
  }
  
  update() {
    // ...existing code...
    
    // Rebuild occupied cells set
    this.occupiedCells.clear();
    this.snake.forEach(segment => {
      const key = `${segment.x},${segment.y}`;
      this.occupiedCells.add(key);
    });
    
    // Check self collision (O(1))
    const headKey = `${newHead.x},${newHead.y}`;
    if (this.occupiedCells.has(headKey)) {
      this.gameOver = true;
      return;
    }
  }
}
```

### Exercise 4.2: Add Collision Sound

Add sound effects:

```javascript
// In main.js or game.js
function playSound(type) {
  const audio = new Audio();
  
  switch(type) {
    case 'eat':
      // Play eating sound
      audio.src = 'sounds/eat.mp3';
      break;
    case 'collision':
      // Play collision sound
      audio.src = 'sounds/collision.mp3';
      break;
  }
  
  audio.play();
}
```

### Exercise 4.3: AI Prompt Practice

Ask AI:

```
"What are some edge cases in snake game 
collision detection that I should test?"
```

### Checkpoint 4

You should now have:
- ✅ Wall collision detection
- ✅ Self-collision detection
- ✅ Proper collision order
- ✅ Game over state handling

**Ready for Chapter 5!**

## Chapter 5: Rendering with Canvas

### Goals

- Create Renderer class
- Implement canvas drawing
- Render snake and food
- Add visual polish

### Concept: Canvas API Basics

```javascript
// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Draw rectangle
ctx.fillStyle = 'red';
ctx.fillRect(x, y, width, height);

// Draw circle
ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI * 2);
ctx.fill();

// Clear canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);
```

### Step 5.1: Renderer Class

Create `src/renderer.js`:

```javascript
export class Renderer {
  constructor(canvas, cellSize) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.cellSize = cellSize;
    
    // Set canvas size
    const size = cellSize * 20; // 20×20 grid
    this.canvas.width = size;
    this.canvas.height = size;
  }
  
  clear() {
    // Fill background
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  drawSnake(snake) {
    snake.forEach((segment, index) => {
      // Head is brighter
      this.ctx.fillStyle = index === 0 ? '#00ff00' : '#00cc00';
      
      this.ctx.fillRect(
        segment.x * this.cellSize,
        segment.y * this.cellSize,
        this.cellSize - 1, // -1 for grid effect
        this.cellSize - 1
      );
    });
  }
  
  drawFood(food) {
    this.ctx.fillStyle = '#ff0000';
    
    this.ctx.fillRect(
      food.x * this.cellSize,
      food.y * this.cellSize,
      this.cellSize - 1,
      this.cellSize - 1
    );
  }
  
  render(gameState) {
    // Clear previous frame
    this.clear();
    
    // Draw food
    this.drawFood(gameState.food);
    
    // Draw snake
    this.drawSnake(gameState.snake);
  }
}
```

### Step 5.2: Integrate Renderer

Edit `src/main.js`:

```javascript
import { Game } from './game.js';
import { Renderer } from './renderer.js';

const FRAME_RATE = 10;
const FRAME_TIME = 1000 / FRAME_RATE;
const GRID_SIZE = 20;
const CELL_SIZE = 20;

let game = null;
let renderer = null;
let gameLoopInterval = null;
let isGameRunning = false;

function gameLoop() {
  if (!isGameRunning) return;
  
  // Update game state
  game.update();
  
  // Check game over
  if (game.isGameOver()) {
    stopGame();
    alert('Game Over! Score: ' + game.getScore());
    return;
  }
  
  // Render frame
  renderer.render(game.getState());
  
  // Update score display
  updateScore();
}

function startGame() {
  console.log('Starting game...');
  
  if (isGameRunning) return;
  
  // Create or reset game
  if (!game) {
    game = new Game(GRID_SIZE, GRID_SIZE);
  } else {
    game.reset();
  }
  
  // Render initial state
  renderer.render(game.getState());
  
  isGameRunning = true;
  gameLoopInterval = setInterval(gameLoop, FRAME_TIME);
  updateButton();
  updateScore();
}

// ...existing stopGame, updateScore, updateButton...

document.addEventListener('DOMContentLoaded', () => {
  // Get canvas
  const canvas = document.getElementById('gameCanvas');
  
  // Create renderer
  renderer = new Renderer(canvas, CELL_SIZE);
  
  // Create game
  game = new Game(GRID_SIZE, GRID_SIZE);
  
  // Render initial state
  renderer.render(game.getState());
  updateScore();
  
  // Button listener
  const startButton = document.getElementById('startButton');
  startButton.addEventListener('click', () => {
    if (isGameRunning) {
      stopGame();
    } else {
      startGame();
    }
  });
});
```

### Step 5.3: Test Rendering

Open browser:
1. Should see green snake and red food on black background
2. Click "Start Game"
3. Snake should animate smoothly

### Concept: Drawing Order (Z-Index)

```
Drawing order (back to front):

1. Background (black)
   ┌────────────────┐
   │                │
   └────────────────┘

2. Food (red square)
   ┌────────────────┐
   │       ●        │
   └────────────────┘

3. Snake (green)
   ┌────────────────┐
   │  ▓▓▓  ●        │
   └────────────────┘

Later draws appear on top!
```

### Exercise 5.1: Add Grid Lines

Draw grid for visual clarity:

```javascript
class Renderer {
  drawGrid() {
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x <= 20; x++) {
      this.ctx.beginPath();
      this.ctx.moveTo(x * this.cellSize, 0);
      this.ctx.lineTo(x * this.cellSize, this.canvas.height);
      this.ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= 20; y++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y * this.cellSize);
      this.ctx.lineTo(this.canvas.width, y * this.cellSize);
      this.ctx.stroke();
    }
  }
  
  render(gameState) {
    this.clear();
    this.drawGrid(); // Add grid
    this.drawFood(gameState.food);
    this.drawSnake(gameState.snake);
  }
}
```

### Exercise 5.2: Add Visual Polish

Enhance rendering:

```javascript
class Renderer {
  drawSnake(snake) {
    snake.forEach((segment, index) => {
      const x = segment.x * this.cellSize;
      const y = segment.y * this.cellSize;
      const size = this.cellSize - 2;
      
      // Gradient for head
      if (index === 0) {
        const gradient = this.ctx.createLinearGradient(
          x, y, x + size, y + size
        );
        gradient.addColorStop(0, '#00ff00');
        gradient.addColorStop(1, '#00aa00');
        this.ctx.fillStyle = gradient;
      } else {
        this.ctx.fillStyle = '#00cc00';
      }
      
      // Draw with rounded corners
      this.roundRect(x, y, size, size, 4);
    });
  }
  
  roundRect(x, y, width, height, radius) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
    this.ctx.fill();
  }
}
```

### Exercise 5.3: AI Prompt Practice

Ask AI:

```
"Suggest creative visual enhancements for 
a snake game using Canvas API"
```

### Checkpoint 5

You should now have:
- ✅ Renderer class for drawing
- ✅ Snake rendering
- ✅ Food rendering
- ✅ Smooth animation
- ✅ Visual game state

**Ready for Chapter 6!**

