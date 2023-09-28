import { apiRoutes } from '@/apiRoutes';
import { usePost } from '@/helpers/reactQuery';
import { pathToUrl } from '@/helpers/url';

export const useRegister = updater =>
  usePost({ url: pathToUrl(apiRoutes.users), updater });
