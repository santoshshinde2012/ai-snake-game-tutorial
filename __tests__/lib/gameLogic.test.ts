import {
  createInitialState,
  moveSnake,
  checkWallCollision,
  checkSelfCollision,
  checkFoodCollision,
  generateFood,
  growSnake,
  updateGameState,
  changeDirection,
} from '@/lib/game/gameLogic';
import { Direction, Position } from '@/lib/game/types';
import { GRID_SIZE, INITIAL_SNAKE_LENGTH } from '@/lib/game/constants';

describe('gameLogic', () => {
  describe('createInitialState', () => {
    it('should create initial game state with correct snake length', () => {
      const state = createInitialState();
      expect(state.snake).toHaveLength(INITIAL_SNAKE_LENGTH);
    });

    it('should start snake at center moving right', () => {
      const state = createInitialState();
      expect(state.direction).toBe(Direction.RIGHT);
      expect(state.snake[0].x).toBeGreaterThan(0);
      expect(state.snake[0].y).toBeGreaterThan(0);
    });

    it('should initialize with score 0 and not game over', () => {
      const state = createInitialState();
      expect(state.score).toBe(0);
      expect(state.gameOver).toBe(false);
      expect(state.paused).toBe(false);
    });

    it('should generate food not on snake', () => {
      const state = createInitialState();
      const isOnSnake = state.snake.some(
        segment => segment.x === state.food.x && segment.y === state.food.y
      );
      expect(isOnSnake).toBe(false);
    });
  });

  describe('moveSnake', () => {
    it('should move snake right', () => {
      const snake: Position[] = [{ x: 5, y: 5 }];
      const result = moveSnake(snake, Direction.RIGHT);
      expect(result[0]).toEqual({ x: 6, y: 5 });
    });

    it('should move snake left', () => {
      const snake: Position[] = [{ x: 5, y: 5 }];
      const result = moveSnake(snake, Direction.LEFT);
      expect(result[0]).toEqual({ x: 4, y: 5 });
    });

    it('should move snake up', () => {
      const snake: Position[] = [{ x: 5, y: 5 }];
      const result = moveSnake(snake, Direction.UP);
      expect(result[0]).toEqual({ x: 5, y: 4 });
    });

    it('should move snake down', () => {
      const snake: Position[] = [{ x: 5, y: 5 }];
      const result = moveSnake(snake, Direction.DOWN);
      expect(result[0]).toEqual({ x: 5, y: 6 });
    });

    it('should not mutate original snake', () => {
      const snake: Position[] = [{ x: 5, y: 5 }];
      const original = [...snake];
      moveSnake(snake, Direction.RIGHT);
      expect(snake).toEqual(original);
    });

    it('should maintain snake length minus tail', () => {
      const snake: Position[] = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
      ];
      const result = moveSnake(snake, Direction.RIGHT);
      expect(result).toHaveLength(3);
      expect(result[result.length - 1]).toEqual({ x: 4, y: 5 });
    });
  });

  describe('checkWallCollision', () => {
    it('should detect collision with left wall', () => {
      const head: Position = { x: -1, y: 5 };
      expect(checkWallCollision(head, GRID_SIZE)).toBe(true);
    });

    it('should detect collision with right wall', () => {
      const head: Position = { x: GRID_SIZE, y: 5 };
      expect(checkWallCollision(head, GRID_SIZE)).toBe(true);
    });

    it('should detect collision with top wall', () => {
      const head: Position = { x: 5, y: -1 };
      expect(checkWallCollision(head, GRID_SIZE)).toBe(true);
    });

    it('should detect collision with bottom wall', () => {
      const head: Position = { x: 5, y: GRID_SIZE };
      expect(checkWallCollision(head, GRID_SIZE)).toBe(true);
    });

    it('should return false when not colliding', () => {
      const head: Position = { x: 5, y: 5 };
      expect(checkWallCollision(head, GRID_SIZE)).toBe(false);
    });

    it('should return false at grid boundaries (inclusive)', () => {
      const head1: Position = { x: 0, y: 0 };
      const head2: Position = { x: GRID_SIZE - 1, y: GRID_SIZE - 1 };
      expect(checkWallCollision(head1, GRID_SIZE)).toBe(false);
      expect(checkWallCollision(head2, GRID_SIZE)).toBe(false);
    });
  });

  describe('checkSelfCollision', () => {
    it('should detect collision with self', () => {
      const snake: Position[] = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
        { x: 5, y: 5 }, // head position
      ];
      expect(checkSelfCollision(snake)).toBe(true);
    });

    it('should return false when not colliding', () => {
      const snake: Position[] = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
      ];
      expect(checkSelfCollision(snake)).toBe(false);
    });

    it('should return false for single segment', () => {
      const snake: Position[] = [{ x: 5, y: 5 }];
      expect(checkSelfCollision(snake)).toBe(false);
    });
  });

  describe('checkFoodCollision', () => {
    it('should detect when head is on food', () => {
      const head: Position = { x: 5, y: 5 };
      const food: Position = { x: 5, y: 5 };
      expect(checkFoodCollision(head, food)).toBe(true);
    });

    it('should return false when not on food', () => {
      const head: Position = { x: 5, y: 5 };
      const food: Position = { x: 6, y: 6 };
      expect(checkFoodCollision(head, food)).toBe(false);
    });
  });

  describe('generateFood', () => {
    it('should generate food within grid bounds', () => {
      const snake: Position[] = [{ x: 5, y: 5 }];
      const food = generateFood(snake, GRID_SIZE);
      expect(food.x).toBeGreaterThanOrEqual(0);
      expect(food.x).toBeLessThan(GRID_SIZE);
      expect(food.y).toBeGreaterThanOrEqual(0);
      expect(food.y).toBeLessThan(GRID_SIZE);
    });

    it('should not generate food on snake', () => {
      const snake: Position[] = [{ x: 5, y: 5 }];
      const food = generateFood(snake, GRID_SIZE);
      const isOnSnake = snake.some(
        segment => segment.x === food.x && segment.y === food.y
      );
      expect(isOnSnake).toBe(false);
    });
  });

  describe('growSnake', () => {
    it('should add segment to snake', () => {
      const snake: Position[] = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
      ];
      const result = growSnake(snake);
      expect(result).toHaveLength(3);
    });

    it('should add segment at tail position', () => {
      const snake: Position[] = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
      ];
      const result = growSnake(snake);
      expect(result[2]).toEqual({ x: 4, y: 5 });
    });

    it('should not mutate original snake', () => {
      const snake: Position[] = [{ x: 5, y: 5 }];
      const original = [...snake];
      growSnake(snake);
      expect(snake).toEqual(original);
    });
  });

  describe('updateGameState', () => {
    it('should move snake forward', () => {
      const state = createInitialState();
      const result = updateGameState(state);
      expect(result.snake[0].x).toBe(state.snake[0].x + 1);
    });

    it('should not update when paused', () => {
      const state = { ...createInitialState(), paused: true };
      const result = updateGameState(state);
      expect(result).toEqual(state);
    });

    it('should not update when game over', () => {
      const state = { ...createInitialState(), gameOver: true };
      const result = updateGameState(state);
      expect(result).toEqual(state);
    });

    it('should set game over on wall collision', () => {
      const state = createInitialState();
      state.snake = [{ x: 0, y: 5 }];
      state.direction = Direction.LEFT;
      const result = updateGameState(state);
      expect(result.gameOver).toBe(true);
    });

    it('should set game over on self collision', () => {
      const state = createInitialState();
      // Create a long snake where the head will hit its body (not tail)
      // The snake forms a spiral pattern
      state.snake = [
        { x: 10, y: 10 },  // head
        { x: 9, y: 10 },
        { x: 8, y: 10 },
        { x: 7, y: 10 },
        { x: 6, y: 10 },
        { x: 5, y: 10 },
        { x: 5, y: 11 },
        { x: 5, y: 12 },
        { x: 6, y: 12 },
        { x: 7, y: 12 },
        { x: 8, y: 12 },
        { x: 9, y: 12 },
        { x: 10, y: 12 },
        { x: 10, y: 11 },  // body segment that will be hit
        { x: 11, y: 11 },  // some tail segments so (10,11) isn't removed
        { x: 12, y: 11 },
      ];
      state.direction = Direction.DOWN;
      
      // Move down: head goes from (10,10) to (10,11) which collides with body at index 13
      const result = updateGameState(state);
      expect(result.gameOver).toBe(true);
    });

    it('should grow snake and increase score on food collision', () => {
      const state = createInitialState();
      state.snake = [{ x: 5, y: 5 }];
      state.food = { x: 6, y: 5 };
      state.direction = Direction.RIGHT;
      
      const result = updateGameState(state);
      
      expect(result.score).toBe(10);
      expect(result.snake.length).toBeGreaterThan(state.snake.length);
    });

    it('should generate new food after eating', () => {
      const state = createInitialState();
      state.snake = [{ x: 5, y: 5 }];
      state.food = { x: 6, y: 5 };
      state.direction = Direction.RIGHT;
      
      const result = updateGameState(state);
      
      expect(result.food).not.toEqual(state.food);
    });
  });

  describe('changeDirection', () => {
    it('should change direction when valid', () => {
      const result = changeDirection(Direction.RIGHT, Direction.UP);
      expect(result).toBe(Direction.UP);
    });

    it('should prevent reversing from UP to DOWN', () => {
      const result = changeDirection(Direction.UP, Direction.DOWN);
      expect(result).toBe(Direction.UP);
    });

    it('should prevent reversing from DOWN to UP', () => {
      const result = changeDirection(Direction.DOWN, Direction.UP);
      expect(result).toBe(Direction.DOWN);
    });

    it('should prevent reversing from LEFT to RIGHT', () => {
      const result = changeDirection(Direction.LEFT, Direction.RIGHT);
      expect(result).toBe(Direction.LEFT);
    });

    it('should prevent reversing from RIGHT to LEFT', () => {
      const result = changeDirection(Direction.RIGHT, Direction.LEFT);
      expect(result).toBe(Direction.RIGHT);
    });
  });
});
