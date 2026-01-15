'use client';
import React from 'react';
import { Card } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';

interface GameOverProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ score, highScore, onRestart }) => {
  const isNewHighScore = score === highScore && score > 0;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-lg">
      <Card className="max-w-md text-center">
        <h2 className="text-4xl font-bold text-red-500 mb-4">Game Over!</h2>
        
        {isNewHighScore && (
          <p className="text-2xl text-yellow-500 mb-4 animate-pulse">
            🎉 New High Score! 🎉
          </p>
        )}
        
        <div className="mb-6">
          <p className="text-gray-400 text-sm uppercase tracking-wide">Final Score</p>
          <p className="text-5xl font-bold text-emerald-500">{score}</p>
        </div>
        
        <Button onClick={onRestart} variant="primary" className="w-full">
          Play Again
        </Button>
      </Card>
    </div>
  );
};
