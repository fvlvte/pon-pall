import {t} from 'i18next';
import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type TopMenuGradientButtonProps = {
  text: string;
  onPress: () => void;
};

const Styles = StyleSheet.create({
  button: {
    flex: 4,
  },
  button2: {
    width: '98%',
    padding: 1,
    borderRadius: 50,
    backgroundColor: 'darkred',
  },
  buttonActive: {
    backgroundColor: 'red',
  },
  buttonInactive: {
    backgroundColor: 'magenta',
  },
  gradientStyle: {
    padding: 10,

    marginLeft: 'auto',
    marginRight: 'auto',

    borderRadius: 25,

    width: '90%',
  },
  buttonText: {
    fontSize: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 3},
    textShadowRadius: 2,
  },
  buttonTextActive: {
    fontWeight: 'bold',
  },
});

export const TopMenuGradientButton: (
  props: TopMenuGradientButtonProps,
) => React.JSX.Element = props => {
  const {onPress, text} = props;

  return (
    <View style={Styles.button}>
      <View style={Styles.button2}>
        <TouchableOpacity onPress={onPress}>
          <LinearGradient
            start={{x: 0.1, y: 0.1}}
            end={{x: 0.9, y: 0.9}}
            colors={['darkred', 'red', 'red', 'darkred']}
            style={Styles.gradientStyle}>
            <Text style={Styles.buttonText}>{t(text)}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
