import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, InputAdornment, TextField, Box } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

import { MAX_CART_VALUE, TOAST_ID } from '@/constants';
import { cartValidationMessages } from '@/messages';

const CartButtonGroup = ({ onClickAddCart, onChangeCount }) => {
  const [count, setCount] = useState(0);
  const handleChangeCount = ev => {
    const newCount = Number(ev.target.value);

    if (newCount > MAX_CART_VALUE) {
      toast.error(cartValidationMessages.MAX_INPUT_VALUE, { id: TOAST_ID });
      return;
    }

    setCount(newCount);
    onChangeCount?.(newCount);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <TextField
        variant="standard"
        onChange={handleChangeCount}
        value={count}
        size="small"
        sx={{ width: '15ch' }}
        InputProps={{
          endAdornment: <InputAdornment position="end">개</InputAdornment>,
        }}
      />
      <Button
        sx={{
          width: '75%',
          marginLeft: '20px',
        }}
        variant="outlined"
        startIcon={<AddShoppingCartIcon />}
        onClick={onClickAddCart}
      >
        장바구니
      </Button>
    </Box>
  );
};

export default CartButtonGroup;
