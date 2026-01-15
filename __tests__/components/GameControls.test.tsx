import { render, screen, fireEvent } from '@testing-library/react';
import { GameControls } from '@/components/Game/GameControls';

describe('GameControls', () => {
  const mockOnStart = jest.fn();
  const mockOnPause = jest.fn();
  const mockOnReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show Start Game button when game not started', () => {
    render(
      <GameControls
        onStart={mockOnStart}
        onPause={mockOnPause}
        onReset={mockOnReset}
        gameStarted={false}
        isPaused={false}
        isGameOver={false}
      />
    );

    expect(screen.getByText('Start Game')).toBeInTheDocument();
  });

  it('should show Play Again button when game is over', () => {
    render(
      <GameControls
        onStart={mockOnStart}
        onPause={mockOnPause}
        onReset={mockOnReset}
        gameStarted={true}
        isPaused={false}
        isGameOver={true}
      />
    );

    expect(screen.getByText('Play Again')).toBeInTheDocument();
  });

  it('should show Pause and Reset buttons when game is running', () => {
    render(
      <GameControls
        onStart={mockOnStart}
        onPause={mockOnPause}
        onReset={mockOnReset}
        gameStarted={true}
        isPaused={false}
        isGameOver={false}
      />
    );

    expect(screen.getByText('Pause')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('should show Resume button when game is paused', () => {
    render(
      <GameControls
        onStart={mockOnStart}
        onPause={mockOnPause}
        onReset={mockOnReset}
        gameStarted={true}
        isPaused={true}
        isGameOver={false}
      />
    );

    expect(screen.getByText('Resume')).toBeInTheDocument();
  });

  it('should call onStart when Start button clicked', () => {
    render(
      <GameControls
        onStart={mockOnStart}
        onPause={mockOnPause}
        onReset={mockOnReset}
        gameStarted={false}
        isPaused={false}
        isGameOver={false}
      />
    );

    fireEvent.click(screen.getByText('Start Game'));
    expect(mockOnStart).toHaveBeenCalledTimes(1);
  });

  it('should call onPause when Pause button clicked', () => {
    render(
      <GameControls
        onStart={mockOnStart}
        onPause={mockOnPause}
        onReset={mockOnReset}
        gameStarted={true}
        isPaused={false}
        isGameOver={false}
      />
    );

    fireEvent.click(screen.getByText('Pause'));
    expect(mockOnPause).toHaveBeenCalledTimes(1);
  });

  it('should call onReset when Reset button clicked', () => {
    render(
      <GameControls
        onStart={mockOnStart}
        onPause={mockOnPause}
        onReset={mockOnReset}
        gameStarted={true}
        isPaused={false}
        isGameOver={false}
      />
    );

    fireEvent.click(screen.getByText('Reset'));
    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });
});
