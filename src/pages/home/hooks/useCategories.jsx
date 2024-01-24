import { apiRoutes } from '@/apiRoutes';
import { useFetch } from '@/helpers/reactQuery';
import { pathToUrl } from '@/helpers/url';

const useCategories = options =>
  useFetch({ url: pathToUrl(apiRoutes.categories), options });

export default useCategories;
