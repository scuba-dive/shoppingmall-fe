import axiosInstance from './axiosInstance';

export const fetchAdminProducts = async (page = 0, size = 10) => {
  const res = await axiosInstance.get('/api/admin/products', { params: { page, size } });
  return res.data.data;
};
