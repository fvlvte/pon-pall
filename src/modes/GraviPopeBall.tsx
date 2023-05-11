import React from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {
  GraviPopeController,
  BALL_DIAMETER,
  GraviPopeBallState,
} from '../controllers/GraviPope';

const Styles = StyleSheet.create({
  containerPoppa: {position: 'absolute', borderRadius: 100, overflow: 'hidden'},
});

export const GraviPopeBall: (props: {
  state: GraviPopeBallState;
}) => React.JSX.Element = props => {
  const {state} = props;

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
};
