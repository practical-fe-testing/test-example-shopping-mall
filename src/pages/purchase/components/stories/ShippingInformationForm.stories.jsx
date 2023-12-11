import { within } from '@storybook/testing-library';

import ShippingInformationForm from '@/pages/purchase/components/ShippingInformationForm';

export default {
  component: ShippingInformationForm,
  title: '구매/배송 정보',
};

export const Default = {
  name: '기본',
};

export const FormWithContentsComponent = {
  name: '필드를 입력한 상태',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const [nameInput, addressInput, phoneInput, requestsInput] =
      canvas.getAllByRole('textbox');
    nameInput.value = 'lee jae sung';
    addressInput.value = 'Seoul, South Korea';
    phoneInput.value = '010-2222-3333';
    requestsInput.value = '강아지가 있으니 벨을 누르지 말아주세요!';
  },
};
