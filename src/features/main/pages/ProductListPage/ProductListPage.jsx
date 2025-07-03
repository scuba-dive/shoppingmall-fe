import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import Breadcrumb from '@/features/main/components/Breadcrumb/Breadcrumb';
import CategoryNavBar from '@/features/main/components/CategoryNavBar/CategoryNavBar';
import ProductGrid from '@/features/main/components/ProductGrid/ProductGrid';
import useCategories from '@/hooks/useCategories';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { fetchProductsByCategory } from '@/services/mainService';

function ProductListPage() {
  const { category } = useParams();
  const { categories, loading: categoryLoading } = useCategories();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(0);

  const load = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const matched = categories.find((cat) => cat.name === category);
      if (!matched) throw new Error('카테고리를 찾을 수 없습니다.');

      const data = await fetchProductsByCategory(matched.id, 20, page);
      setProducts((prev) => [...prev, ...data]);
      setHasMore(data.length === 20);
      setPage((prev) => prev + 1);
    } catch (err) {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
  }, [category]);

  useEffect(() => {
    if (!categoryLoading && categories.length > 0) {
      const matched = categories.find((cat) => cat.name === category);
      if (!matched) return;

      pageRef.current = 0;
      setProducts([]);
      setHasMore(true);
      setLoading(true);

      fetchProductsByCategory(matched.id, 20, 0).then((data) => {
        setProducts(data);
        setHasMore(data.length === 20);
        pageRef.current = 1;
        setLoading(false);
      });
    }
  }, [category, categories, categoryLoading]);

  const { lastElementRef } = useInfiniteScroll({ fetchMore: load, hasMore, loading });

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
        lastElementRef={lastElementRef}
      />
    </div>
  );
}

export default ProductListPage;
