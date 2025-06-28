import { Box, Button, CircularProgress, Backdrop } from '@mui/material';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import { NO_COUPON_ID, TOAST_ID } from '@/constants';
import Layout, { authStatusType } from '@/pages/common/components/Layout';
import useLog from '@/pages/common/hooks/useLog';
import ItemList from '@/pages/purchase/components/ItemList';
import Payment from '@/pages/purchase/components/Payment';
import ShippingInformationForm from '@/pages/purchase/components/ShippingInformationForm';
import { usePurchase } from '@/pages/purchase/hooks/usePurchase';
import { useCartStore } from '@/store/cart';
import { useUserStore } from '@/store/user';
import { pick } from '@/utils/common';

const Purchase = () => {
  const { mutate, isLoading } = usePurchase();
  const navigate = useNavigate();
  const { resetCart } = useCartStore(state => pick(state, 'resetCart'));
  const { user } = useUserStore(state => pick(state, 'user'));
  const { sendErrorLog, sendInfoLog } = useLog();
  const methods = useForm({
    defaultValues: {
      name: user?.name ?? '',
      address: '',
      phone: '',
      requests: '',
      coupon: NO_COUPON_ID,
      payment: 'accountTransfer',
    },
  });
  const { handleSubmit } = methods;
  const handleClickPurchase = handleSubmit(forms => {
    mutate(forms, {
      onSuccess: () => {
        sendInfoLog('구매 성공');
        resetCart(user.id);
        toast.success('구매 성공!', { id: TOAST_ID });
        navigate(pageRoutes.main);
      },
      onError: err => {
        sendErrorLog(err);
        toast.error('잠시 문제가 발생했습니다! 다시 시도해 주세요.', {
          id: TOAST_ID,
        });
        console.error(err);
      },
    });
  });

  return (
    <FormProvider {...methods}>
      <Layout
        containerStyle={{ paddingTop: '30px' }}
        authStatus={authStatusType.NEED_LOGIN}
      >
        <Backdrop sx={{ color: '#fff', zIndex: 10000 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <ShippingInformationForm />
        <ItemList />
        <Payment />
        <Box
          sx={{
            paddingTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={handleClickPurchase}
          >
            구매하기
          </Button>
        </Box>
      </Layout>
    </FormProvider>
  );
};

export default Purchase;
