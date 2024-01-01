import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Typography } from '@mui/material';
import React from 'react';

const PageTitle = () => {
  return (
    <Box marginTop="50px" textAlign="center">
      <AccountCircleIcon fontSize="large" />
      <Typography variant="h3">회원 가입</Typography>
      <Typography>
        ⚠️ 조심하세요! 비밀번호가 암호화되지 않습니다.
        <br /> 가능한 로그인 창에서 사용 가능 유저를 사용하세요.
      </Typography>
    </Box>
  );
};

export default PageTitle;
