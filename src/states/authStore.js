import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import axiosInstance from '@/services/axiosInstance';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,

      login: async ({ email, password }) => {
        try {
          const response = await axiosInstance.post('/api/users/login', { email, password });
          const { accessToken, user } = response.data.data;
          localStorage.setItem('accessToken', accessToken);
          set({ user });
          return true;
        } catch (e) {
          return false;
        }
      },

      signup: async (payload) => {
        try {
          await axiosInstance.post('/api/users/signup', payload);
          return true;
        } catch (e) {
          return false;
        }
      },

      checkEmailDuplicate: async (email) => {
        try {
          const response = await axiosInstance.get('/api/users/check-email', {
            params: { email },
          });
          return response.data;
        } catch (e) {
          return false;
        }
      },

      logout: () => {
        // localStorage에서 토큰 삭제
        localStorage.removeItem('accessToken');

        // 쿠키 삭제 (과거 날짜로 만료시간 설정하여 삭제)
        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // 사용자 상태 초기화
        set({ user: null });
      },

      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthStore;
