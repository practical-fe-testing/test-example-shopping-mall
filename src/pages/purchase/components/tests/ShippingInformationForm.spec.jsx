import { screen } from '@testing-library/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { NO_COUPON_ID } from '@/constants';
import ShippingInformationForm from '@/pages/purchase/components/ShippingInformationForm';
import render from '@/utils/test/render';

const TestForm = props => {
  const methods = useForm({
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      requests: '',
      coupon: NO_COUPON_ID,
      ...props,
    },
  });

  return (
    <FormProvider {...methods}>
      <ShippingInformationForm />
      <button type="button" onClick={methods.handleSubmit(() => {})}>
        테스트 버튼
      </button>
    </FormProvider>
  );
};

it('쿠폰 데이터를 가져오면 정상적으로 쿠폰 항목을 노출한다.', async () => {
  const { user } = await render(<TestForm />);

  const [selectBoxButton] = await screen.findAllByRole('button');

  await user.click(selectBoxButton);

  expect(screen.getByText('가입 기념! $5 할인 쿠폰')).toBeInTheDocument();
  expect(screen.getByText('$3 할인 쿠폰')).toBeInTheDocument();
  expect(screen.getByText('10% 할인 쿠폰')).toBeInTheDocument();
});

it('이름을 입력하지 않고 폼 전송을 시도하면 "이름을 입력하세요" 텍스트가 노출된다.', async () => {
  const { user } = await render(<TestForm />);

  const testSubmitButton = await screen.findByText('테스트 버튼');
  await user.click(testSubmitButton);

  expect(screen.getByText('이름을 입력하세요')).toBeInTheDocument();
});

it('주소를 입력하지 않고 폼 전송을 시도하면 "주소를 입력하세요" 텍스트가 노출된다.', async () => {
  const { user } = await render(<TestForm />);

  const testSubmitButton = await screen.findByText('테스트 버튼');
  await user.click(testSubmitButton);

  expect(screen.getByText('주소를 입력하세요')).toBeInTheDocument();
});

it('휴대폰 번호를 입력하지 않고 폼 전송을 시도하면 "휴대폰 번호를 입력하세요" 텍스트가 노출된다.', async () => {
  const { user } = await render(<TestForm />);

  const testSubmitButton = await screen.findByText('테스트 버튼');
  await user.click(testSubmitButton);

  expect(screen.getByText('휴대폰 번호를 입력하세요')).toBeInTheDocument();
});

it('휴대폰 번호의 패턴이 틀린 상태에서 폼 전송을 시도하면 "-를 포함한 휴대폰 번호만 가능합니다" 텍스트가 노출된다.', async () => {
  const { user } = await render(<TestForm phone="01099999999" />);

  const testSubmitButton = await screen.findByText('테스트 버튼');
  await user.click(testSubmitButton);

  expect(
    screen.getByText('-를 포함한 휴대폰 번호만 가능합니다'),
  ).toBeInTheDocument();
});
