import axiosInstance from './axiosInstance';

export const fetchAdminUsers = async (page = 0, size = 10) => {
  const res = await axiosInstance.get('/api/admin/users', {
    params: { page, size },
  });
  return res.data.data;
};

export const updateUserStatus = async (userId) => {
  const res = await axiosInstance.patch(`/api/admin/users/${userId}/status`);
  return res.data;
};
