import {GraviPopeBallState} from '../types';
import {AI} from './';

export function AI_Medium(): (
  state?: GraviPopeBallState | undefined,
  delta?: number | undefined,
  aiState?: Record<string, unknown>,
) => GraviPopeBallState {
  return AI.bind({
    overrides: {
      VELOCITY_CAP_Y: 2,
      VELOCITY_CAP_X: 0.3,
      GRAVITY_BASE: 190,
      GRAVITY_RAND_BASE: 50,
      SCALE_MIN: 0.75,
      SCALE_MAX: 1,
      SPEED_CAP: 1.015,
      SPEED_GAIN_TICK_BASE: 0.1,
    },
  });
}
