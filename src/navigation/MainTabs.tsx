import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabHome from '../assets/icons/tab-home.svg';
import TabSearch from '../assets/icons/tab-search.svg';
import TabCalendar from '../assets/icons/tab-calendar.svg';
import TabDocument from '../assets/icons/tab-document.svg';
import TabProfile from '../assets/icons/tab-profile.svg';
import HomeScreen from '../screens/main/HomeScreen';
import SearchScreen from '../screens/main/SearchScreen';
import ReportsScreen from '../screens/main/ReportsScreen';
import BookingsScreen from '../screens/main/BookingsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import { Colors, FontFamily, Shadow } from '../theme';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: s.bar,
      tabBarActiveTintColor: Colors.white,
      tabBarInactiveTintColor: '#CCCCCC',
      tabBarLabelStyle: s.label,
      tabBarHideOnKeyboard: true,
      tabBarItemStyle: s.item,
    }}>
      <Tab.Screen name="Home" component={HomeScreen}
        options={{ tabBarIcon: ({ color }) => <TabHome width={20} height={20} color={color} preserveAspectRatio="xMidYMid meet" /> }} />
      <Tab.Screen name="Search" component={SearchScreen}
        options={{ tabBarIcon: ({ color }) => <TabSearch width={20} height={20} color={color} preserveAspectRatio="xMidYMid meet" /> }} />
      <Tab.Screen name="Bookings" component={BookingsScreen}
        options={{ tabBarLabel: 'Orders', tabBarIcon: ({ color }) => <TabCalendar width={20} height={20} color={color} preserveAspectRatio="xMidYMid meet" /> }} />
      <Tab.Screen name="Reports" component={ReportsScreen}
        options={{ tabBarLabel: 'Records', tabBarIcon: ({ color }) => <TabDocument width={20} height={20} color={color} preserveAspectRatio="xMidYMid meet" /> }} />
      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{ tabBarIcon: ({ color }) => <TabProfile width={20} height={20} color={color} preserveAspectRatio="xMidYMid meet" /> }} />
    </Tab.Navigator>
  );
}

const s = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 92 : 72,
    paddingTop: 15,
    paddingBottom: Platform.OS === 'ios' ? 22 : 15,
    backgroundColor: Colors.primary,
    borderTopWidth: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Shadow.md,
  },
  item: { paddingVertical: 0 },
  label: { fontFamily: FontFamily.medium, fontSize: 12, marginTop: 8 },
});
