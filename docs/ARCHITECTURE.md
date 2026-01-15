# System Architecture

## Overview

The AI Snake Game Tutorial is designed as a modular, testable, and maintainable application that demonstrates best practices for building games with AI agent support.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         UI Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  index.html  │  │  style.css   │  │   Canvas     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    src/main.js                        │  │
│  │              (Game Loop & Controller)                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ src/game.js  │    │src/renderer.js│    │ src/input.js │
│ (Game Logic) │    │   (Display)   │    │  (Controls)  │
└──────────────┘    └──────────────┘    └──────────────┘
        │                   │                   │
        └───────────────────┴───────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                       Test Layer                            │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │game.test.js│  │renderer.   │  │input.test. │           │
│  │            │  │test.js     │  │js          │           │
│  └────────────┘  └────────────┘  └────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Game Logic (`src/game.js`)

**Responsibility**: Pure game state management

**Key Functions**:
- `createInitialState()` - Initialize game state
- `updateGame(state)` - Update game state each frame
- `changeDirection(state, direction)` - Handle direction changes
- `checkCollision()` - Detect collisions
- `generateFood()` - Generate random food positions

**Design Principles**:
- Pure functions (no side effects)
- Immutable state updates
- Testable without browser APIs

### 2. Renderer (`src/renderer.js`)

**Responsibility**: Visual representation of game state

**Key Functions**:
- `render(ctx, state)` - Main rendering function
- `drawSnake()` - Draw snake segments
- `drawFood()` - Draw food item
- `drawScore()` - Display score
- `drawGameOver()` - Game over screen

**Design Principles**:
- Separation of concerns (rendering only)
- Canvas API abstraction
- Reusable drawing functions

### 3. Input Handler (`src/input.js`)

**Responsibility**: User input management

**Key Functions**:
- `setupInputHandlers()` - Register keyboard listeners
- `mapKeyToDirection()` - Map keys to directions
- `isDirectionKey()` - Validate input keys

**Design Principles**:
- Event-driven architecture
- Callback-based communication
- Cleanup support

### 4. Main Controller (`src/main.js`)

**Responsibility**: Coordinate all components

**Key Features**:
- Game loop management
- Component initialization
- State synchronization
- FPS control

**Design Principles**:
- Single point of entry
- Lifecycle management
- Clean shutdown

## Data Flow

```
User Input → Input Handler → Direction Change
                                    ↓
                             Update Game State
                                    ↓
                          Check Collisions/Food
                                    ↓
                            Render New State
                                    ↓
                            Display to Canvas
```

## State Management

The game uses an immutable state pattern:

```javascript
{
  snake: [{ x, y }, ...],  // Array of positions
  direction: { x, y },      // Current movement vector
  food: { x, y },          // Food position
  score: number,           // Current score
  gameOver: boolean,       // Game over flag
  paused: boolean         // Pause flag
}
```

## Testing Strategy

### Unit Tests
- Test each function in isolation
- Mock browser APIs (Canvas, DOM)
- Achieve 90%+ code coverage

### Test Structure
```
tests/
├── game.test.js      (33+ tests)
├── renderer.test.js  (Canvas rendering tests)
└── input.test.js     (Input handling tests)
```

## AI Agent Ecosystem Integration

### AGENTS.md
Contains instructions for AI agents to understand project structure and conventions.

### Ruler
Centralized rules that apply across multiple projects:
- Coding standards
- Testing requirements
- Documentation guidelines

### Skills
Reusable agent capabilities:
- `game-testing` skill for automated testing
- Custom test runners
- Coverage reporting

## Performance Considerations

1. **Frame Rate**: 10 FPS default (configurable)
2. **Canvas Optimization**: Only redraw when state changes
3. **Memory Management**: No memory leaks in game loop
4. **Event Handling**: Debounced input handling

## Extensibility

The architecture supports easy extensions:

1. **AI Players**: Add AI logic in separate module
2. **Multiplayer**: Extend state to support multiple snakes
3. **Power-ups**: Extend food system with types
4. **Themes**: Customize renderer colors/styles

## File Organization

```
ai-snake-game-tutorial/
├── src/              # Source code
├── tests/            # Test files
├── docs/             # Documentation
├── .ruler/           # Ruler configuration
├── .skills/          # Agent skills
├── examples/         # Example configurations
└── .github/          # GitHub workflows
```

## Dependencies

- **Runtime**: None (vanilla JavaScript)
- **Development**:
  - Jest (testing framework)
  - ESLint (code quality)
  - jest-canvas-mock (Canvas API mocking)

## Build & Deployment

- **No build step required** - runs directly in browser
- **Development**: Open `index.html` in browser
- **Testing**: `npm test`
- **Linting**: `npm run lint`

## Security Considerations

1. No external data sources
2. No user data collection
3. Client-side only execution
4. No XSS vulnerabilities

## Future Enhancements

1. AI opponent implementation
2. High score persistence
3. Mobile touch controls
4. Difficulty levels
5. Sound effects
6. Leaderboard system
