// Game Constants
export const GRID_SIZE = 20;
export const CELL_SIZE = 20;
export const DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

const INITIAL_SNAKE = [{ x: 10, y: 10 }];

/**
 * Creates the initial game state
 * @returns {Object} Initial game state
 */
export const createInitialState = () => ({
  snake: [...INITIAL_SNAKE],
  direction: DIRECTIONS.RIGHT,
  food: generateFood(INITIAL_SNAKE),
  score: 0,
  gameOver: false
});

/**
 * Moves snake in the given direction (pure function)
 * @param {Array} snake - Array of {x, y} coordinates
 * @param {string} direction - Direction to move
 * @returns {Array} New snake array
 */
export const moveSnake = (snake, direction) => {
  const head = { ...snake[0] };
  
  switch (direction) {
    case DIRECTIONS.UP:
      head.y -= 1;
      break;
    case DIRECTIONS.DOWN:
      head.y += 1;
      break;
    case DIRECTIONS.LEFT:
      head.x -= 1;
      break;
    case DIRECTIONS.RIGHT:
      head.x += 1;
      break;
  }
  
  return [head, ...snake.slice(0, -1)];
};

/**
 * Checks if snake has collided with wall
 * @param {Array} snake - Snake array
 * @param {number} gridSize - Size of grid
 * @returns {boolean} True if collision detected
 */
export const isWallCollision = (snake, gridSize = GRID_SIZE) => {
  const head = snake[0];
  return head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize;
};

/**
 * Checks if snake has collided with itself
 * @param {Array} snake - Snake array
 * @returns {boolean} True if collision detected
 */
export const isSelfCollision = (snake) => {
  const head = snake[0];
  return snake.slice(1).some(segment => 
    segment.x === head.x && segment.y === head.y
  );
};

/**
 * Checks if snake has collided with food
 * @param {Array} snake - Snake array
 * @param {Object} food - Food position {x, y}
 * @returns {boolean} True if collision detected
 */
export const isFoodCollision = (snake, food) => {
  const head = snake[0];
  return head.x === food.x && head.y === food.y;
};

/**
 * Grows snake by adding segment at tail
 * @param {Array} snake - Snake array
 * @returns {Array} New snake array with added segment
 */
export const growSnake = (snake) => {
  return [...snake, snake[snake.length - 1]];
};

/**
 * Generates random food position not on snake
 * @param {Array} snake - Snake array
 * @param {number} gridSize - Size of grid
 * @returns {Object} Food position {x, y}
 */
export const generateFood = (snake, gridSize = GRID_SIZE) => {
  let food;
  do {
    food = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    };
  } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
  return food;
};

/**
 * Validates if direction change is allowed (no 180° turns)
 * @param {string} currentDirection - Current direction
 * @param {string} newDirection - New direction
 * @returns {boolean} True if direction change is valid
 */
export const isValidDirectionChange = (currentDirection, newDirection) => {
  const opposites = {
    [DIRECTIONS.UP]: DIRECTIONS.DOWN,
    [DIRECTIONS.DOWN]: DIRECTIONS.UP,
    [DIRECTIONS.LEFT]: DIRECTIONS.RIGHT,
    [DIRECTIONS.RIGHT]: DIRECTIONS.LEFT
  };
  return opposites[currentDirection] !== newDirection;
};

/**
 * Updates game state for one frame (pure function)
 * @param {Object} state - Current game state
 * @returns {Object} New game state
 */
export const updateGameState = (state) => {
  if (state.gameOver) return state;
  
  // Move snake
  const newSnake = moveSnake(state.snake, state.direction);
  
  // Check collisions
  if (isWallCollision(newSnake) || isSelfCollision(newSnake)) {
    return { ...state, gameOver: true };
  }
  
  // Check food collision
  if (isFoodCollision(newSnake, state.food)) {
    return {
      ...state,
      snake: growSnake(newSnake),
      food: generateFood(growSnake(newSnake)),
      score: state.score + 10
    };
  }
  
  return { ...state, snake: newSnake };
};
