import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', () => {
  const username = 'maria@mail.com';
  const password = '12345';

  cy.visit('/login');

  cy.findByLabelText('이메일').type(username);
  cy.findByLabelText('비밀번호').type(password);
  cy.findByLabelText('로그인').click();

  // 로그인 처리 완료될때까지 기다림
  cy.findByText('Maria');
});

Cypress.Commands.add('logout', () => {
  cy.findByRole('button', { name: 'Maria' }).click();
  cy.findByRole('button', { name: '확인' }).click();
});

Cypress.Commands.add('assertUrl', url => {
  cy.url().should('eq', `${Cypress.env('baseUrl')}${url}`);
});

Cypress.Commands.add('getProductCardByIndex', index => {
  return cy.findAllByTestId('product-card').eq(index);
});

Cypress.Commands.addQuery('getCartButton', () => {
  const getFn = cy.now('get', `[data-testid="cart-icon"]`);

  return subject => {
    const btn = getFn(subject);

    return btn;
  };
});
