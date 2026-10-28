import { generalStyles } from '@/constants/GeneralStyles';
import { Image } from 'expo-image';
import React from 'react';
import { ImageBackground, Linking, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function RecepcionScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const openMap = () => {
    // Replace with your actual reception venue location
    Linking.openURL('https://maps.app.goo.gl/bebbv8oZ8KnNFLAa7');
  };

  return (
    <ImageBackground
          source={isLandscape ? require('@/assets/images/recepcion/bg.png') : require('@/assets/images/recepcion/bg_portrait.png')}
          style={isLandscape ? generalStyles.landscapeBackground : generalStyles.portraitBackground}
          resizeMode="cover">
      {!isLandscape && <View style={[generalStyles.portraitBackground]}>
          <Image source={require('@/assets/images/monogram_white.svg')}
            style={[{height: 60, aspectRatio: 1, bottom: "5%", left: "5%", position: "absolute"}]}
            contentFit="cover"
          />
        </View>}
      {/* Background */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* Photo with reception details */}
        <View style={[styles.detailsContainer, !isLandscape && styles.detailsContainerPortrait]}>
          <View style={[styles.details, !isLandscape && styles.detailsPortrait]}>
            <Text style={[styles.time, !isLandscape && styles.timePortrait]}>5:30 pm</Text>
            <Text style={[styles.venue, !isLandscape && styles.venuePortrait]}>FINCA LA PAGUA</Text>
            <Pressable style={[styles.button, !isLandscape && styles.buttonPortrait]} onPress={openMap}>
              <Text style={[styles.buttonText, !isLandscape && styles.buttonTextPortrait]}>UBICACIÓN</Text>
            </Pressable>
            <Text style={[styles.info, !isLandscape && styles.infoPortrait]}>
              Vicente Guerrero 317, Xilitla,{'\n'}
              79901 Xilitla, S.L.P.
            </Text>
          </View>
        </View>

        {/* Itinerary */}
        <View style={isLandscape ? styles.itineraryContainer : styles.itineraryContainerPortrait}>
          <View style={isLandscape ? styles.itinerary : styles.itineraryPortrait}>
            <Image
              source={isLandscape ? require('@/assets/images/recepcion/itinerary.png') :
                require('@/assets/images/recepcion/itinerary_portrait.png')}
              style={generalStyles.imageStd}
              contentFit="contain"
            />
          </View>
          {/* Names */}
          <View style={[styles.names, !isLandscape && styles.namesPortrait]}>
            <Image
              source={require('@/assets/images/ceremonia/names_green.svg')}
              style={generalStyles.imageStd}
              contentFit="contain"
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    aspectRatio: 1729 / 970,
    justifyContent: 'flex-end',
  },
  detailsContainer: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    aspectRatio: 1729 / 970,
    paddingRight: '6%',
    paddingBottom: '15%',
  },
  details: {
    width: '25%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 20,
    letterSpacing: 4,
    color: '#FFFFFF',
  },
  venue: {
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontSize: 15,
    letterSpacing: 3,
    color: '#FFFFFF',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#535D45',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 14,
    marginBottom: 14,
  },
  buttonText: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 12,
    letterSpacing: 2,
    color: '#FFFFFF',
  },
  info: {
    fontFamily: 'Montserrat',
    fontWeight: '300',
    fontStyle: 'italic',
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 18,
  },
  itinerary: {
    width: '90%',
    aspectRatio: 1729 / 400,
    marginTop: '2%',
  },
  itineraryContainer: {
    width: '90%',
    backgroundColor: '#FFFFFFED',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: '3%',
  },
  names: {
    width: '30%',
    aspectRatio: 3,
    marginBottom: '3%',
  },
  // Portrait styles
  contentPortrait: {},
  detailsContainerPortrait: {
    height: '100%',
    width: '100%',
    padding: '0%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  photoPortrait: {
    aspectRatio: 0.75,
  },
  detailsPortrait: {
    marginTop: '20%',
    borderRadius: 10,
    width: '70%',
    height: '30%',
    alignItems: 'center',
    backgroundColor: '#545E46BE',
  },
  timePortrait: {
    fontSize: 16,
  },

  itineraryContainerPortrait: {
    width: '100%',
    alignItems: 'center',
  },
  venuePortrait: {
    fontSize: 11,
  },
  buttonPortrait: {
    paddingVertical: 8,
  },
  buttonTextPortrait: {
    fontSize: 9,
  },
  infoPortrait: {
    fontSize: 10,
    lineHeight: 15,
  },
  itineraryPortrait: {
    marginTop: 15,
    width: '95%',
    aspectRatio: 1,
  },
  namesPortrait: {
    width: '60%',
  },
});
