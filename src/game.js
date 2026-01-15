const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

const GRID_SIZE = 20;
const CELL_SIZE = 20;

function createInitialState() {
  return {
    snake: [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ],
    direction: DIRECTIONS.RIGHT,
    food: { x: 15, y: 15 },
    score: 0,
    gameOver: false,
    paused: false
  };
}

function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE)
  };
}

function isPositionValid(position, snake) {
  return !snake.some(segment => 
    segment.x === position.x && segment.y === position.y
  );
}

function generateFood(snake) {
  let food;
  do {
    food = getRandomPosition();
  } while (!isPositionValid(food, snake));
  return food;
}

function isOutOfBounds(position) {
  return position.x < 0 || 
         position.x >= GRID_SIZE || 
         position.y < 0 || 
         position.y >= GRID_SIZE;
}

function checkSelfCollision(head, body) {
  return body.some(segment => 
    segment.x === head.x && segment.y === head.y
  );
}

function updateGame(state) {
  if (state.gameOver || state.paused) {
    return state;
  }

  const head = state.snake[0];
  const newHead = {
    x: head.x + state.direction.x,
    y: head.y + state.direction.y
  };

  if (isOutOfBounds(newHead)) {
    return { ...state, gameOver: true };
  }

  if (checkSelfCollision(newHead, state.snake)) {
    return { ...state, gameOver: true };
  }

  const newSnake = [newHead, ...state.snake];

  if (newHead.x === state.food.x && newHead.y === state.food.y) {
    return {
      ...state,
      snake: newSnake,
      food: generateFood(newSnake),
      score: state.score + 10
    };
  }

  newSnake.pop();
  return {
    ...state,
    snake: newSnake
  };
}

function changeDirection(state, newDirection) {
  const oppositeDirections = {
    UP: DIRECTIONS.DOWN,
    DOWN: DIRECTIONS.UP,
    LEFT: DIRECTIONS.RIGHT,
    RIGHT: DIRECTIONS.LEFT
  };

  const directionName = Object.keys(DIRECTIONS).find(
    key => DIRECTIONS[key] === newDirection
  );

  if (oppositeDirections[directionName] === state.direction) {
    return state;
  }

  return { ...state, direction: newDirection };
}

function togglePause(state) {
  return { ...state, paused: !state.paused };
}

function resetGame() {
  return createInitialState();
}

module.exports = {
  DIRECTIONS,
  GRID_SIZE,
  CELL_SIZE,
  createInitialState,
  updateGame,
  changeDirection,
  togglePause,
  resetGame,
  generateFood,
  isOutOfBounds,
  checkSelfCollision,
  isPositionValid,
  getRandomPosition
};
