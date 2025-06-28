import { screen } from '@testing-library/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { NO_COUPON_ID } from '@/constants';
import Payment from '@/pages/purchase/components/Payment';
import { mockUseCartStore } from '@/utils/test/mockZustandStore';
import render from '@/utils/test/render';

beforeEach(() => {
  mockUseCartStore({
    cart: {
      6: {
        id: 6,
        title: 'Handmade Cotton Fish',
        price: 100,
        description:
          'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
        images: [
          'https://user-images.githubusercontent.com/35371660/230712070-afa23da8-1bda-4cc4-9a59-50a263ee629f.png',
        ],
        count: 3,
      },
      7: {
        id: 7,
        title: 'Awesome Concrete Shirt',
        price: 50,
        description:
          'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
        images: [
          'https://user-images.githubusercontent.com/35371660/230762100-b119d836-3c5b-4980-9846-b7d32ea4a08f.png',
        ],
        count: 4,
      },
    },
    totalCount: 7,
    totalPrice: 500,
  });
});

const TestPayment = (props = {}) => {
  const methods = useForm({
    defaultValues: {
      name: 'leejaesung',
      address: '',
      phone: '',
      requests: '',
      coupon: NO_COUPON_ID,
      ...props,
    },
  });

  return (
    <FormProvider {...methods}>
      <Payment />
    </FormProvider>
  );
};

it('총 상품 금액은 "$500.00"로 노출된다', async () => {
  await render(<TestPayment />);

  expect(screen.getByText('$500.00')).toBeInTheDocument();
});

it('배송비는 "$5.00"로 노출된다', async () => {
  await render(<TestPayment />);

  expect(screen.getByText('$5.00')).toBeInTheDocument();
});

it('할인 쿠폰을 선택하지 않은 경우 "선택 안함"으로 노출되며, 총 결제 금액은 "$505.00"로 노출된다', async () => {
  await render(<TestPayment />);

  expect(screen.getByText('선택 안함')).toBeInTheDocument();
  expect(await screen.findByText('$505.00')).toBeInTheDocument();
});

it('price 타입의 쿠폰인 경우, 총 결제 금액은 "$502.00"로 노출된다', async () => {
  await render(<TestPayment coupon={2} />);

  expect(await screen.findByText('$3 할인 쿠폰')).toBeInTheDocument();
  expect(await screen.findByText('$502.00')).toBeInTheDocument();
});

it('percent 타입의 쿠폰인 경우, 총 결제 금액은 "$455.00"로 노출된다', async () => {
  await render(<TestPayment coupon={3} />);

  expect(await screen.findByText('10% 할인 쿠폰')).toBeInTheDocument();
  expect(await screen.findByText('$455.00')).toBeInTheDocument();
});
