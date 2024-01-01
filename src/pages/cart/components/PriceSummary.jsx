import { Typography, Button, Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '../../../apiRoutes';

import { useCartStore } from '@/store/cart';
import { pick } from '@/utils/common';
import { formatPrice, formatNumber } from '@/utils/formatter';

const PriceSummary = () => {
  const navigate = useNavigate();

  const { totalCount, totalPrice } = useCartStore(state =>
    pick(state, 'totalPrice', 'totalCount'),
  );

  const handleClickPurchase = () => {
    navigate(pageRoutes.purchase);
  };

  return (
    <Box
      sx={{
        paddingTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      <Typography>
        총 {formatNumber(totalCount)}개, {formatPrice(totalPrice)}
      </Typography>
      <Button variant="contained" size="large" onClick={handleClickPurchase}>
        구매하기
      </Button>
    </Box>
  );
};

export default PriceSummary;
