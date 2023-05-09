import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {GraviPopeBall} from './GraviPopeBall';
import {GraviPopeBallLifeState, GraviPopeBallState} from './types';
import {AI_Easy} from './EasyAI';
import {useTranslation} from 'react-i18next';

const MAX_BALLS = 3;

let lastUpdateTime = new Date().getTime();

const Styles = StyleSheet.create({
  container: {width: '100%', height: '100%'},
  pointsText: {
    fontSize: 24,
    color: 'white',
    marginLeft: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export const GraviPopeView: () => React.JSX.Element = () => {
  const [isWorking, setIsWorking] = useState(true);
  const [points, setPoints] = useState(0);

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
        const ballState = AI_Easy();
        prev[ballState.id] = ballState;
      }

      for (const gameStateId in prev) {
        const ballState = ballStates[gameStateId];
        prev[gameStateId] = AI_Easy(ballState, deltaPercent);

        if (prev[gameStateId].lifeState === GraviPopeBallLifeState.DEAD) {
          setPoints(0);
          delete prev[gameStateId];
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
    if (isWorking) {
      requestAnimationFrame(gameUpdate);
    }
  }, [ballStates]);

  useEffect(() => {
    return () => {
      setIsWorking(false);
    };
  }, []);

  return (
    <View style={Styles.container}>
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
