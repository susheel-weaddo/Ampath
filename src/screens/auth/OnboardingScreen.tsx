import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Typography } from '../../theme';
import { Button } from '../../components';

const { width: SW, height: SH } = Dimensions.get('window');

const FIGMA_LOGO = require('../../assets/figma/1fdb5fde-7e7b-4eed-a97c-9e60eef5c902.png');
const SLIDES = [
  {
    id: '1',
    title: 'Verification',
    desc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    image: require('../../assets/figma/5a973eab-0e7e-47d8-9476-d5157fedb9e4.png'),
  },
  {
    id: '2',
    title: 'Lab Reports',
    desc:
      'Get instant access to your reports and download them anytime you need.',
    image: require('../../assets/figma/dbffaafa-02d5-4c57-9be4-93953c452a6b.png'),
  },
  {
    id: '3',
    title: 'Book Tests',
    desc:
      'Book home collection or visit lab with a smooth checkout experience.',
    image: require('../../assets/figma/9d01d38b-8c7e-4d4d-92ad-1617c26acf76.png'),
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const [idx, setIdx] = useState(0);
  const ref = useRef<FlatList>(null);

  const goTo = (i: number) => { ref.current?.scrollToIndex({ index: i, animated: true }); setIdx(i); };
  const onScroll = (e: any) => setIdx(Math.round(e.nativeEvent.contentOffset.x / SW));
  const isLast = idx === SLIDES.length - 1;

  const sheetTop = useMemo(() => Math.max(420, Math.round(SH * 0.59)), []);

  const renderSlide = ({ item }: any) => (
    <View style={{ width: SW, height: SH }}>
      <ImageBackground source={item.image} style={s.hero} resizeMode="cover">
        <View style={s.heroTint} />
      </ImageBackground>

      <View style={[s.sheet, { top: sheetTop }]}>
        <Image source={FIGMA_LOGO} style={s.logo} resizeMode="contain" />
        <View style={s.content}>
          <Text style={s.title}>{item.title}</Text>
          <Text style={s.desc}>{item.desc}</Text>
        </View>
        <View style={s.dots}>
          {SLIDES.map((_, i) => (
            <TouchableOpacity key={i} onPress={() => goTo(i)}
              style={[s.dot, i === idx ? s.dotActive : s.dotInactive]} />
          ))}
        </View>
        <Button
          title={isLast ? 'Get Started' : 'Next'}
          onPress={() => isLast ? navigation.replace('Login') : goTo(idx + 1)}
          style={{ marginTop: 10 }}
        />
        <TouchableOpacity onPress={() => navigation.replace('Login')} style={{ marginTop: 4 }}>
          <Text style={s.skip}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <FlatList ref={ref} data={SLIDES} renderItem={renderSlide} keyExtractor={i => i.id}
        horizontal pagingEnabled showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll} bounces={false} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  hero: { position: 'absolute', left: 0, right: 0, top: 0, height: 577, width: SW },
  heroTint: { ...StyleSheet.absoluteFillObject, backgroundColor: Colors.blueTint },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 334,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 33,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 16,
  },
  logo: { width: 151, height: 34 },
  content: { alignItems: 'center', gap: 14, paddingHorizontal: 8, marginTop: 7, },
  title: { ...Typography.h3, color: Colors.brand, textAlign: 'center' },
  desc: { ...Typography.body2, color: Colors.greyNormal, textAlign: 'center', lineHeight: 18 },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: '#C5C5C5' },
  dotActive: { backgroundColor: Colors.primaryDark },
  dotInactive: { backgroundColor: '#D9D9D9' },
  skip: { fontFamily: FontFamily.medium, fontSize: FontSize.body1, color: Colors.greyNormal },
});
