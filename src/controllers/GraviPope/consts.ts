import {AI_Easy, AI_Medium, AI_Hard, AI_Hell} from './ai';
import {GraviPopeLevels, GraviPopeSaveData} from './helpers';

export const SKINS = {
  predator: {
    odds: 0.1,
    img: require('../../../assets/skins/predator_poppa.png'),
  },
  nightmare: {
    odds: 0.2,
    img: require('../../../assets/skins/nightmare_poppa.png'),
  },
  evil: {
    odds: 0.5,
    img: require('../../../assets/skins/evil_poppa.png'),
  },
  rare: {
    odds: 1,
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
    image: require('../../../assets/mode-hard.png'),
    unlockCondition: (param?: GraviPopeSaveData) =>
      param && param.levels[GraviPopeLevels.HARD].highScore >= 100,
  },
];
