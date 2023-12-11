import { defineConfig } from 'cypress';

const baseUrl = 'http://localhost:5173';

export default defineConfig({
  e2e: {
    video: false,
    viewportWidth: 1200,
    viewportHeight: 1000,
    baseUrl,
    scrollBehavior: 'center', // selector를 선택했을 때 top으로 스크롤이 되는 문제가 발생. header 영역을 고려하기 위해서는 해당 설정이 필요
  },
  env: {
    baseUrl,
  },
});
