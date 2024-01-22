import { http, HttpResponse } from 'msw';

import response from '@/__mocks__/response';
import { apiRoutes } from '@/apiRoutes';

const API_DOMAIN = 'http://localhost:3000';

export const handlers = [
  ...[
    apiRoutes.users,
    apiRoutes.product,
    apiRoutes.categories,
    apiRoutes.couponList,
  ].map(path =>
    http.get(`${API_DOMAIN}${path}`, () =>
      HttpResponse.json(response[path], {
        status: 200,
      }),
    ),
  ),
  http.get(`${API_DOMAIN}${apiRoutes.products}`, ({ request }) => {
    const url = new URL(request.url);
    const data = response[apiRoutes.products];
    const offset = Number(url.searchParams.get('offset'));
    const limit = Number(url.searchParams.get('limit'));
    const products = data.products.filter(
      (_, index) => index >= offset && index < offset + limit,
    );

    return HttpResponse.json(
      { products, lastPage: products.length < limit },
      { status: 200 },
    );
  }),
  http.get(`${API_DOMAIN}${apiRoutes.profile}`, () => {
    return HttpResponse.json(null, { status: 200 });
  }),
  http.post(`${API_DOMAIN}${apiRoutes.users}`, async ({ request }) => {
    const body = await request.json();

    if (body.name === 'FAIL') {
      return HttpResponse.json(null, { status: 500 });
    }

    return HttpResponse.json(null, { status: 200 });
  }),
  http.post(`${API_DOMAIN}${apiRoutes.login}`, async ({ request }) => {
    const body = await request.json();

    if (body.email === 'FAIL@gmail.com') {
      return HttpResponse.json(null, { status: 401 });
    }

    return HttpResponse.json({ access_token: 'access_token' }, { status: 200 });
  }),
  http.post(`${API_DOMAIN}${apiRoutes.log}`, () => {
    return HttpResponse.json(null, { status: 200 });
  }),
];
