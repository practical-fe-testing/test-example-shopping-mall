import { screen } from '@testing-library/react';
import React from 'react';

import product from '@/__mocks__/response/product.json';
import PurchaseSelection from '@/pages/productDetail/components/PurchaseSelection';
import {
  mockUseCartStore,
  mockUseUserStore,
} from '@/utils/test/mockZustandStore';
import render from '@/utils/test/render';

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => navigateFn,
  };
});

it('장바구니, 구매 버튼 및 수량 입력 텍트트가 노출된다', async () => {
  await render(<PurchaseSelection product={product} />);

  expect(screen.getByRole('button', { name: '장바구니' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '구매' })).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

describe('login이 되지 않은 상태', () => {
  it('login이 되어있지 않은 상태에서 장바구니 추가 버튼을 클릭한 경우 로그인 페이지로 이동된다.', async () => {
    const { user } = await render(<PurchaseSelection product={product} />);

    const button = screen.getByRole('button', { name: '장바구니' });

    await user.click(button);

    expect(navigateFn).toHaveBeenNthCalledWith(1, '/login');
  });

  it('login이 되어있지 않은 상태에서 구매 버튼을 클릭한 경우 로그인 페이지로 이동된다.', async () => {
    const { user } = await render(<PurchaseSelection product={product} />);

    const button = screen.getByRole('button', { name: '구매' });

    await user.click(button);

    expect(navigateFn).toHaveBeenNthCalledWith(1, '/login');
  });
});

describe('login이 된 상태', () => {
  beforeEach(() => {
    mockUseUserStore({ user: { id: 10 }, isLogin: true });
  });

  it('수량을 입력하지 않고 장바구니 추가 버튼을 클릭한 경우 "0개 이상의 값을 입력해주세요!" toast를 노출한다.', async () => {
    const addCartItemMock = vi.fn();

    mockUseCartStore({ addCartItem: addCartItemMock });

    const { user } = await render(<PurchaseSelection product={product} />);
    const button = screen.getByRole('button', { name: '장바구니' });

    await user.click(button);

    expect(
      screen.getByText('0개 이상의 값을 입력해주세요!'),
    ).toBeInTheDocument();
  });

  it('장바구니에 성공적으로 추가되면 "장바구니 추가 완료!" toast를 노출하며, addCartItem 메서드가 호출된다.', async () => {
    const addCartItemMock = vi.fn();

    mockUseCartStore({ addCartItem: addCartItemMock });

    const { user } = await render(<PurchaseSelection product={product} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: '장바구니' });

    await user.type(input, '3');
    await user.click(button);

    expect(
      screen.getByText('Handmade Cotton Fish 3개 장바구니 추가 완료!'),
    ).toBeInTheDocument();
    expect(addCartItemMock).toHaveBeenNthCalledWith(1, product, 10, 3);
  });

  it('수량을 입력하지 않고 구매 버튼을 클릭한 경우 "0개 이상의 값을 입력해주세요!" toast를 노출한다.', async () => {
    const addCartItemMock = vi.fn();

    mockUseCartStore({ addCartItem: addCartItemMock });

    const { user } = await render(<PurchaseSelection product={product} />);
    const button = screen.getByRole('button', { name: '구매' });

    await user.click(button);

    expect(
      screen.getByText('0개 이상의 값을 입력해주세요!'),
    ).toBeInTheDocument();
  });

  it('구매를 성공적으로 진행하면 addCartItem 메서드가 호출되고 장바구니 페이지로 이동한다.', async () => {
    const addCartItemMock = vi.fn();

    mockUseCartStore({ addCartItem: addCartItemMock });

    const { user } = await render(<PurchaseSelection product={product} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: '구매' });

    await user.type(input, '3');
    await user.click(button);

    expect(addCartItemMock).toHaveBeenNthCalledWith(1, product, 10, 3);
    expect(navigateFn).toHaveBeenNthCalledWith(1, '/cart');
  });
});
