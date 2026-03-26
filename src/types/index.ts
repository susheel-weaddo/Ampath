// ── Auth ──
export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
}

// ── Reports ──
export interface LabReport {
  id: string;
  testName: string;
  date: string;
  status: 'Ready' | 'Processing' | 'Collected' | 'Cancelled';
  labName: string;
  patientName: string;
  sampleId: string;
  parameters?: TestParameter[];
  pdfUrl?: string;
}

export interface TestParameter {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low' | 'critical';
}

// ── Tests ──
export interface LabTest {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  popular: boolean;
  description?: string;
  preparationInstructions?: string;
  turnaroundTime?: string;
}

export interface HealthPackage {
  id: string;
  name: string;
  description: string;
  testCount: number;
  price: number;
  originalPrice: number;
  tests: string[];
}

// ── Bookings ──
export interface Booking {
  id: string;
  testName: string;
  date: string;
  time: string;
  type: 'Home Collection' | 'Lab Visit';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  price: number;
  labId?: string;
  address?: string;
}

// ── Labs ──
export interface Lab {
  id: string;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  hours: string;
  rating: number;
  services: string[];
  isOpen: boolean;
}

// ── Notifications ──
export interface AppNotification {
  id: string;
  type: 'report' | 'booking' | 'offer' | 'order' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// ── Navigation ──
export type AuthStackParams = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  CreateAccount: undefined;
  OTP: { mobileNumber: string };
  Terms: undefined;
  PrivacyPolicy: undefined;
};

export type MainTabParams = {
  Home: undefined;
  Search: undefined;
  Reports: undefined;
  Bookings: undefined;
  Profile: undefined;
};

export type MainStackParams = {
  Tabs: undefined;
  ReportDetail: { reportId: string; testName?: string };
  BookTest: undefined;
  Notifications: undefined;
  LabLocator: undefined;
  OurCenters: undefined;
  OurCentersList: { state?: string; city?: string } | undefined;
  TrackOrder: undefined;
  EditProfile: undefined;
  FamilyMembers: undefined;
  SavedAddresses: undefined;
  OrderHistory: undefined;
  PaymentsInvoices: undefined;
  HelpFAQ: undefined;
  GetHelp: undefined;
  GuideToAmpath: undefined;
  SetReminder: undefined;
  AccountSecurity: undefined;
  ContactUs: undefined;
  AllBlog: undefined;
  BlogDetail: { blogId: string };
  Terms: undefined;
  PrivacyPolicy: undefined;
  TestList: undefined;
  TestDetail: { testId?: string } | undefined;
  BookSlot: undefined;
  PaymentMethod: undefined;
  PaymentConfirmation: undefined;
  BookingDetail: undefined;
  ViewReport: undefined;
  WriteReview: undefined;
};

export type RootStackParams = {
  Auth: undefined;
  MainApp: undefined;
};
