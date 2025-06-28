const USDollar = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatPrice = value => USDollar.format(value);

const NumberFormat = Intl.NumberFormat('en-US');

export const formatNumber = value => NumberFormat.format(value);
