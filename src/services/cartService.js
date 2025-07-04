import axiosInstance from '@/services/axiosInstance';

const fetchCart = async () => {
  const res = await axiosInstance.get('/api/users/cart');
  return res.data.data;
};

export default fetchCart;
