import { render, screen } from '@testing-library/react';
import { GameCanvas } from '@/components/Game/GameCanvas';
import { createInitialState } from '@/lib/game/gameLogic';
import { GRID_SIZE, CELL_SIZE } from '@/lib/game/constants';

describe('GameCanvas', () => {
  it('should render canvas element', () => {
    const gameState = createInitialState();
    render(
      <GameCanvas gameState={gameState} cellSize={CELL_SIZE} gridSize={GRID_SIZE} />
    );
    
    const canvas = screen.getByRole('img');
    expect(canvas).toBeInTheDocument();
  });

  it('should have correct dimensions', () => {
    const gameState = createInitialState();
    render(
      <GameCanvas gameState={gameState} cellSize={CELL_SIZE} gridSize={GRID_SIZE} />
    );
    
    const canvas = screen.getByRole('img') as HTMLCanvasElement;
    expect(canvas.width).toBe(GRID_SIZE * CELL_SIZE);
    expect(canvas.height).toBe(GRID_SIZE * CELL_SIZE);
  });

  it('should have accessible label', () => {
    const gameState = createInitialState();
    render(
      <GameCanvas gameState={gameState} cellSize={CELL_SIZE} gridSize={GRID_SIZE} />
    );
    
    const canvas = screen.getByLabelText('Snake game canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('should update when game state changes', () => {
    const gameState = createInitialState();
    const { rerender } = render(
      <GameCanvas gameState={gameState} cellSize={CELL_SIZE} gridSize={GRID_SIZE} />
    );
    
    const newGameState = { ...gameState, score: 10 };
    rerender(
      <GameCanvas gameState={newGameState} cellSize={CELL_SIZE} gridSize={GRID_SIZE} />
    );
    
    const canvas = screen.getByRole('img');
    expect(canvas).toBeInTheDocument();
  });
});
