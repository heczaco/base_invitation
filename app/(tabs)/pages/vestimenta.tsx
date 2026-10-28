import { generalStyles } from '@/constants/GeneralStyles';
import { Image } from 'expo-image';
import React, { useRef, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';


export default function VestimentaScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const scrollViewRef = useRef<ScrollView>(null);
  const dressCodeY = useRef(0);

  const scrollToImage = () => {
    scrollViewRef.current?.scrollTo({ y: dressCodeY.current, animated: true });
  };
  const [bgH, setBgH] = useState(0);
  return (
    <ImageBackground       
    source={
        isLandscape
          ? require('@/assets/images/vestimenta/bg.png')
          : require('@/assets/images/vestimenta/bg_portrait.png')
      }
      style={[generalStyles.landscapeBackground, !isLandscape && generalStyles.portraitBackground]}
      resizeMode="cover"
      onLayout={e => setBgH(e.nativeEvent.layout.height)}
    >
      <ScrollView
        ref={scrollViewRef}
        style={generalStyles.scrollView}
        contentContainerStyle={[generalStyles.scrollContent]}
      >
        <View style={[styles.content, { minHeight: bgH }, !isLandscape && styles.contentPortrait]}>
          {/* Text Content Container */}
            <Text onPress={scrollToImage} style={[styles.description, !isLandscape && styles.descriptionPortrait]}>
              A continuación encontrarás 
              la etiqueta del evento,
              junto con lineamientos e inspiración
              para tu vestimenta.
            </Text>
            {isLandscape && (
            <Pressable onPress={scrollToImage} style={[styles.names]}>
              <Image
                source={require('@/assets/images/names_white.svg')}
                style={generalStyles.imageStd}
                contentFit="contain"
              />
            </Pressable>)}
        </View>
        <View
          onLayout={e => { dressCodeY.current = e.nativeEvent.layout.y; }}
          style={[styles.dressCodeContainer, !isLandscape && styles.dressCodeContainerPortrait]}>
          <Image
                source={
                  isLandscape ? require('@/assets/images/vestimenta/dresscode.png') : require('@/assets/images/vestimenta/dresscode_portrait.png')
                }
                style={generalStyles.imageStd}
                contentFit="contain"
              />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: "0%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    
  },
  names:{
    width: '30%',
    aspectRatio: 3,
    marginBottom: '3%',
  },
  description: {
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontSize: 18,
    textShadowColor: '#00000033',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    elevation: 1,
    letterSpacing: 1,
    maxWidth: '28%',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  dressCodeContainer: {
    width: '90%',
    aspectRatio: 0.1581,
    backgroundColor: '#FFFFFFDD',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 20,
  },
  // Portrait styles
  
  contentPortrait: {
    justifyContent: 'flex-start',
    paddingTop: "50%",
  },
  descriptionPortrait: {
    fontSize: 14,
    fontWeight: '600',
    width: '65%',
    maxWidth: '95%',
    textAlign: 'center',
  },
  dressCodeContainerPortrait: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
