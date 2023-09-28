import { screen, within } from '@testing-library/react';
import React from 'react';

import ItemList from '@/pages/purchase/components/ItemList';
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

it('구매 상품들의 이름, 수량, 금액이 순서대로 노출된다.', async () => {
  await render(<ItemList />);

  const rows = screen.getAllByRole('row');
  const first = within(rows[0]);
  const second = within(rows[1]);

  expect(first.getByText('Handmade Cotton Fish')).toBeInTheDocument();
  expect(first.getByText('3개')).toBeInTheDocument();
  expect(first.getByText('$300.00')).toBeInTheDocument();

  expect(second.getByText('Awesome Concrete Shirt')).toBeInTheDocument();
  expect(second.getByText('4개')).toBeInTheDocument();
  expect(second.getByText('$200.00')).toBeInTheDocument();
});
