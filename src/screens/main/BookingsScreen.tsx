import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, StatusBar as RNStatusBar, Image, Modal, Switch, TextInput, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontFamily, FontSize, BorderRadius, Shadow, Typography } from '../../theme';
import { Card, Button, DecorativeEllipses } from '../../components';
import IconSearch from '../../assets/icons/icon-search.svg';
import IconCart from '../../assets/icons/icon-cart.svg';
import IconSlot from '../../assets/icons/icon-slot.svg';
import IconWalkin from '../../assets/icons/icon-walkin.svg';
import IconEdit from '../../assets/icons/icon-edit.svg';
import IconDelete from '../../assets/icons/icon-delete.svg';

const AVATAR_ABHINAV = require('../../assets/figma/c9226a91-9796-436c-8c92-171a7ad3fc84.png');
const AVATAR_RAJESH = require('../../assets/figma/a03a6480-56fc-4a38-b34f-40992472ca2b.png');
const AVATAR_KANTA = require('../../assets/figma/01f27353-c55f-49b2-a95f-102bd1f9b187.png');
const TEST_ICON = require('../../assets/figma/2b85d1c5-5300-46db-b7dd-57d9f5b6cd73.png');

const MEMBERS = [
  { id: 'm1', name: 'Abhinav', avatar: AVATAR_ABHINAV },
  { id: 'm2', name: 'Rajesh', avatar: AVATAR_RAJESH },
  { id: 'm3', name: 'Kanta', avatar: AVATAR_KANTA },
] as const;

type OrderStatus = 'Upcoming' | 'Completed';
type Order = {
  id: string;
  status: OrderStatus;
  testName: string;
  subtitle: string;
  reportsWithin: string;
  slot: string;
  collectionType: 'Walk-in' | 'Home';
  patient: string;
};

const ORDERS: Order[] = [
  {
    id: 'o1',
    status: 'Upcoming',
    testName: 'CBC (Complete Blood Count )',
    subtitle: 'Contains 21 tests • Also called CRP Test',
    reportsWithin: 'Reports within 18 hours',
    slot: '21 Aug | at 05:00-06:00am',
    collectionType: 'Walk-in',
    patient: 'Abhinav (Self)',
  },
  {
    id: 'o2',
    status: 'Completed',
    testName: 'CBC (Complete Blood Count )',
    subtitle: 'Contains 21 tests • Also called CRP Test',
    reportsWithin: 'Reports within 18 hours',
    slot: '21 Aug | at 05:00-06:00am',
    collectionType: 'Walk-in',
    patient: 'Abhinav (Self)',
  },
  {
    id: 'o3',
    status: 'Completed',
    testName: 'CBC (Complete Blood Count )',
    subtitle: 'Contains 21 tests • Also called CRP Test',
    reportsWithin: 'Reports within 18 hours',
    slot: '21 Aug | at 05:00-06:00am',
    collectionType: 'Walk-in',
    patient: 'Abhinav (Self)',
  },
];

export default function BookingsScreen({ navigation }: any) {
  const [tab, setTab] = useState<OrderStatus>('Upcoming');
  const [activeMember, setActiveMember] = useState<(typeof MEMBERS)[number]['id']>('m1');
  const [cartCount] = useState(1);

  const [remindersOn, setRemindersOn] = useState(false);
  const [reminderVisible, setReminderVisible] = useState(false);
  const [reminderStep, setReminderStep] = useState<'list' | 'date'>('list');
  const [reminderFreq, setReminderFreq] = useState<'Weekly' | 'Monthly' | 'Quarterly'>('Weekly');
  const [reminderDetails, setReminderDetails] = useState('');

  const filtered = useMemo(() => ORDERS.filter((o) => o.status === tab), [tab]);

  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.headerBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="chevron-back" size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { marginLeft: 0, marginRight: 'auto' }]}>My Orders</Text>
        {tab === 'Completed' ? (
          <View style={s.headerRight}>
            <TouchableOpacity style={s.iconBtn} activeOpacity={0.85} onPress={() => navigation.navigate('Search')}>
              <IconSearch width={16} height={16} color={Colors.primaryDark} />
            </TouchableOpacity>
            <TouchableOpacity style={s.iconBtn} activeOpacity={0.85} onPress={() => navigation.navigate('BookSlot')}>
              <IconCart width={16} height={16} color={Colors.primaryDark} />
              {cartCount > 0 ? <View style={s.cartDot} /> : null}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ width: 80 }} />
        )}
      </View>

      {/* Members */}
      <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
        <View style={s.memberRow}>
          {MEMBERS.map((m) => {
            const on = m.id === activeMember;
            return (
              <TouchableOpacity key={m.id} style={[s.memberCard, on && s.memberCardOn]} activeOpacity={0.85} onPress={() => setActiveMember(m.id)}>
                <Image source={m.avatar} style={s.memberAvatar} />
                <Text style={[s.memberName, on ? s.memberNameOn : s.memberNameOff]}>{m.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Segmented control */}
      <View style={{ paddingHorizontal: 16, marginTop: 14 }}>
        <View style={s.segment}>
          <TouchableOpacity style={[s.segmentTab, tab === 'Upcoming' && s.segmentTabOn]} activeOpacity={0.85} onPress={() => setTab('Upcoming')}>
            <Text style={[s.segmentTxt, tab === 'Upcoming' ? s.segmentTxtOn : s.segmentTxtOff]}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.segmentTab, tab === 'Completed' && s.segmentTabOn]} activeOpacity={0.85} onPress={() => setTab('Completed')}>
            <Text style={[s.segmentTxt, tab === 'Completed' ? s.segmentTxtOn : s.segmentTxtOff]}>Completed</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList data={filtered} keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={s.orderCard}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={s.testIconBox}>
                <Image source={TEST_ICON} style={{ width: 34, height: 34 }} resizeMode="contain" />
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={s.orderTitle}>{item.testName}</Text>
                <Text style={s.orderSub}>{item.subtitle}</Text>
                <Text style={s.orderSmall}>{item.reportsWithin}</Text>
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
                  <Text style={s.rowValue}>{item.slot}</Text>
                </View>
              </View>
              <View style={s.rowItem}>
                <View style={s.rowIconCircle}>
                  <IconWalkin width={16} height={16} color={Colors.primaryDark} />
                </View>
                <View>
                  <Text style={s.rowLabel}>Collection Type</Text>
                  <Text style={s.rowValueLink}>{item.collectionType}</Text>
                </View>
              </View>
            </View>

            <View style={s.hr} />

            <View style={s.patientRow}>
              <View style={{ flex: 1, gap: 6 }}>
                <Text style={s.patientLabel}>Patient Details</Text>
                <Text style={s.patientValue}>{item.patient}</Text>
              </View>
              {tab === 'Upcoming' ? (
                <TouchableOpacity
                  style={s.viewDetailsBtn}
                  activeOpacity={0.85}
                  onPress={() => navigation.navigate('OrderDetailUpcoming')}
                >
                  <Text style={s.viewDetailsTxt}>View Details</Text>
                </TouchableOpacity>
              ) : (
                <View style={s.completedTag}>
                  <Text style={s.completedTagTxt}>Completed</Text>
                </View>
              )}
            </View>

            {tab === 'Completed' ? (
              <TouchableOpacity style={s.downloadBtn} activeOpacity={0.85} onPress={() => navigation.navigate('OrderDetailCompleted')}>
                <Text style={s.downloadTxt}>View & Download Reports</Text>
              </TouchableOpacity>
            ) : null}

            <View style={s.hr} />

            <View style={s.remRow}>
              <Text style={s.remTitle}>Set Reminders</Text>
              <Switch
                value={remindersOn}
                onValueChange={setRemindersOn}
                trackColor={{ false: '#E5E7EB', true: Colors.primaryLightActive }}
                thumbColor={remindersOn ? Colors.primaryDark : '#ffffff'}
              />
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity
                style={s.editReminderBtn}
                activeOpacity={0.85}
                onPress={() => { setReminderStep('list'); setReminderVisible(true); }}
              >
                <Text style={s.editReminderTxt}>Edit Reminder</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingTop: 60, gap: 8 }}>
            <Text style={{ fontSize: 48 }}>📅</Text>
            <Text style={{ ...Typography.body1Medium, color: Colors.greyText }}>No bookings yet</Text>
            <Button title="Book a Test" onPress={() => navigation.navigate('TestList')} fullWidth={false} style={{ paddingHorizontal: 32, marginTop: 8 }} />
          </View>
        }
      />

      {/* Reminder Modal */}
      <Modal visible={reminderVisible} transparent animationType="fade" onRequestClose={() => setReminderVisible(false)}>
        <Pressable style={s.modalOverlay} onPress={() => setReminderVisible(false)}>
          <Pressable style={s.modalCard} onPress={() => {}}>
            {reminderStep === 'list' ? (
              <>
                <Text style={s.modalTitle}>Set/Edit Reminder</Text>
                <View style={s.modalSegment}>
                  {(['Weekly', 'Monthly', 'Quarterly'] as const).map((f) => {
                    const on = reminderFreq === f;
                    return (
                      <TouchableOpacity key={f} style={[s.modalSegTab, on && s.modalSegTabOn]} activeOpacity={0.85} onPress={() => setReminderFreq(f)}>
                        <Text style={[s.modalSegTxt, on ? s.modalSegTxtOn : s.modalSegTxtOff]}>{f}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <Text style={s.modalSection}>Previous Test</Text>
                <View style={{ gap: 10 }}>
                  {[1, 2, 3, 4].map((i) => (
                    <View key={i} style={s.prevCard}>
                      <View style={{ flex: 1, gap: 6 }}>
                        <Text style={s.prevTitle}>Blood test</Text>
                        <Text style={s.prevSub}>Ser reminder monthly</Text>
                        {i === 1 ? (
                          <TouchableOpacity style={s.inlineEditRow} activeOpacity={0.85} onPress={() => setReminderStep('date')}>
                            <IconEdit width={14} height={14} color={Colors.primaryDark} />
                            <Text style={s.inlineEditTxt}>Edit Reminder</Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                      {i === 1 ? (
                        <TouchableOpacity activeOpacity={0.85} onPress={() => {}}>
                          <IconDelete width={18} height={18} color={Colors.primaryDark} />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  ))}
                </View>
              </>
            ) : (
              <>
                <Text style={s.modalTitle}>Select Date</Text>
                <Text style={s.calendarTitle}>Month 2000</Text>

                <View style={s.calendarGrid}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                    <Text key={d} style={s.calendarDow}>{d}</Text>
                  ))}
                  {Array.from({ length: 35 }).map((_, idx) => (
                    <View key={idx} style={s.calendarCell}>
                      <Text style={s.calendarDay}>{idx + 1 <= 31 ? String(idx + 1) : ''}</Text>
                    </View>
                  ))}
                </View>

                <View style={s.detailsBox}>
                  <TextInput
                    value={reminderDetails}
                    onChangeText={setReminderDetails}
                    placeholder="Enter Details"
                    placeholderTextColor="#71717A"
                    style={s.detailsInput}
                    multiline
                  />
                </View>

                <View style={s.recurRow}>
                  <Text style={s.recurTxt}>Recurring Test Scheduling</Text>
                  <Switch value={false} onValueChange={() => {}} trackColor={{ false: '#E5E7EB', true: Colors.primaryLightActive }} thumbColor="#ffffff" />
                </View>

                <Button
                  title={`Set ${reminderFreq} Reminder`}
                  onPress={() => setReminderVisible(false)}
                  style={{ backgroundColor: Colors.primaryDark }}
                />
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { paddingTop: Platform.OS === 'ios' ? 56 : (RNStatusBar.currentHeight || 44) + 12, paddingHorizontal: 16, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  headerRight: { flexDirection: 'row', gap: 9, alignItems: 'center' },
  iconBtn: { width: 35, height: 35, borderRadius: 30, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  cartDot: { position: 'absolute', top: 7, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.error },

  memberRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  memberCard: { flex: 1, borderRadius: 10, padding: 8, gap: 9, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#F5F5F5', backgroundColor: Colors.white },
  memberCardOn: { backgroundColor: '#F3F8FF', borderColor: '#F3F8FF' },
  memberAvatar: { width: 61, height: 61, borderRadius: 30.5 },
  memberName: { fontSize: 14 },
  memberNameOn: { fontFamily: FontFamily.medium, color: '#005CA2' },
  memberNameOff: { fontFamily: FontFamily.regular, color: '#0A0A0A' },

  segment: { backgroundColor: '#F4F4F5', borderRadius: 16, padding: 6, flexDirection: 'row', gap: 15 },
  segmentTab: { flex: 1, paddingVertical: 12, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  segmentTabOn: { backgroundColor: Colors.white, ...Shadow.sm },
  segmentTxt: { fontSize: 14 },
  segmentTxtOn: { fontFamily: FontFamily.medium, color: Colors.primary },
  segmentTxtOff: { fontFamily: FontFamily.regular, color: '#595959' },

  orderCard: { backgroundColor: Colors.white, borderRadius: 16, borderWidth: 1, borderColor: '#E4E4E7', paddingHorizontal: 13, paddingVertical: 12, gap: 12 },
  testIconBox: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#EBF3FA', alignItems: 'center', justifyContent: 'center' },
  orderTitle: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primaryDark },
  orderSub: { fontFamily: FontFamily.regular, fontSize: 12, color: '#4C4C4C' },
  orderSmall: { fontFamily: FontFamily.regular, fontSize: 10, color: '#4C4C4C' },
  hr: { height: 1, backgroundColor: '#E6E6E6', opacity: 0.8 },
  row2: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  rowItem: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  rowIconCircle: { width: 30, height: 30, borderRadius: "50%", backgroundColor: "#EBEBEB", alignItems: 'center', justifyContent: 'center' },
  rowLabel: { fontFamily: FontFamily.regular, fontSize: 10, color: '#4C4C4C' },
  rowValue: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark, marginTop: 2 },
  rowValueLink: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark, marginTop: 2, textDecorationLine: 'underline' },
  patientRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  patientLabel: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark },
  patientValue: { fontFamily: FontFamily.regular, fontSize: 14, color: '#666' },
  viewDetailsBtn: { backgroundColor: Colors.primaryDark, borderRadius: 20, height: 26, paddingHorizontal: 18, justifyContent: 'center' },
  viewDetailsTxt: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.white },
  completedTag: { backgroundColor: '#D7F4E3', borderRadius: 8, height: 15, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' },
  completedTagTxt: { fontFamily: FontFamily.regular, fontSize: 9, color: '#38C976' },
  downloadBtn: { backgroundColor: Colors.primaryDark, borderRadius: 60, paddingVertical: 14, alignItems: 'center' },
  downloadTxt: { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.white },
  remRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  remTitle: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primaryDark },
  editReminderBtn: { backgroundColor: Colors.primaryDark, borderRadius: 20, height: 26, paddingHorizontal: 18, justifyContent: 'center' },
  editReminderTxt: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.white },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', paddingHorizontal: 20, justifyContent: 'center' },
  modalCard: { backgroundColor: Colors.white, borderRadius: 14, padding: 16, maxHeight: 520 },
  modalTitle: { fontFamily: FontFamily.semiBold, fontSize: 18, color: Colors.primaryDark, textAlign: 'center' },
  modalSegment: { marginTop: 12, backgroundColor: '#F4F4F5', borderRadius: 16, padding: 6, flexDirection: 'row', gap: 10 },
  modalSegTab: { flex: 1, paddingVertical: 10, borderRadius: 16, alignItems: 'center' },
  modalSegTabOn: { backgroundColor: Colors.white, ...Shadow.sm },
  modalSegTxt: { fontSize: 14 },
  modalSegTxtOn: { fontFamily: FontFamily.medium, color: Colors.primaryDark },
  modalSegTxtOff: { fontFamily: FontFamily.regular, color: '#595959' },
  modalSection: { marginTop: 12, fontFamily: FontFamily.medium, fontSize: 14, color: Colors.greyText },
  prevCard: { backgroundColor: '#F4F4F5', borderRadius: 10, padding: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  prevTitle: { fontFamily: FontFamily.semiBold, fontSize: 14, color: Colors.greyText },
  prevSub: { fontFamily: FontFamily.regular, fontSize: 10, color: '#71717A' },
  inlineEditRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 },
  inlineEditTxt: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.primaryDark },
  calendarTitle: { fontFamily: FontFamily.semiBold, fontSize: 22, color: Colors.greyText, marginTop: 12 },
  calendarGrid: { marginTop: 10, flexDirection: 'row', flexWrap: 'wrap' as any },
  calendarDow: { width: `${100 / 7}%` as any, textAlign: 'center', fontFamily: FontFamily.regular, fontSize: 12, color: '#8E8E93', marginBottom: 6 },
  calendarCell: { width: `${100 / 7}%` as any, height: 32, alignItems: 'center', justifyContent: 'center' },
  calendarDay: { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.greyText },
  detailsBox: { marginTop: 10, borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 8, height: 94, padding: 10 },
  detailsInput: { flex: 1, fontFamily: FontFamily.medium, fontSize: 12, color: Colors.greyText, textAlignVertical: 'top' as any },
  recurRow: { marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  recurTxt: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primaryDark },
});
