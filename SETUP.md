# Quick Setup Guide

Get the AI Snake Game Tutorial running in minutes!

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 14 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A code editor (VS Code recommended)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/santoshshinde2012/ai-snake-game-tutorial.git
cd ai-snake-game-tutorial
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- Jest (testing framework)
- ESLint (code linter)
- jest-canvas-mock (Canvas API mocking)
- jest-environment-jsdom (browser environment simulation)

### 3. Verify Installation

```bash
npm test
```

Expected output:
```
PASS  tests/game.test.js
PASS  tests/renderer.test.js
PASS  tests/input.test.js

Test Suites: 3 passed, 3 total
Tests:       33 passed, 33 total
Coverage:    95%
```

## Playing the Game

### Option 1: Direct Browser Open

Simply double-click `index.html` or:

```bash
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

### Option 2: Local Server (Recommended)

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000

# Then open: http://localhost:8000
```

## Development Workflow

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Linting Code

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix
```

### Project Structure

```
ai-snake-game-tutorial/
├── src/              # Source code
├── tests/            # Test files
├── docs/             # Documentation
├── index.html        # Game entry point
└── package.json      # Dependencies
```

## Troubleshooting

### Node.js Not Installed?

Download from [nodejs.org](https://nodejs.org/) and install.

Verify installation:
```bash
node --version
npm --version
```

### Installation Fails?

Try clearing npm cache:
```bash
npm cache clean --force
npm install
```

### Tests Not Running?

Ensure you're in the project directory:
```bash
cd ai-snake-game-tutorial
npm test
```

### Canvas Not Rendering?

Check browser console (F12) for errors. Ensure:
- Scripts load in correct order
- Browser supports Canvas API
- No JavaScript errors

### Port Already in Use?

Use a different port:
```bash
python -m http.server 8080
npx http-server -p 8080
```

## IDE Setup

### Visual Studio Code

Recommended extensions:
- ESLint
- Jest
- JavaScript (ES6) code snippets
- Prettier

Install extensions:
```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension Orta.vscode-jest
```

### JetBrains IDEs

Enable:
- ESLint plugin
- Jest plugin
- Node.js support

## Next Steps

1. **Play the Game**: Open `index.html`
2. **Read the Tutorial**: See [docs/TUTORIAL.md](docs/TUTORIAL.md)
3. **Explore the Code**: Start with `src/game.js`
4. **Run Tests**: `npm test`
5. **Make Changes**: Try modifying game speed or colors

## Quick Commands Reference

```bash
# Installation
npm install              # Install dependencies

# Development
npm test                 # Run tests
npm run test:watch       # Watch mode
npm run lint             # Check code style
npm run lint:fix         # Fix code style

# Game
open index.html          # Play the game
```

## Common Tasks

### Changing Game Speed

Edit `src/main.js`:
```javascript
this.fps = 10; // Change to 15 for faster
```

### Changing Colors

Edit `src/renderer.js`:
```javascript
const COLORS = {
  SNAKE_HEAD: '#4CAF50', // Change colors here
  // ...
};
```

### Adding New Tests

Create file in `tests/` directory:
```javascript
// tests/my-feature.test.js
describe('My Feature', () => {
  test('should work', () => {
    expect(true).toBe(true);
  });
});
```

## Getting Help

- **Documentation**: See [docs/](docs/) directory
- **Issues**: [GitHub Issues](https://github.com/santoshshinde2012/ai-snake-game-tutorial/issues)
- **Discussions**: [GitHub Discussions](https://github.com/santoshshinde2012/ai-snake-game-tutorial/discussions)

## System Requirements

### Minimum
- Node.js 14+
- 2 GB RAM
- Modern browser

### Recommended
- Node.js 18+
- 4 GB RAM
- Chrome/Firefox latest version

## Platform-Specific Notes

### macOS
```bash
# Install Homebrew (if needed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

### Windows
```bash
# Install via installer or Chocolatey
choco install nodejs

# Or download from nodejs.org
```

### Linux (Ubuntu/Debian)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Verification Checklist

After setup, verify:

- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Dependencies installed (check `node_modules/`)
- [ ] Tests pass (`npm test`)
- [ ] Game runs (`open index.html`)
- [ ] No console errors (check browser F12)

## Ready to Code!

You're all set! Start exploring the codebase and making changes.

For a comprehensive guide, see the [Tutorial](docs/TUTORIAL.md).

Happy coding! 🚀
