import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 인증 쓰나? jwt 토큰 쓰나?
});

axiosInstance.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
