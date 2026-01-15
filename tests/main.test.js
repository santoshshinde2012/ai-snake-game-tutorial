const { SnakeGame, initGame } = require('../src/main');
const { GRID_SIZE, CELL_SIZE } = require('../src/game');

describe('SnakeGame', () => {
  let canvas;
  let game;

  beforeEach(() => {
    // Create a canvas element
    canvas = document.createElement('canvas');
    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;
    document.body.appendChild(canvas);
    
    game = new SnakeGame(canvas);
  });

  afterEach(() => {
    if (game) {
      game.stop();
    }
    document.body.innerHTML = '';
  });

  describe('constructor', () => {
    test('should initialize with canvas element', () => {
      expect(game.canvas).toBe(canvas);
      expect(game.ctx).toBeDefined();
    });

    test('should initialize with default state', () => {
      expect(game.state).toBeDefined();
      expect(game.state.snake).toBeDefined();
      expect(game.state.score).toBe(0);
    });

    test('should set default FPS to 10', () => {
      expect(game.fps).toBe(10);
    });

    test('should set canvas dimensions correctly', () => {
      expect(canvas.width).toBe(GRID_SIZE * CELL_SIZE);
      expect(canvas.height).toBe(GRID_SIZE * CELL_SIZE);
    });
  });

  describe('start', () => {
    test('should start game loop', () => {
      game.start();
      expect(game.gameLoop).toBeDefined();
    });

    test('should setup input handlers', () => {
      game.start();
      expect(game.removeInputHandlers).toBeDefined();
    });
  });

  describe('stop', () => {
    test('should stop game loop', () => {
      game.start();
      game.stop();
      expect(game.gameLoop).toBeNull();
    });

    test('should remove input handlers', () => {
      game.start();
      game.stop();
      expect(game.removeInputHandlers).toBeNull();
    });
  });

  describe('setFPS', () => {
    test('should update FPS value', () => {
      game.setFPS(15);
      expect(game.fps).toBe(15);
    });

    test('should restart game loop with new FPS', () => {
      game.start();
      const oldLoop = game.gameLoop;
      game.setFPS(15);
      expect(game.gameLoop).not.toBe(oldLoop);
    });
  });

  describe('getState', () => {
    test('should return current game state', () => {
      const state = game.getState();
      expect(state).toBeDefined();
      expect(state.snake).toBeDefined();
      expect(state.score).toBeDefined();
    });
  });

  describe('update', () => {
    test('should update game state', () => {
      const initialSnake = [...game.state.snake];
      game.update();
      expect(game.state.snake).not.toEqual(initialSnake);
    });
  });

  describe('render', () => {
    test('should call render without errors', () => {
      expect(() => game.render()).not.toThrow();
    });
  });

  describe('integration', () => {
    test('should handle complete game loop cycle', (done) => {
      game.start();
      
      setTimeout(() => {
        const state = game.getState();
        expect(state).toBeDefined();
        game.stop();
        done();
      }, 150);
    });

    test('should update state during game loop', (done) => {
      game.start();
      
      setTimeout(() => {
        game.stop();
        expect(game.state).toBeDefined();
        done();
      }, 150);
    });
    
    test('should handle setFPS when game loop is not running', () => {
      game.setFPS(15);
      expect(game.fps).toBe(15);
      expect(game.gameLoop).toBeNull();
    });
  });
});

describe('initGame', () => {
  beforeEach(() => {
    document.body.innerHTML = '<canvas id="testCanvas"></canvas>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should initialize game with canvas ID', () => {
    const game = initGame('testCanvas');
    expect(game).toBeDefined();
    expect(game).toBeInstanceOf(SnakeGame);
    game.stop();
  });

  test('should return null if canvas not found', () => {
    const game = initGame('nonexistent');
    expect(game).toBeNull();
  });

  test('should start game automatically', () => {
    const game = initGame('testCanvas');
    expect(game.gameLoop).toBeDefined();
    game.stop();
  });
});
