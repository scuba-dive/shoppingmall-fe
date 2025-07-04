import axiosInstance from './axiosInstance';

// 전체 상품 조회
export const fetchAdminProducts = async (page = 0, size = 10) => {
  const res = await axiosInstance.get('/api/admin/products', { params: { page, size } });
  return res.data.data;
};

// 각 상품 상태 품절 여부 설정
export const updateProductState = async (optionId) => {
  const res = await axiosInstance.patch(`/api/admin/products/${optionId}/status`);
  return res.data;
};
