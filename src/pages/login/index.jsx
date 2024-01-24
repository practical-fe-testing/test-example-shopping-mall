import { Skeleton } from '@mui/material';
import React, { Suspense } from 'react';

import ApiErrorBoundary from '@/pages/common/components/ApiErrorBoundary';
import Layout, { authStatusType } from '@/pages/common/components/Layout';
import AvailableUsers from '@/pages/login/components/AvailableUsers';
import Forms from '@/pages/login/components/Forms';
import PageTitle from '@/pages/login/components/PageTitle';

const LoginPage = () => {
  return (
    <Layout
      containerStyle={{
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      authStatus={authStatusType.NEED_NOT_LOGIN}
    >
      <PageTitle />
      <Forms />
      <ApiErrorBoundary>
        <Suspense fallback={<Skeleton sx={{ width: 200, height: 80 }} />}>
          <AvailableUsers />
        </Suspense>
      </ApiErrorBoundary>
    </Layout>
  );
};

export default LoginPage;
