import React, {useEffect} from 'react';
import {GenericGradientModal} from '../modals/GenericGradientModal';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {GradientButton} from '../GradientButton';
import {Grayscale} from 'react-native-color-matrix-image-filters';
import {
  GRAVIPOPE_LEVELS,
  GraviPopeLevels,
  GraviPopeSaveData,
} from './GraviPopeView';

const Style = StyleSheet.create({
  difficultyImage: {
    flex: 4,
    height: 80,
    width: 110,
    zIndex: 9999999,
    resizeMode: 'contain',
  },
  textStyle: {
    padding: 2,
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  textStyleBold: {fontWeight: 'bold'},
  innerContainer: {flexDirection: 'row', marginLeft: -35},
  button: {flex: undefined, position: 'relative', margin: 10},
});

export const WelcomeModal: (props: {
  isVisible: boolean;
  saveData?: GraviPopeSaveData;
  setSaveData?: (d: GraviPopeSaveData) => void;
  onPlay: (level: GraviPopeLevels) => void;
  onQuit: () => void;
}) => React.JSX.Element = props => {
  const [difficulty, setDifficulty] = React.useState(0);

  useEffect(() => {
    if (props.saveData) {
      if (difficulty !== props.saveData.lastSelectedLevel) {
        setDifficulty(props.saveData.lastSelectedLevel);
      }
    }
  }, [props.saveData]);

  const SHADED_LEVEL = require('../../assets/mode-shaded.png');

  return (
    <GenericGradientModal isVisible={props.isVisible} headerText="GRAVIPOPE">
      <Text style={Style.textStyle}>
        Czy dasz rade uratować papieza przed upadkiem na glebe??
      </Text>
      <Text style={Style.textStyle}>
        Zmierz się z szatańską siłą grawitacji i uratuj rodaka przed katastrofą.
      </Text>
      <Text />

      <Text style={Style.textStyle}>
        Aby odblokować kolejny poziom trudności osiągnij wynik 100 lub lepszy na
        niszym poziomie trudności.
      </Text>
      <Text />
      <Text style={Style.textStyle}>Poziom trudności:</Text>
      {/* TODO: Fix -35px margin */}
      <View style={Style.innerContainer}>
        {GRAVIPOPE_LEVELS.map(level => {
          return (
            <Pressable
              key={level.levelIndex}
              disabled={!level.unlockCondition(props.saveData)}
              onPress={() => setDifficulty(level.levelIndex)}
              style={{...Style.difficultyImage}}>
              <Grayscale
                style={{...Style.difficultyImage}}
                amount={
                  !level.unlockCondition(props.saveData)
                    ? 0
                    : difficulty >= level.levelIndex
                    ? 0
                    : 100
                }>
                <Image
                  style={{...Style.difficultyImage}}
                  source={
                    level.unlockCondition(props.saveData)
                      ? level.image
                      : SHADED_LEVEL
                  }
                />
              </Grayscale>
            </Pressable>
          );
        })}
      </View>
      <Text style={Style.textStyle}>
        Twój high score ({GRAVIPOPE_LEVELS[difficulty].name}):{' '}
        <Text style={{...Style.textStyle, ...Style.textStyleBold}}>
          {props.saveData?.levels[difficulty].highScore}
        </Text>
      </Text>
      <Text style={Style.textStyle}>
        Twój last score ({GRAVIPOPE_LEVELS[difficulty].name}):{' '}
        <Text style={{...Style.textStyle, ...Style.textStyleBold}}>
          {props.saveData?.levels[difficulty].lastScore}
        </Text>
      </Text>
      <GradientButton
        styleOverride={Style.button}
        onPress={props.onPlay.bind(null, difficulty)}
        text="START"
      />
      <GradientButton
        styleOverride={Style.button}
        onPress={props.onQuit}
        text="WYJDŹ"
      />
    </GenericGradientModal>
  );
};
