import { render, screen } from '@testing-library/react';
import { GameScore } from '@/components/Game/GameScore';

describe('GameScore', () => {
  it('should display current score', () => {
    render(<GameScore score={100} highScore={200} />);
    expect(screen.getByText('00100')).toBeInTheDocument();
  });

  it('should display high score', () => {
    render(<GameScore score={100} highScore={200} />);
    expect(screen.getByText('00200')).toBeInTheDocument();
  });

  it('should format score with leading zeros', () => {
    render(<GameScore score={5} highScore={10} />);
    expect(screen.getByText('00005')).toBeInTheDocument();
    expect(screen.getByText('00010')).toBeInTheDocument();
  });

  it('should display Score and High Score labels', () => {
    render(<GameScore score={100} highScore={200} />);
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('High Score')).toBeInTheDocument();
  });
});
