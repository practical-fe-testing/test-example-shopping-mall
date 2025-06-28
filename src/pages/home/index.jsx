import { Grid } from '@mui/material';
import React, { Suspense } from 'react';

import ApiErrorBoundary from '@/pages/common/components/ApiErrorBoundary';
import Layout from '@/pages/common/components/Layout';
import ProductFilter from '@/pages/home/components/ProductFilter';
import ProductList from '@/pages/home/components/ProductList';
import SkeletonProductCard from '@/pages/home/components/SkeletonProductCard';

const Home = () => {
  return (
    <Layout containerStyle={{ padding: '10px' }}>
      <ProductFilter />
      <ApiErrorBoundary>
        <Suspense
          fallback={
            <Grid container spacing={1} rowSpacing={1} justifyContent="center">
              {[...Array(12).keys()].map(index => (
                <SkeletonProductCard key={index} />
              ))}
            </Grid>
          }
        >
          <ProductList />
        </Suspense>
      </ApiErrorBoundary>
    </Layout>
  );
};

export default Home;
