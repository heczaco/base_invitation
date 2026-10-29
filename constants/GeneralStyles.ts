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
  landscapeBackground: {
    flex: 1,
    position: 'absolute',
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
    left: 0,
    alignItems: 'flex-start',
    height: '100%',
    width: '30%',
  },
  rightBackgroundImage: {
    position: 'absolute',
    right: 0,
    alignItems: 'flex-end',
    width: "30%",
    height: '100%',
  },
  portraitLeftBackgroundImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '50%',
    height: '96%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  portraitRightBackgroundImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flex: 1,
    width: '50%',
    height: '96%',
  },
  imageStd: {
    width: '100%',
    height: '100%',
  },
  textBold: {
    fontWeight: 'bold',
  },
  generalTextMontserrat: {
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  generalTextRaleway: {
    fontSize: 16,
    fontFamily: 'Raleway',
  },
  generalTextCormorant: {
    fontSize: 16,
    fontFamily: 'Cormorant Garamond',
  },
  scrollView: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingBottom: 50,
  },
  scrollContent: {
    alignItems: 'center',
    flexGrow: 1,
    
  },
});
