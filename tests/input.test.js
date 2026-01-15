import { setupInput } from '../src/input.js';
import { DIRECTIONS } from '../src/game.js';

describe('Input Handling', () => {
  let onDirectionChange;
  let onRestart;
  let cleanup;

  beforeEach(() => {
    onDirectionChange = jest.fn();
    onRestart = jest.fn();
    cleanup = setupInput(onDirectionChange, onRestart);
  });

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  describe('setupInput', () => {
    it('should set up keydown event listener', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
      const cleanupFn = setupInput(onDirectionChange, onRestart);

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );

      cleanupFn();
      addEventListenerSpy.mockRestore();
    });

    it('should return cleanup function', () => {
      const cleanupFn = setupInput(onDirectionChange, onRestart);

      expect(typeof cleanupFn).toBe('function');

      cleanupFn();
    });
  });

  describe('Arrow Key Mappings', () => {
    it('should map ArrowUp to UP direction', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      document.dispatchEvent(event);

      expect(onDirectionChange).toHaveBeenCalledWith(DIRECTIONS.UP);
    });

    it('should map ArrowDown to DOWN direction', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      document.dispatchEvent(event);

      expect(onDirectionChange).toHaveBeenCalledWith(DIRECTIONS.DOWN);
    });

    it('should map ArrowLeft to LEFT direction', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      document.dispatchEvent(event);

      expect(onDirectionChange).toHaveBeenCalledWith(DIRECTIONS.LEFT);
    });

    it('should map ArrowRight to RIGHT direction', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      document.dispatchEvent(event);

      expect(onDirectionChange).toHaveBeenCalledWith(DIRECTIONS.RIGHT);
    });
  });

  describe('WASD Key Mappings', () => {
    it('should map W to UP direction', () => {
      const event = new KeyboardEvent('keydown', { key: 'w' });
      document.dispatchEvent(event);

      expect(onDirectionChange).toHaveBeenCalledWith(DIRECTIONS.UP);
    });

    it('should map S to DOWN direction', () => {
      const event = new KeyboardEvent('keydown', { key: 's' });
      document.dispatchEvent(event);

      expect(onDirectionChange).toHaveBeenCalledWith(DIRECTIONS.DOWN);
    });

    it('should map A to LEFT direction', () => {
      const event = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event);

      expect(onDirectionChange).toHaveBeenCalledWith(DIRECTIONS.LEFT);
    });

    it('should map D to RIGHT direction', () => {
      const event = new KeyboardEvent('keydown', { key: 'd' });
      document.dispatchEvent(event);

      expect(onDirectionChange).toHaveBeenCalledWith(DIRECTIONS.RIGHT);
    });

    it('should handle uppercase WASD keys', () => {
      const eventW = new KeyboardEvent('keydown', { key: 'W' });
      document.dispatchEvent(eventW);
      expect(onDirectionChange).toHaveBeenCalledWith(DIRECTIONS.UP);

      const eventS = new KeyboardEvent('keydown', { key: 'S' });
      document.dispatchEvent(eventS);
      expect(onDirectionChange).toHaveBeenCalledWith(DIRECTIONS.DOWN);
    });
  });

  describe('Space Key Restart', () => {
    it('should call onRestart when space key is pressed', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      document.dispatchEvent(event);

      expect(onRestart).toHaveBeenCalled();
    });

    it('should handle Spacebar string (older browsers)', () => {
      const event = new KeyboardEvent('keydown', { key: 'Spacebar' });
      document.dispatchEvent(event);

      expect(onRestart).toHaveBeenCalled();
    });
  });

  describe('Event Cleanup', () => {
    it('should remove event listener when cleanup is called', () => {
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

      const cleanupFn = setupInput(onDirectionChange, onRestart);
      cleanupFn();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );

      removeEventListenerSpy.mockRestore();
    });

    it('should not trigger callbacks after cleanup', () => {
      const directionCallback = jest.fn();
      const restartCallback = jest.fn();
      const cleanupFn = setupInput(directionCallback, restartCallback);

      cleanupFn();

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      document.dispatchEvent(event);

      expect(directionCallback).not.toHaveBeenCalled();
    });
  });

  describe('Invalid Keys', () => {
    it('should not call callbacks for unmapped keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'x' });
      document.dispatchEvent(event);

      expect(onDirectionChange).not.toHaveBeenCalled();
      expect(onRestart).not.toHaveBeenCalled();
    });

    it('should not call callbacks for modifier keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'Shift' });
      document.dispatchEvent(event);

      expect(onDirectionChange).not.toHaveBeenCalled();
      expect(onRestart).not.toHaveBeenCalled();
    });
  });
});
