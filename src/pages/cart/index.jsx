import React from 'react';

import CartTable from '@/pages/cart/components/CartTable';
import EmptyNotice from '@/pages/cart/components/EmptyNotice';
import Layout, { authStatusType } from '@/pages/common/components/Layout';
import { useCartStore } from '@/store/cart';
import { pick } from '@/utils/common';

const Cart = () => {
  const { cart } = useCartStore(state => pick(state, 'cart'));
  const isExist = Object.keys(cart).length;

  return (
    <Layout
      containerStyle={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
      }}
      authStatus={authStatusType.NEED_LOGIN}
    >
      {isExist ? <CartTable /> : <EmptyNotice />}
    </Layout>
  );
};

export default Cart;
