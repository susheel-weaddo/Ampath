import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontFamily, FontSize, BorderRadius, Shadow, Typography } from '../../theme';
import { DecorativeEllipses, Input, Button, Card } from '../../components';

const MAP_BG = require('../../assets/figma/d0b03493-a257-42e8-939f-fb44150d61bf.png');
const TEST_ICON = require('../../assets/figma/2b85d1c5-5300-46db-b7dd-57d9f5b6cd73.png');

const DAYS = [
  { id: 'mon', day: 'Mon', date: '20' },
  { id: 'tue', day: 'Tue', date: '21' },
  { id: 'wed', day: 'Wed', date: '22' },
  { id: 'thu', day: 'Thu', date: '23' },
  { id: 'fri', day: 'Fri', date: '24' },
];

const SLOT_GROUPS = [
  { id: 'Morning', icon: 'sunny-outline' as const },
  { id: 'Afternoon', icon: 'partly-sunny-outline' as const },
  { id: 'Evening', icon: 'moon-outline' as const },
];

const SLOTS: Record<string, string[]> = {
  Morning: ['5:00am - 6:00am', '7:00am - 8:00am', '10:00am - 11:00am'],
  Afternoon: ['6:00am - 7:00am', '8:00am - 9:00am', '11:00am - 12:00pm'],
  Evening: [],
};

export default function BookSlotScreen({ navigation }: any) {
  const [qty, setQty] = useState(1);
  const [collectionType, setCollectionType] = useState<'home' | 'lab'>('home');
  const [step, setStep] = useState<'details' | 'schedule'>('details');
  const [testingForSelf, setTestingForSelf] = useState(false);

  const [fullName, setFullName] = useState('Abhinav');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('+91 98XXX 565XX');
  const [gender, setGender] = useState('Male');

  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('House no. 34, Block A, SV Towers, 27th main road');
  const [landmark, setLandmark] = useState('Red gate next to supermarket');
  const [saveAs, setSaveAs] = useState<'home' | 'other'>('home');

  const canContinue = useMemo(() => fullName.trim().length > 0 && address.trim().length > 0, [fullName, address]);
  const canContinueLab = useMemo(() => fullName.trim().length > 0 && phone.trim().length > 0, [fullName, phone]);

  const [dayIdx, setDayIdx] = useState(0);
  const [slotGroup, setSlotGroup] = useState<(typeof SLOT_GROUPS)[number]['id']>('Morning');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(SLOTS.Morning[0] ?? null);

  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />

      <View style={s.header}>
        <TouchableOpacity
          onPress={() => {
            if (collectionType === 'lab' && step === 'schedule') { setStep('details'); return; }
            navigation.goBack();
          }}
          style={s.headerBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="chevron-back" size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { marginLeft: 0, marginRight: 'auto' }]}>Book a Slot</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 140, gap: 16 }}>
        <Card style={s.testCard}>
          <View style={s.testIconBox}>
            <Image source={TEST_ICON} style={{ width: 44, height: 44 }} resizeMode="contain" />
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={s.testName}>CBC (Complete Blood Count)</Text>
            <Text style={s.testSub}>Contains 21 tests</Text>
            <Text style={s.testPrice}>₹319.00 <Text style={s.testMrp}>/ ₹350.00</Text></Text>
          <View style={s.qtyRow}>
            <TouchableOpacity onPress={() => setQty((p) => Math.max(1, p - 1))} style={s.qtyBtn} activeOpacity={0.8}>
              <Ionicons name="remove" size={16} color={Colors.black} />
            </TouchableOpacity>
            <Text style={s.qty}>{qty}</Text>
            <TouchableOpacity onPress={() => setQty((p) => p + 1)} style={s.qtyBtn} activeOpacity={0.8}>
              <Ionicons name="add" size={16} color={Colors.black} />
            </TouchableOpacity>
          </View>
          </View>
        </Card>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TouchableOpacity style={s.plusFab} activeOpacity={0.8}>
            <Ionicons name="add" size={18} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={s.addMorePill} activeOpacity={0.8} onPress={() => navigation.navigate('TestList')}>
            <Text style={s.addMoreTxt}>Add More Test</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={s.sectionTitle}>Collection Type</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              onPress={() => { setCollectionType('home'); setStep('details'); }}
              style={[s.choice, collectionType === 'home' && s.choiceActive]}
              activeOpacity={0.85}
            >
              <Ionicons name="home-outline" size={16} color={collectionType === 'home' ? Colors.white : Colors.greyNormal} />
              <Text style={[s.choiceTxt, collectionType === 'home' && { color: Colors.white }]}>Home Collection</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { setCollectionType('lab'); setStep('details'); }}
              style={[s.choice, collectionType === 'lab' && s.choiceActive]}
              activeOpacity={0.85}
            >
              <Ionicons name="business-outline" size={16} color={collectionType === 'lab' ? Colors.white : Colors.greyNormal} />
              <Text style={[s.choiceTxt, collectionType === 'lab' && { color: Colors.white }]}>Visit Lab</Text>
            </TouchableOpacity>
          </View>
        </View>

        {collectionType === 'lab' ? (
          step === 'details' ? (
            <>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={s.sectionTitle}>Member 1</Text>
                <TouchableOpacity onPress={() => setTestingForSelf((p) => !p)} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} activeOpacity={0.8}>
                  <View style={[s.checkbox, testingForSelf && s.checkboxOn]}>
                    {testingForSelf ? <Ionicons name="checkmark" size={16} color={Colors.white} /> : null}
                  </View>
                  <Text style={s.checkboxTxt}>Testing for Myself</Text>
                </TouchableOpacity>
              </View>

              <View style={{ gap: 12 }}>
                <Input label="Full name" value={fullName} onChangeText={setFullName} />
                <Input label="Age" value={age} onChangeText={setAge} keyboardType="number-pad" />
                <Input label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                <Input label="Gender" value={gender} onChangeText={setGender} />
              </View>

              <TouchableOpacity style={s.addMemberRow} activeOpacity={0.85}>
                <Ionicons name="add-circle" size={18} color={Colors.primaryDark} />
                <Text style={s.addMemberTxt}>Add More Member</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={s.patientRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={s.patientAvatar}>
                    <Text style={s.patientAvatarTxt}>8</Text>
                  </View>
                  <View>
                    <Text style={s.patientTitle}>Patient</Text>
                    <Text style={s.patientSub}>{fullName} (Self)</Text>
                  </View>
                </View>
                <TouchableOpacity style={s.changeBtn} activeOpacity={0.85} onPress={() => setStep('details')}>
                  <Text style={s.changeBtnTxt}>Change</Text>
                </TouchableOpacity>
              </View>

              <View style={{ gap: 10 }}>
                <View style={s.scheduleHeader}>
                  <Text style={s.sectionTitle}>Available Schedule</Text>
                  <TouchableOpacity style={s.selectDateBtn} activeOpacity={0.85}>
                    <Ionicons name="calendar-outline" size={14} color={Colors.primaryDark} />
                    <Text style={s.selectDateTxt}>Select date</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingVertical: 4 }}>
                  {DAYS.map((d, i) => {
                    const on = i === dayIdx;
                    return (
                      <TouchableOpacity key={d.id} style={[s.dayPill, on && s.dayPillOn]} activeOpacity={0.85} onPress={() => setDayIdx(i)}>
                        <Text style={[s.dayTxt, on && s.dayTxtOn]}>{d.day}</Text>
                        <Text style={[s.dayDate, on && s.dayTxtOn]}>{d.date}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                <View style={s.slotGroupRow}>
                  {SLOT_GROUPS.map((g) => {
                    const on = g.id === slotGroup;
                    return (
                      <TouchableOpacity key={g.id} style={[s.slotGroupPill, on && s.slotGroupPillOn]} activeOpacity={0.85} onPress={() => { setSlotGroup(g.id); setSelectedSlot(SLOTS[g.id][0] ?? null); }}>
                        <Ionicons name={g.icon} size={14} color={on ? Colors.primaryDark : '#A1A1AA'} />
                        <Text style={[s.slotGroupTxt, on && s.slotGroupTxtOn]}>{g.id}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View style={{ gap: 10 }}>
                  {Array.from({ length: Math.ceil((SLOTS[slotGroup]?.length ?? 0) / 2) }).map((_, row) => {
                    const left = SLOTS[slotGroup]?.[row * 2];
                    const right = SLOTS[slotGroup]?.[row * 2 + 1];
                    return (
                      <View key={row} style={{ flexDirection: 'row', gap: 10 }}>
                        {left ? (
                          <TouchableOpacity style={[s.slotPill, selectedSlot === left && s.slotPillOn]} activeOpacity={0.85} onPress={() => setSelectedSlot(left)}>
                            <Text style={[s.slotTxt, selectedSlot === left && s.slotTxtOn]}>{left}</Text>
                          </TouchableOpacity>
                        ) : <View style={{ flex: 1 }} />}
                        {right ? (
                          <TouchableOpacity style={[s.slotPill, selectedSlot === right && s.slotPillOn]} activeOpacity={0.85} onPress={() => setSelectedSlot(right)}>
                            <Text style={[s.slotTxt, selectedSlot === right && s.slotTxtOn]}>{right}</Text>
                          </TouchableOpacity>
                        ) : <View style={{ flex: 1 }} />}
                      </View>
                    );
                  })}
                </View>
              </View>

              <View style={s.offersCard}>
                <Text style={s.offersTitle}>Offers</Text>
                <TouchableOpacity style={s.couponRow} activeOpacity={0.85}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Ionicons name="pricetag-outline" size={18} color={Colors.primaryDark} />
                    <Text style={s.couponTxt}>View all Coupons</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={Colors.greyNormal} />
                </TouchableOpacity>
              </View>

              <View style={{ gap: 12 }}>
                <Text style={s.offersTitle}>Payment Information</Text>
                <View style={s.payCard}>
                  <View style={s.payRow}>
                    <Text style={s.payLabel}>Total MRP</Text>
                    <Text style={s.payLabel}>₹350</Text>
                  </View>
                  <View style={s.payRow}>
                    <Text style={[s.payLabel, { color: '#B4313A' }]}>Discount on MRP</Text>
                    <Text style={[s.payLabel, { color: '#B4313A' }]}>-60</Text>
                  </View>
                  <View style={s.payDivider} />
                  <View style={s.payRow}>
                    <Text style={s.payTotal}>Total Payable</Text>
                    <Text style={s.payTotal}>₹290</Text>
                  </View>
                </View>
              </View>
            </>
          )
        ) : (
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={s.sectionTitle}>Member 1</Text>
              <TouchableOpacity onPress={() => setTestingForSelf((p) => !p)} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} activeOpacity={0.8}>
                <View style={[s.checkbox, testingForSelf && s.checkboxOn]}>
                  {testingForSelf ? <Ionicons name="checkmark" size={16} color={Colors.white} /> : null}
                </View>
                <Text style={s.checkboxTxt}>Testing for Myself</Text>
              </TouchableOpacity>
            </View>

            <View style={{ gap: 12 }}>
              <Input label="Full name" value={fullName} onChangeText={setFullName} />
              <Input label="Age" value={age} onChangeText={setAge} keyboardType="number-pad" />
              <Input label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
              <Input label="Gender" value={gender} onChangeText={setGender} />
            </View>

            <TouchableOpacity style={s.addMemberRow} activeOpacity={0.85}>
              <Ionicons name="add-circle" size={18} color={Colors.primaryDark} />
              <Text style={s.addMemberTxt}>Add More Member</Text>
            </TouchableOpacity>

            <View style={{ gap: 10 }}>
              <Text style={s.sectionTitle}>Add Address</Text>
              <ImageBackground source={MAP_BG} style={s.map} imageStyle={{ borderRadius: 10 }}>
                <View style={s.mapOverlay} />
                <TouchableOpacity style={s.locatePill} activeOpacity={0.85}>
                  <Ionicons name="locate-outline" size={18} color={Colors.white} />
                  <Text style={s.locateTxt}>Locate me</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>

            <View style={{ gap: 12 }}>
              <Input label="Location*" value={location} onChangeText={setLocation} placeholder="Search for society, area, street name..." />
              <Input label="Address*" value={address} onChangeText={setAddress} />
              <Input label="Landmark / Directions to reach (Optional)" value={landmark} onChangeText={setLandmark} />
            </View>

            <View style={{ gap: 10 }}>
              <Text style={s.sectionTitle}>Save as</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
                <TouchableOpacity onPress={() => setSaveAs('home')} style={[s.savePill, saveAs === 'home' && s.savePillOn]} activeOpacity={0.85}>
                  <Ionicons name="home-outline" size={18} color={Colors.primaryDark} />
                  <Text style={s.saveTxt}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSaveAs('other')} style={[s.savePill, saveAs === 'other' && s.savePillOn]} activeOpacity={0.85}>
                  <Ionicons name="business-outline" size={18} color={Colors.primaryDark} />
                  <Text style={s.saveTxt}>Other</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      <View style={s.bottomBar}>
        <Button
          title={collectionType === 'lab' && step === 'schedule' ? 'Continue to Pay' : 'Continue'}
          onPress={() => {
            if (collectionType === 'lab') {
              if (step === 'details') { setStep('schedule'); return; }
              navigation.navigate('PaymentMethod');
              return;
            }
            navigation.navigate('PaymentMethod');
          }}
          disabled={collectionType === 'lab' ? !canContinueLab : !canContinue}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { paddingTop: 56, paddingHorizontal: 16, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  testCard: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 20, borderWidth: 1, borderColor: '#E6E6E6' },
  testIconBox: { width: 73, height: 85, borderRadius: 16, backgroundColor: '#EBF3FA', alignItems: 'center', justifyContent: 'center' },
  testName: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.primaryDark },
  testSub: { fontFamily: FontFamily.regular, fontSize: 10, color: '#737373' },
  testPrice: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark },
  testMrp: { fontFamily: FontFamily.regular, fontSize: 8, color: Colors.greyNormal },
  qtyRow: { borderRadius: 8, alignSelf: 'flex-start', backgroundColor: '#F5F5F5', flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 },
  qtyBtn: { width: 28, height: 28, borderRadius: 8, backgroundColor: '#E6E6E6', alignItems: 'center', justifyContent: 'center' },
  qty: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.greyText, minWidth: 10, textAlign: 'center' },
  plusFab: { width: 24, height: 24, borderRadius: 44, backgroundColor: Colors.primaryDark, alignItems: 'center', justifyContent: 'center' },
  addMorePill: { borderRadius: 20, borderWidth: 0.5, borderColor: Colors.primaryDark, paddingHorizontal: 14, paddingVertical: 7 },
  addMoreTxt: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.greyText },
  sectionTitle: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  choice: { flex: 1, borderRadius: 30, height: 40, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: '#ffffff', borderColor: '#E4E4E7', borderWidth: 1 },
  choiceActive: { backgroundColor: Colors.primaryDark },
  choiceTxt: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.greyNormal },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1, borderColor: '#005CA2', backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center' },
  checkboxOn: { backgroundColor: '#005CA2' },
  checkboxTxt: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.black },
  addMemberRow: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start' },
  addMemberTxt: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.greyText },
  patientRow: { borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  patientAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.primaryDark, alignItems: 'center', justifyContent: 'center' },
  patientAvatarTxt: { fontFamily: FontFamily.semiBold, fontSize: 14, color: Colors.white },
  patientTitle: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark },
  patientSub: { fontFamily: FontFamily.regular, fontSize: 10, color: '#737373', marginTop: 2 },
  changeBtn: { borderWidth: 1, borderColor: Colors.primaryLightActive, borderRadius: 18, paddingHorizontal: 14, paddingVertical: 6 },
  changeBtnTxt: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark },
  scheduleHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  selectDateBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderColor: Colors.primaryLightActive, borderRadius: 18, paddingHorizontal: 12, paddingVertical: 6 },
  selectDateTxt: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark },
  dayPill: { width: 56, height: 56, borderRadius: 12, backgroundColor: '#E9EFF6', alignItems: 'center', justifyContent: 'center', gap: 2 },
  dayPillOn: { backgroundColor: Colors.primaryDark },
  dayTxt: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark },
  dayDate: { fontFamily: FontFamily.semiBold, fontSize: 12, color: Colors.primaryDark },
  dayTxtOn: { color: Colors.white },
  slotGroupRow: { flexDirection: 'row', alignItems: 'center', gap: 18, marginTop: 6 },
  slotGroupPill: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 12, borderWidth: 1, borderColor: '#E4E4E7', backgroundColor: Colors.white },
  slotGroupPillOn: { backgroundColor: '#EBF3FA', borderColor: '#EBF3FA' },
  slotGroupTxt: { fontFamily: FontFamily.medium, fontSize: 12, color: '#A1A1AA' },
  slotGroupTxtOn: { color: Colors.primaryDark },
  slotPill: { flex: 1, borderRadius: 8, borderWidth: 1, borderColor: '#E4E4E7', backgroundColor: '#FAFAFA', paddingVertical: 10, alignItems: 'center' },
  slotPillOn: { backgroundColor: Colors.primaryDark, borderColor: Colors.primaryDark },
  slotTxt: { fontFamily: FontFamily.regular, fontSize: 12, color: '#4C4C4C' },
  slotTxtOn: { color: Colors.white, fontFamily: FontFamily.medium },
  offersCard: { backgroundColor: '#E9EFF6', borderRadius: 10, borderWidth: 1, borderColor: '#E6E6E6', padding: 10, gap: 9 },
  offersTitle: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  couponRow: { backgroundColor: Colors.white, borderRadius: 10, paddingHorizontal: 15, height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  couponTxt: { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.greyText },
  payCard: { backgroundColor: '#E9EFF6', borderRadius: 15, padding: 15, gap: 20 },
  payRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  payLabel: { fontFamily: FontFamily.regular, fontSize: 14, color: '#777' },
  payDivider: { height: 1, backgroundColor: '#A1C6E6', opacity: 0.6 },
  payTotal: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.black },
  map: { height: 141, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  mapOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,92,162,0.5)' },
  locatePill: { borderRadius: 20, borderWidth: 1, borderColor: Colors.white, backgroundColor: 'rgba(0,0,0,0.13)', paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', gap: 8, alignItems: 'center' },
  locateTxt: { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.white },
  savePill: { flex: 1, borderRadius: 30, height: 40, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: '#F5F5F5' },
  savePillOn: { borderWidth: 1, borderColor: Colors.primaryLightActive },
  saveTxt: { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.greyText },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: Colors.white, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 24, ...Shadow.lg },
});
