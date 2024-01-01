import { screen } from '@testing-library/react';
import Cookies from 'js-cookie';
import React from 'react';
import * as reactRouterDom from 'react-router-dom';

import Forms from '@/pages/login/components/Forms';
import render from '@/utils/test/render';

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => navigateFn,
    useLocation: () => ({
      state: {
        prevPath: 'prevPath',
      },
    }),
  };
});

it('이메일을 입력하지 않은 상태에서 제출할 경우 "이메일을 입력하세요" 문구가 노출된다', async () => {
  const { user } = await render(<Forms />);
  const submitButton = screen.getByRole('button');

  await user.click(submitButton);

  expect(screen.getByText('이메일을 입력하세요')).toBeInTheDocument();
});

it('잘못된 이메일 양식을 입력한 상태에서 제출할 경우 "이메일 양식이 올바르지 않습니다" 문구가 노출된다', async () => {
  const { user } = await render(<Forms />);
  const submitButton = screen.getByRole('button');

  await user.type(screen.getByLabelText('이메일'), 'email');
  await user.click(submitButton);

  expect(
    screen.getByText('이메일 양식이 올바르지 않습니다'),
  ).toBeInTheDocument();
});

it('비밀번호 입력하지 않은 상태에서 제출할 경우 "비밀번호를 입력하세요" 문구가 노출된다', async () => {
  const { user } = await render(<Forms />);
  const submitButton = screen.getByRole('button');

  await user.click(submitButton);

  expect(screen.getByText('비밀번호를 입력하세요')).toBeInTheDocument();
});

describe('로그인이 성공한 경우', () => {
  it('전달된 access_token을 쿠키에 저장하는 메서드를 호출한다', async () => {
    const { user } = await render(<Forms />);
    const submitButton = screen.getByRole('button');
    vi.spyOn(Cookies, 'set');

    await user.type(screen.getByLabelText('이메일'), 'email@gmail.com');
    await user.type(screen.getByLabelText('비밀번호'), 'password123');
    await user.click(submitButton);

    expect(Cookies.set).toHaveBeenCalled(1);
    expect(Cookies.set).toHaveBeenCalledWith('access_token', 'access_token');
  });

  it('state에 prevPath가 있다면 "prevPath" 경로로 navigate함수를 호출한다', async () => {
    const { user } = await render(<Forms />);
    const submitButton = screen.getByRole('button');

    await user.type(screen.getByLabelText('이메일'), 'email@gmail.com');
    await user.type(screen.getByLabelText('비밀번호'), 'password123');
    await user.click(submitButton);

    expect(navigateFn).toHaveBeenNthCalledWith(1, 'prevPath');
  });

  it('state에 prevPath가 없다면 "/" 경로로 navigate함수를 호출한다', async () => {
    vi.spyOn(reactRouterDom, 'useLocation').mockImplementation(() => ({
      state: {},
    }));
    const { user } = await render(<Forms />);
    const submitButton = screen.getByRole('button');

    await user.type(screen.getByLabelText('이메일'), 'email@gmail.com');
    await user.type(screen.getByLabelText('비밀번호'), 'password123');

    await user.click(submitButton);

    expect(navigateFn).toHaveBeenNthCalledWith(1, '/');
  });
});

it('"회원가입" 링크를 클릭할 경우 "/register" 경로로 navigate 함수가 호출된다', async () => {
  const { user } = await render(<Forms />);

  await user.click(screen.getByRole('link', { name: '회원가입' }));

  expect(navigateFn).toHaveBeenNthCalledWith(1, '/register');
});
