import {Dimensions} from 'react-native';
import {BALL_DIAMETER} from './helpers';
import {
  GraviPopeBallLifeState,
  GraviPopeBallSkinType,
  GraviPopeBallState,
} from './types';

export function AI_Easy(
  state?: GraviPopeBallState,
  delta?: number,
): GraviPopeBallState {
  const {height, width} = Dimensions.get('screen');

  const VELOCITY_CAP_Y = 2;
  const VELOCITY_CAP_X = 0;

  const GRAVITY_BASE = 100;
  const GRAVITY_RAND_BASE = 50;

  if (typeof state === 'undefined') {
    const scale = Math.random() * 1.5 + 0.5;

    const y = Math.random() * 100 - 250;
    const x = Math.random() * (width - BALL_DIAMETER * scale);

    const rotationInitial = parseInt(String(Math.random() * 360), 10);
    const directionInitial = Math.random() > 0.5 ? 1 : -1;
    const velocityGain = Math.random() * 0.5 + 0.5;

    const gravityBase = GRAVITY_BASE + Math.random() * GRAVITY_RAND_BASE;

    return {
      lifeState: GraviPopeBallLifeState.SPAWNED,
      pos: {x, y, gravityBase},
      id: (Math.random() * 0xffffffff).toString(36),
      vel: {x: 0, y: 1, velocityGain},
      movementVector: {x: 1, y: 1},
      aiHandler: AI_Easy,
      scale,
      rotation: {degree: rotationInitial, direction: directionInitial},
      skin: {
        type: GraviPopeBallSkinType.IMAGE,
        color: 'red',
        image: require('../../assets/skins/rare_poppa.png'),
      },
    };
  } else if (state.lifeState === GraviPopeBallLifeState.SPAWNED) {
    const {pos, vel, rotation} = state;

    const newVel = {
      x: vel.x,
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
      x: pos.x + vel.x * pos.gravityBase * (delta ? delta : 1),
      y: pos.y + vel.y * pos.gravityBase * (delta ? delta : 1),
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

    return {
      ...state,
      pos: newPos,
      vel: newVel,
      rotation: newRotation,
    };
  } else {
    return state;
  }
}
