# AI Agent Guide - Snake Game Project

## Project Overview

This is a browser-based Snake game built with vanilla JavaScript. The game features classic Snake gameplay with modern controls, scoring, and comprehensive testing.

**Tech Stack:**
- Vanilla JavaScript (ES6+)
- HTML5 Canvas for rendering
- Jest for testing
- Python scripts for automation
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
├── tests/             # Jest test files
├── .ruler/            # Ruler configuration
│   ├── AGENTS.md      # This file
│   └── ruler.toml     # Sync configuration
└── .skills/           # Reusable AI Skills
    └── game-testing/  # Testing automation
```

## Coding Standards

### JavaScript Style
- Use ES6+ features (const/let, arrow functions, classes)
- Use strict equality (`===`) not loose equality (`==`)
- Prefer functional patterns over imperative
- Keep functions small and focused (max 20 lines)
- Use meaningful variable names

### Naming Conventions
- Classes: PascalCase (e.g., `SnakeGame`)
- Functions/variables: camelCase (e.g., `moveSnake`)
- Constants: UPPER_SNAKE_CASE (e.g., `GRID_SIZE`)
- Private methods: prefix with underscore (e.g., `_checkCollision`)

### Testing
- Write tests for all game logic
- Use descriptive test names: "should [expected behavior] when [condition]"
- Aim for 80%+ code coverage
- Test edge cases and error conditions
- Use the `game-testing` Skill for automated testing

### Code Organization
- One class per file
- Export/import using ES6 modules
- Group related functions together
- Add JSDoc comments for public functions
- Keep files under 200 lines

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

# Sync documentation with Ruler
ruler sync

# Validate Ruler sync
ruler validate

# Run game-testing Skill
python .skills/game-testing/scripts/run_tests.py
```

## Development Workflow

1. Make changes to source files
2. Write/update tests
3. Run tests with game-testing Skill
4. Test in browser
5. Ensure code coverage above 80%
6. Update documentation if needed
7. Run `ruler sync` if AGENTS.md changed
8. Commit changes

## Game Architecture

The game follows a simple entity-component pattern:
- `Game` class orchestrates the game loop
- `Snake` class manages snake state and movement
- `Food` class manages food placement
- Canvas rendering happens in the game loop
- Event handlers manage user input

## Skills Available

### game-testing
Automated testing workflow that:
- Runs all Jest tests
- Checks code coverage
- Reports detailed results
- Validates coverage thresholds

Invoke with: "Run the game-testing skill"

## Key Conventions

- Grid-based movement (not pixel-perfect)
- 60 FPS game loop
- Collision detection happens before rendering
- Score increases by 10 per food eaten
- Game state is immutable where possible

## AI Agent Guidelines

When assisting with this project:
1. Always check existing tests before making changes
2. Maintain or improve code coverage
3. Use the game-testing Skill to verify changes
4. Follow the established file structure
5. Keep code simple and readable
6. Document non-obvious logic
