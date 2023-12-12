beforeEach(() => {
  cy.visit('/register');
});

it('이름을 입력하지 않고 가입 버튼을 누를 경우 "이름을 입력하세요" 경고 메세지가 노출된다', () => {
  cy.findByText('가입').click();

  cy.findByText('이름을 입력하세요').should('exist');
});

it('이메일을 입력하지 않고 가입 버튼을 누를 경우 "이메일을 입력하세요" 경고 메세지가 노출된다', () => {
  cy.findByText('가입').click();

  cy.findByText('이메일을 입력하세요').should('exist');
});

it('잘못된 양식의 이메일을 입력한 후 가입 버튼을 클릭하면 "이메일 양식이 올바르지 않습니다" 경고 메세지가 노출된다', () => {
  cy.findByLabelText('이메일').type('email.com');
  cy.findByText('가입').click();

  cy.findByText('이메일 양식이 올바르지 않습니다').should('exist');
});

it('비밀번호를 입력하지 않고 가입 버튼을 클릭할 경우 "비밀번호를 입력하세요" 경고 메세지가 노출된다', () => {
  cy.findByText('가입').click();

  cy.findByText('비밀번호를 입력하세요').should('exist');
});

it('성공적으로 회원 가입이 완료되었을 경우 "가입 성공!"문구가 노출되며 로그인 페이지로 이동한다', () => {
  cy.intercept('POST', 'http://localhost:3000/users', { statusCode: 200 });

  cy.findByLabelText('이름').type('hanjung');
  cy.findByLabelText('이메일').type('han@email.com');
  cy.findByLabelText('비밀번호').type('password123');

  cy.findByText('가입').click();

  cy.findByText('가입 성공!').should('exist');
  cy.assertUrl('/login');
});

it('회원 가입이 실패했을 경우 "잠시 문제가 발생했습니다! 다시 시도해 주세요." 문구가 노출된다', () => {
  cy.intercept('POST', 'http://localhost:3000/users', { statusCode: 401 });

  cy.findByLabelText('이름').type('hanjung');
  cy.findByLabelText('이메일').type('han@email.com');
  cy.findByLabelText('비밀번호').type('password123');

  cy.findByText('가입').click();

  cy.findByText('잠시 문제가 발생했습니다! 다시 시도해 주세요.').should(
    'exist',
  );
});
