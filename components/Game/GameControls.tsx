'use client';
import React from 'react';
import { Button } from '@/components/UI/Button';

interface GameControlsProps {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  gameStarted: boolean;
  isPaused: boolean;
  isGameOver: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onStart,
  onPause,
  onReset,
  gameStarted,
  isPaused,
  isGameOver,
}) => {
  return (
    <div className="flex gap-4 justify-center">
      {!gameStarted || isGameOver ? (
        <Button onClick={onStart} variant="primary">
          {isGameOver ? 'Play Again' : 'Start Game'}
        </Button>
      ) : (
        <>
          <Button onClick={onPause} variant="secondary">
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button onClick={onReset} variant="secondary">
            Reset
          </Button>
        </>
      )}
    </div>
  );
};
