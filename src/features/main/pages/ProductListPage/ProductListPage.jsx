import {
  useCallback, //
  useEffect,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import Breadcrumb from '@/features/main/components/Breadcrumb/Breadcrumb';
import CategoryNavBar from '@/features/main/components/CategoryNavBar/CategoryNavBar';
import ProductGrid from '@/features/main/components/ProductGrid/ProductGrid';
import useCategories from '@/hooks/useCategories';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { fetchProductsByCategory } from '@/services/mainService';

// 정렬값과 API 쿼리 매핑
const sortToQuery = {
  latest: 'createdAt,desc',
  'price-low': 'price,asc',
  'price-high': 'price,desc',
};

function ProductListPage() {
  const { category } = useParams();
  const { categories, loading: categoryLoading } = useCategories();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sort, setSort] = useState('latest');
  const pageRef = useRef(0);

  // 상품 불러오기
  const load = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const matched = categories.find((cat) => cat.name === category);
      if (!matched) throw new Error('카테고리를 찾을 수 없습니다.');

      const data = await fetchProductsByCategory(
        matched.id,
        20,
        page,
        sortToQuery[sort] || sortToQuery.latest,
      );
      setProducts((prev) => [...prev, ...data]);
      setHasMore(data.length === 20);
      setPage((prev) => prev + 1);
    } catch (err) {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [categories, category, page, loading, sort]);

  // 카테고리 or 정렬 변경 시 상태 초기화 및 첫 페이지 fetch
  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
    pageRef.current = 0;

    if (!categoryLoading && categories.length > 0) {
      const matched = categories.find((cat) => cat.name === category);
      if (!matched) return;

      setLoading(true);

      fetchProductsByCategory(matched.id, 20, 0, sortToQuery[sort] || sortToQuery.latest).then(
        (data) => {
          setProducts(data);
          setHasMore(data.length === 20);
          pageRef.current = 1;
          setLoading(false);
          setPage(1);
        },
      );
    }
  }, [category, categories, categoryLoading, sort]);

  // 정렬 변경 핸들러
  const handleSortChange = (e) => {
    setSort(e.target.value);
    setProducts([]);
    setPage(0);
    setHasMore(true);
  };

  // 무한스크롤
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
        sort={sort}
        onSortChange={handleSortChange}
        products={products}
        loading={loading}
        lastElementRef={lastElementRef}
      />
    </div>
  );
}

export default ProductListPage;
