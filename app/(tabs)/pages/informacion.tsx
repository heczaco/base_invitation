import { generalStyles } from '@/constants/GeneralStyles';
import { useGuest } from '@/contexts/GuestContext';
import React from 'react';
import { Linking, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

const navy = '#30364D';
const cream = '#F5F2EC';

export default function InformacionScreen() {
  const { guestData, updateGuestStatus } = useGuest();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  
  if (guestData.name_1 !== '' && guestData.invitation_status === 'abierta') {
    updateGuestStatus('leida');
  }

  const messageWhats = "Hola, me gustaría hacer una reservación para la boda de Gisela e Israel; código de reserva: BODAGISEISRA";
  const openWhatsApp = () => Linking.openURL(`https://wa.me/523143310513?text=${encodeURIComponent(messageWhats)}`);
  const callHotel = () => Linking.openURL('tel:+523143310500');
  const callTollFree = () => Linking.openURL('tel:8008492373');

  return (
    <View style={[styles.container, isLandscape ? generalStyles.landscapeBackground_100 : generalStyles.portraitBackground]}>
      <ScrollView
        style={[styles.scrollView, !isLandscape && styles.scrollViewPortrait]}
        contentContainerStyle={[styles.content, !isLandscape && styles.contentPortrait]}
        showsVerticalScrollIndicator={false}
      >
       
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cream,
},
scrollView: {
    flex: 1,
    marginTop: '10%',
  },
  content: {
    alignItems: 'center',
    
  },
  header: {
    color: '#000000',
    fontFamily: 'Cormorant Garamond',
    fontWeight: '700',
    fontSize: 35,
    letterSpacing: 5,
    textAlign: 'center',
    marginBottom: 46,
  },
  hotelSection: {
    width: '82%',
    maxWidth: 810,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hotelColumn: {
    flex: 1,
    alignItems: 'center',
  },
  codeColumn: {
    flex: 0.7,
    alignItems: 'center',
  },
  divider: {
    width: 3,
    height: 82,
    backgroundColor: '#000000',
    marginHorizontal: 34,
  },
  columnHeading: {
    color: '#000000',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 25,
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 32,
  },
  hotelName: {
    color: '#000000',
    fontFamily: 'Cormorant Garamond',
    fontWeight: '400',
    fontSize: 18,
    letterSpacing: 3,
    lineHeight: 26,
    textAlign: 'center',
  },
  code: {
    color: '#000000',
    fontFamily: 'Cormorant Garamond',
    fontWeight: '400',
    fontSize: 18,
    letterSpacing: 3,
    textAlign: 'center',
  },
  email: {
    color: '#000000',
    fontFamily: 'Cormorant Garamond',
    fontWeight: '400',
    fontSize: 18,
    letterSpacing: 3,
    textAlign: 'center',
    marginTop: 48,
    marginBottom: 40,
  },
  contactRow: {
    width: '82%',
    maxWidth: 820,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  contactAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneAction: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  whatsIcon: {
    width: 42,
    height: 42,
    marginRight: 10,
  },
  phoneIcon: {
    width: 34,
    height: 34,
    marginRight: 10,
    marginTop: 4,
  },
  actionText: {
    color: '#FFFFFF',
    backgroundColor: navy,
    borderRadius: 22,
    fontFamily: 'Cormorant Garamond',
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 3,
    paddingHorizontal: 17,
    paddingVertical: 7,
  },
  phoneNumber: {
    color: '#FFFFFF',
    backgroundColor: navy,
    borderRadius: 22,
    fontFamily: 'Cormorant Garamond',
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 2,
    paddingHorizontal: 20,
    paddingVertical: 7,
    textAlign: 'center',
  },
  extension: {
    color: '#000000',
    fontFamily: 'Cormorant Garamond',
    fontWeight: '400',
    fontSize: 19,
    textAlign: 'center',
    marginTop: 5,
  },
  notice: {
    maxWidth: "80%",
    color: '#172038',
    backgroundColor: '#B9C0CE',
    fontFamily: 'Cormorant Garamond',
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 3,
    marginTop: 46,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 15,
    textAlign: 'center',
  },
  info: {
    width: '90%',
      aspectRatio: 1,
    height: 'auto',
    marginTop: "5%",
    marginBottom: "5%",
  },
  // Portrait styles
  scrollViewPortrait: {
    marginTop: '2%',
  },
  contentPortrait: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 24,
  },
  headerPortrait: {
    fontSize: 19,
    maxWidth  : '90%',
    letterSpacing: 3,
    marginBottom: 35,
  },
  hotelSectionPortrait: {
    width: '100%',
    flexDirection: 'column',
  },
  hotelColumnPortrait: {
    width: '100%',
    flex: 1,
  },
  columnHeadingPortrait: {
    fontSize: 16,
    letterSpacing: 1,
    marginBottom: 6,
  },
  hotelNamePortrait: {
    fontSize: 13,
    letterSpacing: 1,
    lineHeight: 16,
    marginBottom: 0,
  },
  dividerPortrait: {
    width: '60%',
    height: 2,
    marginVertical: 24,
    marginHorizontal: 0,
  },
  codeColumnPortrait: {
    width: '100%',
    flex: 1,
    marginTop: 0,
  },
  codePortrait: {
    fontSize: 16,
    letterSpacing: 1,
  },
  emailPortrait: {
    width: '100%',
    fontSize: 16,
    letterSpacing: 1.5,
    marginTop: 34,
    marginBottom: 28,
  },
  contactRowPortrait: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 18,
  },
  contactActionPortrait: {
    width: '100%',
    justifyContent: 'center',
  },
  phoneActionPortrait: {
    justifyContent: 'center',
    
    alignItems: 'flex-start',
  },
  whatsIconPortrait: {
    width: 36,
    height: 36,
  },
  phoneIconPortrait: {
    width: 30,
    height: 30,
  },
  actionTextPortrait: {
    fontSize: 14,
    minWidth: 150,
    textAlign: 'center',
    letterSpacing: 1,
  },
  phoneNumberPortrait: {
    fontSize: 14,
    minWidth: 150,
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  extensionPortrait: {
    fontSize: 16,
  },
  noticePortrait: {
    width: '100%',
    fontSize: 15,
    letterSpacing: 1.5,
    marginTop: 34,
    paddingHorizontal: 12,
    paddingVertical: 13,
  },
  infoPortrait: {
    width: '120%',
    aspectRatio: 1,
    marginTop: 40,
  }
});
