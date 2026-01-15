const { GRID_SIZE, CELL_SIZE } = require('./game');

const COLORS = {
  BACKGROUND: '#1a1a1a',
  SNAKE_HEAD: '#4CAF50',
  SNAKE_BODY: '#45a049',
  FOOD: '#f44336',
  GRID: '#2a2a2a',
  TEXT: '#ffffff'
};

function createCanvas(width, height) {
  if (typeof document === 'undefined') {
    return null;
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function clearCanvas(ctx, width, height) {
  ctx.fillStyle = COLORS.BACKGROUND;
  ctx.fillRect(0, 0, width, height);
}

function drawGrid(ctx, width, height) {
  ctx.strokeStyle = COLORS.GRID;
  ctx.lineWidth = 1;

  for (let x = 0; x <= width; x += CELL_SIZE) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += CELL_SIZE) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawSnake(ctx, snake) {
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? COLORS.SNAKE_HEAD : COLORS.SNAKE_BODY;
    ctx.fillRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE - 1,
      CELL_SIZE - 1
    );

    if (index === 0) {
      ctx.fillStyle = COLORS.BACKGROUND;
      const eyeSize = 3;
      const eyeOffset = 5;
      ctx.fillRect(
        segment.x * CELL_SIZE + eyeOffset,
        segment.y * CELL_SIZE + eyeOffset,
        eyeSize,
        eyeSize
      );
      ctx.fillRect(
        segment.x * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize,
        segment.y * CELL_SIZE + eyeOffset,
        eyeSize,
        eyeSize
      );
    }
  });
}

function drawFood(ctx, food) {
  ctx.fillStyle = COLORS.FOOD;
  ctx.beginPath();
  ctx.arc(
    food.x * CELL_SIZE + CELL_SIZE / 2,
    food.y * CELL_SIZE + CELL_SIZE / 2,
    CELL_SIZE / 2 - 2,
    0,
    2 * Math.PI
  );
  ctx.fill();
}

function drawScore(ctx, score) {
  ctx.fillStyle = COLORS.TEXT;
  ctx.font = 'bold 20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 25);
}

function drawGameOver(ctx, width, height, score) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = COLORS.TEXT;
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', width / 2, height / 2 - 30);

  ctx.font = 'bold 24px Arial';
  ctx.fillText(`Final Score: ${score}`, width / 2, height / 2 + 20);

  ctx.font = '16px Arial';
  ctx.fillText('Press SPACE to restart', width / 2, height / 2 + 60);
}

function drawPaused(ctx, width, height) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = COLORS.TEXT;
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('PAUSED', width / 2, height / 2);

  ctx.font = '16px Arial';
  ctx.fillText('Press P to resume', width / 2, height / 2 + 40);
}

function render(ctx, state) {
  const width = GRID_SIZE * CELL_SIZE;
  const height = GRID_SIZE * CELL_SIZE;

  clearCanvas(ctx, width, height);
  drawGrid(ctx, width, height);
  drawSnake(ctx, state.snake);
  drawFood(ctx, state.food);
  drawScore(ctx, state.score);

  if (state.gameOver) {
    drawGameOver(ctx, width, height, state.score);
  } else if (state.paused) {
    drawPaused(ctx, width, height);
  }
}

module.exports = {
  COLORS,
  createCanvas,
  clearCanvas,
  drawGrid,
  drawSnake,
  drawFood,
  drawScore,
  drawGameOver,
  drawPaused,
  render
};
