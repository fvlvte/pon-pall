import {AI_Easy, AI_Medium, AI_Hard, AI_Hell} from './ai';
import {GraviPopeLevels, GraviPopeSaveData} from './helpers';

export const SKINS = {
  predator: {
    odds: 0.1,
    minimalLevel: GraviPopeLevels.HELL,
    maximalLevel: GraviPopeLevels.HELL,
    img: require('../../../assets/skins/predator_poppa.png'),
  },
  nightmare: {
    odds: 0.2,
    minimalLevel: GraviPopeLevels.HARD,
    maximalLevel: GraviPopeLevels.HELL,
    img: require('../../../assets/skins/nightmare_poppa.png'),
  },
  evil: {
    odds: 0.5,
    minimalLevel: GraviPopeLevels.MEDIUM,
    maximalLevel: GraviPopeLevels.HELL,
    img: require('../../../assets/skins/evil_poppa.png'),
  },
  rare: {
    odds: 1,
    minimalLevel: GraviPopeLevels.EASY,
    maximalLevel: GraviPopeLevels.MEDIUM,
    img: require('../../../assets/skins/rare_poppa.png'),
  },
};

export const BALL_DIAMETER = 100;

export const GRAVIPOPE_LEVELS = [
  {
    name: 'EASY',
    levelIndex: GraviPopeLevels.EASY,
    ai: AI_Easy,
    image: require('../../../assets/mode-easy.png'),
    unlockCondition: (_param?: GraviPopeSaveData) => true,
  },
  {
    name: 'MEDIUM',
    levelIndex: GraviPopeLevels.MEDIUM,
    ai: AI_Medium,
    image: require('../../../assets/mode-medium.png'),
    unlockCondition: (param?: GraviPopeSaveData) =>
      param && param.levels[GraviPopeLevels.EASY].highScore >= 100,
  },
  {
    name: 'HARD',
    levelIndex: GraviPopeLevels.HARD,
    ai: AI_Hard,
    image: require('../../../assets/mode-hard.png'),
    unlockCondition: (param?: GraviPopeSaveData) =>
      param && param.levels[GraviPopeLevels.MEDIUM].highScore >= 100,
  },
  {
    name: 'HELL',
    levelIndex: GraviPopeLevels.HELL,
    ai: AI_Hell,
    image: require('../../../assets/mode-hell.png'),
    unlockCondition: (param?: GraviPopeSaveData) =>
      param && param.levels[GraviPopeLevels.MEDIUM].highScore >= 100,
  },
];
