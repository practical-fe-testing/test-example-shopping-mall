import { FormControl, TextField, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const RequestsTableRow = () => {
  const { register } = useFormContext();

  return (
    <TableRow>
      <TableCell style={{ fontWeight: 'bold', width: '30%' }}>
        요청사항
      </TableCell>
      <TableCell>
        <FormControl fullWidth>
          <TextField {...register('requests')} type="text" size="small" />
        </FormControl>
      </TableCell>
    </TableRow>
  );
};

export default RequestsTableRow;
