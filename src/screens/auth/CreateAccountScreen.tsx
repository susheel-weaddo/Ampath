import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Dimensions, ImageBackground, TouchableOpacity, TextInput, ScrollView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { Colors, FontFamily } from '../../theme';
import { Button } from '../../components';
import { dateFormat } from '../../components/utils';
import { Controller, useForm } from "react-hook-form";

const { width: SW, height: SH } = Dimensions.get('window');
const FIGMA_BG = require('../../assets/figma/create-account.png');

export default function CreateAccountScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [dob, setDob] = useState<Date | null>(null);  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
   const { control, formState: { errors }, } = useForm<FormData>();

   type FormData = {
    dob: Date;
  };

  const sheetMinHeight = useMemo(() => Math.max(520, SH - 237), []);

  const canSubmit = useMemo(() => {
    if (!name.trim()) return false;
    if (!email.trim()) return false;
    if (!dob) return false;
    return true;
  }, [dob, email, name]);

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
    >
      <StatusBar style="light" />

      <ImageBackground source={FIGMA_BG} style={s.hero} resizeMode="cover">
        <View style={s.heroTint} />
      </ImageBackground>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={[s.scrollContent, { paddingTop: 237 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
      >
        <View style={[s.sheet, { minHeight: sheetMinHeight }]}>
        <View style={s.sheetContent}>
          <View style={{ alignItems: 'center', gap: 5 }}>
            <Text style={s.title}>Create your Account</Text>
            <Text style={s.subtitle}>Please enter your details</Text>
          </View>

          <View style={{ width: '100%' as any, gap: 16 }}>
            <View style={{ gap: 12 }}>
              <Text style={s.label}>Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor={Colors.greyText}
                style={s.input}
              />
            </View>

            <View style={{ gap: 12 }}>
              <Text style={s.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your Email"
                placeholderTextColor={Colors.greyText}
                style={s.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={{ gap: 20 }}>
              <Text style={s.label}>Select Gender</Text>
              <View style={{ flexDirection: 'row', gap: 20 }}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setGender('Male')}
                  style={[s.genderBtn, gender === 'Male' ? s.genderBtnOn : s.genderBtnOff]}
                >
                  <Text style={[s.genderTxt, gender === 'Male' ? s.genderTxtOn : s.genderTxtOff]}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setGender('Female')}
                  style={[s.genderBtn, gender === 'Female' ? s.genderBtnOn : s.genderBtnOff]}
                >
                  <Text style={[s.genderTxt, gender === 'Female' ? s.genderTxtOn : s.genderTxtOff]}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ gap: 15 }}>
              <Text style={s.label}>Date of birth</Text>
              {Platform.OS !== "ios" && (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => setOpen((p) => !p)}
                  style={s.input}
                >
                  <Text>
                    {dateFormat(selectedDate) || "Select DOB*"}
                  </Text>
                </TouchableOpacity>
              )}
              <View style={Platform.OS === "ios" ? s.input : undefined}>
                {(Platform.OS === "ios" || open) && (
                  <Controller
                    control={control}
                    name="dob"
                    render={({ field: { onChange, value } }) => (
                      <DateTimePicker
                        style={{ backgroundColor: "transparent" }}
                        themeVariant="light"
                        minimumDate={new Date(1900, 0, 2)}
                        value={value ? new Date(value) : new Date()}
                        mode="date"
                        maximumDate={new Date()}
                        display="default"
                        onChange={(event: DateTimePickerEvent, selected?: Date) => {
                          if (event.type === "dismissed") {
                            setOpen(false);
                            return;
                          }

                          if (selected) {
                            setOpen(false);
                            setSelectedDate(selected);
                            onChange(selected);
                          }
                        }}
                      />
                    )}
                  />
                )}
              </View>
              {errors?.["dob"] && (
                <Text
                  style={{
                    color: "red",
                    position: "absolute",
                    bottom: 0,
                    left: 20,
                  }}
                >
                  {errors?.["dob"]?.message?.toString()}
                </Text>
              )}
            </View>
          </View>

          <Button title="Submit" onPress={() => navigation.replace('OTP', { mobileNumber: '' })} disabled={!canSubmit} />
        </View>
        <Text style={s.terms}>
          {'We may contact for order updates and offers. By continuing you accept our '}
          <Text style={s.link} onPress={() => navigation.navigate('Terms')}>Term and</Text>
          {' '}
          <Text style={s.link} onPress={() => navigation.navigate('Terms')}>Conditions</Text>
          {'  and '}
          <Text style={s.link} onPress={() => navigation.navigate('PrivacyPolicy')}>Privacy Policy</Text>
        </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 32 },
  hero: { position: 'absolute', left: 0, right: 0, top: 0, height: 254, width: SW},
  heroTint: { ...StyleSheet.absoluteFillObject, backgroundColor: Colors.blueTint },
  sheet: {
    width: '100%',
    gap: 22,
    paddingHorizontal: 15,
    paddingBottom: 19,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 19,
  },
  sheetContent: {
    gap: 22,
  },
  title: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.brand, textAlign: 'center' },
  subtitle: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.greyText, textAlign: 'center' },
  label: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.greyDark },
  input: {
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.greyLight,
    paddingHorizontal: 15,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.greyText,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  genderBtn: { height: 40, width: 160, borderRadius: 60, alignItems: 'center', justifyContent: 'center' },
  genderBtnOn: { backgroundColor: Colors.primary },
  genderBtnOff: { borderWidth: 1, borderColor: Colors.primary, backgroundColor: 'transparent' },
  genderTxt: { fontFamily: FontFamily.medium, fontSize: 16 },
  genderTxtOn: { color: Colors.white },
  genderTxtOff: { color: Colors.primary },
  terms: {
    flexShrink: 0,
    flexBasis: 'auto',
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 12,
    color: Colors.greyMuted,
    textAlign: 'center',
    width: '100%' as any,
  },
  link: { color: Colors.primaryDark },
});
