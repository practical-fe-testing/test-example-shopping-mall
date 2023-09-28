import {
  MenuItem,
  Select,
  InputLabel,
  TableCell,
  FormControl,
  TableRow,
} from '@mui/material';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { NO_COUPON_ID } from '@/constants';
import useCouponList from '@/pages/purchase/hooks/useCouponList';

const CouponListTableRow = () => {
  const { couponList } = useCouponList();
  const { control } = useFormContext();
  const { field } = useController({ name: 'coupon', control });
  const { value: selectedValue, onChange } = field;

  return (
    <TableRow>
      <TableCell style={{ fontWeight: 'bold', width: '30%' }}>
        할인쿠폰
      </TableCell>
      <TableCell>
        <FormControl fullWidth size="small">
          <InputLabel>쿠폰 리스트</InputLabel>
          <Select value={selectedValue} label="쿠폰 리스트" onChange={onChange}>
            <MenuItem value={NO_COUPON_ID}>없음</MenuItem>
            {couponList.map(({ name, id }) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
    </TableRow>
  );
};

export default CouponListTableRow;
