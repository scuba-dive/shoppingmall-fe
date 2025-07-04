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

export const updateCartItem = async ({ cartItemId, quantity }) => {
  const res = await axiosInstance.put(`/api/users/cart/items/${cartItemId}`, {
    quantity,
  });
  return res.data.data;
};

export const deleteCartItem = async (cartItemId) => {
  const res = await axiosInstance.delete(`/api/users/cart/items/${cartItemId}`);
  return res.data;
};

export const clearCart = async () => {
  const res = await axiosInstance.delete('/api/users/cart');
  return res.data;
};
