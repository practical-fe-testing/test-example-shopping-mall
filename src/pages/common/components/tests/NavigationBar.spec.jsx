import { screen, within } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';

import NavigationBar from '@/pages/common/components/NavigationBar';
import {
  mockUseUserStore,
  mockUseCartStore,
} from '@/utils/test/mockZustandStore';
import render from '@/utils/test/render';
import { server } from '@/utils/test/setupTests';

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

it('"Wish Mart" 사이트 제목을 클릭할 경우 "/" 경로로 navigate가 호출된다.', async () => {
  const { user } = await render(<NavigationBar />);

  await user.click(screen.getByText('Wish Mart'));

  expect(navigateFn).toHaveBeenNthCalledWith(1, '/');
});

describe('로그인이 된 경우', () => {
  const userId = 10;

  beforeEach(() => {
    server.use(
      rest.get('/user', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            email: 'maria@mail.com',
            id: userId,
            name: 'Maria',
            password: '12345',
          }),
        );
      }),
    );
    mockUseUserStore({ isLogin: true });

    const cart = {
      6: {
        id: 6,
        title: 'Handmade Cotton Fish',
        price: 100,
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
        price: 50,
        description:
          'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
        images: [
          'https://user-images.githubusercontent.com/35371660/230762100-b119d836-3c5b-4980-9846-b7d32ea4a08f.png',
          'https://user-images.githubusercontent.com/35371660/230762118-46d965ab-7ea8-4e8a-9c0f-3ed90f96e1cd.png',
          'https://user-images.githubusercontent.com/35371660/230762139-002578da-092d-4f34-8cae-2cf3b0dfabe9.png',
        ],
        count: 4,
      },
    };
    mockUseCartStore({ cart });
  });

  it('장바구니(담긴 상품 수와 버튼)와 로그아웃 버튼(사용자 이름: "Maria")이 노출된다.', async () => {
    await render(<NavigationBar />);

    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: 'Maria' }),
    ).toBeInTheDocument();
  });

  it('장바구니 버튼 클릭 시 "/cart" 경로로 navigate를 호출한다.', async () => {
    const { user } = await render(<NavigationBar />);

    const cartIcon = screen.getByTestId('cart-icon');
    await user.click(cartIcon);

    expect(navigateFn).toHaveBeenNthCalledWith(1, '/cart');
  });

  describe('로그아웃 버튼(사용자 이름: "Maria")을 클릭하는 경우', () => {
    let userEvent;
    beforeEach(async () => {
      const { user } = await render(<NavigationBar />);
      userEvent = user;

      const logoutBtn = await screen.findByRole('button', { name: 'Maria' });
      await user.click(logoutBtn);
    });

    it('모달이 렌더링되며, 모달 내에 "로그아웃 하시겠습니까?" 텍스트가 렌더링된다.', () => {
      const dialog = screen.getByRole('dialog');

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(
        within(dialog).getByText('로그아웃 하시겠습니까?'),
      ).toBeInTheDocument();
    });

    it('모달의 확인 버튼을 누르면, 로그아웃이 되며, 모달이 사라진다.', async () => {
      const confirmBtn = screen.getByRole('button', { name: '확인' });

      await userEvent.click(confirmBtn);

      expect(
        screen.getByRole('button', { name: '로그인' }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Maria' }),
      ).not.toBeInTheDocument();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('모달의 취소 버튼을 누르면, 모달이 사라진다.', async () => {
      const cancelBtn = screen.getByRole('button', { name: '취소' });

      await userEvent.click(cancelBtn);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});

describe('로그인이 안된 경우', () => {
  it('로그인 버튼이 노출되며, 클릭 시 "/login" 경로와 현재 pathname인 "pathname"과 함께 navigate를 호출한다.', async () => {
    const { user } = await render(<NavigationBar />);

    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '로그인' }));

    expect(navigateFn).toHaveBeenNthCalledWith(1, '/login', {
      state: { prevPath: 'pathname' },
    });
  });
});
