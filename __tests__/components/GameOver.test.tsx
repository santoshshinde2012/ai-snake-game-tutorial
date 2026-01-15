import { render, screen, fireEvent } from '@testing-library/react';
import { GameOver } from '@/components/Game/GameOver';

describe('GameOver', () => {
  const mockOnRestart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display Game Over text', () => {
    render(<GameOver score={100} highScore={200} onRestart={mockOnRestart} />);
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
  });

  it('should display final score', () => {
    render(<GameOver score={100} highScore={200} onRestart={mockOnRestart} />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('should show new high score message when score equals high score', () => {
    render(<GameOver score={200} highScore={200} onRestart={mockOnRestart} />);
    expect(screen.getByText(/New High Score/i)).toBeInTheDocument();
  });

  it('should not show new high score message when score is lower', () => {
    render(<GameOver score={100} highScore={200} onRestart={mockOnRestart} />);
    expect(screen.queryByText(/New High Score/i)).not.toBeInTheDocument();
  });

  it('should not show new high score message when score is 0', () => {
    render(<GameOver score={0} highScore={0} onRestart={mockOnRestart} />);
    expect(screen.queryByText(/New High Score/i)).not.toBeInTheDocument();
  });

  it('should call onRestart when Play Again button clicked', () => {
    render(<GameOver score={100} highScore={200} onRestart={mockOnRestart} />);
    fireEvent.click(screen.getByText('Play Again'));
    expect(mockOnRestart).toHaveBeenCalledTimes(1);
  });
});
