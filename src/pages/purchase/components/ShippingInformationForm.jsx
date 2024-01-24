import {
  Box,
  Typography,
  Table,
  TableBody,
  TableContainer,
  Paper,
  CircularProgress,
  TableCell,
  TableRow,
} from '@mui/material';
import React, { Suspense } from 'react';

import AddressTableRow from '@/pages/purchase/components/AddressTableRow';
import CouponListTableRow from '@/pages/purchase/components/CouponListTableRow';
import NameTableRow from '@/pages/purchase/components/NameTableRow';
import PhoneTableRow from '@/pages/purchase/components/PhoneTableRow';
import RequestsTableRow from '@/pages/purchase/components/RequestsTableRow';

const ShippingInformationForm = () => (
  <Box>
    <Typography variant="h5">배송 정보</Typography>
    <TableContainer component={Paper}>
      <Table size="small">
        <TableBody>
          <NameTableRow />
          <AddressTableRow />
          <Suspense
            fallback={
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', width: '30%' }}>
                  할인쿠폰
                </TableCell>
                <TableCell>
                  <CircularProgress size={30} />
                </TableCell>
              </TableRow>
            }
          >
            <CouponListTableRow />
          </Suspense>
          <PhoneTableRow />
          <RequestsTableRow />
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default ShippingInformationForm;
