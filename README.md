# 🐍 AI Snake Game Tutorial

A comprehensive tutorial repository demonstrating how to build a Snake game with a complete **AI Agent Ecosystem** including AGENTS.md, Ruler, and Skills.

[![Tests](https://github.com/santoshshinde2012/ai-snake-game-tutorial/workflows/test/badge.svg)](https://github.com/santoshshinde2012/ai-snake-game-tutorial/actions)
[![Coverage](https://img.shields.io/badge/coverage-90%25-brightgreen)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎮 Play the Game

[**Play Now**](https://santoshshinde2012.github.io/ai-snake-game-tutorial/) | [View Demo](https://github.com/santoshshinde2012/ai-snake-game-tutorial)

## 📚 What's Inside

This repository is a **complete learning resource** for:

- ✅ **Working Snake Game** - Fully functional with smooth controls
- ✅ **AI Agent Ecosystem** - AGENTS.md, Ruler, and Skills
- ✅ **90%+ Test Coverage** - Production-ready test suite
- ✅ **Complete Documentation** - Guides for every aspect
- ✅ **CI/CD Pipeline** - GitHub Actions workflow
- ✅ **Example Configurations** - Multiple setup patterns

## 🚀 Quick Start

### Option 1: Play in Browser

Simply open `index.html` in your browser!

### Option 2: Development Setup

```bash
# Clone repository
git clone https://github.com/santoshshinde2012/ai-snake-game-tutorial.git
cd ai-snake-game-tutorial

# Install dependencies
npm install

# Run tests
npm test

# Run linter
npm run lint

# Open game
open index.html
```

See [SETUP.md](SETUP.md) for detailed setup instructions.

## 🎯 Features

### Game Features
- 🐍 Classic Snake gameplay
- ⌨️ Dual control schemes (Arrow keys + WASD)
- ⏸️ Pause/Resume functionality
- 🏆 Score tracking
- 🎨 Beautiful modern UI
- 📱 Responsive design

### Development Features
- 🧪 **33+ Unit Tests** with Jest
- 📊 **90%+ Code Coverage**
- 🔍 **ESLint** for code quality
- 🤖 **AGENTS.md** for AI assistance
- 📏 **Ruler** for centralized rules
- 🛠️ **Skills** for automation
- 🔄 **CI/CD** with GitHub Actions

## 📖 Documentation

### Core Documentation
- [**Tutorial**](docs/TUTORIAL.md) - Complete step-by-step guide
- [**Setup Guide**](SETUP.md) - Quick setup instructions
- [**Architecture**](docs/ARCHITECTURE.md) - System design details
- [**Contributing**](CONTRIBUTING.md) - How to contribute

### AI Agent Ecosystem
- [**AGENTS.md Guide**](docs/AGENTS_MD_GUIDE.md) - Understanding AGENTS.md
- [**Ruler Guide**](docs/RULER_GUIDE.md) - Centralized rules management
- [**Skills Guide**](docs/SKILLS_GUIDE.md) - Reusable agent capabilities
- [**AGENTS.md**](AGENTS.md) - This project's agent instructions

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│              UI Layer (HTML/CSS)                │
│  ┌──────────────┐  ┌──────────────┐            │
│  │  index.html  │  │  style.css   │            │
│  └──────────────┘  └──────────────┘            │
└─────────────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│           Game Loop (src/main.js)               │
└─────────────────────────────────────────────────┘
         │               │               │
         ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ src/game.js  │ │src/renderer  │ │ src/input.js │
│ Game Logic   │ │  Rendering   │ │   Controls   │
└──────────────┘ └──────────────┘ └──────────────┘
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm run test:watch

# Run specific test file
npm test tests/game.test.js
```

### Test Coverage
- **Lines**: 95%+
- **Branches**: 90%+
- **Functions**: 95%+
- **Statements**: 95%+

## 🤖 AI Agent Ecosystem

### AGENTS.md
Instructions for AI agents working on this codebase:

```markdown
See AGENTS.md for:
- Project structure
- Coding conventions
- Testing requirements
- Development workflow
```

### Ruler (`.ruler/`)
Centralized rules management:

```toml
[ruler]
version = "1.0.0"
enabled = true
```

### Skills (`.skills/`)
Reusable automation:

```
.skills/game-testing/
├── SKILL.md
└── scripts/run_tests.py
```

## 📁 Project Structure

```
ai-snake-game-tutorial/
├── src/                    # Source code
│   ├── game.js            # Game logic
│   ├── renderer.js        # Canvas rendering
│   ├── input.js           # Input handling
│   └── main.js            # Game loop
├── tests/                 # Test files
│   ├── game.test.js       # Game logic tests (33+ tests)
│   ├── renderer.test.js   # Renderer tests
│   └── input.test.js      # Input tests
├── docs/                  # Documentation
│   ├── TUTORIAL.md        # Step-by-step tutorial
│   ├── ARCHITECTURE.md    # Architecture guide
│   ├── AGENTS_MD_GUIDE.md # AGENTS.md guide
│   ├── RULER_GUIDE.md     # Ruler guide
│   └── SKILLS_GUIDE.md    # Skills guide
├── .ruler/                # Centralized rules
│   ├── AGENTS.md          # Shared agent rules
│   └── ruler.toml         # Ruler configuration
├── .skills/               # Agent skills
│   └── game-testing/      # Testing skill
├── examples/              # Example configurations
│   ├── 01-basic-setup/
│   ├── 02-with-ruler/
│   └── 03-with-skills/
├── .github/               # GitHub configuration
│   ├── workflows/
│   └── ISSUE_TEMPLATE/
├── index.html             # Game entry point
├── style.css              # Styling
├── package.json           # Dependencies
├── jest.config.js         # Jest configuration
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore rules
├── SETUP.md               # Setup instructions
├── AGENTS.md              # AI agent instructions
├── LICENSE                # MIT License
├── CONTRIBUTING.md        # Contributing guidelines
├── CODE_OF_CONDUCT.md     # Code of conduct
└── README.md              # This file
```

## 🎓 Learning Path

1. **Read the Tutorial** - [docs/TUTORIAL.md](docs/TUTORIAL.md)
2. **Study the Code** - Start with `src/game.js`
3. **Run the Tests** - `npm test`
4. **Understand AI Ecosystem** - Read the guides
5. **Contribute** - See [CONTRIBUTING.md](CONTRIBUTING.md)

## 🔧 Technologies

- **Language**: JavaScript (ES6+)
- **Testing**: Jest 29.x
- **Linting**: ESLint 8.x
- **CI/CD**: GitHub Actions
- **Runtime**: Browser (no build tools required)

## 🎮 Controls

| Key | Action |
|-----|--------|
| `↑` `↓` `←` `→` | Move snake (Arrow keys) |
| `W` `A` `S` `D` | Move snake (Alternative) |
| `P` | Pause/Resume |
| `Space` | Restart (when game over) |

## 🌟 Examples

Explore different configurations:

### Basic Setup
```bash
cd examples/01-basic-setup
cat README.md
```

### With Ruler
```bash
cd examples/02-with-ruler
cat .ruler/AGENTS.md
```

### With Skills
```bash
cd examples/03-with-skills
cat .skills/game-testing/SKILL.md
```

## 📊 Quality Metrics

- ✅ **90%+ Test Coverage**
- ✅ **Zero ESLint Errors**
- ✅ **All Tests Passing**
- ✅ **Comprehensive Documentation**
- ✅ **CI/CD Pipeline**
- ✅ **Production Ready**

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run test suite
6. Submit pull request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic Snake games
- Built to demonstrate AI agent ecosystem patterns
- Community contributions welcome

## 📞 Support

- [GitHub Issues](https://github.com/santoshshinde2012/ai-snake-game-tutorial/issues)
- [Discussions](https://github.com/santoshshinde2012/ai-snake-game-tutorial/discussions)
- [Documentation](docs/)

## 🔗 Related Resources

- [Canvas API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Jest Testing Framework](https://jestjs.io/)
- [ESLint Documentation](https://eslint.org/)
- [GitHub Actions](https://docs.github.com/en/actions)

## 📈 Project Status

- ✅ Core game complete
- ✅ Test suite complete (90%+ coverage)
- ✅ Documentation complete
- ✅ CI/CD pipeline active
- ✅ Examples provided
- ✅ Production ready

## 🚀 Getting Started in 30 Seconds

```bash
git clone https://github.com/santoshshinde2012/ai-snake-game-tutorial.git
cd ai-snake-game-tutorial
npm install
npm test
open index.html
```

That's it! Start playing and learning! 🎮

---

**Made with ❤️ for the developer community**

**⭐ Star this repository if you find it helpful!**