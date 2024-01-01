import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  TableCell,
  TableRow,
} from '@mui/material';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

const PaymentMethodTableRow = () => {
  const { control } = useFormContext();

  return (
    <TableRow>
      <TableCell style={{ fontWeight: 'bold', width: '30%' }}>
        결제 방법
      </TableCell>
      <TableCell>
        <Controller
          control={control}
          name="payment"
          render={({ field }) => (
            <FormControl>
              <RadioGroup row defaultValue="accountTransfer" {...field}>
                <FormControlLabel
                  value="accountTransfer"
                  control={<Radio size="small" />}
                  label="계좌이체"
                />
                <FormControlLabel
                  value="creditCart"
                  control={<Radio size="small" />}
                  label="신용/체크카드"
                />
                <FormControlLabel
                  value="phone"
                  control={<Radio size="small" />}
                  label="휴대폰"
                />
                <FormControlLabel
                  value="depositWithoutPassbook"
                  control={<Radio size="small" />}
                  label="무통장입금"
                />
              </RadioGroup>
            </FormControl>
          )}
        />
      </TableCell>
    </TableRow>
  );
};

export default PaymentMethodTableRow;
