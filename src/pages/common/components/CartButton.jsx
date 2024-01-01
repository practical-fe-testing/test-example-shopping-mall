import { ShoppingCart } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';

const CartButton = ({ cart }) => {
  const navigate = useNavigate();
  const handleClickCart = () => {
    navigate(pageRoutes.cart);
  };

  return (
    <IconButton size="large" color="inherit" onClick={handleClickCart}>
      <Badge badgeContent={Object.keys(cart).length || null} color="error">
        <ShoppingCart data-testid="cart-icon" />
      </Badge>
    </IconButton>
  );
};

export default CartButton;
