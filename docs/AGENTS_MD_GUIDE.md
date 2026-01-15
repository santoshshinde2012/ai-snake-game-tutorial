# AGENTS.md Guide

A comprehensive guide to understanding and implementing the AGENTS.md pattern for AI-assisted development.

## Table of Contents

1. [What is AGENTS.md?](#what-is-agentsmd)
2. [Why Use AGENTS.md?](#why-use-agentsmd)
3. [The Context Loss Problem](#the-context-loss-problem)
4. [How AGENTS.md Solves Context Loss](#how-agentsmd-solves-context-loss)
5. [Structure of a Good AGENTS.md](#structure-of-a-good-agentsmd)
6. [Real-World Example](#real-world-example)
7. [Best Practices](#best-practices)
8. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
9. [Maintaining AGENTS.md](#maintaining-agentsmd)
10. [Integration with AI Tools](#integration-with-ai-tools)
11. [Advanced Patterns](#advanced-patterns)

## What is AGENTS.md?

**AGENTS.md** is a structured documentation file that serves as a **knowledge hub** for AI coding assistants. It provides context, conventions, architecture, and guidance that helps AI agents understand your project quickly and make better decisions.

Think of it as a **"README for AI assistants"** - while README.md helps humans understand your project, AGENTS.md helps AI agents understand how to work with your codebase effectively.

### Key Characteristics

- **Machine-readable**: Structured for easy parsing by AI
- **Human-maintained**: Curated by developers with project knowledge
- **Context-rich**: Includes conventions, patterns, and decisions
- **Living document**: Updated as the project evolves
- **Version-controlled**: Tracked alongside code changes

### What AGENTS.md Contains

```
┌─────────────────────────────────────────┐
│           AGENTS.md Contents            │
├─────────────────────────────────────────┤
│ 1. Project Overview                     │
│    • What the project does              │
│    • Key technologies                   │
│    • Architecture summary               │
│                                         │
│ 2. Codebase Structure                   │
│    • File organization                  │
│    • Module responsibilities            │
│    • Key files and their purposes       │
│                                         │
│ 3. Development Conventions              │
│    • Coding style                       │
│    • Naming patterns                    │
│    • Testing practices                  │
│                                         │
│ 4. Common Tasks                         │
│    • Build commands                     │
│    • Test commands                      │
│    • Development workflow               │
│                                         │
│ 5. AI-Specific Guidance                 │
│    • What to change / not change        │
│    • Testing requirements               │
│    • Documentation expectations         │
└─────────────────────────────────────────┘
```

## Why Use AGENTS.md?

### The Problem with Traditional Documentation

Traditional documentation (README, wiki, inline comments) is optimized for **human readers** who:
- Can ask clarifying questions
- Have context from previous conversations
- Can infer implicit knowledge
- Remember past interactions

AI agents, however:
- Have **limited context windows**
- **Start fresh** each session
- Can't easily **infer conventions**
- Need **explicit guidance**

### Benefits of AGENTS.md

#### 1. Reduced Repetition

**Without AGENTS.md:**
```
Developer: "Add a new feature"
AI: "Where should I put the code?"
Developer: "In src/features/"
AI: "What testing framework?"
Developer: "Jest, like all our other tests"
AI: "What naming convention?"
Developer: "Same as the other files..."
```

**With AGENTS.md:**
```
Developer: "Add a new feature"
AI: *reads AGENTS.md*
    "I'll create src/features/newFeature.js 
     and tests/features/newFeature.test.js 
     following the established Jest patterns."
```

#### 2. Consistent Outputs

All AI agents (ChatGPT, GitHub Copilot, Claude, etc.) read the same context and produce consistent results aligned with your project's conventions.

#### 3. Faster Onboarding

New AI tools or sessions get up to speed immediately by reading AGENTS.md first.

#### 4. Better Decisions

AI agents make fewer mistakes because they understand the project's architecture, constraints, and conventions.

#### 5. Knowledge Preservation

Institutional knowledge that might only exist in senior developers' heads gets documented and available to AI assistants.

## The Context Loss Problem

### Understanding Context Windows

AI models have **limited memory** called a **context window**:

```
┌────────────────────────────────────────┐
│     AI Context Window (e.g., 8K)       │
├────────────────────────────────────────┤
│ [Recent conversation]                  │  ← Most recent
│ [Code snippets shown]                  │
│ [Previous questions]                   │
│ [Earlier context]                      │
│ [Older messages...]                    │  ← May be forgotten
└────────────────────────────────────────┘
         ↓
    Older messages fall out
    when limit is reached
```

### Context Loss Symptoms

#### Symptom 1: Repetitive Questions

```
Session 1:
Developer: "Add login feature"
AI: "What testing framework do you use?"
Developer: "Jest"

Session 2 (later):
Developer: "Add logout feature"
AI: "What testing framework do you use?"  ← Asked again!
Developer: "Jest... like I said before"
```

#### Symptom 2: Inconsistent Style

```
File 1 (created in Session 1):
export class UserService { ... }

File 2 (created in Session 2):
export function createUser() { ... }  ← Different pattern!
```

#### Symptom 3: Wrong Assumptions

```
AI: "I'll add the feature to /lib/features/"
Developer: "We don't have a /lib/ directory, we use /src/"
AI: "Oh, let me fix that..."
```

### Why Context Loss Happens

1. **Long Sessions**: Context window fills up over time
2. **Multiple Sessions**: Each new chat starts fresh
3. **Different Tools**: Switching between Copilot, ChatGPT, etc.
4. **Large Codebases**: Can't fit entire codebase in context
5. **Team Collaboration**: Different developers, different contexts

### The Cost of Context Loss

```
Time Wasted per Interaction:

┌─────────────────────┬──────────────────┐
│ Issue               │ Time Lost        │
├─────────────────────┼──────────────────┤
│ Answering repeated  │ 30-60 seconds    │
│ questions           │                  │
│                     │                  │
│ Fixing wrong style  │ 2-5 minutes      │
│                     │                  │
│ Correcting wrong    │ 5-10 minutes     │
│ architecture        │                  │
│                     │                  │
│ Re-explaining       │ 3-5 minutes      │
│ conventions         │                  │
└─────────────────────┴──────────────────┘

Total per day: 30-60 minutes
Total per week: 2.5-5 hours
Total per month: 10-20 hours
```

## How AGENTS.md Solves Context Loss

### 1. Persistent Context

AGENTS.md acts as **persistent memory** that survives across sessions:

```
Session 1:              Session 2:              Session 3:
┌──────────┐           ┌──────────┐           ┌──────────┐
│   AI     │           │   AI     │           │   AI     │
│ (fresh)  │           │ (fresh)  │           │ (fresh)  │
└────┬─────┘           └────┬─────┘           └────┬─────┘
     │                      │                      │
     └──────────┬───────────┴───────────┬──────────┘
                │                       │
                ▼                       ▼
         ┌─────────────────────────────────┐
         │        AGENTS.md                │
         │  (Always available, consistent) │
         └─────────────────────────────────┘
```

### 2. Explicit Conventions

Instead of inferring conventions, AI reads them explicitly:

```markdown
## Coding Conventions

- Use ES6 modules (`import`/`export`)
- Classes use PascalCase: `UserService`
- Functions use camelCase: `createUser()`
- Tests use `.test.js` suffix
- All tests use Jest framework
```

AI now knows **exactly** what to do, every time.

### 3. Structured Knowledge

Information is organized logically:

```
AGENTS.md Structure:

1. Overview
   ↓
2. File Structure
   ↓
3. How to Build/Test
   ↓
4. Coding Conventions
   ↓
5. Common Tasks
```

AI can quickly find the information it needs.

### 4. Project-Specific Guidance

AGENTS.md includes context that's unique to your project:

```markdown
## Important Constraints

- Never modify `src/legacy/` - it's for backward compatibility
- All database queries must use the `query()` wrapper
- Tests must not make real API calls (use mocks)
- Performance: Keep game loop under 16ms
```

This prevents AI from making project-breaking mistakes.

### 5. Reference Examples

Show AI what "good" looks like:

```markdown
## Adding a New Feature

Example: Adding a power-up system

1. Create `src/features/powerup.js`:
   ```javascript
   export class PowerUp {
     constructor(type, duration) { ... }
   }
   ```

2. Add tests in `tests/features/powerup.test.js`:
   ```javascript
   describe('PowerUp', () => {
     test('applies effect when collected', () => { ... });
   });
   ```

3. Integrate in `src/game.js`:
   ```javascript
   import { PowerUp } from './features/powerup.js';
   ```
```

## Structure of a Good AGENTS.md

### Essential Sections

#### 1. Project Overview

```markdown
# Project Name

Brief description of what the project does.

## Technology Stack

- Language: JavaScript (ES6+)
- Runtime: Browser (no Node.js)
- Testing: Jest with jsdom
- Build: None (vanilla JS)
```

**Purpose**: Give AI immediate understanding of the project's nature.

#### 2. File Structure

```markdown
## File Structure

```
project/
├── src/              # Source code
│   ├── game.js       # Core game logic
│   ├── renderer.js   # Canvas rendering
│   └── input.js      # Input handling
├── tests/            # Test files (mirrors src/)
├── index.html        # Entry point
└── docs/             # Documentation
```

**Purpose**: Help AI navigate the codebase.

#### 3. Development Commands

```markdown
## Commands

```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode
npm test -- --coverage # Coverage report
```

Open `index.html` in a browser to run the game.
```

**Purpose**: Enable AI to build, test, and verify changes.

#### 4. Coding Conventions

```markdown
## Coding Conventions

### JavaScript Style

- Use ES6 classes for components
- Use `const` for constants, `let` for variables
- Use template literals for strings with variables
- Use arrow functions for callbacks

### Naming

- Classes: PascalCase (`GameEngine`)
- Functions: camelCase (`updateScore()`)
- Constants: UPPER_SNAKE_CASE (`MAX_SPEED`)
- Private members: prefix with underscore (`_internalState`)

### Testing

- One test file per source file
- Test file naming: `[source].test.js`
- Use `describe()` for grouping
- Use `test()` for individual tests
- Mock external dependencies
```

**Purpose**: Ensure consistent code style.

#### 5. Architecture Overview

```markdown
## Architecture

The game follows a game loop pattern:

```
Input → Game State → Renderer → Display
  ↑                                │
  └────────── Game Loop ───────────┘
```

- `game.js`: Manages state, no rendering
- `renderer.js`: Visualizes state, no logic
- `input.js`: Captures input, no game logic
- `main.js`: Coordinates components
```

**Purpose**: Help AI understand how pieces fit together.

#### 6. AI-Specific Guidance

```markdown
## For AI Assistants

### When Making Changes

✓ DO:
- Run tests after changes
- Follow existing patterns
- Add tests for new features
- Update this file if conventions change

✗ DON'T:
- Modify test infrastructure (jest.config.js)
- Change file organization without discussion
- Remove existing tests
- Add external dependencies without approval

### Testing Requirements

All new code must have:
1. Unit tests (>80% coverage)
2. Tests that pass locally
3. No console errors in browser

### Documentation

Update relevant docs in `/docs` if you:
- Add new features
- Change architecture
- Modify API
```

**Purpose**: Set clear expectations for AI behavior.

### Optional Sections

#### Common Tasks

```markdown
## Common Tasks

### Adding a New Feature

1. Create source file in `src/features/[name].js`
2. Create test file in `tests/features/[name].test.js`
3. Import in `src/game.js`
4. Run tests: `npm test`

### Debugging

- Use browser DevTools console
- Check for errors in Jest output
- Verify file paths in imports
```

#### Known Issues

```markdown
## Known Issues

- Issue #42: Food can spawn under snake (rare)
- Performance: Large snakes (>100 segments) may slow down
- Browser: Safari < 14 not tested
```

#### Project History

```markdown
## Project History

- v1.0: Basic snake game
- v1.1: Added scoring
- v1.2: Added tests
- v2.0: Refactored to modules (current)
```

## Real-World Example

Let's look at a complete AGENTS.md from the AI Snake Game:

```markdown
# AI Snake Game - Agent Context

## Project Overview

A browser-based Snake game built with vanilla JavaScript to demonstrate AI-assisted development patterns.

## Technology Stack

- **Language**: JavaScript (ES6 modules)
- **Runtime**: Browser only (no Node.js for game)
- **Testing**: Jest + jsdom
- **No build tools**: Direct ES6 module imports

## File Structure

```
ai-snake-game-tutorial/
├── src/
│   ├── game.js       # Game state and logic
│   ├── renderer.js   # Canvas rendering
│   ├── input.js      # Keyboard input
│   └── main.js       # Application entry point
├── tests/
│   ├── game.test.js
│   ├── renderer.test.js
│   └── input.test.js
├── docs/             # Comprehensive documentation
├── index.html        # Game HTML
├── style.css         # Game styles
└── package.json
```

## Development Commands

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run the game
# Open index.html in a web browser
```

## Architecture

### High-Level Design

```
┌─────────┐      ┌──────────┐      ┌──────────┐
│  Input  │─────→│   Game   │─────→│ Renderer │
│ Handler │      │  Engine  │      │          │
└─────────┘      └──────────┘      └──────────┘
     ↑                                    │
     └────────────Game Loop───────────────┘
```

### Module Responsibilities

- **game.js**: Pure game logic (no DOM, no rendering)
  - Snake movement
  - Collision detection
  - Score tracking
  
- **renderer.js**: Pure rendering (no game logic)
  - Canvas drawing
  - Visual representation
  
- **input.js**: Pure input handling (no game logic)
  - Keyboard events
  - Button clicks
  
- **main.js**: Orchestration
  - Wires components together
  - Runs game loop

### Data Flow

1. User presses arrow key
2. InputHandler captures event → calls callback
3. Game updates direction (validates)
4. Game loop tick: Game updates state
5. Renderer reads state → draws to canvas

## Coding Conventions

### JavaScript Style

- ES6 classes for components (`class Game`)
- ES6 modules (`import`/`export`)
- `const` by default, `let` when reassignment needed
- Arrow functions for callbacks
- Template literals for string interpolation

### Naming Conventions

- **Classes**: PascalCase (`GameEngine`, `InputHandler`)
- **Functions**: camelCase (`updateScore`, `handleInput`)
- **Constants**: UPPER_SNAKE_CASE (`GRID_SIZE`, `INITIAL_SNAKE`)
- **Files**: camelCase with descriptive names

### Code Organization

- One class per file (generally)
- Exports at bottom of file
- Imports at top
- Group related functions

### Testing

- One test file per source file
- Test filename: `[source].test.js`
- Structure: `describe()` for component, `test()` for cases
- Test coverage goal: >80%
- Mock DOM elements using jsdom
- No actual browser required for tests

### Documentation

- JSDoc comments for public methods
- Inline comments for complex logic only
- README.md for users
- AGENTS.md (this file) for AI assistants
- Detailed docs in `/docs`

## Common Tasks

### Adding a New Feature

1. **Plan**: Decide which module(s) to modify
2. **Write tests first** (TDD approach):
   ```javascript
   // tests/game.test.js
   test('new feature works', () => {
     // Arrange
     const game = new Game(20, 20);
     
     // Act
     game.doNewThing();
     
     // Assert
     expect(game.getState().newThing).toBe(expected);
   });
   ```
3. **Implement feature** in appropriate module
4. **Run tests**: `npm test`
5. **Test in browser**: Open index.html
6. **Update documentation** if needed

### Debugging

**Tests failing?**
```bash
npm test -- --verbose  # See detailed output
```

**Game not working in browser?**
- Open DevTools Console (F12)
- Look for errors
- Check Network tab for failed imports
- Verify file paths in imports

**Visual issues?**
- Check renderer.js logic
- Verify canvas element exists
- Inspect fillStyle/strokeStyle values

## Project Constraints

### Do NOT Change

- File structure (keep modules separate)
- Test framework (Jest)
- Module system (ES6)
- Grid-based coordinate system

### Can Change

- Game features (add power-ups, levels, etc.)
- Rendering details (colors, styles)
- Game parameters (speed, grid size)
- UI elements

## For AI Assistants

### When Making Changes

**Always:**
- ✓ Run tests before and after: `npm test`
- ✓ Follow existing code patterns
- ✓ Add tests for new features
- ✓ Keep modules decoupled
- ✓ Preserve existing functionality

**Never:**
- ✗ Mix game logic with rendering
- ✗ Mix input handling with game logic
- ✗ Add npm dependencies without discussion
- ✗ Change test framework or config
- ✗ Modify working tests without good reason

### Testing Requirements

All changes must:
1. Pass existing tests
2. Add new tests for new functionality
3. Maintain >80% code coverage
4. Work in browser (verify with index.html)

### Code Review Checklist

Before suggesting code:
- [ ] Follows ES6 module pattern
- [ ] Has corresponding tests
- [ ] Uses existing naming conventions
- [ ] Doesn't break encapsulation
- [ ] No console.logs in production code
- [ ] No external dependencies added

### Response Format

When suggesting changes:

1. **Explain** what you're changing and why
2. **Show** the code changes
3. **Provide** test changes if needed
4. **Mention** how to verify (npm test, browser)

Example:
```
I'll add a pause feature to the game.

Changes:
1. Add `paused` state to Game class
2. Add `togglePause()` method
3. Update game loop to respect pause state
4. Add tests for pause functionality

Test with: npm test
Verify in browser: Press P to pause
```

## Project Goals

This project demonstrates:
- Clean architecture (separation of concerns)
- Test-driven development
- AI-assisted coding with proper context
- Modern JavaScript patterns
- Comprehensive documentation

Use this project as a reference for structuring codebases that work well with AI assistants.

## Additional Resources

- `/docs/SETUP.md` - Setup instructions
- `/docs/ARCHITECTURE.md` - Detailed architecture
- `/docs/TUTORIAL.md` - Step-by-step tutorial
- `/docs/SKILLS_GUIDE.md` - Creating AI skills
- `/docs/RULER_GUIDE.md` - Using Ruler tool
```

### Why This Example Works

1. **Comprehensive**: Covers all essential information
2. **Structured**: Easy for AI to parse
3. **Explicit**: No ambiguity about conventions
4. **Practical**: Includes concrete examples
5. **Actionable**: Clear dos and don'ts
6. **Maintainable**: Easy to update

## Best Practices

### 1. Keep It Up-to-Date

```markdown
## Maintenance Schedule

Update AGENTS.md when:
- [ ] Adding major features
- [ ] Changing architecture
- [ ] Updating dependencies
- [ ] Modifying conventions
- [ ] Restructuring files

Review monthly or after significant changes.
```

### 2. Be Specific

❌ **Vague:**
```markdown
Use good naming conventions.
```

✅ **Specific:**
```markdown
Classes: PascalCase (Example: `UserService`)
Functions: camelCase (Example: `getUserById()`)
Constants: UPPER_SNAKE_CASE (Example: `MAX_RETRY_COUNT`)
```

### 3. Show Examples

❌ **Abstract:**
```markdown
Follow the existing pattern for adding features.
```

✅ **Concrete:**
```markdown
Example: Adding a new game mode

1. Create `src/modes/survival.js`:
   ```javascript
   export class SurvivalMode {
     constructor(game) {
       this.game = game;
     }
   }
   ```

2. Register in `src/game.js`:
   ```javascript
   import { SurvivalMode } from './modes/survival.js';
   ```
```

### 4. Prioritize Information

Put most important information first:

```markdown
# Critical Information (top)
- How to run tests
- Core conventions
- Architecture overview

# Important Details (middle)
- File structure
- Common tasks
- Development workflow

# Reference (bottom)
- Known issues
- Project history
- Related resources
```

### 5. Use Visual Aids

```markdown
## Architecture

```
User Input
    │
    ▼
┌─────────┐
│ Handler │
└────┬────┘
     │
     ▼
┌─────────┐
│  Game   │
└────┬────┘
     │
     ▼
┌─────────┐
│Renderer │
└─────────┘
```
```

### 6. Version Your Conventions

```markdown
## Conventions (Updated: 2024-01-15)

### Change Log

- 2024-01-15: Switched to ES6 modules
- 2023-12-01: Added Jest for testing
- 2023-11-15: Project started
```

### 7. Test with AI

Actually use AGENTS.md with an AI assistant and iterate:

```
Step 1: Write AGENTS.md
Step 2: Start fresh AI session
Step 3: Ask AI to do a task
Step 4: Note what AI got wrong
Step 5: Update AGENTS.md
Step 6: Repeat
```

### 8. Balance Detail and Brevity

Too short: AI lacks context
Too long: AI might miss key points

**Optimal length**: 300-1000 lines
- Core sections: Always include
- Optional sections: Include if relevant
- Details: Reference other docs

### 9. Use Checklists

```markdown
## Pre-Commit Checklist

Before committing code:
- [ ] All tests pass (`npm test`)
- [ ] No console errors in browser
- [ ] Code follows conventions
- [ ] New tests added (if applicable)
- [ ] Documentation updated (if applicable)
```

### 10. Link to Detailed Docs

```markdown
## Architecture

High-level: Game loop with separate modules.

For details: See `/docs/ARCHITECTURE.md`

## Testing

Use Jest. Run with `npm test`.

For details: See `/docs/TESTING.md`
```

## Common Mistakes to Avoid

### 1. Making It Too Generic

❌ **Bad:**
```markdown
Write clean code and follow best practices.
```

This applies to every project. Be specific to **your** project.

✅ **Good:**
```markdown
In this project, game logic must be in `game.js` with zero rendering code. Renderer must be in `renderer.js` with zero game logic.
```

### 2. Forgetting to Update

```markdown
# Created: Jan 2024
# Last Updated: Jan 2024  ← Uh oh!

# Meanwhile, the project has:
# - Switched frameworks
# - Changed structure
# - Adopted new conventions
```

**Solution**: Add reminder comments in code:

```javascript
// When changing this pattern, update AGENTS.md
export class NewPattern { ... }
```

### 3. Making It Too Long

AGENTS.md with 5000+ lines is hard for AI to process.

**Solution**: Link to detailed docs:

```markdown
## Architecture

Summary: Modular game loop architecture.

Details: See [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
```

### 4. No Examples

```markdown
## Adding Features

Add features following our patterns.
```

What patterns? Show me!

### 5. Contradicting the Code

```markdown
## Naming Convention

Use camelCase for functions.
```

```javascript
// Actual code:
function UpdateGameState() { ... }  // PascalCase!
```

**Solution**: Regularly audit code vs. AGENTS.md.

### 6. Ignoring Edge Cases

```markdown
## Testing

All code must have tests.
```

But what about:
- Configuration files?
- Generated code?
- Legacy code?

Be explicit about exceptions!

### 7. No Version Control

AGENTS.md should be in git and updated with code changes.

### 8. Treating It as Unchangeable

AGENTS.md should **evolve** with your project. Don't be afraid to update it!

### 9. Duplicating README

AGENTS.md is **not** a second README. Different audiences:
- README.md: Human users and developers
- AGENTS.md: AI coding assistants

### 10. Not Testing It

Write AGENTS.md, then actually use it with AI. Does it work?

## Maintaining AGENTS.md

### When to Update

#### Triggers for Updates

```markdown
1. Architecture Changes
   ├─ New modules added
   ├─ Components refactored
   └─ Design patterns changed

2. Convention Changes
   ├─ New coding style adopted
   ├─ Naming patterns updated
   └─ Testing approach modified

3. File Structure Changes
   ├─ Directories reorganized
   ├─ Files moved or renamed
   └─ New sections added

4. Tool Changes
   ├─ New dependencies added
   ├─ Build process modified
   └─ Test framework changed

5. Workflow Changes
   ├─ New development steps
   ├─ Modified review process
   └─ Updated deployment

6. Feedback from AI
   ├─ AI makes consistent mistakes
   ├─ AI asks repeated questions
   └─ AI violates conventions
```

### Update Process

```
1. Identify Change
   │
   ├─ Code change that affects patterns?
   ├─ New convention adopted?
   └─ AI made mistakes?
   │
   ▼
2. Update AGENTS.md
   │
   ├─ Add/modify relevant section
   ├─ Update examples
   └─ Add clarifications
   │
   ▼
3. Test with AI
   │
   ├─ Start fresh AI session
   ├─ Ask AI to do related task
   └─ Verify AI follows new guidance
   │
   ▼
4. Commit Together
   │
   └─ Commit code + AGENTS.md update together
```

### Maintenance Schedule

```markdown
## AGENTS.md Maintenance

### Weekly
- Review recent AI interactions
- Note recurring questions
- Add clarifications

### Monthly
- Full audit of accuracy
- Update examples if code changed
- Check for outdated information

### Per Release
- Update version references
- Document new features
- Archive deprecated patterns
```

### Collaborative Maintenance

```markdown
## Team Responsibilities

### All Developers
- Update AGENTS.md when changing conventions
- Report AI confusion to team
- Suggest improvements

### Tech Lead
- Monthly review of AGENTS.md
- Approve major structural changes
- Ensure consistency

### DevOps
- Keep commands up-to-date
- Update deployment guidance
- Verify tool versions
```

## Integration with AI Tools

### GitHub Copilot

Copilot reads files in your workspace:

```
1. Open AGENTS.md in editor
2. Copilot automatically considers it
3. Suggestions align with your conventions
```

### ChatGPT / Claude

Manually provide context:

```
You: "Read the AGENTS.md file in my project and help me add a new feature."

[Paste AGENTS.md contents]

AI: *understands project context*
```

### Cursor / Windsurf

AI-powered editors read AGENTS.md automatically:

```
1. AGENTS.md in project root
2. AI uses it for all suggestions
3. Consistent experience across files
```

### Custom Tools

Integrate AGENTS.md into your own tools:

```javascript
// Tool reads AGENTS.md
const context = fs.readFileSync('AGENTS.md', 'utf8');

// Sends to AI with request
const response = await ai.complete({
  context: context,
  prompt: userRequest
});
```

### Ruler (Context Sync Tool)

Ruler syncs AGENTS.md to AI tools:

```bash
# ruler.toml
[[sync]]
source = "AGENTS.md"
targets = ["copilot", "chatgpt", "claude"]

# Sync to all tools
ruler sync
```

See [RULER_GUIDE.md](./RULER_GUIDE.md) for details.

## Advanced Patterns

### 1. Conditional Sections

```markdown
## Database Conventions

<!-- For AI working on backend -->
If working on files in `src/backend/`:
- Use Prisma ORM
- Always use transactions
- Never do raw SQL

<!-- For AI working on frontend -->
If working on files in `src/frontend/`:
- Use fetch() for API calls
- Handle loading states
- Show user feedback
```

### 2. Decision Trees

```markdown
## Where to Put Code

```
Is it game logic?
  ├─ YES → src/game.js
  └─ NO
      │
      Is it rendering?
      ├─ YES → src/renderer.js
      └─ NO
          │
          Is it input?
          ├─ YES → src/input.js
          └─ NO → Discuss with team
```
```

### 3. Anti-Patterns

```markdown
## Anti-Patterns to Avoid

❌ Mixing game logic and rendering:
```javascript
// BAD
class Game {
  update() {
    this.snake.move();
    ctx.fillRect(...);  // Don't render in game!
  }
}
```

✅ Keep them separate:
```javascript
// GOOD
class Game {
  update() {
    this.snake.move();
    // No rendering
  }
}
```
```

### 4. Context Hints

```markdown
<!-- AI: This is a performance-critical section -->
## Game Loop Optimization

The game loop runs at 60 FPS. Keep operations fast:
- Avoid array allocations in update()
- Cache calculations
- Use object pools
```

### 5. Dynamic References

```markdown
## Current Sprint Focus

<!-- Update each sprint -->
Sprint 23 (Jan 15-28): Multiplayer Features

When adding features:
- Consider multiplayer implications
- Test with multiple players
- Update network protocol docs
```

### 6. Learning Resources

```markdown
## For AI: Learning This Codebase

Recommended reading order:
1. This file (AGENTS.md) - Overview
2. src/main.js - Entry point
3. src/game.js - Core logic
4. tests/game.test.js - Usage examples
5. docs/ARCHITECTURE.md - Deep dive
```

---

## Summary

**AGENTS.md** is a powerful tool for AI-assisted development:

✅ **Reduces context loss** across sessions
✅ **Ensures consistency** in AI outputs  
✅ **Speeds up development** by reducing repetition
✅ **Preserves knowledge** explicitly
✅ **Improves AI decisions** with project context

### Quick Start

1. Create `AGENTS.md` in project root
2. Add essential sections (overview, structure, conventions)
3. Test with AI assistant
4. Iterate based on what AI gets wrong
5. Keep updated as project evolves

### Key Takeaways

- **Be specific**: Generic advice doesn't help
- **Show examples**: Concrete > abstract
- **Keep updated**: Stale docs worse than no docs
- **Test it**: Use with actual AI tools
- **Evolve it**: Improve based on experience

**AGENTS.md transforms AI from a novice asking basic questions into an informed teammate that understands your project's conventions and constraints.**
