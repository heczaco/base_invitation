import { generalStyles } from '@/constants/GeneralStyles';
import * as Clipboard from 'expo-clipboard';
import { Image } from 'expo-image';
import React from 'react';
import { ImageBackground, Linking, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';


export default function RegalosScreen() {

     const { width, height } = useWindowDimensions();
     const isLandscape = width > height;

     const copyAccountNumber = async (accountNumber: string) => {
       await Clipboard.setStringAsync(accountNumber);
       alert('Número de cuenta copiado al portapapeles');
     };
     const goToLiverpool = async (eventNumber: string) => {
       Linking.openURL(`https://mesaderegalos.liverpool.com.mx/milistaderegalos/${eventNumber}`);
       // Implement navigation to Liverpool gift page or external link
     };
     const goToAmazon = async (event: string) => {
       Linking.openURL(`https://www.amazon.com.mx/wedding/share/${event}`);
       // Implement navigation to Liverpool gift page or external link
     };

  return (
  <ImageBackground
        source={
          isLandscape
            ? require('@/assets/images/regalos/bg.png')
            : require('@/assets/images/regalos/bg_portrait.png')
        }
        style={[styles.container, isLandscape ? generalStyles.landscapeBackground: generalStyles.portraitBackground]}
        resizeMode="cover"
      >
        {!isLandscape && (<View style={[styles.monogramPortrait]}>
          <Image
              source={require('@/assets/images/monogram_white.svg')}
              style={generalStyles.imageStd}
              contentFit="contain"
              />
        </View>)}
        <View style={[styles.content, !isLandscape && styles.contentPortrait]}>
              
              <Text style={[styles.giftMessage, !isLandscape && styles.giftMessagePortrait]}>
                Su presencia y compañía siempre será nuestro
                mejor regalo. Sin embargo, si desean obsequiarnos
                algo más, pueden hacerlo a través de:
              </Text>

              <View style={[styles.regalosRow, !isLandscape && styles.regalosRowPortrait]}>
                <Pressable onPress={() => goToLiverpool('51956160')}>
                <View style={[styles.giftContainer, !isLandscape && styles.giftContainerPortrait]}>
                  <Image
                      source={require('@/assets/images/regalos/liverpool.svg')}
                      style={generalStyles.imageStd}
                      contentFit="contain"
                      />
                </View>
              </Pressable>
              <Pressable>
                <View style={[styles.giftContainer, !isLandscape && styles.giftContainerPortrait]}>
                  <Image
                      source={require('@/assets/images/regalos/sobre.svg')}
                      style={generalStyles.imageStd}
                      contentFit="contain"
                      />
                </View>
              </Pressable>
              <Pressable onPress={() => goToAmazon('ZulemayJoseManuel')}>
                <View style={[styles.giftContainer, !isLandscape && styles.giftContainerPortrait]}>
                  <Image
                      source={require('@/assets/images/regalos/amazon.svg')}
                      style={generalStyles.imageStd}
                      contentFit="contain"
                      />
                </View>
              </Pressable>
              </View>
              
            </View>
        
      </ImageBackground>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
    },
    content: {
      position: 'absolute',
      top: '20%',
      left: '10%',
      width: '40%',
      borderRadius: 15,
      padding: 20,
      justifyContent: 'center',
    },
    
    giftMessage: {
      fontFamily: 'Raleway',
      fontWeight: '200',
      fontSize: 18,
      maxWidth: '80%',
      color: '#FFFFFF',
      textAlign: 'center',
      alignSelf: 'center',
      marginBottom: 4,
      marginTop: 4,
    },
    regalosRow: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      width: 'auto',
    },
    giftContainer: {
      opacity: 1,
      marginTop: 10,
      width: 90,
      height: 90,
      alignSelf: 'center'
    },
    // portrait styles
    contentPortrait: {
      alignSelf: 'center',
      marginTop: "20%",
      width: "80%",
      backgroundColor: '#4A4C3499',
    },
    regalosRowPortrait: {
    },
    monogramPortrait: {
      width: '35%',
      aspectRatio: 1,
      marginTop: "15%",
      marginBottom: 15,
      alignSelf: 'center',
    },
    giftMessagePortrait: {
      fontSize: 12,
      fontFamily: 'Raleway',
      fontWeight: '400',
      color: '#FFFFFF',
      textAlign: 'center',
      alignSelf: 'center',
      marginBottom: 10,
      minWidth: "98%",
      maxWidth: "98%",
      borderRadius: 10,
      padding: 10,
    },
    giftContainerPortrait: {
      marginTop: 0,
    },
    cuentaTextPortrait: {
    },
  });
  
  