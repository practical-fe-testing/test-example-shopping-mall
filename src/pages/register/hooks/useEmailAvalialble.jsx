import { apiRoutes } from '@/apiRoutes';
import { usePost } from '@/helpers/reactQuery';
import { pathToUrl } from '@/helpers/url';

export const useEmailAvalialble = updater =>
  usePost({ url: pathToUrl(apiRoutes.isAvailable), updater });
