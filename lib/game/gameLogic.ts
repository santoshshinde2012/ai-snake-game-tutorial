import { Position, Direction, GameState } from './types';
import { GRID_SIZE, INITIAL_SNAKE_LENGTH } from './constants';

export const createInitialState = (): GameState => {
  const startX = Math.floor(GRID_SIZE / 2);
  const startY = Math.floor(GRID_SIZE / 2);
  
  const snake: Position[] = [];
  for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
    snake.push({ x: startX - i, y: startY });
  }
  
  return {
    snake,
    direction: Direction.RIGHT,
    food: generateFood(snake, GRID_SIZE),
    score: 0,
    gameOver: false,
    paused: false,
  };
};

export const moveSnake = (snake: Position[], direction: Direction): Position[] => {
  const head = { ...snake[0] };
  
  switch (direction) {
    case Direction.UP:
      head.y -= 1;
      break;
    case Direction.DOWN:
      head.y += 1;
      break;
    case Direction.LEFT:
      head.x -= 1;
      break;
    case Direction.RIGHT:
      head.x += 1;
      break;
  }
  
  return [head, ...snake.slice(0, -1)];
};

export const checkWallCollision = (head: Position, gridSize: number): boolean => {
  return head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize;
};

export const checkSelfCollision = (snake: Position[]): boolean => {
  const head = snake[0];
  return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
};

export const checkFoodCollision = (head: Position, food: Position): boolean => {
  return head.x === food.x && head.y === food.y;
};

export const generateFood = (snake: Position[], gridSize: number): Position => {
  // Safety check: if grid is nearly full, use deterministic approach
  const maxAttempts = gridSize * gridSize;
  let attempts = 0;
  let food: Position;
  let isOnSnake: boolean;
  
  do {
    food = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
    isOnSnake = snake.some(segment => segment.x === food.x && segment.y === food.y);
    attempts++;
    
    // Safety exit: if too many attempts, find first available position
    if (attempts >= maxAttempts) {
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const pos = { x, y };
          if (!snake.some(segment => segment.x === pos.x && segment.y === pos.y)) {
            return pos;
          }
        }
      }
      // If no position found (grid is full), return random position
      // This should never happen in practice as game ends before grid is full
      return { x: 0, y: 0 };
    }
  } while (isOnSnake);
  
  return food;
};

export const growSnake = (snake: Position[]): Position[] => {
  const tail = snake[snake.length - 1];
  return [...snake, { ...tail }];
};

export const updateGameState = (state: GameState): GameState => {
  if (state.gameOver || state.paused) {
    return state;
  }
  
  const newSnake = moveSnake(state.snake, state.direction);
  const head = newSnake[0];
  
  // Check collisions
  if (checkWallCollision(head, GRID_SIZE) || checkSelfCollision(newSnake)) {
    return { ...state, gameOver: true };
  }
  
  // Check food collision
  if (checkFoodCollision(head, state.food)) {
    const grownSnake = growSnake(newSnake);
    return {
      ...state,
      snake: grownSnake,
      food: generateFood(grownSnake, GRID_SIZE),
      score: state.score + 10,
    };
  }
  
  return {
    ...state,
    snake: newSnake,
  };
};

export const changeDirection = (
  currentDirection: Direction,
  newDirection: Direction
): Direction => {
  // Prevent reversing direction
  const opposites: Record<Direction, Direction> = {
    [Direction.UP]: Direction.DOWN,
    [Direction.DOWN]: Direction.UP,
    [Direction.LEFT]: Direction.RIGHT,
    [Direction.RIGHT]: Direction.LEFT,
  };
  
  if (opposites[currentDirection] === newDirection) {
    return currentDirection;
  }
  
  return newDirection;
};
