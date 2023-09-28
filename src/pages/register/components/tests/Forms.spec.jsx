import { screen } from '@testing-library/react';
import React from 'react';

import Forms from '@/pages/register/components/Forms';
import render from '@/utils/test/render';

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => navigateFn,
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

it('3개의 인풋이 존재하며 각 인풋의 라벨은 "이름", "이메일", "비밀번호" 를 순서대로 노출한다', async () => {
  const { container } = await render(<Forms />);

  const inputList = container.querySelectorAll('input');
  const labelList = container.querySelectorAll('label');

  expect(inputList.length).toBe(3);

  expect(labelList[0].textContent).toBe('이름');
  expect(labelList[1].textContent).toBe('이메일');
  expect(labelList[2].textContent).toBe('비밀번호');
});

it('이름을 입력하지 않은 상태에서 제출할 경우 "이름을 입력하세요" 문구가 노출된다', async () => {
  const { user } = await render(<Forms />);
  const submitButton = screen.getByRole('button');

  await user.click(submitButton);

  expect(screen.getByText('이름을 입력하세요')).toBeInTheDocument();
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

it('가입이 성공적으로 진행되었을 경우 "가입 성공!" toast를 노출하며, navigate 함수가 호출된다', async () => {
  const { user } = await render(<Forms />);
  const submitButton = screen.getByRole('button');

  await user.type(screen.getByLabelText('이름'), 'NAME');
  await user.type(screen.getByLabelText('이메일'), 'email@gmail.com');
  await user.type(screen.getByLabelText('비밀번호'), 'password123');
  await user.click(submitButton);

  expect(screen.getByText('가입 성공!')).toBeInTheDocument();
  expect(navigateFn).toHaveBeenNthCalledWith(1, '/login');
});

it('서버에서 요청이 실패할 경우 "잠시 문제가 발생했습니다! 다시 시도해 주세요." toast를 노출한다.', async () => {
  const { user } = await render(<Forms />);
  const submitButton = screen.getByText('가입');

  await user.type(screen.getByLabelText('이름'), 'FAIL');
  await user.type(screen.getByLabelText('이메일'), 'email@gmail.com');
  await user.type(screen.getByLabelText('비밀번호'), 'password123');

  await user.click(submitButton);

  expect(
    screen.getByText('잠시 문제가 발생했습니다! 다시 시도해 주세요.'),
  ).toBeInTheDocument();
});
