'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { GameCanvas } from '@/components/Game/GameCanvas';
import { GameControls } from '@/components/Game/GameControls';
import { GameScore } from '@/components/Game/GameScore';
import { GameOver } from '@/components/Game/GameOver';
import { Card } from '@/components/UI/Card';
import { Direction, GameState } from '@/lib/game/types';
import { createInitialState, updateGameState, changeDirection } from '@/lib/game/gameLogic';
import { useGameLoop } from '@/lib/hooks/useGameLoop';
import { useKeyboard } from '@/lib/hooks/useKeyboard';
import { GRID_SIZE, CELL_SIZE, GAME_SPEED, KEYS } from '@/lib/game/constants';

export default function Home(): JSX.Element {
  const [gameState, setGameState] = useState<GameState>(createInitialState());
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('snakeHighScore');
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Save high score when game is over
  useEffect(() => {
    if (gameState.gameOver && gameState.score > highScore) {
      setHighScore(gameState.score);
      localStorage.setItem('snakeHighScore', gameState.score.toString());
    }
  }, [gameState.gameOver, gameState.score, highScore]);

  // Game loop
  useGameLoop(
    1000 / GAME_SPEED,
    () => {
      if (gameStarted && !gameState.gameOver && !gameState.paused) {
        setGameState(prev => updateGameState(prev));
      }
    },
    gameStarted
  );

  // Keyboard controls
  const handleKeyPress = useCallback((key: string): void => {
    if (!gameStarted || gameState.gameOver) return;

    // Pause toggle
    if (KEYS.PAUSE.includes(key)) {
      setGameState(prev => ({ ...prev, paused: !prev.paused }));
      return;
    }

    if (gameState.paused) return;

    // Direction controls
    let newDirection: Direction | null = null;
    
    if (KEYS.UP.includes(key)) {
      newDirection = Direction.UP;
    } else if (KEYS.DOWN.includes(key)) {
      newDirection = Direction.DOWN;
    } else if (KEYS.LEFT.includes(key)) {
      newDirection = Direction.LEFT;
    } else if (KEYS.RIGHT.includes(key)) {
      newDirection = Direction.RIGHT;
    }

    if (newDirection !== null) {
      const directionToUse = newDirection;
      setGameState(prev => ({
        ...prev,
        direction: changeDirection(prev.direction, directionToUse),
      }));
    }
  }, [gameStarted, gameState.gameOver, gameState.paused]);

  useKeyboard(handleKeyPress);

  const handleStart = (): void => {
    setGameState(createInitialState());
    setGameStarted(true);
  };

  const handlePause = (): void => {
    setGameState(prev => ({ ...prev, paused: !prev.paused }));
  };

  const handleReset = (): void => {
    setGameState(createInitialState());
    setGameStarted(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
          Snake Game
        </h1>

        <Card className="mb-6">
          <GameScore score={gameState.score} highScore={highScore} />

          <div className="flex justify-center mb-6 relative">
            <GameCanvas
              gameState={gameState}
              cellSize={CELL_SIZE}
              gridSize={GRID_SIZE}
            />
            {gameState.gameOver && (
              <GameOver
                score={gameState.score}
                highScore={highScore}
                onRestart={handleStart}
              />
            )}
          </div>

          <GameControls
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
            gameStarted={gameStarted}
            isPaused={gameState.paused}
            isGameOver={gameState.gameOver}
          />
        </Card>

        <div className="text-center text-gray-400 text-sm space-y-2">
          <p>Use Arrow Keys or WASD to control the snake</p>
          <p>Press SPACE or P to pause</p>
        </div>
      </div>
    </main>
  );
}
