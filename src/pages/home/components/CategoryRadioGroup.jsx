import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from '@mui/material';
import React from 'react';

import { ALL_CATEGORY_ID } from '@/constants';
import useCategories from '@/pages/home/hooks/useCategories';

const CategoryRadioGroup = ({ categoryId, onChangeCategory }) => {
  const { data } = useCategories();

  return (
    <FormControl>
      <FormLabel>카테고리</FormLabel>
      <RadioGroup
        row
        name="category"
        onChange={onChangeCategory}
        value={categoryId}
      >
        <FormControlLabel
          value={ALL_CATEGORY_ID}
          control={<Radio />}
          id="All"
          label="All"
        />
        {data?.map(({ id, name }) => {
          return (
            <FormControlLabel
              key={id}
              value={id}
              id={id}
              control={<Radio />}
              label={name}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default CategoryRadioGroup;
