import {GraviPopeBallState} from '../types';
import {AI} from './';

export function AI_Easy(): (
  state?: GraviPopeBallState | undefined,
  delta?: number | undefined,
) => GraviPopeBallState {
  return AI.bind({});
}
