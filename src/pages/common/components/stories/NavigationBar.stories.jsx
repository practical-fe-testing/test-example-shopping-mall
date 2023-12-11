import { rest } from 'msw';
import React, { useEffect } from 'react';

import { apiRoutes } from '@/apiRoutes';
import NavigationBar from '@/pages/common/components/NavigationBar';
import { useUserStore } from '@/store/user';
import { pick } from '@/utils/common';

const API_DOMAIN = 'http://localhost:3000';

export default {
  title: '공통/네비게이션바',
  component: NavigationBar,
};

export const Default = { name: '로그아웃 상태' };

const LoggedInNavigationBar = () => {
  const { setIsLogin } = useUserStore(state =>
    pick(state, 'isLogin', 'setIsLogin'),
  );
  useEffect(() => {
    setIsLogin(true);

    return () => {
      setIsLogin(false);
    };
  }, [setIsLogin]);

  return <NavigationBar />;
};

export const LoggedIn = {
  name: '로그인 상태',
  render: () => <LoggedInNavigationBar />,
};

LoggedIn.parameters = {
  msw: {
    handlers: [
      rest.get(`${API_DOMAIN}${apiRoutes.profile}`, (_, res, ctx) => {
        return res(
          ctx.json({
            id: 2,
            email: 'maria@mail.com',
            name: 'Maria',
          }),
        );
      }),
    ],
  },
};
