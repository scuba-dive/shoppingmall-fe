import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,

      login: async ({ email, password }) => {
        try {
          const response = await authAxios.post('/api/users/login', { email, password });
          const { accessToken, user } = response.data.data;
          localStorage.setItem('accessToken', accessToken);
          set({ user, loginAt: Date.now() });
          return true;
        } catch (e) {
          return false;
        }
      },

      signup: async (payload) => {
        try {
          await authAxios.post('/api/users/signup', payload);
          return true;
        } catch (e) {
          return false;
        }
      },

      checkEmailDuplicate: async (email) => {
        try {
          const response = await authAxios.get('/api/users/check-email', {
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
        // zustand persist 삭제
        localStorage.removeItem('auth-storage');
        // 쿠키에서 refreshToken 삭제
        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // user state 초기화
        set({ user: null, loginAt: null });
      },

      // refresh 토큰으로 access 토큰 갱신
      refreshAccessToken: async () => {
        try {
          const response = await authAxios.post('/api/token/refresh', {});
          const { accessToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);
          return true;
        } catch (e) {
          // refresh 토큰이 만료되었거나 유효하지 않음 - 로그아웃 처리
          const state = useAuthStore.getState();
          state.logout();
          return false;
        }
      },

      setUser: (user) => set({ user }),

      // 앱 진입 시 토큰 검증 및 자동 갱신
      validateAndRefreshToken: async () => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          // access token이 없으면 refresh 시도
          return useAuthStore.getState().refreshAccessToken();
        }

        // access token이 있으면 유효성 검사를 위해 간단한 API 호출
        try {
          await authAxios.get('/api/users/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          return true;
        } catch (e) {
          // access token이 만료되었으면 refresh 시도
          if (e.response?.status === 401) {
            return useAuthStore.getState().refreshAccessToken();
          }
          return false;
        }
      },
    }),

    {
      name: 'auth-storage',
      onRehydrateStorage: (state) => (restoredState) => {
        if (!restoredState) return;
        const { loginAt } = restoredState;
        const now = Date.now();
        const maxAge = 1000 * 60 * 60 * 24; // 1일
        if (loginAt && now - loginAt > maxAge) {
          state.logout();
        }
      },
    },
  ),
);

export default useAuthStore;
