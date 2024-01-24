import React from 'react';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleClickNavigateHomeButton = () => {
    navigate(pageRoutes.main, { replace: true });
  };

  return (
    <div id="error-page">
      <h1>404</h1>
      <p>페이지 경로가 잘못 되었습니다!</p>
      <button onClick={handleClickNavigateHomeButton}>Home으로 이동</button>
    </div>
  );
};

export default NotFoundPage;
