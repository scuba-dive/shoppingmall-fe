import axiosInstance from './axiosInstance';

// 전체 주문 조회
export const fetchAdminOrders = async (page = 0, size = 10) => {
  const res = await axiosInstance.get('/api/admin/orders', {
    params: { page, size },
  });
  return res.data.data;
};

// 주문별 상세 조회
export const fetchOrderDetail = async (orderId) => {
  const res = await axiosInstance.get(`/api/admin/orders/${orderId}`);
  return res.data.data;
};
