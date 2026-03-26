import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, FlatList, Platform, StatusBar as RNStatusBar, Image, Animated, Modal, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadow, Typography, containerSpace } from '../../theme';
import { AppScreenWrapper, HorizontalSlider, Card, Badge } from '../../components';
import IconLocation from '../../assets/icons/icon-location.svg';
import IconNotification from '../../assets/icons/icon-notification.svg';
import IconCart from '../../assets/icons/icon-cart.svg';
import IconSearch from '../../assets/icons/icon-search.svg';
import ChatbotIcon from '../../assets/icons/chatbot.svg';
import FIGMA_WCA_1 from '../../assets/figma/wca-1.svg';
import FIGMA_WCA_2 from '../../assets/figma/wca-2.svg';
import FIGMA_WCA_3 from '../../assets/figma/wca-3.svg';
import FIGMA_WCA_4 from '../../assets/figma/wca-4.svg';
import FIGMA_INSTAGRAM from '../../assets/figma/instagram.svg';
import FIGMA_FACEBOOK from '../../assets/figma/facebook.svg';
import FIGMA_YOUTUBE from '../../assets/figma/youtube.svg';
import FIGMA_LINKEDIN from '../../assets/figma/linkedin.svg';
import { BLOGS as SHARED_BLOGS } from '../../constants/blogs';

const { width: SW } = Dimensions.get('window');
const finalWidth = SW - containerSpace * 2;


// Synced from the public Figma file into `src/assets/figma/` via `node scripts/fetch-figma-assets.mjs --scan`.
const FIGMA_AVATAR = require('../../assets/figma/cae40477-b7df-40e4-93b5-3cc0ac790730.png');
const reminderAvtar = require('../../assets/figma/hm-img-a.png');
const FIGMA_SLIDE = require('../../assets/figma/8c1547d6-df94-47de-9fe9-ce1dc7f94875.png');
const FIGMA_TEST_ICON = require('../../assets/figma/9728c4dd-2e53-4405-9d93-8156380914b7.png');
const FIGMA_OFFER_DOCTOR = require('../../assets/figma/img5.png');
const FIGMA_MOST_BOOKED_IMG = require('../../assets/figma/0d43af07-ec99-4289-8497-179729574573.png');
const FIGMA_HOME_COLLECTION = require('../../assets/figma/img6.png');
const FIGMA_WOMEN_1 = require('../../assets/figma/img1.png');
const FIGMA_WOMEN_2 = require('../../assets/figma/img2.png');
const FIGMA_WOMEN_3 = require('../../assets/figma/img3.png');
const FIGMA_WOMEN_4 = require('../../assets/figma/img4.png');

const FIGMA_BLOG_1 = require('../../assets/figma/blog1.png');
const FIGMA_VIDEO_1 = require('../../assets/figma/blog1.png');

const FIGMA_HWC_1 = require('../../assets/figma/hoc1.png');
const FIGMA_HWC_2 = require('../../assets/figma/hoc2.png');
const FIGMA_HWC_3 = require('../../assets/figma/hoc3.png');
const FIGMA_HWC_4 = require('../../assets/figma/hoc4.png');
const FIGMA_HWC_5 = require('../../assets/figma/hoc5.png');
const FIGMA_HWC_6 = require('../../assets/figma/hoc6.png');
const FIGMA_VECTOR_B = require('../../assets/figma/vector-b.png');
const FIGMA_PROMO_AD = require('../../assets/figma/ad.jpg');

const SLIDES = [
  { id: '1', source: FIGMA_SLIDE, title: 'Book Lab Tests at Home', desc: "Safe & Convenient sample collection by trained experts at your doorstep" },
  { id: '2', source: FIGMA_SLIDE, title: 'Book Lab Tests at Home', desc: "Safe & Convenient sample collection by trained experts at your doorstep" },
  { id: '3', source: FIGMA_SLIDE, title: 'Book Lab Tests at Home', desc: "Safe & Convenient sample collection by trained experts at your doorstep" },
];

const ACTIONS = [
  { id: '3', label: 'Upload\nPrescription', icon: 'cloud-upload-outline', onPress: (nav: any) => nav.navigate('BookSlot') },
  { id: '4', label: 'Call us to\nBook Lab Test', icon: 'call-outline', onPress: () => Linking.openURL('tel:+919999999999') },
];

const POPULAR_TESTS = [
  { id: 't1', name: 'CBC (Complete Blood Count)', tests: 21, price: 319, mrp: 350, img: require('../../assets/figma/9728c4dd-2e53-4405-9d93-8156380914b7.png') },
  { id: 't2', name: 'Serum Prolactin', tests: 21, price: 319, mrp: 350, img: require('../../assets/figma/9728c4dd-2e53-4405-9d93-8156380914b8.png') },
];

const MOST_BOOKED_FILTERS = ['Packages', 'Tests'] as const;
const MOST_BOOKED = [
  { id: 'mb1', name: 'Comprehensive Gold Full Body Checkup Care Test on Some Text', tests: 21, price: 319, mrp: 350, off: '60% off', eta: 'Start in 30 minutes' },
  { id: 'mb2', name: 'Thyroid Profile', tests: 12, price: 799, mrp: 1200, off: '33% off', eta: 'Start in 30 minutes' },
  { id: 'mb3', name: 'Diabetes Care', tests: 9, price: 499, mrp: 699, off: '28% off', eta: 'Start in 30 minutes' },
];

const WOMEN_FILTERS = ['Kidz', 'Skin', 'Fitness', 'Pregnancy'] as const;
const WOMEN_CARE = [
  { id: 'wc1', name: 'PCOD', image: FIGMA_HWC_1 },
  { id: 'wc2', name: 'Fertility',image: FIGMA_HWC_2 },
  { id: 'wc3', name: 'Pregnancy Test', image: FIGMA_HWC_3 },
  { id: 'wc4', name: 'Pregnancy Ultrasound', image: FIGMA_HWC_4 },
  { id: 'wc5', name: 'Postpartum Care',  image: FIGMA_HWC_5 },
  { id: 'wc6', name: 'Menopause', image: FIGMA_HWC_6 },
];

const REVIEWS = [
  {
    id: 'r1',
    quote: 'Quick and easy to book. Got my report very quickly. Very reliable, convenient and fast service.',
    name: 'Syantika Manna',
    rating: 4.8,
    meta: '2 days ago • Delhi',
    avatar: FIGMA_AVATAR,
  },
  {
    id: 'r2',
    quote: 'Easy, hassle friendly with timely updates. The sample collection team was polite and professional.',
    name: 'Sonal Gupta',
    rating: 4.9,
    meta: '1 week ago • Mumbai',
    avatar: FIGMA_AVATAR,
  },
  {
    id: 'r3',
    quote: 'Smooth experience from booking to reports. Everything felt clear and dependable throughout.',
    name: 'Abhinav Rao',
    rating: 4.7,
    meta: '3 days ago • Hyderabad',
    avatar: FIGMA_AVATAR,
  },
];

const BLOGS = SHARED_BLOGS.slice(0, 2).map((blog) => ({
  id: blog.id,
  title: blog.title,
  img: blog.image,
  desc: blog.description,
}));

const VIDEOS = [
  { id: 'v1', title: 'Medicine Research', desc: 'Understand how diagnostics improve preventive care and faster treatment decisions.', image: FIGMA_VIDEO_1, duration: '03:12', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'v2', title: 'Nutrition Basics', desc: 'Simple nutrition habits that support energy, immunity and better daily health.', image: FIGMA_BLOG_1, duration: '02:48', url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U' },
];

const WHY_CHOOSE_ITEMS = [
  { id: 'w1', title: 'Fast & Reliable Reports', desc: 'Timely results to support better health decisions.', Icon: FIGMA_WCA_1 },
  { id: 'w2', title: 'Cutting-Edge Technology', desc: 'Timely results to support better health decisions.', Icon: FIGMA_WCA_2 },
  { id: 'w3', title: 'Expert Pathologists', desc: 'Timely results to support better health decisions.', Icon: FIGMA_WCA_3 },
  { id: 'w4', title: 'Widespread Network', desc: 'Timely results to support better health decisions.', Icon: FIGMA_WCA_4 },
] as const;

const SOCIAL_LINKS = [
  { id: 'instagram', label: 'Instagram', Icon: FIGMA_INSTAGRAM },
  { id: 'facebook', label: 'Facebook', Icon: FIGMA_FACEBOOK },
  { id: 'youtube', label: 'YouTube', Icon: FIGMA_YOUTUBE },
  { id: 'linkedin', label: 'LinkedIn', Icon: FIGMA_LINKEDIN },
] as const;

const LAB_PACKAGE_TABS = [
  { id: 'women', label: 'Women', image: FIGMA_WOMEN_1, contentKey: 'women' },
  { id: 'men', label: 'Men', image: FIGMA_WOMEN_2, contentKey: 'men' },
  { id: 'fever', label: 'Fever', image: FIGMA_WOMEN_3, contentKey: 'fever' },
  { id: 'lifestyle', label: 'Lifestyle', image: FIGMA_WOMEN_4, contentKey: 'lifestyle' },
  { id: 'test-2', label: 'Lifestyle', image: FIGMA_WOMEN_4, contentKey: 'lifestyle' },
  { id: 'test-3', label: 'Lifestyle', image: FIGMA_WOMEN_4, contentKey: 'lifestyle' },
  { id: 'test-4', label: 'Lifestyle', image: FIGMA_WOMEN_4, contentKey: 'lifestyle' },
] as const;

const LAB_PACKAGE_ITEMS = {
  women: [
    { id: 'w-kids', label: 'Kids', image: FIGMA_WOMEN_1 },
    { id: 'w-middle', label: 'Middle', image: FIGMA_WOMEN_2 },
    { id: 'w-adult', label: 'Adult', image: FIGMA_WOMEN_3 },
    { id: 'w-senior', label: 'Senior', image: FIGMA_WOMEN_4 },
    { id: 'test-w-1', label: 'Senior', image: FIGMA_WOMEN_4 },
    { id: 'test-w-2', label: 'Senior', image: FIGMA_WOMEN_4 },
    { id: 'test-w-3', label: 'Senior', image: FIGMA_WOMEN_4 },
  ],
  men: [
    { id: 'm-young', label: 'Young', image: FIGMA_WOMEN_2 },
    { id: 'm-adult', label: 'Adult', image: FIGMA_WOMEN_1 },
    { id: 'm-active', label: 'Active', image: FIGMA_WOMEN_4 },
    { id: 'm-senior', label: 'Senior', image: FIGMA_WOMEN_3 },
    { id: 'm-test-1', label: 'Senior', image: FIGMA_WOMEN_3 },
    { id: 'm-test-2', label: 'Senior', image: FIGMA_WOMEN_3 },
    { id: 'm-test-3', label: 'Senior', image: FIGMA_WOMEN_3 },
  ],
  fever: [
    { id: 'f-viral', label: 'Viral', image: FIGMA_WOMEN_3 },
    { id: 'f-kids', label: 'Kids', image: FIGMA_WOMEN_1 },
    { id: 'f-dengue', label: 'Dengue', image: FIGMA_WOMEN_2 },
    { id: 'f-seasonal', label: 'Seasonal', image: FIGMA_WOMEN_4 },
    { id: 'f-test-1', label: 'Seasonal', image: FIGMA_WOMEN_4 },
    { id: 'f-test-2', label: 'Seasonal', image: FIGMA_WOMEN_4 },
    { id: 'f-test-3', label: 'Seasonal', image: FIGMA_WOMEN_4 },
  ],
  lifestyle: [
    { id: 'l-fitness', label: 'Fitness', image: FIGMA_WOMEN_2 },
    { id: 'l-sleep', label: 'Sleep', image: FIGMA_WOMEN_4 },
    { id: 'l-adult', label: 'Adult', image: FIGMA_WOMEN_3 },
    { id: 'l-senior', label: 'Senior', image: FIGMA_WOMEN_1 },
    { id: 'l-test-1', label: 'Senior', image: FIGMA_WOMEN_1 },
    { id: 'l-test-2', label: 'Senior', image: FIGMA_WOMEN_1 },
    { id: 'l-test-3', label: 'Senior', image: FIGMA_WOMEN_1 },
  ],
} as const;

export default function HomeScreen({ navigation }: any) {
  const [popularFilter, setPopularFilter] = useState<'Popular' | 'Fever' | 'STD' | 'Vitamins' | 'Diabetes'>('Popular');
  const [mostBookedFilter, setMostBookedFilter] = useState<(typeof MOST_BOOKED_FILTERS)[number]>('Packages');
  const [womenFilter, setWomenFilter] = useState<(typeof WOMEN_FILTERS)[number]>('Kidz');
  const [labPackageTab, setLabPackageTab] = useState<(typeof LAB_PACKAGE_TABS)[number]['id']>('women');
  const [cartCount, setCartCount] = useState(0);
  const [mostBookedTabsWidth, setMostBookedTabsWidth] = useState(0);
  const [activeVideo, setActiveVideo] = useState<(typeof VIDEOS)[number] | null>(null);
  const [isPromoVisible, setPromoVisible] = useState(true);
  const sliderRef = useRef<FlatList>(null);
  const mostBookedThumbX = useRef(new Animated.Value(0)).current;
  const promoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addToCart = () => setCartCount((p) => p + 1);
  const activeLabPackageItems = useMemo(() => {
    const activeTab = LAB_PACKAGE_TABS.find((tab) => tab.id === labPackageTab);
    return activeTab ? LAB_PACKAGE_ITEMS[activeTab.contentKey] : [];
  }, [labPackageTab]);
  const mostBookedTabWidth = mostBookedTabsWidth / MOST_BOOKED_FILTERS.length;
  const mostBookedActiveIndex = MOST_BOOKED_FILTERS.indexOf(mostBookedFilter);

  useEffect(() => {
    Animated.timing(mostBookedThumbX, {
      toValue: mostBookedActiveIndex * mostBookedTabWidth,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [mostBookedActiveIndex, mostBookedTabWidth, mostBookedThumbX]);

  useEffect(() => {
    if (!isPromoVisible) return;

    promoTimeoutRef.current = setTimeout(() => {
      setPromoVisible(false);
    }, 500);

    return () => {
      if (promoTimeoutRef.current) {
        clearTimeout(promoTimeoutRef.current);
        promoTimeoutRef.current = null;
      }
    };
  }, [isPromoVisible]);

  const playActiveVideo = async () => {
    if (!activeVideo) return;
    await Linking.openURL(activeVideo.url);
  };

  const closePromo = useCallback(() => {
    if (promoTimeoutRef.current) {
      clearTimeout(promoTimeoutRef.current);
      promoTimeoutRef.current = null;
    }
    setPromoVisible(false);
  }, []);

  const handlePromoPress = useCallback(() => {
    closePromo();
    navigation.navigate('BookSlot');
  }, [closePromo, navigation]);

  return (
    <AppScreenWrapper>
      <View style={s.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Top Bar */}
        <View style={s.appContainer}>
          <View style={s.topBar}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
              <View style={s.avatar}>
                <Image source={FIGMA_AVATAR} style={s.avatarImg} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.name}>Hi Abhinav</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <IconLocation width={12} height={14} color={Colors.primary} />
                  <Text style={s.city}>Hyderabad</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={s.iconBtn} onPress={() => navigation.navigate('Notifications')} activeOpacity={0.8}>
              <IconNotification width={14} height={16} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={s.iconBtn} onPress={() => navigation.navigate('BookSlot')} activeOpacity={0.8}>
              <IconCart width={15} height={15} color={Colors.primary} />
              {cartCount > 0 ? <View style={s.cartDot} /> : null}
            </TouchableOpacity>
          </View>
        </View>

        {/* Search (as in Figma home) */}
        <View style={{ marginTop: 14 }}>
          <View style={s.appContainer}>
            <TouchableOpacity style={s.search} activeOpacity={1} onPress={() => navigation.navigate('Search')}>
              <Text style={s.searchPlaceholder}>Search for “Full body checkup”</Text>
              <IconSearch width={16} height={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Carousel */}
        <View style={{ marginTop: 16, paddingLeft: containerSpace }}>
          <HorizontalSlider
            data={SLIDES}
            itemWidth={(SW - 32) / 1.2}
            flatListRef={sliderRef}
            keyExtractor={(item) => item.id.toString()}
            showPagination
            contentContainerStyle={{ gap: 10, marginTop: 10 }}
            flatListProps={{
              pagingEnabled: true,
              decelerationRate: 'fast',
            }}
            paginationContainerStyle={s.dots}
            dotStyle={s.dot}
            activeDotStyle={s.dotOn}
            renderItem={(item) => (
              <View style={s.slideCard}>
                <Image source={item.source} style={s.slideImg} />
                <View style={s.slideCardWrap}>
                  <Text style={s.slideCardWrapTitle}>{item.title}</Text>
                  <Text style={s.slideCardWrapDesc}>{item.desc}</Text>
                </View>
              </View>
            )}
          />
        </View>

        {/* Reminder Card */}
        <View style={{ marginTop: 14 }}>
          <View style={s.appContainer}>
            <View style={s.reminder}>
              <Text style={s.reminderText}>Never Miss Your Home Sample Collection</Text>
                <View style={s.reminderImgWrap}>
                  <Image source={reminderAvtar} style={s.reminderImg} />
                </View>
              <LinearGradient colors={[Colors.primaryDark, Colors.primary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.reminderBtn}>
                <Ionicons name="notifications-outline" size={14} color={Colors.primaryDark} style={s.reminderBell} />
                <Text style={s.reminderBtnTxt}>Set reminder</Text>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={s.appContainer}>
          <View style={s.actionsWrap}>
            {ACTIONS.map((a) => (
              <TouchableOpacity key={a.id} activeOpacity={0.85} onPress={() => (a.onPress as any)(navigation)}>
                  <LinearGradient colors={[Colors.primaryDark, Colors.primary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.actionPill}>
                  <Ionicons name={a.icon as any} size={20} color={Colors.primary} style={s.actionIcon} />
                  <Text style={s.actionLabel}>{a.label}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Test */}
        <View style={{ marginTop: 18, paddingVertical: 20, backgroundColor: "#E9EFF6" }}>
          <View style={s.appContainer}>
            <View style={s.sectionRow}>
              <Text style={s.sectionTitle}>Popular Test</Text>
              <TouchableOpacity onPress={() => navigation.navigate('TestList')} activeOpacity={0.85}>
                <Text style={s.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.chipsRow}
              style={{ paddingLeft: containerSpace}}
            >
            {(['Popular', 'Fever', 'STD', 'Vitamins', 'Diabetes'] as const).map((c) => {
              const on = popularFilter === c;
              return (
                <TouchableOpacity key={c} style={[s.chip, on && s.chipOn]} onPress={() => setPopularFilter(c)} activeOpacity={0.85}>
                  <Text style={[s.chipTxt, on && s.chipTxtOn]}>{c}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <HorizontalSlider
            data={POPULAR_TESTS}
            itemWidth={(SW - 32) / 1.2}
            keyExtractor={(item) => item.id.toString()}
            showPagination
            contentContainerStyle={{ gap: 10, paddingLeft: containerSpace, marginTop: 22 }}
            paginationContainerStyle={s.dots}
            dotStyle={s.dot}
            activeDotStyle={s.dotOn}
            renderItem={(t) => (
              <View style={s.testCard}>
                <View style={s.testImgBox}>
                  <Image
                    source={t.img}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                  />
                </View>

                <View style={{ flex: 1, gap: 4, alignItems: 'flex-start' }}>
                  <Text style={s.testName}>{t.name}</Text>
                  <Text style={s.testSub}>Contains {t.tests} tests</Text>

                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6 }}>
                    <Text style={s.testPrice}>₹{t.price.toFixed(2)}</Text>
                    <Text style={s.testMrp}>/₹{t.mrp.toFixed(2)}</Text>
                  </View>

                  <TouchableOpacity
                    style={s.addBtn}
                    activeOpacity={0.85}
                    onPress={addToCart}
                  >
                    <Text style={s.addBtnTxt}>Add to cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>

        {/* Lab Tests & Packages */}
        <View style={{ marginTop: 40, }}>
          <View style={s.appContainer}>
            <View style={s.sectionRow}>
              <Text style={s.sectionTitle}>Lab Tests & Packages</Text>
              <TouchableOpacity onPress={() => navigation.navigate('TestList')} activeOpacity={0.85}>
                <Text style={s.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.labTabsRow}
            style={s.labTabsScroll}
          >
            {LAB_PACKAGE_TABS.map((tab) => {
              const isActive = labPackageTab === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  style={s.labTabItem}
                  activeOpacity={0.85}
                  onPress={() => setLabPackageTab(tab.id)}
                >
                  <View style={[s.labTabImageWrap, isActive && s.labTabImageWrapActive]}>
                    <Image source={tab.image} style={s.labTabImage} resizeMode="cover" />
                  </View>
                  <Text style={[s.labTabLabel, isActive && s.labTabLabelActive]}>{tab.label}</Text>
                  <View style={[s.labTabUnderline, isActive && s.labTabUnderlineActive]} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={s.labTabsDivider} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.labItemsRow}
            style={s.labItemsScroll}
          >
            {activeLabPackageItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={s.labItemCard}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('TestList')}
              >
                <View style={s.labItemImageWrap}>
                  <Image source={item.image} style={s.labItemImage} resizeMode="cover" />
                </View>
                <Text style={s.labItemLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Special Offers */}
        <View style={{ marginTop: 30, paddingHorizontal: 16 }}>
          <View style={s.offer}>
            <View style={{ gap: 14, flex: 1, paddingHorizontal: 10, paddingVertical: 15, paddingRight: 0 }}>
              <View style={{ gap: 5,}}>
                <Text style={s.offerSmall}>21% off on your First Test</Text>
                <Text style={s.offerBig}>Safe & Convenient sample collection by trained experts at your doorstep</Text>
              </View>
              <TouchableOpacity style={s.offerBtn} activeOpacity={0.85} onPress={() => navigation.navigate('TestList')}>
                <Text style={s.offerBtnTxt}>Book now</Text>
              </TouchableOpacity>
            </View>
            <View style={s.offerImg}>
              <Image source={FIGMA_OFFER_DOCTOR} style={s.offerImgInner} resizeMode="cover" />
            </View>
          </View>
        </View>

        {/* Most Booked */}
        <View style={s.appContainer}>
          <View style={{ marginTop: 30 }}>
            <View style={s.sectionRow}>
              <Text style={s.sectionTitle}>Most Booked Health Checkups</Text>
              <TouchableOpacity onPress={() => navigation.navigate('TestList')} activeOpacity={0.85}>
                <Text style={s.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <View
              style={s.segmentedControl}
              onLayout={(event) => setMostBookedTabsWidth(event.nativeEvent.layout.width)}
            >
              {mostBookedTabWidth > 0 ? (
                <Animated.View
                  pointerEvents="none"
                  style={[
                    s.segmentedThumb,
                    { width: mostBookedTabWidth - 6 },
                    { transform: [{ translateX: mostBookedThumbX }] },
                  ]}
                />
              ) : null}
              {MOST_BOOKED_FILTERS.map((f) => {
                const on = mostBookedFilter === f;
                return (
                  <TouchableOpacity
                    key={f}
                    style={s.segmentedTab}
                    onPress={() => setMostBookedFilter(f)}
                    activeOpacity={0.9}
                  >
                    <Text style={[s.segmentedLabel, on && s.segmentedLabelActive]}>{f}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <HorizontalSlider
              data={MOST_BOOKED}
              itemWidth={(SW - 32 - 12) / 2}
              keyExtractor={(item) => item.id}
              showPagination
              contentContainerStyle={{ gap: 12, marginTop: 20 }}
              paginationContainerStyle={s.dots}
              dotStyle={s.dot}
              activeDotStyle={s.dotOn}
              renderItem={(t) => (
                <View style={s.mbCard}>
                  <Image source={FIGMA_MOST_BOOKED_IMG} style={s.mbImg} resizeMode="contain" />
                  <View style={{ gap: 4 }}>
                    <Text style={s.mbName} numberOfLines={2}>{t.name}</Text>
                    <Text style={s.mbSub}>Contains {t.tests} tests</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <Text style={s.mbPrice}>₹{t.price.toFixed(2)}</Text>
                        <Text style={s.mbMrp}>/₹{t.mrp.toFixed(2)}</Text>
                      </View>
                      <Text style={s.mboff}>{t.off}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={s.mbBtn} activeOpacity={0.85} onPress={addToCart}>
                    <Text style={s.mbBtnTxt}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>

        {/* Fast home collection banner (present below Most Booked in Figma) */}
        <View style={s.appContainer}>
          <View style={{ marginTop: 25}}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('BookSlot')}>
              <LinearGradient colors={['#9E242D', '#9E242D']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.fastBanner}>
                <View style={{ flex: 1, gap: 15, paddingHorizontal: 10, paddingVertical: 15, paddingRight: 0  }}>
                  <View style={{ gap: 5 }}>
                    <Text style={s.fastTitle}>Self-Assessment</Text>
                    <Text style={s.fastSub}>Answer a few questions to assess your health.</Text>
                  </View>
                  <View style={s.fastCta}>
                    <Text style={s.fastCtaTxt}>Self-Assessment</Text>
                  </View>
                </View>
                <View style={s.fastImgWrap}>
                  <Image source={FIGMA_HOME_COLLECTION} style={s.fastImg} resizeMode="cover" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Holistic Women Care */}
        <View style={s.appContainer}>
          <View style={{ marginTop: 25, }}>
            <View style={s.sectionRow}>
              <Text style={s.sectionTitle}>Holistic Women Care</Text>
              <TouchableOpacity onPress={() => navigation.navigate('TestList')} activeOpacity={0.85}>
                <Text style={s.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
              <View style={{ marginTop: 22, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', rowGap: 27 }}>
                {WOMEN_CARE.map((it) => (
                  <View key={it.id} style={s.wcCard}>
                    <View style={s.wcImgWrap}>
                      <Image source={it.image} style={s.wcImg} resizeMode="cover" />
                    </View>
                    <Text style={s.wcName}>{it.name}</Text>
                  </View>
                ))}
              </View>
          </View>
        </View>

        {/* Reviews */}
        <View style={{ marginTop: 30, paddingVertical: 25, backgroundColor: "#E9EFF6" }}>
          <View style={s.appContainer}>
            <View style={s.sectionRow}>
              <Text style={s.sectionTitle}>Reviews and Testimonials</Text>
            </View>
          </View>
          <View style={{paddingLeft: containerSpace}}>
            <HorizontalSlider
              data={REVIEWS}
              itemWidth={SW * 0.72}
              keyExtractor={(item) => item.id}
              showPagination
              contentContainerStyle={{ gap: 14, marginTop: 20 }}
              paginationContainerStyle={s.reviewDots}
              dotStyle={s.reviewDot}
              activeDotStyle={s.reviewDotActive}
              renderItem={(item) => (
                <Card style={s.reviewCard}>
                  <Image source={FIGMA_VECTOR_B} style={s.reviewBg} resizeMode="contain" />
                  <Text style={s.reviewText}>{item.quote}</Text>
                  <View style={s.reviewFooter}>
                    <Image source={item.avatar} style={s.reviewAvatar} />
                    <View style={{ flex: 1, gap: 5, alignItems: 'flex-start' }}>
                      <View style={s.reviewRatingRow}>
                        <Ionicons name="star" size={12} color="#F5B100" />
                        <Text style={s.reviewRating}>{item.rating.toFixed(1)}</Text>
                      </View>
                      <Text style={s.reviewBy}>{item.name}</Text>
                      <Text style={s.reviewMeta}>{item.meta}</Text>
                    </View>
                  </View>
                </Card>
              )}
            />
          </View>
        </View>

        {/* Blogs */}
        <View style={{ marginTop: 28 }}>
          <View style={s.appContainer}>
            <View style={s.sectionRow}>
              <Text style={s.sectionTitle}>Blogs</Text>
              <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('AllBlog')}>
                <Text style={s.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingLeft: containerSpace }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, marginTop: 18, paddingRight: containerSpace }}>
              {BLOGS.map((b) => (
                <TouchableOpacity key={b.id} style={s.blogCard} activeOpacity={0.92} onPress={() => navigation.navigate('BlogDetail', { blogId: b.id })}>
                  <View style={s.blogImgWrap}>
                    <Image source={b.img} style={s.blogImg} resizeMode="cover" />
                  </View>
                  <View style={{gap: 4}}> 
                    <Text style={s.blogTitle} numberOfLines={1} ellipsizeMode="tail">{b.title}</Text>
                    <Text style={s.blogDesc} numberOfLines={1} ellipsizeMode="tail">{b.desc}</Text>
                  </View>
                  <TouchableOpacity style={s.blogBtn} activeOpacity={0.85} onPress={() => navigation.navigate('BlogDetail', { blogId: b.id })}>
                    <Text style={s.blogBtnTxt}>Read More</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Video */}
        <View style={{ marginTop: 28 }}>
          <View style={s.appContainer}>
            <View style={s.sectionRow}>
              <Text style={s.sectionTitle}>Video</Text>
            </View>
          </View>
          <View style={{ paddingLeft: containerSpace }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, marginTop: 18, paddingRight: containerSpace }}>
              {VIDEOS.map((v) => (
                <TouchableOpacity key={v.id} style={s.videoCard} activeOpacity={0.9} onPress={() => setActiveVideo(v)}>
                  <View style={s.videoImg}>
                    <Image source={v.image} style={s.videoThumb} resizeMode="cover" />
                    <View style={s.videoOverlay} />
                    {/* <View style={s.videoDuration}>
                      <Text style={s.videoDurationTxt}>{v.duration}</Text>
                    </View> */}
                    <View style={s.playWrap}>
                      <Ionicons name="play" size={18} color={Colors.greyText} />
                    </View>
                  </View>
                  <View style={{gap: 4}}>
                    <Text style={s.blogTitle}>{v.title}</Text>
                    <Text style={s.blogDesc}>{v.desc}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Why Choose */}
        <View style={s.whySection}>
          <Text style={s.whyTitle}>Why Choose Ampath?</Text>
          <Text style={s.whyIntro}>
            We combine cutting-edge technology with expert care to deliver precise and timely reports, empowering you to make informed health decisions.
          </Text>
          <View style={s.whyRow}>
            {WHY_CHOOSE_ITEMS.map((w) => (
              <View key={w.id} style={s.whyItem}>
                <View style={s.whyIcon}>
                  <w.Icon width={22} height={22} />
                </View>
                <Text style={s.whyLabel}>{w.title}</Text>
                <View style={s.whyDivider} />
                <Text style={s.whyDesc}>{w.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{marginTop: 42, paddingBottom: 45, flexDirection: 'row'}}>
          {SOCIAL_LINKS.map((item) => (
            <TouchableOpacity key={item.id} style={s.socialItem} activeOpacity={0.85}>
              <View style={s.socialIconOuter}>
                <item.Icon width={25} height={25} preserveAspectRatio="xMidYMid meet" />
              </View>
              <Text style={s.socialLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating chat */}
      <TouchableOpacity style={s.chatFab} activeOpacity={0.85} onPress={() => navigation.navigate('ContactUs')}>
        <ChatbotIcon width={"100%"} height={"100%"} />
      </TouchableOpacity>

      <Modal visible={isPromoVisible} transparent animationType="fade" onRequestClose={closePromo}>
        <Pressable style={s.promoBackdrop} onPress={closePromo}>
          <Pressable style={s.promoShell} onPress={(event) => event.stopPropagation()}>
            <TouchableOpacity style={s.promoCard} activeOpacity={0.96} onPress={handlePromoPress}>
              <Image source={FIGMA_PROMO_AD} style={s.promoImage} resizeMode="cover" />
            </TouchableOpacity>
            <TouchableOpacity style={s.promoCloseBtn} activeOpacity={0.85} onPress={closePromo}>
              <Ionicons name="close" size={18} color={Colors.white} />
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal visible={!!activeVideo} transparent animationType="fade" onRequestClose={() => setActiveVideo(null)}>
        <Pressable style={s.videoModalBackdrop} onPress={() => setActiveVideo(null)}>
          <Pressable style={s.videoModalCard} onPress={(event) => event.stopPropagation()}>
            {activeVideo ? (
              <>
                <View style={s.videoModalImageWrap}>
                  <Image source={activeVideo.image} style={s.videoModalImage} resizeMode="cover" />
                  <View style={s.videoModalOverlay} />
                  <TouchableOpacity style={s.videoModalPlay} activeOpacity={0.9} onPress={playActiveVideo}>
                    <Ionicons name="play" size={22} color={Colors.white} />
                  </TouchableOpacity>
                </View>
                <View style={s.videoModalBody}>
                  <Text style={s.videoModalTitle}>{activeVideo.title}</Text>
                  <Text style={s.videoModalDesc}>{activeVideo.desc}</Text>
                  <Text style={s.videoModalMeta}>Dummy preview only. Tap play to open the sample video link.</Text>
                  <View style={s.videoModalActions}>
                    <TouchableOpacity style={s.videoModalPrimaryBtn} activeOpacity={0.9} onPress={playActiveVideo}>
                      <Text style={s.videoModalPrimaryTxt}>Play video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.videoModalGhostBtn} activeOpacity={0.9} onPress={() => setActiveVideo(null)}>
                      <Text style={s.videoModalGhostTxt}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>
      </View>
    </AppScreenWrapper>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  appContainer: { paddingLeft: containerSpace, paddingRight: containerSpace},
  topBar: { paddingTop: Platform.OS === 'ios' ? 80 : (RNStatusBar.currentHeight || 44) + 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 38, height: 38, borderRadius: 20, backgroundColor: '#EBF3FA', overflow: 'hidden' },
  avatarImg: { width: 38, height: 38 },
  name: { fontFamily: FontFamily.semiBold, fontSize: 16,marginBottom: 2, color: Colors.greyText },
  city: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primary },
  iconBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  cartDot: { position: 'absolute', top: 8, right: 9, width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.error },
  slideCard: { aspectRatio: 323/112, width: "100%", borderRadius: 14, overflow: 'hidden', backgroundColor: '#111', position: 'relative', boxShadow: "0px 4px 11px 0px #00000017" },
  slideImg: { width: '100%' as any, height: '100%' as any, opacity: 0.5 },
  slideCardWrap: { width: 200, position: 'absolute', left: 0, bottom: 0, right: 0, padding: 10},
  slideCardWrapTitle: { fontSize: 12, color: Colors.white, marginBottom: 3, fontFamily: FontFamily.medium },
  slideCardWrapDesc: { fontSize: 8, color: Colors.white, fontFamily: FontFamily.regular},
  dots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16},
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#C4C4C4', marginHorizontal: 4,},
  dotOn: { width: 24, height: 8, borderRadius: 4, backgroundColor: Colors.primary, },
  search: { height: 40, backgroundColor: '#ffffff', borderRadius: 12, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderColor: '#E9EFF6', borderWidth: 1, },
  searchPlaceholder: { fontFamily: FontFamily.regular, fontSize: 10, color: '#616161' },
  reminder: { backgroundColor: '#D9ECFF', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 0, paddingTop: 10, paddingLeft: 10, paddingRight: 10, height: 97, marginTop: 18 },
  reminderText: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primaryDark, width: 108, paddingBottom: 15, paddingTop: 4, lineHeight: 17 },
  reminderImgWrap: {flexShrink: 1, flexBasis: 'auto', aspectRatio: 84/87, height: "100%", },
  reminderImg: { width: "100%", height: "100%" },
  reminderBtn: { flex: 1, height: 40, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, marginLeft: 14 },
  reminderBell: { backgroundColor: Colors.white, borderRadius: 10, padding: 3 },
  reminderBtnTxt: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.white,},
  actionsWrap: { marginTop: 14, flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' },
  actionIcon: { width: 32, height: 32, borderRadius: "50%", backgroundColor: Colors.white, padding: 5 },
  actionPill: { width: (SW - 42) / 2, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 10, borderColor: '#BBCEE2', borderWidth: 1 },
  actionLabel: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.white, flex: 1 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  seeAll: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primary },
  segmentedControl: { marginTop: 14, flexDirection: 'row', alignItems: 'center', padding: 3, borderRadius: 999, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#D9E2EC', position: 'relative' },
  segmentedThumb: { position: 'absolute', top: 3, bottom: 3, left: 3, borderRadius: 999, backgroundColor: Colors.primary, shadowColor: '#0F6BD9', shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 2 },
  segmentedTab: { flex: 1, minHeight: 48, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  segmentedLabel: { fontFamily: FontFamily.medium, fontSize: 14, color: '#6B7280' },
  segmentedLabelActive: { color: Colors.white },
  chipsRow: { flexDirection: 'row', gap: 10, marginTop: 15 },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: Colors.white, borderColor: "#DEE7F1", borderWidth: 1 },
  chipOn: { backgroundColor: Colors.white, borderColor: Colors.primaryDark, boxShadow: "1px 2px 4px 0px #00AAFF24"},
  chipTxt: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.greyNormal },
  chipTxtOn: { color: Colors.primaryDark },
  testCard: { borderRadius: 16, borderWidth: 1, borderColor: '#E6E6E6', backgroundColor: '#ffffff', padding: 12, flexDirection: 'row', gap: 9, alignItems: 'flex-start' },
  testImgBox: {  flexGrow: 0, flexShrink: 1, ...(Platform.OS === 'ios'  ? { width: '25%' } : { flexBasis: '25%' }), aspectRatio: 1, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EBF3FA' },
  testName: { fontFamily: FontFamily.medium, fontSize: 13, color: Colors.primaryDark },
  testSub: { fontFamily: FontFamily.regular, fontSize: 11, color: Colors.greyNormal },
  testPrice: { fontFamily: FontFamily.semiBold, fontSize: 13, color: Colors.primaryDark },
  testMrp: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.greyNormal },
  addBtn: { backgroundColor: Colors.primaryDark, borderRadius: 30, paddingVertical: 8, paddingHorizontal: 22, marginTop: 10 },
  addBtnTxt: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.white },
  labTabsScroll: { marginTop: 20, marginLeft: containerSpace },
  labTabsRow: { gap: 22, paddingRight: 16 },
  labTabItem: { alignItems: 'center', minWidth: 58 },
  labTabImageWrap: { width: 52, height: 52, borderRadius: 16, backgroundColor: '#EEF5FD', overflow: 'hidden', marginBottom: 6 },
  labTabImageWrapActive: { backgroundColor: '#E4F0FF' },
  labTabImage: { width: '100%', height: '100%' },
  labTabLabel: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.greyNormal, textAlign: 'center' },
  labTabLabelActive: { color: Colors.primary },
  labTabUnderline: { width: 56, height: 2, borderRadius: 2, backgroundColor: 'transparent', marginTop: 10 },
  labTabUnderlineActive: { backgroundColor: Colors.primary },
  labTabsDivider: { height: 1, backgroundColor: '#D9E3EE', marginTop: -1 },
  labItemsScroll: { marginTop: 16, marginLeft: containerSpace },
  labItemsRow: { gap: 18, paddingRight: 16 },
  labItemCard: { alignItems: 'center', width: 62 },
  labItemImageWrap: { width: 62, height: 62, borderRadius: 18, backgroundColor: '#EEF5FD', overflow: 'hidden', marginBottom: 8 },
  labItemImage: { width: '100%', height: '100%' },
  labItemLabel: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark, textAlign: 'center' },
  offer: { backgroundColor: '#B02832', borderRadius: 14, flexDirection: 'row', gap: 14, overflow: 'hidden', boxShadow: '0px 4px 11px 0px #00000017' },
  offerSmall: { fontFamily: FontFamily.medium, fontSize: 14, color: '#fff' },
  offerBig: { fontFamily: FontFamily.regular, fontSize: 10, color: '#fff' },
  offerBtn: { backgroundColor: '#fff', borderRadius: 30, paddingVertical: 8, paddingHorizontal: 26, alignSelf: 'flex-start' },
  offerBtnTxt: { fontFamily: FontFamily.medium, fontSize: 13, color: '#2C2C2C' },
  offerImg: { flexGrow: 0, flexShrink: 1, ...(Platform.OS === 'ios'  ? { width: '42%' } : { flexBasis: '42%' }), aspectRatio: 136/118, backgroundColor: 'rgba(255,255,255,0.2)', overflow: 'hidden' },
  offerImgInner: { width: "100%", height: "100%" },
  mbCard: { borderRadius: 20, backgroundColor: '#FFFFFF', padding: 11, gap: 8, borderColor: "#E6E6E6", borderWidth: 1 },
  mbImg: { height: 93, width: "100%", borderRadius: 10, backgroundColor: '#D9ECFF' },
  mbIconBox: { width: 46, height: 46, borderRadius: 12, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center' },
  mbIconImg: { width: 26, height: 26 },
  mbName: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.black, minHeight: 36 },
  mbSub: { fontFamily: FontFamily.regular, fontSize: 10, color: '#737373' },
  mbPrice: { fontFamily: FontFamily.semiBold, fontSize: 12, color: Colors.primaryDark },
  mbMrp: { fontFamily: FontFamily.medium, fontSize: 10, color: '#616161'},
  mboff: { fontFamily: FontFamily.medium, fontSize: 10, color: Colors.red},
  mbBtn: { marginTop: 6, backgroundColor: Colors.primaryDark, borderRadius: 20, height: 28, paddingHorizontal: 18, justifyContent: 'center', },
  mbBtnTxt: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.white, textAlign: 'center' },
  fastBanner: { borderRadius: 14, flexDirection: 'row', gap: 38, overflow: 'hidden', minHeight: 112 },
  fastTitle: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.white },
  fastSub: { fontFamily: FontFamily.regular, fontSize: 12, color: 'rgba(255,255,255,0.85)', maxWidth: 210 },
  fastCta: { backgroundColor: '#fff', borderRadius: 30, paddingVertical: 8, paddingHorizontal: 16, alignSelf: 'flex-start' },
  fastCtaTxt: { fontFamily: FontFamily.medium, fontSize: 13, color: '#2C2C2C' },
  fastImgWrap: { flexGrow: 0, flexShrink: 1, ...(Platform.OS === 'ios'  ? { width: '47%' } : { flexBasis: '42%' }),  aspectRatio: 136/112, height: "100%", overflow: 'hidden' },
  fastImg: { width: "100%", height: "100%" },
  wcCard: { width: "32%", gap: 8, alignItems: 'center'},
  wcImgWrap: { height: 108, width: 108, borderRadius: 20, backgroundColor: '#F7EAEB', overflow: 'hidden' },
  wcImg: { height: "100%", width: "100%" },
  wcName: { fontFamily: FontFamily.medium, fontSize: 11, color: Colors.greyDark, textAlign: 'center' },
  wcPrice: { fontFamily: FontFamily.semiBold, fontSize: 12, color: Colors.primaryDark },
  reviewCard: { borderRadius: 20, backgroundColor: Colors.white, paddingVertical: 18, paddingHorizontal: 16, gap: 12, minHeight: 186, overflow: 'hidden' },
  reviewBg: { position: 'absolute', top: 10, left: 10, width: '25%', aspectRatio: 69/49},
  reviewText: { ...Typography.body2, color: Colors.greyNormal, lineHeight: 18 },
  reviewFooter: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 'auto' },
  reviewAvatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#E5EEF8' },
  reviewRatingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#E9EFF6', borderRadius: 10, paddingHorizontal: 4, paddingVertical: 2 },
  reviewRating: { fontFamily: FontFamily.medium, fontSize: 11, color: Colors.primary },
  reviewBy: { fontFamily: FontFamily.semiBold, fontSize: 16, color: Colors.primary },
  reviewMeta: { fontFamily: FontFamily.regular, fontSize: 11, color: '#7B8794' },
  reviewDots: { marginTop: 18 },
  reviewDot: { width: 8, height: 8, borderRadius: 999, backgroundColor: '#C8D1DD', marginHorizontal: 3 },
  reviewDotActive: { width: 16, backgroundColor: Colors.primary },
  blogCard: { width: 253, borderRadius: 10, backgroundColor: '#E9EFF6', padding: 11, gap: 10 },
  blogImgWrap: { width: "100%", aspectRatio: 233/93, borderRadius: 10, backgroundColor: '#D9ECFF' },
  blogImg: { height: 93, borderRadius: 10, backgroundColor: '#D9ECFF' },
  blogTitle: { fontFamily: FontFamily.semiBold, fontSize: 14, color: Colors.black },
  blogDesc: { fontFamily: FontFamily.regular, fontSize: 10, color: '#282828' },
  blogBtn: { alignSelf: 'flex-start', borderWidth: 0.5, borderColor: Colors.primary, borderRadius: 20, height: 28, paddingHorizontal: 18, justifyContent: 'center', backgroundColor: 'transparent' },
  blogBtnTxt: { fontFamily: FontFamily.semiBold, fontSize: 12, color: Colors.greyText },
  videoCard: { width: 253, borderRadius: 10, backgroundColor: '#E9EFF6', padding: 11, gap: 10 },
  videoImg: { height: 115, borderRadius: 10, backgroundColor: '#D9ECFF', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' },
  videoThumb: { width: '100%', height: '100%' },
  videoOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(13, 28, 42, 0.26)' },
  videoDuration: { position: 'absolute', right: 10, bottom: 10, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, backgroundColor: 'rgba(0,0,0,0.58)' },
  videoDurationTxt: { fontFamily: FontFamily.medium, fontSize: 10, color: Colors.white },
  playWrap: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', position: 'absolute' },
  promoBackdrop: { flex: 1, backgroundColor: 'rgba(8, 17, 30, 0.52)', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 },
  promoShell: { width: '100%', maxWidth: 360, position: 'relative' },
  promoCard: { width: '100%', borderRadius: 18, overflow: 'hidden', backgroundColor: Colors.white, ...Shadow.lg, justifyContent: 'center' },
  promoImage: { width: '100%', minWidth: '100%', aspectRatio: 500 / 627, backgroundColor: '#D9ECFF' },
  promoCloseBtn: { position: 'absolute', top: 12, right: 12, width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(26, 54, 93, 0.58)', alignItems: 'center', justifyContent: 'center' },
  videoModalBackdrop: { flex: 1, backgroundColor: 'rgba(8, 17, 30, 0.72)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  videoModalCard: { width: '100%', maxWidth: 360, borderRadius: 24, backgroundColor: Colors.white, overflow: 'hidden' },
  videoModalImageWrap: { aspectRatio: 16 / 9, backgroundColor: '#D9ECFF', position: 'relative' },
  videoModalImage: { width: '100%', height: '100%' },
  videoModalOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(8, 17, 30, 0.28)' },
  videoModalPlay: { position: 'absolute', top: '50%', left: '50%', width: 60, height: 60, borderRadius: 30, marginLeft: -30, marginTop: -30, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.28)' },
  videoModalBody: { padding: 18, gap: 10 },
  videoModalTitle: { fontFamily: FontFamily.semiBold, fontSize: 18, color: Colors.greyText },
  videoModalDesc: { fontFamily: FontFamily.regular, fontSize: 13, color: Colors.greyNormal, lineHeight: 20 },
  videoModalMeta: { fontFamily: FontFamily.regular, fontSize: 11, color: '#7B8794' },
  videoModalActions: { flexDirection: 'row', gap: 10, marginTop: 6 },
  videoModalPrimaryBtn: { flex: 1, height: 44, borderRadius: 22, backgroundColor: Colors.primaryDark, alignItems: 'center', justifyContent: 'center' },
  videoModalPrimaryTxt: { fontFamily: FontFamily.medium, fontSize: 13, color: Colors.white },
  videoModalGhostBtn: { flex: 1, height: 44, borderRadius: 22, backgroundColor: '#EFF4FA', alignItems: 'center', justifyContent: 'center' },
  videoModalGhostTxt: { fontFamily: FontFamily.medium, fontSize: 13, color: Colors.primaryDark },
  whySection: { marginTop: 28, paddingHorizontal: 16, gap: 10 },
  whyTitle: { fontFamily: FontFamily.semiBold, fontSize: 16, color: Colors.greyText },
  whyIntro: { fontFamily: FontFamily.regular, fontSize: 12, color: '#6F7782', lineHeight: 18, maxWidth: 320 },
  whyRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 22, columnGap: 14, marginTop: 8 },
  whyItem: { width: '47%', gap: 10 },
  whyIcon: { width: 50, height: 50, borderRadius: 24, backgroundColor: '#DAEDFF', alignItems: 'center', justifyContent: 'center', borderWidth: 5, borderColor: '#F2F8FF' },
  whyLabel: { fontFamily: FontFamily.medium, fontSize: 13, color: Colors.greyText, lineHeight: 15 },
  whyDivider: { width: '100%', height: 1, backgroundColor: '#E4EAF2' },
  whyDesc: { fontFamily: FontFamily.regular, fontSize: 12, color: '#6F7782', lineHeight: 17 },
  socialItem: { flex: 1, alignItems: 'center', gap: 10 },
  socialIconOuter: { width: 60, height: 60, borderRadius: "50%", backgroundColor: '#DAEDFF', alignItems: 'center', justifyContent: 'center', borderWidth: 8, borderColor: '#F2F8FF' },
  socialLabel: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark, textAlign: 'center' },
  chatFab: { position: 'absolute', right: 18, bottom: 108, width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', ...Shadow.md },
});
