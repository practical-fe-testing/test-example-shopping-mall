import SearchIcon from '@mui/icons-material/Search';
import {
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput,
  FormControl,
} from '@mui/material';
import React from 'react';

const SearchBar = ({ onChangeInput }) => {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="searchbar-input">상품명</InputLabel>
      <OutlinedInput
        id="searchbar-input"
        label="상품명"
        onChange={onChangeInput}
        endAdornment={
          <InputAdornment position="end">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default SearchBar;
