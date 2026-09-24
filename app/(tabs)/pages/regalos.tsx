import { generalStyles } from '@/constants/GeneralStyles';
import * as Clipboard from 'expo-clipboard';
import { Image } from 'expo-image';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
export default function RegalosScreen() {

     const { width, height } = useWindowDimensions();
     const isLandscape = width > height;

     const copyAccountNumber = async () => {
       await Clipboard.setStringAsync('012680015394091490');
       alert('Número de cuenta copiado al portapapeles');
     };

  return (
  <ImageBackground
        source={
          isLandscape
            ? require('@/assets/images/regalos/bg_landscape.png')
            : require('@/assets/images/regalos/bg_portrait.png')
        }
        style={[styles.container, isLandscape ? generalStyles.landscapeBackground_100: generalStyles.portraitBackground]}
        resizeMode="cover"
      >
        <View style={[styles.content, !isLandscape && styles.contentPortrait]}>
            <View style={[styles.monogram, !isLandscape && styles.monogramPortrait]}>
              <Image
                source={require('@/assets/images/monogram_white.svg')}
                style={generalStyles.imageStd}
                contentFit="contain"
                />
            </View>
            <View style={[!isLandscape && styles.contentBgPortrait]}> 
              {/* Venue Name */}
              {!isLandscape && (<Text style={styles.titleNames}>GISELA E ISRAEL</Text>)}
              <Text style={[styles.giftMessage, !isLandscape && styles.giftMessagePortrait]}>
                Su presencia y compañía siempre será nuestro
                mejor regalo. Sin embargo, si desean obsequiarnos
                algo más, pueden hacerlo a través de:
              </Text>
    
              <Pressable onPress={copyAccountNumber}>
                <View style={[styles.giftContainer, !isLandscape && styles.giftContainerPortrait]}>
                  <Image
                      source={require('@/assets/images/regalos/cuenta.svg')}
                      style={generalStyles.imageStd}
                      contentFit="contain"
                      />
                </View>
              </Pressable>
              <Text style={[styles.cuentaText, !isLandscape && styles.cuentaTextPortrait]}>
                <Text style={styles.bold}> BBVA <br/></Text>
                Gisela Guadalupe Sánchez Motilla<br/>
                <Text style={styles.bold}>CUENTA<br/></Text>
                153 940 9149<br/>
                <Text style={styles.bold}>CLABE<br/></Text>
                012 680 01539409149 0
              </Text>
          
            </View>
        </View>
      </ImageBackground>
    );
  }
  
  const styles = StyleSheet.create({
    container: {},
    content: {
      position: 'absolute',
      top: '20%',
      left: '10%',
      width: '30%',
      backgroundColor: '#252836BB',  
      borderRadius: 15,
      padding: 20,
      justifyContent: 'center',
    },
    
    monogram: {
      width: '15%',
      aspectRatio: 1,
      marginTop: 30,
      marginBottom: 30,
      alignSelf: 'center',
    },
    giftMessage: {
      fontFamily: 'Raleway_400Regular',
      fontSize: 18,
      maxWidth: '80%',
      color: '#FFFFFF',
      textAlign: 'center',
      alignSelf: 'center',
      marginBottom: 4,
      marginTop: 4,
    },
    giftContainer: {
      opacity: 1,
      marginTop: 10,
      marginBottom: 10,
      width: 50,
      aspectRatio: 1,
      alignSelf: 'center'
    },
    cuentaText: {
      fontSize: 13,
      maxWidth: '80%',
      color: '#FFFFFF',
      textAlign: 'center',
      alignSelf: 'center',
      marginBottom: 4,
      marginTop: 4,
    },
    bold:{
      marginTop: 88,
      fontWeight: 'bold',
    },
    contentPortrait: {
      backgroundColor:"transparent",
      top: "0%",
      left: "5%",
      width: "90%",
    },
    // portrait styles
    monogramPortrait: {
      width: '35%',
      aspectRatio: 1,
      marginTop: 15,
      marginBottom: 15,
      alignSelf: 'center',
    },
    contentBgPortrait: {
      backgroundColor:"#252836BB",
      padding: 20,
      borderRadius: 15,
    },
    titleNames: {
      fontSize: 32,
      fontFamily: 'CormorantGaramond_400Regular',
      letterSpacing: 0,
      color: '#FFFFFF',
      textAlign: 'center',
    },
    giftMessagePortrait: {
      fontSize: 13,
      fontFamily: 'Raleway_400Regular',
      color: '#FFFFFF',
      textAlign: 'center',
      alignSelf: 'center',
      marginBottom: 10,
      minWidth: "98%",
      maxWidth: "98%",
    },
    giftContainerPortrait: {
      marginTop: 0,
    },
    cuentaTextPortrait: {
    },
  });
  
  