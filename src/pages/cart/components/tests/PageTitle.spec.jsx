import React from 'react';

import PageTitle from '@/pages/cart/components/PageTitle';
import render from '@/utils/test/render';

// 테스트 파일 내에 스냅샷까지 함께 관리하고 싶은 경우
it('pageTitle 스냅샷 테스트(toMatchInlineSnapshot)', async () => {
  const { container } = await render(<PageTitle />);

  expect(container).toMatchInlineSnapshot(`
    <div>
      <h2
        class="MuiTypography-root MuiTypography-h4 css-1lnl64-MuiTypography-root"
      >
        상품 리스트
      </h2>
      <div
        style="position: fixed; z-index: 9999; top: 16px; left: 16px; right: 16px; bottom: 16px; pointer-events: none;"
      />
    </div>
  `);
});

// 테스트 파일과 스냅샷 파일을 별도로 관리하고 싶은 경우
it('pageTitle 스냅샷 테스트(toMatchSnapshot)', async () => {
  const { container } = await render(<PageTitle />);

  expect(container).toMatchSnapshot();
});
