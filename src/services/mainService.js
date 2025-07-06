import axiosInstance from '@/services/axiosInstance';

// 상품 전체 조회 API
export const fetchMainProducts = async (page = 0, size = 8) => {
  const res = await axiosInstance.get('/api/users/products', {
    params: { page, size },
  });

  const rawProducts = res.data?.data?.products ?? [];

  return rawProducts.map((p) => ({
    id: p.id,
    name: p.productName,
    price: p.price,
    image: p.thumbnailUrl,
  }));
};

// 카테고리 조회 API
export const fetchCategories = async () => {
  const res = await axiosInstance.get('/api/users/categories');
  return res.data?.data ?? [];
};

// 카테고리별 상품 조회 API
export const fetchProductsByCategory = async (
  categoryId,
  size = 8,
  page = 0,
  sort = 'createdAt,desc', // 최신순 기본
) => {
  const res = await axiosInstance.get(`/api/users/categories/${categoryId}/products`, {
    params: {
      page,
      size,
      sort,
    },
  });

  const rawProducts = res.data?.data?.products ?? [];

  return rawProducts.map((p) => ({
    id: p.id,
    name: p.productName,
    price: p.price,
    image: p.thumbnailUrl,
  }));
};

// 상품 상세 정보 조회
export const fetchProductById = async (id) => {
  const res = await axiosInstance.get(`/api/users/products/${id}`);
  return res.data.data;
};

export const fetchOptionImage = async (optionId) => {
  const res = await axiosInstance.get(`/api/users/products/option/image/${optionId}`);
  return res.data?.data?.imageUrl;
};
