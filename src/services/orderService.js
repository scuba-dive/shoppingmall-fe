import axiosInstance from './axiosInstance';

export const fetchOrders = async (page = 0, size = 10) => {
  const res = await axiosInstance.get(`/api/users/orders?page=${page}&size=${size}`);
  return res.data.data.orders;
};

export const clearCart = async () => {
  const res = await axiosInstance.delete('/api/users/cart');
  return res.data;
};
