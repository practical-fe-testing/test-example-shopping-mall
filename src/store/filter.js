import { create } from 'zustand';

import { ALL_CATEGORY_ID } from '@/constants';

export const useFilterStore = create(set => ({
  minPrice: null,
  maxPrice: null,
  title: null,
  categoryId: ALL_CATEGORY_ID,
  setMinPrice: minPrice => set(state => ({ ...state, minPrice })),
  setMaxPrice: maxPrice => set(state => ({ ...state, maxPrice })),
  setTitle: title => set(state => ({ ...state, title })),
  setCategoryId: categoryId => set(state => ({ ...state, categoryId })),
  initFilter: () =>
    set(() => ({
      minPrice: null,
      maxPrice: null,
      title: null,
      categoryId: -1,
    })),
}));
