import { screen } from '@testing-library/react';
import { text } from 'body-parser';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

/**
 * Arrange: className을 지닌 컴포넌트 렌더링
 * Act: 클릭이나 메서드 호출, prop qusrud
 * Assert: 렌더링 후 DOM에 해당 class가 존재하는지 검증
 */

/**
 * 테스트 목록
 * 1. placeHolder 설정
 * 2. className에 따른 css class 설정
 * 3. 텍스트를 입력할 때마다 onChange 핸들러 호출
 * 4. focus 시 border 스타일 변경
 * 5. focus 시 onFocus 핸들러 호출
 * 6. Enter 키 입력 시 onEnter 핸들러 호출
 */
it('className prop으로 설정한 css class가 적용된다.', async () => {
  /**
   * render API 호출: 테스트 환경의 jsDOM에 리액트 컴포넌트가 렌더링된 DOM구조가 반영
   * jsDOM: Node.js에서 사용하기 위해 많은 웹 표준을 순수 자바스크립트로 표현
   */
  await render(<TextField className={'my-class'} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
  screen.debug();

  expect(textInput).toHaveClass('my-class');
});

it('기본 placeholder "텍스트를 입력해주세요."가 노출된다.', async () => {
  /**
   * render API 호출: 테스트 환경의 jsDOM에 리액트 컴포넌트가 렌더링된 DOM구조가 반영
   * jsDOM: Node.js에서 사용하기 위해 많은 웹 표준을 순수 자바스크립트로 표현
   */
  await render(<TextField />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
  screen.debug();

  expect(textInput).toBeInTheDocument('텍스트를 입력해 주세요.');
});

it('placeholder prop에 따라 placeholder는 변경된다.', async () => {
  /**
   * render API 호출: 테스트 환경의 jsDOM에 리액트 컴포넌트가 렌더링된 DOM구조가 반영
   * jsDOM: Node.js에서 사용하기 위해 많은 웹 표준을 순수 자바스크립트로 표현
   */
  await render(<TextField placeholder={'변경 할 placeholder'} />);

  const textInput = screen.getByPlaceholderText('변경 할 placeholder');
  screen.debug();

  expect(textInput).toBeInTheDocument('변경 할 placeholder');
});

it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn();
  const { user } = await render(<TextField onChange={spy} />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
  await user.type(textInput, 'test');

  expect(spy).toHaveBeenCalledWith('test');
});

it('엔터키를 입력하면 onEnter prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn();
  const { user } = await render(<TextField onEnter={spy} />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
  await user.type(textInput, 'test{Enter}');

  expect(spy).toHaveBeenCalledWith('test');
});

it('포커스가 활성화되면 onFocus prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn();
  const { user } = await render(<TextField onFocus={spy} />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
  await user.click(textInput);
  // click과 연관되는 포커스, 마우스다운, 마우스 업 등
  expect(spy).toHaveBeenCalled();
});

it('포커스가 활성화되면 border 스타일이 추가된다.', async () => {
  const { user } = await render(<TextField />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);
  expect(textInput).toHaveStyle({
    borderWidth: 2,
    borderColor: 'rgb(25, 118, 210)',
  });
});
