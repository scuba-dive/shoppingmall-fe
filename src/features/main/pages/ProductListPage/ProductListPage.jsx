import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Breadcrumb from '@/features/main/components/Breadcrumb/Breadcrumb';
import CategoryNavBar from '@/features/main/components/CategoryNavBar/CategoryNavBar';
import ProductGrid from '@/features/main/components/ProductGrid/ProductGrid';
import useCategories from '@/hooks/useCategories';
import { fetchProductsByCategory } from '@/services/mainService';

function ProductListPage() {
  const { category } = useParams();
  const { categories, loading: categoryLoading } = useCategories();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const matched = categories.find((cat) => cat.name === category);
        if (!matched) throw new Error('카테고리를 찾을 수 없습니다.');

        const data = await fetchProductsByCategory(matched.id, 20);
        setProducts(data);
      } catch (err) {
        //        console.error('상품 목록을 불러오는 데 실패했습니다:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!categoryLoading && categories.length > 0) {
      load();
    }
  }, [category, categories, categoryLoading]);

  return (
    <div>
      <CategoryNavBar />
      <Breadcrumb
        paths={[
          { name: '홈', link: '/' },
          { name: '카테고리', link: '/category' },
          { name: category },
        ]}
      />
      <ProductGrid
        title={`${category}의 모든 것`}
        showSort
        onSortChange={() => {}}
        products={products}
        loading={loading}
      />
    </div>
  );
}

export default ProductListPage;
