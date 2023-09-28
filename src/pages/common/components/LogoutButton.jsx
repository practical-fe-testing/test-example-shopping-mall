import { Button } from '@mui/material';
import React from 'react';

const LogoutButton = ({ data, onClick }) => {
  return (
    <Button
      variant="text"
      size="large"
      style={{ color: '#fff' }}
      onClick={onClick}
    >
      {data?.name}
    </Button>
  );
};

export default LogoutButton;
