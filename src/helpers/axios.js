import axios from 'axios';
import Cookies from 'js-cookie';

export const client = (() =>
  axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 20000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Authorization',
    },
  }))();

export const headers = () => {
  const accessToken = Cookies.get('access_token');

  if (accessToken) {
    return {
      headers: {
        Authorization: accessToken,
      },
    };
  }
};

export const api = {
  get: (url, params) => client.get(url, { ...params, ...headers() }),
  post: (url, data) => client.post(url, data, headers()),
  patch: (url, data) => client.patch(url, data, headers()),
  delete: url => client.delete(url, headers()),
};
