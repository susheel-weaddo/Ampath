import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppScreenWrapper, Button, Input, PlainHeader } from '../../components';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing, Typography, containerSpace } from '../../theme';

import FIGMA_WCA_1 from '../../assets/figma/wca-1.svg';
import FIGMA_WCA_2 from '../../assets/figma/wca-2.svg';
import FIGMA_WCA_3 from '../../assets/figma/wca-3.svg';
import FIGMA_WCA_4 from '../../assets/figma/wca-4.svg';

const ENQUIRY_BANNER = require('../../assets/figma/ad.jpg');

const WHY_CHOOSE_ITEMS = [
  { id: 'w1', title: 'Advanced Lab Infrastructure', desc: 'NABL-accredited, fully automated facility built to manage high sample volumes.', Icon: FIGMA_WCA_1 },
  { id: 'w2', title: 'Extensive Test Portfolio', desc: '2600+ diagnostic tests with advanced investigations and customized profiles.', Icon: FIGMA_WCA_2 },
  { id: 'w3', title: 'Preventive Health Packages', desc: 'Health check plans tailored for all age groups.', Icon: FIGMA_WCA_3 },
  { id: 'w4', title: 'Nationwide Lab Network', desc: 'Clinical Reference Lab in Hyderabad with 22+ regional labs across India.', Icon: FIGMA_WCA_4 },
] as const;

type FormState = {
  name: string;
  dob: string;
  phone: string;
  teamNumber: string;
  email: string;
  company: string;
  address: string;
  state: string;
  city: string;
  message: string;
};

const INITIAL_FORM: FormState = {
  name: '',
  dob: '',
  phone: '',
  teamNumber: '',
  email: '',
  company: '',
  address: '',
  state: '',
  city: '',
  message: '',
};

export default function FranchiseEnquiryScreen({ navigation }: any) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  const updateField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.company.trim()) {
      Alert.alert('Missing details', 'Please fill in your name, phone number, email, and company before submitting.');
      return;
    }

    Alert.alert('Enquiry submitted', 'Thanks for your interest. Our team will reach out to you shortly.');
    setForm(INITIAL_FORM);
  };

  return (
    <AppScreenWrapper>
      <KeyboardAvoidingView
        style={s.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <StatusBar style="dark" />
        <PlainHeader title="Franchise Enquiry" onBack={() => navigation.goBack()} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={s.content}
        >
          <View style={{paddingHorizontal: containerSpace,}}>
            <View style={s.heroCard}>
              <Image source={ENQUIRY_BANNER} style={s.heroImage} resizeMode="cover" />
              <LinearGradient
                colors={['rgba(37,98,160,0)', 'rgba(37,98,160,0.12)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={s.heroOverlay}
              />
            </View>
          </View>

          <View style={s.section}>
            <Text style={s.sectionTitle}>Business Enquiry</Text>
            <Text style={s.sectionBody}>
              AMPATH has built a strong legacy of quality and unparalleled experience and has earned the trust of patients, doctors and hospitals.
              
              We are known for consistent quality-driven operations through the systematic implementation of effective quality management systems. AMPATH provides best-in-class logistics support for specimen pick-up and transportation under controlled temperature conditions. Also, we function on a seamless network of validated systems and protocols so as to ensure the safe movement of biological specimens in compliance with national & regional regulatory requirements. 
            </Text>
          </View>

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

          <View style={s.formSection}>
            <Text style={s.formTitle}>Enquiry Form</Text>
            <Text style={s.formIntro}>Please fill out the details below so our partnership team can connect with you.</Text>

            <View style={s.formFields}>
              <Input
                value={form.name}
                onChangeText={(value) => updateField('name', value)}
                placeholder="Name*"
              />
              <Input
                value={form.dob}
                onChangeText={(value) => updateField('dob', value)}
                placeholder="DOB / MM / YYYY"
              />
              <Input
                value={form.phone}
                onChangeText={(value) => updateField('phone', value)}
                placeholder="Phone Number*"
                keyboardType="phone-pad"
              />
              <Input
                value={form.teamNumber}
                onChangeText={(value) => updateField('teamNumber', value)}
                placeholder="Enter your Team Number"
              />
              <Input
                value={form.email}
                onChangeText={(value) => updateField('email', value)}
                placeholder="Email*"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                value={form.company}
                onChangeText={(value) => updateField('company', value)}
                placeholder="Company*"
              />
              <Input
                value={form.address}
                onChangeText={(value) => updateField('address', value)}
                placeholder="Enter your Address"
              />

              <View style={s.inlineRow}>
                <View style={s.inlineField}>
                  <Input
                    value={form.state}
                    onChangeText={(value) => updateField('state', value)}
                    placeholder="State*"
                  />
                </View>
                <View style={s.inlineField}>
                  <Input
                    value={form.city}
                    onChangeText={(value) => updateField('city', value)}
                    placeholder="City*"
                  />
                </View>
              </View>

              <View style={s.messageWrap}>
                <Input
                  value={form.message}
                  onChangeText={(value) => updateField('message', value)}
                  placeholder="Your Message here"
                  multiline
                  textAlignVertical="top"
                  style={s.messageInput}
                />
                <TouchableOpacity activeOpacity={0.85} style={s.messageAction}>
                  <Ionicons name="attach-outline" size={16} color={Colors.primaryDark} />
                  <Text style={s.messageActionText}>Add note</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Button title="Submit" onPress={handleSubmit} style={s.submitButton} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppScreenWrapper>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 32,

  },
  content: {
    paddingTop: 12,
  },
  heroCard: {
    height: 132,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#DDE9F7',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  section: {
    marginTop: 18,
    gap: 8,
    paddingHorizontal: containerSpace,
  },
  sectionTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
    color: Colors.greyText,
  },
  sectionBody: {
    ...Typography.body2,
    color: Colors.greyNormal,
    lineHeight: 20,
  },
  whySection: { marginTop: 28, gap: 6, paddingHorizontal: containerSpace,},
  whyTitle: { fontFamily: FontFamily.semiBold, fontSize: 16, color: Colors.greyText },
  whyIntro: { fontFamily: FontFamily.regular, fontSize: 12, color: '#6F7782', lineHeight: 18, maxWidth: 320 },
  whyRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 22, columnGap: 14, marginTop: 12 },
  whyItem: { width: '47%', gap: 10 },
  whyIcon: { width: 50, height: 50, borderRadius: 24, backgroundColor: '#DAEDFF', alignItems: 'center', justifyContent: 'center', borderWidth: 5, borderColor: '#F2F8FF' },
  whyLabel: { fontFamily: FontFamily.medium, fontSize: 13, color: Colors.greyText,minHeight: 30, lineHeight: 15 },
  whyDivider: { width: '100%', height: 1, backgroundColor: '#E4EAF2' },
  whyDesc: { fontFamily: FontFamily.regular, fontSize: 12, color: '#6F7782', lineHeight: 17 },
  formSection: {
    marginTop: 24,
    backgroundColor: "#EBF3FA",
    paddingHorizontal: containerSpace,
    paddingTop: 25,
    paddingBottom: 75,
  },
  formTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
    color: Colors.greyText,
  },
  formIntro: {
    marginTop: 6,
    ...Typography.body2,
    color: Colors.greyNormal,
  },
  formFields: {
    marginTop: 16,
    gap: 12,
  },
  inlineRow: {
    flexDirection: 'row',
    gap: 10,
  },
  inlineField: {
    flex: 1,
  },
  messageWrap: {
    gap: 8,
  },
  messageInput: {
    height: 120,
    paddingTop: 14,
    borderRadius: BorderRadius.lg,
    fontSize: FontSize.body2,
  },
  messageAction: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 99,
    backgroundColor: Colors.primaryLight,
  },
  messageActionText: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: Colors.primaryDark,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: Colors.primaryDark,
    paddingVertical: Spacing.md,
  },
});
