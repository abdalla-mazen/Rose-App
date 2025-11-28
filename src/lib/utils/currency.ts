export const formatCurrency = (amount: number, currency: string = 'EGP'): string => {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};