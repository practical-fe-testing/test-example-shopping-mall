import { apiRoutes } from '@/apiRoutes';
import { useFetch } from '@/helpers/reactQuery';
import { pathToUrl } from '@/helpers/url';

const useProfile = options =>
  useFetch({ url: pathToUrl(apiRoutes.profile), options });

export default useProfile;
