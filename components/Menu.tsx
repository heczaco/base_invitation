import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
interface MenuProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  rsvpActive: boolean;
}

interface MenuButtonProps {
  id: string;
  active: boolean;
  currentPage: string;
  onPress: (id: string) => void;
  children: string;
  textVisible: boolean;
  onHover: () => void;
}

function MenuButton({ id, active, currentPage, onPress, children, textVisible, onHover }: MenuButtonProps) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (!isLandscape) {
      Animated.timing(slideAnim, {
        toValue: textVisible ? 0 : 100,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }
  }, [textVisible, isLandscape]);
  
  let buttonStyle = styles.menuButton;
  let circleStyle = styles.circle;
  let pageTextStyle = null;
  let pageSeparatorStyle = null;
  let pageCircleStyle = null;
  let pageActiveCircleStyle = null;
  
  switch (currentPage) {
    case 'inicio':
    case 'regalos':
    case 'rsvp':
    case 'ceremonia':
    case 'vestimenta':
      break;
    case 'recepcion':
    case 'informacion':
      pageTextStyle = isLandscape ? styles.receptionText : null;
      pageSeparatorStyle = styles.receptionSeparator;
      pageCircleStyle = styles.circle_alternative_1;
      pageActiveCircleStyle = styles.activeCircle_alternative_1;
      break;
  }
  
  const isActive = currentPage === id;
  const activeButtonStyle = isActive ? styles.activeButton : null;
  const activeCircleStyle = isActive ? pageActiveCircleStyle ?? styles.activeCircle : null;
  const isFirstButton = id === 'inicio';
  
  const handlePress = () => {
    if (!isLandscape && !textVisible) {
      // If text is hidden, only show it, don't navigate
      onHover();
    } else {
      // If text is visible or in landscape, navigate
      onPress(id);
      // Reset timer on navigation in portrait mode
      if (!isLandscape) {
        onHover();
      }
    }
  };
  
  return (
    <Pressable
      style={[
        buttonStyle,
        activeButtonStyle,
        isLandscape && styles.landscapeButton,
        isLandscape && isFirstButton && styles.leftButMenu,
        isLandscape && pageSeparatorStyle,
        !isLandscape && styles.portraitButton
      ]}
      onPress={handlePress}
      disabled={!active}
    >
      {isLandscape ? (
        <Text style={[ styles.buttonText, pageTextStyle, isActive && styles.activeButtonText]}>
          {children}
        </Text>
      ) : (
        <>
          <Animated.Text 
            numberOfLines={1}
            style={[
              styles.buttonTextPortrait, 
              pageTextStyle,
              isActive && styles.activeButtonText,
              { 
                transform: [{ translateX: slideAnim }],
                opacity: slideAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0],
                })
              }
            ]}
          >
            {children}
          </Animated.Text>
          <View style={[circleStyle, pageCircleStyle, activeCircleStyle, styles.portraitCircle]} />
        </>
      )}
    </Pressable>
  );
}

export default function Menu({ currentPage, onPageChange, rsvpActive }: MenuProps) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const [textVisible, setTextVisible] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = setTimeout(() => {
      if (!isLandscape) {
        setTextVisible(false);
      }
    }, 5000);
  };

  const showText = () => {
    setTextVisible(true);
    startHideTimer();
  };

  const hideTextNow = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    setTextVisible(false);
  };

  useEffect(() => {
    if (!isLandscape) {
      startHideTimer();
    } else {
      setTextVisible(true);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    }

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [isLandscape]);
  let currentCustomStyle = null;
  currentCustomStyle = {backgroundColor: 'transparent'};
  let currentMonogram = require('@/assets/images/monogram_light_green.svg');
  switch (currentPage) {
    case 'inicio':
    case 'ceremonia':
    case 'regalos':
    case 'rsvp':
      break;
    case 'informacion':
    case 'recepcion':
    case 'vestimenta':

    default:
      break;
  }

  return (
    <>
      {!isLandscape && textVisible && (
        <Pressable style={styles.outsideOverlay} onPress={hideTextNow} />
      )}
      <View style={[
        styles.divMenu,
        isLandscape ? styles.landscapeMenu : styles.portraitMenu,
        !isLandscape && !textVisible && styles.portraitMenuHidden,
        currentCustomStyle,
      ]}>
      {isLandscape && (
        <View style={styles.logoMenu}>
          <Image 
            source={currentMonogram}
            style={styles.logoImage}
            contentFit="contain"
          />
        </View>
      )}
      <View style={isLandscape ? styles.buttonsContainer : null}>
        <MenuButton id="inicio" active={true} currentPage={currentPage} onPress={onPageChange} textVisible={textVisible} onHover={showText}>
          INICIO
        </MenuButton>
        <MenuButton id="ceremonia" active={true} currentPage={currentPage} onPress={onPageChange} textVisible={textVisible} onHover={showText}>
          CIVIL
        </MenuButton>
        <MenuButton id="recepcion" active={true} currentPage={currentPage} onPress={onPageChange} textVisible={textVisible} onHover={showText}>
          RECEPCIÓN
        </MenuButton>
        <MenuButton id="vestimenta" active={true} currentPage={currentPage} onPress={onPageChange} textVisible={textVisible} onHover={showText}>
          VESTIMENTA
        </MenuButton>
        <MenuButton id="informacion" active={true} currentPage={currentPage} onPress={onPageChange} textVisible={textVisible} onHover={showText}>
          INFORMACIÓN
        </MenuButton>
        <MenuButton id="regalos" active={true} currentPage={currentPage} onPress={onPageChange} textVisible={textVisible} onHover={showText}>
          MESA DE REGALOS
        </MenuButton>
        {rsvpActive && (
          <MenuButton id="rsvp" active={true} currentPage={currentPage} onPress={onPageChange} textVisible={textVisible} onHover={showText}>
            R.S.V.P
          </MenuButton>
        )}
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  divMenu: {
    position: 'absolute',
    zIndex: 15,
  },
  outsideOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  landscapeMenu: {
    flexDirection: 'row',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '13%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  logoMenu: {
    position: 'absolute',
    left: '2%',
    height: '60%',
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '80%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  menuButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  landscapeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
    paddingHorizontal: 18,
    paddingVertical: 8,
    height: '55%',
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#878E7E',
  },
  leftButMenu: {
    borderLeftWidth: 0,
  },
  receptionSeparator: {
    borderLeftColor: '#878E7E',
  },
  buttonText: {
    fontSize: 16,
    color: '#878E7E',
    fontWeight: '300',
    textAlign: 'center',
  },
  receptionText: {
    color: '#878E7E',
  },
  activeButton: {},
  activeButtonText: {
  },
  
  // Portrait menu background styles (if needed in the future)
  portraitMenu: {
    flexDirection: 'column',
    right: '7%',
    top: '85%',
    transform: [{ translateY: -150 }],
    marginRight: -5,
    width: '40%',
    minWidth: 200,
  },
  portraitMenuHidden: {
    width: '15%',
    minWidth: 0,
  },
  portraitButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 17,
    overflow: 'hidden',
    marginVertical: 8,
    paddingRight: 0,
    width: '100%',
  },
  buttonTextPortrait: {
    fontSize: 13,
    color: '#FFFFFF',
    fontFamily: 'Cormorant Garamond',
    fontWeight: '300',
    fontStyle: 'italic',
    textAlign: 'left',
    width: "60%",
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  circle: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  circle_alternative_1: {
    borderColor: '#364025',
  },
  activeCircle_alternative_1: {
    backgroundColor: '#364025',
  },
  activeCircle: {
    backgroundColor: '#878E7fE',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  portraitCircle: {
    marginLeft: 12,
  },
  
});
