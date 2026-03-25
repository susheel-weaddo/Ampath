import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontFamily, BorderRadius, Shadow } from '../../theme';
import { Button } from '../../components';

export default function WriteReviewScreen({ navigation }: any) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  return (
    <KeyboardAvoidingView style={s.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="dark" />
      <TouchableOpacity style={s.backdrop} activeOpacity={1} onPress={() => navigation.goBack()} />

      <View style={s.sheet}>
        <View style={s.grabber} />
        <Text style={s.title}>Write your review</Text>

        <View style={s.starsRow}>
          {Array.from({ length: 5 }).map((_, i) => {
            const val = i + 1;
            const filled = val <= rating;
            return (
              <TouchableOpacity key={val} onPress={() => setRating(val)} style={s.starBtn} activeOpacity={0.8}>
                <Ionicons name={filled ? 'star' : 'star-outline'} size={28} color={filled ? Colors.primaryDark : '#9CA3AF'} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={s.inputWrap}>
          <Text style={s.inputLabel}>Enter here</Text>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder=""
            multiline
            style={s.input}
            textAlignVertical="top"
          />
        </View>

        <Button title="Submit" onPress={() => navigation.goBack()} />
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 24,
    ...Shadow.lg,
  },
  grabber: { alignSelf: 'center', width: 44, height: 5, borderRadius: 999, backgroundColor: '#D4D4D8', marginBottom: 10 },
  title: { fontFamily: FontFamily.medium, fontSize: 18, color: Colors.primaryDark, textAlign: 'center' },
  starsRow: { flexDirection: 'row', justifyContent: 'center', gap: 5, marginTop: 12, marginBottom: 14 },
  starBtn: { padding: 4 },
  inputWrap: { borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 8, height: 94, paddingHorizontal: 15, paddingTop: 10, marginBottom: 16 },
  inputLabel: { fontFamily: FontFamily.medium, fontSize: 12, color: '#71717A' },
  input: { flex: 1, padding: 0, marginTop: 6, fontFamily: FontFamily.regular, fontSize: 14, color: Colors.greyText },
});

