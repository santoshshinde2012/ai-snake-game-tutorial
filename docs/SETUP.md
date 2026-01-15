# Setup Guide

Welcome to the AI Snake Game Tutorial! This guide will help you get the project up and running quickly.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js 18.0.0 or higher** - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A code editor (VS Code recommended)
- Git (for cloning the repository)

### Verifying Prerequisites

Check your Node.js and npm versions:

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 8.0.0 or higher
```

## Quick Start

Get the project running in 3 simple commands:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-snake-game-tutorial.git
cd ai-snake-game-tutorial
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Jest (testing framework)
- jsdom (DOM simulation for tests)
- Other development dependencies

### 3. Run Tests

```bash
npm test
```

Expected output:
```
PASS tests/game.test.js
PASS tests/input.test.js
PASS tests/renderer.test.js

Test Suites: 3 passed, 3 total
Tests:       XX passed, XX total
```

## Running the Game

### Option 1: Direct File Access (Simplest)

1. Open your file browser
2. Navigate to the project directory
3. Double-click `index.html`
4. The game will open in your default browser

### Option 2: Using a Local Server (Recommended)

For a more production-like environment:

**Using Python 3:**
```bash
python -m http.server 8000
```

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open your browser and navigate to:
```
http://localhost:8000
```

### Option 3: VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

Automatically re-run tests when files change:

```bash
npm test -- --watch
```

### Run Tests with Coverage

See which parts of your code are tested:

```bash
npm test -- --coverage
```

Coverage report will be generated in the `coverage/` directory. Open `coverage/lcov-report/index.html` in your browser to view the detailed report.

### Run a Specific Test File

```bash
npm test -- tests/game.test.js
```

### Run Tests Matching a Pattern

```bash
npm test -- --testNamePattern="collision"
```

## Project Structure

```
ai-snake-game-tutorial/
├── index.html          # Main HTML file
├── style.css           # Game styling
├── src/                # Source code
│   ├── game.js         # Core game logic
│   ├── renderer.js     # Canvas rendering
│   ├── input.js        # Input handling
│   └── main.js         # Application entry point
├── tests/              # Test files
│   ├── game.test.js
│   ├── input.test.js
│   └── renderer.test.js
├── docs/               # Documentation
├── package.json        # Project configuration
└── jest.config.js      # Test configuration
```

## Development Workflow

1. **Make changes** to source files in `src/`
2. **Run tests** to verify functionality: `npm test`
3. **Open the game** in browser to see visual changes
4. **Iterate** until satisfied

## Troubleshooting

### Issue: "npm: command not found"

**Problem:** Node.js/npm is not installed or not in your PATH.

**Solution:**
1. Download and install Node.js from [nodejs.org](https://nodejs.org/)
2. Restart your terminal
3. Verify installation: `npm --version`

### Issue: "Cannot find module 'jest'"

**Problem:** Dependencies are not installed.

**Solution:**
```bash
npm install
```

### Issue: Tests are failing

**Problem:** Code changes broke existing functionality.

**Solution:**
1. Read the test error messages carefully
2. Check which test is failing
3. Review recent changes to the corresponding source file
4. Run a single test file to isolate the issue:
   ```bash
   npm test -- tests/game.test.js
   ```

### Issue: Game doesn't display in browser

**Problem:** Browser console shows errors, or canvas is blank.

**Solution:**
1. Open browser DevTools (F12 or Cmd+Option+I)
2. Check the Console tab for JavaScript errors
3. Verify all files are in the correct locations
4. Check that `index.html` correctly references all JS files
5. Try hard-refreshing the page (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: "CORS policy" error in browser console

**Problem:** Browser security prevents loading local files via file:// protocol.

**Solution:**
Use a local web server (see "Running the Game - Option 2" above).

### Issue: Game runs slowly or stutters

**Problem:** Performance issues on your system.

**Solution:**
1. Close other browser tabs and applications
2. Try a different browser
3. Check if your browser's hardware acceleration is enabled
4. Reduce the game grid size (edit `GRID_SIZE` in `src/game.js`)

### Issue: Arrow keys scroll the page

**Problem:** Default browser behavior interferes with game controls.

**Solution:**
This is handled in the code via `event.preventDefault()` in `src/input.js`. If it's not working:
1. Click inside the game canvas to focus it
2. Check browser console for errors
3. Verify `input.js` is loaded correctly

### Issue: npm install takes a long time

**Problem:** Slow network or npm registry issues.

**Solution:**
1. Wait patiently (first install can take 1-2 minutes)
2. Try using a different npm registry:
   ```bash
   npm install --registry=https://registry.npmjs.org/
   ```
3. Clear npm cache and retry:
   ```bash
   npm cache clean --force
   npm install
   ```

### Issue: Tests pass but game doesn't work

**Problem:** Tests may not cover all scenarios or visual rendering issues.

**Solution:**
1. Tests verify logic, not visual rendering
2. Check browser console for runtime errors
3. Verify canvas element exists in `index.html`
4. Check that `main.js` properly initializes all components

## Getting Help

If you encounter issues not covered here:

1. **Check the documentation** in the `docs/` folder
2. **Review the code comments** in source files
3. **Check existing issues** on GitHub
4. **Create a new issue** with:
   - Your Node.js version
   - Your operating system
   - Steps to reproduce the problem
   - Error messages (if any)
   - Screenshots (if relevant)

## Next Steps

Now that you have the project running:

1. **Explore the code** - Start with `src/main.js` and follow the flow
2. **Read ARCHITECTURE.md** - Understand the system design
3. **Follow TUTORIAL.md** - Build the project step-by-step
4. **Learn about AGENTS.md** - See `docs/AGENTS_MD_GUIDE.md`
5. **Configure Ruler** - See `docs/RULER_GUIDE.md`
6. **Create Skills** - See `docs/SKILLS_GUIDE.md`

## System Requirements

### Minimum Requirements
- CPU: 1 GHz processor
- RAM: 1 GB available memory
- Browser: Any modern browser from the last 2 years
- Disk Space: 100 MB (including node_modules)

### Recommended Requirements
- CPU: 2 GHz+ processor
- RAM: 4 GB+ available memory
- Browser: Latest version of Chrome, Firefox, Safari, or Edge
- Disk Space: 500 MB (for development tools and caching)

## Environment Variables

This project doesn't require any environment variables for basic operation. However, you can configure test behavior:

```bash
# Run tests in verbose mode
npm test -- --verbose

# Set Node memory limit (if needed for large projects)
NODE_OPTIONS=--max_old_space_size=4096 npm test
```

## IDE Setup

### VS Code (Recommended)

Install these extensions for the best experience:

1. **ESLint** - JavaScript linting
2. **Prettier** - Code formatting
3. **Live Server** - Local development server
4. **Jest** - Test explorer
5. **Path Intellisense** - Autocomplete file paths

### WebStorm

WebStorm has built-in support for JavaScript and Jest. Configuration is automatic.

### Other Editors

Any text editor works! For the best experience, ensure you have:
- Syntax highlighting for JavaScript
- A way to run npm commands from the terminal
- A browser for testing

## Browser Compatibility

The game is tested and works on:

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

Older browsers may work but are not officially supported.

## Performance Tips

For the best development experience:

1. Use Chrome DevTools Performance tab to profile the game loop
2. Monitor the FPS counter (if you add one)
3. Keep DevTools closed when not debugging (slight performance impact)
4. Use production mode for testing final performance

## Additional Resources

- [JavaScript MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Canvas API Reference](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Node.js Documentation](https://nodejs.org/docs/)

---

**Ready to dive deeper?** Check out [TUTORIAL.md](./TUTORIAL.md) for a comprehensive step-by-step guide!
