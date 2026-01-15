const {
  KEY_CODES,
  mapKeyToDirection,
  isDirectionKey,
  isPauseKey,
  isResetKey,
  setupInputHandlers
} = require('../src/input');
const { DIRECTIONS } = require('../src/game');

describe('KEY_CODES', () => {
  test('should have arrow key codes', () => {
    expect(KEY_CODES.ARROW_UP).toBe('ArrowUp');
    expect(KEY_CODES.ARROW_DOWN).toBe('ArrowDown');
    expect(KEY_CODES.ARROW_LEFT).toBe('ArrowLeft');
    expect(KEY_CODES.ARROW_RIGHT).toBe('ArrowRight');
  });

  test('should have WASD key codes', () => {
    expect(KEY_CODES.W).toBe('w');
    expect(KEY_CODES.A).toBe('a');
    expect(KEY_CODES.S).toBe('s');
    expect(KEY_CODES.D).toBe('d');
  });

  test('should have control key codes', () => {
    expect(KEY_CODES.SPACE).toBe(' ');
    expect(KEY_CODES.P).toBe('p');
  });
});

describe('mapKeyToDirection', () => {
  test('should map ArrowUp to UP direction', () => {
    expect(mapKeyToDirection('ArrowUp')).toEqual(DIRECTIONS.UP);
  });

  test('should map ArrowDown to DOWN direction', () => {
    expect(mapKeyToDirection('ArrowDown')).toEqual(DIRECTIONS.DOWN);
  });

  test('should map ArrowLeft to LEFT direction', () => {
    expect(mapKeyToDirection('ArrowLeft')).toEqual(DIRECTIONS.LEFT);
  });

  test('should map ArrowRight to RIGHT direction', () => {
    expect(mapKeyToDirection('ArrowRight')).toEqual(DIRECTIONS.RIGHT);
  });

  test('should map W to UP direction', () => {
    expect(mapKeyToDirection('w')).toEqual(DIRECTIONS.UP);
  });

  test('should map S to DOWN direction', () => {
    expect(mapKeyToDirection('s')).toEqual(DIRECTIONS.DOWN);
  });

  test('should map A to LEFT direction', () => {
    expect(mapKeyToDirection('a')).toEqual(DIRECTIONS.LEFT);
  });

  test('should map D to RIGHT direction', () => {
    expect(mapKeyToDirection('d')).toEqual(DIRECTIONS.RIGHT);
  });

  test('should map uppercase W to UP direction', () => {
    expect(mapKeyToDirection('W')).toEqual(DIRECTIONS.UP);
  });

  test('should return null for unmapped keys', () => {
    expect(mapKeyToDirection('x')).toBeNull();
  });

  test('should return null for empty string', () => {
    expect(mapKeyToDirection('')).toBeNull();
  });
});

describe('isDirectionKey', () => {
  test('should return true for arrow keys', () => {
    expect(isDirectionKey('ArrowUp')).toBe(true);
    expect(isDirectionKey('ArrowDown')).toBe(true);
    expect(isDirectionKey('ArrowLeft')).toBe(true);
    expect(isDirectionKey('ArrowRight')).toBe(true);
  });

  test('should return true for WASD keys', () => {
    expect(isDirectionKey('w')).toBe(true);
    expect(isDirectionKey('a')).toBe(true);
    expect(isDirectionKey('s')).toBe(true);
    expect(isDirectionKey('d')).toBe(true);
  });

  test('should return false for non-direction keys', () => {
    expect(isDirectionKey(' ')).toBe(false);
    expect(isDirectionKey('p')).toBe(false);
    expect(isDirectionKey('x')).toBe(false);
  });
});

describe('isPauseKey', () => {
  test('should return true for P key', () => {
    expect(isPauseKey('p')).toBe(true);
  });

  test('should return true for uppercase P key', () => {
    expect(isPauseKey('P')).toBe(true);
  });

  test('should return false for other keys', () => {
    expect(isPauseKey(' ')).toBe(false);
    expect(isPauseKey('w')).toBe(false);
    expect(isPauseKey('ArrowUp')).toBe(false);
  });
});

describe('isResetKey', () => {
  test('should return true for SPACE key', () => {
    expect(isResetKey(' ')).toBe(true);
  });

  test('should return false for other keys', () => {
    expect(isResetKey('p')).toBe(false);
    expect(isResetKey('w')).toBe(false);
    expect(isResetKey('Enter')).toBe(false);
  });
});

describe('setupInputHandlers', () => {
  test('should return cleanup function', () => {
    const callbacks = {
      onDirectionChange: jest.fn(),
      onPause: jest.fn(),
      onReset: jest.fn()
    };
    const cleanup = setupInputHandlers(callbacks);
    expect(cleanup).toBeDefined();
    expect(typeof cleanup).toBe('function');
    
    // Clean up
    if (cleanup) cleanup();
  });
  
  test('should call onDirectionChange when arrow key pressed', () => {
    const callbacks = {
      onDirectionChange: jest.fn(),
      onPause: jest.fn(),
      onReset: jest.fn()
    };
    const cleanup = setupInputHandlers(callbacks);
    
    // Simulate arrow key press
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    document.dispatchEvent(event);
    
    expect(callbacks.onDirectionChange).toHaveBeenCalled();
    
    // Clean up
    if (cleanup) cleanup();
  });
  
  test('should call onPause when P key pressed', () => {
    const callbacks = {
      onDirectionChange: jest.fn(),
      onPause: jest.fn(),
      onReset: jest.fn()
    };
    const cleanup = setupInputHandlers(callbacks);
    
    // Simulate P key press
    const event = new KeyboardEvent('keydown', { key: 'p' });
    document.dispatchEvent(event);
    
    expect(callbacks.onPause).toHaveBeenCalled();
    
    // Clean up
    if (cleanup) cleanup();
  });
  
  test('should call onReset when SPACE key pressed', () => {
    const callbacks = {
      onDirectionChange: jest.fn(),
      onPause: jest.fn(),
      onReset: jest.fn()
    };
    const cleanup = setupInputHandlers(callbacks);
    
    // Simulate space key press
    const event = new KeyboardEvent('keydown', { key: ' ' });
    document.dispatchEvent(event);
    
    expect(callbacks.onReset).toHaveBeenCalled();
    
    // Clean up
    if (cleanup) cleanup();
  });
  
  test('should not call callbacks for unhandled keys', () => {
    const callbacks = {
      onDirectionChange: jest.fn(),
      onPause: jest.fn(),
      onReset: jest.fn()
    };
    const cleanup = setupInputHandlers(callbacks);
    
    // Simulate random key press
    const event = new KeyboardEvent('keydown', { key: 'x' });
    document.dispatchEvent(event);
    
    expect(callbacks.onDirectionChange).not.toHaveBeenCalled();
    expect(callbacks.onPause).not.toHaveBeenCalled();
    expect(callbacks.onReset).not.toHaveBeenCalled();
    
    // Clean up
    if (cleanup) cleanup();
  });
  
  test('should handle missing onDirectionChange callback', () => {
    const callbacks = {
      onPause: jest.fn(),
      onReset: jest.fn()
    };
    const cleanup = setupInputHandlers(callbacks);
    
    // Simulate arrow key press
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    expect(() => document.dispatchEvent(event)).not.toThrow();
    
    // Clean up
    if (cleanup) cleanup();
  });
  
  test('should handle missing onPause callback', () => {
    const callbacks = {
      onDirectionChange: jest.fn(),
      onReset: jest.fn()
    };
    const cleanup = setupInputHandlers(callbacks);
    
    // Simulate P key press
    const event = new KeyboardEvent('keydown', { key: 'p' });
    expect(() => document.dispatchEvent(event)).not.toThrow();
    
    // Clean up
    if (cleanup) cleanup();
  });
  
  test('should handle missing onReset callback', () => {
    const callbacks = {
      onDirectionChange: jest.fn(),
      onPause: jest.fn()
    };
    const cleanup = setupInputHandlers(callbacks);
    
    // Simulate space key press
    const event = new KeyboardEvent('keydown', { key: ' ' });
    expect(() => document.dispatchEvent(event)).not.toThrow();
    
    // Clean up
    if (cleanup) cleanup();
  });
});
