import { RsvpModals } from '@/components/RsvpModals';
import { Config } from '@/constants/Config';
import { generalStyles } from '@/constants/GeneralStyles';
import { useGuest } from '@/contexts/GuestContext';
import { Image } from 'expo-image';
import { useGlobalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, Linking, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function RsvpScreen() {
  const { guestData, setGuestData } = useGuest();
  const params = useGlobalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmedModalVisible, setConfirmedModalVisible] = useState(false);
  const [selectedAttendees, setSelectedAttendees] = useState(Number(guestData.available_invitations) || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
  
  // Helper function to determine which names to display
  const getDisplayNames = () => {
    const isCompleteName = (name: string) => name && name.trim().includes(' ');
    const useNicknames = false;
    if (useNicknames && (guestData.nickname_1 === "" || guestData.nickname_2 === "" )) {
      return { name1: guestData.name_1, name2: guestData.name_2 };
    }
    else if (guestData.name_2 && isCompleteName(guestData.name_1) && isCompleteName(guestData.name_2)) {
      // Both names are complete (have first and last name)
      return { name1: guestData.name_1, name2: guestData.name_2 };
    } else if (useNicknames && guestData.name_2 && 
      (!isCompleteName(guestData.name_1) || !isCompleteName(guestData.name_2))) {
      // Either name is incomplete, use nicknames
      return { name1: guestData.nickname_1, name2: guestData.nickname_2 };
    } else {
      // Only name_1 is available
      return { name1: guestData.name_1, name2: null };
    }
  };

  const displayNames = getDisplayNames();
  
  const openRSVP = () => {
    if (!guestData.confirmation_field || guestData.confirmation_field === '') {
      setModalVisible(true);
    } else {
      setConfirmedModalVisible(true);
    }
  };

  const handleConfirm = async () => {
    if (isSubmitting) return; // Prevent multiple submissions
    
    setIsSubmitting(true);
    try {
      const id = params.id as string;
      const url = `https://googlesheets-invitations-api.onrender.com/guests/${Config.INVITATION_ID}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uuid: id,
          confirmed_guests: selectedAttendees.toString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to confirm attendance: ${response.status}`);
      }

      // Update local guest data
      setGuestData({ confirmation_field: selectedAttendees.toString() });
      
      setModalVisible(false);
      alert('Confirmación enviada exitosamente');
    } catch (err) {
      console.error('Error confirming attendance:', err);
      alert('Error al enviar la confirmación. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const phoneNumber = '524441310801'; // Replace with wedding planner's number
    const waveEmoji = String.fromCodePoint(0x1F44B);
    const message = `Hola! ${waveEmoji}, tengo problemas con mi confirmación de tu boda`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  return (
    <ImageBackground
          source={require('@/assets/images/rsvp/bg.png')}
          style={isLandscape ? generalStyles.landscapeBackground : generalStyles.portraitBackground}
          resizeMode="cover"
        >
      <View style={[styles.container, !isLandscape && styles.portraitContainer]}>
        {/* Centered Monogram Logo */}
        <View style={[styles.logoContainer, !isLandscape && styles.logoPortrait]}>
          <Image
            source={require('@/assets/images/monogram_white.svg')}
            style={generalStyles.imageStd}
            contentFit="contain"
          />
        </View>
        <View  style={[styles.names, !isLandscape && styles.namesPortrait]}>
          <Image
            source={require('@/assets/images/names_white.svg')}
            style={generalStyles.imageStd}
            contentFit="contain"
          />
        </View>
        {/* Names and Date */}
        <View style={isLandscape ? styles.landscapeTextContainer : styles.portraitTextContainer}>
          
          <Text style={[styles.date, !isLandscape && styles.portraitDate]}>
            8 DE ENERO 2027 {'\n'}
            XILITLA, SLP
          </Text>
          <Text style={[styles.text, !isLandscape && styles.portraitText]}>
            Confirma tu asistencia antes del 20 de Noviembre
          </Text>
        
          {/* CONFIRM Button */}
          <Pressable style={[styles.button, !isLandscape && styles.buttonPortrait]} onPress={openRSVP}>
            <Text numberOfLines={1} style={[styles.buttonText, !isLandscape && styles.buttonTextPortrait]}>Confirma Aquí</Text>
          </Pressable>
        </View>
      </View>

      <RsvpModals
        modalVisible={modalVisible}
        confirmedModalVisible={confirmedModalVisible}
        onCloseConfirmation={() => setModalVisible(false)}
        onCloseConfirmed={() => setConfirmedModalVisible(false)}
        displayNames={displayNames}
        availableInvitations={guestData.available_invitations}
        selectedAttendees={selectedAttendees}
        onSelectedAttendeesChange={setSelectedAttendees}
        isSubmitting={isSubmitting}
        onConfirm={handleConfirm}
        onContactPlanner={openWhatsApp}
        />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  logoContainer: {
    width: 200,
    aspectRatio: 1,
  },
  names: {
    width: 350,
    height: 150,
  },
  date: {
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    letterSpacing: 4,
  },
  text: {
    fontFamily: 'Montserrat',
    fontWeight: '300',
    fontSize: 16,
    maxWidth: '60%',
    textAlign: 'center',
    color: 'white',
    marginTop: 20,
    marginBottom: 20,
    letterSpacing: 2,
  },
  button: {
    backgroundColor: '#4A4C34',
    paddingHorizontal: 40,
    minWidth: 200,
    height: 40,
    paddingVertical: 6,
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 2,
    overflow: "visible",
    color: '#FFFFFF',
  },
  landscapeTextContainer: {
    alignItems: 'center',
  },
  // Portrait styles (if needed in the future)
  portraitContainer: {
     flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    
    justifyContent: 'flex-start',
    borderRadius: 20,
  },
  buttonPortrait: {
  },

  logoPortrait: {
    width: 150  ,
    height: 150,
    marginTop: 30,
    
  },
  portraitTextContainer: {
    alignItems: 'center',
    marginTop: "0%",
  },
  namesPortrait: {
    width: 300,
    height: 100,
    marginTop: 0,
  },
  portraitDate: {
    marginTop: 20,
    fontSize: 16,
    textShadowColor: '#000000AA',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  portraitText: {
    textShadowColor: '#000000AA',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontSize: 14,
    maxWidth: '60%',
  },

  buttonTextPortrait: {
    fontSize: 14,
  },
  
});
