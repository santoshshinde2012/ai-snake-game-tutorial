import {
  createInitialState,
  updateGameState,
  isValidDirectionChange,
  INITIAL_SPEED
} from './game.js';
import { render } from './renderer.js';
import { setupInput } from './input.js';

let gameState = createInitialState();
let canvas;
let ctx;
let lastUpdateTime = 0;
const updateInterval = 1000 / INITIAL_SPEED;
let cleanupInput;

/**
 * Handles direction changes from input
 * @param {string} newDirection - The new direction
 */
const handleDirectionChange = (newDirection) => {
  if (!gameState.gameOver && isValidDirectionChange(gameState.direction, newDirection)) {
    gameState = {
      ...gameState,
      direction: newDirection
    };
  }
};

/**
 * Handles game restart
 */
const handleRestart = () => {
  if (gameState.gameOver) {
    gameState = createInitialState();
  }
};

/**
 * Main game loop
 * @param {number} timestamp - Current timestamp from requestAnimationFrame
 */
const gameLoop = (timestamp) => {
  // Update game state at fixed intervals
  if (timestamp - lastUpdateTime >= updateInterval) {
    gameState = updateGameState(gameState);
    lastUpdateTime = timestamp;
  }

  // Render every frame
  render(ctx, gameState);

  // Continue loop
  requestAnimationFrame(gameLoop);
};

/**
 * Initializes the game
 */
export const initGame = () => {
  canvas = document.getElementById('gameCanvas');
  if (!canvas) {
    console.error('Canvas element not found');
    return;
  }

  ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Could not get 2D context');
    return;
  }

  // Setup input handling
  cleanupInput = setupInput(handleDirectionChange, handleRestart);

  // Start game loop
  requestAnimationFrame(gameLoop);
};

/**
 * Cleans up game resources
 */
export const cleanupGame = () => {
  if (cleanupInput) {
    cleanupInput();
  }
};

// Initialize game when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
