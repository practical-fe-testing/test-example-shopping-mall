import { apiRoutes } from '@/apiRoutes';
import { usePost } from '@/helpers/reactQuery';
import { pathToUrl } from '@/helpers/url';

export const useLogin = updater =>
  usePost({ url: pathToUrl(apiRoutes.login), updater });
