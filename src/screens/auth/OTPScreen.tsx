import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Keyboard, Platform, Dimensions, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Typography } from '../../theme';
import { Button } from '../../components';

const { height: SH } = Dimensions.get('window');
const OTP_LEN = 4;
const FIGMA_OTP_BG = require('../../assets/figma/6fdb5d12-a9b1-4efc-bdc1-766b3b2492c4.png');

export default function OTPScreen({ navigation, route }: any) {
  const { mobileNumber } = route.params;
  const [otp, setOtp] = useState<string[]>(Array(OTP_LEN).fill(''));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const refs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (timer > 0) { const iv = setInterval(() => setTimer(p => p - 1), 1000); return () => clearInterval(iv); }
    setCanResend(true);
  }, [timer]);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates?.height ?? 0);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);


  const handleChange = (val: string, idx: number) => {
    const n = [...otp]; n[idx] = val; setOtp(n);
    if (val && idx < OTP_LEN - 1) refs.current[idx + 1]?.focus();
  };

  const handleKey = (e: any, idx: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[idx] && idx > 0) refs.current[idx - 1]?.focus();
  };

  const handleVerify = async () => {
    setLoading(true);
    // TODO: Replace with actual OTP verification API call
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    navigation.replace('MainApp');
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(60); setCanResend(false);
    setOtp(Array(OTP_LEN).fill('')); refs.current[0]?.focus();
    // TODO: API call to resend OTP
  };

  const isComplete = otp.every(d => d !== '');
  const masked = mobileNumber ? `+91 ${mobileNumber.slice(0, 2)}XXX ${mobileNumber.slice(-3)}XX` : '+91 98XXX 565XX';
  const dynamicTop = Math.max(180, 349 - keyboardHeight * 0.65);
  const isIOS = Platform.OS === 'ios';

  const Root = isIOS ? KeyboardAvoidingView : View;

  return (
    <Root style={s.container} {...(isIOS ? { behavior: 'padding' as const } : {})}>
      <StatusBar style="light" />

      <ImageBackground source={FIGMA_OTP_BG} style={s.hero} resizeMode="cover">
        <View style={s.heroTint} />
      </ImageBackground>

      <View style={[s.sheet, { top: dynamicTop, height: SH - dynamicTop }]}>
        <View style={{ alignItems: 'center', gap: 8 }}>
          <Text style={s.title}>Verification</Text>
          <Text style={s.subtitle}>
            We sent the verification code to your{'\n'}
            <Text style={s.phone}>Phone no {masked}. </Text>
            <Text style={s.edit} onPress={() => navigation.goBack()}>Edit</Text>
          </Text>
        </View>

        <View style={s.otpRow}>
          {otp.map((d, i) => (
            <TextInput
              key={i}
              ref={r => { refs.current[i] = r; }}
              style={s.otpInput}
              value={d}
              onChangeText={v => handleChange(v, i)}
              onKeyPress={e => handleKey(e, i)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              autoFocus={i === 0}
            />
          ))}
        </View>

        <View style={{ alignItems: 'center', gap: 14, width: '100%' as any }}>
          <Text style={s.timer}>00:{String(timer).padStart(2, '0')}</Text>
          <Button title="Verify" onPress={handleVerify} loading={loading} disabled={!isComplete} />
          <TouchableOpacity onPress={handleResend} disabled={!canResend}>
            <Text style={[s.sendAgain, !canResend && { opacity: 0.5 }]}>Send Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Root>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  hero: { position: 'absolute', left: 0, right: 0, top: 0, height: 527 },
  heroTint: { ...StyleSheet.absoluteFillObject, backgroundColor: Colors.blueTint },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 449,
    height: SH - 449,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 33,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 22,
  },
  title: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.brand, textAlign: 'center' },
  subtitle: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.greyNormal, textAlign: 'center', lineHeight: 18 },
  phone: { fontFamily: FontFamily.regular, color: Colors.greyNormal },
  edit: { fontFamily: FontFamily.regular, color: Colors.primaryDark },
  otpRow: { flexDirection: 'row', gap: 16, marginTop: 8 },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#D4D4D8',
    borderRadius: 10,
    textAlign: 'center',
    fontFamily: FontFamily.semiBold,
    fontSize: 18,
    color: Colors.greyNormal,
    backgroundColor: Colors.white,
  },
  timer: { fontFamily: FontFamily.semiBold, fontSize: 22, color: Colors.primary, textAlign: 'center' },
  sendAgain: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primary, textAlign: 'center' },
});
