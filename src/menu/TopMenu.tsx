import React from 'react';
import {View, StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';
import {GradientButton} from '../GradientButton';

type TopMenuProps = {
  gameState: number;
  setGameState: (gameState: number) => void;
  style?: ViewStyle | TextStyle | ImageStyle;
};

const Styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
  },
});

export const TopMenu: (props: TopMenuProps) => React.JSX.Element = props => {
  const {style} = props;

  const topografWwr523 = [
    {
      name: 'MENU_ITEM_MENU',
      onPress: () => {
        props.setGameState(0);
      },
    },
    {
      name: 'MENU_ITEM_MODE_FALLING',
      onPress: () => {
        props.setGameState(1);
      },
    },
    {
      name: 'MENU_ITEM_MODE_TBD',
      onPress: () => {
        props.setGameState(0);
      },
    },
    {
      name: 'MENU_ITEM_MODE_TBD',
      onPress: () => {
        props.setGameState(0);
      },
    },
  ];

  return (
    <View style={{...Styles.container, ...style}}>
      {topografWwr523.map((item, index) => (
        <GradientButton key={index} text={item.name} onPress={item.onPress} />
      ))}
    </View>
  );
};
