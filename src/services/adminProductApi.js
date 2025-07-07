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

// 각 상품 수량 변경
export const updateProductStock = async (optionId, newStock) => {
  const res = await axiosInstance.patch(`/api/admin/products/${optionId}/stock`, {
    stock: newStock,
  });
  return res.data;
};

// 새로운 상품 추가
export const registerProduct = async (productData) => {
  const formData = new FormData();

  const colors = ['파랑', '빨강', '검정'];
  const missingImages = colors.filter((color) => !productData.images[color]);
  if (missingImages.length > 0) {
    throw new Error(`다음 색상의 이미지가 필요합니다: ${missingImages.join(', ')}`);
  }

  const productInfo = {
    productName: productData.name,
    description: productData.description,
    price: productData.price,
    categoryName: productData.category,
    options: [{ color: '파랑' }, { color: '빨강' }, { color: '검정' }],
  };

  // JSON을 Blob으로 감싸서 Content-Type 명시 (이게 되네!)
  formData.append('product', new Blob([JSON.stringify(productInfo)], { type: 'application/json' }));

  // 이미지들 추가
  colors.forEach((color) => {
    formData.append('optionImages', productData.images[color]);
  });

  const res = await axiosInstance.post('/api/admin/products', formData, {
    headers: {
      'Content-Type': undefined,
    },
  });

  return res.data;
};
