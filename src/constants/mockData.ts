/**
 * Mock data constants — replace each with API calls during binding.
 * 
 * Example:
 *   BEFORE: import { SERVICES } from '../../constants/mockData';
 *   AFTER:  const services = await api.getServices();
 */

export const SERVICES = [
  { id: '1', title: 'Lab Tests', icon: '🔬', color: '#E8F4FD', screen: 'BookTest' },
  { id: '2', title: 'Health\nPackages', icon: '💊', color: '#FFF3E0', screen: 'BookTest' },
  { id: '3', title: 'Radiology', icon: '🩻', color: '#E8F5E9', screen: 'BookTest' },
  { id: '4', title: 'Home\nCollection', icon: '🏠', color: '#FCE4EC', screen: 'BookTest' },
  { id: '5', title: 'Upload\nPrescription', icon: '📋', color: '#F3E5F5', screen: null },
];

export const BANNERS = [
  { id: '1', title: 'Full Body Health Checkup', sub: 'Starting at ₹999', color: '#007EFF' },
  { id: '2', title: "Women's Wellness Package", sub: 'Comprehensive screening', color: '#4F1216' },
  { id: '3', title: 'Diabetes Care Package', sub: 'HbA1c + Lipid + more', color: '#2562A0' },
];

export const QUICK_ACTIONS = [
  { id: '1', title: 'Book a Test', icon: '📅', screen: 'BookTest' },
  { id: '2', title: 'My Reports', icon: '📊', screen: 'Reports' },
  { id: '3', title: 'Track Order', icon: '🚚', screen: 'TrackOrder' },
  { id: '4', title: 'Find Lab', icon: '📍', screen: 'LabLocator' },
];

export const MOCK_REPORTS = [
  { id: '1', name: 'Complete Blood Count (CBC)', date: '12 Mar 2026', status: 'Ready' as const, lab: 'AMPATH Gurugram', color: '#34C759' },
  { id: '2', name: 'Thyroid Profile (T3, T4, TSH)', date: '10 Mar 2026', status: 'Processing' as const, lab: 'AMPATH Gurugram', color: '#FF9500' },
  { id: '3', name: 'Lipid Profile', date: '08 Mar 2026', status: 'Ready' as const, lab: 'AMPATH Sector 56', color: '#34C759' },
  { id: '4', name: 'HbA1c (Glycated Hemoglobin)', date: '01 Mar 2026', status: 'Ready' as const, lab: 'AMPATH Gurugram', color: '#34C759' },
  { id: '5', name: 'Vitamin D (25-Hydroxy)', date: '25 Feb 2026', status: 'Ready' as const, lab: 'AMPATH Sector 56', color: '#34C759' },
  { id: '6', name: 'Liver Function Test (LFT)', date: '20 Feb 2026', status: 'Ready' as const, lab: 'AMPATH Gurugram', color: '#34C759' },
];

export const MOCK_TESTS = [
  { id: '1', name: 'Complete Blood Count (CBC)', price: 450, mrp: 600, pop: true },
  { id: '2', name: 'Thyroid Profile (T3, T4, TSH)', price: 800, mrp: 1200, pop: true },
  { id: '3', name: 'Lipid Profile', price: 600, mrp: 850, pop: false },
  { id: '4', name: 'HbA1c (Glycated Hemoglobin)', price: 500, mrp: 700, pop: false },
  { id: '5', name: 'Vitamin D (25-Hydroxy)', price: 900, mrp: 1400, pop: true },
  { id: '6', name: 'Vitamin B12', price: 700, mrp: 1000, pop: false },
  { id: '7', name: 'Liver Function Test (LFT)', price: 550, mrp: 800, pop: false },
  { id: '8', name: 'Kidney Function Test (KFT)', price: 600, mrp: 900, pop: false },
  { id: '9', name: 'Iron Studies', price: 750, mrp: 1100, pop: false },
  { id: '10', name: 'Urine Routine', price: 200, mrp: 350, pop: false },
];

export const MOCK_PACKAGES = [
  { id: 'p1', name: 'Full Body Checkup', tests: 72, price: 1999, mrp: 4500, color: '#007EFF' },
  { id: 'p2', name: 'Diabetes Care', tests: 24, price: 999, mrp: 2200, color: '#4F1216' },
  { id: 'p3', name: 'Heart Health', tests: 38, price: 1499, mrp: 3500, color: '#2562A0' },
];

export const MOCK_BOOKINGS = [
  { id: '1', name: 'Complete Blood Count (CBC)', date: '18 Mar 2026', time: '09:00 AM', type: 'Home Collection' as const, status: 'Upcoming' as const, price: '₹450' },
  { id: '2', name: 'Vitamin B12 + Vitamin D', date: '20 Mar 2026', time: '10:30 AM', type: 'Lab Visit' as const, status: 'Upcoming' as const, price: '₹1,200' },
  { id: '3', name: 'Thyroid Profile', date: '10 Mar 2026', time: '08:00 AM', type: 'Home Collection' as const, status: 'Completed' as const, price: '₹800' },
  { id: '4', name: 'Lipid Profile', date: '05 Mar 2026', time: '09:30 AM', type: 'Lab Visit' as const, status: 'Completed' as const, price: '₹600' },
];

export const MOCK_CBC_PARAMS = [
  { name: 'Hemoglobin', value: '14.2', unit: 'g/dL', range: '13.0-17.0', status: 'normal' as const },
  { name: 'RBC Count', value: '5.1', unit: 'M/μL', range: '4.5-5.5', status: 'normal' as const },
  { name: 'WBC Count', value: '11200', unit: '/μL', range: '4000-10000', status: 'high' as const },
  { name: 'Platelet Count', value: '245000', unit: '/μL', range: '150K-400K', status: 'normal' as const },
  { name: 'Hematocrit', value: '42.5', unit: '%', range: '40-50', status: 'normal' as const },
  { name: 'MCV', value: '88', unit: 'fL', range: '80-100', status: 'normal' as const },
  { name: 'MCH', value: '28.5', unit: 'pg', range: '27-32', status: 'normal' as const },
  { name: 'Neutrophils', value: '68', unit: '%', range: '40-70', status: 'normal' as const },
  { name: 'Lymphocytes', value: '24', unit: '%', range: '20-40', status: 'normal' as const },
  { name: 'ESR', value: '18', unit: 'mm/hr', range: '0-15', status: 'high' as const },
];

export const PROFILE_MENU = [
  { title: 'Account', items: [
    { id: '1', icon: '👤', label: 'Edit Profile', screen: 'EditProfile' },
    { id: '2', icon: '👨‍👩‍👧‍👦', label: 'Family Members', screen: 'FamilyMembers' },
    { id: '3', icon: '📍', label: 'Saved Addresses', screen: 'SavedAddresses' },
  ]},
  { title: 'Health', items: [
    { id: '4', icon: '📊', label: 'My Reports', screen: 'Reports' },
    { id: '5', icon: '📋', label: 'Order History', screen: 'OrderHistory' },
    { id: '6', icon: '💳', label: 'Payments & Invoices', screen: 'PaymentsInvoices' },
  ]},
  { title: 'Support', items: [
    { id: '7', icon: '❓', label: 'Help & FAQ', screen: 'HelpFAQ' },
    { id: '8', icon: '📞', label: 'Contact Us', screen: 'ContactUs' },
    { id: '9', icon: '📄', label: 'Terms & Conditions', screen: 'Terms' },
    { id: '10', icon: '🔒', label: 'Privacy Policy', screen: 'PrivacyPolicy' },
  ]},
];

export const MOCK_NOTIFICATIONS = [
  { title: 'Today', data: [
    { id: '1', icon: '📊', title: 'Report Ready', msg: 'Your CBC report is ready. Tap to view.', time: '2 hrs ago', read: false },
    { id: '2', icon: '📅', title: 'Upcoming Appointment', msg: 'Home collection scheduled for tomorrow at 9:00 AM.', time: '5 hrs ago', read: false },
  ]},
  { title: 'Yesterday', data: [
    { id: '3', icon: '🎉', title: 'Special Offer', msg: 'Get 30% off on Full Body Health Checkup.', time: '1 day ago', read: true },
    { id: '4', icon: '🚚', title: 'Sample Collected', msg: 'Your sample has been collected and sent to the lab.', time: '1 day ago', read: true },
  ]},
  { title: 'This Week', data: [
    { id: '5', icon: '📊', title: 'Report Ready', msg: 'Your Thyroid Profile report is now available.', time: '3 days ago', read: true },
    { id: '6', icon: '⏰', title: 'Health Reminder', msg: "It's been 3 months since your last Lipid Profile.", time: '5 days ago', read: true },
  ]},
];
