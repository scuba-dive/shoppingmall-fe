import { useCallback, useRef } from 'react';

const useInfiniteScroll = ({ fetchMore, hasMore, loading }) => {
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchMore],
  );

  return { lastElementRef };
};

export default useInfiniteScroll;
