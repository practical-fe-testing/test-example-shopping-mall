import CheckIcon from '@mui/icons-material/Check';
import { Stack, Button } from '@mui/material';
import React, { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';

import { pageRoutes } from '@/apiRoutes';
import { TOAST_ID } from '@/constants';
import { cartValidationMessages } from '@/messages';
import CartButtonGroup from '@/pages/productDetail/components/CartButtonGroup';
import { useCartStore } from '@/store/cart';
import { useUserStore } from '@/store/user';
import { pick } from '@/utils/common';

const PurchaseSelection = ({ product }) => {
  const navigate = useNavigate();
  const countRef = useRef(0);
  const { addCartItem } = useCartStore(state => pick(state, 'addCartItem'));
  const { user, isLogin } = useUserStore(state =>
    pick(state, 'user', 'isLogin'),
  );

  const purchaseProduct = () => {
    if (!isLogin) {
      navigate(pageRoutes.login);
      return;
    }

    if (countRef.current === 0) {
      toast.error(cartValidationMessages.MIN_INPUT_VALUE, { id: TOAST_ID });
      return;
    }

    addCartItem(product, user.id, countRef.current);
    navigate(pageRoutes.cart);
  };

  const addCart = () => {
    if (!isLogin) {
      navigate(pageRoutes.login);
      return;
    }

    if (countRef.current === 0) {
      toast.error(cartValidationMessages.MIN_INPUT_VALUE, { id: TOAST_ID });
      return;
    }

    addCartItem(product, user.id, countRef.current);
    toast.success(
      `${product.title} ${countRef.current}개 장바구니 추가 완료!`,
      { id: TOAST_ID },
    );
  };

  return (
    <Stack direction="column" spacing={2} mt={5}>
      <CartButtonGroup
        onClickAddCart={addCart}
        onChangeCount={count => {
          countRef.current = count;
        }}
      />
      <Button
        variant="contained"
        startIcon={<CheckIcon />}
        onClick={purchaseProduct}
      >
        구매
      </Button>
    </Stack>
  );
};

export default PurchaseSelection;
