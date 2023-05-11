import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {GraviPopeBallState} from './types';
import {AI_Base, AI_Base_Medium} from './AI_Base';
import {useTranslation} from 'react-i18next';
import {WelcomeModal} from './WelcomeModal';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GraviPopeController,
  GraviPopeGameLifeState,
} from '../controllers/GraviPopeController';
import {BALL_DIAMETER} from './helpers';

const Styles = StyleSheet.create({
  container: {width: '100%', height: '100%'},
  containerPoppa: {position: 'absolute', borderRadius: 100, overflow: 'hidden'},
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
    ai: AI_Base,
    image: require('../../assets/mode-easy.png'),
    unlockCondition: (_param?: GraviPopeSaveData) => true,
  },
  {
    name: 'MEDIUM',
    levelIndex: GraviPopeLevels.MEDIUM,
    ai: AI_Base_Medium,
    image: require('../../assets/mode-medium.png'),
    unlockCondition: (param?: GraviPopeSaveData) =>
      param && param.levels[GraviPopeLevels.EASY].highScore >= 100,
  },
  {
    name: 'HARD',
    levelIndex: GraviPopeLevels.HARD,
    ai: AI_Base,
    image: require('../../assets/mode-hard.png'),
    unlockCondition: (param?: GraviPopeSaveData) =>
      param && param.levels[GraviPopeLevels.MEDIUM].highScore >= 100,
  },
  {
    name: 'HELL',
    levelIndex: GraviPopeLevels.HELL,
    ai: AI_Base,
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
  GetReady,
  Playing,
  GameOver,
}

export const GraviPopeView: (props: {
  onReturnToMainMenu: () => void;
}) => React.JSX.Element = props => {
  const [points, setPoints] = useState(0);
  const [saveData, setSaveData] = useState<GraviPopeSaveData>();
  const [viewState, setViewState] = useState(ViewStates.Welcome);

  useEffect(() => {
    GraviPopeController.Instance.enableGameSimulation();
    return () => GraviPopeController.Instance.disableGameSimulation();
  }, []);

  const onPlay: (l: GraviPopeLevels) => void = (l: GraviPopeLevels) => {
    GraviPopeController.Instance.setLevel(l);
    GraviPopeController.Instance.play();
    setViewState(ViewStates.Playing);
  };

  useEffect(() => {
    AsyncStorage.getItem('gravipope_save_data').then(data => {
      if (data) {
        const d = JSON.parse(data) as GraviPopeSaveData;
        setSaveData(d);
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

  const {t} = useTranslation();

  const [ballStates, setBallStates] = React.useState<GraviPopeBallState[]>([]);

  useEffect(() => {
    if (saveData) {
      AsyncStorage.setItem('gravipope_save_data', JSON.stringify(saveData));
    }
  }, [saveData]);

  useEffect(() => {
    let frame = -1;
    const chainFn: () => void = () => {
      setBallStates([...GraviPopeController.Instance.getGraviPopeState()]);
      setPoints(GraviPopeController.Instance.getPoints());
      if (
        GraviPopeController.Instance.getLifeState() ===
        GraviPopeGameLifeState.GAME_LOST
      ) {
        setSaveData(prevSaveData => {
          if (prevSaveData) {
            const newSaveData = {...prevSaveData};
            const pp = GraviPopeController.Instance.getPoints();
            const level = GraviPopeController.Instance.getLevel();
            const levelSaveData = newSaveData.levels[level];
            levelSaveData.lastScore = pp;
            if (pp > levelSaveData.highScore) {
              levelSaveData.highScore = pp;
            }
            prevSaveData.lastSelectedLevel = level;
            AsyncStorage.setItem(
              'gravipope_save_data',
              JSON.stringify(prevSaveData),
            );
          }
          return prevSaveData;
        });
        setViewState(ViewStates.Welcome);
        GraviPopeController.Instance.reset();
      }
      frame = requestAnimationFrame(chainFn);
      return frame;
    };
    chainFn();
    return () => cancelAnimationFrame(frame as number);
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
      {ballStates.map((state: GraviPopeBallState) => {
        return (
          <TouchableOpacity
            key={state.id}
            activeOpacity={1}
            onPress={(_: unknown) => {
              GraviPopeController.Instance.updateState(state);
            }}
            style={{
              ...Styles.containerPoppa,
              top: state.pos.y,
              left: state.pos.x,
              width: state.scale * BALL_DIAMETER,
              height: state.scale * BALL_DIAMETER,
            }}>
            {state.skin.image && (
              <ImageBackground
                style={{
                  width: state.scale * BALL_DIAMETER,
                  transform: [{rotate: `${state.rotation.degree}deg`}],
                  height: state.scale * BALL_DIAMETER,
                }}
                source={state.skin.image as number}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
