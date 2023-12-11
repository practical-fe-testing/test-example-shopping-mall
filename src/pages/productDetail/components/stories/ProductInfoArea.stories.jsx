import product from '@/__mocks__/response/product.json';
import ProductInfoArea from '@/pages/productDetail/components/ProductInfoArea';

export default {
  title: '상품 상세/상품 상세 이미지 및 설명',
  component: ProductInfoArea,
  argTypes: {
    product: {
      control: 'object',
      description: '상품의 정보',
    },
  },
};

export const Default = {
  name: '상품 상세 이미지 및 설명',
  args: {
    product,
  },
};
