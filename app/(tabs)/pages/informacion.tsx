import { generalStyles } from '@/constants/GeneralStyles';
import { useGuest } from '@/contexts/GuestContext';
import { Image } from 'expo-image';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

const cream = '#F5F2EC';
const green = '#4A5240';

const openLink = (url: string) => Linking.openURL(url);
const callPhone = (phone: string) => Linking.openURL(`tel:${phone.replace(/[^\d+]/g, '')}`);
const hotels: { name: string; price: string; distance: string; callable: () => void }[] = [
  { name: 'POSADA TEMÁTICA JARDÍN HUASTECA XILITLA', price: '≈ 700 MXN', distance: '700 M', callable: () => openLink('https://www.booking.com/hotel/mx/jardin-huasteca.es.html?aid=1288313&label=metagha-link-MRMX-hotel-2695622_dev-desktop_los-1_bw-3_dow-Thursday_defdate-1_room-0_gstadt-2_rateid-dg_aud-0_gacid-21415144282_mcid-50_bc-ACkhxg_ppa-0_clrid-0_ad-1_gstkid-0_checkin-20260709_ppt-GB_lp-2484_r-13432541819168862926&sid=fc7b0e54e0c680181fde76de33ede382&all_sr_blocks=269562205_386280249_2_10_0&checkin=2026-07-09&checkout=2026-07-10&dest_id=2695622&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=269562205_386280249_2_10_0&hpos=1&matching_block_id=269562205_386280249_2_10_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=269562205_386280249_2_10_0__52415&srepoch=1783348518&srpvid=218e668ffb510139&type=total&ucfs=1&chal_t=1786993858892&force_referer=') },
  { name: 'HOTEL SIERRA LINDA', price: '≈ 950 MXN', distance: '900 M', callable: () => openLink('https://www.booking.com/hotel/mx/sierra-linda.es.html?aid=1288313&label=metagha-link-MRMX-hotel-5357173_dev-desktop_los-1_bw-0_dow-Monday_defdate-1_room-0_gstadt-2_rateid-publicNe_aud-0_gacid-21415144282_mcid-50_ppa-0_clrid-0_ad-1_gstkid-0_checkin-20260706_ppt-B_lp-2484_r-17348069285674365889&sid=fc7b0e54e0c680181fde76de33ede382&all_sr_blocks=535717301_427621288_2_2_0&checkin=2026-07-06&checkout=2026-07-07&dest_id=5357173&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=535717301_427621288_2_2_0&hpos=1&matching_block_id=535717301_427621288_2_2_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=535717301_427621288_2_2_0__76500&srepoch=1783348604&srpvid=90f166bca3d101b3&type=total&ucfs=1&') },
  { name: 'GRAN POSADA XILITLA', price: '≈ 1,200 MXN', distance: '900 M', callable: () => openLink("https://www.booking.com/hotel/mx/grann-posada-xilitla.es.html?aid=1288313&label=metagha-link-MRMX-hotel-2420113_dev-desktop_los-1_bw-2_dow-Wednesday_defdate-1_room-0_gstadt-2_rateid-0_aud-0_gacid-21415144282_mcid-50_bc-ACTtkQ_ppa-0_clrid-0_ad-1_gstkid-0_checkin-20260708_ppt-_lp-2484_r-16211149326734395828&sid=fc7b0e54e0c680181fde76de33ede382&all_sr_blocks=242011309_429711723_0_0_0_1371089&checkin=2026-07-08&checkout=2026-07-09&dest_id=2420113&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=242011309_429711723_0_0_0_1371089&hpos=1&matching_block_id=242011309_429711723_0_0_0_1371089&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=242011309_429711723_0_0_0_1371089_103500&srepoch=1783369389&srpvid=26308f54d8f007fe&type=total&ucfs=1&") },
  { name: 'HOTEL DOS PÉRES', price: '≈ 500 MXN', distance: '650 M', callable: () => openLink('https://www.hoteldoloresxilitla.mx/') },
  { name: 'HOTEL TENEKA', price: '≈ 3,500 MXN', distance: '2.1 KM', callable: () => openLink('https://www.booking.com/hotel/mx/teneka-xilitla.es.html?aid=1288313&label=metagha-link-MRMX-hotel-2420113_dev-desktop_los-1_bw-2_dow-Wednesday_defdate-1_room-0_gstadt-2_rateid-0_aud-0_gacid-21415144282_mcid-50_bc-ACTtkQ_ppa-0_clrid-0_ad-1_gstkid-0_checkin-20260708_ppt-_lp-2484_r-16211149326734395828&sid=32dbdeb9c886e6d23bdb9e3ce752c652&all_sr_blocks=1492775702_420921755_2_1_0&checkin=2026-07-08&checkout=2026-07-09&dest_id=14927757&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=1492775702_420921755_2_1_0&hpos=1&matching_block_id=1492775702_420921755_2_1_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=1492775702_420921755_2_1_0__383400&srepoch=1783369874&srpvid=d1419047fbba1a97&type=total&ucfs=1&') },
  { name: 'VILLA ECOTURÍSTICA LA HUERTA', price: '≈ 1,500 MXN', distance: '2.2 KM', callable: () => callPhone('4891073422')},
  { name: 'FINCA LA PAGUA', price: '', distance: '', callable: () => callPhone('4811069167')},
  { name: 'HOTEL POSADA SAN AGUSTÍN', price: '≈900 MXN', distance: '', callable: () => callPhone('4891137170') },
  { name: 'HOTEL CASA BLANCA', price: '≈1,500 MXN', distance: '', callable: () => callPhone('4891308995') },
  { name: 'HOTEL Y SUITS PUERTA DEL CIELO', price: '', distance: '', callable: () => callPhone('4893650710') },
];


export default function InformacionScreen() {
  const { guestData, updateGuestStatus } = useGuest();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  if (guestData.name_1 !== '' && guestData.invitation_status === 'abierta') {
    updateGuestStatus('leida');
  }

  const cell = [styles.cellText, !isLandscape && styles.cellTextPortrait];
  const heading = [styles.headingText, !isLandscape && styles.headingTextPortrait];

  return (
    <View style={[styles.container, isLandscape ? generalStyles.landscapeBackground : generalStyles.portraitBackground]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}>
        <Text style={[styles.header, !isLandscape && styles.headerPortrait]}>INFORMACIÓN Y RECOMENDACIONES</Text>
        <Text style={[styles.subHeader, !isLandscape && styles.subHeaderPortrait]}>HOTELES</Text>

        <View style={[styles.table, !isLandscape && styles.tablePortrait]}>
          <View style={[styles.column, styles.nameColumn]}>
            <Text style={heading}> </Text>
            {hotels.map((h) => (
              <Pressable key={h.name} onPress={h.callable}>
                <Text style={cell}>{h.name}</Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.divider} />
          <View style={[styles.column, styles.dataColumn]}>
            <Text style={heading}>$ PROMEDIO{'\n'}POR NOCHE</Text>
            {hotels.map((h) => (
              <Pressable key={h.name} onPress={h.callable}>
                <Text style={cell}>{h.price || ' '}</Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.divider} />
          <View style={[styles.column, styles.dataColumn]}>
            <Text style={heading}>DISTANCIA{'\n'}AL EVENTO</Text>
            {hotels.map((h) => (
              <Pressable key={h.name} onPress={h.callable}>
                <Text style={cell}>{h.distance || ' '}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={[styles.info, !isLandscape && styles.infoPortrait]}>
          <Image
            source={require('@/assets/images/informacion/info.svg')}
            style={generalStyles.imageStd}
            contentFit="contain"
          />
        </View>
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
    width: '100%',
  },
  content: {
    alignItems: 'center',
    paddingTop: '4%',
    paddingBottom: '5%',
  },
  header: {
    color: green,
    fontFamily: 'Cormorant Garamond',
    fontWeight: '500',
    fontSize: 24,
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 24,
  },
  headerPortrait: {
    fontSize: 16,
    letterSpacing: 2,
    marginTop: 16,
  },
  subHeader: {
    color: green,
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 20,
    letterSpacing: 4,
    marginBottom: 24,
  },
  subHeaderPortrait: {
    fontSize: 15,
    letterSpacing: 3,
    marginBottom: 16,
  },
  table: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tablePortrait: {
    width: '90%',
  },
  column: {
    alignItems: 'flex-start',
  },
  nameColumn: {
    flex: 3,
    paddingRight: 8,
  },
  dataColumn: {
    flex: 1.4,
    alignItems: 'center',
  },
  divider: {
    width: 2,
    backgroundColor: '#000000',
  },
  headingText: {
    height: 56,
    color: green,
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 2,
    textAlign: 'center',
  },
  headingTextPortrait: {
    height: 40,
    fontSize: 9,
    letterSpacing: 1,
  },
  cellText: {
    height: 40,
    color: '#000000',
    fontFamily: 'Cormorant Garamond',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 2,
    textAlignVertical: 'center',
  },
  cellTextPortrait: {
    height: 30,
    fontSize: 9,
    letterSpacing: 1,
  },
  info: {
    width: '65%',
    aspectRatio: 208 / 546,
    marginTop: '5%',
  },
  infoPortrait: {
    width: '90%',
  },
});
