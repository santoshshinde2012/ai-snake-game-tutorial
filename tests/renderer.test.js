const {
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
} = require('../src/renderer');

describe('Renderer Constants', () => {
  test('COLORS should be defined', () => {
    expect(COLORS).toBeDefined();
    expect(COLORS.BACKGROUND).toBeDefined();
    expect(COLORS.SNAKE_HEAD).toBeDefined();
    expect(COLORS.SNAKE_BODY).toBeDefined();
    expect(COLORS.FOOD).toBeDefined();
    expect(COLORS.GRID).toBeDefined();
    expect(COLORS.TEXT).toBeDefined();
  });
});

describe('createCanvas', () => {
  test('should return null in non-browser environment', () => {
    const canvas = createCanvas(400, 400);
    expect(canvas).toBeNull();
  });
});

describe('clearCanvas', () => {
  let ctx;

  beforeEach(() => {
    ctx = {
      fillStyle: '',
      fillRect: jest.fn()
    };
  });

  test('should set background color', () => {
    clearCanvas(ctx, 400, 400);
    expect(ctx.fillStyle).toBe(COLORS.BACKGROUND);
  });

  test('should fill entire canvas', () => {
    clearCanvas(ctx, 400, 400);
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 400, 400);
  });
});

describe('drawGrid', () => {
  let ctx;

  beforeEach(() => {
    ctx = {
      strokeStyle: '',
      lineWidth: 0,
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn()
    };
  });

  test('should set grid color', () => {
    drawGrid(ctx, 400, 400);
    expect(ctx.strokeStyle).toBe(COLORS.GRID);
  });

  test('should set line width to 1', () => {
    drawGrid(ctx, 400, 400);
    expect(ctx.lineWidth).toBe(1);
  });

  test('should draw vertical and horizontal lines', () => {
    drawGrid(ctx, 400, 400);
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.moveTo).toHaveBeenCalled();
    expect(ctx.lineTo).toHaveBeenCalled();
    expect(ctx.stroke).toHaveBeenCalled();
  });
});

describe('drawSnake', () => {
  let ctx;

  beforeEach(() => {
    ctx = {
      fillStyle: '',
      fillRect: jest.fn()
    };
  });

  test('should draw snake head with different color', () => {
    const snake = [{ x: 5, y: 5 }, { x: 4, y: 5 }];
    drawSnake(ctx, snake);
    
    expect(ctx.fillRect).toHaveBeenCalled();
    expect(ctx.fillRect.mock.calls.length).toBeGreaterThan(0);
  });

  test('should draw all snake segments', () => {
    const snake = [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }];
    drawSnake(ctx, snake);
    
    expect(ctx.fillRect.mock.calls.length).toBeGreaterThanOrEqual(3);
  });

  test('should draw eyes on snake head', () => {
    const snake = [{ x: 5, y: 5 }];
    drawSnake(ctx, snake);
    
    expect(ctx.fillRect.mock.calls.length).toBeGreaterThan(1);
  });
});

describe('drawFood', () => {
  let ctx;

  beforeEach(() => {
    ctx = {
      fillStyle: '',
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn()
    };
  });

  test('should set food color', () => {
    const food = { x: 10, y: 10 };
    drawFood(ctx, food);
    expect(ctx.fillStyle).toBe(COLORS.FOOD);
  });

  test('should draw circle for food', () => {
    const food = { x: 10, y: 10 };
    drawFood(ctx, food);
    
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.arc).toHaveBeenCalled();
    expect(ctx.fill).toHaveBeenCalled();
  });
});

describe('drawScore', () => {
  let ctx;

  beforeEach(() => {
    ctx = {
      fillStyle: '',
      font: '',
      fillText: jest.fn()
    };
  });

  test('should set text color', () => {
    drawScore(ctx, 100);
    expect(ctx.fillStyle).toBe(COLORS.TEXT);
  });

  test('should display score', () => {
    drawScore(ctx, 100);
    expect(ctx.fillText).toHaveBeenCalledWith('Score: 100', 10, 25);
  });

  test('should set font style', () => {
    drawScore(ctx, 100);
    expect(ctx.font).toBe('bold 20px Arial');
  });
});

describe('drawGameOver', () => {
  let ctx;

  beforeEach(() => {
    ctx = {
      fillStyle: '',
      font: '',
      textAlign: '',
      fillRect: jest.fn(),
      fillText: jest.fn()
    };
  });

  test('should draw overlay', () => {
    drawGameOver(ctx, 400, 400, 100);
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 400, 400);
  });

  test('should display game over text', () => {
    drawGameOver(ctx, 400, 400, 100);
    expect(ctx.fillText).toHaveBeenCalledWith('GAME OVER', 200, expect.any(Number));
  });

  test('should display final score', () => {
    drawGameOver(ctx, 400, 400, 100);
    expect(ctx.fillText).toHaveBeenCalledWith('Final Score: 100', 200, expect.any(Number));
  });

  test('should display restart instructions', () => {
    drawGameOver(ctx, 400, 400, 100);
    expect(ctx.fillText).toHaveBeenCalledWith('Press SPACE to restart', 200, expect.any(Number));
  });

  test('should center text', () => {
    drawGameOver(ctx, 400, 400, 100);
    expect(ctx.textAlign).toBe('center');
  });
});

describe('drawPaused', () => {
  let ctx;

  beforeEach(() => {
    ctx = {
      fillStyle: '',
      font: '',
      textAlign: '',
      fillRect: jest.fn(),
      fillText: jest.fn()
    };
  });

  test('should draw overlay', () => {
    drawPaused(ctx, 400, 400);
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 400, 400);
  });

  test('should display paused text', () => {
    drawPaused(ctx, 400, 400);
    expect(ctx.fillText).toHaveBeenCalledWith('PAUSED', 200, 200);
  });

  test('should display resume instructions', () => {
    drawPaused(ctx, 400, 400);
    expect(ctx.fillText).toHaveBeenCalledWith('Press P to resume', 200, 240);
  });

  test('should center text', () => {
    drawPaused(ctx, 400, 400);
    expect(ctx.textAlign).toBe('center');
  });
});

describe('render', () => {
  let ctx;
  let state;

  beforeEach(() => {
    ctx = {
      fillStyle: '',
      strokeStyle: '',
      font: '',
      textAlign: '',
      lineWidth: 0,
      fillRect: jest.fn(),
      fillText: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn()
    };

    state = {
      snake: [{ x: 5, y: 5 }, { x: 4, y: 5 }],
      food: { x: 10, y: 10 },
      score: 50,
      gameOver: false,
      paused: false
    };
  });

  test('should clear canvas', () => {
    render(ctx, state);
    expect(ctx.fillRect).toHaveBeenCalled();
  });

  test('should draw grid', () => {
    render(ctx, state);
    expect(ctx.stroke).toHaveBeenCalled();
  });

  test('should draw snake', () => {
    render(ctx, state);
    expect(ctx.fillRect).toHaveBeenCalled();
  });

  test('should draw food', () => {
    render(ctx, state);
    expect(ctx.arc).toHaveBeenCalled();
  });

  test('should draw score', () => {
    render(ctx, state);
    expect(ctx.fillText).toHaveBeenCalledWith('Score: 50', 10, 25);
  });

  test('should draw game over screen when gameOver is true', () => {
    state.gameOver = true;
    render(ctx, state);
    expect(ctx.fillText).toHaveBeenCalledWith('GAME OVER', expect.any(Number), expect.any(Number));
  });

  test('should draw paused screen when paused is true', () => {
    state.paused = true;
    render(ctx, state);
    expect(ctx.fillText).toHaveBeenCalledWith('PAUSED', expect.any(Number), expect.any(Number));
  });
});
