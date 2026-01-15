'use client';
import React, { useEffect, useRef } from 'react';
import { GameState } from '@/lib/game/types';
import { COLORS } from '@/lib/game/constants';

interface GameCanvasProps {
  gameState: GameState;
  cellSize: number;
  gridSize: number;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  gameState,
  cellSize,
  gridSize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = COLORS.BACKGROUND;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = COLORS.GRID;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= gridSize; i++) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, gridSize * cellSize);
      ctx.stroke();
      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(gridSize * cellSize, i * cellSize);
      ctx.stroke();
    }

    // Draw snake
    ctx.fillStyle = COLORS.SNAKE;
    gameState.snake.forEach((segment, index) => {
      const alpha = index === 0 ? 1 : 0.8 - (index / gameState.snake.length) * 0.4;
      ctx.globalAlpha = alpha;
      ctx.fillRect(
        segment.x * cellSize + 1,
        segment.y * cellSize + 1,
        cellSize - 2,
        cellSize - 2
      );
    });
    ctx.globalAlpha = 1;

    // Draw food
    ctx.fillStyle = COLORS.FOOD;
    ctx.beginPath();
    ctx.arc(
      gameState.food.x * cellSize + cellSize / 2,
      gameState.food.y * cellSize + cellSize / 2,
      cellSize / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }, [gameState, cellSize, gridSize]);

  return (
    <canvas
      ref={canvasRef}
      width={gridSize * cellSize}
      height={gridSize * cellSize}
      className="border-4 border-gray-700 rounded-lg"
      role="img"
      aria-label="Snake game canvas"
    />
  );
};
