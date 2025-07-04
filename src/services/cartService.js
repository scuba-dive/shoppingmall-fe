import axiosInstance from '@/services/axiosInstance';

export const fetchCart = async () => {
  const res = await axiosInstance.get('/api/users/cart');
  return res.data.data;
};

export const addToCart = async ({ productOptionId, quantity }) => {
  const res = await axiosInstance.post('/api/users/cart/items', {
    productOptionId,
    quantity,
  });
  return res.data;
};
