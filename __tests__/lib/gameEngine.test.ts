import { GameEngine } from '@/lib/game/gameEngine';
import { Direction } from '@/lib/game/types';

describe('GameEngine', () => {
  let engine: GameEngine;

  beforeEach(() => {
    engine = new GameEngine();
  });

  describe('constructor', () => {
    it('should initialize with initial state', () => {
      const state = engine.getState();
      expect(state.snake.length).toBeGreaterThan(0);
      expect(state.score).toBe(0);
      expect(state.gameOver).toBe(false);
    });
  });

  describe('getState', () => {
    it('should return a copy of state', () => {
      const state1 = engine.getState();
      const state2 = engine.getState();
      expect(state1).toEqual(state2);
      expect(state1).not.toBe(state2);
    });
  });

  describe('update', () => {
    it('should update game state', () => {
      const initialState = engine.getState();
      engine.update();
      const newState = engine.getState();
      expect(newState.snake[0]).not.toEqual(initialState.snake[0]);
    });

    it('should notify listeners on update', () => {
      const listener = jest.fn();
      engine.subscribe(listener);
      engine.update();
      expect(listener).toHaveBeenCalledWith(engine.getState());
    });
  });

  describe('setDirection', () => {
    it('should change snake direction', () => {
      engine.setDirection(Direction.UP);
      const state = engine.getState();
      expect(state.direction).toBe(Direction.UP);
    });

    it('should prevent reversing direction', () => {
      const initialState = engine.getState();
      engine.setDirection(Direction.LEFT); // opposite of RIGHT
      const state = engine.getState();
      expect(state.direction).toBe(initialState.direction);
    });
  });

  describe('togglePause', () => {
    it('should pause the game', () => {
      engine.togglePause();
      const state = engine.getState();
      expect(state.paused).toBe(true);
    });

    it('should resume the game', () => {
      engine.togglePause();
      engine.togglePause();
      const state = engine.getState();
      expect(state.paused).toBe(false);
    });
  });

  describe('reset', () => {
    it('should reset game to initial state', () => {
      engine.setDirection(Direction.UP);
      engine.update();
      engine.reset();
      const state = engine.getState();
      expect(state.score).toBe(0);
      expect(state.gameOver).toBe(false);
    });

    it('should notify listeners on reset', () => {
      const listener = jest.fn();
      engine.subscribe(listener);
      engine.reset();
      expect(listener).toHaveBeenCalled();
    });
  });

  describe('subscribe', () => {
    it('should call listener on state changes', () => {
      const listener = jest.fn();
      engine.subscribe(listener);
      engine.update();
      expect(listener).toHaveBeenCalled();
    });

    it('should return unsubscribe function', () => {
      const listener = jest.fn();
      const unsubscribe = engine.subscribe(listener);
      unsubscribe();
      engine.update();
      expect(listener).not.toHaveBeenCalled();
    });

    it('should handle multiple listeners', () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      engine.subscribe(listener1);
      engine.subscribe(listener2);
      engine.update();
      expect(listener1).toHaveBeenCalled();
      expect(listener2).toHaveBeenCalled();
    });
  });
});
