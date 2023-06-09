import {Dimensions} from 'react-native';
import {BALL_DIAMETER, SKINS} from '../consts';
import {
  GraviPopeBallState,
  GraviPopeBallLifeState,
  GraviPopeBallSkinType,
} from '../types';
import {GraviPopeController} from '../GraviPopeController';

type AI_Extension = {
  overrides: {
    VELOCITY_CAP_Y?: number;
    VELOCITY_CAP_X?: number;
    GRAVITY_BASE?: number;
    GRAVITY_RAND_BASE?: number;
    SCALE_MIN?: number;
    SCALE_MAX?: number;
    WIND?: number;
    WIND_CHANCE?: number;
    SPEED_CAP?: number;
    SPEED_GAIN_TICK_BASE?: number;
  };
};

const WindGustCache = new Map<string, number>();

export function AI(
  this: Partial<AI_Extension> | undefined | null,
  state?: GraviPopeBallState,
  delta?: number,
  aiState?: Record<string, unknown>,
): GraviPopeBallState {
  const {height, width} = Dimensions.get('screen');

  const extension = this as AI_Extension;
  const VELOCITY_CAP_Y = extension?.overrides?.VELOCITY_CAP_Y || 2;
  const VELOCITY_CAP_X = extension?.overrides?.VELOCITY_CAP_X || 0;

  const SPEED_CAP = extension?.overrides?.SPEED_CAP || 1.01;
  const SPEED_GAIN_TICK_BASE =
    extension?.overrides?.SPEED_GAIN_TICK_BASE || 0.1;

  const GRAVITY_BASE = extension?.overrides?.GRAVITY_BASE || 100;
  const GRAVITY_RAND_BASE = extension?.overrides?.GRAVITY_RAND_BASE || 50;

  const SCALE_MIN = extension?.overrides?.SCALE_MIN || 0.5;
  const SCALE_MAX = extension?.overrides?.SCALE_MAX || 1.5;

  const defaultWind = extension?.overrides?.WIND || 0;
  const windDirection = Math.random() > 0.5 ? 1 : -1;

  const windChance = extension?.overrides?.WIND_CHANCE || 0;

  if (aiState) {
    if (!aiState.speed) {
      aiState.speed = 1;
    } else {
      (<number>aiState.speed) +=
        ((Math.random() * (delta ? delta : 1)) / 60) * SPEED_GAIN_TICK_BASE;
      if ((aiState.speed as number) > SPEED_CAP) {
        aiState.speed = SPEED_CAP;
      }
    }
  }

  if (typeof state === 'undefined') {
    const scale = Math.random() * SCALE_MAX + SCALE_MIN;

    const y = -200 - Math.random() * 100;
    const x = Math.random() * (width - BALL_DIAMETER * scale);

    const rotationInitial = parseInt(String(Math.random() * 360), 10);
    const directionInitial = Math.random() > 0.5 ? 1 : -1;
    const velocityGain = Math.random() * 0.5 + 0.5;

    const gravityBase = GRAVITY_BASE + Math.random() * GRAVITY_RAND_BASE;

    const randomSeed = Math.random();
    const movementVectorX = randomSeed < 0.75 ? 0 : randomSeed < 0.9 ? 1 : -1;

    let skin = -1;

    for (const s of Object.values(SKINS)) {
      const randomtest = Math.random();
      if (
        randomtest <= s.odds &&
        GraviPopeController.Instance.getLevel() >= s.minimalLevel &&
        GraviPopeController.Instance.getLevel() <= s.maximalLevel
      ) {
        skin = s.img;
        break;
      }
    }

    return {
      lifeState: GraviPopeBallLifeState.SPAWNED,
      pos: {x, y, gravityBase},
      id: (Math.random() * 0xffffffff).toString(36),
      vel: {x: 0, y: 1, velocityGain},
      movementVector: {x: movementVectorX, y: 1},
      scale,
      rotation: {degree: rotationInitial, direction: directionInitial},
      skin: {
        type: GraviPopeBallSkinType.IMAGE,
        color: 'red',
        image: skin,
      },
    };
  } else if (state.lifeState === GraviPopeBallLifeState.SPAWNED) {
    const {pos, vel, rotation, movementVector} = state;

    const newVel = {
      x: vel.x + 0.01 * vel.velocityGain,
      y: vel.y + 0.1 * vel.velocityGain,
      velocityGain: vel.velocityGain,
    };
    if (newVel.y > VELOCITY_CAP_Y) {
      newVel.y = VELOCITY_CAP_Y;
    }
    if (newVel.x > VELOCITY_CAP_X) {
      newVel.x = VELOCITY_CAP_X;
    }

    const windGust = WindGustCache.get(state.id) || 0;

    if (defaultWind > 0) {
      if (windGust === 0 && state.pos.y > 300) {
        if (Math.random() < windChance) {
          WindGustCache.set(
            state.id,
            defaultWind * Math.random() * windDirection,
          );
        }
      }
    } else {
      if (windGust > 0) {
        const newValue = windGust - defaultWind / 15;
        WindGustCache.set(state.id, newValue >= 0 ? newValue : 0);
      } else {
        const newValue = windGust + 0.1;
        WindGustCache.set(state.id, newValue <= 0 ? newValue : 0);
      }
    }

    const newPos = {
      x:
        pos.x +
        vel.x *
          pos.gravityBase *
          movementVector.x *
          (delta ? delta : 1) *
          windGust,
      y:
        pos.y +
        vel.y * pos.gravityBase * movementVector.y * (delta ? delta : 1),
      gravityBase: pos.gravityBase * <number>aiState?.speed,
    };

    const newRotation = {
      degree:
        rotation.degree +
        20 * rotation.direction * (vel.x + vel.y) * (delta ? delta : 1),
      direction: rotation.direction,
    };

    if (newRotation.degree > 360) {
      newRotation.degree -= 360;
    } else if (newRotation.degree < -360) {
      newRotation.degree += 360;
    }

    if (newPos.y > height - BALL_DIAMETER / 2) {
      state.lifeState = GraviPopeBallLifeState.DEAD;
    }

    state.pos = newPos;
    state.vel = newVel;
    state.rotation = newRotation;

    return state;
  } else {
    return state;
  }
}
