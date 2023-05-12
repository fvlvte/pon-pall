import {GraviPopeBallState} from '../types';
import {AI} from './';

export function AI_Hell(): (
  state?: GraviPopeBallState | undefined,
  delta?: number | undefined,
  aiState?: Record<string, unknown>,
) => GraviPopeBallState {
  return AI.bind({
    overrides: {
      VELOCITY_CAP_Y: 3.0666,
      VELOCITY_CAP_X: 1.2666,
      GRAVITY_BASE: 250.666,
      GRAVITY_RAND_BASE: 90.666,
      SCALE_MIN: 0.333666,
      SCALE_MAX: 0.666,
      WIND: 11.666,
      WIND_CHANCE: 0.25666,
      SPEED_CAP: 1.0666,
      SPEED_GAIN_TICK_BASE: 0.1666,
    },
  });
}
