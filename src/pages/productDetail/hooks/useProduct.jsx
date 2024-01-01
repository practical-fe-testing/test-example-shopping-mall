import { apiRoutes } from '@/apiRoutes';
import { useFetch } from '@/helpers/reactQuery';
import { pathToUrl } from '@/helpers/url';

const useProduct = options =>
  useFetch({
    url: pathToUrl(apiRoutes.product, options?.params),
    options,
  });

export default useProduct;
