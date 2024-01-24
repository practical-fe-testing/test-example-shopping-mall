import React from 'react';
import { useParams } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';

import Layout from '@/pages/common/components/Layout';
import ProductInfoArea from '@/pages/productDetail/components/ProductInfoArea';
import PurchaseSelection from '@/pages/productDetail/components/PurchaseSelection';
import useProduct from '@/pages/productDetail/hooks/useProduct';

const ProductDetail = () => {
  const { productId } = useParams();
  const { data } = useProduct({ params: { productId } });

  return (
    <Layout containerStyle={{ paddingTop: '30px' }}>
      <ProductInfoArea product={data} />
      <PurchaseSelection product={data} />
    </Layout>
  );
};

export default ProductDetail;
