import { Button } from '@mui/material';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';

const LoginButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClickLogin = () => {
    navigate(pageRoutes.login, { state: { prevPath: location.pathname } });
  };

  return (
    <Button
      variant="text"
      size="large"
      style={{ color: '#fff' }}
      onClick={handleClickLogin}
    >
      로그인
    </Button>
  );
};

export default LoginButton;
