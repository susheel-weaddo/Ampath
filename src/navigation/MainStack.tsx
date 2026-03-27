import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { MainStackParams } from '../types';
import MainTabs from './MainTabs';
import ReportDetailScreen from '../screens/main/ReportDetailScreen';
import BookTestScreen from '../screens/main/BookTestScreen';
import NotificationsScreen from '../screens/main/NotificationsScreen';
import LabLocatorScreen from '../screens/main/LabLocatorScreen';
import TrackOrderScreen from '../screens/main/TrackOrderScreen';
import EditProfileScreen from '../screens/main/EditProfileScreen';
import FamilyMembersScreen from '../screens/main/FamilyMembersScreen';
import AddMemberScreen from '../screens/main/AddMemberScreen';
import SavedAddressesScreen from '../screens/main/SavedAddressesScreen';
import OrderHistoryScreen from '../screens/main/OrderHistoryScreen';
import PaymentsInvoicesScreen from '../screens/main/PaymentsInvoicesScreen';
import HelpFaqScreen from '../screens/main/HelpFaqScreen';
import PaymentSettingsScreen from '../screens/main/PaymentSettingsScreen';
import LanguageSettingsScreen from '../screens/main/LanguageSettingsScreen';
import AppearanceScreen from '../screens/main/AppearanceScreen';
import GetHelpScreen from '../screens/main/GetHelpScreen';
import GuideToAmpathScreen from '../screens/main/GuideToAmpathScreen';
import AllBlogScreen from '../screens/main/AllBlogScreen';
import BlogDetailScreen from '../screens/main/BlogDetailScreen';
import SetReminderScreen from '../screens/main/SetReminderScreen';
import FranchiseEnquiryScreen from '../screens/main/FranchiseEnquiryScreen';
import AccountSecurityScreen from '../screens/main/AccountSecurityScreen';
import ContactUsScreen from '../screens/main/ContactUsScreen';
import TermsScreen from '../screens/main/TermsScreen';
import PrivacyPolicyScreen from '../screens/main/PrivacyPolicyScreen';
import TestListScreen from '../screens/main/TestListScreen';
import BookSlotScreen from '../screens/main/BookSlotScreen';
import PaymentMethodScreen from '../screens/main/PaymentMethodScreen';
import PaymentConfirmationScreen from '../screens/main/PaymentConfirmationScreen';
import BookingDetailScreen from '../screens/main/BookingDetailScreen';
import BookingSuccessScreen from '../screens/main/BookingSuccessScreen';
import OrderDetailUpcomingScreen from '../screens/main/OrderDetailUpcomingScreen';
import OrderDetailCompletedScreen from '../screens/main/OrderDetailCompletedScreen';
import ViewReportScreen from '../screens/main/ViewReportScreen';
import WriteReviewScreen from '../screens/main/WriteReviewScreen';
import TestDetailScreen from '../screens/main/TestDetailScreen';
import OurCentersScreen from '../screens/main/OurCentersScreen';
import OurCentersListScreen from '../screens/main/OurCentersListScreen';

const Stack = createNativeStackNavigator<MainStackParams>();

export default function MainStack() {
  return (
    <View style={s.container}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="Tabs" component={MainTabs} />
        <Stack.Screen name="ReportDetail" component={ReportDetailScreen} />
        <Stack.Screen name="BookTest" component={BookTestScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="LabLocator" component={LabLocatorScreen} />
        <Stack.Screen name="OurCenters" component={OurCentersScreen} />
        <Stack.Screen name="OurCentersList" component={OurCentersListScreen} />
        <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="FamilyMembers" component={FamilyMembersScreen} />
        <Stack.Screen name="AddMember" component={AddMemberScreen} />
        <Stack.Screen name="SetReminder" component={SetReminderScreen} />
        <Stack.Screen name="FranchiseEnquiry" component={FranchiseEnquiryScreen} />
        <Stack.Screen name="AccountSecurity" component={AccountSecurityScreen} />
        <Stack.Screen name="SavedAddresses" component={SavedAddressesScreen} />
        <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
        <Stack.Screen name="PaymentsInvoices" component={PaymentsInvoicesScreen} />
        <Stack.Screen name="HelpFAQ" component={HelpFaqScreen} />
        <Stack.Screen name="PaymentSettings" component={PaymentSettingsScreen} />
        <Stack.Screen name="LanguageSettings" component={LanguageSettingsScreen} />
        <Stack.Screen name="Appearance" component={AppearanceScreen} />
        <Stack.Screen name="GetHelp" component={GetHelpScreen} />
        <Stack.Screen name="GuideToAmpath" component={GuideToAmpathScreen} />
        <Stack.Screen name="AllBlog" component={AllBlogScreen} />
        <Stack.Screen name="BlogDetail" component={BlogDetailScreen} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="TestList" component={TestListScreen} />
        <Stack.Screen name="TestDetail" component={TestDetailScreen} />
        <Stack.Screen name="BookSlot" component={BookSlotScreen} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
        <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} />
        <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
        <Stack.Screen name="OrderDetailUpcoming" component={OrderDetailUpcomingScreen} />
        <Stack.Screen name="OrderDetailCompleted" component={OrderDetailCompletedScreen} />
        <Stack.Screen name="ViewReport" component={ViewReportScreen} />
        <Stack.Screen name="WriteReview" component={WriteReviewScreen} options={{ presentation: 'transparentModal', animation: 'fade' }} />
      </Stack.Navigator>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});
