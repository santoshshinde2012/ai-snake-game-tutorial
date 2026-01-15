'use client';
import React from 'react';
import { formatScore } from '@/lib/utils/helpers';

interface GameScoreProps {
  score: number;
  highScore: number;
}

export const GameScore: React.FC<GameScoreProps> = ({ score, highScore }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-center">
        <p className="text-gray-400 text-sm uppercase tracking-wide">Score</p>
        <p className="text-4xl font-bold text-emerald-500">{formatScore(score)}</p>
      </div>
      <div className="text-center">
        <p className="text-gray-400 text-sm uppercase tracking-wide">High Score</p>
        <p className="text-4xl font-bold text-yellow-500">{formatScore(highScore)}</p>
      </div>
    </div>
  );
};
