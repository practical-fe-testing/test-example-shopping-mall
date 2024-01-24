import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { TOAST_ID } from '@/constants';
import {
  defaultDeleteFunc,
  defaultFetcher,
  defaultPostFunc,
} from '@/helpers/fetcher';

// https://github.com/horprogs/react-query/blob/master/src/utils/reactQuery.ts

export const useFetch = ({ url, options }) => {
  const context = useQuery(
    [url, options?.params],
    ({ queryKey }) => defaultFetcher({ queryKey }),
    {
      enabled: !!url,
      useErrorBoundary: true,
      onError: error => {
        console.error(error, 'error');
        return toast.error(`Something went wrong: ${error.message}`, {
          id: TOAST_ID,
        });
      },
      ...options?.config,
    },
  );

  return context;
};

export const useLoadMore = ({ url, options }) => {
  const { params, ...others } = options;
  const context = useInfiniteQuery(
    [url, params],
    ({ queryKey, pageParam = 0 }) =>
      defaultFetcher({
        queryKey,
        pageParam: { offset: pageParam * others.limit, limit: others.limit },
      }),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.lastPage ? false : pages.length;
      },
    },
  );

  return context;
};

const useGenericMutation = ({ func, url, params, updater }) => {
  const queryClient = useQueryClient();

  return useMutation(func, {
    onMutate: async data => {
      await queryClient.cancelQueries([url, params]);
      const previousData = queryClient.getQueryData([url, params]);

      queryClient.setQueryData([url, params], oldData =>
        updater ? updater(oldData, data) : data,
      );

      return previousData;
    },
    onError: async (err, _, context) => {
      queryClient.setQueryData([url, params], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries([url, params]);
    },
  });
};

export const useDelete = ({ url, params, updater }) =>
  useGenericMutation({ func: defaultDeleteFunc(url), url, params, updater });

export const usePost = ({ url, params, updater }) =>
  useGenericMutation({ func: defaultPostFunc(url), url, params, updater });

export const useUpdate = ({ url, params, updater }) =>
  useGenericMutation({ func: defaultPostFunc(url), url, params, updater });
