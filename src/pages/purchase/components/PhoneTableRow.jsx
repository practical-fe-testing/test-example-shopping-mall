import { FormControl, TextField, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { PHONE_PATTERN } from '@/constants';

const PhoneTableRow = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TableRow>
      <TableCell style={{ fontWeight: 'bold', width: '30%' }}>
        전화번호
      </TableCell>
      <TableCell>
        <FormControl fullWidth>
          <TextField
            {...register('phone', {
              required: '휴대폰 번호를 입력하세요',
              pattern: {
                value: PHONE_PATTERN,
                message: '-를 포함한 휴대폰 번호만 가능합니다',
              },
            })}
            type="text"
            error={!!errors?.phone}
            helperText={errors?.phone?.message}
            placeholder="휴대폰 번호를 입력하세요"
            size="small"
          />
        </FormControl>
      </TableCell>
    </TableRow>
  );
};

export default PhoneTableRow;
