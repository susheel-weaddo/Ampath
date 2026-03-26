import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, DecorativeEllipses, PlainHeader } from '../../components';
import { Colors, FontFamily, Shadow } from '../../theme';
import IconEditSquare from '../../assets/icons/icon-edit-square.svg';

const AVATAR_ABHINAV = require('../../assets/figma/c9226a91-9796-436c-8c92-171a7ad3fc84.png');

function LabeledField({
  label,
  value,
  onChangeText,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?: any;
}) {
  return (
    <View style={{ gap: 5 }}>
      <Text style={s.label}>{label}</Text>
      <View style={s.inputWrap}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholderTextColor={Colors.greyLight}
          style={s.input}
        />
      </View>
    </View>
  );
}

export default function EditProfileScreen({ navigation }: any) {
  const [name, setName] = useState('Abhinav');
  const [email, setEmail] = useState('Abhinav@gmail.com');
  const [phone, setPhone] = useState('+91 9879809876');
  const [dob, setDob] = useState('14/09/1998');
  const [gender, setGender] = useState('Female');

  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />

      <PlainHeader title="Edit Profile" onBack={() => navigation.goBack()} />

      <View style={s.avatarWrap}>
        <Image source={AVATAR_ABHINAV} style={s.avatar} />
        <View style={s.avatarEdit}>
          <IconEditSquare width={24} height={24} color={Colors.white} />
        </View>
      </View>

      <View style={s.form}>
        <LabeledField label="Name" value={name} onChangeText={setName} />
        <LabeledField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <LabeledField label="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <LabeledField label="Date of Birth" value={dob} onChangeText={setDob} />
        <LabeledField label="Gender" value={gender} onChangeText={setGender} />
      </View>

      <View style={s.bottomBar}>
        <Button title="Update" onPress={() => navigation.goBack()} style={{ backgroundColor: Colors.primaryDark }} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  avatarWrap: { width: 104, height: 104, alignItems: 'center', position: 'relative', marginHorizontal: 'auto', marginBottom: 30},
  avatar: {  borderRadius: "50%", backgroundColor: '#F4F4F5',  },
  avatarEdit: { position: 'absolute', right: -5, bottom: -5,backgroundColor: Colors.white, borderRadius: 16, },
  form: { paddingHorizontal: 16, gap: 18, paddingBottom: 120 },
  label: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.greyText },
  inputWrap: { borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 16, paddingHorizontal: 20, paddingVertical: 16, backgroundColor: Colors.white },
  input: { padding: 0, fontFamily: FontFamily.regular, fontSize: 14, color: Colors.greyText },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: Colors.white, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 24, ...Shadow.lg },
});

