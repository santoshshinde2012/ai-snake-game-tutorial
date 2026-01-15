const { 
  createInitialState, 
  updateGame, 
  changeDirection, 
  togglePause, 
  resetGame,
  GRID_SIZE,
  CELL_SIZE
} = require('./game');
const { render } = require('./renderer');
const { setupInputHandlers } = require('./input');

class SnakeGame {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.state = createInitialState();
    this.gameLoop = null;
    this.fps = 10;
    this.removeInputHandlers = null;
    
    this.canvas.width = GRID_SIZE * CELL_SIZE;
    this.canvas.height = GRID_SIZE * CELL_SIZE;
  }

  start() {
    this.setupInput();
    this.startGameLoop();
  }

  setupInput() {
    this.removeInputHandlers = setupInputHandlers({
      onDirectionChange: (direction) => {
        this.state = changeDirection(this.state, direction);
      },
      onPause: () => {
        this.state = togglePause(this.state);
      },
      onReset: () => {
        if (this.state.gameOver) {
          this.state = resetGame();
        }
      }
    });
  }

  startGameLoop() {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }

    this.gameLoop = setInterval(() => {
      this.update();
      this.render();
    }, 1000 / this.fps);
  }

  update() {
    this.state = updateGame(this.state);
  }

  render() {
    render(this.ctx, this.state);
  }

  stop() {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
      this.gameLoop = null;
    }
    if (this.removeInputHandlers) {
      this.removeInputHandlers();
      this.removeInputHandlers = null;
    }
  }

  setFPS(fps) {
    this.fps = fps;
    if (this.gameLoop) {
      this.startGameLoop();
    }
  }

  getState() {
    return this.state;
  }
}

function initGame(canvasId) {
  if (typeof document === 'undefined') {
    return null;
  }

  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas element with id '${canvasId}' not found`);
    return null;
  }

  const game = new SnakeGame(canvas);
  game.start();
  return game;
}

module.exports = {
  SnakeGame,
  initGame
};
