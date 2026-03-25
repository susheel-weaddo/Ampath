import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, DecorativeEllipses, PlainHeader } from '../../components';
import { Colors, FontFamily, Shadow } from '../../theme';
import IconEditSquare from '../../assets/icons/icon-edit-square.svg';

const AVATAR_ABHINAV = require('../../assets/figma/c9226a91-9796-436c-8c92-171a7ad3fc84.png');
const AVATAR_RAJESH = require('../../assets/figma/a03a6480-56fc-4a38-b34f-40992472ca2b.png');
const AVATAR_KANTA = require('../../assets/figma/01f27353-c55f-49b2-a95f-102bd1f9b187.png');

type Member = {
  id: string;
  name: string;
  age: number | string;
  gender: string;
  relation: string;
  avatar: any;
};

const MEMBERS: Member[] = [
  { id: '1', name: 'Abhinav', age: 24, gender: 'Male', relation: 'Self', avatar: AVATAR_ABHINAV },
  { id: '2', name: 'Rajesh Sharma', age: 56, gender: 'Male', relation: 'Father', avatar: AVATAR_RAJESH },
  { id: '3', name: 'Kanta Sharma', age: 56, gender: 'Male', relation: 'Mother', avatar: AVATAR_KANTA },
];

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.pill}>
      <Text style={s.pillLabel}>{label}</Text>
      <Text style={s.pillValue}>{value}</Text>
    </View>
  );
}

function MemberCard({ member, onEdit }: { member: Member; onEdit: () => void }) {
  return (
    <View style={s.memberCard}>
      <View style={s.memberTop}>
        <View style={s.memberLeft}>
          <Image source={member.avatar} style={s.avatar} />
          <Text style={s.memberName}>{member.name}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={onEdit} style={s.editIconBtn}>
          <IconEditSquare width={20} height={20} color={Colors.primaryDark} />
        </TouchableOpacity>
      </View>

      <View style={s.pillsRow}>
        <InfoPill label="Age" value={String(member.age)} />
        <InfoPill label="Gender" value={member.gender} />
        <InfoPill label="Relation" value={member.relation} />
      </View>
    </View>
  );
}

export default function FamilyMembersScreen({ navigation }: any) {
  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />
      <PlainHeader title="Family Members" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {MEMBERS.map((m) => (
          <MemberCard key={m.id} member={m} onEdit={() => navigation.navigate('EditProfile')} />
        ))}
      </ScrollView>

      <View style={s.bottomBar}>
        <Button title="Add New Member" onPress={() => navigation.navigate('AddMember')} style={{ backgroundColor: Colors.primaryDark }} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { paddingTop: 20, paddingHorizontal: 17, paddingBottom: 140, gap: 20 },

  memberCard: { backgroundColor: Colors.white, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(0,92,162,0.4)', padding: 10, gap: 10 },
  memberTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  memberLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#F4F4F5' },
  memberName: { fontFamily: FontFamily.medium, fontSize: 16, color: '#3A3A3A' },
  editIconBtn: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },

  pillsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15, height: 51 },
  pill: { flex: 1, height: '100%', backgroundColor: '#F3F8FF', borderRadius: 10, padding: 8, alignItems: 'center', justifyContent: 'center', gap: 4 },
  pillLabel: { fontFamily: FontFamily.medium, fontSize: 12, color: '#808080' },
  pillValue: { fontFamily: FontFamily.regular, fontSize: 14, color: '#005CA2' },

  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: Colors.white, paddingHorizontal: 17, paddingTop: 20, paddingBottom: 24, ...Shadow.lg },
});

