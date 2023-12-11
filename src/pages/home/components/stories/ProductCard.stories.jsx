import product from '@/__mocks__/response/product.json';
import ProductCard from '@/pages/home/components/ProductCard';

export default {
  title: '홈/상품 카드',
  component: ProductCard,
  argTypes: {
    product: {
      control: 'object',
      description: '상품의 정보',
    },
  },
};

export const Default = {
  name: '기본',
  args: {
    product,
  },
};

export const LongTitle = {
  args: {
    product: {
      ...product,
      title:
        'Long title Example Long title Example Long title Example Long title Example Long title Example Long title Example Long title Example Long title Example Long title Example Long title Example',
    },
  },
  name: '타이틀이 긴 경우',
};

export const LongCategoryName = {
  args: {
    product: {
      ...product,
      category: {
        name: 'Long Category Long Category Long Category Long Category',
      },
    },
  },
  name: '카테고리가 긴 경우',
};
