import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {GraviPopeBall} from './GraviPopeBall';
import {GraviPopeBallLifeState, GraviPopeBallState} from './types';
import {AI_Easy} from './EasyAI';
import {useTranslation} from 'react-i18next';
import {WelcomeModal} from './WelcomeModal';

import AsyncStorage from '@react-native-async-storage/async-storage';

const MAX_BALLS = 3;

let lastUpdateTime = new Date().getTime();

const Styles = StyleSheet.create({
  container: {width: '100%', height: '100%'},
  pointsText: {
    fontSize: 24,
    color: 'black',
    marginLeft: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export enum GraviPopeLevels {
  EASY,
  MEDIUM,
  HARD,
  HELL,
}

export const GRAVIPOPE_LEVELS = [
  {
    name: 'EASY',
    levelIndex: GraviPopeLevels.EASY,
    ai: AI_Easy,
    image: require('../../assets/mode-easy.png'),
    unlockCondition: (_param?: GraviPopeSaveData) => true,
  },
  {
    name: 'MEDIUM',
    levelIndex: GraviPopeLevels.MEDIUM,
    ai: AI_Easy,
    image: require('../../assets/mode-medium.png'),
    unlockCondition: (param?: GraviPopeSaveData) =>
      param && param.levels[GraviPopeLevels.EASY].highScore >= 100,
  },
  {
    name: 'HARD',
    levelIndex: GraviPopeLevels.HARD,
    ai: AI_Easy,
    image: require('../../assets/mode-hard.png'),
    unlockCondition: (param?: GraviPopeSaveData) =>
      param && param.levels[GraviPopeLevels.MEDIUM].highScore >= 100,
  },
  {
    name: 'HELL',
    levelIndex: GraviPopeLevels.HELL,
    ai: AI_Easy,
    image: require('../../assets/mode-hard.png'),
    unlockCondition: (param?: GraviPopeSaveData) =>
      param && param.levels[GraviPopeLevels.HARD].highScore >= 100,
  },
];

export type GraviPopeSaveDataLevel = {
  highScore: number;
  lastScore: number;
};

export type GraviPopeSaveData = {
  lastSelectedLevel: GraviPopeLevels;
  levels: {[key: number]: GraviPopeSaveDataLevel};
};

enum ViewStates {
  Welcome,
  Playing,
  GameOver,
}

export const GraviPopeView: (props: {
  onReturnToMainMenu: () => void;
}) => React.JSX.Element = props => {
  const [isWorking, setIsWorking] = useState(true);
  const [points, setPoints] = useState(0);
  const [saveData, setSaveData] = useState<GraviPopeSaveData>();
  const [viewState, setViewState] = useState(ViewStates.Welcome);
  const [level, setLevel] = useState(GraviPopeLevels.EASY);

  const onPlay: (l: GraviPopeLevels) => void = (l: GraviPopeLevels) => {
    setLevel(l);
    setViewState(ViewStates.Playing);
  };

  useEffect(() => {
    AsyncStorage.getItem('gravipope_save_data').then(data => {
      if (data) {
        setSaveData(JSON.parse(data));
      } else {
        setSaveData({
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
        });
      }
    });
  }, [setSaveData]);

  useEffect(() => {
    if (saveData) {
      AsyncStorage.setItem('gravipope_save_data', JSON.stringify(saveData));
    }
  }, [saveData, setSaveData]);

  const {t} = useTranslation();

  const QUEUED_UPDATES: GraviPopeBallState[] = [];

  const [ballStates, setBallStates] = React.useState<{
    [key: string]: GraviPopeBallState;
  }>({});

  const setBall: (state: GraviPopeBallState) => void = (
    state: GraviPopeBallState,
  ) => {
    QUEUED_UPDATES.push(state);
  };

  const gameUpdate: () => void = () => {
    if (!isWorking) {
      return;
    }

    const now = new Date().getTime();
    const deltaTime = now - lastUpdateTime;
    const deltaPercent = deltaTime / 1000;

    setBallStates(prev => {
      for (const queuedUpdate of QUEUED_UPDATES) {
        prev[queuedUpdate.id] = queuedUpdate;
      }
      if (Object.values(ballStates).length < MAX_BALLS) {
        const ballState = GRAVIPOPE_LEVELS[level].ai();
        prev[ballState.id] = ballState;
      }

      for (const gameStateId in prev) {
        const ballState = ballStates[gameStateId];
        prev[gameStateId] = GRAVIPOPE_LEVELS[level].ai(ballState, deltaPercent);

        if (prev[gameStateId].lifeState === GraviPopeBallLifeState.DEAD) {
          setSaveData(p => {
            if (p) {
              const highScore = p.levels[level].highScore;
              if (points > highScore) {
                p.levels[level].highScore = points;
              }
              p.levels[level].lastScore = points;
              setPoints(0);
              setViewState(ViewStates.Welcome);
              p.lastSelectedLevel = level;
              return {...p};
            }
            return p;
          });

          return {};
        } else if (
          prev[gameStateId].lifeState === GraviPopeBallLifeState.PRESSED
        ) {
          setPoints(p => p + 1);
          delete prev[gameStateId];
        }
      }
      lastUpdateTime = now;
      return {...prev};
    });
  };

  useEffect(() => {
    if (isWorking && viewState === ViewStates.Playing) {
      requestAnimationFrame(gameUpdate);
    }
  }, [ballStates, viewState]);

  useEffect(() => {
    return () => {
      setIsWorking(false);
    };
  }, []);

  return (
    <View style={Styles.container}>
      {viewState === ViewStates.Welcome && (
        <WelcomeModal
          onPlay={onPlay}
          onQuit={props.onReturnToMainMenu}
          saveData={saveData}
          setSaveData={setSaveData}
          isVisible={viewState === ViewStates.Welcome}
        />
      )}
      <Text style={Styles.pointsText}>
        {t('GRAVIPOPE_TEXT_POINTS')}: {points}
      </Text>
      {Object.values(ballStates).map(ballState => {
        return (
          <GraviPopeBall
            key={ballState.id}
            id={ballState.id}
            ballStates={ballStates}
            setBallState={setBall}
          />
        );
      })}
    </View>
  );
};
