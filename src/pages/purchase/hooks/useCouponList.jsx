import { useWatch } from 'react-hook-form';

import { apiRoutes } from '@/apiRoutes';
import { NO_COUPON_ID } from '@/constants';
import { useFetch } from '@/helpers/reactQuery';
import { pathToUrl } from '@/helpers/url';

const useCouponList = options => {
  const selectedCouponId = useWatch({ name: 'coupon' });
  const { data, isLoading } = useFetch({
    url: pathToUrl(apiRoutes.couponList),
    options,
  });

  const couponList = isLoading ? [] : data.couponList;

  return {
    isLoading,
    couponList,
    selectedCoupon:
      selectedCouponId === NO_COUPON_ID
        ? null
        : couponList.find(coupon => coupon?.id === selectedCouponId),
  };
};

export default useCouponList;
