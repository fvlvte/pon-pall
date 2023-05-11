import {AI_Base, AI_Base_Medium} from './AI_Base';

export enum GraviPopeLevels {
  EASY,
  MEDIUM,
  HARD,
  HELL,
}

export type GraviPopeSaveDataLevel = {
  highScore: number;
  lastScore: number;
};

export type GraviPopeSaveData = {
  lastSelectedLevel: GraviPopeLevels;
  levels: {[key: number]: GraviPopeSaveDataLevel};
};

export function makeInitialSaveData(): GraviPopeSaveData {
  return {
    lastSelectedLevel: GraviPopeLevels.EASY,
    levels: {
      [GraviPopeLevels.EASY]: {
        highScore: 0,
        lastScore: 0,
      },
      [GraviPopeLevels.MEDIUM]: {
        highScore: 0,
        lastScore: 0,
      },
      [GraviPopeLevels.HARD]: {
        highScore: 0,
        lastScore: 0,
      },
      [GraviPopeLevels.HELL]: {
        highScore: 0,
        lastScore: 0,
      },
    },
  };
}

export const BALL_DIAMETER = 100;

export const GRAVIPOPE_LEVELS = [
  {
    name: 'EASY',
    levelIndex: GraviPopeLevels.EASY,
    ai: AI_Base,
    image: require('../../../assets/mode-easy.png'),
    unlockCondition: (_param?: GraviPopeSaveData) => true,
  },
  {
    name: 'MEDIUM',
    levelIndex: GraviPopeLevels.MEDIUM,
    ai: AI_Base_Medium,
    image: require('../../../assets/mode-medium.png'),
    unlockCondition: (param?: GraviPopeSaveData) =>
      param && param.levels[GraviPopeLevels.EASY].highScore >= 100,
  },
  {
    name: 'HARD',
    levelIndex: GraviPopeLevels.HARD,
    ai: AI_Base,
    image: require('../../../assets/mode-hard.png'),
    unlockCondition: (param?: GraviPopeSaveData) =>
      param && param.levels[GraviPopeLevels.MEDIUM].highScore >= 100,
  },
  {
    name: 'HELL',
    levelIndex: GraviPopeLevels.HELL,
    ai: AI_Base,
    image: require('../../../assets/mode-hard.png'),
    unlockCondition: (param?: GraviPopeSaveData) =>
      param && param.levels[GraviPopeLevels.HARD].highScore >= 100,
  },
];
