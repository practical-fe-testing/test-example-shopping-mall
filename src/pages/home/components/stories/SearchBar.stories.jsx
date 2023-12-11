import { within } from '@storybook/testing-library';

import SearchBar from '@/pages/home/components/SearchBar';

export default {
  title: '홈/상품 필터/상품 검색',
  component: SearchBar,
};

export const Default = {
  name: '기본',
};

export const WithContents = {
  name: '상품이 입력된 상태',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    input.value = 'Handmade Cotton Fish';
  },
};
