import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, StatusBar as RNStatusBar, Image, Animated, Easing, LayoutAnimation, UIManager } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontFamily, Shadow, Typography } from '../../theme';
import { DecorativeEllipses, Button, Card } from '../../components';
import IconSlot from '../../assets/icons/icon-slot.svg';

const TEST_ICON = require('../../assets/figma/2b85d1c5-5300-46db-b7dd-57d9f5b6cd73.png');

type HistoryItem = {
  id: string;
  title: string;
  status: 'pending' | 'done';
  timeLabel?: string;
  time?: string;
  helper?: string;
  person?: string;
  showChevron?: boolean;
};

export default function OrderDetailUpcomingScreen({ navigation }: any) {
  const [openId, setOpenId] = useState<string | null>('h1');
  const progressAnim = useRef(new Animated.Value(0)).current;
  const history: HistoryItem[] = useMemo(() => ([
    { id: 'h1', title: 'Report Ready', status: 'pending', time: '08:30am | Tomorrow', showChevron: true },
    { id: 'h2', title: 'In Lab', status: 'done', time: '08:30pm | Today', showChevron: true },
    { id: 'h3', title: 'Sample collected', status: 'done', time: '06:30pm | Today', showChevron: true },
    { id: 'h4', title: 'On the way', status: 'done', timeLabel: 'Reach at', time: '04:30pm | Today' },
    { id: 'h5', title: 'Collector Assigned', status: 'done', person: 'Amit Sharma', timeLabel: 'Reach at', time: '05:30pm | Today' },
    { id: 'h6', title: 'Test Booked', status: 'done', helper: 'Full Body Check-up', showChevron: true },
  ]), []);
  const completedIndex = useMemo(() => {
    let lastDoneIndex = -1;
    history.forEach((item, index) => {
      if (item.status === 'done') lastDoneIndex = index;
    });
    return lastDoneIndex;
  }, [history]);

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: completedIndex >= 0 ? completedIndex + 1 : 0,
      duration: 450,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [completedIndex, progressAnim]);

  const toggleAccordion = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />

      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.headerBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="chevron-back" size={22} color={Colors.greyText} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Back</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 160, gap: 18 }}>
        <View style={s.infoCard}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={s.iconBox}>
              <Image source={TEST_ICON} style={{ width: 34, height: 34 }} resizeMode="contain" />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={s.testTitle}>CBC (Complete Blood Count )</Text>
              <Text style={s.testSub}>Contains 21 tests • Also called CRP Test</Text>
              <Text style={s.testSmall}>Reports within 18 hours</Text>
            </View>
          </View>

          <View style={s.hr} />

          <View style={s.row2}>
            <View style={s.rowItem}>
              <View style={s.rowIconCircle}>
                <IconSlot width={16} height={16} color={Colors.primaryDark} />
              </View>
              <View>
                <Text style={s.rowLabel}>Slot</Text>
                <Text style={s.rowValue}>21 Aug | at 05:00-06:00am</Text>
              </View>
            </View>
            <View style={s.rowItem}>
              <View style={s.rowIconCircle}>
                <Ionicons name="home-outline" size={16} color={Colors.primaryDark} />
              </View>
              <View>
                <Text style={s.rowLabel}>Collection Type</Text>
                <Text style={s.rowValueLink}>Home</Text>
              </View>
            </View>
          </View>

          <View style={s.hr} />

          <View style={{ gap: 10 }}>
            <Text style={s.blockTitle}>Patient Details</Text>
            <Text style={s.blockValue}>Abhinav (Self)</Text>
            <Text style={s.blockValue}>+91 987654321</Text>
          </View>

          <View style={s.hr} />

          <View style={{ gap: 10 }}>
            <Text style={s.blockTitle}>Address</Text>
            <Text style={s.blockValue}>H-221 Noida Sector 55 201301</Text>
          </View>

          <View style={s.hr} />

          <View style={{ gap: 10 }}>
            <Text style={s.blockTitle}>Payment</Text>
            <Text style={s.paid}>Paid Online</Text>
          </View>
        </View>

        <View style={{ gap: 12, marginTop: 23 }}>
          <Text style={s.sectionTitle}>History</Text>

          <View style={s.historyWrap}>
            <View>
              {history.map((h, index) => {
                const isCollapsible = !!h.showChevron;
                const isOpen = isCollapsible ? openId === h.id : true;
                const dotStyle = h.status === 'pending' ? s.dotPending : s.dotDone;
                const isBeforeCompleted = completedIndex >= 0 && index < completedIndex;
                const isCurrentCompleted = index === completedIndex;
                const lineFillHeight = progressAnim.interpolate({
                  inputRange: [index, index + 1],
                  outputRange: ['0%', '100%'],
                  extrapolate: 'clamp',
                });
                return (
                  <View key={h.id} style={s.historyRow}>
                    <View style={s.railWrap}>
                      {index < history.length - 1 ? (
                        <View style={s.railTrack}>
                          <Animated.View
                            style={[
                              s.railFill,
                              { height: isBeforeCompleted ? '100%' : isCurrentCompleted ? lineFillHeight : '0%' },
                            ]}
                          />
                        </View>
                      ) : null}
                      <View style={[s.dot, dotStyle]} />
                    </View>
                    <Card style={s.histCard}>
                      {isCollapsible ? (
                        <TouchableOpacity
                          style={s.histHeader}
                          activeOpacity={0.85}
                          onPress={() => toggleAccordion(h.id)}
                        >
                          <Text style={s.histTitle}>{h.title}</Text>
                          <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.greyNormal} />
                        </TouchableOpacity>
                      ) : (
                        <View style={s.histHeader}>
                          <Text style={s.histTitle}>{h.title}</Text>
                        </View>
                      )}

                      {isOpen ? (
                        <>
                          {h.person ? <Text style={s.histPerson}>{h.person}</Text> : null}
                          {h.helper ? <Text style={s.histHelper}>{h.helper}</Text> : null}
                          {h.time ? (
                            <View style={s.histTimeRow}>
                              {h.timeLabel ? <Text style={s.histMeta}>{h.timeLabel}</Text> : null}
                              <Ionicons name="time-outline" size={14} color="#71717A" />
                              <Text style={s.histTime}>{h.time}</Text>
                            </View>
                          ) : null}
                        </>
                      ) : null}
                    </Card>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={s.bottomBar}>
        <Button title="Call" onPress={() => {}} style={{ backgroundColor: Colors.primaryDark }} />
        <Button title="View Report Once Ready" onPress={() => navigation.navigate('ViewReport')} variant="outline" style={{ borderColor: Colors.primaryDark }} textStyle={{ color: Colors.primaryDark }} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { paddingTop: Platform.OS === 'ios' ? 56 : (RNStatusBar.currentHeight || 44) + 12, paddingHorizontal: 16, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  infoCard: { borderRadius: 16, borderWidth: 1, borderColor: '#E4E4E7', padding: 12, backgroundColor: Colors.white },
  iconBox: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#EBF3FA', alignItems: 'center', justifyContent: 'center' },
  testTitle: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primaryDark },
  testSub: { fontFamily: FontFamily.regular, fontSize: 12, color: '#4C4C4C' },
  testSmall: { fontFamily: FontFamily.regular, fontSize: 10, color: '#4C4C4C' },
  hr: { height: 1, backgroundColor: '#E6E6E6', opacity: 0.8, marginVertical: 12 },
  row2: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  rowItem: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  rowIconCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { fontFamily: FontFamily.regular, fontSize: 10, color: '#4C4C4C' },
  rowValue: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark, marginTop: 2 },
  rowValueLink: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark, marginTop: 2, textDecorationLine: 'underline' },
  blockTitle: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark },
  blockValue: { fontFamily: FontFamily.regular, fontSize: 14, color: '#666' },
  paid: { fontFamily: FontFamily.medium, fontSize: 12, color: '#21AC61' },
  sectionTitle: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  historyWrap: { paddingLeft: 2 },
  historyRow: { flexDirection: 'row', gap: 12, alignItems: 'stretch', paddingBottom: 12 },
  railWrap: { width: 18, alignItems: 'center', position: 'relative', paddingTop: 24 },
  railTrack: { position: 'absolute', top: 24, bottom: -40, width: 2, backgroundColor: '#D8E0EA', borderRadius: 999, overflow: 'hidden' },
  railFill: { position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: Colors.primaryDark, borderRadius: 999 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  dotPending: { backgroundColor: Colors.white, borderWidth: 2, borderColor: Colors.primaryDark },
  dotDone: { backgroundColor: '#34C759' },
  histCard: { flex: 1, borderRadius: 12, borderWidth: 1, borderColor: '#E6EAF0', paddingVertical: 12, paddingHorizontal: 14, backgroundColor: Colors.white },
  histHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  histTitle: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primaryDark },
  histPerson: { fontFamily: FontFamily.medium, fontSize: 13, color: Colors.primaryDark, marginTop: 4 },
  histHelper: { fontFamily: FontFamily.regular, fontSize: 14, color: '#71717A', marginTop: 4 },
  histTimeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6, flexWrap: 'wrap' },
  histMeta: { fontFamily: FontFamily.regular, fontSize: 12, color: '#71717A' },
  histTime: { fontFamily: FontFamily.regular, fontSize: 14, color: '#71717A' },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: Colors.white, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24, ...Shadow.lg, gap: 12 },
});
