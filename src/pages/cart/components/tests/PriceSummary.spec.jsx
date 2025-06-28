import { screen } from '@testing-library/react';
import React from 'react';

import PriceSummary from '@/pages/cart/components/PriceSummary';
import { mockUseCartStore } from '@/utils/test/mockZustandStore';
import render from '@/utils/test/render';

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => navigateFn,
    useLocation: () => ({
      pathname: 'pathname',
    }),
  };
});

beforeEach(() => {
  mockUseCartStore({
    cart: {
      6: {
        id: 6,
        title: 'Handmade Cotton Fish',
        price: 809,
        description:
          'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
        images: [
          'https://user-images.githubusercontent.com/35371660/230712070-afa23da8-1bda-4cc4-9a59-50a263ee629f.png',
          'https://user-images.githubusercontent.com/35371660/230711992-01a1a621-cb3d-44a7-b499-20e8d0e1a4bc.png',
          'https://user-images.githubusercontent.com/35371660/230712056-2c468ef4-45c9-4bad-b379-a9a19d9b79a9.png',
        ],
        count: 3,
      },
      7: {
        id: 7,
        title: 'Awesome Concrete Shirt',
        price: 442,
        description:
          'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
        images: [
          'https://user-images.githubusercontent.com/35371660/230762100-b119d836-3c5b-4980-9846-b7d32ea4a08f.png',
          'https://user-images.githubusercontent.com/35371660/230762118-46d965ab-7ea8-4e8a-9c0f-3ed90f96e1cd.png',
          'https://user-images.githubusercontent.com/35371660/230762139-002578da-092d-4f34-8cae-2cf3b0dfabe9.png',
        ],
        count: 4,
      },
    },
    totalCount: 7,
    totalPrice: 4195,
  });
});

it('총 구매 아이템 수량과 가격이 노출된다("총 7개, $4,195.00")', async () => {
  await render(<PriceSummary />);

  expect(screen.getByText('총 7개, $4,195.00')).toBeInTheDocument();
});

it('구매하기 버튼을 클릭할 경우 "/purchase"경로와 함께 navigate 함수가 호출된다', async () => {
  const { user } = await render(<PriceSummary />);

  await user.click(screen.getByText('구매하기'));

  expect(navigateFn).toHaveBeenNthCalledWith(1, '/purchase');
});
