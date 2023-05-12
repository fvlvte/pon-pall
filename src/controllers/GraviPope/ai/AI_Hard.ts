import {GraviPopeBallState} from '../types';
import {AI} from './';

export function AI_Hard(): (
  state?: GraviPopeBallState | undefined,
  delta?: number | undefined,
  aiState?: Record<string, unknown>,
) => GraviPopeBallState {
  return AI.bind({
    overrides: {
      VELOCITY_CAP_Y: 2.5,
      VELOCITY_CAP_X: 0.8,
      GRAVITY_BASE: 200,
      GRAVITY_RAND_BASE: 75,
      SCALE_MIN: 0.5,
      SCALE_MAX: 1,
      SPEED_CAP: 1.025,
      SPEED_GAIN_TICK_BASE: 0.1,
    },
  });
}
