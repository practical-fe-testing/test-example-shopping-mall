import React, { useEffect, useState } from 'react';

import CategoryRadioGroup from '@/pages/home/components/CategoryRadioGroup';

export default {
  title: '홈/상품 필터',
  component: CategoryRadioGroup,
  argTypes: {
    categoryId: {
      control: 'number',
      description: '카테고리 Id',
    },
  },
};

const CategoryRadioGroupWithContents = props => {
  const [categoryId, setCategoryId] = useState(props.categoryId);
  const handleChangeCategory = ev => {
    setCategoryId(ev.target.value);
  };

  useEffect(() => {
    setCategoryId(props.categoryId);
  }, [props.categoryId]);

  return (
    <CategoryRadioGroup
      categoryId={categoryId}
      onChangeCategory={handleChangeCategory}
    />
  );
};

export const Default = {
  name: '카테고리 검색',
  args: {
    categoryId: 1,
  },
  render: props => <CategoryRadioGroupWithContents {...props} />,
};
