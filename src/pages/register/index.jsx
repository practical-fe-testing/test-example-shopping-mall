import React from 'react';

import Layout, { authStatusType } from '@/pages/common/components/Layout';
import Forms from '@/pages/register/components/Forms';
import PageTitle from '@/pages/register/components/PageTitle';

const RegisterPage = () => {
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
    </Layout>
  );
};

export default RegisterPage;
