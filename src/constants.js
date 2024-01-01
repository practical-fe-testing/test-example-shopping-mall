export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const PHONE_PATTERN = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/i;

export const MAX_CART_VALUE = 999;

export const ALL_CATEGORY_ID = '-1';

export const NO_COUPON_ID = -1;

export const couponType = {
  PERCENT: 'percent',
  PRICE: 'price',
};

// for prevent duplicate
// https://react-hot-toast.com/docs/toast
export const TOAST_ID = 'TOAST_ID';
