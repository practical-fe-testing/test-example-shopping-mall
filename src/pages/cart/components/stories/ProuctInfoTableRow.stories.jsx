import ProductInfoTableRow from '@/pages/cart/components/ProductInfoTableRow';
import {
  items,
  itemsWithLongContents,
} from '@/pages/cart/components/stories/items';

export default {
  title: '장바구니/상품 항목',
  component: ProductInfoTableRow,
};

export const Default = {
  name: '기본',
  args: {
    item: items[0].item,
    user: { id: 0 },
  },
};

export const WithLongContents = {
  name: '상품명이 긴 경우',
  args: {
    item: itemsWithLongContents[0].item,
    user: { id: 0 },
  },
};
