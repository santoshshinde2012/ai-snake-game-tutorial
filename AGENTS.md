# Next.js Snake Game - AI Development Guide

## Tech Stack
- Next.js 14+ (App Router)
- TypeScript 5+ (Strict mode)
- Tailwind CSS
- Jest + React Testing Library

## Architecture

### Directory Structure
- `app/` - Next.js pages and layouts
- `components/` - React components
- `lib/game/` - Pure game logic (TypeScript)
- `lib/hooks/` - React hooks
- `__tests__/` - Test files

### Core Principles
1. **Pure Functions**: All game logic in `lib/game/` must be pure
2. **TypeScript Strict**: No `any`, all types explicit
3. **Immutable State**: Use spread operators, no mutations
4. **Separation of Concerns**: 
   - `gameLogic.ts` - Pure game rules
   - `gameEngine.ts` - Game state management
   - Components - Rendering only

### Code Standards
```typescript
// ✅ CORRECT
const moveSnake = (snake: Position[], direction: Direction): Position[] => {
  const head = { ...snake[0] };
  // Immutable update
  return [head, ...snake.slice(0, -1)];
};

// ❌ WRONG
const moveSnake = (snake: Position[], direction: Direction): Position[] => {
  snake[0].x += 1; // Mutation!
  return snake;
};
```

### Testing
- TDD approach required
- 90%+ coverage
- Test file naming: `*.test.ts` or `*.test.tsx`
- Mock Canvas API in tests

### Common Commands
```bash
npm run dev          # Development server
npm run build        # Production build
npm test             # Run tests
npm run test:watch   # Watch mode
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

## Game Architecture

### Game State Flow
1. User input → Direction change
2. Game loop → Update state
3. State update → Check collisions
4. Render → Canvas drawing

### Component Hierarchy
```
page.tsx
└── GameCanvas (canvas rendering)
└── GameControls (pause/resume)
└── GameScore (score display)
└── GameOver (game over screen)
```

### Hook Usage
- `useGameLoop` - Main game loop (60 FPS)
- `useKeyboard` - Keyboard input handling
- `useCanvas` - Canvas ref and drawing

## Development Workflow

1. Write pure function in `lib/game/gameLogic.ts`
2. Write test in `__tests__/lib/gameLogic.test.ts`
3. Implement function with immutable patterns
4. Verify test passes and coverage > 90%
5. Create React component using the function
6. Write component test
7. Integrate into page

## Common Patterns

### Immutable State Updates
```typescript
// Adding to snake
const newSnake = [newHead, ...snake.slice(0, -1)];

// Changing direction
const newState = { ...state, direction: newDirection };

// Generating new food
const newFood = { x: randomX, y: randomY };
```

### Canvas Rendering
```typescript
const draw = (ctx: CanvasRenderingContext2D) => {
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Draw snake
  snake.forEach(segment => {
    ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
  });
  
  // Draw food
  ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
};
```

### Keyboard Handling
```typescript
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (['arrowup', 'w'].includes(key)) setDirection(Direction.UP);
    // ... other directions
  };
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

## Testing Patterns

### Pure Function Test
```typescript
describe('checkWallCollision', () => {
  it('should detect collision with top wall', () => {
    const head = { x: 5, y: -1 };
    expect(checkWallCollision(head, 20)).toBe(true);
  });
  
  it('should return false when not colliding', () => {
    const head = { x: 5, y: 5 };
    expect(checkWallCollision(head, 20)).toBe(false);
  });
});
```

### Component Test
```typescript
describe('GameCanvas', () => {
  it('should render canvas with correct dimensions', () => {
    const gameState = createInitialState();
    render(<GameCanvas gameState={gameState} cellSize={20} gridSize={20} />);
    
    const canvas = screen.getByRole('img');
    expect(canvas).toHaveAttribute('width', '400');
    expect(canvas).toHaveAttribute('height', '400');
  });
});
```

## Troubleshooting

### Canvas not rendering
- Ensure `useEffect` with proper dependencies
- Check canvas dimensions are set
- Verify `getContext('2d')` returns valid context

### Tests failing
- Mock Canvas API in jest.setup.js
- Use `act()` for state updates
- Check immutability of state updates

### TypeScript errors
- Enable strict mode in tsconfig.json
- Add explicit return types
- Avoid `any` type
