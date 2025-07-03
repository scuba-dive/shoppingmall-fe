import axiosInstance from '@/services/axiosInstance';

// 상품 전체 조회 API
const fetchMainProducts = async (page = 0, size = 8) => {
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

export default fetchMainProducts;

// 카테고리 조회 API
const fetchCategories = async () => {
  const res = await axiosInstance.get('/api/users/categories');
  return res.data?.data ?? [];
};

export { fetchCategories };

// 카테고리별 상품 조회 API
const fetchProductsByCategory = async (categoryId, size = 8) => {
  const res = await axiosInstance.get(`/api/users/categories/${categoryId}/products`, {
    params: {
      page: 0,
      size,
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

export { fetchProductsByCategory };
