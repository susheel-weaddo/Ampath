import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Keyboard, Platform, Dimensions, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontFamily, FontSize } from '../../theme';
import { Button } from '../../components';

const { width: SW, height: SH } = Dimensions.get('window');

const FIGMA_LOGIN_BG = require('../../assets/figma/f8d9e76a-06f4-4b0b-bca0-2c191d71c011.png');
const FIGMA_LOGIN_LOGO = require('../../assets/figma/21b7944b-e90f-44c9-8aa6-2ebbb9c5c143.png');

export default function LoginScreen({ navigation }: any) {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

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

  const dynamicTop = Math.max(110, 371 - keyboardHeight * 0.65);
  const isIOS = Platform.OS === 'ios';

  const handleSendOTP = async () => {
    setError('');
    const cleaned = mobile.replace(/\D/g, '');
    if (!cleaned) { setError('Please enter your mobile number'); return; }
    if (cleaned.length < 10) { setError('Enter a valid 10-digit mobile number'); return; }
    setLoading(true);
    // TODO: Replace with actual API call
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    navigation.navigate('OTP', { mobileNumber: mobile });
  };

  const Root = isIOS ? KeyboardAvoidingView : View;

  return (
    <Root style={s.container} {...(isIOS ? { behavior: 'padding' as const } : {})}>
      <StatusBar style="light" />

      <ImageBackground source={FIGMA_LOGIN_BG} style={s.hero} resizeMode="cover">
        <View style={s.heroTint} />
      </ImageBackground>

      <View style={[s.sheet, { top: dynamicTop, height: SH - dynamicTop }]}>
        <Image source={FIGMA_LOGIN_LOGO} style={s.logo} resizeMode="contain" accessibilityLabel="AMPATH" />

        <View style={s.form}>
          <Text style={s.label}>Mobile Number</Text>
          <TextInput
            value={mobile}
            onChangeText={(t) => { setMobile(t); if (error) setError(''); }}
            placeholder="+91 98XXX 565XX"
            placeholderTextColor={Colors.greyNormal}
            keyboardType="phone-pad"
            maxLength={15}
            style={[s.input, error ? { borderColor: Colors.error } : null]}
            autoFocus
          />
          {error ? <Text style={s.error}>{error}</Text> : null}

          <Button title="Send OTP" onPress={handleSendOTP} loading={loading} disabled={!mobile.trim()} />
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={s.create}>New here? Create Account</Text>
        </TouchableOpacity>
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
    </Root>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  hero: { position: 'absolute', left: 0, right: 0, top: 0, height: 422, width: SW },
  heroTint: { ...StyleSheet.absoluteFillObject, backgroundColor: Colors.blueTint },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 371,
    height: SH - 371,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 33,
    alignItems: 'center',
    gap: 44,
  },
  logo: { width: 343, height: 50.44 },
  form: { width: '100%' as any, gap: 16 },
  label: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.greyText },
  input: {
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.greyLight,
    paddingHorizontal: 15,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.greyText,
    backgroundColor: Colors.white,
  },
  error: { fontFamily: FontFamily.regular, fontSize: 10, color: Colors.error, marginTop: -8 },
  terms: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 26,
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 12,
    color: Colors.greyMuted,
    textAlign: 'center',
  },
  link: { color: Colors.primaryDark },
  create: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark, textAlign: 'center' },
});
