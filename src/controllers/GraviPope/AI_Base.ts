import {Dimensions} from 'react-native';
import {BALL_DIAMETER} from './helpers';
import {
  GraviPopeBallLifeState,
  GraviPopeBallSkinType,
  GraviPopeBallState,
} from './types';
import {SKINS} from './consts';

type AI_Extension = {
  overrides: {
    VELOCITY_CAP_Y?: number;
    VELOCITY_CAP_X?: number;
    GRAVITY_BASE?: number;
    GRAVITY_RAND_BASE?: number;
    SCALE_MIN?: number;
    SCALE_MAX?: number;
  };
};

export function AI_Base(
  state?: GraviPopeBallState,
  delta?: number,
  extension?: AI_Extension,
): GraviPopeBallState {
  const {height, width} = Dimensions.get('screen');

  const VELOCITY_CAP_Y = extension?.overrides.VELOCITY_CAP_Y || 2;
  const VELOCITY_CAP_X = extension?.overrides.VELOCITY_CAP_X || 0;

  const GRAVITY_BASE = extension?.overrides.GRAVITY_BASE || 100;
  const GRAVITY_RAND_BASE = extension?.overrides.GRAVITY_RAND_BASE || 50;

  const SCALE_MIN = extension?.overrides.SCALE_MIN || 0.5;
  const SCALE_MAX = extension?.overrides.SCALE_MAX || 1.5;

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
      if (randomtest <= s.odds) {
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
      aiHandler: AI_Base,
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

    const newPos = {
      x:
        pos.x +
        vel.x * pos.gravityBase * movementVector.x * (delta ? delta : 1),
      y:
        pos.y +
        vel.y * pos.gravityBase * movementVector.y * (delta ? delta : 1),
      gravityBase: pos.gravityBase,
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

export function AI_Base_Medium(
  state?: GraviPopeBallState,
  delta?: number,
): GraviPopeBallState {
  return AI_Base(state, delta, {
    overrides: {
      VELOCITY_CAP_Y: 2,
      VELOCITY_CAP_X: 0.3,
      GRAVITY_BASE: 190,
      GRAVITY_RAND_BASE: 50,
      SCALE_MIN: 0.75,
      SCALE_MAX: 1,
    },
  });
}
