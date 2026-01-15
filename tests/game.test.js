import {
  GRID_SIZE,
  DIRECTIONS,
  createInitialState,
  moveSnake,
  isWallCollision,
  isSelfCollision,
  isFoodCollision,
  growSnake,
  generateFood,
  isValidDirectionChange,
  updateGameState
} from '../src/game.js';

describe('Game Logic', () => {
  describe('Initial State', () => {
    it('should create initial state with correct structure', () => {
      const state = createInitialState();

      expect(state).toHaveProperty('snake');
      expect(state).toHaveProperty('direction');
      expect(state).toHaveProperty('food');
      expect(state).toHaveProperty('score');
      expect(state).toHaveProperty('gameOver');

      expect(state.snake).toHaveLength(3);
      expect(state.direction).toBe(DIRECTIONS.RIGHT);
      expect(state.score).toBe(0);
      expect(state.gameOver).toBe(false);
    });
  });

  describe('Snake Movement', () => {
    it('should move snake right', () => {
      const snake = [{ x: 5, y: 5 }, { x: 5, y: 6 }];
      const result = moveSnake(snake, DIRECTIONS.RIGHT);

      expect(result[0]).toEqual({ x: 6, y: 5 });
      expect(result).toHaveLength(2);
    });

    it('should move snake left', () => {
      const snake = [{ x: 5, y: 5 }, { x: 5, y: 6 }];
      const result = moveSnake(snake, DIRECTIONS.LEFT);

      expect(result[0]).toEqual({ x: 4, y: 5 });
      expect(result).toHaveLength(2);
    });

    it('should move snake up', () => {
      const snake = [{ x: 5, y: 5 }, { x: 5, y: 6 }];
      const result = moveSnake(snake, DIRECTIONS.UP);

      expect(result[0]).toEqual({ x: 5, y: 4 });
      expect(result).toHaveLength(2);
    });

    it('should move snake down', () => {
      const snake = [{ x: 5, y: 5 }, { x: 5, y: 6 }];
      const result = moveSnake(snake, DIRECTIONS.DOWN);

      expect(result[0]).toEqual({ x: 5, y: 6 });
      expect(result).toHaveLength(2);
    });

    it('should maintain snake length when moving', () => {
      const snake = [{ x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7 }];
      const result = moveSnake(snake, DIRECTIONS.RIGHT);

      expect(result).toHaveLength(3);
    });

    it('should not mutate original snake array', () => {
      const snake = [{ x: 5, y: 5 }];
      const original = { ...snake[0] };
      moveSnake(snake, DIRECTIONS.RIGHT);

      expect(snake[0]).toEqual(original);
    });
  });

  describe('Wall Collisions', () => {
    it('should detect collision with left wall', () => {
      const snake = [{ x: -1, y: 5 }];
      expect(isWallCollision(snake)).toBe(true);
    });

    it('should detect collision with right wall', () => {
      const snake = [{ x: GRID_SIZE, y: 5 }];
      expect(isWallCollision(snake)).toBe(true);
    });

    it('should detect collision with top wall', () => {
      const snake = [{ x: 5, y: -1 }];
      expect(isWallCollision(snake)).toBe(true);
    });

    it('should detect collision with bottom wall', () => {
      const snake = [{ x: 5, y: GRID_SIZE }];
      expect(isWallCollision(snake)).toBe(true);
    });

    it('should not detect collision in valid position', () => {
      const snake = [{ x: 10, y: 10 }];
      expect(isWallCollision(snake)).toBe(false);
    });

    it('should not detect collision at edge but within bounds', () => {
      const snake = [{ x: 0, y: 0 }];
      expect(isWallCollision(snake)).toBe(false);

      const snake2 = [{ x: GRID_SIZE - 1, y: GRID_SIZE - 1 }];
      expect(isWallCollision(snake2)).toBe(false);
    });
  });

  describe('Self Collisions', () => {
    it('should detect when head hits body segment', () => {
      const snake = [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
        { x: 6, y: 6 },
        { x: 6, y: 5 },
        { x: 5, y: 5 }
      ];
      expect(isSelfCollision(snake)).toBe(true);
    });

    it('should not detect collision with single segment', () => {
      const snake = [{ x: 5, y: 5 }];
      expect(isSelfCollision(snake)).toBe(false);
    });

    it('should not detect collision when segments do not overlap', () => {
      const snake = [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
        { x: 5, y: 7 }
      ];
      expect(isSelfCollision(snake)).toBe(false);
    });

    it('should not count head against itself', () => {
      const snake = [
        { x: 5, y: 5 },
        { x: 5, y: 6 }
      ];
      expect(isSelfCollision(snake)).toBe(false);
    });
  });

  describe('Food Collisions', () => {
    it('should detect when head is on food', () => {
      const snake = [{ x: 5, y: 5 }];
      const food = { x: 5, y: 5 };
      expect(isFoodCollision(snake, food)).toBe(true);
    });

    it('should not detect when head is not on food', () => {
      const snake = [{ x: 5, y: 5 }];
      const food = { x: 6, y: 6 };
      expect(isFoodCollision(snake, food)).toBe(false);
    });
  });

  describe('Snake Growth', () => {
    it('should increase snake length by one', () => {
      const snake = [{ x: 5, y: 5 }, { x: 5, y: 6 }];
      const result = growSnake(snake);

      expect(result).toHaveLength(3);
    });

    it('should add new segment at tail position', () => {
      const snake = [{ x: 5, y: 5 }, { x: 5, y: 6 }];
      const result = growSnake(snake);

      expect(result[2]).toEqual({ x: 5, y: 6 });
    });

    it('should not mutate original snake array', () => {
      const snake = [{ x: 5, y: 5 }];
      const originalLength = snake.length;
      growSnake(snake);

      expect(snake).toHaveLength(originalLength);
    });
  });

  describe('Food Generation', () => {
    it('should generate food within grid bounds', () => {
      const snake = [{ x: 10, y: 10 }];
      const food = generateFood(snake);

      expect(food.x).toBeGreaterThanOrEqual(0);
      expect(food.x).toBeLessThan(GRID_SIZE);
      expect(food.y).toBeGreaterThanOrEqual(0);
      expect(food.y).toBeLessThan(GRID_SIZE);
    });

    it('should not generate food on snake body', () => {
      const snake = [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 }
      ];
      const food = generateFood(snake);

      const isOnSnake = snake.some(segment =>
        segment.x === food.x && segment.y === food.y
      );
      expect(isOnSnake).toBe(false);
    });

    it('should generate different positions on multiple calls', () => {
      const snake = [{ x: 10, y: 10 }];
      const foods = new Set();

      for (let i = 0; i < 10; i++) {
        const food = generateFood(snake);
        foods.add(`${food.x},${food.y}`);
      }

      // Should generate at least some different positions
      expect(foods.size).toBeGreaterThan(1);
    });
  });

  describe('Direction Validation', () => {
    it('should allow 90-degree turn from UP to LEFT', () => {
      expect(isValidDirectionChange(DIRECTIONS.UP, DIRECTIONS.LEFT)).toBe(true);
    });

    it('should allow 90-degree turn from UP to RIGHT', () => {
      expect(isValidDirectionChange(DIRECTIONS.UP, DIRECTIONS.RIGHT)).toBe(true);
    });

    it('should allow 90-degree turn from LEFT to UP', () => {
      expect(isValidDirectionChange(DIRECTIONS.LEFT, DIRECTIONS.UP)).toBe(true);
    });

    it('should allow 90-degree turn from LEFT to DOWN', () => {
      expect(isValidDirectionChange(DIRECTIONS.LEFT, DIRECTIONS.DOWN)).toBe(true);
    });

    it('should prevent 180-degree turn from UP to DOWN', () => {
      expect(isValidDirectionChange(DIRECTIONS.UP, DIRECTIONS.DOWN)).toBe(false);
    });

    it('should prevent 180-degree turn from DOWN to UP', () => {
      expect(isValidDirectionChange(DIRECTIONS.DOWN, DIRECTIONS.UP)).toBe(false);
    });

    it('should prevent 180-degree turn from LEFT to RIGHT', () => {
      expect(isValidDirectionChange(DIRECTIONS.LEFT, DIRECTIONS.RIGHT)).toBe(false);
    });

    it('should prevent 180-degree turn from RIGHT to LEFT', () => {
      expect(isValidDirectionChange(DIRECTIONS.RIGHT, DIRECTIONS.LEFT)).toBe(false);
    });

    it('should allow staying in same direction', () => {
      expect(isValidDirectionChange(DIRECTIONS.UP, DIRECTIONS.UP)).toBe(true);
    });
  });

  describe('Game State Updates', () => {
    it('should update snake position each frame', () => {
      const state = {
        snake: [{ x: 10, y: 10 }],
        direction: DIRECTIONS.RIGHT,
        food: { x: 15, y: 15 },
        score: 0,
        gameOver: false
      };

      const newState = updateGameState(state);

      expect(newState.snake[0]).toEqual({ x: 11, y: 10 });
    });

    it('should increase score when eating food', () => {
      const state = {
        snake: [{ x: 14, y: 15 }],
        direction: DIRECTIONS.RIGHT,
        food: { x: 15, y: 15 },
        score: 0,
        gameOver: false
      };

      const newState = updateGameState(state);

      expect(newState.score).toBe(10);
    });

    it('should grow snake when eating food', () => {
      const state = {
        snake: [{ x: 14, y: 15 }, { x: 13, y: 15 }],
        direction: DIRECTIONS.RIGHT,
        food: { x: 15, y: 15 },
        score: 0,
        gameOver: false
      };

      const newState = updateGameState(state);

      expect(newState.snake.length).toBe(3);
    });

    it('should spawn new food after eating', () => {
      const state = {
        snake: [{ x: 14, y: 15 }],
        direction: DIRECTIONS.RIGHT,
        food: { x: 15, y: 15 },
        score: 0,
        gameOver: false
      };

      const newState = updateGameState(state);

      expect(newState.food).not.toEqual(state.food);
    });

    it('should end game on wall collision', () => {
      const state = {
        snake: [{ x: 0, y: 10 }],
        direction: DIRECTIONS.LEFT,
        food: { x: 15, y: 15 },
        score: 0,
        gameOver: false
      };

      const newState = updateGameState(state);

      expect(newState.gameOver).toBe(true);
    });

    it('should end game on self collision', () => {
      const state = {
        snake: [
          { x: 5, y: 5 },
          { x: 5, y: 6 },
          { x: 6, y: 6 },
          { x: 6, y: 5 }
        ],
        direction: DIRECTIONS.DOWN,
        food: { x: 15, y: 15 },
        score: 0,
        gameOver: false
      };

      const newState = updateGameState(state);

      expect(newState.gameOver).toBe(true);
    });

    it('should not update state when game is over', () => {
      const state = {
        snake: [{ x: 10, y: 10 }],
        direction: DIRECTIONS.RIGHT,
        food: { x: 15, y: 15 },
        score: 50,
        gameOver: true
      };

      const newState = updateGameState(state);

      expect(newState).toEqual(state);
    });

    it('should maintain immutability of original state', () => {
      const state = {
        snake: [{ x: 10, y: 10 }],
        direction: DIRECTIONS.RIGHT,
        food: { x: 15, y: 15 },
        score: 0,
        gameOver: false
      };

      const originalSnake = state.snake[0];
      updateGameState(state);

      expect(state.snake[0]).toBe(originalSnake);
    });
  });
});
