/**
 * AMPATH App — API Service Layer
 * All endpoints stubbed and ready for binding.
 * Replace BASE_URL with your actual backend.
 *
 * Usage in screens:
 *   import { api } from '../../services/api';
 *   const reports = await api.getReports();
 */

const BASE_URL = 'https://api.ampath.com/v1'; // TODO: Replace with actual

class ApiService {
  private token: string | null = null;

  setToken(token: string) { this.token = token; }
  clearToken() { this.token = null; }

  private async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
    };

    const response = await fetch(url, { ...options, headers });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Request failed');
    return data;
  }

  // ── Auth ──
  sendOTP(phone: string) {
    return this.request('/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone }) });
  }

  verifyOTP(phone: string, otp: string) {
    return this.request<{ token: string; user: any }>('/auth/verify-otp', { method: 'POST', body: JSON.stringify({ phone, otp }) });
  }

  // ── Profile ──
  getProfile() { return this.request('/user/profile'); }

  updateProfile(data: any) {
    return this.request('/user/profile', { method: 'PUT', body: JSON.stringify(data) });
  }

  // ── Reports ──
  getReports(params?: { status?: string; page?: number }) {
    const q = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return this.request(`/reports${q}`);
  }

  getReportDetail(reportId: string) { return this.request(`/reports/${reportId}`); }

  getReportPDF(reportId: string) { return this.request(`/reports/${reportId}/pdf`); }

  // ── Tests / Catalogue ──
  getTests(params?: { category?: string; search?: string }) {
    const q = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return this.request(`/tests${q}`);
  }

  getHealthPackages() { return this.request('/packages'); }

  getTestDetail(testId: string) { return this.request(`/tests/${testId}`); }

  // ── Bookings ──
  getBookings(status?: string) {
    return this.request(`/bookings${status ? `?status=${status}` : ''}`);
  }

  createBooking(data: { testIds: string[]; type: 'home' | 'lab'; date: string; time: string; addressId?: string; labId?: string }) {
    return this.request('/bookings', { method: 'POST', body: JSON.stringify(data) });
  }

  cancelBooking(bookingId: string) {
    return this.request(`/bookings/${bookingId}/cancel`, { method: 'POST' });
  }

  rescheduleBooking(bookingId: string, date: string, time: string) {
    return this.request(`/bookings/${bookingId}/reschedule`, { method: 'POST', body: JSON.stringify({ date, time }) });
  }

  // ── Labs ──
  getNearbyLabs(lat: number, lng: number) {
    return this.request(`/labs?lat=${lat}&lng=${lng}`);
  }

  // ── Notifications ──
  getNotifications() { return this.request('/notifications'); }

  markNotificationRead(id: string) {
    return this.request(`/notifications/${id}/read`, { method: 'POST' });
  }

  markAllRead() {
    return this.request('/notifications/read-all', { method: 'POST' });
  }

  // ── Family Members ──
  getFamilyMembers() { return this.request('/family'); }

  addFamilyMember(data: any) {
    return this.request('/family', { method: 'POST', body: JSON.stringify(data) });
  }

  // ── Addresses ──
  getAddresses() { return this.request('/addresses'); }

  addAddress(data: any) {
    return this.request('/addresses', { method: 'POST', body: JSON.stringify(data) });
  }

  // ── Payments ──
  getPaymentHistory() { return this.request('/payments'); }

  initiatePayment(bookingId: string) {
    return this.request(`/payments/initiate`, { method: 'POST', body: JSON.stringify({ bookingId }) });
  }
}

export const api = new ApiService();
