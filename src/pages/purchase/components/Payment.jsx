import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import React from 'react';

import { couponType } from '@/constants';
import PaymentMethodTableRow from '@/pages/purchase/components/PaymentMethodTableRow';
import useCouponList from '@/pages/purchase/hooks/useCouponList';
import { useCartStore } from '@/store/cart';
import { pick } from '@/utils/common';
import { formatPrice } from '@/utils/formatter';

const getTotalPrice = ({ coupon, shippingCost, totalPrice }) => {
  let priceAppliedCoupon = totalPrice;
  if (coupon?.type === couponType.PRICE) {
    priceAppliedCoupon -= coupon?.value;
  } else if (coupon?.type === couponType.PERCENT) {
    priceAppliedCoupon = priceAppliedCoupon - totalPrice / coupon.value;
  }

  return formatPrice(priceAppliedCoupon + shippingCost);
};

const Payment = () => {
  const { totalPrice } = useCartStore(state => pick(state, 'totalPrice'));
  const { selectedCoupon } = useCouponList();
  const shippingCost = 5;
  const couponName = selectedCoupon?.name ?? '선택 안함';

  return (
    <Box mt={2}>
      <Typography variant="h5" mb={1}>
        결제정보
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', width: '30%' }}>
                총상품가격
              </TableCell>
              <TableCell>{formatPrice(totalPrice)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', width: '30%' }}>
                할인쿠폰
              </TableCell>
              <TableCell>{couponName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', width: '30%' }}>
                배송비
              </TableCell>
              <TableCell>{formatPrice(shippingCost)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', width: '30%' }}>
                총결제금액
              </TableCell>
              <TableCell>
                {getTotalPrice({
                  coupon: selectedCoupon,
                  shippingCost,
                  totalPrice,
                })}
              </TableCell>
            </TableRow>
            <PaymentMethodTableRow />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Payment;
