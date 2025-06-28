import { Box, Skeleton } from '@mui/material';
import React, { Suspense } from 'react';

import ApiErrorBoundary from '@/pages/common/components/ApiErrorBoundary';
import CategoryRadioGroup from '@/pages/home/components/CategoryRadioGroup';
import PriceRange from '@/pages/home/components/PriceRange';
import SearchBar from '@/pages/home/components/SearchBar';
import { useFilterStore } from '@/store/filter';
import { pick } from '@/utils/common';

const ProductFilterBox = ({ children }) => (
  <Box sx={{ padding: '10px 0' }}>{children}</Box>
);

const ProductFilter = () => {
  const { categoryId, setCategoryId, setMaxPrice, setMinPrice, setTitle } =
    useFilterStore(state =>
      pick(
        state,
        'categoryId',
        'setMinPrice',
        'setMaxPrice',
        'setTitle',
        'setCategoryId',
      ),
    );

  const handleChangeInput = ev => {
    setTitle(ev.target.value);
  };
  const handleMinPrice = ev => {
    setMinPrice(ev.target.value);
  };
  const handleMaxPrice = ev => {
    setMaxPrice(ev.target.value);
  };
  const handleChangeCategory = ev => {
    setCategoryId(ev.target.value);
  };

  return (
    <Box sx={{ padding: '10px' }}>
      <ProductFilterBox>
        <SearchBar onChangeInput={handleChangeInput} />
      </ProductFilterBox>
      <ProductFilterBox>
        <ApiErrorBoundary>
          <Suspense fallback={<Skeleton height="100px" />}>
            <CategoryRadioGroup
              categoryId={categoryId}
              onChangeCategory={handleChangeCategory}
            />
          </Suspense>
        </ApiErrorBoundary>
      </ProductFilterBox>
      <ProductFilterBox>
        <PriceRange
          onChangeMinPrice={handleMinPrice}
          onChangeMaxPrice={handleMaxPrice}
        />
      </ProductFilterBox>
    </Box>
  );
};

export default ProductFilter;
