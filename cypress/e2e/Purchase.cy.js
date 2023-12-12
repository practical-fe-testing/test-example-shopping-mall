beforeEach(() => {
  cy.login();
  cy.getProductCardByIndex(0).findByText('장바구니').click();
  cy.getProductCardByIndex(1).findByText('장바구니').click();

  cy.visit('/purchase');
});

describe('배송 정보', () => {
  beforeEach(() => {
    cy.findAllByRole('table').eq(0).findAllByRole('row').as('shippingList');
  });

  it('로그인한 사용자의 이름 "Maria"가 입력되어 있다.', () => {
    cy.get('@shippingList')
      .eq(0)
      .findByRole('textbox')
      .should('have.value', 'Maria');
  });

  it('할인 쿠폰을 선택하지 않은 경우 "없음"이 노출되며, 특정 할인 쿠폰을 선택하면 해당 쿠폰의 이름("가입 기념! $5 할인 쿠폰")이 노출된다', () => {
    cy.get('@shippingList')
      .eq(2)
      .findByRole('button', { name: '없음' })
      .click();
    cy.findByText('가입 기념! $5 할인 쿠폰').click();

    cy.get('@shippingList')
      .eq(2)
      .findByRole('button', { name: '가입 기념! $5 할인 쿠폰' })
      .should('exist');
  });

  it('이름을 입력하지 않고 구매하기 버튼을 클릭할 경우 "이름을 입력하세요" 경고 문구가 노출된다.', () => {
    cy.get('@shippingList').eq(0).findByRole('textbox').clear();

    cy.findByText('구매하기').click();

    cy.get('@shippingList')
      .eq(0)
      .findByText('이름을 입력하세요')
      .should('exist');
  });

  it('주소를 입력하지 않고 구매하기 버튼을 클릭할 경우 "주소를 입력하세요" 경고 문구가 노출된다.', () => {
    cy.findByText('구매하기').click();

    cy.get('@shippingList')
      .eq(1)
      .findByText('주소를 입력하세요')
      .should('exist');
  });

  it('전화번호를 입력하지 않고 구매하기 버튼을 클릭할 경우 "휴대폰 번호를 입력하세요" 경고 문구가 노출된다.', () => {
    cy.findByText('구매하기').click();

    cy.get('@shippingList')
      .eq(3)
      .findByText('휴대폰 번호를 입력하세요')
      .should('exist');
  });

  it('잘못된 전화번호 양식을 입력하고 구매하기 버튼을 클릭할 경우 "-를 포함한 휴대폰 번호만 가능합니다" 경고 문구가 노출된다.', () => {
    cy.get('@shippingList')
      .eq(3)
      .findByPlaceholderText('휴대폰 번호를 입력하세요')
      .type('00001110aa');
    cy.findByText('구매하기').click();

    cy.get('@shippingList')
      .eq(3)
      .findByText('-를 포함한 휴대폰 번호만 가능합니다')
      .should('exist');
  });
});

describe('구매 물품', () => {
  beforeEach(() => {
    cy.findAllByRole('table').eq(1).findAllByRole('row').as('itemList');
  });

  it('구매하려는 상품의 정보가 나타난다', () => {
    cy.get('@itemList')
      .eq(0)
      .findByText('Handmade Cotton Fish')
      .should('exist');
    cy.get('@itemList').eq(0).findByText('1개').should('exist');
    cy.get('@itemList').eq(0).findByText('$809.00').should('exist');

    cy.get('@itemList')
      .eq(1)
      .findByText('Awesome Concrete Shirt')
      .should('exist');
    cy.get('@itemList').eq(1).findByText('1개').should('exist');
    cy.get('@itemList').eq(1).findByText('$442.00').should('exist');
  });
});

describe('결제 정보', () => {
  beforeEach(() => {
    cy.findAllByRole('table').eq(0).findAllByRole('row').as('shippingList');
    cy.findAllByRole('table').eq(2).findAllByRole('row').as('paymentList');
  });

  it('상품의 총합($1,251.00), 선택한 쿠폰, 배송비($5.00)가 나타나며, 모든 총합이 결제 금액($1,256.00)에 나타난다.', () => {
    cy.get('@paymentList').eq(0).findByText('$1,251.00').should('exist');
    cy.get('@paymentList').eq(1).findByText('선택 안함').should('exist');
    cy.get('@paymentList').eq(2).findByText('$5.00').should('exist');
    cy.get('@paymentList').eq(3).findByText('$1,256.00').should('exist');
  });

  it('배송 정보에서 특정 할인 쿠폰을 선택하면 결제 정보에 해당 쿠폰 정보가 노출되며, 결제 금액이 재계산된다', () => {
    cy.get('@shippingList')
      .eq(2)
      .findByRole('button', { name: '없음' })
      .click();
    cy.findByText('가입 기념! $5 할인 쿠폰').click();

    cy.get('@paymentList').eq(0).findByText('$1,251.00').should('exist');
    cy.get('@paymentList')
      .eq(1)
      .findByText('가입 기념! $5 할인 쿠폰')
      .should('exist');
    cy.get('@paymentList').eq(2).findByText('$5.00').should('exist');
    cy.get('@paymentList').eq(3).findByText('$1,251.00').should('exist');
  });
});

it('구매하기 성공시 장바구니는 초기화 되고 메인홈 페이지로 이동하며, "구매 성공!" 메세지가 노출된다', () => {
  cy.intercept('POST', 'http://localhost:3000/purchase', {
    statusCode: 200,
  });
  cy.findAllByRole('table').eq(0).findAllByRole('row').as('shippingList');

  cy.get('@shippingList')
    .eq(1)
    .findByPlaceholderText('주소를 입력하세요')
    .type('Seoul, Gwanakgu');
  cy.get('@shippingList')
    .eq(3)
    .findByPlaceholderText('휴대폰 번호를 입력하세요')
    .type('000-1110-1111');

  cy.findByText('구매하기').click();

  cy.assertUrl('/');
  cy.findByText('구매 성공!').should('exist');
  cy.getCartButton().should('have.text', '');
});

it('구매 실패시 "잠시 문제가 발생했습니다! 다시 시도해 주세요."라고 경고 문구가 노출된다', () => {
  cy.intercept('POST', 'http://localhost:3000/purchase', {
    statusCode: 500,
  });

  cy.findByPlaceholderText('주소를 입력하세요').type('Seoul, Gwanakgu');
  cy.findByPlaceholderText('휴대폰 번호를 입력하세요').type('000-1110-1111');

  cy.findByText('구매하기').click();

  cy.findByText('잠시 문제가 발생했습니다! 다시 시도해 주세요.').should(
    'exist',
  );
});
