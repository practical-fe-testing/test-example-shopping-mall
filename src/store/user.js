import Cookies from 'js-cookie';
import { create } from 'zustand';

export const useUserStore = create(set => ({
  isLogin: Cookies.get('access_token'),
  user: null,
  setIsLogin: isLogin => set(state => ({ ...state, isLogin })),
  setUserData: user => set(state => ({ ...state, user })),
}));
