import axiosInstance from './axiosInstance';

// 전체 사용자 조회
export const fetchAdminUsers = async (page = 0, size = 10) => {
  const res = await axiosInstance.get('/api/admin/users', {
    params: { page, size },
  });
  return res.data.data;
};

// 각 사용자 휴먼 상태 비/활성화 요청
export const updateUserStatus = async (userId) => {
  const res = await axiosInstance.patch(`/api/admin/users/${userId}/status`);
  return res.data;
};
