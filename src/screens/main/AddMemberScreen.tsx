import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, DecorativeEllipses, PlainHeader } from '../../components';
import { Colors, FontFamily, Shadow } from '../../theme';

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

export default function AddMemberScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [relation, setRelation] = useState('');

  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />
      <PlainHeader title="Add New Member" onBack={() => navigation.goBack()} />

      <View style={s.form}>
        <LabeledField label="Name" value={name} onChangeText={setName} />
        <LabeledField label="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <LabeledField label="Date of Birth" value={dob} onChangeText={setDob} />
        <LabeledField label="Gender" value={gender} onChangeText={setGender} />
        <LabeledField label="Relation" value={relation} onChangeText={setRelation} />
      </View>

      <View style={s.bottomBar}>
        <Button title="Add Member" onPress={() => navigation.goBack()} style={{ backgroundColor: Colors.primaryDark }} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  form: { paddingHorizontal: 16, paddingTop: 18, gap: 18, paddingBottom: 120 },
  label: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.greyText },
  inputWrap: { borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 16, paddingHorizontal: 20, paddingVertical: 16, backgroundColor: Colors.white },
  input: { padding: 0, fontFamily: FontFamily.regular, fontSize: 14, color: Colors.greyText },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: Colors.white, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 24, ...Shadow.lg },
});

