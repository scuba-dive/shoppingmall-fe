import axiosInstance from './axiosInstance';

export const fetchOrders = async (page = 0, size = 10) => {
  const res = await axiosInstance.get('/api/users/orders', {
    params: { page, size },
  });
  return res.data.data;
};

export const fetchOrderById = async (orderId) => {
  const res = await axiosInstance.get(`/api/users/orders/${orderId}`);
  return res.data.data;
};
