import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DecorativeEllipses, PlainHeader } from '../../components';
import { Colors, FontFamily } from '../../theme';

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  read: boolean;
};

export default function NotificationsScreen({ navigation }: any) {
  const [items, setItems] = useState<NotificationItem[]>([
    { id: '1', title: 'We’d Love to Hear Your Feedback!', body: 'Please take a moment to share your review.', read: false },
    { id: '2', title: 'We’d Love to Hear Your Feedback!', body: 'Please take a moment to share your review.', read: false },
    { id: '3', title: 'We’d Love to Hear Your Feedback!', body: 'Please take a moment to share your review.', read: false },
  ]);

  const unreadCount = useMemo(() => items.filter((i) => !i.read).length, [items]);

  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />
      <PlainHeader title="Notifications" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.titleRow}>
          <Text style={s.sectionTitle}>Recent</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setItems((prev) => prev.map((i) => ({ ...i, read: true })))}
            disabled={unreadCount === 0}
          >
            <Text style={[s.markAll, unreadCount === 0 && { opacity: 0.5 }]}>Mark all read</Text>
          </TouchableOpacity>
        </View>

        <View>
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.75}
              onPress={() => setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, read: true } : i)))}
              style={s.item}
            >
              <Text style={s.itemTitle}>{item.title}</Text>
              <Text style={s.itemBody}>{item.body}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { paddingTop: 13, paddingHorizontal: 16, paddingBottom: 120 },
  titleRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  sectionTitle: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  markAll: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.primaryDark },
  item: { borderBottomWidth: 1, borderBottomColor: '#D4D4D8', paddingHorizontal: 5, paddingVertical: 16, gap: 4 },
  itemTitle: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primaryDark },
  itemBody: { fontFamily: FontFamily.regular, fontSize: 12, color: '#737373' },
});

