# Contributing to AI Snake Game Tutorial

Welcome! 🎉 Thank you for considering contributing to the AI Snake Game Tutorial project. This project aims to teach the AI Agent Ecosystem (AGENTS.md, Ruler, and Agent Skills) through building a classic Snake game. We're excited to have you join our community!

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Review Process](#review-process)
- [Testing Requirements](#testing-requirements)
- [Documentation Requirements](#documentation-requirements)
- [Community and Support](#community-and-support)
- [Recognition](#recognition)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior through the project's GitHub issue tracker.

## Ways to Contribute

There are many ways to contribute to this project:

### 🐛 Reporting Bugs

Found a bug? Help us improve by reporting it!

**Before Submitting a Bug Report:**
- Check the [issue tracker](https://github.com/santoshshinde2012/ai-snake-game-tutorial/issues) to see if the bug has already been reported
- Ensure you're using the latest version
- Collect information about the bug (browser, OS, error messages, steps to reproduce)

**How to Submit a Bug Report:**
1. Open a new issue with a clear and descriptive title
2. Provide a detailed description of the problem
3. Include steps to reproduce the bug
4. Add screenshots or GIFs if applicable
5. Mention your environment (browser version, OS, Node.js version)
6. Include any error messages or console output

**Example Bug Report:**
```markdown
**Title:** Snake collision detection fails at grid boundaries

**Description:**
When the snake reaches the edge of the grid at coordinates (19, 19), 
the collision detection doesn't trigger game over as expected.

**Steps to Reproduce:**
1. Start a new game
2. Navigate the snake to the right edge
3. Continue moving right
4. Expected: Game over
5. Actual: Snake wraps to opposite side

**Environment:**
- Browser: Chrome 120.0
- OS: Windows 11
- Node.js: v20.10.0

**Console Output:**
[Include any error messages]
```

### 💡 Suggesting Features

Have an idea to make this tutorial better?

**Before Submitting a Feature Request:**
- Check if the feature has already been suggested
- Make sure it aligns with the project's educational goals
- Consider if it would benefit most users

**How to Submit a Feature Request:**
1. Open a new issue with the label "enhancement"
2. Provide a clear and descriptive title
3. Explain the problem this feature would solve
4. Describe the proposed solution
5. List any alternatives you've considered
6. Add mockups or examples if relevant

**Example Feature Request:**
```markdown
**Title:** Add difficulty levels (Easy, Medium, Hard)

**Problem:**
New learners might find the default game speed challenging, 
while advanced users might want more difficulty.

**Proposed Solution:**
Add three difficulty levels that adjust:
- Snake speed (5 FPS, 10 FPS, 15 FPS)
- Starting length (3, 5, 7 segments)
- Food spawn frequency

**Alternatives Considered:**
- Gradual speed increase (rejected: makes testing harder)
- User-adjustable speed slider (rejected: complicates UI)

**Benefits:**
- Better learning experience for beginners
- More engaging for experienced players
- Demonstrates state management patterns
```

### 📝 Improving Documentation

Documentation improvements are always welcome!

**Areas Where You Can Help:**
- Fix typos or grammatical errors
- Clarify confusing explanations
- Add code examples
- Improve AGENTS.md with better guidelines
- Expand the tutorial with more detailed steps
- Add diagrams or illustrations
- Translate documentation to other languages
- Add JSDoc comments to code

**Documentation Guidelines:**
- Use clear, concise language
- Include code examples where relevant
- Add links to related documentation
- Follow the existing documentation structure
- Test code examples to ensure they work

### 💻 Submitting Code

Ready to write some code? Great!

**Types of Code Contributions:**
- Bug fixes
- New features
- Performance improvements
- Code refactoring
- Test additions
- Example projects

**Before You Start:**
- Check if someone else is already working on it
- For major changes, open an issue first to discuss
- Make sure you understand the project architecture
- Read AGENTS.md for coding guidelines

## Getting Started

### Prerequisites

Before you begin, ensure you have:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A code editor (VS Code, Sublime Text, Atom, etc.)

### Fork and Clone

1. **Fork the repository:**
   - Visit https://github.com/santoshshinde2012/ai-snake-game-tutorial
   - Click the "Fork" button in the top-right corner
   - This creates a copy of the repository in your GitHub account

2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/ai-snake-game-tutorial.git
   cd ai-snake-game-tutorial
   ```

3. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/santoshshinde2012/ai-snake-game-tutorial.git
   ```

4. **Verify remotes:**
   ```bash
   git remote -v
   # origin    https://github.com/YOUR-USERNAME/ai-snake-game-tutorial.git (fetch)
   # origin    https://github.com/YOUR-USERNAME/ai-snake-game-tutorial.git (push)
   # upstream  https://github.com/santoshshinde2012/ai-snake-game-tutorial.git (fetch)
   # upstream  https://github.com/santoshshinde2012/ai-snake-game-tutorial.git (push)
   ```

### Install Dependencies

```bash
npm install
```

This installs:
- Jest (testing framework)
- Jest Canvas Mock (for Canvas API testing)
- Jest Environment JSDOM (for DOM testing)

### Verify Setup

Run the tests to make sure everything is working:

```bash
npm test
```

You should see output like:
```
PASS tests/input.test.js
PASS tests/renderer.test.js
PASS tests/game.test.js

Test Suites: 3 passed, 3 total
Tests:       73 passed, 73 total
```

Open the game in your browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html

# Or just drag index.html into your browser
```

### Create a Branch

Always create a new branch for your work:

```bash
# For bug fixes
git checkout -b fix/brief-description

# For new features
git checkout -b feature/brief-description

# For documentation
git checkout -b docs/brief-description

# Examples
git checkout -b fix/collision-detection-boundary
git checkout -b feature/difficulty-levels
git checkout -b docs/improve-agents-md
```

**Branch Naming Conventions:**
- `fix/` - Bug fixes
- `feature/` - New features
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions or improvements
- `chore/` - Maintenance tasks

## Development Workflow

### 1. Keep Your Fork Updated

Before starting new work, sync with upstream:

```bash
# Fetch upstream changes
git fetch upstream

# Switch to main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main
```

### 2. Make Your Changes

- Write your code following the [Coding Standards](#coding-standards)
- Test your changes thoroughly
- Add or update tests as needed
- Update documentation if required

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Run tests in watch mode (for active development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

**Coverage Requirements:**
- Maintain 100% line coverage
- All new code must include tests
- Tests should cover edge cases

### 4. Preview Your Changes

Open `index.html` in your browser and:
- Play the game to verify functionality
- Test edge cases (boundaries, rapid input, etc.)
- Check console for errors
- Test in multiple browsers if possible

### 5. Commit Your Changes

Follow the [Commit Message Guidelines](#commit-message-guidelines):

```bash
git add .
git commit -m "feat: add difficulty level selection"
```

### 6. Push to Your Fork

```bash
git push origin your-branch-name
```

### 7. Create a Pull Request

See [Pull Request Process](#pull-request-process) below.

## Coding Standards

This project follows strict coding standards to maintain quality and consistency. Please read [AGENTS.md](AGENTS.md) for comprehensive guidelines. Here's a summary:

### Pure Functional Programming

**DO:**
```javascript
// ✅ Pure function - no side effects
export function moveSnake(snake, direction) {
  const head = snake[0];
  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y
  };
  return [newHead, ...snake.slice(0, -1)];
}
```

**DON'T:**
```javascript
// ❌ Impure - modifies input
export function moveSnake(snake, direction) {
  const head = snake[0];
  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y
  };
  snake.unshift(newHead);  // Mutates input!
  snake.pop();
  return snake;
}
```

### Immutability

**DO:**
```javascript
// ✅ Creates new state
const newState = {
  ...state,
  score: state.score + 10
};
```

**DON'T:**
```javascript
// ❌ Mutates state
state.score += 10;
```

### Function Naming

**DO:**
```javascript
// ✅ Verb + noun, describes action
function calculateScore(foodEaten, multiplier) { }
function checkCollision(snake, food) { }
function generateFood(gridWidth, gridHeight) { }
```

**DON'T:**
```javascript
// ❌ Vague or unclear
function doStuff(x, y) { }
function handle(obj) { }
function process(data) { }
```

### Code Organization

Each module should:
- Export pure functions only
- Have a single, clear responsibility
- Include comprehensive tests
- Have descriptive function names

### Documentation

**DO:**
```javascript
/**
 * Checks if the snake has collided with itself.
 * @param {Array<{x: number, y: number}>} snake - The snake segments
 * @returns {boolean} True if collision detected
 */
export function checkSelfCollision(snake) {
  const head = snake[0];
  return snake.slice(1).some(segment => 
    segment.x === head.x && segment.y === head.y
  );
}
```

### Testing

**DO:**
```javascript
// ✅ Descriptive test names
describe('moveSnake', () => {
  it('should move snake right when direction is {x: 1, y: 0}', () => {
    const snake = [{x: 5, y: 5}, {x: 4, y: 5}];
    const direction = {x: 1, y: 0};
    const result = moveSnake(snake, direction);
    expect(result[0]).toEqual({x: 6, y: 5});
  });
  
  it('should not modify the original snake array', () => {
    const snake = [{x: 5, y: 5}, {x: 4, y: 5}];
    const original = JSON.parse(JSON.stringify(snake));
    moveSnake(snake, {x: 1, y: 0});
    expect(snake).toEqual(original);
  });
});
```

### File Structure

```
src/
├── game.js       # Game logic (state management, collision detection)
├── input.js      # Input handling (keyboard events)
├── renderer.js   # Rendering (Canvas API)
└── main.js       # Application entry point (game loop)

tests/
├── game.test.js      # Game logic tests
├── input.test.js     # Input handling tests
└── renderer.test.js  # Rendering tests
```

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This leads to more readable commit history and enables automatic changelog generation.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

Must be one of:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, whitespace)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding or updating tests
- **chore**: Changes to build process or auxiliary tools

### Scope (Optional)

The scope specifies the module affected:
- `game` - Game logic changes
- `renderer` - Rendering changes
- `input` - Input handling changes
- `tests` - Test-related changes
- `docs` - Documentation changes

### Subject

- Use imperative, present tense: "add" not "added" or "adds"
- Don't capitalize first letter
- No period (.) at the end
- Maximum 72 characters

### Body (Optional)

- Use imperative, present tense
- Explain what and why, not how
- Wrap at 72 characters

### Footer (Optional)

- Reference issues: `Closes #123` or `Fixes #456`
- Note breaking changes: `BREAKING CHANGE: description`

### Examples

**Simple fix:**
```
fix(game): correct boundary collision detection

The collision detection was checking x > gridWidth instead of 
x >= gridWidth, causing the snake to wrap around instead of 
triggering game over.

Closes #42
```

**New feature:**
```
feat(game): add difficulty level selection

- Add three difficulty levels: Easy, Medium, Hard
- Adjust snake speed based on difficulty
- Save selected difficulty in localStorage
- Add difficulty selector to UI

Closes #38
```

**Documentation:**
```
docs: improve AGENTS.md with more examples

Add examples for:
- Pure function patterns
- Immutability best practices
- Test structure
```

**Breaking change:**
```
refactor(game)!: change food generation algorithm

BREAKING CHANGE: The generateFood function now returns 
{x, y, value} instead of just {x, y}. Update all calls 
to handle the new return format.

This change enables different food types with different 
point values in future updates.
```

## Pull Request Process

### Before Submitting

1. **Ensure all tests pass:**
   ```bash
   npm test
   ```

2. **Check test coverage:**
   ```bash
   npm run test:coverage
   # Coverage should be 100% or very close
   ```

3. **Verify the game works:**
   - Open `index.html` in a browser
   - Test your changes manually
   - Check for console errors

4. **Update documentation:**
   - Update README.md if needed
   - Update AGENTS.md if you changed patterns
   - Add JSDoc comments to new functions

5. **Rebase on latest main:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### Submitting the Pull Request

1. **Push to your fork:**
   ```bash
   git push origin your-branch-name
   ```

2. **Create PR on GitHub:**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Click "Create Pull Request"

3. **Fill out the PR template:**

   **Title:** Follow commit message format
   ```
   feat(game): add difficulty level selection
   ```

   **Description:**
   ```markdown
   ## Description
   Adds three difficulty levels (Easy, Medium, Hard) that adjust 
   snake speed and starting length.

   ## Motivation
   Provides better learning experience for beginners and more 
   challenge for experienced players.

   ## Changes
   - Added difficulty selector UI
   - Implemented speed adjustment logic
   - Added localStorage persistence
   - Updated tests for new functionality

   ## Testing
   - All existing tests pass
   - Added 12 new tests for difficulty levels
   - Manually tested all three difficulty levels
   - Tested localStorage persistence across sessions

   ## Screenshots
   [Add screenshots if relevant]

   ## Checklist
   - [x] Tests pass locally
   - [x] Code follows style guidelines (AGENTS.md)
   - [x] Documentation updated
   - [x] Commit messages follow convention
   - [x] No breaking changes (or documented if so)

   Closes #38
   ```

4. **Link related issues:**
   - Use keywords: Closes, Fixes, Resolves
   - Example: "Closes #42, Fixes #43"

### After Submitting

1. **Respond to feedback:**
   - Check for review comments
   - Make requested changes promptly
   - Ask questions if unclear

2. **Keep your PR updated:**
   ```bash
   # Fetch latest changes
   git fetch upstream
   
   # Rebase your branch
   git rebase upstream/main
   
   # Force push (since you rebased)
   git push origin your-branch-name --force
   ```

3. **Be patient:**
   - Maintainers review in their free time
   - Complex PRs take longer to review
   - Contribute to other PRs while waiting

## Review Process

### What Reviewers Look For

1. **Code Quality:**
   - Follows coding standards (AGENTS.md)
   - Pure functions, no side effects
   - Immutable data structures
   - Clear, descriptive naming

2. **Tests:**
   - All tests pass
   - New code is tested
   - Edge cases covered
   - Tests are clear and maintainable

3. **Documentation:**
   - Code is self-documenting
   - Complex logic has comments
   - JSDoc for public functions
   - README updated if needed

4. **Impact:**
   - Changes are focused and minimal
   - No unrelated changes
   - Backwards compatible (or documented)
   - Aligns with project goals

### Review Timeline

- **Small fixes:** Usually reviewed within 1-3 days
- **Medium features:** Usually reviewed within 3-7 days
- **Large features:** May take 1-2 weeks

### Addressing Feedback

When you receive review comments:

1. **Acknowledge the feedback:**
   ```
   Thanks for the review! I'll make these changes.
   ```

2. **Make the requested changes:**
   - Create new commits with your fixes
   - Don't amend previous commits (makes review harder)
   - Push to your branch

3. **Respond to each comment:**
   - Mark as resolved when fixed
   - Explain your reasoning if you disagree
   - Ask for clarification if needed

4. **Request re-review:**
   - Once all changes are made
   - Comment: "Ready for re-review"

### Handling Disagreements

If you disagree with feedback:

1. **Explain your reasoning:**
   ```
   I understand your concern about performance, but I chose 
   this approach because [reason]. The performance impact is 
   negligible (<1ms) and it makes the code more maintainable.
   ```

2. **Provide data if relevant:**
   - Benchmark results
   - Bundle size comparisons
   - User experience improvements

3. **Be open to discussion:**
   - Maintainers have project knowledge
   - There might be context you're missing
   - Compromise is often possible

4. **Accept final decisions:**
   - Maintainers have final say
   - Learn from the feedback
   - Apply lessons to future PRs

## Testing Requirements

### Test Coverage

We maintain high test coverage standards:

- **Line coverage:** 100% (or 99%+)
- **Branch coverage:** 95%+
- **Function coverage:** 100%

### Writing Tests

Every function should have tests that cover:

1. **Happy path:**
   ```javascript
   it('should move snake right with direction {x: 1, y: 0}', () => {
     const snake = [{x: 5, y: 5}, {x: 4, y: 5}];
     const result = moveSnake(snake, {x: 1, y: 0});
     expect(result[0]).toEqual({x: 6, y: 5});
   });
   ```

2. **Edge cases:**
   ```javascript
   it('should handle snake at grid boundary (19, 19)', () => {
     const snake = [{x: 19, y: 19}];
     const result = checkBoundaryCollision(snake, 20, 20);
     expect(result).toBe(true);
   });
   ```

3. **Error conditions:**
   ```javascript
   it('should return empty array for empty snake', () => {
     const result = moveSnake([], {x: 1, y: 0});
     expect(result).toEqual([]);
   });
   ```

4. **Immutability:**
   ```javascript
   it('should not modify original snake array', () => {
     const snake = [{x: 5, y: 5}, {x: 4, y: 5}];
     const original = JSON.parse(JSON.stringify(snake));
     moveSnake(snake, {x: 1, y: 0});
     expect(snake).toEqual(original);
   });
   ```

### Test Structure

```javascript
describe('ModuleName', () => {
  describe('functionName', () => {
    it('should do something specific', () => {
      // Arrange
      const input = setupTestData();
      
      // Act
      const result = functionName(input);
      
      // Assert
      expect(result).toEqual(expectedOutput);
    });
  });
});
```

### Running Tests

```bash
# Run all tests once
npm test

# Watch mode (re-runs on file changes)
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Files

- Place tests in `tests/` directory
- Name test files: `[module].test.js`
- One test file per source file
- Import the module you're testing

## Documentation Requirements

### Code Documentation

1. **JSDoc for public functions:**
   ```javascript
   /**
    * Moves the snake in the specified direction.
    * @param {Array<{x: number, y: number}>} snake - Snake segments
    * @param {{x: number, y: number}} direction - Movement direction
    * @returns {Array<{x: number, y: number}>} New snake position
    */
   export function moveSnake(snake, direction) {
     // Implementation
   }
   ```

2. **Comments for complex logic:**
   ```javascript
   // Use fixed timestep (100ms) for deterministic game logic
   // while rendering at 60 FPS for smooth visuals
   const GAME_SPEED = 100;
   const FRAME_RATE = 1000 / 60;
   ```

3. **No obvious comments:**
   ```javascript
   // ❌ Don't do this
   let x = 5; // Set x to 5
   
   // ✅ Do this instead - code is self-documenting
   const initialSnakeX = 5;
   ```

### README Updates

Update README.md when you:
- Add new features
- Change project structure
- Add new commands or scripts
- Change setup instructions

### AGENTS.md Updates

Update AGENTS.md when you:
- Introduce new patterns
- Change architecture decisions
- Add new modules
- Modify coding standards

## Community and Support

### Where to Get Help

1. **GitHub Discussions:**
   - Ask questions
   - Share ideas
   - Show your projects

2. **GitHub Issues:**
   - Report bugs
   - Suggest features
   - Track progress

3. **README:**
   - Setup instructions
   - Project overview
   - Quick start guide

4. **AGENTS.md:**
   - Coding guidelines
   - Architecture decisions
   - Best practices

### Communication Guidelines

1. **Be respectful:**
   - Treat everyone with kindness
   - Assume good intentions
   - Give constructive feedback

2. **Be clear:**
   - Use descriptive titles
   - Provide context
   - Include examples

3. **Be patient:**
   - Maintainers are volunteers
   - Reviews take time
   - Everyone is learning

4. **Be helpful:**
   - Answer questions
   - Review others' PRs
   - Share knowledge

### Helping Others

You don't need to be an expert to help!

**Ways to help:**
- Answer questions in issues
- Review pull requests
- Improve documentation
- Share the project
- Report bugs
- Test new features

## Recognition

We value all contributions, big and small!

### Contributors

All contributors are recognized in:
- GitHub's contributor graph
- Pull request history
- Release notes

### Special Recognition

Outstanding contributors may be:
- Mentioned in release notes
- Invited as project collaborators
- Featured in documentation

### Hall of Fame

We maintain a list of top contributors in:
- README acknowledgments section
- Project documentation
- Release announcements

---

## Questions?

Still have questions? We're here to help!

- 💬 **Ask in Discussions:** Start a discussion on GitHub
- 🐛 **Report Issues:** Open an issue for bugs
- 📧 **Contact Maintainers:** Through GitHub
- 📚 **Read Docs:** Check README and AGENTS.md

---

Thank you for contributing to the AI Snake Game Tutorial! Your efforts help others learn and grow. Happy coding! 🚀
