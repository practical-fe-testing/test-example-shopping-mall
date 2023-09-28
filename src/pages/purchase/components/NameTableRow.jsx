import { FormControl, TextField, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const NameTableRow = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TableRow>
      <TableCell style={{ fontWeight: 'bold', width: '30%' }}>이름</TableCell>
      <TableCell>
        <FormControl fullWidth>
          <TextField
            {...register('name', { required: '이름을 입력하세요' })}
            type="input"
            error={!!errors?.name}
            helperText={errors?.name?.message}
            size="small"
            placeholder="이름을 입력하세요"
          />
        </FormControl>
      </TableCell>
    </TableRow>
  );
};

export default NameTableRow;
