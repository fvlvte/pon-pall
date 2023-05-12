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
