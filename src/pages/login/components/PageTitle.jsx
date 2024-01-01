import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Typography } from '@mui/material';
import React from 'react';

const PageTitle = () => {
  return (
    <Box marginTop="50px" textAlign="center">
      <AccountCircleIcon fontSize="large" />
      <Typography variant="h3">로그인</Typography>
    </Box>
  );
};

export default PageTitle;
