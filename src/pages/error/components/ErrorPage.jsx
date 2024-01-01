import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();
  const handleClickBackButton = () => {
    navigate(-1);
  };

  return (
    <div id="error-page">
      <h1>읔!</h1>
      <p>예상치 못한 에러가 발생했습니다.</p>
      <button onClick={handleClickBackButton}>뒤로 이동</button>
    </div>
  );
};

export default ErrorPage;
