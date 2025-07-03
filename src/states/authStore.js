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
          const { accessToken, refreshToken, user } = response.data.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
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

      logout: () => set({ user: null }),

      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthStore;
