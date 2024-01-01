import { apiRoutes } from '@/apiRoutes';
import { useFetch } from '@/helpers/reactQuery';
import { pathToUrl } from '@/helpers/url';

const useUsers = options =>
  useFetch({ url: pathToUrl(apiRoutes.users), options });

export default useUsers;
