import { useCallback, useEffect, useState } from 'react';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { fetchMainProducts } from '@/services/mainService';

const useMainProducts = (initialPage = 0, size = 8) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newProducts = await fetchMainProducts(page, size);

      setProducts((prev) => {
        const merged = [...prev, ...newProducts];
        const uniqueMap = new Map();
        merged.forEach((p) => uniqueMap.set(p.id, p));
        return [...uniqueMap.values()];
      });

      setHasMore(newProducts.length === size);
      setPage((prev) => prev + 1);
    } catch (err) {
      // console.error('상품 로딩 실패:', err);
    } finally {
      setLoading(false);
    }
  }, [page, size, loading, hasMore]);

  useEffect(() => {
    fetchMore();
  }, [fetchMore]);

  const { lastElementRef } = useInfiniteScroll({ fetchMore, hasMore, loading });

  return { products, lastElementRef, loading };
};

export default useMainProducts;
