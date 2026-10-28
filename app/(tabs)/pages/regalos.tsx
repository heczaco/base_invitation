import { generalStyles } from '@/constants/GeneralStyles';
import * as Clipboard from 'expo-clipboard';
import { Image } from 'expo-image';
import React from 'react';
import { ImageBackground, Linking, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';


export default function RegalosScreen() {

     const { width, height } = useWindowDimensions();
     const isLandscape = width > height;

     const copyAccountNumber = async () => {
       await Clipboard.setStringAsync('012680015394091490');
       alert('Número de cuenta copiado al portapapeles');
     };
     const goToLiverpool = async (eventNumber: string) => {
       Linking.openURL(`https://mesaderegalos.liverpool.com.mx/milistaderegalos/${eventNumber}`);
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
        <View style={[styles.content, !isLandscape && styles.contentPortrait]}>
            
            <View style={[!isLandscape && styles.contentBgPortrait]}> 
              
              <Text style={[styles.giftMessage, !isLandscape && styles.giftMessagePortrait]}>
                Su presencia y compañía siempre será nuestro
                mejor regalo. Sin embargo, si desean obsequiarnos
                algo más, pueden hacerlo a través de:
              </Text>

              <View style={[styles.regalosRow, !isLandscape && styles.regalosRowPortrait]}>
                <Pressable onPress={() => goToLiverpool('60049317')}>
                <View style={[styles.giftContainerLiverpool, !isLandscape && styles.giftContainerLiverpoolPortrait]}>
                  <Image
                      source={require('@/assets/images/regalos/liverpool.svg')}
                      style={generalStyles.imageStd}
                      contentFit="contain"
                      />
                </View>
              </Pressable>
              <Pressable onPress={() => goToLiverpool('60049317')}>
                <View style={[styles.giftContainerLiverpool, !isLandscape && styles.giftContainerLiverpoolPortrait]}>
                  <Image
                      source={require('@/assets/images/regalos/sobre.svg')}
                      style={generalStyles.imageStd}
                      contentFit="contain"
                      />
                </View>
              </Pressable>
              <Pressable onPress={() => goToLiverpool('60049317')}>
                <View style={[styles.giftContainerLiverpool, !isLandscape && styles.giftContainerLiverpoolPortrait]}>
                  <Image
                      source={require('@/assets/images/regalos/amazon.svg')}
                      style={generalStyles.imageStd}
                      contentFit="contain"
                      />
                </View>
              </Pressable>
              </View>
              
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
      width: '40%',
      
      borderRadius: 15,
      padding: 20,
      justifyContent: 'center',
    },
    regalosRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      backgroundColor: 'red',
    },
    regalosRowPortrait: {
      flexDirection: 'column',
      alignItems: 'center',
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
    giftContainer: {
      opacity: 1,
      marginTop: 30,
      
      width: 50,
      height: 40,
      alignSelf: 'center'
    },
    giftContainerLiverpool: {
      opacity: 1,
      
      marginBottom: 10,
      width: 40,
      height: 40,
      marginTop: 30,
      alignSelf: 'center'
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
      fontFamily: 'Cormorant Garamond',
      fontWeight: '400',
      letterSpacing: 0,
      color: '#FFFFFF',
      textAlign: 'center',
    },
    giftMessagePortrait: {
      fontSize: 13,
      fontFamily: 'Raleway',
      fontWeight: '400',
      color: '#FFFFFF',
      textAlign: 'center',
      alignSelf: 'center',
      marginBottom: 10,
      minWidth: "98%",
      maxWidth: "98%",
    },
    giftContainerPortrait: {
      marginTop: 20,
    },
    giftContainerLiverpoolPortrait: {
      marginTop: 20,
      

    },
    cuentaTextPortrait: {
    },
  });
  
  