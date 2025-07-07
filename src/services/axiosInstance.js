import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 원래대로 복원
});

axiosInstance.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    const token = localStorage.getItem('accessToken');

    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
  },
  (error) => Promise.reject(error),
);

// 401/403 에러 발생 시 자동 토큰 갱신 및 재시도
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 또는 403 에러이고, 이미 재시도하지 않은 요청이며, refresh 요청이 아닌 경우
    /* eslint-disable */
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest.retried &&
      !originalRequest.url?.includes('/token/refresh')
    ) {
      /* eslint-disable */
      originalRequest.retried = true;

      try {
        // eslint-disable-next-line import/no-cycle
        const { default: useAuthStore } = await import('@/states/authStore');
        const refreshSuccess = await useAuthStore.getState().refreshAccessToken();

        if (refreshSuccess) {
          // 새로운 토큰으로 원래 요청 재시도
          const newToken = localStorage.getItem('accessToken');
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // refresh 실패 시 로그인 상태 해제 등은 store에서 처리됨
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
