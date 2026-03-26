import React, { useMemo } from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { AppScreenWrapper, PlainHeader } from '../../components';
import IconLocation from '../../assets/icons/icon-location.svg';
import { BorderRadius, Colors, FontFamily, FontSize, containerSpace } from '../../theme';
import { CENTER_LOCATIONS } from '../../constants/centers';

const LOCATION_CARD_IMAGES = [
  require('../../assets/figma/loc-img1.jpg'),
  require('../../assets/figma/loc-img2.jpg'),
];

export default function OurCentersListScreen({ navigation, route }: any) {
  const city = route.params?.city ?? 'Gurugram';

  const centers = useMemo(
    () => CENTER_LOCATIONS.filter((item) => item.city === city),
    [city],
  );

  const handleCall = async (phone: string) => {
    await Linking.openURL(`tel:${phone}`);
  };

  const handleDirections = async (addressLine1: string, addressLine2: string) => {
    const query = encodeURIComponent(`${addressLine1}, ${addressLine2}`);
    await Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
  };

  return (
    <AppScreenWrapper>
      <View style={s.screen}>
        <StatusBar style="dark" />
        <PlainHeader title={city} onBack={() => navigation.goBack()} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>
          {centers.map((item, index) => (
            <View key={item.id} style={s.card}>
              <Image source={LOCATION_CARD_IMAGES[index % LOCATION_CARD_IMAGES.length]} style={s.cardImage} />

              <View style={s.details}>
                <View style={s.titleRow}>
                  <Text style={s.name}>{item.contactName}</Text>
                  <View style={s.ratingChip}>
                    <Ionicons name="star" size={13} color="#F6C400" />
                    <Text style={s.ratingValue}>{item.rating.toFixed(1)}</Text>
                  </View>
                    <Text style={s.ratingCount}>{item.reviewCount} ratings</Text>
                </View>

                <View style={s.addressRow}>
                  <IconLocation width={16} height={16} color={Colors.primaryDark} preserveAspectRatio="xMidYMid meet" />
                  <Text style={s.address}>
                    {item.addressLine1}, {item.addressLine2}
                  </Text>
                </View>

                <View style={s.actions}>
                  <TouchableOpacity activeOpacity={0.88} style={s.callButton} onPress={() => handleCall(item.phone)}>
                    <Text style={s.callButtonText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.88}
                    style={s.directionButton}
                    onPress={() => handleDirections(item.addressLine1, item.addressLine2)}
                  >
                    <Text style={s.directionButtonText}>Get Direction</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </AppScreenWrapper>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 20,
  },
  content: {
    paddingHorizontal: containerSpace,
    paddingTop: 22,
    paddingBottom: 120,
    gap: 20,
  },
  card: {
    backgroundColor: '#EEF4FE',
    borderRadius: 16,
    padding: 12,
  },
  cardImage: {
    width: '100%',
    minWidth: "100%",
    aspectRatio: 320/138,
    borderRadius: 16,
  },
  details: {
    paddingTop: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderStyle: 'dashed',
    borderColor: Colors.primary
  },
  name: {
    flex: 1,
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    color: '#3451A4',
  },
  ratingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: Colors.white,
  },
  ratingValue: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: Colors.greyText,
  },
  ratingCount: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: Colors.greyText,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingTop: 12,
  },
  address: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563',
    marginTop: -2,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  callButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3F57B3',
    borderRadius: BorderRadius.pill,
    paddingVertical: 10,
  },
  callButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.white,
  },
  directionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.pill,
    paddingVertical: 10,
  },
  directionButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.greyText,
  },
});
