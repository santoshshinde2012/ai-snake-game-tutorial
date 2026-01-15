# AI Agent Guide - Snake Game Project

## Project Overview

This is a browser-based Snake game built with vanilla JavaScript. The game features classic Snake gameplay with modern controls and scoring.

**Tech Stack:**
- Vanilla JavaScript (ES6+)
- HTML5 Canvas for rendering
- Jest for testing
- No frameworks or build tools required

## File Structure

```
/
├── index.html          # Main game page
├── style.css          # Game styling
├── src/
│   ├── game.js        # Core game logic
│   ├── snake.js       # Snake entity
│   ├── food.js        # Food entity
│   └── utils.js       # Helper functions
└── tests/             # Jest test files
```

## Coding Standards

### JavaScript Style
- Use ES6+ features (const/let, arrow functions, classes)
- Use strict equality (`===`) not loose equality (`==`)
- Prefer functional patterns over imperative
- Keep functions small and focused (max 20 lines)

### Naming Conventions
- Classes: PascalCase (e.g., `SnakeGame`)
- Functions/variables: camelCase (e.g., `moveSnake`)
- Constants: UPPER_SNAKE_CASE (e.g., `GRID_SIZE`)

### Testing
- Write tests for all game logic
- Use descriptive test names: "should [expected behavior] when [condition]"
- Aim for 80%+ code coverage
- Test edge cases and error conditions

### Code Organization
- One class per file
- Export/import using ES6 modules
- Group related functions together
- Add JSDoc comments for public functions

## Common Commands

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Serve the game locally
npx http-server -p 8080
```

## Development Workflow

1. Make changes to source files
2. Write/update tests
3. Run tests to verify
4. Test in browser
5. Commit changes

## Game Architecture

The game follows a simple entity-component pattern:
- `Game` class orchestrates the game loop
- `Snake` class manages snake state and movement
- `Food` class manages food placement
- Canvas rendering happens in the game loop

## Key Conventions

- Grid-based movement (not pixel-perfect)
- 60 FPS game loop
- Collision detection happens before rendering
- Score increases by 10 per food eaten
