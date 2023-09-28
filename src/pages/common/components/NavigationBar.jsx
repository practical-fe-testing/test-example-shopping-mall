import { AppBar, Box, Toolbar, Typography, Skeleton } from '@mui/material';
import Cookies from 'js-cookie';
import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import ApiErrorBoundary from '@/pages/common/components/ApiErrorBoundary';
import CartButton from '@/pages/common/components/CartButton';
import ConfirmModal from '@/pages/common/components/ConfirmModal';
import LoginButton from '@/pages/common/components/LoginButton';
import LogoutButton from '@/pages/common/components/LogoutButton';
import useConfirmModal from '@/pages/common/hooks/useConfirmModal';
import useProfile from '@/pages/common/hooks/useProfile';
import { useCartStore } from '@/store/cart';
import { useUserStore } from '@/store/user';
import { pick } from '@/utils/common';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { isModalOpened, toggleIsModalOpened } = useConfirmModal();
  const { isLogin, setIsLogin, setUserData } = useUserStore(state =>
    pick(state, 'isLogin', 'setIsLogin', 'setUserData'),
  );
  const { cart, initCart } = useCartStore(state =>
    pick(state, 'cart', 'initCart'),
  );
  const handleClickModalAgree = () => {
    remove();
    setIsLogin(false);
    Cookies.remove('access_token');
    toggleIsModalOpened();
  };
  const { data, remove } = useProfile({
    config: {
      onSuccess: profile => {
        setUserData(profile);
        initCart(profile.id);
      },
      enabled: !!isLogin,
    },
  });
  const handleClickLogo = () => {
    navigate(pageRoutes.main);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              onClick={handleClickLogo}
              style={{ cursor: 'pointer' }}
            >
              Wish Mart
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              {isLogin ? (
                <ApiErrorBoundary>
                  <Suspense
                    fallback={<Skeleton sx={{ width: 100, height: 30 }} />}
                  >
                    <CartButton cart={cart} />
                    <LogoutButton data={data} onClick={toggleIsModalOpened} />
                  </Suspense>
                </ApiErrorBoundary>
              ) : (
                <LoginButton />
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <ConfirmModal
        title="로그아웃 확인"
        description="로그아웃 하시겠습니까?"
        handleClickDisagree={toggleIsModalOpened}
        handleClickAgree={handleClickModalAgree}
        isModalOpened={isModalOpened}
      />
    </>
  );
};

export default NavigationBar;
