---
name: nextjs-testing
description: Testing patterns for Next.js + TypeScript projects with React Testing Library
---

# Next.js Testing Skill

## Pure Function Testing
```typescript
import { moveSnake, Direction } from '@/lib/game/gameLogic';
import { Position } from '@/lib/game/types';

describe('moveSnake', () => {
  it('should move snake in specified direction', () => {
    const snake: Position[] = [{ x: 5, y: 5 }];
    const result = moveSnake(snake, Direction.RIGHT);
    
    expect(result[0]).toEqual({ x: 6, y: 5 });
    expect(snake[0].x).toBe(5); // Original unchanged
  });
});
```

## React Component Testing
```typescript
import { render, screen } from '@testing-library/react';
import { GameCanvas } from '@/components/Game/GameCanvas';
import { createInitialState } from '@/lib/game/gameLogic';

describe('GameCanvas', () => {
  it('should render canvas element', () => {
    const gameState = createInitialState();
    render(<GameCanvas gameState={gameState} cellSize={20} gridSize={20} />);
    
    const canvas = screen.getByRole('img');
    expect(canvas).toBeInTheDocument();
  });
});
```

## Canvas Mocking
```typescript
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    fillStyle: '',
  }));
});
```

## Hook Testing
```typescript
import { renderHook, act } from '@testing-library/react';
import { useGameLoop } from '@/lib/hooks/useGameLoop';

describe('useGameLoop', () => {
  it('should call callback at specified FPS', () => {
    jest.useFakeTimers();
    const callback = jest.fn();
    
    renderHook(() => useGameLoop(60, callback));
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(callback).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
```

## Integration Testing
```typescript
import { render, fireEvent } from '@testing-library/react';
import Page from '@/app/page';

describe('Snake Game Integration', () => {
  it('should handle full game flow', () => {
    const { getByText } = render(<Page />);
    
    // Start game
    const startButton = getByText(/start/i);
    fireEvent.click(startButton);
    
    // Simulate key press
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    
    // Verify game state updated
    expect(getByText(/score/i)).toBeInTheDocument();
  });
});
```

## Best Practices
1. Test behavior, not implementation
2. Use meaningful test descriptions
3. Keep tests focused and isolated
4. Mock external dependencies
5. Test edge cases and error conditions
6. Maintain 90%+ code coverage
