import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GraviPopeSaveData,
  GraviPopeController,
  GraviPopeLevels,
  GraviPopeGameLifeState,
  GraviPopeBallState,
  makeInitialSaveData,
} from '../controllers/GraviPope';

import {WelcomeModal} from './WelcomeModal';
import {GraviPopeBall} from './GraviPopeBall';

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

enum ViewStates {
  Welcome,
  GetReady,
  Playing,
  GameOver,
}

export const GraviPopeView: (props: {
  onReturnToMainMenu: () => void;
}) => React.JSX.Element = props => {
  const {t} = useTranslation();

  const [points, setPoints] = useState(0);
  const [saveData, setSaveData] = useState<GraviPopeSaveData>();
  const [viewState, setViewState] = useState(ViewStates.Welcome);

  // Initialize game controller to start the game simulation
  useEffect(() => {
    GraviPopeController.Instance.enableGameSimulation();
    return () => GraviPopeController.Instance.disableGameSimulation();
  }, []);

  const onGameStart: (l: GraviPopeLevels) => void = (l: GraviPopeLevels) => {
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
        setSaveData(makeInitialSaveData());
      }
    });
  }, [setSaveData]);

  useEffect(() => {
    if (saveData) {
      AsyncStorage.setItem('gravipope_save_data', JSON.stringify(saveData));
    }
  }, [saveData]);

  const [ballStates, setBallStates] = React.useState<GraviPopeBallState[]>([]);

  useEffect(() => {
    let frame = -1;
    const chainFn: () => number = () => {
      setBallStates([...GraviPopeController.Instance.getGraviPopeState()]);
      setPoints(GraviPopeController.Instance.getPoints());
      if (
        GraviPopeController.Instance.getLifeState() ===
        GraviPopeGameLifeState.GAME_LOST
      ) {
        // HANDLE LOSS IN REACT
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
    frame = chainFn();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <View style={Styles.container}>
      {viewState === ViewStates.Welcome && (
        <WelcomeModal
          onPlay={onGameStart}
          onQuit={props.onReturnToMainMenu}
          saveData={saveData}
          setSaveData={setSaveData}
          isVisible={viewState === ViewStates.Welcome}
        />
      )}
      <Text style={Styles.pointsText}>
        {t('GRAVIPOPE_TEXT_POINTS')}: {points}
      </Text>
      {ballStates.map(state => (
        <GraviPopeBall key={state.id} state={state} />
      ))}
    </View>
  );
};
