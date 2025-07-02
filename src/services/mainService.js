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
