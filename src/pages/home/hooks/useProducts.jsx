import { apiRoutes } from '@/apiRoutes';
import { useLoadMore } from '@/helpers/reactQuery';
import { pathToUrl } from '@/helpers/url';

const useProducts = options =>
  useLoadMore({ url: pathToUrl(apiRoutes.products), options });

export default useProducts;
