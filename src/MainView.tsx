import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Animated,
  Text,
  SafeAreaView,
} from 'react-native';
import {TopMenu} from './menu/TopMenu';

const Styles = StyleSheet.create({
  viewContainer: {flex: 1, width: '100%', height: '100%'},
  viewBg: {resizeMode: 'cover', overflow: 'hidden', flex: 1},
  logo: {width: 200, height: 200, marginLeft: 'auto', marginRight: 'auto'},
  footerContainer: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 25,
  },
  menuBar: {
    marginTop: 24,
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 3},
    textShadowRadius: 2,
  },
  fullSize: {width: '100%', height: '100%'},
});

export const MainView: () => React.JSX.Element = () => {
  const {width} = Dimensions.get('screen');
  const [currentMenuBackground] = React.useState(
    require('../assets/menu/bg.png'),
  );
  const logo = require('../assets/menu/logo.png');

  const logoInAnimation = useRef(new Animated.Value(-300)).current;
  useEffect(() => {
    Animated.timing(logoInAnimation, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [logoInAnimation]);

  const fadeInAnimMenu = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeInAnimMenu, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeInAnimMenu]);

  return (
    <View style={Styles.viewContainer}>
      <ImageBackground
        style={{...Styles.viewBg, width: width}}
        source={currentMenuBackground}
        resizeMode="cover">
        <SafeAreaView style={Styles.fullSize}>
          <Animated.Image
            source={logo}
            style={{...Styles.logo, transform: [{translateY: logoInAnimation}]}}
          />
          <Animated.View style={{opacity: fadeInAnimMenu}}>
            <TopMenu
              style={Styles.menuBar}
              gameState={0}
              setGameState={() => {
                console.log('duxpoduxpoduxpo');
              }}
            />
          </Animated.View>
          <View style={Styles.footerContainer}>
            <Text style={Styles.footerText}>POKNURSKU.PL V1.0.1 </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
