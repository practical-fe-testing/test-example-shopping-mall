import { Typography } from '@mui/material';
import React from 'react';

import ProductImagesSwiper from '@/pages/productDetail/components/ProductImagesSwiper';
import { formatPrice } from '@/utils/formatter';

const ProductInfoArea = ({ product }) => {
  return (
    <>
      <ProductImagesSwiper images={product.images} />
      <Typography
        variant="h5"
        noWrap
        textAlign="center"
        fontStyle="oblique"
        mt={4}
      >
        {product.title}
      </Typography>
      <Typography
        variant="h6"
        noWrap
        textAlign="center"
        fontStyle="oblique"
        mt={2}
      >
        {formatPrice(product.price)}
      </Typography>
    </>
  );
};

export default ProductInfoArea;
