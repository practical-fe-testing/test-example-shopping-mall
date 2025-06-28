import { CircularProgress, Box } from '@mui/material';
import React from 'react';

import Layout from '@/pages/common/components/Layout';

const LoadingPage = () => {
  return (
    <Layout containerStyle={{ paddingTop: '30px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '300px',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    </Layout>
  );
};

export default LoadingPage;
