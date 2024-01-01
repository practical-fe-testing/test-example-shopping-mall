import { screen } from '@testing-library/react';
import React from 'react';

import AvailableUsers from '@/pages/login/components/AvailableUsers';
import render from '@/utils/test/render';

it('"⚠️ 사용 가능한 유저 리스트" 테이블 제목이 노출된다', async () => {
  await render(<AvailableUsers />);

  expect(screen.getByText('⚠️ 사용 가능한 유저 리스트')).toBeInTheDocument();
});

it("table의 헤더로 'email'과 'password'가 노출된다", async () => {
  await render(<AvailableUsers />);

  expect(
    await screen.findByText('email', { selector: 'th' }),
  ).toBeInTheDocument();
  expect(
    await screen.findByText('password', { selector: 'th' }),
  ).toBeInTheDocument();
});

it('회원 email과 비밀번호가 노출된다.', async () => {
  await render(<AvailableUsers />);

  expect(await screen.findByText('john@mail.com')).toBeInTheDocument();
  expect(await screen.findByText('john')).toBeInTheDocument();

  expect(await screen.findByText('maria@mail.com')).toBeInTheDocument();
  expect(await screen.findByText('12345')).toBeInTheDocument();
});
