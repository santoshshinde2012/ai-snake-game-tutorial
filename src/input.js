import { DIRECTIONS, isValidDirectionChange } from './game.js';

/**
 * Maps keyboard keys to directions
 */
const KEY_DIRECTION_MAP = {
  ArrowUp: DIRECTIONS.UP,
  ArrowDown: DIRECTIONS.DOWN,
  ArrowLeft: DIRECTIONS.LEFT,
  ArrowRight: DIRECTIONS.RIGHT,
  w: DIRECTIONS.UP,
  W: DIRECTIONS.UP,
  s: DIRECTIONS.DOWN,
  S: DIRECTIONS.DOWN,
  a: DIRECTIONS.LEFT,
  A: DIRECTIONS.LEFT,
  d: DIRECTIONS.RIGHT,
  D: DIRECTIONS.RIGHT
};

/**
 * Sets up keyboard input handling
 * @param {Function} onDirectionChange - Callback for direction changes
 * @param {Function} onRestart - Callback for restart (space key)
 * @returns {Function} Cleanup function to remove event listeners
 */
export const setupInput = (onDirectionChange, onRestart) => {
  const handleKeyDown = (event) => {
    // Prevent default behavior for arrow keys
    if (event.key.startsWith('Arrow')) {
      event.preventDefault();
    }

    // Handle direction change
    if (KEY_DIRECTION_MAP[event.key]) {
      onDirectionChange(KEY_DIRECTION_MAP[event.key]);
    }

    // Handle restart
    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      onRestart();
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
};
