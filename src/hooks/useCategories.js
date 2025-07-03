import { useEffect, useState } from 'react';

import { fetchCategories } from '@/services/mainService';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        // Handle error (e.g., set an error state or log to an external service)
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { categories, loading };
};

export default useCategories;
