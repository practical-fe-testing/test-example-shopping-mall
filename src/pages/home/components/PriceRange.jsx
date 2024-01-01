import {
  Box,
  FormControl,
  FormLabel,
  OutlinedInput,
  InputAdornment,
  Typography,
} from '@mui/material';
import React from 'react';

const PriceRange = ({ onChangeMinPrice, onChangeMaxPrice }) => {
  return (
    <FormControl>
      <FormLabel>가격 범위</FormLabel>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
        <FormControl sx={{ mr: 1, mt: 1, width: '15ch' }} variant="outlined">
          <OutlinedInput
            placeholder="최소 금액"
            size="small"
            endAdornment={<InputAdornment position="end">$</InputAdornment>}
            onChange={onChangeMinPrice}
          />
        </FormControl>
        <Typography gutterBottom component="div">
          ~
        </Typography>
        <FormControl sx={{ ml: 1, mt: 1, width: '15ch' }} variant="outlined">
          <OutlinedInput
            placeholder="최대 금액"
            size="small"
            endAdornment={<InputAdornment position="end">$</InputAdornment>}
            onChange={onChangeMaxPrice}
          />
        </FormControl>
      </Box>
    </FormControl>
  );
};

export default PriceRange;
