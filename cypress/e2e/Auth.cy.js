beforeEach(() => {
  cy.visit('/');
});

describe('로그인이 필요한 페이지에 비로그인 상태로 접속하면 로그인 페이지로 리다이렉트 된다', () => {
  it('장바구니 페이지에 접속할 경우 로그인 페이지로 리다이렉트 된다', () => {
    cy.visit('/cart');

    cy.assertUrl('/login');
  });

  it('구매 페이지로 접속할 경우 로그인 페이지로 리다이렉트 된다', () => {
    cy.visit('/purchase');

    cy.assertUrl('/login');
  });
});

describe('로그인 된 상태라면 로그인이 필요한 페이지에 접속할 수 있다', () => {
  beforeEach(() => {
    cy.login();
  });

  it('장바구니 페이지에 접속할 수 있다', () => {
    cy.visit('/cart');

    cy.assertUrl('/cart');
  });

  it('구매 페이지에 접속할 수 있다', () => {
    cy.visit('/purchase');

    cy.assertUrl('/purchase');
  });
});

describe('로그인 된 상태로 로그인 또는 회원 가입 페이지로 접속할 경우 메인홈 페이지로 리다이렉트 된다', () => {
  beforeEach(() => {
    cy.login();
  });

  it('로그인 페이지에 접속할 경우 메인홈 페이지로 리다이렉트 된다', () => {
    cy.visit('/login');

    cy.assertUrl('/');
  });

  it('회원가입 페이지에 접속할 경우 메인홈 페이지로 리다이렉트 된다', () => {
    cy.visit('/register');

    cy.assertUrl('/');
  });
});

describe('비로그인 상태인 경우 로그인 또는 회원 가입 페이지에 접속할 수 있다', () => {
  it('로그인 페이지에 접속할 수 있다', () => {
    cy.visit('/login');

    cy.assertUrl('/login');
  });

  it('회원가입 페이지에 접속할 수 있다', () => {
    cy.visit('/register');

    cy.assertUrl('/register');
  });
});
