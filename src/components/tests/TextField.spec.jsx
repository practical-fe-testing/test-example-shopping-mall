import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

beforeEach(() => {
  console.log('root - beforeEach');
});
beforeAll(() => {
  console.log('root - beforeAll');
});

afterEach(() => {
  console.log('root - afterEach');
});
afterAll(() => {
  console.log('root - afterAll');
});

it('className prop으로 설정한 css class가 적용된다.', async () => {
  // 1. Arrange - 테스트를 위한 환경 만들기
  // -> className을 지닌 컴포넌트 렌더링
  // 2. Act - 테스트할 동작 발생
  // -> 렌더링에 대한 검증이기 때문에 이 단계는 생략
  // -> 클릭이나 메서드 호출, prop 변경 등등에 대한 작업이 여기에 해당
  // 3. Assert - 올바른 동작이 실행되었는지 검증
  // -> 렌더링 후 DOM에 해당 class가 존재하는지 검증

  // render API를 호출 -> 테스트 환경의 jsDOM에 리액트 컴포넌트가 렌더링된 DOM 구조가 반영
  // jsDOM: Node.js 에서 사용하기 위해 많은 웹 표준을 순수 자바스크립트로 구현
  await render(<TextField className="my-class" />); //<<Arrange

  //vitest의 expect 함수를 사용하여 기대 결과를 검증한다.
  //className이라는 내부 prop이나 state 값을 검증하는 것이 아니라
  //렌더링 되는 DOM 구조가 올바르게 변경되었는지 확인하는 것이다.
  //최종적으로 사용자가 보는 결과는 DOM이기 때문이다.
  expect(screen.getByPlaceholderText('텍스트를 입력해 주세요.')).toHaveClass(
    'my-class',
  ); //<<Assert

  // screen.debug();
});

describe('placeholder', () => {
  beforeEach(() => {
    console.log('describe - beforeEach');
  });
  // 기대결과 === 실제결과 -> 성공
  // 기대결과 !== 실제결과 -> 실패
  it('기본 placeholder "텍스트를 입력해 주세요." 가 노출된다.', async () => {
    await render(<TextField />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    // screen.debug();

    expect(textInput).toBeInTheDocument();
    //단언(assertion) ->테스트가 통과하기 위한 조건 -> 검증 실행
  });

  it('placeholder prop에 따라 placeholder가 변경된다..', async () => {
    await render(<TextField placeholder="상품명을 입력해주세요." />);

    const textInput = screen.getByPlaceholderText('상품명을 입력해주세요.');

    expect(textInput).toBeInTheDocument();
  });

  it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.'),
    async () => {
      const spy = vi.fn(); // 스파이 함수
      // 스파이 함수: 테스트 코드에서 특정 함수가 호출되었는지, 함수의 인자로 어떤 것이 넘어왔는지 어떤 값을 반환하는지 등 다양한 값들을 저장한다.
      const { user } = await render(<TextField onChange={spy} />);

      const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

      await user.type(textInput, 'test');

      expect(spy).toHaveBeenCalledWith('test');
    };

  it('엔터키를 입력하면 onEnter prop으로 등록한 함수가 호출된다.', async () => {
    const spy = vi.fn();

    const { user } = await render(<TextField onEnter={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.type(textInput, 'test{Enter}');

    expect(spy).toHaveBeenCalledWith('test');
  });

  it('포커스가 활성화되면 onFocus prop으로 등록한 함수가 호출된다.', async () => {
    // 포커스 활성화하는 방법은 다양하다.
    // 탭 키로 인풋 요소로 포커스 이동
    // 인풋 요소를 클릭했을 때 (가장 보편적이기 때문에 이걸 사용)
    // textInput.focus()로 직접 발생

    const spy = vi.fn();
    const { user } = await render(<TextField onFocus={spy} />);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    await user.click(textInput);
    //click과 연관 -> 포커스, 마우스다운, 마우스 업 등...

    expect(spy).toHaveBeenCalled(); //onFocus는 인자가 없어서 호출되었는지만 검증한다.
  });

  it('포커스가 활성화되면 border 스타일이 추가된다.', async () => {
    const { user } = await render(<TextField />);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    await user.click(textInput);
    expect(textInput).toHaveStyle({
      borderWidth: '2px',
      borderColor: 'rgb(25, 118, 210)',
    });
  });
});
