import { GameState, Direction } from './types';
import { createInitialState, updateGameState, changeDirection } from './gameLogic';

export class GameEngine {
  private state: GameState;
  private listeners: Set<(state: GameState) => void>;

  constructor() {
    this.state = createInitialState();
    this.listeners = new Set();
  }

  public getState(): GameState {
    return { ...this.state };
  }

  public update(): void {
    this.state = updateGameState(this.state);
    this.notifyListeners();
  }

  public setDirection(direction: Direction): void {
    this.state = {
      ...this.state,
      direction: changeDirection(this.state.direction, direction),
    };
  }

  public togglePause(): void {
    this.state = {
      ...this.state,
      paused: !this.state.paused,
    };
  }

  public reset(): void {
    this.state = createInitialState();
    this.notifyListeners();
  }

  public subscribe(listener: (state: GameState) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }
}
