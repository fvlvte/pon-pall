import React from 'react';
import {View, StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';
import {TopMenuGradientButton} from './TopMenuGradientButton';

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
  const onMenuSelect: () => void = () => {
    console.log('duxpo');
  };
  const {style} = props;

  const topografWwr523 = [
    {
      name: 'MENU_ITEM_MENU',
      onPress: onMenuSelect,
    },
    {
      name: 'MENU_ITEM_EASY',
      onPress: onMenuSelect,
    },
    {
      name: 'MENU_ITEM_MEDIUM',
      onPress: onMenuSelect,
    },
    {
      name: 'MENU_ITEM_CRAZY',
      onPress: onMenuSelect,
    },
  ];

  return (
    <View style={{...Styles.container, ...style}}>
      {topografWwr523.map((item, index) => (
        <TopMenuGradientButton
          key={index}
          text={item.name}
          onPress={item.onPress}
        />
      ))}
    </View>
  );
};
