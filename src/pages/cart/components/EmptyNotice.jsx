import { Typography, Box, Link as MuiLink } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';

const EmptyNotice = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(pageRoutes.main);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: 400,
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography sx={{ fontSize: '50px', fontWeight: 'light' }}>
        텅~
      </Typography>
      <MuiLink
        underline="hover"
        onClick={handleClickBack}
        style={{ cursor: 'pointer' }}
        role="link"
      >
        홈으로 가기
      </MuiLink>
    </Box>
  );
};

export default EmptyNotice;
