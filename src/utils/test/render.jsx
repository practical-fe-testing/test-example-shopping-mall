import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export default async component => {
  const user = userEvent.setup();

  return {
    user,
    ...render(component),
  };
};
