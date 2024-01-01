import { useCartStore } from '@/store/cart';
import { useFilterStore } from '@/store/filter';
import { useUserStore } from '@/store/user';

const mockStore = (hook, state) => {
  const initStore = hook.getState();
  hook.setState({ ...initStore, ...state }, true);
};

export const mockUseUserStore = state => {
  mockStore(useUserStore, state);
};

export const mockUseCartStore = state => {
  mockStore(useCartStore, state);
};

export const mockUseFilterStore = state => {
  mockStore(useFilterStore, state);
};
