import { within, userEvent } from '@storybook/testing-library';

import PriceRange from '@/pages/home/components/PriceRange';

export default {
  title: '홈/상품 필터/가격 검색',
  component: PriceRange,
};

export const Default = { name: '기본' };

export const WithValue = {
  name: '가격이 입력된 상태',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const [min, max] = canvas.getAllByRole('textbox');
    await userEvent.type(min, '300');
    await userEvent.type(max, '40000');
  },
};
