import { WeddingCountdown } from '@/components/WeddingCountdown';
import { generalStyles } from '@/constants/GeneralStyles';
import { Image } from 'expo-image';
import React from 'react';
import { ImageBackground, StyleSheet, Text, useWindowDimensions, View } from 'react-native';


interface InicioScreenProps {
  invitado1?: string;
  invitado2?: string;
}

export default function InicioScreen({ invitado1 = '', invitado2 = '' }: InicioScreenProps) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const weddingDate = new Date('2027-01-08T16:00:00');
  
  // Format guest names
  let guestNames = invitado1.toUpperCase();
  if (invitado1 !== '') {
    guestNames += invitado2 !== '' ? ` y ${invitado2.toUpperCase()},` : ',';
  }
  
  // Personalized message
  let message = '';
  if (invitado1 !== '') {
    if (invitado2 !== '') {
      message = 'Compartimos el inicio de nuestra historia juntos, y queremos que sean parte de este momento especial.';
    } else {
      message = 'Compartimos el inicio de nuestra historia juntos, y queremos que seas parte de este momento especial.';
    }
  }
  
  return (
    <ImageBackground
      source={isLandscape ? require('@/assets/images/inicio/bg.png') : require('@/assets/images/inicio/portrait_bg.png')}
      style={isLandscape ? generalStyles.landscapeBackground : generalStyles.portraitBackground}
      resizeMode="cover"
    >
      <View style={isLandscape ? styles.container : styles.portraitContainer}>
        {/* Centered Monogram Logo */}
        <View style={[styles.logoContainer, !isLandscape && styles.portraitLogo]}>
          <Image
            source={require('@/assets/images/monogram_white.svg')}
            style={styles.logo}
            contentFit="contain"
          />
        </View>
        
        {/* Names and Date */}
        
        {/*<Text style={[generalStyles.generalTextMontserrat, styles.names, !isLandscape && styles.portraitNames]}>
          Zulema y Manuel
        </Text>*/}
        <Text style={[generalStyles.generalTextMontserrat, styles.date, !isLandscape && styles.portraitDate]}>
          8 DE ENERO 2027
        </Text>
        <Text style={[generalStyles.generalTextMontserrat, styles.date, !isLandscape && styles.portraitDate]}>
          XILITLA, S.L.P.
        </Text>
        <WeddingCountdown isLandscape={isLandscape} weddingDate={weddingDate} />
        <View style={[styles.namesImage, !isLandscape && styles.portraitNamesImage]}>
          <Image
            source={require('@/assets/images/inicio/names.svg')}
            style={styles.logo}
            contentFit="contain"
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 80,
  },
  logoContainer: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  names: {
    fontWeight: 500,
    color: 'white',
    textTransform: 'uppercase',
    marginTop: 45,
    marginBottom: 25,
    fontSize: 28,
    letterSpacing: 9,
    paddingTop: 0,
  },

  date: {
    fontWeight: 400,
    fontSize: 20,
    color: 'white',
    letterSpacing: 4,
  },
  namesImage: {
    position: 'absolute',
    width: 400,
    height: 150,
    bottom: 50,
  },
  
  // Portrait styles (if needed in the future)
  portraitContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
  },
  portraitLogo: {
    width: 130,
    height: 130,
    marginTop: 100,
    marginBottom: 30,
    
  },
  portraitNames: {
    fontSize: 24,
    letterSpacing: 4,
  },
  portraitTextContainer: {
    alignItems: 'center',
  },
  portraitDate: {
    fontSize: 16,
    marginBottom: 0,
  },
  portraitNamesImage: {
    position: 'relative',
    width: 450,
    height: 50,
    marginTop: 80,

  }
});
