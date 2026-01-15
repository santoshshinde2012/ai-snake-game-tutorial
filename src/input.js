const { DIRECTIONS } = require('./game');

const KEY_CODES = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  W: 'w',
  A: 'a',
  S: 's',
  D: 'd',
  W_UPPER: 'W',
  A_UPPER: 'A',
  S_UPPER: 'S',
  D_UPPER: 'D',
  SPACE: ' ',
  P: 'p',
  P_UPPER: 'P'
};

function mapKeyToDirection(key) {
  const keyMap = {
    [KEY_CODES.ARROW_UP]: DIRECTIONS.UP,
    [KEY_CODES.ARROW_DOWN]: DIRECTIONS.DOWN,
    [KEY_CODES.ARROW_LEFT]: DIRECTIONS.LEFT,
    [KEY_CODES.ARROW_RIGHT]: DIRECTIONS.RIGHT,
    [KEY_CODES.W]: DIRECTIONS.UP,
    [KEY_CODES.W_UPPER]: DIRECTIONS.UP,
    [KEY_CODES.S]: DIRECTIONS.DOWN,
    [KEY_CODES.S_UPPER]: DIRECTIONS.DOWN,
    [KEY_CODES.A]: DIRECTIONS.LEFT,
    [KEY_CODES.A_UPPER]: DIRECTIONS.LEFT,
    [KEY_CODES.D]: DIRECTIONS.RIGHT,
    [KEY_CODES.D_UPPER]: DIRECTIONS.RIGHT
  };

  return keyMap[key] || null;
}

function isDirectionKey(key) {
  return mapKeyToDirection(key) !== null;
}

function isPauseKey(key) {
  return key === KEY_CODES.P || key === KEY_CODES.P_UPPER;
}

function isResetKey(key) {
  return key === KEY_CODES.SPACE;
}

function setupInputHandlers(callbacks) {
  if (typeof document === 'undefined') {
    return null;
  }

  const handleKeyPress = (event) => {
    const key = event.key;

    if (isDirectionKey(key)) {
      event.preventDefault();
      const direction = mapKeyToDirection(key);
      if (callbacks.onDirectionChange && direction) {
        callbacks.onDirectionChange(direction);
      }
    } else if (isPauseKey(key)) {
      event.preventDefault();
      if (callbacks.onPause) {
        callbacks.onPause();
      }
    } else if (isResetKey(key)) {
      event.preventDefault();
      if (callbacks.onReset) {
        callbacks.onReset();
      }
    }
  };

  document.addEventListener('keydown', handleKeyPress);

  return () => {
    document.removeEventListener('keydown', handleKeyPress);
  };
}

module.exports = {
  KEY_CODES,
  mapKeyToDirection,
  isDirectionKey,
  isPauseKey,
  isResetKey,
  setupInputHandlers
};
