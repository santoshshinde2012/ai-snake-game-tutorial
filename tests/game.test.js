const {
  DIRECTIONS,
  GRID_SIZE,
  CELL_SIZE,
  createInitialState,
  updateGame,
  changeDirection,
  togglePause,
  resetGame,
  generateFood,
  isOutOfBounds,
  checkSelfCollision,
  isPositionValid,
  getRandomPosition
} = require('../src/game');

describe('Game Constants', () => {
  test('GRID_SIZE should be 20', () => {
    expect(GRID_SIZE).toBe(20);
  });

  test('CELL_SIZE should be 20', () => {
    expect(CELL_SIZE).toBe(20);
  });

  test('DIRECTIONS should have correct values', () => {
    expect(DIRECTIONS.UP).toEqual({ x: 0, y: -1 });
    expect(DIRECTIONS.DOWN).toEqual({ x: 0, y: 1 });
    expect(DIRECTIONS.LEFT).toEqual({ x: -1, y: 0 });
    expect(DIRECTIONS.RIGHT).toEqual({ x: 1, y: 0 });
  });
});

describe('createInitialState', () => {
  test('should create initial state with correct properties', () => {
    const state = createInitialState();
    expect(state).toHaveProperty('snake');
    expect(state).toHaveProperty('direction');
    expect(state).toHaveProperty('food');
    expect(state).toHaveProperty('score');
    expect(state).toHaveProperty('gameOver');
    expect(state).toHaveProperty('paused');
  });

  test('should initialize snake with 3 segments', () => {
    const state = createInitialState();
    expect(state.snake).toHaveLength(3);
  });

  test('should initialize with score 0', () => {
    const state = createInitialState();
    expect(state.score).toBe(0);
  });

  test('should initialize with gameOver false', () => {
    const state = createInitialState();
    expect(state.gameOver).toBe(false);
  });

  test('should initialize with paused false', () => {
    const state = createInitialState();
    expect(state.paused).toBe(false);
  });
});

describe('getRandomPosition', () => {
  test('should return position within grid bounds', () => {
    const position = getRandomPosition();
    expect(position.x).toBeGreaterThanOrEqual(0);
    expect(position.x).toBeLessThan(GRID_SIZE);
    expect(position.y).toBeGreaterThanOrEqual(0);
    expect(position.y).toBeLessThan(GRID_SIZE);
  });

  test('should return object with x and y properties', () => {
    const position = getRandomPosition();
    expect(position).toHaveProperty('x');
    expect(position).toHaveProperty('y');
  });
});

describe('isPositionValid', () => {
  test('should return true for valid position', () => {
    const snake = [{ x: 5, y: 5 }, { x: 4, y: 5 }];
    const position = { x: 10, y: 10 };
    expect(isPositionValid(position, snake)).toBe(true);
  });

  test('should return false for position on snake', () => {
    const snake = [{ x: 5, y: 5 }, { x: 4, y: 5 }];
    const position = { x: 5, y: 5 };
    expect(isPositionValid(position, snake)).toBe(false);
  });
});

describe('generateFood', () => {
  test('should generate food not on snake', () => {
    const snake = [{ x: 5, y: 5 }];
    const food = generateFood(snake);
    expect(isPositionValid(food, snake)).toBe(true);
  });

  test('should return position within grid bounds', () => {
    const snake = [{ x: 5, y: 5 }];
    const food = generateFood(snake);
    expect(food.x).toBeGreaterThanOrEqual(0);
    expect(food.x).toBeLessThan(GRID_SIZE);
    expect(food.y).toBeGreaterThanOrEqual(0);
    expect(food.y).toBeLessThan(GRID_SIZE);
  });
});

describe('isOutOfBounds', () => {
  test('should return true for negative x', () => {
    expect(isOutOfBounds({ x: -1, y: 5 })).toBe(true);
  });

  test('should return true for negative y', () => {
    expect(isOutOfBounds({ x: 5, y: -1 })).toBe(true);
  });

  test('should return true for x >= GRID_SIZE', () => {
    expect(isOutOfBounds({ x: GRID_SIZE, y: 5 })).toBe(true);
  });

  test('should return true for y >= GRID_SIZE', () => {
    expect(isOutOfBounds({ x: 5, y: GRID_SIZE })).toBe(true);
  });

  test('should return false for valid position', () => {
    expect(isOutOfBounds({ x: 5, y: 5 })).toBe(false);
  });
});

describe('checkSelfCollision', () => {
  test('should return true when head collides with body', () => {
    const head = { x: 5, y: 5 };
    const body = [{ x: 5, y: 5 }, { x: 4, y: 5 }];
    expect(checkSelfCollision(head, body)).toBe(true);
  });

  test('should return false when no collision', () => {
    const head = { x: 5, y: 5 };
    const body = [{ x: 6, y: 5 }, { x: 7, y: 5 }];
    expect(checkSelfCollision(head, body)).toBe(false);
  });
});

describe('updateGame', () => {
  test('should not update when game is over', () => {
    const state = { ...createInitialState(), gameOver: true };
    const newState = updateGame(state);
    expect(newState).toEqual(state);
  });

  test('should not update when game is paused', () => {
    const state = { ...createInitialState(), paused: true };
    const newState = updateGame(state);
    expect(newState).toEqual(state);
  });

  test('should move snake forward', () => {
    const state = createInitialState();
    const oldHead = state.snake[0];
    const newState = updateGame(state);
    const newHead = newState.snake[0];
    
    expect(newHead.x).toBe(oldHead.x + state.direction.x);
    expect(newHead.y).toBe(oldHead.y + state.direction.y);
  });

  test('should end game when snake hits boundary', () => {
    const state = {
      ...createInitialState(),
      snake: [{ x: 0, y: 0 }],
      direction: DIRECTIONS.LEFT
    };
    const newState = updateGame(state);
    expect(newState.gameOver).toBe(true);
  });

  test('should end game when snake hits itself', () => {
    const state = {
      ...createInitialState(),
      snake: [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
        { x: 6, y: 6 },
        { x: 6, y: 5 }
      ],
      direction: DIRECTIONS.DOWN
    };
    const newState = updateGame(state);
    expect(newState.gameOver).toBe(true);
  });

  test('should increase score when eating food', () => {
    const state = {
      ...createInitialState(),
      snake: [{ x: 5, y: 5 }],
      food: { x: 6, y: 5 },
      direction: DIRECTIONS.RIGHT,
      score: 0
    };
    const newState = updateGame(state);
    expect(newState.score).toBe(10);
  });

  test('should grow snake when eating food', () => {
    const state = {
      ...createInitialState(),
      snake: [{ x: 5, y: 5 }, { x: 4, y: 5 }],
      food: { x: 6, y: 5 },
      direction: DIRECTIONS.RIGHT
    };
    const newState = updateGame(state);
    expect(newState.snake.length).toBe(3);
  });

  test('should generate new food when eating', () => {
    const state = {
      ...createInitialState(),
      snake: [{ x: 5, y: 5 }],
      food: { x: 6, y: 5 },
      direction: DIRECTIONS.RIGHT
    };
    const newState = updateGame(state);
    expect(newState.food).not.toEqual(state.food);
  });
});

describe('changeDirection', () => {
  test('should change direction to new direction', () => {
    const state = { ...createInitialState(), direction: DIRECTIONS.RIGHT };
    const newState = changeDirection(state, DIRECTIONS.UP);
    expect(newState.direction).toEqual(DIRECTIONS.UP);
  });

  test('should not change to opposite direction', () => {
    const state = { ...createInitialState(), direction: DIRECTIONS.RIGHT };
    const newState = changeDirection(state, DIRECTIONS.LEFT);
    expect(newState.direction).toEqual(DIRECTIONS.RIGHT);
  });

  test('should not allow UP when moving DOWN', () => {
    const state = { ...createInitialState(), direction: DIRECTIONS.DOWN };
    const newState = changeDirection(state, DIRECTIONS.UP);
    expect(newState.direction).toEqual(DIRECTIONS.DOWN);
  });

  test('should not allow DOWN when moving UP', () => {
    const state = { ...createInitialState(), direction: DIRECTIONS.UP };
    const newState = changeDirection(state, DIRECTIONS.DOWN);
    expect(newState.direction).toEqual(DIRECTIONS.UP);
  });

  test('should not allow LEFT when moving RIGHT', () => {
    const state = { ...createInitialState(), direction: DIRECTIONS.RIGHT };
    const newState = changeDirection(state, DIRECTIONS.LEFT);
    expect(newState.direction).toEqual(DIRECTIONS.RIGHT);
  });

  test('should not allow RIGHT when moving LEFT', () => {
    const state = { ...createInitialState(), direction: DIRECTIONS.LEFT };
    const newState = changeDirection(state, DIRECTIONS.RIGHT);
    expect(newState.direction).toEqual(DIRECTIONS.LEFT);
  });
});

describe('togglePause', () => {
  test('should toggle pause from false to true', () => {
    const state = { ...createInitialState(), paused: false };
    const newState = togglePause(state);
    expect(newState.paused).toBe(true);
  });

  test('should toggle pause from true to false', () => {
    const state = { ...createInitialState(), paused: true };
    const newState = togglePause(state);
    expect(newState.paused).toBe(false);
  });
});

describe('resetGame', () => {
  test('should return a new initial state', () => {
    const newState = resetGame();
    const initialState = createInitialState();
    expect(newState.score).toBe(initialState.score);
    expect(newState.gameOver).toBe(initialState.gameOver);
    expect(newState.paused).toBe(initialState.paused);
  });

  test('should reset score to 0', () => {
    const newState = resetGame();
    expect(newState.score).toBe(0);
  });

  test('should reset gameOver to false', () => {
    const newState = resetGame();
    expect(newState.gameOver).toBe(false);
  });
});
