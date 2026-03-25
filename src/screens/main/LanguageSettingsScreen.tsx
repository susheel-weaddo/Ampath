import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DecorativeEllipses, PlainHeader } from '../../components';
import { Colors, FontFamily } from '../../theme';

type Language = {
  id: string;
  titleNative: string;
  titleEnglish: string;
};

const LANGS: Language[] = [
  { id: 'en', titleNative: 'English', titleEnglish: 'English' },
  { id: 'hi', titleNative: 'हिन्दी', titleEnglish: 'Hindi' },
  { id: 'te', titleNative: 'తెలుగు లిపి', titleEnglish: 'Telugu' },
  { id: 'ml', titleNative: 'മലയാളം', titleEnglish: 'Malayalam' },
  { id: 'te2', titleNative: 'తెలుగు లిపి', titleEnglish: 'Telugu' },
  { id: 'gu', titleNative: 'ગુજરાતી', titleEnglish: 'Gujarati' },
];

function LanguageCard({
  lang,
  selected,
  onPress,
}: {
  lang: Language;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress} style={[s.card, selected && s.cardSelected]}>
      <View style={{ gap: 4 }}>
        <Text style={[s.langNative, selected && { color: Colors.primaryDark }]}>{lang.titleNative}</Text>
        <Text style={s.langEnglish}>{lang.titleEnglish}</Text>
      </View>

      {selected ? (
        <View style={s.tagSelected}>
          <Text style={s.tagSelectedText}>Selected</Text>
        </View>
      ) : (
        <View style={s.tagSelect}>
          <Text style={s.tagSelectText}>Select</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function LanguageSettingsScreen({ navigation }: any) {
  const [selectedId, setSelectedId] = useState('en');
  const selected = useMemo(() => new Set([selectedId]), [selectedId]);

  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />
      <PlainHeader title="Language" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {LANGS.map((lang) => (
          <LanguageCard
            key={lang.id}
            lang={lang}
            selected={selected.has(lang.id)}
            onPress={() => setSelectedId(lang.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { paddingTop: 28, paddingHorizontal: 17, paddingBottom: 120, gap: 18 },
  card: { borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.white },
  cardSelected: { borderColor: Colors.primaryDark },
  langNative: { fontFamily: FontFamily.medium, fontSize: 14, color: '#666' },
  langEnglish: { fontFamily: FontFamily.regular, fontSize: 12, color: '#737373' },
  tagSelected: { height: 24, borderRadius: 20, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#D6E8F5' },
  tagSelectedText: { fontFamily: FontFamily.regular, fontSize: 10, color: '#296FA4' },
  tagSelect: { height: 24, borderRadius: 20, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E6E6E6', backgroundColor: Colors.white },
  tagSelectText: { fontFamily: FontFamily.regular, fontSize: 10, color: '#666' },
});

