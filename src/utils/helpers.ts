export const formatPhone = (phone: string): string => {
  const c = phone.replace(/\D/g, '');
  return c.length === 10 ? `+91 ${c.slice(0, 3)} ${c.slice(3, 6)} ${c.slice(6)}` : phone;
};

export const maskPhone = (phone: string): string => {
  const c = phone.replace(/\D/g, '');
  return c.length >= 10 ? `+91 ${c.slice(0, 2)}XXX ${c.slice(5, 8)}XX` : phone;
};

export const formatPrice = (amount: number): string => `₹${amount.toLocaleString('en-IN')}`;

export const calcDiscount = (price: number, mrp: number): number => Math.round((1 - price / mrp) * 100);

export const getGreeting = (): string => {
  const h = new Date().getHours();
  return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';
};

export const isValidIndianMobile = (phone: string): boolean => /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''));
