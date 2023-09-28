import React from 'react';

import TextField from '@/components/TextField';

export default {
  title: '텍스트 필드',
  component: TextField,
};

export const Default = {
  name: '기본',
  render: () => (
    <div style={{ width: 200 }}>
      <TextField />
    </div>
  ),
};
