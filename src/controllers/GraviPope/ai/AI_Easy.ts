import {GraviPopeBallState} from '../types';
import {AI} from './';

export function AI_Easy(): (
  state?: GraviPopeBallState | undefined,
  delta?: number | undefined,
  aiState?: Record<string, unknown>,
) => GraviPopeBallState {
  return AI.bind({
    overrides: {
      SPEED_CAP: 1.01,
      SPEED_GAIN_TICK_BASE: 0.05,
    },
  });
}
