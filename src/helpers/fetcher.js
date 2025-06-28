import { api } from '@/helpers/axios';

export const defaultFetcher = ({ queryKey, pageParam }) => {
  const [url, params] = queryKey;

  return api.get(url, { params: { ...params, ...pageParam } }).then(res => {
    return res.data;
  });
};

export const defaultDeleteFunc = url => id => api.delete(`${url}/${id}`);
export const defaultPostFunc = url => data => api.post(url, data);
