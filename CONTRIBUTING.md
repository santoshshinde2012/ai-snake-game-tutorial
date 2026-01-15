# Contributing to AI Snake Game Tutorial

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** explaining why this would be useful
- **Possible implementation** (if you have ideas)
- **Examples** from other projects (if applicable)

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/my-new-feature
   ```
3. **Make your changes** following our coding standards
4. **Add tests** for new functionality
5. **Ensure tests pass**: `npm test`
6. **Ensure linting passes**: `npm run lint`
7. **Commit your changes**:
   ```bash
   git commit -m "feat: add new feature"
   ```
8. **Push to your fork**:
   ```bash
   git push origin feature/my-new-feature
   ```
9. **Create a Pull Request**

## Development Process

### Setup Development Environment

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ai-snake-game-tutorial.git
cd ai-snake-game-tutorial

# Install dependencies
npm install

# Run tests
npm test

# Run linter
npm run lint
```

### Coding Standards

#### JavaScript Style

- Use ES6+ features
- Follow ESLint rules (`.eslintrc.json`)
- Use meaningful variable names
- Keep functions small and focused

```javascript
// ✅ Good
function calculateNewHeadPosition(currentHead, direction) {
  return {
    x: currentHead.x + direction.x,
    y: currentHead.y + direction.y
  };
}

// ❌ Bad
function calc(h, d) {
  return { x: h.x + d.x, y: h.y + d.y };
}
```

#### State Management

- Always use immutable updates
- Never mutate function parameters
- Return new objects/arrays

```javascript
// ✅ Good
function addScore(state, points) {
  return { ...state, score: state.score + points };
}

// ❌ Bad
function addScore(state, points) {
  state.score += points;
  return state;
}
```

### Testing Standards

#### Coverage Requirements

- **Minimum 90% coverage** for all code
- Test all public functions
- Test edge cases and error conditions
- Mock browser APIs appropriately

#### Test Structure

```javascript
describe('Feature', () => {
  describe('specific behavior', () => {
    test('should do something', () => {
      // Arrange
      const input = createTestData();
      
      // Act
      const result = functionUnderTest(input);
      
      // Assert
      expect(result).toEqual(expected);
    });
  });
});
```

#### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test tests/game.test.js

# Run with coverage
npm test -- --coverage

# Watch mode
npm run test:watch
```

### Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

#### Examples

```bash
feat(game): add difficulty levels
fix(renderer): correct snake eye positioning
docs(tutorial): add AI implementation guide
test(game): add collision detection tests
```

## Project Structure

### Adding New Files

#### Source Files

Place in `src/`:
```
src/
├── game.js       # Game logic
├── renderer.js   # Rendering
├── input.js      # Input handling
├── main.js       # Game loop
└── new-file.js   # Your new module
```

#### Test Files

Place in `tests/` with `.test.js` suffix:
```
tests/
├── game.test.js
├── renderer.test.js
├── input.test.js
└── new-file.test.js
```

#### Documentation

Place in `docs/`:
```
docs/
├── TUTORIAL.md
├── ARCHITECTURE.md
└── YOUR_GUIDE.md
```

### Modifying Existing Files

#### Game Logic (`src/game.js`)

- Keep functions pure
- No side effects
- Export for testing
- Add corresponding tests

#### Renderer (`src/renderer.js`)

- Only visual code
- No game logic
- Test with mocked Canvas

#### Input (`src/input.js`)

- Event handling only
- Use callbacks
- Clean up listeners

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests added for new features
- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Coverage remains ≥90%
- [ ] Documentation updated
- [ ] Commit messages follow convention

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe tests added/modified

## Checklist
- [ ] Tests pass
- [ ] Linting passes
- [ ] Coverage ≥90%
- [ ] Documentation updated
```

### Review Process

1. Automated checks run (tests, linting)
2. Code review by maintainers
3. Address feedback
4. Approval and merge

## Documentation Guidelines

### Update When

- Adding new features
- Changing APIs
- Modifying architecture
- Updating dependencies

### What to Update

- `README.md` - User-facing changes
- `AGENTS.md` - Development process changes
- `docs/ARCHITECTURE.md` - Structural changes
- `docs/TUTORIAL.md` - Learning path changes

### Documentation Style

- Clear and concise
- Use examples
- Include code snippets
- Link to related docs

## Community

### Communication

- **GitHub Issues** - Bug reports and features
- **GitHub Discussions** - Questions and ideas
- **Pull Requests** - Code contributions

### Getting Help

- Check [documentation](docs/)
- Search existing issues
- Ask in discussions
- Contact maintainers

## Recognition

Contributors are recognized in:
- GitHub contributors list
- Release notes
- Project documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

If you have questions about contributing, please:
1. Check this guide
2. Read the documentation
3. Ask in GitHub Discussions
4. Contact maintainers

Thank you for contributing! 🎉
