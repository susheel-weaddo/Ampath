import React, { useMemo, useState } from 'react';
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { DecorativeEllipses, AppScreenWrapper, PlainHeader } from '../../components';
import IconLocation from '../../assets/icons/icon-location.svg';
import { BorderRadius, Colors, FontFamily, FontSize, Shadow, Spacing, containerSpace } from '../../theme';
import { CENTER_CITIES, CENTER_STATES } from '../../constants/centers';

type SelectorModalProps = {
  title: string;
  options: string[];
  selectedValue: string;
  visible: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
};

function SelectorModal({ title, options, selectedValue, visible, onClose, onSelect }: SelectorModalProps) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <Pressable style={s.modalBackdrop} onPress={onClose}>
        <Pressable style={s.modalCard} onPress={(event) => event.stopPropagation()}>
          <Text style={s.modalTitle}>{title}</Text>
          {options.map((option) => {
            const isSelected = option === selectedValue;
            return (
              <TouchableOpacity
                key={option}
                activeOpacity={0.85}
                style={[s.modalOption, isSelected && s.modalOptionSelected]}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
              >
                <Text style={[s.modalOptionText, isSelected && s.modalOptionTextSelected]}>{option}</Text>
                {isSelected ? <Ionicons name="checkmark" size={18} color={Colors.primaryDark} /> : null}
              </TouchableOpacity>
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function OurCentersScreen({ navigation }: any) {
  const [selectedState, setSelectedState] = useState('All States');
  const [isStateModalVisible, setStateModalVisible] = useState(false);

  const filteredCities = useMemo(
    () => CENTER_CITIES.filter((item) => selectedState === 'All States' || item.state === selectedState),
    [selectedState],
  );

  return (
    <AppScreenWrapper>
      <View style={s.screen}>
        <StatusBar style="dark" />
        <DecorativeEllipses />
        <PlainHeader
          title="Our Centers"
          onBack={() => navigation.goBack()}
          rightElement={
            <TouchableOpacity activeOpacity={0.85} style={s.locatePill} onPress={() => setSelectedState('Telangana')}>
              <IconLocation width={12} height={12} color={Colors.primaryDark} preserveAspectRatio="xMidYMid meet" />
              <Text style={s.locateText}>Locate me</Text>
            </TouchableOpacity>
          }
        />

        <View style={s.content}>
          <TouchableOpacity activeOpacity={0.88} style={s.selector} onPress={() => setStateModalVisible(true)}>
            <Text style={s.selectorText}>{selectedState}</Text>
            <Ionicons name="chevron-down" size={18} color={Colors.greyNormal} />
          </TouchableOpacity>

          <FlatList
            data={filteredCities}
            keyExtractor={(item) => item.id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={s.gridContent}
            columnWrapperStyle={s.gridRow}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.86}
                style={s.cityCard}
                onPress={() => navigation.navigate('OurCentersList', { state: item.state, city: item.city })}
              >
                <Image source={item.image} style={s.cityImage} />
                <Text style={s.cityLabel} numberOfLines={2}>
                  {item.city}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <SelectorModal
          title="Select state"
          options={CENTER_STATES}
          selectedValue={selectedState}
          visible={isStateModalVisible}
          onClose={() => setStateModalVisible(false)}
          onSelect={setSelectedState}
        />
      </View>
    </AppScreenWrapper>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 20,

  },
  content: {
    flex: 1,
    paddingHorizontal: containerSpace,
    paddingTop: 18,
  },
  locatePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EDF5FF',
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  locateText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption1,
    color: Colors.primaryDark,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E1E7EF',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    ...Shadow.sm,
  },
  selectorText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body1,
    color: Colors.greyText,
  },
  gridContent: {
    paddingTop: 24,
    paddingBottom: 140,
    gap: 22,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  cityCard: {
    width: '30%',
    alignItems: 'center',
    gap: 8,
  },
  cityImage: {
    width: "33%",
    aspectRatio: 1,
    borderRadius: "50%",
  },
  cityLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption1,
    color: Colors.greyText,
    textAlign: 'center',
    lineHeight: 14,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(31, 41, 55, 0.35)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    gap: 6,
  },
  modalTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.h3,
    color: Colors.greyText,
    marginBottom: 4,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: BorderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  modalOptionSelected: {
    backgroundColor: '#EEF5FF',
  },
  modalOptionText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.body1,
    color: Colors.greyNormal,
  },
  modalOptionTextSelected: {
    color: Colors.primaryDark,
  },
});
