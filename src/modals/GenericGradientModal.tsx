import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';

const Styles = StyleSheet.create({
  modalContainer: {
    zIndex: 99999,
  },
  gradientStyle: {
    padding: 10,

    borderRadius: 25,
    width: '100%',
  },
  innerContainerStyle: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  headerText: {
    paddingTop: 10,
    paddingBottom: 15,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inlineFlex: {flex: 1},
});
type GenericGradientModalProps = {
  children: React.JSX.Element[] | React.JSX.Element;
  isVisible: boolean;
  gradientStart?: {x: number; y: number};
  gradientEnd?: {x: number; y: number};
  gradientColors?: string[];
  header?: React.JSX.Element;
  headerText?: string;
};

export const GenericGradientModal: (
  props: GenericGradientModalProps,
) => React.JSX.Element = props => {
  const _gradientStart = props.gradientStart || {x: 0.25, y: 0.25};
  const _gradientEnd = props.gradientEnd || {x: 0.75, y: 0.75};
  const _gradientColors = props.gradientColors || [
    '#f20233',
    'red',
    'red',
    '#f20233',
  ];

  return (
    <View
      style={{
        ...Styles.modalContainer,
        ...StyleSheet.absoluteFillObject,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
      }}>
      <Modal isVisible={props.isVisible}>
        <View style={Styles.inlineFlex}>
          <View style={Styles.innerContainerStyle}>
            <LinearGradient
              start={_gradientStart}
              end={_gradientEnd}
              colors={_gradientColors}
              style={Styles.gradientStyle}>
              {props.header ? (
                props.header
              ) : (
                <Text style={Styles.headerText}>{props.headerText}</Text>
              )}
              {props.children}
            </LinearGradient>
          </View>
        </View>
      </Modal>
    </View>
  );
};
