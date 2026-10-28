import { generalStyles } from '@/constants/GeneralStyles';
import { useGuest } from '@/contexts/GuestContext';
import { Image } from 'expo-image';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function CeremoniaScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const { guestData } = useGuest();
  const { updateGuestStatus } = useGuest();
  if (guestData.name_1 !== "" && guestData.invitation_status === "abierta"){
    updateGuestStatus("leida");
  }
  const openMap = (address: string) => {
    // Replace with your actual church location
    Linking.openURL(`https://maps.app.goo.gl/${address}`);
  };

  return (
    <View style={styles.container}>
      {/* Background Images */}
      <View style={[generalStyles.leftBackgroundImage, !isLandscape && generalStyles.portraitLeftBackgroundImage]}>
        <Image source={isLandscape ? require('@/assets/images/ceremonia/bg_left.svg') : 
                                     require('@/assets/images/ceremonia/bg_portrait_left.svg')}
          style={[{height: '100%', aspectRatio: 41 / 178}, !isLandscape && {height: '100%', aspectRatio: 33/227}]}
          contentFit="contain"
        />
      </View>

      
      <View style={[generalStyles.rightBackgroundImage,  !isLandscape && generalStyles.portraitRightBackgroundImage,]}>
        <Image source={isLandscape ? require('@/assets/images/ceremonia/bg_right.svg') : 
                                     require('@/assets/images/ceremonia/bg_portrait_right.svg')}
          style={[{height: '100%', aspectRatio: 41 / 178}, !isLandscape && {height: '69%', aspectRatio: 33/157}]}
          contentFit="cover"
        />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={[styles.content, !isLandscape && styles.portraitContent]}
        showsVerticalScrollIndicator={false}>
        {/* Parents */}
        <View style={[styles.parentsRow, !isLandscape && styles.portraitParentsRow]}>
          <Text style={[styles.parents, !isLandscape && styles.portraitParents]}>
            Rosa María Vinaja Aguilar{'\n'}
            Baltazar González Zuñiga
          </Text>
          <Text style={[styles.parents, !isLandscape && styles.portraitParents]}>
            Victor Manuel Martínez de León{'\n'}
            Rosa Elvira Jonguitud Hernández
          </Text>
        </View>

        {/* Message */}
        <Text style={[styles.message, !isLandscape && styles.portraitMessage]}>
          Nos hace muy felices compartir contigo nuestra unión en matrimonio y la celebración del comienzo de esta nueva etapa
        </Text>
      
        {/* Monogram */}
        <View style={[styles.monogramContainer, !isLandscape && styles.portraitMonogram]}>
          <Image
            source={require('@/assets/images/monogram_green.svg')}
            style={generalStyles.imageStd}
            contentFit="contain"
          />
        </View>

        {/* Names */}
        <View style={[styles.namesContainer, !isLandscape && styles.portraitNames]}>
          <Image
            source={require('@/assets/images/ceremonia/names_green.svg')}
            style={generalStyles.imageStd}
            contentFit="contain"
          />
        </View>

        {/* Date and place */}
        <Text style={[styles.date, !isLandscape && styles.portraitDate]}>
          8 DE ENERO 2027
        </Text>
        <Text style={[styles.date, !isLandscape && styles.portraitDate]}>
          XILITLA,SLP.
        </Text>

        {/* Time */}
        <Text style={[styles.time, !isLandscape && styles.portraitTime]}>
          4:00 pm
        </Text>

        {/* Church Name */}
        <Text style={[styles.churchName, !isLandscape && styles.portraitChurchName]}>
          TEMPLO Y EX CONVENTO DE SAN AGUSTÍN
        </Text>

        {/* Map Button */}
        <Pressable style={[styles.button, !isLandscape && styles.portraitButton]} onPress={() => openMap('Ewvtyqc6Pssa8Hd19')}>
          <Text style={[styles.buttonText, !isLandscape && styles.portraitButtonText]}>UBICACIÓN</Text>
        </Pressable>
      
        {/* Address */}
        <Text style={[styles.address, !isLandscape && styles.portraitAddress]}>
          Miguel Hidalgo 201, Xilitla, 79900 Xilitla, S.L.P.
        </Text>
      </ScrollView>
    </View>
  );
}

const green = '#535D45';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  // Background borders keep the aspect ratio of their artwork
  scrollView: {
    flex: 1,
    width: '100%',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '3%',
    paddingBottom: 60,
    paddingHorizontal: 40,

  },
  parentsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 10,
  },
  parents: {
    fontFamily: 'Montserrat',
    fontWeight: '300',
    fontStyle: 'italic',
    fontSize: 14,
    letterSpacing: 2,
    lineHeight: 18,
    color: green,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Montserrat',
    fontWeight: '300',
    fontSize: 16,
    letterSpacing: 2,
    color: green,
    textAlign: 'center',
    marginTop: 30,
    maxWidth: '40%',
  },
  monogramContainer: {
    width: 220,
    height: 180,
    marginTop: 30,
    marginBottom: 20,
  },
  namesContainer: {
    width: 260,
    height: 70,
    marginBottom: 30,
  },
  date: {
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontSize: 16,
    letterSpacing: 2,
    color: green,
    textAlign: 'center',
  },
  time: {
    fontFamily: 'Montserrat',
    fontWeight: '300',
    fontSize: 20,
    letterSpacing: 5,
    color: green,
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  churchName: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 1,
    color: green,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#9A9C84',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 25,
  },
  buttonText: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 14,
    letterSpacing: 3,
    color: '#FFFFFF',
  },
  address: {
    fontFamily: 'Montserrat',
    fontWeight: '300',
    fontStyle: 'italic',
    fontSize: 14,
    letterSpacing: 3,
    color: green,
    textAlign: 'center',
    marginTop: 20,
  },

  // Portrait styles
  portraitContent: {
    paddingTop: '10%',
    paddingHorizontal: 50,
  },
  portraitParentsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '110%',
  },
  portraitParents: {
    fontSize: 10,
    letterSpacing: 0.5,
    lineHeight: 12,
    marginBottom: 12,
  },
  portraitMessage: {
    fontSize: 10,
    letterSpacing: 0,
    maxWidth: '70%',
    marginTop: 10,
  },
  portraitMonogram: {
    width: 140,
    height: 115,
    marginTop: 20,
    marginBottom: 12,
  },
  portraitNames: {
    width: 160,
    height: 55,
    marginTop: 20,
    marginBottom: 20,
  },
  portraitDate: {
    fontSize: 13,
    letterSpacing: 1,
    maxWidth: '65%',
  },
  portraitTime: {
    fontSize: 16,
    letterSpacing: 3,
    marginTop: 18,
    marginBottom: 18,
  },
  portraitChurchName: {
    fontSize: 13,
    letterSpacing: 0,
    maxWidth: '60%',
  },
  portraitButton: {
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  portraitButtonText: {
    fontSize: 12,
    letterSpacing: 2,
  },
  portraitAddress: {
    maxWidth: '60%',
    fontSize: 11,
    letterSpacing: 1,
    marginTop: 16,
  },
});
