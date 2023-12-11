import React from 'react';

import PageTitle from '@/pages/cart/components/PageTitle';
import render from '@/utils/test/render';

it('pageTitle 스냅샷 테스트(toMatchInlineSnapshot)', async () => {
  const { container } = await render(<PageTitle />);

  expect(container).toMatchInlineSnapshot(`
    <div>
      <h1
        class="MuiTypography-root MuiTypography-h4 css-1lnl64-MuiTypography-root"
      >
        상품 리스트
      </h1>
      <div
        style="position: fixed; z-index: 9999; top: 16px; left: 16px; right: 16px; bottom: 16px; pointer-events: none;"
      />
    </div>
  `);
});

it('pageTitle 스냅샷 테스트(toMatchSnapshot)', async () => {
  const { container } = await render(<PageTitle />);

  expect(container).toMatchSnapshot();
});
