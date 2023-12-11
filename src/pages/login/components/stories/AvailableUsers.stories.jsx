import { userEvent, within } from '@storybook/testing-library';

import AvailableUsers from '@/pages/login/components/AvailableUsers';

export default {
  component: AvailableUsers,
  title: '로그인/사용자 리스트',
};

export const Folded = {
  name: '접힌 상태',
};

export const Expanded = {
  name: '펼친 상태',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('⚠️ 사용 가능한 유저 리스트'));
  },
};
