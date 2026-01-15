// Game constants
export const GRID_SIZE = 20;
export const CELL_SIZE = 20;
export const INITIAL_SPEED = 10; // Updates per second

// Direction constants
export const DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

/**
 * Creates the initial game state
 * @returns {Object} Initial game state with snake, direction, food, score, and gameOver
 */
export const createInitialState = () => ({
  snake: [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 }
  ],
  direction: DIRECTIONS.RIGHT,
  food: { x: 15, y: 15 },
  score: 0,
  gameOver: false
});

/**
 * Moves the snake in the current direction
 * @param {Array} snake - Array of snake segments
 * @param {string} direction - Current direction
 * @returns {Array} New snake array with updated head position
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
 * Checks if the snake collides with walls
 * @param {Array} snake - Array of snake segments
 * @returns {boolean} True if collision detected
 */
export const isWallCollision = (snake) => {
  const head = snake[0];
  return head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE;
};

/**
 * Checks if the snake collides with itself
 * @param {Array} snake - Array of snake segments
 * @returns {boolean} True if collision detected
 */
export const isSelfCollision = (snake) => {
  const head = snake[0];
  return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
};

/**
 * Checks if the snake head is on food
 * @param {Array} snake - Array of snake segments
 * @param {Object} food - Food position {x, y}
 * @returns {boolean} True if snake is eating food
 */
export const isFoodCollision = (snake, food) => {
  const head = snake[0];
  return head.x === food.x && head.y === food.y;
};

/**
 * Grows the snake by one segment
 * @param {Array} snake - Array of snake segments
 * @returns {Array} New snake array with additional segment
 */
export const growSnake = (snake) => {
  const tail = snake[snake.length - 1];
  return [...snake, { ...tail }];
};

/**
 * Generates a random food position not on the snake
 * @param {Array} snake - Array of snake segments
 * @returns {Object} Food position {x, y}
 */
export const generateFood = (snake) => {
  let food;
  let isOnSnake;

  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    isOnSnake = snake.some(segment => segment.x === food.x && segment.y === food.y);
  } while (isOnSnake);

  return food;
};

/**
 * Checks if a direction change is valid (no 180° turns)
 * @param {string} currentDirection - Current direction
 * @param {string} newDirection - Proposed new direction
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
 * Updates the game state based on current state
 * @param {Object} state - Current game state
 * @returns {Object} New game state
 */
export const updateGameState = (state) => {
  if (state.gameOver) {
    return state;
  }

  // Move snake
  const newSnake = moveSnake(state.snake, state.direction);

  // Check collisions
  if (isWallCollision(newSnake) || isSelfCollision(newSnake)) {
    return {
      ...state,
      snake: newSnake,
      gameOver: true
    };
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

  // Normal move
  return {
    ...state,
    snake: newSnake
  };
};
