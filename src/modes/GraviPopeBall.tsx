import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ImageBackground,
} from 'react-native';
import {isPointInCircleInBox, BALL_DIAMETER} from './helpers';
import {GraviPopeBallState, GraviPopeBallLifeState} from './types';

const Styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    zIndex: 999,
    position: 'absolute',
    overflow: 'hidden',
  },
});

export const GraviPopeBall: (props: {
  id: string;
  ballStates: {[key: string]: GraviPopeBallState};
  setBallState: (state: GraviPopeBallState) => void;
}) => React.JSX.Element = props => {
  const {ballStates, setBallState, id} = props;
  if (!ballStates || !ballStates[id]) {
    return <></>;
  }

  const touchHandler: (e: GestureResponderEvent) => void = (
    e: GestureResponderEvent,
  ) => {
    if (
      isPointInCircleInBox(
        {x: e.nativeEvent.locationX, y: e.nativeEvent.locationY},
        {
          x: 0,
          y: 0,
          width: ballStates[id].scale * BALL_DIAMETER,
          height: ballStates[id].scale * BALL_DIAMETER,
        },
        {
          x: (ballStates[id].scale * BALL_DIAMETER) / 2,
          y: (ballStates[id].scale * BALL_DIAMETER) / 2,
          radius: (ballStates[id].scale * BALL_DIAMETER) / 2,
        },
      )
    ) {
      setBallState({
        ...ballStates[id],
        lifeState: GraviPopeBallLifeState.PRESSED,
      });
    }
  };

  return (
    <TouchableOpacity
      key={id}
      activeOpacity={1}
      onPress={touchHandler}
      style={{
        ...Styles.container,
        top: ballStates[id].pos.y,
        left: ballStates[id].pos.x,
        width: ballStates[id].scale * BALL_DIAMETER,
        height: ballStates[id].scale * BALL_DIAMETER,
      }}>
      {ballStates[id].skin.image && (
        <ImageBackground
          style={{
            width: ballStates[id].scale * BALL_DIAMETER,
            transform: [{rotate: `${ballStates[id].rotation.degree}deg`}],
            height: ballStates[id].scale * BALL_DIAMETER,
          }}
          source={ballStates[id].skin.image as number}
          resizeMode="cover"
        />
      )}
    </TouchableOpacity>
  );
};
