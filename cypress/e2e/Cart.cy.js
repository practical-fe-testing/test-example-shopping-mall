beforeEach(() => {
  cy.login();
});

describe('장바구니에 상품이 없는 경우', () => {
  beforeEach(() => {
    cy.getCartButton().click();
  });

  it('"텅~" 글자가 나타난다', () => {});

  it('"홈으로 가기" 링크를 클릭하는 경우 홈으로 이동한다', () => {});
});

describe('장바구니에 상품이 추가되어 있는 경우', () => {
  beforeEach(() => {
    cy.getProductCardByIndex(0).findByText('장바구니').click();
    cy.getProductCardByIndex(1).findByText('장바구니').click();

    cy.getCartButton().click();
  });

  it('추가한 상품이 장바구니 상품 목록에 나타나며, 상품의 총 수량과 가격 총합인 "총 2개, $1,251.00"이 나타난다', () => {});

  it('장바구니 상품의 수량를 "10"으로 변경할 경우 총 갯수와 총합은 "총 11개, $8,532.00"로 변경된다', () => {});

  it('삭제(휴지통) 버튼을 클릭할 경우 해당 상품이 장바구니에서 삭제된다', () => {});

  it('"구매하기" 버튼을 클릭할 경우 구매 페이지로 이동된다', () => {});
});
