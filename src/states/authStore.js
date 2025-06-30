// import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 테스트용
const MOCK_USER = {
  email: 'e@e.com',
  password: '1234',
};

const MOCK_USER_RESPONSE = {
  id: 1,
  username: '홍길동',
  nickname: '불타는 수박1',
  email: 'test@example.com',
  phoneNumber: '01012345678',
  role: 'USER',
  status: 'active',
  grade: 'VIP',
  last_login_at: '2024-12-01T10:30:00',
  createdAt: '2024-12-01T10:30:00',
  updatedAt: null,
};

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,

      login: async ({ email, password }) => {
        // mock 유저로 테스트
        if (email === MOCK_USER.email && password === MOCK_USER.password) {
          set({ user: MOCK_USER_RESPONSE });
          return true;
        }
        return false;

        // API 연동
        // try {
        //   const response = await axios.post('/api/auth/login', { email, password });
        //   const { accessToken, user } = response.data.data;
        //   localStorage.setItem('accessToken', accessToken);
        //   set({ user });
        //   return true;
        // } catch (e) {
        //   return false;
        // }
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
