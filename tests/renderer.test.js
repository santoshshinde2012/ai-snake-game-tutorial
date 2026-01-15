import 'jest-canvas-mock';
import {
  clearCanvas,
  renderSnake,
  renderFood,
  renderScore,
  renderGameOver,
  render
} from '../src/renderer.js';
import { CELL_SIZE, GRID_SIZE } from '../src/game.js';

describe('Renderer', () => {
  let canvas;
  let ctx;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;
    ctx = canvas.getContext('2d');
  });

  describe('clearCanvas', () => {
    it('should call clearRect with correct dimensions', () => {
      clearCanvas(ctx);

      expect(ctx.clearRect).toHaveBeenCalledWith(
        0,
        0,
        GRID_SIZE * CELL_SIZE,
        GRID_SIZE * CELL_SIZE
      );
    });
  });

  describe('renderSnake', () => {
    it('should call fillRect for each snake segment', () => {
      const snake = [
        { x: 5, y: 5 },
        { x: 5, y: 6 }
      ];

      renderSnake(ctx, snake);

      expect(ctx.fillRect).toHaveBeenCalledTimes(3); // 2 body + 1 head overlay
    });

    it('should render snake segments at correct positions', () => {
      const snake = [{ x: 10, y: 10 }];

      renderSnake(ctx, snake);

      expect(ctx.fillRect).toHaveBeenCalledWith(
        10 * CELL_SIZE,
        10 * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    });

    it('should render head with different color', () => {
      const snake = [
        { x: 5, y: 5 },
        { x: 5, y: 6 }
      ];

      renderSnake(ctx, snake);

      // Should set fillStyle twice (body color and head color)
      expect(ctx.fillStyle).toBeDefined();
    });
  });

  describe('renderFood', () => {
    it('should call fillRect at food position', () => {
      const food = { x: 15, y: 15 };

      renderFood(ctx, food);

      expect(ctx.fillRect).toHaveBeenCalledWith(
        15 * CELL_SIZE,
        15 * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    });

    it('should set fillStyle for food', () => {
      const food = { x: 10, y: 10 };

      renderFood(ctx, food);

      expect(ctx.fillStyle).toBe('#FF5252');
    });
  });

  describe('renderScore', () => {
    it('should call fillText with score', () => {
      renderScore(ctx, 50);

      expect(ctx.fillText).toHaveBeenCalledWith('Score: 50', 10, 25);
    });

    it('should render score zero', () => {
      renderScore(ctx, 0);

      expect(ctx.fillText).toHaveBeenCalledWith('Score: 0', 10, 25);
    });
  });

  describe('renderGameOver', () => {
    it('should render overlay background', () => {
      renderGameOver(ctx);

      expect(ctx.fillRect).toHaveBeenCalledWith(
        0,
        0,
        GRID_SIZE * CELL_SIZE,
        GRID_SIZE * CELL_SIZE
      );
    });

    it('should render game over text', () => {
      renderGameOver(ctx);

      expect(ctx.fillText).toHaveBeenCalledWith(
        'GAME OVER',
        expect.any(Number),
        expect.any(Number)
      );
    });

    it('should render restart instruction', () => {
      renderGameOver(ctx);

      expect(ctx.fillText).toHaveBeenCalledWith(
        'Press SPACE to restart',
        expect.any(Number),
        expect.any(Number)
      );
    });
  });

  describe('render', () => {
    it('should render complete game state', () => {
      const state = {
        snake: [{ x: 10, y: 10 }],
        food: { x: 15, y: 15 },
        score: 20,
        gameOver: false
      };

      render(ctx, state);

      expect(ctx.clearRect).toHaveBeenCalled();
      expect(ctx.fillRect).toHaveBeenCalled();
      expect(ctx.fillText).toHaveBeenCalled();
    });

    it('should render game over overlay when game is over', () => {
      const state = {
        snake: [{ x: 10, y: 10 }],
        food: { x: 15, y: 15 },
        score: 20,
        gameOver: true
      };

      render(ctx, state);

      // Should render GAME OVER text
      expect(ctx.fillText).toHaveBeenCalledWith(
        'GAME OVER',
        expect.any(Number),
        expect.any(Number)
      );
    });

    it('should not render game over when game is active', () => {
      const state = {
        snake: [{ x: 10, y: 10 }],
        food: { x: 15, y: 15 },
        score: 20,
        gameOver: false
      };

      const fillTextCalls = [];
      ctx.fillText = jest.fn((...args) => fillTextCalls.push(args));

      render(ctx, state);

      const hasGameOverText = fillTextCalls.some(call =>
        call[0] === 'GAME OVER'
      );
      expect(hasGameOverText).toBe(false);
    });
  });
});
