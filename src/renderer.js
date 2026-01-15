import { CELL_SIZE, GRID_SIZE } from './game.js';

/**
 * Clears the entire canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 */
export const clearCanvas = (ctx) => {
  ctx.clearRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);
};

/**
 * Renders the snake on the canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Array} snake - Array of snake segments
 */
export const renderSnake = (ctx, snake) => {
  ctx.fillStyle = '#4CAF50';
  snake.forEach(segment => {
    ctx.fillRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  });

  // Draw head with different color
  ctx.fillStyle = '#45a049';
  const head = snake[0];
  ctx.fillRect(
    head.x * CELL_SIZE,
    head.y * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE
  );
};

/**
 * Renders the food on the canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} food - Food position {x, y}
 */
export const renderFood = (ctx, food) => {
  ctx.fillStyle = '#FF5252';
  ctx.fillRect(
    food.x * CELL_SIZE,
    food.y * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE
  );
};

/**
 * Renders the score
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} score - Current score
 */
export const renderScore = (ctx, score) => {
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 25);
};

/**
 * Renders the game over overlay
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 */
export const renderGameOver = (ctx) => {
  // Semi-transparent overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);

  // Game over text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', (GRID_SIZE * CELL_SIZE) / 2, (GRID_SIZE * CELL_SIZE) / 2 - 20);

  // Restart instruction
  ctx.font = '20px Arial';
  ctx.fillText(
    'Press SPACE to restart',
    (GRID_SIZE * CELL_SIZE) / 2,
    (GRID_SIZE * CELL_SIZE) / 2 + 30
  );

  ctx.textAlign = 'left';
};

/**
 * Renders the complete game state
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} state - Game state
 */
export const render = (ctx, state) => {
  clearCanvas(ctx);
  renderSnake(ctx, state.snake);
  renderFood(ctx, state.food);
  renderScore(ctx, state.score);

  if (state.gameOver) {
    renderGameOver(ctx);
  }
};
