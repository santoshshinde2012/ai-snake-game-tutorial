# Next.js Snake Game with AI Agent Ecosystem

A modern, fully-tested Snake game built with Next.js 14, TypeScript, and Tailwind CSS, demonstrating best practices for AI-assisted development through the complete AI Agent Ecosystem (AGENTS.md, Ruler, and Agent Skills).

## 🎮 Features

- **Modern React Architecture**: Built with Next.js 14 App Router and React hooks
- **Type-Safe Development**: TypeScript in strict mode with 100% type coverage
- **Canvas Rendering**: Smooth game rendering using HTML5 Canvas API
- **Responsive Controls**: Keyboard controls (Arrow keys + WASD) with pause functionality
- **Score Tracking**: Real-time score and high score persistence (localStorage)
- **Beautiful UI**: Tailwind CSS styling with modern design
- **Comprehensive Testing**: 93%+ test coverage with Jest and React Testing Library
- **AI Development Ready**: Complete AGENTS.md, Ruler configuration, and skills documentation

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play the game!

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 🎯 How to Play

- **Arrow Keys** or **WASD**: Control snake direction
- **Space** or **P**: Pause/Resume game
- **Eat food** (red circles) to grow and increase score
- **Avoid walls** and **don't bite yourself**!

## 🏗️ Project Structure

```
nextjs-snake-game/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main game page
│   └── globals.css              # Global styles (Tailwind)
├── components/
│   ├── Game/                    # Game-specific components
│   │   ├── GameCanvas.tsx       # Canvas rendering
│   │   ├── GameControls.tsx     # Game control buttons
│   │   ├── GameScore.tsx        # Score display
│   │   └── GameOver.tsx         # Game over screen
│   └── UI/                      # Reusable UI components
│       ├── Button.tsx           # Button component
│       └── Card.tsx             # Card container
├── lib/
│   ├── game/                    # Core game logic (pure functions)
│   │   ├── types.ts            # TypeScript type definitions
│   │   ├── constants.ts        # Game constants
│   │   ├── gameLogic.ts        # Pure game functions
│   │   └── gameEngine.ts       # Game state management
│   ├── hooks/                   # Custom React hooks
│   │   ├── useGameLoop.ts      # Game loop hook
│   │   ├── useKeyboard.ts      # Keyboard input hook
│   │   └── useCanvas.ts        # Canvas ref hook
│   └── utils/                   # Utility functions
│       └── helpers.ts          # Helper utilities
├── __tests__/                   # Test files
│   ├── lib/                     # Logic tests
│   └── components/              # Component tests
├── .ruler/                      # AI Agent Ecosystem
│   ├── AGENTS.md               # Organization-wide standards
│   └── ruler.toml              # Ruler configuration
├── .skills/                     # Agent skills
│   └── nextjs-testing/         # Testing patterns
│       └── SKILL.md            # Testing skill documentation
├── AGENTS.md                    # Project-specific AI guide
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── jest.config.js              # Jest config
├── next.config.js              # Next.js config
└── tailwind.config.js          # Tailwind config
```

## 🧪 Testing

This project maintains **93%+ test coverage** across all code.

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage

- **Statements**: 95.58%
- **Branches**: 93.47%
- **Functions**: 100%
- **Lines**: 98.19%

### Test Structure

- **Unit Tests**: Pure functions in `lib/game/` (100% coverage)
- **Component Tests**: React components with React Testing Library
- **Hook Tests**: Custom hooks with renderHook
- **Integration Tests**: Full game flow testing

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm start            # Start production server
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Code Quality Standards

- **TypeScript Strict Mode**: Enabled with no implicit `any`
- **ESLint**: Next.js recommended configuration
- **Pure Functions**: All game logic is pure and immutable
- **Component Props**: All components have typed interfaces
- **Test Coverage**: Minimum 90% coverage required

## 🤖 AI Agent Ecosystem

This project demonstrates a complete AI Agent Ecosystem for AI-assisted development:

### AGENTS.md (Project Root)

Project-specific development guide for AI agents including:
- Tech stack overview
- Architecture principles
- Code standards and patterns
- Testing requirements
- Common commands

### .ruler/ Directory

Organization-wide standards and configuration:
- **AGENTS.md**: TypeScript, testing, and code quality standards
- **ruler.toml**: Automated quality checks and rules

### .skills/ Directory

Reusable AI agent skills:
- **nextjs-testing**: Testing patterns for Next.js + TypeScript
  - Pure function testing
  - Component testing
  - Hook testing
  - Canvas mocking

## 🎨 Architecture

### Core Principles

1. **Separation of Concerns**
   - `lib/game/gameLogic.ts`: Pure game rules (no side effects)
   - `lib/game/gameEngine.ts`: State management
   - Components: Rendering only

2. **Immutability**
   - All state updates use spread operators
   - Original objects never mutated
   - Pure functions for predictable behavior

3. **Type Safety**
   - Strict TypeScript mode
   - Explicit return types
   - No `any` types allowed

### Game Loop Flow

```
User Input → Direction Change
     ↓
Game Loop (useGameLoop)
     ↓
Update State (gameLogic)
     ↓
Check Collisions
     ↓
Update Score/Food
     ↓
Render Canvas (GameCanvas)
```

## 📚 Key Technologies

- **Framework**: Next.js 14.2+ (App Router)
- **Language**: TypeScript 5.4+
- **Styling**: Tailwind CSS 3.4+
- **Testing**: Jest 29+ & React Testing Library 14+
- **Linting**: ESLint 8+ (Next.js config)
- **Type Checking**: TypeScript Compiler

## 🎓 Learning Resources

This project is perfect for learning:
- Next.js App Router architecture
- TypeScript strict mode patterns
- React hooks (custom hooks)
- Canvas API for games
- Test-Driven Development (TDD)
- Pure functional programming
- AI-assisted development patterns

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Follow the patterns in `AGENTS.md`
2. Maintain 90%+ test coverage
3. Use TypeScript strict mode
4. Write pure functions for game logic
5. Add tests for new features

## 📝 License

MIT License - feel free to use this project for learning and development!

## 🙏 Acknowledgments

Built as a demonstration of:
- Modern React and Next.js patterns
- Type-safe development with TypeScript
- Test-Driven Development (TDD)
- AI Agent Ecosystem for assisted development
- Clean code architecture

---

**Enjoy playing Snake! 🐍** If you found this helpful, please star the repository!