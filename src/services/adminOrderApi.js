import axiosInstance from './axiosInstance';

export const fetchAdminOrders = async (page = 0, size = 10) => {
  const res = await axiosInstance.get('/api/admin/orders', {
    params: { page, size },
  });
  return res.data.data;
};
