export interface Position {
  x: number;
  y: number;
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export interface GameState {
  snake: Position[];
  direction: Direction;
  food: Position;
  score: number;
  gameOver: boolean;
  paused: boolean;
}
