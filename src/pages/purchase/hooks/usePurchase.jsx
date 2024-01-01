import { apiRoutes } from '@/apiRoutes';
import { usePost } from '@/helpers/reactQuery';
import { pathToUrl } from '@/helpers/url';

export const usePurchase = updater =>
  usePost({ url: pathToUrl(apiRoutes.purchase), updater });
