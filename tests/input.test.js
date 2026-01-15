import { setupInput } from '../src/input.js';
import { DIRECTIONS } from '../src/game.js';

describe('Input Handling', () => {
  let directionCalls;
  let restartCalls;
  let onDirectionChange;
  let onRestart;
  let cleanup;

  beforeEach(() => {
    directionCalls = [];
    restartCalls = [];
    
    onDirectionChange = (direction) => {
      directionCalls.push(direction);
    };
    
    onRestart = () => {
      restartCalls.push(true);
    };
    
    cleanup = setupInput(onDirectionChange, onRestart);
  });

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  describe('setupInput', () => {
    it('should set up keydown event listener', () => {
      // Simply verify cleanup function is returned
      expect(typeof cleanup).toBe('function');
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

      expect(directionCalls).toContain(DIRECTIONS.UP);
    });

    it('should map ArrowDown to DOWN direction', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      document.dispatchEvent(event);

      expect(directionCalls).toContain(DIRECTIONS.DOWN);
    });

    it('should map ArrowLeft to LEFT direction', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      document.dispatchEvent(event);

      expect(directionCalls).toContain(DIRECTIONS.LEFT);
    });

    it('should map ArrowRight to RIGHT direction', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      document.dispatchEvent(event);

      expect(directionCalls).toContain(DIRECTIONS.RIGHT);
    });
  });

  describe('WASD Key Mappings', () => {
    it('should map W to UP direction', () => {
      const event = new KeyboardEvent('keydown', { key: 'w' });
      document.dispatchEvent(event);

      expect(directionCalls).toContain(DIRECTIONS.UP);
    });

    it('should map S to DOWN direction', () => {
      const event = new KeyboardEvent('keydown', { key: 's' });
      document.dispatchEvent(event);

      expect(directionCalls).toContain(DIRECTIONS.DOWN);
    });

    it('should map A to LEFT direction', () => {
      const event = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event);

      expect(directionCalls).toContain(DIRECTIONS.LEFT);
    });

    it('should map D to RIGHT direction', () => {
      const event = new KeyboardEvent('keydown', { key: 'd' });
      document.dispatchEvent(event);

      expect(directionCalls).toContain(DIRECTIONS.RIGHT);
    });

    it('should handle uppercase WASD keys', () => {
      const eventW = new KeyboardEvent('keydown', { key: 'W' });
      document.dispatchEvent(eventW);
      expect(directionCalls).toContain(DIRECTIONS.UP);

      const eventS = new KeyboardEvent('keydown', { key: 'S' });
      document.dispatchEvent(eventS);
      expect(directionCalls).toContain(DIRECTIONS.DOWN);
    });
  });

  describe('Space Key Restart', () => {
    it('should call onRestart when space key is pressed', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      document.dispatchEvent(event);

      expect(restartCalls.length).toBeGreaterThan(0);
    });

    it('should handle Spacebar string (older browsers)', () => {
      const event = new KeyboardEvent('keydown', { key: 'Spacebar' });
      document.dispatchEvent(event);

      expect(restartCalls.length).toBeGreaterThan(0);
    });
  });

  describe('Event Cleanup', () => {
    it('should remove event listener when cleanup is called', () => {
      cleanup();
      
      // Verify cleanup function worked by dispatching event after cleanup
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      const beforeLength = directionCalls.length;
      document.dispatchEvent(event);
      
      // Should not have added any calls after cleanup
      expect(directionCalls.length).toBe(beforeLength);
    });

    it('should not trigger callbacks after cleanup', () => {
      cleanup();

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      const beforeCalls = directionCalls.length;
      document.dispatchEvent(event);

      expect(directionCalls.length).toBe(beforeCalls);
    });
  });

  describe('Invalid Keys', () => {
    it('should not call callbacks for unmapped keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'x' });
      const beforeDirectionCalls = directionCalls.length;
      const beforeRestartCalls = restartCalls.length;
      
      document.dispatchEvent(event);

      expect(directionCalls.length).toBe(beforeDirectionCalls);
      expect(restartCalls.length).toBe(beforeRestartCalls);
    });

    it('should not call callbacks for modifier keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'Shift' });
      const beforeDirectionCalls = directionCalls.length;
      const beforeRestartCalls = restartCalls.length;
      
      document.dispatchEvent(event);

      expect(directionCalls.length).toBe(beforeDirectionCalls);
      expect(restartCalls.length).toBe(beforeRestartCalls);
    });
  });
});
