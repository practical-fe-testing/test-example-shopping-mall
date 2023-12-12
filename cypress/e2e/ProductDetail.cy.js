describe('로그인이 되어있지 않은 경우', () => {
  beforeEach(() => {
    cy.visit('/product/6');
  });

  it('장바구니 버튼 클릭 시 로그인 페이지로 이동한다', () => {
    cy.findByText('장바구니').click();

    cy.assertUrl('/login');
  });

  it('구매 버튼 클릭 시 로그인 페이지로 이동한다', () => {
    cy.findByText('구매').click();

    cy.assertUrl('/login');
  });
});

describe('로그인이 되어있는 경우', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/product/6');
  });

  it('"0개"상태에서 장바구니 클릭 시 "0개 이상의 값을 입력해주세요!" 경고 문구가 노출된다', () => {
    cy.findByText('장바구니').click();

    cy.findByText('0개 이상의 값을 입력해주세요!').should('exist');
  });

  it('상품 수량을 "3"으로 수정한 후 장바구니 버튼을 클릭하면 해당 상품이 장바구니에 추가되며, "Handmade Cotton Fish 3개 장바구니 추가 완료!" 문구가 노출된다', () => {
    cy.findByRole('textbox').type('3');

    cy.findByText('장바구니').click();

    cy.findByText('Handmade Cotton Fish 3개 장바구니 추가 완료!').should(
      'exist',
    );
    cy.getCartButton().should('have.text', '1');
  });

  it('수량을 입력한 후 구매 버튼을 클릭하면 해당 상품이 장바구니에 추가되며, 장바구니 페이지로 이동한다', () => {
    cy.findByRole('textbox').type('3');

    cy.findByText('구매').click();

    cy.assertUrl('/cart');
    cy.getCartButton().should('have.text', '1');
    cy.findByText('Handmade Cotton Fish').should('exist');
  });
});
