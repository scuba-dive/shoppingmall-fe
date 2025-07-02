import { useEffect, useState } from 'react';

import fetchMainProducts from '@/services/mainService'; // ✅ default import로 수정

const useMainProducts = (page = 0, size = 8) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMainProducts(page, size);
        setProducts(data);
      } catch (err) {
        // Handle error appropriately (e.g., set an error state or show a notification)
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, size]);

  return { products, loading };
};

export default useMainProducts;
