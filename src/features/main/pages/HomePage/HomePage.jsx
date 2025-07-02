import { useEffect, useState } from 'react';

import CategorySection from '@/features/main/components/CategorySection/CategorySection';
import ProductGrid from '@/features/main/components/ProductGrid/ProductGrid';
import axiosInstance from '@/services/axiosInstance';

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/api/users/products', {
        params: {
          page: 0,
          size: 8, // 페이지당 8개
        },
      })
      .then((res) => {
        const rawProducts = res.data?.data?.products ?? [];

        // 필요한 필드만 매핑해서 넘기기
        const mapped = rawProducts.map((p) => ({
          id: p.id,
          name: p.productName,
          price: p.price,
          image: p.thumbnailUrl,
        }));

        setProducts(mapped);
      })
      .catch((err) => {
        console.error('상품 목록 API 에러:', err);
      });
  }, []);

  return (
    <div>
      <CategorySection />
      <ProductGrid title="전체 상품" products={products} />
    </div>
  );
}

export default HomePage;
