import { FormControl, TextField, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const AddressTableRow = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TableRow>
      <TableCell style={{ fontWeight: 'bold', width: '30%' }}>주소</TableCell>
      <TableCell>
        <FormControl fullWidth>
          <TextField
            {...register('address', { required: '주소를 입력하세요' })}
            type="input"
            error={!!errors?.address}
            helperText={errors?.address?.message}
            size="small"
            placeholder="주소를 입력하세요"
          />
        </FormControl>
      </TableCell>
    </TableRow>
  );
};

export default AddressTableRow;
