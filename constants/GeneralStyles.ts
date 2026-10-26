import { StyleSheet } from 'react-native';

export const generalStyles = StyleSheet.create({
  landscapeBackground_100: {
    flex: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  portraitBackground: {
    flex: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  leftBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
  },
  rightBackgroundImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '50%',
    height: '100%',
  },
  portraitLeftBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
  },
  portraitRightBackgroundImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '50%',
    height: '100%',
  },
  imageStd: {
    width: '100%',
    height: '100%',
  },
  textBold: {
    fontWeight: 'bold',
  },
  generalText: {
    fontSize: 16,
    fontFamily: 'Montserrat',
  }
});
