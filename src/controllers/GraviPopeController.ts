import {GRAVIPOPE_LEVELS} from '../modes/GraviPopeView';
import {GraviPopeBallLifeState, GraviPopeBallState} from '../modes/types';

export enum GraviPopeGameLifeState {
  GAME_IDLE,
  GAME_RUNNING,
  GAME_LOST,
}

const MAX_BALLS = 2;

export class GraviPopeController {
  private static _graviPope: GraviPopeController;
  private tickInterval = -1;
  private level = 0;
  private readonly TIME_ORACLE_BASE: number = 1000;
  private readonly UPDATE_FRAMERATE: number = 1000 / 60;
  private gameLifeState: GraviPopeGameLifeState =
    GraviPopeGameLifeState.GAME_IDLE;
  private points = 0;
  private controllerState = {
    lastTimeFromBallSpawn: 0,
    lastTickTime: 0,
    poppaCounter: 0,
    pressedIndex: -1,
  };
  private pressedPopeIds: string[] = [];

  private graviPopeState: {[key: string]: GraviPopeBallState};

  private constructor() {
    this.graviPopeState = {};
  }

  public static get Instance(): GraviPopeController {
    return this._graviPope || (this._graviPope = new this());
  }

  public setLevel(l: number): void {
    this.level = l;
  }

  public getPoints(): number {
    return this.points;
  }

  public graviPopeUpdateTick(): void {
    const now = new Date().getTime();

    // Time oracle makes sure that the game runs at the same speed regardless of the framerate
    const oracleDelta =
      (now - this.controllerState.lastTickTime) / this.TIME_ORACLE_BASE;

    switch (this.gameLifeState) {
      case GraviPopeGameLifeState.GAME_IDLE: {
        break;
      }
      case GraviPopeGameLifeState.GAME_RUNNING: {
        if (Object.keys(this.graviPopeState).length < MAX_BALLS) {
          const ballState = GRAVIPOPE_LEVELS[this.level].ai(
            undefined,
            undefined,
            undefined,
            this.controllerState.poppaCounter++ % 2,
          );
          this.graviPopeState[ballState.id] = ballState;
        }

        for (const key in this.graviPopeState) {
          const ballState = this.graviPopeState[key];

          if (this.pressedPopeIds.includes(ballState.id)) {
            this.points++;
            delete this.graviPopeState[ballState.id];
          } else if (ballState.lifeState === GraviPopeBallLifeState.DEAD) {
            this.gameLifeState = GraviPopeGameLifeState.GAME_LOST;
            this.graviPopeState = {};
            break;
          } else if (ballState.lifeState === GraviPopeBallLifeState.SPAWNED) {
            GRAVIPOPE_LEVELS[this.level].ai(ballState, oracleDelta);
          }
        }
      }
    }

    this.controllerState.lastTickTime = new Date().getTime();
  }

  public getLifeState(): GraviPopeGameLifeState {
    return this.gameLifeState;
  }

  public getGraviPopeState(): GraviPopeBallState[] {
    return Object.values(this.graviPopeState).filter(
      ballState => ballState.lifeState === GraviPopeBallLifeState.SPAWNED,
    );
  }

  public updateState(state: GraviPopeBallState): void {
    this.pressedPopeIds.push(state.id);
  }

  public enableGameSimulation(): void {
    this.gameLifeState = GraviPopeGameLifeState.GAME_IDLE;
    this.tickInterval = setInterval(
      this.graviPopeUpdateTick.bind(this),
      this.UPDATE_FRAMERATE,
    );
  }

  public disableGameSimulation(): void {
    clearInterval(this.tickInterval);
  }

  public play(): void {
    this.controllerState.lastTickTime = Date.now();
    this.gameLifeState = GraviPopeGameLifeState.GAME_RUNNING;
  }

  public reset(): void {
    this.gameLifeState = GraviPopeGameLifeState.GAME_IDLE;
    this.points = 0;
  }
}
